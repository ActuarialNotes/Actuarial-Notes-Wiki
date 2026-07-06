import { Check, Flame } from 'lucide-react'
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
 * header grid. When `planComplete` is true (today's study plan is fully done),
 * the tile burns brighter with a filled-in flame and a tappable checkmark badge
 * that opens the day-complete/2× gem bonus info panel.
 */
export function StreakStat({
  planComplete = false,
  onOpenDayComplete,
}: {
  planComplete?: boolean
  onOpenDayComplete?: () => void
}) {
  const { currentStreak, longestStreak, status, loading } = useStreak()
  if (loading) return null

  const color = flameClass(status, currentStreak)
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-1.5 py-4 min-h-32 rounded-2xl transition-colors ${
        planComplete ? 'bg-orange-500/20 ring-1 ring-orange-500/40' : 'bg-orange-500/10'
      }`}
      title={
        currentStreak > 0
          ? `Longest streak: ${longestStreak} day${longestStreak === 1 ? '' : 's'}`
          : 'Complete a quiz to start a streak'
      }
    >
      <span className="flex items-center gap-1 leading-none">
        <Flame
          className={`h-6 w-6 ${planComplete ? 'text-orange-500' : color} ${status === 'active' ? 'streak-flame-pulse' : ''}`}
          fill={planComplete ? 'currentColor' : 'none'}
        />
        <span className={`text-3xl font-bold tabular-nums ${planComplete ? 'text-orange-500' : currentStreak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground'}`}>
          {currentStreak}
        </span>
      </span>
      <span className="text-xs text-muted-foreground">
        day streak{status === 'at_risk' ? ' · today?' : ''}
      </span>
      {planComplete && (
        <button
          type="button"
          onClick={onOpenDayComplete}
          className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white shadow ring-2 ring-background hover:bg-orange-600 transition-colors"
          aria-label="Today's study plan complete — view bonus details"
          title="Today's study plan complete — tap for details"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </button>
      )}
    </div>
  )
}
