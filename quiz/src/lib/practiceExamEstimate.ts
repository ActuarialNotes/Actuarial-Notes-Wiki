// The Practice Exam debrief (docs/practice-exam-debrief.md): an estimated CAS
// grade, where the time went, and what to fix.
//
// The estimate rests on two things the CAS publishes and nothing else:
//
//   - **The 0 to 10 scale.** "Scores of 0 to 5 are assigned to candidates who
//     do not pass. On this scale, each interval is 10 percent of the pass mark
//     … A grade of 0 means that the candidate's score is less than 50 percent
//     of the pass mark. Candidates at or above the passing mark will receive a
//     score of 6 to 10." (Syllabus of Basic Education.) A failing grade is
//     raw score ÷ pass mark; nothing says what separates a 6 from a 10, so a
//     pass is only ever "pass".
//   - **The pass marks printed until 2019** (`data/casPassMarks.json`,
//     generated from the CAS's PDFs by `scripts/cas_pass_marks.py`). A past
//     paper sat whole is held to its own sitting's mark; any other Practice
//     Exam to the spread of the exam's marks since 2014, as a range of grades.
//
// The MAS marks were set under a quarter-point deduction for each wrong
// answer, which the CAS dropped from Fall 2022. A reader is scored on today's
// rule (no deduction), so each old mark is restated onto it: for a candidate
// who answers every question, a penalised share s is a share right of
// (4s + 1) / 5. Pure and tested.

import passMarkData from '@/data/casPassMarks.json'
import { questionCredit, type Question, type SelfGrade } from './parser'
import { questionPoints } from './quizScore'
import { partGradesOf } from './sessionProgress'
import { ungradedWrittenParts } from './writtenAnswer'
import { sectionOf } from './practiceExam'
import { parseSectionWeight } from './readiness'
import { paceForExam, secondsPerUnit } from './quizTiming'
import type { WikiExamSyllabus } from './wikiParser'

export interface PassMarkSitting {
  session: 'Spring' | 'Fall'
  year: number
  totalPoints: number
  passMark: number
  percentile95?: number
  percentile75?: number
  comment?: string
}

interface PassMarkExam {
  source: string
  sha256: string
  sittings: PassMarkSitting[]
}

const EXAMS = (passMarkData as unknown as { exams: Record<string, PassMarkExam> }).exams

/** The CAS's own index of the pass-mark PDFs. */
export const PASS_MARK_INDEX: string = (passMarkData as { index: string }).index

/** The earliest sitting a drawn Practice Exam's range reads. */
export const ESTIMATE_FROM_YEAR = 2014

/** The exams whose marks were set under the quarter-point deduction (until Fall 2022). */
export const PENALISED_EXAMS: ReadonlySet<string> = new Set(['Exam MAS-I', 'Exam MAS-II'])

/** Whether an exam (a bank label) gets an estimate at all. */
export function hasEstimate(exam: string): boolean {
  return (EXAMS[exam]?.sittings.length ?? 0) > 0
}

/** The published sittings of an exam, newest first, as printed. */
export function passMarkSittings(exam: string): PassMarkSitting[] {
  return EXAMS[exam]?.sittings ?? []
}

/** The PDF an exam's pass marks were read from. */
export function passMarkSource(exam: string): string | null {
  return EXAMS[exam]?.source ?? null
}

/**
 * A grade on the CAS's scale for a score at `ratio` of the pass mark: 0 to 5,
 * or 'pass' at or above it (6 to 10, which the CAS doesn't define).
 */
export type CasGrade = 0 | 1 | 2 | 3 | 4 | 5 | 'pass'

export function casGrade(ratio: number): CasGrade {
  if (!(ratio >= 0)) return 0
  if (ratio >= 1) return 'pass'
  // Each interval is 10% of the pass mark: [0.9, 1) is 5 … [0.5, 0.6) is 1.
  // A tiny allowance keeps 0.9 (as 0.9 × mark ÷ mark) from flooring to 8.999.
  const tenths = Math.floor(ratio * 10 + 1e-9)
  return Math.max(0, tenths - 4) as CasGrade
}

