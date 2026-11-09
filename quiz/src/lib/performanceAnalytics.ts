// **Performance analytics** — the Dashboard's Analytics section, beyond the
// accuracy card (`lib/accuracyTrend.ts`). Two readings of the same answers the
// card reads from `question_responses`, over the span the section picks:
//
// - **Where points are leaking** (`sectionLeaks`): each syllabus section's
//   accuracy, weighed by the section's exam weight. A section worth a quarter
//   of the paper answered at 60% costs ten marks in a hundred; one worth 5% at
//   the same rate costs two. The marks are the reader's own rate times the
//   syllabus's own weight — nothing estimated beyond "at this rate".
// - **Pacing** (`pacing`): the median time a question (or, on a paper marked
//   by the point, a point) took, against what the real sitting allows
//   (`lib/quizTiming.ts`, transcribed from each exam's format guide). The
//   median, because a practice clock also counts the time a reader left the
//   page mid-question.
//
// Pure: rows and questions in, figures out. Which section a question belongs
// to is read off its `wiki_link` concepts and the exam page's own lists of
// concepts under each learning objective — a question tagged with concepts in
// two sections counts in both.

import type { Difficulty, Question } from './parser'
import type { WikiExamSyllabus } from './wikiParser'
import type { AnswerRow, Tally } from './accuracyTrend'
import { DIFFICULTY_ORDER, MIN_TOPIC_ANSWERS, dayDiff } from './accuracyTrend'
import { parseSectionWeight } from './readiness'
import { paceForExam, pointsForPace, secondsPerUnit, type ExamPace } from './quizTiming'
import { localDayKey } from './streak'

export interface SpanOptions {
  span: number
  dayOf?: (iso: string) => string
}

/** The rows answered inside the last `span` days, today included. */
export function rowsInSpan(rows: readonly AnswerRow[], today: string, { span, dayOf }: SpanOptions): AnswerRow[] {
  const day = dayOf ?? ((iso: string) => localDayKey(new Date(iso)))
  return rows.filter(r => {
    const ago = dayDiff(day(r.answered_at), today)
    return ago >= 0 && ago < span
  })
}

/** "Concepts/Bayes+Theorem" → "bayes theorem": the key a syllabus concept is matched on. */
export function linkConceptKey(link: string): string {
  const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
  return (clean.split('/').filter(Boolean).pop() ?? '').toLowerCase()
}

// ── Where points are leaking ────────────────────────────────────────────────

export interface SectionLeak extends Tally {
  name: string
  /** The section's share of the paper, 0–100 (its weight over every section's). */
  share: number
  /** Marks in a hundred lost here at the reader's rate; null until the section has enough answers. */
  marksLost: number | null
  /** The section's concept names, for a quiz on it. */
  concepts: string[]
}

/**
 * Each syllabus section with what this span's answers say about it, the
 * costliest first: sections judged (enough answers) by marks lost, then the
 * sections not yet judged by their share of the paper — an unpractised 25%
 * section is the next biggest unknown.
 */
export function sectionLeaks(
  rows: readonly AnswerRow[],
  questionsById: ReadonlyMap<string, Pick<Question, 'wiki_link'>>,
  syllabus: Pick<WikiExamSyllabus, 'topics'>,
): SectionLeak[] {
  const weights = syllabus.topics.map(t => parseSectionWeight(t.weight))
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  const sectionsOf = new Map<string, number[]>()
  syllabus.topics.forEach((t, i) => {
    for (const c of t.concepts) {
      const key = c.name.toLowerCase()
      const list = sectionsOf.get(key) ?? []
      if (!list.includes(i)) list.push(i)
      sectionsOf.set(key, list)
    }
  })

  const tallies: Tally[] = syllabus.topics.map(() => ({ answered: 0, correct: 0 }))
  for (const row of rows) {
    const q = questionsById.get(row.question_id)
    if (!q) continue
    const hit = new Set<number>()
    for (const link of q.wiki_link) for (const i of sectionsOf.get(linkConceptKey(link)) ?? []) hit.add(i)
    for (const i of hit) {
      tallies[i].answered++
      if (row.is_correct) tallies[i].correct++
    }
  }

  const leaks = syllabus.topics.map((t, i): SectionLeak => {
    const share = totalWeight > 0 ? (100 * weights[i]) / totalWeight : 0
    const tally = tallies[i]
    const judged = tally.answered >= MIN_TOPIC_ANSWERS
    return {
      name: t.name,
      share,
      ...tally,
      marksLost: judged ? share * (1 - tally.correct / tally.answered) : null,
      concepts: t.concepts.map(c => c.name),
    }
  })
  return leaks.sort((a, b) =>
    (a.marksLost === null ? 1 : 0) - (b.marksLost === null ? 1 : 0)
    || (b.marksLost ?? b.share) - (a.marksLost ?? a.share)
    || a.name.localeCompare(b.name))
}

// ── Pacing ──────────────────────────────────────────────────────────────────

/** Timings over this are set aside: a reader who left mid-question, not a pace. */
export const MAX_TIMING_SECONDS = 60 * 60

/** Fewest timed answers before a pace is read. */
export const MIN_TIMED_ANSWERS = 5

export interface PaceReading {
  /** Timed answers it rests on. */
  answered: number
  /** Median seconds a question (or point) took; null with too few timed answers. */
  median: number | null
}

export interface PacingResult {
  pace: ExamPace
  /** Seconds the sitting allows a question (or point). */
  allowed: number
  overall: PaceReading
  byDifficulty: Record<Difficulty, PaceReading>
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const s = [...values].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2
}

function reading(values: number[]): PaceReading {
  return { answered: values.length, median: values.length >= MIN_TIMED_ANSWERS ? median(values) : null }
}

/**
 * How fast this span's answers came, against the exam's pace — null for an exam
 * with no pace on file, rather than an invented one.
 */
export function pacing(
  rows: readonly AnswerRow[],
  questionsById: ReadonlyMap<string, Pick<Question, 'difficulty' | 'points'>>,
  exam: string,
): PacingResult | null {
  const pace = paceForExam(exam)
  if (!pace) return null
  const all: number[] = []
  const by: Record<Difficulty, number[]> = { easy: [], medium: [], hard: [] }
  for (const row of rows) {
    const q = questionsById.get(row.question_id)
    const t = row.time_spent_seconds
    if (!q || t == null || t <= 0 || t > MAX_TIMING_SECONDS) continue
    const perUnit = pace.per === 'point' ? t / pointsForPace(q.points, pace) : t
    all.push(perUnit)
    by[q.difficulty].push(perUnit)
  }
  const byDifficulty = Object.fromEntries(DIFFICULTY_ORDER.map(d => [d, reading(by[d])])) as Record<Difficulty, PaceReading>
  return { pace, allowed: secondsPerUnit(pace), overall: reading(all), byDifficulty }
}

/** "4:05" — minutes and seconds. */
export function clock(seconds: number): string {
  const s = Math.round(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** A reading against the allowance, as a percentage: 120 is 20% over. */
export function paceRatio(reading: PaceReading, allowed: number): number | null {
  return reading.median === null || allowed <= 0 ? null : Math.round((100 * reading.median) / allowed)
}
