/**
 * The audio engine behind `soundConfig.ts`.
 *
 * One lazily-created AudioContext for the whole app (browsers cap how many you
 * may open, and the old code created a fresh one per sound), one master gain
 * for volume, and a tiny subscribable store for the enabled/volume settings so
 * every component that shows a mute button agrees on the state.
 *
 * Everything here is defensive: no audio support, a blocked autoplay policy, a
 * failed localStorage read — all degrade to silence rather than throwing into a
 * click handler.
 */

import {
  DEFAULT_VOLUME,
  SOUND_PATHS,
  SOUND_RECIPES,
  recipeDuration,
  type NoiseSpec,
  type SoundEvent,
  type SoundRecipe,
  type ToneSpec,
} from '@/lib/soundConfig'

const ENABLED_KEY = 'actuarial-notes-sounds'
const VOLUME_KEY = 'actuarial-notes-sound-volume'

// ---------------------------------------------------------------------------
// Settings store
// ---------------------------------------------------------------------------

export interface SoundSettings {
  enabled: boolean
  /** Master volume, 0–1. */
  volume: number
}

function loadSettings(): SoundSettings {
  let enabled = true
  let volume = DEFAULT_VOLUME
  try {
    enabled = localStorage.getItem(ENABLED_KEY) !== 'false'
    const raw = localStorage.getItem(VOLUME_KEY)
    if (raw !== null) {
      const parsed = Number(raw)
      if (Number.isFinite(parsed)) volume = clamp01(parsed)
    }
  } catch { /* private mode / SSR — fall back to the defaults */ }
  return { enabled, volume }
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

let settings: SoundSettings = loadSettings()
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

export function subscribeSound(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

export function getSoundSettings(): SoundSettings {
  return settings
}

export function setSoundEnabled(enabled: boolean) {
  if (settings.enabled === enabled) return
  settings = { ...settings, enabled }
  try { localStorage.setItem(ENABLED_KEY, String(enabled)) } catch { /* ignore */ }
  emit()
}

export function toggleSoundEnabled() {
  setSoundEnabled(!settings.enabled)
}

export function setSoundVolume(volume: number) {
  const next = clamp01(volume)
  if (settings.volume === next) return
  settings = { ...settings, volume: next }
  try { localStorage.setItem(VOLUME_KEY, String(next)) } catch { /* ignore */ }
  if (master && ctx) master.gain.setTargetAtTime(next, ctx.currentTime, 0.01)
  emit()
}

// ---------------------------------------------------------------------------
// Audio graph
// ---------------------------------------------------------------------------

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noiseBuffer: AudioBuffer | null = null
let unavailable = false

type AudioContextCtor = typeof AudioContext

function audioContextCtor(): AudioContextCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as Window & { webkitAudioContext?: AudioContextCtor }
  return window.AudioContext ?? w.webkitAudioContext ?? null
}

function getCtx(): AudioContext | null {
  if (unavailable) return null
  if (!ctx) {
    const Ctor = audioContextCtor()
    if (!Ctor) { unavailable = true; return null }
    try {
      ctx = new Ctor()
      master = ctx.createGain()
      master.gain.value = settings.volume
      master.connect(ctx.destination)
    } catch {
      unavailable = true
      return null
    }
  }
  // Browsers suspend contexts created before the first gesture, and again when
  // a tab is backgrounded; resuming is a no-op when already running.
  if (ctx.state === 'suspended') void ctx.resume().catch(() => {})
  return ctx
}

/**
 * Warm the context up from inside a real user gesture. Called once by the
 * global listener in `SoundEffects` so the very first cue — which may be fired
 * from a timer, not a click — isn't swallowed by the autoplay policy.
 */
export function unlockSound() {
  getCtx()
}

/** One second of white noise, reused (looped) by every noise-based cue. */
function getNoiseBuffer(audio: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const length = Math.floor(audio.sampleRate)
    noiseBuffer = audio.createBuffer(1, length, audio.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1
  }
  return noiseBuffer
}

// exponentialRampToValueAtTime cannot reach or start from zero.
const SILENT = 0.0001

function scheduleTone(audio: AudioContext, dest: AudioNode, spec: ToneSpec, t0: number) {
  const start = t0 + spec.at
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = spec.type ?? 'sine'
  osc.frequency.setValueAtTime(spec.freq, start)
  if (spec.glide !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(SILENT, spec.glide), start + spec.dur)
  }
  const peak = Math.max(SILENT, spec.gain ?? 1)
  const attack = Math.min(spec.attack ?? 0.012, spec.dur * 0.5)
  gain.gain.setValueAtTime(SILENT, start)
  gain.gain.exponentialRampToValueAtTime(peak, start + attack)
  gain.gain.exponentialRampToValueAtTime(SILENT, start + spec.dur)
  osc.connect(gain)
  gain.connect(dest)
  osc.start(start)
  osc.stop(start + spec.dur + 0.02)
}

