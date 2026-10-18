// Learning instrumentation (roadmap L1).
//
// The engagement events say a learner *did* something — answered, finished,
// came back. These say whether it *worked*, which is what the learning-engine
// experiments (interleaving, tunable spacing, the mistakes deck) will be judged
// on. Three questions, each a pure function here, sent from lib/analytics.ts:
//
//   • concept_retention — when a concept comes back after its decay window,
//     was it still known? `retained` is the first answer of the revisit.
//   • reminder_opened / reminder_session — did the daily study-plan email bring
//     the learner back, and did that visit turn into a quiz?
//   • mistake_reviewed — when a missed question is tried again in the
//     fix-mistakes reviewer, is it right this time, and how long after the miss?
//
// No I/O and no React: the storage for "already reported" is passed in, the
// same arrangement as lib/funnel.ts.

import { decayIfStale, sanitizeMasteryState, type ConceptMasteryRecord, type MasteryState } from './mastery'

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** Whole days from `fromIso` to `now`, never negative; null for a missing or bad date. */
export function daysSince(fromIso: string | null | undefined, now: Date): number | null {
  if (!fromIso) return null
  const from = new Date(fromIso).getTime()
  if (Number.isNaN(from)) return null
  return Math.max(0, Math.floor((now.getTime() - from) / MS_PER_DAY))
}

// ── concept_retention ───────────────────────────────────────────────────────

/** One answered question, reduced to what retention needs, in answer order. */
export interface RetentionAnswer {
  exam: string
  /** The question's concepts as canonical mastery slugs. */
  concepts: readonly string[]
  isCorrect: boolean
}

export interface ConceptRetention {
  concept: string
  exam: string
  /** Was the first answer on the revisit correct? */
  retained: boolean
  /** The level the concept had earned before it decayed. */
  level: MasteryState
  /** Days since the concept was last answered correctly. */
  days_since_correct: number
}

/**
 * A decay episode: one concept from the day it was last answered correctly.
 * It ends the next time the concept is answered correctly, which moves
 * `last_correct_at` — so a revisit answered wrong today and again tomorrow is
 * one episode, reported once, by its first answer.
 */
export function retentionEpisodeKey(record: Pick<ConceptMasteryRecord, 'exam_id' | 'concept_slug' | 'last_correct_at'>): string {
  return `${record.exam_id}::${record.concept_slug.toLowerCase()}::${record.last_correct_at ?? ''}`
}

/**
 * The revisits in one set of answers: every concept that had decayed — its last
 * correct answer is older than its level's decay window, so `decayIfStale`
 * steps it down — answered for the first time since. `priorRecords` are the
 * mastery records *before* these answers; `reported` holds the episode keys
 * already sent, so a concept is reported once per episode however many quizzes
 * it takes. Returns the events and the keys to add to `reported`.
 */
export function conceptRetentionEvents(
  answers: readonly RetentionAnswer[],
  priorRecords: readonly ConceptMasteryRecord[],
  reported: ReadonlySet<string>,
  now: Date,
): { events: ConceptRetention[]; keys: string[] } {
  const bySlug = new Map<string, ConceptMasteryRecord>()
  for (const r of priorRecords) bySlug.set(r.concept_slug.toLowerCase(), r)

  const events: ConceptRetention[] = []
  const keys: string[] = []
  const seen = new Set<string>()
  for (const answer of answers) {
    for (const slug of answer.concepts) {
      const lower = slug.toLowerCase()
      if (seen.has(lower)) continue
      seen.add(lower)
      const record = bySlug.get(lower)
      if (!record?.last_correct_at) continue
      const level = sanitizeMasteryState(record.state)
      if (level === 'new' || level === 'forgotten') continue
      if (decayIfStale({ ...record, state: level }, now).state === level) continue
      const key = retentionEpisodeKey(record)
      if (reported.has(key)) continue
      keys.push(key)
      events.push({
        concept: record.concept_slug,
        exam: answer.exam,
        retained: answer.isCorrect,
        level,
        days_since_correct: daysSince(record.last_correct_at, now) ?? 0,
      })
    }
  }
  return { events, keys }
}

/** How many episode keys are kept: enough for every concept of a few exams. */
export const RETENTION_KEYS_KEPT = 2000

/** The stored key list with `added` appended, oldest dropped past the cap. */
export function withRetentionKeys(stored: readonly string[], added: readonly string[]): string[] {
  const next = [...stored.filter(k => !added.includes(k)), ...added]
  return next.length > RETENTION_KEYS_KEPT ? next.slice(next.length - RETENTION_KEYS_KEPT) : next
}

/** Parse the stored key list, tolerating anything that isn't a string array. */
export function parseRetentionKeys(raw: string | null): string[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === 'string') : []
  } catch {
    return []
  }
}

// ── reminder_opened / reminder_session ──────────────────────────────────────

/**
 * The `utm_source` each reminder channel's links carry. GA4 reads the same
 * parameters for session attribution, so the email's visits are also its
 * traffic source in every standard report. The daily-plan-email edge function
 * writes the email's — keep the two in step.
 */
export const REMINDER_SOURCES: Readonly<Record<string, string>> = {
  'daily-plan-email': 'email',
}

/** The reminder channel a landing URL's query names, or null. */
export function reminderChannelFromSearch(search: string): string | null {
  const source = new URLSearchParams(search).get('utm_source')
  return source ? (REMINDER_SOURCES[source] ?? null) : null
}

/** A visit that came from a reminder, held for the rest of the browser session. */
export interface ReminderVisit {
  channel: string
  openedAt: string
  /** Has this visit's first quiz been reported as `reminder_session`? */
  sessionReported: boolean
}

/**
 * How long after opening a reminder a finished quiz still counts as the session
 * it brought about. Long enough for "opened it on the bus, studied at home",
 * short enough that tomorrow's quiz in a tab left open isn't credited to it.
 */
export const REMINDER_SESSION_HOURS = 6

export function parseReminderVisit(raw: string | null): ReminderVisit | null {
  if (!raw) return null
  try {
    const v = JSON.parse(raw) as Partial<ReminderVisit>
    if (typeof v.channel !== 'string' || typeof v.openedAt !== 'string') return null
    if (Number.isNaN(new Date(v.openedAt).getTime())) return null
    return { channel: v.channel, openedAt: v.openedAt, sessionReported: v.sessionReported === true }
  } catch {
    return null
  }
}

/**
 * Should a quiz finished `now` be reported as the session this reminder visit
 * brought about? Once per visit, and only within the window.
 */
export function reminderSessionDue(visit: ReminderVisit | null, now: Date): boolean {
  if (!visit || visit.sessionReported) return false
  const elapsed = now.getTime() - new Date(visit.openedAt).getTime()
  return elapsed >= 0 && elapsed <= REMINDER_SESSION_HOURS * 60 * 60 * 1000
}

/** Whole minutes from opening the reminder to `now`. */
export function minutesAfterOpen(visit: ReminderVisit, now: Date): number {
  return Math.max(0, Math.round((now.getTime() - new Date(visit.openedAt).getTime()) / 60000))
}
