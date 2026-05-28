import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { ConceptCoverageSection } from '@/components/ConceptCoverageSection'
import type { QuizSession, QuestionResponse } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'

interface Props {
  session: QuizSession
  isLoggedIn: boolean
  onClose: () => void
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; questions: Question[]; responses: Record<string, { chosen: string | null }> }

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export function SessionCompletionOverlay({ session, isLoggedIn, onClose }: Props) {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [responsesResult, rawFiles] = await Promise.all([
          supabase
            .from('question_responses')
            .select('*')
            .eq('session_id', session.id)
            .order('answered_at', { ascending: true }),
          fetchAllQuestions(),
        ])
        if (cancelled) return
        if (responsesResult.error) throw new Error(responsesResult.error.message)

        const questionMap = new Map(
          parseAllQuestions(rawFiles).map((q: Question) => [q.id, q])
        )
        const rows: QuestionResponse[] = responsesResult.data ?? []
        const questions = rows
          .map(r => questionMap.get(r.question_id))
          .filter((q): q is Question => q !== undefined)
        const responses: Record<string, { chosen: string | null }> = {}
        for (const r of rows) {
          responses[r.question_id] = { chosen: r.chosen_answer }
        }
        setLoadState({ status: 'done', questions, responses })
      } catch (err) {
        if (cancelled) return
        setLoadState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Failed to load session',
        })
      }
    }
    load()
    return () => { cancelled = true }
  }, [session.id])

  // Scroll overlay to top on mount
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  const pct = session.total_questions > 0
    ? Math.round((session.correct_count / session.total_questions) * 100)
    : 0

  return (
    <div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Quiz session details"
      ref={scrollRef}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b flex items-center gap-3 px-4 h-14 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors py-1 pr-3"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{session.topic ?? 'Quiz'}</p>
          <p className="text-xs text-muted-foreground">{formatDate(session.completed_at)}</p>
        </div>
        <span className="text-sm font-bold tabular-nums shrink-0">{pct}%</span>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto p-4 pb-12">
        {loadState.status === 'loading' && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm">Loading session…</span>
          </div>
        )}

        {loadState.status === 'error' && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center space-y-2">
            <p className="text-sm font-semibold text-destructive">Failed to load session</p>
            <p className="text-xs text-muted-foreground">{loadState.message}</p>
            <button
              type="button"
              onClick={() => { setLoadState({ status: 'loading' }) }}
              className="text-xs text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {loadState.status === 'done' && (
          <ConceptCoverageSection
            questions={loadState.questions}
            responses={loadState.responses}
            isLoggedIn={isLoggedIn}
            score={{
              mode: session.mode,
              percentage: pct,
              correctCount: session.correct_count,
              totalQuestions: session.total_questions,
              timeTakenSeconds: session.time_taken_seconds,
              gemsEarned: session.correct_count,
              isLoggedIn,
              onSignIn: () => {},
            }}
            selectedQuestion={selectedQuestion}
            onQuestionSelect={setSelectedQuestion}
          />
        )}
      </div>
    </div>
  )
}
