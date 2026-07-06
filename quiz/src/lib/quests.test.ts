import { describe, it, expect } from 'vitest'
import {
  applyQuizEvent,
  claimQuests,
  emptyQuests,
  hashString,
  pickDailyQuests,
  questBoard,
  questRewards,
  reseedDailyQuests,
  rollDailyQuests,
  tallyForQuest,
  EMPTY_QUEST_CONTEXT,
  type QuestContext,
  type QuestPools,
  type QuestQuizEvent,
  type QuestAnswer,
} from './quests'
import {
  CORE_QUESTS,
  DAILY_QUEST_COUNT,
  PERFECT_QUIZ_MIN,
  REVIVE_QUESTS,
  SPECIAL_QUESTS,
  makeConceptQuest,
  type QuestDef,
} from '@/data/quests'

function answer(partial: Partial<QuestAnswer> = {}): QuestAnswer {
  return { isCorrect: true, difficulty: 'medium', reviving: false, concepts: [], ...partial }
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
  core: [quest({ id: 'c1' }), quest({ id: 'c2', target: 5 })],
  revive: [
    quest({ id: 'r1', kind: 'revive', target: 1 }),
    quest({ id: 'r2', kind: 'revive', target: 2 }),
    quest({ id: 'r3', kind: 'revive', target: 3 }),
  ],
  special: [
    quest({ id: 's-hard', kind: 'hard_correct', target: 2, gems: 10, xp: 30 }),
    quest({ id: 's-levelup', kind: 'level_up', target: 2 }),
    quest({ id: 's-perfect', kind: 'perfect_quiz', target: 1 }),
    quest({ id: 's-hard-2', kind: 'hard_correct', target: 5 }),
  ],
}

const CONTEXT: QuestContext = { forgottenDue: 0, planConcepts: [] }

describe('quest catalogue', () => {
  it('has unique ids and positive targets/rewards', () => {
    const all = [...CORE_QUESTS, ...REVIVE_QUESTS, ...SPECIAL_QUESTS]
    expect(new Set(all.map(q => q.id)).size).toBe(all.length)
    for (const q of all) {
      expect(q.target).toBeGreaterThan(0)
      expect(q.gems).toBeGreaterThan(0)
      expect(q.xp).toBeGreaterThan(0)
    }
  })

  it('keeps the core pool always-achievable (kind: correct, target ≤ 5)', () => {
    for (const q of CORE_QUESTS) {
      expect(q.kind).toBe('correct')
      expect(q.target).toBeLessThanOrEqual(5)
    }
  })

  it('generates a stable, well-formed focus quest for a concept', () => {
    const q = makeConceptQuest('Sample Space')
    expect(q.id).toBe('concept-sample-space')
    expect(q.kind).toBe('concept_correct')
    expect(q.concept).toBe('Sample Space')
    expect(q.description).toContain('Sample Space')
  })
})

