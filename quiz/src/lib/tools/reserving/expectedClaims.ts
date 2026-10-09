import type { TableRow, ToolSpec } from '../types'
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
      description: 'Each origin with its earned premium (on-level and trended, if that is what the ELR is set against).',
      columns: [ORIGIN_COLUMN, { key: 'premium', label: 'Earned premium', kind: 'number', unit: 'money' }],
      default: [
        { origin: '2020', premium: 2600 },
        { origin: '2021', premium: 2800 },
        { origin: '2022', premium: 3000 },
        { origin: '2023', premium: 3000 },
      ],
    },
  ],
  notation: () => 'E = ELR · EP',
  view: 'table',
  grid: 'rows',
  compute: input => {
    const elr = Number(input.elr)
    const rows = (input.rows as TableRow[]).map(r => Object.assign({}, r, { expected: Number(r.premium) * elr }))
    const total = rows.reduce((s, r) => s + r.expected, 0)
    const premium = rows.reduce((s, r) => s + Number(r.premium), 0)
    return {
      tiles: [{ symbol: 'E', label: 'Expected claims', value: total, unit: 'money' }],
      table: {
        columns: [
          ORIGIN_COLUMN,
          { key: 'premium', label: 'Earned premium', kind: 'number', unit: 'money' },
          { key: 'expected', label: 'Expected claims', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { origin: 'Total', premium, expected: total },
      },
      trace: rows.map(r => ({ label: `Expected, ${r.origin}`, formula: `${elr} × ${r.premium}`, result: r.expected, unit: 'money' as const })),
      warnings: [],
      values: { expected: rows.map(r => r.expected), total_expected: total },
    }
  },
  method: {
    concepts: ['Expected Loss Method'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 8' }],
  },
}
