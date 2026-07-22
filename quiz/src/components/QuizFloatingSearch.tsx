import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { filterQuestions } from '@/lib/parser'
import type { QuestionFilter } from '@/lib/parser'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { QuestionSearchRow, DifficultyDots } from '@/components/QuestionSearchRow'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'

interface FilterPill {
  label: string
  onRemove: () => void
}

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

// Turns a raw wiki_link path ("Concepts/Geometric+Distribution", "/probability/set-theory")
// into a human label, matching how QuestionSearchRow renders concept chips.
function conceptLabel(link: string): string {
  const clean = link.replace(/\.md$/i, '').replace(/\+/g, ' ')
  const segment = clean.split('/').filter(Boolean).pop() ?? link
  return segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

interface QuizFloatingSearchProps {
  /** When provided, results are pre-filtered to this pool (e.g. current exam + concepts). */
  filter?: QuestionFilter
  /** Active filter chips shown at the top of the dropdown with × to remove. */
  filterPills?: FilterPill[]
}

export function QuizFloatingSearch({ filter, filterPills }: QuizFloatingSearchProps = {}) {
  const navigate = useNavigate()
  const { questions: allQuestions } = useAllQuestions()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [difficultyFilters, setDifficultyFilters] = useState<Set<string>>(new Set())
  const [conceptFilters, setConceptFilters] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // The incoming quiz-config filter (exam + selected concepts) defines the pool
  // the difficulty/concept filters refine. When the quiz selection changes,
  // drop stale refinements so they can't linger against a different pool.
  const filterKey = JSON.stringify(filter ?? {})
  useEffect(() => {
    setDifficultyFilters(new Set())
    setConceptFilters(new Set())
  }, [filterKey])

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
    navigate(`/quiz?mode=quiz&selection=stored&topic=${encodeURIComponent(storageTopic)}&reveal=during&from=browse`)
    setSelectedIds(new Set())
    closeDropdown()
  }

  // Expand whenever the search bar is active (focus), regardless of query
  const isExpanded = active

  // Pool defined by the quiz config (exam + selected concepts) and the search
  // query — this is what the difficulty/concept refinements narrow further.
  const basePool = useMemo(() => {
    const hasFilter = filter && Object.keys(filter).length > 0
    const q = query.trim()
    if (!q) return hasFilter ? filterQuestions(allQuestions, filter!) : allQuestions
    return filterQuestions(allQuestions, { ...filter, search: q })
  }, [allQuestions, query, filter])

  // Concepts available to filter by, drawn from the current pool so the dropdown
  // stays scoped to the selected quiz topics/exam.
  const conceptOptions = useMemo(() => {
    const seen = new Set<string>()
    basePool.forEach(q => q.wiki_link.forEach(link => seen.add(conceptLabel(link))))
    return Array.from(seen).sort().map(name => ({ value: name, label: name }))
  }, [basePool])

  // Apply the local refinements. Difficulty is OR within itself; concepts are OR
  // within themselves; the two groups are AND'd together.
  const visiblePool = useMemo(() => {
    let filtered = basePool
    if (difficultyFilters.size > 0) {
      filtered = filtered.filter(q => difficultyFilters.has(q.difficulty))
    }
    if (conceptFilters.size > 0) {
      filtered = filtered.filter(q => q.wiki_link.some(link => conceptFilters.has(conceptLabel(link))))
    }
    return filtered
  }, [basePool, difficultyFilters, conceptFilters])

  // Option counts reflect the pool with the *other* filter group applied, so each
  // count previews how many questions choosing it would leave.
  const difficultyOptionCounts = useMemo(() => {
    let pool = basePool
    if (conceptFilters.size > 0) {
      pool = pool.filter(q => q.wiki_link.some(link => conceptFilters.has(conceptLabel(link))))
    }
    const counts: Record<string, number> = {}
    pool.forEach(q => { counts[q.difficulty] = (counts[q.difficulty] ?? 0) + 1 })
    return counts
  }, [basePool, conceptFilters])

  const conceptOptionCounts = useMemo(() => {
    let pool = basePool
    if (difficultyFilters.size > 0) {
      pool = pool.filter(q => difficultyFilters.has(q.difficulty))
    }
    const counts: Record<string, number> = {}
    pool.forEach(q => q.wiki_link.forEach(link => {
      const lbl = conceptLabel(link)
      counts[lbl] = (counts[lbl] ?? 0) + 1
    }))
    return counts
  }, [basePool, difficultyFilters])

  const questionResults = useMemo(() => visiblePool.slice(0, 100), [visiblePool])
  const totalCount = visiblePool.length

  function toggleDifficulty(value: string) {
    setDifficultyFilters(prev => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  function toggleConceptFilter(value: string) {
    setConceptFilters(prev => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
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
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onMouseDown={e => { e.preventDefault(); closeDropdown() }}
        />
      )}

      <div
        ref={containerRef}
        className="sticky top-0 md:top-14 lg:top-0 z-50 border-b bg-background/90 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Input row */}
          <div className="flex items-center gap-2 h-14">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setActive(true)}
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
                {/* Difficulty + concept filters — scoped to the active quiz pool */}
                {basePool.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap px-0.5 py-2">
                    {DIFFICULTY_OPTIONS.map(opt => {
                      const count = difficultyOptionCounts[opt.value] ?? 0
                      const isActive = difficultyFilters.has(opt.value)
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleDifficulty(opt.value)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'bg-background hover:bg-accent text-muted-foreground'
                          }`}
                        >
                          <DifficultyDots difficulty={opt.value} />
                          <span className="capitalize">{opt.label}</span>
                          <span className="ml-0.5 text-xs bg-muted rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center text-muted-foreground">
                            {count}
                          </span>
                        </button>
                      )
                    })}
                    {conceptOptions.length > 0 && (
                      <MultiSelectDropdown
                        label="Concepts"
                        options={conceptOptions}
                        selected={conceptFilters}
                        onToggle={toggleConceptFilter}
                        getCount={v => conceptOptionCounts[v] ?? 0}
                      />
                    )}
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
                  ) : (
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
