import { formatValue } from '../format'
import type { ToolSpec, TableRow } from '../types'

export const presentValue: ToolSpec = {
  id: 'finance.present_value',
  version: '1.0.0',
  name: 'Present Value',
  area: 'finance',
  answers: 'What are these cash flows worth today?',
  fields: [
    { kind: 'number', key: 'i', label: 'Rate', symbol: 'i', unit: 'percent', min: -0.5, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective annual rate, as a decimal.' },
    {
      kind: 'table', key: 'flows', label: 'Cash flows', minRows: 1, maxRows: 500,
      description: 'Each cash flow: its time in years from today and its amount (negative for an outflow).',
      columns: [
        { key: 'time', label: 'Time t', kind: 'number', unit: 'years' },
        { key: 'amount', label: 'Amount', kind: 'number', unit: 'money' },
      ],
      default: [
        { time: 1, amount: 100 },
        { time: 2, amount: 100 },
        { time: 3, amount: 100 },
      ],
    },
  ],
  notation: () => 'PV = Σ CFₜ · vᵗ,  v = 1/(1 + i)',
  view: 'table',
  grid: 'flows',
  compute: input => {
    const i = Number(input.i)
    const flows = input.flows as TableRow[]
    const v = 1 / (1 + i)
    const rows = flows.map(r => {
      const t = Number(r.time)
      const amount = Number(r.amount)
      const discount = v ** t
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
          { key: 'discount', label: 'vᵗ', kind: 'number', unit: 'factor', computed: true },
          { key: 'pv', label: 'PV', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { time: 'Total', amount: total, discount: null, pv },
      },
      trace: [
        { label: 'Discount factor', formula: `v = 1/(1 + ${i})`, result: v, unit: 'factor' },
        ...rows.slice(0, 12).map(r => ({ label: `PV at t = ${r.time}`, formula: `${r.amount} × v^${r.time}`, result: r.pv, unit: 'money' as const })),
        { label: 'Present value', formula: 'Σ CFₜ vᵗ', result: pv, unit: 'money' },
      ],
      warnings,
      values: { present_value: pv, undiscounted: total, v },
      summary: `Present value ${formatValue(pv, 'money')} of ${formatValue(total, 'money')} in undiscounted cash flows at ${formatValue(i, 'percent')}.`,
    }
  },
  method: { concepts: ['Present Value', 'Discount Function'], readings: [] },
}
