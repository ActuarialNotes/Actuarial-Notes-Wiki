import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// streakStore wires the pure streak engine to Supabase / localStorage. The guest
// path (userId = null) only touches localStorage + a window dispatch, so we stub
// those and mock the DB + analytics side-imports to exercise the celebration
// marker without a browser.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))
vi.mock('@/lib/analytics', () => ({ trackStreakExtended: vi.fn() }))

import {
  readStreakCelebration,
  consumeStreakCelebration,
  recordStreakActivity,
} from './streakStore'
import { localDayKey } from './streak'

const CELEBRATION_KEY = 'actuarial_streak_celebration'
const STATE_KEY = 'actuarial_streak_state'

let store: Map<string, string>

beforeEach(() => {
  store = new Map<string, string>()
  const localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: () => null,
    length: 0,
  }
  vi.stubGlobal('localStorage', localStorage)
  // A minimal window: dispatchEvent is enough (CustomEvent construction is
  // wrapped in try/catch in the module, so it degrades gracefully under Node).
  vi.stubGlobal('window', { dispatchEvent: vi.fn() })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const today = () => localDayKey(new Date())

describe('readStreakCelebration', () => {
  it('returns null when nothing is stored', () => {
    expect(readStreakCelebration()).toBeNull()
  })

  it("ignores a marker left over from another day", () => {
    store.set(CELEBRATION_KEY, JSON.stringify({ day: '2000-01-01', streak: 5, increased: true }))
    expect(readStreakCelebration()).toBeNull()
  })

  it("returns today's marker verbatim", () => {
    store.set(CELEBRATION_KEY, JSON.stringify({ day: today(), streak: 3, increased: true }))
    expect(readStreakCelebration()).toEqual({ day: today(), streak: 3, increased: true })
  })
})

describe('consumeStreakCelebration', () => {
  it('flips a shown increase to not-increased so it never replays', () => {
    store.set(CELEBRATION_KEY, JSON.stringify({ day: today(), streak: 4, increased: true }))
    consumeStreakCelebration()
    expect(readStreakCelebration()).toEqual({ day: today(), streak: 4, increased: false })
  })

  it('is a no-op when there is nothing to consume', () => {
    consumeStreakCelebration()
    expect(readStreakCelebration()).toBeNull()
  })
})

describe('recordStreakActivity (guest)', () => {
  it('marks the first-ever streak as an increase to 1', async () => {
    await recordStreakActivity(null)
    expect(readStreakCelebration()).toEqual({ day: today(), streak: 1, increased: true })
  })

  it('marks a repeat quiz on the same day as no increase', async () => {
    await recordStreakActivity(null)
    consumeStreakCelebration() // pretend the first celebration was shown
    await recordStreakActivity(null)
    const marker = readStreakCelebration()
    expect(marker?.increased).toBe(false)
    expect(marker?.streak).toBe(1)
  })

  it('celebrates a lapsed streak restarting from 0 to 1', async () => {
    // A stored streak that has already lapsed (missed days, no freezes) displays
    // as 0; recording today restarts it at 1, which counts as a visible increase.
    store.set(
      STATE_KEY,
      JSON.stringify({
        currentStreak: 6,
        longestStreak: 6,
        lastActiveDay: '2000-01-01',
        freezes: 0,
        lastBrokenStreak: 0,
        lastBrokenOn: null,
      }),
    )
    await recordStreakActivity(null)
    expect(readStreakCelebration()).toEqual({ day: today(), streak: 1, increased: true })
  })
})
