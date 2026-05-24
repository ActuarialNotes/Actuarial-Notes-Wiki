import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Play, X } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question, Difficulty } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { LatexText } from '@/components/LatexText'
import { ExplanationPanel } from '@/components/ExplanationPanel'

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

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200',
}

function QuestionItem({
  question,
  selected,
  onToggle,
}: {
  question: Question
  selected: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div
      className={`border rounded-lg p-4 space-y-2 transition-colors cursor-pointer ${
        selected ? 'border-primary/60 bg-primary/5' : 'hover:bg-accent/30'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="mt-0.5 shrink-0">
          <div
            className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors ${
              selected
                ? 'bg-primary border-primary'
                : 'border-input bg-background'
            }`}
          >
            {selected && (
              <svg className="h-2.5 w-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 min-w-0">
            <span className="text-xs px-2 py-0.5 rounded-full border bg-background shrink-0">
              {question.topic}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 capitalize ${DIFFICULTY_COLORS[question.difficulty]}`}>
              {question.difficulty}
            </span>
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed mt-2">
            {expanded ? (
              <LatexText>{question.stem}</LatexText>
            ) : (
              <LatexText>
                {(() => { const w = question.stem.trim().split(/\s+/); return w.length <= 6 ? question.stem : w.slice(0, 6).join(' ') + '…' })()}
              </LatexText>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {expanded && (
        <div className="pt-2 space-y-1 pl-7" onClick={e => e.stopPropagation()}>
          {question.options.map(opt => {
            const isCorrect = showAnswer && opt.key === question.answer
            return (
              <div
                key={opt.key}
                className={`flex gap-2 text-sm rounded px-2 py-1 ${
                  isCorrect ? 'bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-200' : ''
                }`}
              >
                <span className="font-medium text-muted-foreground shrink-0">{opt.key})</span>
                <span><LatexText>{opt.text}</LatexText></span>
              </div>
            )
          })}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAnswer(v => !v)}
              className="text-xs px-3 py-1 rounded-md border border-input hover:bg-accent transition-colors"
            >
              {showAnswer ? 'Hide answer' : 'Show answer'}
            </button>
          </div>

          {showAnswer && (
            <ExplanationPanel
              explanation={question.explanation}
              wikiLinks={question.wiki_link}
              isCorrect
            />
          )}
        </div>
      )}
    </div>
  )
}

interface ConceptQuestionsModalProps {
  conceptName: string
  onClose: () => void
}

const DIFFICULTIES: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export function ConceptQuestionsModal({ conceptName, onClose }: ConceptQuestionsModalProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | ''>('')

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
    () => difficultyFilter ? questions.filter(q => q.difficulty === difficultyFilter) : questions,
    [questions, difficultyFilter],
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Questions for ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-2xl bg-card border rounded-xl shadow-2xl flex flex-col my-8">
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

        {/* Body */}
        <div className="p-4 space-y-3">
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
              {/* Difficulty filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDifficultyFilter(d.value)}
                    className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                      difficultyFilter === d.value
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Toolbar: select-all + count + start quiz */}
              <div className="flex items-center gap-3 py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    role="checkbox"
                    aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
                    tabIndex={0}
                    onClick={toggleSelectAll}
                    onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') toggleSelectAll() }}
                    className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      allSelected || someSelected
                        ? 'bg-primary border-primary'
                        : 'border-input bg-background'
                    }`}
                  >
                    {allSelected && (
                      <svg className="h-2.5 w-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    )}
                    {someSelected && (
                      <div className="h-0.5 w-2 bg-primary-foreground rounded" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {visibleQuestions.filter(q => selectedIds.has(q.id)).length} / {visibleQuestions.length} selected
                  </span>
                </label>

                <div className="flex-1" />

                <button
                  type="button"
                  onClick={handleStartQuiz}
                  disabled={selectedIds.size === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Play className="h-3 w-3" />
                  Start Quiz
                </button>
              </div>

              {visibleQuestions.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No {difficultyFilter} questions for this concept.
                </div>
              )}
              {visibleQuestions.map(q => (
                <QuestionItem
                  key={q.id}
                  question={q}
                  selected={selectedIds.has(q.id)}
                  onToggle={() => toggleQuestion(q.id)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
