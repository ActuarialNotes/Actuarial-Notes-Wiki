import { Check, X } from 'lucide-react'
import { summarizeAttempts, type AttemptCounts } from '@/lib/questionAttempts'

// The one chip that says whether a question has been tried and how it went.
// Used by every list that renders questions so the signal is identical
// wherever a learner meets it: green ✓ with the number of successful attempts,
// red ✗ with the number of unsuccessful ones, both when the history is mixed.

const CHIP = 'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border shrink-0 tabular-nums'

const STATUS_CLASS = {
  new: 'bg-background text-muted-foreground border-input border-dashed',
  correct: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  incorrect: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  // Mixed stays neutral so the two coloured counts inside it carry the meaning.
  mixed: 'bg-background text-muted-foreground border-input',
} as const

interface QuestionAttemptBadgeProps {
  summary: AttemptCounts | null | undefined
  /** Render a muted "Not attempted" chip for untouched questions (default) —
   *  set false where the surface is already only showing new questions. */
  showNew?: boolean
  className?: string
}

export function QuestionAttemptBadge({ summary, showNew = true, className = '' }: QuestionAttemptBadgeProps) {
  const d = summarizeAttempts(summary)
  if (d.status === 'new' && !showNew) return null

  return (
    <span
      title={d.description}
      aria-label={d.description}
      className={`${CHIP} ${STATUS_CLASS[d.status]} ${className}`}
    >
      {d.status === 'new' && 'Not attempted'}

      {d.status === 'correct' && (
        <>
          <Check className="h-3 w-3" aria-hidden="true" />
          {d.correct}
        </>
      )}

      {d.status === 'incorrect' && (
        <>
          <X className="h-3 w-3" aria-hidden="true" />
          {d.incorrect}
        </>
      )}

      {d.status === 'mixed' && (
        <>
          <span className="inline-flex items-center gap-0.5 text-green-600 dark:text-green-400">
            <Check className="h-3 w-3" aria-hidden="true" />
            {d.correct}
          </span>
          <span className="inline-flex items-center gap-0.5 text-red-600 dark:text-red-400">
            <X className="h-3 w-3" aria-hidden="true" />
            {d.incorrect}
          </span>
        </>
      )}
    </span>
  )
}
