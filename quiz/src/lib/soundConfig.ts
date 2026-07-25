/**
 * Sound catalogue.
 *
 * Every sound in the app is described here as plain data and rendered by the
 * Web Audio synth in `soundEngine.ts`. Nothing is fetched over the network:
 * each cue is a handful of oscillators and filtered noise bursts, so the whole
 * system costs zero bytes of assets and stays tweakable in one file.
 *
 * Design rules — keep new cues in line with these:
 *   • Interface feedback is quiet and short. A click is ~30 ms and sits an
 *     order of magnitude below the celebratory cues.
 *   • Panels and cards move on filtered noise, not tones — the "paper" family
 *     (`open` / `close` / `page`).
 *   • Success is melodic: a soft major triad, always ascending, always round
 *     (sine waves under a gentle lowpass — no sawtooth edges anywhere).
 *   • Mistakes make no sound. There is deliberately no `wrong` cue: getting a
 *     question wrong is already visible on screen, and buzzing at someone who
 *     is studying is punishment, not feedback.
 */

export type SoundEvent =
  // — interface —
  /** Generic press: any button, link or menu item. */
  | 'click'
  /** Picking one of several things (answer option, list row, tab). */
  | 'select'
  | 'toggleOn'
  | 'toggleOff'
  /** Moving between pages / tabs. */
  | 'navigate'
  // — paper —
  /** A panel or modal slides in. */
  | 'open'
  /** …and slides back out. */
  | 'close'
  /** A flick between pages of the same surface (prev/next, card flip). */
  | 'page'
  // — reward —
  /** The friendly three-note arpeggio: a right answer, anywhere. */
  | 'correct'
  /** A flashcard lands in the deck. */
  | 'collect'
  /** A concept climbs the mastery ladder. */
  | 'levelUp'
  /** Gems / quest rewards paid out. */
  | 'reward'
  /** The daily streak grows. */
  | 'streak'
  /** A quiz or study session is finished. */
  | 'complete'

export interface ToneSpec {
  /** Start offset from the cue's own start, in seconds. */
  at: number
  /** Hold time in seconds — the envelope decays to silence across it. */
  dur: number
  freq: number
  /** Optional glide target; pitch ramps `freq` → `glide` across `dur`. */
  glide?: number
  type?: OscillatorType
  /** Relative level within the cue (0–1). */
  gain?: number
  /** Attack time in seconds. Longer = rounder, softer onset. */
  attack?: number
}

export interface NoiseSpec {
  at: number
  dur: number
  gain?: number
  /** Filter sweep in Hz: `from` → `to` across `dur`. */
  from: number
  to?: number
  type?: BiquadFilterType
  q?: number
  /**
   * Fraction of `dur` spent swelling in (0 = instant transient like a click,
   * 0.5 = a slow shhhh like paper sliding across a desk).
   */
  swell?: number
}

export interface SoundRecipe {
  /** Overall level of the cue relative to the master volume (0–1). */
  gain: number
  tones?: ToneSpec[]
  noise?: NoiseSpec[]
  /** Master lowpass for the cue in Hz — this is the "round" in round arpeggio. */
  lowpass?: number
  /** Minimum gap between two plays of this cue, in ms. */
  throttleMs?: number
}

// Equal-tempered reference pitches (Hz), so the recipes below read musically.
const A3 = 220
const C4 = 261.63
const E4 = 329.63
const G4 = 392.0
const A4 = 440.0
const C5 = 523.25
const D5 = 587.33
const E5 = 659.25
const G5 = 783.99
const A5 = 880.0
const B5 = 987.77
const C6 = 1046.5
const E6 = 1318.51
const G6 = 1568.0

/**
 * An ascending run of round sine notes — the shape shared by every success
 * cue. `step` is the gap between note onsets; each note rings for `dur`, so
 * the notes overlap into a chord rather than sounding like three separate
 * beeps. That overlap is what makes it read as "melodic" instead of "beepy".
 */
function arpeggio(
  freqs: number[],
  opts: { step: number; dur: number; gain?: number; attack?: number; type?: OscillatorType; from?: number },
): ToneSpec[] {
  const { step, dur, gain = 1, attack = 0.012, type = 'sine', from = 0 } = opts
  return freqs.map((freq, i) => ({
    at: from + i * step,
    dur,
    freq,
    type,
    attack,
    // Taper slightly across the run so the top note doesn't stick out.
    gain: gain * (1 - i * 0.06),
  }))
}

