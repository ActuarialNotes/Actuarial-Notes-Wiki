// Persistence + sync glue for the daily streak. The math lives in lib/streak.ts;
// this module wires that pure engine to Supabase (source of truth for signed-in
// users) and to a localStorage fallback (guests, and an offline-friendly cache),
// and broadcasts a STREAK_EVENT so the useStreak hook refreshes instantly.

import { supabase } from '@/lib/supabase'
import { trackStreakExtended } from '@/lib/analytics'
import {
  effectiveStreak,
  emptyStreak,
  localDayKey,
  recordActivity,
  repairStreak,
  type StreakState,
} from '@/lib/streak'

/** Streak-freeze tokens a brand-new streak starts with (matches the DB default). */
export const INITIAL_FREEZES = 2

/** Dispatched (same-tab) whenever the persisted streak changes, so hooks refetch. */
export const STREAK_EVENT = 'actuarial_streak_updated'

/**
 * Dispatched once every time recordStreakActivity settles for the day, carrying
 * whether today's (displayed) streak actually grew and its new length. The
 * post-quiz StreakCompleteOverlay listens for this to decide whether to run the
 * flame celebration — and, when it didn't grow, to step aside so the quest
 * overlay can take over immediately. detail: { increased, streak }.
 */
export const STREAK_CELEBRATION_EVENT = 'actuarial_streak_celebration'

const LOCAL_KEY = 'actuarial_streak_state'
const CELEBRATION_KEY = 'actuarial_streak_celebration'

/** Resolve the user's IANA timezone, falling back to UTC when unavailable. */
export function resolveTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

/** Fresh state for a first-time user — pure empty streak plus the welcome freezes. */
export function newUserStreak(): StreakState {
  return { ...emptyStreak(), freezes: INITIAL_FREEZES }
}

function dispatchStreakUpdated(): void {
  try {
    window.dispatchEvent(new CustomEvent(STREAK_EVENT))
  } catch {
    /* non-browser */
  }
}

/** Emit the analytics event when a record extended (didn't just repeat) the streak. */
function trackGrowth(before: StreakState, after: StreakState): void {
  if (after.currentStreak > before.currentStreak) {
    trackStreakExtended({ length: after.currentStreak, longest: after.longestStreak })
  }
}

// ── Post-quiz celebration marker ──────────────────────────────────────────────
// recordStreakActivity runs fire-and-forget while the app navigates to /review,
// so whether today's streak grew is parked here (day-keyed) for the
// StreakCompleteOverlay to pick up whenever it mounts, plus a
// STREAK_CELEBRATION_EVENT covers the case where it settles after mount. A
// marker is written on *every* settle (grown or not) so the overlay can resolve
// deterministically: `increased` gates the flame animation; a not-grown marker
// tells the overlay to step aside for the quest celebration.

/** Today's streak-celebration marker: did the displayed streak grow, and to what. */
export interface StreakCelebration {
  day: string
  streak: number
  increased: boolean
}

export function readStreakCelebration(): StreakCelebration | null {
  try {
    const raw = localStorage.getItem(CELEBRATION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StreakCelebration
    const today = localDayKey(new Date(), resolveTimeZone())
    return parsed.day === today ? parsed : null
  } catch {
    return null
  }
}

function writeStreakCelebration(c: StreakCelebration): void {
  try {
    localStorage.setItem(CELEBRATION_KEY, JSON.stringify(c))
  } catch {
    /* quota exceeded */
  }
}

/**
 * Mark today's celebration as shown (increased → false) once the overlay has
 * run it, so returning to /review doesn't replay the flame. Keeps the day marker
 * so a remount still resolves (nothing to show) instead of hanging.
 */
export function consumeStreakCelebration(): void {
  const c = readStreakCelebration()
  if (!c || !c.increased) return
  writeStreakCelebration({ ...c, increased: false })
}

/**
 * Persist + broadcast the outcome of a streak record for today. "Increased" is
 * measured on the *displayed* streak (effectiveStreak), so restarting a lapsed
 * streak (0 → 1) celebrates, while a second quiz on an already-counted day does
 * not. Fires the analytics growth event, the STREAK_EVENT refetch signal, and
 * the STREAK_CELEBRATION_EVENT the overlay listens for.
 */
function settleStreak(before: StreakState, after: StreakState, today: string): void {
  const streak = effectiveStreak(after, today)
  const increased = streak > effectiveStreak(before, today)
  writeStreakCelebration({ day: today, streak, increased })
  trackGrowth(before, after)
  dispatchStreakUpdated()
  try {
    window.dispatchEvent(
      new CustomEvent(STREAK_CELEBRATION_EVENT, { detail: { increased, streak } }),
    )
  } catch {
    /* non-browser */
  }
}

// ── localStorage fallback ─────────────────────────────────────────────────────

export function readLocalStreak(): StreakState {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return newUserStreak()
    return { ...newUserStreak(), ...(JSON.parse(raw) as Partial<StreakState>) }
  } catch {
    return newUserStreak()
  }
}

