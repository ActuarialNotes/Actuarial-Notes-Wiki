import { ChevronDown, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { QuizSession, QuestionResponse } from '@/lib/supabase'
import type { Question } from '@/lib/parser'

export interface SessionDetail {
  loading: boolean
  error: string | null
  items: Array<{ response: QuestionResponse; question: Question | null }>
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export function formatTime(seconds: number | null): string {
  if (seconds === null || seconds < 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export function ScoreBar({ session }: { session: QuizSession }) {
  const pct = session.total_questions > 0
    ? Math.round((session.correct_count / session.total_questions) * 100)
    : 0
  const opacity = 0.2 + 0.8 * (pct / 100)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: `rgba(34, 197, 94, ${opacity})` }}
        />
      </div>
      <span className="text-sm font-medium w-10 text-right">{pct}%</span>
    </div>
  )
}

export function SessionRow({
  session,
  divider,
  expanded,
  detail,
  onToggle,
}: {
  session: QuizSession
  divider: boolean
  expanded: boolean
  detail: SessionDetail | undefined
  onToggle: () => void
}) {
  return (
    <div>
      {divider && <Separator className="my-3" />}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {session.topic && (
              <Badge variant="outline" className="text-xs">{session.topic}</Badge>
            )}
            <Badge variant="secondary" className="text-xs capitalize">{session.mode}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{session.correct_count}/{session.total_questions} correct</span>
            <span>{formatTime(session.time_taken_seconds)}</span>
            <span>{formatDate(session.completed_at)}</span>
            <button
              type="button"
              onClick={onToggle}
              className="p-0.5 hover:text-foreground transition-colors"
              aria-label={expanded ? 'Collapse session' : 'Expand session'}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
        <ScoreBar session={session} />

        {expanded && (
          <div className="pt-1 space-y-1">
            {!detail || detail.loading ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground py-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Loading questions…</span>
              </div>
            ) : detail.error ? (
              <p className="text-xs text-destructive">{detail.error}</p>
            ) : detail.items.length === 0 ? (
              <p className="text-xs text-muted-foreground">No question data found.</p>
            ) : (
              detail.items.map(({ response, question }) => (
                <div key={response.id} className="flex items-start gap-2 text-xs">
                  <span className={`shrink-0 font-bold ${response.is_correct ? 'text-green-500' : 'text-red-500'}`}>
                    {response.is_correct ? '✓' : '✗'}
                  </span>
                  <div className="min-w-0">
                    <span className="text-foreground/80">
                      {question
                        ? question.stem.length > 80
                          ? question.stem.slice(0, 80) + '…'
                          : question.stem
                        : response.question_id}
                    </span>
                    {!response.is_correct && (
                      <div className="text-muted-foreground mt-0.5">
                        <span>Chose: {response.chosen_answer ?? '—'}</span>
                        <span className="ml-2">Correct: {response.correct_answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
