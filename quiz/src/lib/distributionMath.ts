/**
 * Numeric special functions + random samplers backing the distribution
 * simulators (`lib/distributions.ts`).
 *
 * Everything here is pure and dependency-free: the app ships no stats library,
 * and the wiki only needs a handful of functions (log-gamma, the regularized
 * incomplete gamma/beta, the normal CDF) to evaluate every PDF/PMF and CDF on
 * the concept pages. Accuracy target is ~1e-10 relative — far beyond what a
 * 520px-wide plot needs, but it also makes the moment/CDF tests meaningful.
 *
 * Algorithms are the standard ones: Lanczos for log-gamma, the
 * series/continued-fraction split for the incomplete gamma, Lentz's
 * continued fraction for the incomplete beta, Marsaglia–Tsang for gamma
 * variates and Box–Muller for normal variates.
 */

const LANCZOS_COEFFS = [
  676.5203681218851, -1259.1392167224028, 771.32342877765313,
  -176.61502916214059, 12.507343278686905, -0.13857109526572012,
  9.9843695780195716e-6, 1.5056327351493116e-7,
]

/** log Γ(x) for x > 0 (and, via reflection, for non-integer x < 0.5). */
export function logGamma(x: number): number {
  if (x < 0.5) {
    // Reflection formula: Γ(x)Γ(1−x) = π / sin(πx)
    return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - logGamma(1 - x)
  }
  const z = x - 1
  let a = 0.99999999999980993
  for (let i = 0; i < LANCZOS_COEFFS.length; i++) a += LANCZOS_COEFFS[i] / (z + i + 1)
  const t = z + LANCZOS_COEFFS.length - 0.5
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(a)
}

/** Γ(x). Only ever called with x > 0 by the distribution specs. */
export function gammaFn(x: number): number {
  if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gammaFn(1 - x))
  return Math.exp(logGamma(x))
}

/** log B(a, b). */
export function logBeta(a: number, b: number): number {
  return logGamma(a) + logGamma(b) - logGamma(a + b)
}

/** log C(n, k) — used by the discrete PMFs so large n never overflows. */
export function logBinomialCoefficient(n: number, k: number): number {
  if (k < 0 || k > n) return -Infinity
  return logGamma(n + 1) - logGamma(k + 1) - logGamma(n - k + 1)
}

const EPS = 1e-14
const TINY = 1e-300
const MAX_ITER = 500

function gammaPSeries(a: number, x: number): number {
  let ap = a
  let sum = 1 / a
  let del = sum
  for (let n = 0; n < MAX_ITER; n++) {
    ap += 1
    del *= x / ap
    sum += del
    if (Math.abs(del) < Math.abs(sum) * EPS) break
  }
  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a))
}

/** Q(a, x) = 1 − P(a, x) via the continued fraction (converges fast for x > a+1). */
function gammaQContinuedFraction(a: number, x: number): number {
  let b = x + 1 - a
  let c = 1 / TINY
  let d = 1 / b
  let h = d
  for (let i = 1; i <= MAX_ITER; i++) {
    const an = -i * (i - a)
    b += 2
    d = an * d + b
    if (Math.abs(d) < TINY) d = TINY
    c = b + an / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return Math.exp(-x + a * Math.log(x) - logGamma(a)) * h
}

/** Regularized lower incomplete gamma P(a, x) = γ(a, x) / Γ(a). */
export function regularizedGammaP(a: number, x: number): number {
  if (a <= 0 || !(x >= 0)) return NaN
  if (x === 0) return 0
  return x < a + 1 ? gammaPSeries(a, x) : 1 - gammaQContinuedFraction(a, x)
}

/** Modified Lentz continued fraction for the regularized incomplete beta. */
function betaContinuedFraction(a: number, b: number, x: number): number {
  const qab = a + b
  const qap = a + 1
  const qam = a - 1
  let c = 1
  let d = 1 - (qab * x) / qap
  if (Math.abs(d) < TINY) d = TINY
  d = 1 / d
  let h = d
  for (let m = 1; m <= MAX_ITER; m++) {
    const m2 = 2 * m
    // Even step
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < TINY) d = TINY
    c = 1 + aa / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    h *= d * c
    // Odd step
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < TINY) d = TINY
    c = 1 + aa / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return h
}

