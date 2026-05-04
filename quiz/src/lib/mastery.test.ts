import { describe, it, expect } from 'vitest'
import {
  applyAnswer,
  decayIfStale,
  aggregateForTopic,
  emptyRecord,
  FORGET_AFTER_DAYS,
  LEVEL2_CORRECT_THRESHOLD,
  LEVEL3_CORRECT_THRESHOLD,
  FORGET_FAIL_STREAK,
  type ConceptMasteryRecord,
} from './mastery'

const NOW = new Date('2026-05-01T12:00:00Z')
const RECENT = new Date('2026-04-25T12:00:00Z').toISOString()  // 6 days ago — not stale
const STALE = new Date('2026-04-01T12:00:00Z').toISOString()   // 30 days ago — stale

function rec(overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
  return { ...emptyRecord('u1', 'P', 'Expected Value'), ...overrides }
}

function correct(prev: ConceptMasteryRecord, hard = false): ConceptMasteryRecord {
  return applyAnswer(prev, { isCorrect: true, isHard: hard, at: NOW })
}

function wrong(prev: ConceptMasteryRecord): ConceptMasteryRecord {
  return applyAnswer(prev, { isCorrect: false, isHard: false, at: NOW })
}

// ── applyAnswer: new state ──────────────────────────────────────────────────

describe('new state', () => {
  it('transitions to level1 on first correct answer', () => {
    expect(correct(rec()).state).toBe('level1')
  })

  it('stays new on incorrect answer', () => {
    expect(wrong(rec()).state).toBe('new')
  })

  it('does not reach forgotten even after 3 consecutive wrong answers', () => {
    let r = rec()
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('new')
  })

  it('increments correct_count on correct answer', () => {
    expect(correct(rec()).correct_count).toBe(1)
  })

  it('increments incorrect_streak on wrong answer', () => {
    expect(wrong(rec()).incorrect_streak).toBe(1)
  })

  it('resets incorrect_streak on correct answer', () => {
    const afterWrong = wrong(rec())
    expect(correct(afterWrong).incorrect_streak).toBe(0)
  })
})

// ── applyAnswer: level1 state ───────────────────────────────────────────────

describe('level1 state', () => {
  function level1Rec(overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
    return rec({ state: 'level1', correct_count: 1, last_correct_at: RECENT, ...overrides })
  }

  it('stays level1 on correct below level2 threshold', () => {
    const r = level1Rec({ correct_count: 1 })
    // correct_count becomes 2 = LEVEL2_CORRECT_THRESHOLD → advances to level2
    // So test with count that stays below threshold after increment
    const r2 = level1Rec({ correct_count: 0 })
    expect(correct(r2).state).toBe('level1')
  })

  it('transitions to level2 when correct_count reaches LEVEL2_CORRECT_THRESHOLD', () => {
    const r = level1Rec({ correct_count: LEVEL2_CORRECT_THRESHOLD - 1 })
    expect(correct(r).state).toBe('level2')
  })

  it('transitions to forgotten after 3 consecutive wrong answers', () => {
    let r = level1Rec()
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('forgotten')
  })

  it('resets incorrect_streak on correct answer', () => {
    const afterTwo = wrong(wrong(level1Rec()))
    expect(correct(afterTwo).incorrect_streak).toBe(0)
  })

  it('does not transition to forgotten in fewer than 3 wrong answers', () => {
    let r = level1Rec()
    for (let i = 0; i < FORGET_FAIL_STREAK - 1; i++) r = wrong(r)
    expect(r.state).toBe('level1')
  })
})

// ── applyAnswer: level2 state ───────────────────────────────────────────────

describe('level2 state', () => {
  function level2Rec(overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
    return rec({
      state: 'level2',
      correct_count: LEVEL2_CORRECT_THRESHOLD,
      last_correct_at: RECENT,
      ...overrides,
    })
  }

  it('stays level2 when count >= threshold but no hard correct', () => {
    const r = level2Rec({ correct_count: LEVEL3_CORRECT_THRESHOLD - 1 })
    expect(correct(r, false).state).toBe('level2')
  })

  it('stays level2 when has hard correct but count below threshold', () => {
    const r = level2Rec({ correct_count: 1, hard_correct_count: 1 })
    expect(correct(r, true).state).toBe('level2')
  })

  it('transitions to level3 when count >= LEVEL3_CORRECT_THRESHOLD AND at least one hard correct', () => {
    const r = level2Rec({ correct_count: LEVEL3_CORRECT_THRESHOLD - 1, hard_correct_count: 1 })
    expect(correct(r, true).state).toBe('level3')
  })

  it('transitions to level3 with easy final answer if count and hard threshold already met', () => {
    const r = level2Rec({ correct_count: LEVEL3_CORRECT_THRESHOLD - 1, hard_correct_count: 1 })
    expect(correct(r, false).state).toBe('level3')
  })

  it('transitions to forgotten after 3 consecutive wrong answers', () => {
    let r = level2Rec()
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('forgotten')
  })
})

// ── applyAnswer: level3 state ───────────────────────────────────────────────

describe('level3 state', () => {
  function level3Rec(): ConceptMasteryRecord {
    return rec({
      state: 'level3',
      correct_count: LEVEL3_CORRECT_THRESHOLD,
      hard_correct_count: 1,
      last_correct_at: RECENT,
    })
  }

  it('stays level3 on correct answer', () => {
    expect(correct(level3Rec()).state).toBe('level3')
  })

  it('transitions to forgotten after 3 consecutive wrong answers', () => {
    let r = level3Rec()
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('forgotten')
  })
})

