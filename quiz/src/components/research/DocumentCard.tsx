import { useState } from 'react'
import { ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { agentMeta } from '@/lib/researchOntology'
import type { ResearchDocumentRow } from '@/hooks/useResearchFeed'

function formatDocType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const SUMMARY_CLAMP_LINES = 3

export function DocumentCard({
  document,
  isNew = false,
}: {
  document: ResearchDocumentRow
  isNew?: boolean
}) {
  const agent = agentMeta(document.agent_id)
  const [expanded, setExpanded] = useState(false)

  // Only show the expand toggle when the summary is long enough to be clamped.
  // 180 chars is a rough proxy for 3 lines at typical card width.
  const summaryIsLong = (document.summary?.length ?? 0) > 180

  return (
    <Card className="transition-colors hover:border-primary/40">
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
          {document.pdf_url && (
            <a
              href={document.pdf_url}
              target="_blank"
              rel="noreferrer"
              title="Open PDF"
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              <FileText className="h-4 w-4" aria-hidden />
              <span className="sr-only">PDF</span>
            </a>
          )}
        </div>

        {document.summary && (
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

        {document.exam_tags && document.exam_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {document.exam_tags.map(tag => (
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
