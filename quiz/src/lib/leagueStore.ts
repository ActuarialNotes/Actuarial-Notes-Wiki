// Sync glue for the weekly XP leagues (roadmap P4.1). The shared math (tier
// ladder, promotion/demotion zones, the UTC week clock) lives in lib/leagues.ts;
// the authoritative state lives server-side behind SECURITY DEFINER RPCs
// (supabase/migrations/20260710_leagues.sql) because a leaderboard is inherently
// cross-user: the client can never write its own weekly XP or read the raw
// member table. Unlike streak/xp/questStore there is no localStorage fallback —
// leagues are signed-in only and have no meaningful offline state.
//
// Every function here is fail-soft (never throws): a league hiccup must not
// break quiz completion or the Dashboard. A LEAGUE_EVENT is dispatched after
// each successful mutation so useLeague refreshes instantly in the same tab.

import { supabase } from '@/lib/supabase'
import { trackLeagueJoined, trackLeagueLeft } from '@/lib/analytics'
import { LEAGUES_ENABLED } from '@/lib/featureFlags'

/** Dispatched (same-tab) whenever league state changes, so hooks refetch. */
export const LEAGUE_EVENT = 'actuarial_league_updated'

function dispatchLeagueUpdated(): void {
  try {
    window.dispatchEvent(new CustomEvent(LEAGUE_EVENT))
  } catch {
    /* non-browser */
  }
}

/** One row of the caller's cohort standings, as returned by get_league_board. */
export interface LeagueBoardRow {
  rank: number
  displayName: string
  avatarUrl: string
  weeklyXp: number
  isSelf: boolean
}

/** The caller's own league state (user_leagues row, owner-readable under RLS). */
export interface LeagueSelfState {
  optedIn: boolean
  tier: number
  lastResult: 'promoted' | 'demoted' | 'stayed' | null
  /** week_start ('YYYY-MM-DD') the result belongs to. */
  lastResultWeek: string | null
  lastRank: number | null
}

const EMPTY_SELF: LeagueSelfState = {
  optedIn: false,
  tier: 0,
  lastResult: null,
  lastResultWeek: null,
  lastRank: null,
}

interface UserLeagueRow {
  opted_in: boolean | null
  tier: number | null
  last_result: string | null
  last_result_week: string | null
  last_rank: number | null
}

interface BoardRpcRow {
  rank: number
  display_name: string | null
  avatar_url: string | null
  weekly_xp: number | null
  is_self: boolean | null
}

/**
 * The caller's own league state. A missing row means "never interacted" and
 * reads as the opted-out defaults; null means the fetch itself failed.
 */
export async function fetchLeagueSelf(userId: string): Promise<LeagueSelfState | null> {
  try {
    const { data, error } = await supabase
      .from('user_leagues')
      .select('opted_in, tier, last_result, last_result_week, last_rank')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw new Error(error.message)
    if (!data) return EMPTY_SELF
    const row = data as UserLeagueRow
    const result = row.last_result
    return {
      optedIn: row.opted_in ?? false,
      tier: row.tier ?? 0,
      lastResult:
        result === 'promoted' || result === 'demoted' || result === 'stayed' ? result : null,
      lastResultWeek: row.last_result_week,
      lastRank: row.last_rank,
    }
  } catch (err) {
    console.warn('fetchLeagueSelf failed:', err)
    return null
  }
}

/**
 * Current standings of the caller's cohort. Empty array = not a member this
 * week; null = the fetch failed (table/RPC not migrated yet, or offline). The
 * RPC also performs the lazy weekly rollover server-side, so calling this is
 * what settles a finished week.
 */
export async function fetchLeagueBoard(userId: string): Promise<LeagueBoardRow[] | null> {
  if (!userId) return null
  try {
    const { data, error } = await supabase.rpc('get_league_board')
    if (error) throw new Error(error.message)
    return ((data as BoardRpcRow[] | null) ?? []).map(row => ({
      rank: row.rank,
      displayName: row.display_name ?? 'Anonymous',
      avatarUrl: row.avatar_url ?? '',
      weeklyXp: row.weekly_xp ?? 0,
      isSelf: row.is_self ?? false,
    }))
  } catch (err) {
    console.warn('fetchLeagueBoard failed:', err)
    return null
  }
}

/**
 * Opt in to the weekly league, sharing the given display name + avatar with
 * cohort-mates. Returns whether the join succeeded.
 */
export async function joinLeague(
  userId: string | null,
  profile: { displayName: string; avatarUrl: string },
): Promise<boolean> {
  if (!LEAGUES_ENABLED || !userId) return false
  try {
    const { data, error } = await supabase.rpc('join_league', {
      p_display_name: profile.displayName,
      p_avatar_url: profile.avatarUrl,
    })
    if (error) throw new Error(error.message)
    trackLeagueJoined({ tier: (data as number | null) ?? 0 })
    dispatchLeagueUpdated()
    return true
  } catch (err) {
    console.warn('joinLeague failed:', err)
    return false
  }
}

/**
 * Opt out: deletes this week's membership and the shared name/avatar copies
 * server-side (tier and last result are kept for a future return).
 */
export async function leaveLeague(userId: string | null): Promise<boolean> {
  if (!LEAGUES_ENABLED || !userId) return false
  try {
    const { error } = await supabase.rpc('leave_league')
    if (error) throw new Error(error.message)
    trackLeagueLeft()
    dispatchLeagueUpdated()
    return true
  } catch (err) {
    console.warn('leaveLeague failed:', err)
    return false
  }
}

/**
 * Add earned XP to the caller's weekly league total. Fired unconditionally
 * after every quiz/quest payout (see stores/quizStore.ts and lib/questStore.ts)
 * — the server silently no-ops for non-members, and guests never reach the RPC.
 * Never throws: a failed league write must not break quiz completion.
 */
export async function recordLeagueXp(userId: string | null, amount: number): Promise<void> {
  if (!LEAGUES_ENABLED || !userId || amount <= 0) return
  try {
    const { data, error } = await supabase.rpc('record_league_xp', {
      p_amount: Math.floor(amount),
    })
    if (error) throw new Error(error.message)
    // data is the new weekly total, or null when the user isn't a member.
    if (data != null) dispatchLeagueUpdated()
  } catch (err) {
    console.warn('recordLeagueXp failed:', err)
  }
}
