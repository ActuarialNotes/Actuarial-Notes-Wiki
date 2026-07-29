import { describe, it, expect } from 'vitest'
import {
  createRng,
  erf,
  gammaFn,
  logBinomialCoefficient,
  logGamma,
  regularizedGammaP,
  regularizedIncompleteBeta,
  sampleBeta,
  sampleBinomial,
  sampleGamma,
  sampleGeometricTrials,
  samplePoisson,
  sampleStandardNormal,
  standardNormalCdf,
  standardNormalPdf,
} from '@/lib/distributionMath'

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length
}

function variance(values: number[]): number {
  const m = mean(values)
  return values.reduce((a, b) => a + (b - m) ** 2, 0) / (values.length - 1)
}

describe('logGamma / gammaFn', () => {
  it('reproduces factorials', () => {
    expect(gammaFn(1)).toBeCloseTo(1, 10)
    expect(gammaFn(5)).toBeCloseTo(24, 8)
    expect(gammaFn(11)).toBeCloseTo(3628800, 3)
  })

  it('knows Γ(1/2) = √π', () => {
    expect(gammaFn(0.5)).toBeCloseTo(Math.sqrt(Math.PI), 10)
  })

  it('stays finite for large arguments', () => {
    expect(logGamma(200)).toBeCloseTo(857.9336698, 5)
  })

  it('computes binomial coefficients exactly enough to round', () => {
    expect(Math.round(Math.exp(logBinomialCoefficient(10, 3)))).toBe(120)
    expect(Math.round(Math.exp(logBinomialCoefficient(52, 5)))).toBe(2598960)
    expect(logBinomialCoefficient(5, 6)).toBe(-Infinity)
  })
})

describe('normal helpers', () => {
  it('matches known Φ values', () => {
    expect(standardNormalCdf(0)).toBeCloseTo(0.5, 12)
    expect(standardNormalCdf(1)).toBeCloseTo(0.8413447461, 9)
    expect(standardNormalCdf(1.96)).toBeCloseTo(0.9750021049, 9)
    expect(standardNormalCdf(-2.5)).toBeCloseTo(0.0062096653, 9)
  })

  it('matches known φ values', () => {
    expect(standardNormalPdf(0)).toBeCloseTo(0.3989422804, 10)
    expect(standardNormalPdf(1)).toBeCloseTo(0.2419707245, 10)
  })

  it('has an odd error function', () => {
    expect(erf(0)).toBe(0)
    expect(erf(1)).toBeCloseTo(0.8427007929, 9)
    expect(erf(-1)).toBeCloseTo(-0.8427007929, 9)
  })
})

describe('incomplete gamma and beta', () => {
  it('matches the exponential CDF, which is P(1, x)', () => {
    for (const x of [0.25, 1, 3, 7]) {
      expect(regularizedGammaP(1, x)).toBeCloseTo(1 - Math.exp(-x), 10)
    }
  })

  it('crosses both branches of the series/continued-fraction split', () => {
    // a = 5: x = 2 uses the series, x = 20 the continued fraction.
    expect(regularizedGammaP(5, 2)).toBeCloseTo(0.052653017, 8)
    // 1 − e⁻²⁰ Σ_{k<5} 20ᵏ/k!
    expect(regularizedGammaP(5, 20)).toBeCloseTo(0.9999830553, 9)
  })

  it('matches a symmetric Beta at its midpoint', () => {
    expect(regularizedIncompleteBeta(3, 3, 0.5)).toBeCloseTo(0.5, 10)
    expect(regularizedIncompleteBeta(2, 5, 0.3)).toBeCloseTo(0.579825, 6)
    expect(regularizedIncompleteBeta(2, 5, 0)).toBe(0)
    expect(regularizedIncompleteBeta(2, 5, 1)).toBe(1)
  })
})

describe('createRng', () => {
  it('is deterministic for a seed and spread over (0, 1)', () => {
    const a = createRng(42)
    const b = createRng(42)
    const draws = Array.from({ length: 1000 }, () => a())
    expect(draws.slice(0, 5)).toEqual(Array.from({ length: 5 }, () => b()))
    expect(Math.min(...draws)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...draws)).toBeLessThan(1)
    expect(mean(draws)).toBeCloseTo(0.5, 1)
  })
})

describe('samplers', () => {
  it('draws standard normals with the right first two moments', () => {
    const rng = createRng(7)
    const draws = Array.from({ length: 20000 }, () => sampleStandardNormal(rng))
    expect(mean(draws)).toBeCloseTo(0, 1)
    expect(variance(draws)).toBeCloseTo(1, 1)
  })

  it('draws gammas with mean αθ and variance αθ²', () => {
    const rng = createRng(11)
    // shape < 1 exercises the boost branch
    for (const [alpha, theta] of [[0.5, 2], [3, 1.5]]) {
      const draws = Array.from({ length: 20000 }, () => sampleGamma(alpha, theta, rng))
      expect(mean(draws)).toBeCloseTo(alpha * theta, 1)
      expect(variance(draws)).toBeCloseTo(alpha * theta * theta, 0)
      expect(Math.min(...draws)).toBeGreaterThan(0)
    }
  })

  it('draws betas inside (0, 1) with mean α/(α+β)', () => {
    const rng = createRng(3)
    const draws = Array.from({ length: 20000 }, () => sampleBeta(2, 5, rng))
    expect(mean(draws)).toBeCloseTo(2 / 7, 2)
    expect(Math.min(...draws)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...draws)).toBeLessThanOrEqual(1)
  })

  it('draws discrete variates on their supports', () => {
    const rng = createRng(5)
    const geometric = Array.from({ length: 20000 }, () => sampleGeometricTrials(0.25, rng))
    expect(Math.min(...geometric)).toBeGreaterThanOrEqual(1)
    expect(mean(geometric)).toBeCloseTo(4, 0)

    const binomial = Array.from({ length: 20000 }, () => sampleBinomial(20, 0.3, rng))
    expect(Math.min(...binomial)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...binomial)).toBeLessThanOrEqual(20)
    expect(mean(binomial)).toBeCloseTo(6, 0)

    const poisson = Array.from({ length: 20000 }, () => samplePoisson(4, rng))
    expect(Math.min(...poisson)).toBeGreaterThanOrEqual(0)
    expect(mean(poisson)).toBeCloseTo(4, 0)
    expect(variance(poisson)).toBeCloseTo(4, 0)
  })
})
