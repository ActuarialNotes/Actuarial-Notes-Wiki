import { useState, type ReactNode } from 'react'
import { Loader2, Trash2, Plus, Check, BookOpen } from 'lucide-react'
import { useResearchFeed, type ResearchDocumentRow } from '@/hooks/useResearchFeed'
import { useResearchSearch } from '@/hooks/useResearchSearch'
import { useResearchStore } from '@/stores/researchStore'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { supabase } from '@/lib/supabase'
import { entryToRef } from '@/lib/resourceTimeline'
import { entryRefToRepoPath, type WikiEntryKind, type WikiEntryRef } from '@/lib/wikiRoutes'
import { Card, CardContent } from '@/components/ui/card'
import { DocumentCard } from '@/components/research/DocumentCard'
import { AddToProjectButton } from '@/components/research/AddToProjectButton'
import { AddEntryButton, ResourceTimelinePanel } from '@/components/research/ResourceTimelinePanel'
import { ResourceSearchMatches } from '@/components/research/ResourceSearchMatches'

// ── Component ─────────────────────────────────────────────────────────────────

interface ResourcesViewProps {
  // When set, this view is scoped to a single project's saved documents.
  projectId?: string
  projectDocumentIds?: string[]
  // Wiki pages (concepts/resources/exams/events/regulations) saved to this
  // project — rendered alongside the corpus documents below as one list.
  projectWikiItems?: WikiEntryRef[]
  // Called after a source is added/removed (so the project view can refetch).
  onProjectMutated?: () => void
  onRemoveWikiItem?: (kind: WikiEntryKind, name: string) => Promise<void>
  // "Add Sources" flow: when set (non-project scope), browse/search the corpus
  // with a one-tap add into this project instead of the "Save to…" picker.
  addToProjectId?: string | null
  addToProjectIds?: string[]
  onAddToProject?: (documentId: string) => Promise<void>
  // "Add Sources" flow for vault pages (Resources/Books, Events, Regulation):
  // saved into research_project_wiki_items, same as the wiki popup's "Add to
  // Project" menu item.
  addedWikiKeys?: Set<string>
  onAddWikiItem?: (ref: WikiEntryRef) => Promise<void>
}

