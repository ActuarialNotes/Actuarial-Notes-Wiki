import { describe, it, expect } from 'vitest'
import {
  observeReadiness,
  readinessDelta,
  sanitizeMarks,
  type ReadinessMarks,
} from './readinessDelta'

const MON = '2026-03-02'
const TUE = '2026-03-03'
const WED = '2026-03-04'
const SAT = '2026-03-07'

describe('observeReadiness', () => {
  it('opens a new exam at zero movement', () => {
    const marks = observeReadiness({}, 'P', 41, MON)
    expect(marks.P).toEqual({ day: MON, score: 41, baseline: 41 })
    expect(readinessDelta(marks, 'P', MON)).toBe(0)
  })

  it('keeps the day\'s baseline as the score climbs', () => {
    let marks = observeReadiness({}, 'P', 41, MON)
    marks = observeReadiness(marks, 'P', 44, MON)
    marks = observeReadiness(marks, 'P', 47, MON)
    expect(marks.P.baseline).toBe(41)
    expect(readinessDelta(marks, 'P', MON)).toBe(6)
  })

  it('starts the next day at yesterday\'s last score, so overnight decay shows', () => {
    let marks = observeReadiness({}, 'P', 50, MON)
    marks = observeReadiness(marks, 'P', 56, MON)
    // Nothing was answered overnight; decay took two points off by morning.
    marks = observeReadiness(marks, 'P', 54, TUE)
    expect(marks.P).toEqual({ day: TUE, score: 54, baseline: 56 })
    expect(readinessDelta(marks, 'P', TUE)).toBe(-2)
  })

  it('starts flat after a gap longer than a day', () => {
    let marks = observeReadiness({}, 'P', 60, MON)
    // Away all week — the decay since is not "today's" doing.
    marks = observeReadiness(marks, 'P', 44, SAT)
    expect(marks.P).toEqual({ day: SAT, score: 44, baseline: 44 })
    expect(readinessDelta(marks, 'P', SAT)).toBe(0)
  })

  it('tracks each exam separately', () => {
    let marks = observeReadiness({}, 'P', 30, MON)
    marks = observeReadiness(marks, 'FM', 70, MON)
    marks = observeReadiness(marks, 'P', 35, MON)
    expect(readinessDelta(marks, 'P', MON)).toBe(5)
    expect(readinessDelta(marks, 'FM', MON)).toBe(0)
  })

  it('returns the same object when nothing changed', () => {
    const marks = observeReadiness({}, 'P', 41, MON)
    expect(observeReadiness(marks, 'P', 41, MON)).toBe(marks)
  })

  it('rolls the day over even when the score is unchanged', () => {
    const monday = observeReadiness({}, 'P', 41, MON)
    const tuesday = observeReadiness(monday, 'P', 41, TUE)
    expect(tuesday).not.toBe(monday)
    expect(tuesday.P).toEqual({ day: TUE, score: 41, baseline: 41 })
  })
})

describe('readinessDelta', () => {
  it('is zero for an exam that has never been seen', () => {
    expect(readinessDelta({}, 'P', MON)).toBe(0)
  })

  it('is zero on a day the score has not been seen yet', () => {
    const marks = observeReadiness({}, 'P', 41, MON)
    // A later day with no sighting yet: yesterday's climb is not today's.
    expect(readinessDelta(marks, 'P', WED)).toBe(0)
  })

  it('measures the rounded scores, so it agrees with what is on screen', () => {
    // 2.4% and 2.6% both print as 3% after the first move — one visible point.
    let marks = observeReadiness({}, 'P', 2.4, MON)
    marks = observeReadiness(marks, 'P', 2.6, MON)
    expect(readinessDelta(marks, 'P', MON)).toBe(1)

    // A change too small to move the printed number reports no movement at all.
    let quiet = observeReadiness({}, 'FM', 2.1, MON)
    quiet = observeReadiness(quiet, 'FM', 2.3, MON)
    expect(readinessDelta(quiet, 'FM', MON)).toBe(0)
  })
})

describe('sanitizeMarks', () => {
  it('reads back what it wrote', () => {
    const marks = observeReadiness(observeReadiness({}, 'P', 41, MON), 'FM', 12.5, MON)
    expect(sanitizeMarks(JSON.parse(JSON.stringify(marks)))).toEqual(marks)
  })

  it('drops malformed and non-finite entries', () => {
    const raw = {
      P: { day: MON, score: 41, baseline: 40 },
      FM: { day: MON, score: 'lots', baseline: 40 },
      'MAS-I': { day: 7, score: 41, baseline: 40 },
      '5': { day: MON, score: NaN, baseline: 40 },
      '6': null,
    }
    expect(sanitizeMarks(raw)).toEqual({ P: { day: MON, score: 41, baseline: 40 } } as ReadinessMarks)
  })

  it('survives junk', () => {
    expect(sanitizeMarks(null)).toEqual({})
    expect(sanitizeMarks('nope')).toEqual({})
    expect(sanitizeMarks(42)).toEqual({})
  })
})
