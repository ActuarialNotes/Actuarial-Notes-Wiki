import { useState, type ReactNode } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { agentMeta } from '@/lib/researchOntology'
import { metricDef, metricOrder } from '@/lib/researchMetrics'
import { comparePeriods } from '@/lib/researchPeriods'
import type { ResearchDocumentRow, ResearchMetricSummary } from '@/hooks/useResearchFeed'

function formatDocType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// Render a ts_headline snippet. The RPC wraps matches in literal <mark> tags; we
// HTML-escape the whole string first (so source angle brackets can't inject
// markup), then re-enable only our own <mark> sentinels.
function headlineHtml(headline: string): string {
  const escaped = headline
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped
    .replace(/&lt;mark&gt;/g, '<mark class="bg-primary/20 text-foreground rounded-sm px-0.5">')
    .replace(/&lt;\/mark&gt;/g, '</mark>')
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const SUMMARY_CLAMP_LINES = 3
const MAX_METRIC_CHIPS = 4

// One chip per metric_name (latest period wins if a doc carries several),
// ordered by the canonical catalog so chips read consistently across cards.
function metricChips(metrics: ResearchMetricSummary[]): { key: string; label: string }[] {
  const latestByName = new Map<string, ResearchMetricSummary>()
  for (const m of metrics) {
    const existing = latestByName.get(m.metric_name)
    if (!existing || comparePeriods(m.period, existing.period) > 0) {
      latestByName.set(m.metric_name, m)
    }
  }
  return [...latestByName.values()]
    .sort((a, b) => metricOrder(a.metric_name) - metricOrder(b.metric_name))
    .map(m => {
      const def = metricDef(m.metric_name)
      const valueLabel = def ? def.format(m.value) : `${m.value}${m.unit === '%' ? '%' : ''}`
      const label = `${def?.shortLabel ?? m.metric_name} ${valueLabel}`
      return { key: m.metric_name, label }
    })
}

export function DocumentCard({
  document,
  isNew = false,
  headline,
  action,
}: {
  document: ResearchDocumentRow
  isNew?: boolean
  // Highlighted keyword-search snippet (with <mark> tags). When present it
  // replaces the clamped summary.
  headline?: string | null
  // Optional control rendered at the card's top-right (e.g. add/remove from project).
  action?: ReactNode
}) {
  const agent = agentMeta(document.agent_id)
  const [expanded, setExpanded] = useState(false)

  // Only show the expand toggle when the summary is long enough to be clamped.
  // 180 chars is a rough proxy for 3 lines at typical card width.
  const summaryIsLong = (document.summary?.length ?? 0) > 180

  const chips = document.research_metrics ? metricChips(document.research_metrics) : []
  const visibleChips = chips.slice(0, MAX_METRIC_CHIPS)
  const overflowChips = chips.length - visibleChips.length

  return (
    <Card className="transition-colors hover:bg-accent/30">
      <CardContent className="p-4 space-y-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <Badge variant="secondary">{agent?.shortName ?? document.agent_id}</Badge>
          <span>{formatDocType(document.type)}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(document.published_at)}</span>
          {document.jurisdiction_provinces && document.jurisdiction_provinces.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{document.jurisdiction_provinces.join(', ')}</span>
            </>
          )}
          {isNew && (
            <Badge className="ml-auto text-[10px] uppercase bg-primary/15 text-primary border-primary/30 hover:bg-primary/15">
              New
            </Badge>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          <a
            href={document.url}
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {document.title}
            <ExternalLink className="inline h-3 w-3 ml-1 align-text-top text-muted-foreground" aria-hidden />
          </a>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {visibleChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleChips.map(chip => (
              <span
                key={chip.key}
                className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium tabular-nums text-primary"
              >
                {chip.label}
              </span>
            ))}
            {overflowChips > 0 && (
              <span className="text-xs text-muted-foreground">+{overflowChips} more</span>
            )}
          </div>
        )}

        {headline ? (
          <p
            className="text-sm text-muted-foreground [&_mark]:bg-primary/20"
            dangerouslySetInnerHTML={{ __html: headlineHtml(headline) }}
          />
        ) : document.summary && (
          <div>
            <p
              className={`text-sm text-muted-foreground ${expanded ? '' : `line-clamp-${SUMMARY_CLAMP_LINES}`}`}
            >
              {document.summary}
            </p>
            {summaryIsLong && (
              <button
                type="button"
                onClick={() => setExpanded(e => !e)}
                className="mt-1 flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" aria-hidden /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" aria-hidden /> Show more
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {(document.pdf_url || (document.exam_tags && document.exam_tags.length > 0)) && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {document.pdf_url && (
              <a href={document.pdf_url} target="_blank" rel="noreferrer">
                <Badge variant="outline" className="text-[10px] uppercase text-primary border-primary/40 hover:bg-primary/10 transition-colors cursor-pointer">
                  PDF
                </Badge>
              </a>
            )}
            {document.exam_tags?.map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] uppercase">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
