/**
 * The audio engine behind `soundConfig.ts`.
 *
 * One lazily-created AudioContext for the whole app (browsers cap how many you
 * may open, and the old code created a fresh one per sound), one master gain
 * for volume, and a tiny subscribable store for the enabled/volume settings so
 * every component that shows a mute button agrees on the state.
 *
 * The synth is built to not sound like one: attacks rise along a rounded curve
 * rather than snapping in, noise is pink and never read from the same place
 * twice, every play drifts a little from the last (`playVariation`), the room
 * darkens as it rings, and overlapping cues are rounded off at the output
 * rather than clipped. See "Why it doesn't sound synthesized" in
 * `docs/sound-design.md`.
 *
 * Everything here is defensive: no audio support, a blocked autoplay policy, a
 * failed localStorage read — all degrade to silence rather than throwing into a
 * click handler.
 */

import {
  DEFAULT_VOLUME,
  SOUND_PATHS,
  SOUND_RECIPES,
  comboBloom,
  comboVoicing,
  nextComboIndex,
  playVariation,
  recipeDuration,
  type ComboVoice,
  type NoiseSpec,
  type PlayVariation,
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
const REVERB_SECONDS = 1

/**
 * Seconds of noise in the shared buffer. Every burst reads a different stretch
 * of it (see `scheduleNoise`), so it has to be long enough that two bursts in a
 * row essentially never overlap — the longest burst in the catalogue is well
 * under half a second.
 */
const NOISE_SECONDS = 2

/**
 * The room the reward cues sit in — see `roomImpulse`. A small one: a study
 * with a rug, not a hall. Enough that a chime happens somewhere rather than
 * inside your head, and gone well before the next question is on screen.
 */
export const ROOM = {
  /** Silence before the room answers, in seconds. */
  preDelay: 0.008,
  /** How long the room takes to reach full level once it does, in seconds. */
  onset: 0.005,
  /** Seconds for the tail to fall 60 dB. */
  rt60: 0.6,
  /** Where the damping starts (Hz) — the tail's brightest moment… */
  brightHz: 3200,
  /** …and where it has closed down to by the end of the tail. */
  darkHz: 350,
} as const

/**
 * Where the soft clip starts, as a fraction of full scale. Below it the output
 * stage is a straight wire.
 */
const CLIP_KNEE = 0.8

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
      master.connect(outputStage(ctx))
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

/**
 * The transfer curve of the output stage: a straight line up to `knee`, then a
 * tanh shoulder that approaches full scale without ever reaching it.
 *
 * Every cue is tuned to clear the ceiling on its own — a test pins it — but a
 * chime still ringing when the next one lands can sum past it, and a waveform
 * clipped flat against 0 dBFS is the harshest sound digital audio can make.
 * This rounds the overlap off instead. Everything under the knee passes through
 * untouched, so the loudness hierarchy the catalogue is balanced around is
 * never squashed the way a compressor would squash it.
 */
export function softClipCurve(points = 2049, knee = CLIP_KNEE): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(points)
  const room = 1 - knee
  for (let i = 0; i < points; i++) {
    const x = (i / (points - 1)) * 2 - 1
    const size = Math.abs(x)
    const y = size <= knee ? size : knee + room * Math.tanh((size - knee) / room)
    curve[i] = Math.sign(x) * y
  }
  return curve
}

function outputStage(audio: AudioContext): AudioNode {
  try {
    const shaper = audio.createWaveShaper()
    shaper.curve = softClipCurve()
    // The shoulder adds harmonics when it engages; oversampling keeps them
    // from folding back down as aliases.
    shaper.oversample = '2x'
    shaper.connect(audio.destination)
    return shaper
  } catch {
    return audio.destination
  }
}

/**
 * Pink noise, `length` samples of it.
 *
 * White noise has equal energy per hertz, so most of it sits in the top
 * octaves; through a wide bandpass it is hiss, and hiss is what makes a
 * synthesized paper sound read as static. Pink has equal energy per *octave* —
 * the tilt of most sounds in a room, paper and cloth and fingertips included —
 * and it is far gentler on the ear at the same level. Paul Kellet's filter,
 * scaled to white noise's RMS so the catalogue's noise levels keep meaning
 * what they meant.
 */
export function pinkNoise(length: number, random: () => number = Math.random): Float32Array {
  const out = new Float32Array(length)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  let energy = 0
  for (let i = 0; i < length; i++) {
    const white = random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.969 * b2 + white * 0.153852
    b3 = 0.8665 * b3 + white * 0.3104856
    b4 = 0.55 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.016898
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
    b6 = white * 0.115926
    out[i] = pink
    energy += pink * pink
  }
  const scale = energy > 0 ? Math.sqrt(1 / 3) / Math.sqrt(energy / length) : 0
  for (let i = 0; i < length; i++) out[i] *= scale
  return out
}