/** A penalised share (right − ¼ wrong, of the paper) as a share right with no blanks. */
export function restatePenalisedShare(share: number): number {
  return (4 * share + 1) / 5
}

/** The other way: a share right on a paper with no blanks, under the old deduction. */
export function penalisedShare(shareRight: number): number {
  return (5 * shareRight - 1) / 4
}

/** A sitting's pass mark as a share of its points, on today's rule. */
export function passShare(exam: string, sitting: Pick<PassMarkSitting, 'passMark' | 'totalPoints'>): number {
  const share = sitting.passMark / sitting.totalPoints
  return PENALISED_EXAMS.has(exam) ? restatePenalisedShare(share) : share
}

// ── The reader's paper ──────────────────────────────────────────────────────

type Responses = Record<string, { chosen: string | null; timeSpent?: number } | undefined>

export interface PaperScore {
  earned: number
  possible: number
  /** Earned over possible, 0–1. */
  share: number
  /** Questions answered whose written parts the reader hasn't graded yet. */
  ungraded: string[]
}

/**
 * A finished Practice Exam's points, every question counted (a blank earns
 * nothing), each weighted by its points. A written part the reader hasn't
 * graded holds the estimate back rather than counting as nothing.
 */
export function paperScore(
  questions: readonly Question[],
  responses: Responses,
  manualGrades: Record<string, SelfGrade>,
): PaperScore {
  let earned = 0
  let possible = 0
  const ungraded: string[] = []
  for (const q of questions) {
    const worth = questionPoints(q)
    possible += worth
    const chosen = responses[q.id]?.chosen
    if (chosen != null && ungradedWrittenParts(q, partGradesOf(q.id, manualGrades)).length > 0) ungraded.push(q.id)
    earned += worth * questionCredit(q, chosen, manualGrades)
  }
  return { earned, possible, share: possible > 0 ? earned / possible : 0, ungraded }
}

// ── The estimate ────────────────────────────────────────────────────────────

export interface GradeAt {
  grade: CasGrade
  /** The reader's score over the pass mark, 0–∞. */
  ratio: number
}

export interface SittingEstimate extends GradeAt {
  kind: 'sitting'
  exam: string
  sitting: PassMarkSitting
  /** Which of the sitting's percentiles the reader reached, if printed. */
  percentile: 95 | 75 | null
}

export interface RangeEstimate {
  kind: 'range'
  exam: string
  /** At the median published pass mark. */
  median: GradeAt
  /** At the highest published pass mark: the least the reader could have got. */
  low: GradeAt
  /** At the lowest published pass mark. */
  high: GradeAt
  sittings: number
  fromYear: number
  toYear: number
}

export type Estimate = SittingEstimate | RangeEstimate

function gradeAt(share: number, passAt: number): GradeAt {
  const ratio = passAt > 0 ? share / passAt : 0
  return { grade: casGrade(ratio), ratio }
}

function median(values: number[]): number {
  const s = [...values].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2
}

/**
 * The estimate for a reader's share of the points on a paper of `exam`.
 * `sitting` names the past paper when one was sat whole; otherwise the spread
 * of the exam's marks since `ESTIMATE_FROM_YEAR`. Null for an exam the CAS
 * printed no marks for, or a paper whose sitting it printed none for.
 */
