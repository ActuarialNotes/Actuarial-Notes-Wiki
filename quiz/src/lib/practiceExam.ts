// A practice exam shaped like the paper it rehearses.
//
// A quiz is a draw: so many questions, at random, from what was picked. A
// practice exam is a rehearsal of the sitting, so three things are the
// paper's rather than the reader's:
//
//   - its **length** — the paper's question count (`practiceExamQuestions`),
//     or, for a written paper paced by the mark, its **points**: Exam 5's
//     "roughly 55 points" in four hours, ASTAM's and ALTAM's 60 in three. A
//     written paper's questions run from half a point to a dozen, so 25 of
//     them at random could be a two-hour paper or a six-hour one; the point
//     total is what the sitting is, and what the timer budgets.
//   - its **spread** — each syllabus section's share of the paper, at its
//     published weight (the midpoint of `{20–30%}`, as readiness reads it;
//     an unweighted syllabus, like the DISCs', counts each topic alike). A
//     uniform draw leaves it to the bank's shape instead: a section the vault
//     has written many questions for crowds out one it has few for.
//   - its **formats** — only the kinds of question the paper sets, and every
//     one of them the bank holds. Exam P is thirty multiple-choice questions,
//     so a vault-written numeric-entry or multi-step written question doesn't
//     belong on a rehearsal of it; Exam 5 sets constructed response with
//     multiple choice and fill in the blank, so its rehearsal carries all three.
//
// Nothing here is invented: lengths and paces are `lib/quizTiming.ts`'s and
// `lib/pastExams.ts`'s transcriptions, weights are the exam page's, and an
// exam this module knows no formats for draws every format. A past paper
// picked on the shelf is none of this's business — it is sat whole, as set.

import { objectiveKey, type Question, type QuestionType } from './parser'
import { practiceExamQuestions } from './pastExams'
import { shuffle } from './quizDifficulty'
import { paceForExam, pointsForPace } from './quizTiming'
import { parseSectionWeight } from './readiness'
import type { WikiExamSyllabus } from './wikiParser'

export interface PracticeExamBlueprint {
  /** The bank label. */
  exam: string
  /** How many questions — the draw's size, or for a points paper the count it shows. */
  questions: number
  /** The paper's total points when it is paced by the mark, else null. */
  points: number | null
  /** What a question whose source prints no point value counts for (`pointsForPace`). */
  unprintedPoints: number
  /** The question formats the paper sets; null when nothing says, which admits every one. */
  types: readonly QuestionType[] | null
}

const MULTIPLE_CHOICE: readonly QuestionType[] = ['multiple-choice']
// CAS's MAS content outlines (`data/examSittingDetails.ts`): "Multiple choice,
// multiple selection, point and click, fill in the blank, matching" — a
// fill-in-the-blank is the bank's free entry; a multi-step written question
// is none of them.
const CAS_MAS_ITEMS: readonly QuestionType[] = ['multiple-choice', 'free-entry']

// CAS's upper-level content outlines: "Constructed response and spreadsheet,
// with multiple choice, multiple selection, point and click, fill in the blank
// and matching" — the bank's written parts, multiple choice and free entry.
const CAS_UPPER_ITEMS: readonly QuestionType[] = ['multi-part', 'multiple-choice', 'free-entry']
// The SOA's ASTAM and ALTAM syllabi: six written-answer questions.
const WRITTEN_ANSWER: readonly QuestionType[] = ['multi-part']

/**
 * The formats each paper sets, keyed by bank label. The SOA's P, FM, FAM and
 * SRM syllabi each say "multiple-choice questions", and CAS's DISC page "75
 * application-based multiple-choice questions". A practice exam holds only
 * these, and every one of them the bank can supply (`drawPracticeExam`).
 */
export const PRACTICE_EXAM_TYPES: Readonly<Record<string, readonly QuestionType[]>> = {
  'Probability': MULTIPLE_CHOICE,
  'Financial Mathematics': MULTIPLE_CHOICE,
  'Exam FAM': MULTIPLE_CHOICE,
  'Exam SRM': MULTIPLE_CHOICE,
  'Exam DISC-DA': MULTIPLE_CHOICE,
  'Exam DISC-RM': MULTIPLE_CHOICE,
  'Exam DISC-IA': MULTIPLE_CHOICE,
  'Exam MAS-I': CAS_MAS_ITEMS,
  'Exam MAS-II': CAS_MAS_ITEMS,
  'Exam 5': CAS_UPPER_ITEMS,
  'Exam 6C': CAS_UPPER_ITEMS,
  'Exam 7': CAS_UPPER_ITEMS,
  'Exam 8': CAS_UPPER_ITEMS,
  'Exam 9': CAS_UPPER_ITEMS,
  'Exam ASTAM': WRITTEN_ANSWER,
  'Exam ALTAM': WRITTEN_ANSWER,
}

