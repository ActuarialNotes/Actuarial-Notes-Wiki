// Persistence + sync glue for daily quests (roadmap P1.4). The mechanics live in
// lib/quests.ts (board generation, tallies, claiming) and the quests themselves
// in data/quests.ts; this module wires that pure engine to Supabase (source of
// truth for signed-in users) and a localStorage fallback (guests, and an
// offline-friendly cache), pays out rewards when the student collects a cleared
// quest, and broadcasts events so the useQuests hook and the post-quiz overlay
// refresh instantly. It mirrors lib/xpStore.ts and reuses its timezone/day
// helpers.
//
// Three entry points:
//   • ensureDailyQuests — seeds (or re-personalizes, while untouched) today's
//     board from the Dashboard's mastery/plan context.
//   • recordQuestProgress — advances the board on quiz completion. Completed
//     quests become *claimable*; nothing is paid here.
//   • claimQuestRewards — collects claimable quests: gems via the same
//     award_gems SECURITY DEFINER RPC the per-answer reward uses (signed-in
//     only, like the existing earn path), XP via recordXp (guests too).

import { supabase } from '@/lib/supabase'
import {
  trackDailyQuestsCleared,
  trackQuestClaimed,
  trackQuestCompleted,
} from '@/lib/analytics'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import { addDailyGems } from '@/lib/dailyProgressStore'
import { recordXp } from '@/lib/xpStore'
import {
  applyQuizEvent,
  claimQuests,
  emptyQuests,
  questRewards,
  reseedDailyQuests,
  type QuestContext,
  type QuestQuizEvent,
  type QuestsState,
} from '@/lib/quests'
import type { QuestDef } from '@/data/quests'

/** Dispatched (same-tab) whenever persisted quest progress changes. */
export const QUEST_EVENT = 'actuarial_quests_updated'

/** Dispatched when a quiz completes one or more quests (detail: QuestDef[]). */
export const QUEST_COMPLETED_EVENT = 'actuarial_quests_completed'

const LOCAL_KEY = 'actuarial_quests_state'
const JUST_COMPLETED_KEY = 'actuarial_quests_just_completed'

function dispatch(event: string, detail?: unknown): void {
  try {
    window.dispatchEvent(new CustomEvent(event, { detail }))
  } catch {
    /* non-browser */
  }
}

// ── localStorage fallback ─────────────────────────────────────────────────────

export function readLocalQuests(): QuestsState {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return emptyQuests()
    return { ...emptyQuests(), ...(JSON.parse(raw) as Partial<QuestsState>) }
  } catch {
    return emptyQuests()
  }
}

export function writeLocalQuests(state: QuestsState): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
  } catch {
    /* quota exceeded */
  }
}

// ── "Just completed" marker (post-quiz collect prompt) ────────────────────────
// recordQuestProgress runs fire-and-forget while the app navigates to the
// review screen, so newly completed quests are parked here (day-keyed) for the
// QuestCompleteOverlay to pick up whenever it mounts — plus the
// QUEST_COMPLETED_EVENT covers the already-mounted case.

interface JustCompleted {
  day: string
  quests: QuestDef[]
}

function appendJustCompleted(day: string, quests: QuestDef[]): void {
  try {
    const raw = localStorage.getItem(JUST_COMPLETED_KEY)
    const prev = raw ? (JSON.parse(raw) as JustCompleted) : null
    const kept = prev && prev.day === day ? prev.quests : []
    const merged = [...kept, ...quests.filter(q => !kept.some(k => k.id === q.id))]
    localStorage.setItem(JUST_COMPLETED_KEY, JSON.stringify({ day, quests: merged }))
  } catch {
    /* quota exceeded */
  }
}

/** Quests completed by recent quizzes today that haven't been surfaced yet. */
export function readJustCompletedQuests(): QuestDef[] {
  try {
    const raw = localStorage.getItem(JUST_COMPLETED_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as JustCompleted
    const today = localDayKey(new Date(), resolveTimeZone())
    return parsed.day === today ? parsed.quests : []
  } catch {
    return []
  }
}

export function clearJustCompletedQuests(): void {
  try {
    localStorage.removeItem(JUST_COMPLETED_KEY)
  } catch {
    /* ignore */
  }
}

// ── Supabase row mapping ──────────────────────────────────────────────────────

export interface QuestRow {
  day: string | null
  quests: QuestDef[] | null
  progress: Record<string, number> | null
  claimed: string[] | null
}

export function rowToQuestsState(row: QuestRow | null | undefined): QuestsState | null {
  if (!row) return null
  return {
    day: row.day,
    quests: Array.isArray(row.quests) ? row.quests : [],
    progress: row.progress ?? {},
    claimed: row.claimed ?? [],
  }
}

function questsStateToRow(userId: string, state: QuestsState, timeZone: string) {
  return {
    user_id: userId,
    day: state.day,
    quests: state.quests,
    progress: state.progress,
    claimed: state.claimed,
    time_zone: timeZone,
    updated_at: new Date().toISOString(),
  }
}

async function fetchQuestsState(userId: string): Promise<QuestsState> {
  const { data, error } = await supabase
    .from('user_quests')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return rowToQuestsState(data as QuestRow | null) ?? emptyQuests()
}

async function upsertQuestsState(userId: string, state: QuestsState, tz: string): Promise<void> {
  const { error } = await supabase
    .from('user_quests')
    .upsert(questsStateToRow(userId, state, tz), { onConflict: 'user_id' })
  if (error) throw new Error(error.message)
}

// ── Seeding / personalizing today's board ─────────────────────────────────────

/**
 * Make sure today's quest board exists, (re)personalized from the given context
 * — revive quests only when forgotten concepts are due, a focus quest from
 * today's study plan. Called by useQuests when the Dashboard has context; safe
 * to call repeatedly (no-ops and stays silent when nothing changes). Never
 * throws.
 */
export async function ensureDailyQuests(
  userId: string | null,
  context: QuestContext,
): Promise<void> {
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)

  if (!userId) {
    const current = readLocalQuests()
    const next = reseedDailyQuests(current, today, context)
    if (next === current) return
    writeLocalQuests(next)
    dispatch(QUEST_EVENT)
    return
  }

  try {
    const current = await fetchQuestsState(userId)
    const next = reseedDailyQuests(current, today, context)
    if (next === current) return
    await upsertQuestsState(userId, next, tz)
    writeLocalQuests(next)
    dispatch(QUEST_EVENT)
  } catch (err) {
    console.warn('ensureDailyQuests: using local fallback:', err)
    const current = readLocalQuests()
    const next = reseedDailyQuests(current, today, context)
    if (next === current) return
    writeLocalQuests(next)
    dispatch(QUEST_EVENT)
  }
}

