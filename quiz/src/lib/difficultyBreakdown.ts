// A finished quiz's score **by difficulty** — the results screen's line of
// "Easy 1/1 · Hard 2/2" under the score, and the sentence that goes with a
// perfect quiz on hard questions.
//
// A reader who scored 3/3 assumed it was a fluke on easy questions, and only
// found out by opening each question in the review that all three were rated
// Hard. The difficulty is hidden while the quiz is live (`QuestionCard`'s
// `showMeta`) so it can't hint at the answer; once the quiz is over it is the
// most useful thing we can tell them about their score.

import type { Difficulty, Question } from './parser'
import { DIFFICULTY_ORDER } from './accuracyTrend'

export interface DifficultyScore {
  difficulty: Difficulty
  /** Questions answered for full credit. */
  correct: number
  total: number
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

/** One entry per difficulty the quiz held, easiest first. `correct[i]` is question i's outcome. */
export function scoreByDifficulty(questions: readonly Question[], correct: readonly boolean[]): DifficultyScore[] {
  const tally = new Map<Difficulty, DifficultyScore>()
  questions.forEach((q, i) => {
    const d = q.difficulty
    if (!DIFFICULTY_ORDER.includes(d)) return
    const entry = tally.get(d) ?? { difficulty: d, correct: 0, total: 0 }
    entry.total++
    if (correct[i]) entry.correct++
    tally.set(d, entry)
  })
  return DIFFICULTY_ORDER.flatMap(d => tally.get(d) ?? [])
}

/**
 * A sentence for a quiz worth pointing out: every question right and some of
 * them hard. Null otherwise — the per-difficulty line says the rest.
 */
export function difficultyHeadline(scores: readonly DifficultyScore[]): string | null {
  const total = scores.reduce((n, s) => n + s.total, 0)
  const perfect = total > 0 && scores.every(s => s.correct === s.total)
  const hard = scores.find(s => s.difficulty === 'hard')
  if (!perfect || !hard) return null
  if (hard.total === total) {
    return total === 1 ? 'It was rated Hard.' : total === 2 ? 'Both were rated Hard.' : `All ${total} were rated Hard.`
  }
  return `${hard.total} of the ${total} ${hard.total === 1 ? 'was' : 'were'} rated Hard.`
}
