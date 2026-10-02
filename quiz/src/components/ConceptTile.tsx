import type { ButtonHTMLAttributes } from 'react'
import { Lock } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { flashcardFoilClass } from '@/lib/flashcardFoil'
import type { MasteryState } from '@/lib/mastery'
import { cn } from '@/lib/utils'

/**
 * The grid concept tiles sit in: four across on the narrowest phone, so a
 * screenful is ~20 cards and a whole learning objective can be taken in at a
 * glance.
 */
export const CONCEPT_TILE_GRID = 'grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8'

interface TileLook {
  name: string
  /** The concept's level — the foil edge. */
  state: MasteryState
  /** Collected cards wear foil; an uncollected one wears none and carries a padlock. */
  collected: boolean
  /** Picked: the green wash and the tick. */
  selected?: boolean
}

// Colour is state only: the green wash and tick are "picked", and the padlock
// is "not collected yet". Mastery is the **foil** edge alone — the same
// rainbow border the card wears in the deck gallery, scaled by level
// (`lib/flashcardFoil.ts`) — so one card looks like the same card wherever it
// is shown, and the level is read off one material rather than off a second,
// competing colour. The green ring only appears on a card wearing no foil,
// since one border carries one material (docs/style-guide.md §4.3 — the edge
// belongs to foil).
function tileClass({ state, collected, selected }: TileLook): string {
  return cn(
    'relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md p-1.5 text-center transition-colors',
    flashcardFoilClass(collected, state, { tile: true }),
    selected
      ? cn('bg-green-500/15', !collected && 'ring-1 ring-inset ring-green-600/50 dark:ring-green-500/50')
      : 'bg-card',
  )
}

function TileFace({ name, collected, selected }: TileLook) {
  return (
    <>
      <span
        className={cn(
          'text-[10px] font-medium leading-[1.2] break-words line-clamp-5',
          !collected && 'text-muted-foreground',
        )}
      >
        {name}
      </span>
      {selected && <CheckMark className="absolute right-1 top-1 h-3.5 w-3.5" />}
      {!collected && <Lock className="absolute left-1 top-1 h-2.5 w-2.5 text-muted-foreground/70" aria-hidden="true" />}
    </>
  )
}

/**
 * One concept as a small static card — the unit the add-flashcards shelves are
 * built from, and Quiz Battle's topic picker. Deliberately static: this is a
 * picker, not a study surface, so a tile never flips; tapping it picks it, and
 * tapping it again puts it back.
 */
export function ConceptTile({
  name,
  state,
  collected,
  selected = false,
  className,
  ...button
}: TileLook & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'name'>) {
  return (
    <button
      type="button"
      {...button}
      className={cn(
        tileClass({ name, state, collected, selected }),
        !selected && 'hover:bg-accent disabled:hover:bg-card',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
    >
      <TileFace name={name} state={state} collected={collected} selected={selected} />
    </button>
  )
}

/** The same card, only shown — nothing to press. */
export function ConceptTileStatic({ className, ...look }: TileLook & { className?: string }) {
  return (
    <div className={cn(tileClass(look), className)}>
      <TileFace {...look} />
    </div>
  )
}
