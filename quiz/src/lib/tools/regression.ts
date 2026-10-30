import { regularizedIncompleteBeta } from '../distributionMath'
import { bisect } from './numeric'

/**
 * Ordinary least squares with the usual diagnostics, for the fits the tools
 * make (Trend Fit's slope, level shifts and seasons). Small and dense: the
 * normal equations solved by Gauss–Jordan elimination, which is plenty for a
 * handful of columns and a few hundred points.
 */

export interface OlsFit {
  coef: number[]
  /** σ²(XᵀX)⁻¹; NaN throughout when there are no degrees of freedom left. */
  cov: number[][]
  sse: number
  sst: number
  /** Residual degrees of freedom, n − p. */
  df: number
  r2: number
  adjR2: number
}

/** (XᵀX)⁻¹ by Gauss–Jordan with partial pivoting, or null when the columns are dependent. */
function invert(a: number[][]): number[][] | null {
  const p = a.length
  const m = a.map((row, i) => [...row, ...Array.from({ length: p }, (_, j) => (i === j ? 1 : 0))])
  const scale = Math.max(...a.map((row, i) => Math.abs(row[i])), 1e-300)
  for (let c = 0; c < p; c++) {
    let pivot = c
    for (let r = c + 1; r < p; r++) if (Math.abs(m[r][c]) > Math.abs(m[pivot][c])) pivot = r
    if (Math.abs(m[pivot][c]) < 1e-10 * scale) return null
    ;[m[c], m[pivot]] = [m[pivot], m[c]]
    const d = m[c][c]
    for (let j = 0; j < 2 * p; j++) m[c][j] /= d
    for (let r = 0; r < p; r++) {
      if (r === c) continue
      const f = m[r][c]
      if (f !== 0) for (let j = 0; j < 2 * p; j++) m[r][j] -= f * m[c][j]
    }
  }
  return m.map(row => row.slice(p))
}

/** Least squares of y on the columns of X (each row one observation). Null when X's columns are dependent. */
export function ols(X: number[][], y: number[]): OlsFit | null {
  const n = y.length
  const p = X[0]?.length ?? 0
  const xtx = Array.from({ length: p }, (_, i) => Array.from({ length: p }, (_, j) => X.reduce((s, row) => s + row[i] * row[j], 0)))
  const xty = Array.from({ length: p }, (_, i) => X.reduce((s, row, k) => s + row[i] * y[k], 0))
  const inv = invert(xtx)
  if (!inv) return null
  const coef = inv.map(row => row.reduce((s, v, j) => s + v * xty[j], 0))
  const my = y.reduce((s, v) => s + v, 0) / n
  let sse = 0
  let sst = 0
  for (let k = 0; k < n; k++) {
    const fit = X[k].reduce((s, v, j) => s + v * coef[j], 0)
    sse += (y[k] - fit) ** 2
    sst += (y[k] - my) ** 2
  }
  const df = n - p
  const s2 = df > 0 ? sse / df : NaN
  // A perfect fit leaves rounding noise in sse; read it as zero.
  const exact = sse <= 1e-24 * Math.max(sst, 1)
  return {
    coef,
    cov: inv.map(row => row.map(v => (exact && df > 0 ? 0 : v * s2))),
    sse: exact ? 0 : sse,
    sst,
    df,
    r2: sst === 0 ? 1 : exact ? 1 : 1 - sse / sst,
    adjR2: sst === 0 || df <= 0 ? NaN : exact ? 1 : 1 - (sse / df) / (sst / (n - 1)),
  }
}

/** gᵀ Σ g: the variance of a linear combination of the coefficients. */
export function combinationVariance(cov: number[][], g: number[]): number {
  return g.reduce((s, gi, i) => s + gi * g.reduce((t, gj, j) => t + cov[i][j] * gj, 0), 0)
}

/** P(T ≤ t) for Student's t with df degrees of freedom. */
export function studentTCdf(t: number, df: number): number {
  if (!Number.isFinite(t)) return t > 0 ? 1 : 0
  const tail = 0.5 * regularizedIncompleteBeta(df / 2, 0.5, df / (df + t * t))
  return t > 0 ? 1 - tail : tail
}

/** The two-sided p-value of a t statistic. */
export function twoSidedP(t: number, df: number): number {
  if (!Number.isFinite(t)) return 0
  return regularizedIncompleteBeta(df / 2, 0.5, df / (df + t * t))
}

/** The t value with P(T ≤ t) = p. */
export function studentTQuantile(p: number, df: number): number {
  if (p === 0.5) return 0
  let hi = 1
  while (studentTCdf(hi, df) < Math.max(p, 1 - p)) hi *= 2
  const q = bisect(t => studentTCdf(t, df) - Math.max(p, 1 - p), 0, hi)
  return p > 0.5 ? q : -q
}
