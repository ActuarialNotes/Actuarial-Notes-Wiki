// A past paper's last result, kept in the browser (docs/redesign-spec.md
// §7a.3): when a whole sitting is finished as a Practice Exam, how many of its
// questions were correct, incorrect, partial and unanswered. The Papers screen
// draws it as a small bar in the answer colours. Nothing here is a score of
// record — the answers themselves are saved with the account as always.

import type { AnswerState } from './answerState'
import { normalizeSession } from './pastExams'

export const PAPER_RESULTS_KEY = 'actuarial_paper_results_v1'

export interface PaperResult {
  correct: number
  incorrect: number
  partial: number
  unanswered: number
  /** When the paper was finished, ISO. */
  at: string
}

export type PaperResults = Record<string, PaperResult>

/** A sitting's key: "Exam 5|2019|Spring". */
export function paperKey(exam: string, year: number, session?: string | null): string {
  return `${exam}|${year}|${normalizeSession(session) ?? ''}`
}

interface SatQuestion {
  exam: string
  year?: number | null
  session?: string | null
  originally_exam?: string | null
}

/**
 * The one sitting a finished practice exam was, or null. Every question must
 * be from the same exam's same paper, and there must be more than one: a
 * single question, a mix across sittings and a quiz are no paper's result.
 */
export function sittingOf(
  mode: string,
  questions: readonly SatQuestion[],
): { exam: string; year: number; session?: string } | null {
  if (mode !== 'mock-exam' || questions.length < 2) return null
  const first = questions[0]
  if (!first.year || first.originally_exam) return null
  const session = normalizeSession(first.session)
  for (const q of questions) {
    if (q.exam !== first.exam || q.year !== first.year || q.originally_exam) return null
    if (normalizeSession(q.session) !== session) return null
  }
  return { exam: first.exam, year: first.year, session }
}

/** The four counts of a finished paper's answer states. */
export function tallyStates(states: readonly AnswerState[], at: string): PaperResult {
  const result: PaperResult = { correct: 0, incorrect: 0, partial: 0, unanswered: 0, at }
  for (const s of states) result[s] += 1
  return result
}

function isCount(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0
}

/** The stored results, with anything malformed dropped. */
export function resultsFromStored(raw: string | null): PaperResults {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const out: PaperResults = {}
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const v = value as Partial<PaperResult> | null
      if (!v || !isCount(v.correct) || !isCount(v.incorrect) || !isCount(v.partial) || !isCount(v.unanswered)) continue
      if (typeof v.at !== 'string') continue
      if (v.correct + v.incorrect + v.partial + v.unanswered === 0) continue
      out[key] = { correct: v.correct, incorrect: v.incorrect, partial: v.partial, unanswered: v.unanswered, at: v.at }
    }
    return out
  } catch {
    return {}
  }
}

export function loadPaperResults(): PaperResults {
  try { return resultsFromStored(localStorage.getItem(PAPER_RESULTS_KEY)) } catch { return {} }
}

/** Keep a finished paper's result; a later sitting of the same paper replaces it. */
export function savePaperResult(key: string, result: PaperResult): void {
  try {
    const all = loadPaperResults()
    all[key] = result
    localStorage.setItem(PAPER_RESULTS_KEY, JSON.stringify(all))
  } catch { /* private window: the bar is simply absent */ }
}

/** "Last sat: 14 correct, 7 incorrect, 3 unanswered" — the bar, said. */
export function paperResultLabel(r: PaperResult): string {
  const parts = [
    `${r.correct} correct`,
    r.incorrect > 0 ? `${r.incorrect} incorrect` : '',
    r.partial > 0 ? `${r.partial} partial` : '',
    r.unanswered > 0 ? `${r.unanswered} unanswered` : '',
  ].filter(Boolean)
  return `Last sat: ${parts.join(', ')}`
}
