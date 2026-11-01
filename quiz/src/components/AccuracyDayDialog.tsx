import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, X } from 'lucide-react'
import type { Question } from '@/lib/parser'
import { accuracyPercent, dayQuestions, type AccuracyDay } from '@/lib/accuracyTrend'
import { monthDay } from '@/lib/registrationNudge'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { Button } from '@/components/ui/button'
import { dialogOpenOver } from '@/lib/layeredDialog'
import { useSoundOnMount } from '@/hooks/useSoundEffects'

/**
 * One point of the accuracy chart, opened: the questions answered that day,
 * each with how it went that day, expandable to its answer and explanation —
 * and the lot as a quiz to try again.
 */
export function AccuracyDayDialog({ day, questionsById, onClose }: {
  day: AccuracyDay
  questionsById: ReadonlyMap<string, Question>
  onClose: () => void
}) {
  useSoundOnMount('open')
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !dialogOpenOver(dialogRef.current)) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // A response can outlive its question (renamed or dropped from the bank).
  const rows = useMemo(
    () => dayQuestions(day).flatMap(t => {
      const question = questionsById.get(t.questionId)
      return question ? [{ question, tally: t }] : []
    }),
    [day, questionsById],
  )

  const practise = () => {
    onClose()
    navigate(`/quiz?ids=${rows.map(r => encodeURIComponent(r.question.id)).join(',')}`)
  }

  return (
    <OverlayPortal>
      <div
        ref={dialogRef}
        className="fixed inset-0 z-[130] flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto paper-scrim"
        role="dialog"
        aria-modal="true"
        aria-label={`Questions answered on ${monthDay(day.day)}`}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-2xl flex flex-col my-8 mx-4 max-h-[calc(100vh-4rem)]">
          <div className="flex items-center gap-3 px-4 pt-3 pb-1 shrink-0">
            <div className="flex-1 min-w-0">
              <h2 className="truncate font-semibold text-lg">{monthDay(day.day)}</h2>
              <p className="text-xs text-muted-foreground tabular-nums">
                {day.correct} of {day.answered} right ({accuracyPercent(day)}%)
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-1 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {rows.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                The questions from this day are no longer in the question bank.
              </p>
            ) : (
              <div className="rounded-lg bg-muted/30 divide-y divide-border/60">
                {rows.map(({ question, tally }) => (
                  <QuestionSearchRow
                    key={question.id}
                    question={question}
                    query=""
                    attemptSummary={{ attempt_count: tally.answered, correct_count: tally.correct }}
                    attemptsTracked
                  />
                ))}
              </div>
            )}
          </div>

          {rows.length > 0 && (
            <div className="flex justify-end px-4 pb-4 pt-1 shrink-0">
              <Button onClick={practise}>
                <Play className="h-4 w-4" aria-hidden="true" />
                {rows.length === 1 ? 'Try it again' : `Try these ${rows.length} again`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </OverlayPortal>
  )
}
