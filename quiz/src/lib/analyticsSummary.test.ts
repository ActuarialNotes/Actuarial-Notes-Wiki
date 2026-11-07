import { describe, expect, it } from 'vitest'
import { costliestSection, dailyColumns, formatMarks, spanTitle } from './analyticsSummary'
import type { SectionLeak } from './performanceAnalytics'

describe('dailyColumns', () => {
  it('lays the span out day by day, empty days as zeros, today last', () => {
    const cols = dailyColumns({
      span: 7,
      days: [
        { day: '2026-11-02', answered: 4, correct: 4, byDifficulty: {} as never, answers: [] },
        { day: '2026-11-03', answered: 3, correct: 2, byDifficulty: {} as never, answers: [] },
      ],
    }, '2026-11-07')
    expect(cols.map(c => c.day)).toEqual([
      '2026-11-01', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06', '2026-11-07',
    ])
    expect(cols.map(c => [c.answered, c.correct])).toEqual([[0, 0], [4, 4], [3, 2], [0, 0], [0, 0], [0, 0], [0, 0]])
  })

  it('crosses a month end', () => {
    const cols = dailyColumns({ span: 30, days: [] }, '2026-03-02')
    expect(cols).toHaveLength(30)
    expect(cols[0].day).toBe('2026-02-01')
    expect(cols.at(-1)!.day).toBe('2026-03-02')
  })
})

describe('the tiles', () => {
  const leak = (name: string, marksLost: number | null): SectionLeak =>
    ({ name, share: 30, answered: 5, correct: 4, marksLost, concepts: [] })

  it('names the costliest judged section, or none', () => {
    expect(costliestSection([leak('A', 9.4), leak('B', 4.4)])?.name).toBe('A')
    expect(costliestSection([leak('A', null)])).toBeNull()
  })

  it('prints marks and spans as the cards do', () => {
    expect(formatMarks(9.4)).toBe('9.4')
    expect(formatMarks(4)).toBe('4')
    expect(formatMarks(12.6)).toBe('13')
    expect(spanTitle(7)).toBe('Past week')
    expect(spanTitle(90)).toBe('Past 90 days')
  })
})