/** Regularized incomplete beta I_x(a, b) — the Beta CDF. */
export function regularizedIncompleteBeta(a: number, b: number, x: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const front = Math.exp(a * Math.log(x) + b * Math.log1p(-x) - logBeta(a, b))
  return x < (a + 1) / (a + b + 2)
    ? (front * betaContinuedFraction(a, b, x)) / a
    : 1 - (front * betaContinuedFraction(b, a, 1 - x)) / b
}

/** Error function, built on the incomplete gamma so it inherits its accuracy. */
export function erf(x: number): number {
  if (x === 0) return 0
  const p = regularizedGammaP(0.5, x * x)
  return x > 0 ? p : -p
}

/** Standard normal density φ(z). */
export function standardNormalPdf(z: number): number {
  return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI)
}

/** Standard normal CDF Φ(z). */
export function standardNormalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2))
}

// ─── Random variate generation ───────────────────────────────────────────────

/** A uniform(0, 1) source. Seeded in the app so a redraw is reproducible. */
export type Rng = () => number

/**
 * mulberry32 — a tiny, fast, well-distributed seeded PRNG. Seeded rather than
 * `Math.random` so a simulation can be replayed (and unit-tested) exactly.
 */
export function createRng(seed: number): Rng {
  let a = seed >>> 0
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Uniform on (0, 1) — excludes 0 so `log(u)` is always finite. */
export function openUnit(rng: Rng): number {
  const u = rng()
  return u > 0 ? u : Number.MIN_VALUE
}

/** Box–Muller standard normal variate. */
export function sampleStandardNormal(rng: Rng): number {
  const u = openUnit(rng)
  const v = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Marsaglia–Tsang gamma variate with shape α and scale θ. */
export function sampleGamma(shape: number, scale: number, rng: Rng): number {
  if (shape < 1) {
    // Boost: if Y ~ Gamma(α+1) and U ~ U(0,1) then Y·U^(1/α) ~ Gamma(α).
    const u = openUnit(rng)
    return sampleGamma(shape + 1, scale, rng) * Math.pow(u, 1 / shape)
  }
  const d = shape - 1 / 3
  const c = 1 / Math.sqrt(9 * d)
  for (;;) {
    let x: number
    let v: number
    do {
      x = sampleStandardNormal(rng)
      v = 1 + c * x
    } while (v <= 0)
    v = v * v * v
    const u = openUnit(rng)
    const x2 = x * x
    if (u < 1 - 0.0331 * x2 * x2) return d * v * scale
    if (Math.log(u) < 0.5 * x2 + d * (1 - v + Math.log(v))) return d * v * scale
  }
}

/** Beta variate via the two-gamma ratio. */
export function sampleBeta(alpha: number, beta: number, rng: Rng): number {
  const a = sampleGamma(alpha, 1, rng)
  const b = sampleGamma(beta, 1, rng)
  const sum = a + b
  return sum > 0 ? a / sum : 0.5
}

/** Geometric variate on {1, 2, …} — the trial index of the first success. */
export function sampleGeometricTrials(p: number, rng: Rng): number {
  if (p >= 1) return 1
  return Math.ceil(Math.log(openUnit(rng)) / Math.log1p(-p))
}

/** Binomial variate. n is small enough here (≤ 200) that summing trials is fine. */
export function sampleBinomial(n: number, p: number, rng: Rng): number {
  let successes = 0
  for (let i = 0; i < n; i++) if (rng() < p) successes++
  return successes
}

/** Poisson variate — Knuth's product method (λ is capped well below overflow). */
export function samplePoisson(lambda: number, rng: Rng): number {
  const limit = Math.exp(-lambda)
  let k = 0
  let product = rng()
  while (product > limit) {
    k++
    product *= rng()
    if (k > 10000) break
  }
  return k
}
