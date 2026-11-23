/**
 * The session's progress bar (docs/redesign-spec.md §5.1, §5.3): one segment
 * per question, grouped by step when the quiz is today's session, each
 * coloured as its question is answered.
 *
 * While answers show as the quiz goes, an answered segment takes its answer's
 * colour (`lib/answerState.ts`). While they are held to the end, no segment
 * says whether an answer was right: an answered one is the text colour, one
 * passed with no answer is the unanswered grey, and the question on screen is
 * drawn taller, because the reader can go back and "the one I am on" has to
 * differ from "one I answered". The colours arrive on the results.
 *
 * Pure: the bar (`components/session/SessionProgress.tsx`) only draws this.
 */

import { answerStateFromCredit, type AnswerState } from './answerState'
import { questionCredit, type Question, type SelfGrade } from './parser'
import { ungradedWrittenParts } from './writtenAnswer'

/** A step of today's session, in the order they are done. */
export type StepKind = 'fix' | 'learn' | 'review'

/**
 * What one segment shows. The four answer states, plus `answered` (locked in,
 * its verdict not shown: answers held to the end, or a written part waiting
 * for its grade) and `pending` (not reached yet).
 */
export type SegmentState = AnswerState | 'answered' | 'pending'

export interface Segment {
  state: SegmentState
  /** The question on screen. */
  current: boolean
}

type Responses = Record<string, { chosen: string | null } | undefined>

/** A question's self-grades keyed by part label, read out of the store's `${id}__${label}` keys. */
export function partGradesOf(questionId: string, manualGrades: Record<string, SelfGrade>): Record<string, SelfGrade> {
  const prefix = `${questionId}__`
  const out: Record<string, SelfGrade> = {}
  for (const [key, grade] of Object.entries(manualGrades)) {
    if (key.startsWith(prefix)) out[key.slice(prefix.length)] = grade
  }
  return out
}

/** The answer state of a question that has been answered and, where it needs one, graded. */
export function answeredState(question: Question, chosen: string, manualGrades: Record<string, SelfGrade>): AnswerState {
  return answerStateFromCredit(questionCredit(question, chosen, manualGrades))
}

/**
 * The bar while the quiz is underway.
 *
 * `revealed` is whether answers show as the quiz goes. A question with no
 * answer counts as passed, and so unanswered, once the reader is on a later
 * question or has answered one.
 */
export function sessionSegments({
  questions,
  responses,
  manualGrades = {},
  currentIndex,
  revealed,
}: {
  questions: readonly Question[]
  responses: Responses
  manualGrades?: Record<string, SelfGrade>
  currentIndex: number
  revealed: boolean
}): Segment[] {
  let furthest = currentIndex
  questions.forEach((q, i) => {
    if (responses[q.id]?.chosen != null && i > furthest) furthest = i
  })
  return questions.map((q, i) => {
    const current = i === currentIndex
    const chosen = responses[q.id]?.chosen
    if (chosen == null) {
      return { state: !current && i < furthest ? 'unanswered' : 'pending', current }
    }
    if (!revealed) return { state: 'answered', current }
    // A written part with its grade still to give has no verdict yet.
    if (ungradedWrittenParts(q, partGradesOf(q.id, manualGrades)).length > 0) return { state: 'answered', current }
    return { state: answeredState(q, chosen, manualGrades), current }
  })
}

/** The bar on the results: every question in its final colour. */
export function finalSegments(
  questions: readonly Question[],
  responses: Responses,
  manualGrades: Record<string, SelfGrade> = {},
): AnswerState[] {
  return questions.map(q => {
    const chosen = responses[q.id]?.chosen
    return chosen == null ? 'unanswered' : answeredState(q, chosen, manualGrades)
  })
}

export type AnswerCounts = Record<AnswerState, number>

export function answerCounts(states: readonly AnswerState[]): AnswerCounts {
  const counts: AnswerCounts = { correct: 0, incorrect: 0, partial: 0, unanswered: 0 }
  for (const s of states) counts[s] += 1
  return counts
}

// ── Groups ───────────────────────────────────────────────────────────────────

export interface SegmentGroup {
  /** The step the run belongs to; null for a quiz that isn't today's session. */
  step: StepKind | null
  /** Index of its first question. */
  start: number
  length: number
}

/**
 * The runs the bar is cut into: one per step, in the order the questions come.
 * A quiz with no steps, or whose steps don't line up with its questions, is
 * one run.
 */
export function segmentGroups(total: number, steps: readonly StepKind[] | null | undefined): SegmentGroup[] {
  if (total <= 0) return []
  if (!steps || steps.length !== total) return [{ step: null, start: 0, length: total }]
  const groups: SegmentGroup[] = []
  steps.forEach((step, i) => {
    const last = groups[groups.length - 1]
    if (last && last.step === step) last.length += 1
    else groups.push({ step, start: i, length: 1 })
  })
  return groups
}

/** The gap between two segments, in pixels: 3 on a short quiz, less as the paper gets long. */
export function segmentGap(total: number): number {
  if (total <= 30) return 3
  if (total <= 60) return 2
  return 1
}

// ── Words ────────────────────────────────────────────────────────────────────

const STEP_NAME: Record<StepKind, string> = { fix: 'Fix mistakes', learn: 'Learn', review: 'Review' }

/**
 * What the bar says to a screen reader while the quiz is underway: the
 * question, and inside today's session its place in the step
 * ("Question 2 of 9. Fix mistakes: 2 of 3").
 */
export function progressLabel(currentIndex: number, total: number, steps?: readonly StepKind[] | null): string {
  const head = `Question ${currentIndex + 1} of ${total}`
  const group = segmentGroups(total, steps).find(g => currentIndex >= g.start && currentIndex < g.start + g.length)
  if (!group?.step) return head
  return `${head}. ${STEP_NAME[group.step]}: ${currentIndex - group.start + 1} of ${group.length}`
}

/** "6 correct, 2 incorrect, 1 unanswered": the finished bar, for a screen reader. */
export function countsLabel(counts: AnswerCounts): string {
  const parts = (['correct', 'incorrect', 'partial', 'unanswered'] as const)
    .filter(s => counts[s] > 0)
    .map(s => `${counts[s]} ${s}`)
  return parts.length > 0 ? parts.join(', ') : 'No questions'
}
