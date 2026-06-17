import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Loader2, Play, X } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { QuestionSearchRow, DifficultyDots } from '@/components/QuestionSearchRow'

// Matches a raw wiki_link value against a concept name. Handles two formats:
//   "Concepts/Fund+Accumulation"  (hrefToEntryRef resolves the name directly)
//   "/probability/combinatorics"  (slug path — last segment, hyphens → spaces)
function linkMatchesConcept(link: string, conceptName: string): boolean {
  const lower = conceptName.toLowerCase()
  const ref = hrefToEntryRef(link)
  if (ref?.name.toLowerCase() === lower) return true
  const lastSegment = link.split('/').filter(Boolean).pop()
  return !!lastSegment && lastSegment.replace(/-/g, ' ').toLowerCase() === lower
}

function conceptLabel(link: string): string {
  const clean = link.replace(/\.md$/i, '').replace(/\+/g, ' ')
  const segment = clean.split('/').filter(Boolean).pop() ?? link
  return segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

interface ConceptQuestionsModalProps {
  conceptName: string
  onClose: () => void
}

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
  getCount,
}: {
  label: string
  options: { value: string; label: string }[]
  selected: Set<string>
  onToggle: (value: string) => void
  getCount?: (value: string) => number
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayLabel =
    selected.size === 0
      ? label
      : selected.size === options.length
        ? `${label}: All`
        : `${label} (${selected.size})`

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap ${
          selected.size > 0
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-input bg-background hover:bg-accent'
        }`}
      >
        <span>{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-20 bg-card border rounded-lg shadow-lg min-w-[200px] py-1.5 max-h-72 overflow-y-auto">
          {options.map(opt => {
            const count = getCount?.(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onToggle(opt.value)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-accent transition-colors text-left"
              >
                <div
                  className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                    selected.has(opt.value) ? 'bg-primary border-primary' : 'border-input bg-background'
                  }`}
                >
                  {selected.has(opt.value) && (
                    <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="capitalize flex-1">{opt.label}</span>
                {count !== undefined && (
                  <span className="ml-2 text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5 min-w-[1.5rem] text-center font-medium">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function ConceptQuestionsModal({ conceptName, onClose }: ConceptQuestionsModalProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [difficultyFilters, setDifficultyFilters] = useState<Set<string>>(new Set())
  const [conceptFilters, setConceptFilters] = useState<Set<string>>(new Set())

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        const all = parseAllQuestions(raw)
        const filtered = all.filter(q =>
          q.wiki_link.some(link => linkMatchesConcept(link, conceptName))
        )
        setQuestions(filtered)
        setSelectedIds(new Set(filtered.map(q => q.id)))
      })
      .catch(err => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load questions')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [conceptName])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const navigate = useNavigate()

  const relatedConcepts = useMemo(() => {
    const seen = new Set<string>()
    questions.forEach(q => {
      q.wiki_link.forEach(link => {
        if (!linkMatchesConcept(link, conceptName)) {
          seen.add(conceptLabel(link))
        }
      })
    })
    return Array.from(seen)
      .sort()
      .map(name => ({ value: name, label: name }))
  }, [questions, conceptName])

  const visibleQuestions = useMemo(() => {
    let filtered = questions
    if (difficultyFilters.size > 0) {
      filtered = filtered.filter(q => difficultyFilters.has(q.difficulty))
    }
    if (conceptFilters.size > 0) {
      filtered = filtered.filter(q =>
        q.wiki_link.some(link => conceptFilters.has(conceptLabel(link)))
      )
    }
    return filtered
  }, [questions, difficultyFilters, conceptFilters])

  const filteredOutQuestions = useMemo(() => {
    if (difficultyFilters.size === 0 && conceptFilters.size === 0) return []
    const visibleIds = new Set(visibleQuestions.map(q => q.id))
    return questions.filter(q => !visibleIds.has(q.id))
  }, [questions, visibleQuestions, difficultyFilters, conceptFilters])

  const difficultyOptionCounts = useMemo(() => {
    let filtered = questions
    if (conceptFilters.size > 0) {
      filtered = filtered.filter(q =>
        q.wiki_link.some(link => conceptFilters.has(conceptLabel(link)))
      )
    }
    const counts: Record<string, number> = {}
    filtered.forEach(q => { counts[q.difficulty] = (counts[q.difficulty] ?? 0) + 1 })
    return counts
  }, [questions, conceptFilters])

  const conceptOptionCounts = useMemo(() => {
    let filtered = questions
    if (difficultyFilters.size > 0) {
      filtered = filtered.filter(q => difficultyFilters.has(q.difficulty))
    }
    const counts: Record<string, number> = {}
    filtered.forEach(q => {
      q.wiki_link.forEach(link => {
        const lbl = conceptLabel(link)
        counts[lbl] = (counts[lbl] ?? 0) + 1
      })
    })
    return counts
  }, [questions, difficultyFilters])

  const allSelected = visibleQuestions.length > 0 && visibleQuestions.every(q => selectedIds.has(q.id))
  const someSelected = visibleQuestions.some(q => selectedIds.has(q.id)) && !allSelected

  const toggleSelectAll = () => {
    if (allSelected || someSelected) {
      setSelectedIds(prev => {
        const next = new Set(prev)
        visibleQuestions.forEach(q => next.delete(q.id))
        return next
      })
    } else {
      setSelectedIds(prev => new Set([...prev, ...visibleQuestions.map(q => q.id)]))
    }
  }

  const toggleQuestion = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedQuestions = useMemo(
    () => questions.filter(q => selectedIds.has(q.id)),
    [questions, selectedIds],
  )

  function handleStartQuiz() {
    if (selectedQuestions.length === 0) return
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(selectedQuestions.map(q => q.id)))
    } catch { /* ignore */ }
    onClose()
    navigate('/quiz?selection=stored')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Questions for ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-2xl bg-card border rounded-xl shadow-2xl flex flex-col my-8 mx-4 max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-12 border-b shrink-0">
          <span className="flex-1 truncate font-semibold text-sm">
            Questions: {conceptName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading questions…
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
          {!loading && !error && questions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No questions found for this concept.
            </div>
          )}
          {!loading && questions.length > 0 && (
            <>
              {/* Filter controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {DIFFICULTY_OPTIONS.map(opt => {
                  const count = difficultyOptionCounts[opt.value] ?? 0
                  const active = difficultyFilters.has(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDifficultyFilters(prev => {
                        const next = new Set(prev)
                        if (next.has(opt.value)) next.delete(opt.value)
                        else next.add(opt.value)
                        return next
                      })}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        active
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-input bg-background hover:bg-accent text-muted-foreground'
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
                {relatedConcepts.length > 0 && (
                  <MultiSelectDropdown
                    label="Concepts"
                    options={relatedConcepts}
                    selected={conceptFilters}
                    onToggle={c => setConceptFilters(prev => {
                      const next = new Set(prev)
                      if (next.has(c)) next.delete(c)
                      else next.add(c)
                      return next
                    })}
                    getCount={v => conceptOptionCounts[v] ?? 0}
                  />
                )}
              </div>

              {/* Toolbar: select-all + count */}
              <div className="flex items-center gap-3 py-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    role="checkbox"
                    aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
                    tabIndex={0}
                    onClick={toggleSelectAll}
                    onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') toggleSelectAll() }}
                    className={`h-6 w-6 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      allSelected || someSelected
                        ? 'bg-primary border-primary'
                        : 'border-input bg-background'
                    }`}
                  >
                    {allSelected && (
                      <svg className="h-3.5 w-3.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    )}
                    {someSelected && (
                      <div className="h-0.5 w-3 bg-primary-foreground rounded" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {visibleQuestions.filter(q => selectedIds.has(q.id)).length} / {visibleQuestions.length} selected
                    {(() => {
                      const hiddenSelected = filteredOutQuestions.filter(q => selectedIds.has(q.id)).length
                      return hiddenSelected > 0
                        ? <span className="ml-1 text-xs">(+{hiddenSelected} filtered)</span>
                        : null
                    })()}
                  </span>
                </label>
              </div>

              {visibleQuestions.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No questions match the selected filters.
                </div>
              )}
              {visibleQuestions.map(q => (
                <QuestionSearchRow
                  key={q.id}
                  question={q}
                  query=""
                  selected={selectedIds.has(q.id)}
                  onToggleSelect={toggleQuestion}
                />
              ))}
              {filteredOutQuestions.length > 0 && (
                <div className="opacity-30 pointer-events-none select-none space-y-3 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground shrink-0">
                      {filteredOutQuestions.length} filtered out
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  {filteredOutQuestions.map(q => (
                    <QuestionSearchRow
                      key={q.id}
                      question={q}
                      query=""
                      selected={false}
                      onToggleSelect={() => {}}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Start Quiz button */}
        {!loading && questions.length > 0 && (
          <div className="shrink-0 px-4 py-3 border-t bg-card rounded-b-xl">
            <button
              type="button"
              onClick={handleStartQuiz}
              disabled={selectedIds.size === 0}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="h-4 w-4" />
              Start Quiz ({selectedQuestions.length})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
