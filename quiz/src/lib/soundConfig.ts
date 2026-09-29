/**
 * Sound catalogue.
 *
 * Every sound in the app is described here as plain data and rendered by the
 * Web Audio synth in `soundEngine.ts`. Nothing is fetched over the network:
 * each cue is a handful of oscillators and filtered noise bursts, so the whole
 * system costs zero bytes of assets and stays tweakable in one file.
 *
 * Design rules — keep new cues in line with these:
 *   • Interface feedback is quiet and short. A click is a mouse button's
 *     click — ~15 ms of noise with no tone in it — and sits an order of
 *     magnitude below the celebratory cues.
 *   • Only weighty presses are thumpy. The low thud under a press belongs to
 *     `press` — the app's solid, primary-action buttons. Ordinary controls get
 *     the click and nothing underneath it.
 *   • Panels and cards move on filtered noise, not tones — the "paper" family
 *     (`open` / `close` / `page`).
 *   • Success is *struck*, not beeped. Every reward cue is a soft mallet on a
 *     wooden bar (`strike`): a low knock, a sine fundamental, and two faint
 *     partials that are gone within the strike. It ascends, it lands on its
 *     loudest note, it has a low root under it for weight, and it sits in a
 *     small room (`space`).
 *   • Chimes are round and short. Middle register, nothing sustained above
 *     1 kHz, rolled off above ~3 kHz, and dead inside a second. Sine and
 *     triangle only, no sawtooth edges anywhere.
 *   • Mistakes make no sound. There is deliberately no `wrong` cue: getting a
 *     question wrong is already visible on screen, and buzzing at someone who
 *     is studying is punishment, not feedback. A missed question is heard as
 *     the `correct` streak dropping back to its root, not as a buzzer.
 *   • One key. Every note is from the pentatonic of C major (`KEY`), so
 *     whatever overlaps — a press in a chime's tail, a level-up over the
 *     session fanfare — there is no pair of cues that can clash.
 *   • Nothing plays the same twice. Each play drifts a hair in level, pitch
 *     and grain (`playVariation`), and every burst of noise reads a fresh
 *     stretch of the buffer. A sound that never changes is the surest tell of
 *     a synthesizer.
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
  /** A flick between pages of the same surface (a flashcard turning over). */
  | 'page'
  /**
   * Stepping through a sequence: a Previous / Next footer, or a drag along the
   * position bar above it. The quietest cue in the catalogue — it fires on
   * every stop a drag crosses.
   */
  | 'ruffle'
  /** Riffling the flashcard deck into a new order. */
  | 'shuffle'
  /** A finished card sliding off the deck during "Clear Completed Flashcards". */
  | 'fileAway'
  // — reward —
  /** The friendly two-note arpeggio: a right answer, anywhere. */
  | 'correct'
  /** A card is filed into the study deck (no ceremony — that's `collect`). */
  | 'addToDeck'
  /** A flashcard lands in the deck via the collect ceremony. */
  | 'collect'
  /** A concept climbs the mastery ladder. */
  | 'levelUp'
  /**
   * One card in a run of several concepts leveling up on the same
   * quiz-completion ceremony. Climbs a rung per card instead of repeating the
   * `levelUp` fanfare — see `combo`.
   */
  | 'levelUpStep'
  /** Gems / quest rewards paid out. */
  | 'reward'
  /** The daily streak grows. */
  | 'streak'
  /** A quiz or study session is finished. */
  | 'complete'
  /**
   * Pressing Start Quiz — every button in the app that opens one. The count-in
   * and the single note it strikes; the phrase is finished by `launch`.
   */
  | 'begin'
  /**
   * The *second* Start Quiz: the one on the pre-quiz concept list, which is
   * what actually drops you into the questions. Picks the phrase `begin` left
   * hanging up a fourth and lands it.
   */
  | 'launch'
  /** Settling in to study: entering the flashcard study view. */
  | 'study'
  // — Quiz Battle —
  /** Buzzing in: a player claims the question (docs/quiz-battle.md). */
  | 'buzz'
  /** Each number of the 3-2-1 before a question. */
  | 'countIn'
  /** The question laid on the table — the count-in's answer, an octave up. */
  | 'go'
  /** This player's answer, locked in (online). */
  | 'lockIn'
  /** The other player has locked in — heard, not seen. */
  | 'opponentIn'
  /** A steal: the right answer after the other player missed. Replaces `correct`. */
  | 'steal'
  /** The last seconds of a question, one per second: a clock's escapement. */
  | 'clockTick'
  /** Matchmaking paired this player with an opponent. */
  | 'matchFound'
  /** A reaction arriving from the other player. */
  | 'reaction'

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
 * Consecutive plays walk up `steps` (semitones from the written pitch); a gap
 * longer than `resetMs`, or an explicit `resetSoundCombo` when the user gets
 * one wrong, drops back to the root. This is the app's answer to the oldest
 * problem in game audio: a cue that fires forty times an hour stops
 * registering. It also does the job a buzzer would, without the punishment —
 * after a miss you *hear* the climb start over.
 *
 * The climb never ends. `steps` is one octave of a ladder that wraps forever,
 * and the wrap is hidden by the Shepard voicing in `comboVoicing` — so a run of
 * thirty right answers rises for all thirty without ever leaving the register
 * it started in, and without a ceiling to bump into on the twentieth.
 */
export interface ComboSpec {
  /**
   * One octave of the ladder, in semitones from the written pitch. Must start
   * at 0, ascend, and stay *under* 12 — the rung after the last one is the
   * first one an octave up, which is where the climb wraps.
   */
  steps: number[]
  /** A gap this long (ms) between plays starts the climb over. */
  resetMs: number
  /**
   * How much more room the cue rings in once a run is going (1 = none). Pitch
   * alone can't tell you how long a streak is — the whole point of the Shepard
   * wrap is that it sounds the same every octave — so the reverb send opens up
   * across the first octave and then holds there. It's what makes a run *feel*
   * like a run, and what you hear close back down after a miss.
   */
  bloom?: number
}

