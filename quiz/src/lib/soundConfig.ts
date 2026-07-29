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
 *   • Only weighty presses are thumpy. The low body under a press belongs to
 *     `press` — the app's solid, primary-action buttons. Ordinary controls get
 *     the high end of that same transient and nothing underneath it.
 *   • Panels and cards move on filtered noise, not tones — the "paper" family
 *     (`open` / `close` / `page`).
 *   • Success is *struck*, not beeped. Every reward cue is a mallet hitting a
 *     tuned bar: a short noise transient, a fundamental, and harmonic partials
 *     that die away faster than the note does. It ascends, it lands on its
 *     loudest note, it has a low root under it for weight, and it rings in a
 *     room (`space`). Round throughout — sine and triangle only, no sawtooth
 *     edges anywhere.
 *   • Mistakes make no sound. There is deliberately no `wrong` cue: getting a
 *     question wrong is already visible on screen, and buzzing at someone who
 *     is studying is punishment, not feedback. A missed question is heard as
 *     the `correct` streak dropping back to its root, not as a buzzer.
 */

export type SoundEvent =
  // — interface —
  /** Generic press: any button, link or menu item. Light — no low body. */
  | 'click'
  /** A weighty press: the solid, primary-action buttons. `click` plus a thump. */
  | 'press'
  /** Picking one of several things (answer option, list row, tab). */
  | 'select'
  /** Ticking an item in a list of choices — a topic, a concept, a question. */
  | 'tick'
  | 'toggleOn'
  | 'toggleOff'
  /** Moving between pages / tabs. */
  | 'navigate'
  /** Opening a card's own actions menu (the header Play button). */
  | 'actions'
  // — paper —
  /** A panel or modal slides in. */
  | 'open'
  /** …and slides back out. */
  | 'close'
  /** A flick between pages of the same surface (prev/next, card flip). */
  | 'page'
  /** Riffling the flashcard deck into a new order. */
  | 'shuffle'
  // — reward —
  /** The friendly three-note arpeggio: a right answer, anywhere. */
  | 'correct'
  /** A card is filed into the study deck (no ceremony — that's `collect`). */
  | 'addToDeck'
  /** A flashcard lands in the deck via the collect ceremony. */
  | 'collect'
  /** A concept climbs the mastery ladder. */
  | 'levelUp'
  /** Gems / quest rewards paid out. */
  | 'reward'
  /** The daily streak grows. */
  | 'streak'
  /** A quiz or study session is finished. */
  | 'complete'
  /** Starting or resuming today's quiz from the Dashboard. */
  | 'begin'
  /** The locked comprehension-check screen gating a flashcard's collection. */
  | 'unlock'

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
  /**
   * Seconds held at full level after the attack, before the decay starts —
   * carved out of `dur`, not added to it. Zero (the default) gives the natural
   * decay of a struck bar; a landing note wants a little hold so the fanfare
   * arrives somewhere instead of immediately falling away.
   */
  hold?: number
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

/**
 * A cue whose pitch climbs while the player keeps succeeding — the coin-combo
 * mechanic, borrowed from platformers and used here on `correct`.
 *
 * Consecutive plays walk up `steps` (semitones from the written pitch) and hold
 * at the top; a gap longer than `resetMs`, or an explicit `resetSoundCombo`
 * when the user gets one wrong, drops back to the root. This is the app's
 * answer to the oldest problem in game audio: a cue that fires forty times an
 * hour stops registering. It also does the job a buzzer would, without the
 * punishment — after a miss you *hear* the climb start over.
 */
export interface ComboSpec {
  /** Semitone offsets, walked in order. Must start at 0 and ascend. */
  steps: number[]
  /** A gap this long (ms) between plays starts the climb over. */
  resetMs: number
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
  /**
   * How much of the cue is sent to the shared reverb (0–1). Depth: it's the
   * difference between a chime happening *at* you and one happening in a room
   * you're standing in. Reward cues use it; interface and paper cues stay dry,
   * because a tail on something you press forty times an hour turns into mud.
   */
  space?: number
  /** Optional pitch climb across consecutive plays. */
  combo?: ComboSpec
}

/**
 * Where a cue's pitch sits after `plays` consecutive plays: a frequency
 * multiplier applied to every tone in the recipe. Pure so the climb can be
 * tested without an AudioContext; the engine owns the counting.
 */
