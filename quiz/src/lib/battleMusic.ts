// **Quiz Battle's music** — the score, as data.
//
// A battle has a soundtrack: soft, slow, and there mostly to be noticed when it
// changes. It is generative — a fixed eight-bar harmony with a marimba line
// drawn fresh each time over it — so a long session never hears the same loop
// twice, and it has three levels of intensity the game moves it between:
//
// - **Calm** (`0`): a lobby, a reveal. Pads, a low bass, a sparse line.
// - **Play** (`1`): a question is up. A soft pulse on beats one and three, and
//   the line fills in.
// - **Pressure** (`2`): the final question, the last ten seconds, someone holding
//   the floor. The pulse on every beat, the line busier, a shaker on the
//   off-beats.
//
// It keeps the catalogue's rules (docs/sound-design.md): every note is from the
// pentatonic of C major — so a cue landing on top of the music can't clash with
// it — and nothing that sustains sits above 1 kHz. This module writes the notes;
// `battleMusicPlayer.ts` plays them. Everything here is pure, with the random
// source handed in, so the rules are tested.

/** How hard the music is pushing. */
export type MusicIntensity = 0 | 1 | 2

export const MUSIC_BPM = 84
export const BEATS_PER_BAR = 4

/** Seconds per beat at the score's tempo. */
export const SECONDS_PER_BEAT = 60 / MUSIC_BPM

export type MusicVoice = 'pad' | 'bass' | 'arp' | 'pulse' | 'shaker'

export interface MusicNote {
  voice: MusicVoice
  /** Offset from the start of its beat, in beats. */
  at: number
  /** Length, in beats. */
  dur: number
  /** Hz. The shaker is noise, and carries the centre of its band here. */
  freq: number
  /** For the pulse: the pitch it falls to. */
  glide?: number
  /** Level within the music bus, 0–1. */
  gain: number
}

// The pentatonic of C major — C D E G A — across the registers the score uses.
const G1 = 49.0
const A1 = 55.0
const C2 = 65.41
const D2 = 73.42
const G3 = 196.0
const A3 = 220.0
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

export interface MusicChord {
  name: string
  /** The bass note, and the root the pulse sits on. */
  bass: number
  /** The held chord. */
  pad: number[]
  /** The notes the line may choose from over it, low to high. */
  line: number[]
}

// Four chords, every one of them from the pentatonic alone: no chord has a
// fourth or a seventh in it, so there is nowhere in the harmony for a cue's
// note to rub against.
const C: MusicChord = { name: 'C', bass: C2, pad: [C4, E4, G4], line: [G4, C5, D5, E5, G5] }
const AM: MusicChord = { name: 'Am', bass: A1, pad: [A3, C4, E4], line: [A4, C5, D5, E5, A5] }
const DSUS: MusicChord = { name: 'Dsus', bass: D2, pad: [D4, G4, A4], line: [A4, D5, E5, G5, A5] }
const G6: MusicChord = { name: 'G6', bass: G1, pad: [G3, D4, E4], line: [G4, A4, D5, E5, G5] }

/** Eight bars, then round again: the progression, and its answer. */
export const FORM: readonly MusicChord[] = [C, AM, DSUS, G6, AM, C, G6, DSUS]

export function chordAt(bar: number): MusicChord {
  return FORM[((bar % FORM.length) + FORM.length) % FORM.length]
}

/** How likely each eighth-note slot is to carry a note of the line, per intensity. */
const LINE_DENSITY: Record<MusicIntensity, number> = { 0: 0.22, 1: 0.45, 2: 0.7 }

export interface BeatState {
  bar: number
  beat: number
  /** Where the line is in its chord's `line`, so it walks rather than leaps. */
  lineIndex: number
}

/**
 * The notes of one beat, and where the line has walked to by its end.
 *
 * The pad and bass enter on a bar's first beat and are held across it; the
 * line is drawn an eighth at a time, stepping to a neighbouring note of the
 * chord more often than it jumps; the pulse and the shaker are the intensity.
 */
export function composeBeat(
  state: BeatState,
  intensity: MusicIntensity,
  random: () => number = Math.random,
): { notes: MusicNote[]; lineIndex: number } {
  const chord = chordAt(state.bar)
  const notes: MusicNote[] = []

  if (state.beat === 0) {
    // Held a little past the bar, so one chord hands over to the next.
    for (const freq of chord.pad) notes.push({ voice: 'pad', at: 0, dur: BEATS_PER_BAR + 0.5, freq, gain: 0.16 })
    notes.push({ voice: 'bass', at: 0, dur: intensity === 0 ? BEATS_PER_BAR - 0.2 : 1.8, freq: chord.bass, gain: 0.32 })
  } else if (state.beat === 2 && intensity > 0) {
    notes.push({ voice: 'bass', at: 0, dur: 1.8, freq: chord.bass, gain: 0.26 })
  }

  let lineIndex = Math.min(Math.max(0, state.lineIndex), chord.line.length - 1)
  for (const at of [0, 0.5]) {
    if (random() >= LINE_DENSITY[intensity]) continue
    const r = random()
    // Mostly a step, sometimes a repeat, now and then a leap of two.
    const step = r < 0.35 ? 1 : r < 0.7 ? -1 : r < 0.85 ? 0 : r < 0.93 ? 2 : -2
    lineIndex = Math.min(Math.max(0, lineIndex + step), chord.line.length - 1)
    const accent = state.beat === 0 && at === 0
    notes.push({ voice: 'arp', at, dur: 1.2, freq: chord.line[lineIndex], gain: accent ? 0.26 : 0.2 })
  }

  const pulseBeats = intensity === 2 ? [0, 1, 2, 3] : intensity === 1 ? [0, 2] : []
  if (pulseBeats.includes(state.beat)) {
    notes.push({ voice: 'pulse', at: 0, dur: 0.4, freq: chord.bass * 2, glide: chord.bass, gain: intensity === 2 ? 0.34 : 0.28 })
  }
  if (intensity === 2) {
    notes.push({ voice: 'shaker', at: 0.5, dur: 0.12, freq: 2600, gain: 0.05 })
  }

  return { notes, lineIndex }
}

/** The beat after this one. */
export function nextBeat(state: BeatState, lineIndex: number): BeatState {
  const beat = (state.beat + 1) % BEATS_PER_BAR
  return { bar: beat === 0 ? state.bar + 1 : state.bar, beat, lineIndex }
}

// ── The listener's choice ───────────────────────────────────────────────────
// Music is its own switch, beside the app's sound switch: someone who wants the
// buzzer and the chimes may still want to think in quiet. The app's mute
// silences both.

export const MUSIC_STORAGE_KEY = 'actuarial-notes-battle-music'

/** On unless the listener turned it off. */
export function musicFromStored(raw: string | null): boolean {
  return raw !== 'false'
}

let musicOn = true
try {
  musicOn = musicFromStored(typeof localStorage === 'undefined' ? null : localStorage.getItem(MUSIC_STORAGE_KEY))
} catch { /* private mode */ }
const musicListeners = new Set<() => void>()

export function isMusicOn(): boolean {
  return musicOn
}

export function setMusicOn(on: boolean): void {
  if (on === musicOn) return
  musicOn = on
  try { localStorage.setItem(MUSIC_STORAGE_KEY, String(on)) } catch { /* private mode */ }
  for (const listener of musicListeners) listener()
}

export function subscribeMusic(listener: () => void): () => void {
  musicListeners.add(listener)
  return () => { musicListeners.delete(listener) }
}
