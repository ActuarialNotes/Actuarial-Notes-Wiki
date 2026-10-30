import { formatValue } from '../format'
import { combinationVariance, ols, studentTQuantile, twoSidedP, type OlsFit } from '../regression'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'

const PERIOD = { key: 'period', label: 'Period', kind: 'text' as const }
const VALUE = { key: 'value', label: 'Value', kind: 'number' as const, unit: 'plain' as const }
const MARK = { key: 'mark', label: 'Mark', kind: 'text' as const, optional: true }

/** The confidence level of the trend's interval. */
const LEVEL = 0.95
/** Fewer residual degrees of freedom than this and the fit says so. */
const FEW_DF = 4
/** An R² under this and the fit says so. */
const LOW_R2 = 0.5

/** What a point's mark asks of the fit; several may be given, separated by commas. */
type Mark = 'exclude' | 'start' | 'end' | 'shift' | 'break'
const MARK_WORDS: Record<string, Mark> = {
  exclude: 'exclude', excluded: 'exclude', out: 'exclude', drop: 'exclude', x: 'exclude',
  start: 'start', from: 'start', end: 'end', to: 'end',
  shift: 'shift', level: 'shift', step: 'shift',
  break: 'break', hinge: 'break', kink: 'break',
}

function readMarks(raw: unknown, row: number): Set<Mark> {
  const words = String(raw ?? '').toLowerCase().split(/[\s,;+/]+/).filter(Boolean)
  const marks = new Set<Mark>()
  for (const w of words) {
    const mark = MARK_WORDS[w]
    if (!mark) throw new ToolInputError('points', `Row ${row + 1}'s mark "${w}" isn't one of: exclude, start, end, shift, break.`)
    marks.add(mark)
  }
  return marks
}

const pct = (v: number) => formatValue(v, 'percent')
const pText = (p: number) => (p < 0.001 ? '< 0.001' : `= ${p.toFixed(3)}`)

interface Design {
  /** Point positions (0 = the series' first) in the model. */
  shifts: number[]
  breaks: number[]
  /** The seasons with a column of their own (the latest fitted point's season is the base). */
  seasons: number[]
}

/** One row of the design matrix, at position k measured from the window's end. */
function designRow(k: number, end: number, m: number, d: Design): number[] {
  const t = k - end
  return [
    1,
    t,
    ...d.shifts.map(s => (k >= s ? 1 : 0)),
    ...d.breaks.map(b => Math.max(0, k - b)),
    ...d.seasons.map(s => (((k % m) + m) % m === s ? 1 : 0)),
  ]
}