// ── applyAnswer: forgotten state ────────────────────────────────────────────

describe('forgotten state', () => {
  function forgottenRec(): ConceptMasteryRecord {
    return rec({ state: 'forgotten' })
  }

  it('transitions to level1 on correct answer', () => {
    expect(correct(forgottenRec()).state).toBe('level1')
  })

  it('stays forgotten on wrong answer (streak < 3)', () => {
    expect(wrong(forgottenRec()).state).toBe('forgotten')
  })
})

// ── decayIfStale ─────────────────────────────────────────────────────────────

describe('decayIfStale', () => {
  it('does not decay new state (no last_correct_at)', () => {
    const r = rec({ state: 'new' })
    expect(decayIfStale(r, NOW).state).toBe('new')
  })

  it('does not decay forgotten state', () => {
    const r = rec({ state: 'forgotten', last_correct_at: STALE })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('decays level1 to forgotten when last_correct_at is older than FORGET_AFTER_DAYS', () => {
    const r = rec({ state: 'level1', last_correct_at: STALE })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('decays level3 to forgotten when last_correct_at is older than FORGET_AFTER_DAYS', () => {
    const r = rec({ state: 'level3', last_correct_at: STALE })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('does not decay level1 when last_correct_at is recent', () => {
    const r = rec({ state: 'level1', last_correct_at: RECENT })
    expect(decayIfStale(r, NOW).state).toBe('level1')
  })

  it('does not decay level3 when last_correct_at is recent', () => {
    const r = rec({ state: 'level3', last_correct_at: RECENT })
    expect(decayIfStale(r, NOW).state).toBe('level3')
  })

  it('resets incorrect_streak to 0 on decay', () => {
    const r = rec({ state: 'level1', last_correct_at: STALE, incorrect_streak: 2 })
    expect(decayIfStale(r, NOW).incorrect_streak).toBe(0)
  })

  it(`decays exactly at ${FORGET_AFTER_DAYS} days boundary`, () => {
    const exactlyStale = new Date(NOW.getTime() - FORGET_AFTER_DAYS * 24 * 60 * 60 * 1000).toISOString()
    const r = rec({ state: 'level1', last_correct_at: exactlyStale })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('does not decay one ms before boundary', () => {
    const notQuite = new Date(NOW.getTime() - FORGET_AFTER_DAYS * 24 * 60 * 60 * 1000 + 1).toISOString()
    const r = rec({ state: 'level1', last_correct_at: notQuite })
    expect(decayIfStale(r, NOW).state).toBe('level1')
  })
})

// ── applyAnswer applies decay before transition ───────────────────────────

describe('applyAnswer applies decay before computing next state', () => {
  it('stale level3 → forgotten first, then correct transitions to level1 (not stays level3)', () => {
    const staleLevel3 = rec({
      state: 'level3',
      correct_count: LEVEL3_CORRECT_THRESHOLD,
      hard_correct_count: 1,
      last_correct_at: STALE,
    })
    // Decay makes it forgotten; then correct → level1 (not level3, which would skip forgotten)
    expect(correct(staleLevel3).state).toBe('level1')
  })
})

// ── aggregateForTopic ─────────────────────────────────────────────────────

describe('aggregateForTopic', () => {
  const slugs = ['Expected Value', 'Variance', 'Covariance', 'Probability', 'Mean']

  it('counts all as new when no records exist', () => {
    const agg = aggregateForTopic([], slugs, NOW)
    expect(agg.total).toBe(5)
    expect(agg.newCount).toBe(5)
    expect(agg.level3).toBe(0)
    expect(agg.level2).toBe(0)
    expect(agg.level1).toBe(0)
    expect(agg.forgotten).toBe(0)
    expect(agg.strongPct).toBe(0)
  })

  it('correctly counts mixed states', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'level3', last_correct_at: RECENT }),
      rec({ concept_slug: 'Variance', state: 'level1', last_correct_at: RECENT }),
      rec({ concept_slug: 'Covariance', state: 'forgotten' }),
    ]
    const agg = aggregateForTopic(records, slugs, NOW)
    expect(agg.level3).toBe(1)
    expect(agg.level1).toBe(1)
    expect(agg.forgotten).toBe(1)
    expect(agg.newCount).toBe(2)   // Probability + Mean have no record
    expect(agg.total).toBe(5)
    // backwards-compat aliases
    expect(agg.strong).toBe(1)
    expect(agg.learning).toBe(1)
  })

  it('applies decay at display time — stale level3 counts as forgotten', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'level3', last_correct_at: STALE }),
    ]
    const agg = aggregateForTopic(records, ['Expected Value'], NOW)
    expect(agg.level3).toBe(0)
    expect(agg.forgotten).toBe(1)
  })

  it('computes strongPct as percentage of total at level3', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'level3', last_correct_at: RECENT }),
      rec({ concept_slug: 'Variance', state: 'level3', last_correct_at: RECENT }),
    ]
    const agg = aggregateForTopic(records, ['Expected Value', 'Variance', 'Covariance'], NOW)
    expect(agg.strongPct).toBe(67)  // Math.round(2/3 * 100)
  })

  it('returns 0 strongPct for empty slug list', () => {
    const agg = aggregateForTopic([], [], NOW)
    expect(agg.strongPct).toBe(0)
    expect(agg.total).toBe(0)
  })

  it('is case-insensitive in slug matching', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'level1', last_correct_at: RECENT }),
    ]
    // Lookup using lowercase slug
    const agg = aggregateForTopic(records, ['expected value'], NOW)
    expect(agg.level1).toBe(1)
    expect(agg.newCount).toBe(0)
  })
})
