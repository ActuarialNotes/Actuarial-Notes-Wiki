// Persistence + sync glue for daily quests (roadmap P1.4). The mechanics live in
// lib/quests.ts (rotation, tallies, completion) and the quests themselves in
// data/quests.ts; this module wires that pure engine to Supabase (source of
// truth for signed-in users) and a localStorage fallback (guests, and an
// offline-friendly cache), pays out rewards when quests complete, and broadcasts
// a QUEST_EVENT so the useQuests hook refreshes instantly. It mirrors
// lib/xpStore.ts and reuses its timezone/day helpers.
//
// Rewards: quest XP goes through recordXp (which handles guests and signed-in
// users alike), and quest gems go through the same award_gems SECURITY DEFINER
// RPC the per-answer gem reward uses — so gems only accrue for signed-in users,
// exactly like the existing earn path in stores/quizStore.ts.

import { supabase } from '@/lib/supabase'
import { trackDailyQuestsCleared, trackQuestCompleted } from '@/lib/analytics'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import { addDailyGems } from '@/lib/dailyProgressStore'
import { recordXp } from '@/lib/xpStore'
import {
  applyQuizEvent,
  emptyQuests,
  pickDailyQuests,
  questRewards,
  type QuestQuizEvent,
  type QuestsState,
} from '@/lib/quests'
import type { QuestDef } from '@/data/quests'

/** Dispatched (same-tab) whenever persisted quest progress changes. */
export const QUEST_EVENT = 'actuarial_quests_updated'

const LOCAL_KEY = 'actuarial_quests_state'

function dispatchQuestsUpdated(): void {
  try {
    window.dispatchEvent(new CustomEvent(QUEST_EVENT))
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

// ── Supabase row mapping ──────────────────────────────────────────────────────

export interface QuestRow {
  day: string | null
  progress: Record<string, number> | null
  rewarded: string[] | null
}

export function rowToQuestsState(row: QuestRow | null | undefined): QuestsState | null {
  if (!row) return null
  return {
    day: row.day,
    progress: row.progress ?? {},
    rewarded: row.rewarded ?? [],
  }
}

function questsStateToRow(userId: string, state: QuestsState, timeZone: string) {
  return {
    user_id: userId,
    day: state.day,
    progress: state.progress,
    rewarded: state.rewarded,
    time_zone: timeZone,
    updated_at: new Date().toISOString(),
  }
}

// ── Rewards ───────────────────────────────────────────────────────────────────

/**
 * Pay out newly completed quests and fire their analytics events. XP is awarded
 * for guests and signed-in users alike; gems require an account (they live only
 * in user_gems, behind the award_gems RPC). Never throws.
 */
async function payRewards(
  userId: string | null,
  completed: QuestDef[],
  clearedAll: boolean,
): Promise<void> {
  if (completed.length === 0) return
  const { gems, xp } = questRewards(completed)
  for (const q of completed) {
    trackQuestCompleted({ quest: q.id, gems: q.gems, xp: q.xp })
  }
  if (clearedAll) trackDailyQuestsCleared({ quests: completed.length })

  // recordXp never throws and fires its own XP_EVENT for the goal ring.
  if (xp > 0) await recordXp(userId, xp)

  if (gems > 0 && userId) {
    try {
      const { error } = await supabase.rpc('award_gems', { p_amount: gems })
      if (error) {
        console.warn('quest award_gems failed:', error.message)
      } else {
        // Same signal quizStore fires so useGems refetches immediately.
        window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount: gems } }))
        addDailyGems(gems)
      }
    } catch (err) {
      console.warn('quest award_gems threw:', err)
    }
  }
}

// ── Recording quiz progress ───────────────────────────────────────────────────

/**
 * Advance today's quests with a completed quiz and pay out any that cleared.
 * Signed-in users go through Supabase (read-modify-write on user_quests); guests
 * use the localStorage fallback so progress still accrues before sign-in. Never
 * throws — a failed quest write must not break quiz completion.
 */
export async function recordQuestProgress(
  userId: string | null,
  ev: QuestQuizEvent,
): Promise<void> {
  const tz = resolveTimeZone()
  const today = localDayKey(new Date(), tz)
  const quests = pickDailyQuests(today)
  if (quests.length === 0) return

  const finish = async (current: QuestsState): Promise<QuestsState> => {
    const { next, completed } = applyQuizEvent(current, ev, today, quests)
    const clearedAll =
      completed.length > 0 && quests.every(q => next.rewarded.includes(q.id))
    writeLocalQuests(next)
    await payRewards(userId, completed, clearedAll)
    dispatchQuestsUpdated()
    return next
  }

  if (!userId) {
    await finish(readLocalQuests())
    return
  }

  try {
    const { data, error } = await supabase
      .from('user_quests')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw new Error(error.message)

    const current = rowToQuestsState(data as QuestRow | null) ?? emptyQuests()
    const { next, completed } = applyQuizEvent(current, ev, today, quests)

    // Persist BEFORE paying rewards so a retry after a payout failure can't
    // double-pay: once `rewarded` is stored, applyQuizEvent won't re-complete.
    if (next !== current) {
      const { error: upsertError } = await supabase
        .from('user_quests')
        .upsert(questsStateToRow(userId, next, tz), { onConflict: 'user_id' })
      if (upsertError) throw new Error(upsertError.message)
    }

    const clearedAll =
      completed.length > 0 && quests.every(q => next.rewarded.includes(q.id))
    writeLocalQuests(next)
    await payRewards(userId, completed, clearedAll)
    dispatchQuestsUpdated()
  } catch (err) {
    // Table may not be migrated yet, or the network is down — fall back to local.
    console.warn('recordQuestProgress: using local fallback:', err)
    await finish(readLocalQuests())
  }
}
