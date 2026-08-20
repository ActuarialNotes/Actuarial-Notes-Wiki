import type { Question } from './parser'

/**
 * A pending (typed but not yet confirmed) answer, tagged with the question it
 * was entered for.
 *
 * The quiz keeps the in-progress answer in React state and clears it when the
 * question changes. Clearing it in an effect is a frame too late: the render
 * that first shows question N+1 still carries question N's pending answer, and
 * `QuestionCard` seeds its per-part answer state from exactly that prop on the
 * same commit — so the previous question's entry sticks in the textbox. Tagging
 * the pending answer with its question makes the staleness impossible to
 * observe: it is read back only for the question it belongs to.
 */
export interface PendingAnswer {
  questionId: string
  value: string
}

/** The pending answer for `question`, or null if it belongs to another one. */
export function pendingAnswerFor(
  pending: PendingAnswer | null,
  question: Pick<Question, 'id'> | undefined | null,
): string | null {
  if (!pending || !question) return null
  return pending.questionId === question.id ? pending.value : null
}

/** Tag `value` as the pending answer for `question` (null clears it). */
export function tagPendingAnswer(
  question: Pick<Question, 'id'> | undefined | null,
  value: string | null,
): PendingAnswer | null {
  if (!question || value === null) return null
  return { questionId: question.id, value }
}
