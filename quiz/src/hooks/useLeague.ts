import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { tierByIndex, weekKey, type LeagueTier } from '@/lib/leagues'
import {
  fetchLeagueBoard,
  fetchLeagueSelf,
  joinLeague,
  leaveLeague,
  LEAGUE_EVENT,
  type LeagueBoardRow,
  type LeagueSelfState,
} from '@/lib/leagueStore'

export interface LeagueView {
  loading: boolean
  /** Leagues are signed-in only; false = show nothing (guest Dashboard is gated anyway). */
  signedIn: boolean
  /** Whether an exam is selected to view a league for. */
  hasExam: boolean
  /** Whether the user has opted in to this exam's weekly league. */
  optedIn: boolean
  /** The user's current tier on the ladder for this exam. */
  tier: LeagueTier
  /** This week's cohort standings (empty when not a member or still loading). */
  board: LeagueBoardRow[]
  /** The user's rank within the board, or null when not a member. */
  selfRank: number | null
  /** Last week's outcome, only while it's fresh (belongs to the week that just ended). */
  lastResult: { result: 'promoted' | 'demoted' | 'stayed'; week: string; rank: number | null } | null
  /** Opt in, sharing the given display name + avatar with cohort-mates. */
  join: (displayName: string, avatarUrl: string) => Promise<void>
  /** Opt out, deleting the shared name/avatar copies. */
  leave: () => Promise<void>
  /** Force a re-read from the source of truth. */
  refresh: () => void
}

const EMPTY_SELF: LeagueSelfState = {
  optedIn: false,
  tier: 0,
  lastResult: null,
  lastResultWeek: null,
  lastRank: null,
}

/** 'YYYY-MM-DD' of the Monday of the week that just ended. */
function previousWeekKey(now: Date): string {
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return weekKey(lastWeek)
}

// Reads the current user's league state + cohort standings for `exam` and keeps
// them fresh via the same-tab LEAGUE_EVENT (fired after quiz XP / join / leave),
// realtime on the user's own user_leagues rows (rollover results land there),
// and a tab-focus refetch. Mirrors the load/subscribe pattern used by useXp. The
// board itself is not on realtime — cohort-mates' scores refresh on those same
// triggers, which is plenty for a weekly leaderboard. Pass `exam` = null when no
// exam is selected (returns an empty, opted-out view).
export function useLeague(exam: string | null): LeagueView {
  const { user } = useAuth()
  const userId = user?.id
  // Per-instance channel name so multiple mounts don't collide on one channel.
  const channelId = useRef(`league-${Math.random().toString(36).slice(2)}`)
  const [self, setSelf] = useState<LeagueSelfState>(EMPTY_SELF)
  const [board, setBoard] = useState<LeagueBoardRow[]>([])
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion(v => v + 1), [])

  useEffect(() => {
    let cancelled = false
    if (!userId || !exam) {
      setSelf(EMPTY_SELF)
      setBoard([])
      setLoading(false)
      return
    }
    setLoading(true)
    void (async () => {
      // Board first: its RPC performs the lazy weekly rollover server-side, so
      // reading self *after* it sees the post-rollover tier/result on Mondays.
      const nextBoard = await fetchLeagueBoard(userId, exam)
      const nextSelf = await fetchLeagueSelf(userId, exam)
      if (cancelled) return
      setBoard(nextBoard ?? [])
      setSelf(nextSelf ?? EMPTY_SELF)
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [userId, exam, version])

  // Same-tab updates (quiz completion / join / leave dispatch LEAGUE_EVENT).
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(LEAGUE_EVENT, handler)
    return () => window.removeEventListener(LEAGUE_EVENT, handler)
  }, [refresh])

  // Cross-device updates for the user's own row (opt-in state, rollover result).
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel(`user_leagues:${userId}:${channelId.current}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_leagues', filter: `user_id=eq.${userId}` },
        () => refresh(),
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, refresh])

  // Refetch when the tab regains focus (a week boundary may have passed, or a
  // quiz finished on another device).
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') refresh() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [refresh])

  const join = useCallback(
    async (displayName: string, avatarUrl: string) => {
      if (!exam) return
      await joinLeague(userId ?? null, exam, { displayName, avatarUrl })
      refresh()
    },
    [userId, exam, refresh],
  )

  const leave = useCallback(async () => {
    if (!exam) return
    await leaveLeague(userId ?? null, exam)
    refresh()
  }, [userId, exam, refresh])

  const selfRank = board.find(row => row.isSelf)?.rank ?? null

  // Only surface last week's result while it actually belongs to the week that
  // just ended — an older result has already been seen (or is stale).
  const lastResult =
    self.lastResult && self.lastResultWeek === previousWeekKey(new Date())
      ? { result: self.lastResult, week: self.lastResultWeek, rank: self.lastRank }
      : null

  return {
    loading,
    signedIn: !!userId,
    hasExam: !!exam,
    optedIn: self.optedIn,
    tier: tierByIndex(self.tier),
    board,
    selfRank,
    lastResult,
    join,
    leave,
    refresh,
  }
}
