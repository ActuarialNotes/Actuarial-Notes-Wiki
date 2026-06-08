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

interface MetricRow {
  agent_id: string
  value: number
  period: string
}

interface ChartPoint {
  period: string
  [agentId: string]: string | number
}

const METRIC_OPTIONS = [
  { id: 'combined_ratio', label: 'Combined ratio', unit: '%' },
  { id: 'loss_ratio', label: 'Loss ratio', unit: '%' },
] as const

const LINE_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#ef4444', '#06b6d4']

function agentLabel(agentId: string): string {
  return agentMeta(agentId)?.shortName ?? agentId
}

// Pivot agent/period/value rows into one point per period with one column per
// agent, the shape Recharts' <Line> series expect.
function buildChartData(rows: MetricRow[]): { points: ChartPoint[]; agentIds: string[] } {
  const periods = [...new Set(rows.map(r => r.period))].sort()
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

export default function BenchmarkView() {
  const agentIds = useResearchStore(s => s.filters.agentIds)
  const [metricName, setMetricName] = useState<string>(METRIC_OPTIONS[0].id)
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
      .order('period', { ascending: true })

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

  const { points, agentIds: seriesAgentIds } = useMemo(() => buildChartData(rows), [rows])
  const unit = METRIC_OPTIONS.find(opt => opt.id === metricName)?.unit ?? ''

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {METRIC_OPTIONS.map(option => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMetricName(option.id)}
            className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
              metricName === option.id
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

      {!loading && !error && points.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground max-w-md mx-auto">
          No extracted metrics for this selection yet — metrics are populated as filings are
          ingested and processed by the corpus pipeline. Try a different metric or clear the
          agent filter above.
        </p>
      )}

      {!loading && !error && points.length > 0 && (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit={unit} width={48} />
              <Tooltip formatter={(value: number, name: string) => [`${value}${unit}`, agentLabel(name)]} />
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
      )}
    </div>
  )
}
