import { describe, it, expect } from 'vitest'
import {
  applyAnswer,
  decayIfStale,
  aggregateForTopic,
  emptyRecord,
  FORGET_AFTER_DAYS,
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
  LEVEL2_CORRECT_THRESHOLD,
  LEVEL3_CORRECT_THRESHOLD,
  FORGET_FAIL_STREAK,
  type ConceptMasteryRecord,
} from './mastery'

const NOW = new Date('2026-05-01T12:00:00Z')
const RECENT = new Date('2026-04-25T12:00:00Z').toISOString()  // 6 days ago — inside all decay windows

// Stale dates scoped to each level's threshold in the decay ladder.
// level1 decays at 7d, level2 at 14d, level3 at 30d.
const STALE_L1 = new Date(NOW.getTime() -  8 * 24 * 60 * 60 * 1000).toISOString()  //  8d — past level1 threshold only
const STALE_L2 = new Date(NOW.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString()  // 15d — past level2 threshold
const STALE_L3 = new Date(NOW.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString()  // 31d — past level3 threshold (→ level2)
// 52 days crosses all cumulative thresholds (30+14+7=51), cascading level3 → forgotten.
const STALE = new Date(NOW.getTime() - 52 * 24 * 60 * 60 * 1000).toISOString()

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

  it('stays level1 (not forgotten) when promoted within the same session then failed 3 times', () => {
    // Concept starts new, gets one correct (→ level1, last_correct_at = today),
    // then hits the streak threshold. Because level1 was earned today it cannot
    // immediately be forgotten — that would let a never-learned concept skip to
    // forgotten without ever being genuinely consolidated.
    let r = correct(rec())
    expect(r.state).toBe('level1')
    for (let i = 0; i < FORGET_FAIL_STREAK; i++) r = wrong(r)
    expect(r.state).toBe('level1')
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

// ── applyAnswer: collection gate ────────────────────────────────────────────

describe('collection gate (new → level1)', () => {
  it('promotes new → level1 when collected (default)', () => {
    expect(applyAnswer(rec(), { isCorrect: true, isHard: false, at: NOW, collected: true }).state).toBe('level1')
  })

  it('holds at new on correct answer when not collected', () => {
    const r = applyAnswer(rec(), { isCorrect: true, isHard: false, at: NOW, collected: false })
    expect(r.state).toBe('new')
  })

  it('still accumulates correct_count while uncollected so progress is not lost', () => {
    let r = rec()
    r = applyAnswer(r, { isCorrect: true, isHard: false, at: NOW, collected: false })
    r = applyAnswer(r, { isCorrect: true, isHard: false, at: NOW, collected: false })
    expect(r.state).toBe('new')
    expect(r.correct_count).toBe(2)
  })

  it('promotes to level1 once collected even after prior uncollected correct answers', () => {
    let r = rec()
    r = applyAnswer(r, { isCorrect: true, isHard: false, at: NOW, collected: false })
    expect(r.state).toBe('new')
    // Same day, now collected: the next correct answer earns level1.
    r = applyAnswer(r, { isCorrect: true, isHard: false, at: NOW, collected: true })
    expect(r.state).toBe('level1')
  })

  it('does not gate a previously-learned (forgotten) concept regardless of collected flag', () => {
    const forgotten = rec({ state: 'forgotten', correct_count: 3 })
    expect(applyAnswer(forgotten, { isCorrect: true, isHard: false, at: NOW, collected: false }).state).toBe('level1')
  })
})

// ── applyAnswer: level1 state ───────────────────────────────────────────────

describe('level1 state', () => {
  function level1Rec(overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
    return rec({ state: 'level1', correct_count: 1, last_correct_at: RECENT, ...overrides })
  }

  it('stays level1 on correct below level2 threshold', () => {
    // correct_count 0 → 1 after correct, still below LEVEL2_CORRECT_THRESHOLD (2)
    const r = level1Rec({ correct_count: 0 })
    expect(correct(r).state).toBe('level1')
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
  // ── States that never decay ────────────────────────────────────────────────
  it('does not decay new state', () => {
    expect(decayIfStale(rec({ state: 'new' }), NOW).state).toBe('new')
  })

  it('does not decay forgotten state', () => {
    const r = rec({ state: 'forgotten', last_correct_at: STALE })
    expect(decayIfStale(r, NOW).state).toBe('forgotten')
  })

  // ── Nothing decays within the safe window ─────────────────────────────────
  it('does not decay level1 when last_correct_at is recent (6 days)', () => {
    expect(decayIfStale(rec({ state: 'level1', last_correct_at: RECENT }), NOW).state).toBe('level1')
  })

  it('does not decay level2 when last_correct_at is recent (6 days)', () => {
    expect(decayIfStale(rec({ state: 'level2', last_correct_at: RECENT }), NOW).state).toBe('level2')
  })

  it('does not decay level3 when last_correct_at is recent (6 days)', () => {
    expect(decayIfStale(rec({ state: 'level3', last_correct_at: RECENT }), NOW).state).toBe('level3')
  })

  // ── Level 1 threshold: 7 days ──────────────────────────────────────────────
  it('decays level1 → forgotten at exactly DECAY_DAYS_LEVEL1 boundary', () => {
    const exactly = new Date(NOW.getTime() - DECAY_DAYS_LEVEL1 * 24 * 60 * 60 * 1000).toISOString()
    expect(decayIfStale(rec({ state: 'level1', last_correct_at: exactly }), NOW).state).toBe('forgotten')
  })

  it('does not decay level1 one ms before the 7-day boundary', () => {
    const notYet = new Date(NOW.getTime() - DECAY_DAYS_LEVEL1 * 24 * 60 * 60 * 1000 + 1).toISOString()
    expect(decayIfStale(rec({ state: 'level1', last_correct_at: notYet }), NOW).state).toBe('level1')
  })

  it('decays level1 → forgotten when 8 days stale', () => {
    expect(decayIfStale(rec({ state: 'level1', last_correct_at: STALE_L1 }), NOW).state).toBe('forgotten')
  })

  // ── Level 2 threshold: 14 days ─────────────────────────────────────────────
  it('does not decay level2 when only 8 days stale (below 14-day threshold)', () => {
    expect(decayIfStale(rec({ state: 'level2', last_correct_at: STALE_L1 }), NOW).state).toBe('level2')
  })

  it('decays level2 → level1 at exactly DECAY_DAYS_LEVEL2 boundary', () => {
    const exactly = new Date(NOW.getTime() - DECAY_DAYS_LEVEL2 * 24 * 60 * 60 * 1000).toISOString()
    expect(decayIfStale(rec({ state: 'level2', last_correct_at: exactly }), NOW).state).toBe('level1')
  })

  it('decays level2 → level1 when 15 days stale', () => {
    expect(decayIfStale(rec({ state: 'level2', last_correct_at: STALE_L2 }), NOW).state).toBe('level1')
  })

  it('decays level2 → forgotten when 21+ days stale (14+7 cascade)', () => {
    const twentyTwo = new Date(NOW.getTime() - 22 * 24 * 60 * 60 * 1000).toISOString()
    expect(decayIfStale(rec({ state: 'level2', last_correct_at: twentyTwo }), NOW).state).toBe('forgotten')
  })

  // ── Level 3 threshold: 30 days ─────────────────────────────────────────────
  it('does not decay level3 when only 15 days stale (below 30-day threshold)', () => {
    expect(decayIfStale(rec({ state: 'level3', last_correct_at: STALE_L2 }), NOW).state).toBe('level3')
  })

  it('decays level3 → level2 at exactly DECAY_DAYS_LEVEL3 boundary', () => {
    const exactly = new Date(NOW.getTime() - DECAY_DAYS_LEVEL3 * 24 * 60 * 60 * 1000).toISOString()
    expect(decayIfStale(rec({ state: 'level3', last_correct_at: exactly }), NOW).state).toBe('level2')
  })

  it('decays level3 → level2 when 31 days stale (no further cascade)', () => {
    // 31 days crosses level3 threshold (30d) but not level2 cumulative (44d)
    expect(decayIfStale(rec({ state: 'level3', last_correct_at: STALE_L3 }), NOW).state).toBe('level2')
  })

  it('decays level3 → level1 when 44+ days stale (30+14 cascade)', () => {
    const fortyfive = new Date(NOW.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString()
    expect(decayIfStale(rec({ state: 'level3', last_correct_at: fortyfive }), NOW).state).toBe('level1')
  })

  it('decays level3 → forgotten after 51+ days of total neglect (30+14+7 cascade)', () => {
    // STALE = 52 days — crosses all cumulative thresholds
    expect(decayIfStale(rec({ state: 'level3', last_correct_at: STALE }), NOW).state).toBe('forgotten')
  })

  // ── Side effects ───────────────────────────────────────────────────────────
  it('resets incorrect_streak to 0 on any decay', () => {
    const r = rec({ state: 'level1', last_correct_at: STALE_L1, incorrect_streak: 2 })
    expect(decayIfStale(r, NOW).incorrect_streak).toBe(0)
  })

  // FORGET_AFTER_DAYS is kept as a deprecated alias for DECAY_DAYS_LEVEL1 (= 7)
  it('FORGET_AFTER_DAYS equals DECAY_DAYS_LEVEL1 (backward-compat alias)', () => {
    expect(FORGET_AFTER_DAYS).toBe(DECAY_DAYS_LEVEL1)
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
