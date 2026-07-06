// Daily-streak engine — pure, timezone-correct, and fully testable.
//
// This module is the single source of truth for the streak math. It has no I/O
// and no React: callers (the useStreak hook, the streakStore cloud/local sync,
// and vitest) feed it a StreakState + the user's *local* calendar day and get a
// new StreakState back. Keeping it pure means the freeze/repair and day-boundary
// rules are covered by unit tests rather than discovered in production.
//
// Design notes:
//   • Day boundaries are computed in the user's IANA timezone (localDayKey), so a
//     quiz finished at 11pm and one at 1am the next night count as two days even
//     across DST shifts — we diff calendar *days*, never elapsed hours.
//   • A "streak freeze" is a token (Duolingo-style) held in inventory and
//     auto-consumed to bridge a missed day. Missing N days consumes N freezes; if
//     there aren't enough, the streak lapses.
//   • When a streak lapses we remember its length (lastBrokenStreak) for the day
//     it lapsed, so the UI can offer a same-day "repair" (e.g. spend gems) to
//     restore it. Repair is a deliberate action, never automatic.

/** Persisted streak state. Day fields are 'YYYY-MM-DD' in the user's local tz. */
export interface StreakState {
  /** Consecutive active days up to and including lastActiveDay. */
  currentStreak: number
  /** All-time best currentStreak. */
  longestStreak: number
  /** Local day of the most recent activity, or null if never active. */
  lastActiveDay: string | null
  /** Streak-freeze tokens available to bridge missed days. */
  freezes: number
  /** Length of the streak the last time it lapsed (0 once repaired/never). */
  lastBrokenStreak: number
  /** Local day the most recent lapse was recorded (repair is offered that day). */
  lastBrokenOn: string | null
}

export function emptyStreak(): StreakState {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDay: null,
    freezes: 0,
    lastBrokenStreak: 0,
    lastBrokenOn: null,
  }
}

/**
 * The user's local calendar day as 'YYYY-MM-DD'. Uses en-CA (which formats as
 * ISO YYYY-MM-DD) in the given IANA timezone. Falls back to the host timezone
 * when none is supplied, and to a UTC slice if Intl is unavailable.
 */
export function localDayKey(date: Date, timeZone?: string): string {
  try {
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    // en-CA yields e.g. "2026-07-06"; normalise any locale surprises to dashes.
    return fmt.format(date).replace(/\//g, '-')
  } catch {
    return date.toISOString().slice(0, 10)
  }
}

/** Days since the Unix epoch for a 'YYYY-MM-DD' key (UTC-anchored, tz-free). */
export function dayNumber(dayKey: string): number {
  const [y, m, d] = dayKey.split('-').map(Number)
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000)
}

/** Whole calendar days from `from` to `to` (positive when `to` is later). */
export function daysBetween(from: string, to: string): number {
  return dayNumber(to) - dayNumber(from)
}

export type StreakStatus =
  | 'active' // studied today — streak counted
  | 'at_risk' // studied yesterday (or within freeze range) — act today to keep it
  | 'inactive' // no active streak (never started, or lapsed)

/**
 * How the streak stands relative to `todayKey`. `at_risk` means the streak is
 * still alive but today has no activity yet — including the case where banked
 * freezes could still bridge the gap.
 */
export function streakStatus(state: StreakState, todayKey: string): StreakStatus {
  if (!state.lastActiveDay || state.currentStreak <= 0) return 'inactive'
  const diff = daysBetween(state.lastActiveDay, todayKey)
  if (diff <= 0) return 'active'
  if (diff === 1) return 'at_risk'
  // Gap of >1 day: still recoverable while freezes can cover the missed days.
  return state.freezes >= diff - 1 ? 'at_risk' : 'inactive'
}

/**
 * The streak length to *display* right now. A stored streak that has already
 * lapsed (no longer recoverable) shows as 0 until the next activity, rather than
 * a stale count.
 */
export function effectiveStreak(state: StreakState, todayKey: string): number {
  return streakStatus(state, todayKey) === 'inactive' ? 0 : state.currentStreak
}

/**
 * Register a day of study. Idempotent within a day (a second call on the same
 * local day is a no-op), so callers can invoke it on every quiz completion.
 */
export function recordActivity(state: StreakState, todayKey: string): StreakState {
  // First activity ever.
  if (!state.lastActiveDay) {
    return {
      ...state,
      currentStreak: 1,
      longestStreak: Math.max(state.longestStreak, 1),
      lastActiveDay: todayKey,
    }
  }

  const diff = daysBetween(state.lastActiveDay, todayKey)

  // Same local day (or clock skew going backwards): already counted.
  if (diff <= 0) return state

  let currentStreak: number
  let freezes = state.freezes
  let lastBrokenStreak = state.lastBrokenStreak
  let lastBrokenOn = state.lastBrokenOn

  if (diff === 1) {
    // Consecutive day.
    currentStreak = state.currentStreak + 1
  } else {
    const missed = diff - 1
    if (freezes >= missed) {
      // Freezes bridge the gap; the streak survives and today extends it.
      freezes -= missed
      currentStreak = state.currentStreak + 1
    } else {
      // Streak lapses. Remember its length so it can be repaired today.
      lastBrokenStreak = state.currentStreak
      lastBrokenOn = todayKey
      currentStreak = 1
    }
  }

  return {
    ...state,
    currentStreak,
    longestStreak: Math.max(state.longestStreak, currentStreak),
    lastActiveDay: todayKey,
    freezes,
    lastBrokenStreak,
    lastBrokenOn,
  }
}

/**
 * Whether a just-lapsed streak can still be repaired. Repair is only offered on
 * the same local day the lapse was recorded (i.e. the day the user returned).
 */
export function canRepair(state: StreakState, todayKey: string): boolean {
  return state.lastBrokenStreak > 0 && state.lastBrokenOn === todayKey
}

/**
 * Restore a lapsed streak: the pre-lapse length plus today's activity. Clears
 * the repair marker. No-op if there's nothing repairable today.
 */
export function repairStreak(state: StreakState, todayKey: string): StreakState {
  if (!canRepair(state, todayKey)) return state
  const currentStreak = state.lastBrokenStreak + 1
  return {
    ...state,
    currentStreak,
    longestStreak: Math.max(state.longestStreak, currentStreak),
    lastActiveDay: todayKey,
    lastBrokenStreak: 0,
    lastBrokenOn: null,
  }
}