export function estimateGrade(
  exam: string,
  share: number,
  sitting?: { year: number; session?: string | null } | null,
): Estimate | null {
  const all = passMarkSittings(exam)
  if (all.length === 0) return null
  if (sitting) {
    const session = sitting.session?.toLowerCase()
    // A sitting printed twice (Spring 2018 Exam 5's original and make-up) is its original's.
    const row = all.find(s => s.year === sitting.year && s.session.toLowerCase() === session)
    if (!row) return null
    const at = gradeAt(share, passShare(exam, row))
    // The reader's score in the sitting's own points, for its percentiles.
    const raw = (PENALISED_EXAMS.has(exam) ? penalisedShare(share) : share) * row.totalPoints
    const percentile = row.percentile95 !== undefined && raw >= row.percentile95 ? 95
      : row.percentile75 !== undefined && raw >= row.percentile75 ? 75
      : null
    return { kind: 'sitting', exam, sitting: row, percentile, ...at }
  }
  const recent = all.filter(s => s.year >= ESTIMATE_FROM_YEAR)
  const rows = recent.length > 0 ? recent : all
  const shares = rows.map(s => passShare(exam, s))
  const years = rows.map(s => s.year)
  return {
    kind: 'range',
    exam,
    median: gradeAt(share, median(shares)),
    low: gradeAt(share, Math.max(...shares)),
    high: gradeAt(share, Math.min(...shares)),
    sittings: rows.length,
    fromYear: Math.min(...years),
    toYear: Math.max(...years),
  }
}

/** "5", "pass": a grade as the debrief prints it. */
export function gradeLabel(grade: CasGrade): string {
  return grade === 'pass' ? 'Pass' : String(grade)
}

// ── Where the time went, and what to fix ────────────────────────────────────

export interface DebriefSection {
  name: string
  /** The section's published share of the paper, 0–100. */
  weight: number
  questions: number
  possible: number
  earned: number
  /** Points lost here: possible − earned. */
  lost: number
  /** Seconds spent on its questions. */
  seconds: number
  /** Seconds the sitting's pace allows them; null for an exam with no pace. */
  allowed: number | null
  /** The questions that lost points, for a quiz on them. */
  missed: string[]
  concepts: string[]
}

export interface Debrief {
  /** Sections, the most points lost first; questions no section places under one named "Other". */
  sections: DebriefSection[]
  seconds: number
  allowed: number | null
}

/** The sections of one finished paper: points lost and time spent in each. */
export function debriefSections(
  questions: readonly Question[],
  responses: Responses,
  manualGrades: Record<string, SelfGrade>,
  syllabus: WikiExamSyllabus | null,
  exam: string,
): Debrief {
  const pace = paceForExam(exam)
  const unit = pace ? secondsPerUnit(pace) : null
  const topics = syllabus?.topics ?? []
  const totalWeight = topics.reduce((n, t) => n + parseSectionWeight(t.weight), 0)
  const rows: DebriefSection[] = topics.map(t => ({
    name: t.name,
    weight: totalWeight > 0 ? (100 * parseSectionWeight(t.weight)) / totalWeight : 0,
    questions: 0, possible: 0, earned: 0, lost: 0, seconds: 0,
    allowed: unit === null ? null : 0,
    missed: [],
    concepts: t.concepts.map(c => c.name),
  }))
  const other: DebriefSection = {
    name: 'Other', weight: 0, questions: 0, possible: 0, earned: 0, lost: 0, seconds: 0,
    allowed: unit === null ? null : 0, missed: [], concepts: [],
  }
  let seconds = 0
  let allowed: number | null = unit === null ? null : 0
  for (const q of questions) {
    const idx = syllabus ? sectionOf(q, syllabus) : -1
    const row = idx >= 0 ? rows[idx] : other
    const worth = questionPoints(q)
    const credit = questionCredit(q, responses[q.id]?.chosen, manualGrades)
    const time = Math.max(0, responses[q.id]?.timeSpent ?? 0)
    const allow = unit === null || !pace ? null : unit * (pace.per === 'point' ? worth : 1)
    row.questions++
    row.possible += worth
    row.earned += worth * credit
    row.seconds += time
    if (allow !== null && row.allowed !== null) row.allowed += allow
    if (credit < 1) row.missed.push(q.id)
    seconds += time
    if (allow !== null && allowed !== null) allowed += allow
  }
  const sections = [...rows, other].filter(r => r.questions > 0)
  for (const r of sections) r.lost = r.possible - r.earned
  sections.sort((a, b) => (b.lost - a.lost) || (b.weight - a.weight) || a.name.localeCompare(b.name))
  return { sections, seconds, allowed }
}
