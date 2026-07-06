// Persistence + sync glue for the XP / daily-goal system (roadmap P1.2). The math
// lives in lib/xp.ts; this module wires that pure engine to Supabase (source of
// truth for signed-in users) and to a localStorage fallback (guests, and an
// offline-friendly cache), and broadcasts an XP_EVENT so the useXp hook refreshes
// instantly. It mirrors lib/streakStore.ts, and reuses its timezone/day helpers.

import { supabase } from '@/lib/supabase'
import { trackXpEarned, trackDailyGoalMet } from '@/lib/analytics'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import {
  addXp,
  emptyXp,
  goalProgress,
  setGoal,
  type DailyGoalId,
  type XpState,
} from '@/lib/xp'

/** Dispatched (same-tab) whenever the persisted XP changes, so hooks refetch. */
export const XP_EVENT = 'actuarial_xp_updated'

const LOCAL_KEY = 'actuarial_xp_state'

function dispatchXpUpdated(): void {
  try {
    window.dispatchEvent(new CustomEvent(XP_EVENT))
  } catch {
    /* non-browser */
  }
}

// ── localStorage fallback ─────────────────────────────────────────────────────

export function readLocalXp(): XpState {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return emptyXp()
    return { ...emptyXp(), ...(JSON.parse(raw) as Partial<XpState>) }
  } catch {
    return emptyXp()
  }
}

export function writeLocalXp(state: XpState): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
  } catch {
    /* quota exceeded */
  }
}

// ── Supabase row mapping ──────────────────────────────────────────────────────

export interface XpRow {
  total_xp: number
  goal_id: string | null
  today: string | null
  today_xp: number
}

export function rowToXpState(row: XpRow | null | undefined): XpState | null {
  if (!row) return null
  return {
    totalXp: row.total_xp ?? 0,
    goalId: (row.goal_id as DailyGoalId | null) ?? emptyXp().goalId,
    today: row.today,
    todayXp: row.today_xp ?? 0,
  }
}

function xpStateToRow(userId: string, state: XpState, timeZone: string) {
  return {
    user_id: userId,
    total_xp: state.totalXp,
    goal_id: state.goalId,
    today: state.today,
    today_xp: state.todayXp,
    time_zone: timeZone,
    updated_at: new Date().toISOString(),
  }
}

// ── Awarding XP ───────────────────────────────────────────────────────────────

/** Fire analytics + notify hooks after a record. `justMet` = goal met this call. */
function afterRecord(next: XpState, amount: number, justMet: boolean, today: string): void {
  trackXpEarned({ amount, total: next.totalXp })
  if (justMet) {
    const prog = goalProgress(next, today)
    trackDailyGoalMet({ goal: prog.goal.id, xp: prog.target })
  }
  dispatchXpUpdated()
}

/** Apply `amount` to `current` for `today`, reporting whether it crossed the goal. */
function applyXp(
  current: XpState,
  amount: number,
  today: string,
): { next: XpState; justMet: boolean } {
  const next = addXp(current, amount, today)
  const justMet = !goalProgress(current, today).met && goalProgress(next, today).met
  return { next, justMet }
}

/**
 * Award XP for the current user. Signed-in users go through Supabase
 * (read-modify-write on user_xp); guests use the localStorage fallback so XP
 * still accrues before sign-in. Never throws — a failed XP write must not break
 * quiz completion.
 */
export async function recordXp(userId: string | null, amount: number): Promise<void> {
  if (amount <= 0) return
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)

  if (!userId) {
    const { next, justMet } = applyXp(readLocalXp(), amount, today)
    writeLocalXp(next)
    afterRecord(next, amount, justMet, today)
    return
  }

  try {
    const { data, error } = await supabase
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw new Error(error.message)

    const current = rowToXpState(data as XpRow | null) ?? emptyXp()
    const { next, justMet } = applyXp(current, amount, today)

    const { error: upsertError } = await supabase
      .from('user_xp')
      .upsert(xpStateToRow(userId, next, tz), { onConflict: 'user_id' })
    if (upsertError) throw new Error(upsertError.message)

    // Mirror to localStorage so an offline reload still shows the current XP.
    writeLocalXp(next)
    afterRecord(next, amount, justMet, today)
  } catch (err) {
    // Table may not be migrated yet, or the network is down — fall back to local.
    console.warn('recordXp: using local fallback:', err)
    const { next, justMet } = applyXp(readLocalXp(), amount, today)
    writeLocalXp(next)
    afterRecord(next, amount, justMet, today)
  }
}

/**
 * Change the user's daily goal (Settings picker). Persists to Supabase for
 * signed-in users and localStorage otherwise. Never throws.
 */
export async function setDailyGoal(userId: string | null, goalId: DailyGoalId): Promise<void> {
  const tz = resolveTimeZone()

  if (!userId) {
    const next = setGoal(readLocalXp(), goalId)
    writeLocalXp(next)
    dispatchXpUpdated()
    return
  }

  try {
    const { data, error } = await supabase
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw new Error(error.message)

    const current = rowToXpState(data as XpRow | null) ?? emptyXp()
    const next = setGoal(current, goalId)

    const { error: upsertError } = await supabase
      .from('user_xp')
      .upsert(xpStateToRow(userId, next, tz), { onConflict: 'user_id' })
    if (upsertError) throw new Error(upsertError.message)

    writeLocalXp(next)
    dispatchXpUpdated()
  } catch (err) {
    console.warn('setDailyGoal: using local fallback:', err)
    const next = setGoal(readLocalXp(), goalId)
    writeLocalXp(next)
    dispatchXpUpdated()
  }
}
