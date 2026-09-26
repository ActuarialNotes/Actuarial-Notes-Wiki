import { useAuth } from '@/hooks/useAuth'
import { useXp } from '@/hooks/useXp'
import { setDailyGoal } from '@/lib/xpStore'
import { DAILY_GOALS } from '@/lib/xp'
import { cn } from '@/lib/utils'

/**
 * The daily XP goal presets (roadmap P1.2), opened from the Level popup's
 * "Change goal". Persists through xpStore.setDailyGoal — Supabase for signed-in
 * users, localStorage otherwise — and the selection drives the daily-goal ring.
 */
export function DailyGoalPicker() {
  const { user } = useAuth()
  const { goalId } = useXp()

  return (
    <div className="grid grid-cols-2 gap-2">
      {DAILY_GOALS.map(g => {
        const selected = g.id === goalId
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => void setDailyGoal(user?.id ?? null, g.id)}
            aria-pressed={selected}
            className={cn(
              'flex flex-col items-start gap-0.5 p-3 rounded-md text-left transition-colors',
              selected
                ? 'ring-2 ring-primary bg-primary/5'
                : 'bg-muted/40 hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <span className="text-sm font-semibold">{g.label}</span>
            <span className="text-xs font-medium text-violet-600 dark:text-violet-400">{g.xp} XP</span>
            <span className="text-xs text-muted-foreground">{g.hint}</span>
          </button>
        )
      })}
    </div>
  )
}
