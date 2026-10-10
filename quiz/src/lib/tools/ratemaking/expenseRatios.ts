import { formatValue } from '../format'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'

const TYPE = { key: 'type', label: 'Expense', kind: 'text' as const }
const EXPENSES = { key: 'expenses', label: 'Expenses', kind: 'number' as const, unit: 'money' as const }
const PREMIUM = { key: 'premium', label: 'Premium', kind: 'number' as const, unit: 'money' as const }
const FIXED_SHARE = { key: 'fixed_share', label: '% fixed', kind: 'number' as const, unit: 'percent' as const }

export const expenseRatios: ToolSpec = {
  id: 'ratemaking.expense_ratios',
  version: '1.0.0',
  name: 'Expense Ratios',
  area: 'ratemaking',
  answers: 'What are the fixed and variable expense provisions?',
  aka: ['fixed expense', 'variable expense', 'expense provision'],
  fields: [
    {
      kind: 'table', key: 'rows', label: 'Expense types', minRows: 1, maxRows: 50,
      description: 'Each expense type with its expenses and the premium they are measured against (earned premium for general expenses, written for acquisition costs, taxes, licenses and fees — over the same years), and the share of it treated as fixed (a judgment).',
      columns: [TYPE, EXPENSES, PREMIUM, FIXED_SHARE],
      default: [
        { type: 'General expenses', expenses: 900000, premium: 14000000, fixed_share: 0.75 },
        { type: 'Other acquisition', expenses: 1200000, premium: 14500000, fixed_share: 0.75 },
        { type: 'Commission and brokerage', expenses: 1600000, premium: 14500000, fixed_share: 0 },
        { type: 'Taxes, licenses and fees', expenses: 340000, premium: 14500000, fixed_share: 0 },
      ],
    },
  ],
  notation: () => 'F = Σ (Eₜ/Pₜ)·fₜ,  V = Σ (Eₜ/Pₜ)·(1 − fₜ)',
  view: 'table',
  grid: 'rows',
  compute: input => {
    const rows = input.rows as TableRow[]
    const out = rows.map(r => {
      const premium = Number(r.premium)
      if (!(premium > 0)) throw new ToolInputError('rows', `"${r.type}" needs a premium above zero to measure its expenses against.`)
      const share = Number(r.fixed_share)
      if (share < 0 || share > 1) throw new ToolInputError('rows', `"${r.type}": the fixed share must be between 0 and 1 (a decimal, or "75%").`)
      const ratio = Number(r.expenses) / premium
      return Object.assign({}, r, { ratio, fixed: ratio * share, variable: ratio * (1 - share) })
    })
    const F = out.reduce((s, r) => s + r.fixed, 0)
    const V = out.reduce((s, r) => s + r.variable, 0)
    return {
      tiles: [
        { symbol: 'F', label: 'Fixed provision', value: F, unit: 'percent' },
        { symbol: 'V', label: 'Variable provision', value: V, unit: 'percent' },
        { symbol: 'F + V', label: 'Total', value: F + V, unit: 'percent' },
      ],
      table: {
        columns: [
          TYPE, EXPENSES, PREMIUM, FIXED_SHARE,
          { key: 'ratio', label: 'Ratio', kind: 'number', unit: 'percent', computed: true },
          { key: 'fixed', label: 'Fixed', kind: 'number', unit: 'percent', computed: true },
          { key: 'variable', label: 'Variable', kind: 'number', unit: 'percent', computed: true },
        ],
        rows: out,
        footer: { type: 'Provision', expenses: null, premium: null, fixed_share: null, ratio: F + V, fixed: F, variable: V },
      },
      trace: out.map(r => ({ label: String(r.type), formula: `${formatValue(Number(r.expenses), 'money')} / ${formatValue(Number(r.premium), 'money')}`, result: r.ratio, unit: 'percent' as const })),
      warnings: [],
      values: { fixed_provision: F, variable_provision: V, ratio: out.map(r => r.ratio), fixed: out.map(r => r.fixed), variable: out.map(r => r.variable) },
      summary: `Fixed expense provision ${formatValue(F, 'percent')}, variable ${formatValue(V, 'percent')} of premium.`,
    }
  },
  method: {
    concepts: ['Expense Provisions', 'Fixed Expenses'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 7' }],
  },
  next: [
    { tool: 'ratemaking.loss_ratio_method', label: 'Loss Ratio Method', build: (_input, output) => ({ fixed: output.values.fixed_provision as number, variable: output.values.variable_provision as number }) },
    { tool: 'ratemaking.permissible_loss_ratio', label: 'Permissible Loss Ratio', build: (_input, output) => ({ fixed: output.values.fixed_provision as number, variable: output.values.variable_provision as number }) },
  ],
}