describe('pickDailyQuests', () => {
  it('is deterministic for a given day and context', () => {
    const ctx: QuestContext = { forgottenDue: 2, planConcepts: ['Bond Price', 'Duration'] }
    expect(pickDailyQuests('2026-07-06', ctx, POOLS)).toEqual(pickDailyQuests('2026-07-06', ctx, POOLS))
    expect(pickDailyQuests('2026-07-06')).toEqual(pickDailyQuests('2026-07-06'))
  })

  it('returns one core quest plus specials of distinct kinds', () => {
    for (const day of ['2026-07-06', '2026-07-07', '2026-07-08', '2026-12-31']) {
      const picks = pickDailyQuests(day, CONTEXT, POOLS)
      expect(picks).toHaveLength(DAILY_QUEST_COUNT)
      expect(POOLS.core.some(c => c.id === picks[0].id)).toBe(true)
      expect(new Set(picks.map(q => q.kind)).size).toBe(picks.length)
      expect(new Set(picks.map(q => q.id)).size).toBe(picks.length)
    }
  })

  it('includes a revive quest only when forgotten concepts are due, sized to fit', () => {
    const none = pickDailyQuests('2026-07-06', { ...CONTEXT, forgottenDue: 0 }, POOLS)
    expect(none.some(q => q.kind === 'revive')).toBe(false)

    const one = pickDailyQuests('2026-07-06', { ...CONTEXT, forgottenDue: 1 }, POOLS)
    expect(one.map(q => q.id)).toContain('r1')

    const three = pickDailyQuests('2026-07-06', { ...CONTEXT, forgottenDue: 3 }, POOLS)
    expect(three.map(q => q.id)).toContain('r3')

    // More forgotten than the largest quest → still the largest quest.
    const many = pickDailyQuests('2026-07-06', { ...CONTEXT, forgottenDue: 99 }, POOLS)
    expect(many.map(q => q.id)).toContain('r3')
  })

  it('includes a focus quest on one of today’s plan concepts', () => {
    const ctx: QuestContext = { forgottenDue: 0, planConcepts: ['Bond Price', 'Duration'] }
    const picks = pickDailyQuests('2026-07-06', ctx, POOLS)
    const focus = picks.find(q => q.kind === 'concept_correct')
    expect(focus).toBeDefined()
    expect(ctx.planConcepts).toContain(focus!.concept)
  })

  it('caps the board at DAILY_QUEST_COUNT even with full personalization', () => {
    const ctx: QuestContext = { forgottenDue: 3, planConcepts: ['Bond Price'] }
    const picks = pickDailyQuests('2026-07-06', ctx, POOLS)
    expect(picks).toHaveLength(DAILY_QUEST_COUNT)
    // Personalized quests take priority over generic specials.
    expect(picks.some(q => q.kind === 'revive')).toBe(true)
    expect(picks.some(q => q.kind === 'concept_correct')).toBe(true)
  })

  it('rotates: different days select different boards eventually', () => {
    const days = Array.from({ length: 14 }, (_, i) => `2026-07-${String(i + 1).padStart(2, '0')}`)
    const boards = new Set(days.map(d => pickDailyQuests(d, CONTEXT, POOLS).map(q => q.id).join(',')))
    expect(boards.size).toBeGreaterThan(1)
  })

  it('works with the real catalogue', () => {
    const picks = pickDailyQuests('2026-07-06', { forgottenDue: 2, planConcepts: ['Sample Space'] })
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

describe('tallyForQuest', () => {
  it('counts correct answers', () => {
    const ev = event({ answers: [answer(), answer({ isCorrect: false }), answer()] })
    expect(tallyForQuest({ kind: 'correct' }, ev)).toBe(2)
  })

  it('counts only correct hard answers', () => {
    const ev = event({
      answers: [
        answer({ difficulty: 'hard' }),
        answer({ difficulty: 'hard', isCorrect: false }),
        answer({ difficulty: 'easy' }),
      ],
    })
    expect(tallyForQuest({ kind: 'hard_correct' }, ev)).toBe(1)
  })

  it('counts only correct revivals', () => {
    const ev = event({
      answers: [answer({ reviving: true }), answer({ reviving: true, isCorrect: false }), answer()],
    })
    expect(tallyForQuest({ kind: 'revive' }, ev)).toBe(1)
  })

  it('counts level-ups, clamped to non-negative integers', () => {
    expect(tallyForQuest({ kind: 'level_up' }, event({ levelUps: 3 }))).toBe(3)
    expect(tallyForQuest({ kind: 'level_up' }, event({ levelUps: -2 }))).toBe(0)
  })

  it('counts correct answers on the focus concept, case-insensitively', () => {
    const ev = event({
      answers: [
        answer({ concepts: ['Sample Space'] }),
        answer({ concepts: ['sample space', 'Event'] }),
        answer({ concepts: ['Sample Space'], isCorrect: false }),
        answer({ concepts: ['Event'] }),
      ],
    })
    expect(tallyForQuest({ kind: 'concept_correct', concept: 'Sample Space' }, ev)).toBe(2)
    expect(tallyForQuest({ kind: 'concept_correct' }, ev)).toBe(0)
  })

  it('scores a perfect quiz only at full length with all correct', () => {
    const full = Array.from({ length: PERFECT_QUIZ_MIN }, () => answer())
    expect(tallyForQuest({ kind: 'perfect_quiz' }, event({ answers: full }))).toBe(1)
    // One wrong answer breaks it.
    expect(
      tallyForQuest(
        { kind: 'perfect_quiz' },
        event({ answers: [...full.slice(1), answer({ isCorrect: false })] }),
      ),
    ).toBe(0)
    // Too short doesn't count.
    expect(tallyForQuest({ kind: 'perfect_quiz' }, event({ answers: full.slice(1) }))).toBe(0)
    // A skipped question (answered < total) breaks it.
    expect(
      tallyForQuest({ kind: 'perfect_quiz' }, event({ answers: full, totalQuestions: PERFECT_QUIZ_MIN + 1 })),
    ).toBe(0)
  })
})

describe('rollDailyQuests / reseedDailyQuests', () => {
  it('generates a board on first touch and keeps it for the day', () => {
    const rolled = rollDailyQuests(emptyQuests(), '2026-07-06', CONTEXT, POOLS)
    expect(rolled.day).toBe('2026-07-06')
    expect(rolled.quests).toHaveLength(DAILY_QUEST_COUNT)
    expect(rollDailyQuests(rolled, '2026-07-06', CONTEXT, POOLS)).toBe(rolled)
  })

  it('never re-personalizes an existing board on plain rolls', () => {
    const generic = rollDailyQuests(emptyQuests(), '2026-07-06', CONTEXT, POOLS)
    // A later roll with a richer context must not shift the board mid-day.
    const later = rollDailyQuests(generic, '2026-07-06', { forgottenDue: 3, planConcepts: ['X'] }, POOLS)
    expect(later).toBe(generic)
  })

  it('reseed re-personalizes an untouched board when context changes', () => {
    const generic = rollDailyQuests(emptyQuests(), '2026-07-06', CONTEXT, POOLS)
    const personalized = reseedDailyQuests(generic, '2026-07-06', { forgottenDue: 3, planConcepts: ['X'] }, POOLS)
    expect(personalized).not.toBe(generic)
    expect(personalized.quests.some(q => q.kind === 'revive')).toBe(true)
    // Same context again → stable (no-op).
    expect(reseedDailyQuests(personalized, '2026-07-06', { forgottenDue: 3, planConcepts: ['X'] }, POOLS)).toBe(
      personalized,
    )
  })

  it('reseed leaves a board with progress or claims alone', () => {
    const generic = rollDailyQuests(emptyQuests(), '2026-07-06', CONTEXT, POOLS)
    const touched = { ...generic, progress: { [generic.quests[0].id]: 1 } }
    expect(reseedDailyQuests(touched, '2026-07-06', { forgottenDue: 3, planConcepts: ['X'] }, POOLS)).toBe(touched)
    const claimedState = { ...generic, claimed: [generic.quests[0].id] }
    expect(reseedDailyQuests(claimedState, '2026-07-06', { forgottenDue: 3, planConcepts: ['X'] }, POOLS)).toBe(
      claimedState,
    )
  })
})

describe('applyQuizEvent', () => {
  const quests = [
    quest({ id: 'a', kind: 'correct', target: 3, gems: 5, xp: 15 }),
    quest({ id: 'b', kind: 'hard_correct', target: 2, gems: 10, xp: 30 }),
  ]
  const seeded = (): ReturnType<typeof emptyQuests> => ({
    day: '2026-07-06',
    quests: [...quests],
    progress: {},
    claimed: [],
  })

  it('accumulates progress across quizzes on the same day', () => {
    const ev = event({ answers: [answer(), answer()] })
    const r1 = applyQuizEvent(seeded(), ev, '2026-07-06')
    expect(r1.next.progress).toEqual({ a: 2 })
    expect(r1.completed).toEqual([])
    const r2 = applyQuizEvent(r1.next, ev, '2026-07-06')
    expect(r2.next.progress).toEqual({ a: 4 })
    expect(r2.completed.map(q => q.id)).toEqual(['a'])
  })

  it('reports a completion only on the quiz that crosses the target', () => {
    const ev = event({ answers: [answer(), answer(), answer()] })
    const r1 = applyQuizEvent(seeded(), ev, '2026-07-06')
    expect(r1.completed.map(q => q.id)).toEqual(['a'])
    const r2 = applyQuizEvent(r1.next, ev, '2026-07-06')
    expect(r2.completed).toEqual([])
  })

  it('completion does not auto-claim — the quest stays claimable', () => {
    const ev = event({ answers: [answer(), answer(), answer()] })
    const { next } = applyQuizEvent(seeded(), ev, '2026-07-06')
    expect(next.claimed).toEqual([])
    expect(questBoard(next, '2026-07-06')[0]).toMatchObject({ done: true, claimable: true })
  })

  it('rolls a fresh (generic) board when the day changes', () => {
    const ev = event({ answers: [answer(), answer(), answer()] })
    const r1 = applyQuizEvent(seeded(), ev, '2026-07-06')
    const r2 = applyQuizEvent(r1.next, ev, '2026-07-07', EMPTY_QUEST_CONTEXT, POOLS)
    expect(r2.next.day).toBe('2026-07-07')
    expect(r2.next.claimed).toEqual([])
    expect(r2.next.quests.map(q => q.id)).toEqual(
      pickDailyQuests('2026-07-07', EMPTY_QUEST_CONTEXT, POOLS).map(q => q.id),
    )
  })

  it('is a no-op (same reference) when nothing advances on the current day', () => {
    const ev = event({ answers: [answer({ isCorrect: false })] })
    const base = applyQuizEvent(seeded(), event(), '2026-07-06').next
    const r = applyQuizEvent(base, ev, '2026-07-06')
    expect(r.next).toBe(base)
    expect(r.completed).toEqual([])
  })

  it('can complete multiple quests from one quiz', () => {
    const ev = event({
      answers: [answer({ difficulty: 'hard' }), answer({ difficulty: 'hard' }), answer()],
    })
    const r = applyQuizEvent(seeded(), ev, '2026-07-06')
    expect(r.completed.map(q => q.id).sort()).toEqual(['a', 'b'])
    expect(questRewards(r.completed)).toEqual({ gems: 15, xp: 45 })
  })
})

describe('claimQuests', () => {
  const state = (): ReturnType<typeof emptyQuests> => ({
    day: '2026-07-06',
    quests: [
      quest({ id: 'a', target: 2, gems: 5, xp: 15 }),
      quest({ id: 'b', kind: 'hard_correct', target: 2, gems: 10, xp: 30 }),
    ],
    progress: { a: 2, b: 2 },
    claimed: [],
  })

  it('claims all completed quests by default and never twice', () => {
    const r1 = claimQuests(state(), '2026-07-06')
    expect(r1.claimed.map(q => q.id).sort()).toEqual(['a', 'b'])
    expect(r1.next.claimed.sort()).toEqual(['a', 'b'])
    const r2 = claimQuests(r1.next, '2026-07-06')
    expect(r2.claimed).toEqual([])
    expect(r2.next).toBe(r1.next)
  })

  it('claims only the requested ids', () => {
    const r = claimQuests(state(), '2026-07-06', ['b'])
    expect(r.claimed.map(q => q.id)).toEqual(['b'])
    expect(r.next.claimed).toEqual(['b'])
  })

  it('claims nothing for incomplete quests or a stale day', () => {
    const incomplete = { ...state(), progress: { a: 1 } }
    expect(claimQuests(incomplete, '2026-07-06').claimed).toEqual([])
    expect(claimQuests(state(), '2026-07-07').claimed).toEqual([])
  })
})

describe('questBoard', () => {
  const state = (): ReturnType<typeof emptyQuests> => ({
    day: '2026-07-06',
    quests: [quest({ id: 'a', target: 4 })],
    progress: { a: 2 },
    claimed: [],
  })

  it('reports clamped progress, completion, and claim status', () => {
    expect(questBoard(state(), '2026-07-06')[0]).toMatchObject({
      earned: 2,
      target: 4,
      ratio: 0.5,
      done: false,
      claimable: false,
    })
    const done = { ...state(), progress: { a: 9 } }
    expect(questBoard(done, '2026-07-06')[0]).toMatchObject({
      earned: 4,
      ratio: 1,
      done: true,
      claimed: false,
      claimable: true,
    })
    const collected = { ...done, claimed: ['a'] }
    expect(questBoard(collected, '2026-07-06')[0]).toMatchObject({ claimed: true, claimable: false })
  })

  it('is empty for a stale (previous-day) board', () => {
    expect(questBoard(state(), '2026-07-07')).toEqual([])
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
