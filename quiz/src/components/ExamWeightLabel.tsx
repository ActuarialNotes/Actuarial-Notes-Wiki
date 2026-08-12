import { cn } from '@/lib/utils'
import { parseExamWeight } from '@/lib/examWeight'

/**
 * The share-of-the-exam readout: the authored figure, with that same figure as
 * a short bar underneath on a muted track (style guide §7.5).
 *
 * Used by the quiz builder's topic groups and by the study guide's
 * learning-objective callouts, so the number reads identically on both. The
 * row behind it also fills to the percentage — the label is the precise
 * reading of what the fill shows at a glance.
 */
export function ExamWeightLabel({ weight, className }: { weight: string; className?: string }) {
  const pct = parseExamWeight(weight)

  return (
    <span className={cn('flex shrink-0 flex-col items-end gap-1', className)}>
      <span className="text-xs font-medium tabular-nums text-muted-foreground">{weight}</span>
      {pct !== null && (
        <span
          className="h-1 w-10 overflow-hidden rounded-full bg-muted"
          role="img"
          aria-label={`${weight} of the exam`}
        >
          <span
            className="block h-full rounded-full bg-muted-foreground/50"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </span>
      )}
    </span>
  )
}
