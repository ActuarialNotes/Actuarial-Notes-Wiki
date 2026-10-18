// How a finished quiz's score is printed — on the score card
// (components/ConceptCoverageSection.tsx) and the pinned header on /review —
// and which questions count as answered correctly there.

import { questionCredit, type Question, type SelfGrade } from '@/lib/parser'

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
