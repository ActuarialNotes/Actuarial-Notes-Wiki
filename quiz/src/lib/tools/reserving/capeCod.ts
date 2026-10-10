import { formatValue } from '../format'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'
import { BASIS_FIELD, CDF_COLUMN, LATEST_COLUMN, ORIGIN_COLUMN, checkCdfs, reserveLabel } from './chainLadder'

const PREMIUM_COLUMN = { key: 'premium', label: 'Premium', kind: 'number' as const, unit: 'money' as const }

export const capeCod: ToolSpec = {
  id: 'reserving.cape_cod',
  version: '1.0.0',
  name: 'Cape Cod',
  area: 'reserving',
  answers: 'What expected claim ratio do the data imply, and what ultimate follows?',
  fields: [
    BASIS_FIELD,
    {
      kind: 'table', key: 'rows', label: 'Origins', minRows: 1, maxRows: 100,
      description: 'Each origin with its premium (on-level, and trended if claims are), its latest cumulative claims and the CDF to ultimate at its age.',
      columns: [ORIGIN_COLUMN, PREMIUM_COLUMN, LATEST_COLUMN, CDF_COLUMN],
      default: [
        { origin: '2020', premium: 2600, latest: 1700, cdf: 1 },
        { origin: '2021', premium: 2800, latest: 1850, cdf: 1.03 },
        { origin: '2022', premium: 3000, latest: 1800, cdf: 1.133 },
        { origin: '2023', premium: 3000, latest: 1300, cdf: 1.6995 },
      ],
    },
  ],
  notation: () => 'ELR = Σ L / Σ (EP / CDF),  U = L + ELR · EP · (1 − 1/CDF)',
  view: 'table',
  grid: 'rows',
  compute: input => {
    const rows = input.rows as TableRow[]
    const warnings = checkCdfs(rows)
    const reserve = reserveLabel(input.basis)
    const usedUp = rows.map(r => Number(r.premium) / Number(r.cdf))
    const totalUsed = usedUp.reduce((s, u) => s + u, 0)
    const totalLatest = rows.reduce((s, r) => s + Number(r.latest), 0)
    if (!(totalUsed > 0)) throw new ToolInputError('rows', 'The used-up premium is zero: give each origin its premium.')
    const elr = totalLatest / totalUsed
    const out = rows.map((r, k) => {
      const expected = elr * Number(r.premium)
      const unreported = 1 - 1 / Number(r.cdf)
      const res = expected * unreported
      return Object.assign({}, r, { used: usedUp[k], expected, reserve: res, ultimate: Number(r.latest) + res })
    })
    const ult = out.reduce((s, r) => s + r.ultimate, 0)
    const res = out.reduce((s, r) => s + r.reserve, 0)
    return {
      tiles: [
        { symbol: 'ELR', label: 'Cape Cod claim ratio', value: elr, unit: 'percent' },
        { symbol: 'U', label: 'Ultimate', value: ult, unit: 'money' },
        { symbol: reserve, label: 'Total', value: res, unit: 'money' },
      ],
      table: {
        columns: [
          ORIGIN_COLUMN, PREMIUM_COLUMN, LATEST_COLUMN, CDF_COLUMN,
          { key: 'used', label: 'Used-up premium', kind: 'number', unit: 'money', computed: true },
          { key: 'ultimate', label: 'Ultimate', kind: 'number', unit: 'money', computed: true },
          { key: 'reserve', label: reserve, kind: 'number', unit: 'money', computed: true },
        ],
        rows: out,
        footer: {
          origin: 'Total',
          premium: rows.reduce((s, r) => s + Number(r.premium), 0),
          latest: totalLatest,
          cdf: null,
          used: totalUsed,
          ultimate: ult,
          reserve: res,
        },
      },
      trace: [
        { label: 'Used-up premium', formula: 'Σ EP / CDF', result: totalUsed, unit: 'money' },
        { label: 'Cape Cod claim ratio', formula: `${formatValue(totalLatest, 'money')} / ${formatValue(totalUsed, 'money')}`, result: elr, unit: 'percent' },
        ...out.map(r => ({ label: `${reserve}, ${r.origin}`, formula: `${formatValue(elr, 'percent')} × ${r.premium} × (1 − 1/${Number(r.cdf).toFixed(4)})`, result: r.reserve, unit: 'money' as const })),
      ],
      warnings,
      values: {
        elr,
        used_up: usedUp,
        expected: out.map(r => r.expected),
        reserve: out.map(r => r.reserve),
        ultimate: out.map(r => r.ultimate),
        total_ultimate: ult,
        total_reserve: res,
        reserve_label: reserve,
      },
      summary: `The data imply an expected claim ratio of ${formatValue(elr, 'percent')}; ultimate ${formatValue(ult, 'money')}, ${reserve} ${formatValue(res, 'money')}.`,
    }
  },
  method: {
    concepts: ['Cape Cod Method'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 10' }],
  },
}
