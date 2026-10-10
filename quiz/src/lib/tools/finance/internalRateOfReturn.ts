import { formatValue } from '../format'
import { RATE_GRID, rootsOn } from '../numeric'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'

const TIME = { key: 'time', label: 'Time t', kind: 'number' as const, unit: 'years' as const }
const AMOUNT = { key: 'amount', label: 'Amount', kind: 'number' as const, unit: 'money' as const }

/** The net present value of flows at a rate. */
export const npvAt = (flows: TableRow[], i: number) => flows.reduce((s, r) => s + Number(r.amount) * (1 + i) ** -Number(r.time), 0)

export const internalRateOfReturn: ToolSpec = {
  id: 'finance.internal_rate_of_return',
  version: '1.0.0',
  name: 'Internal Rate of Return',
  area: 'finance',
  answers: 'What rate makes these cash flows worth zero?',
  aka: ['IRR', 'yield rate', 'dollar-weighted'],
  fields: [
    {
      kind: 'table', key: 'flows', label: 'Cash flows', minRows: 2, maxRows: 500,
      description: 'Each cash flow: its time (in years, or in whatever period the rate is to be per) and its amount, negative for money paid out and positive for money received.',
      columns: [TIME, AMOUNT],
      default: [
        { time: 0, amount: -1000 },
        { time: 1, amount: 300 },
        { time: 2, amount: 400 },
        { time: 3, amount: 500 },
      ],
    },
  ],
  notation: () => 'Σ CFₜ (1 + i)⁻ᵗ = 0',
  view: 'table',
  grid: 'flows',
  compute: input => {
    const flows = input.flows as TableRow[]
    const amounts = flows.map(r => Number(r.amount))
    if (!amounts.some(a => a > 0) || !amounts.some(a => a < 0)) {
      throw new ToolInputError('flows', 'The flows need at least one payment out (negative) and one receipt (positive): otherwise no rate makes them worth zero.')
    }
    if (flows.some(r => Number(r.time) < 0)) throw new ToolInputError('flows', 'A cash flow has a negative time; measure every time from the first flow.')
    const roots = rootsOn(i => npvAt(flows, i), RATE_GRID)
    if (roots.length === 0) throw new ToolInputError('flows', 'No rate between −99% and 1,000% makes these flows worth zero.')
    // With several rates of return none is "the" yield; the one nearest zero is shown, and all are named.
    const irr = [...roots].sort((a, b) => Math.abs(a) - Math.abs(b))[0]
    const v = 1 / (1 + irr)
    const rows = flows.map(r => {
      const discount = v ** Number(r.time)
      return Object.assign({}, r, { discount, pv: Number(r.amount) * discount })
    })
    const warnings = roots.length > 1
      ? [`${roots.length} rates make these flows worth zero: ${roots.map(r => formatValue(r, 'percent')).join(', ')}. No one of them is the yield; the one nearest zero is shown.`]
      : []
    return {
      tiles: [
        { symbol: 'i', label: 'Yield rate', value: irr, unit: 'percent' },
        { symbol: 'δ', label: 'Force', value: Math.log(1 + irr), unit: 'percent' },
      ],
      table: {
        columns: [
          TIME, AMOUNT,
          { key: 'discount', label: 'vᵗ', kind: 'number', unit: 'factor', computed: true },
          { key: 'pv', label: 'PV at i', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { time: 'Total', amount: amounts.reduce((s, a) => s + a, 0), discount: null, pv: rows.reduce((s, r) => s + r.pv, 0) },
      },
      trace: [
        { label: 'Sign changes in the flows', formula: 'Descartes: at most this many positive roots in v', result: signChanges(flows), unit: 'count' },
        { label: 'Yield rate', formula: 'the i where Σ CFₜ vᵗ = 0, by bisection', result: irr, unit: 'percent' },
        { label: 'Net present value at i', formula: 'Σ CFₜ (1 + i)⁻ᵗ', result: npvAt(flows, irr), unit: 'money' },
      ],
      warnings,
      values: { irr, rates: roots, force: Math.log(1 + irr) },
      summary: `Internal rate of return ${formatValue(irr, 'percent')} per unit of time${roots.length > 1 ? ` (one of ${roots.length} roots)` : ''}.`,
    }
  },
  method: { concepts: ['Internal Rate of Return', 'Yield Rate'], readings: [] },
  next: [
    { tool: 'finance.interest_converter', label: 'Interest Converter', build: (_input, output) => ({ form: 'effective_interest', rate: Math.max(0, Number(output.values.irr)) }) },
  ],
}

function signChanges(flows: TableRow[]): number {
  const signs = [...flows].sort((a, b) => Number(a.time) - Number(b.time)).map(r => Math.sign(Number(r.amount))).filter(s => s !== 0)
  return signs.reduce((n, s, k) => (k > 0 && s !== signs[k - 1] ? n + 1 : n), 0)
}
