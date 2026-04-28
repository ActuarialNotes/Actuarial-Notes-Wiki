import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Loader2, X } from 'lucide-react'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question, Difficulty } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { LatexText } from '@/components/LatexText'
import { ExplanationPanel } from '@/components/ExplanationPanel'

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200',
}

function QuestionItem({ question }: { question: Question }) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="border rounded-lg p-4 space-y-2 hover:bg-accent/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2 min-w-0">
          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border shrink-0">
            {question.id}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full border bg-background shrink-0">
            {question.subtopic}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 capitalize ${DIFFICULTY_COLORS[question.difficulty]}`}>
            {question.difficulty}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className="text-sm text-muted-foreground leading-relaxed">
        {expanded ? (
          <LatexText>{question.stem}</LatexText>
        ) : (
          <LatexText>
            {question.stem.slice(0, 160) + (question.stem.length > 160 ? '…' : '')}
          </LatexText>
        )}
      </div>

      {expanded && (
        <div className="pt-2 space-y-1">
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

export function ConceptQuestionsModal({ conceptName, onClose }: ConceptQuestionsModalProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchAllQuestions()
      .then(raw => {
        if (cancelled) return
        const all = parseAllQuestions(raw)
        const filtered = all.filter(q =>
          q.wiki_link.some(link => {
            const ref = hrefToEntryRef(link)
            return ref?.name.toLowerCase() === conceptName.toLowerCase()
          })
        )
        setQuestions(filtered)
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

  const browseUrl = '/browse?concept=' + encodeURIComponent(conceptName)

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
          <Link
            to={browseUrl}
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 shrink-0 transition-colors"
            title="Open in Question Browser"
          >
            Open in browser <ExternalLink className="h-3 w-3" />
          </Link>
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
              <p className="text-xs text-muted-foreground">
                {questions.length} question{questions.length !== 1 ? 's' : ''} found
              </p>
              {questions.map(q => (
                <QuestionItem key={q.id} question={q} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
