import { formatValue } from '../format'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'

const PERIOD = { key: 'period', label: 'Period', kind: 'text' as const }
const VALUE = { key: 'value', label: 'Value', kind: 'number' as const, unit: 'plain' as const }

/** Least squares of y on x: intercept, slope and R². */
function leastSquares(x: number[], y: number[]) {
  const n = x.length
  const mx = x.reduce((s, v) => s + v, 0) / n
  const my = y.reduce((s, v) => s + v, 0) / n
  let sxy = 0
  let sxx = 0
  let syy = 0
  for (let k = 0; k < n; k++) {
    sxy += (x[k] - mx) * (y[k] - my)
    sxx += (x[k] - mx) ** 2
    syy += (y[k] - my) ** 2
  }
  const slope = sxy / sxx
  return { intercept: my - slope * mx, slope, r2: syy === 0 ? 1 : (sxy * sxy) / (sxx * syy) }
}

export const trendFit: ToolSpec = {
  id: 'ratemaking.trend_fit',
  version: '1.0.0',
  name: 'Trend Fit',
  area: 'ratemaking',
  answers: 'What annual trend do these data show?',
  aka: ['exponential trend', 'linear trend', 'loss trend', 'premium trend'],
  fields: [
    {
      kind: 'choice', key: 'model', label: 'Fit', description: 'Exponential fits ln(value) on time, a constant rate of change; linear fits the value itself, a constant amount.',
      options: [{ value: 'exponential', label: 'Exponential' }, { value: 'linear', label: 'Linear' }], default: 'exponential',
    },
    { kind: 'number', key: 'per_year', label: 'Points a year', symbol: 'm', unit: 'count', integer: true, min: 1, max: 365, sliderMax: 12, step: 1, default: 4, description: 'How many points make a year: 4 for quarters (year-ending quarterly figures), 1 for years.' },
    {
      kind: 'number', key: 'latest', label: 'Points fitted', symbol: 'n', unit: 'count', integer: true, judgment: true, min: 0, max: 1000, sliderMax: 20, step: 1, default: 0, zeroLabel: 'All',
      description: 'Fit only the latest n points (0 for all of them): a judgment of how far back the trend still holds.',
    },
    {
      kind: 'table', key: 'points', label: 'Points', minRows: 2, maxRows: 1000,
      description: 'The series, oldest first, evenly spaced: each period\'s label and its value (average premium, frequency, severity or pure premium).',
      columns: [PERIOD, VALUE],
      default: [
        { period: '2022 Q1', value: 100 },
        { period: '2022 Q2', value: 101.2 },
        { period: '2022 Q3', value: 101.9 },
        { period: '2022 Q4', value: 103.1 },
        { period: '2023 Q1', value: 104 },
        { period: '2023 Q2', value: 104.9 },
        { period: '2023 Q3', value: 106.2 },
        { period: '2023 Q4', value: 107.1 },
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
    const n = Number(input.latest) === 0 ? points.length : Math.min(Number(input.latest), points.length)
    if (n < 2) throw new ToolInputError('latest', 'Fit at least two points.')
    const first = points.length - n
    const fitted = points.slice(first)
    const x = fitted.map((_, k) => k)
    const ys = fitted.map(r => Number(r.value))
    if (exponential && ys.some(y => !(y > 0))) throw new ToolInputError('points', 'An exponential fit needs every value above zero; fit these linearly instead.')
    const fit = leastSquares(x, exponential ? ys.map(Math.log) : ys)
    const at = (k: number) => (exponential ? Math.exp(fit.intercept + fit.slope * k) : fit.intercept + fit.slope * k)
    const trend = exponential ? Math.exp(m * fit.slope) - 1 : (m * fit.slope) / at(n - 1)
    const rows = points.map((r, k) => Object.assign({}, r, { fitted: k >= first ? at(k - first) : null }))
    return {
      tiles: [
        { symbol: 'Δ', label: exponential ? 'Annual trend' : 'Annual change ÷ latest fit', value: trend, unit: 'percent' },
        ...(exponential ? [] : [{ symbol: 'm·b', label: 'Annual change', value: m * fit.slope, unit: 'plain' as const }]),
        { symbol: 'R²', label: `${n}-point fit`, value: fit.r2, unit: 'plain' },
      ],
      table: {
        columns: [PERIOD, VALUE, { key: 'fitted', label: 'Fitted', kind: 'number', unit: 'plain', computed: true }],
        rows,
      },
      trace: [
        { label: 'Points fitted', formula: `the latest ${n} of ${points.length}`, result: n, unit: 'count' },
        { label: 'Slope per period', formula: exponential ? 'least squares of ln y on t' : 'least squares of y on t', result: fit.slope, unit: 'plain' },
        { label: exponential ? 'Annual trend' : 'Annual change as a share of the latest fitted value', formula: exponential ? `e^(${m} × b) − 1` : `${m} × b / ŷ`, result: trend, unit: 'percent' },
        { label: 'R²', formula: 'share of the variation the fit explains', result: fit.r2, unit: 'plain' },
      ],
      warnings: [],
      values: { trend, slope: fit.slope, intercept: fit.intercept, r2: fit.r2, points: n, annual_change: exponential ? null : m * fit.slope },
      summary: `${n}-point ${exponential ? 'exponential' : 'linear'} fit: ${exponential ? 'annual trend' : 'annual change'} ${formatValue(trend, 'percent')}${exponential ? '' : ' of the latest fitted value'}, R² ${formatValue(fit.r2, 'plain')}.`,
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
