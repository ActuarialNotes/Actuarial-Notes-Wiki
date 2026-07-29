/**
 * The distribution catalogue behind the interactive simulators on the concept
 * pages (`components/wiki/DistributionSimulator.tsx`).
 *
 * Each spec is a plain, pure description of one distribution: its adjustable
 * parameters (with slider bounds), its density/mass and CDF, its closed-form
 * moments, a sensible plotting window, and a random sampler. Nothing here
 * knows about React — the UI reads a spec and renders it, and the tests can
 * check the maths directly.
 *
 * Parameterizations deliberately match the wiki pages in `Concepts/` (and the
 * static SVGs they replace), so the sliders line up with the formulas the
 * student is reading:
 *   - Exponential / Gamma use the **scale** θ (mean θ, αθ), not a rate.
 *   - Geometric counts **trials up to and including the first success** (k ≥ 1).
 *   - Negative binomial counts **total trials** to the r-th success (k ≥ r).
 */

import {
  logBeta,
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
  openUnit,
  type Rng,
} from '@/lib/distributionMath'

export type DistributionKey =
  | 'normal'
  | 'lognormal'
  | 'exponential'
  | 'gamma'
  | 'beta'
  | 'binomial'
  | 'poisson'
  | 'geometric'
  | 'negativeBinomial'
  | 'hypergeometric'

export type DistParams = Record<string, number>

export interface DistributionParamSpec {
  key: string
  /** Greek/letter symbol shown on the slider, e.g. `σ`. */
  symbol: string
  /** What the parameter means, e.g. "standard deviation". */
  label: string
  min: number
  /** A number, or a function of the other params (hypergeometric K ≤ N). */
  max: number | ((p: DistParams) => number)
  step: number
  default: number
  integer?: boolean
}

export interface DistributionMoments {
  mean: number
  variance: number
  sd: number
  /** Null where there's no tidy closed form worth showing. */
  skewness: number | null
  mode: number | null
  median: number | null
}

