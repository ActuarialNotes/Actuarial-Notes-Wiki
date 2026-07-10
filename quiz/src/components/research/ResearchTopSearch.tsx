import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Sparkles, Loader2, SlidersHorizontal, X, FileText, Library, ExternalLink } from 'lucide-react'
import rawTimeline from 'virtual:resource-timeline'
import { useResearchStore } from '@/stores/researchStore'
import { useResearchSearch } from '@/hooks/useResearchSearch'
import { agentMeta } from '@/lib/researchOntology'
import { toTimelineEntries, searchTimelineEntries, entryToRef, KIND_LABEL, type TimelineEntry } from '@/lib/resourceTimeline'
import { filterTimelineEntries } from '@/lib/resourceTimelineFilters'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { RESEARCH_AI_ENABLED } from '@/lib/featureFlags'
import { ResearchFilterPanel, useActiveFilterCount } from './ResearchFilterPanel'

interface ResearchTopSearchProps {
  onAsk: (query: string) => void
  asking: boolean
  // Surface the AI answer (switch to the Resources tab) when Ask AI runs.
  onActivate: () => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

function formatTimelineDate(entry: TimelineEntry): string {
  if (entry.month === null) return String(entry.year)
  return new Date(entry.year, entry.month).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

// Page-level corpus search for the Research tab, styled and positioned exactly
// like the exam study-guide search (WikiFloatingSearch): a sticky, full-width,
// borderless bar pinned to the top, with live results appearing in a dropdown
// right below as you type (no scope pills). "Ask AI" runs the grounded
// assistant. A "Filters" toggle (Source / Jurisdiction / Line of business /
// Published) expands the same dropdown area — these are the only filter
// controls for the Research tab; they apply to search, browse, and the
// resource timeline alike via the shared researchStore filters.
export function ResearchTopSearch({
  onAsk, asking, onActivate,
}: ResearchTopSearchProps) {
  const setSearchQuery = useResearchStore(s => s.setSearchQuery)
  const [input, setInput] = useState('')
  const [active, setActive] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { results, loading } = useResearchSearch()
  const filters = useResearchStore(s => s.filters)
  const activeFilterCount = useActiveFilterCount()
  const openConceptAt = useConceptPopup(s => s.openAt)

  // Debounce the keyword query that drives the results dropdown.
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(input.trim()), 200)
    return () => clearTimeout(t)
  }, [input, setSearchQuery])

  // Keyword matches against the markdown-vault resource timeline (Books,
  // Events, Regulation, Benchmark) — searched alongside the agent-fetched
  // corpus (research_documents) so the top search covers all resource types.
  const allTimelineEntries = useMemo(() => toTimelineEntries(rawTimeline), [])
  const timelineMatches = useMemo(() => {
    const query = input.trim()
    if (!query) return []
    return searchTimelineEntries(filterTimelineEntries(allTimelineEntries, filters), query).slice(0, 8)
  }, [allTimelineEntries, filters, input])

  useEffect(() => {
    if (!active) return
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(false)
        setFiltersOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [active])

  const query = input.trim()
  const hasQuery = query.length > 0
  const isExpanded = active && (hasQuery || filtersOpen)

  function dismiss() {
    setInput('')
    setSearchQuery('')
    setActive(false)
    setFiltersOpen(false)
    inputRef.current?.blur()
  }

  function toggleFilters() {
    setFiltersOpen(v => !v)
    setActive(true)
  }

  const handleAsk = () => {
    if (!hasQuery || asking) return
    setSearchQuery(query)
    onActivate()
    onAsk(query)
    setActive(false)
    setFiltersOpen(false)
    inputRef.current?.blur()
  }

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); setActive(false); setFiltersOpen(false) }}
        />
      )}

      <div
        ref={containerRef}
        data-floating-search
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
              onClick={toggleFilters}
              aria-pressed={filtersOpen}
              aria-label="Filters"
              className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filtersOpen
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent/60'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {/* "Ask AI" assistant — gated off by RESEARCH_AI_ENABLED. While off,
                the bar stays a pure keyword search over the corpus + timeline. */}
            {RESEARCH_AI_ENABLED && (
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
            )}
          </div>

          {/* Dropdown — filters and/or live results */}
          {isExpanded && (
            <div className="space-y-3 pb-3 pt-2">
              {filtersOpen && <ResearchFilterPanel />}

              {hasQuery && (
                loading && results.length === 0 && timelineMatches.length === 0 ? (
                  <div className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Searching…
                  </div>
                ) : results.length === 0 && timelineMatches.length === 0 ? (
                  <p className="px-2 py-3 text-xs text-muted-foreground">No matches.</p>
                ) : (
                  <ul className="max-h-[55vh] space-y-0.5 overflow-y-auto">
                    {timelineMatches.map(entry => (
                      <li key={`${entry.kind}:${entry.path}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setActive(false)
                            openConceptAt([entryToRef(entry)], 0, entry.path)
                          }}
                          className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
                        >
                          <Library className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-foreground">{entry.title}</span>
                            <span className="block truncate text-[11px] text-muted-foreground">
                              {[KIND_LABEL[entry.kind], formatTimelineDate(entry)].filter(Boolean).join(' · ')}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
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
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
