import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckMark } from '@/components/CheckMark'
import { QuestionCard } from '@/components/QuestionCard'
import { NavProgressBar } from '@/components/NavProgressBar'
import { gradingProgress, type GradingProgress } from '@/lib/writtenAnswer'
import { cn } from '@/lib/utils'
import type { Question, SelfGrade } from '@/lib/parser'

interface SelfGradeScreenProps {
  /** The quiz's questions with written parts, in quiz order. */
  questions: Question[]
  /** Each question's number in the whole quiz, by id — "Q12" means the twelfth one sat. */
  numbers: Record<string, number>
  /** The reader's answers, by question id. */
  responses: Record<string, { chosen: string | null } | undefined>
  /** Grades given so far, keyed `${questionId}__${partLabel}`. */
  grades: Record<string, SelfGrade>
  onGrade: (questionId: string, partLabel: string, grade: SelfGrade) => void
  onBack: () => void
  onSubmit: () => void
  submitLabel: string
  isSubmitting: boolean
  submitError: string | null
}

function gradesFor(questionId: string, grades: Record<string, SelfGrade>): Record<string, SelfGrade> {
  const prefix = `${questionId}__`
  const out: Record<string, SelfGrade> = {}
  for (const [key, grade] of Object.entries(grades)) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = grade
  }
  return out
}

function chipLabel(n: number, p: GradingProgress): string {
  if (p.state === 'done') return `Question ${n}, graded`
  return `Question ${n}, ${p.graded} of ${p.total} parts graded`
}

/**
 * The end of a practice exam run with answers held back: every written part is
 * marked against its sample answer before the results. One question at a
 * time, the way it was sat — a list of every question with its sample answers
 * and examiner's reports open runs to dozens of screens on a phone, with
 * nothing to say where a question starts or which ones are still to grade.
 *
 * The bar along the top is both: a chip per question, filled once all its
 * parts are graded, half-filled while some are, tapped to go there. Next walks
 * the questions in order; on the last one it submits.
 */
export function SelfGradeScreen({
  questions,
  numbers,
  responses,
  grades,
  onGrade,
  onBack,
  onSubmit,
  submitLabel,
  isSubmitting,
  submitError,
}: SelfGradeScreenProps) {
  const [index, setIndex] = useState(0)
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mounted = useRef(false)

  const progress = questions.map(q => gradingProgress(q, gradesFor(q.id, grades)))
  const totalParts = progress.reduce((n, p) => n + p.total, 0)
  const gradedParts = progress.reduce((n, p) => n + p.graded, 0)
  const ungradedQuestions = progress.filter(p => p.state !== 'done').length

  const current = questions[index]
  const isLast = index === questions.length - 1
  const nextUngraded = progress.findIndex((p, i) => i > index && p.state !== 'done')
  const firstUngraded = progress.findIndex(p => p.state !== 'done')

  // A new question starts at its top, and its chip is brought into view in the
  // bar — a sixty-question paper's bar scrolls sideways.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    window.scrollTo({ top: 0 })
    chipRefs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  const go = (i: number) => setIndex(Math.max(0, Math.min(questions.length - 1, i)))

  if (!current) return null
  const currentGrades = gradesFor(current.id, grades)

  return (
    <>
      {/* ── Question bar ─────────────────────────────────────────────
          Sticky under the nav chrome (the fixed top bar below lg), so where
          you are and what is left stay on screen however long a sample
          answer runs. */}
      <div className="sticky top-14 lg:top-0 z-20 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-2 space-y-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to quiz"
              className="-ml-1 rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="flex-1 min-w-0 truncate text-base font-semibold">Self-grade</h2>
            <span className="shrink-0 text-sm tabular-nums text-muted-foreground" aria-live="polite">
              {gradedParts}/{totalParts} parts graded
            </span>
          </div>
          <div
            role="tablist"
            aria-label="Questions to grade"
            className="-mx-4 sm:-mx-6 flex gap-1.5 overflow-x-auto px-4 sm:px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {questions.map((q, i) => {
              const p = progress[i]
              const n = numbers[q.id] ?? i + 1
              const active = i === index
              return (
                <button
                  key={q.id}
                  ref={el => { chipRefs.current[i] = el }}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={chipLabel(n, p)}
                  onClick={() => go(i)}
                  className={cn(
                    'relative flex h-9 min-w-[2.75rem] shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-sm font-semibold tabular-nums transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    p.state === 'done' && 'bg-green-600/15 text-green-700 dark:text-green-400',
                    p.state === 'partial' && 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
                    p.state === 'none' && 'bg-muted text-muted-foreground',
                    active && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
                  )}
                >
                  {p.state === 'done' && <CheckMark className="h-3.5 w-3.5" />}
                  Q{n}
                  {p.state === 'partial' && (
                    <span className="text-[11px] font-medium opacity-80">{p.graded}/{p.total}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <NavProgressBar
          current={index + 1}
          total={questions.length}
          label="Question"
          onScrub={pos => go(pos - 1)}
          formatValue={pos => `Q${numbers[questions[pos - 1]?.id] ?? pos}`}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        <p className="text-sm font-medium text-muted-foreground">
          Question {numbers[current.id] ?? index + 1}
          <span className="ml-2 tabular-nums">({index + 1} of {questions.length} to grade)</span>
        </p>

        <QuestionCard
          key={current.id}
          question={current}
          selectedAnswer={responses[current.id]?.chosen ?? null}
          onAnswer={() => {}}
          showExplanation={true}
          isLocked={true}
          showMeta={true}
          essaySelfGrades={currentGrades}
          onEssaySelfGrade={(partLabel, grade) => onGrade(current.id, partLabel, grade)}
        />

        {submitError && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        {/* ── Footer ───────────────────────────────────────────────── */}
        <div className="space-y-3 pt-2 pb-8">
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" size="lg" onClick={() => go(index - 1)} disabled={index === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            {isLast ? (
              <Button
                onClick={onSubmit}
                size="lg"
                disabled={isSubmitting}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {submitLabel}
              </Button>
            ) : (
              <Button
                onClick={() => go(index + 1)}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
          {/* Skipping ahead: to the next question still to grade, or — once
              there is none after this one — back to the first that is. On the
              last question, a note that the submit leaves some ungraded. */}
          {ungradedQuestions > 0 && (
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm">
              {isLast && (
                <span className="text-muted-foreground">
                  {ungradedQuestions} question{ungradedQuestions !== 1 ? 's' : ''} not fully graded
                </span>
              )}
              {(nextUngraded >= 0 || (firstUngraded >= 0 && firstUngraded !== index)) && (
                <button
                  type="button"
                  onClick={() => go(nextUngraded >= 0 ? nextUngraded : firstUngraded)}
                  className="font-medium text-primary hover:underline"
                >
                  Next ungraded: Q{numbers[questions[nextUngraded >= 0 ? nextUngraded : firstUngraded].id]}
                </button>
              )}
            </div>
          )}
          {!isLast && ungradedQuestions === 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline disabled:opacity-50"
              >
                {submitLabel} now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
