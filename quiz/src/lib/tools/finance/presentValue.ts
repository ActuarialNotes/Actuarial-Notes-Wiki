import { formatValue } from '../format'
import { ToolInputError, type ToolSpec, type TableRow } from '../types'

export const presentValue: ToolSpec = {
  id: 'finance.present_value',
  version: '1.0.0',
  name: 'Present Value',
  area: 'finance',
  answers: 'What are these cash flows worth today?',
  aka: ['NPV', 'PV', 'discount', 'accumulated value', 'FV'],
  fields: [
    { kind: 'number', key: 'i', label: 'Rate', symbol: 'i', unit: 'percent', min: -0.5, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective annual rate, as a decimal.' },
    {
      kind: 'table', key: 'flows', label: 'Cash flows', minRows: 1, maxRows: 500,
      description: 'Each cash flow: its time from today (in years, or in whatever period the rate is per), its amount (negative for an outflow), and optionally the t-year spot rate to discount it at — left blank, the flow is discounted at the rate above.',
      columns: [
        { key: 'time', label: 'Time t', kind: 'number', unit: 'years' },
        { key: 'amount', label: 'Amount', kind: 'number', unit: 'money' },
        { key: 'spot', label: 'Spot rate', kind: 'number', unit: 'percent', optional: true },
      ],
      default: [
        { time: 1, amount: 100, spot: null },
        { time: 2, amount: 100, spot: null },
        { time: 3, amount: 100, spot: null },
      ],
    },
  ],
  notation: () => 'PV = Σ CFₜ · (1 + iₜ)⁻ᵗ',
  view: 'table',
  grid: 'flows',
  compute: input => {
    const i = Number(input.i)
    const flows = input.flows as TableRow[]
    const v = 1 / (1 + i)
    const rows = flows.map(r => {
      if (r.spot != null && Math.abs(Number(r.spot)) > 1) {
        throw new ToolInputError('flows', `The spot rate at t = ${r.time} must be a decimal: write ${Number(r.spot) / 100} or "${r.spot}%".`)
      }
      const t = Number(r.time)
      const amount = Number(r.amount)
      // A flow with its own spot rate is discounted at it; the rest at the flat rate.
      const discount = r.spot == null ? v ** t : (1 + Number(r.spot)) ** -t
      return Object.assign({}, r, { discount, pv: amount * discount })
    })
    const pv = rows.reduce((s, r) => s + r.pv, 0)
    const total = rows.reduce((s, r) => s + Number(r.amount), 0)
    const warnings = flows.some(r => Number(r.time) < 0) ? ['A cash flow has a negative time: it is accumulated to today, not discounted.'] : []
    return {
      tiles: [
        { symbol: 'PV', label: 'Today', value: pv, unit: 'money' },
        { symbol: 'ΣCF', label: 'Undiscounted', value: total, unit: 'money' },
      ],
      table: {
        columns: [
          { key: 'time', label: 'Time t', kind: 'number', unit: 'years' },
          { key: 'amount', label: 'Amount', kind: 'number', unit: 'money' },
          { key: 'spot', label: 'Spot rate', kind: 'number', unit: 'percent' },
          { key: 'discount', label: 'vᵗ', kind: 'number', unit: 'factor', computed: true },
          { key: 'pv', label: 'PV', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { time: 'Total', amount: total, spot: null, discount: null, pv },
      },
      trace: [
        { label: 'Discount factor', formula: `v = 1/(1 + ${i})`, result: v, unit: 'factor' },
        ...rows.slice(0, 12).map(r => ({
          label: `PV at t = ${r.time}`,
          formula: r.spot == null ? `${r.amount} × v^${r.time}` : `${r.amount} × (1 + ${r.spot})^−${r.time}`,
          result: r.pv,
          unit: 'money' as const,
        })),
        { label: 'Present value', formula: 'Σ CFₜ vᵗ', result: pv, unit: 'money' },
      ],
      warnings,
      values: { present_value: pv, undiscounted: total, v },
      summary: `Present value ${formatValue(pv, 'money')} of ${formatValue(total, 'money')} in undiscounted cash flows at ${formatValue(i, 'percent')}.`,
    }
  },
  method: { concepts: ['Present Value', 'Discount Function'], readings: [] },
}
