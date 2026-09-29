import { describe, expect, it } from 'vitest'
import { KEY } from './soundConfig'
import {
  BEATS_PER_BAR,
  FORM,
  chordAt,
  composeBeat,
  musicFromStored,
  nextBeat,
  type BeatState,
  type MusicIntensity,
  type MusicNote,
} from './battleMusic'

/** A deterministic PRNG (mulberry32). */
function seeded(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Every note of `bars` bars at one intensity. */
function play(bars: number, intensity: MusicIntensity, seed = 1): MusicNote[] {
  const random = seeded(seed)
  let state: BeatState = { bar: 0, beat: 0, lineIndex: 2 }
  const out: MusicNote[] = []
  for (let i = 0; i < bars * BEATS_PER_BAR; i++) {
    const { notes, lineIndex } = composeBeat(state, intensity, random)
    out.push(...notes)
    state = nextBeat(state, lineIndex)
  }
  return out
}

function centsOffPentatonic(freq: number): number {
  const C0 = 16.3516
  const aboveC = ((1200 * Math.log2(freq / C0)) % 1200 + 1200) % 1200
  return Math.min(...KEY.pentatonic.flatMap(step => [step * 100, step * 100 + 1200, step * 100 - 1200])
    .map(cents => Math.abs(aboveC - cents)))
}

describe('the battle score', () => {
  it('writes every pitched note from the pentatonic, like every cue', () => {
    for (const intensity of [0, 1, 2] as const) {
      for (const note of play(16, intensity)) {
        if (note.voice === 'shaker') continue
        for (const freq of [note.freq, ...(note.glide ? [note.glide] : [])]) {
          expect(centsOffPentatonic(freq), `${note.voice} at ${freq} Hz`).toBeLessThan(12)
        }
      }
    }
  })

  it('sustains nothing above 1 kHz', () => {
    for (const note of play(16, 2)) {
      if (note.voice !== 'shaker') expect(note.freq).toBeLessThanOrEqual(1000)
    }
  })

  it('builds every chord from the pentatonic, over its own root', () => {
    for (const chord of FORM) {
      for (const freq of [chord.bass, ...chord.pad, ...chord.line]) expect(centsOffPentatonic(freq)).toBeLessThan(12)
      const lowest = Math.min(...chord.pad)
      // The pad's lowest note is the bass's pitch class.
      expect(Math.round(12 * Math.log2(lowest / chord.bass)) % 12).toBe(0)
    }
    expect(chordAt(FORM.length)).toBe(chordAt(0))
    expect(chordAt(-1)).toBe(FORM[FORM.length - 1])
  })

  it('gets busier as the intensity rises', () => {
    const density = (i: MusicIntensity) => play(32, i).length
    expect(density(1)).toBeGreaterThan(density(0))
    expect(density(2)).toBeGreaterThan(density(1))
  })

  it('keeps the pulse and the shaker for when a question is on', () => {
    const calm = play(8, 0)
    expect(calm.some(n => n.voice === 'pulse' || n.voice === 'shaker')).toBe(false)
    const playing = play(8, 1)
    expect(playing.filter(n => n.voice === 'pulse')).toHaveLength(8 * 2)
    expect(playing.some(n => n.voice === 'shaker')).toBe(false)
    const pressure = play(8, 2)
    expect(pressure.filter(n => n.voice === 'pulse')).toHaveLength(8 * 4)
    expect(pressure.filter(n => n.voice === 'shaker')).toHaveLength(8 * 4)
  })

  it('lays a chord down once a bar and holds it into the next', () => {
    const pads = play(4, 1).filter(n => n.voice === 'pad')
    expect(pads).toHaveLength(4 * 3)
    for (const pad of pads) expect(pad.dur).toBeGreaterThan(BEATS_PER_BAR)
  })

  it('walks the line rather than leaping about', () => {
    const line = play(64, 2).filter(n => n.voice === 'arp').map(n => n.freq)
    let leaps = 0
    for (let i = 1; i < line.length; i++) {
      if (Math.abs(12 * Math.log2(line[i] / line[i - 1])) > 7) leaps++
    }
    expect(leaps / line.length).toBeLessThan(0.3)
  })

  it('is the same music for the same seed, and different for another', () => {
    expect(play(8, 1, 7)).toEqual(play(8, 1, 7))
    expect(play(8, 1, 7)).not.toEqual(play(8, 1, 8))
  })

  it('counts bars and beats', () => {
    expect(nextBeat({ bar: 2, beat: 3, lineIndex: 1 }, 4)).toEqual({ bar: 3, beat: 0, lineIndex: 4 })
    expect(nextBeat({ bar: 2, beat: 1, lineIndex: 1 }, 1)).toEqual({ bar: 2, beat: 2, lineIndex: 1 })
  })

  it('plays unless the listener turned it off', () => {
    expect(musicFromStored(null)).toBe(true)
    expect(musicFromStored('true')).toBe(true)
    expect(musicFromStored('false')).toBe(false)
  })
})
