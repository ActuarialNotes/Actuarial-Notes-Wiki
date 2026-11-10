import { useState } from 'react'
import { X } from 'lucide-react'
import { useExamProgress } from '@/contexts/examProgress'
import { useExamOutcomes } from '@/hooks/useExamOutcomes'
import { EXAM_OUTCOMES, OUTCOME_LABELS, type ExamOutcome, type OutcomeAsk } from '@/lib/examOutcome'
import { STORE_EXAMS } from '@/lib/storeExams'
import { sittingVersionLabel } from '@/data/examSittings'
import { monthDay } from '@/lib/registrationNudge'
import { inkChip } from '@/components/ui/ink'

function examName(examId: string): string {
  return STORE_EXAMS.find(e => e.key === examId)?.name ?? examId
}

/** When the results came out, as far as anything published says. */
function resultsLine(ask: OutcomeAsk): string {
  const sitting = sittingVersionLabel(ask.sitting)
  return ask.basis === 'published'
    ? `Results for the ${sitting} sitting came out on ${monthDay(ask.resultsFrom)}.`
    : `Results for the ${sitting} sitting should be out by now.`
}

/**
 * "How did the exam go?" (roadmap L18, `lib/examOutcome.ts`): on the Dashboard,
 * once a sitting the reader's exam date fell in has its results out. Asked
 * once per sitting; nothing is recorded unless the reader picks an answer.
 * Lazy-loaded by the Dashboard, signed-in readers only.
 */
export default function ExamOutcomePrompt() {
  const { examRows } = useExamProgress()
  const { ask, answer, snooze, dismiss } = useExamOutcomes(examRows)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)
  const [thanked, setThanked] = useState<string | null>(null)

  if (thanked) {
    return (
      <div role="status" className="relative rounded-xl border border-border bg-card px-4 py-3 pr-10 text-sm">
        <p className="text-foreground">Thanks. Your answer about {thanked} is saved to your account.</p>
        <button
          type="button"
          onClick={() => setThanked(null)}
          aria-label="Close"
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
  if (!ask) return null

  const name = examName(ask.examId)

  async function pick(outcome: ExamOutcome) {
    if (!ask) return
    setSaving(true)
    setFailed(false)
    const ok = await answer(ask, outcome)
    setSaving(false)
    if (ok) setThanked(name)
    else setFailed(true)
  }

  return (
    <section
      aria-labelledby="exam-outcome-title"
      className="relative rounded-xl border border-border bg-card px-4 py-3 pr-10 text-sm"
    >
      <h2 id="exam-outcome-title" className="font-semibold text-foreground">How did {name} go?</h2>
      <p className="mt-1 text-muted-foreground">
        {resultsLine(ask)} Your answer is private to your account. It is only counted with
        everyone else's, to check whether exam readiness predicts passing.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {EXAM_OUTCOMES.map(outcome => (
          <button
            key={outcome}
            type="button"
            disabled={saving}
            onClick={() => void pick(outcome)}
            className={inkChip(false, 'border border-border text-foreground')}
          >
            {OUTCOME_LABELS[outcome]}
          </button>
        ))}
      </div>
      {failed && (
        <p role="alert" className="mt-2 text-destructive">Your answer couldn't be saved. Try again.</p>
      )}
      <button
        type="button"
        onClick={() => snooze(ask)}
        className="mt-3 text-muted-foreground underline underline-offset-2 hover:text-foreground"
      >
        No results yet
      </button>
      <button
        type="button"
        onClick={() => dismiss(ask)}
        aria-label="Don't ask about this sitting"
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </section>
  )
}
