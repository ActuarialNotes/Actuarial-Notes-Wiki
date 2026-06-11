import { useState, type FormEvent } from 'react'
import { Search, Sparkles, Loader2, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useResearchStore } from '@/stores/researchStore'

interface ResearchSearchBarProps {
  // Trigger the grounded AI assistant for the current query.
  onAsk: (query: string) => void
  asking: boolean
  // Add-by-URL ingestion.
  onAddUrl: (url: string) => void
  addingUrl: boolean
  addError: string | null
  addNotice: string | null
  // e.g. "to this project" — clarifies where an added source lands.
  addContextLabel?: string
  // Called when the user runs a search or asks — lets a parent surface results
  // (e.g. switch to the Resources tab).
  onActivate?: () => void
}

// Unified search surface for the Research tab: one box that runs fast keyword
// search (Enter / Search) or the grounded AI assistant (Ask AI), plus a
// collapsible "add a source by URL" affordance. The query text lives in
// researchStore so it persists across tab switches and drives the keyword feed.
export function ResearchSearchBar({
  onAsk, asking, onAddUrl, addingUrl, addError, addNotice, addContextLabel, onActivate,
}: ResearchSearchBarProps) {
  const searchQuery = useResearchStore(s => s.searchQuery)
  const setSearchQuery = useResearchStore(s => s.setSearchQuery)
  const [input, setInput] = useState(searchQuery)

  const [showAddUrl, setShowAddUrl] = useState(false)
  const [url, setUrl] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    setSearchQuery(trimmed)
    if (trimmed) onActivate?.()
  }

  const handleAsk = () => {
    const trimmed = input.trim()
    if (!trimmed || asking) return
    setSearchQuery(trimmed)
    onActivate?.()
    onAsk(trimmed)
  }

  const handleAddUrl = (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim() || addingUrl) return
    onAddUrl(url.trim())
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search bulletins, guidance, regulations, filings…"
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
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="secondary" className="gap-1.5">
            <Search className="h-4 w-4" aria-hidden /> Search
          </Button>
          <Button type="button" onClick={handleAsk} disabled={asking || !input.trim()} className="gap-1.5" aria-label="Ask AI">
            {asking ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
            Ask AI
          </Button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowAddUrl(v => !v)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add a source by URL
        </button>
        {addContextLabel && showAddUrl && (
          <span className="text-xs text-muted-foreground">{addContextLabel}</span>
        )}
      </div>

      {showAddUrl && (
        <form onSubmit={handleAddUrl} className="flex flex-col gap-2 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.osfi-bsif.gc.ca/…/guideline"
            disabled={addingUrl}
            className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          <Button type="submit" size="sm" variant="outline" disabled={addingUrl || !url.trim()} className="gap-1.5">
            {addingUrl && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
            {addingUrl ? 'Fetching…' : 'Add source'}
          </Button>
        </form>
      )}

      {showAddUrl && addError && <p className="text-xs text-destructive">{addError}</p>}
      {showAddUrl && addNotice && <p className="text-xs text-muted-foreground">{addNotice}</p>}
    </div>
  )
}