// ── Recording quiz progress ───────────────────────────────────────────────────

/** Analytics + completion signals after a quiz advanced the board. */
function afterProgress(next: QuestsState, completed: QuestDef[], today: string): void {
  if (completed.length > 0) {
    for (const q of completed) {
      trackQuestCompleted({ quest: q.id, gems: q.gems, xp: q.xp })
    }
    if (next.quests.every(q => (next.progress[q.id] ?? 0) >= q.target)) {
      trackDailyQuestsCleared({ quests: next.quests.length })
    }
    appendJustCompleted(today, completed)
    dispatch(QUEST_COMPLETED_EVENT, completed)
  }
  dispatch(QUEST_EVENT)
}

/**
 * Advance today's quests with a completed quiz. Completed quests become
 * claimable (surfaced by the post-quiz overlay and the Dashboard card) — no
 * reward is paid here. Signed-in users go through Supabase (read-modify-write
 * on user_quests); guests use the localStorage fallback so progress still
 * accrues before sign-in. Never throws — a failed quest write must not break
 * quiz completion.
 */
export async function recordQuestProgress(
  userId: string | null,
  ev: QuestQuizEvent,
): Promise<void> {
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)

  if (!userId) {
    const { next, completed } = applyQuizEvent(readLocalQuests(), ev, today)
    writeLocalQuests(next)
    afterProgress(next, completed, today)
    return
  }

  try {
    const current = await fetchQuestsState(userId)
    const { next, completed } = applyQuizEvent(current, ev, today)
    if (next !== current) await upsertQuestsState(userId, next, tz)
    writeLocalQuests(next)
    afterProgress(next, completed, today)
  } catch (err) {
    // Table may not be migrated yet, or the network is down — fall back to local.
    console.warn('recordQuestProgress: using local fallback:', err)
    const { next, completed } = applyQuizEvent(readLocalQuests(), ev, today)
    writeLocalQuests(next)
    afterProgress(next, completed, today)
  }
}

// ── Claiming rewards ──────────────────────────────────────────────────────────

/**
 * Collect completed-but-unclaimed quests (optionally only the given ids) and
 * pay their rewards: XP for everyone via recordXp, gems for signed-in users via
 * the award_gems RPC. The claim is persisted *before* anything is paid, so a
 * retry after a payout failure can never double-pay. Returns the totals paid,
 * or null when nothing was claimable. Never throws.
 */
export async function claimQuestRewards(
  userId: string | null,
  ids?: readonly string[],
): Promise<{ gems: number; xp: number } | null> {
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)

  let claimed: QuestDef[]
  try {
    if (!userId) {
      const { next, claimed: c } = claimQuests(readLocalQuests(), today, ids)
      if (c.length === 0) return null
      writeLocalQuests(next)
      claimed = c
    } else {
      const current = await fetchQuestsState(userId)
      const { next, claimed: c } = claimQuests(current, today, ids)
      if (c.length === 0) return null
      await upsertQuestsState(userId, next, tz)
      writeLocalQuests(next)
      claimed = c
    }
  } catch (err) {
    // Don't fall back to a local claim for signed-in users: the cloud row still
    // shows the quest unclaimed, and a divergent local claim risks double-pay.
    console.warn('claimQuestRewards failed:', err)
    return null
  }

  const totals = questRewards(claimed)
  trackQuestClaimed({ quests: claimed.length, gems: totals.gems, xp: totals.xp })

  // recordXp never throws and fires its own XP_EVENT for the goal ring.
  if (totals.xp > 0) await recordXp(userId, totals.xp)

  if (totals.gems > 0 && userId) {
    try {
      const { error } = await supabase.rpc('award_gems', { p_amount: totals.gems })
      if (error) {
        console.warn('quest award_gems failed:', error.message)
      } else {
        // Same signal quizStore fires so useGems refetches immediately.
        dispatch('gems-awarded', { amount: totals.gems })
        addDailyGems(totals.gems)
      }
    } catch (err) {
      console.warn('quest award_gems threw:', err)
    }
  }

  dispatch(QUEST_EVENT)
  return totals
}
