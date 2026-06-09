// Pure transforms behind the Benchmarks tab: pivoting metric rows into the shape
// Recharts wants, and summarizing each agent's latest value + change vs. the
// prior period. Kept out of the view component so they can be unit-tested.

import { comparePeriods } from './researchPeriods'

export interface MetricRow {
  agent_id: string
  value: number
  period: string
}

export interface ChartPoint {
  period: string
  [agentId: string]: string | number
}

export interface AgentSummary {
  agentId: string
  latest: { value: number; period: string }
  previous: { value: number; period: string } | null
  /** latest.value - previous.value (absolute change), or null with no prior. */
  delta: number | null
  /** Percentage change vs. the prior period, or null (no prior / prior is 0). */
  deltaPct: number | null
  /** Full chronological series for this agent, for the sparkline. */
  series: { period: string; value: number }[]
}

// Pivot agent/period/value rows into one point per period with one column per
// agent, the shape Recharts' <Line> series expect. Periods are ordered
// chronologically (mixing quarterly + annual) via comparePeriods.
export function buildChartData(rows: MetricRow[]): { points: ChartPoint[]; agentIds: string[] } {
  const periods = [...new Set(rows.map(r => r.period))].sort(comparePeriods)
  const agentIds = [...new Set(rows.map(r => r.agent_id))]
  const valueByKey = new Map(rows.map(r => [`${r.agent_id}::${r.period}`, r.value]))

  const points = periods.map(period => {
    const point: ChartPoint = { period }
    for (const agentId of agentIds) {
      const value = valueByKey.get(`${agentId}::${period}`)
      if (value !== undefined) point[agentId] = value
    }
    return point
  })

  return { points, agentIds }
}

// One summary per agent: order that agent's rows chronologically, take the last
// two as latest/previous, and compute the absolute + percentage change.
export function summarizeByAgent(rows: MetricRow[]): AgentSummary[] {
  const byAgent = new Map<string, MetricRow[]>()
  for (const row of rows) {
    const arr = byAgent.get(row.agent_id)
    if (arr) arr.push(row)
    else byAgent.set(row.agent_id, [row])
  }

  const summaries: AgentSummary[] = []
  for (const [agentId, agentRows] of byAgent) {
    const sorted = [...agentRows].sort((a, b) => comparePeriods(a.period, b.period))
    const series = sorted.map(r => ({ period: r.period, value: r.value }))
    const last = sorted[sorted.length - 1]
    const prior = sorted.length > 1 ? sorted[sorted.length - 2] : null

    const delta = prior ? last.value - prior.value : null
    const deltaPct = prior && prior.value !== 0 ? (delta! / prior.value) * 100 : null

    summaries.push({
      agentId,
      latest: { value: last.value, period: last.period },
      previous: prior ? { value: prior.value, period: prior.period } : null,
      delta,
      deltaPct,
      series,
    })
  }

  return summaries
}
