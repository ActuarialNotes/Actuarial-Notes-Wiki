import { describe, it, expect } from 'vitest'
import {
  SOUND_RECIPES,
  comboBloom,
  comboVoicing,
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

/** The cues with a pitch ladder on them. */
function climbing(): Array<[SoundEvent, SoundRecipe]> {
  return entries().filter(([, recipe]) => recipe.combo)
}

/** The cues that celebrate something, as opposed to acknowledging a press. */
const REWARDS = ['correct', 'addToDeck', 'collect', 'levelUp', 'levelUpStep', 'reward', 'streak', 'complete', 'begin'] as const

/**
 * The two cues that open a session rather than close one: launching a quiz and
 * settling in to study. They're built like reward cues (struck, in a room) but
 * they mark a beginning, so they have their own rules — see "the launch cues".
 */
const LAUNCHES = ['begin', 'study'] as const

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
    // The two notes of the interval, ignoring the partials, the octave sparkle
    // and the bass root that sit underneath them.
    const pair = principals(correct)

    it('is exactly two notes', () => {
      expect(pair).toHaveLength(2)
    })

    it('ascends', () => {
      const freqs = pair.map(t => t.freq)
      expect(freqs).toEqual([...freqs].sort((a, b) => a - b))
      expect(new Set(freqs).size).toBe(2)
    })

    it('is a perfect fifth — 7 semitones', () => {
      expect(semitones(pair[0].freq, pair[1].freq)).toBe(7)
    })

    it('overlaps into a chord rather than two separate beeps', () => {
      const step = pair[1].at - pair[0].at
      expect(step).toBeGreaterThan(0)
      for (const note of pair) expect(note.dur).toBeGreaterThan(step * 2)
    })

    it('is struck rather than faded in', () => {
      // A mallet attack: fast enough to read as an impact, slow enough not to
      // pop. Paired with a noise transient at the moment of the strike —
      // without it the notes bloom out of nowhere and lose their weight.
      for (const note of pair) {
        expect(note.attack ?? 0.012).toBeLessThan(0.01)
        expect(note.attack ?? 0.012).toBeGreaterThanOrEqual(0.001)
      }
      const strike = (correct.noise ?? []).filter(n => n.at === 0 && (n.swell ?? 0) === 0)
      expect(strike.length, 'no mallet on the strike').toBeGreaterThan(0)
    })

    it('gives every note an octave partial that dies before the note does', () => {
      // This is what makes a chime a chime rather than a beep: the spectrum
      // narrows as it rings, the way a struck metal bar's does.
      for (const note of pair) {
        const octave = (correct.tones ?? []).find(t =>
          t.at === note.at && Math.abs(t.freq - note.freq * 2) < 0.01)
        expect(octave, `no octave partial over ${note.freq}`).toBeDefined()
        expect(octave!.dur).toBeLessThan(note.dur)
        expect(octave!.gain ?? 1).toBeLessThan(note.gain ?? 1)
      }
    })

    it('carries a low root under the pair', () => {
      const root = (correct.tones ?? []).filter(t => t.freq < pair[0].freq / 2)
      expect(root.length, 'nothing underneath the pair').toBeGreaterThan(0)
      // Quiet enough to be felt rather than heard as a third note.
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

  describe('the launch cues', () => {
    it('rings in a room and lands on its loudest note', () => {
      // Same construction as the reward family — struck notes, a landing, a
      // tail — because a beginning is an event too.
      for (const event of LAUNCHES) {
        const recipe = SOUND_RECIPES[event]
        expect(recipe.space, `${event} is bone dry`).toBeGreaterThan(0)
        const notes = principals(recipe)
        expect(notes.length, `${event} has no melody`).toBeGreaterThan(1)
        const last = notes[notes.length - 1]
        for (const note of notes.slice(0, -1)) {
          expect(note.at, `${event} is out of order`).toBeLessThan(last.at)
          expect(note.gain ?? 1, `${event} fades out instead of landing`)
            .toBeLessThanOrEqual(last.gain ?? 1)
        }
        expect(last.hold ?? 0, `${event} does not hold its arrival`).toBeGreaterThan(0)
      }
    })

    it('sits above the interface and no louder than the session fanfare', () => {
      // A launch is a once-a-session moment, so it has to carry over the
      // presses around it — but finishing is still the biggest thing the app
      // ever says, and nothing is allowed to upstage it.
      const complete = peakLevel(SOUND_RECIPES.complete)
      for (const event of LAUNCHES) {
        const level = peakLevel(SOUND_RECIPES[event])
        expect(level, `${event} is louder than finishing a session`).toBeLessThanOrEqual(complete)
        for (const quiet of INTERFACE) {
          expect(level, `${event} is no bigger than a ${quiet}`)
            .toBeGreaterThan(peakLevel(SOUND_RECIPES[quiet]))
        }
      }
    })

    it('gives the quiz launch a run-up before its first note', () => {
      // The point of `begin`: momentum can only be heard over time, so the cue
      // spends its first quarter-second on a swell and a count-in and doesn't
      // play a note until the launch itself.
      const begin = SOUND_RECIPES.begin
      const firstNote = Math.min(...principals(begin).map(t => t.at))
      expect(Math.min(...(begin.noise ?? []).map(n => n.at)), 'nothing leads in').toBe(0)
      expect(firstNote, 'the melody starts too early to have a run-up').toBeGreaterThan(0.15)

      // The count-in accelerates. An even one tells you exactly when the launch
      // lands; a tightening one arrives before you expect it, which is the part
      // that reads as being fired out of something.
      const ticks = (begin.noise ?? [])
        .filter(n => (n.swell ?? 0) === 0 && n.at < firstNote)
        .map(n => n.at)
        .sort((a, b) => a - b)
      expect(ticks.length, 'no count-in').toBeGreaterThanOrEqual(3)
      const gaps = ticks.slice(1).map((at, i) => at - ticks[i])
      for (let i = 1; i < gaps.length; i++) {
        expect(gaps[i], 'the count-in does not tighten').toBeLessThan(gaps[i - 1])
      }
    })

    it('stops the quiz launch on the fifth rather than resolving home', () => {
      // Opening, not concluding: an octave arrival is `complete`'s shape and
      // would make starting a quiz sound like finishing one.
      const notes = principals(SOUND_RECIPES.begin)
      const span = semitones(notes[0].freq, notes[notes.length - 1].freq)
      expect(span, 'the launch resolves instead of leaning forward').toBe(7)
    })

    it('keeps the study cue an open fifth — no third, so it congratulates nobody', () => {
      // Opening your deck is not an achievement. A third would make this a
      // reward cue, and a reward for pressing Study is how a cue wears out.
      const notes = principals(SOUND_RECIPES.study)
      expect(notes).toHaveLength(2)
      expect(semitones(notes[0].freq, notes[1].freq)).toBe(7)
      expect(SOUND_RECIPES.study.lowpass!, 'the study cue should be the warmer one')
        .toBeLessThan(SOUND_RECIPES.correct.lowpass!)
    })

    it('starts the study cue on paper, like the rest of the flashcard family', () => {
      // `shuffle`, `fileAway` and `page` are all paper; the cue that opens the
      // deck has to live in the same physical world, not sound like a prize.
      const first = (SOUND_RECIPES.study.noise ?? []).find(n => n.at === 0)
      expect(first, 'the study cue has no paper under it').toBeDefined()
      expect(first!.to!, 'the deck settles, so the sweep falls').toBeLessThan(first!.from)
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

    it('opens the room up as a run goes, so a streak is audible without a ceiling', () => {
      // Pitch can't carry streak length — the Shepard wrap makes every octave
      // sound the same on purpose — so the reverb send is what grows.
      expect(combo.bloom).toBeGreaterThan(1)
    })

    it('climbs only where there is a run to count', () => {
      // Most cues mark a distinct event and have nothing to count. The ones
      // that climb all fire repeatedly on the same action: a run of right
      // answers, a deck of finished cards clearing one after another, and a
      // run of concepts leveling up on the same completion ceremony.
      expect(climbing().map(([event]) => event).sort()).toEqual(['correct', 'fileAway', 'levelUpStep'])
    })
  })

  // The Shepard wrap only works if every ladder obeys the same shape, so these
  // hold for *any* cue that climbs rather than for `correct` alone.
  describe('every ladder that climbs', () => {
    it('starts at the written pitch and only ever ascends', () => {
      for (const [event, recipe] of climbing()) {
        const steps = recipe.combo!.steps
        expect(steps[0], `${event} does not start at the written pitch`).toBe(0)
        expect(steps, `${event} does not ascend`).toEqual([...steps].sort((a, b) => a - b))
        expect(new Set(steps).size, `${event} repeats a rung`).toBe(steps.length)
      }
    })

    it('stays inside an octave, because the rung after the last one is the wrap', () => {
      // A rung at 12 is the root an octave up: `comboVoicing` sounds it exactly
      // as the root, so the ladder would have a dead step in it and the wrap
      // would repeat a note instead of moving on.
      for (const [event, recipe] of climbing()) {
        const steps = recipe.combo!.steps
        expect(steps[steps.length - 1], `${event} reaches the wrap`).toBeLessThan(12)
      }
    })
  })

  describe('the clear-completed sweep', () => {
    const combo = SOUND_RECIPES.fileAway.combo!

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

  describe('comboVoicing', () => {
    const combo = { steps: [0, 2, 4, 7, 9], resetMs: 1000, bloom: 1.7 }
    /** Semitones above the written pitch, per layer. */
    const pitches = (plays: number) =>
      comboVoicing(combo, plays).map(v => 12 * Math.log2(v.pitch))
    const level = (plays: number) =>
      comboVoicing(combo, plays).reduce((sum, v) => sum + v.gain, 0)

    it('sounds the cue exactly as written at the root of the climb', () => {
      // One layer at unity: a lone right answer is bit-for-bit the catalogue.
      expect(comboVoicing(combo, 0)).toEqual([{ pitch: 1, gain: 1 }])
    })

    it('is a no-op for cues that do not climb', () => {
      expect(comboVoicing(undefined, 3)).toEqual([{ pitch: 1, gain: 1 }])
      expect(comboVoicing({ steps: [], resetMs: 1000 }, 3)).toEqual([{ pitch: 1, gain: 1 }])
    })

    it('never gets louder than the cue is written, anywhere in the climb', () => {
      // The `cos²` window is what buys this: the two layers' gains sum to one at
      // every rung, so the headroom the catalogue is tuned for holds all the way
      // up and a forty-answer streak can't distort.
      for (let plays = 0; plays < 40; plays++) {
        expect(level(plays), `level at play ${plays}`).toBeCloseTo(1, 2)
      }
    })

    it('never climbs out of the register it started in', () => {
      // This is the whole trick: the ladder rises forever, the *sound* doesn't.
      for (let plays = 0; plays < 40; plays++) {
        for (const semitones of pitches(plays)) {
          expect(semitones, `layer at play ${plays}`).toBeGreaterThanOrEqual(-12)
          expect(semitones, `layer at play ${plays}`).toBeLessThanOrEqual(12)
        }
      }
    })

    it('rises at every step of a run, with no top to reach', () => {
      // What the ear follows across a wrap is chroma — where in the octave the
      // note sits — so each play has to land a short step *above* the last one
      // going round the circle. Anything past a tritone is heard as a fall.
      const chroma = (plays: number) => combo.steps[plays % combo.steps.length]
      for (let plays = 0; plays < 40; plays++) {
        const step = ((chroma(plays + 1) - chroma(plays)) % 12 + 12) % 12
        expect(step, `play ${plays} → ${plays + 1} does not rise`).toBeGreaterThan(0)
        expect(step, `play ${plays} → ${plays + 1} is heard as a fall`).toBeLessThan(6)
      }
    })

    it('comes back around seamlessly, so no octave sounds like a reset', () => {
      for (let plays = 0; plays < 12; plays++) {
        expect(comboVoicing(combo, plays + combo.steps.length)).toEqual(comboVoicing(combo, plays))
      }
    })

    it('crossfades: the copy leaving the top fades out as the new one fades in', () => {
      const mid = comboVoicing(combo, 3) // 7 semitones up — mid-wrap
      expect(mid).toHaveLength(2)
      expect(12 * Math.log2(mid[0].pitch / mid[1].pitch)).toBeCloseTo(12)
      for (const voice of mid) expect(voice.gain).toBeGreaterThan(0.1)
    })
  })

  describe('comboBloom', () => {
    const combo = { steps: [0, 2, 4, 7, 9], resetMs: 1000, bloom: 1.7 }

    it('is closed at the root and open once a run is going', () => {
      expect(comboBloom(combo, 0)).toBe(1)
      expect(comboBloom(combo, 4)).toBeCloseTo(1.7)
    })

    it('only ever opens, and settles before the pitch wraps', () => {
      // If it were still moving at the wrap, the wrap would stop being seamless.
      let previous = 0
      for (let plays = 0; plays < 40; plays++) {
        const bloom = comboBloom(combo, plays)
        expect(bloom).toBeGreaterThanOrEqual(previous)
        previous = bloom
      }
      expect(comboBloom(combo, 99)).toBe(comboBloom(combo, combo.steps.length - 1))
    })

    it('leaves cues without a bloom alone', () => {
      expect(comboBloom(undefined, 3)).toBe(1)
      expect(comboBloom({ steps: [0, 2], resetMs: 1000 }, 3)).toBe(1)
    })
  })

  describe('nextComboIndex', () => {
    const combo = { steps: [0, 2, 4, 7, 9], resetMs: 1000 }

    it('steps up while the run continues', () => {
      expect(nextComboIndex(0, 500, combo)).toBe(1)
      expect(nextComboIndex(1, 500, combo)).toBe(2)
    })

    it('keeps counting past the end of the ladder', () => {
      // Nothing caps the run: the ladder wraps and the register stays put, so
      // an unbounded count is still a bounded sound.
      expect(nextComboIndex(4, 500, combo)).toBe(5)
      expect(nextComboIndex(99, 500, combo)).toBe(100)
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
