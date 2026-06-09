import { describe, it, expect } from 'vitest'
import { periodSortKey, comparePeriods, formatPeriod } from './researchPeriods'

describe('periodSortKey', () => {
  it('orders quarters within a year', () => {
    expect(periodSortKey('Q1_2024')).toBeLessThan(periodSortKey('Q3_2024'))
  })

  it('places a full year just after its Q4 and before next-year Q1', () => {
    expect(periodSortKey('Q4_2023')).toBeLessThan(periodSortKey('FY2023'))
    expect(periodSortKey('FY2023')).toBeLessThan(periodSortKey('Q1_2024'))
  })

  it('sorts unparseable periods last', () => {
    expect(periodSortKey('garbage')).toBeGreaterThan(periodSortKey('Q4_2099'))
  })
})

describe('comparePeriods', () => {
  it('sorts a mixed quarterly/annual array chronologically', () => {
    const input = ['Q1_2024', 'FY2023', 'Q3_2024', 'Q4_2023', 'FY2024']
    expect([...input].sort(comparePeriods)).toEqual([
      'Q4_2023',
      'FY2023',
      'Q1_2024',
      'Q3_2024',
      'FY2024',
    ])
  })
})

describe('formatPeriod', () => {
  it('formats quarters and fiscal years', () => {
    expect(formatPeriod('Q3_2024')).toBe('Q3 2024')
    expect(formatPeriod('FY2023')).toBe('FY 2023')
  })

  it('returns the raw string when unparseable', () => {
    expect(formatPeriod('whatever')).toBe('whatever')
  })
})