export default function ResourcesView({
  projectId, projectDocumentIds, projectWikiItems, onProjectMutated, onRemoveWikiItem,
  addToProjectId, addToProjectIds, onAddToProject,
  addedWikiKeys, onAddWikiItem,
}: ResourcesViewProps) {
  const searchQuery = useResearchStore(s => s.searchQuery).trim()
  const isProjectScope = projectId !== undefined
  const isAddMode = !isProjectScope && !!addToProjectId

  const feed = useResearchFeed(isProjectScope ? (projectDocumentIds ?? []) : undefined)
  const search = useResearchSearch(isProjectScope ? (projectDocumentIds ?? []) : undefined)
  const [addingId, setAddingId] = useState<string | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const openWikiPage = useConceptPopup(s => s.openAt)

  const handleAddToProject = async (documentId: string) => {
    setAddingId(documentId)
    await onAddToProject?.(documentId)
    setAddedIds(prev => new Set(prev).add(documentId))
    setAddingId(null)
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
    if (isAddMode) {
      const inProject = (addToProjectIds ?? []).includes(doc.id)
      const added = addedIds.has(doc.id) || inProject
      return (
        <button
          type="button"
          onClick={() => handleAddToProject(doc.id)}
          disabled={added || addingId === doc.id}
          className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground disabled:opacity-60"
        >
          {addingId === doc.id ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : added ? (
            <Check className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {inProject ? 'In project' : added ? 'Added' : 'Add'}
        </button>
      )
    }
    return <AddToProjectButton documentId={doc.id} />
  }

  const searching = searchQuery.length > 0

  // In "Add Sources" mode, vault timeline matches get an inline "Add to
  // project" action that saves into research_project_wiki_items.
  const wikiAddAction = isAddMode && onAddWikiItem
    ? (entry: Parameters<NonNullable<React.ComponentProps<typeof ResourceSearchMatches>['action']>>[0]) => {
      const ref = entryToRef(entry)
      return (
        <AddEntryButton
          entry={entry}
          added={addedWikiKeys?.has(`${ref.kind}:${ref.name}`) ?? false}
          onAdd={e => onAddWikiItem(entryToRef(e))}
        />
      )
    }
    : undefined

  return (
    <div className="space-y-5">
      {searching ? (
        <>
          {!isProjectScope && <ResourceSearchMatches action={wikiAddAction} />}
          <SearchResults search={search} action={cardAction} />
        </>
      ) : isProjectScope ? (
        <BrowseFeed
          feed={feed}
          action={cardAction}
          wikiItems={projectWikiItems ?? []}
          onOpenWikiItem={item => openWikiPage([item], 0, entryRefToRepoPath(item))}
          onRemoveWikiItem={onRemoveWikiItem}
          emptyMessage='No documents in this project yet. Use “Add Sources” to browse the corpus, or add a source by URL.'
        />
      ) : (
        // Corpus view: everything here comes from the markdown vault
        // (Resources/Books, Resources/Events, Resources/Regulation), browsed
        // via the month-by-month timeline heatmap. In "Add Sources" mode each
        // entry gets an "Add" action into the active project's Saved Pages.
        <ResourceTimelinePanel
          addToProjectId={isAddMode ? addToProjectId : undefined}
          addedWikiKeys={addedWikiKeys}
          onAddEntry={onAddWikiItem}
        />
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

// ── Browse feed (project documents — corpus docs + saved wiki pages) ──────────

function BrowseFeed({
  feed,
  action,
  wikiItems = [],
  onOpenWikiItem,
  onRemoveWikiItem,
  emptyMessage,
}: {
  feed: ReturnType<typeof useResearchFeed>
  action: (doc: ResearchDocumentRow) => ReactNode
  wikiItems?: WikiEntryRef[]
  onOpenWikiItem?: (item: WikiEntryRef) => void
  onRemoveWikiItem?: (kind: WikiEntryKind, name: string) => Promise<void>
  emptyMessage: string
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
  if (documents.length === 0 && wikiItems.length === 0) {
    return (
      <p className="mx-auto max-w-md py-16 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    )
  }

  const shown = documents.length + wikiItems.length
  const totalCount = total !== null ? total + wikiItems.length : null

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {totalCount !== null
          ? `Showing ${shown} of ${totalCount.toLocaleString()} document${totalCount !== 1 ? 's' : ''}`
          : `${shown} document${shown !== 1 ? 's' : ''}`}
      </p>

      {wikiItems.map(item => (
        <WikiItemCard
          key={`${item.kind}:${item.name}`}
          item={item}
          onOpen={onOpenWikiItem ? () => onOpenWikiItem(item) : undefined}
          onRemove={onRemoveWikiItem ? () => onRemoveWikiItem(item.kind, item.name) : undefined}
        />
      ))}

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

// ── Saved wiki page row (concept/resource/exam/event/regulation) ──────────────

function WikiItemCard({
  item,
  onOpen,
  onRemove,
}: {
  item: WikiEntryRef
  onOpen?: () => void
  onRemove?: () => Promise<void>
}) {
  const [removing, setRemoving] = useState(false)

  const handleRemove = async () => {
    if (!onRemove) return
    setRemoving(true)
    await onRemove()
    setRemoving(false)
  }

  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardContent className="flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={onOpen}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{item.name}</span>
          <span className="shrink-0 rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
            {item.kind}
          </span>
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="flex shrink-0 items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-60"
            aria-label={`Remove ${item.name}`}
          >
            {removing ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Trash2 className="h-3.5 w-3.5" aria-hidden />}
            Remove
          </button>
        )}
      </CardContent>
    </Card>
  )
}
