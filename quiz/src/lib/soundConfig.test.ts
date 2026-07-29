import { describe, it, expect } from 'vitest'
import {
  SOUND_RECIPES,
  comboMultiplier,
  nextComboIndex,
  recipeDuration,
  type SoundEvent,
  type SoundRecipe,
  type ToneSpec,
} from './soundConfig'

const EVENTS = Object.keys(SOUND_RECIPES) as SoundEvent[]

function entries(): Array<[SoundEvent, SoundRecipe]> {
  return EVENTS.map(e => [e, SOUND_RECIPES[e]])
}

/** The cues that celebrate something, as opposed to acknowledging a press. */
const REWARDS = ['correct', 'addToDeck', 'collect', 'levelUp', 'reward', 'streak', 'complete', 'begin'] as const

/** Everything a user hears dozens of times an hour. */
const INTERFACE = ['click', 'press', 'select', 'tick', 'toggleOn', 'toggleOff', 'navigate', 'actions',
  'open', 'close', 'page', 'shuffle', 'fileAway'] as const

/**
 * The notes of a cue's melody, as opposed to the struck partials, sparkle and
 * bass that sit underneath them. Every voice `bell()` adds under a note is well
 * below a third of its level, so the level alone separates them.
 */
function principals(recipe: SoundRecipe): ToneSpec[] {
  return (recipe.tones ?? []).filter(t => (t.gain ?? 1) > 0.3)
}

const semitones = (a: number, b: number) => Math.round(12 * Math.log2(b / a))

/**
 * Worst-case level of a cue at time `t`: every voice's envelope summed as if
 * all of them were in phase. Real oscillators at different frequencies never
 * add up this coherently, so this over-reports — which is what we want from a
 * clipping guard.
 *
 * This mirrors the envelopes `scheduleTone` / `scheduleNoise` schedule in
 * `soundEngine.ts` (attack ramp → optional hold → exponential decay, and the
 * noise `swell`). If those change shape, change this with them.
 */
const SILENT = 0.0001

function levelAt(recipe: SoundRecipe, t: number): number {
  let sum = 0
  for (const tone of recipe.tones ?? []) {
    if (t < tone.at || t > tone.at + tone.dur) continue
    const peak = tone.gain ?? 1
    const attack = Math.min(tone.attack ?? 0.012, tone.dur * 0.5)
    const hold = Math.min(tone.hold ?? 0, Math.max(0, tone.dur - attack) * 0.6)
    const u = t - tone.at
    if (u < attack) sum += peak * (u / attack)
    else if (u < attack + hold) sum += peak
    else sum += peak * Math.pow(SILENT / peak, (u - attack - hold) / (tone.dur - attack - hold))
  }
  for (const noise of recipe.noise ?? []) {
    if (t < noise.at || t > noise.at + noise.dur) continue
    const peak = noise.gain ?? 1
    const swell = Math.max(0.002, noise.dur * Math.min(0.9, Math.max(0, noise.swell ?? 0)))
    const u = t - noise.at
    if (u < swell) sum += peak * (u / swell)
    else sum += peak * Math.pow(SILENT / peak, (u - swell) / (noise.dur - swell))
  }
  return sum
}

