import { cn } from '@/lib/utils'

/**
 * The thin green bar that sits directly above a Previous / Next footer, showing
 * how far through the sequence the current item is. Used by every surface that
 * has that footer shape (concept popup, flashcard study view, concept detail
 * modal, math-focus overlay) so the progress read is identical everywhere.
 */
export interface NavProgressBarProps {
  /** 1-indexed position of the current item. */
  current: number
  /** Total number of items in the sequence. */
  total: number
  /** Extra classes for the track (e.g. `border-t`, a different height). */
  className?: string
  /** Accessible label — defaults to a generic "Progress". */
  label?: string
}

/** Percentage filled for a 1-indexed position, clamped to 0–100. */
export function navProgressPercent(current: number, total: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) return 0
  return Math.min(100, Math.max(0, (current / total) * 100))
}

export function NavProgressBar({ current, total, className, label = 'Progress' }: NavProgressBarProps) {
  const percentage = navProgressPercent(current, total)

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percentage)}
      className={cn('h-1 w-full shrink-0 overflow-hidden bg-muted', className)}
    >
      <div
        className="h-full bg-green-500 dark:bg-green-400 transition-[width] duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
