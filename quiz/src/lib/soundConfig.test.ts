import { describe, it, expect } from 'vitest'
import { SOUND_RECIPES, recipeDuration, type SoundEvent, type SoundRecipe } from './soundConfig'

const EVENTS = Object.keys(SOUND_RECIPES) as SoundEvent[]

function entries(): Array<[SoundEvent, SoundRecipe]> {
  return EVENTS.map(e => [e, SOUND_RECIPES[e]])
}

describe('sound catalogue', () => {
  it('gives every cue something to play', () => {
    for (const [event, recipe] of entries()) {
      const voices = (recipe.tones?.length ?? 0) + (recipe.noise?.length ?? 0)
      expect(voices, `${event} has no voices`).toBeGreaterThan(0)
    }
  })

  it('keeps every level inside unity gain', () => {
    for (const [event, recipe] of entries()) {
      expect(recipe.gain, `${event} master`).toBeGreaterThan(0)
      expect(recipe.gain, `${event} master`).toBeLessThanOrEqual(1)
      for (const tone of recipe.tones ?? []) {
        expect(tone.gain ?? 1, `${event} tone`).toBeGreaterThan(0)
        expect(tone.gain ?? 1, `${event} tone`).toBeLessThanOrEqual(1)
      }
      for (const noise of recipe.noise ?? []) {
        expect(noise.gain ?? 1, `${event} noise`).toBeGreaterThan(0)
        expect(noise.gain ?? 1, `${event} noise`).toBeLessThanOrEqual(1)
      }
    }
  })

  it('never schedules a voice with a non-positive duration', () => {
    for (const [event, recipe] of entries()) {
      for (const tone of recipe.tones ?? []) {
        expect(tone.dur, `${event} tone`).toBeGreaterThan(0)
        expect(tone.at, `${event} tone`).toBeGreaterThanOrEqual(0)
        expect(tone.freq, `${event} tone`).toBeGreaterThan(0)
      }
      for (const noise of recipe.noise ?? []) {
        expect(noise.dur, `${event} noise`).toBeGreaterThan(0)
        expect(noise.at, `${event} noise`).toBeGreaterThanOrEqual(0)
        expect(noise.from, `${event} noise`).toBeGreaterThan(0)
      }
    }
  })

  it('stays round — no sawtooth or square anywhere', () => {
    for (const [event, recipe] of entries()) {
      for (const tone of recipe.tones ?? []) {
        expect(['sine', 'triangle'], `${event} uses a harsh waveform`).toContain(tone.type ?? 'sine')
      }
    }
  })

  it('has no cue for getting something wrong', () => {
    // The product decision, pinned: mistakes are silent. If a `wrong`/`error`
    // cue ever reappears here it should be a deliberate change, not a drift.
    expect(EVENTS).not.toContain('wrong')
    expect(EVENTS).not.toContain('error')
    expect(EVENTS).not.toContain('incorrect')
  })

  describe('the correct-answer arpeggio', () => {
    const correct = SOUND_RECIPES.correct
    // The three notes of the triad, ignoring the quiet octave doubling that
    // sits on top of the last one.
    const triad = (correct.tones ?? []).filter(t => (t.gain ?? 1) > 0.3)

    it('is exactly three notes', () => {
      expect(triad).toHaveLength(3)
    })

    it('ascends', () => {
      const freqs = triad.map(t => t.freq)
      expect(freqs).toEqual([...freqs].sort((a, b) => a - b))
      expect(new Set(freqs).size).toBe(3)
    })

    it('is a major triad — 4 then 3 semitones', () => {
      const semitones = (a: number, b: number) => Math.round(12 * Math.log2(b / a))
      expect(semitones(triad[0].freq, triad[1].freq)).toBe(4)
      expect(semitones(triad[1].freq, triad[2].freq)).toBe(3)
    })

    it('overlaps into a chord rather than three separate beeps', () => {
      const step = triad[1].at - triad[0].at
      expect(step).toBeGreaterThan(0)
      for (const note of triad) expect(note.dur).toBeGreaterThan(step * 2)
    })

    it('is soft-edged and quick enough to sit inside a quiz', () => {
      for (const note of triad) expect(note.attack ?? 0).toBeGreaterThanOrEqual(0.01)
      expect(recipeDuration(correct)).toBeLessThan(1)
    })
  })

  describe('interface cues', () => {
    it('keeps a click short and quiet enough to fire on every press', () => {
      const click = SOUND_RECIPES.click
      expect(recipeDuration(click)).toBeLessThan(0.1)
      expect(click.gain).toBeLessThan(SOUND_RECIPES.correct.gain)
      expect(click.throttleMs ?? 60).toBeLessThanOrEqual(50)
    })

    it('keeps the thump out of the everyday cues', () => {
      // The design rule: only `press` carries the low body. Everything a user
      // hits dozens of times an hour is the high end of that transient, so a
      // study session doesn't turn into knocking on a desk.
      // A thump is the press body's shape: a low tone falling lower still.
      // (A toggle's rising A4 → E5 is melody, not weight, so it doesn't count.)
      const isThump = (t: { freq: number; glide?: number }) =>
        t.freq <= 500 && (t.glide ?? t.freq) <= t.freq

      for (const event of ['click', 'select', 'tick', 'toggleOn', 'toggleOff', 'actions'] as const) {
        const thumps = (SOUND_RECIPES[event].tones ?? []).filter(isThump)
        expect(thumps, `${event} has a body thumping under it`).toHaveLength(0)
      }
      expect((SOUND_RECIPES.press.tones ?? []).filter(isThump).length, 'press lost its body')
        .toBeGreaterThan(0)
    })

    it('keeps a weighty press as short and quiet as a light one', () => {
      const { click, press } = SOUND_RECIPES
      expect(recipeDuration(press)).toBeLessThan(0.1)
      expect(press.gain).toBeLessThanOrEqual(click.gain)
      // Both are built on the same transient, so they read as one family.
      expect(press.noise).toEqual(click.noise)
    })

    it('makes the list tick drier and brighter than a click', () => {
      const { tick, click } = SOUND_RECIPES
      expect(recipeDuration(tick)).toBeLessThan(recipeDuration(click))
      const brightest = (spec: { from: number }[]) => Math.max(...spec.map(n => n.from))
      expect(brightest(tick.noise!)).toBeGreaterThan(brightest(click.noise!))
      // Ticking down a topic list must sound every row, not swallow half of them.
      expect(tick.throttleMs ?? 60).toBeLessThanOrEqual(35)
    })

    it('builds the paper cues out of noise, not tones', () => {
      for (const event of ['open', 'close', 'page'] as const) {
        expect(SOUND_RECIPES[event].noise?.length ?? 0, event).toBeGreaterThan(0)
      }
    })

    it('sweeps `open` upward and `close` back down', () => {
      const open = SOUND_RECIPES.open.noise![0]
      const close = SOUND_RECIPES.close.noise![0]
      expect(open.to!).toBeGreaterThan(open.from)
      expect(close.to!).toBeLessThan(close.from)
    })
  })

  describe('recipeDuration', () => {
    it('reports the end of the last voice to finish', () => {
      expect(recipeDuration({
        gain: 1,
        tones: [{ at: 0, dur: 0.2, freq: 440 }],
        noise: [{ at: 0.5, dur: 0.25, from: 1000 }],
      })).toBeCloseTo(0.75)
    })

    it('is zero for an empty recipe', () => {
      expect(recipeDuration({ gain: 1 })).toBe(0)
    })
  })
})
