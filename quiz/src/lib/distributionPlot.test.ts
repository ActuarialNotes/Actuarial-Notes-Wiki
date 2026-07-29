import { describe, it, expect } from 'vitest'
import { createRng } from '@/lib/distributionMath'
import { DISTRIBUTIONS, defaultParams } from '@/lib/distributions'
import {
  binSamples,
  buildContinuousCurve,
  buildMassPoints,
  drawSamples,
  empiricalCdf,
  formatKpi,
  formatStat,
  formatTick,
  niceTicks,
  summarizeSamples,
  tallySamples,
} from '@/lib/distributionPlot'

describe('buildContinuousCurve', () => {
  it('spans the spec window and traces the density', () => {
    const spec = DISTRIBUTIONS.normal
    const params = { mu: 0, sigma: 1 }
    const curve = buildContinuousCurve(spec, params, 'pdf', 100)
    expect(curve).toHaveLength(101)
    expect(curve[0].x).toBeCloseTo(-4, 10)
    expect(curve[curve.length - 1].x).toBeCloseTo(4, 10)
    const peak = curve.reduce((a, b) => (b.y > a.y ? b : a))
    expect(peak.x).toBeCloseTo(0, 1)
    expect(peak.y).toBeCloseTo(0.3989, 3)
  })

  it('rises monotonically in CDF view', () => {
    const curve = buildContinuousCurve(DISTRIBUTIONS.exponential, { theta: 2 }, 'cdf', 50)
    for (let i = 1; i < curve.length; i++) expect(curve[i].y).toBeGreaterThanOrEqual(curve[i - 1].y)
    expect(curve[curve.length - 1].y).toBeGreaterThan(0.99)
  })

  it('clips an unbounded endpoint so the rest of the curve stays visible', () => {
    // Beta(0.5, 0.5) has f(x) → ∞ at both ends.
    const curve = buildContinuousCurve(DISTRIBUTIONS.beta, { alpha: 0.5, beta: 0.5 }, 'pdf', 100)
    expect(curve.every(pt => Number.isFinite(pt.y))).toBe(true)
    const interior = curve[50].y
    expect(Math.max(...curve.map(pt => pt.y))).toBeLessThan(interior * 100)
  })
})

describe('buildMassPoints', () => {
  it('enumerates the plotted integers with rising cumulative mass', () => {
    const points = buildMassPoints(DISTRIBUTIONS.binomial, { n: 10, p: 0.5 })
    expect(points[0].k).toBe(0)
    expect(points[points.length - 1].k).toBe(10)
    expect(points.reduce((a, pt) => a + pt.mass, 0)).toBeCloseTo(1, 10)
    for (let i = 1; i < points.length; i++) {
      expect(points[i].cumulative).toBeGreaterThanOrEqual(points[i - 1].cumulative)
    }
    expect(points[points.length - 1].cumulative).toBeCloseTo(1, 10)
  })
})

describe('binSamples', () => {
  it('bins into density units that integrate to the in-window share', () => {
    const samples = [0.1, 0.2, 0.25, 0.9, 1.4, 1.9]
    const histogram = binSamples(samples, 0, 2, 4)
    expect(histogram.bins.map(b => b.count)).toEqual([3, 1, 1, 1])
    expect(histogram.n).toBe(6)
    const area = histogram.bins.reduce((a, b) => a + b.density * (b.hi - b.lo), 0)
    expect(area).toBeCloseTo(1, 10)
  })

  it('counts out-of-window draws separately but keeps them in n', () => {
    const histogram = binSamples([-1, 0.5, 5], 0, 1, 2)
    expect(histogram.below).toBe(1)
    expect(histogram.above).toBe(1)
    expect(histogram.n).toBe(3)
    expect(histogram.bins.reduce((a, b) => a + b.count, 0)).toBe(1)
  })

  it('reproduces the density it sampled from', () => {
    const spec = DISTRIBUTIONS.normal
    const params = { mu: 0, sigma: 1 }
    const samples = drawSamples(spec, params, 40000, createRng(99))
    const histogram = binSamples(samples, -4, 4, 32)
    const middle = histogram.bins[16]
    expect(middle.density).toBeCloseTo(spec.density(middle.center, params), 1)
  })
})

describe('tallySamples', () => {
  it('counts per integer as relative frequencies', () => {
    const histogram = tallySamples([1, 1, 2, 3, 3, 3], 1, 3)
    expect(histogram.bins.map(b => b.count)).toEqual([2, 1, 3])
    expect(histogram.bins.map(b => b.density)).toEqual([2 / 6, 1 / 6, 3 / 6])
    expect(histogram.bins[0].lo).toBe(0.5)
    expect(histogram.bins[0].hi).toBe(1.5)
  })

  it('tracks draws past the plotted window', () => {
    const histogram = tallySamples([0, 4, 2], 1, 3)
    expect(histogram.below).toBe(1)
    expect(histogram.above).toBe(1)
  })
})

