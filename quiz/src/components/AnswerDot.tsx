import { cn } from '@/lib/utils'
import { ANSWER_FILL, ANSWER_LABEL, type AnswerState } from '@/lib/answerState'

/**
 * A dot in an answer state's colour (style guide §13.3): beside a count on the
 * results, or at the end of a missed question's row. Beside its own word the
 * dot is decoration; alone, it carries the state as its label.
 */
export function AnswerDot({
  state,
  decorative = false,
  className,
}: {
  state: AnswerState
  decorative?: boolean
  className?: string
}) {
  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : ANSWER_LABEL[state]}
      aria-hidden={decorative || undefined}
      className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', ANSWER_FILL[state], className)}
    />
  )
}
