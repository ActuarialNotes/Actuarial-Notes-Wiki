import { describe, expect, it } from 'vitest'
import { TOP_TIER_INDEX, demoteCount, promoteCount } from './leagues'
import {
  dailyEmailValue,
  examDateValue,
  hourValue,
  isYouRoute,
  leaguePath,
  leagueResultLine,
  leagueRowValue,
  leagueTable,
  ordinal,
  proRowValue,
  questReward,
  readerName,
  signInProvider,
  soundValue,
  weekLeftLabel,
} from './you'

const board = (n: number) => Array.from({ length: n }, (_, i) => ({ rank: i + 1 }))
const shape = (n: number, tier: number) =>
  leagueTable(board(n), tier).map(e => (e.kind === 'row' ? e.row.rank : e.line))

describe('ordinal', () => {
  it('ends in st, nd, rd and th', () => {
    expect([1, 2, 3, 4, 10].map(ordinal)).toEqual(['1st', '2nd', '3rd', '4th', '10th'])
    expect([11, 12, 13, 21, 22, 23, 30].map(ordinal)).toEqual(['11th', '12th', '13th', '21st', '22nd', '23rd', '30th'])
    expect([111, 112, 113, 101].map(ordinal)).toEqual(['111th', '112th', '113th', '101st'])
  })
})

describe('readerName', () => {
  it('prefers the display name, then the email, then You', () => {
    expect(readerName({ email: 'ada@example.com', user_metadata: { display_name: ' Ada ' } })).toBe('Ada')
    expect(readerName({ email: 'ada@example.com', user_metadata: { display_name: '  ' } })).toBe('ada')
    expect(readerName({ email: null, user_metadata: null })).toBe('You')
    expect(readerName(null)).toBe('You')
  })
})

describe('the League row', () => {
  it('is the way in for a reader in no league', () => {
    expect(leagueRowValue({ optedIn: false, tierLabel: 'Bronze', rank: null })).toBe('Join')
  })
  it('is the tier and the rank', () => {
    expect(leagueRowValue({ optedIn: true, tierLabel: 'Silver', rank: 3 })).toBe('Silver · 3rd')
    expect(leagueRowValue({ optedIn: true, tierLabel: 'Silver', rank: null })).toBe('Silver')
  })
  it('carries the exam in its address', () => {
    expect(leaguePath('MAS-I')).toBe('/you/league?exam=MAS-I')
    expect(leaguePath(null)).toBe('/you/league')
  })
})

describe('weekLeftLabel', () => {
  it('counts days, then hours, to Monday 00:00 UTC', () => {
    expect(weekLeftLabel(new Date('2026-11-25T12:00:00Z'))).toBe('4 days left')
    expect(weekLeftLabel(new Date('2026-11-28T12:00:00Z'))).toBe('1 day left')
    expect(weekLeftLabel(new Date('2026-11-29T19:00:00Z'))).toBe('5 hours left')
    expect(weekLeftLabel(new Date('2026-11-29T22:30:00Z'))).toBe('1 hour left')
    expect(weekLeftLabel(new Date('2026-11-29T23:30:00Z'))).toBe('Under an hour left')
  })
})