export const trendFit: ToolSpec = {
  id: 'ratemaking.trend_fit',
  version: '1.1.0',
  name: 'Trend Fit',
  area: 'ratemaking',
  answers: 'What annual trend do these data show?',
  aka: ['exponential trend', 'linear trend', 'loss trend', 'premium trend', 'level shift', 'breakpoint', 'piecewise trend'],
  compare: [
    { key: 'trend', label: 'Annual trend', unit: 'percent' },
    { key: 'ci_low', label: 'CI low', unit: 'percent' },
    { key: 'ci_high', label: 'CI high', unit: 'percent' },
    { key: 'p_value', label: 'p-value', unit: 'plain' },
    { key: 'r2', label: 'R²', unit: 'plain' },
    { key: 'points', label: 'Points', unit: 'count' },
  ],
  fields: [
    {
      kind: 'choice', key: 'model', label: 'Fit', description: 'Exponential fits ln(value) on time, a constant rate of change; linear fits the value itself, a constant amount.',
      options: [{ value: 'exponential', label: 'Exponential' }, { value: 'linear', label: 'Linear' }], default: 'exponential',
    },
    { kind: 'number', key: 'per_year', label: 'Points a year', symbol: 'm', unit: 'count', integer: true, min: 1, max: 365, sliderMax: 12, step: 1, default: 4, description: 'How many points make a year: 4 for quarters (year-ending quarterly figures), 2 for half-years, 1 for years.' },
    {
      kind: 'number', key: 'latest', label: 'Points fitted', symbol: 'n', unit: 'count', integer: true, judgment: true, min: 0, max: 1000, sliderMax: 20, step: 1, default: 0, zeroLabel: 'All',
      description: 'Fit only the latest n periods, counting back from the end of the window (0 for all of them): a judgment of how far back the trend still holds. Excluded points inside those n still count as periods.',
    },
    {
      kind: 'choice', key: 'seasonal', label: 'Seasons', judgment: true,
      description: 'Whether each period of the year (each quarter or half-year) gets its own level, for points that are not year-ending (rolling) figures. Year-ending figures have no season to fit.',
      options: [{ value: 'none', label: 'None' }, { value: 'period', label: 'By period of year' }], default: 'none',
    },
    {
      kind: 'table', key: 'points', label: 'Points', minRows: 2, maxRows: 1000,
      description: 'The series, oldest first, evenly spaced: each period\'s label, its value (average premium, frequency, severity or pure premium) and an optional mark. '
        + 'Marks: "exclude" leaves the point out of the fit (a pandemic period) while keeping its place in time; "start" and "end" fit only the points from and through that period; '
        + '"shift" lets the level jump from that period on (a reform, a coverage change); "break" lets the trend change from that period on, and the annual trend reported is the one after it. Several marks may be combined, "shift, break".',
      columns: [PERIOD, VALUE, MARK],
      default: [
        { period: '2022 Q1', value: 100, mark: '' },
        { period: '2022 Q2', value: 101.2, mark: '' },
        { period: '2022 Q3', value: 101.9, mark: '' },
        { period: '2022 Q4', value: 103.1, mark: '' },
        { period: '2023 Q1', value: 104, mark: '' },
        { period: '2023 Q2', value: 104.9, mark: '' },
        { period: '2023 Q3', value: 106.2, mark: '' },
        { period: '2023 Q4', value: 107.1, mark: '' },
      ],
    },
  ],
  notation: input => (input.model === 'linear' ? 'y = a + b·t,  annual change = m·b' : 'ln y = a + b·t,  trend = e^(m·b) − 1'),
  view: 'table',
  grid: 'points',
  compute: input => {
    const points = input.points as TableRow[]
    const m = Number(input.per_year)
    const exponential = input.model !== 'linear'
    const marks = points.map((r, k) => readMarks(r.mark, k))
    const warnings: string[] = []

    // The window: from a "start" mark (or the first point) through an "end" mark (or the last), then its latest n periods.
    const starts = marks.flatMap((s, k) => (s.has('start') ? [k] : []))
    const ends = marks.flatMap((s, k) => (s.has('end') ? [k] : []))
    if (starts.length > 1) throw new ToolInputError('points', 'Mark one point "start", not several.')
    if (ends.length > 1) throw new ToolInputError('points', 'Mark one point "end", not several.')
    const end = ends[0] ?? points.length - 1
    let start = starts[0] ?? 0
    if (start > end) throw new ToolInputError('points', 'The "start" mark comes after the "end" mark.')
    const latest = Number(input.latest)
    if (latest > 0) start = Math.max(start, end - latest + 1)
    const inWindow = (k: number) => k >= start && k <= end
    const used = points.map((_, k) => inWindow(k) && !marks[k].has('exclude'))
    const fittedIdx = used.flatMap((u, k) => (u ? [k] : []))
    const n = fittedIdx.length
    if (n < 2) throw new ToolInputError(latest > 0 ? 'latest' : 'points', 'Fit at least two points.')
    const ys = fittedIdx.map(k => Number(points[k].value))
    if (exponential && ys.some(y => !(y > 0))) throw new ToolInputError('points', 'An exponential fit needs every value above zero; fit these linearly instead.')

    const first = fittedIdx[0]
    const last = fittedIdx[n - 1]
    const placed = (mark: Mark) => marks.flatMap((s, k) => {
      if (!s.has(mark)) return []
      if (k <= first || k > last) {
        warnings.push(`The "${mark}" mark on ${points[k].period || `row ${k + 1}`} is ignored: it has to fall after the first point fitted and no later than the last.`)
        return []
      }
      return [k]
    })
    const seasonal = input.seasonal === 'period' && m > 1
    if (input.seasonal === 'period' && m === 1) warnings.push('Seasons need more than one point a year; the fit has none.')
    const baseSeason = last % m
    const design: Design = {
      shifts: placed('shift'),
      breaks: placed('break'),
      seasons: seasonal ? Array.from({ length: m }, (_, s) => s).filter(s => s !== baseSeason && fittedIdx.some(k => k % m === s)) : [],
    }
    const X = fittedIdx.map(k => designRow(k, end, m, design))
    const yy = exponential ? ys.map(Math.log) : ys
    const fit = ols(X, yy)
    if (!fit) throw new ToolInputError('points', 'The marks leave too few points to fit: each shift, break and season needs points of its own on either side.')

    const p = X[0].length
    const slopeAt = 1 + 1 + design.shifts.length
    // The trend the fit ends on: the base slope plus every change of slope.
    const g: number[] = Array.from({ length: p }, (_, j) => (j === 1 || (j >= slopeAt && j < slopeAt + design.breaks.length) ? 1 : 0))
    const slope = g.reduce((s, gj, j) => s + gj * fit.coef[j], 0)
    const se = fit.df > 0 ? Math.sqrt(Math.max(0, combinationVariance(fit.cov, g))) : NaN
    const tStat = se > 0 ? slope / se : se === 0 ? (slope === 0 ? 0 : Infinity * Math.sign(slope)) : NaN
    const pValue = Number.isNaN(tStat) ? NaN : twoSidedP(tStat, fit.df)
    const tq = fit.df > 0 ? studentTQuantile(0.5 + LEVEL / 2, fit.df) : NaN
    const predict = (k: number) => {
      const v = designRow(k, end, m, design).reduce((s, x, j) => s + x * fit.coef[j], 0)
      return exponential ? Math.exp(v) : v
    }
    const latestFit = predict(end)
    const annual = (b: number) => (exponential ? Math.exp(m * b) - 1 : (m * b) / latestFit)
    const trend = annual(slope)
    const ciLow = Number.isNaN(tq) ? NaN : annual(slope - tq * se)
    const ciHigh = Number.isNaN(tq) ? NaN : annual(slope + tq * se)
    const trendBefore = design.breaks.length ? annual(fit.coef[1]) : null
    const label = (k: number) => String(points[k].period || `row ${k + 1}`)
    const shifts = design.shifts.map((s, j) => {
      const d = fit.coef[2 + j]
      return { period: label(s), change: exponential ? Math.exp(d) - 1 : d }
    })
    const seasons = design.seasons.map((s, j) => {
      const d = fit.coef[slopeAt + design.breaks.length + j]
      return { season: s + 1, relative: exponential ? Math.exp(d) : d }
    })

    // Diagnostics, said plainly.
    if (fit.df === 0) warnings.push(`${n} points for ${p} parameters is an exact fit: there is nothing left to estimate an error from, so no interval or p-value.`)
    else if (fit.df < FEW_DF) warnings.push(`Only ${n} points for ${p} parameters (${fit.df} degree${fit.df === 1 ? '' : 's'} of freedom): an R² near 1 means little here, and the 95% interval (${pct(ciLow)} to ${pct(ciHigh)}) is the better guide.`)
    if (fit.df > 0 && fit.r2 < LOW_R2) warnings.push(`R² is ${formatValue(fit.r2, 'plain')}: the fit explains little of how the points move.`)
    if (fit.df > 0 && pValue > 1 - LEVEL) warnings.push(`The trend isn't distinguishable from zero at 95% (p ${pText(pValue)}; interval ${pct(ciLow)} to ${pct(ciHigh)}).`)
    const shift = design.shifts.length || design.breaks.length ? null : likelyShift(fittedIdx, yy, end, m, design)
    if (shift) {
      warnings.push(`The points look to shift level at ${label(shift.at)}: a step of ${exponential ? pct(Math.exp(shift.step) - 1) : formatValue(shift.step, 'plain')} there leaves ${pct(shift.remaining)} of the unexplained variation (p ${pText(shift.p)} after allowing for ${shift.tried} places it could have been). If something changed then, mark it "shift", or fit from there with "start".`)
    }

    const excluded = points.flatMap((_, k) => (inWindow(k) && marks[k].has('exclude') ? [label(k)] : []))
    const rows = points.map((r, k) => Object.assign({}, r, { fitted: inWindow(k) ? predict(k) : null }))
    const ciText = Number.isNaN(ciLow) ? '' : ` (95% CI ${pct(ciLow)} to ${pct(ciHigh)}, p ${pText(pValue)})`
    const trendLabel = exponential ? 'Annual trend' : 'Annual change ÷ latest fit'
    return {
      tiles: [
        { symbol: 'Δ', label: Number.isNaN(ciLow) ? trendLabel : `${trendLabel}, 95% ${pct(ciLow)} to ${pct(ciHigh)}`, value: trend, unit: 'percent' },
        ...(exponential ? [] : [{ symbol: 'm·b', label: 'Annual change', value: m * slope, unit: 'plain' as const }]),
        { symbol: 'R²', label: `${n}-point fit`, value: fit.r2, unit: 'plain' },
      ],
      table: {
        columns: [PERIOD, VALUE, MARK, { key: 'fitted', label: 'Fitted', kind: 'number', unit: 'plain', computed: true }],
        rows,
      },
      trace: [
        { label: 'Points fitted', formula: `${label(first)} to ${label(last)}${excluded.length ? `, leaving out ${excluded.join(', ')}` : ''}`, result: n, unit: 'count' },
        { label: 'Parameters', formula: ['level', 'slope', ...shifts.map(s => `a shift at ${s.period}`), ...design.breaks.map(b => `a change of trend at ${label(b)}`), ...(seasons.length ? [`${seasons.length} season${seasons.length === 1 ? '' : 's'}`] : [])].join(', '), result: p, unit: 'count' },
        ...shifts.map(s => ({ label: `Level shift at ${s.period}`, formula: exponential ? 'e^d − 1' : 'd', result: s.change, unit: (exponential ? 'percent' : 'plain') as 'percent' | 'plain' })),
        ...(trendBefore === null ? [] : [{ label: `Annual trend before ${design.breaks.map(label).join(', ')}`, formula: exponential ? `e^(${m} × b₀) − 1` : `${m} × b₀ / ŷ`, result: trendBefore, unit: 'percent' as const }]),
        { label: design.breaks.length ? 'Slope per period, after the change' : 'Slope per period', formula: exponential ? 'least squares of ln y on t' : 'least squares of y on t', result: slope, unit: 'plain' },
        { label: 'Standard error of the slope', formula: `√(gᵀ σ²(XᵀX)⁻¹ g), ${fit.df} degrees of freedom`, result: se, unit: 'plain' },
        { label: exponential ? 'Annual trend' : 'Annual change as a share of the latest fitted value', formula: exponential ? `e^(${m} × b) − 1` : `${m} × b / ŷ`, result: trend, unit: 'percent' },
        { label: '95% interval, low', formula: exponential ? `e^(${m} × (b − t·se)) − 1` : `${m} × (b − t·se) / ŷ`, result: ciLow, unit: 'percent' },
        { label: '95% interval, high', formula: exponential ? `e^(${m} × (b + t·se)) − 1` : `${m} × (b + t·se) / ŷ`, result: ciHigh, unit: 'percent' },
        { label: 'p-value', formula: `two-sided, t = b / se = ${formatValue(tStat, 'plain')}`, result: pValue, unit: 'plain' },
        { label: 'R²', formula: 'share of the variation the fit explains', result: fit.r2, unit: 'plain' },
      ],
      warnings,
      values: {
        trend,
        slope,
        intercept: fit.coef[0],
        r2: fit.r2,
        adj_r2: nullable(fit.adjR2),
        points: n,
        parameters: p,
        df: fit.df,
        se: nullable(se),
        t_stat: nullable(tStat),
        p_value: nullable(pValue),
        ci_level: LEVEL,
        ci_low: nullable(ciLow),
        ci_high: nullable(ciHigh),
        annual_change: exponential ? null : m * slope,
        trend_before: trendBefore,
        shifts,
        seasons,
        window: { from: label(first), to: label(last) },
        excluded,
      },
      summary: `${n}-point ${exponential ? 'exponential' : 'linear'} fit: ${exponential ? 'annual trend' : 'annual change'} ${pct(trend)}${exponential ? '' : ' of the latest fitted value'}${ciText}, R² ${formatValue(fit.r2, 'plain')}.`,
    }
  },
  method: {
    concepts: ['Exponential Trend', 'Linear Trend', 'Loss Trend'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 5–6' }],
  },
  next: [
    { tool: 'ratemaking.trend_factor', label: 'Trend Factor', build: (_input, output) => ({ trend: output.values.trend as number }) },
  ],
}

const nullable = (v: number) => (Number.isFinite(v) ? v : null)

/**
 * The likeliest single level shift in a fit that has none: every place with at
 * least three fitted points on each side is tried, and the best step's p-value
 * is multiplied by the number tried (Bonferroni), so scanning many places
 * doesn't find a shift in noise. Null unless that still clears 5%.
 */
function likelyShift(idx: number[], y: number[], end: number, m: number, base: Design): { at: number; step: number; p: number; remaining: number; tried: number } | null {
  if (idx.length < 8) return null
  const fitWith = (s: number): OlsFit | null => ols(idx.map(k => designRow(k, end, m, { ...base, shifts: [s] })), y)
  const without = ols(idx.map(k => designRow(k, end, m, base)), y)
  if (!without || without.sse === 0) return null
  let best: { at: number; step: number; p: number; remaining: number } | null = null
  let tried = 0
  for (let j = 3; j <= idx.length - 3; j++) {
    const at = idx[j]
    const f = fitWith(at)
    if (!f || f.df < 1) continue
    tried++
    const se = Math.sqrt(f.cov[2][2])
    const p = se > 0 ? twoSidedP(f.coef[2] / se, f.df) : 0
    if (!best || p < best.p) best = { at, step: f.coef[2], p, remaining: f.sse / without.sse }
  }
  if (!best || tried === 0) return null
  const adjusted = Math.min(1, best.p * tried)
  return adjusted < 0.05 ? { ...best, p: adjusted, tried } : null
}