/** One octave-transposed copy of a cue, sounded as part of the climb. */
export interface ComboVoice {
  /** Frequency multiplier applied to every tone in the recipe. */
  pitch: number
  /** Level multiplier applied to every tone in the recipe. */
  gain: number
}

/** Below this a layer isn't worth the oscillators — it's inaudible. */
const QUIET_VOICE = 0.005

/** How far up its octave the climb sits after `plays`, as a fraction (0–1). */
function comboOctave(combo: ComboSpec | undefined, plays: number): number {
  if (!combo || combo.steps.length === 0) return 0
  const length = combo.steps.length
  const index = ((Math.trunc(plays) % length) + length) % length
  return combo.steps[index] / 12
}

/**
 * How a cue is voiced after `plays` consecutive plays — a **Shepard tone**, the
 * barber's-pole illusion, which is the only honest way to rise forever.
 *
 * The problem with a climb is that it has to stop somewhere. Walk up far enough
 * and the cue is shrill; cap it and every answer past the fifth sounds the
 * same, which is the repetition the climb existed to fix.
 *
 * The way out is to stop treating pitch as one thing. A note carries a *height*
 * (which octave it's in) and a *chroma* (where in the octave — C, D, E…), and
 * only chroma has to keep rising for the ear to hear a climb. So each play is
 * sounded twice, an octave apart, under a loudness window that is fixed in
 * absolute frequency: as the ladder walks up, the upper copy fades out of the
 * top of the window exactly as fast as the lower one fades in at the bottom.
 * Chroma marches up and up; height goes nowhere. After a full octave the cue is
 * bit-for-bit what it was at the root, and the next answer rises out of it just
 * like all the others.
 *
 * The window is `cos²`, so the two layers' gains sum to exactly 1 at every
 * point of the climb — the cue never gets louder than it is written, and the
 * headroom the catalogue is tuned for holds all the way up.
 */
export function comboVoicing(combo: ComboSpec | undefined, plays: number): ComboVoice[] {
  const octave = comboOctave(combo, plays)
  // At the root of the climb there is nothing to cross-fade with, and the cue
  // sounds exactly as written.
  if (octave === 0) return [{ pitch: 1, gain: 1 }]
  const upper = Math.pow(Math.cos((Math.PI * octave) / 2), 2)
  const voices: ComboVoice[] = []
  if (upper > QUIET_VOICE) voices.push({ pitch: Math.pow(2, octave), gain: upper })
  if (1 - upper > QUIET_VOICE) voices.push({ pitch: Math.pow(2, octave - 1), gain: 1 - upper })
  return voices
}

/**
 * How far the cue's reverb send has opened up after `plays` — 1 at the root,
 * `combo.bloom` once a full octave has been climbed, and held there.
 *
 * Saturating inside the first octave is deliberate: it has to stop changing
 * before the pitch wraps, or the wrap stops being seamless.
 */
