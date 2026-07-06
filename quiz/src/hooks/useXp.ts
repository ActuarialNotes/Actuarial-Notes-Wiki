import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { localDayKey } from '@/lib/streak'
import { resolveTimeZone } from '@/lib/streakStore'
import {
  emptyXp,
  goalProgress,
  levelFromXp,
  type DailyGoalId,
  type DailyGoalPreset,
  type XpState,
} from '@/lib/xp'
import { readLocalXp, rowToXpState, XP_EVENT, type XpRow } from '@/lib/xpStore'

export interface XpView {
  /** All-time XP. */
  totalXp: number
  /** Current level (1-indexed). */
  level: number
  /** XP accumulated within the current level. */
  xpIntoLevel: number
  /** XP span of the current level (xpIntoLevel / xpForLevel = the level bar). */
  xpForLevel: number
  /** Selected daily-goal preset. */
  goal: DailyGoalPreset
  /** The selected goal's id (for the picker). */
  goalId: DailyGoalId
  /** XP earned today. */
  earnedToday: number
  /** Today's goal target (XP). */
  target: number
  /** earnedToday/target, clamped to [0, 1] — the ring fill. */
  ratio: number
  /** Whether today's goal has been met. */
  met: boolean
  loading: boolean
  /** Force a re-read from the source of truth. */
  refresh: () => void
}

// Reads the current user's XP (Supabase when signed in, localStorage for guests)
// and keeps it fresh via realtime, the same-tab XP_EVENT fired on quiz completion,
// and a tab-focus refetch. Mirrors the load/subscribe pattern used by useStreak.
export function useXp(): XpView {
  const { user } = useAuth()
  const userId = user?.id
  const tz = useMemo(() => resolveTimeZone(), [])
  // Per-instance channel name so multiple mounts don't collide on one channel.
  const channelId = useRef(`xp-${Math.random().toString(36).slice(2)}`)
  const [state, setState] = useState<XpState>(readLocalXp)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setState(readLocalXp())
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }: { data: XpRow | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          // Table may not be migrated yet — fall back to the local signal.
          setState(readLocalXp())
        } else {
          setState(rowToXpState(data) ?? emptyXp())
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, version])

  // Same-tab updates (quiz completion / goal change writes then dispatches XP_EVENT).
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(XP_EVENT, handler)
    return () => window.removeEventListener(XP_EVENT, handler)
  }, [refresh])

  // Cross-device updates via realtime.
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`user_xp:${userId}:${channelId.current}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_xp', filter: `user_id=eq.${userId}` },
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
  const lvl = levelFromXp(state.totalXp)
  const prog = goalProgress(state, today)
  return {
    totalXp: lvl.totalXp,
    level: lvl.level,
    xpIntoLevel: lvl.xpIntoLevel,
    xpForLevel: lvl.xpForLevel,
    goal: prog.goal,
    goalId: state.goalId,
    earnedToday: prog.earned,
    target: prog.target,
    ratio: prog.ratio,
    met: prog.met,
    loading,
    refresh,
  }
}
