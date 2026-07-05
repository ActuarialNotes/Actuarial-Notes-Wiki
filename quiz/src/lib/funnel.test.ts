import { describe, it, expect } from 'vitest'
import {
  reachMilestone,
  decideDay2,
  dayKey,
  recordVisitAndCheckDay2,
  type KeyValueStore,
} from './funnel'

function memoryStore(initial: Record<string, string> = {}): KeyValueStore & { data: Record<string, string> } {
  const data = { ...initial }
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v
    },
  }
}

describe('reachMilestone', () => {
  it('returns true the first time and false thereafter', () => {
    const store = memoryStore()
    expect(reachMilestone('first_quiz', store)).toBe(true)
    expect(reachMilestone('first_quiz', store)).toBe(false)
    expect(reachMilestone('first_quiz', store)).toBe(false)
  })

  it('tracks each milestone independently', () => {
    const store = memoryStore()
    expect(reachMilestone('first_quiz', store)).toBe(true)
    expect(reachMilestone('first_correct', store)).toBe(true)
    expect(reachMilestone('concept_collected', store)).toBe(true)
    expect(reachMilestone('first_quiz', store)).toBe(false)
  })

  it('persists an ISO timestamp under a namespaced key', () => {
    const store = memoryStore()
    reachMilestone('concept_collected', store)
    const value = store.data['actuarial_funnel_concept_collected']
    expect(value).toBeDefined()
    expect(() => new Date(value!).toISOString()).not.toThrow()
  })

  it('returns false when no store is available', () => {
    expect(reachMilestone('first_quiz', null)).toBe(false)
  })
})

describe('dayKey', () => {
  it('produces a YYYY-MM-DD UTC key', () => {
    expect(dayKey(new Date('2026-07-05T23:30:00.000Z'))).toBe('2026-07-05')
  })
})

describe('decideDay2', () => {
  it('seeds the first-visit day without firing on the first ever visit', () => {
    expect(decideDay2(null, false, '2026-07-05')).toEqual({ fire: false, firstVisitDay: '2026-07-05' })
  })

  it('does not fire on the same calendar day as the first visit', () => {
    expect(decideDay2('2026-07-05', false, '2026-07-05')).toEqual({ fire: false, firstVisitDay: '2026-07-05' })
  })

  it('fires when returning on a later day', () => {
    expect(decideDay2('2026-07-05', false, '2026-07-06')).toEqual({ fire: true, firstVisitDay: '2026-07-05' })
  })

  it('does not fire again once day2 has already fired', () => {
    expect(decideDay2('2026-07-05', true, '2026-07-10')).toEqual({ fire: false, firstVisitDay: '2026-07-05' })
  })
})

describe('recordVisitAndCheckDay2', () => {
  it('does not fire on the first visit but records the day', () => {
    const store = memoryStore()
    expect(recordVisitAndCheckDay2(new Date('2026-07-05T10:00:00Z'), store)).toBe(false)
    expect(store.data['actuarial_funnel_first_visit_day']).toBe('2026-07-05')
  })

  it('does not fire on a second visit the same day', () => {
    const store = memoryStore()
    recordVisitAndCheckDay2(new Date('2026-07-05T10:00:00Z'), store)
    expect(recordVisitAndCheckDay2(new Date('2026-07-05T22:00:00Z'), store)).toBe(false)
  })

  it('fires exactly once when the user returns on a later day', () => {
    const store = memoryStore()
    recordVisitAndCheckDay2(new Date('2026-07-05T10:00:00Z'), store)
    expect(recordVisitAndCheckDay2(new Date('2026-07-06T09:00:00Z'), store)).toBe(true)
    // A later same-or-different day never fires it again.
    expect(recordVisitAndCheckDay2(new Date('2026-07-06T20:00:00Z'), store)).toBe(false)
    expect(recordVisitAndCheckDay2(new Date('2026-07-08T08:00:00Z'), store)).toBe(false)
  })

  it('returns false when no store is available', () => {
    expect(recordVisitAndCheckDay2(new Date(), null)).toBe(false)
  })
})
