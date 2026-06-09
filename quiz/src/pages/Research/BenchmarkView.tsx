import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { supabase } from '@/lib/supabase'
import { useResearchStore } from '@/stores/researchStore'
import { agentMeta } from '@/lib/researchOntology'
import { RESEARCH_METRICS, metricDef } from '@/lib/researchMetrics'
import { buildChartData, summarizeByAgent, type MetricRow } from '@/lib/researchBenchmarks'
import { comparePeriods, formatPeriod } from '@/lib/researchPeriods'
import { MetricComparisonTable } from '@/components/research/MetricComparisonTable'

const LINE_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#ef4444', '#06b6d4']

function agentLabel(agentId: string): string {
  return agentMeta(agentId)?.shortName ?? agentId
}

export default function BenchmarkView() {
  const agentIds = useResearchStore(s => s.filters.agentIds)
  const [metricName, setMetricName] = useState<string>(RESEARCH_METRICS[0].name)
  const [rows, setRows] = useState<MetricRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    let query = supabase
      .from('research_metrics')
      .select('agent_id, value, period')
      .eq('metric_name', metricName)

    if (agentIds.length > 0) query = query.in('agent_id', agentIds)

    query.then(({ data, error: queryError }: { data: MetricRow[] | null; error: { message: string } | null }) => {
      if (cancelled) return
      if (queryError) {
        setError(queryError.message)
        setRows([])
      } else {
        setRows(data ?? [])
      }
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [metricName, agentIds])

  const metric = metricDef(metricName) ?? RESEARCH_METRICS[0]
  const { points, agentIds: seriesAgentIds } = useMemo(() => buildChartData(rows), [rows])
  const summaries = useMemo(() => summarizeByAgent(rows), [rows])
  // Latest period across the whole selection, for the chart header context.
  const latestPeriod = useMemo(() => {
    if (rows.length === 0) return null
    return [...rows].sort((a, b) => comparePeriods(a.period, b.period)).at(-1)!.period
  }, [rows])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-1.5">
        {RESEARCH_METRICS.map(option => (
          <button
            key={option.name}
            type="button"
            onClick={() => setMetricName(option.name)}
            title={option.description}
            className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
              metricName === option.name
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-input text-muted-foreground hover:text-foreground hover:bg-accent/60'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading metrics…
        </div>
      )}

      {error && <p className="py-16 text-center text-sm text-destructive">{error}</p>}

      {!loading && !error && rows.length === 0 && (
        <div className="space-y-4 py-8">
          <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
            No <span className="font-medium text-foreground">{metric.label.toLowerCase()}</span> figures
            match the current selection yet. Benchmarks are populated from insurer financial
            disclosures and industry statistics as filings are ingested. Try another metric, or
            clear the agent filter above.
          </p>
          <div className="mx-auto max-w-lg rounded-lg border p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Tracked benchmarks
            </p>
            <ul className="space-y-1.5">
              {RESEARCH_METRICS.map(m => (
                <li key={m.name} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{m.label}</span> — {m.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-sm font-semibold">
                {metric.label} by agent
              </h3>
              {latestPeriod && (
                <span className="text-xs text-muted-foreground">
                  latest {formatPeriod(latestPeriod)}
                </span>
              )}
            </div>
            <MetricComparisonTable summaries={summaries} metric={metric} />
          </div>

          {points.length > 1 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Trend</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={points} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="period" tickFormatter={formatPeriod} tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} unit={metric.unit === '%' ? '%' : ''} width={48} />
                    <Tooltip
                      labelFormatter={formatPeriod}
                      formatter={(value: number, name: string) => [metric.format(value), agentLabel(name)]}
                    />
                    <Legend formatter={agentLabel} />
                    {seriesAgentIds.map((agentId, i) => (
                      <Line
                        key={agentId}
                        type="monotone"
                        dataKey={agentId}
                        name={agentId}
                        stroke={LINE_COLORS[i % LINE_COLORS.length]}
                        connectNulls
                        dot={{ r: 3 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
