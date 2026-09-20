import { LogoTile, logoTileEdge, type LogoTileSize } from '@/components/LogoTile'
import type { EntityCategory } from '@/lib/coworkSources'
import { cn } from '@/lib/utils'

/**
 * A publisher's monogram, on the same tile an exam logo is drawn on
 * (`components/LogoTile.tsx`) — so a source card and an exam card lead with the
 * same object at the same optical weight.
 *
 * The colour is the *category*, not the publisher: a reader scanning the list
 * is asking "regulator or trade press?" far more often than "which regulator?",
 * and there is no per-publisher palette that would not turn into a brand
 * imitation. It is branding rather than information — the card's title names
 * the publisher — so the tile is `aria-hidden` via `LogoTile`.
 */

const CATEGORY_TONE: Record<EntityCategory, string> = {
  regulator: 'bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  standards: 'bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  insurer: 'bg-teal-500/15 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  'industry-data': 'bg-cyan-500/15 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
  consulting: 'bg-orange-500/15 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  media: 'bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
}

export function EntityLogo({
  short,
  category,
  size = 'lg',
}: {
  short: string
  category: EntityCategory
  size?: LogoTileSize
}) {
  const edge = logoTileEdge(size)
  // A long acronym has to shrink or it overflows the tile; the scale is the
  // same idea as `lib/examLogo.ts` — a fraction of the tile's edge, stepped
  // down by length so PACICC and OSFI both sit inside the same square.
  const fontSize = Math.round(
    edge * (short.length > 5 ? 0.19 : short.length > 4 ? 0.22 : short.length > 3 ? 0.27 : 0.32),
  )

  return (
    <LogoTile size={size} className={cn('font-extrabold tracking-tight', CATEGORY_TONE[category])}>
      <span style={{ fontSize, lineHeight: 1 }}>{short}</span>
    </LogoTile>
  )
}
