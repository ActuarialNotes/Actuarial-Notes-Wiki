import { useAuth } from '@/hooks/useAuth'
import { useXp } from '@/hooks/useXp'
import { setDailyGoal } from '@/lib/xpStore'
import { DAILY_GOALS } from '@/lib/xp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * Settings card for choosing the daily XP goal (roadmap P1.2). Persists through
 * xpStore.setDailyGoal — Supabase for signed-in users, localStorage otherwise —
 * and the selection drives the Dashboard daily-goal ring.
 */
export function DailyGoalPicker() {
  const { user } = useAuth()
  const { goalId, level, totalXp, earnedToday, target } = useXp()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Goal</CardTitle>
        <CardDescription>
          Earn XP by answering questions — harder questions, and concepts you’re
          reviving from memory, are worth more. Pick a daily target to aim for; your
          progress shows as a ring on the Dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
        <p className="text-xs text-muted-foreground tabular-nums">
          Level {level} · {totalXp} XP total · {earnedToday}/{target} XP today
        </p>
      </CardContent>
    </Card>
  )
}