/**
 * The transient every press shares: a tiny filtered noise tick plus a short
 * low body. The tick alone sounds like static; the body alone sounds like a
 * beep. Together they read as a physical button.
 */
const CLICK_TICK: NoiseSpec = { at: 0, dur: 0.018, from: 2600, to: 1500, type: 'bandpass', q: 1.1, gain: 0.55, swell: 0 }
const CLICK_BODY: ToneSpec = { at: 0, dur: 0.05, freq: 320, glide: 190, type: 'sine', gain: 0.22, attack: 0.001 }

export const SOUND_RECIPES: Record<SoundEvent, SoundRecipe> = {
  // ---- interface ----------------------------------------------------------
  click: {
    gain: 0.3,
    throttleMs: 35,
    noise: [CLICK_TICK],
    tones: [CLICK_BODY],
  },
  select: {
    // Same click, plus a soft pitched confirmation a hair above it.
    gain: 0.34,
    throttleMs: 35,
    noise: [CLICK_TICK],
    tones: [CLICK_BODY, { at: 0.004, dur: 0.1, freq: A5, type: 'sine', gain: 0.16, attack: 0.006 }],
    lowpass: 5200,
  },
  toggleOn: {
    gain: 0.34,
    throttleMs: 40,
    noise: [CLICK_TICK],
    tones: [CLICK_BODY, { at: 0.01, dur: 0.12, freq: A4, glide: E5, type: 'sine', gain: 0.2, attack: 0.006 }],
    lowpass: 5200,
  },
  toggleOff: {
    gain: 0.32,
    throttleMs: 40,
    noise: [CLICK_TICK],
    tones: [CLICK_BODY, { at: 0.01, dur: 0.12, freq: E5, glide: A4, type: 'sine', gain: 0.18, attack: 0.006 }],
    lowpass: 5200,
  },
  navigate: {
    // A short low whoosh — movement, without announcing itself.
    gain: 0.26,
    throttleMs: 80,
    noise: [{ at: 0, dur: 0.16, from: 900, to: 2200, type: 'bandpass', q: 0.7, gain: 0.5, swell: 0.4 }],
    tones: [{ at: 0, dur: 0.12, freq: D5, type: 'sine', gain: 0.12, attack: 0.02 }],
    lowpass: 4200,
  },

  // ---- paper --------------------------------------------------------------
  open: {
    // A sheet sliding out from under another: a broad noise swell whose
    // bandpass rises as the panel travels, with a little low-end weight so it
    // feels like an object moved rather than a hiss.
    gain: 0.34,
    throttleMs: 120,
    noise: [
      { at: 0, dur: 0.3, from: 480, to: 3000, type: 'bandpass', q: 0.75, gain: 0.6, swell: 0.45 },
      { at: 0.02, dur: 0.26, from: 1400, to: 2400, type: 'highpass', q: 0.4, gain: 0.22, swell: 0.55 },
    ],
    tones: [{ at: 0, dur: 0.16, freq: 150, glide: 110, type: 'sine', gain: 0.16, attack: 0.03 }],
    lowpass: 6500,
  },
  close: {
    // The same gesture reversed and a touch shorter — sheet sliding back in.
    gain: 0.3,
    throttleMs: 120,
    noise: [
      { at: 0, dur: 0.24, from: 2800, to: 460, type: 'bandpass', q: 0.75, gain: 0.55, swell: 0.3 },
    ],
    tones: [{ at: 0.06, dur: 0.14, freq: 140, glide: 100, type: 'sine', gain: 0.14, attack: 0.03 }],
    lowpass: 6000,
  },
  page: {
    // A quick flick past one sheet to the next.
    gain: 0.28,
    throttleMs: 70,
    noise: [{ at: 0, dur: 0.13, from: 1100, to: 3200, type: 'bandpass', q: 0.9, gain: 0.55, swell: 0.35 }],
    lowpass: 7000,
  },

  // ---- reward -------------------------------------------------------------
  correct: {
    // The headline cue: an ascending C-major triad on round sines. Notes ring
    // for far longer than the 90 ms between them, so all three are still
    // sounding together at the end — a chord, not a countdown.
    gain: 0.5,
    throttleMs: 90,
    lowpass: 3000,
    tones: [
      ...arpeggio([C5, E5, G5], { step: 0.09, dur: 0.52, gain: 0.85 }),
      // Octave doubling on the last note only — sparkle, not a fourth note.
      { at: 0.18, dur: 0.44, freq: C6, type: 'sine', gain: 0.16, attack: 0.02 },
    ],
  },
  collect: {
    // The card landing in the deck: paper first, then the triad a fifth higher
    // with a shimmer on top.
    gain: 0.44,
    throttleMs: 150,
    lowpass: 5200,
    noise: [{ at: 0, dur: 0.2, from: 900, to: 2600, type: 'bandpass', q: 0.8, gain: 0.35, swell: 0.4 }],
    tones: [
      ...arpeggio([G5, B5, E6], { step: 0.075, dur: 0.5, gain: 0.6, from: 0.05 }),
      { at: 0.2, dur: 0.5, freq: G6, type: 'sine', gain: 0.12, attack: 0.03 },
    ],
  },
  levelUp: {
    // Four notes climbing an octave, with a low root underneath for weight.
    gain: 0.5,
    throttleMs: 200,
    lowpass: 4000,
    tones: [
      ...arpeggio([C5, E5, G5, C6], { step: 0.1, dur: 0.6, gain: 0.75 }),
      { at: 0, dur: 0.8, freq: C4, type: 'sine', gain: 0.22, attack: 0.04 },
    ],
  },
  reward: {
    // Gems: two bright triangle blips, close together.
    gain: 0.36,
    throttleMs: 60,
    lowpass: 6000,
    tones: [
      { at: 0, dur: 0.16, freq: E6, type: 'triangle', gain: 0.5, attack: 0.004 },
      { at: 0.055, dur: 0.24, freq: G6, type: 'triangle', gain: 0.42, attack: 0.004 },
    ],
  },
  streak: {
    // A warm swell that rises — the flame catching.
    gain: 0.42,
    throttleMs: 200,
    lowpass: 3400,
    noise: [{ at: 0, dur: 0.42, from: 300, to: 1500, type: 'bandpass', q: 0.6, gain: 0.3, swell: 0.6 }],
    tones: [
      { at: 0, dur: 0.55, freq: A3, glide: A4, type: 'sine', gain: 0.35, attack: 0.06 },
      ...arpeggio([E5, A5], { step: 0.12, dur: 0.5, gain: 0.5, from: 0.16 }),
    ],
  },
  complete: {
    // Session over: the full triad plus an octave, held long, with a soft
    // fifth-below pad so it settles instead of stopping.
    gain: 0.5,
    throttleMs: 250,
    lowpass: 3600,
    tones: [
      ...arpeggio([C5, E5, G5, C6], { step: 0.11, dur: 0.75, gain: 0.7, attack: 0.016 }),
      { at: 0.33, dur: 1.0, freq: E6, type: 'sine', gain: 0.14, attack: 0.05 },
      { at: 0, dur: 1.1, freq: G4, type: 'sine', gain: 0.16, attack: 0.08 },
      { at: 0, dur: 1.1, freq: E4, type: 'sine', gain: 0.1, attack: 0.1 },
    ],
  },
}

/**
 * Escape hatch: to replace a synthesized cue with your own audio file,
 *   1. drop the file into `quiz/public/sounds/` (e.g. `correct.mp3`)
 *   2. add the matching path here, e.g. `correct: '/sounds/correct.mp3'`
 * Anything left out uses the synthesized recipe above.
 */
export const SOUND_PATHS: Partial<Record<SoundEvent, string>> = {}

/** Default master volume (0–1) before the user touches the slider. */
export const DEFAULT_VOLUME = 0.6

/** Longest a single cue can ring, in seconds — used to schedule voice cleanup. */
export function recipeDuration(recipe: SoundRecipe): number {
  const ends = [
    ...(recipe.tones ?? []).map(t => t.at + t.dur),
    ...(recipe.noise ?? []).map(n => n.at + n.dur),
  ]
  return ends.length ? Math.max(...ends) : 0
}
