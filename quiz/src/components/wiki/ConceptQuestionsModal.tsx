import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Lock, Play, X } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { QuestionSearchRow, DifficultyDots } from '@/components/QuestionSearchRow'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { useCollect } from '@/hooks/useCollect'
import { useIsConceptUnlocked } from '@/hooks/useConceptUnlocked'

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
  /** Called (in addition to onClose) when the user actually starts a quiz from here —
   *  lets callers that nest this modal inside another dialog (e.g. CollectConceptModal)
   *  dismiss that outer dialog too, instead of leaving it stuck open behind the quiz. */
  onQuizStart?: () => void
}

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export function ConceptQuestionsModal({ conceptName, onClose, onQuizStart }: ConceptQuestionsModalProps) {
  const unlocked = useIsConceptUnlocked(conceptName)
  const openCollect = useCollect(s => s.open)
  const closeCollect = useCollect(s => s.close)
  const [pendingStart, setPendingStart] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [difficultyFilters, setDifficultyFilters] = useState<Set<string>>(new Set())
  const [conceptFilters, setConceptFilters] = useState<Set<string>>(new Set())

  useEffect(() => {
    // The question browser is always available so the user can preview and
    // pick questions before collecting — starting the quiz is what's gated
    // behind the collect prompt (see handleStartQuiz), not browsing.
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

  function beginQuiz() {
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(selectedQuestions.map(q => q.id)))
    } catch { /* ignore */ }
    onQuizStart?.()
    onClose()
    navigate('/quiz?selection=stored')
  }

  function handleStartQuiz() {
    if (selectedQuestions.length === 0) return
    // Quizzing is gated on collection: if the concept isn't collected yet,
    // surface the collect prompt first and remember that the user wanted to
    // start — the effect below carries them into the quiz once it's collected.
    if (!unlocked) {
      setPendingStart(true)
      openCollect({ kind: 'concept', name: conceptName })
      return
    }
    beginQuiz()
  }

  // Once a pending collect completes (concept becomes unlocked), close the
  // collect prompt and continue into the quiz the user asked to start.
  useEffect(() => {
    if (!pendingStart || !unlocked) return
    setPendingStart(false)
    closeCollect()
    beginQuiz()
    // beginQuiz is stable enough for this one-shot hand-off; deps kept minimal
    // to avoid re-running as selection state changes underneath.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingStart, unlocked])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Questions for ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-2xl flex flex-col my-8 mx-4 max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-12 shrink-0">
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
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
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
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Start Quiz button. When the concept isn't collected yet,
            the browser stays fully usable but starting the quiz routes through
            the collect prompt first (handleStartQuiz). */}
        {!loading && questions.length > 0 && (
          <div className="shrink-0 px-4 py-3 bg-card rounded-b-xl space-y-2">
            <button
              type="button"
              onClick={handleStartQuiz}
              disabled={selectedIds.size === 0}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {unlocked ? <Play className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {unlocked
                ? `Start Quiz (${selectedQuestions.length})`
                : `Collect to Start Quiz (${selectedQuestions.length})`}
            </button>
            {!unlocked && (
              <p className="text-center text-xs text-muted-foreground">
                Pass a quick comprehension check to collect {conceptName}, then your quiz starts automatically.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
