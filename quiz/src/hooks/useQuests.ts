import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import {
  emptyQuests,
  pickDailyQuests,
  questBoard,
  type QuestProgressView,
  type QuestsState,
} from '@/lib/quests'
import { QUEST_EVENT, readLocalQuests, rowToQuestsState, type QuestRow } from '@/lib/questStore'

export interface QuestsView {
  /** Today's quests with their progress, in display order. */
  board: QuestProgressView[]
  /** How many of today's quests are cleared. */
  completedCount: number
  /** How many quests are live today. */
  totalCount: number
  /** Whether every quest is cleared. */
  allDone: boolean
  loading: boolean
  /** Force a re-read from the source of truth. */
  refresh: () => void
}

// Reads the current user's daily-quest progress (Supabase when signed in,
// localStorage for guests) and keeps it fresh via realtime, the same-tab
// QUEST_EVENT fired on quiz completion, and a tab-focus refetch. Mirrors the
// load/subscribe pattern used by useXp/useStreak.
export function useQuests(): QuestsView {
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
          setState(rowToQuestsState(data) ?? emptyQuests())
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, version])

  // Same-tab updates (quiz completion writes then dispatches QUEST_EVENT).
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

  const today = localDayKey(new Date(), tz)
  const board = questBoard(state, today, pickDailyQuests(today))
  const completedCount = board.filter(b => b.done).length
  return {
    board,
    completedCount,
    totalCount: board.length,
    allDone: board.length > 0 && completedCount === board.length,
    loading,
    refresh,
  }
}
