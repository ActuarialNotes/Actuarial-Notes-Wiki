import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// promoteMissedLevelUp banks a level-up the post-quiz collect gate earned after
// the quiz was already scored. The guest path (userId = null) touches nothing
// but localStorage, so we stub that and mock the DB / side-effect imports the
// module pulls in at load time.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))
vi.mock('@/lib/dailyProgressStore', () => ({
  appendTodayLevelUps: vi.fn(),
  addDailyGems: vi.fn(),
  addDailyQuizStats: vi.fn(),
  appendTodayAnsweredIds: vi.fn(),
}))
vi.mock('@/hooks/useCollectedCards', () => ({
  useCollectedCards: { getState: () => ({ cards: [] }) },
}))

import { promoteMissedLevelUp, readLastSession, LAST_SESSION_KEY } from './quizStore'
import type { CompletedSession, MasteryTransition } from './quizStore'

let store: Map<string, string>

function seedSession(masteryTransitions?: MasteryTransition[]) {
  const session: CompletedSession = {
    questions: [],
    responses: {},
    mode: 'practice',
    correctCount: 1,
    totalQuestions: 1,
    timeTakenSeconds: 10,
    completedAt: new Date().toISOString(),
    ...(masteryTransitions ? { masteryTransitions } : {}),
  }
  store.set(LAST_SESSION_KEY, JSON.stringify(session))
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
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('promoteMissedLevelUp (guest)', () => {
  it('records the level-up on the stored session so the results screen lists it', async () => {
    seedSession()

    const transition = await promoteMissedLevelUp(null, 'FM', 'Accumulation Function')

    expect(transition).toEqual({ conceptSlug: 'Accumulation Function', from: 'new', to: 'level1' })
    expect(readLastSession()?.masteryTransitions).toEqual([
      { conceptSlug: 'Accumulation Function', from: 'new', to: 'level1' },
    ])
  })

  it("keeps the transitions the quiz itself produced", async () => {
    seedSession([{ conceptSlug: 'Force of Interest', from: 'new', to: 'level1' }])

    await promoteMissedLevelUp(null, 'FM', 'Accumulation Function')

    expect(readLastSession()?.masteryTransitions).toEqual([
      { conceptSlug: 'Force of Interest', from: 'new', to: 'level1' },
      { conceptSlug: 'Accumulation Function', from: 'new', to: 'level1' },
    ])
  })

  it('does not duplicate a concept the session already lists', async () => {
    seedSession([{ conceptSlug: 'Accumulation Function', from: 'new', to: 'level1' }])

    await promoteMissedLevelUp(null, 'FM', 'accumulation function')

    expect(readLastSession()?.masteryTransitions).toHaveLength(1)
  })

  it('still promotes when there is no stored session', async () => {
    const transition = await promoteMissedLevelUp(null, 'FM', 'Accumulation Function')

    expect(transition).toEqual({ conceptSlug: 'Accumulation Function', from: 'new', to: 'level1' })
    expect(readLastSession()).toBeNull()
  })
})
