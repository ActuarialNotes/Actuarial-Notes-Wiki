// The ship, small: the hull in its paint and the engine trail behind it, with
// none of the bay's callouts. The Store's ship cards, the Hangar's slot cards
// and the map's player card draw it (docs/actuaria-online.md §6.7, §7.3). It
// reads only the app's surface tokens, never the Actuaria signal, so it draws
// the same inside the `.actuaria` scope and outside it (the Store).

import { useId } from 'react'
import type { ShipLook } from '@/lib/actuaria/ship'
import { cn } from '@/lib/utils'
import { HULL_PATH, PANEL_PATH, TRAIL_PATHS } from './shipPaths'

export function ShipGlyph({
  look,
  size = 40,
  className,
}: {
  look: Partial<ShipLook>
  /** The height in px; the width follows. */
  size?: number
  className?: string
}) {
  // Each glyph's gradient needs its own id — several draw on one page.
  const id = `ship-glyph-trail-${useId().replace(/:/g, '')}`
  const hull = look.hull?.base ?? 'hsl(var(--muted))'
  const accent = look.hull?.accent ?? 'hsl(var(--muted-foreground))'
  const trail = look.trail ?? 'hsl(var(--muted-foreground))'
  return (
    <svg
      viewBox="136 22 208 274"
      height={size}
      width={Math.round((size * 208) / 274)}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={trail} stopOpacity="0.9" />
          <stop offset="100%" stopColor={trail} stopOpacity="0" />
        </linearGradient>
      </defs>
      {TRAIL_PATHS.map(d => <path key={d} d={d} fill={`url(#${id})`} />)}
      <path d={HULL_PATH} fill={hull} stroke="hsl(var(--foreground))" strokeWidth="6" strokeLinejoin="round" />
      <path d={PANEL_PATH} stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
