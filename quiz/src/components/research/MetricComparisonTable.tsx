// The number-forward hero of the Benchmarks tab: a sortable table of the latest
// value per agent for the selected metric, with the change vs. the prior period
// (coloured by whether the move is favourable) and a sparkline of the trend.

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { agentMeta } from '@/lib/researchOntology'
import type { MetricDef } from '@/lib/researchMetrics'
import type { AgentSummary } from '@/lib/researchBenchmarks'
import { formatPeriod } from '@/lib/researchPeriods'
import { MetricSparkline } from './MetricSparkline'

type SortKey = 'value' | 'delta'

function agentLabel(agentId: string): string {
  return agentMeta(agentId)?.shortName ?? agentId
}

// Is a delta favourable given the metric's better-direction? Used to colour the
// change green (good) or red (bad) regardless of the raw sign.
function deltaIsGood(delta: number, betterDirection: MetricDef['betterDirection']): boolean {
  if (betterDirection === 'neutral' || delta === 0) return false
  return betterDirection === 'higher' ? delta > 0 : delta < 0
}

function DeltaCell({ summary, metric }: { summary: AgentSummary; metric: MetricDef }) {
  if (summary.delta === null || summary.deltaPct === null) {
    return <span className="text-muted-foreground">—</span>
  }
  const good = deltaIsGood(summary.delta, metric.betterDirection)
  const color =
    metric.betterDirection === 'neutral'
      ? 'text-muted-foreground'
      : good
        ? 'text-emerald-500'
        : 'text-rose-500'
  const Arrow = summary.delta > 0 ? ArrowUp : ArrowDown
  return (
    <span className={`inline-flex items-center gap-0.5 tabular-nums ${color}`}>
      <Arrow className="h-3 w-3" aria-hidden />
      {summary.delta > 0 ? '+' : ''}
      {summary.delta.toFixed(1)}
      <span className="text-[11px] opacity-80">({summary.deltaPct.toFixed(1)}%)</span>
    </span>
  )
}

export function MetricComparisonTable({
  summaries,
  metric,
}: {
  summaries: AgentSummary[]
  metric: MetricDef
}) {
  const [sortKey, setSortKey] = useState<SortKey>('value')

  const sorted = useMemo(() => {
    const copy = [...summaries]
    copy.sort((a, b) => {
      if (sortKey === 'value') return b.latest.value - a.latest.value
      return (b.delta ?? -Infinity) - (a.delta ?? -Infinity)
    })
    return copy
  }, [summaries, sortKey])

  function HeaderButton({ label, k, align = 'right' }: { label: string; k: SortKey; align?: 'left' | 'right' }) {
    const active = sortKey === k
    return (
      <button
        type="button"
        onClick={() => setSortKey(k)}
        className={`inline-flex items-center gap-1 hover:text-foreground transition-colors ${
          active ? 'text-foreground' : ''
        } ${align === 'right' ? 'flex-row-reverse' : ''}`}
      >
        {label}
        <ArrowUpDown className="h-3 w-3 opacity-60" aria-hidden />
      </button>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-xs text-muted-foreground">
            <th className="px-3 py-2 text-left font-medium">Agent</th>
            <th className="px-3 py-2 text-right font-medium">
              <HeaderButton label={`Latest (${metric.unit})`} k="value" />
            </th>
            <th className="px-3 py-2 text-left font-medium">Period</th>
            <th className="px-3 py-2 text-right font-medium">
              <HeaderButton label="Δ vs prior" k="delta" />
            </th>
            <th className="px-3 py-2 text-right font-medium">Trend</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(summary => (
            <tr key={summary.agentId} className="border-b last:border-0 hover:bg-accent/40">
              <td className="px-3 py-2 font-medium">{agentLabel(summary.agentId)}</td>
              <td className="px-3 py-2 text-right tabular-nums font-semibold">
                {metric.format(summary.latest.value)}
              </td>
              <td className="px-3 py-2 text-left text-xs text-muted-foreground">
                {formatPeriod(summary.latest.period)}
              </td>
              <td className="px-3 py-2 text-right text-xs">
                <DeltaCell summary={summary} metric={metric} />
              </td>
              <td className="px-3 py-2">
                <div className="flex justify-end">
                  <MetricSparkline values={summary.series.map(s => s.value)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
