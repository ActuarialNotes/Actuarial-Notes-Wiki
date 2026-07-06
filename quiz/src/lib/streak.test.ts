import { describe, it, expect } from 'vitest'
import {
  emptyStreak,
  localDayKey,
  dayNumber,
  daysBetween,
  streakStatus,
  effectiveStreak,
  recordActivity,
  canRepair,
  repairStreak,
  type StreakState,
} from './streak'

// Helpers to build states tersely.
function state(partial: Partial<StreakState>): StreakState {
  return { ...emptyStreak(), ...partial }
}

describe('localDayKey', () => {
  it('formats a date as YYYY-MM-DD in the given timezone', () => {
    // 2026-07-06T02:00Z is still 2026-07-05 in America/New_York (UTC-4).
    const d = new Date('2026-07-06T02:00:00Z')
    expect(localDayKey(d, 'America/New_York')).toBe('2026-07-05')
    expect(localDayKey(d, 'UTC')).toBe('2026-07-06')
  })

  it('rolls the day at the local, not UTC, midnight', () => {
    // 23:30 local in Tokyo (UTC+9) on the 6th is the 6th, not the 7th.
    const d = new Date('2026-07-06T14:30:00Z') // 23:30 JST
    expect(localDayKey(d, 'Asia/Tokyo')).toBe('2026-07-06')
  })
})

describe('dayNumber / daysBetween', () => {
  it('counts calendar days regardless of hours', () => {
    expect(daysBetween('2026-07-05', '2026-07-06')).toBe(1)
    expect(daysBetween('2026-07-06', '2026-07-06')).toBe(0)
    expect(daysBetween('2026-07-06', '2026-07-10')).toBe(4)
    expect(daysBetween('2026-07-10', '2026-07-06')).toBe(-4)
  })

  it('spans month and year boundaries', () => {
    expect(daysBetween('2026-01-31', '2026-02-01')).toBe(1)
    expect(daysBetween('2025-12-31', '2026-01-01')).toBe(1)
    expect(dayNumber('1970-01-01')).toBe(0)
  })
})

describe('recordActivity', () => {
  it('starts a streak on first activity', () => {
    const next = recordActivity(emptyStreak(), '2026-07-06')
    expect(next.currentStreak).toBe(1)
    expect(next.longestStreak).toBe(1)
    expect(next.lastActiveDay).toBe('2026-07-06')
  })

  it('is idempotent within the same day', () => {
    const day1 = recordActivity(emptyStreak(), '2026-07-06')
    const again = recordActivity(day1, '2026-07-06')
    expect(again).toEqual(day1)
    expect(again.currentStreak).toBe(1)
  })

  it('increments on consecutive days', () => {
    let s = recordActivity(emptyStreak(), '2026-07-06')
    s = recordActivity(s, '2026-07-07')
    s = recordActivity(s, '2026-07-08')
    expect(s.currentStreak).toBe(3)
    expect(s.longestStreak).toBe(3)
  })

  it('resets to 1 after a missed day with no freezes', () => {
    let s = recordActivity(emptyStreak(), '2026-07-06')
    s = recordActivity(s, '2026-07-07') // streak 2
    s = recordActivity(s, '2026-07-10') // missed 8th & 9th, no freezes
    expect(s.currentStreak).toBe(1)
    expect(s.longestStreak).toBe(2) // best preserved
    expect(s.lastBrokenStreak).toBe(2)
    expect(s.lastBrokenOn).toBe('2026-07-10')
  })

  it('consumes a freeze to bridge a single missed day', () => {
    let s = state({ currentStreak: 4, longestStreak: 4, lastActiveDay: '2026-07-06', freezes: 1 })
    s = recordActivity(s, '2026-07-08') // missed the 7th; 1 freeze covers it
    expect(s.currentStreak).toBe(5)
    expect(s.freezes).toBe(0)
    expect(s.lastBrokenStreak).toBe(0) // never lapsed
  })

  it('consumes multiple freezes for multiple missed days', () => {
    let s = state({ currentStreak: 3, longestStreak: 3, lastActiveDay: '2026-07-06', freezes: 2 })
    s = recordActivity(s, '2026-07-09') // missed 7th & 8th; needs 2 freezes
    expect(s.currentStreak).toBe(4)
    expect(s.freezes).toBe(0)
  })

  it('lapses when freezes are insufficient, without spending them', () => {
    let s = state({ currentStreak: 3, longestStreak: 5, lastActiveDay: '2026-07-06', freezes: 1 })
    s = recordActivity(s, '2026-07-10') // missed 3 days, only 1 freeze
    expect(s.currentStreak).toBe(1)
    expect(s.freezes).toBe(1) // untouched — not enough to bother
    expect(s.longestStreak).toBe(5)
    expect(s.lastBrokenStreak).toBe(3)
  })

  it('tracks longest streak across a break', () => {
    let s = emptyStreak()
    for (const d of ['2026-07-01', '2026-07-02', '2026-07-03']) s = recordActivity(s, d)
    s = recordActivity(s, '2026-07-06') // break
    for (const d of ['2026-07-07', '2026-07-08']) s = recordActivity(s, d)
    expect(s.currentStreak).toBe(3)
    expect(s.longestStreak).toBe(3)
  })
})

