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
const SILENT_SWITCH_KEY = 'actuarial-notes-sound-ignore-silent-switch'

// ---------------------------------------------------------------------------
// Settings store
// ---------------------------------------------------------------------------

export interface SoundSettings {
  enabled: boolean
  /** Master volume, 0–1. */
  volume: number
  /**
   * iOS only: play even when the ringer switch is set to silent. Off by
   * default — see `setIgnoreSilentSwitch` for why this isn't free.
   */
  ignoreSilentSwitch: boolean
}

function loadSettings(): SoundSettings {
  let enabled = true
  let volume = DEFAULT_VOLUME
  let ignoreSilentSwitch = false
  try {
    enabled = localStorage.getItem(ENABLED_KEY) !== 'false'
    ignoreSilentSwitch = localStorage.getItem(SILENT_SWITCH_KEY) === 'true'
    const raw = localStorage.getItem(VOLUME_KEY)
    if (raw !== null) {
      const parsed = Number(raw)
      if (Number.isFinite(parsed)) volume = clamp01(parsed)
    }
  } catch { /* private mode / SSR — fall back to the defaults */ }
  return { enabled, volume, ignoreSilentSwitch }
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
// iOS ringer switch
// ---------------------------------------------------------------------------

interface AudioSessionLike { type: string }

function audioSession(): AudioSessionLike | null {
  if (typeof navigator === 'undefined') return null
  const nav = navigator as Navigator & { audioSession?: AudioSessionLike }
  return nav.audioSession ?? null
}

/**
 * Whether this browser can be asked to play over the ringer switch. Only
 * WebKit implements the Audio Session API, which is exactly where the problem
 * exists — elsewhere there's no switch to fight and nothing to offer.
 */
export function canIgnoreSilentSwitch(): boolean {
  return audioSession() !== null
}

/**
 * On iOS the audio session starts out `ambient`, which the hardware ringer
 * switch silences — the same rule that mutes a game but not a podcast. The
 * only session type that plays over the switch is `playback`, and per the
 * spec that's an *exclusive* type: taking it means the user's music or podcast
 * gets interrupted rather than ducked. (`transient` sounds like the right
 * answer for UI cues, but WebKit maps it to the ambient category, so it's
 * silenced too.)
 *
 * That trade isn't ours to make for everyone, so this stays off by default —
 * a silenced phone staying silent is correct behaviour — and Settings offers
 * it to anyone who would rather have the sounds.
 */
function applyAudioSession() {
  const session = audioSession()
  if (!session) return
  try {
    session.type = settings.ignoreSilentSwitch ? 'playback' : 'auto'
  } catch { /* unsupported value — leave the session alone */ }
}

export function setIgnoreSilentSwitch(ignore: boolean) {
  if (settings.ignoreSilentSwitch === ignore) return
  settings = { ...settings, ignoreSilentSwitch: ignore }
  try { localStorage.setItem(SILENT_SWITCH_KEY, String(ignore)) } catch { /* ignore */ }
  applyAudioSession()
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
  // Contexts start suspended before the first gesture, and are suspended again
  // when the tab is backgrounded (iOS also uses a non-standard 'interrupted'
  // state for calls and Siri), so anything that isn't 'running' gets a resume.
  if (ctx.state !== 'running') void ctx.resume().then(flushPending).catch(() => {})
  return ctx
}

/**
 * Events that grant the user activation Web Audio needs before it will start.
 *
 * This list is the whole reason sound worked on desktop but not on iPhone.
 * WebKit does not treat `pointerdown` / `touchstart` / `mousedown` as
 * activation-triggering for audio — only the *end* of an interaction counts —
 * so resuming from `pointerdown` alone left the context suspended forever on
 * iOS, in both Safari and Chrome (which is Safari's engine on iPhone). Blink
 * and Gecko are happy to resume from `pointerdown`, which is why this never
 * showed up on a laptop.
 *
 * Keep `pointerdown` OUT of this list — not because it does harm, but because
 * its presence here would suggest it is sufficient, and it is not.
 */
export const ACTIVATION_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'] as const

/**
 * How long a cue held back by a suspended context stays worth playing. Long
 * enough to cover press → release on the first tap, short enough that a cue
 * never arrives detached from the action that caused it.
 */
export const PENDING_CUE_MAX_AGE_MS = 500

let pendingCue: { event: SoundEvent; at: number } | null = null

/** Should a cue held while the context was starting still be played? */
export function pendingCueIsFresh(queuedAt: number, now: number): boolean {
  return now - queuedAt <= PENDING_CUE_MAX_AGE_MS
}

/**
 * Play the cue that arrived while the context was still starting, so the very
 * first tap of a session isn't silently dropped.
 */
function flushPending() {
  if (!pendingCue) return
  // Hold on to the cue while the context is still refusing to start. Every
  // `resume()` resolves whether or not it was allowed — including the doomed
  // one from `pointerdown` — so clearing here would throw the cue away
  // moments before the gesture that could actually have played it.
  if (ctx?.state !== 'running') return
  const queued = pendingCue
  pendingCue = null
  if (!pendingCueIsFresh(queued.at, Date.now())) return
  // The dropped attempt already stamped the throttle; clear it so the replay
  // isn't mistaken for a double-fire.
  lastPlayedAt.delete(queued.event)
  playSound(queued.event)
}

/**
 * Start (or restart) the audio context from inside a user gesture. Called by
 * the global listener in `SoundEffects` for each of `ACTIVATION_EVENTS`, and
 * again when the tab comes back to the foreground.
 *
 * Safe to call often: once the context is running this is a cheap no-op.
 */
export function unlockSound() {
  const audio = getCtx()
  if (!audio) return
  applyAudioSession()
  if (audio.state === 'running') flushPending()
}

/** Whether the engine is actually able to make a sound right now. */
export function soundContextState(): 'unsupported' | 'idle' | 'starting' | 'running' {
  if (unavailable) return 'unsupported'
  if (!ctx) return 'idle'
  return ctx.state === 'running' ? 'running' : 'starting'
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

  if (audio.state !== 'running') {
    // The context hasn't been allowed to start yet. Scheduling into it now
    // would render the cue against a frozen clock and lose it, so hold the
    // most recent one and let `unlockSound` replay it the moment the next
    // activation event starts the context. On iOS that next event is the
    // `touchend`/`click` a few tens of milliseconds after this very press.
    pendingCue = { event, at: Date.now() }
    return
  }

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
