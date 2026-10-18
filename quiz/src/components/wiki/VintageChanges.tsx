import { Minus, Plus } from 'lucide-react'
import type { VintageChange } from '@/lib/resourceVintages'
import { cn } from '@/lib/utils'

// The marks a syllabus edition's changes wear on a shelf of readings
// (`lib/resourceVintages.ts`): the Resources page and an exam study guide's
// Source Material both draw them, so the two shelves say "added" and
// "dropped" the same way.

export function ChangePill({ change, edition }: { change: VintageChange; edition: string }) {
  const Icon = change === 'added' ? Plus : Minus
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
        change === 'added'
          ? 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100'
          : 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
      )}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden />
      {change === 'added' ? `New in ${edition}` : `Dropped in ${edition}`}
    </span>
  )
}

/**
 * What an edition added, with how many — a fact about the edition, not a
 * switch: the added readings are on its shelf and marked either way, so it
 * wears the green its cards wear and can't be pressed. (It was a toggle; turning
 * it off left the additions leading the grid with nothing saying why.)
 */
export function AddedCount({ count }: { count: number }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium',
        count > 0
          ? 'border-green-500/40 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100'
          : 'bg-card opacity-40',
      )}
    >
      <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Added
      <span className="text-xs tabular-nums opacity-70">{count}</span>
    </span>
  )
}

/**
 * The changes row's one toggle: put what the edition dropped back on the
 * shelf, struck through, with how many. Pressed, it wears the red the cards
 * it brings back wear.
 */
export function DroppedToggle({
  count,
  active,
  onToggle,
}: {
  count: number
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      disabled={count === 0}
      data-sound="select"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40',
        active
          ? 'border-red-500/40 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100'
          : 'bg-card enabled:hover:bg-accent',
      )}
    >
      <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Dropped
      <span className="text-xs tabular-nums opacity-70">{count}</span>
    </button>
  )
}
