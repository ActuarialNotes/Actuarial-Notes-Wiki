import { decimalYear, parseDate } from '../dates'
import { formatValue } from '../format'
import { ToolInputError, type TableColumn, type TableRow, type ToolSpec } from '../types'

/**
 * The share of a period [a, b] that is earned (calendar year) or written
 * (policy year) on policies written at or after s, for policies of term T
 * written evenly: the parallelogram method's areas.
 */
function shareFrom(s: number, a: number, b: number, T: number, basis: string): number {
  if (basis === 'policy') return Math.min(1, Math.max(0, (b - s) / (b - a)))
  // In force at u from writings at or after s: (u − s)/T, capped at 1. Integrate over the year.
  const g = (u: number) => {
    const x = u - s
    if (x <= 0) return 0
    return x < T ? (x * x) / (2 * T) : T / 2 + (x - T)
  }
  return (g(b) - g(a)) / (b - a)
}

/**
 * Four decimals, half up, as a spreadsheet's ROUND does: 0.97375 is 0.9738,
 * though in binary it is a hair under and Math.round alone would give 0.9737.
 */
const round4 = (x: number) => Math.round(x * 1e4 + 1e-8) / 1e4

export const onLevelFactors: ToolSpec = {
  id: 'ratemaking.on_level_factors',
  version: '1.0.0',
  name: 'On-Level Factors',
  area: 'ratemaking',
  answers: "What brings each year's premium to current rates?",
  aka: ['OLF', 'parallelogram method', 'current rate level'],
  fields: [
    {
      kind: 'table', key: 'changes', label: 'Rate changes', minRows: 1, maxRows: 100,
      description: 'Each rate change, oldest first: the date it took effect for new and renewal policies, and the overall change as a decimal (−0.05 for a 5% decrease).',
      columns: [
        { key: 'date', label: 'Effective', kind: 'text' },
        { key: 'change', label: 'Change', kind: 'number', unit: 'percent' },
      ],
      default: [
        { date: '2021-07-01', change: 0.05 },
        { date: '2022-10-01', change: -0.02 },
        { date: '2023-04-01', change: 0.04 },
      ],
    },
    { kind: 'number', key: 'term', label: 'Policy term (months)', symbol: 'T', unit: 'count', integer: true, min: 1, max: 60, sliderMax: 24, step: 1, default: 12, description: 'The policy term in months: rate changes earn in over one term.' },
    {
      kind: 'choice', key: 'basis', label: 'Premium', description: 'Calendar year earned premium is a mix of rate levels; a policy year\'s premium is written at the level in force when each policy was.',
      options: [{ value: 'calendar', label: 'Calendar year' }, { value: 'policy', label: 'Policy year' }], default: 'calendar',
    },
    { kind: 'number', key: 'first', label: 'First year', symbol: 'Y₁', unit: 'count', integer: true, min: 1900, max: 2200, sliderMin: 2000, sliderMax: 2030, step: 1, default: 2021, description: 'The first year to bring on level.' },
    { kind: 'number', key: 'last', label: 'Last year', symbol: 'Yₙ', unit: 'count', integer: true, min: 1900, max: 2200, sliderMin: 2000, sliderMax: 2030, step: 1, default: 2023, description: 'The last year to bring on level.' },
    {
      kind: 'choice', key: 'rounding', label: 'Rate level indices', judgment: true,
      description: 'Whether the rate levels are carried unrounded, or rounded to four decimals as Werner & Modlin\'s exhibits print and use them: each cumulative level at each step of the product, and each year\'s average level before the factor is taken.',
      options: [{ value: 'none', label: 'Unrounded' }, { value: 'four', label: '4 decimals' }], default: 'none',
    },
  ],
  notation: () => 'OLF = current rate level / average rate level, by the parallelogram method',
  view: 'table',
  compute: input => {
    const changes = (input.changes as TableRow[]).map((r, k) => {
      const parts = parseDate(r.date)
      if (!parts) throw new ToolInputError('changes', `Rate change ${k + 1}'s date "${r.date}" isn't a date: write 2016-01-01 or 01/01/2016.`)
      return { label: String(r.date), at: decimalYear(parts), change: Number(r.change) }
    })
    for (let k = 1; k < changes.length; k++) {
      if (changes[k].at <= changes[k - 1].at) throw new ToolInputError('changes', 'List the rate changes oldest first, each on its own date.')
    }
    const first = Number(input.first)
    const last = Number(input.last)
    if (last < first) throw new ToolInputError('last', 'The last year must be on or after the first.')
    const T = Number(input.term) / 12
    const basis = String(input.basis)
    const round = input.rounding === 'four' ? round4 : (x: number) => x
    // Level 0 is before the first change; each change multiplies in. Rounded, each
    // level is the rounded level before it times the change, rounded again — the
    // exhibit's own cumulative product.
    const levels = [1]
    for (const c of changes) levels.push(round(levels[levels.length - 1] * (1 + c.change)))
    const used = levels
    const current = used[used.length - 1]
    const years = Array.from({ length: last - first + 1 }, (_, k) => first + k)
    const rows = years.map(y => {
      // The share at or after each change; a level's own share is the difference between neighbours.
      const after = [1, ...changes.map(c => shareFrom(c.at, y, y + 1, T, basis)), 0]
      const portions = levels.map((_, k) => after[k] - after[k + 1])
      const average = round(portions.reduce((s, p, k) => s + p * used[k], 0))
      return { y, portions, average, factor: current / average }
    })
    const levelKey = (k: number) => `level_${k}`
    const levelLabel = (k: number) => (k === 0 ? 'Before' : changes[k - 1].label)
    const columns: TableColumn[] = [
      { key: 'year', label: basis === 'policy' ? 'Policy year' : 'Calendar year', kind: 'text' },
      ...levels.map((_, k) => ({ key: levelKey(k), label: levelLabel(k), kind: 'number' as const, unit: 'percent' as const })),
      { key: 'average', label: 'Average level', kind: 'number', unit: 'factor' },
      { key: 'factor', label: 'OLF', kind: 'number', unit: 'factor' },
    ]
    return {
      tiles: [
        { symbol: 'OLF', label: `${last}`, value: rows[rows.length - 1].factor, unit: 'factor' },
        { symbol: 'OLF', label: `${first}`, value: rows[0].factor, unit: 'factor' },
        { symbol: 'CRL', label: 'Current rate level', value: current, unit: 'factor' },
      ],
      table: {
        columns: columns.map((c, k) => (k === 0 ? c : { ...c, computed: true })),
        rows: rows.map(r => Object.assign({ year: String(r.y), average: r.average, factor: r.factor }, Object.fromEntries(r.portions.map((p, k) => [levelKey(k), p])))),
      },
      trace: [
        ...used.map((l, k) => ({ label: `Cumulative rate level, ${levelLabel(k)}`, formula: k === 0 ? '1' : `× (1 + ${changes[k - 1].change})`, result: l, unit: 'factor' as const })),
        ...rows.map(r => ({ label: `Average rate level, ${r.y}`, formula: 'Σ share × level, the parallelogram\'s areas', result: r.average, unit: 'factor' as const })),
      ],
      warnings: [],
      values: {
        years,
        factors: rows.map(r => r.factor),
        averages: rows.map(r => r.average),
        portions: rows.map(r => r.portions),
        levels: used,
        current,
      },
      summary: `On-level factors ${rows.map(r => `${r.y}: ${formatValue(r.factor, 'factor')}`).join(', ')}, to a current rate level of ${formatValue(current, 'factor')}.`,
    }
  },
  method: {
    concepts: ['Parallelogram Method', 'On-Leveling'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 5' }],
  },
}
