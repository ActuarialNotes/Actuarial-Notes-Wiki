// Recent-mistakes review (Dashboard card).
//
// Pure, read-only derivations over the learner's question-response history plus
// the concept-mastery records the Dashboard already loads. It answers two
// questions with no I/O and no React:
//
//   1. Which questions did the learner most recently get wrong (and haven't
//      since re-answered correctly)?
//   2. For each such question, which of its concepts is most likely to blame?
//
// A question is tagged with one or more concepts (its wiki_links). When a
// multi-concept question is missed we can't know which concept sank it, so we
// rank the culprits with two signals the app already tracks:
//
//   • the learner's *miss-rate* on that concept across their whole history
//     (other questions touching the same concept that were also answered wrong),
//   • the concept's current *mastery level* — a Forgotten/New concept is a more
//     plausible culprit than a Level 3 one.
//
// Both reuse the existing engine: slugForLink / buildMasteryLookup for
// concept↔mastery matching and decayIfStale for the display-time state.

import type { Question } from '@/lib/parser'
import { buildMasteryLookup, slugForLink } from '@/lib/conceptMatch'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'

/** One row from the learner's question_responses history (only the fields used here). */
export interface MistakeResponseRow {
  question_id: string
  is_correct: boolean
  answered_at: string
}

/** A concept implicated in a missed question, with how likely it is to blame. */
export interface ProblemConcept {
  slug: string
  /** Display name — the canonical concept slug is already human-readable. */
  name: string
  state: MasteryState
  /** 0..1 — higher means a more likely reason the question was missed. */
  score: number
  /** True when `score` clears PROBLEM_SCORE_THRESHOLD. */
  isProblem: boolean
}

/** A recently-missed question and its ranked problem concepts (worst first). */
export interface RecentMistake {
  question: Question
  answeredAt: string
  problemConcepts: ProblemConcept[]
}

// How weak each mastery state is as a culprit signal. Forgotten/New concepts are
// the most plausible reason a question was missed; a Level 3 concept the least.
const STATE_WEAKNESS: Record<MasteryState, number> = {
  forgotten: 1,
  new: 0.85,
  level1: 0.6,
  level2: 0.3,
  level3: 0.1,
}

// A concept is highlighted as "likely problematic" at or above this blended
// score. Tuned so a weak concept (New/Forgotten/Level 1) always clears it, and a
// stronger concept only clears it once the learner's own miss-rate backs it up.
export const PROBLEM_SCORE_THRESHOLD = 0.5

// Smoothing strength: how many "prior" attempts the mastery-weakness signal is
// worth before the learner's observed miss-rate takes over. Low enough that a
// concept missed across a few questions moves the score, high enough that a
// single miss on an otherwise-strong concept doesn't flag it.
const PRIOR_STRENGTH = 3

interface ConceptStat {
  attempts: number
  incorrect: number
}

// A question's concepts as canonical mastery slugs, de-duplicated. Mirrors
// conceptsForQuestion in quizStore.ts (both delegate to slugForLink) so the
// slugs line up with the concept_mastery keys.
function conceptSlugsFor(q: Question): string[] {
  const slugs = new Set<string>()
  for (const link of q.wiki_link) {
    const slug = slugForLink(link)
    if (slug) slugs.add(slug)
  }
  return [...slugs]
}

// The learner's miss-rate on a concept, Laplace-smoothed toward its mastery
// weakness. The prior (weakness, worth PRIOR_STRENGTH attempts) dominates when
// there's little history — so with no answered attempts the score is exactly the
// mastery weakness — and the observed miss-rate takes over as evidence
// accumulates. This keeps a single miss on an otherwise-strong concept from
// flagging it, while a concept missed across several questions rises quickly.
function conceptScore(stat: ConceptStat | undefined, state: MasteryState): number {
  const weakness = STATE_WEAKNESS[state]
  const attempts = stat?.attempts ?? 0
  const incorrect = stat?.incorrect ?? 0
  return (incorrect + PRIOR_STRENGTH * weakness) / (attempts + PRIOR_STRENGTH)
}

/**
 * Build the recent-mistakes list, worst-recent first.
 *
 * @param rows            every question_response for the learner (any order)
 * @param questions       the full question bank (to resolve id → concepts/body)
 * @param masteryRecords  concept_mastery rows (ideally the active exam's)
 * @param now             evaluation time (for decay-adjusted mastery state)
 * @param limit           max mistakes to return
 */
export function buildRecentMistakes(
  rows: MistakeResponseRow[],
  questions: Question[],
  masteryRecords: ConceptMasteryRecord[],
  now: Date,
  limit = 5,
): RecentMistake[] {
  const qById = new Map(questions.map(q => [q.id, q]))

  // Per-concept difficulty over the learner's *entire* history — the "other
  // questions incorrect" signal. Skips rows whose question isn't in the bank.
  const stats = new Map<string, ConceptStat>()
  for (const row of rows) {
    const q = qById.get(row.question_id)
    if (!q) continue
    for (const slug of conceptSlugsFor(q)) {
      const s = stats.get(slug) ?? { attempts: 0, incorrect: 0 }
      s.attempts++
      if (!row.is_correct) s.incorrect++
      stats.set(slug, s)
    }
  }

  // Collapse to the learner's most recent attempt per question; a question is a
  // current mistake only if that latest attempt was wrong (a since-corrected
  // question drops off).
  const latest = new Map<string, MistakeResponseRow>()
  for (const row of rows) {
    const prev = latest.get(row.question_id)
    if (!prev || row.answered_at > prev.answered_at) latest.set(row.question_id, row)
  }

  const lookup = buildMasteryLookup(masteryRecords)

  const mistakes: RecentMistake[] = []
  const misses = [...latest.values()]
    .filter(r => !r.is_correct && qById.has(r.question_id))
    .sort((a, b) => b.answered_at.localeCompare(a.answered_at))

  for (const row of misses) {
    if (mistakes.length >= limit) break
    const q = qById.get(row.question_id)!
    const problemConcepts: ProblemConcept[] = conceptSlugsFor(q)
      .map(slug => {
        const rec = lookup.get(slug.toLowerCase())
        const state = rec ? decayIfStale(rec, now).state : 'new'
        const score = conceptScore(stats.get(slug), state)
        return { slug, name: slug, state, score, isProblem: score >= PROBLEM_SCORE_THRESHOLD }
      })
      .sort((a, b) => b.score - a.score)
    mistakes.push({ question: q, answeredAt: row.answered_at, problemConcepts })
  }

  return mistakes
}