export interface DistributionSpec {
  key: DistributionKey
  /** Short name, e.g. "Normal". */
  name: string
  /** Page title, e.g. "Normal Distribution". */
  title: string
  kind: 'continuous' | 'discrete'
  /** Axis label for the variable. */
  xLabel: string
  /** Axis label for the density/mass. */
  yLabel: string
  /** One-line reminder of the support. */
  support: string
  params: DistributionParamSpec[]
  /** Live notation with the current values, e.g. `X ~ N(μ = 0, σ² = 1)`. */
  notation: (p: DistParams) => string
  /** Repair dependent constraints after a slider moves. */
  normalize: (p: DistParams) => DistParams
  /** Density (continuous) or probability mass (discrete). */
  density: (x: number, p: DistParams) => number
  /** P(X ≤ x). */
  cdf: (x: number, p: DistParams) => number
  moments: (p: DistParams) => DistributionMoments
  /** Plotting window. Discrete specs return integer bounds. */
  range: (p: DistParams) => [number, number]
  sample: (p: DistParams, rng: Rng) => number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function moments(
  mean: number,
  variance: number,
  extra: { skewness?: number | null; mode?: number | null; median?: number | null } = {},
): DistributionMoments {
  return {
    mean,
    variance,
    sd: Math.sqrt(Math.max(variance, 0)),
    skewness: extra.skewness ?? null,
    mode: extra.mode ?? null,
    median: extra.median ?? null,
  }
}

function isInteger(x: number): boolean {
  return Math.abs(x - Math.round(x)) < 1e-9
}

/** Sum a discrete mass function over lo…k — accurate enough for the supports here. */
function discreteCdf(
  k: number,
  lo: number,
  pmf: (i: number) => number,
): number {
  const top = Math.floor(k + 1e-9)
  if (top < lo) return 0
  let total = 0
  for (let i = lo; i <= top; i++) {
    total += pmf(i)
    if (total >= 1) return 1
  }
  return Math.min(1, total)
}

/** Clip a window to a support and keep it non-degenerate. */
function clipWindow(lo: number, hi: number, minLo: number, maxHi: number): [number, number] {
  const l = Math.max(minLo, Math.floor(lo))
  const h = Math.min(maxHi, Math.ceil(hi))
  return h > l ? [l, h] : [minLo, Math.max(minLo + 1, maxHi)]
}

// ─── Continuous distributions ────────────────────────────────────────────────

const normal: DistributionSpec = {
  key: 'normal',
  name: 'Normal',
  title: 'Normal Distribution',
  kind: 'continuous',
  xLabel: 'x',
  yLabel: 'f(x)',
  support: 'x ∈ (−∞, ∞)',
  params: [
    { key: 'mu', symbol: 'μ', label: 'mean', min: -10, max: 10, step: 0.1, default: 0 },
    { key: 'sigma', symbol: 'σ', label: 'standard deviation', min: 0.1, max: 5, step: 0.1, default: 1 },
  ],
  notation: p => `X ~ N(μ = ${fmt(p.mu)}, σ² = ${fmt(p.sigma * p.sigma)})`,
  normalize: p => p,
  density: (x, p) => standardNormalPdf((x - p.mu) / p.sigma) / p.sigma,
  cdf: (x, p) => standardNormalCdf((x - p.mu) / p.sigma),
  moments: p => moments(p.mu, p.sigma * p.sigma, { skewness: 0, mode: p.mu, median: p.mu }),
  range: p => [p.mu - 4 * p.sigma, p.mu + 4 * p.sigma],
  sample: (p, rng) => p.mu + p.sigma * sampleStandardNormal(rng),
}

const lognormal: DistributionSpec = {
  key: 'lognormal',
  name: 'Lognormal',
  title: 'Lognormal Distribution',
  kind: 'continuous',
  xLabel: 'x',
  yLabel: 'f(x)',
  support: 'x > 0',
  params: [
    { key: 'mu', symbol: 'μ', label: 'log-mean', min: -2, max: 3, step: 0.05, default: 0 },
    { key: 'sigma', symbol: 'σ', label: 'log-standard deviation', min: 0.05, max: 2, step: 0.05, default: 0.5 },
  ],
  notation: p => `X ~ Lognormal(μ = ${fmt(p.mu)}, σ² = ${fmt(p.sigma * p.sigma)})`,
  normalize: p => p,
  density: (x, p) => {
    if (x <= 0) return 0
    const z = (Math.log(x) - p.mu) / p.sigma
    return standardNormalPdf(z) / (x * p.sigma)
  },
  cdf: (x, p) => (x <= 0 ? 0 : standardNormalCdf((Math.log(x) - p.mu) / p.sigma)),
  moments: p => {
    const s2 = p.sigma * p.sigma
    const mean = Math.exp(p.mu + s2 / 2)
    const variance = (Math.exp(s2) - 1) * Math.exp(2 * p.mu + s2)
    return moments(mean, variance, {
      skewness: (Math.exp(s2) + 2) * Math.sqrt(Math.exp(s2) - 1),
      mode: Math.exp(p.mu - s2),
      median: Math.exp(p.mu),
    })
  },
  // The mean + 4σ window is unusable once σ grows (the tail runs to hundreds),
  // so cut at roughly the 99th percentile of the underlying normal instead.
  range: p => [0, Math.exp(p.mu + 2.5 * p.sigma)],
  sample: (p, rng) => Math.exp(p.mu + p.sigma * sampleStandardNormal(rng)),
}

const exponential: DistributionSpec = {
  key: 'exponential',
  name: 'Exponential',
  title: 'Exponential Distribution',
  kind: 'continuous',
  xLabel: 'x',
  yLabel: 'f(x)',
  support: 'x > 0',
  params: [
    { key: 'theta', symbol: 'θ', label: 'scale (the mean)', min: 0.1, max: 10, step: 0.1, default: 1 },
  ],
  notation: p => `X ~ Exp(θ = ${fmt(p.theta)}), rate 1/θ = ${fmt(1 / p.theta)}`,
  normalize: p => p,
  density: (x, p) => (x < 0 ? 0 : Math.exp(-x / p.theta) / p.theta),
  cdf: (x, p) => (x <= 0 ? 0 : 1 - Math.exp(-x / p.theta)),
  moments: p =>
    moments(p.theta, p.theta * p.theta, {
      skewness: 2,
      mode: 0,
      median: p.theta * Math.LN2,
    }),
  range: p => [0, 6 * p.theta],
  sample: (p, rng) => -p.theta * Math.log(openUnit(rng)),
}

const gamma: DistributionSpec = {
  key: 'gamma',
  name: 'Gamma',
  title: 'Gamma Distribution',
  kind: 'continuous',
  xLabel: 'x',
  yLabel: 'f(x)',
  support: 'x > 0',
  params: [
    { key: 'alpha', symbol: 'α', label: 'shape', min: 0.2, max: 20, step: 0.1, default: 2 },
    { key: 'theta', symbol: 'θ', label: 'scale', min: 0.1, max: 10, step: 0.1, default: 1 },
  ],
  notation: p => `X ~ Gamma(α = ${fmt(p.alpha)}, θ = ${fmt(p.theta)})`,
  normalize: p => p,
  density: (x, p) => {
    if (x <= 0) return p.alpha < 1 ? Infinity : p.alpha === 1 ? 1 / p.theta : 0
    const logF =
      (p.alpha - 1) * Math.log(x) - x / p.theta - p.alpha * Math.log(p.theta) - logGamma(p.alpha)
    return Math.exp(logF)
  },
  cdf: (x, p) => (x <= 0 ? 0 : regularizedGammaP(p.alpha, x / p.theta)),
  moments: p =>
    moments(p.alpha * p.theta, p.alpha * p.theta * p.theta, {
      skewness: 2 / Math.sqrt(p.alpha),
      mode: p.alpha >= 1 ? (p.alpha - 1) * p.theta : null,
    }),
  range: p => [0, p.theta * (p.alpha + 4 * Math.sqrt(p.alpha))],
  sample: (p, rng) => sampleGamma(p.alpha, p.theta, rng),
}

const beta: DistributionSpec = {
  key: 'beta',
  name: 'Beta',
  title: 'Beta Distribution',
  kind: 'continuous',
  xLabel: 'x',
  yLabel: 'f(x)',
  support: '0 < x < 1',
  params: [
    { key: 'alpha', symbol: 'α', label: 'shape', min: 0.1, max: 10, step: 0.1, default: 2 },
    { key: 'beta', symbol: 'β', label: 'shape', min: 0.1, max: 10, step: 0.1, default: 5 },
  ],
  notation: p => `X ~ Beta(α = ${fmt(p.alpha)}, β = ${fmt(p.beta)})`,
  normalize: p => p,
  density: (x, p) => {
    if (x <= 0 || x >= 1) return p.alpha < 1 || p.beta < 1 ? Infinity : 0
    return Math.exp((p.alpha - 1) * Math.log(x) + (p.beta - 1) * Math.log1p(-x) - logBeta(p.alpha, p.beta))
  },
  cdf: (x, p) => regularizedIncompleteBeta(p.alpha, p.beta, x),
  moments: p => {
    const a = p.alpha
    const b = p.beta
    const s = a + b
    const mean = a / s
    const variance = (a * b) / (s * s * (s + 1))
    return moments(mean, variance, {
      skewness: (2 * (b - a) * Math.sqrt(s + 1)) / ((s + 2) * Math.sqrt(a * b)),
      mode: a > 1 && b > 1 ? (a - 1) / (s - 2) : null,
    })
  },
  range: () => [0, 1],
  sample: (p, rng) => sampleBeta(p.alpha, p.beta, rng),
}

// ─── Discrete distributions ──────────────────────────────────────────────────

const binomial: DistributionSpec = {
  key: 'binomial',
  name: 'Binomial',
  title: 'Binomial Distribution',
  kind: 'discrete',
  xLabel: 'k',
  yLabel: 'P(X = k)',
  support: 'k = 0, 1, …, n',
  params: [
    { key: 'n', symbol: 'n', label: 'trials', min: 1, max: 100, step: 1, default: 20, integer: true },
    { key: 'p', symbol: 'p', label: 'success probability', min: 0.01, max: 0.99, step: 0.01, default: 0.5 },
  ],
  notation: p => `X ~ Bin(n = ${p.n}, p = ${fmt(p.p)})`,
  normalize: p => ({ ...p, n: Math.round(p.n) }),
  density: (k, p) => {
    if (!isInteger(k) || k < 0 || k > p.n) return 0
    const i = Math.round(k)
    return Math.exp(
      logBinomialCoefficient(p.n, i) + i * Math.log(p.p) + (p.n - i) * Math.log1p(-p.p),
    )
  },
  cdf: (k, p) => discreteCdf(k, 0, i => binomial.density(i, p)),
  moments: p => {
    const mean = p.n * p.p
    const variance = p.n * p.p * (1 - p.p)
    return moments(mean, variance, {
      skewness: (1 - 2 * p.p) / Math.sqrt(variance),
      mode: Math.floor((p.n + 1) * p.p),
    })
  },
  range: p => {
    const sd = Math.sqrt(p.n * p.p * (1 - p.p))
    return clipWindow(p.n * p.p - 4 * sd, p.n * p.p + 4 * sd, 0, p.n)
  },
  sample: (p, rng) => sampleBinomial(p.n, p.p, rng),
}

const poisson: DistributionSpec = {
  key: 'poisson',
  name: 'Poisson',
  title: 'Poisson Distribution',
  kind: 'discrete',
  xLabel: 'k',
  yLabel: 'P(X = k)',
  support: 'k = 0, 1, 2, …',
  params: [
    { key: 'lambda', symbol: 'λ', label: 'rate (mean count)', min: 0.1, max: 30, step: 0.1, default: 4 },
  ],
  notation: p => `X ~ Poisson(λ = ${fmt(p.lambda)})`,
  normalize: p => p,
  density: (k, p) => {
    if (!isInteger(k) || k < 0) return 0
    const i = Math.round(k)
    return Math.exp(-p.lambda + i * Math.log(p.lambda) - logGamma(i + 1))
  },
  // P(X ≤ k) = Q(k+1, λ): the regularized upper incomplete gamma.
  cdf: (k, p) => (k < 0 ? 0 : 1 - regularizedGammaP(Math.floor(k + 1e-9) + 1, p.lambda)),
  moments: p =>
    moments(p.lambda, p.lambda, {
      skewness: 1 / Math.sqrt(p.lambda),
      mode: Math.floor(p.lambda),
    }),
  range: p => {
    const sd = Math.sqrt(p.lambda)
    return clipWindow(p.lambda - 4 * sd, p.lambda + 4 * sd + 2, 0, Number.MAX_SAFE_INTEGER)
  },
  sample: (p, rng) => samplePoisson(p.lambda, rng),
}

const geometric: DistributionSpec = {
  key: 'geometric',
  name: 'Geometric',
  title: 'Geometric Distribution',
  kind: 'discrete',
  xLabel: 'k (trial of first success)',
  yLabel: 'P(X = k)',
  support: 'k = 1, 2, 3, …',
  params: [
    { key: 'p', symbol: 'p', label: 'success probability', min: 0.02, max: 0.95, step: 0.01, default: 0.25 },
  ],
  notation: p => `X ~ Geom(p = ${fmt(p.p)})`,
  normalize: p => p,
  density: (k, p) => {
    if (!isInteger(k) || k < 1) return 0
    return Math.pow(1 - p.p, Math.round(k) - 1) * p.p
  },
  cdf: (k, p) => (k < 1 ? 0 : 1 - Math.pow(1 - p.p, Math.floor(k + 1e-9))),
  moments: p => {
    const mean = 1 / p.p
    const variance = (1 - p.p) / (p.p * p.p)
    return moments(mean, variance, {
      skewness: (2 - p.p) / Math.sqrt(1 - p.p),
      mode: 1,
      median: Math.ceil(-1 / Math.log2(1 - p.p)),
    })
  },
  range: p => {
    const sd = Math.sqrt((1 - p.p) / (p.p * p.p))
    return clipWindow(1, 1 / p.p + 4 * sd, 1, 200)
  },
  sample: (p, rng) => sampleGeometricTrials(p.p, rng),
}

const negativeBinomial: DistributionSpec = {
  key: 'negativeBinomial',
  name: 'Negative Binomial',
  title: 'Negative Binomial Distribution',
  kind: 'discrete',
  xLabel: 'k (total trials)',
  yLabel: 'P(X = k)',
  support: 'k = r, r+1, r+2, …',
  params: [
    { key: 'r', symbol: 'r', label: 'successes required', min: 1, max: 20, step: 1, default: 3, integer: true },
    { key: 'p', symbol: 'p', label: 'success probability', min: 0.05, max: 0.95, step: 0.01, default: 0.5 },
  ],
  notation: p => `X ~ NegBin(r = ${p.r}, p = ${fmt(p.p)})`,
  normalize: p => ({ ...p, r: Math.round(p.r) }),
  density: (k, p) => {
    if (!isInteger(k) || k < p.r) return 0
    const i = Math.round(k)
    return Math.exp(
      logBinomialCoefficient(i - 1, p.r - 1) + p.r * Math.log(p.p) + (i - p.r) * Math.log1p(-p.p),
    )
  },
  cdf: (k, p) => discreteCdf(k, p.r, i => negativeBinomial.density(i, p)),
  moments: p => {
    const mean = p.r / p.p
    const variance = (p.r * (1 - p.p)) / (p.p * p.p)
    return moments(mean, variance, {
      skewness: (2 - p.p) / Math.sqrt(p.r * (1 - p.p)),
      mode: p.r === 1 ? 1 : Math.floor((p.r - 1) / p.p) + 1,
    })
  },
  range: p => {
    const sd = Math.sqrt((p.r * (1 - p.p)) / (p.p * p.p))
    return clipWindow(p.r, p.r / p.p + 4 * sd, p.r, 400)
  },
  sample: (p, rng) => {
    let trials = 0
    for (let i = 0; i < p.r; i++) trials += sampleGeometricTrials(p.p, rng)
    return trials
  },
}

const hypergeometric: DistributionSpec = {
  key: 'hypergeometric',
  name: 'Hypergeometric',
  title: 'Hypergeometric Distribution',
  kind: 'discrete',
  xLabel: 'k (successes drawn)',
  yLabel: 'P(X = k)',
  support: 'max(0, n+K−N) ≤ k ≤ min(n, K)',
  params: [
    { key: 'N', symbol: 'N', label: 'population size', min: 5, max: 200, step: 1, default: 50, integer: true },
    { key: 'K', symbol: 'K', label: 'successes in population', min: 0, max: p => p.N, step: 1, default: 15, integer: true },
    { key: 'n', symbol: 'n', label: 'sample size (no replacement)', min: 1, max: p => p.N, step: 1, default: 10, integer: true },
  ],
  notation: p => `X ~ HG(N = ${p.N}, K = ${p.K}, n = ${p.n})`,
  // K and n can't exceed the population, so a shrinking N drags them down.
  normalize: p => {
    const N = Math.max(1, Math.round(p.N))
    return { N, K: clamp(Math.round(p.K), 0, N), n: clamp(Math.round(p.n), 1, N) }
  },
  density: (k, p) => {
    if (!isInteger(k)) return 0
    const i = Math.round(k)
    if (i < Math.max(0, p.n + p.K - p.N) || i > Math.min(p.n, p.K)) return 0
    return Math.exp(
      logBinomialCoefficient(p.K, i) +
        logBinomialCoefficient(p.N - p.K, p.n - i) -
        logBinomialCoefficient(p.N, p.n),
    )
  },
  cdf: (k, p) => discreteCdf(k, Math.max(0, p.n + p.K - p.N), i => hypergeometric.density(i, p)),
  moments: p => {
    const { N, K, n } = p
    const mean = (n * K) / N
    const variance = N > 1 ? (n * K * (N - K) * (N - n)) / (N * N * (N - 1)) : 0
    const skewness =
      N > 2 && variance > 0
        ? ((N - 2 * K) * Math.sqrt(N - 1) * (N - 2 * n)) /
          (Math.sqrt(n * K * (N - K) * (N - n)) * (N - 2))
        : null
    return moments(mean, variance, {
      skewness,
      mode: Math.floor(((n + 1) * (K + 1)) / (N + 2)),
    })
  },
  range: p => {
    const lo = Math.max(0, p.n + p.K - p.N)
    const hi = Math.min(p.n, p.K)
    if (hi - lo <= 60) return [lo, Math.max(hi, lo + 1)]
    const { mean, sd } = hypergeometric.moments(p)
    return clipWindow(mean - 4 * sd, mean + 4 * sd, lo, hi)
  },
  sample: (p, rng) => {
    // Draw without replacement, shrinking the urn as we go.
    let remaining = p.N
    let successes = p.K
    let drawn = 0
    for (let i = 0; i < p.n; i++) {
      if (rng() < successes / remaining) {
        drawn++
        successes--
      }
      remaining--
    }
    return drawn
  },
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x))
}

