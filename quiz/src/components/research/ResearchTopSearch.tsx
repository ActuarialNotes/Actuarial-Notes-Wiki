import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Search, Sparkles, Loader2, Plus, X, FileText, ExternalLink } from 'lucide-react'
import { useResearchStore } from '@/stores/researchStore'
import { useResearchSearch } from '@/hooks/useResearchSearch'
import { agentMeta } from '@/lib/researchOntology'

interface ResearchTopSearchProps {
  onAsk: (query: string) => void
  asking: boolean
  onAddUrl: (url: string) => void
  addingUrl: boolean
  addError: string | null
  addNotice: string | null
  // Surface the AI answer (switch to the Resources tab) when Ask AI runs.
  onActivate: () => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

// Page-level corpus search for the Research tab, styled and positioned exactly
// like the exam study-guide search (WikiFloatingSearch): a sticky, full-width,
// borderless bar pinned to the top, with live results appearing in a dropdown
// right below as you type (no scope pills). "Ask AI" runs the grounded
// assistant; a focused empty box reveals the add-a-source-by-URL affordance.
export function ResearchTopSearch({
  onAsk, asking, onAddUrl, addingUrl, addError, addNotice, onActivate,
}: ResearchTopSearchProps) {
  const setSearchQuery = useResearchStore(s => s.setSearchQuery)
  const [input, setInput] = useState('')
  const [active, setActive] = useState(false)
  const [showAddUrl, setShowAddUrl] = useState(false)
  const [url, setUrl] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { results, loading } = useResearchSearch()

  // Debounce the keyword query that drives the results dropdown.
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(input.trim()), 200)
    return () => clearTimeout(t)
  }, [input, setSearchQuery])

  useEffect(() => {
    if (!active) return
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setActive(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [active])

  const query = input.trim()
  const hasQuery = query.length > 0
  const isExpanded = active && hasQuery

  function dismiss() {
    setInput('')
    setSearchQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  const handleAsk = () => {
    if (!hasQuery || asking) return
    setSearchQuery(query)
    onActivate()
    onAsk(query)
    setActive(false)
    inputRef.current?.blur()
  }

  const handleAddUrl = (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim() || addingUrl) return
    onAddUrl(url.trim())
  }

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); setActive(false) }}
        />
      )}

      <div
        ref={containerRef}
        className="sticky top-0 md:top-14 lg:top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row */}
          <div className="flex items-center gap-2 h-[calc(3.5rem-1px)]">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setActive(true)}
              onKeyDown={e => { if (e.key === 'Escape') dismiss() }}
              placeholder="Search bulletins, guidance, regulations, filings"
              aria-label="Search the research corpus"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 border-0 bg-transparent text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {input && (
              <button
                type="button"
                onClick={dismiss}
                aria-label="Clear search"
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleAsk}
              disabled={asking || !hasQuery}
              aria-label="Ask AI"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {asking ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Sparkles className="h-3.5 w-3.5" aria-hidden />}
              Ask AI
            </button>
          </div>

          {/* Results dropdown — only when there's a query */}
          {isExpanded && (
            <div className="border-t pb-3 pt-2">
              {loading && results.length === 0 ? (
                <div className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Searching…
                </div>
              ) : results.length === 0 ? (
                <p className="px-2 py-3 text-xs text-muted-foreground">No matches.</p>
              ) : (
                <ul className="max-h-[55vh] space-y-0.5 overflow-y-auto">
                  {results.map(doc => (
                    <li key={doc.id}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setActive(false)}
                        className="flex items-start gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-accent/60"
                      >
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" aria-hidden />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-foreground">
                            {doc.title}
                            <ExternalLink className="ml-1 inline h-3 w-3 align-text-top text-muted-foreground" aria-hidden />
                          </span>
                          <span className="block truncate text-[11px] text-muted-foreground">
                            {[agentMeta(doc.agent_id)?.shortName ?? doc.agent_id, formatDate(doc.published_at)]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Add-a-source affordance — shown on focus when not actively searching */}
          {active && !hasQuery && (
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
    </>
  )
}
