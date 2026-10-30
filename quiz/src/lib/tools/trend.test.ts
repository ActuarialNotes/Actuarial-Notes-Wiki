import { describe, expect, it } from 'vitest'
import { toolById } from './registry'
import { runBatch, runTool } from './run'
import { ols, studentTQuantile, twoSidedP } from './regression'

const run = (id: string, input: unknown = {}) => runTool(toolById(id)!, input)
/** A series growing at `rate` a year, `perYear` points a year, with `adjust` applied to point k. */
const series = (n: number, rate: number, perYear = 4, adjust: (k: number) => number = () => 1) =>
  Array.from({ length: n }, (_, k) => ({ period: `P${k + 1}`, value: 100 * (1 + rate) ** (k / perYear) * adjust(k) }))
const mark = (points: { period: string; value: number }[], marks: Record<number, string>) =>
  points.map((p, k) => ({ ...p, mark: marks[k] ?? '' }))

describe('least squares and Student t', () => {
  it('gives the textbook slope, standard error and R²', () => {
    // y = 1, 2, 3, 5 on t = 0..3: b = 6.5 / 5, SSE = 0.3, se = √(0.15 / 5).
    const fit = ols([0, 1, 2, 3].map(t => [1, t]), [1, 2, 3, 5])!
    expect(fit.coef[1]).toBeCloseTo(1.3, 12)
    expect(fit.sse).toBeCloseTo(0.3, 12)
    expect(Math.sqrt(fit.cov[1][1])).toBeCloseTo(Math.sqrt(0.03), 12)
    expect(fit.df).toBe(2)
    expect(fit.r2).toBeCloseTo(1 - 0.3 / 8.75, 12)
  })

  it('reads the t table', () => {
    expect(studentTQuantile(0.975, 2)).toBeCloseTo(4.302653, 5)
    expect(studentTQuantile(0.975, 10)).toBeCloseTo(2.228139, 5)
    expect(twoSidedP(2.228139, 10)).toBeCloseTo(0.05, 5)
    expect(studentTQuantile(0.025, 10)).toBeCloseTo(-2.228139, 5)
  })

  it('refuses dependent columns', () => {
    expect(ols([[1, 1], [1, 1], [1, 1]], [1, 2, 3])).toBeNull()
  })
})

describe('Trend Fit diagnostics', () => {
  it('gives the trend with its standard error, p-value and 95% interval', () => {
    const v = run('ratemaking.trend_fit', { per_year: 1, points: [1, 2, 3, 5].map((value, k) => ({ period: String(2020 + k), value })), model: 'linear' }).values
    const t = studentTQuantile(0.975, 2)
    expect(v.se as number).toBeCloseTo(Math.sqrt(0.03), 12)
    expect(v.annual_change as number).toBeCloseTo(1.3, 12)
    // As a share of the latest fitted value, 4.7.
    expect(v.ci_low as number).toBeCloseTo((1.3 - t * Math.sqrt(0.03)) / 4.7, 10)
    expect(v.ci_high as number).toBeCloseTo((1.3 + t * Math.sqrt(0.03)) / 4.7, 10)
    expect(v.p_value as number).toBeCloseTo(twoSidedP(1.3 / Math.sqrt(0.03), 2), 12)
  })

  it('maps an exponential fit\'s interval through e^(m·b) − 1', () => {
    const points = series(8, 0.04, 4, k => (k % 2 ? 1.01 : 0.99))
    const v = run('ratemaking.trend_fit', { points }).values
    expect(v.ci_low as number).toBeLessThan(v.trend as number)
    expect(v.ci_high as number).toBeGreaterThan(v.trend as number)
    const t = studentTQuantile(0.975, 6)
    expect(v.ci_high as number).toBeCloseTo(Math.exp(4 * ((v.slope as number) + t * (v.se as number))) - 1, 12)
  })

  it('warns on a fit with few degrees of freedom, however high its R²', () => {
    const r = run('ratemaking.trend_fit', { per_year: 1, points: [100, 105.01, 110.2].map((value, k) => ({ period: String(k), value })) })
    expect(r.values.r2 as number).toBeGreaterThan(0.999)
    expect(r.warnings.join(' ')).toMatch(/Only 3 points for 2 parameters \(1 degree of freedom\)/)
  })

  it('warns on a low R² and a trend indistinguishable from zero', () => {
    const r = run('ratemaking.trend_fit', { per_year: 1, points: [100, 110, 95, 104].map((value, k) => ({ period: String(k), value })) })
    expect(r.values.r2 as number).toBeLessThan(0.1)
    expect(r.warnings.some(w => w.startsWith('R² is'))).toBe(true)
    expect(r.warnings.some(w => w.includes('distinguishable from zero'))).toBe(true)
  })

  it('says nothing about a clean, long fit', () => {
    expect(run('ratemaking.trend_fit', { points: series(12, 0.05, 4, k => 1 + 0.004 * Math.sin(k)) }).warnings).toEqual([])
  })

  it('says when an exact fit leaves nothing to estimate an error from', () => {
    const r = run('ratemaking.trend_fit', { per_year: 1, points: [{ period: 'a', value: 100 }, { period: 'b', value: 104 }] })
    expect(r.values.se).toBeNull()
    expect(r.values.ci_low).toBeNull()
    expect(r.warnings[0]).toMatch(/exact fit/)
  })

  it('spots a level shift nobody marked', () => {
    const r = run('ratemaking.trend_fit', { points: series(16, 0.03, 4, k => (k >= 9 ? 0.85 : 1) * (1 + 0.003 * Math.sin(3 * k))) })
    expect(r.warnings.join(' ')).toMatch(/shift level at P10/)
  })
})