export function comboMultiplier(combo: ComboSpec | undefined, plays: number): number {
  if (!combo || combo.steps.length === 0) return 1
  const step = combo.steps[Math.min(Math.max(plays, 0), combo.steps.length - 1)]
  return Math.pow(2, step / 12)
}

/**
 * How far along the climb the next play sits, given the gap since the last one.
 * Long gap → back to the root; otherwise one step further, capping at the top.
 */
export function nextComboIndex(previous: number, elapsedMs: number, combo: ComboSpec): number {
  if (elapsedMs > combo.resetMs) return 0
  return Math.min(previous + 1, combo.steps.length - 1)
}

// Equal-tempered reference pitches (Hz), so the recipes below read musically.
const E2 = 82.41
const F2 = 87.31
const C3 = 130.81
const G3 = 196.0
const A3 = 220
const D4 = 293.66
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
 * One struck note — the voice every reward cue is built from.
 *
 * A pure sine is a beep; what makes a chime read as a *thing that was hit* is
 * the spectrum changing over the note. So each note is three oscillators: the
 * fundamental, an octave above it, and a twelfth above that. The partials are
 * scaled to die in a fraction of the fundamental's time, which is the whole
 * trick — the note starts as bright metal and settles into a round tone, the
 * way a glockenspiel bar or a music box tine does. Both partials are exact
 * harmonics, so stacking three of these into a triad stays consonant instead of
 * clanging like a real (inharmonic) bell.
 */
function bell(
  freq: number,
  opts: { at: number; dur: number; gain?: number; attack?: number; hold?: number; sparkle?: number },
): ToneSpec[] {
  const { at, dur, gain = 0.6, attack = 0.004, hold, sparkle = 1 } = opts
  return [
    { at, dur, freq, type: 'sine', gain, attack, hold },
    { at, dur: dur * 0.42, freq: freq * 2, type: 'sine', gain: gain * 0.3 * sparkle, attack: attack * 0.6 },
    { at, dur: dur * 0.2, freq: freq * 3, type: 'triangle', gain: gain * 0.1 * sparkle, attack: 0.001 },
  ]
}

/**
 * The mallet itself: a few milliseconds of bandpassed noise at the moment of
 * the strike. Inaudible as its own event, but without it the bells fade up out
 * of nowhere and the cue loses its sense of impact.
 */
function mallet(at = 0, gain = 0.3): NoiseSpec {
  return { at, dur: 0.02, from: 3200, to: 1800, type: 'bandpass', q: 1.4, gain, swell: 0 }
}

/**
 * The transient every press shares, in two halves.
 *
 * `CLICK_TICK` + `CLICK_EDGE` is the high end: the noise tick that places the
 * press in time, and a whisper of pitched edge so it reads as a fingertip on a
 * control rather than static. That pair on its own is the *light* press, and
 * it's what almost everything in the app uses.
 *
 * `CLICK_BODY` is the thump underneath. It's what makes a press feel like it
 * moved something, so it's reserved for presses that did: the `press` cue on
 * solid, primary-action buttons. Stacked under every control instead, an
 * afternoon of studying sounds like someone knocking on a desk.
 */
const CLICK_TICK: NoiseSpec = { at: 0, dur: 0.018, from: 2600, to: 1500, type: 'bandpass', q: 1.1, gain: 0.55, swell: 0 }
const CLICK_EDGE: ToneSpec = { at: 0, dur: 0.03, freq: 1250, glide: 850, type: 'sine', gain: 0.12, attack: 0.001 }
const CLICK_BODY: ToneSpec = { at: 0, dur: 0.05, freq: 320, glide: 190, type: 'sine', gain: 0.22, attack: 0.001 }

