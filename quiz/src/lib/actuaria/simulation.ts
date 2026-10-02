// **Simulation** — a timed Practice Exam from Monte Carlo Station, and what it
// would take to lift the sector's readiness (docs/actuaria-online.md §6.10).
//
// The run itself is the quiz builder's own Practice Exam (`mode=mock-exam`),
// sized from the same table (`practiceExamQuestions`) and timed from the same
// pace table (`lib/quizTiming.ts`) — nothing here restates an exam's format.
// Afterwards the screen shows the one readiness number (G2), and *Biggest
// lifts*: the keystones or regions whose promotion one level would raise
// `computeExamReadiness` most, found by re-running it with that promotion
// made. The canvas's 10,000-sitting histogram is deferred (D2) — it would be a
// second readiness number.

import { buildMasteryLookup, lookupConceptRecord, resolveConceptState } from '@/lib/conceptMatch'
import { keystonesForExam } from '@/lib/keystone'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { practiceExamQuestions } from '@/lib/pastExams'
import { paceForExam, secondsPerUnit, type ExamPace } from '@/lib/quizTiming'
import { computeExamReadiness } from '@/lib/readiness'
import type { WikiConcept, WikiExamSyllabus } from '@/lib/wikiParser'
import { isLandmark } from './landmarks'

export interface SimulationFormat {
  /** The bank label the run draws on. */
  exam: string
  questions: number
  /** The exam's pace, or null for one with no pace transcribed (no timer then). */
  pace: ExamPace | null
  /** The run's time at exam pace, in seconds — null when paced by points or unknown. */
  seconds: number | null
}

export function simulationFormat(exam: string): SimulationFormat {
  const questions = practiceExamQuestions(exam)
  const pace = paceForExam(exam)
  const seconds = pace && pace.per === 'question' ? Math.round(questions * secondsPerUnit(pace)) : null
  return { exam, questions, pace, seconds }
}

/** The Practice Exam a Simulation opens: the builder's own URL, timed. */
export function simulationPath(format: SimulationFormat, reveal: 'during' | 'end' = 'end'): string {
  const params = new URLSearchParams({ exam: format.exam, mode: 'mock-exam', reveal, count: String(format.questions) })
  if (format.pace) params.set('timed', '1')
  return `/quiz?${params.toString()}`
}

// ── Biggest lifts ───────────────────────────────────────────────────────────

const NEXT_LEVEL: Record<MasteryState, MasteryState> = {
  new: 'level1',
  forgotten: 'level1',
  level1: 'level2',
  level2: 'level3',
  level3: 'level3',
}

export interface Lift {
  kind: 'keystone' | 'region'
  /** The keystone's or the region's name. */
  name: string
  /** Readiness points the promotion would add. */
  points: number
}

function promote(
  records: readonly ConceptMasteryRecord[],
  concepts: readonly WikiConcept[],
  examKey: string,
  now: Date,
): ConceptMasteryRecord[] {
  const lookup = buildMasteryLookup([...records])
  const promoted = new Map<string, ConceptMasteryRecord>()
  for (const concept of concepts) {
    const state = resolveConceptState(lookup, concept, now)
    const next = NEXT_LEVEL[state]
    if (next === state) continue
    const base = lookupConceptRecord(lookup, concept) ?? emptyRecord('lift', examKey, concept.name)
    promoted.set(base.concept_slug.toLowerCase(), {
      ...base,
      state: next,
      correct_count: base.correct_count + 1,
      incorrect_streak: 0,
      last_correct_at: now.toISOString(),
      last_attempted_at: now.toISOString(),
    })
  }
  const out = records.map(r => promoted.get(r.concept_slug.toLowerCase()) ?? r)
  const have = new Set(records.map(r => r.concept_slug.toLowerCase()))
  for (const [slug, r] of promoted) if (!have.has(slug)) out.push(r)
  return out
}

/**
 * The `limit` promotions that would lift the sector's readiness most: each of
 * the exam's keystones one level up, and each region with every concept in it
 * one level up. `records` are the player's rows for this exam.
 */
export function biggestLifts(
  syllabus: WikiExamSyllabus,
  records: readonly ConceptMasteryRecord[],
  examKey: string,
  now: Date,
  limit = 3,
): Lift[] {
  const base = computeExamReadiness(syllabus, [...records], now, examKey).overallPct
  const lift = (concepts: readonly WikiConcept[]) =>
    computeExamReadiness(syllabus, promote(records, concepts, examKey, now), now, examKey).overallPct - base

  const lifts: Lift[] = []
  for (const k of keystonesForExam(examKey)) {
    lifts.push({ kind: 'keystone', name: k.name, points: lift([{ name: k.name, target: k.name }]) })
  }
  for (const topic of syllabus.topics) {
    lifts.push({ kind: 'region', name: topic.name, points: lift(topic.concepts.filter(isLandmark)) })
  }
  return lifts
    .filter(l => l.points > 0.05)
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    .slice(0, limit)
}
