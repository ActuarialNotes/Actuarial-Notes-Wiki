import { describe, expect, it } from 'vitest'
import {
  accuracyColumns, bucketTallies, marksBars, paceLine, paceReadout, scaleColumns, spanFromStored,
  tileColumns, totalMarksLost,
} from './todayAnalytics'
import type { AccuracyDay, Tally } from './accuracyTrend'
import type { PacingResult, SectionLeak } from './performanceAnalytics'

const day = (d: string, answered: number, correct: number): AccuracyDay =>
  ({ day: d, answered, correct, byDifficulty: {} as never, answers: [] })
const t = (answered: number, correct: number): Tally => ({ answered, correct })

describe('spanFromStored', () => {
  it('reads one of the three spans and falls back to 30', () => {
    expect(spanFromStored('7')).toBe(7)
    expect(spanFromStored('90')).toBe(90)
    expect(spanFromStored(null)).toBe(30)
    expect(spanFromStored('14')).toBe(30)
    expect(spanFromStored('')).toBe(30)
  })
})

describe('bucketTallies', () => {
  it('leaves a span that fits alone', () => {
    expect(bucketTallies([t(1, 1), t(2, 0)], 30)).toEqual([t(1, 1), t(2, 0)])
  })

  it('pools 90 days into 30 columns of three days', () => {
    const days = Array.from({ length: 90 }, (_, i) => t(i === 89 ? 4 : 1, i === 89 ? 3 : 1))
    const out = bucketTallies(days, 30)
    expect(out).toHaveLength(30)
    expect(out[0]).toEqual(t(3, 3))
    expect(out[29]).toEqual(t(6, 5))
    expect(out.reduce((n, c) => n + c.answered, 0)).toBe(93)
  })

  it('counts buckets back from the newest day, so the short one is the oldest', () => {
    const out = bucketTallies([t(1, 0), t(1, 0), t(1, 0), t(1, 0), t(1, 0)], 2)
    expect(out).toEqual([t(2, 0), t(3, 0)])
  })
})

describe('scaleColumns', () => {
  it('fills the height with the tallest column', () => {
    expect(scaleColumns([t(10, 10), t(5, 5), t(0, 0)], 72)).toEqual([
      { correct: 72, missed: 0 }, { correct: 36, missed: 0 }, { correct: 0, missed: 0 },
    ])
  })

  it('leaves room for the gap in a column with both segments', () => {
    const [col] = scaleColumns([t(10, 5)], 72)
    expect(col).toEqual({ correct: 35, missed: 35 })
    expect(col.correct + col.missed + 2).toBeLessThanOrEqual(72)
  })

  it('never draws a segment with answers under two pixels, nor a column over the height', () => {
    const cols = scaleColumns([t(100, 99), t(1, 0), t(100, 1)], 16, 1)
    expect(cols[0]).toEqual({ correct: 13, missed: 2 })
    expect(cols[1]).toEqual({ correct: 0, missed: 2 })
    expect(cols[2]).toEqual({ correct: 2, missed: 13 })
    for (const c of cols) expect(c.correct + c.missed + 1).toBeLessThanOrEqual(16)
  })

  it('is all zeros with no answers', () => {
    expect(scaleColumns([t(0, 0), t(0, 0)], 72)).toEqual([{ correct: 0, missed: 0 }, { correct: 0, missed: 0 }])
  })
})

describe('accuracyColumns and tileColumns', () => {
  const days = [day('2026-11-20', 4, 4), day('2026-11-23', 8, 6)]

  it('draws one column per day of a short span, today last', () => {
    const cols = accuracyColumns({ span: 7, days }, '2026-11-23')
    expect(cols).toHaveLength(7)
    expect(cols[3]).toEqual({ correct: 36, missed: 0 })
    expect(cols[6]).toEqual({ correct: 52, missed: 18 })
    expect(cols[0]).toEqual({ correct: 0, missed: 0 })
  })

  it('pools 90 days into 30 columns', () => {
    expect(accuracyColumns({ span: 90, days }, '2026-11-23')).toHaveLength(30)
  })

  it('gives the tile its last ten days at 16 pixels', () => {
    const cols = tileColumns({ span: 30, days }, 10, '2026-11-23')
    expect(cols).toHaveLength(10)
    expect(cols[9]).toEqual({ correct: 11, missed: 4 })
    expect(cols[6]).toEqual({ correct: 8, missed: 0 })
  })
})

describe('paceLine', () => {
  it('puts the exam at 60% and the reader to the same scale', () => {
    expect(paceLine(360, 360)).toEqual({ tick: 60, dot: 60 })
    expect(paceLine(379, 360)).toEqual({ tick: 60, dot: 63.2 })
    expect(paceLine(180, 360)).toEqual({ tick: 60, dot: 30 })
  })

  it('keeps a very slow reader inside the line', () => {
    expect(paceLine(3600, 360)?.dot).toBe(100)
  })

  it('is null with nothing to place', () => {
    expect(paceLine(null, 360)).toBeNull()
    expect(paceLine(100, 0)).toBeNull()
  })

  it('reads a pacing result, and nothing from one with no median', () => {
    const base: PacingResult = {
      pace: { minutes: 180, per: 'question', units: 30 },
      allowed: 360,
      overall: { answered: 12, median: 379 },
      byDifficulty: {} as never,
    }
    expect(paceReadout(base)).toEqual({ median: 379, allowed: 360, per: 'question', line: { tick: 60, dot: 63.2 } })
    expect(paceReadout({ ...base, overall: { answered: 2, median: null } })).toBeNull()
    expect(paceReadout(null)).toBeNull()
  })
})

describe('marks lost', () => {
  const leak = (name: string, share: number, marksLost: number | null): SectionLeak =>
    ({ name, share, answered: 5, correct: 3, marksLost, concepts: [] })
  const leaks = [leak('Univariate', 45, 12), leak('Multivariate', 25, 5), leak('General', 25, null)]

  it('sizes each bar by its share of the exam, the widest section full width', () => {
    expect(marksBars(leaks).map(b => b.width)).toEqual([100, 56, 56])
  })

  it('makes the lost part the marks lost over the section share, and none for an unjudged section', () => {
    expect(marksBars(leaks).map(b => b.lost)).toEqual([27, 20, null])
  })

  it('totals the judged sections only', () => {
    expect(totalMarksLost(leaks)).toBe(17)
    expect(totalMarksLost([leak('General', 25, null)])).toBeNull()
    expect(totalMarksLost([])).toBeNull()
  })

  it('draws nothing wide for a syllabus with no weights', () => {
    expect(marksBars([leak('A', 0, null)])).toEqual([{ name: 'A', width: 0, lost: null, marksLost: null }])
  })
})
