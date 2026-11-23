/**
 * Answer states and their colours (docs/redesign-spec.md §2.1, R12; style
 * guide §13.3): green correct, red incorrect, amber partial, grey unanswered.
 *
 * These are the only hues a redesigned screen uses, and only where answers are
 * counted: progress segments, the feedback rows, results, Analytics. A piece
 * of a bar that hasn't been reached yet is not "unanswered"; it is the line
 * colour (`ANSWER_PENDING`).
 *
 * The values are the `--answer-*` tokens in `index.css`, one per theme.
 * `answerState.test.ts` holds each to 4.5:1 on the ground, which is what lets
 * `ANSWER_SOLID` put the ground colour on a fill as text.
 */

export type AnswerState = 'correct' | 'incorrect' | 'partial' | 'unanswered'

export const ANSWER_STATES: readonly AnswerState[] = ['correct', 'incorrect', 'partial', 'unanswered']

export const ANSWER_LABEL: Record<AnswerState, string> = {
  correct: 'Correct',
  incorrect: 'Incorrect',
  partial: 'Partial',
  unanswered: 'Unanswered',
}

/** A fill: a progress segment, a dot, a bar. */
export const ANSWER_FILL: Record<AnswerState, string> = {
  correct: 'bg-answer-correct',
  incorrect: 'bg-answer-incorrect',
  partial: 'bg-answer-partial',
  unanswered: 'bg-answer-unanswered',
}

/** Text or an icon in the state's colour. */
export const ANSWER_TEXT: Record<AnswerState, string> = {
  correct: 'text-answer-correct',
  incorrect: 'text-answer-incorrect',
  partial: 'text-answer-partial',
  unanswered: 'text-answer-unanswered',
}

/** A row outlined in the state's colour (the reader's own wrong answer). */
export const ANSWER_EDGE: Record<AnswerState, string> = {
  correct: 'border-[1.5px] border-answer-correct',
  incorrect: 'border-[1.5px] border-answer-incorrect',
  partial: 'border-[1.5px] border-answer-partial',
  unanswered: 'border-[1.5px] border-answer-unanswered',
}

/** A row filled with the state's colour, its words in the ground colour (the right answer). */
export const ANSWER_SOLID: Record<AnswerState, string> = {
  correct: 'bg-answer-correct text-ground',
  incorrect: 'bg-answer-incorrect text-ground',
  partial: 'bg-answer-partial text-ground',
  unanswered: 'bg-answer-unanswered text-ground',
}

/** A piece of a bar not reached yet: the line colour, never the unanswered grey. */
export const ANSWER_PENDING = 'bg-border'

/**
 * The state of one answered question from its credit, 0 to 1. A question
 * skipped or never reached has no credit to read and is `unanswered`.
 */
export function answerStateFromCredit(credit: number | null | undefined): AnswerState {
  if (credit === null || credit === undefined || Number.isNaN(credit)) return 'unanswered'
  if (credit >= 1) return 'correct'
  if (credit <= 0) return 'incorrect'
  return 'partial'
}