export const SOUND_RECIPES: Record<SoundEvent, SoundRecipe> = {
  // ---- interface ----------------------------------------------------------
  click: {
    // The default for every button, link and menu item — the high end of the
    // press with nothing under it.
    gain: 0.3,
    throttleMs: 35,
    noise: [CLICK_TICK],
    tones: [CLICK_EDGE],
  },
  press: {
    // The weighty one: the same tick with the low body back underneath. Used
    // for solid primary actions (see `components/ui/button.tsx`) and anywhere a
    // press should feel like it moved something — `data-sound="press"`.
    gain: 0.3,
    throttleMs: 40,
    noise: [CLICK_TICK],
    tones: [CLICK_BODY],
  },
  select: {
    // Same light click, plus a soft pitched confirmation a hair above it.
    gain: 0.34,
    throttleMs: 35,
    noise: [CLICK_TICK],
    tones: [CLICK_EDGE, { at: 0.004, dur: 0.1, freq: A5, type: 'sine', gain: 0.16, attack: 0.006 }],
    lowpass: 5200,
  },
  tick: {
    // Ticking a box in a list — a topic, a concept, a question. A dry wooden
    // detent: shorter and higher than a click, with no body and no ring, so
    // running down a list of topics reads as a row of pen marks rather than a
    // row of presses. The throttle is short enough that a fast run down the
    // list still marks every row.
    gain: 0.3,
    throttleMs: 30,
    lowpass: 9000,
    noise: [{ at: 0, dur: 0.012, from: 4400, to: 2600, type: 'bandpass', q: 2.2, gain: 0.5, swell: 0 }],
    tones: [{ at: 0, dur: 0.022, freq: 2093, glide: 1480, type: 'triangle', gain: 0.14, attack: 0.001 }],
  },
  toggleOn: {
    gain: 0.34,
    throttleMs: 40,
    noise: [CLICK_TICK],
    tones: [CLICK_EDGE, { at: 0.01, dur: 0.12, freq: A4, glide: E5, type: 'sine', gain: 0.2, attack: 0.006 }],
    lowpass: 5200,
  },
  toggleOff: {
    gain: 0.32,
    throttleMs: 40,
    noise: [CLICK_TICK],
    tones: [CLICK_EDGE, { at: 0.01, dur: 0.12, freq: E5, glide: A4, type: 'sine', gain: 0.18, attack: 0.006 }],
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
  actions: {
    // Opening a flashcard's own actions menu: the shared click transient plus
    // a quick upward chirp — a little more "something unfolded" than a plain
    // click, without the weight of a full `open` panel slide.
    gain: 0.3,
    throttleMs: 45,
    noise: [CLICK_TICK],
    tones: [CLICK_EDGE, { at: 0.006, dur: 0.08, freq: C5, glide: E5, type: 'sine', gain: 0.15, attack: 0.006 }],
    lowpass: 5600,
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
  shuffle: {
    // A quick riffle: short noise ticks fanning past like a thumbed stack of
    // cards, under one soft paper swell for body — the deck family's take on
    // "several sheets moving at once" rather than one.
    gain: 0.32,
    throttleMs: 150,
    lowpass: 6500,
    noise: [
      { at: 0,     dur: 0.16,  from: 500,  to: 2200, type: 'bandpass', q: 0.7, gain: 0.4,  swell: 0.4 },
      { at: 0.01,  dur: 0.02,  from: 2800, to: 2000, type: 'bandpass', q: 1.3, gain: 0.42, swell: 0 },
      { at: 0.04,  dur: 0.02,  from: 3000, to: 2100, type: 'bandpass', q: 1.3, gain: 0.4,  swell: 0 },
      { at: 0.07,  dur: 0.018, from: 3100, to: 2200, type: 'bandpass', q: 1.3, gain: 0.36, swell: 0 },
      { at: 0.095, dur: 0.018, from: 3000, to: 2200, type: 'bandpass', q: 1.3, gain: 0.3,  swell: 0 },
      { at: 0.118, dur: 0.016, from: 2800, to: 2100, type: 'bandpass', q: 1.3, gain: 0.24, swell: 0 },
    ],
  },

  // ---- reward -------------------------------------------------------------
  correct: {
    // The headline cue, and the one that fires most: an ascending C-major
    // triad struck on tuned bars. Each note rings far longer than the 75 ms
    // between them, so all three are sounding together at the end — a chord,
    // not a countdown — and the run gets *louder* as it climbs, so it lands on
    // the fifth instead of trailing off. A low C3 sits underneath for weight
    // and the whole thing is sent to the reverb, which is most of the
    // difference between "a reward" and "a notification".
    //
    // The combo is the other half: a right answer after a right answer comes
    // back a tone higher, up a fifth over five in a row. Miss one and the quiz
    // calls `resetSoundCombo`, so the next one starts again from C.
    // Quietest of the celebration cues on purpose: it fires forty times to
    // `complete`'s one, and the hierarchy has to hold.
    gain: 0.44,
    throttleMs: 90,
    lowpass: 7000,
    space: 0.28,
    combo: { steps: [0, 2, 4, 5, 7], resetMs: 90_000 },
    noise: [mallet()],
    tones: [
      ...bell(C5, { at: 0, dur: 0.5, gain: 0.6 }),
      ...bell(E5, { at: 0.075, dur: 0.5, gain: 0.66 }),
      ...bell(G5, { at: 0.15, dur: 0.66, gain: 0.78, hold: 0.05 }),
      // Octave over the landing note — sparkle, not a fourth note.
      { at: 0.15, dur: 0.5, freq: C6, type: 'sine', gain: 0.18, attack: 0.02 },
      { at: 0, dur: 0.7, freq: C3, type: 'sine', gain: 0.2, attack: 0.02 },
    ],
  },
  addToDeck: {
    // A card filed into the study deck: a soft thud plus one struck note —
    // lighter than `collect`, since this is just adding a card to a list, not
    // unlocking one through the ceremony. Barely any room on it.
    gain: 0.34,
    throttleMs: 90,
    lowpass: 6500,
    space: 0.18,
    noise: [{ at: 0, dur: 0.05, from: 900, to: 400, type: 'bandpass', q: 0.9, gain: 0.3, swell: 0.15 }],
    tones: [...bell(D5, { at: 0.01, dur: 0.2, gain: 0.44 })],
  },
  collect: {
    // The card landing in the deck: paper first, then the triad a fifth higher,
    // struck, with a shimmer over the landing and a long tail. The ceremony
    // earns more room than anything else at this size.
    gain: 0.5,
    throttleMs: 150,
    lowpass: 7500,
    space: 0.42,
    noise: [
      { at: 0, dur: 0.2, from: 900, to: 2600, type: 'bandpass', q: 0.8, gain: 0.35, swell: 0.4 },
      mallet(0.05, 0.26),
    ],
    tones: [
      ...bell(G5, { at: 0.05, dur: 0.44, gain: 0.55 }),
      ...bell(B5, { at: 0.12, dur: 0.44, gain: 0.6 }),
      ...bell(E6, { at: 0.19, dur: 0.7, gain: 0.68, hold: 0.06 }),
      { at: 0.19, dur: 0.75, freq: G6, type: 'sine', gain: 0.14, attack: 0.04 },
      { at: 0.02, dur: 0.85, freq: G3, type: 'sine', gain: 0.18, attack: 0.04 },
    ],
  },
  levelUp: {
    // A proper fanfare, in two halves: three quick notes as a pickup, then a
    // second strike on the octave that holds. The rhythm is the point — an
    // even four-note run is a scale exercise, a fast run into a held arrival
    // is an announcement. Root underneath, fifth entering with the landing.
    gain: 0.54,
    throttleMs: 200,
    lowpass: 6500,
    space: 0.5,
    noise: [mallet(), mallet(0.3, 0.26)],
    tones: [
      ...bell(C5, { at: 0, dur: 0.34, gain: 0.5 }),
      ...bell(E5, { at: 0.085, dur: 0.34, gain: 0.55 }),
      ...bell(G5, { at: 0.17, dur: 0.4, gain: 0.6 }),
      ...bell(C6, { at: 0.3, dur: 0.95, gain: 0.72, hold: 0.14 }),
      { at: 0.3, dur: 1.0, freq: G6, type: 'sine', gain: 0.12, attack: 0.05 },
      { at: 0, dur: 1.15, freq: C3, type: 'sine', gain: 0.24, attack: 0.05 },
      { at: 0.3, dur: 0.9, freq: G4, type: 'sine', gain: 0.14, attack: 0.08 },
    ],
  },
  reward: {
    // Gems: a coin dropping into the purse. A tiny high clink, then two struck
    // notes a fourth apart — the platformer pickup interval — with the second
    // one held. Short and bright; it fires once per quest, several in a row.
    gain: 0.38,
    throttleMs: 60,
    lowpass: 8000,
    space: 0.3,
    noise: [{ at: 0, dur: 0.014, from: 5200, to: 3400, type: 'bandpass', q: 2.4, gain: 0.28, swell: 0 }],
    tones: [
      ...bell(B5, { at: 0, dur: 0.14, gain: 0.5, attack: 0.002 }),
      ...bell(E6, { at: 0.055, dur: 0.34, gain: 0.56, attack: 0.002, hold: 0.04 }),
    ],
  },
  streak: {
    // The flame catching: a warm swell that rises into two struck notes an
    // octave apart, the second held, with a fifth above it as the flare. The
    // glide underneath does the catching; the bells are the flame taking.
    gain: 0.44,
    throttleMs: 200,
    lowpass: 5000,
    space: 0.45,
    noise: [{ at: 0, dur: 0.42, from: 300, to: 1600, type: 'bandpass', q: 0.6, gain: 0.3, swell: 0.6 }],
    tones: [
      { at: 0, dur: 0.6, freq: A3, glide: A4, type: 'sine', gain: 0.34, attack: 0.06 },
      ...bell(E5, { at: 0.18, dur: 0.42, gain: 0.5 }),
      ...bell(A5, { at: 0.3, dur: 0.72, gain: 0.6, hold: 0.08 }),
      { at: 0.42, dur: 0.6, freq: E6, type: 'sine', gain: 0.12, attack: 0.06 },
    ],
  },
  complete: {
    // Session over — the biggest cue in the app, and the only one allowed to
    // take a second and a half. Same two-half shape as `levelUp` but wider: the
    // run is slower, the arrival is struck again and held twice as long, and a
    // soft root-and-third pad swells in underneath so the whole thing settles
    // onto a chord instead of stopping.
    // The loudest thing the app ever plays, and the only cue allowed to be.
    gain: 0.56,
    throttleMs: 250,
    lowpass: 6000,
    space: 0.58,
    noise: [mallet(), mallet(0.36, 0.24)],
    tones: [
      ...bell(C5, { at: 0, dur: 0.5, gain: 0.5 }),
      ...bell(E5, { at: 0.1, dur: 0.5, gain: 0.54 }),
      ...bell(G5, { at: 0.2, dur: 0.55, gain: 0.58 }),
      ...bell(C6, { at: 0.36, dur: 1.15, gain: 0.7, hold: 0.2 }),
      { at: 0.36, dur: 1.2, freq: E6, type: 'sine', gain: 0.13, attack: 0.06 },
      { at: 0, dur: 1.5, freq: C3, type: 'sine', gain: 0.24, attack: 0.08 },
      { at: 0.36, dur: 1.2, freq: G4, type: 'sine', gain: 0.14, attack: 0.12 },
      { at: 0.36, dur: 1.2, freq: E4, type: 'sine', gain: 0.1, attack: 0.14 },
    ],
  },
  begin: {
    // The dashboard's big call to action: a rising whoosh into two struck notes
    // a fourth apart, the second held over a low root — "let's go", not a
    // fanfare (that's `complete`). It opens rather than concludes, so it stops
    // on the fifth instead of resolving home.
    gain: 0.42,
    throttleMs: 220,
    lowpass: 5600,
    space: 0.35,
    noise: [{ at: 0, dur: 0.22, from: 700, to: 2600, type: 'bandpass', q: 0.65, gain: 0.4, swell: 0.35 }],
    tones: [
      ...bell(D5, { at: 0.02, dur: 0.26, gain: 0.42 }),
      ...bell(G5, { at: 0.11, dur: 0.55, gain: 0.55, hold: 0.08 }),
      { at: 0.11, dur: 0.6, freq: D4, type: 'sine', gain: 0.18, attack: 0.03 },
    ],
  },
  unlock: {
    // The locked comprehension-check screen: a low, dissonant drone swelling
    // in like something dimming. Two low tones a semitone apart beat against
    // each other for the "mysterious" texture, a faint high wisp fades
    // overhead, and a slow rumble rises underneath — an eclipse settling in,
    // not a jump-scare.
    gain: 0.4,
    throttleMs: 500,
    lowpass: 950,
    // The one non-reward cue with room on it: the tail is what makes the
    // locked screen feel like a space rather than a sound.
    space: 0.5,
    tones: [
      { at: 0, dur: 1.5, freq: E2, type: 'sine', gain: 0.32, attack: 0.4 },
      { at: 0, dur: 1.5, freq: F2, type: 'sine', gain: 0.24, attack: 0.45 },
      { at: 0.2, dur: 1.1, freq: A3, glide: G3, type: 'sine', gain: 0.08, attack: 0.5 },
    ],
    noise: [{ at: 0, dur: 1.5, from: 380, to: 110, type: 'bandpass', q: 0.5, gain: 0.34, swell: 0.65 }],
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
