import { CalendarCheck, Lock } from 'lucide-react'
import type { SegmentedOption } from '@/components/ui/SegmentedControl'
import { QUICK_COUNTS, type QuizSource } from '@/lib/quizBuilder'

/**
 * The one control that says what this quiz is drawn from. "Today's Plan" only
 * appears for a signed-in learner working toward this exam — for everyone
 * else it isn't a choice, so it isn't offered. The past-paper tab is named
 * after its shelf (`examSourceLabel`, lib/pastExams.ts).
 */
export function sourceOptions({
  showToday,
  isPro,
  planConceptCount,
  selectedCount,
  papersLabel,
}: {
  showToday: boolean
  isPro: boolean
  planConceptCount: number
  /** Concepts picked under By Topic. */
  selectedCount: number
  papersLabel: string
}): SegmentedOption<QuizSource>[] {
  const options: SegmentedOption<QuizSource>[] = []
  if (showToday) {
    options.push({
      value: 'today',
      flex: 2,
      ariaLabel: isPro
        ? `Today's plan${planConceptCount > 0 ? `, ${planConceptCount} concepts` : ''}`
        : "Today's plan (Pro)",
      label: (
        <>
          <CalendarCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">Today's Plan</span>
          {!isPro && <Lock className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />}
          {isPro && planConceptCount > 0 && (
            <span className="text-xs tabular-nums text-muted-foreground">{planConceptCount}</span>
          )}
        </>
      ),
    })
  }
  options.push({
    value: 'custom',
    flex: showToday ? 2 : 1,
    ariaLabel: selectedCount > 0
      ? `By topic, ${selectedCount} selected`
      : 'By topic',
    label: (
      <>
        <span className="truncate">By Topic</span>
        {selectedCount > 0 && (
          <span className="text-xs tabular-nums text-muted-foreground">{selectedCount}</span>
        )}
      </>
    ),
  })
  options.push({
    value: 'papers',
    flex: showToday ? 2 : 1,
    label: <span className="truncate">{papersLabel}</span>,
  })
  return options
}

/**
 * The question counts a quiz offers. "Full plan" carries its own value rather
 * than its numeric count: when the plan happens to need 3 questions it would
 * otherwise collide with the "3" option and light both. A count the pool
 * can't fill is disabled.
 */
export function countOptions({
  fullPlanCount,
  available,
}: {
  /** Questions that finish today's plan; 0 when the plan isn't the source. */
  fullPlanCount: number
  /** What the source holds; 0 while unknown, which disables nothing. */
  available: number
}): SegmentedOption<string>[] {
  const options: SegmentedOption<string>[] = []
  if (fullPlanCount > 0) {
    options.push({
      value: 'full',
      flex: 2,
      ariaLabel: `Full plan, ${fullPlanCount} question${fullPlanCount === 1 ? '' : 's'}`,
      label: <span className="truncate">Full plan</span>,
    })
  }
  for (const n of QUICK_COUNTS) {
    options.push({
      value: String(n),
      ariaLabel: `${n} question${n === 1 ? '' : 's'}`,
      label: <span className="tabular-nums">{n}</span>,
      disabled: available > 0 && n > available,
    })
  }
  return options
}
