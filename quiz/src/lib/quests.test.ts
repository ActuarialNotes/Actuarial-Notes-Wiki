import { describe, it, expect } from 'vitest'
import {
  applyQuizEvent,
  emptyQuests,
  hashString,
  pickDailyQuests,
  questBoard,
  questRewards,
  tallyForKind,
  type QuestPools,
  type QuestQuizEvent,
} from './quests'
import {
  CORE_QUESTS,
  DAILY_QUEST_COUNT,
  PERFECT_QUIZ_MIN,
  SPECIAL_QUESTS,
  type QuestDef,
} from '@/data/quests'
import type { XpAnswer } from './xp'

function answer(partial: Partial<XpAnswer> = {}): XpAnswer {
  return { isCorrect: true, difficulty: 'medium', reviving: false, ...partial }
}

function event(partial: Partial<QuestQuizEvent> = {}): QuestQuizEvent {
  const answers = partial.answers ?? [answer(), answer()]
  return { answers, levelUps: 0, totalQuestions: answers.length, ...partial }
}

function quest(partial: Partial<QuestDef>): QuestDef {
  return {
    id: 'q',
    title: 'Quest',
    description: '',
    kind: 'correct',
    target: 3,
    gems: 5,
    xp: 10,
    ...partial,
  }
}

// A fixture catalogue with predictable ids so tests don't depend on tuning.
const POOLS: QuestPools = {
  core: [quest({ id: 'c1' }), quest({ id: 'c2', target: 10 })],
  special: [
    quest({ id: 's-hard', kind: 'hard_correct', target: 2, gems: 10, xp: 30 }),
    quest({ id: 's-revive', kind: 'revive', target: 1, gems: 8, xp: 25 }),
    quest({ id: 's-levelup', kind: 'level_up', target: 2 }),
    quest({ id: 's-perfect', kind: 'perfect_quiz', target: 1 }),
    quest({ id: 's-hard-2', kind: 'hard_correct', target: 5 }),
  ],
}

describe('quest catalogue', () => {
  it('has unique ids and positive targets/rewards', () => {
    const all = [...CORE_QUESTS, ...SPECIAL_QUESTS]
    expect(new Set(all.map(q => q.id)).size).toBe(all.length)
    for (const q of all) {
      expect(q.target).toBeGreaterThan(0)
      expect(q.gems).toBeGreaterThan(0)
      expect(q.xp).toBeGreaterThan(0)
    }
  })

  it('keeps the core pool always-achievable (kind: correct)', () => {
    for (const q of CORE_QUESTS) expect(q.kind).toBe('correct')
  })
})