export function comboBloom(combo: ComboSpec | undefined, plays: number): number {
  if (!combo?.bloom || combo.steps.length < 2) return 1
  const reach = Math.min(Math.max(plays, 0), combo.steps.length - 1) / (combo.steps.length - 1)
  return 1 + (combo.bloom - 1) * reach
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
 * How far along the climb the next play sits, given the gap since the last one.
 * Long gap → back to the root; otherwise one rung further, forever. Nothing
 * caps it: the ladder wraps (`comboOctave`) and the register doesn't move
 * (`comboVoicing`), so an unbounded count is a bounded sound.
 */
export function nextComboIndex(previous: number, elapsedMs: number, combo: ComboSpec): number {
  if (elapsedMs > combo.resetMs) return 0
  return previous + 1
}

/**
 * How far one play of a cue may drift from the play before it — the reason no
 * two presses in the app are the same sound.
 *
 * A synthesizer gives itself away by being perfect: the fortieth click of an
 * afternoon is bit-for-bit the first, and the ear files a sound that never
 * changes as a machine. Nothing tapped, brushed or struck in a room sounds the
 * same twice, so every play is nudged — a fraction of a decibel in level, a
 * few cents in pitch, a few percent in where the paper's noise sits.
 *
 * The tuned part is on a very short leash. Three cents is well under what
 * anyone hears as out of tune, and it moves the whole cue together, so the
 * intervals inside a cue stay pure and two cues ringing at once stay in the
 * key. Noise has no pitch to protect, so it can wander a lot further.
 */
export const VARIATION = {
  /** Level of the whole cue, ± dB. */
  gainDb: 0.8,
  /** Every tone in the cue, moved together, ± cents. */
  toneCents: 3,
  /** Every noise filter in the cue, moved together, ± cents. */
  noiseCents: 80,
} as const

/** One play's drift, as multipliers — all three are 1 for a play exactly as written. */
export interface PlayVariation {
  /** Level multiplier for the whole cue. */
  gain: number
  /** Frequency multiplier for every tone. */
  pitch: number
  /** Frequency multiplier for every noise filter. */
  grain: number
}

/** Draw one play's drift. `random` is injectable so the bounds can be tested. */
export function playVariation(random: () => number = Math.random): PlayVariation {
  const spread = () => Math.min(1, Math.max(-1, random() * 2 - 1))
  return {
    gain: Math.pow(10, (spread() * VARIATION.gainDb) / 20),
    pitch: Math.pow(2, (spread() * VARIATION.toneCents) / 1200),
    grain: Math.pow(2, (spread() * VARIATION.noiseCents) / 1200),
  }
}

/**
 * One key for the whole app: C major.
 *
 * Cues overlap all the time — a press lands in a chime's tail, a level-up
 * rings out over the session fanfare, a combo climbs over its own reverb — and
 * two sounds that are each lovely on their own can still be sour together. So
 * every note in the catalogue is written from the pentatonic of one key: C D
 * E G A, the five notes with no semitone between any two of them. However the
 * cues stack, there is no pair that can clash.
 *
 * A climb transposes a cue, so on its upper rungs a cue can reach the rest of
 * the scale — `correct`'s fifth, walked up the pentatonic, touches B — but
 * never leaves it. The struck partials are exempt from both rules: an octave
 * and a twelfth above a note are that note's own harmonics, consonant with it
 * by definition. `soundConfig.test.ts` holds every recipe to this.
 */
export const KEY = {
  /** C major, in semitones above C. Every note, on every rung of every climb. */
  scale: [0, 2, 4, 5, 7, 9, 11],
  /** Its pentatonic. Every note as written. */
  pentatonic: [0, 2, 4, 7, 9],
} as const

// Equal-tempered reference pitches (Hz), so the recipes below read musically.
// All of them are in the key's pentatonic — see `KEY`.
const C2 = 65.41
const D2 = 73.42
const G2 = 98.0
const A2 = 110.0
const C3 = 130.81
const D3 = 146.83
const G3 = 196.0
const A3 = 220
const C4 = 261.63
const D4 = 293.66
const E4 = 329.63
const G4 = 392.0
const A4 = 440.0
const C5 = 523.25
const D5 = 587.33
const E5 = 659.25
const G5 = 783.99
const A5 = 880.0

/**
 * One struck note — the voice every chime is built from: a soft mallet on a
 * tuned wooden bar, closer to a marimba than to a bell.
 *
 * What makes a note read as *hit* rather than generated is its first few
 * milliseconds, not its tail. So the fundamental — a sine, the roundest tone
 * there is — carries almost everything, and two quiet partials sit on top of
 * it for the strike alone: the octave for the first fifth of the note, and the
 * double octave for its first few hundredths of a second. That second one is
 * a marimba's own overtone (a bar is cut so its second mode sits two octaves
 * up), and it is what the ear hears as wood. Both are gone long before the
 * note is, so what rings is a plain round tone.
 *
 * The bell this replaced held its partials up for a third of every note and
 * stacked sine sparkle an octave over the landings. That read as metal, and
 * metal ringing between 1 and 3 kHz — right where the ear is most sensitive —
 * is what turns a chime from sweet to sharp. See rule 6 in
 * `docs/sound-design.md`.
 */
function strike(
  freq: number,
  opts: { at: number; dur: number; gain?: number; attack?: number; hold?: number },
): ToneSpec[] {
  const { at, dur, gain = 0.6, attack = 0.008, hold } = opts
  return [
    { at, dur, freq, type: 'sine', gain, attack, hold },
    { at, dur: dur * 0.2, freq: freq * 2, type: 'sine', gain: gain * 0.1, attack: attack * 0.7 },
    { at, dur: Math.min(0.03, dur * 0.1), freq: freq * 4, type: 'sine', gain: gain * 0.05, attack: 0.002 },
  ]
}

/**
 * The mallet itself: a few milliseconds of low, wide noise at the moment of
 * the strike — felt on wood, not a stick on metal. Inaudible as its own event,
 * but without it the notes fade up out of nowhere and lose their sense of
 * impact. Pitched well under 1 kHz so it lands as a soft knock rather than a
 * tick on the front of every chime.
 */
function mallet(at = 0, gain = 0.16): NoiseSpec {
  return { at, dur: 0.016, from: 1100, to: 500, type: 'bandpass', q: 0.7, gain, swell: 0 }
}

/**
 * The press — a mouse button's click, not a note.
 *
 * A switch makes two sounds at once: the snap of the contact, a few
 * milliseconds of bright broadband noise, and the knock of the housing around
 * it, a short hollow resonance lower down. `CLICK` is that pair, all noise and
 * no oscillator, so there is no pitch in it to hear as a tone. (It used to
 * carry a falling sine edge, which is what made every press in the app sound
 * faintly like a toy.) Each click reads a fresh stretch of the noise, so no two
 * are the same, the way no two presses of a real button are.
 *
 * `PRESS_THUD` is the weight underneath: a low sine that drops away inside
 * three hundredths of a second, far too short to carry a pitch. It's reserved
 * for presses that moved something — the `press` cue on solid, primary-action
 * buttons. Stacked under every control instead, an afternoon of studying
 * sounds like someone knocking on a desk.
 */
const CLICK_SNAP: NoiseSpec = { at: 0, dur: 0.005, from: 3600, to: 2400, type: 'bandpass', q: 0.9, gain: 0.38, swell: 0 }
const CLICK_SHELL: NoiseSpec = { at: 0, dur: 0.018, from: 1300, to: 900, type: 'bandpass', q: 2, gain: 0.52, swell: 0 }
const CLICK: NoiseSpec[] = [CLICK_SNAP, CLICK_SHELL]
const PRESS_THUD: ToneSpec = { at: 0, dur: 0.035, freq: G3, glide: C3, type: 'sine', gain: 0.3, attack: 0.002 }

/**
 * Quiz Battle's cues (docs/quiz-battle.md). A battle is a game, not a study
 * session, so it gets a few sounds a quiz doesn't — a buzzer, a count-in, a
 * clock — but they are built from the same parts and held to the same rules:
 * struck notes from the one key, rounded off, in the small room or dry. A
 * wrong answer is still silent; a race has no buzzer for a miss either.
 */
const BATTLE_RECIPES: Record<
  'buzz' | 'countIn' | 'go' | 'lockIn' | 'opponentIn' | 'steal' | 'clockTick' | 'matchFound' | 'reaction',
  SoundRecipe
> = {
  buzz: {
    // Claiming the question. It has to cut through a room of two people
    // thinking hard, so it is the quickest rise in the catalogue: a hard knock
    // and two struck notes a fourth apart, 50 ms between them, with a low G
    // glide under it that gives the press its weight. Up, and out of the way.
    gain: 0.46,
    throttleMs: 150,
    lowpass: 3200,
    space: 0.12,
    noise: [
      { at: 0, dur: 0.02, from: 2200, to: 1200, type: 'bandpass', q: 1, gain: 0.3, swell: 0 },
      mallet(0, 0.2),
    ],
    tones: [
      ...strike(G4, { at: 0, dur: 0.18, gain: 0.55 }),
      ...strike(C5, { at: 0.05, dur: 0.4, gain: 0.66, hold: 0.02 }),
      { at: 0, dur: 0.3, freq: G2, glide: C3, type: 'sine', gain: 0.2, attack: 0.005 },
    ],
  },
  countIn: {
    // The 3, 2, 1: a woodblock on G4, dry and short — three of them, a second
    // apart, then `go` an octave up. The oldest count-in there is, because
    // everyone already knows what it means.
    gain: 0.3,
    throttleMs: 300,
    lowpass: 3600,
    noise: [mallet(0, 0.24)],
    tones: [...strike(G4, { at: 0, dur: 0.12, gain: 0.56 })],
  },
  go: {
    // The question on the table: paper laid down, and the count-in's note an
    // octave up, held a moment, over a low G. The one bright moment of a
    // round's start — everything after it is the players' to fill.
    gain: 0.42,
    throttleMs: 300,
    lowpass: 3400,
    space: 0.14,
    noise: [
      { at: 0, dur: 0.12, from: 800, to: 2200, type: 'bandpass', q: 0.8, gain: 0.22, swell: 0.4 },
      mallet(0.02, 0.18),
    ],
    tones: [
      ...strike(G5, { at: 0.02, dur: 0.45, gain: 0.62, hold: 0.03 }),
      { at: 0.02, dur: 0.5, freq: G3, type: 'sine', gain: 0.16, attack: 0.02 },
    ],
  },
  lockIn: {
    // An answer committed where the other player can't see it: a click with a
    // low struck D inside it — the sound of a latch, not of a result. It says
    // nothing about right or wrong, because nothing is known yet.
    gain: 0.28,
    throttleMs: 120,
    lowpass: 3000,
    noise: [...CLICK],
    tones: [
      ...strike(D4, { at: 0.004, dur: 0.14, gain: 0.5 }),
      { at: 0, dur: 0.05, freq: G3, glide: D3, type: 'sine', gain: 0.22, attack: 0.002 },
    ],
  },
  opponentIn: {
    // The other player has locked in: two soft knocks, felt more than heard,
    // and no note at all — it's pressure, not news. Quieter than a click.
    gain: 0.26,
    throttleMs: 300,
    lowpass: 2400,
    noise: [
      { at: 0, dur: 0.02, from: 1000, to: 700, type: 'bandpass', q: 2.2, gain: 0.5, swell: 0 },
      { at: 0.09, dur: 0.02, from: 900, to: 600, type: 'bandpass', q: 2.2, gain: 0.42, swell: 0 },
    ],
  },
  steal: {
    // Taking it off the other player. `correct` would undersell it, so this
    // replaces it: a swoop up an octave underneath, then a fifth struck on the
    // way up and landed on A — the most a single right answer ever gets.
    gain: 0.5,
    throttleMs: 200,
    lowpass: 3200,
    space: 0.2,
    noise: [
      { at: 0, dur: 0.18, from: 600, to: 2400, type: 'bandpass', q: 0.7, gain: 0.24, swell: 0.6 },
      mallet(0.12, 0.2),
    ],
    tones: [
      { at: 0, dur: 0.22, freq: A3, glide: A4, type: 'sine', gain: 0.26, attack: 0.03 },
      ...strike(E5, { at: 0.12, dur: 0.26, gain: 0.52 }),
      ...strike(A5, { at: 0.2, dur: 0.46, gain: 0.64, hold: 0.03 }),
      { at: 0.12, dur: 0.5, freq: A2, type: 'sine', gain: 0.16, attack: 0.02 },
    ],
  },
  clockTick: {
    // The last seconds of a question: a clock's escapement, once a second. A
    // tick and the knock of the case under it, pure noise like the click it
    // is kin to — a pitch here would be a note sounding every second.
    gain: 0.3,
    throttleMs: 400,
    lowpass: 5000,
    noise: [
      { at: 0, dur: 0.008, from: 3000, to: 2400, type: 'bandpass', q: 1.6, gain: 0.4, swell: 0 },
      { at: 0.002, dur: 0.03, from: 1400, to: 900, type: 'bandpass', q: 2.4, gain: 0.46, swell: 0 },
    ],
  },
  matchFound: {
    // Someone to play: a door opening onto a room — a noise swell — and two
    // struck notes a fifth apart, D up to A, the second held. Brighter than a
    // level-up, which is about you; this is about somebody arriving.
    gain: 0.48,
    throttleMs: 400,
    lowpass: 3200,
    space: 0.22,
    noise: [
      { at: 0, dur: 0.24, from: 500, to: 2000, type: 'bandpass', q: 0.7, gain: 0.24, swell: 0.6 },
      mallet(0.12, 0.18),
      mallet(0.24, 0.16),
    ],
    tones: [
      ...strike(D5, { at: 0.12, dur: 0.26, gain: 0.52 }),
      ...strike(A5, { at: 0.24, dur: 0.55, gain: 0.64, hold: 0.05 }),
      { at: 0.12, dur: 0.66, freq: D3, type: 'sine', gain: 0.16, attack: 0.03 },
    ],
  },
  reaction: {
    // An emoji from the other player: a small bubble — a sine that bends from
    // C up to G as it pops, with the faintest tap on the front. Friendly, brief,
    // and well under anything that means the game moved.
    gain: 0.28,
    throttleMs: 250,
    lowpass: 3000,
    noise: [{ at: 0, dur: 0.01, from: 1600, to: 1100, type: 'bandpass', q: 1.2, gain: 0.2, swell: 0 }],
    tones: [
      { at: 0, dur: 0.14, freq: C5, glide: G5, type: 'sine', gain: 0.5, attack: 0.01 },
      { at: 0, dur: 0.16, freq: C2, type: 'sine', gain: 0.08, attack: 0.01 },
    ],
  },
}

export const SOUND_RECIPES: Record<SoundEvent, SoundRecipe> = {
  // ---- interface ----------------------------------------------------------
  click: {
    // The default for every button, link and menu item: the switch click and
    // nothing else.
    gain: 0.38,
    throttleMs: 35,
    lowpass: 9000,
    noise: CLICK,
  },
  press: {
    // The weighty one: the same click with the thud underneath. Used for solid
    // primary actions (see `components/ui/button.tsx`) and anywhere a press
    // should feel like it moved something — `data-sound="press"`.
    gain: 0.26,
    throttleMs: 40,
    lowpass: 9000,
    noise: CLICK,
    tones: [PRESS_THUD],
  },
  select: {
    // The click, and a soft wooden tock a hair behind it — picked, not just
    // pressed. Short and low enough to read as the knock of a key settling
    // rather than a beep.
    gain: 0.32,
    throttleMs: 35,
    lowpass: 4000,
    noise: CLICK,
    tones: [{ at: 0.004, dur: 0.07, freq: D5, type: 'sine', gain: 0.1, attack: 0.005 }],
  },
  tick: {
    // Ticking a box in a list — a topic, a concept, a question. A pen mark:
    // a smaller, higher snap than a click, with a tighter knock under it and
    // nothing else, so running down a list of topics reads as a row of ticks
    // rather than a row of presses. The throttle is short enough that a fast
    // run down the list still marks every row.
    gain: 0.36,
    throttleMs: 30,
    lowpass: 8000,
    noise: [
      { at: 0, dur: 0.005, from: 4400, to: 3400, type: 'bandpass', q: 1.1, gain: 0.36, swell: 0 },
      { at: 0, dur: 0.012, from: 2200, to: 1700, type: 'bandpass', q: 2.4, gain: 0.36, swell: 0 },
    ],
  },
  toggleOn: {
    // The click, with a soft glide up underneath it — the only press that
    // keeps a direction, because on and off have to sound different.
    gain: 0.32,
    throttleMs: 40,
    lowpass: 4000,
    noise: CLICK,
    tones: [{ at: 0.008, dur: 0.1, freq: A4, glide: E5, type: 'sine', gain: 0.14, attack: 0.008 }],
  },
  toggleOff: {
    gain: 0.3,
    throttleMs: 40,
    lowpass: 4000,
    noise: CLICK,
    tones: [{ at: 0.008, dur: 0.1, freq: E5, glide: A4, type: 'sine', gain: 0.12, attack: 0.008 }],
  },
  navigate: {
    // A short low whoosh — movement, without announcing itself. No note: a
    // chime on every change of page is a chime you stop hearing by lunch.
    gain: 0.26,
    throttleMs: 80,
    noise: [{ at: 0, dur: 0.16, from: 900, to: 2200, type: 'bandpass', q: 0.7, gain: 0.2, swell: 0.4 }],
    lowpass: 4200,
  },
  actions: {
    // Opening a flashcard's own actions menu: the click plus a quick soft
    // chirp upward — a little more "something unfolded" than a plain click,
    // without the weight of a full `open` panel slide.
    gain: 0.3,
    throttleMs: 45,
    lowpass: 4400,
    noise: CLICK,
    tones: [{ at: 0.006, dur: 0.07, freq: C5, glide: E5, type: 'sine', gain: 0.1, attack: 0.006 }],
  },

  // ---- paper --------------------------------------------------------------
  open: {
    // A sheet sliding out from under another: a broad noise swell whose
    // bandpass rises as the panel travels, with a little low-end weight so it
    // feels like an object moved rather than a hiss.
    gain: 0.34,
    throttleMs: 120,
    noise: [
      { at: 0, dur: 0.3, from: 480, to: 3000, type: 'bandpass', q: 0.75, gain: 0.27, swell: 0.45 },
      { at: 0.02, dur: 0.26, from: 1400, to: 2400, type: 'highpass', q: 0.4, gain: 0.12, swell: 0.55 },
    ],
    tones: [{ at: 0, dur: 0.16, freq: D3, glide: A2, type: 'sine', gain: 0.16, attack: 0.03 }],
    lowpass: 6500,
  },
  close: {
    // The same gesture reversed and a touch shorter — sheet sliding back in.
    gain: 0.3,
    throttleMs: 120,
    noise: [
      { at: 0, dur: 0.24, from: 2800, to: 650, type: 'bandpass', q: 0.75, gain: 0.27, swell: 0.3 },
    ],
    tones: [{ at: 0.06, dur: 0.14, freq: C3, glide: G2, type: 'sine', gain: 0.14, attack: 0.03 }],
    lowpass: 6000,
  },
  page: {
    // A quick flick past one sheet to the next — one card turning over, or a
    // page already open being returned to. Stepping *through* a sequence is
    // `ruffle`, which is the same gesture done small enough to repeat.
    gain: 0.28,
    throttleMs: 70,
    noise: [{ at: 0, dur: 0.13, from: 1100, to: 3200, type: 'bandpass', q: 0.9, gain: 0.26, swell: 0.35 }],
    lowpass: 7000,
  },
  ruffle: {
    // Stepping through a sequence — the Previous / Next footers and the
    // position bar above them, in the concept popup, the PDF reader, flashcard
    // study, mistakes review and math focus.
    //
    // This is the most-repeated cue in the app after the press transient, and
    // the only one that fires *while a finger is still moving*: a drag along
    // the bar sounds it once per stop it crosses, a dozen-plus times a second
    // until the throttle catches it. So it is written to survive repetition
    // rather than to be noticed — the quietest thing in the catalogue, a
    // half-octave darker than `page`, and over in 70 ms.
    //
    // Three short brushes rather than one sweep. A single burst repeated
    // quickly reads as a stutter of the same sound; three of them fanning past
    // under one small swell reads as sheets moving against each other, which
    // is what makes a drag sound like thumbing a stack instead of like a
    // machine gun. The brushes fall in pitch and fade as they go, so the cue
    // settles rather than arriving — nothing here should feel like an event.
    gain: 0.18,
    throttleMs: 40,
    lowpass: 4800,
    noise: [
      { at: 0,     dur: 0.07,  from: 1500, to: 700,  type: 'bandpass', q: 0.8, gain: 0.14, swell: 0.3 },
      { at: 0,     dur: 0.012, from: 2200, to: 1500, type: 'bandpass', q: 1.3, gain: 0.13, swell: 0 },
      { at: 0.022, dur: 0.012, from: 2000, to: 1400, type: 'bandpass', q: 1.3, gain: 0.1,  swell: 0 },
      { at: 0.042, dur: 0.011, from: 1800, to: 1300, type: 'bandpass', q: 1.3, gain: 0.07, swell: 0 },
    ],
  },
  shuffle: {
    // A quick riffle: short noise ticks fanning past like a thumbed stack of
    // cards, under one soft paper swell for body — the deck family's take on
    // "several sheets moving at once" rather than one.
    gain: 0.32,
    throttleMs: 150,
    lowpass: 6500,
    noise: [
      { at: 0,     dur: 0.16,  from: 500,  to: 2200, type: 'bandpass', q: 0.7, gain: 0.2,  swell: 0.4 },
      { at: 0.01,  dur: 0.02,  from: 2800, to: 2000, type: 'bandpass', q: 1.1, gain: 0.24, swell: 0 },
      { at: 0.04,  dur: 0.02,  from: 3000, to: 2100, type: 'bandpass', q: 1.1, gain: 0.22, swell: 0 },
      { at: 0.07,  dur: 0.018, from: 3100, to: 2200, type: 'bandpass', q: 1.1, gain: 0.2,  swell: 0 },
      { at: 0.095, dur: 0.018, from: 3000, to: 2200, type: 'bandpass', q: 1.1, gain: 0.17, swell: 0 },
      { at: 0.118, dur: 0.016, from: 2800, to: 2100, type: 'bandpass', q: 1.1, gain: 0.13, swell: 0 },
    ],
  },

  fileAway: {
    // One finished card sliding off the deck: paper leaving, and a small
    // struck note on top of it so the card lands somewhere rather than just
    // stopping. It fires once per card in a run that can be twenty long, which
    // is why it's the quietest thing in the paper family and why it climbs —
    // the pitch rising card after card is the sound of the deck emptying.
    //
    // Same pentatonic rungs as `correct`, and for the same reason: the wrap
    // from the last rung back to the root has to be a step like any other, so
    // a nineteen-card sweep keeps rising the whole way down the deck. Rooted
    // on C like `correct` too, so every rung is a note of the key. No
    // `bloom` — the cue is dry, and twenty reverb tails overlapping is not a
    // sweep, it's a wash.
    gain: 0.22,
    throttleMs: 55,
    lowpass: 3600,
    combo: { steps: [0, 2, 4, 7, 9], resetMs: 1500 },
    noise: [{ at: 0, dur: 0.12, from: 2400, to: 700, type: 'bandpass', q: 0.8, gain: 0.24, swell: 0.25 }],
    tones: [...strike(C5, { at: 0.02, dur: 0.18, gain: 0.36 })],
  },

  // ---- reward -------------------------------------------------------------
  //
  // Every chime below is built the same way: struck notes (`strike`) in the
  // middle register, short, rounded off hard above ~3 kHz, and in a small room.
  // Nothing sustains above 1 kHz and nothing takes more than a second to die
  // away — a chime you hear forty times a session should land and get out of
  // the way, not ring out over the next question.
  correct: {
    // The headline cue, and the one that fires most: an ascending perfect
    // fifth struck on wooden bars — root and fifth, no third, so a whole quiz's
    // worth of these stays a chime rather than forty tiny fanfares. Each note
    // rings a few times longer than the 85 ms between them, so both are
    // sounding together at the end — a chord, not a call-and-response — and the
    // second note is louder, so it lands instead of trailing off. A low C3 sits
    // underneath for weight, and a small room behind it.
    //
    // The combo is the other half: a right answer after a right answer comes
    // back higher, and it never stops doing that. The rungs are the major
    // pentatonic — the scale with no wrong notes in it — so every step of a run
    // is consonant with the one before, and the climb wraps at the octave under
    // a Shepard cross-fade (see `comboVoicing`) so it can rise for a
    // thirty-answer streak without ever climbing out of its register. What
    // grows instead of the register is the room: `bloom` opens the reverb up
    // across the first five, which is what a long run sounds like. Miss one and
    // the quiz calls `resetSoundCombo` — the pitch drops back to C and the room
    // closes with it.
    // Quietest of the celebration cues on purpose: it fires forty times to
    // `complete`'s one, and the hierarchy has to hold.
    gain: 0.42,
    throttleMs: 90,
    lowpass: 3200,
    space: 0.16,
    combo: { steps: [0, 2, 4, 7, 9], resetMs: 90_000, bloom: 1.5 },
    noise: [mallet()],
    tones: [
      ...strike(C5, { at: 0, dur: 0.3, gain: 0.6 }),
      ...strike(G5, { at: 0.085, dur: 0.42, gain: 0.74, hold: 0.02 }),
      { at: 0, dur: 0.45, freq: C3, type: 'sine', gain: 0.16, attack: 0.02 },
    ],
  },
  addToDeck: {
    // A card filed into the study deck: a soft thud plus one struck note —
    // lighter than `collect`, since this is just adding a card to a list, not
    // the ceremony. Barely any room on it.
    gain: 0.33,
    throttleMs: 90,
    lowpass: 3200,
    space: 0.1,
    noise: [{ at: 0, dur: 0.05, from: 900, to: 400, type: 'bandpass', q: 0.9, gain: 0.3, swell: 0.15 }],
    tones: [...strike(D5, { at: 0.01, dur: 0.22, gain: 0.44 })],
  },
  collect: {
    // The card landing in the deck: paper first, then a sixth higher, struck,
    // over a low G. The ceremony earns a touch more room than anything else at
    // this size, and still stops well inside a second.
    gain: 0.5,
    throttleMs: 150,
    lowpass: 3400,
    space: 0.22,
    noise: [
      { at: 0, dur: 0.2, from: 900, to: 2600, type: 'bandpass', q: 0.8, gain: 0.3, swell: 0.4 },
      mallet(0.05),
    ],
    tones: [
      ...strike(G4, { at: 0.05, dur: 0.3, gain: 0.55 }),
      ...strike(E5, { at: 0.14, dur: 0.5, gain: 0.68, hold: 0.03 }),
      { at: 0.02, dur: 0.55, freq: G3, type: 'sine', gain: 0.16, attack: 0.03 },
    ],
  },
  levelUp: {
    // A proper fanfare, in two strokes: a struck pickup, then the octave above
    // it, struck again and held. The rhythm is the point — an even run is a
    // scale exercise, a pickup into a held arrival is an announcement.
    //
    // Pitched an octave under `correct`'s landing: a level-up is the weightier
    // moment, and weight is register, not brightness. The fifth enters
    // underneath the landing as harmony rather than as a third event.
    gain: 0.54,
    throttleMs: 200,
    lowpass: 3000,
    space: 0.24,
    noise: [mallet(), mallet(0.16, 0.14)],
    tones: [
      ...strike(C4, { at: 0, dur: 0.3, gain: 0.5 }),
      ...strike(C5, { at: 0.16, dur: 0.6, gain: 0.68, hold: 0.06 }),
      { at: 0.16, dur: 0.55, freq: G4, type: 'sine', gain: 0.12, attack: 0.05 },
      { at: 0, dur: 0.7, freq: C3, type: 'sine', gain: 0.18, attack: 0.03 },
    ],
  },
  levelUpStep: {
    // Several concepts leveling up in one sitting, on the quiz-completion
    // ceremony: playing the full `levelUp` fanfare for every card in a row
    // stops sounding like several separate wins the moment it repeats, so only
    // a lone level-up gets the fanfare. A run of them gets this instead — one
    // struck note per card, a rung higher each time, the same climbing sweep
    // `fileAway` uses for a deck of cards clearing. No pickup, no re-struck
    // landing: the climb itself is the ceremony. It climbs from C, so every
    // rung stays in the key.
    gain: 0.44,
    throttleMs: 150,
    lowpass: 3200,
    space: 0.18,
    combo: { steps: [0, 2, 4, 7, 9], resetMs: 2500 },
    noise: [mallet(0, 0.2)],
    tones: [
      ...strike(C5, { at: 0, dur: 0.4, gain: 0.62, hold: 0.02 }),
      { at: 0, dur: 0.45, freq: C3, type: 'sine', gain: 0.16, attack: 0.02 },
    ],
  },
  reward: {
    // Gems: a coin dropping into the purse. A small soft clink, then two
    // struck notes a fourth apart — the platformer pickup interval, on A and D
    // so it sits in the key — with the second one held. Quick; it fires once
    // per quest, several in a row.
    gain: 0.38,
    throttleMs: 60,
    lowpass: 3400,
    space: 0.16,
    noise: [{ at: 0, dur: 0.01, from: 3000, to: 2200, type: 'bandpass', q: 1.4, gain: 0.16, swell: 0 }],
    tones: [
      ...strike(A4, { at: 0, dur: 0.14, gain: 0.5, attack: 0.005 }),
      ...strike(D5, { at: 0.055, dur: 0.32, gain: 0.56, attack: 0.005, hold: 0.02 }),
    ],
  },
  streak: {
    // The flame catching: a warm swell that rises into two struck notes a
    // fourth apart, the second held. The glide underneath does the catching;
    // the struck notes are the flame taking.
    gain: 0.44,
    throttleMs: 200,
    lowpass: 3000,
    space: 0.24,
    noise: [{ at: 0, dur: 0.36, from: 300, to: 1400, type: 'bandpass', q: 0.6, gain: 0.26, swell: 0.6 }],
    tones: [
      { at: 0, dur: 0.5, freq: A3, glide: A4, type: 'sine', gain: 0.3, attack: 0.06 },
      ...strike(E4, { at: 0.16, dur: 0.32, gain: 0.5 }),
      ...strike(A4, { at: 0.28, dur: 0.55, gain: 0.6, hold: 0.04 }),
      { at: 0.28, dur: 0.5, freq: E5, type: 'sine', gain: 0.1, attack: 0.06 },
    ],
  },
  complete: {
    // Session over — the biggest cue in the app, and the only one allowed a
    // full second. Same two-stroke shape as `levelUp` and, since they are
    // deliberately the same phrase, the same two notes: pickup, then the octave
    // struck again and held. Wider in every other dimension — the pickup is
    // slower, the arrival holds longer, and a soft root-third-fifth settles in
    // underneath so the whole thing comes to rest on a chord instead of just
    // stopping. Length and weight are what make this the finale; it doesn't
    // need an extra note to outrank a level-up.
    // The loudest thing the app ever plays, and the only cue allowed to be.
    gain: 0.56,
    throttleMs: 250,
    lowpass: 2800,
    space: 0.3,
    noise: [mallet(), mallet(0.2, 0.14)],
    tones: [
      ...strike(C4, { at: 0, dur: 0.4, gain: 0.5 }),
      ...strike(C5, { at: 0.2, dur: 0.8, gain: 0.68, hold: 0.1 }),
      { at: 0.2, dur: 0.8, freq: G4, type: 'sine', gain: 0.12, attack: 0.1 },
      { at: 0.2, dur: 0.8, freq: E4, type: 'sine', gain: 0.1, attack: 0.12 },
      { at: 0, dur: 1.0, freq: C3, type: 'sine', gain: 0.18, attack: 0.06 },
    ],
  },
  begin: {
    // Pressing Start Quiz — the one cue in the app that *starts* something.
    // Everything else marks a thing that just happened, so everything else can
    // be a chime. This one has to make you want to go, which means it needs a
    // run-up: nothing in a catalogue of 200 ms acknowledgements feels like
    // momentum, because momentum is a thing you can only hear over time.
    //
    // So the first quarter-second is all anticipation and no melody. A sub
    // spins up from D2 to D3 under a noise sweep opening from a rumble to a
    // hiss, and over the top of it three soft ticks count in — spaced 90, 65
    // and 45 ms apart, closing up as they go. The acceleration is the trick: an
    // even count-in tells you exactly when the launch lands, a tightening one
    // arrives a beat before you expect it, and the surprise is what reads as
    // being fired out of something.
    //
    // Then a single struck note, and it stops there. Opening a quiz is *two*
    // presses — this one, then the concept list's Start Quiz — so the bugle is
    // split across them: this half is the count-in and the D it lands on,
    // `launch` is the rest of the phrase. Ending on one note is what leaves it
    // hanging, and a cue that hangs is a cue you want to answer.
    gain: 0.5,
    throttleMs: 260,
    lowpass: 3200,
    space: 0.2,
    noise: [
      // The runway: a slow swell from rumble to air, gone by the launch.
      { at: 0, dur: 0.26, from: 420, to: 2200, type: 'bandpass', q: 0.6, gain: 0.3, swell: 0.75 },
      // The count-in, accelerating into the strike.
      { at: 0.02, dur: 0.012, from: 1800, to: 1300, type: 'bandpass', q: 1.2, gain: 0.18, swell: 0 },
      { at: 0.11, dur: 0.012, from: 2000, to: 1400, type: 'bandpass', q: 1.2, gain: 0.22, swell: 0 },
      { at: 0.175, dur: 0.012, from: 2200, to: 1500, type: 'bandpass', q: 1.2, gain: 0.26, swell: 0 },
      mallet(0.22, 0.22),
    ],
    tones: [
      // The spin-up: an octave of sub underneath the count-in. Felt, not heard.
      { at: 0, dur: 0.3, freq: D2, glide: D3, type: 'sine', gain: 0.22, attack: 0.08 },
      // The note the count-in was counting into.
      ...strike(D4, { at: 0.22, dur: 0.55, gain: 0.66, hold: 0.04 }),
      { at: 0.22, dur: 0.6, freq: D3, type: 'sine', gain: 0.18, attack: 0.04 },
    ],
  },
  launch: {
    // The second Start Quiz — the one on the pre-quiz concept list, the press
    // that actually puts a question on screen.
    //
    // It is the back half of `begin`'s bugle: up a fourth to G, up a whole tone
    // to A, struck on the way and held on arrival. Two presses, one phrase —
    // whatever happened in between (collecting three cards, reading a
    // definition), the launch picks up exactly where it stopped.
    //
    // What it deliberately does *not* have is a second run-up. You were counted
    // in once already; doing it again would make the gate feel like a second
    // beginning rather than the end of the first. So there's no count-in and no
    // spin-up — one short sweep under an immediate strike, and it's away.
    //
    // It still stops on the *fifth* above where `begin` started, not the
    // octave. A quiz is being opened, not concluded: resolving home is
    // `complete`'s job, and the unresolved fifth is the whole reason this leans
    // forward instead of sitting down.
    gain: 0.5,
    throttleMs: 260,
    lowpass: 3200,
    space: 0.22,
    noise: [
      // The door, not a runway: a short sweep that's gone by the arrival.
      { at: 0, dur: 0.12, from: 900, to: 2400, type: 'bandpass', q: 0.7, gain: 0.24, swell: 0.5 },
      mallet(0, 0.22),
      mallet(0.1, 0.2),
    ],
    tones: [
      ...strike(G4, { at: 0, dur: 0.28, gain: 0.5 }),
      ...strike(A4, { at: 0.1, dur: 0.55, gain: 0.68, hold: 0.05 }),
      // The same low D as `begin`'s landing, so the two halves sound like one
      // instrument picked back up.
      { at: 0.1, dur: 0.6, freq: D3, type: 'sine', gain: 0.18, attack: 0.04 },
    ],
  },
  study: {
    // Settling in to study — the flashcard deck coming up in front of you.
    //
    // The temptation is to reuse a reward cue here, and it's the wrong instinct:
    // opening your deck is not an achievement, and congratulating someone for
    // pressing Study is how a cue wears out. So this one deliberately has no
    // triad and no third in it — just an open fifth, which is the interval with
    // no mood attached. The darkest lowpass in the catalogue, and it *opens*
    // instead of arriving: a soft A5 fades in over the held fifth across a
    // fifth of a second, like a lamp coming up over a desk.
    //
    // It starts on paper, not on a note — the deck squared off on the desk, a
    // short downward sweep with the mallet landing in it — so it stays in the
    // same physical world as the rest of the flashcard family (`shuffle`,
    // `fileAway`, `page`) rather than sounding like a prize.
    gain: 0.54,
    throttleMs: 220,
    lowpass: 2400,
    space: 0.14,
    noise: [
      { at: 0, dur: 0.11, from: 1200, to: 380, type: 'bandpass', q: 0.8, gain: 0.3, swell: 0.18 },
      mallet(0.05, 0.14),
    ],
    tones: [
      ...strike(A4, { at: 0.05, dur: 0.28, gain: 0.44 }),
      ...strike(E5, { at: 0.15, dur: 0.5, gain: 0.56, hold: 0.04 }),
      // The lamp: a slow swell over the fifth, the only voice here that isn't
      // struck.
      { at: 0.15, dur: 0.5, freq: A5, type: 'sine', gain: 0.08, attack: 0.18 },
      { at: 0, dur: 0.6, freq: A2, type: 'sine', gain: 0.18, attack: 0.05 },
    ],
  },

  // ---- Quiz Battle --------------------------------------------------------
  ...BATTLE_RECIPES,
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
