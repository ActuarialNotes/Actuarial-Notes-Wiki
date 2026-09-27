import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Layers, Search, Sparkles, X } from 'lucide-react'
import { filterQuestions } from '@/lib/parser'
import type { Question, QuestionFilter } from '@/lib/parser'
import {
  hasFacetFilters,
  matchesFacets,
  splitSearchFilter,
  toggleFacet,
  type FacetSelection,
  type QuestionFacet,
} from '@/lib/questionFilters'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { MobileNavButton } from '@/components/MobileNavButton'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'
import { QuestionFilterBar } from '@/components/QuestionFilterBar'

interface FilterPill {
  label: string
  onRemove: () => void
}

/** Attempt-history filter, cycled by a single button: all → attempted → new → all. */
type AttemptStatus = 'all' | 'attempted' | 'new'

const ATTEMPT_STATUS_ORDER: AttemptStatus[] = ['all', 'attempted', 'new']

const ATTEMPT_STATUS_META: Record<AttemptStatus, { label: string; icon: typeof Layers }> = {
  all: { label: 'All', icon: Layers },
  attempted: { label: 'Attempted', icon: History },
  new: { label: 'New', icon: Sparkles },
}

function nextAttemptStatus(current: AttemptStatus): AttemptStatus {
  const idx = ATTEMPT_STATUS_ORDER.indexOf(current)
  return ATTEMPT_STATUS_ORDER[(idx + 1) % ATTEMPT_STATUS_ORDER.length]
}

/**
 * True on touch-first devices, where focusing the field raises the on-screen
 * keyboard. There the opening tap only reveals the panel — see the input's
 * onMouseDown — so the filters and results aren't immediately buried under the
 * keyboard. Mouse pointers keep the usual focus-on-first-click behaviour.
 */
function isTouchPointer(): boolean {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(pointer: coarse)').matches
}

interface QuizFloatingSearchProps {
  /**
   * The quiz builder's current selection. Its exam and sitting become the
   * panel's starting Exam / Sitting choices (ticked, and widenable from the
   * panel); everything else in it — the chosen concepts — scopes the pool.
   */
  filter?: QuestionFilter
  /** Active filter chips shown at the top of the dropdown with × to remove. */
  filterPills?: FilterPill[]
}