describe('pickDailyQuests', () => {
  it('is deterministic for a given day', () => {
    expect(pickDailyQuests('2026-07-06', POOLS)).toEqual(pickDailyQuests('2026-07-06', POOLS))
    expect(pickDailyQuests('2026-07-06')).toEqual(pickDailyQuests('2026-07-06'))
  })

  it('returns one core quest plus specials of distinct kinds', () => {
    for (const day of ['2026-07-06', '2026-07-07', '2026-07-08', '2026-12-31']) {
      const picks = pickDailyQuests(day, POOLS)
      expect(picks).toHaveLength(DAILY_QUEST_COUNT)
      expect(POOLS.core.some(c => c.id === picks[0].id)).toBe(true)
      const kinds = picks.map(q => q.kind)
      expect(new Set(kinds).size).toBe(kinds.length)
      const ids = picks.map(q => q.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('rotates: different days select different boards eventually', () => {
    const days = Array.from({ length: 14 }, (_, i) => `2026-07-${String(i + 1).padStart(2, '0')}`)
    const boards = new Set(days.map(d => pickDailyQuests(d, POOLS).map(q => q.id).join(',')))
    expect(boards.size).toBeGreaterThan(1)
  })

  it('works with the real catalogue', () => {
    const picks = pickDailyQuests('2026-07-06')
    expect(picks).toHaveLength(DAILY_QUEST_COUNT)
    expect(new Set(picks.map(q => q.kind)).size).toBe(picks.length)
  })
})

describe('hashString', () => {
  it('is stable and spreads distinct inputs', () => {
    expect(hashString('2026-07-06:core')).toBe(hashString('2026-07-06:core'))
    expect(hashString('a')).not.toBe(hashString('b'))
  })
})

describe('tallyForKind', () => {
  it('counts correct answers', () => {
    const ev = event({ answers: [answer(), answer({ isCorrect: false }), answer()] })
    expect(tallyForKind('correct', ev)).toBe(2)
  })

  it('counts only correct hard answers', () => {
    const ev = event({
      answers: [
        answer({ difficulty: 'hard' }),
        answer({ difficulty: 'hard', isCorrect: false }),
        answer({ difficulty: 'easy' }),
      ],
    })
    expect(tallyForKind('hard_correct', ev)).toBe(1)
  })

  it('counts only correct revivals', () => {
    const ev = event({
      answers: [answer({ reviving: true }), answer({ reviving: true, isCorrect: false }), answer()],
    })
    expect(tallyForKind('revive', ev)).toBe(1)
  })

  it('counts level-ups, clamped to non-negative integers', () => {
    expect(tallyForKind('level_up', event({ levelUps: 3 }))).toBe(3)
    expect(tallyForKind('level_up', event({ levelUps: -2 }))).toBe(0)
  })

  it('scores a perfect quiz only at full length with all correct', () => {
    const full = Array.from({ length: PERFECT_QUIZ_MIN }, () => answer())
    expect(tallyForKind('perfect_quiz', event({ answers: full }))).toBe(1)
    // One wrong answer breaks it.
    expect(
      tallyForKind('perfect_quiz', event({ answers: [...full.slice(1), answer({ isCorrect: false })] })),
    ).toBe(0)
    // Too short doesn't count.
    const short = full.slice(1)
    expect(tallyForKind('perfect_quiz', event({ answers: short }))).toBe(0)
    // A skipped question (answered < total) breaks it.
    expect(tallyForKind('perfect_quiz', event({ answers: full, totalQuestions: PERFECT_QUIZ_MIN + 1 }))).toBe(0)
  })
})

describe('applyQuizEvent', () => {
  const quests = [
    quest({ id: 'a', kind: 'correct', target: 3, gems: 5, xp: 15 }),
    quest({ id: 'b', kind: 'hard_correct', target: 2, gems: 10, xp: 30 }),
  ]

  it('accumulates progress across quizzes on the same day', () => {
    const ev = event({ answers: [answer(), answer()] })
    const r1 = applyQuizEvent(emptyQuests(), ev, '2026-07-06', quests)
    expect(r1.next.progress).toEqual({ a: 2 })
    expect(r1.completed).toEqual([])
    const r2 = applyQuizEvent(r1.next, ev, '2026-07-06', quests)
    expect(r2.next.progress).toEqual({ a: 4 })
    expect(r2.completed.map(q => q.id)).toEqual(['a'])
    expect(r2.next.rewarded).toEqual(['a'])
  })

  it('never pays the same quest twice in a day', () => {
    const ev = event({ answers: [answer(), answer(), answer()] })
    const r1 = applyQuizEvent(emptyQuests(), ev, '2026-07-06', quests)
    expect(r1.completed.map(q => q.id)).toEqual(['a'])
    const r2 = applyQuizEvent(r1.next, ev, '2026-07-06', quests)
    expect(r2.completed).toEqual([])
    expect(r2.next.rewarded).toEqual(['a'])
  })

  it('resets progress and rewards when the day rolls over', () => {
    const ev = event({ answers: [answer(), answer(), answer()] })
    const r1 = applyQuizEvent(emptyQuests(), ev, '2026-07-06', quests)
    const r2 = applyQuizEvent(r1.next, ev, '2026-07-07', quests)
    expect(r2.next).toMatchObject({ day: '2026-07-07', progress: { a: 3 }, rewarded: ['a'] })
    // Completing again on the new day pays again — it's a *daily* quest.
    expect(r2.completed.map(q => q.id)).toEqual(['a'])
  })

  it('is a no-op (same reference) when nothing advances on the current day', () => {
    const ev = event({ answers: [answer({ isCorrect: false })] })
    const seeded = applyQuizEvent(emptyQuests(), event(), '2026-07-06', quests).next
    const r = applyQuizEvent(seeded, ev, '2026-07-06', quests)
    expect(r.next).toBe(seeded)
    expect(r.completed).toEqual([])
  })

  it('can complete multiple quests from one quiz', () => {
    const ev = event({
      answers: [answer({ difficulty: 'hard' }), answer({ difficulty: 'hard' }), answer()],
    })
    const r = applyQuizEvent(emptyQuests(), ev, '2026-07-06', quests)
    expect(r.completed.map(q => q.id).sort()).toEqual(['a', 'b'])
    expect(questRewards(r.completed)).toEqual({ gems: 15, xp: 45 })
  })
})

describe('questBoard', () => {
  const quests = [quest({ id: 'a', kind: 'correct', target: 4 })]

  it('reports clamped progress and completion', () => {
    const seeded = applyQuizEvent(
      emptyQuests(),
      event({ answers: [answer(), answer()] }),
      '2026-07-06',
      quests,
    ).next
    expect(questBoard(seeded, '2026-07-06', quests)[0]).toMatchObject({
      earned: 2,
      target: 4,
      ratio: 0.5,
      done: false,
    })
    const done = applyQuizEvent(seeded, event({ answers: [answer(), answer(), answer()] }), '2026-07-06', quests).next
    expect(questBoard(done, '2026-07-06', quests)[0]).toMatchObject({ earned: 4, ratio: 1, done: true })
  })

  it('reads stale (previous-day) progress as zero', () => {
    const seeded = applyQuizEvent(emptyQuests(), event(), '2026-07-05', quests).next
    expect(questBoard(seeded, '2026-07-06', quests)[0]).toMatchObject({ earned: 0, ratio: 0, done: false })
  })
})

describe('questRewards', () => {
  it('sums gem and XP payouts', () => {
    expect(questRewards([])).toEqual({ gems: 0, xp: 0 })
    expect(questRewards([quest({ gems: 5, xp: 15 }), quest({ gems: 10, xp: 30 })])).toEqual({
      gems: 15,
      xp: 45,
    })
  })
})
