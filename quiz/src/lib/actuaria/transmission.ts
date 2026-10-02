// **The Daily Transmission** — a three-question review quiz of the concepts
// closest to decaying (docs/actuaria-online.md §7.5).
//
// It is an ordinary quiz: the page opens `/quiz?ids=…`, so the answers bank
// mastery, XP, the streak and quest progress (the revive quest included)
// through `quizStore` exactly as any quiz's do. All this module decides is
// *which* concepts, and which question for each.
//
//   1. Candidates are the concepts on the player's active exams whose next
//      decay step is within `TRANSMISSION_HORIZON_DAYS`, plus the Forgotten ones
//      (a concept only reaches Forgotten after it was learned).
//   2. Keystones first, then the soonest decay step, then the highest current
//      level — the most there is to lose goes first. Forgotten concepts, with
//      nothing left to lose, follow the ones still decaying.
//   3. One question per concept from the quiz's own pool (`filterQuestions`, so
//      the fact-check and syllabus filters hold), leaning toward the concept's
//      level with the quiz builder's own draw (`drawByDifficulty`).
//   4. Short of `n`, fill from today's study-plan concepts.

import { findKeystone, keystoneExamKey } from '@/lib/keystone'
import { EXAM_ID_TO_LABEL } from '@/lib/examIds'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { filterQuestions, type Question } from '@/lib/parser'
import { drawByDifficulty } from '@/lib/quizDifficulty'
import { landmarkZ, nextDecayStep, type DecayStep } from './credibility'

export const TRANSMISSION_SIZE = 3
/** A decay step this close is worth repairing today. */
export const TRANSMISSION_HORIZON_DAYS = 7

export interface TransmissionPick {
  /** The exam_progress key the concept's mastery row belongs to. */
  exam: string
  /** The concept, as its mastery row names it (a `concept_slug`). */
  concept: string
  /** Its state now, decay applied. */
  state: MasteryState
  step: DecayStep | null
  keystone: boolean
  reason: 'decaying' | 'forgotten' | 'plan'
}

const LEVEL_RANK: Record<MasteryState, number> = { forgotten: 0, new: 1, level1: 2, level2: 3, level3: 4 }
const DAY_MS = 24 * 60 * 60 * 1000

function isKeystoneOf(concept: string, exam: string): boolean {
  const match = findKeystone(concept)
  return !!match && keystoneExamKey(match.examId) === keystoneExamKey(exam)
}

/**
 * The concepts today's transmission repairs, most urgent first. `activeExams`
 * limits the candidates to the exams the player is studying (all of them when
 * left out); `plan` is today's study-plan concepts, the fill.
 */
export function selectTransmission(
  masteryRows: readonly ConceptMasteryRecord[],
  now: Date,
  n: number = TRANSMISSION_SIZE,
  options: {
    activeExams?: readonly string[]
    plan?: readonly { exam: string; concept: string }[]
  } = {},
): TransmissionPick[] {
  const active = options.activeExams ? new Set(options.activeExams) : null
  const horizon = now.getTime() + TRANSMISSION_HORIZON_DAYS * DAY_MS
  const candidates: TransmissionPick[] = []

  for (const row of masteryRows) {
    if (active && !active.has(row.exam_id)) continue
    const state = decayIfStale(row, now).state
    const keystone = isKeystoneOf(row.concept_slug, row.exam_id)
    if (state === 'forgotten') {
      candidates.push({ exam: row.exam_id, concept: row.concept_slug, state, step: null, keystone, reason: 'forgotten' })
      continue
    }
    const step = nextDecayStep(row, now)
    if (step && step.at.getTime() <= horizon) {
      candidates.push({ exam: row.exam_id, concept: row.concept_slug, state, step, keystone, reason: 'decaying' })
    }
  }

  const when = (p: TransmissionPick) => p.step?.at.getTime() ?? Number.POSITIVE_INFINITY
  candidates.sort((a, b) =>
    Number(b.keystone) - Number(a.keystone) ||
    when(a) - when(b) ||
    LEVEL_RANK[b.state] - LEVEL_RANK[a.state] ||
    a.concept.localeCompare(b.concept),
  )

  const picks: TransmissionPick[] = []
  const taken = new Set<string>()
  const take = (p: TransmissionPick) => {
    const id = p.concept.toLowerCase()
    if (taken.has(id) || picks.length >= n) return
    taken.add(id)
    picks.push(p)
  }
  candidates.forEach(take)

  for (const entry of options.plan ?? []) {
    if (picks.length >= n) break
    if (active && !active.has(entry.exam)) continue
    const row = masteryRows.find(r => r.exam_id === entry.exam && r.concept_slug.toLowerCase() === entry.concept.toLowerCase())
    take({
      exam: entry.exam,
      concept: entry.concept,
      state: row ? decayIfStale(row, now).state : 'new',
      step: null,
      keystone: isKeystoneOf(entry.concept, entry.exam),
      reason: 'plan',
    })
  }
  return picks
}

export interface TransmissionQuestion {
  pick: TransmissionPick
  question: Question
}

/**
 * One question for each pick, drawn from the quiz's own pool: the pick's exam
 * first, any exam that links the concept when that one has none. A concept with
 * no question at all drops out rather than being padded.
 */
export function drawTransmission(
  picks: readonly TransmissionPick[],
  questions: readonly Question[],
  random: () => number = Math.random,
): TransmissionQuestion[] {
  const used = new Set<string>()
  const out: TransmissionQuestion[] = []
  for (const pick of picks) {
    const label = EXAM_ID_TO_LABEL[pick.exam]
    const all = filterQuestions([...questions], { concept: pick.concept }).filter(q => !used.has(q.id))
    const onExam = label ? all.filter(q => q.exam === label) : []
    const pool = onExam.length > 0 ? onExam : all
    const [question] = drawByDifficulty(pool, 1, landmarkZ(pick.state), random)
    if (!question) continue
    used.add(question.id)
    out.push({ pick, question })
  }
  return out
}

/** The quiz a transmission opens — an ordinary one, by id. */
export function transmissionPath(drawn: readonly TransmissionQuestion[]): string {
  return `/quiz?ids=${drawn.map(d => encodeURIComponent(d.question.id)).join(',')}`
}
