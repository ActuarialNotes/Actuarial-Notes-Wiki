// "Practice" and "Practice <objective>" (docs/redesign-spec.md §7). A
// concept's Practice (a concept page's foot, the reader's foot, a flashcard, a
// tool) opens the one search on the concept's questions, where the reader
// picks the questions or how many to draw. An opened objective's starts one
// short quiz on its concepts.

import { conceptLabel } from './questionFilters'
import { quizLaunchUrl, type LaunchSettings } from './quizBuilder'

/** How many questions a Practice button starts, when the pool holds more. */
export const PRACTICE_SIZE = 10

/**
 * One concept's questions on the one search's Questions tab
 * (lib/oneSearch.ts). The Concepts filter names a concept the way
 * `conceptLabel` does, so the name is written that way to tick its option.
 */
export function conceptPracticeUrl(concept: string): string {
  const params = new URLSearchParams({ tab: 'questions', concept: conceptLabel(concept) })
  return `/search?${params.toString()}`
}

/** A quiz on one learning objective's concepts, from the exam's own bank. */
export function objectivePracticeUrl(
  exam: string,
  concepts: readonly string[],
  available: number,
  settings: LaunchSettings,
): string {
  return quizLaunchUrl({
    kind: 'exam',
    exam,
    concepts,
    levels: null,
    count: Math.min(available, PRACTICE_SIZE),
  }, settings)
}

/** "152 questions", "1 question". */
export function questionCountLabel(n: number): string {
  return `${n.toLocaleString('en-US')} ${n === 1 ? 'question' : 'questions'}`
}
