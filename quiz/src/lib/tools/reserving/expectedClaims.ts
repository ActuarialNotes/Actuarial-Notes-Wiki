import { ToolInputError, type TableRow, type ToolSpec } from '../types'
import { formatValue } from '../format'
import { ORIGIN_COLUMN } from './chainLadder'

export const expectedClaims: ToolSpec = {
  id: 'reserving.expected_claims',
  version: '1.0.0',
  name: 'Expected Claims',
  area: 'reserving',
  answers: "What's the a priori ultimate?",
  fields: [
    { kind: 'number', key: 'elr', label: 'Expected loss ratio', symbol: 'ELR', unit: 'percent', judgment: true, min: 0, max: 3, sliderMax: 1.5, step: 0.005, default: 0.65, description: 'The a priori expected claim ratio, as a decimal.' },
    {
      kind: 'table', key: 'rows', label: 'Origins', minRows: 1, maxRows: 100,
      description: 'Each origin with its earned premium (on-level and trended, if that is what the ELR is set against), and optionally its own ELR — left blank, the origin takes the expected loss ratio above.',
      columns: [
        ORIGIN_COLUMN,
        { key: 'premium', label: 'Earned premium', kind: 'number', unit: 'money' },
        { key: 'elr', label: 'Own ELR', kind: 'number', unit: 'percent', optional: true },
      ],
      default: [
        { origin: '2020', premium: 2600, elr: null },
        { origin: '2021', premium: 2800, elr: null },
        { origin: '2022', premium: 3000, elr: null },
        { origin: '2023', premium: 3000, elr: null },
      ],
    },
  ],
  notation: () => 'E = ELR · EP',
  view: 'table',
  grid: 'rows',
  compute: input => {
    const elr = Number(input.elr)
    const rows = (input.rows as TableRow[]).map(r => {
      if (r.elr != null && (Number(r.elr) < 0 || Number(r.elr) > 3)) {
        throw new ToolInputError('rows', `Origin ${r.origin}'s ELR must be a decimal between 0 and 3: write ${Number(r.elr) / 100} or "${r.elr}%".`)
      }
      const ratio = r.elr == null ? elr : Number(r.elr)
      return Object.assign({}, r, { ratio, expected: Number(r.premium) * ratio })
    })
    const total = rows.reduce((s, r) => s + r.expected, 0)
    const premium = rows.reduce((s, r) => s + Number(r.premium), 0)
    return {
      tiles: [{ symbol: 'E', label: 'Expected claims', value: total, unit: 'money' }],
      table: {
        columns: [
          ORIGIN_COLUMN,
          { key: 'premium', label: 'Earned premium', kind: 'number', unit: 'money' },
          { key: 'elr', label: 'Own ELR', kind: 'number', unit: 'percent' },
          { key: 'expected', label: 'Expected claims', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { origin: 'Total', premium, elr: null, expected: total },
      },
      trace: rows.map(r => ({ label: `Expected, ${r.origin}`, formula: `${formatValue(r.ratio, 'percent')} × ${r.premium}`, result: r.expected, unit: 'money' as const })),
      warnings: [],
      values: { expected: rows.map(r => r.expected), total_expected: total },
    }
  },
  method: {
    concepts: ['Expected Loss Method'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 8' }],
  },
}
