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
import { ResourceSearchMatches } from '@/components/research/ResourceSearchMatches'

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

      {searching ? (
        <>
          <ResearchFilterPanel />
          {!isProjectScope && <ResourceSearchMatches />}
          <SearchResults search={search} action={cardAction} />
        </>
      ) : isProjectScope ? (
        <>
          <ResearchFilterPanel />
          <BrowseFeed feed={feed} action={cardAction} />
        </>
      ) : (
        // Corpus view: everything here comes from the markdown vault
        // (Resources/Books, Resources/Events, Resources/Regulation), browsed
        // via the month-by-month timeline heatmap.
        <ResourceTimelinePanel />
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

// ── Browse feed (project sources) ─────────────────────────────────────────────

function BrowseFeed({
  feed,
  action,
}: {
  feed: ReturnType<typeof useResearchFeed>
  action: (doc: ResearchDocumentRow) => ReactNode
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
        This project has no documents yet. Search the corpus and use “Save” on a result, or add a source by URL.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {total !== null
          ? `Showing ${documents.length} of ${total.toLocaleString()} document${total !== 1 ? 's' : ''}`
          : `${documents.length} document${documents.length !== 1 ? 's' : ''}`}
      </p>

      {documents.map(doc => (
        <DocumentCard key={doc.id} document={doc} action={action(doc)} />
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
