import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// A concept's flashcard is collected the moment it first reaches Level 1 — no
// comprehension check (docs/flashcard-collection.md). The guest path of
// completeQuiz (userId = null) touches nothing but localStorage and the local
// stores, so we stub those and mock the DB / side-effect imports the module
// pulls in at load time.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))
vi.mock('@/lib/dailyProgressStore', () => ({
  appendTodayLevelUps: vi.fn(),
  addDailyGems: vi.fn(),
  addDailyQuizStats: vi.fn(),
  appendTodayAnsweredIds: vi.fn(),
}))
vi.mock('@/lib/streakStore', () => ({ recordStreakActivity: vi.fn() }))
vi.mock('@/lib/xpStore', () => ({ recordXp: vi.fn() }))
vi.mock('@/lib/questStore', () => ({ recordQuestProgress: vi.fn() }))
vi.mock('@/lib/leagueStore', () => ({ recordLeagueXp: vi.fn() }))
vi.mock('@/lib/analytics', () => ({ trackConceptCollected: vi.fn() }))

const collected = new Set<string>()
const collect = vi.fn((name: string, _opts?: { silent?: boolean }) => void collected.add(name.toLowerCase()))
vi.mock('@/hooks/useCollectedCards', () => ({
  useCollectedCards: {
    getState: () => ({
      isCollected: (name: string) => collected.has(name.toLowerCase()),
      collect,
    }),
  },
}))
const addCard = vi.fn()
vi.mock('@/hooks/useFlashcards', () => ({
  useFlashcards: { getState: () => ({ cards: [], addCard }) },
}))

import { useQuizStore, readLastSession } from './quizStore'
import type { Question } from '@/lib/parser'
import type { ConceptMasteryRecord } from '@/lib/mastery'

let store: Map<string, string>

function question(id: string, concept: string): Question {
  return {
    id,
    exam: 'Financial Mathematics',
    topic: 'Interest',
    learning_objective: '',
    difficulty: 'easy',
    type: 'multiple-choice',
    wiki_link: [concept],
    answer: 'A',
    explanation: '',
    points: 1,
    stem: '',
    options: [],
  }
}

async function finish(answers: Array<[Question, string]>, prior: ConceptMasteryRecord[] = []) {
  useQuizStore.setState({
    questions: answers.map(([q]) => q),
    responses: Object.fromEntries(answers.map(([q, chosen]) => [q.id, { chosen, timeSpent: 1 }])),
    mode: 'quiz',
    startedAt: new Date(),
    manualGrades: {},
  })
  await useQuizStore.getState().completeQuiz(null, prior)
}

beforeEach(() => {
  store = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: () => null,
    length: 0,
  })
  collected.clear()
  collect.mockClear()
  addCard.mockClear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('completeQuiz collects a card on reaching Level 1 (guest)', () => {
  it('collects and decks a New concept answered correctly', async () => {
    await finish([[question('q1', 'Accumulation Function'), 'A']])

    expect(collect).toHaveBeenCalledWith('Accumulation Function')
    expect(addCard).toHaveBeenCalledWith({ kind: 'concept', name: 'Accumulation Function' })
    // The stored session marks the level-up as the collection, so /review's
    // ceremony plays the collect animation for it.
    expect(readLastSession()?.masteryTransitions).toEqual([
      { conceptSlug: 'Accumulation Function', from: 'new', to: 'level1', collected: true },
    ])
  })

  it('collects nothing for a wrong answer — the concept stays New', async () => {
    await finish([[question('q1', 'Accumulation Function'), 'B']])

    expect(collect).not.toHaveBeenCalled()
    expect(addCard).not.toHaveBeenCalled()
  })

  it('does not re-collect a card the learner already holds', async () => {
    collected.add('accumulation function')
    await finish([[question('q1', 'Accumulation Function'), 'A']])

    expect(collect).not.toHaveBeenCalled()
    expect(readLastSession()?.masteryTransitions?.[0]?.collected).toBeUndefined()
  })

  it('back-fills a card learned before collection silently, with no ceremony', async () => {
    const forgotten: ConceptMasteryRecord = {
      user_id: '', exam_id: 'FM', concept_slug: 'Accumulation Function', state: 'forgotten',
      correct_count: 3, hard_correct_count: 0, incorrect_streak: 0,
      last_correct_at: '2020-01-01T00:00:00.000Z', last_attempted_at: '2020-01-01T00:00:00.000Z',
    }
    await finish([[question('q1', 'Accumulation Function'), 'A']], [forgotten])

    expect(collect).toHaveBeenCalledWith('Accumulation Function', { silent: true })
    expect(addCard).not.toHaveBeenCalled()
    expect(readLastSession()?.masteryTransitions?.[0]?.collected).toBeUndefined()
  })
})