/** The noise every noise-based cue reads from, built once. */
function getNoiseBuffer(audio: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const data = pinkNoise(Math.floor(audio.sampleRate * NOISE_SECONDS))
    noiseBuffer = audio.createBuffer(1, data.length, audio.sampleRate)
    noiseBuffer.getChannelData(0).set(data)
  }
  return noiseBuffer
}

/**
 * The impulse response of the room the reward cues ring in: two channels of
 * noise, shaped the way a real room answers a sound.
 *
 *  • **A pre-delay.** The strike reaches you before the walls do, and that gap
 *    is most of how the ear judges the size of a room. Without it the tail
 *    lands on top of the strike and blurs it.
 *  • **An exponential decay.** A room loses the same fraction of its energy
 *    every millisecond, which is a straight line in decibels. (The tail this
 *    replaced sagged and then dropped away — a swell and a cut-off, the shape
 *    of an effect rather than a place.)
 *  • **Damping that closes in as it rings.** In a real room the high
 *    frequencies die first, soaked up by air and soft surfaces, so the tail
 *    starts bright and darkens — here from ~4.5 kHz to a few hundred hertz. A
 *    tail with a constant spectrum is the sound of a plug-in; one that darkens
 *    is the sound of somewhere.
 *
 * Each channel is drawn independently, so the room opens out in stereo around
 * a cue that is itself mono. The level is left raw: the ConvolverNode scales
 * every impulse response to the same power, so a cue's `space` means the same
 * send level whatever shape the room is.
 */
export function roomImpulse(
  sampleRate: number,
  seconds: number,
  random: () => number = Math.random,
): [Float32Array, Float32Array] {
  const length = Math.max(1, Math.floor(sampleRate * seconds))
  const delay = Math.min(length, Math.floor(sampleRate * ROOM.preDelay))
  const tailLength = Math.max(1, length - delay)
  // The last 50 ms fade to nothing, so the buffer never ends on a step.
  const release = Math.max(1, Math.floor(sampleRate * 0.05))
  const channel = () => {
    const data = new Float32Array(length)
    let lowpassed = 0
    for (let i = delay; i < length; i++) {
      const t = (i - delay) / sampleRate
      const cutoff = ROOM.brightHz * Math.pow(ROOM.darkHz / ROOM.brightHz, (i - delay) / tailLength)
      const a = 1 - Math.exp((-2 * Math.PI * cutoff) / sampleRate)
      lowpassed += (random() * 2 - 1 - lowpassed) * a
      // A closing lowpass throws energy away as it closes. Give half of it
      // back (in decibels): the tail still loses its top end faster than its
      // body, as a room does, without the low end swelling as it darkens.
      const body = Math.pow((2 - a) / a, 0.25)
      const decay = Math.pow(10, (-3 * t) / ROOM.rt60)
      const onset = Math.min(1, t / ROOM.onset)
      const end = Math.min(1, (length - 1 - i) / release)
      data[i] = lowpassed * body * decay * onset * end
    }
    return data
  }
  return [channel(), channel()]
}

