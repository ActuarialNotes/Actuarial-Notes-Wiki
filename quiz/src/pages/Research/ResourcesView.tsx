import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { useResearchFeed, type ResearchDocumentRow } from '@/hooks/useResearchFeed'
import { useResearchSearch } from '@/hooks/useResearchSearch'
import { useResearchQuery } from '@/hooks/useResearchQuery'
import { useAddResourceByUrl } from '@/hooks/useAddResourceByUrl'
import { useResearchStore } from '@/stores/researchStore'
import { supabase } from '@/lib/supabase'
import { DocumentCard } from '@/components/research/DocumentCard'
import { ResearchSearchBar } from '@/components/research/ResearchSearchBar'
import { AiAnswerPanel } from '@/components/research/AiAnswerPanel'
import { AddToProjectButton } from '@/components/research/AddToProjectButton'
import { ResearchFilterPanel } from '@/components/research/ResearchFilterPanel'
import { ResourceTimelinePanel } from '@/components/research/ResourceTimelinePanel'

// ── Last-visit tracking (browse mode only) ───────────────────────────────────

const LAST_VISIT_KEY = 'research_lastVisit'

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
  const diffDays = (Date.now() - new Date(published_at).getTime()) / (1000 * 60 * 60 * 24)
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

interface ResourcesViewProps {
  // When set, this view is scoped to a single project's saved documents.
  projectId?: string
  projectDocumentIds?: string[]
  // Called after a source is added by URL (so the project view can refetch).
  onProjectMutated?: () => void
  // Bumped by the page-level search bar after a corpus URL-add, so the browse
  // feed refetches to show the new document (non-project scope only).
  refreshNonce?: number
}

export default function ResourcesView({ projectId, projectDocumentIds, onProjectMutated, refreshNonce }: ResourcesViewProps) {
  const searchQuery = useResearchStore(s => s.searchQuery).trim()
  const isProjectScope = projectId !== undefined

  const feed = useResearchFeed(isProjectScope ? (projectDocumentIds ?? []) : undefined)
  const search = useResearchSearch(isProjectScope ? (projectDocumentIds ?? []) : undefined)
  const { loading: asking, error: askError, result, ask, reset } = useResearchQuery()
  const addUrl = useAddResourceByUrl()
  const [addNotice, setAddNotice] = useState<string | null>(null)

  const lastVisit = usePreviousVisit()

  // Refetch the corpus feed when the page-level search bar reports a URL-add.
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) { didMountRef.current = true; return }
    if (!isProjectScope) feed.refresh()
    // feed.refresh is stable; only the nonce should drive this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshNonce])

  const handleAdd = async (url: string) => {
    setAddNotice(null)
    const res = await addUrl.add(url, projectId)
    if (res) {
      const verb = res.status === 'duplicate' ? 'Already in the corpus' : 'Added'
      const review = res.document.is_in_review ? ' (pending review)' : ''
      setAddNotice(`${verb}: ${res.document.title}${review}.`)
      if (isProjectScope) onProjectMutated?.()
      else feed.refresh()
    }
  }

  const removeFromProject = async (documentId: string) => {
    await supabase
      .from('research_project_documents')
      .delete()
      .eq('project_id', projectId!)
      .eq('document_id', documentId)
    onProjectMutated?.()
  }

  function cardAction(doc: ResearchDocumentRow) {
    if (isProjectScope) {
      return (
        <button
          type="button"
          onClick={() => removeFromProject(doc.id)}
          className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          aria-label="Remove from project"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
        </button>
      )
    }
    return <AddToProjectButton documentId={doc.id} />
  }

  const searching = searchQuery.length > 0

  return (
    <div className="space-y-5">
      {/* Corpus view: month-by-month timeline heatmap of resources/regulation. */}
      {!isProjectScope && <ResourceTimelinePanel />}

      {/* In project scope the search/ask/add box lives here, scoped to the
          project's sources. For the corpus view it lives at the page top
          (Research/index.tsx) so search sits above the tabs like other tabs. */}
      {isProjectScope && (
        <>
          <ResearchSearchBar
            onAsk={q => ask(q, projectId)}
            asking={asking}
            onAddUrl={handleAdd}
            addingUrl={addUrl.loading}
            addError={addUrl.error}
            addNotice={addNotice}
            addContextLabel="Added sources are saved to this project."
          />
          <AiAnswerPanel loading={asking} error={askError} result={result} onDismiss={reset} />
        </>
      )}

      <ResearchFilterPanel />

      {searching ? (
        <SearchResults search={search} action={cardAction} />
      ) : (
        <BrowseFeed feed={feed} lastVisit={lastVisit} action={cardAction} isProjectScope={isProjectScope} />
      )}
    </div>
  )
}

// ── Keyword search results ────────────────────────────────────────────────────

function SearchResults({
  search,
  action,
}: {
  search: ReturnType<typeof useResearchSearch>
  action: (doc: ResearchDocumentRow) => ReactNode
}) {
  const { results, loading, loadingMore, error, hasMore, loadMore } = search

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Searching…
      </div>
    )
  }
  if (error) return <p className="py-16 text-center text-sm text-destructive">{error}</p>
  if (results.length === 0) {
    return (
      <p className="mx-auto max-w-md py-16 text-center text-sm text-muted-foreground">
        No documents match your search. Try different keywords, broaden the filters, or add a source by URL.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {results.length}
        {hasMore ? '+' : ''} result{results.length !== 1 ? 's' : ''}
      </p>
      {results.map(doc => (
        <DocumentCard key={doc.id} document={doc} headline={doc.headline} action={action(doc)} />
      ))}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm transition-colors hover:bg-accent/60 disabled:opacity-50"
          >
            {loadingMore && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Browse feed (date-grouped) ────────────────────────────────────────────────

function BrowseFeed({
  feed,
  lastVisit,
  action,
  isProjectScope,
}: {
  feed: ReturnType<typeof useResearchFeed>
  lastVisit: string | null
  action: (doc: ResearchDocumentRow) => ReactNode
  isProjectScope: boolean
}) {
  const { documents, loading, loadingMore, error, hasMore, total, loadMore } = feed

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading documents…
      </div>
    )
  }
  if (error) return <p className="py-16 text-center text-sm text-destructive">{error}</p>
  if (documents.length === 0) {
    return (
      <p className="mx-auto max-w-md py-16 text-center text-sm text-muted-foreground">
        {isProjectScope
          ? 'This project has no documents yet. Search the corpus and use “Save” on a result, or add a source by URL.'
          : 'No documents match the current filters yet. Clear your filters to see everything available, or add a source by URL.'}
      </p>
    )
  }

  const groups = groupDocuments(documents)
  const newCount = isProjectScope ? 0 : documents.filter(d => isNewDoc(d, lastVisit)).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {total !== null
            ? `Showing ${documents.length} of ${total.toLocaleString()} document${total !== 1 ? 's' : ''}`
            : `${documents.length} document${documents.length !== 1 ? 's' : ''}`}
        </span>
        {newCount > 0 && <span className="font-medium text-primary">{newCount} new since your last visit</span>}
      </div>

      {GROUP_ORDER.filter(g => groups.has(g)).map(g => (
        <section key={g}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {GROUP_LABELS[g]}
          </h2>
          <div className="space-y-3">
            {groups.get(g)!.map(doc => (
              <DocumentCard
                key={doc.id}
                document={doc}
                isNew={!isProjectScope && isNewDoc(doc, lastVisit)}
                action={action(doc)}
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
            className="flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm transition-colors hover:bg-accent/60 disabled:opacity-50"
          >
            {loadingMore && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
