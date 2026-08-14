import { useState } from 'react'
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
  /**
   * Read the bar as *progress* rather than *position*: the fill grows to the
   * furthest item reached and then holds there, so stepping or jumping back to
   * something covered earlier never rewinds it. Off by default — surfaces where
   * the sequence is short and strictly linear want the literal position.
   */
  holdFurthest?: boolean
  /**
   * Identifies the sequence being walked, for `holdFurthest`. When it changes
   * (a different list, a different filter) the held mark starts over from the
   * new position instead of carrying a meaningless mark across.
   */
  sequenceKey?: string
}

/** Percentage filled for a 1-indexed position, clamped to 0–100. */
export function navProgressPercent(current: number, total: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) return 0
  return Math.min(100, Math.max(0, (current / total) * 100))
}

/**
 * A high-water mark: the furthest fill reached while walking one sequence.
 * `scope` names that sequence, so a new list resets the mark rather than
 * inheriting the old one.
 */
export interface NavProgressMark {
  scope: string
  percent: number
}

/**
 * Advance a held mark toward `percent`. It only ever grows within a scope, and
 * resets outright when the scope changes. Returns the same object when nothing
 * moved, so callers can bail out of a re-render.
 */
export function advanceProgressMark(mark: NavProgressMark, scope: string, percent: number): NavProgressMark {
  if (mark.scope !== scope) return { scope, percent }
  if (percent <= mark.percent) return mark
  return { scope, percent }
}

export function NavProgressBar({
  current,
  total,
  className,
  label = 'Progress',
  holdFurthest = false,
  sequenceKey,
}: NavProgressBarProps) {
  const percentage = navProgressPercent(current, total)

  // Tracked unconditionally (it's a single number) so the mark is already warm
  // if `holdFurthest` flips mid-sequence. Adjusting state during render is the
  // documented React pattern for deriving from props — `advanceProgressMark`
  // converges on the second pass, and the local `mark` is what gets rendered so
  // there's no frame at the stale width.
  const scope = `${sequenceKey ?? ''}|${total}`
  const [prevMark, setPrevMark] = useState<NavProgressMark>(() => ({ scope, percent: percentage }))
  const mark = advanceProgressMark(prevMark, scope, percentage)
  if (mark !== prevMark) setPrevMark(mark)

  const width = holdFurthest ? mark.percent : percentage

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
      className={cn('h-1 w-full shrink-0 overflow-hidden bg-muted', className)}
    >
      <div
        className="h-full bg-green-500 dark:bg-green-400 transition-[width] duration-300 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
