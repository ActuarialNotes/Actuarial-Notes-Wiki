// The in-between loader: the first-load screen's development triangle cut
// down to three rows, its diagonals pulsing in turn. A page's chunk or data
// reports no progress, so this one says only "working" — no bar, no number,
// no words. It fades in after 300ms (`.loading-mark` in index.css), so a wait
// shorter than that shows nothing at all.

import { useBootHold } from './BootDone'

// Cells of a three-row triangle, row by row, each with its diagonal.
const CELLS: { row: number; col: number }[] = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
  { row: 1, col: 0 }, { row: 1, col: 1 },
  { row: 2, col: 0 },
]

export function LoadingMark({ className = '' }: { className?: string }) {
  return (
    <div role="status" className={`loading-mark ${className}`}>
      <span className="sr-only">Loading</span>
      <span className="loading-mark-grid" aria-hidden>
        {CELLS.map(({ row, col }) => (
          <span
            key={`${row}-${col}`}
            style={{ gridRow: row + 1, gridColumn: col + 1, animationDelay: `${(row + col) * 0.16}s` }}
          />
        ))}
      </span>
    </div>
  )
}

/** A page's loading state: the mark, centred in the space the page will take. */
export function PageLoading() {
  // On the first load, the boot screen stays up until this is gone.
  useBootHold()
  return <LoadingMark className="flex justify-center py-16" />
}
