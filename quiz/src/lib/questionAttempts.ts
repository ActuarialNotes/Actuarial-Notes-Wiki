// Turns a learner's raw per-question response tally into the display state the
// question lists use to show, at a glance, whether a question has been tried
// and how it went. Every surface that lists questions (search, the concept
// question browser, the concept detail modal) reads this so the signal reads
// the same everywhere.
//
// Structural input type: `QuestionAttemptSummary` from `hooks/useQuestionAttempts`
// satisfies it, without lib having to depend on the hook.
export interface AttemptCounts {
  attempt_count: number
  correct_count: number
}

export type AttemptStatus =
  /** No recorded response yet. */
  | 'new'
  /** Every attempt was correct. */
  | 'correct'
  /** Some right, some wrong. */
  | 'mixed'
  /** Attempted, never yet correct. */
  | 'incorrect'

export interface AttemptDisplay {
  status: AttemptStatus
  attempts: number
  correct: number
  incorrect: number
  /** Compact chip text, e.g. "2✓ 1✗" — also the text-only fallback. */
  label: string
  /** Full sentence used for `title` / `aria-label`. */
  description: string
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`
}

/**
 * Normalizes a response tally into a display state.
 *
 * Counts are clamped defensively: a missing row, zero attempts, or nonsense
 * from the server (negative counts, more correct than attempts) all resolve to
 * a coherent state rather than rendering "-1 correct".
 */
export function summarizeAttempts(summary: AttemptCounts | null | undefined): AttemptDisplay {
  const attempts = Math.max(0, Math.floor(summary?.attempt_count ?? 0))
  const correct = Math.min(attempts, Math.max(0, Math.floor(summary?.correct_count ?? 0)))
  const incorrect = attempts - correct

  if (attempts === 0) {
    return {
      status: 'new',
      attempts: 0,
      correct: 0,
      incorrect: 0,
      label: 'Not attempted',
      description: 'Not attempted yet',
    }
  }

  const status: AttemptStatus = incorrect === 0 ? 'correct' : correct === 0 ? 'incorrect' : 'mixed'
  const label =
    status === 'correct' ? `${correct}✓`
    : status === 'incorrect' ? `${incorrect}✗`
    : `${correct}✓ ${incorrect}✗`

  const outcome =
    status === 'correct' ? 'all correct'
    : status === 'incorrect' ? 'never correct'
    : `${correct} correct, ${incorrect} incorrect`

  return {
    status,
    attempts,
    correct,
    incorrect,
    label,
    description: `Attempted ${plural(attempts, 'time')} — ${outcome}`,
  }
}

/** True once a question has any recorded response. */
export function isAttempted(summary: AttemptCounts | null | undefined): boolean {
  return summarizeAttempts(summary).attempts > 0
}

/** Roll-up of a whole list, for the "N attempted · N new" line above a question list. */
export interface AttemptTotals {
  total: number
  attempted: number
  unattempted: number
  correct: number
  incorrect: number
}

export function tallyAttempts(summaries: (AttemptCounts | null | undefined)[]): AttemptTotals {
  return summaries.reduce<AttemptTotals>(
    (acc, summary) => {
      const d = summarizeAttempts(summary)
      acc.total++
      if (d.attempts > 0) acc.attempted++
      else acc.unattempted++
      acc.correct += d.correct
      acc.incorrect += d.incorrect
      return acc
    },
    { total: 0, attempted: 0, unattempted: 0, correct: 0, incorrect: 0 },
  )
}
