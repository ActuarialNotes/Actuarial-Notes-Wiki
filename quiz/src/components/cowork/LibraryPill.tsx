import { cn } from '@/lib/utils'

/**
 * **My Library**, the filter that leads both of Cowork's shelves: a narrowing
 * of the catalogue to the part the reader has claimed — the publishers they
 * follow on Sources, the resources they have taken on Resources. It is a
 * filter rather than a section stacked above the shelf, so what a reader has
 * sits in the same place, in the same cards, as what they could have.
 */
export function LibraryPill({
  active,
  count,
  title,
  onToggle,
}: {
  active: boolean
  count: number
  title: string
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      title={title}
      data-sound="select"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-transparent bg-foreground text-background'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      My Library
      <span
        className={cn(
          'rounded-full px-1.5 text-[10px] font-semibold leading-4 tabular-nums',
          active ? 'bg-background/20' : 'bg-muted',
        )}
      >
        {count}
      </span>
    </button>
  )
}
