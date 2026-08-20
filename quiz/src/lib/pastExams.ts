import { isFromAnotherExamsPaper, type Question } from './parser'
import { getPastExamSittings, type ExamSession, type PastExamSitting } from '@/data/pastExams'

// The read side of the past-exam shelf: merges the authored sitting catalogue
// (`data/pastExams.ts`) with the sittings the question bank actually holds, and
// hands the browser one row per sitting — available or not.
//
// Pure and bank-driven on purpose: a newly converted paper appears in the
// browser as soon as its questions land, whether or not the catalogue lists it.

export interface PastExamRow {
  /** Stable identity for React keys and selection: `"2019|Spring"`. */
  key: string
  year: number
  /** Normalized session, absent for a sitting the bank tags with a year only. */
  session?: ExamSession
  /** Display name, e.g. `"Spring 2019"` — or just the year when untagged. */
  label: string
  /** Questions from this sitting in the app's bank. `0` = nothing imported yet. */
  bankCount: number
  /** Questions on the real paper, when the catalogue records it. */
  officialQuestionCount?: number
  candidates?: number
  passRate?: number
  effectivePassRate?: number
  /** Whether this sitting can actually be sat in the app. */
  available: boolean
}

/** Session strings in question frontmatter aren't consistent — `Sp`, `spring`, `Spring`. */
export function normalizeSession(session?: string | null): ExamSession | undefined {
  const s = session?.trim().toLowerCase()
  if (s === 'spring' || s === 'sp') return 'Spring'
  if (s === 'fall' || s === 'fa' || s === 'autumn') return 'Fall'
  return undefined
}

/** `"Spring 2019"`, or the bare year for a sitting with no session. */
export function sittingLabel(year: number, session?: string | null): string {
  const normalized = normalizeSession(session)
  return normalized ? `${normalized} ${year}` : String(year)
}

function rowKey(year: number, session?: ExamSession): string {
  return `${year}|${session ?? ''}`
}

/** Fall comes after Spring in the same year, so it sorts first newest-first. */
function sessionRank(session?: ExamSession): number {
  if (session === 'Fall') return 0
  if (session === 'Spring') return 1
  return 2
}

/**
 * One row per past sitting of `exam`, newest first.
 *
 * Rows come from the union of the authored catalogue and the sittings present
 * in `questions` — the catalogue contributes the papers that exist but haven't
 * been imported (rendered greyed out), the bank contributes anything imported
 * ahead of the catalogue.
 *
 * The bank half is deliberately not "every question tagged with a year": a
 * question re-tagged onto this exam from another one carries the date of the
 * paper it was actually sat on, so it names a sitting of that *other* exam
 * (`isFromAnotherExamsPaper`). Letting one build a row invents a paper nobody
 * ever sat; letting one join a real row pads that paper with questions it
 * never held.
 */
export function buildPastExamRows(questions: Question[], exam: string): PastExamRow[] {
  const rows = new Map<string, PastExamRow>()

  const add = (year: number, session: ExamSession | undefined, sitting?: PastExamSitting) => {
    const key = rowKey(year, session)
    const existing = rows.get(key)
    if (existing) {
      // A catalogue entry arriving after a bank-derived row fills in its stats.
      if (sitting) {
        existing.officialQuestionCount ??= sitting.officialQuestionCount
        existing.candidates ??= sitting.candidates
        existing.passRate ??= sitting.passRate
        existing.effectivePassRate ??= sitting.effectivePassRate
      }
      return
    }
    rows.set(key, {
      key,
      year,
      session,
      label: sittingLabel(year, session),
      bankCount: 0,
      officialQuestionCount: sitting?.officialQuestionCount,
      candidates: sitting?.candidates,
      passRate: sitting?.passRate,
      effectivePassRate: sitting?.effectivePassRate,
      available: false,
    })
  }

  for (const sitting of getPastExamSittings(exam)) {
    add(sitting.year, sitting.session, sitting)
  }

  for (const q of questions) {
    if (q.exam !== exam || !q.year) continue
    if (isFromAnotherExamsPaper(q, exam)) continue
    const session = normalizeSession(q.session)
    add(q.year, session)
    const row = rows.get(rowKey(q.year, session))!
    row.bankCount += 1
    row.available = true
  }

  return [...rows.values()].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    return sessionRank(a.session) - sessionRank(b.session)
  })
}

/** A percentage for display: `40` → `"40%"`, `40.6` → `"40.6%"`, nothing → `null`. */
export function formatPassRate(rate?: number): string | null {
  if (rate === undefined || Number.isNaN(rate)) return null
  return `${Number.isInteger(rate) ? rate : rate.toFixed(1)}%`
}

/** True when any row in the shelf carries published statistics worth a column. */
export function hasPublishedStats(rows: PastExamRow[]): boolean {
  return rows.some(r => r.effectivePassRate !== undefined || r.passRate !== undefined)
}