describe('leagueTable', () => {
  it('puts four above the promotion line and two under the relegation line in a table of ten', () => {
    // promoteCount(10) = 4 and demoteCount(10) = 2 are the rules; the canvas's
    // split is sample data.
    expect(promoteCount(10)).toBe(4)
    expect(demoteCount(10)).toBe(2)
    expect(shape(10, 1)).toEqual([1, 2, 3, 4, 'promoted', 5, 6, 7, 8, 'relegated', 9, 10])
  })
  it('has no relegation line in Bronze and no promotion line at the top', () => {
    expect(shape(10, 0)).toEqual([1, 2, 3, 4, 'promoted', 5, 6, 7, 8, 9, 10])
    expect(shape(10, TOP_TIER_INDEX)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 'relegated', 9, 10])
  })
  it('keeps every row, in order, for any size', () => {
    for (let n = 0; n <= 30; n++) {
      for (let tier = 0; tier <= TOP_TIER_INDEX; tier++) {
        const entries = leagueTable(board(n), tier)
        expect(entries.filter(e => e.kind === 'row').map(e => (e.kind === 'row' ? e.row.rank : 0)))
          .toEqual(board(n).map(r => r.rank))
        const lines = entries.filter(e => e.kind === 'line')
        expect(lines.length).toBeLessThanOrEqual(2)
        expect(new Set(lines.map(l => (l.kind === 'line' ? l.line : ''))).size).toBe(lines.length)
      }
    }
  })
  it('is empty for an empty board', () => {
    expect(leagueTable([], 2)).toEqual([])
  })
})

describe('leagueResultLine', () => {
  it('says where the reader moved and finished', () => {
    expect(leagueResultLine('promoted', 'Gold', 2)).toBe('You moved up to Gold, finishing 2nd.')
    expect(leagueResultLine('demoted', 'Bronze', 28)).toBe('You moved down to Bronze, finishing 28th.')
    expect(leagueResultLine('stayed', 'Silver', null)).toBe('You stayed in Silver.')
  })
})

describe('the values on the Settings rows', () => {
  const now = new Date('2026-11-23T12:00:00')
  it('prints an exam date, with the year when it is another year', () => {
    expect(examDateValue('2026-12-04', now)).toBe('Dec 4')
    expect(examDateValue('2027-01-14', now)).toBe('Jan 14, 2027')
    expect(examDateValue(null, now)).toBe('No date')
    expect(examDateValue('nonsense', now)).toBe('No date')
  })
  it('prints the hour the email is sent', () => {
    expect([0, 7, 12, 19].map(hourValue)).toEqual(['12:00 am', '7:00 am', '12:00 pm', '7:00 pm'])
  })
  it('says Off, the hour, or Pro for the daily email', () => {
    expect(dailyEmailValue({ dailyPlanEmail: true, sendHourLocal: 7 }, true)).toBe('7:00 am')
    expect(dailyEmailValue({ dailyPlanEmail: false, sendHourLocal: 7 }, true)).toBe('Off')
    expect(dailyEmailValue({ dailyPlanEmail: true, sendHourLocal: 7 }, false)).toBe('Pro')
  })
  it('says the volume, or Off', () => {
    expect(soundValue({ enabled: true, volume: 0.6 })).toBe('60%')
    expect(soundValue({ enabled: false, volume: 0.6 })).toBe('Off')
  })
  it('names the Pro row by plan', () => {
    expect(proRowValue({ isPro: false, isBetaTester: false })).toBe('Get Pro')
    expect(proRowValue({ isPro: true, isBetaTester: false })).toBe('Manage')
    expect(proRowValue({ isPro: true, isBetaTester: true })).toBe('Beta tester')
  })
  it('names who signs in an account that has no password', () => {
    expect(signInProvider({ app_metadata: { provider: 'google' } })).toBe('Google')
    expect(signInProvider({ app_metadata: { provider: 'email' } })).toBeNull()
    expect(signInProvider(null)).toBeNull()
  })
})

describe('questReward', () => {
  it('pays gems to an account and XP alone to a visitor', () => {
    expect(questReward({ gems: 10, xp: 30 }, true)).toBe('10 gems and 30 XP')
    expect(questReward({ gems: 10, xp: 30 }, false)).toBe('30 XP')
    expect(questReward({ gems: 0, xp: 30 }, true)).toBe('30 XP')
  })
})

describe('isYouRoute', () => {
  it('is the three screens and nothing under them', () => {
    expect(['/you', '/you/league', '/settings'].every(isYouRoute)).toBe(true)
    expect(['/', '/dashboard', '/you/league/x', '/store'].some(isYouRoute)).toBe(false)
  })
})
