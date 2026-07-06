// Persistence + sync glue for the daily streak. The math lives in lib/streak.ts;
// this module wires that pure engine to Supabase (source of truth for signed-in
// users) and to a localStorage fallback (guests, and an offline-friendly cache),
// and broadcasts a STREAK_EVENT so the useStreak hook refreshes instantly.

import { supabase } from '@/lib/supabase'
import { trackStreakExtended } from '@/lib/analytics'
import {
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

const LOCAL_KEY = 'actuarial_streak_state'

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
    trackGrowth(current, next)
    dispatchStreakUpdated()
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

    // Nothing changed (already active today) — skip the write.
    if (data && next === current) {
      dispatchStreakUpdated()
      return
    }

    const { error: upsertError } = await supabase
      .from('user_streaks')
      .upsert(stateToRow(userId, next, tz), { onConflict: 'user_id' })
    if (upsertError) throw new Error(upsertError.message)

    // Mirror to localStorage so an offline reload still shows the current streak.
    writeLocalStreak(next)
    trackGrowth(current, next)
  } catch (err) {
    // Table may not be migrated yet, or the network is down — fall back to local.
    console.warn('recordStreakActivity: using local fallback:', err)
    const current = readLocalStreak()
    const next = recordActivity(current, today)
    writeLocalStreak(next)
    trackGrowth(current, next)
  }
  dispatchStreakUpdated()
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
