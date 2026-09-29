import { describe, expect, it } from 'vitest'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { describeDecayStep, formatZ, landmarkZ, nextDecayStep, sectorCredibility } from './credibility'

const DAY = 24 * 60 * 60 * 1000
const NOW = new Date('2026-09-29T12:00:00Z')

function record(state: MasteryState, lastCorrectDaysAgo: number | null): ConceptMasteryRecord {
  return {
    ...emptyRecord('u', 'P', 'Bayes Theorem'),
    state,
    last_correct_at: lastCorrectDaysAgo === null ? null : new Date(NOW.getTime() - lastCorrectDaysAgo * DAY).toISOString(),
  }
}

describe('landmark Credibility', () => {
  it('reads the mastery ladder: 0 / 0.33 / 0.67 / 1.00 (§3)', () => {
    expect(formatZ(landmarkZ('new'))).toBe('0.00')
    expect(formatZ(landmarkZ('forgotten'))).toBe('0.00')
    expect(formatZ(landmarkZ('level1'))).toBe('0.33')
    expect(formatZ(landmarkZ('level2'))).toBe('0.67')
    expect(formatZ(landmarkZ('level3'))).toBe('1.00')
  })

  it('clamps a readout into 0–1', () => {
    expect(formatZ(-0.2)).toBe('0.00')
    expect(formatZ(1.4)).toBe('1.00')
  })
})

describe('sector Credibility', () => {
  it('is the readiness score over 100', () => {
    expect(sectorCredibility(62).z).toBeCloseTo(0.62)
    expect(sectorCredibility(62).label).toBe('0.62')
  })

  it('always prints the Dashboard’s rounded percentage over 100 (acceptance: Z × 100 = readiness %)', () => {
    // 28.5 is a float trap: 0.285.toFixed(2) is "0.28", Math.round(28.5) is 29.
    for (const pct of [0, 0.4, 12.5, 28.5, 49.999, 62.5, 99.5, 100]) {
      const c = sectorCredibility(pct)
      expect(c.percent).toBe(Math.round(pct))
      expect(Math.round(Number(c.label) * 100)).toBe(Math.round(pct))
    }
  })
})

describe('orbital decay', () => {
  it('has nothing to lose on a New or Forgotten concept, or one never answered right', () => {
    expect(nextDecayStep(undefined, NOW)).toBeNull()
    expect(nextDecayStep(record('new', null), NOW)).toBeNull()
    expect(nextDecayStep(record('forgotten', 3), NOW)).toBeNull()
    expect(nextDecayStep(record('level2', null), NOW)).toBeNull()
  })

  it('steps Level 3 down after 30 days, Level 2 after 14 more, Level 1 after 7 more', () => {
    const l3 = nextDecayStep(record('level3', 10), NOW)!
    expect([l3.from, l3.to, l3.inDays]).toEqual(['level3', 'level2', 20])
    // 35 days on, the first step has already happened: the next is L2 → L1 at day 44.
    const later = nextDecayStep(record('level3', 35), NOW)!
    expect([later.from, later.to, later.inDays]).toEqual(['level2', 'level1', 9])
    const l2 = nextDecayStep(record('level2', 11), NOW)!
    expect([l2.from, l2.to, l2.inDays]).toEqual(['level2', 'level1', 3])
    const l1 = nextDecayStep(record('level1', 6), NOW)!
    expect([l1.from, l1.to, l1.inDays]).toEqual(['level1', 'forgotten', 1])
  })

  it('agrees with decayIfStale about the date', () => {
    const step = nextDecayStep(record('level2', 11), NOW)!
    expect(step.at.getTime()).toBe(NOW.getTime() - 11 * DAY + 14 * DAY)
  })

  it('says when, the way the sector screen prints it', () => {
    expect(describeDecayStep(nextDecayStep(record('level2', 11), NOW)!)).toBe('L2 → L1 in 3 days')
    expect(describeDecayStep(nextDecayStep(record('level1', 6), NOW)!)).toBe('L1 → Forgotten tomorrow')
  })
})
