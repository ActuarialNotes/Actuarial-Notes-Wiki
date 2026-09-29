// **Coverage** — the streak, and the month of it the Daily screen draws
// (docs/actuaria-online.md §6.6).
//
// Coverage *is* the streak (`lib/streak.ts`): its length, its freezes as grace
// days. The calendar is the one thing the streak can't draw, because
// `StreakState` keeps no per-day history. So a signed-in player's studied days
// come from `quiz_sessions` — a day with a completed quiz that got at least one
// answer right, the rule the streak itself banks on — and a guest's from the one
// run the streak can vouch for: `currentStreak` days ending on `lastActiveDay`.
// A day a freeze bridged is recorded nowhere, so it is never drawn on a date;
// the grace-day count sits on the card instead (D5).

import { dayNumber, effectiveStreak, localDayKey, type StreakState } from '@/lib/streak'

const DAY_MS = 86_400_000

/** 'YYYY-MM-DD' for a day number (days since the epoch, as `dayNumber` counts them). */
export function dayKeyFromNumber(n: number): string {
  return new Date(n * DAY_MS).toISOString().slice(0, 10)
}

/** The local days on which a completed quiz got at least one answer right. */
export function studiedDays(
  sessions: readonly { completed_at: string | null; correct_count: number | null }[],
  timeZone?: string,
): Set<string> {
  const days = new Set<string>()
  for (const s of sessions) {
    if (!s.completed_at || !s.correct_count || s.correct_count < 1) continue
    const at = new Date(s.completed_at)
    if (Number.isNaN(at.getTime())) continue
    days.add(localDayKey(at, timeZone))
  }
  return days
}

/**
 * A guest's studied days: the current run and nothing more — the streak keeps
 * no older history. Empty once the streak has lapsed.
 */
export function guestRunDays(state: StreakState, todayKey: string): Set<string> {
  const days = new Set<string>()
  if (!state.lastActiveDay || effectiveStreak(state, todayKey) <= 0) return days
  const last = dayNumber(state.lastActiveDay)
  for (let i = 0; i < state.currentStreak; i++) days.add(dayKeyFromNumber(last - i))
  return days
}

export interface CoverageDay {
  key: string
  /** Day of the month, 1–31. */
  day: number
  inMonth: boolean
  studied: boolean
  today: boolean
  future: boolean
}

/** 'YYYY-MM' of a day key. */
export function monthOf(dayKey: string): string {
  return dayKey.slice(0, 7)
}

/** The month `delta` months from `month` ('YYYY-MM'). */
export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split('-').map(Number)
  const d = new Date(Date.UTC(y, m - 1 + delta, 1))
  return d.toISOString().slice(0, 7)
}

/**
 * A month as calendar weeks, Sunday first: whole weeks, with the days of the
 * neighbouring months that fill them marked `inMonth: false`.
 */
export function coverageMonth(month: string, todayKey: string, studied: ReadonlySet<string>): CoverageDay[][] {
  const [y, m] = month.split('-').map(Number)
  const first = Math.floor(Date.UTC(y, m - 1, 1) / DAY_MS)
  const last = Math.floor(Date.UTC(y, m, 0) / DAY_MS)
  const weekday = new Date(first * DAY_MS).getUTCDay()
  const start = first - weekday
  const end = last + (6 - new Date(last * DAY_MS).getUTCDay())
  const today = dayNumber(todayKey)

  const weeks: CoverageDay[][] = []
  for (let n = start; n <= end; n += 7) {
    const week: CoverageDay[] = []
    for (let i = 0; i < 7; i++) {
      const dayN = n + i
      const key = dayKeyFromNumber(dayN)
      week.push({
        key,
        day: Number(key.slice(8, 10)),
        inMonth: dayN >= first && dayN <= last,
        studied: studied.has(key),
        today: dayN === today,
        future: dayN > today,
      })
    }
    weeks.push(week)
  }
  return weeks
}

/** How many days of `month` were studied. */
export function studiedInMonth(month: string, studied: ReadonlySet<string>): number {
  let count = 0
  for (const key of studied) if (monthOf(key) === month) count++
  return count
}
