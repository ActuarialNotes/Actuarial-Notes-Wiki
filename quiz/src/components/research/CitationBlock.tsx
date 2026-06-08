import { ExternalLink } from 'lucide-react'
import { agentMeta } from '@/lib/researchOntology'
import type { ResearchCitation } from '@/hooks/useResearchQuery'

export function CitationBlock({ citations }: { citations: ResearchCitation[] }) {
  if (citations.length === 0) return null

  return (
    <div className="space-y-1.5 pt-2 border-t">
      <p className="text-xs font-medium text-muted-foreground">Sources</p>
      <ul className="space-y-1">
        {citations.map((citation, i) => (
          <li key={`${citation.documentId}-${citation.page}-${i}`} className="text-xs leading-relaxed">
            <a
              href={citation.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              {citation.title}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            <span className="text-muted-foreground">
              {' '}— {agentMeta(citation.agentId)?.shortName ?? citation.agentId}, {citation.date}, p.{citation.page}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