/** The loudest instant of a cue, after its own master gain. */
function peakLevel(recipe: SoundRecipe): number {
  let peak = 0
  for (let t = 0; t < recipeDuration(recipe); t += 0.0005) {
    peak = Math.max(peak, levelAt(recipe, t))
  }
  return peak * recipe.gain
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
    // The three notes of the triad, ignoring the partials, the octave sparkle
    // and the bass root that sit underneath them.
    const triad = principals(correct)

    it('is exactly three notes', () => {
      expect(triad).toHaveLength(3)
    })

    it('ascends', () => {
      const freqs = triad.map(t => t.freq)
      expect(freqs).toEqual([...freqs].sort((a, b) => a - b))
      expect(new Set(freqs).size).toBe(3)
    })

    it('is a major triad — 4 then 3 semitones', () => {
      expect(semitones(triad[0].freq, triad[1].freq)).toBe(4)
      expect(semitones(triad[1].freq, triad[2].freq)).toBe(3)
    })

    it('overlaps into a chord rather than three separate beeps', () => {
      const step = triad[1].at - triad[0].at
      expect(step).toBeGreaterThan(0)
      for (const note of triad) expect(note.dur).toBeGreaterThan(step * 2)
    })

    it('is struck rather than faded in', () => {
      // A mallet attack: fast enough to read as an impact, slow enough not to
      // pop. Paired with a noise transient at the moment of the strike —
      // without it the notes bloom out of nowhere and lose their weight.
      for (const note of triad) {
        expect(note.attack ?? 0.012).toBeLessThan(0.01)
        expect(note.attack ?? 0.012).toBeGreaterThanOrEqual(0.001)
      }
      const strike = (correct.noise ?? []).filter(n => n.at === 0 && (n.swell ?? 0) === 0)
      expect(strike.length, 'no mallet on the strike').toBeGreaterThan(0)
    })

    it('gives every note an octave partial that dies before the note does', () => {
      // This is what makes a chime a chime rather than a beep: the spectrum
      // narrows as it rings, the way a struck metal bar's does.
      for (const note of triad) {
        const octave = (correct.tones ?? []).find(t =>
          t.at === note.at && Math.abs(t.freq - note.freq * 2) < 0.01)
        expect(octave, `no octave partial over ${note.freq}`).toBeDefined()
        expect(octave!.dur).toBeLessThan(note.dur)
        expect(octave!.gain ?? 1).toBeLessThan(note.gain ?? 1)
      }
    })

    it('carries a low root under the triad', () => {
      const root = (correct.tones ?? []).filter(t => t.freq < triad[0].freq / 2)
      expect(root.length, 'nothing underneath the triad').toBeGreaterThan(0)
      // Quiet enough to be felt rather than heard as a fourth note.
      for (const note of root) expect(note.gain ?? 1).toBeLessThan(0.3)
    })

    it('is quick enough to sit inside a quiz', () => {
      expect(recipeDuration(correct)).toBeLessThan(1)
    })
  })

  describe('reward cues', () => {
    it('lands on its loudest note', () => {
      // A fanfare arrives somewhere. The old arpeggio tapered off across the
      // run, which is the shape of a sound giving up rather than paying out.
      for (const event of REWARDS) {
        const notes = principals(SOUND_RECIPES[event])
        if (notes.length < 2) continue
        const last = notes[notes.length - 1]
        for (const note of notes.slice(0, -1)) {
          expect(note.at, `${event} is out of order`).toBeLessThan(last.at)
          expect(note.gain ?? 1, `${event} fades out instead of landing`)
            .toBeLessThanOrEqual(last.gain ?? 1)
        }
      }
    })

    it('rings in a room', () => {
      for (const event of REWARDS) {
        const space = SOUND_RECIPES[event].space
        expect(space, `${event} is bone dry`).toBeGreaterThan(0)
        expect(space, `${event} is all tail`).toBeLessThanOrEqual(1)
      }
    })

    it('leaves the interface dry', () => {
      // A reverb tail on something pressed forty times an hour is mud.
      for (const event of INTERFACE) {
        expect(SOUND_RECIPES[event].space, `${event} has a tail on it`).toBeUndefined()
      }
    })

    it('leaves headroom at full volume', () => {
      // A struck note is three oscillators, so a four-note fanfare is pushing
      // twenty voices into one bus. Summed in phase they must still clear the
      // destination's ceiling, or the payoff distorts for anyone with the
      // volume slider up.
      for (const [event, recipe] of entries()) {
        expect(peakLevel(recipe), `${event} clips at full volume`).toBeLessThan(0.85)
      }
    })

    it('keeps the everyday cue below the ceremonies', () => {
      // Loudness is the hierarchy: what you hear constantly has to sit under
      // what you hear once a session, or the big moments stop being big.
      const correct = peakLevel(SOUND_RECIPES.correct)
      for (const event of ['collect', 'levelUp', 'complete'] as const) {
        expect(peakLevel(SOUND_RECIPES[event]), `${event} is no bigger than a right answer`)
          .toBeGreaterThan(correct)
      }
      for (const event of INTERFACE) {
        expect(peakLevel(SOUND_RECIPES[event]), `${event} is as loud as a reward`)
          .toBeLessThan(correct)
      }
    })

    it('never holds a note past its own duration', () => {
      for (const [event, recipe] of entries()) {
        for (const tone of recipe.tones ?? []) {
          const attack = tone.attack ?? 0.012
          expect(attack + (tone.hold ?? 0), `${event} holds longer than it rings`)
            .toBeLessThan(tone.dur)
        }
      }
    })
  })

  describe('the correct-answer combo', () => {
    const combo = SOUND_RECIPES.correct.combo!

    it('climbs on the cue a user hears most', () => {
      // The oldest problem in game audio: a cue that fires forty times an hour
      // stops registering. A run of right answers walks up the scale instead.
      expect(combo).toBeDefined()
      expect(combo.steps.length).toBeGreaterThan(2)
      expect(combo.resetMs).toBeGreaterThan(0)
    })

    it('starts at the written pitch and only ever ascends', () => {
      expect(combo.steps[0]).toBe(0)
      expect(combo.steps).toEqual([...combo.steps].sort((a, b) => a - b))
      expect(new Set(combo.steps).size).toBe(combo.steps.length)
    })

    it('stays inside an octave, so the top of a run is bright and not shrill', () => {
      expect(combo.steps[combo.steps.length - 1]).toBeLessThanOrEqual(12)
    })

    it('climbs only where there is a run to count', () => {
      // Most cues mark a distinct event and have nothing to count. The two
      // that climb both fire repeatedly on the same action: a run of right
      // answers, and a deck of finished cards clearing one after another.
      const climbing = entries().filter(([, recipe]) => recipe.combo)
      expect(climbing.map(([event]) => event).sort()).toEqual(['correct', 'fileAway'])
    })
  })

  describe('the clear-completed sweep', () => {
    const combo = SOUND_RECIPES.fileAway.combo!

    it('climbs an octave and stops there', () => {
      // The sweep can be twenty cards long, so the climb is longer than the
      // quiz's — but it still tops out at the octave rather than running away.
      expect(combo.steps[0]).toBe(0)
      expect(combo.steps).toEqual([...combo.steps].sort((a, b) => a - b))
      expect(combo.steps[combo.steps.length - 1]).toBe(12)
    })

    it('outlasts the gap between two cards clearing', () => {
      // The climb has to survive the stagger between cards (at most 230ms, see
      // CLEAR_STAGGER_MS) or every card would sound at the root pitch.
      expect(combo.resetMs).toBeGreaterThan(230)
    })

    it('stays under a card being added, since it fires far more often', () => {
      expect(peakLevel(SOUND_RECIPES.fileAway))
        .toBeLessThan(peakLevel(SOUND_RECIPES.addToDeck))
    })
  })

  describe('comboMultiplier', () => {
    const combo = { steps: [0, 2, 4, 5, 7], resetMs: 1000 }

    it('leaves the root pitch alone', () => {
      expect(comboMultiplier(combo, 0)).toBe(1)
    })

    it('transposes by the semitones of the step reached', () => {
      expect(comboMultiplier(combo, 2)).toBeCloseTo(Math.pow(2, 4 / 12))
      expect(comboMultiplier(combo, 4)).toBeCloseTo(1.5, 2) // a perfect fifth
    })

    it('holds at the top of the climb rather than running away', () => {
      expect(comboMultiplier(combo, 99)).toBe(comboMultiplier(combo, 4))
    })

    it('is a no-op for cues that do not climb', () => {
      expect(comboMultiplier(undefined, 3)).toBe(1)
      expect(comboMultiplier({ steps: [], resetMs: 1000 }, 3)).toBe(1)
    })
  })

  describe('nextComboIndex', () => {
    const combo = { steps: [0, 2, 4, 5, 7], resetMs: 1000 }

    it('steps up while the run continues', () => {
      expect(nextComboIndex(0, 500, combo)).toBe(1)
      expect(nextComboIndex(1, 500, combo)).toBe(2)
    })

    it('caps at the last step', () => {
      expect(nextComboIndex(4, 500, combo)).toBe(4)
    })

    it('starts over after a long enough gap', () => {
      expect(nextComboIndex(3, 5000, combo)).toBe(0)
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
