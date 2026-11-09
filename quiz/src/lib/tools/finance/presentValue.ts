import { formatValue } from '../format'
import { RATE_GRID, rootsOn } from '../numeric'
import { ToolInputError, type ToolSpec, type TableRow } from '../types'

/**
 * Present Value, solved for either unknown (docs/tool-template-v3.md §3): what
 * the flows are worth at a rate (the default), or the rate at which they are
 * worth a given amount: the yield an investor gets for paying that price.
 */
type Unknown = 'pv' | 'i'

/** A flow's discount factor: at its own spot rate where it has one, else at i. */
const discountAt = (r: TableRow, i: number) => (r.spot == null ? (1 + i) ** -Number(r.time) : (1 + Number(r.spot)) ** -Number(r.time))

export const presentValue: ToolSpec = {
  id: 'finance.present_value',
  version: '1.1.0',
  name: 'Present Value',
  area: 'finance',
  answers: 'What are these cash flows worth today?',
  aka: ['NPV', 'PV', 'discount', 'accumulated value', 'FV', 'yield', 'solve'],
  fields: [
    {
      kind: 'choice', key: 'solve', label: 'Solve for',
      description: 'Which quantity is the answer: the present value (the default), or the rate at which the flows are worth the present value given. The field for the chosen quantity is not read.',
      options: [{ value: 'pv', label: 'PV' }, { value: 'i', label: 'Rate' }],
      default: 'pv',
    },
    { kind: 'number', key: 'i', bank: ['discount-rate'], label: 'Rate', symbol: 'i', unit: 'percent', min: -0.5, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective annual rate, as a decimal. Not read when solving for it.', showWhen: { field: 'solve', in: ['pv'] } },
    {
      kind: 'number', key: 'pv', label: 'Present value', symbol: 'PV', unit: 'money', min: -1e12, max: 1e12, sliderMin: 0, sliderMax: 1000, step: 1, default: 272.32,
      description: 'What the flows are worth today: the price paid for them. Read only when solving for the rate.',
      showWhen: { field: 'solve', in: ['i'] },
    },
    {
      kind: 'table', key: 'flows', label: 'Cash flows', minRows: 1, maxRows: 500,
      description: 'Each cash flow: its time from today (in years, or in whatever period the rate is per), its amount (negative for an outflow), and optionally the t-year spot rate to discount it at. Left blank, the flow is discounted at the rate above.',
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
  solveFor: 'solve',
  notation: input => (input.solve === 'i' ? 'PV = Σ CFₜ · (1 + i)⁻ᵗ, solved for i' : 'PV = Σ CFₜ · (1 + iₜ)⁻ᵗ'),
  view: 'table',
  grid: 'flows',
  compute: input => {
    const solve = String(input.solve ?? 'pv') as Unknown
    const flows = input.flows as TableRow[]
    for (const r of flows) {
      if (r.spot != null && Math.abs(Number(r.spot)) > 1) {
        throw new ToolInputError('flows', `The spot rate at t = ${r.time} must be a decimal: write ${Number(r.spot) / 100} or "${r.spot}%".`)
      }
    }
    let i = Number(input.i)
    const solving: { label: string; formula: string; result: number; unit: 'percent' }[] = []
    const warnings: string[] = []
    if (solve === 'i') {
      const target = Number(input.pv)
      if (flows.every(r => r.spot != null)) throw new ToolInputError('flows', 'Every flow has its own spot rate, so no one rate changes what they are worth. Clear the spot rates to solve for the rate.')
      const roots = rootsOn(x => flows.reduce((s, r) => s + Number(r.amount) * discountAt(r, x), 0) - target, RATE_GRID)
      if (!roots.length) throw new ToolInputError('pv', `No rate between −99% and 1,000% makes these flows worth ${formatValue(target, 'money')}.`)
      // With several, the one nearest zero is shown and all are named, as Internal Rate of Return does.
      i = [...roots].sort((a, b) => Math.abs(a) - Math.abs(b))[0]
      if (roots.length > 1) warnings.push(`${roots.length} rates make these flows worth ${formatValue(target, 'money')}: ${roots.map(r => formatValue(r, 'percent')).join(', ')}. The one nearest zero is shown.`)
      solving.push({ label: 'Rate', formula: `the i where Σ CFₜ vᵗ = ${formatValue(target, 'money')}, by bisection`, result: i, unit: 'percent' })
    }
    const v = 1 / (1 + i)
    // A flow with its own spot rate is discounted at it; the rest at the flat rate.
    const rows = flows.map(r => {
      const discount = discountAt(r, i)
      return Object.assign({}, r, { discount, pv: Number(r.amount) * discount })
    })
    const pv = rows.reduce((s, r) => s + r.pv, 0)
    const total = rows.reduce((s, r) => s + Number(r.amount), 0)
    if (flows.some(r => Number(r.time) < 0)) warnings.push('A cash flow has a negative time: it is accumulated to today, not discounted.')
    const pvTile = { symbol: 'PV', label: 'Present value', value: pv, unit: 'money' as const }
    const totalTile = { symbol: 'ΣCF', label: 'Undiscounted', value: total, unit: 'money' as const }
    return {
      tiles: solve === 'i'
        ? [{ symbol: 'i', label: 'Rate', value: i, unit: 'percent' }, pvTile, totalTile]
        : [pvTile, totalTile],
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
        ...solving,
        { label: 'Discount factor', formula: `v = 1/(1 + ${Number(i.toFixed(8))})`, result: v, unit: 'factor' },
        ...rows.slice(0, 12).map(r => ({
          label: `PV at t = ${r.time}`,
          formula: r.spot == null ? `${r.amount} × v^${r.time}` : `${r.amount} × (1 + ${r.spot})^−${r.time}`,
          result: r.pv,
          unit: 'money' as const,
        })),
        { label: 'Present value', formula: 'Σ CFₜ vᵗ', result: pv, unit: 'money' },
      ],
      warnings,
      values: { solve, present_value: pv, undiscounted: total, v, i },
      summary: solve === 'i'
        ? `At ${formatValue(i, 'percent')} the cash flows are worth ${formatValue(pv, 'money')} (${formatValue(total, 'money')} undiscounted).`
        : `Present value ${formatValue(pv, 'money')} of ${formatValue(total, 'money')} in undiscounted cash flows at ${formatValue(i, 'percent')}.`,
    }
  },
  method: { concepts: ['Present Value', 'Discount Function'], readings: [] },
}
