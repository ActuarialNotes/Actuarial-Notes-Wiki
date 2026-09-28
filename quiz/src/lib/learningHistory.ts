// Pure utilities for computing synthetic level events in the learning history graph.
// Kept separate from the hook so they can be unit-tested without loading Supabase.

import {
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
  decayIfStale,
} from './mastery'
import type { ConceptMasteryRecord, MasteryState } from './mastery'

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

// ─── One concept, several exams ───────────────────────────────────────────────
//
// Mastery is kept per (exam, concept slug): Probability on Exam P and
// Probability on MAS-I are two rows, each climbing its own ladder, and each
// writes its own level-ups to daily_completions. The exam-history graph shows
// the concept, not one exam's side of it, so it draws the best level any of
// those rows holds at each moment — the same rule the modal's level pill uses.
//
// Laying the rows' events end to end instead reads as one ladder going down:
// a concept at Level 2 on one exam, answered correctly on another for the first
// time, logs that exam's New → Level 1, and the line stepped from 2 to 1 on a
// correct answer.

// Numeric rank for comparing levels. Forgotten sits below New: a concept that
// was learned and lost is further from mastery than one never started.
const LEVEL_RANK: Record<MasteryState, number> = {
  forgotten: 0, new: 1, level1: 2, level2: 3, level3: 4,
}

function isLearned(state: MasteryState): boolean {
  return state === 'level1' || state === 'level2' || state === 'level3'
}

/** The level a list of events leaves the concept at by `time`. */
export function levelAtTime(time: Date, levelEvents: LevelEvent[]): MasteryState {
  let state: MasteryState = levelEvents[0]?.from ?? 'new'
  for (const ev of levelEvents) {
    if (ev.at <= time) state = ev.to
    else break
  }
  return state
}

/** One mastery row's side of a concept's history: one exam, one stored slug. */
export interface MasteryTrack {
  /** The row's level changes as daily_completions recorded them, oldest first. */
  events: LevelEvent[]
  /** The concept_mastery row itself, undecayed — null when there is none. */
  record: ConceptMasteryRecord | null
  /** The latest answer that fed this row, if known — where a run of failures lands. */
  lastAttemptAt: Date | null
}

/**
 * The track's level now, with decay applied. A row still at New behind a
 * recorded level-up means the concept_mastery upsert failed while the
 * daily_completions write succeeded, so the event is trusted over the row.
 */
export function trackCurrentLevel(track: MasteryTrack, now: Date): MasteryState {
  const { events, record } = track
  const last = events[events.length - 1]
  const fromEvent = last && isLearned(last.to)
    ? decayIfStale(recordAt(last.to, last.at), now).state
    : last?.to
  if (!record) return fromEvent ?? 'new'
  const state = decayIfStale(record, now).state
  if (state === 'new' && fromEvent && LEVEL_RANK[fromEvent] > LEVEL_RANK.new) return fromEvent
  return state
}

function recordAt(state: MasteryState, at: Date): ConceptMasteryRecord {
  const iso = at.toISOString()
  return {
    user_id: '', exam_id: '', concept_slug: '',
    state,
    correct_count: 0, incorrect_streak: 0, hard_correct_count: 0,
    last_correct_at: iso,
    last_attempted_at: iso,
  }
}

function latest(...dates: (Date | null | undefined)[]): Date | null {
  let best: Date | null = null
  for (const d of dates) if (d && (!best || d > best)) best = d
  return best
}

function dateOf(iso: string | null | undefined): Date | null {
  return iso ? new Date(iso) : null
}

/**
 * The track's recorded events, extended so they end at its current level.
 *
 * daily_completions only records climbs. Decay is filled in from the day the
 * row was last answered correctly, stepping down exactly where decayIfStale
 * would; a fall the clock doesn't explain (three failures in a row) is drawn
 * just after the answers that caused it; and a level the row holds that no
 * event recorded (a lost daily_completions write) is drawn when it was earned.
 */
export function trackLevelTimeline(track: MasteryTrack, now: Date): LevelEvent[] {
  const { events, record, lastAttemptAt } = track
  const current = trackCurrentLevel(track, now)
  const last = events[events.length - 1]
  let level: MasteryState = last?.to ?? 'new'
  if (level === current) return events

  const tail: LevelEvent[] = []
  const lastCorrectAt = latest(dateOf(record?.last_correct_at), last?.at)
  if (lastCorrectAt && LEVEL_RANK[current] < LEVEL_RANK[level]) {
    for (const ev of syntheticDecayEvents(level, lastCorrectAt, now)) {
      if (LEVEL_RANK[ev.to] < LEVEL_RANK[current]) break
      tail.push(ev)
      level = ev.to
    }
  }

  if (level !== current) {
    // Always after the last recorded event, so the steps stay in order.
    const floor = last ? new Date(last.at.getTime() + 1) : null
    let at: Date
    if (LEVEL_RANK[current] < LEVEL_RANK[level]) {
      // Question responses from the quiz that did it carry a timestamp a
      // moment after the row's last_attempted_at, so anchor just past the
      // latest of them — otherwise the failing answers themselves would sit
      // on the Forgotten row.
      const afterAttempt = lastAttemptAt ? new Date(lastAttemptAt.getTime() + 1) : null
      at = latest(dateOf(record?.last_attempted_at), afterAttempt, floor) ?? now
      while (tail.length > 0 && tail[tail.length - 1].at >= at) tail.pop()
      level = tail[tail.length - 1]?.to ?? last?.to ?? 'new'
    } else {
      at = latest(dateOf(record?.last_correct_at ?? record?.last_attempted_at), floor) ?? now
    }
    if (level !== current) tail.push({ at, from: level, to: current })
  }

  return [...events, ...tail]
}

/**
 * Merge several tracks' timelines into the concept's: at every moment, the
 * best level any track holds. A track has no say before its first event — an
 * exam not yet started doesn't hold a forgotten concept up at New — and the
 * line starts from the earliest event's `from`.
 */
export function combineLevelTimelines(timelines: LevelEvent[][]): LevelEvent[] {
  const started = timelines.filter(t => t.length > 0)
  if (started.length === 0) return []

  const first = started.reduce((a, b) => (b[0].at < a[0].at ? b : a))
  const times = [...new Set(started.flatMap(t => t.map(ev => ev.at.getTime())))].sort((a, b) => a - b)

  const combined: LevelEvent[] = []
  let level: MasteryState = first[0].from
  for (const t of times) {
    const at = new Date(t)
    let best: MasteryState | null = null
    for (const timeline of started) {
      if (timeline[0].at > at) continue
      const state = levelAtTime(at, timeline)
      if (best === null || LEVEL_RANK[state] > LEVEL_RANK[best]) best = state
    }
    if (best !== null && best !== level) {
      combined.push({ at, from: level, to: best })
      level = best
    }
  }
  return combined
}

/**
 * The concept's level over time across all its mastery rows, and where it
 * stands now. `currentLevel` is where the line ends, so the pill and the graph
 * can't disagree.
 */
export function conceptLevelHistory(
  tracks: MasteryTrack[],
  now: Date,
): { levelEvents: LevelEvent[]; currentLevel: MasteryState } {
  const levelEvents = combineLevelTimelines(tracks.map(t => trackLevelTimeline(t, now)))
  return { levelEvents, currentLevel: levelEvents[levelEvents.length - 1]?.to ?? 'new' }
}