export function QuizFloatingSearch({ filter, filterPills }: QuizFloatingSearchProps = {}) {
  const navigate = useNavigate()
  const { questions: allQuestions } = useAllQuestions()
  const { byQuestionId: attemptsByQuestionId, tracked: attemptsTracked } = useQuestionAttempts()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [attemptStatus, setAttemptStatus] = useState<AttemptStatus>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // The quiz selection, split into the pool it scopes (its concepts) and the
  // Exam / Sitting choices the panel opens on. Keyed by value, not identity:
  // the builder rebuilds its filter object on renders that change nothing.
  const filterKey = JSON.stringify(filter ?? {})
  const { scope, initial } = useMemo(
    () => splitSearchFilter(filter ?? {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterKey],
  )
  const [facets, setFacets] = useState<FacetSelection>(initial)

  // When the quiz selection changes, start again from it, so a refinement
  // made against one exam can't linger against the next.
  useEffect(() => {
    setFacets(initial)
    setAttemptStatus('all')
  }, [initial])

  useEffect(() => {
    if (!active) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [active])

  function closeDropdown() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleStartQuiz() {
    const ids = [...selectedIds]
    const storageTopic = allQuestions.find(q => selectedIds.has(q.id))?.topic ?? 'Probability'
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(ids))
    } catch { /* ignore */ }
    // No `reveal` — the quiz reads the reader's saved choice for the mode.
    navigate(`/quiz?mode=quiz&selection=stored&topic=${encodeURIComponent(storageTopic)}&from=browse`)
    setSelectedIds(new Set())
    closeDropdown()
  }

  // Expand whenever the search bar is active (focus), regardless of query
  const isExpanded = active

  // Pool defined by the quiz config's concepts and the search query — this is
  // what the Difficulty / Concepts / Exam / Sitting filters narrow. It lists
  // the bank, so a question kept only for the record is in it: the panel is
  // how one is found by its sitting.
  const basePool = useMemo(() => {
    const q = query.trim()
    return filterQuestions(allQuestions, { ...scope, includeOffSyllabus: true, ...(q && { search: q }) })
  }, [allQuestions, query, scope])

  // A question counts as attempted once it has any recorded response — the same
  // signal QuestionSearchRow uses to show its "Attempted/Correct" chip.
  const isAttempted = useCallback(
    (q: Question) => attemptsByQuestionId.has(q.id),
    [attemptsByQuestionId],
  )

  const matchesAttempt = useCallback(
    (q: Question) =>
      attemptStatus === 'all' ? true
      : attemptStatus === 'attempted' ? isAttempted(q)
      : !isAttempted(q),
    [attemptStatus, isAttempted],
  )

  // The attempt cycle is this panel's own filter, AND'd with the shared ones.
  // The filter bar's counts are taken over the pool it leaves, so each option
  // previews how many questions choosing it would show.
  const attemptPool = useMemo(() => basePool.filter(matchesAttempt), [basePool, matchesAttempt])
  const facetPool = useMemo(() => basePool.filter(q => matchesFacets(q, facets)), [basePool, facets])
  const visiblePool = useMemo(() => facetPool.filter(matchesAttempt), [facetPool, matchesAttempt])

  // Counts for the attempt-status cycle, previewing what each state would leave
  // once the shared filters are applied.
  const attemptStatusCounts = useMemo(() => {
    const attempted = facetPool.reduce((n, q) => n + (isAttempted(q) ? 1 : 0), 0)
    return { all: facetPool.length, attempted, new: facetPool.length - attempted }
  }, [facetPool, isAttempted])

  const questionResults = useMemo(() => visiblePool.slice(0, 100), [visiblePool])
  const totalCount = visiblePool.length

  function toggleFilter(facet: QuestionFacet, value: string) {
    setFacets(prev => toggleFacet(prev, facet, value))
  }

  // Select-all applies to the currently visible pool, leaving any selections
  // outside the active refinements untouched (mirrors the study popup).
  const allSelected = visiblePool.length > 0 && visiblePool.every(q => selectedIds.has(q.id))
  const someSelected = visiblePool.some(q => selectedIds.has(q.id)) && !allSelected

  function toggleSelectAll() {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (allSelected || someSelected) {
        visiblePool.forEach(q => next.delete(q.id))
      } else {
        visiblePool.forEach(q => next.add(q.id))
      }
      return next
    })
  }

  return (
    <>
      {isExpanded && (
        <div
          // z-[44] dims the concept popup (z-40) as well: at a tied z-40 the popup
          // stayed bright under a dropdown that overlapped it.
          className="fixed inset-0 z-[44] bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); closeDropdown() }}
        />
      )}

      <div
        ref={containerRef}
        className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row. The height is 3.5rem *minus the bottom border* so the
              whole bar comes to exactly 56px — the same total the Study Guides
              bar measures, and the offset every sticky header below it is
              written against. At a flat `h-14` this bar was a pixel taller
              than that one, which showed as the page nudging down by one on
              every switch between the two tabs. */}
          <div className="flex items-center gap-2 h-[calc(3.5rem-1px)]">
            {/* See WikiFloatingSearch — below lg this bar carries the nav
                button, and searching folds it away. */}
            <MobileNavButton collapsed={active} className="-ml-1.5" />
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setActive(true)}
              onMouseDown={e => {
                // First tap on touch: open the panel only. Cancelling the
                // mousedown's default action suppresses the focus it would
                // otherwise move to the input, so no keyboard yet — the next
                // tap lands with the panel already open and focuses normally.
                if (!active && isTouchPointer()) {
                  e.preventDefault()
                  setActive(true)
                }
              }}
              placeholder="Search questions…"
              className="flex-1 min-w-0 bg-transparent border-0 focus:outline-none text-[16px] sm:text-sm text-foreground placeholder:text-muted-foreground"
              aria-label="Search questions"
              autoComplete="off"
              spellCheck={false}
            />
            {(query || active) && (
              <button
                type="button"
                onClick={query ? () => setQuery('') : closeDropdown}
                aria-label={query ? 'Clear query' : 'Close search'}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Selection bar — shown when selections exist and dropdown is closed */}
          {!isExpanded && selectedIds.size > 0 && (
            <div className="flex items-center justify-between gap-3 py-2">
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{selectedIds.size}</span> question{selectedIds.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  clear
                </button>
                <button
                  type="button"
                  data-sound="begin"
                  onClick={handleStartQuiz}
                  className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          )}

          {/* Dropdown — shown whenever search is active */}
          {isExpanded && (
            <div
              className="flex flex-col"
              style={{ height: 'calc(100dvh - 3.5rem)' }}
            >
              {/* Single scrollable region: tags → filter pills → results.
                  Everything scrolls together so tags don't push results off screen. */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {/* The shared filter row — Difficulty, Concepts, Exam and Sitting,
                    each always on screen — with this panel's attempt cycle on
                    the end. The builder's exam (and paper) start ticked. */}
                {basePool.length > 0 && (
                  <div className="px-0.5 py-2">
                    <QuestionFilterBar pool={attemptPool} selection={facets} onToggle={toggleFilter}>
                      {/* Attempt history — a single button cycling all → attempted → new.
                          Only useful once the signed-in user has answered something. */}
                      {attemptsByQuestionId.size > 0 && (() => {
                        const { label, icon: Icon } = ATTEMPT_STATUS_META[attemptStatus]
                        const isActive = attemptStatus !== 'all'
                        return (
                          <button
                            type="button"
                            data-sound="tick"
                            onClick={() => setAttemptStatus(nextAttemptStatus)}
                            aria-label={`Attempt filter: ${label}. Tap to cycle.`}
                            title={`Showing ${label.toLowerCase()} questions — tap to cycle`}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'bg-background hover:bg-accent text-muted-foreground'
                            }`}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{label}</span>
                            <span className="ml-0.5 text-xs bg-muted rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center text-muted-foreground">
                              {attemptStatusCounts[attemptStatus]}
                            </span>
                          </button>
                        )
                      })()}
                    </QuestionFilterBar>
                  </div>
                )}

                {/* Select all — mirrors the study popup's collect toolbar */}
                {visiblePool.length > 0 && (
                  <div className="flex items-center gap-2 px-0.5 py-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        role="checkbox"
                        aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
                        tabIndex={0}
                        onClick={toggleSelectAll}
                        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleSelectAll() } }}
                        className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                          allSelected || someSelected ? 'bg-primary border-primary' : 'border-input bg-background'
                        }`}
                      >
                        {allSelected && (
                          <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                            <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {someSelected && <div className="h-0.5 w-2 bg-primary-foreground rounded" />}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {allSelected ? 'Deselect all' : 'Select all'}
                      </span>
                    </label>
                    {selectedIds.size > 0 && (
                      <span className="ml-auto text-xs text-muted-foreground shrink-0">
                        {selectedIds.size} selected
                      </span>
                    )}
                  </div>
                )}

                {/* Filter pills + result count */}
                <div className="flex flex-wrap items-center gap-1.5 px-0.5 py-2">
                  {filterPills && filterPills.length > 0 ? (
                    filterPills.map(pill => (
                      <span
                        key={pill.label}
                        className="inline-flex items-center gap-1 rounded-full bg-muted text-foreground px-2.5 py-0.5 text-xs font-medium"
                      >
                        {pill.label}
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); pill.onRemove() }}
                          aria-label={`Remove filter ${pill.label}`}
                          className="hover:text-muted-foreground transition-colors ml-0.5 shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  ) : !hasFacetFilters(facets) && attemptStatus === 'all' && (
                    <span className="text-xs text-muted-foreground">All questions</span>
                  )}
                  <span className="ml-auto text-xs font-medium text-muted-foreground shrink-0">
                    {totalCount} question{totalCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Results list */}
                <div className="py-2 space-y-2">
                  {questionResults.length === 0 ? (
                    <p className="text-xs text-muted-foreground px-2 py-2">No questions found.</p>
                  ) : (
                    questionResults.map(q => (
                      <QuestionSearchRow
                        key={q.id}
                        question={q}
                        query={query}
                        selected={selectedIds.has(q.id)}
                        onToggleSelect={toggleSelect}
                        attemptSummary={attemptsByQuestionId.get(q.id)}
                        attemptsTracked={attemptsTracked}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Start Quiz button — pinned at bottom */}
              {selectedIds.size > 0 && (
                <div className="flex-shrink-0 pt-2 pb-3">
                  <button
                    type="button"
                    data-sound="begin"
                    onClick={handleStartQuiz}
                    className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Start Quiz with {selectedIds.size} selected →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
