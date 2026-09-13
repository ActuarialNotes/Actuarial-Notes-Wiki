// Today's movement in the Exam Readiness Score — pure, deterministic, testable.
//
// The readiness card prints one number (`computeExamReadiness`, docs/exam-readiness.md),
// and a single number can't say whether a morning of quizzes moved it. This module is
// the memory that makes the arrow beside it possible: the score the day opened at, so
// the card can print **how far it has come today** rather than only where it stands.
//
// A mastery record carries no history — `state` and `correct_count` are current values,
// not a log — so yesterday's score cannot be recomputed from the data the app already
// holds. The only way to know where the day started is to have written it down, which
// is what `observeReadiness` does on every render that sees a settled score.
//
// The baseline rules, in the order they matter:
//
//   • **Same day** — the baseline set this morning stands. Every later observation only
//     updates the latest score, so the delta grows as the learner works.
//   • **The day after** — today opens at *yesterday's last seen score*, not at this
//     morning's. Mastery decays overnight (docs/concept-learning-progression.md), and a
//     score that slipped while the learner slept is exactly the thing a red arrow is for;
//     baselining on the first sight of today would silently swallow it.
//   • **A longer gap** — today opens at the current score. Four days of decay is not
//     "today", and attributing it to today would be a lie told in red. The day starts at
//     zero movement and the arrow appears as soon as the learner earns it.
//
// The delta is measured between the *rounded* scores, because those are the numbers on
// screen: an arrow that says +1 when the percentage hasn't visibly budged reads as a bug.
//
// No I/O and no React here — `hooks/useReadinessDelta.ts` persists it (localStorage, like
// the other per-device daily state in `lib/dailyProgressStore.ts`) and the readiness card
// renders it.

import { daysBetween } from '@/lib/streak'

/** What we remember about one exam's readiness score. */
export interface ReadinessMark {
  /** Local day key (`YYYY-MM-DD`) of the most recent observation — `localDayKey`. */
  day: string
  /** The most recent score seen on `day`, 0–100 and unrounded. */
  score: number
  /** The score today is measured against. See the baseline rules above. */
  baseline: number
}

/** Marks by exam_progress key (`P`, `FM`, `MAS-I`, …). */
export type ReadinessMarks = Record<string, ReadinessMark>

/**
 * Fold one sighting of `examKey`'s readiness score into the marks, returning the next
 * marks. `day` is the local day key the sighting happened on.
 *
 * Returns the *same* object when nothing changed, so a caller can skip a write and a
 * re-render on the overwhelmingly common case: the same score, seen again.
 */
export function observeReadiness(
  marks: ReadinessMarks,
  examKey: string,
  score: number,
  day: string,
): ReadinessMarks {
  const prev = marks[examKey]
  const next = nextMark(prev, score, day)
  if (prev && prev.day === next.day && prev.score === next.score && prev.baseline === next.baseline) {
    return marks
  }
  return { ...marks, [examKey]: next }
}

function nextMark(prev: ReadinessMark | undefined, score: number, day: string): ReadinessMark {
  if (!prev) return { day, score, baseline: score }
  if (prev.day === day) return { day, score, baseline: prev.baseline }
  // Yesterday's last sighting is today's starting line — overnight decay included.
  // Anything older is a gap we can't attribute to today, so today starts flat.
  const gap = daysBetween(prev.day, day)
  return { day, score, baseline: gap === 1 ? prev.score : score }
}

/**
 * How far `examKey`'s score has moved today, in whole percentage points — the number
 * beside the arrow. `0` when it hasn't moved, when the mark is from an earlier day
 * (nothing has been seen today yet), or when there is no mark at all.
 */
export function readinessDelta(marks: ReadinessMarks, examKey: string, day: string): number {
  const mark = marks[examKey]
  if (!mark || mark.day !== day) return 0
  return Math.round(mark.score) - Math.round(mark.baseline)
}

/** A stored blob back into marks, dropping anything that isn't one. */
export function sanitizeMarks(raw: unknown): ReadinessMarks {
  if (!raw || typeof raw !== 'object') return {}
  const out: ReadinessMarks = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!value || typeof value !== 'object') continue
    const { day, score, baseline } = value as Partial<ReadinessMark>
    if (typeof day !== 'string' || !day) continue
    if (typeof score !== 'number' || !Number.isFinite(score)) continue
    if (typeof baseline !== 'number' || !Number.isFinite(baseline)) continue
    out[key] = { day, score, baseline }
  }
  return out
}
