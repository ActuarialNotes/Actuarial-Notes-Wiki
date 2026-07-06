import { describe, it, expect } from 'vitest'
import {
  emptyXp,
  addXp,
  setGoal,
  xpEarnedToday,
  goalProgress,
  goalById,
  xpForAnswer,
  xpForAnswers,
  xpForLevelUp,
  xpToReachLevel,
  levelFromXp,
  DAILY_GOALS,
  DEFAULT_GOAL_ID,
  XP_CORRECT,
  XP_ATTEMPT,
  XP_REVIVE_BONUS,
  type XpState,
  type XpAnswer,
} from './xp'

function state(partial: Partial<XpState>): XpState {
  return { ...emptyXp(), ...partial }
}

function answer(partial: Partial<XpAnswer> = {}): XpAnswer {
  return { isCorrect: true, difficulty: 'medium', reviving: false, ...partial }
}

describe('xpForAnswer', () => {
  it('pays more for harder correct answers', () => {
    expect(xpForAnswer(answer({ difficulty: 'easy' }))).toBe(XP_CORRECT.easy)
    expect(xpForAnswer(answer({ difficulty: 'medium' }))).toBe(XP_CORRECT.medium)
    expect(xpForAnswer(answer({ difficulty: 'hard' }))).toBe(XP_CORRECT.hard)
    // Monotonic: easy < medium < hard.
    expect(XP_CORRECT.easy).toBeLessThan(XP_CORRECT.medium)
    expect(XP_CORRECT.medium).toBeLessThan(XP_CORRECT.hard)
  })

  it('gives only the effort amount for an incorrect attempt', () => {
    expect(xpForAnswer(answer({ isCorrect: false, difficulty: 'hard' }))).toBe(XP_ATTEMPT)
    expect(XP_ATTEMPT).toBeLessThan(XP_CORRECT.easy)
  })

  it('adds the revive bonus only on a correct revival', () => {
    expect(xpForAnswer(answer({ difficulty: 'medium', reviving: true }))).toBe(
      XP_CORRECT.medium + XP_REVIVE_BONUS,
    )
    // No bonus when the revival attempt was wrong.
    expect(xpForAnswer(answer({ isCorrect: false, reviving: true }))).toBe(XP_ATTEMPT)
  })

  it('sums a batch of answers', () => {
    const total = xpForAnswers([
      answer({ difficulty: 'easy' }),
      answer({ difficulty: 'hard', reviving: true }),
      answer({ isCorrect: false }),
    ])
    expect(total).toBe(XP_CORRECT.easy + (XP_CORRECT.hard + XP_REVIVE_BONUS) + XP_ATTEMPT)
  })
})

describe('level curve', () => {
  it('first level-up costs 100 and each subsequent costs 40 more', () => {
    expect(xpForLevelUp(1)).toBe(100)
    expect(xpForLevelUp(2)).toBe(140)
    expect(xpForLevelUp(3)).toBe(180)
  })

  it('cumulative XP to reach a level sums the prior level-ups', () => {
    expect(xpToReachLevel(1)).toBe(0)
    expect(xpToReachLevel(2)).toBe(100)
    expect(xpToReachLevel(3)).toBe(100 + 140)
    expect(xpToReachLevel(4)).toBe(100 + 140 + 180)
  })

  it('levelFromXp is the inverse of the cumulative curve', () => {
    expect(levelFromXp(0)).toMatchObject({ level: 1, xpIntoLevel: 0, xpForLevel: 100 })
    expect(levelFromXp(99)).toMatchObject({ level: 1, xpIntoLevel: 99 })
    expect(levelFromXp(100)).toMatchObject({ level: 2, xpIntoLevel: 0, xpForLevel: 140 })
    expect(levelFromXp(239)).toMatchObject({ level: 2, xpIntoLevel: 139 })
    expect(levelFromXp(240)).toMatchObject({ level: 3, xpIntoLevel: 0 })
  })

  it('clamps and floors odd inputs', () => {
    expect(levelFromXp(-50).level).toBe(1)
    expect(levelFromXp(150.9)).toMatchObject({ level: 2, xpIntoLevel: 50 })
  })
})

describe('goalById', () => {
  it('resolves known ids and falls back to the default', () => {
    expect(goalById('intense').xp).toBe(350)
    expect(goalById('nonsense').id).toBe(DEFAULT_GOAL_ID)
    expect(goalById(null).id).toBe(DEFAULT_GOAL_ID)
  })

  it('exposes goals in ascending difficulty', () => {
    const xps = DAILY_GOALS.map(g => g.xp)
    expect(xps).toEqual([...xps].sort((a, b) => a - b))
  })
})

describe('addXp', () => {
  it('accumulates total and today on the same day', () => {
    const s0 = emptyXp()
    const s1 = addXp(s0, 30, '2026-07-06')
    expect(s1).toMatchObject({ totalXp: 30, today: '2026-07-06', todayXp: 30 })
    const s2 = addXp(s1, 20, '2026-07-06')
    expect(s2).toMatchObject({ totalXp: 50, today: '2026-07-06', todayXp: 50 })
  })

  it('resets the daily counter when the day rolls over but keeps total', () => {
    const s1 = addXp(emptyXp(), 40, '2026-07-06')
    const s2 = addXp(s1, 25, '2026-07-07')
    expect(s2).toMatchObject({ totalXp: 65, today: '2026-07-07', todayXp: 25 })
  })

  it('is a no-op for a zero/negative gain on the same day', () => {
    const s1 = addXp(emptyXp(), 10, '2026-07-06')
    expect(addXp(s1, 0, '2026-07-06')).toBe(s1)
    expect(addXp(s1, -5, '2026-07-06')).toBe(s1)
  })

  it('floors fractional gains', () => {
    expect(addXp(emptyXp(), 12.9, '2026-07-06').totalXp).toBe(12)
  })
})

describe('setGoal', () => {
  it('changes the goal and no-ops when unchanged', () => {
    const s = state({ goalId: 'regular' })
    expect(setGoal(s, 'regular')).toBe(s)
    expect(setGoal(s, 'intense').goalId).toBe('intense')
  })
})

describe('xpEarnedToday / goalProgress', () => {
  it('reads today’s XP and zeroes a stale day', () => {
    const s = state({ today: '2026-07-06', todayXp: 70 })
    expect(xpEarnedToday(s, '2026-07-06')).toBe(70)
    expect(xpEarnedToday(s, '2026-07-07')).toBe(0)
  })

  it('scores progress against the selected goal and clamps the ratio', () => {
    const s = state({ goalId: 'regular', today: '2026-07-06', todayXp: 50 })
    const p = goalProgress(s, '2026-07-06')
    expect(p).toMatchObject({ target: 100, earned: 50, ratio: 0.5, met: false })
  })

  it('marks the goal met and clamps ratio at 1 when exceeded', () => {
    const s = state({ goalId: 'casual', today: '2026-07-06', todayXp: 80 })
    const p = goalProgress(s, '2026-07-06')
    expect(p).toMatchObject({ target: 50, met: true, ratio: 1 })
  })

  it('reads as unmet on a fresh day', () => {
    const s = state({ goalId: 'casual', today: '2026-07-05', todayXp: 999 })
    expect(goalProgress(s, '2026-07-06')).toMatchObject({ earned: 0, met: false, ratio: 0 })
  })
})
