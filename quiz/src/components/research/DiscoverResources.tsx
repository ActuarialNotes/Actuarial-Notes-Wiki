import { useState, type FormEvent } from 'react'
import { Search, X, Plus, Check, Loader2 } from 'lucide-react'
import { DocumentCard } from '@/components/research/DocumentCard'
import { useResearchSearch } from '@/hooks/useResearchSearch'
import { useResearchFeed, type ResearchDocumentRow } from '@/hooks/useResearchFeed'
import { useResearchStore } from '@/stores/researchStore'

interface DiscoverResourcesProps {
  // Documents already in the project — shown as "Added" rather than addable.
  existingIds: string[]
  onAdd: (documentId: string) => Promise<void>
}

// "Add more" surface for a project: search the whole corpus (not just the
// project's saved set) and one-tap add results. When the box is empty it browses
// the corpus newest-first, date-grouped — a lightweight timeline of what's
// available to pull in.
export function DiscoverResources({ existingIds, onAdd }: DiscoverResourcesProps) {
  const searchQuery = useResearchStore(s => s.searchQuery)
  const setSearchQuery = useResearchStore(s => s.setSearchQuery)
  const [input, setInput] = useState(searchQuery)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const [addingId, setAddingId] = useState<string | null>(null)

  // Both hooks read the shared searchQuery; feed is the no-query fallback.
  const search = useResearchSearch(undefined)
  const feed = useResearchFeed(undefined)

  const searching = searchQuery.trim().length > 0
  const existing = new Set(existingIds)

  async function handleAdd(id: string) {
    setAddingId(id)
    await onAdd(id)
    setAddedIds(prev => new Set(prev).add(id))
    setAddingId(null)
  }

  function action(doc: ResearchDocumentRow) {
    const inProject = existing.has(doc.id)
    const added = addedIds.has(doc.id) || inProject
    return (
      <button
        type="button"
        onClick={() => handleAdd(doc.id)}
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSearchQuery(input.trim())
  }

  const docs = searching ? search.results : feed.documents
  const loading = searching ? search.loading : feed.loading

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search the corpus to add sources…"
          className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-9 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {input && (
          <button
            type="button"
            onClick={() => { setInput(''); setSearchQuery('') }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> {searching ? 'Searching…' : 'Loading corpus…'}
        </div>
      ) : docs.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          {searching ? 'No documents match. Try different keywords.' : 'No documents available yet.'}
        </p>
      ) : (
        <div className="space-y-2">
          {docs.map(doc => (
            <DocumentCard key={doc.id} document={doc} action={action(doc)} />
          ))}
        </div>
      )}
    </div>
  )
}
