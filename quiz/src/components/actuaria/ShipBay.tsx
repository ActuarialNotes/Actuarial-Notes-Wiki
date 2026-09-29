// The **ship bay** — the player's ship from above, with a callout for each of
// its cosmetic slots: hull paint, engine trail and calculator bay
// (docs/actuaria-online.md §6.7, §7.3). A static drawing: the paint and the
// trail are the equipped cosmetics' colours (the stock ship is drawn in the
// surface tokens), and the calculator bay names the skin in it. Cosmetic only —
// nothing a ship wears touches a battle's score.

import type { ShipLook } from '@/lib/actuaria/ship'
import { HULL_PATH, PANEL_PATH, TRAIL_PATHS } from './shipPaths'
import { cn } from '@/lib/utils'

export function ShipBay({
  look,
  labels,
  className,
}: {
  look: ShipLook
  /** What each slot holds — "Stock", or the cosmetic's name. */
  labels: { hull: string; trail: string; calculator: string; decal?: string }
  className?: string
}) {
  const hull = look.hull?.base ?? 'hsl(var(--muted))'
  const accent = look.hull?.accent ?? 'hsl(var(--muted-foreground))'
  const trail = look.trail ?? 'hsl(var(--muted-foreground))'

  return (
    <figure className={cn('relative w-full', className)} aria-label="Your ship">
      <svg viewBox="0 0 480 300" className="h-auto w-full" role="img" aria-labelledby="ship-bay-desc">
        <desc id="ship-bay-desc">
          {`Your ship: hull paint ${labels.hull}, engine trail ${labels.trail}, calculator bay ${labels.calculator}${look.decal ? `, decal ${look.decal}` : ''}.`}
        </desc>
        <defs>
          <linearGradient id="ship-trail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={trail} stopOpacity="0.9" />
            <stop offset="100%" stopColor={trail} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Engine trails. */}
        {TRAIL_PATHS.map(d => <path key={d} d={d} fill="url(#ship-trail)" />)}

        {/* Hull: an arrowhead with swept wings. */}
        <path
          d={HULL_PATH}
          fill={hull}
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Panel lines, in the paint's accent. */}
        <path d={PANEL_PATH} stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Canopy. */}
        <ellipse cx="240" cy="92" rx="9" ry="18" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        {/* A decal on the port wing — the Stop-Loss Shield, a raid's reward. */}
        {look.decal && (
          <g data-testid="ship-decal">
            <path d="M184 166 L194 162 L204 166 L204 175 C204 181 198 185 194 187 C190 185 184 181 184 175 Z" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M188 174 L200 174" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
        {/* The calculator bay. */}
        <rect x="229" y="148" width="22" height="30" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x="233" y="152" width="14" height="6" rx="1" fill="hsl(var(--actuaria-signal))" opacity="0.8" />
        <g fill="hsl(var(--muted-foreground))">
          {[0, 1, 2].map(r => [0, 1, 2].map(c => <rect key={`${r}${c}`} x={233 + c * 5} y={161 + r * 5} width="3" height="3" rx="0.5" />))}
        </g>

        {/* Callouts. */}
        <g stroke="hsl(var(--border))" strokeWidth="1" fill="none">
          <path d="M300 160 L360 110 L462 110" />
          <path d="M252 163 L300 240 L462 240" />
          <path d="M226 250 L180 250 L150 270 L18 270" />
        </g>
        <g className="actuaria-display" fontSize="10" fill="hsl(var(--muted-foreground))">
          <text x="462" y="102" textAnchor="end">HULL PAINT</text>
          <text x="462" y="232" textAnchor="end">CALCULATOR BAY</text>
          <text x="18" y="262">ENGINE TRAIL</text>
        </g>
        <g fontSize="12" fill="hsl(var(--foreground))">
          <text x="462" y="126" textAnchor="end">{labels.hull}</text>
          <text x="462" y="256" textAnchor="end">{labels.calculator}</text>
          <text x="18" y="286">{labels.trail}</text>
        </g>
      </svg>
    </figure>
  )
}
