/**
 * Pure plotting/summarizing helpers for the distribution simulators.
 *
 * The component in `components/wiki/DistributionSimulator.tsx` owns the SVG and
 * the React state; everything numeric — sampling the curve, binning the drawn
 * variates into a histogram, summarizing them, choosing axis ticks — lives here
 * so it can be unit-tested without a DOM.
 */

import type { DistParams, DistributionSpec } from '@/lib/distributions'
import type { Rng } from '@/lib/distributionMath'

export interface CurvePoint {
  x: number
  y: number
}

export interface MassPoint {
  k: number
  /** P(X = k). */
  mass: number
  /** P(X ≤ k). */
  cumulative: number
}

export interface HistogramBin {
  lo: number
  hi: number
  center: number
  count: number
  /** Count scaled so the bars are comparable with the density curve. */
  density: number
}

export interface Histogram {
  bins: HistogramBin[]
  /** Draws that fell left of / right of the plotted window (still counted in n). */
  below: number
  above: number
  n: number
}

export interface SampleSummary {
  n: number
  mean: number
  /** Unbiased (n−1) sample variance. */
  variance: number
  sd: number
  min: number
  max: number
}

/** Densities can be unbounded at an endpoint (Beta with α<1, Gamma with α<1). */
const MAX_PLOTTED_DENSITY_MULTIPLE = 1.6

/**
 * Evaluate a continuous density (or CDF) across the plotting window.
 *
 * Infinite endpoint densities are clipped to a small multiple of the largest
 * finite value so one asymptote can't flatten the rest of the curve.
 */
export function buildContinuousCurve(
  spec: DistributionSpec,
  params: DistParams,
  view: 'pdf' | 'cdf',
  steps = 240,
): CurvePoint[] {
  const [lo, hi] = spec.range(params)
  const points: CurvePoint[] = []
  let maxFinite = 0
  for (let i = 0; i <= steps; i++) {
    const x = lo + ((hi - lo) * i) / steps
    const y = view === 'pdf' ? spec.density(x, params) : spec.cdf(x, params)
    if (Number.isFinite(y)) maxFinite = Math.max(maxFinite, y)
    points.push({ x, y })
  }
  const ceiling = maxFinite * MAX_PLOTTED_DENSITY_MULTIPLE
  return points.map(pt => ({
    x: pt.x,
    y: Number.isFinite(pt.y) ? Math.min(pt.y, ceiling) : ceiling,
  }))
}

/** Enumerate the plotted integers of a discrete distribution. */
export function buildMassPoints(spec: DistributionSpec, params: DistParams): MassPoint[] {
  const [lo, hi] = spec.range(params)
  const points: MassPoint[] = []
  for (let k = Math.round(lo); k <= Math.round(hi); k++) {
    points.push({ k, mass: spec.density(k, params), cumulative: spec.cdf(k, params) })
  }
  return points
}

/** Draw `count` variates, appending to whatever has already been drawn. */
export function drawSamples(
  spec: DistributionSpec,
  params: DistParams,
  count: number,
  rng: Rng,
  into: number[] = [],
): number[] {
  for (let i = 0; i < count; i++) into.push(spec.sample(params, rng))
  return into
}

/** Bin continuous draws over [lo, hi] and scale the bars to density units. */
export function binSamples(samples: number[], lo: number, hi: number, binCount: number): Histogram {
  const width = (hi - lo) / binCount
  const counts = new Array<number>(binCount).fill(0)
  let below = 0
  let above = 0
  for (const value of samples) {
    if (value < lo) { below++; continue }
    if (value > hi) { above++; continue }
    const idx = Math.min(binCount - 1, Math.floor((value - lo) / width))
    counts[idx]++
  }
  const n = samples.length
  const bins = counts.map((count, i) => ({
    lo: lo + i * width,
    hi: lo + (i + 1) * width,
    center: lo + (i + 0.5) * width,
    count,
    density: n > 0 && width > 0 ? count / (n * width) : 0,
  }))
  return { bins, below, above, n }
}

/** Tally discrete draws per integer in [lo, hi]; `density` is the relative frequency. */
export function tallySamples(samples: number[], lo: number, hi: number): Histogram {
  const span = Math.round(hi) - Math.round(lo) + 1
  const counts = new Array<number>(Math.max(span, 1)).fill(0)
  let below = 0
  let above = 0
  for (const value of samples) {
    const k = Math.round(value)
    if (k < lo) { below++; continue }
    if (k > hi) { above++; continue }
    counts[k - Math.round(lo)]++
  }
  const n = samples.length
  const bins = counts.map((count, i) => {
    const k = Math.round(lo) + i
    return {
      lo: k - 0.5,
      hi: k + 0.5,
      center: k,
      count,
      density: n > 0 ? count / n : 0,
    }
  })
  return { bins, below, above, n }
}

/** Running cumulative fraction at each bin's upper edge (the empirical CDF). */
export function empiricalCdf(histogram: Histogram): number[] {
  const { bins, below, n } = histogram
  let running = below
  return bins.map(bin => {
    running += bin.count
    return n > 0 ? running / n : 0
  })
}

export function summarizeSamples(samples: number[]): SampleSummary {
  const n = samples.length
  if (n === 0) return { n: 0, mean: NaN, variance: NaN, sd: NaN, min: NaN, max: NaN }
  let sum = 0
  let min = Infinity
  let max = -Infinity
  for (const value of samples) {
    sum += value
    if (value < min) min = value
    if (value > max) max = value
  }
  const mean = sum / n
  let sumSq = 0
  for (const value of samples) sumSq += (value - mean) * (value - mean)
  const variance = n > 1 ? sumSq / (n - 1) : 0
  return { n, mean, variance, sd: Math.sqrt(variance), min, max }
}

/** Round axis ticks to 1/2/5 × 10^k so labels stay readable at any scale. */
export function niceTicks(lo: number, hi: number, target = 5): number[] {
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi <= lo) return [lo]
  const rawStep = (hi - lo) / Math.max(1, target)
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const normalized = rawStep / magnitude
  const step = (normalized > 5 ? 10 : normalized > 2 ? 5 : normalized > 1 ? 2 : 1) * magnitude
  const ticks: number[] = []
  for (let t = Math.ceil(lo / step) * step; t <= hi + step * 1e-9; t += step) {
    // Kill float drift like 0.30000000000000004 before it reaches a label.
    ticks.push(Math.abs(t) < step * 1e-9 ? 0 : Number(t.toPrecision(12)))
  }
  return ticks
}

/** Compact, magnitude-aware number formatting for stat readouts. */
export function formatStat(value: number, opts: { integer?: boolean } = {}): string {
  if (!Number.isFinite(value)) return '—'
  const abs = Math.abs(value)
  if (opts.integer && Number.isInteger(value)) return String(value)
  if (abs >= 10000) return value.toExponential(2)
  if (abs >= 100) return value.toFixed(1)
  if (abs >= 1) return value.toFixed(2)
  if (abs === 0) return '0'
  if (abs >= 0.01) return value.toFixed(3)
  return value.toExponential(2)
}
