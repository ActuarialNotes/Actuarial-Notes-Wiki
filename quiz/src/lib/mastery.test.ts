import { describe, it, expect } from 'vitest'
import {
  applyAnswer,
  decayIfStale,
  aggregateForTopic,
  emptyRecord,
  FORGET_AFTER_DAYS,
  STRONG_CORRECT_THRESHOLD,
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
  it('transitions to learning on first correct answer', () => {
    expect(correct(rec()).state).toBe('learning')
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

// ── applyAnswer: learning state ─────────────────────────────────────────────

describe('learning state', () => {
  function learningRec(overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
    return rec({ state: 'learning', correct_count: 1, last_correct_at: RECENT, ...overrides })
  }

  it('stays learning on correct below threshold', () => {
    const r = learningRec({ correct_count: 2 })
    expect(correct(r).state).toBe('learning')
  })

  it('stays learning when threshold met but no hard correct', () => {
    const r = learningRec({ correct_count: STRONG_CORRECT_THRESHOLD - 1 })
    // correct but easy — count becomes STRONG_CORRECT_THRESHOLD, hard_correct_count stays 0
    expect(correct(r, false).state).toBe('learning')
  })

  it('stays learning when enough hard corrects but total count below threshold', () => {
    const r = learningRec({ correct_count: 1, hard_correct_count: 1 })
    expect(correct(r, true).state).toBe('learning')
  })

  it('transitions to strong when count >= threshold AND at least one hard correct', () => {
    // Reach count = STRONG_CORRECT_THRESHOLD - 1 with one hard, then one more hard
    const r = learningRec({ correct_count: STRONG_CORRECT_THRESHOLD - 1, hard_correct_count: 1 })
    expect(correct(r, true).state).toBe('strong')
  })

  it('transitions to strong with easy final answer if count and hard threshold already met', () => {
    const r = learningRec({ correct_count: STRONG_CORRECT_THRESHOLD - 1, hard_correct_count: 1 })
    expect(correct(r, false).state).toBe('strong')
  })

  it('transitions to forgotten after 3 consecutive wrong answers', () => {
    let r = learningRec()
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('forgotten')
  })

  it('resets incorrect_streak on correct answer', () => {
    const afterTwo = wrong(wrong(learningRec()))
    expect(correct(afterTwo).incorrect_streak).toBe(0)
  })

  it('does not transition to forgotten in fewer than 3 wrong answers', () => {
    let r = learningRec()
    for (let i = 0; i < FORGET_FAIL_STREAK - 1; i++) r = wrong(r)
    expect(r.state).toBe('learning')
  })
})

// ── applyAnswer: strong state ───────────────────────────────────────────────

describe('strong state', () => {
  function strongRec(): ConceptMasteryRecord {
    return rec({
      state: 'strong',
      correct_count: STRONG_CORRECT_THRESHOLD,
      hard_correct_count: 1,
      last_correct_at: RECENT,
    })
  }

  it('stays strong on correct answer', () => {
    expect(correct(strongRec()).state).toBe('strong')
  })

  it('transitions to forgotten after 3 consecutive wrong answers', () => {
    let r = strongRec()
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('forgotten')
  })
})

// ── applyAnswer: forgotten state ────────────────────────────────────────────

describe('forgotten state', () => {
  function forgottenRec(): ConceptMasteryRecord {
    return rec({ state: 'forgotten' })
  }

  it('transitions to learning on correct answer', () => {
    expect(correct(forgottenRec()).state).toBe('learning')
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

  it('decays learning to forgotten when last_correct_at is older than FORGET_AFTER_DAYS', () => {
    const r = rec({ state: 'learning', last_correct_at: STALE })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('decays strong to forgotten when last_correct_at is older than FORGET_AFTER_DAYS', () => {
    const r = rec({ state: 'strong', last_correct_at: STALE })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('does not decay learning when last_correct_at is recent', () => {
    const r = rec({ state: 'learning', last_correct_at: RECENT })
    expect(decayIfStale(r, NOW).state).toBe('learning')
  })

  it('does not decay strong when last_correct_at is recent', () => {
    const r = rec({ state: 'strong', last_correct_at: RECENT })
    expect(decayIfStale(r, NOW).state).toBe('strong')
  })

  it('resets incorrect_streak to 0 on decay', () => {
    const r = rec({ state: 'learning', last_correct_at: STALE, incorrect_streak: 2 })
    expect(decayIfStale(r, NOW).incorrect_streak).toBe(0)
  })

  it(`decays exactly at ${FORGET_AFTER_DAYS} days boundary`, () => {
    const exactlyStale = new Date(NOW.getTime() - FORGET_AFTER_DAYS * 24 * 60 * 60 * 1000).toISOString()
    const r = rec({ state: 'learning', last_correct_at: exactlyStale })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  it('does not decay one ms before boundary', () => {
    const notQuite = new Date(NOW.getTime() - FORGET_AFTER_DAYS * 24 * 60 * 60 * 1000 + 1).toISOString()
    const r = rec({ state: 'learning', last_correct_at: notQuite })
    expect(decayIfStale(r, NOW).state).toBe('learning')
  })
})

// ── applyAnswer applies decay before transition ───────────────────────────

describe('applyAnswer applies decay before computing next state', () => {
  it('stale strong → forgotten first, then correct transitions to learning (not stays strong)', () => {
    const staleStrong = rec({
      state: 'strong',
      correct_count: STRONG_CORRECT_THRESHOLD,
      hard_correct_count: 1,
      last_correct_at: STALE,
    })
    // Decay makes it forgotten; then correct → learning (not strong, which would skip forgotten)
    expect(correct(staleStrong).state).toBe('learning')
  })
})

// ── aggregateForTopic ─────────────────────────────────────────────────────

describe('aggregateForTopic', () => {
  const slugs = ['Expected Value', 'Variance', 'Covariance', 'Probability', 'Mean']

  it('counts all as new when no records exist', () => {
    const agg = aggregateForTopic([], slugs, NOW)
    expect(agg.total).toBe(5)
    expect(agg.newCount).toBe(5)
    expect(agg.strong).toBe(0)
    expect(agg.learning).toBe(0)
    expect(agg.forgotten).toBe(0)
    expect(agg.strongPct).toBe(0)
  })

  it('correctly counts mixed states', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'strong', last_correct_at: RECENT }),
      rec({ concept_slug: 'Variance', state: 'learning', last_correct_at: RECENT }),
      rec({ concept_slug: 'Covariance', state: 'forgotten' }),
    ]
    const agg = aggregateForTopic(records, slugs, NOW)
    expect(agg.strong).toBe(1)
    expect(agg.learning).toBe(1)
    expect(agg.forgotten).toBe(1)
    expect(agg.newCount).toBe(2)   // Probability + Mean have no record
    expect(agg.total).toBe(5)
  })

  it('applies decay at display time — stale strong counts as forgotten', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'strong', last_correct_at: STALE }),
    ]
    const agg = aggregateForTopic(records, ['Expected Value'], NOW)
    expect(agg.strong).toBe(0)
    expect(agg.forgotten).toBe(1)
  })

  it('computes strongPct as percentage of total', () => {
    const records: ConceptMasteryRecord[] = [
      rec({ concept_slug: 'Expected Value', state: 'strong', last_correct_at: RECENT }),
      rec({ concept_slug: 'Variance', state: 'strong', last_correct_at: RECENT }),
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
      rec({ concept_slug: 'Expected Value', state: 'learning', last_correct_at: RECENT }),
    ]
    // Lookup using lowercase slug
    const agg = aggregateForTopic(records, ['expected value'], NOW)
    expect(agg.learning).toBe(1)
    expect(agg.newCount).toBe(0)
  })
})