/** What a practice exam on `exam` (a bank label) is. */
export function practiceExamBlueprint(exam: string): PracticeExamBlueprint {
  const pace = paceForExam(exam)
  return {
    exam,
    questions: practiceExamQuestions(exam),
    points: pace?.per === 'point' ? pace.units : null,
    unprintedPoints: pace?.per === 'point' ? pointsForPace(0, pace) : 1,
    types: PRACTICE_EXAM_TYPES[exam] ?? null,
  }
}

/** Whether a question is of a format the blueprint's paper sets. */
export function fitsPaperFormat(blueprint: Pick<PracticeExamBlueprint, 'types'>, q: Pick<Question, 'type'>): boolean {
  return !blueprint.types || blueprint.types.includes(q.type)
}

/**
 * An exam's syllabus, by bank label — the same lookup the quiz builder groups
 * its concepts by, so a practice exam's sections are the ones on screen.
 */
export function syllabusForBank(
  syllabi: readonly WikiExamSyllabus[],
  exam: string,
): WikiExamSyllabus | null {
  return syllabi.find(s => s.examTopic === exam || s.examLabel === exam) ?? null
}

function conceptName(link: string): string {
  const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
  return (clean.split('/').filter(Boolean).pop() ?? '').toLowerCase()
}

/**
 * Which syllabus section a question belongs to: the learning objective it is
 * filed under, or failing that the first section that names one of its
 * concepts. -1 when neither places it.
 */
export function sectionOf(
  q: Pick<Question, 'learning_objective' | 'wiki_link'>,
  syllabus: WikiExamSyllabus,
): number {
  if (q.learning_objective) {
    const key = objectiveKey(q.learning_objective)
    const idx = syllabus.topics.findIndex(t => objectiveKey(t.name) === key)
    if (idx >= 0) return idx
  }
  for (const link of q.wiki_link) {
    const name = conceptName(link)
    if (!name) continue
    const idx = syllabus.topics.findIndex(t =>
      t.concepts.some(c => c.name.toLowerCase() === name || conceptName(c.target) === name),
    )
    if (idx >= 0) return idx
  }
  return -1
}

/**
 * `total` shared out in proportion to `weights` — largest remainder — with no
 * share above its cap. What a capped share can't take goes to the others,
 * still by weight. A zero weight or cap gets nothing.
 */
export function apportion(total: number, weights: readonly number[], caps: readonly number[]): number[] {
  const out = weights.map(() => 0)
  let open = weights.map((_, i) => i).filter(i => weights[i] > 0 && caps[i] > 0)
  let left = Math.min(total, open.reduce((n, i) => n + caps[i], 0))
  while (left > 0 && open.length > 0) {
    const sum = open.reduce((n, i) => n + weights[i], 0)
    const exact = open.map(i => (left * weights[i]) / sum)
    const give = exact.map(Math.floor)
    let rest = left - give.reduce((n, g) => n + g, 0)
    const byRemainder = open
      .map((i, k) => ({ k, frac: exact[k] - give[k], w: weights[i] }))
      .sort((a, b) => (b.frac - a.frac) || (b.w - a.w) || (a.k - b.k))
    for (const { k } of byRemainder) {
      if (rest <= 0) break
      give[k]++
      rest--
    }
    let placed = 0
    open.forEach((i, k) => {
      const g = Math.min(give[k], caps[i] - out[i])
      out[i] += g
      placed += g
    })
    left -= placed
    open = open.filter(i => out[i] < caps[i])
    if (placed === 0) break
  }
  return out
}

function pointsOf(q: Pick<Question, 'points'>, unprinted = 1): number {
  return q.points > 0 ? q.points : unprinted
}

/**
 * Questions from `list`, in order, toward `target` points: each is taken when
 * it brings the total closer to the target, so a 12-point question doesn't
 * blow a 3-point gap but a 2-point one closes it.
 */
function takeTowardPoints<T extends Pick<Question, 'points'>>(list: readonly T[], target: number, unprinted: number): T[] {
  const out: T[] = []
  let sum = 0
  for (const q of list) {
    if (sum >= target) break
    const p = pointsOf(q, unprinted)
    if (Math.abs(target - (sum + p)) < Math.abs(target - sum)) {
      out.push(q)
      sum += p
    }
  }
  return out
}