describe('streakStatus / effectiveStreak', () => {
  it('is inactive when never started', () => {
    expect(streakStatus(emptyStreak(), '2026-07-06')).toBe('inactive')
    expect(effectiveStreak(emptyStreak(), '2026-07-06')).toBe(0)
  })

  it('is active on the day of activity', () => {
    const s = state({ currentStreak: 5, lastActiveDay: '2026-07-06' })
    expect(streakStatus(s, '2026-07-06')).toBe('active')
    expect(effectiveStreak(s, '2026-07-06')).toBe(5)
  })

  it('is at_risk the day after activity', () => {
    const s = state({ currentStreak: 5, lastActiveDay: '2026-07-06' })
    expect(streakStatus(s, '2026-07-07')).toBe('at_risk')
    expect(effectiveStreak(s, '2026-07-07')).toBe(5) // still alive to show
  })

  it('stays at_risk while freezes can still cover the gap', () => {
    const s = state({ currentStreak: 5, lastActiveDay: '2026-07-06', freezes: 2 })
    expect(streakStatus(s, '2026-07-08')).toBe('at_risk') // 1 missed day, 2 freezes
  })

  it('is inactive once the gap exceeds available freezes', () => {
    const s = state({ currentStreak: 5, lastActiveDay: '2026-07-06', freezes: 0 })
    expect(streakStatus(s, '2026-07-08')).toBe('inactive')
    expect(effectiveStreak(s, '2026-07-08')).toBe(0) // don't show a dead count
  })
})

describe('repair', () => {
  it('can be repaired the day the streak lapsed', () => {
    let s = state({ currentStreak: 6, longestStreak: 6, lastActiveDay: '2026-07-06', freezes: 0 })
    s = recordActivity(s, '2026-07-10') // lapses, currentStreak -> 1
    expect(canRepair(s, '2026-07-10')).toBe(true)
    const repaired = repairStreak(s, '2026-07-10')
    expect(repaired.currentStreak).toBe(7) // 6 restored + today
    expect(repaired.lastBrokenStreak).toBe(0)
    expect(repaired.longestStreak).toBe(7)
  })

  it('cannot be repaired on a later day', () => {
    let s = state({ currentStreak: 6, lastActiveDay: '2026-07-06', freezes: 0 })
    s = recordActivity(s, '2026-07-10')
    expect(canRepair(s, '2026-07-11')).toBe(false)
    expect(repairStreak(s, '2026-07-11')).toEqual(s) // no-op
  })

  it('is a no-op when nothing is broken', () => {
    const s = state({ currentStreak: 3, lastActiveDay: '2026-07-06' })
    expect(canRepair(s, '2026-07-06')).toBe(false)
    expect(repairStreak(s, '2026-07-06')).toEqual(s)
  })
})
