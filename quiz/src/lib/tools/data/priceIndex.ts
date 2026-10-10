import { ToolInputError, type TableRow, type ToolSpec } from '../types'
import { formatValue } from '../format'
import { INDEX_DATASETS, findSeries, periodAt, periodYears, provenance, seriesKey, type IndexDataset, type IndexSeries } from './datasets'

/** A series' name in the picker: "US CPI-U: Medical care", "Canada CPI: Health care". */
export function seriesLabel(ds: IndexDataset, s: IndexSeries): string {
  if (ds.id.startsWith('bls')) {
    if (s.id.startsWith('CI')) return `US ECI: ${s.title.split(' for ')[0]}, private industry`
    return `US CPI-U: ${s.title.split(' in U.S. city average')[0]}`
  }
  return `Canada CPI: ${s.id}`
}

const OPTIONS = INDEX_DATASETS.flatMap(ds => ds.series.map(s => ({ value: seriesKey(ds, s), label: seriesLabel(ds, s) })))

/** A period as a date field holds it: the first day of its month or quarter. */
function periodDate(period: string): string {
  const q = /^(\d{4})-Q(\d)$/.exec(period)
  return q ? `${q[1]}-${String((Number(q[2]) - 1) * 3 + 1).padStart(2, '0')}-01` : `${period}-01`
}

const latestPeriod = (s: IndexSeries) => periodAt(s, s.values.length - 1)
const DEFAULT_SERIES = INDEX_DATASETS[0].series[1] ?? INDEX_DATASETS[0].series[0]
const DEFAULT_END = periodDate(latestPeriod(DEFAULT_SERIES))
const DEFAULT_START = `${Number(DEFAULT_END.slice(0, 4)) - 5}${DEFAULT_END.slice(4)}`

export const priceIndex: ToolSpec = {
  id: 'data.price_index',
  version: '1.0.0',
  name: 'Price Index',
  area: 'data',
  answers: 'How has this price index moved?',
  aka: ['CPI', 'consumer price index', 'inflation', 'loss trend', 'medical inflation', 'ECI', 'wage index', 'BLS', 'Statistics Canada'],
  fields: [
    {
      kind: 'choice', key: 'series', label: 'Index',
      description: `Which published index to read, as "dataset:series": ${OPTIONS.map(o => `${o.value} (${o.label})`).join('; ')}.`,
      options: OPTIONS,
      default: seriesKey(INDEX_DATASETS[0], DEFAULT_SERIES),
    },
    { kind: 'date', key: 'start', label: 'From', symbol: 'a', default: DEFAULT_START, description: 'The first period to read (its month or quarter).' },
    { kind: 'date', key: 'end', label: 'To', symbol: 'b', default: DEFAULT_END, description: 'The last period to read (its month or quarter).' },
  ],
  notation: () => 'annual change = (I_b / I_a)^(1 / years) − 1',
  view: 'table',
  compute: input => {
    const found = findSeries(String(input.series))
    if (!found) throw new ToolInputError('series', `Unknown index "${input.series}".`)
    const { dataset, series } = found
    const start = String(input.start)
    const end = String(input.end)
    if (end < start) throw new ToolInputError('end', '"To" is before "From".')
    const lag = series.frequency === 'quarterly' ? 4 : 12
    const all = series.values.map((v, k) => ({ period: periodAt(series, k), value: v }))
    const rows: TableRow[] = []
    all.forEach((p, k) => {
      const date = periodDate(p.period)
      if (date < start.slice(0, 7) + '-01' || date > end || p.value == null) return
      const prior = all[k - lag]?.value
      rows.push({ period: p.period, value: p.value, change: prior ? p.value / prior - 1 : null })
    })
    if (rows.length < 2) {
      throw new ToolInputError('start', `This index runs from ${periodAt(series, 0)} to ${latestPeriod(series)}; the window holds ${rows.length} published value${rows.length === 1 ? '' : 's'}.`)
    }
    const first = rows[0]
    const last = rows[rows.length - 1]
    const years = periodYears(String(last.period)) - periodYears(String(first.period))
    const total = Number(last.value) / Number(first.value) - 1
    const annual = (1 + total) ** (1 / years) - 1
    const gaps = series.values.filter((v, k) => v == null && periodDate(periodAt(series, k)) >= start && periodDate(periodAt(series, k)) <= end).length
    return {
      tiles: [
        { symbol: 'Δ/yr', label: 'Annualised change', value: annual, unit: 'percent' },
        { symbol: 'Δ', label: 'Total change', value: total, unit: 'percent' },
        { symbol: 'I', label: String(last.period), value: Number(last.value), unit: 'plain' },
      ],
      table: {
        columns: [
          { key: 'period', label: 'Period', kind: 'text' },
          { key: 'value', label: 'Index', kind: 'number', unit: 'plain', computed: true },
          { key: 'change', label: lag === 12 ? '12-month change' : '4-quarter change', kind: 'number', unit: 'percent', computed: true },
        ],
        rows,
      },
      trace: [
        { label: `Index, ${first.period}`, formula: provenance(dataset), result: Number(first.value), unit: 'plain' },
        { label: `Index, ${last.period}`, formula: provenance(dataset), result: Number(last.value), unit: 'plain' },
        { label: 'Annualised change', formula: `(${last.value} / ${first.value})^(1 / ${years.toFixed(4)}) − 1`, result: annual, unit: 'percent' },
      ],
      warnings: gaps ? [`The publisher printed no value for ${gaps} period${gaps === 1 ? '' : 's'} in this window; ${gaps === 1 ? 'it is' : 'they are'} left out, not filled in.`] : [],
      values: {
        series: seriesKey(dataset, series),
        title: series.title,
        frequency: series.frequency,
        periods: rows.map(r => r.period),
        index: rows.map(r => r.value),
        annual_change: annual,
        total_change: total,
        years,
        source: provenance(dataset),
      },
      summary: `${seriesLabel(dataset, series)}, ${first.period} to ${last.period}: ${formatValue(annual, 'percent')} a year (${formatValue(total, 'percent')} in all). Source: ${provenance(dataset)}`,
    }
  },
  method: {
    concepts: ['Inflation', 'Loss Trend'],
    readings: [],
  },
  next: [
    {
      tool: 'ratemaking.trend_fit',
      label: 'Trend Fit',
      build: (_input, output) => ({
        model: 'exponential',
        per_year: output.values.frequency === 'quarterly' ? 4 : 12,
        points: (output.values.periods as string[]).map((period, k) => ({ period, value: (output.values.index as number[])[k] })),
      }),
    },
    { tool: 'ratemaking.trend_factor', label: 'Trend Factor', build: (_input, output) => ({ trend: output.values.annual_change as number }) },
  ],
}
