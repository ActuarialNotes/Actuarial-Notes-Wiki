import { formatValue } from '../format'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'

const TIME = { key: 'time', label: 'Time t', kind: 'number' as const, unit: 'years' as const }
const AMOUNT = { key: 'amount', label: 'Amount', kind: 'number' as const, unit: 'money' as const }

export interface FlowMeasures {
  pv: number
  macaulay: number
  modified: number
  /** −P''/P with respect to i: Σ t(t+1) CFₜ v^(t+2) / P. */
  convexity: number
}

/** A stream of flows' present value, durations and convexity at an annual effective rate. */
export function flowMeasures(flows: TableRow[], i: number, amountKey = 'amount'): FlowMeasures {
  const v = 1 / (1 + i)
  let pv = 0
  let weighted = 0
  let second = 0
  for (const r of flows) {
    const t = Number(r.time)
    const cf = Number(r[amountKey] ?? 0)
    pv += cf * v ** t
    weighted += t * cf * v ** t
    second += t * (t + 1) * cf * v ** (t + 2)
  }
  const macaulay = weighted / pv
  return { pv, macaulay, modified: macaulay * v, convexity: second / pv }
}

export const durationConvexity: ToolSpec = {
  id: 'finance.duration_convexity',
  version: '1.0.0',
  name: 'Duration & Convexity',
  area: 'finance',
  answers: 'How sensitive is the value of these cash flows to the rate?',
  fields: [
    { kind: 'number', key: 'i', label: 'Annual effective rate', symbol: 'i', unit: 'percent', min: -0.5, max: 2, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The annual effective rate (the yield), as a decimal. Times are in years.' },
    {
      kind: 'table', key: 'flows', label: 'Cash flows', minRows: 1, maxRows: 1200,
      description: 'Each cash flow: its time in years and its amount. A semiannual coupon at the end of year 1½ has time 1.5.',
      columns: [TIME, AMOUNT],
      default: [
        { time: 1, amount: 60 },
        { time: 2, amount: 60 },
        { time: 3, amount: 60 },
        { time: 4, amount: 1060 },
      ],
    },
  ],
  notation: () => 'D = Σ t·CFₜvᵗ / P,  D_mod = D·v,  C = P″/P',
  view: 'table',
  grid: 'flows',
  compute: input => {
    const i = Number(input.i)
    const flows = input.flows as TableRow[]
    const m = flowMeasures(flows, i)
    if (!(Math.abs(m.pv) > 1e-12)) throw new ToolInputError('flows', 'The flows are worth nothing at this rate, so their duration is undefined.')
    const v = 1 / (1 + i)
    const rows = flows.map(r => {
      const pv = Number(r.amount) * v ** Number(r.time)
      return Object.assign({}, r, { pv, weight: pv / m.pv })
    })
    const warnings = flows.some(r => Number(r.amount) < 0) ? ['Some flows are negative: the duration is a net figure and may lie outside the span of the flows.'] : []
    return {
      tiles: [
        { symbol: 'D', label: 'Macaulay', value: m.macaulay, unit: 'years' },
        { symbol: 'D_mod', label: 'Modified', value: m.modified, unit: 'years' },
        { symbol: 'C', label: 'Convexity', value: m.convexity, unit: 'plain' },
      ],
      table: {
        columns: [
          TIME, AMOUNT,
          { key: 'pv', label: 'PV', kind: 'number', unit: 'money', computed: true },
          { key: 'weight', label: 'Weight', kind: 'number', unit: 'percent', computed: true },
        ],
        rows,
        footer: { time: 'Total', amount: flows.reduce((s, r) => s + Number(r.amount), 0), pv: m.pv, weight: 1 },
      },
      trace: [
        { label: 'Present value', formula: 'P = Σ CFₜ vᵗ', result: m.pv, unit: 'money' },
        { label: 'Macaulay duration', formula: 'Σ t · CFₜ vᵗ / P', result: m.macaulay, unit: 'years' },
        { label: 'Modified duration', formula: `D / (1 + ${i})`, result: m.modified, unit: 'years' },
        { label: 'Convexity', formula: 'Σ t(t + 1) CFₜ v^(t+2) / P', result: m.convexity, unit: 'plain' },
        { label: 'First-order change for +1%', formula: '−D_mod × 0.01 × P', result: -m.modified * 0.01 * m.pv, unit: 'money' },
      ],
      warnings,
      values: { present_value: m.pv, macaulay: m.macaulay, modified: m.modified, convexity: m.convexity },
      summary: `Macaulay duration ${formatValue(m.macaulay, 'years')} years, modified ${formatValue(m.modified, 'years')}, convexity ${formatValue(m.convexity, 'plain')}, on a present value of ${formatValue(m.pv, 'money')} at ${formatValue(i, 'percent')}.`,
    }
  },
  method: { concepts: ['Macaulay Duration', 'Modified Duration', 'Convexity'], readings: [] },
}
