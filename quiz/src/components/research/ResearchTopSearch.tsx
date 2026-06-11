import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Search, Sparkles, Loader2, Plus, X } from 'lucide-react'
import { useResearchStore } from '@/stores/researchStore'

interface ResearchTopSearchProps {
  onAsk: (query: string) => void
  asking: boolean
  onAddUrl: (url: string) => void
  addingUrl: boolean
  addError: string | null
  addNotice: string | null
  // Surface results (switch to the Resources tab) when a search/ask runs.
  onActivate: () => void
}

// Page-level corpus search for the Research tab, styled and positioned exactly
// like the exam study-guide search (WikiFloatingSearch): a sticky, full-width,
// borderless bar pinned to the top of the page. Enter runs keyword search,
// "Ask AI" runs the grounded assistant, and a focused state reveals the
// add-a-source-by-URL affordance. 16px input text avoids iOS zoom-on-focus.
export function ResearchTopSearch({
  onAsk, asking, onAddUrl, addingUrl, addError, addNotice, onActivate,
}: ResearchTopSearchProps) {
  const setSearchQuery = useResearchStore(s => s.setSearchQuery)
  const storedQuery = useResearchStore(s => s.searchQuery)
  const [input, setInput] = useState(storedQuery)
  const [active, setActive] = useState(false)
  const [showAddUrl, setShowAddUrl] = useState(false)
  const [url, setUrl] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep the local input in sync if the query is cleared elsewhere.
  useEffect(() => { setInput(storedQuery) }, [storedQuery])

  useEffect(() => {
    if (!active) return
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setActive(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [active])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    setSearchQuery(trimmed)
    if (trimmed) onActivate()
  }

  const handleAsk = () => {
    const trimmed = input.trim()
    if (!trimmed || asking) return
    setSearchQuery(trimmed)
    onActivate()
    onAsk(trimmed)
  }

  const handleAddUrl = (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim() || addingUrl) return
    onAddUrl(url.trim())
  }

  return (
    <div
      ref={containerRef}
      className="sticky top-0 md:top-14 lg:top-0 z-40 border-b bg-background/90 backdrop-blur-md"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <form onSubmit={handleSearch} className="flex items-center gap-2 h-[calc(3.5rem-1px)]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setActive(true)}
            placeholder="Search bulletins, guidance, regulations, filings"
            aria-label="Search the research corpus"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 border-0 bg-transparent text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {input && (
            <button
              type="button"
              onClick={() => { setInput(''); setSearchQuery('') }}
              aria-label="Clear search"
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleAsk}
            disabled={asking || !input.trim()}
            aria-label="Ask AI"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {asking ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Sparkles className="h-3.5 w-3.5" aria-hidden />}
            Ask AI
          </button>
        </form>

        {active && (
          <div className="border-t py-2.5">
            <button
              type="button"
              onClick={() => setShowAddUrl(v => !v)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden /> Add a source by URL
            </button>

            {showAddUrl && (
              <form onSubmit={handleAddUrl} className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://www.osfi-bsif.gc.ca/…/guideline"
                  disabled={addingUrl}
                  className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-[16px] sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={addingUrl || !url.trim()}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-input px-3 text-sm transition-colors hover:bg-accent/60 disabled:opacity-50"
                >
                  {addingUrl && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
                  {addingUrl ? 'Fetching…' : 'Add source'}
                </button>
              </form>
            )}
            {showAddUrl && addError && <p className="mt-1 text-xs text-destructive">{addError}</p>}
            {showAddUrl && addNotice && <p className="mt-1 text-xs text-muted-foreground">{addNotice}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
