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
  comboMultiplier,
  nextComboIndex,
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
let reverb: ConvolverNode | null = null
let unavailable = false

/** Length of the shared reverb tail, in seconds. */
const REVERB_SECONDS = 1.8

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

/**
 * The room the reward cues ring in.
 *
 * A convolver fed a synthesized impulse response: decaying noise, one-pole
 * lowpassed so the tail is warm rather than hissy, generated independently per
 * channel so it opens up in stereo. Cheap (one buffer, built once, shared by
 * every cue) and it does more for how satisfying a chime feels than any amount
 * of fiddling with the notes — dry synthesis always sounds like a phone UI.
 */
function getReverb(audio: AudioContext, dest: AudioNode): ConvolverNode | null {
  if (reverb) return reverb
  try {
    const length = Math.floor(audio.sampleRate * REVERB_SECONDS)
    const ir = audio.createBuffer(2, length, audio.sampleRate)
    for (let channel = 0; channel < ir.numberOfChannels; channel++) {
      const data = ir.getChannelData(channel)
      let lowpassed = 0
      for (let i = 0; i < length; i++) {
        const t = i / length
        lowpassed += (Math.random() * 2 - 1 - lowpassed) * 0.3
        // Ramp the first few ms in, so the tail reads as early reflections
        // rather than a burst of noise landing on top of the strike.
        const onset = Math.min(1, t / 0.006)
        data[i] = lowpassed * onset * Math.pow(1 - t, 3.2)
      }
    }
    reverb = audio.createConvolver()
    reverb.buffer = ir
    reverb.connect(dest)
  } catch {
    return null
  }
  return reverb
}

// exponentialRampToValueAtTime cannot reach or start from zero.
const SILENT = 0.0001

function scheduleTone(audio: AudioContext, dest: AudioNode, spec: ToneSpec, t0: number, pitch = 1) {
  const start = t0 + spec.at
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = spec.type ?? 'sine'
  osc.frequency.setValueAtTime(spec.freq * pitch, start)
  if (spec.glide !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(SILENT, spec.glide * pitch), start + spec.dur)
  }
  const peak = Math.max(SILENT, spec.gain ?? 1)
  const attack = Math.min(spec.attack ?? 0.012, spec.dur * 0.5)
  // `hold` keeps the note at full level before the decay begins — the
  // difference between a fanfare that arrives somewhere and one that starts
  // falling away the instant it gets there. It shares `dur` with the decay
  // rather than extending it, and always leaves room for the decay itself.
  const hold = Math.min(spec.hold ?? 0, Math.max(0, spec.dur - attack) * 0.6)
  gain.gain.setValueAtTime(SILENT, start)
  gain.gain.exponentialRampToValueAtTime(peak, start + attack)
  if (hold > 0) gain.gain.setValueAtTime(peak, start + attack + hold)
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

// ---------------------------------------------------------------------------
// Combo
// ---------------------------------------------------------------------------

/** How far up its climb each combo cue currently sits, and when it last played. */
const comboState = new Map<SoundEvent, { index: number; at: number }>()

/**
 * Advance a cue's combo and return the pitch multiplier for this play. Cues
 * without a `combo` always come back at 1.
 */
function advanceCombo(event: SoundEvent, recipe: SoundRecipe): number {
  if (!recipe.combo) return 1
  const now = Date.now()
  const previous = comboState.get(event)
  const index = previous
    ? nextComboIndex(previous.index, now - previous.at, recipe.combo)
    : 0
  comboState.set(event, { index, at: now })
  return comboMultiplier(recipe.combo, index)
}

/**
 * Drop a cue back to the root of its climb.
 *
 * Called when the run it was tracking ends — a wrong answer, in practice.
 * Mistakes stay silent, so this *is* the feedback: the next right answer comes
 * back at the pitch it started from, and the climb has to be earned again.
 */
export function resetSoundCombo(event: SoundEvent) {
  comboState.delete(event)
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
    const pitch = advanceCombo(event, recipe)
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

    // Post-filter send, so the room hears the same cue the listener does.
    let send: GainNode | null = null
    if (recipe.space) {
      const room = getReverb(audio, master)
      if (room) {
        send = audio.createGain()
        send.gain.value = recipe.space
        tail.connect(send)
        send.connect(room)
      }
    }

    for (const tone of recipe.tones ?? []) scheduleTone(audio, bus, tone, t0, pitch)
    for (const noise of recipe.noise ?? []) scheduleNoise(audio, bus, noise, t0)

    // Drop the per-cue nodes once the cue has finished ringing so long sessions
    // don't accumulate thousands of orphans. A cue with a send waits out the
    // reverb too, so the tail isn't cut off mid-decay.
    const ms = (recipeDuration(recipe) + 0.15 + (send ? REVERB_SECONDS : 0)) * 1000
    window.setTimeout(() => {
      try { tail.disconnect() } catch { /* ignore */ }
      try { send?.disconnect() } catch { /* ignore */ }
    }, ms)
  } catch { /* ignore */ }
}
