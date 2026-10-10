import { formatValue } from '../format'
import type { TableRow, ToolSpec } from '../types'
import { BASIS_FIELD, CDF_COLUMN, LATEST_COLUMN, ORIGIN_COLUMN, checkCdfs, reserveLabel } from './chainLadder'

const EXPECTED_COLUMN = { key: 'expected', label: 'Expected', kind: 'number' as const, unit: 'money' as const }

export const benktander: ToolSpec = {
  id: 'reserving.benktander',
  version: '1.0.0',
  name: 'Benktander',
  area: 'reserving',
  answers: "What's the iterated Bornhuetter-Ferguson ultimate?",
  aka: ['iterated BF', 'GB'],
  fields: [
    BASIS_FIELD,
    {
      kind: 'number', key: 'iterations', label: 'Iterations', symbol: 'k', unit: 'count', integer: true, judgment: true, min: 1, max: 100, sliderMax: 10, step: 1, default: 2,
      description: 'How many times the B-F is applied, each time to the last ultimate: 1 is the B-F itself, 2 the Benktander (Mack 2000), and many approach the chain ladder.',
    },
    {
      kind: 'table', key: 'rows', label: 'Origins', minRows: 1, maxRows: 100,
      description: 'Each origin with its latest cumulative value, the CDF to ultimate at its age, and its a priori expected claims.',
      columns: [ORIGIN_COLUMN, LATEST_COLUMN, CDF_COLUMN, EXPECTED_COLUMN],
      default: [
        { origin: '2020', latest: 1700, cdf: 1, expected: 1690 },
        { origin: '2021', latest: 1850, cdf: 1.03, expected: 1820 },
        { origin: '2022', latest: 1800, cdf: 1.133, expected: 1950 },
        { origin: '2023', latest: 1300, cdf: 1.6995, expected: 1950 },
      ],
    },
  ],
  notation: input => `U⁽⁰⁾ = E,  U⁽ʲ⁾ = L + U⁽ʲ⁻¹⁾ · (1 − 1/CDF),  j = 1…${input.iterations}`,
  view: 'table',
  grid: 'rows',
  compute: input => {
    const rows = input.rows as TableRow[]
    const k = Number(input.iterations)
    const warnings = checkCdfs(rows)
    const reserve = reserveLabel(input.basis)
    const out = rows.map(r => {
      const q = 1 - 1 / Number(r.cdf)
      let u = Number(r.expected)
      let bf = u
      for (let j = 1; j <= k; j++) {
        u = Number(r.latest) + u * q
        if (j === 1) bf = u
      }
      return Object.assign({}, r, { bf, ultimate: u, reserve: u - Number(r.latest), unreported: q })
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
        { label: `B-F ultimate, ${r.origin}`, formula: `${r.latest} + ${r.expected} × ${r.unreported.toFixed(4)}`, result: r.bf, unit: 'money' as const },
        { label: `After ${k} iteration${k === 1 ? '' : 's'}, ${r.origin}`, formula: `${r.latest} + U⁽${k - 1}⁾ × ${r.unreported.toFixed(4)}`, result: r.ultimate, unit: 'money' as const },
      ]),
      warnings,
      values: {
        ultimate: out.map(r => r.ultimate),
        reserve: out.map(r => r.reserve),
        bf_ultimate: out.map(r => r.bf),
        total_ultimate: ult,
        total_reserve: res,
        reserve_label: reserve,
      },
      summary: `After ${k} B-F iteration${k === 1 ? '' : 's'}: ultimate ${formatValue(ult, 'money')}, ${reserve} ${formatValue(res, 'money')}.`,
    }
  },
  method: {
    concepts: ['Benktander Method', 'Bornhuetter-Ferguson Method'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 9' }],
  },
}