/** Compact value formatting for the notation line. */
function fmt(x: number): string {
  if (!Number.isFinite(x)) return '—'
  if (Number.isInteger(x)) return String(x)
  return Math.abs(x) >= 100 ? x.toFixed(0) : Math.abs(x) >= 1 ? x.toFixed(2) : x.toFixed(3).replace(/0+$/, '')
}

export const DISTRIBUTIONS: Record<DistributionKey, DistributionSpec> = {
  normal,
  lognormal,
  exponential,
  gamma,
  beta,
  binomial,
  poisson,
  geometric,
  negativeBinomial,
  hypergeometric,
}

/**
 * Which static illustration each simulator replaces. The wiki embeds these as
 * `![[Media/Normal_distribution_pdf.svg|500]]`; the renderer swaps the image
 * for the live simulator when the filename is in this map.
 */
export const DISTRIBUTION_IMAGES: Record<string, DistributionKey> = {
  'Normal_distribution_pdf.svg': 'normal',
  'Lognormal_distribution_pdf.svg': 'lognormal',
  'Exponential_pdf.svg': 'exponential',
  'Gamma_distribution_pdf.svg': 'gamma',
  'Beta_distribution_pdf.svg': 'beta',
  'Binomial_distribution_pmf.svg': 'binomial',
  'Binomial_distribution_cdf.svg': 'binomial',
  'Poisson_pmf.svg': 'poisson',
  'Geometric_pmf.svg': 'geometric',
  'Negative_binomial_pmf.svg': 'negativeBinomial',
  'Hypergeometric_pmf.svg': 'hypergeometric',
}

/**
 * Resolve an image source (a raw.githubusercontent URL, a vault-relative path,
 * or a bare filename) to the distribution it illustrates, or null.
 */
export function distributionForImage(src: string | undefined): DistributionSpec | null {
  if (!src) return null
  const withoutQuery = src.split(/[?#]/)[0]
  const rawName = withoutQuery.split('/').pop() ?? ''
  let name = rawName
  try {
    name = decodeURIComponent(rawName)
  } catch {
    // Malformed escape sequence — fall back to the raw filename.
  }
  const key = DISTRIBUTION_IMAGES[name]
  return key ? DISTRIBUTIONS[key] : null
}

/** Slider ceiling for a parameter, resolving the dependent (function) form. */
export function paramMax(param: DistributionParamSpec, p: DistParams): number {
  return typeof param.max === 'function' ? param.max(p) : param.max
}

export function defaultParams(spec: DistributionSpec): DistParams {
  const p: DistParams = {}
  for (const param of spec.params) p[param.key] = param.default
  return spec.normalize(p)
}
