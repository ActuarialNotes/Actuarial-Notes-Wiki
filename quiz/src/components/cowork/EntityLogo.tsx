import { useState } from 'react'
import { LogoTile, logoTileEdge, type LogoTileSize } from '@/components/LogoTile'
import type { SourceEntity } from '@/lib/coworkSources'
import { cn } from '@/lib/utils'

/**
 * A publisher's logo, on the same tile an exam logo is drawn on
 * (`components/LogoTile.tsx`) — so a source card, a source's header strip and
 * an exam card all lead with the same object at the same optical weight.
 *
 * The mark is the publisher's **own**, hotlinked from their site and authored
 * on the entity (`SourceEntity.logo`, transcribed from their markup). A
 * publisher is recognised by their logo long before their name is read, and an
 * approximation of one would be an invented brand — the same mistake as an
 * invented citation.
 *
 * Two things fall back to the **monogram**: an entity whose site publishes no
 * usable mark, and a mark that fails to load. The fallback is tinted by
 * *category*, not by publisher: a reader scanning the list asks "regulator or
 * trade press?" far more often than "which regulator?", and there is no
 * per-publisher palette that would not turn into a brand imitation.
 *
 * It is branding rather than information — every surface that shows one also
 * names the publisher beside it — so the tile is `aria-hidden` via `LogoTile`.
 */

const CATEGORY_TONE: Record<SourceEntity['category'], string> = {
  regulator: 'bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  standards: 'bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  insurer: 'bg-teal-500/15 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300',
  'industry-data': 'bg-cyan-500/15 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
  consulting: 'bg-orange-500/15 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
  media: 'bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
}

export function EntityLogo({
  entity,
  size = 'lg',
  className,
}: {
  entity: SourceEntity
  size?: LogoTileSize
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const edge = logoTileEdge(size)
  const showLogo = Boolean(entity.logo) && !failed

  if (showLogo) {
    return (
      // A white plate under the mark, in both themes: a publisher's logo is
      // drawn for their own site's background — most of these are dark ink on
      // white — and letting a dark theme show through turns half of them into
      // a smudge. The tile is the plate, so the mark keeps its own colours.
      <LogoTile size={size} className={cn('overflow-hidden bg-white shadow-sm ring-1 ring-black/5', className)}>
        <img
          src={entity.logo}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: Math.round(edge * 0.78), height: Math.round(edge * 0.78) }}
          className="object-contain"
        />
      </LogoTile>
    )
  }

  // A long acronym has to shrink or it overflows the tile; the scale is the
  // same idea as `lib/examLogo.ts` — a fraction of the tile's edge, stepped
  // down by length so PACICC and OSFI both sit inside the same square.
  const short = entity.short
  const fontSize = Math.round(
    edge * (short.length > 5 ? 0.19 : short.length > 4 ? 0.22 : short.length > 3 ? 0.27 : 0.32),
  )

  return (
    <LogoTile size={size} className={cn('font-extrabold tracking-tight', CATEGORY_TONE[entity.category], className)}>
      <span style={{ fontSize, lineHeight: 1 }}>{short}</span>
    </LogoTile>
  )
}
