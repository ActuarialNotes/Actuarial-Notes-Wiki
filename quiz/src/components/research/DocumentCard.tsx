import { ExternalLink } from 'lucide-react'
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

export function DocumentCard({ document }: { document: ResearchDocumentRow }) {
  const agent = agentMeta(document.agent_id)

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
        </div>

        <a
          href={document.url}
          target="_blank"
          rel="noreferrer"
          className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          {document.title}
          <ExternalLink className="inline h-3 w-3 ml-1 align-text-top text-muted-foreground" aria-hidden />
        </a>

        {document.summary && (
          <p className="text-sm text-muted-foreground line-clamp-3">{document.summary}</p>
        )}

        {document.exam_tags && document.exam_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {document.exam_tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] uppercase">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
