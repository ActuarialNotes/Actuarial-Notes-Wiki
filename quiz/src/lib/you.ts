// You (docs/redesign-spec.md §7b): the profile, the league and Settings as
// data. What each row says, and how a league's table is cut by its promotion
// and relegation lines. Pure and tested; the screens are pages/You.tsx,
// pages/League.tsx and pages/Settings.tsx.

import { timeUntilWeekEnd, zoneForRank } from './leagues'

export const YOU_PATH = '/you'
export const LEAGUE_PATH = '/you/league'
export const SETTINGS_PATH = '/settings'

/** The league's address for one exam (an exam_progress key). */
export function leaguePath(examKey?: string | null): string {
  return examKey ? `${LEAGUE_PATH}?exam=${encodeURIComponent(examKey)}` : LEAGUE_PATH
}

/** Whether a path is one of You's three screens, which draw their own top row. */
export function isYouRoute(pathname: string): boolean {
  return pathname === YOU_PATH || pathname === LEAGUE_PATH || pathname === SETTINGS_PATH
}

/** 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st. */
export function ordinal(n: number): string {
  const whole = Math.max(0, Math.floor(n))
  const teens = whole % 100
  if (teens >= 11 && teens <= 13) return `${whole}th`
  const last = whole % 10
  return `${whole}${last === 1 ? 'st' : last === 2 ? 'nd' : last === 3 ? 'rd' : 'th'}`
}

/** The name an account goes by: its display name, else the email's first part. */
export function readerName(user: { email?: string | null; user_metadata?: Record<string, unknown> | null } | null): string {
  const named = user?.user_metadata?.display_name
  if (typeof named === 'string' && named.trim()) return named.trim()
  return user?.email?.split('@')[0] || 'You'
}

/** What the profile's League row says: the tier and rank, or the way in. */
export function leagueRowValue(league: { optedIn: boolean; tierLabel: string; rank: number | null }): string {
  if (!league.optedIn) return 'Join'
  return league.rank ? `${league.tierLabel} · ${ordinal(league.rank)}` : league.tierLabel
}

/** How long the league's week has left, for the header: "4 days left". */
export function weekLeftLabel(now: Date): string {
  const { days, hours } = timeUntilWeekEnd(now)
  if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} left`
  if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} left`
  return 'Under an hour left'
}

export type LeagueTableEntry<Row> =
  | { kind: 'row'; row: Row }
  /** `promoted` closes the rows that move up; `relegated` opens the rows that move down. */
  | { kind: 'line'; line: 'promoted' | 'relegated' }

/**
 * The week's table with its two lines: one under the last row that moves up,
 * one above the first row that moves down. A tier with no move in a direction
 * (Diamond up, Bronze down) has no line for it.
 */
export function leagueTable<Row extends { rank: number }>(board: readonly Row[], tierIndex: number): LeagueTableEntry<Row>[] {
  const out: LeagueTableEntry<Row>[] = []
  const zones = board.map(row => zoneForRank(row.rank, board.length, tierIndex))
  board.forEach((row, i) => {
    if (zones[i] === 'demotion' && zones[i - 1] !== 'demotion') out.push({ kind: 'line', line: 'relegated' })
    out.push({ kind: 'row', row })
    if (zones[i] === 'promotion' && zones[i + 1] !== 'promotion') out.push({ kind: 'line', line: 'promoted' })
  })
  return out
}

/** Last week's result, as one sentence. */
export function leagueResultLine(result: 'promoted' | 'demoted' | 'stayed', tierLabel: string, rank: number | null): string {
  const moved = result === 'promoted'
    ? `You moved up to ${tierLabel}`
    : result === 'demoted'
      ? `You moved down to ${tierLabel}`
      : `You stayed in ${tierLabel}`
  return rank ? `${moved}, finishing ${ordinal(rank)}.` : `${moved}.`
}

/** What a quest pays. Gems go to an account, so a visitor's quest pays XP alone. */
export function questReward(quest: { gems: number; xp: number }, signedIn: boolean): string {
  return signedIn && quest.gems > 0 ? `${quest.gems} gems and ${quest.xp} XP` : `${quest.xp} XP`
}

// ── Settings: the value each row shows ───────────────────────────────────────

/** An exam's date on its row: "Jan 14", with the year when it isn't this one. */
export function examDateValue(iso: string | null | undefined, now: Date): string {
  if (!iso) return 'No date'
  const d = new Date(`${iso}T00:00:00`)
  if (isNaN(d.getTime())) return 'No date'
  const sameYear = d.getFullYear() === now.getFullYear()
  return d.toLocaleDateString('en-US', sameYear
    ? { month: 'short', day: 'numeric' }
    : { month: 'short', day: 'numeric', year: 'numeric' })
}

/** The hour as the daily email's row shows it: "7:00 am". */
export function hourValue(hour: number): string {
  const h = ((Math.floor(hour) % 24) + 24) % 24
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:00 ${h < 12 ? 'am' : 'pm'}`
}

/** The daily email's row: the hour it is sent, Off, or that it comes with Pro. */
export function dailyEmailValue(prefs: { dailyPlanEmail: boolean; sendHourLocal: number }, isPro: boolean): string {
  if (!isPro) return 'Pro'
  return prefs.dailyPlanEmail ? hourValue(prefs.sendHourLocal) : 'Off'
}

/** The Sound row: Off, or the volume. */
export function soundValue(sound: { enabled: boolean; volume: number }): string {
  return sound.enabled ? `${Math.round(sound.volume * 100)}%` : 'Off'
}

/** The Pro row, by plan. A beta tester's Pro has nothing to manage. */
export function proRowValue(plan: { isPro: boolean; isBetaTester: boolean }): 'Get Pro' | 'Manage' | 'Beta tester' {
  if (!plan.isPro) return 'Get Pro'
  return plan.isBetaTester ? 'Beta tester' : 'Manage'
}

/** Who signs an account in, when it isn't a password: "Google", else null. */
export function signInProvider(user: { app_metadata?: Record<string, unknown> | null } | null): string | null {
  const provider = user?.app_metadata?.provider
  if (typeof provider !== 'string' || provider === 'email') return null
  return provider.charAt(0).toUpperCase() + provider.slice(1)
}
