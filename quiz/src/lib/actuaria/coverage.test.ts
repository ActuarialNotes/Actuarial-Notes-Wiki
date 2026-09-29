import { describe, expect, it } from 'vitest'
import { emptyStreak, type StreakState } from '@/lib/streak'
import { coverageMonth, guestRunDays, shiftMonth, studiedDays, studiedInMonth } from './coverage'

describe('studied days', () => {
  it('counts a day only when a completed quiz got at least one answer right', () => {
    const days = studiedDays(
      [
        { completed_at: '2026-09-02T15:00:00Z', correct_count: 3 },
        { completed_at: '2026-09-03T15:00:00Z', correct_count: 0 },
        { completed_at: '2026-09-04T15:00:00Z', correct_count: 1 },
        { completed_at: null, correct_count: 2 },
      ],
      'UTC',
    )
    expect([...days].sort()).toEqual(['2026-09-02', '2026-09-04'])
  })

  it('files a quiz under the player’s own day, not UTC’s', () => {
    // 01:30 UTC on the 5th is still the evening of the 4th in Toronto.
    const days = studiedDays([{ completed_at: '2026-09-05T01:30:00Z', correct_count: 1 }], 'America/Toronto')
    expect([...days]).toEqual(['2026-09-04'])
  })
})

describe('a guest’s coverage', () => {
  const state = (patch: Partial<StreakState>): StreakState => ({ ...emptyStreak(), ...patch })

  it('is the current run and nothing older', () => {
    const days = guestRunDays(state({ currentStreak: 3, longestStreak: 9, lastActiveDay: '2026-09-28' }), '2026-09-29')
    expect([...days].sort()).toEqual(['2026-09-26', '2026-09-27', '2026-09-28'])
  })

  it('is empty once the streak has lapsed', () => {
    expect(guestRunDays(state({ currentStreak: 4, lastActiveDay: '2026-09-20' }), '2026-09-29').size).toBe(0)
    expect(guestRunDays(emptyStreak(), '2026-09-29').size).toBe(0)
  })
})

describe('the coverage calendar', () => {
  const studied = new Set(['2026-09-01', '2026-09-15', '2026-08-31'])
  const weeks = coverageMonth('2026-09', '2026-09-29', studied)

  it('draws whole weeks, Sunday first, around the month', () => {
    // 1 September 2026 is a Tuesday.
    expect(weeks[0].map(d => d.key)).toEqual([
      '2026-08-30', '2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05',
    ])
    expect(weeks.every(w => w.length === 7)).toBe(true)
    expect(weeks.at(-1)!.at(-1)!.key).toBe('2026-10-03')
    expect(weeks.flat().filter(d => d.inMonth)).toHaveLength(30)
  })

  it('marks studied days, today and the future — and nothing for a freeze', () => {
    const flat = weeks.flat()
    expect(flat.find(d => d.key === '2026-09-15')!.studied).toBe(true)
    expect(flat.find(d => d.key === '2026-08-31')!.inMonth).toBe(false)
    expect(flat.filter(d => d.today).map(d => d.key)).toEqual(['2026-09-29'])
    expect(flat.find(d => d.key === '2026-09-30')!.future).toBe(true)
    expect(studiedInMonth('2026-09', studied)).toBe(2)
  })

  it('steps between months across a year', () => {
    expect(shiftMonth('2026-01', -1)).toBe('2025-12')
    expect(shiftMonth('2026-12', 1)).toBe('2027-01')
  })
})
