// Pure utilities for computing synthetic level events in the learning history graph.
// Kept separate from the hook so they can be unit-tested without loading Supabase.

import {
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
} from './mastery'
import type { MasteryState } from './mastery'

export interface LevelEvent {
  at: Date
  from: MasteryState
  to: MasteryState
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** One row of the attempted-questions list under the exam-history graph. */
export interface AttemptedQuestionSummary {
  questionId: string
  /** Shaped to satisfy `AttemptCounts` so `QuestionAttemptBadge` can read it directly. */
  attempt_count: number
  correct_count: number
  lastAttemptAt: Date
}

/**
 * Roll the graph's attempt dots up per question, most recently attempted first.
 *
 * The dots are already scoped to one concept, so this is the concept-local
 * attempt history — deliberately not `useQuestionAttempts`, which tallies every
 * response the learner has ever made across the whole bank.
 */
export function summarizeAttemptedQuestions(
  dots: { questionId: string; isCorrect: boolean; at: Date }[],
): AttemptedQuestionSummary[] {
  const byQuestion = new Map<string, AttemptedQuestionSummary>()
  for (const dot of dots) {
    if (!dot.questionId) continue
    const existing = byQuestion.get(dot.questionId)
    if (existing) {
      existing.attempt_count++
      if (dot.isCorrect) existing.correct_count++
      if (dot.at > existing.lastAttemptAt) existing.lastAttemptAt = dot.at
    } else {
      byQuestion.set(dot.questionId, {
        questionId: dot.questionId,
        attempt_count: 1,
        correct_count: dot.isCorrect ? 1 : 0,
        lastAttemptAt: dot.at,
      })
    }
  }
  return [...byQuestion.values()].sort((a, b) => {
    const diff = b.lastAttemptAt.getTime() - a.lastAttemptAt.getTime()
    // Attempts from one quiz session share a timestamp — fall back to the id so
    // the order is stable across renders rather than dependent on insertion.
    return diff !== 0 ? diff : a.questionId.localeCompare(b.questionId)
  })
}

/**
 * Compute the synthetic downward level events caused by time-based decay.
 * Mirrors the cascade logic in decayIfStale() so the graph line drops at
 * exactly the same point that the state machine would.
 */
export function syntheticDecayEvents(
  lastLevel: MasteryState,
  lastCorrectAt: Date,
  now: Date,
): LevelEvent[] {
  const events: LevelEvent[] = []
  let state = lastLevel
  let origin = lastCorrectAt.getTime()

  if (state === 'level3') {
    const at = new Date(origin + DECAY_DAYS_LEVEL3 * MS_PER_DAY)
    if (at > now) return events
    events.push({ at, from: 'level3', to: 'level2' })
    state = 'level2'
    origin = at.getTime()
  }
  if (state === 'level2') {
    const at = new Date(origin + DECAY_DAYS_LEVEL2 * MS_PER_DAY)
    if (at > now) return events
    events.push({ at, from: 'level2', to: 'level1' })
    state = 'level1'
    origin = at.getTime()
  }
  if (state === 'level1') {
    const at = new Date(origin + DECAY_DAYS_LEVEL1 * MS_PER_DAY)
    if (at > now) return events
    events.push({ at, from: 'level1', to: 'forgotten' })
  }
  return events
}
