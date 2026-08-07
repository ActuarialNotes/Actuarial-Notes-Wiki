import { describe, it, expect } from 'vitest'
import { createRng } from '@/lib/distributionMath'
import {
  DISTRIBUTIONS,
  DISTRIBUTION_IMAGES,
  defaultParams,
  distributionForImage,
  paramMax,
  type DistParams,
  type DistributionSpec,
} from '@/lib/distributions'

const specs = Object.values(DISTRIBUTIONS)

/** Simpson's rule over the spec's plotting window. */
function integrate(spec: DistributionSpec, p: DistParams, steps = 2000): number {
  const [lo, hi] = spec.range(p)
  const h = (hi - lo) / steps
  let total = 0
  for (let i = 0; i <= steps; i++) {
    const x = lo + i * h
    const y = spec.density(x, p)
    if (!Number.isFinite(y)) continue
    const weight = i === 0 || i === steps ? 1 : i % 2 === 1 ? 4 : 2
    total += weight * y
  }
  return (total * h) / 3
}

function sumMass(spec: DistributionSpec, p: DistParams): number {
  const [lo, hi] = spec.range(p)
  let total = 0
  for (let k = Math.round(lo); k <= Math.round(hi); k++) total += spec.density(k, p)
  return total
}

function monteCarlo(spec: DistributionSpec, p: DistParams, n = 20000) {
  const rng = createRng(2024)
  let sum = 0
  let sumSq = 0
  const draws: number[] = []
  for (let i = 0; i < n; i++) {
    const x = spec.sample(p, rng)
    draws.push(x)
    sum += x
    sumSq += x * x
  }
  const mean = sum / n
  return { mean, variance: sumSq / n - mean * mean, draws }
}

describe('distribution catalogue', () => {
  it('covers every distribution illustration in the vault', () => {
    for (const key of Object.values(DISTRIBUTION_IMAGES)) {
      expect(DISTRIBUTIONS[key]).toBeDefined()
    }
    expect(Object.keys(DISTRIBUTION_IMAGES).length).toBeGreaterThanOrEqual(specs.length)
  })

  it.each(specs.map(s => [s.key, s] as const))('%s: defaults sit inside their slider bounds', (_key, spec) => {
    const p = defaultParams(spec)
    for (const param of spec.params) {
      expect(p[param.key]).toBeGreaterThanOrEqual(param.min)
      expect(p[param.key]).toBeLessThanOrEqual(paramMax(param, p))
      if (param.integer) expect(Number.isInteger(p[param.key])).toBe(true)
    }
    expect(spec.notation(p)).toBeTruthy()
  })

  it.each(specs.map(s => [s.key, s] as const))('%s: total probability over the window matches its CDF', (_key, spec) => {
    const p = defaultParams(spec)
    const [lo, hi] = spec.range(p)
    // The window may deliberately clip a tail (lognormal), so compare against
    // the CDF span rather than 1.
    const expected = spec.cdf(hi, p) - (spec.kind === 'discrete' ? spec.cdf(lo - 1, p) : spec.cdf(lo, p))
    const actual = spec.kind === 'discrete' ? sumMass(spec, p) : integrate(spec, p)
    expect(actual).toBeCloseTo(expected, 3)
    expect(expected).toBeGreaterThan(0.9)
  })

  it.each(specs.map(s => [s.key, s] as const))('%s: the CDF is a non-decreasing map into [0, 1]', (_key, spec) => {
    const p = defaultParams(spec)
    const [lo, hi] = spec.range(p)
    let previous = -Infinity
    for (let i = 0; i <= 60; i++) {
      const x = lo + ((hi - lo) * i) / 60
      const F = spec.cdf(x, p)
      expect(F).toBeGreaterThanOrEqual(0)
      expect(F).toBeLessThanOrEqual(1)
      expect(F).toBeGreaterThanOrEqual(previous - 1e-12)
      previous = F
    }
  })

  it.each(specs.map(s => [s.key, s] as const))('%s: simulated draws reproduce the closed-form moments', (_key, spec) => {
    const p = defaultParams(spec)
    const { mean, variance } = spec.moments(p)
    const sim = monteCarlo(spec, p)
    // 20k draws — 3% on the mean, 8% on the (noisier) variance.
    expect(Math.abs(sim.mean - mean)).toBeLessThan(0.03 * Math.max(Math.abs(mean), 1e-6) + 0.02)
    expect(Math.abs(sim.variance - variance)).toBeLessThan(0.08 * variance + 0.02)
  })

  it.each(specs.map(s => [s.key, s] as const))('%s: the stated mode maximizes the density', (_key, spec) => {
    const p = defaultParams(spec)
    const { mode } = spec.moments(p)
    if (mode === null) return
    const [lo, hi] = spec.range(p)
    let best = lo
    let bestY = -Infinity
    const steps = spec.kind === 'discrete' ? Math.round(hi) - Math.round(lo) : 500
    for (let i = 0; i <= steps; i++) {
      const x = spec.kind === 'discrete' ? Math.round(lo) + i : lo + ((hi - lo) * i) / steps
      const y = spec.density(x, p)
      if (Number.isFinite(y) && y > bestY) {
        bestY = y
        best = x
      }
    }
    const tolerance = spec.kind === 'discrete' ? 1 : (hi - lo) / 50
    expect(Math.abs(best - mode)).toBeLessThanOrEqual(tolerance)
  })
})

