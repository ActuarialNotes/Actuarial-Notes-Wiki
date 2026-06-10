// Pure transforms behind the Benchmarks tab: pivoting metric rows into the shape
// Recharts wants, and summarizing each series' latest value + change vs. the
// prior period. Kept out of the view component so they can be unit-tested.
//
// A "series" is identified by (agent × province × line-of-business), NOT agent
// alone. Once metrics are segmented by province/line, a single agent can report
// e.g. personal-auto loss ratios for ON and AB plus a national consolidated
// figure in the same period — keying by agent would silently merge those into
// one cell (see the note in supabase/.../osfi-findata.ts). Keying by the full
// scope keeps each line × province trend distinct.

import { comparePeriods } from './researchPeriods'

export interface MetricRow {
  agent_id: string
  value: number
  period: string
  province: string | null
  line_of_business: string | null
}

export interface ChartPoint {
  period: string
  /** Keyed by seriesKey (agent|province|line), not agent_id. */
  [seriesKey: string]: string | number
}

export interface SeriesSummary {
  /** Stable identity for this series: `agent|province|line` (see seriesKey). */
  seriesKey: string
  agentId: string
  province: string | null
  lineOfBusiness: string | null
  latest: { value: number; period: string }
  previous: { value: number; period: string } | null
  /** latest.value - previous.value (absolute change), or null with no prior. */
  delta: number | null
  /** Percentage change vs. the prior period, or null (no prior / prior is 0). */
  deltaPct: number | null
  /** Full chronological series, for the sparkline. */
  series: { period: string; value: number }[]
}

/** Composite identity for a benchmark series: agent × province × line. */
export function seriesKey(row: Pick<MetricRow, 'agent_id' | 'province' | 'line_of_business'>): string {
  return `${row.agent_id}|${row.province ?? ''}|${row.line_of_business ?? ''}`
}

// Pivot scope/period/value rows into one point per period with one column per
// series, the shape Recharts' <Line> series expect. Periods are ordered
// chronologically (mixing quarterly + annual) via comparePeriods.
export function buildChartData(rows: MetricRow[]): { points: ChartPoint[]; seriesKeys: string[] } {
  const periods = [...new Set(rows.map(r => r.period))].sort(comparePeriods)
  const seriesKeys = [...new Set(rows.map(seriesKey))]
  const valueByKey = new Map(rows.map(r => [`${seriesKey(r)}::${r.period}`, r.value]))

  const points = periods.map(period => {
    const point: ChartPoint = { period }
    for (const key of seriesKeys) {
      const value = valueByKey.get(`${key}::${period}`)
      if (value !== undefined) point[key] = value
    }
    return point
  })

  return { points, seriesKeys }
}

// One summary per series: order that series' rows chronologically, take the last
// two as latest/previous, and compute the absolute + percentage change.
export function summarizeBySeries(rows: MetricRow[]): SeriesSummary[] {
  const bySeries = new Map<string, MetricRow[]>()
  for (const row of rows) {
    const key = seriesKey(row)
    const arr = bySeries.get(key)
    if (arr) arr.push(row)
    else bySeries.set(key, [row])
  }

  const summaries: SeriesSummary[] = []
  for (const [key, seriesRows] of bySeries) {
    const sorted = [...seriesRows].sort((a, b) => comparePeriods(a.period, b.period))
    const series = sorted.map(r => ({ period: r.period, value: r.value }))
    const last = sorted[sorted.length - 1]
    const prior = sorted.length > 1 ? sorted[sorted.length - 2] : null

    const delta = prior ? last.value - prior.value : null
    const deltaPct = prior && prior.value !== 0 ? (delta! / prior.value) * 100 : null

    summaries.push({
      seriesKey: key,
      agentId: last.agent_id,
      province: last.province,
      lineOfBusiness: last.line_of_business,
      latest: { value: last.value, period: last.period },
      previous: prior ? { value: prior.value, period: prior.period } : null,
      delta,
      deltaPct,
      series,
    })
  }

  return summaries
}
