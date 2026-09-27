import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Play, X } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'
import { QuestionFilterBar } from '@/components/QuestionFilterBar'
import {
  emptyFacets,
  hasFacetFilters,
  matchesFacets,
  toggleFacet,
  type FacetSelection,
} from '@/lib/questionFilters'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { tallyAttempts } from '@/lib/questionAttempts'
import { OverlayPortal } from '@/components/ui/OverlayPortal'

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

interface ConceptQuestionsModalProps {
  conceptName: string
  onClose: () => void
  /** Called (in addition to onClose) when the user actually starts a quiz from here —
   *  lets callers that nest this modal inside another dialog
   *  dismiss that outer dialog too, instead of leaving it stuck open behind the quiz. */
  onQuizStart?: () => void
}

export function ConceptQuestionsModal({ conceptName, onClose, onQuizStart }: ConceptQuestionsModalProps) {
  // Paper: the panel sliding in.
  useSoundOnMount('open')
  const { byQuestionId: attemptsByQuestionId, tracked: attemptsTracked } = useQuestionAttempts()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [facets, setFacets] = useState<FacetSelection>(emptyFacets)

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

  const visibleQuestions = useMemo(
    () => questions.filter(q => matchesFacets(q, facets)),
    [questions, facets],
  )

  const filteredOutQuestions = useMemo(() => {
    if (!hasFacetFilters(facets)) return []
    const visibleIds = new Set(visibleQuestions.map(q => q.id))
    return questions.filter(q => !visibleIds.has(q.id))
  }, [questions, visibleQuestions, facets])

  // Roll-up of the visible set, so the header answers "how much of this concept
  // have I actually done?" without reading every row.
  const attemptTotals = useMemo(
    () => tallyAttempts(visibleQuestions.map(q => attemptsByQuestionId.get(q.id))),
    [visibleQuestions, attemptsByQuestionId],
  )

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

  // Quizzing is never gated: a right answer on a New concept is what levels it
  // to Level 1 and collects its card (docs/flashcard-collection.md).
  function handleStartQuiz() {
    if (selectedQuestions.length === 0) return
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(selectedQuestions.map(q => q.id)))
    } catch { /* ignore */ }
    onQuizStart?.()
    onClose()
    navigate('/quiz?selection=stored')
  }

  return (
    <OverlayPortal>
    <div
      // z-[130]: openable from the concept popup, a flashcard and the collect
      // dialog (z-[120]) alike, so it sits above every host that can open it.
      className="fixed inset-0 z-[130] flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto paper-scrim"
      role="dialog"
      aria-modal="true"
      aria-label={`Questions for ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-2xl flex flex-col my-8 mx-4 max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-12 shrink-0">
          <span className="flex-1 truncate font-semibold text-lg">
            {conceptName}
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
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
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
              {/* Filter controls — the row every question list carries. The
                  concept itself is left out of Concepts: every question here
                  is tagged with it. */}
              <QuestionFilterBar
                pool={questions}
                selection={facets}
                onToggle={(facet, value) => setFacets(prev => toggleFacet(prev, facet, value))}
                omitConcept={conceptName}
              />

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
                {attemptTotals.attempted > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground tabular-nums shrink-0">
                    {attemptTotals.attempted}/{attemptTotals.total} attempted ·{' '}
                    <span className="text-green-600 dark:text-green-400">{attemptTotals.correct} correct</span>
                    {attemptTotals.incorrect > 0 && (
                      <>
                        {' · '}
                        <span className="text-red-600 dark:text-red-400">{attemptTotals.incorrect} incorrect</span>
                      </>
                    )}
                  </span>
                )}
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
                  attemptSummary={attemptsByQuestionId.get(q.id)}
                  attemptsTracked={attemptsTracked}
                />
              ))}
              {filteredOutQuestions.length > 0 && (
                <div className="opacity-30 pointer-events-none select-none space-y-3 pt-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-muted-foreground shrink-0">
                      {filteredOutQuestions.length} filtered out
                    </span>
                  </div>
                  {filteredOutQuestions.map(q => (
                    <QuestionSearchRow
                      key={q.id}
                      question={q}
                      query=""
                      selected={false}
                      onToggleSelect={() => {}}
                      attemptSummary={attemptsByQuestionId.get(q.id)}
                      attemptsTracked={attemptsTracked}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Start Quiz button. */}
        {!loading && questions.length > 0 && (
          <div className="shrink-0 px-4 py-3 bg-card rounded-b-xl">
            <button
              type="button"
              data-sound="begin"
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
    </OverlayPortal>
  )
}
