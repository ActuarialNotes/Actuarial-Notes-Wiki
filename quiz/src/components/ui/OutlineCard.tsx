// The redesign's surfaces (docs/redesign-spec.md §2, style guide §13.1): one
// ground, and on it cards and tiles that are outlines, never fills.
//
// `Card` (card.tsx) is the raised, filled surface of the screens not yet
// redesigned. Don't mix the two on one screen.

import * as React from 'react'
import { cn } from '@/lib/utils'

/** The page of a redesigned screen: the one ground, the one text colour. */
export const GROUND = 'bg-ground text-foreground'

/** A card: a 1px outline in the line colour, 22px corners, no fill. */
export const OUTLINE_CARD = 'rounded-[22px] border border-border bg-ground text-foreground'

/** A tile: the same outline at 18px corners. */
export const OUTLINE_TILE = 'rounded-[18px] border border-border bg-ground text-foreground'

/**
 * What a tile that is a link or a button adds: the outline steps up to the
 * text colour under the pointer or a press, and the focus ring is the app's.
 */
export const OUTLINE_TILE_PRESSABLE =
  'transition-colors hover:border-foreground active:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

/** A hairline between the rows inside a card. */
export const OUTLINE_ROW_RULE = 'border-b border-border last:border-b-0'

export const OutlineCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(OUTLINE_CARD, 'p-5', className)} {...props} />
  ),
)
OutlineCard.displayName = 'OutlineCard'

export const OutlineTile = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(OUTLINE_TILE, 'px-4 py-3.5', className)} {...props} />
  ),
)
OutlineTile.displayName = 'OutlineTile'