describe('Trend Fit options', () => {
  it('leaves an excluded point out but keeps its place in time', () => {
    const points = mark(series(10, 0.04, 4, k => (k === 4 || k === 5 ? 0.6 : 1)), { 4: 'exclude', 5: 'out' })
    const v = run('ratemaking.trend_fit', { points }).values
    expect(v.trend as number).toBeCloseTo(0.04, 12)
    expect(v.points).toBe(8)
    expect(v.excluded).toEqual(['P5', 'P6'])
  })

  it('fits from a start mark through an end mark', () => {
    const points = mark(series(12, 0.04, 4, k => (k < 3 ? 2 : k > 9 ? 0.5 : 1)), { 3: 'start', 9: 'end' })
    const v = run('ratemaking.trend_fit', { points }).values
    expect(v.trend as number).toBeCloseTo(0.04, 12)
    expect(v.window).toEqual({ from: 'P4', to: 'P10' })
    // The latest n count back from the end mark.
    expect(run('ratemaking.trend_fit', { points, latest: 4 }).values.window).toEqual({ from: 'P7', to: 'P10' })
  })

  it('fits a level shift and reports its size', () => {
    const points = mark(series(12, 0.04, 4, k => (k >= 6 ? 0.9 : 1)), { 6: 'shift' })
    const r = run('ratemaking.trend_fit', { points })
    expect(r.values.trend as number).toBeCloseTo(0.04, 12)
    expect((r.values.shifts as { period: string; change: number }[])[0]).toMatchObject({ period: 'P7' })
    expect((r.values.shifts as { change: number }[])[0].change).toBeCloseTo(-0.1, 12)
  })

  it('fits a change of trend and reports the one it ends on', () => {
    const points = Array.from({ length: 12 }, (_, k) => ({
      period: `P${k + 1}`,
      value: k <= 6 ? 100 * 1.02 ** (k / 4) : 100 * 1.02 ** (6 / 4) * 1.06 ** ((k - 6) / 4),
      mark: k === 6 ? 'break' : '',
    }))
    const v = run('ratemaking.trend_fit', { points }).values
    expect(v.trend as number).toBeCloseTo(0.06, 12)
    expect(v.trend_before as number).toBeCloseTo(0.02, 12)
  })

  it('takes out seasons when asked', () => {
    const points = series(12, 0.05, 2, k => (k % 2 ? 1.08 : 0.95))
    const plain = run('ratemaking.trend_fit', { per_year: 2, points }).values
    const seasonal = run('ratemaking.trend_fit', { per_year: 2, seasonal: 'period', points }).values
    expect(seasonal.trend as number).toBeCloseTo(0.05, 12)
    expect(seasonal.r2 as number).toBeCloseTo(1, 12)
    expect(plain.r2 as number).toBeLessThan(seasonal.r2 as number)
  })

  it('names a mark it can\'t read', () => {
    expect(() => run('ratemaking.trend_fit', { points: mark(series(6, 0.03), { 2: 'pandemic' }) })).toThrow(/mark "pandemic"/)
  })

  it('reads a series sent without marks as before', () => {
    expect(run('ratemaking.trend_fit', { points: series(8, 0.04).map(({ period, value }) => ({ period, value })) }).values.trend as number).toBeCloseTo(0.04, 12)
  })
})