describe('empiricalCdf', () => {
  it('accumulates to 1 and starts from the below-window share', () => {
    const histogram = tallySamples([0, 1, 2, 3], 1, 3)
    const cdf = empiricalCdf(histogram)
    expect(cdf[0]).toBeCloseTo(0.5, 10) // the 0 plus the 1
    expect(cdf[cdf.length - 1]).toBeCloseTo(1, 10)
  })
})

describe('summarizeSamples', () => {
  it('reports the unbiased variance', () => {
    const summary = summarizeSamples([2, 4, 4, 4, 5, 5, 7, 9])
    expect(summary.n).toBe(8)
    expect(summary.mean).toBeCloseTo(5, 10)
    expect(summary.variance).toBeCloseTo(32 / 7, 10)
    expect(summary.sd).toBeCloseTo(Math.sqrt(32 / 7), 10)
    expect(summary.min).toBe(2)
    expect(summary.max).toBe(9)
  })

  it('degrades gracefully on empty and single-draw input', () => {
    expect(summarizeSamples([]).n).toBe(0)
    expect(Number.isNaN(summarizeSamples([]).mean)).toBe(true)
    expect(summarizeSamples([3]).variance).toBe(0)
  })
})

describe('drawSamples', () => {
  it('appends to an existing run so "draw more" keeps the earlier draws', () => {
    const spec = DISTRIBUTIONS.poisson
    const params = defaultParams(spec)
    const first = drawSamples(spec, params, 10, createRng(1))
    const combined = drawSamples(spec, params, 5, createRng(2), first)
    expect(combined).toHaveLength(15)
    expect(combined).toBe(first)
  })
})

describe('niceTicks', () => {
  it('picks round steps', () => {
    expect(niceTicks(0, 1, 5)).toEqual([0, 0.2, 0.4, 0.6000000000000001, 0.8, 1].map(n => Number(n.toPrecision(12))))
    expect(niceTicks(0, 100, 5)).toEqual([0, 20, 40, 60, 80, 100])
  })

  it('never emits float dust for zero', () => {
    expect(niceTicks(-1, 1, 4)).toContain(0)
  })

  it('degrades on a collapsed range', () => {
    expect(niceTicks(3, 3)).toEqual([3])
  })
})

describe('formatStat', () => {
  it('scales precision with magnitude', () => {
    expect(formatStat(0)).toBe('0')
    expect(formatStat(0.12345)).toBe('0.123')
    expect(formatStat(1.5)).toBe('1.50')
    expect(formatStat(123.456)).toBe('123.5')
    expect(formatStat(123456)).toBe('1.23e+5')
    expect(formatStat(0.0001)).toBe('1.00e-4')
    expect(formatStat(NaN)).toBe('—')
  })

  it('keeps integers whole when asked', () => {
    expect(formatStat(7, { integer: true })).toBe('7')
    expect(formatStat(7.5, { integer: true })).toBe('7.50')
  })
})

describe('formatTick', () => {
  it('drops the trailing zeros nice ticks never need', () => {
    expect(formatTick(-4)).toBe('-4')
    expect(formatTick(0)).toBe('0')
    expect(formatTick(0.2)).toBe('0.2')
    expect(formatTick(0.05)).toBe('0.05')
    expect(formatTick(2.5)).toBe('2.5')
    expect(formatTick(1000)).toBe('1000')
  })

  it('falls back to exponential outside the readable range', () => {
    expect(formatTick(1e6)).toBe('1e+6')
    expect(formatTick(0.0001)).toBe('1e-4')
  })
})

describe('formatKpi', () => {
  it('rounds the headline moments to one decimal', () => {
    expect(formatKpi(3)).toBe('3.0')
    expect(formatKpi(1.71428)).toBe('1.7')
    expect(formatKpi(0.2857)).toBe('0.3')
    expect(formatKpi(-2.44)).toBe('-2.4')
    expect(formatKpi(1234.56)).toBe('1234.6')
  })

  it('keeps small values meaningful instead of showing 0.0', () => {
    expect(formatKpi(0.026)).toBe('0.026')
    expect(formatKpi(0.0012)).toBe('0.0012')
    expect(formatKpi(0)).toBe('0')
  })

  it('goes exponential before the tile overflows', () => {
    expect(formatKpi(4e7)).toBe('4.0e+7')
    expect(formatKpi(NaN)).toBe('—')
  })
})
