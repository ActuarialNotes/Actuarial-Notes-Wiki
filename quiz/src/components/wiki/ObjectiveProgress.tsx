import { Play } from 'lucide-react'
import { MASTERY_FILL, MASTERY_LABEL } from '@/lib/masteryBadge'
import { objectiveBar, type ObjectiveProgress } from '@/lib/objectiveProgress'
import { buttonVariants } from '@/components/ui/buttonVariants'

/**
 * Drawn by an exam page's objective rows (docs/design-review.md §5.5); the
 * exam page hands them their data through `objectiveProgressContext.ts`.
 *
 * An objective row's count ("12 of 31") over a thin bar of its concepts by
 * level. With nothing learned yet the bar is left out: an empty track says
 * nothing the count doesn't.
 */
export function ObjectiveProgressMark({ progress }: { progress: ObjectiveProgress }) {
  const bar = objectiveBar(progress)
  const started = progress.byState.new < progress.total
  const parts = bar.map(s => `${progress.byState[s.state]} ${MASTERY_LABEL[s.state]}`).join(', ')
  return (
    <span
      className="flex shrink-0 flex-col items-end gap-1"
      role="img"
      aria-label={`${progress.learned} of ${progress.total} concepts learned${started ? `: ${parts}` : ''}`}
      data-testid="objective-progress"
    >
      <span className="text-xs font-medium tabular-nums text-muted-foreground">
        {progress.learned} of {progress.total}
      </span>
      {started && (
        <span className="flex h-1 w-12 overflow-hidden rounded-full bg-muted">
          {bar.map(s => (
            <span key={s.state} className={`block h-full ${MASTERY_FILL[s.state]}`} style={{ width: `${s.percent}%` }} />
          ))}
        </span>
      )}
    </span>
  )
}

/** The end of an open objective: a quiz on its concepts. */
export function PracticeObjectiveButton({ onPractice }: { onPractice: () => void }) {
  return (
    <div className="mt-4">
      <button type="button" onClick={onPractice} className={buttonVariants({ size: 'sm' })} data-testid="practice-objective">
        <Play className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        Practice this objective
      </button>
    </div>
  )
}