function scheduleNoise(audio: AudioContext, dest: AudioNode, spec: NoiseSpec, t0: number) {
  const start = t0 + spec.at
  const src = audio.createBufferSource()
  src.buffer = getNoiseBuffer(audio)
  src.loop = true

  const filter = audio.createBiquadFilter()
  filter.type = spec.type ?? 'bandpass'
  filter.Q.value = spec.q ?? 1
  filter.frequency.setValueAtTime(spec.from, start)
  if (spec.to !== undefined && spec.to !== spec.from) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(SILENT, spec.to), start + spec.dur)
  }

  // `swell` shapes the envelope: 0 gives a click's instant transient, ~0.5 the
  // slow rise-and-fall of something sliding across a surface.
  const peak = Math.max(SILENT, spec.gain ?? 1)
  const swell = Math.min(0.9, Math.max(0, spec.swell ?? 0))
  const gain = audio.createGain()
  gain.gain.setValueAtTime(SILENT, start)
  gain.gain.exponentialRampToValueAtTime(peak, start + Math.max(0.002, spec.dur * swell))
  gain.gain.exponentialRampToValueAtTime(SILENT, start + spec.dur)

  src.connect(filter)
  filter.connect(gain)
  gain.connect(dest)
  src.start(start)
  src.stop(start + spec.dur + 0.02)
}

const lastPlayedAt = new Map<SoundEvent, number>()

function throttled(event: SoundEvent, recipe: SoundRecipe): boolean {
  const gap = recipe.throttleMs ?? 60
  const now = Date.now()
  const last = lastPlayedAt.get(event) ?? 0
  if (now - last < gap) return true
  lastPlayedAt.set(event, now)
  return false
}

/**
 * Play a cue. Safe to call from anywhere — render, a timer, an event handler —
 * and safe to call when sound is off, unsupported or throttled: it just
 * returns.
 */
export function playSound(event: SoundEvent) {
  if (!settings.enabled || settings.volume <= 0) return
  const recipe = SOUND_RECIPES[event]
  if (!recipe) return
  if (throttled(event, recipe)) return

  const override = SOUND_PATHS[event]
  if (override) {
    try {
      const audio = new Audio(override)
      audio.volume = settings.volume * recipe.gain
      void audio.play().catch(() => {})
    } catch { /* ignore */ }
    return
  }

  const audio = getCtx()
  if (!audio || !master) return
  try {
    const t0 = audio.currentTime + 0.001
    const bus = audio.createGain()
    bus.gain.value = recipe.gain
    let tail: AudioNode = bus
    if (recipe.lowpass) {
      const lp = audio.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = recipe.lowpass
      lp.Q.value = 0.7
      bus.connect(lp)
      tail = lp
    }
    tail.connect(master)

    for (const tone of recipe.tones ?? []) scheduleTone(audio, bus, tone, t0)
    for (const noise of recipe.noise ?? []) scheduleNoise(audio, bus, noise, t0)

    // Drop the per-cue bus once it has finished ringing so long sessions don't
    // accumulate thousands of orphaned nodes.
    const ms = (recipeDuration(recipe) + 0.15) * 1000
    window.setTimeout(() => { try { tail.disconnect() } catch { /* ignore */ } }, ms)
  } catch { /* ignore */ }
}
