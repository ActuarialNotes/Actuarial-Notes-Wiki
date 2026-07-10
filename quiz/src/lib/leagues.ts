// Weekly XP league engine — pure, deterministic, and fully testable (roadmap
// P4.1). Opt-in Duolingo-style leaderboards: joined users are grouped into
// cohorts of up to COHORT_CAP at their tier for the current UTC week and ranked
// by weekly XP; when the week ends the top of each cohort promotes a tier and
// the bottom (plus anyone with 0 XP) relegates. Full design: docs/leagues.md.
//
// Like lib/xp.ts this module has no I/O and no React. The ranking/rollover
// itself runs server-side in SECURITY DEFINER RPCs (see
// supabase/migrations/20260710_leagues.sql) — this module holds the shared
// constants and the *rendering* math: the tier ladder, the promotion/demotion
// zone formulas (deliberately one-liners duplicated in the SQL, locked by the
// tests in leagues.test.ts so the two can't drift), and the UTC week clock.

/** A rung on the league ladder, Bronze (0) → Diamond (TOP_TIER_INDEX). */
export interface LeagueTier {
  id: string
  label: string
  /** Position on the ladder, 0-indexed from Bronze. */
  index: number
  /** Accent color for the tier emblem (hex). */
  color: string
}

/** The ladder, lowest → highest. Five tiers keeps the top reachable early on. */
export const LEAGUE_TIERS: readonly LeagueTier[] = [
  { id: 'bronze', label: 'Bronze', index: 0, color: '#b08d57' },
  { id: 'silver', label: 'Silver', index: 1, color: '#9ca3af' },
  { id: 'gold', label: 'Gold', index: 2, color: '#eab308' },
  { id: 'sapphire', label: 'Sapphire', index: 3, color: '#3b82f6' },
  { id: 'diamond', label: 'Diamond', index: 4, color: '#22d3ee' },
]

export const TOP_TIER_INDEX = LEAGUE_TIERS.length - 1

/** Target cohort size (soft cap, enforced server-side at assignment time). */
export const COHORT_CAP = 30

/** Resolve a stored tier index to a tier, clamping out-of-range values. */
export function tierByIndex(index: number): LeagueTier {
  const i = Math.min(TOP_TIER_INDEX, Math.max(0, Math.floor(index)))
  return LEAGUE_TIERS[i]
}

// ── Promotion / demotion zones ────────────────────────────────────────────────
// Duplicated in league_rollover_if_due() in the migration — keep in sync.

/** How many of a cohort's `size` members promote at week end. */
export function promoteCount(size: number): number {
  if (size <= 0) return 0
  return Math.min(10, Math.ceil(size / 3))
}

/** How many of a cohort's `size` members demote at week end (by rank alone). */
export function demoteCount(size: number): number {
  if (size <= 0) return 0
  return Math.min(5, Math.floor(size / 5))
}

export type LeagueZone = 'promotion' | 'safe' | 'demotion'

/**
 * Which zone a rank sits in for rendering the board dividers. Clamps at the
 * ladder ends: no promotion zone in Diamond, no demotion zone in Bronze.
 * (Members with 0 weekly XP demote regardless of rank — that inactivity rule
 * is applied server-side at rollover and isn't part of the zone display.)
 */
export function zoneForRank(rank: number, size: number, tierIndex: number): LeagueZone {
  if (tierIndex < TOP_TIER_INDEX && rank <= promoteCount(size)) return 'promotion'
  if (tierIndex > 0 && rank > size - demoteCount(size)) return 'demotion'
  return 'safe'
}

// ── The UTC week clock ────────────────────────────────────────────────────────
// Weeks run Monday 00:00 UTC → Monday 00:00 UTC, server-defined so every member
// of a cohort shares one boundary regardless of timezone (unlike the streak/XP
// daily counters, which are deliberately local).

/** Monday 00:00 UTC of the week containing `d`. */
export function weekStartUtc(d: Date): Date {
  const day = d.getUTCDay() // 0 = Sunday … 6 = Saturday
  const sinceMonday = (day + 6) % 7
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  start.setUTCDate(start.getUTCDate() - sinceMonday)
  return start
}

/** Next Monday 00:00 UTC after `d` — the moment the current week closes. */
export function weekEndUtc(d: Date): Date {
  const end = weekStartUtc(d)
  end.setUTCDate(end.getUTCDate() + 7)
  return end
}

/** 'YYYY-MM-DD' of the week's Monday — matches the server's week_start date. */
export function weekKey(d: Date): string {
  return weekStartUtc(d).toISOString().slice(0, 10)
}

/** Time remaining until the current week closes, broken down for display. */
export function timeUntilWeekEnd(now: Date): { days: number; hours: number; minutes: number } {
  const ms = Math.max(0, weekEndUtc(now).getTime() - now.getTime())
  const minutesTotal = Math.floor(ms / 60_000)
  return {
    days: Math.floor(minutesTotal / (24 * 60)),
    hours: Math.floor(minutesTotal / 60) % 24,
    minutes: minutesTotal % 60,
  }
}

/** Compact countdown for the card header, e.g. "3d 14h" or "5h 12m". */
export function formatWeekCountdown(now: Date): string {
  const { days, hours, minutes } = timeUntilWeekEnd(now)
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}
