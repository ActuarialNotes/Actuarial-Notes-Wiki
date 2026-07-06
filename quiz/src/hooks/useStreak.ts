import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import {
  canRepair,
  effectiveStreak,
  localDayKey,
  streakStatus,
  type StreakState,
  type StreakStatus,
} from '@/lib/streak'
import {
  newUserStreak,
  readLocalStreak,
  resolveTimeZone,
  rowToState,
  STREAK_EVENT,
} from '@/lib/streakStore'

export interface StreakView {
  /** Streak length to display right now (0 once a streak has lapsed). */
  currentStreak: number
  /** All-time best streak. */
  longestStreak: number
  /** Streak-freeze tokens available. */
  freezes: number
  /** active (studied today) | at_risk (act today) | inactive. */
  status: StreakStatus
  /** True when a just-lapsed streak can still be repaired today. */
  repairable: boolean
  loading: boolean
  /** Force a re-read from the source of truth. */
  refresh: () => void
}

interface StreakRow {
  current_streak: number
  longest_streak: number
  last_active_day: string | null
  freezes: number
  last_broken_streak: number
  last_broken_on: string | null
}

// Reads the current user's streak (Supabase when signed in, localStorage for
// guests) and keeps it fresh via realtime, the same-tab STREAK_EVENT fired on
// quiz completion, and a tab-focus refetch. Mirrors the load/subscribe pattern
// used by useGems / useDailyCompletions.
export function useStreak(): StreakView {
  const { user } = useAuth()
  const userId = user?.id
  const tz = useMemo(() => resolveTimeZone(), [])
  // Per-instance channel name so multiple mounts (Sidebar + Dashboard) don't
  // collide on the same Supabase realtime channel.
  const channelId = useRef(`streak-${Math.random().toString(36).slice(2)}`)
  const [state, setState] = useState<StreakState>(newUserStreak)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setState(readLocalStreak())
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }: { data: StreakRow | null; error: { message: string } | null }) => {
        if (cancelled) return
        if (error) {
          // Table may not be migrated yet — fall back to the local signal.
          setState(readLocalStreak())
        } else {
          setState(rowToState(data) ?? newUserStreak())
        }
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId, version])

  // Same-tab updates (quiz completion writes then dispatches STREAK_EVENT).
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(STREAK_EVENT, handler)
    return () => window.removeEventListener(STREAK_EVENT, handler)
  }, [refresh])

  // Cross-device updates via realtime.
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`user_streaks:${userId}:${channelId.current}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_streaks', filter: `user_id=eq.${userId}` },
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
  return {
    currentStreak: effectiveStreak(state, today),
    longestStreak: state.longestStreak,
    freezes: state.freezes,
    status: streakStatus(state, today),
    repairable: canRepair(state, today),
    loading,
    refresh,
  }
}
