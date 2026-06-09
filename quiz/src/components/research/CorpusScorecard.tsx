// Corpus-level stat strip shown above the Research tabs — makes the data density
// of the corpus visible at a glance (documents, agents, extracted metrics, and
// when the corpus was last updated).

import { useResearchOverview } from '@/hooks/useResearchOverview'

function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-bold tabular-nums leading-tight">{value}</span>
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  )
}

export function CorpusScorecard() {
  const { overview, loading } = useResearchOverview()

  if (loading || !overview) {
    return <div className="h-12 rounded-lg border bg-card/40 animate-pulse" />
  }

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg border bg-card/40 px-4 py-3">
      <Stat value={overview.documentCount.toLocaleString()} label="Documents" />
      <Stat value={overview.metricCount.toLocaleString()} label="Metrics" />
      <Stat value={overview.agentCount.toLocaleString()} label="Agents tracked" />
      <Stat
        value={overview.lastUpdated ? relativeDate(overview.lastUpdated) : '—'}
        label="Last updated"
      />
    </div>
  )
}
