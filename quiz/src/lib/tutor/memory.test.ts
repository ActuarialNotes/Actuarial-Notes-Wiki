import { describe, expect, it } from 'vitest'
import {
  FSRS_WEIGHTS,
  dueDay,
  initialState,
  intervalDays,
  nextState,
  ratingFor,
  retrievability,
  scheduledIntervalDays,
  seedFromLadder,
  addDayKey,
  dayKey,
} from './memory'

const day = (n: number) => new Date(2026, 0, 1 + n, 10, 0, 0)

describe('the forgetting curve', () => {
  it('is at 90% after `stability` days, by definition', () => {
    expect(retrievability(10, 10)).toBeCloseTo(0.9, 6)
    expect(intervalDays(10)).toBeCloseTo(10, 6)
    expect(retrievability(0, 10)).toBe(1)
    expect(retrievability(30, 10)).toBeLessThan(retrievability(20, 10))
  })
})

describe('a review', () => {
  it('starts from FSRS’s first-review weights', () => {
    const s = initialState(3, day(0))
    expect(s.stability).toBe(FSRS_WEIGHTS[2])
    expect(s.difficulty).toBeCloseTo(FSRS_WEIGHTS[4], 6)
    expect(initialState(1, day(0)).lapses).toBe(1)
  })

  it('earns nothing when massed: a second success the same day keeps stability', () => {
    const s = initialState(3, day(0))
    const again = nextState(s, 3, new Date(day(0).getTime() + 60_000))
    expect(again.stability).toBeCloseTo(s.stability, 1)
  })

  it('grows more the longer recall was left to fade (the spacing effect)', () => {
    const s = initialState(3, day(0))
    const early = nextState(s, 3, day(1))
    const onTime = nextState(s, 3, day(4))
    expect(onTime.stability).toBeGreaterThan(early.stability)
    expect(early.stability).toBeGreaterThan(s.stability)
  })

  it('grows less on a Hard than a Good', () => {
    const s = initialState(3, day(0))
    expect(nextState(s, 2, day(4)).stability).toBeLessThan(nextState(s, 3, day(4)).stability)
  })

  it('is cut back by a lapse, never above where it was', () => {
    const s = nextState(initialState(3, day(0)), 3, day(4))
    const lapse = nextState(s, 1, day(20))
    expect(lapse.stability).toBeLessThan(s.stability)
    expect(lapse.lapses).toBe(1)
    expect(lapse.difficulty).toBeGreaterThan(s.difficulty)
  })
})

describe('the rating an answer counts as', () => {
  it('reads the mark and the confidence, and is never Easy', () => {
    expect(ratingFor('incorrect', 'sure')).toBe(1)
    expect(ratingFor('partial', 'sure')).toBe(2)
    expect(ratingFor('correct', 'guess')).toBe(2)
    expect(ratingFor('correct', 'unsure')).toBe(3)
    expect(ratingFor('correct', 'sure')).toBe(3)
    expect(ratingFor('correct', null)).toBe(3)
  })
})

describe('the scheduled gap', () => {
  it('is the stability, at least a day', () => {
    expect(scheduledIntervalDays(0.4, null)).toBe(1)
    expect(scheduledIntervalDays(12.4, null)).toBe(12)
    expect(scheduledIntervalDays(400, null)).toBe(180)
  })

  it('is no more than a quarter of the days left, and never past the day before the exam', () => {
    expect(scheduledIntervalDays(30, 40)).toBe(10)
    expect(scheduledIntervalDays(3, 40)).toBe(3)
    expect(scheduledIntervalDays(30, 3)).toBe(1)
    expect(scheduledIntervalDays(30, 1)).toBe(1)
  })

  it('lands a concept due before the exam, measured from its review', () => {
    const s = { ...initialState(3, day(0)), stability: 60 }
    const exam = dayKey(day(20))
    const due = dueDay(s, exam)
    expect(due < exam).toBe(true)
    expect(due).toBe(addDayKey(dayKey(day(0)), 5))
  })
})

describe('seeding from the ladder', () => {
  it('starts a learned concept from its last correct answer', () => {
    const seed = seedFromLadder({ state: 'level2', last_correct_at: '2026-01-01T10:00:00Z', last_attempted_at: '2026-01-02T10:00:00Z' })
    expect(seed?.stability).toBe(7)
    expect(seed?.lastReview).toBe('2026-01-01T10:00:00Z')
  })

  it('starts nothing for a new concept, or one never answered right', () => {
    expect(seedFromLadder({ state: 'new', last_correct_at: null, last_attempted_at: null })).toBeNull()
    expect(seedFromLadder({ state: 'level1', last_correct_at: null, last_attempted_at: '2026-01-01' })).toBeNull()
  })

  it('treats Forgotten as a lapse at its last attempt', () => {
    const seed = seedFromLadder({ state: 'forgotten', last_correct_at: '2025-11-01T00:00:00Z', last_attempted_at: '2026-01-01T00:00:00Z' })
    expect(seed?.stability).toBe(0.5)
    expect(seed?.lapses).toBe(1)
    expect(seed?.lastReview).toBe('2026-01-01T00:00:00Z')
  })
})
