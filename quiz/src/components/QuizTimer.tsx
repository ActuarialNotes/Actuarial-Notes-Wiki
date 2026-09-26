import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'
import { formatClock, timerTone } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

/**
 * The timed quiz's countdown, in the quiz header beside the mode pill.
 *
 * It counts down the budget `lib/quizTiming.ts` gives the set and, when that
 * runs out, carries on counting the overrun in red rather than ending the quiz:
 * the point of practising against the clock is knowing how far over you ran,
 * and a paper snatched away mid-answer teaches nothing the red clock doesn't.
 * The last tenth of the budget reads amber — the "at risk" hue (style guide §4.1).
 *
 * Measured from a wall-clock start rather than counted tick by tick, so a tab
 * left in the background (where timers are throttled) still reads true.
 */
export function QuizTimer({ startedAt, allowanceSeconds }: { startedAt: number; allowanceSeconds: number }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000))
  const remaining = allowanceSeconds - elapsed
  const tone = timerTone(remaining, allowanceSeconds)
  const clock = tone === 'over' ? `+${formatClock(remaining)}` : formatClock(remaining)

  return (
    <span
      role="timer"
      aria-label={tone === 'over' ? `${formatClock(remaining)} over time` : `${formatClock(remaining)} remaining`}
      title={`Time allowed: ${formatClock(allowanceSeconds)}`}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tabular-nums',
        tone === 'normal' && 'border-border bg-muted text-muted-foreground',
        tone === 'low' && 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
        tone === 'over' && 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400',
      )}
    >
      <Timer className="h-3 w-3" aria-hidden />
      {clock}
    </span>
  )
}
