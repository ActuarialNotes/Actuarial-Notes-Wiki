import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useResearchFeed } from '@/hooks/useResearchFeed'
import { DocumentCard } from '@/components/research/DocumentCard'
import type { ResearchDocumentRow } from '@/hooks/useResearchFeed'

// ── Last-visit tracking ───────────────────────────────────────────────────────

const LAST_VISIT_KEY = 'research_lastVisit'

// Returns the previous visit ISO timestamp, and immediately records now as the
// current visit. Documents newer than the returned value are "new."
function usePreviousVisit(): string | null {
  const [prev] = useState<string | null>(() => {
    const stored = localStorage.getItem(LAST_VISIT_KEY)
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString())
    return stored
  })
  return prev
}

function isNewDoc(doc: ResearchDocumentRow, lastVisit: string | null): boolean {
  if (!lastVisit) return false
  // Only mark as new if published after last visit and within the last 30 days
  const docDate = new Date(doc.published_at).getTime()
  const visitDate = new Date(lastVisit).getTime()
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  return docDate > visitDate && docDate > thirtyDaysAgo
}

// ── Date grouping ─────────────────────────────────────────────────────────────

type DateGroup = 'today' | 'this_week' | 'this_month' | 'older'

const GROUP_LABELS: Record<DateGroup, string> = {
  today: 'Today',
  this_week: 'This Week',
  this_month: 'This Month',
  older: 'Older',
}

const GROUP_ORDER: DateGroup[] = ['today', 'this_week', 'this_month', 'older']

function dateGroup(published_at: string): DateGroup {
  const diffMs = Date.now() - new Date(published_at).getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  if (diffDays < 1) return 'today'
  if (diffDays < 7) return 'this_week'
  if (diffDays < 30) return 'this_month'
  return 'older'
}

function groupDocuments(docs: ResearchDocumentRow[]): Map<DateGroup, ResearchDocumentRow[]> {
  const map = new Map<DateGroup, ResearchDocumentRow[]>()
  for (const doc of docs) {
    const g = dateGroup(doc.published_at)
    const arr = map.get(g)
    if (arr) arr.push(doc)
    else map.set(g, [doc])
  }
  return map
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MonitorView() {
  const { documents, loading, loadingMore, error, hasMore, total, loadMore } = useResearchFeed()
  const lastVisit = usePreviousVisit()

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading documents…
      </div>
    )
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-destructive">{error}</p>
  }

  if (documents.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground max-w-md mx-auto">
        No documents match the current filters yet. The corpus is populated by scheduled
        ingestion — check back soon, or clear your filters to see everything available.
      </p>
    )
  }

  const groups = groupDocuments(documents)
  const newCount = documents.filter(d => isNewDoc(d, lastVisit)).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {total !== null ? (
            <>
              Showing {documents.length} of {total.toLocaleString()} document{total !== 1 ? 's' : ''}
            </>
          ) : (
            <>{documents.length} document{documents.length !== 1 ? 's' : ''}</>
          )}
        </span>
        {newCount > 0 && (
          <span className="text-primary font-medium">
            {newCount} new since your last visit
          </span>
        )}
      </div>

      {GROUP_ORDER.filter(g => groups.has(g)).map(g => (
        <section key={g}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {GROUP_LABELS[g]}
          </h2>
          <div className="space-y-3">
            {groups.get(g)!.map(doc => (
              <DocumentCard
                key={doc.id}
                document={doc}
                isNew={isNewDoc(doc, lastVisit)}
              />
            ))}
          </div>
        </section>
      ))}

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-input hover:bg-accent/60 transition-colors disabled:opacity-50"
          >
            {loadingMore && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
