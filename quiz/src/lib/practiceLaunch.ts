// "Practice this" and "Practice <objective>" (docs/redesign-spec.md §7): the
// quiz a concept page's foot, the reader's foot and an opened objective start.
// One short quiz, never the whole pool: the foot says how many questions
// there are, and Start on the Quiz tab is where a reader sizes one.

import { quizLaunchUrl, type LaunchSettings } from './quizBuilder'

/** How many questions a Practice button starts, when the pool holds more. */
export const PRACTICE_SIZE = 10

/** A quiz on one concept. `available` is how many questions are tagged with it. */
export function conceptPracticeUrl(concept: string, available: number, settings: LaunchSettings): string {
  return quizLaunchUrl({
    kind: 'concept',
    concept,
    levels: null,
    count: available > PRACTICE_SIZE ? PRACTICE_SIZE : undefined,
  }, settings)
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