function getReverb(audio: AudioContext, dest: AudioNode): ConvolverNode | null {
  if (reverb) return reverb
  try {
    const [left, right] = roomImpulse(audio.sampleRate, REVERB_SECONDS)
    const ir = audio.createBuffer(2, left.length, audio.sampleRate)
    ir.getChannelData(0).set(left)
    ir.getChannelData(1).set(right)
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

/**
 * The shape of every attack: a quarter-sine, squared. It leaves silence with no
 * slope and arrives at the peak with no slope, so the rise has no corner at
 * either end.
 *
 * Both of the shapes before it had one. An exponential ramp from near-zero
 * spends almost all of its time inaudible and then jumps to full level in the
 * last fraction of a millisecond — a hidden click on the front of every note,
 * whatever the written attack said. A straight line fixed that, but still
 * turned sharply at the top, where the rise meets the decay, and a sudden turn
 * in a level is heard as a faint tick of its own. This curve rounds both ends
 * off: the soft edge of a felt mallet on wood.
 */
const ATTACK_CURVE = Float32Array.from({ length: 32 }, (_, i) => Math.sin((Math.PI / 2) * (i / 31)) ** 2)

/**
 * Rise from silence to `peak` over `time` seconds along `ATTACK_CURVE`. The
 * decay that follows stays exponential: that's how anything struck actually
 * dies away.
 */
function rise(param: AudioParam, peak: number, start: number, time: number) {
  param.value = 0
  param.setValueCurveAtTime(ATTACK_CURVE.map(level => level * peak), start, time)
}

function scheduleTone(
  audio: AudioContext,
  dest: AudioNode,
  spec: ToneSpec,
  t0: number,
  { pitch, gain: level }: ComboVoice,
  variation: PlayVariation,
) {
  const start = t0 + spec.at
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  const tune = pitch * variation.pitch
  osc.type = spec.type ?? 'sine'
  osc.frequency.setValueAtTime(spec.freq * tune, start)
  if (spec.glide !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(SILENT, spec.glide * tune), start + spec.dur)
  }
  const peak = Math.max(SILENT, (spec.gain ?? 1) * level)
  const attack = Math.min(spec.attack ?? 0.012, spec.dur * 0.5)
  // `hold` keeps the note at full level before the decay begins — the
  // difference between a fanfare that arrives somewhere and one that starts
  // falling away the instant it gets there. It shares `dur` with the decay
  // rather than extending it, and always leaves room for the decay itself.
  const hold = Math.min(spec.hold ?? 0, Math.max(0, spec.dur - attack) * 0.6)
  rise(gain.gain, peak, start, attack)
  if (hold > 0) gain.gain.setValueAtTime(peak, start + attack + hold)
  gain.gain.exponentialRampToValueAtTime(SILENT, start + spec.dur)
  osc.connect(gain)
  gain.connect(dest)
  osc.start(start)
  osc.stop(start + spec.dur + 0.02)
}

function scheduleNoise(
  audio: AudioContext,
  dest: AudioNode,
  spec: NoiseSpec,
  t0: number,
  variation: PlayVariation,
) {
  const start = t0 + spec.at
  const buffer = getNoiseBuffer(audio)
  const src = audio.createBufferSource()
  src.buffer = buffer
  // Every burst reads its own stretch of the buffer. Played from the top each
  // time, every click in the app was the same few hundred samples — which is
  // exactly the machine-gun sameness that makes a UI sound synthetic.
  const spare = buffer.duration - spec.dur - 0.05
  const offset = spare > 0 ? Math.random() * spare : 0
  src.loop = spare <= 0

  const filter = audio.createBiquadFilter()
  filter.type = spec.type ?? 'bandpass'
  filter.Q.value = spec.q ?? 1
  filter.frequency.setValueAtTime(spec.from * variation.grain, start)
  if (spec.to !== undefined && spec.to !== spec.from) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(SILENT, spec.to * variation.grain), start + spec.dur)
  }

  // `swell` shapes the envelope: 0 gives a click's quick transient, ~0.5 the
  // slow rise-and-fall of something sliding across a surface. The rise is
  // the same rounded curve a tone's attack is.
  const peak = Math.max(SILENT, spec.gain ?? 1)
  const swell = Math.min(0.9, Math.max(0, spec.swell ?? 0))
  const gain = audio.createGain()
  rise(gain.gain, peak, start, Math.min(spec.dur * 0.9, Math.max(0.002, spec.dur * swell)))
  gain.gain.exponentialRampToValueAtTime(SILENT, start + spec.dur)

  src.connect(filter)
  filter.connect(gain)
  gain.connect(dest)
  src.start(start, offset)
  src.stop(start + spec.dur + 0.02)
}

const lastPlayedAt = new Map<SoundEvent, number>()

/**
 * How long ago a cue last played, in ms — `Infinity` if it never has.
 *
 * For the cases where one cue should stand down because a bigger one is already
 * sounding: pressing "Start Quiz" navigates, and the route-change whoosh landing
 * inside `begin`'s run-up smears the count-in it's built around.
 */
export function msSinceSound(event: SoundEvent): number {
  const last = lastPlayedAt.get(event)
  return last === undefined ? Infinity : Date.now() - last
}

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

/** A cue that doesn't climb: sounded once, exactly as written. */
const PLAIN: { voices: ComboVoice[]; bloom: number } = { voices: [{ pitch: 1, gain: 1 }], bloom: 1 }

/**
 * Advance a cue's combo and return how to voice this play: the octave-spanning
 * Shepard layers (usually two, one at the root of the climb) and how far the
 * room has opened up. Cues without a `combo` come back untouched.
 */
function advanceCombo(event: SoundEvent, recipe: SoundRecipe): { voices: ComboVoice[]; bloom: number } {
  if (!recipe.combo) return PLAIN
  const now = Date.now()
  const previous = comboState.get(event)
  const index = previous
    ? nextComboIndex(previous.index, now - previous.at, recipe.combo)
    : 0
  comboState.set(event, { index, at: now })
  return { voices: comboVoicing(recipe.combo, index), bloom: comboBloom(recipe.combo, index) }
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
    const { voices, bloom } = advanceCombo(event, recipe)
    // No two plays are quite the same sound — see `playVariation`.
    const variation = playVariation()
    const t0 = audio.currentTime + 0.001
    const bus = audio.createGain()
    bus.gain.value = recipe.gain * variation.gain
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
        // A cue mid-combo rings in a bigger room than the same cue at the root.
        send.gain.value = Math.min(1, recipe.space * bloom)
        tail.connect(send)
        send.connect(room)
      }
    }

    // A combo cue is sounded once per Shepard layer — the same notes an octave
    // apart, cross-faded, so the climb can wrap without anyone hearing it.
    for (const voice of voices) {
      for (const tone of recipe.tones ?? []) scheduleTone(audio, bus, tone, t0, voice, variation)
    }
    // The mallet is a strike, not a note: one per play, whatever the voicing.
    for (const noise of recipe.noise ?? []) scheduleNoise(audio, bus, noise, t0, variation)

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
