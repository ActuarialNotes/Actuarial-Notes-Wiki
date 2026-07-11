import { describe, it, expect } from 'vitest'
import {
  LEAGUE_TIERS,
  TOP_TIER_INDEX,
  tierByIndex,
  promoteCount,
  demoteCount,
  zoneForRank,
  weekStartUtc,
  weekEndUtc,
  weekKey,
  timeUntilWeekEnd,
  formatWeekCountdown,
} from './leagues'

describe('tier ladder', () => {
  it('runs Bronze → Diamond with contiguous indexes', () => {
    expect(LEAGUE_TIERS[0].id).toBe('bronze')
    expect(LEAGUE_TIERS[TOP_TIER_INDEX].id).toBe('diamond')
    LEAGUE_TIERS.forEach((t, i) => expect(t.index).toBe(i))
  })

  it('tierByIndex clamps out-of-range values', () => {
    expect(tierByIndex(-1).id).toBe('bronze')
    expect(tierByIndex(2).id).toBe('gold')
    expect(tierByIndex(99).id).toBe('diamond')
    expect(tierByIndex(1.9).id).toBe('silver') // floors fractions
  })
})

// These lock the zone formulas that are duplicated in the SQL migration
// (league_rollover_if_due in 20260710_leagues.sql): promote = min(10, ceil(n/3)),
// demote = min(5, floor(n/5)). If a test here needs changing, change the SQL too.
describe('promotion/demotion zone sizes', () => {
  it('matches the SQL formulas at a full cohort of 30', () => {
    expect(promoteCount(30)).toBe(10)
    expect(demoteCount(30)).toBe(5)
  })

  it('degrades sensibly for small cohorts', () => {
    expect(promoteCount(1)).toBe(1) // a lone active member still promotes
    expect(demoteCount(1)).toBe(0)
    expect(promoteCount(2)).toBe(1)
    expect(demoteCount(2)).toBe(0)
    expect(promoteCount(4)).toBe(2)
    expect(demoteCount(4)).toBe(0)
    expect(promoteCount(5)).toBe(2)
    expect(demoteCount(5)).toBe(1)
    expect(promoteCount(15)).toBe(5)
    expect(demoteCount(15)).toBe(3)
  })

  it('never overlaps zones', () => {
    for (let n = 1; n <= 40; n++) {
      expect(promoteCount(n) + demoteCount(n)).toBeLessThanOrEqual(n)
    }
  })

  it('handles empty/invalid sizes', () => {
    expect(promoteCount(0)).toBe(0)
    expect(demoteCount(0)).toBe(0)
  })
})

describe('zoneForRank', () => {
  it('splits a full mid-tier cohort into the three zones', () => {
    // Silver (index 1), 30 members: ranks 1-10 promote, 26-30 demote.
    expect(zoneForRank(1, 30, 1)).toBe('promotion')
    expect(zoneForRank(10, 30, 1)).toBe('promotion')
    expect(zoneForRank(11, 30, 1)).toBe('safe')
    expect(zoneForRank(25, 30, 1)).toBe('safe')
    expect(zoneForRank(26, 30, 1)).toBe('demotion')
    expect(zoneForRank(30, 30, 1)).toBe('demotion')
  })

  it('has no promotion zone at the top tier', () => {
    expect(zoneForRank(1, 30, TOP_TIER_INDEX)).toBe('safe')
    expect(zoneForRank(30, 30, TOP_TIER_INDEX)).toBe('demotion')
  })

  it('has no demotion zone at the bottom tier', () => {
    expect(zoneForRank(30, 30, 0)).toBe('safe')
    expect(zoneForRank(1, 30, 0)).toBe('promotion')
  })

  it('promotes a lone member of a mid-tier cohort', () => {
    expect(zoneForRank(1, 1, 2)).toBe('promotion')
  })
})

describe('the UTC week clock', () => {
  it('anchors any weekday to that week Monday 00:00 UTC', () => {
    // 2026-07-10 is a Friday; its week began Monday 2026-07-06.
    const friday = new Date('2026-07-10T15:30:00Z')
    expect(weekStartUtc(friday).toISOString()).toBe('2026-07-06T00:00:00.000Z')
    expect(weekEndUtc(friday).toISOString()).toBe('2026-07-13T00:00:00.000Z')
  })

  it('keeps Sunday night and Monday midnight in different weeks', () => {
    const sundayNight = new Date('2026-07-12T23:59:59Z')
    const mondayMidnight = new Date('2026-07-13T00:00:00Z')
    expect(weekKey(sundayNight)).toBe('2026-07-06')
    expect(weekKey(mondayMidnight)).toBe('2026-07-13')
  })

  it('a Monday is its own week start', () => {
    const monday = new Date('2026-07-06T00:00:00Z')
    expect(weekStartUtc(monday).toISOString()).toBe('2026-07-06T00:00:00.000Z')
  })

  it('weekKey is stable across the whole week', () => {
    for (let day = 6; day <= 12; day++) {
      const d = new Date(Date.UTC(2026, 6, day, 12, 0, 0))
      expect(weekKey(d)).toBe('2026-07-06')
    }
  })

  it('handles month/year boundaries', () => {
    // Thursday 2026-01-01: its week began Monday 2025-12-29.
    expect(weekKey(new Date('2026-01-01T10:00:00Z'))).toBe('2025-12-29')
  })
})

describe('countdown', () => {
  it('counts down to the next Monday 00:00 UTC', () => {
    // Friday 15:30 → Monday 00:00 is 2d 8h 30m away.
    const friday = new Date('2026-07-10T15:30:00Z')
    expect(timeUntilWeekEnd(friday)).toEqual({ days: 2, hours: 8, minutes: 30 })
    expect(formatWeekCountdown(friday)).toBe('2d 8h')
  })

  it('drops to hours/minutes near the boundary', () => {
    const sundayEvening = new Date('2026-07-12T18:48:00Z')
    expect(formatWeekCountdown(sundayEvening)).toBe('5h 12m')
    const finalMinutes = new Date('2026-07-12T23:35:00Z')
    expect(formatWeekCountdown(finalMinutes)).toBe('25m')
  })

  it('never goes negative at the exact boundary', () => {
    const monday = new Date('2026-07-06T00:00:00Z')
    // At the boundary the "remaining" time is the full next week.
    expect(timeUntilWeekEnd(monday)).toEqual({ days: 7, hours: 0, minutes: 0 })
  })
})
