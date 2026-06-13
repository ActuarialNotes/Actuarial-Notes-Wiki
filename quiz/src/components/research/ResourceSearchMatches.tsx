import { useMemo, type ReactNode } from 'react'
import rawTimeline from 'virtual:resource-timeline'
import { toTimelineEntries, searchTimelineEntries, entryToRef, type TimelineEntry } from '@/lib/resourceTimeline'
import { filterTimelineEntries } from '@/lib/resourceTimelineFilters'
import { EntryCard } from '@/components/wiki/ResourceMonthCards'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useResearchStore } from '@/stores/researchStore'

// Keyword matches against the markdown-backed resource timeline (Resources/Books,
// Resources/Events, Resources/Regulation) — shown alongside the corpus document
// search results so regulations, events, and books are searchable too, not just
// the agent-fetched bulletins/filings in research_documents.
export function ResourceSearchMatches({ action }: { action?: (entry: TimelineEntry) => ReactNode }) {
  const query = useResearchStore(s => s.searchQuery).trim()
  const filters = useResearchStore(s => s.filters)
  const openAt = useConceptPopup(s => s.openAt)

  const matches = useMemo(() => {
    const all = toTimelineEntries(rawTimeline)
    const filtered = filterTimelineEntries(all, filters)
    return searchTimelineEntries(filtered, query).sort((a, b) => b.date.localeCompare(a.date))
  }, [filters, query])

  if (matches.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {matches.length} matching resource{matches.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {matches.map(entry => (
          <EntryCard
            key={`${entry.kind}:${entry.path}`}
            entry={entry}
            onOpen={e => openAt([entryToRef(e)], 0, e.path)}
            action={action?.(entry)}
          />
        ))}
      </div>
    </div>
  )
}
