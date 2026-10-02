import type { ExamReadinessAssessment } from '@/lib/readiness'
import { cn } from '@/lib/utils'

/**
 * The compact readiness readout: the score, and under it one bar split by how
 * far up the mastery ladder the syllabus's concepts are — Level 3 solid, Level 2
 * and Level 1 fading out after it. The bar is the concept tally; the number is
 * `computeExamReadiness`'s score, the one readiness figure every surface prints.
 *
 * Drawn by the exam action menu the study guide's title opens. The exam lists
 * on Study Guides print the same score as a number ("42% ready") rather than a
 * bar, so an exam's row stays one line of facts.
 */
export function ReadinessBar({
  readiness,
  className,
}: {
  readiness: Pick<ExamReadinessAssessment, 'overallPct' | 'counts'>
  className?: string
}) {
  const { total, level1, level2, level3 } = readiness.counts
  const share = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0)
  const pct = Math.round(readiness.overallPct)
  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Readiness</span>
        <span className="font-medium tabular-nums">{pct}%</span>
      </div>
      <div
        className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex"
        role="progressbar"
        aria-label="Readiness"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="h-full transition-all" style={{ width: `${share(level3)}%`, backgroundColor: 'rgba(34, 197, 94, 1)' }} />
        <div className="h-full transition-all" style={{ width: `${share(level2)}%`, backgroundColor: 'rgba(34, 197, 94, 0.55)' }} />
        <div className="h-full transition-all" style={{ width: `${share(level1)}%`, backgroundColor: 'rgba(34, 197, 94, 0.25)' }} />
      </div>
    </div>
  )
}
