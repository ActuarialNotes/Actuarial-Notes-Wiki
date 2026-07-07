import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import {
  emptyQuests,
  questBoard,
  questRewards,
  type QuestContext,
  type QuestProgressView,
  type QuestsState,
} from '@/lib/quests'
import {
  claimQuestRewards,
  ensureDailyQuests,
  hasTodayBoard,
  QUEST_EVENT,
  readLocalQuests,
  rowToQuestsState,
  type QuestRow,
} from '@/lib/questStore'

export interface QuestsView {
  /** Today's quests with their progress, in display order. */
  board: QuestProgressView[]
  /** How many of today's quests are cleared (target reached). */
  completedCount: number
  /** How many quests are on today's board. */
  totalCount: number
  /** Whether every quest is cleared. */
  allDone: boolean
  /** Cleared-but-uncollected quests. */
  claimable: QuestProgressView[]
  /** Total gems waiting to be collected. */
  claimableGems: number
  /** Total XP waiting to be collected. */
  claimableXp: number
  /** Collect rewards (all claimable quests, or just the given ids). */
  claim: (ids?: readonly string[]) => Promise<void>
  loading: boolean
  /** Force a re-read from the source of truth. */
  refresh: () => void
}

// Reads the current user's daily-quest board (Supabase when signed in,
// localStorage for guests) and keeps it fresh via realtime, the same-tab
// QUEST_EVENT fired on quiz completion / claims, and a tab-focus refetch.
// Mirrors the load/subscribe pattern used by useXp/useStreak.
//
// Pass `context` (mastery + study-plan signals, computed by the Dashboard) to
// seed today's personalized board; leave it undefined while that data is still
// loading — the hook re-personalizes as soon as it arrives, but only while the
// board is untouched (see lib/quests.ts reseedDailyQuests).
export function useQuests(context?: QuestContext): QuestsView {
  const { user } = useAuth()
  const userId = user?.id
  const tz = useMemo(() => resolveTimeZone(), [])
  // Per-instance channel name so multiple mounts don't collide on one channel.
  const channelId = useRef(`quests-${Math.random().toString(36).slice(2)}`)
  const [state, setState] = useState<QuestsState>(readLocalQuests)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setState(readLocalQuests())
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('user_quests')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }: { data: QuestRow | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          // Table may not be migrated yet — fall back to the local signal.
          setState(readLocalQuests())
        } else {
          // Prefer the cloud row, but when it can't carry today's board (table
          // on the pre-board schema, or a quiz finished before the row synced)
          // fall back to the localStorage mirror the questStore maintains —
          // otherwise the card would vanish for exactly those users.
          const cloud = rowToQuestsState(data) ?? emptyQuests()
          const local = readLocalQuests()
          const todayKey = localDayKey(new Date(), tz)
          setState(hasTodayBoard(cloud, todayKey) || !hasTodayBoard(local, todayKey) ? cloud : local)
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, version, tz])

  // Seed / re-personalize today's board once the caller has real context. The
  // store only writes (and only dispatches QUEST_EVENT) when something actually
  // changes, so this settles instead of looping.
  const contextKey = context
    ? `${context.forgottenDue}:${context.planConcepts.join('|')}`
    : null
  useEffect(() => {
    if (loading || !context) return
    void ensureDailyQuests(userId ?? null, context)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loading, contextKey])

  // Same-tab updates (quiz completion / claim writes then dispatches QUEST_EVENT).
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(QUEST_EVENT, handler)
    return () => window.removeEventListener(QUEST_EVENT, handler)
  }, [refresh])

  // Cross-device updates via realtime.
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`user_quests:${userId}:${channelId.current}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_quests', filter: `user_id=eq.${userId}` },
        () => refresh(),
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, refresh])

  // Refetch when the tab regains focus (crossing a midnight boundary, or a quiz
  // finished on another device).
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') refresh() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [refresh])

  const claim = useCallback(
    async (ids?: readonly string[]) => {
      await claimQuestRewards(userId ?? null, ids)
    },
    [userId],
  )

  const today = localDayKey(new Date(), tz)
  const board = questBoard(state, today)
  const completedCount = board.filter(b => b.done).length
  const claimable = board.filter(b => b.claimable)
  const totals = questRewards(claimable.map(b => b.quest))
  return {
    board,
    completedCount,
    totalCount: board.length,
    allDone: board.length > 0 && completedCount === board.length,
    claimable,
    claimableGems: totals.gems,
    claimableXp: totals.xp,
    claim,
    loading,
    refresh,
  }
}