export function writeLocalStreak(state: StreakState): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
  } catch {
    /* quota exceeded */
  }
}

// ── Supabase row mapping ──────────────────────────────────────────────────────

interface StreakRow {
  current_streak: number
  longest_streak: number
  last_active_day: string | null
  freezes: number
  last_broken_streak: number
  last_broken_on: string | null
}

export function rowToState(row: StreakRow | null | undefined): StreakState | null {
  if (!row) return null
  return {
    currentStreak: row.current_streak ?? 0,
    longestStreak: row.longest_streak ?? 0,
    lastActiveDay: row.last_active_day,
    freezes: row.freezes ?? 0,
    lastBrokenStreak: row.last_broken_streak ?? 0,
    lastBrokenOn: row.last_broken_on,
  }
}

function stateToRow(userId: string, state: StreakState, timeZone: string) {
  return {
    user_id: userId,
    current_streak: state.currentStreak,
    longest_streak: state.longestStreak,
    last_active_day: state.lastActiveDay,
    freezes: state.freezes,
    last_broken_streak: state.lastBrokenStreak,
    last_broken_on: state.lastBrokenOn,
    time_zone: timeZone,
    updated_at: new Date().toISOString(),
  }
}

// ── Recording activity ────────────────────────────────────────────────────────

/**
 * Register a day of study for the current user. Idempotent per local day, so it
 * is safe to call on every quiz completion. Signed-in users go through Supabase
 * (read-modify-write on user_streaks); guests use the localStorage fallback so a
 * streak still accrues before sign-in. Never throws — a failed streak write must
 * not break quiz completion.
 */
export async function recordStreakActivity(userId: string | null): Promise<void> {
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)

  if (!userId) {
    const current = readLocalStreak()
    const next = recordActivity(current, today)
    writeLocalStreak(next)
    settleStreak(current, next, today)
    return
  }

  try {
    const { data, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw new Error(error.message)

    const current = rowToState(data as StreakRow | null) ?? newUserStreak()
    const next = recordActivity(current, today)

    // Skip the write when nothing changed (already active today), but still
    // settle so the overlay learns the streak didn't grow and steps aside.
    if (!(data && next === current)) {
      const { error: upsertError } = await supabase
        .from('user_streaks')
        .upsert(stateToRow(userId, next, tz), { onConflict: 'user_id' })
      if (upsertError) throw new Error(upsertError.message)

      // Mirror to localStorage so an offline reload still shows the current streak.
      writeLocalStreak(next)
    }
    settleStreak(current, next, today)
  } catch (err) {
    // Table may not be migrated yet, or the network is down — fall back to local.
    console.warn('recordStreakActivity: using local fallback:', err)
    const current = readLocalStreak()
    const next = recordActivity(current, today)
    writeLocalStreak(next)
    settleStreak(current, next, today)
  }
}

/**
 * Restore a lapsed streak for the current user (same-day repair). Returns true
 * when a repair was actually applied. The caller is responsible for any cost
 * (e.g. spending gems) before invoking this.
 */
export async function repairStreakActivity(userId: string | null): Promise<boolean> {
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)

  if (!userId) {
    const current = readLocalStreak()
    const next = repairStreak(current, today)
    if (next === current) return false
    writeLocalStreak(next)
    dispatchStreakUpdated()
    return true
  }

  try {
    const { data, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw new Error(error.message)

    const current = rowToState(data as StreakRow | null) ?? newUserStreak()
    const next = repairStreak(current, today)
    if (next === current) return false

    const { error: upsertError } = await supabase
      .from('user_streaks')
      .upsert(stateToRow(userId, next, tz), { onConflict: 'user_id' })
    if (upsertError) throw new Error(upsertError.message)

    writeLocalStreak(next)
    dispatchStreakUpdated()
    return true
  } catch (err) {
    console.warn('repairStreakActivity failed:', err)
    return false
  }
}
