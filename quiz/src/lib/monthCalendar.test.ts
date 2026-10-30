import { describe, it, expect } from 'vitest'
import { addDaysISO, addMonths, compareMonths, monthGrid, monthLabel, monthOf } from './monthCalendar'

describe('monthGrid', () => {
  it('starts on the Monday on or before the 1st', () => {
    // 1 October 2026 is a Thursday.
    const grid = monthGrid({ year: 2026, month: 9 })
    expect(grid[0][0].key).toBe('2026-09-28')
    expect(grid[0][3]).toEqual({ key: '2026-10-01', day: 1, inMonth: true })
    expect(grid[0][2].inMonth).toBe(false)
  })

  it('ends on the Sunday on or after the last day, in whole weeks', () => {
    const grid = monthGrid({ year: 2026, month: 9 })
    const last = grid[grid.length - 1]
    expect(last[6].key).toBe('2026-11-01')
    expect(grid.every(w => w.length === 7)).toBe(true)
    expect(grid.flat().filter(d => d.inMonth)).toHaveLength(31)
  })

  it('needs no padding for a February that starts on a Monday', () => {
    const grid = monthGrid({ year: 2027, month: 1 })
    expect(grid).toHaveLength(4)
    expect(grid.flat().every(d => d.inMonth)).toBe(true)
  })

  it('counts a leap day', () => {
    expect(monthGrid({ year: 2028, month: 1 }).flat().filter(d => d.inMonth)).toHaveLength(29)
  })
})

describe('month arithmetic', () => {
  it('rolls over the year both ways', () => {
    expect(addMonths({ year: 2026, month: 11 }, 1)).toEqual({ year: 2027, month: 0 })
    expect(addMonths({ year: 2027, month: 0 }, -1)).toEqual({ year: 2026, month: 11 })
  })

  it('reads a month off an ISO date and names it', () => {
    expect(monthOf('2027-03-15')).toEqual({ year: 2027, month: 2 })
    expect(monthLabel(monthOf('2027-03-15'))).toBe('March 2027')
  })

  it('orders months', () => {
    expect(compareMonths({ year: 2026, month: 11 }, { year: 2027, month: 0 })).toBeLessThan(0)
    expect(compareMonths(monthOf('2026-10-30'), monthOf('2026-10-01'))).toBe(0)
  })
})

describe('addDaysISO', () => {
  it('crosses month and year ends', () => {
    expect(addDaysISO('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDaysISO('2028-02-28', 1)).toBe('2028-02-29')
  })
})