/**
 * A practice exam drawn from `pool`: the paper's formats only, each syllabus
 * section at its weight, to the paper's length (or point total), in a random
 * order. Questions no section places only fill what the sections can't. With
 * no syllabus to weigh by, it is a uniform draw of the paper's formats.
 */
export function drawPracticeExam<T extends Question>(
  pool: readonly T[],
  blueprint: PracticeExamBlueprint,
  syllabus: WikiExamSyllabus | null,
  random: () => number = Math.random,
): T[] {
  const eligible = shuffle(pool.filter(q => fitsPaperFormat(blueprint, q)), random)
  const topics = syllabus?.topics ?? []

  if (topics.length === 0) {
    return blueprint.points !== null
      ? takeTowardPoints(eligible, blueprint.points, blueprint.unprintedPoints)
      : eligible.slice(0, blueprint.questions)
  }

  const bins: T[][] = topics.map(() => [])
  const unplaced: T[] = []
  for (const q of eligible) {
    const idx = sectionOf(q, syllabus!)
    if (idx >= 0) bins[idx].push(q)
    else unplaced.push(q)
  }
  const weights = topics.map(t => parseSectionWeight(t.weight))

  let picked: T[]
  if (blueprint.points !== null) {
    // Each section's share of the points, among the sections the pool reaches.
    const target = blueprint.points
    const reached = bins.map((b, i) => (b.length > 0 ? weights[i] : 0))
    const sum = reached.reduce((n, w) => n + w, 0)
    const unprinted = blueprint.unprintedPoints
    picked = sum > 0 ? bins.flatMap((b, i) => takeTowardPoints(b, (target * reached[i]) / sum, unprinted)) : []
    const have = picked.reduce((n, q) => n + pointsOf(q, unprinted), 0)
    if (have < target) {
      const taken = new Set(picked)
      const rest = [...bins.flat(), ...unplaced].filter(q => !taken.has(q))
      picked = picked.concat(takeTowardPoints(shuffle(rest, random), target - have, unprinted))
    }
  } else {
    const n = Math.min(blueprint.questions, eligible.length)
    const quotas = apportion(n, weights, bins.map(b => b.length))
    picked = bins.flatMap((b, i) => b.slice(0, quotas[i]))
    if (picked.length < n) {
      const taken = new Set(picked)
      const rest = shuffle([...unplaced, ...bins.flat().filter(q => !taken.has(q))], random)
      picked = picked.concat(rest.slice(0, n - picked.length))
    }
  }
  return shuffle(withEveryFormat(picked, eligible, blueprint, syllabus), random)
}

/**
 * The draw with every format the paper sets and the pool holds on it. A paper
 * mixing formats — Exam 5's constructed response *with* multiple choice and
 * fill in the blank — drawn by weight alone from a bank that is mostly one
 * format would rehearse only that one. A missing format swaps in for a
 * question of the draw's commonest format, from the same section where it
 * can (and nearest in points), so the length and the spread hold.
 */
function withEveryFormat<T extends Question>(
  picked: T[],
  eligible: readonly T[],
  blueprint: PracticeExamBlueprint,
  syllabus: WikiExamSyllabus | null,
): T[] {
  if (!blueprint.types || blueprint.types.length < 2 || picked.length < blueprint.types.length) return picked
  const out = [...picked]
  const section = (q: T) => (syllabus ? sectionOf(q, syllabus) : -1)
  const u = blueprint.unprintedPoints
  for (const type of blueprint.types) {
    if (out.some(q => q.type === type)) continue
    const candidate = eligible.find(q => q.type === type && !out.includes(q))
    if (!candidate) continue
    const counts = new Map<QuestionType, number>()
    for (const q of out) counts.set(q.type, (counts.get(q.type) ?? 0) + 1)
    const common = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
    if (!common || common[1] < 2) continue
    const swappable = out.filter(q => q.type === common[0])
    const sameSection = swappable.filter(q => section(q) === section(candidate))
    const pool = sameSection.length > 0 ? sameSection : swappable
    const replaced = pool.reduce((best, q) =>
      Math.abs(pointsOf(q, u) - pointsOf(candidate, u)) < Math.abs(pointsOf(best, u) - pointsOf(candidate, u)) ? q : best)
    out[out.indexOf(replaced)] = candidate
  }
  return out
}
