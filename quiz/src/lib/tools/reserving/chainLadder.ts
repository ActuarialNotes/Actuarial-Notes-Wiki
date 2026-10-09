import { ToolInputError, type TableColumn, type TableRow, type ToolField, type ToolSpec } from '../types'

/** Reported claims leave IBNR; paid claims leave the whole unpaid. */
export const BASIS_FIELD: ToolField = {
  kind: 'choice', key: 'basis', label: 'Claims', description: 'Whether the latest values are reported (case-incurred) or paid claims.',
  options: [{ value: 'reported', label: 'Reported' }, { value: 'paid', label: 'Paid' }], default: 'reported',
}

export const reserveLabel = (basis: unknown) => (basis === 'paid' ? 'Unpaid' : 'IBNR')

export const ORIGIN_COLUMN: TableColumn = { key: 'origin', label: 'Origin', kind: 'text' }
export const LATEST_COLUMN: TableColumn = { key: 'latest', label: 'Latest', kind: 'number', unit: 'money' }
export const CDF_COLUMN: TableColumn = { key: 'cdf', label: 'CDF', kind: 'number', unit: 'factor' }

export function checkCdfs(rows: TableRow[]): string[] {
  for (const r of rows) {
    if (Number(r.cdf) <= 0) throw new ToolInputError('rows', `Origin ${r.origin}'s CDF must be positive.`)
  }
  return rows.some(r => Number(r.cdf) < 1) ? ['A CDF below 1 expects the latest value to fall.'] : []
}

export const chainLadder: ToolSpec = {
  id: 'reserving.chain_ladder',
  version: '1.0.0',
  name: 'Chain Ladder',
  area: 'reserving',
  answers: "What's the ultimate by development?",
  fields: [
    BASIS_FIELD,
    {
      kind: 'table', key: 'rows', label: 'Origins', minRows: 1, maxRows: 100,
      description: 'Each origin with its latest cumulative value and the CDF to ultimate at its age.',
      columns: [ORIGIN_COLUMN, LATEST_COLUMN, CDF_COLUMN],
      default: [
        { origin: '2020', latest: 1700, cdf: 1 },
        { origin: '2021', latest: 1850, cdf: 1.03 },
        { origin: '2022', latest: 1800, cdf: 1.133 },
        { origin: '2023', latest: 1300, cdf: 1.6995 },
      ],
    },
  ],
  notation: () => 'U = L · CDF',
  view: 'table',
  grid: 'rows',
  compute: input => {
    const rows = input.rows as TableRow[]
    const warnings = checkCdfs(rows)
    const reserve = reserveLabel(input.basis)
    const out = rows.map(r => {
      const ultimate = Number(r.latest) * Number(r.cdf)
      return Object.assign({}, r, { ultimate, reserve: ultimate - Number(r.latest) })
    })
    const ult = out.reduce((s, r) => s + r.ultimate, 0)
    const res = out.reduce((s, r) => s + r.reserve, 0)
    const latest = out.reduce((s, r) => s + Number(r.latest), 0)
    return {
      tiles: [
        { symbol: 'U', label: 'Ultimate', value: ult, unit: 'money' },
        { symbol: reserve, label: 'Total', value: res, unit: 'money' },
      ],
      table: {
        columns: [
          ORIGIN_COLUMN, LATEST_COLUMN, CDF_COLUMN,
          { key: 'ultimate', label: 'Ultimate', kind: 'number', unit: 'money', computed: true },
          { key: 'reserve', label: reserve, kind: 'number', unit: 'money', computed: true },
        ],
        rows: out,
        footer: { origin: 'Total', latest, cdf: null, ultimate: ult, reserve: res },
      },
      trace: out.map(r => ({ label: `Ultimate, ${r.origin}`, formula: `${r.latest} × ${Number(r.cdf).toFixed(4)}`, result: r.ultimate, unit: 'money' as const })),
      warnings,
      values: { ultimate: out.map(r => r.ultimate), reserve: out.map(r => r.reserve), total_ultimate: ult, total_reserve: res, reserve_label: reserve },
    }
  },
  method: {
    concepts: ['Chain Ladder Method', 'IBNR'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 7' }],
  },
}
