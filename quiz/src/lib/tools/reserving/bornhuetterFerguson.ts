import type { TableRow, ToolSpec } from '../types'
import { BASIS_FIELD, CDF_COLUMN, LATEST_COLUMN, ORIGIN_COLUMN, checkCdfs, reserveLabel } from './chainLadder'

const EXPECTED_COLUMN = { key: 'expected', label: 'Expected', kind: 'number' as const, unit: 'money' as const }

export const bornhuetterFerguson: ToolSpec = {
  id: 'reserving.bornhuetter_ferguson',
  version: '1.0.0',
  name: 'Bornhuetter-Ferguson',
  area: 'reserving',
  answers: "What's the Bornhuetter-Ferguson ultimate?",
  aka: ['BF', 'B-F', 'IBNR'],
  fields: [
    BASIS_FIELD,
    {
      kind: 'table', key: 'rows', label: 'Origins', minRows: 1, maxRows: 100,
      description: 'Each origin with its latest cumulative value, the CDF to ultimate at its age, and its expected (a priori) claims.',
      columns: [ORIGIN_COLUMN, LATEST_COLUMN, CDF_COLUMN, EXPECTED_COLUMN],
      default: [
        { origin: '2020', latest: 1700, cdf: 1, expected: 1690 },
        { origin: '2021', latest: 1850, cdf: 1.03, expected: 1820 },
        { origin: '2022', latest: 1800, cdf: 1.133, expected: 1950 },
        { origin: '2023', latest: 1300, cdf: 1.6995, expected: 1950 },
      ],
    },
  ],
  notation: () => 'U = L + E · (1 − 1/CDF)',
  view: 'table',
  grid: 'rows',
  compute: input => {
    const rows = input.rows as TableRow[]
    const warnings = checkCdfs(rows)
    const reserve = reserveLabel(input.basis)
    const out = rows.map(r => {
      const unreported = 1 - 1 / Number(r.cdf)
      const res = Number(r.expected) * unreported
      return Object.assign({}, r, { unreported, reserve: res, ultimate: Number(r.latest) + res })
    })
    const ult = out.reduce((s, r) => s + r.ultimate, 0)
    const res = out.reduce((s, r) => s + r.reserve, 0)
    return {
      tiles: [
        { symbol: 'U', label: 'Ultimate', value: ult, unit: 'money' },
        { symbol: reserve, label: 'Total', value: res, unit: 'money' },
      ],
      table: {
        columns: [
          ORIGIN_COLUMN, LATEST_COLUMN, CDF_COLUMN, EXPECTED_COLUMN,
          { key: 'ultimate', label: 'Ultimate', kind: 'number', unit: 'money', computed: true },
          { key: 'reserve', label: reserve, kind: 'number', unit: 'money', computed: true },
        ],
        rows: out,
        footer: {
          origin: 'Total',
          latest: out.reduce((s, r) => s + Number(r.latest), 0),
          cdf: null,
          expected: out.reduce((s, r) => s + Number(r.expected), 0),
          ultimate: ult,
          reserve: res,
        },
      },
      trace: out.flatMap(r => [
        { label: `% unreported, ${r.origin}`, formula: `1 − 1/${Number(r.cdf).toFixed(4)}`, result: r.unreported, unit: 'percent' as const },
        { label: `${reserve}, ${r.origin}`, formula: `${r.expected} × ${r.unreported.toFixed(4)}`, result: r.reserve, unit: 'money' as const },
      ]),
      warnings,
      values: {
        ultimate: out.map(r => r.ultimate),
        reserve: out.map(r => r.reserve),
        percent_unreported: out.map(r => r.unreported),
        total_ultimate: ult,
        total_reserve: res,
        reserve_label: reserve,
      },
    }
  },
  method: {
    concepts: ['Bornhuetter-Ferguson Method'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 9' }],
  },
}