describe('Two-Step Loss Trend', () => {
  it('trends to the latest data point at one rate and on at another', () => {
    const v = run('ratemaking.two_step_trend', { past_trend: 0.02, future_trend: 0.05, year: 2021, trend_to: '2023-07-01', future: '2026-01-01' }).values
    expect(v.past_period).toBeCloseTo(2, 12)
    expect(v.future_period).toBeCloseTo(2.5, 12)
    expect(v.factor as number).toBeCloseTo(1.02 ** 2 * 1.05 ** 2.5, 12)
  })

  it('is one-step trend when the two trends agree', () => {
    const two = run('ratemaking.two_step_trend', { past_trend: 0.04, future_trend: 0.04, year: 2023, trend_to: '2024-07-01', future: '2026-01-01' }).values
    const one = run('ratemaking.trend_factor', { trend: 0.04, year: 2023, effective: '2025-01-01', in_effect: 12, term: 12 }).values
    expect(two.factor as number).toBeCloseTo(one.factor as number, 12)
  })
})

describe('Frequency × Severity Trend', () => {
  it('combines the two and sets the result beside a direct fit', () => {
    const r = run('ratemaking.combined_trend', { frequency: -0.01, severity: 0.05, compare: 'direct', direct: 0.03 })
    expect(r.values.trend as number).toBeCloseTo(0.99 * 1.05 - 1, 12)
    expect(r.values.difference as number).toBeCloseTo(0.0395 - 0.03, 12)
    expect(r.warnings).toEqual([])
    expect(run('ratemaking.combined_trend', { frequency: -0.01, severity: 0.05, compare: 'direct', direct: 0.06 }).warnings[0]).toMatch(/2.05 points below/)
    expect(run('ratemaking.combined_trend', { frequency: -0.01, severity: 0.05 }).values.direct).toBeNull()
  })

  it('agrees with a direct fit when the pure premiums are the frequencies times the severities', () => {
    const freq = series(12, -0.02, 4, k => 1 + 0.01 * Math.sin(k))
    const sev = series(12, 0.06, 4, k => 1 + 0.01 * Math.cos(2 * k))
    const fit = (points: { period: string; value: number }[]) => Number(run('ratemaking.trend_fit', { points }).values.trend)
    const pp = freq.map((f, k) => ({ period: f.period, value: f.value * sev[k].value }))
    const combined = run('ratemaking.combined_trend', { frequency: fit(freq), severity: fit(sev) }).values.trend as number
    expect(combined).toBeCloseTo(fit(pp), 12)
  })
})

describe('batch runs', () => {
  it('runs one tool over several inputs and lays them side by side', () => {
    const b = runBatch(toolById('ratemaking.trend_factor')!, { trend: 0.05, effective: '2025-01-01', in_effect: 12, term: 12 }, [2021, 2022, 2023].map(year => ({ label: `AY ${year}`, input: { year } })))
    expect(b.runs.map(r => r.label)).toEqual(['AY 2021', 'AY 2022', 'AY 2023'])
    expect(b.comparison.rows.map(r => r.period)).toEqual([4.5, 3.5, 2.5].map(p => expect.closeTo(p, 12)))
    expect(b.comparison.rows[2].from).toBe('2023-07-01')
    expect(b.comparison.columns.map(c => c.key)).toEqual(['label', 'from', 'to', 'period', 'factor', 'warnings'])
  })

  it('compares several series\' fits, and says which one it couldn\'t read', () => {
    const b = runBatch(toolById('ratemaking.trend_fit')!, { per_year: 4 }, [
      { label: 'Frequency', input: { points: series(8, -0.01) } },
      { label: 'Severity', input: { points: series(8, 0.06) } },
      { label: 'Broken', input: { points: [{ period: 'a', value: -1 }, { period: 'b', value: 2 }] } },
    ])
    expect(b.comparison.rows[0].trend as number).toBeCloseTo(-0.01, 12)
    expect(b.comparison.rows[1].trend as number).toBeCloseTo(0.06, 12)
    expect(b.runs[2].error).toMatch(/above zero/)
    expect(b.comparison.rows[2].trend).toBeNull()
    expect(b.comparison.rows[2].error).toMatch(/above zero/)
  })

  it('falls back to the tiles for a tool that names no comparison', () => {
    const b = runBatch(toolById('finance.annuity')!, {}, [{ input: { i: 0.04 } }, { input: { i: 0.06 } }])
    expect(b.runs.map(r => r.label)).toEqual(['Run 1', 'Run 2'])
    expect(b.comparison.columns.length).toBeGreaterThan(2)
  })

  it('refuses an empty or oversized batch', () => {
    const spec = toolById('ratemaking.trend_factor')!
    expect(() => runBatch(spec, {}, [])).toThrow(/at least one run/)
    expect(() => runBatch(spec, {}, Array.from({ length: 51 }, () => ({})))).toThrow(/At most 50/)
  })
})