describe('individual densities', () => {
  it('matches the Binomial example on the concept page', () => {
    // Bin(10, 0.3): P(X = 4) = 0.2001
    expect(DISTRIBUTIONS.binomial.density(4, { n: 10, p: 0.3 })).toBeCloseTo(0.2001, 4)
    expect(DISTRIBUTIONS.binomial.density(11, { n: 10, p: 0.3 })).toBe(0)
    expect(DISTRIBUTIONS.binomial.density(2.5, { n: 10, p: 0.3 })).toBe(0)
  })

  it('matches the Poisson example (P(X = 0) with λ = 3)', () => {
    expect(DISTRIBUTIONS.poisson.density(0, { lambda: 3 })).toBeCloseTo(Math.exp(-3), 10)
    expect(DISTRIBUTIONS.poisson.cdf(0, { lambda: 3 })).toBeCloseTo(Math.exp(-3), 10)
  })

  it('matches the Geometric example (first claim on the 3rd policy, p = 0.2)', () => {
    expect(DISTRIBUTIONS.geometric.density(3, { p: 0.2 })).toBeCloseTo(0.128, 10)
    expect(DISTRIBUTIONS.geometric.density(0, { p: 0.2 })).toBe(0)
  })

  it('matches the Negative Binomial example (3rd success on trial 7, p = 0.25)', () => {
    expect(DISTRIBUTIONS.negativeBinomial.density(7, { r: 3, p: 0.25 })).toBeCloseTo(0.0741577, 6)
    expect(DISTRIBUTIONS.negativeBinomial.density(2, { r: 3, p: 0.25 })).toBe(0)
  })

  it('matches the Hypergeometric example (2 of 3 drawn from 4 flagged in 10)', () => {
    expect(DISTRIBUTIONS.hypergeometric.density(2, { N: 10, K: 4, n: 3 })).toBeCloseTo(0.3, 10)
  })

  it('matches the Exponential deductible example (P(X > 300), θ = 500)', () => {
    expect(1 - DISTRIBUTIONS.exponential.cdf(300, { theta: 500 })).toBeCloseTo(Math.exp(-0.6), 10)
  })

  it('matches the Normal aggregate-loss example', () => {
    const p = { mu: 50000, sigma: Math.sqrt(40_000_000) }
    // The page quotes 0.2145 off a Φ table rounded at z = 0.791.
    expect(1 - DISTRIBUTIONS.normal.cdf(55000, p)).toBeCloseTo(0.2146, 3)
  })

  it('gives the Beta its documented mean and variance', () => {
    const { mean, variance } = DISTRIBUTIONS.beta.moments({ alpha: 3, beta: 2 })
    expect(mean).toBeCloseTo(0.6, 10)
    expect(variance).toBeCloseTo((3 * 2) / (25 * 6), 10)
  })
})

describe('parameter constraints', () => {
  it('keeps the hypergeometric sample and successes inside the population', () => {
    const normalized = DISTRIBUTIONS.hypergeometric.normalize({ N: 20, K: 80, n: 50 })
    expect(normalized).toEqual({ N: 20, K: 20, n: 20 })
  })

  it('resolves the dependent slider ceilings from the current population', () => {
    const spec = DISTRIBUTIONS.hypergeometric
    const kParam = spec.params.find(param => param.key === 'K')!
    expect(paramMax(kParam, { N: 40, K: 5, n: 5 })).toBe(40)
  })

  it('rounds integer parameters', () => {
    expect(DISTRIBUTIONS.binomial.normalize({ n: 20.4, p: 0.5 }).n).toBe(20)
    expect(DISTRIBUTIONS.negativeBinomial.normalize({ r: 2.6, p: 0.5 }).r).toBe(3)
  })
})

describe('distributionForImage', () => {
  it('resolves the raw GitHub URLs the wiki renders', () => {
    const src = 'https://raw.githubusercontent.com/Owner/Repo/main/Media/Normal_distribution_pdf.svg'
    expect(distributionForImage(src)?.key).toBe('normal')
  })

  it('resolves percent-encoded paths and bare filenames', () => {
    expect(distributionForImage('Media/Poisson_pmf.svg')?.key).toBe('poisson')
    expect(distributionForImage('/a/b/Negative%5Fbinomial%5Fpmf.svg')?.key).toBe('negativeBinomial')
    expect(distributionForImage('Gamma_distribution_pdf.svg?raw=1')?.key).toBe('gamma')
  })

  it('leaves non-distribution images alone', () => {
    expect(distributionForImage('Media/Figures/Venn_Diagram.svg')).toBeNull()
    expect(distributionForImage('Media/Figures/Central_Limit_Theorem.svg')).toBeNull()
    expect(distributionForImage(undefined)).toBeNull()
    expect(distributionForImage('Media/%E0%A4%A.svg')).toBeNull()
  })
})
