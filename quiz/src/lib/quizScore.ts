// How a finished quiz's score is printed — on the score card
// (components/ConceptCoverageSection.tsx) and the pinned header on /review —
// and which questions count as answered correctly there.

import { questionCredit, type Question, type SelfGrade } from '@/lib/parser'

// What a question is worth on the paper (its `points`), so a 2.5-point CAS
// question counts for five times a 0.5-point one. A question with no positive
// points is worth one.
export function questionPoints(q: Question): number {
  return Number.isFinite(q.points) && q.points > 0 ? q.points : 1
}

export interface QuizPoints {
  earned: number
  possible: number
  /** Earned over possible, as a whole percentage. */
  percentage: number
  /** True when every question is worth one point — the score is a count. */
  unitPoints: boolean
}

// A finished quiz's score, every question weighted by its points: each earns
// its credit (questionCredit) times what it is worth.
export function quizPoints(
  questions: Question[],
  responses: Record<string, { chosen: string | null } | undefined>,
  manualGrades: Record<string, SelfGrade>,
): QuizPoints {
  let earned = 0
  let possible = 0
  for (const q of questions) {
    const worth = questionPoints(q)
    possible += worth
    earned += worth * questionCredit(q, responses[q.id]?.chosen, manualGrades)
  }
  return {
    earned,
    possible,
    percentage: possible > 0 ? Math.round((earned / possible) * 100) : 0,
    unitPoints: questions.every(q => questionPoints(q) === 1),
  }
}

// Trim a fractional score to a tidy label: "2" not "2.0", "1.5", "0.33".
export function formatScore(n: number): string {
  return String(Math.round(n * 100) / 100)
}

// Score → headline colour. Shared so the pinned header on /review prints the
// same percentage in the same colour as the card it replaces.
export function scoreColorClass(percentage: number): string {
  return percentage >= 70 ? 'text-green-500'
    : percentage >= 50 ? 'text-amber-500'
    : 'text-red-500'
}

// True only when a question earned *full* credit — used by callers that filter
// "incorrect" questions (a partial still counts as not-fully-correct, so it
// stays in the review list). Partial-credit scoring lives in questionCredit.
export function effectiveOutcome(q: Question, chosen: string | null | undefined, manualGrades: Record<string, SelfGrade>): boolean {
  return questionCredit(q, chosen, manualGrades) >= 1
}
