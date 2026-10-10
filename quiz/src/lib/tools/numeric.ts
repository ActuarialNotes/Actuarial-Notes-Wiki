import { standardNormalCdf, standardNormalPdf } from '../distributionMath'

/**
 * Φ⁻¹(p): Acklam's rational approximation, polished by two Newton steps on
 * the incomplete-gamma Φ the simulators use, so the two agree to machine
 * precision rather than to the approximation's 1e-9.
 */
export function inverseNormalCdf(p: number): number {
  if (!(p > 0 && p < 1)) return p === 0 ? -Infinity : p === 1 ? Infinity : NaN
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239]
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1]
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416]
  const low = 0.02425
  let x: number
  if (p < low) {
    const q = Math.sqrt(-2 * Math.log(p))
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  } else if (p <= 1 - low) {
    const q = p - 0.5
    const r = q * q
    x = ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p))
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  for (let k = 0; k < 2; k++) x -= (standardNormalCdf(x) - p) / standardNormalPdf(x)
  return x
}

/**
 * A root of f between lo and hi, where f changes sign: bisection to machine
 * precision, which is slow beside Newton but can't step out of the bracket.
 */
export function bisect(f: (x: number) => number, lo: number, hi: number): number {
  let flo = f(lo)
  if (flo === 0) return lo
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2
    if (mid === lo || mid === hi) return mid
    const fm = f(mid)
    if (fm === 0) return mid
    if (Math.sign(fm) === Math.sign(flo)) {
      lo = mid
      flo = fm
    } else {
      hi = mid
    }
  }
  return (lo + hi) / 2
}

/** Every root of f on a grid's span: each sign change between neighbouring grid points, bisected. */
export function rootsOn(f: (x: number) => number, grid: number[]): number[] {
  const out: number[] = []
  let prev = f(grid[0])
  if (prev === 0) out.push(grid[0])
  for (let k = 1; k < grid.length; k++) {
    const cur = f(grid[k])
    if (cur === 0) out.push(grid[k])
    else if (prev !== 0 && Number.isFinite(prev) && Number.isFinite(cur) && Math.sign(cur) !== Math.sign(prev)) out.push(bisect(f, grid[k - 1], grid[k]))
    prev = cur
  }
  return out
}

/** The rates a cash-flow root search scans: fine near zero, coarser out to 1,000%. */
export const RATE_GRID: number[] = (() => {
  const grid: number[] = []
  for (let i = -0.99; i < -0.2; i += 0.01) grid.push(i)
  for (let i = -0.2; i < 0.5; i += 0.0025) grid.push(i)
  for (let i = 0.5; i <= 10; i += 0.05) grid.push(i)
  return grid
})()
