/**
 * Which step of today's session each question of its quiz belongs to
 * (docs/redesign-spec.md §5.1): the session's progress bar is grouped Fix
 * mistakes, Learn, Review, so the quiz has to ask its questions in that order
 * and know where each group ends.
 *
 * Today's Start hands the quiz builder the misses to fix and the concepts to
 * learn and review (`storeSessionMistakes`). The builder picks the questions,
 * `sessionQuizSteps` puts them in step order, and the map is left in
 * sessionStorage beside the id list the quiz page reads. The quiz page applies
 * it only when the map names exactly the questions it drew, so a later quiz on
 * other questions is never grouped by a stale map.
 */

import type { StepKind } from './sessionProgress'
import { conceptKey } from './similarQuestion'

export type QuizSteps = Record<string, StepKind>

const ORDER: Record<StepKind, number> = { fix: 0, learn: 1, review: 2 }

/**
 * The session's questions in step order, and each one's step. A missed
 * question is Fix; a covering question tagged with a Learn concept is Learn;
 * the rest are Review. An id appears once, in the first step that claims it.
 */
export function sessionQuizSteps(
  fixIds: readonly string[],
  cover: readonly { id: string; wiki_link: readonly string[] }[],
  learnConcepts: readonly string[],
): { ids: string[]; steps: QuizSteps } {
  const learn = new Set(learnConcepts.map(c => c.trim().toLowerCase()))
  const steps: QuizSteps = {}
  for (const id of fixIds) steps[id] ??= 'fix'
  for (const q of cover) {
    steps[q.id] ??= q.wiki_link.some(link => learn.has(conceptKey(link))) ? 'learn' : 'review'
  }
  // A stable sort: within a step the questions keep the order they were given in.
  const ids = Object.keys(steps).sort((a, b) => ORDER[steps[a]] - ORDER[steps[b]])
  return { ids, steps }
}

/**
 * A drawn quiz put in step order. Null unless the map names exactly these
 * questions; within a step the draw's own (shuffled) order is kept.
 */
export function orderBySteps<Q extends { id: string }>(
  questions: readonly Q[],
  steps: QuizSteps | null,
): { questions: Q[]; steps: StepKind[] } | null {
  if (!steps || questions.length === 0) return null
  if (Object.keys(steps).length !== questions.length) return null
  if (!questions.every(q => steps[q.id] !== undefined)) return null
  const ordered = questions
    .map((q, i) => ({ q, i }))
    .sort((a, b) => ORDER[steps[a.q.id]] - ORDER[steps[b.q.id]] || a.i - b.i)
    .map(x => x.q)
  return { questions: ordered, steps: ordered.map(q => steps[q.id]) }
}

// ── The hand-off ─────────────────────────────────────────────────────────────

export const QUIZ_STEPS_KEY = 'actuarial_quiz_steps'

function isStep(value: unknown): value is StepKind {
  return value === 'fix' || value === 'learn' || value === 'review'
}

export function stepsFromStored(raw: string | null): QuizSteps | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    const out: QuizSteps = {}
    for (const [id, step] of Object.entries(parsed as Record<string, unknown>)) {
      if (!isStep(step)) return null
      out[id] = step
    }
    return Object.keys(out).length > 0 ? out : null
  } catch {
    return null
  }
}

/** Leaves the session's steps for the quiz page; null clears them. */
export function storeQuizSteps(steps: QuizSteps | null): void {
  try {
    if (steps && Object.keys(steps).length > 0) sessionStorage.setItem(QUIZ_STEPS_KEY, JSON.stringify(steps))
    else sessionStorage.removeItem(QUIZ_STEPS_KEY)
  } catch { /* private window */ }
}

export function readQuizSteps(): QuizSteps | null {
  try {
    return stepsFromStored(sessionStorage.getItem(QUIZ_STEPS_KEY))
  } catch {
    return null
  }
}
