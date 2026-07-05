// Activation-funnel milestone tracking.
//
// The product analytics layer (lib/analytics.ts) reports an activation funnel —
// signup → first_quiz → first_correct → concept_collected → day2_return — where
// most steps must fire *at most once per device*. This module holds the small,
// pure decision logic for that "fire once" gating plus a thin localStorage-backed
// default store, so the funnel events can be emitted from anywhere without each
// call site tracking its own "already sent" bookkeeping.
//
// The logic is pure and the storage is injectable so it can be unit-tested under
// Node (no `window`/`localStorage`), matching the rest of the lib/ layer.

/** Funnel steps that fire only the first time they're reached on a device. */
export type FunnelMilestone =
  | 'first_quiz'
  | 'first_correct'
  | 'concept_collected'
  | 'day2_return'

const MILESTONE_PREFIX = 'actuarial_funnel_'
const FIRST_VISIT_KEY = 'actuarial_funnel_first_visit_day'
const DAY2_KEY = 'actuarial_funnel_day2_return'

// Minimal synchronous key/value surface. `localStorage` satisfies it in the
// browser; tests pass an in-memory fake so the pure logic runs under Node.
export interface KeyValueStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn()
  } catch {
    return fallback
  }
}

function defaultStore(): KeyValueStore | null {
  return safe(() => (typeof localStorage === 'undefined' ? null : localStorage), null)
}

/**
 * Record that a milestone was reached. Returns `true` only the FIRST time it is
 * reached on this device and `false` on every later call, so a caller can fire a
 * one-shot funnel event with `if (reachMilestone(...)) track(...)` and never has
 * to persist its own flag. When no store is available (SSR / blocked storage) it
 * returns `false` — the event is skipped rather than fired repeatedly.
 */
export function reachMilestone(
  milestone: FunnelMilestone,
  store: KeyValueStore | null = defaultStore(),
): boolean {
  if (!store) return false
  const key = MILESTONE_PREFIX + milestone
  return safe(() => {
    if (store.getItem(key)) return false
    store.setItem(key, new Date().toISOString())
    return true
  }, false)
}

/** Calendar-day key ('YYYY-MM-DD', UTC) used to detect a cross-day return. */
export function dayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export interface Day2Decision {
  /** Whether the day2_return event should fire now. */
  fire: boolean
  /** The value that should be persisted as the first-visit day. */
  firstVisitDay: string
}

/**
 * Pure core of the day2_return signal: given the stored first-visit day, whether
 * day2_return has already fired, and today's day key, decide whether the user is
 * returning on a later calendar day than their first visit (fires once).
 */
export function decideDay2(
  storedFirstVisitDay: string | null,
  day2AlreadyFired: boolean,
  currentDay: string,
): Day2Decision {
  // First ever visit — seed the marker, nothing to fire yet.
  if (!storedFirstVisitDay) return { fire: false, firstVisitDay: currentDay }
  if (day2AlreadyFired) return { fire: false, firstVisitDay: storedFirstVisitDay }
  return { fire: currentDay > storedFirstVisitDay, firstVisitDay: storedFirstVisitDay }
}

/**
 * Record this visit and report whether it's the user's first return on a
 * calendar day after their first-ever visit (the D1 "day2_return" activation
 * signal). Fires at most once per device.
 */
export function recordVisitAndCheckDay2(
  now: Date = new Date(),
  store: KeyValueStore | null = defaultStore(),
): boolean {
  if (!store) return false
  return safe(() => {
    const currentDay = dayKey(now)
    const storedFirstVisit = store.getItem(FIRST_VISIT_KEY)
    const day2Already = store.getItem(DAY2_KEY) != null
    const decision = decideDay2(storedFirstVisit, day2Already, currentDay)
    if (!storedFirstVisit) store.setItem(FIRST_VISIT_KEY, decision.firstVisitDay)
    if (decision.fire) store.setItem(DAY2_KEY, currentDay)
    return decision.fire
  }, false)
}
