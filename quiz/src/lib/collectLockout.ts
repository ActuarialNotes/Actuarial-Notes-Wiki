// Collect-check lockouts — pure, deterministic, and fully testable.
//
// A flashcard's comprehension check has four options, so a reader who doesn't
// know the answer can simply keep tapping until one sticks; the gate then
// certifies nothing. Missing the check therefore takes it off the table for a
// while: **30 minutes** after the first wrong answer, **a day** after the next
// one. The wait is the nudge — the concept page is right there behind the card,
// and the check is worth passing rather than guessing.
//
// The escalation is per concept and remembers misses across the wait, so the
// second miss costs a day even though the first lock has long since lifted.
// Passing the check clears the record (see hooks/useCollectLockouts): a
// collected card has nothing left to lock.
//
// This module is the decision layer — no I/O, no React, mirroring lib/streak.ts
// and lib/flashcardStudy.ts. The store persists it; the collect modal renders it.

/** What we remember about one concept's missed checks. */
export interface CollectLockout {
  /** Wrong answers on this concept's check, all-time (never decays). */
  misses: number
  /** Epoch ms the check reopens at. In the past once the wait has elapsed. */
  lockedUntil: number
}

/** Lockouts by concept key (see `lockoutKey`). */
export type CollectLockouts = Record<string, CollectLockout>

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * How long the check stays shut after each miss, first to last. The final step
 * repeats for every further miss — a day is already long enough to have made
 * the point, and an ever-growing wall would just abandon the concept.
 */
export const COLLECT_LOCKOUT_STEPS_MS: readonly number[] = [30 * MINUTE, DAY]

/** Concepts are matched case-insensitively, like the collected-cards store. */
export function lockoutKey(name: string): string {
  return name.trim().toLowerCase()
}

/** The wait earned by the nth miss (1-based), capped at the last step. */
export function lockoutDurationMs(missNumber: number): number {
  const index = Math.min(Math.max(1, Math.round(missNumber)), COLLECT_LOCKOUT_STEPS_MS.length) - 1
  return COLLECT_LOCKOUT_STEPS_MS[index]!
}

export function lockoutFor(
  lockouts: CollectLockouts,
  name: string,
): CollectLockout | undefined {
  return lockouts[lockoutKey(name)]
}

/** Milliseconds until the check reopens; 0 when it's open now. */
export function remainingLockoutMs(
  lockout: CollectLockout | undefined,
  now: number = Date.now(),
): number {
  if (!lockout) return 0
  return Math.max(0, lockout.lockedUntil - now)
}

export function isLockedOut(
  lockout: CollectLockout | undefined,
  now: number = Date.now(),
): boolean {
  return remainingLockoutMs(lockout, now) > 0
}

/**
 * The wait a *next* miss would cost — what the modal warns about before the
 * reader commits to an answer, so the penalty is never a surprise.
 */
export function nextLockoutDurationMs(lockout: CollectLockout | undefined): number {
  return lockoutDurationMs((lockout?.misses ?? 0) + 1)
}

/**
 * Record a wrong answer. The miss count carries forward, so the wait escalates
 * across sessions; an active lock is never shortened (a miss registered while
 * one is somehow still running extends, never resets, the wait).
 */
export function registerMiss(
  lockouts: CollectLockouts,
  name: string,
  now: number = Date.now(),
): CollectLockouts {
  const key = lockoutKey(name)
  if (!key) return lockouts
  const prev = lockouts[key]
  const misses = (prev?.misses ?? 0) + 1
  const lockedUntil = Math.max(now + lockoutDurationMs(misses), prev?.lockedUntil ?? 0)
  return { ...lockouts, [key]: { misses, lockedUntil } }
}

/** Forget a concept's misses — it's been collected, or manually cleared. */
export function clearLockout(lockouts: CollectLockouts, name: string): CollectLockouts {
  const key = lockoutKey(name)
  if (!(key in lockouts)) return lockouts
  const next = { ...lockouts }
  delete next[key]
  return next
}

/**
 * Coerce whatever localStorage handed back into a usable map, dropping entries
 * that aren't shaped like a lockout (a hand-edited or half-written record).
 */
export function sanitizeLockouts(raw: unknown): CollectLockouts {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const out: CollectLockouts = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!key || !value || typeof value !== 'object') continue
    const { misses, lockedUntil } = value as Partial<CollectLockout>
    if (typeof misses !== 'number' || typeof lockedUntil !== 'number') continue
    if (!Number.isFinite(misses) || !Number.isFinite(lockedUntil) || misses < 1) continue
    out[lockoutKey(key)] = { misses: Math.floor(misses), lockedUntil }
  }
  return out
}

/**
 * "30 minutes", "23 hours", "1 day" — the wait, rounded *up* so a countdown
 * never reads "0 minutes" while the check is still shut.
 */
export function formatLockoutRemaining(ms: number): string {
  if (ms <= 0) return 'now'
  if (ms < MINUTE) {
    const seconds = Math.ceil(ms / 1000)
    return `${seconds} second${seconds === 1 ? '' : 's'}`
  }
  if (ms < HOUR) {
    const minutes = Math.ceil(ms / MINUTE)
    return `${minutes} minute${minutes === 1 ? '' : 's'}`
  }
  const hours = Math.ceil(ms / HOUR)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'}`
  // Rounding up crossed the day line: a lock set a moment ago is a day long, and
  // "24 hours" is a stranger way to say so than "1 day".
  const days = Math.ceil(ms / DAY)
  return `${days} day${days === 1 ? '' : 's'}`
}

/** "29m", "23h", "1d" — the same wait where only a chip's width is going. */
export function formatLockoutShort(ms: number): string {
  if (ms <= 0) return '0m'
  if (ms < HOUR) return `${Math.ceil(ms / MINUTE)}m`
  if (ms < DAY) return `${Math.ceil(ms / HOUR)}h`
  return `${Math.ceil(ms / DAY)}d`
}
