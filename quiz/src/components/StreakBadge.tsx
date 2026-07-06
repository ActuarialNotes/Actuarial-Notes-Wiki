import { Flame } from 'lucide-react'
import { useStreak } from '@/hooks/useStreak'
import type { StreakStatus } from '@/lib/streak'

// Shared visual language for the streak across the three surfaces it appears on
// (Sidebar row, BottomNav corner badge, Dashboard stat). `active`/`at_risk`
// burn orange; a lapsed/absent streak is muted.
function flameClass(status: StreakStatus, count: number): string {
  if (status === 'inactive' || count <= 0) return 'text-muted-foreground'
  if (status === 'at_risk') return 'text-amber-500'
  return 'text-orange-500'
}

/**
 * Sidebar variant — a compact flame + count for the right side of the Dashboard
 * nav row (its `badge` slot). Renders nothing when there's no active streak, so
 * the row stays clean until the user has one.
 */
export function StreakNavBadge() {
  const { currentStreak, status, loading } = useStreak()
  if (loading || currentStreak <= 0) return null

  const color = flameClass(status, currentStreak)
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground tabular-nums"
      title={
        status === 'at_risk'
          ? 'Study today to keep your streak alive'
          : `${currentStreak}-day study streak`
      }
    >
      <Flame className={`h-3.5 w-3.5 ${color} ${status === 'active' ? 'streak-flame-pulse' : ''}`} />
      {currentStreak} day{currentStreak === 1 ? '' : 's'}
    </span>
  )
}

/**
 * BottomNav variant — a compact corner badge to overlay on a nav-tab icon.
 * Renders nothing when there's no active streak, so the tab stays clean.
 */
export function StreakCornerBadge() {
  const { currentStreak, loading } = useStreak()
  if (loading || currentStreak <= 0) return null
  return (
    <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[0.875rem] items-center justify-center gap-0.5 rounded-full bg-orange-500 px-[3px] text-[9px] font-bold leading-none text-white tabular-nums">
      {currentStreak}
    </span>
  )
}

/**
 * Dashboard variant — a flame stat tile matching the readiness/days tiles in the
 * header grid.
 */
export function StreakStat() {
  const { currentStreak, longestStreak, status, loading } = useStreak()
  if (loading) return null

  const color = flameClass(status, currentStreak)
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 py-4 min-h-32 rounded-2xl bg-orange-500/10"
      title={
        currentStreak > 0
          ? `Longest streak: ${longestStreak} day${longestStreak === 1 ? '' : 's'}`
          : 'Complete a quiz to start a streak'
      }
    >
      <span className="flex items-center gap-1 leading-none">
        <Flame className={`h-6 w-6 ${color} ${status === 'active' ? 'streak-flame-pulse' : ''}`} />
        <span className={`text-3xl font-bold tabular-nums ${currentStreak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground'}`}>
          {currentStreak}
        </span>
      </span>
      <span className="text-xs text-muted-foreground">
        day streak{status === 'at_risk' ? ' · today?' : ''}
      </span>
    </div>
  )
}
