// Words on a written part's grading (docs/redesign-spec.md §5.2).

import { formatScore } from './quizScore'

/** What a grade gives of `points`: "1 point", "½ point", "0.63 points", "0". */
export function gradePoints(points: number, share: number): string {
  const value = points * share
  if (value === 0) return '0'
  if (value === 0.5) return '½ point'
  if (value === 0.25) return '¼ point'
  return `${formatScore(value)} ${value === 1 ? 'point' : 'points'}`
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

/** "any two": how many of the sample's points the part asks for. */
export function askedPhrase(asked: number | null | undefined): string | null {
  if (!asked || asked < 1) return null
  return `any ${NUMBER_WORDS[asked] ?? asked}`
}
