import type { SegmentedOption } from '@/components/ui/SegmentedControl'
import { QUICK_COUNTS } from '@/lib/quizBuilder'

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
