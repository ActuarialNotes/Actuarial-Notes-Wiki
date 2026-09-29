// **Gambler's Ruin** — the weekly raid boss (docs/actuaria-online.md §6.12): a
// cracked die, an isometric cube in `--destructive` line art. The one enemy,
// so the one thing in Actuaria drawn in the destructive hue (§4.2). Static; a
// defeated boss is the same die split along its crack and faded.

import type { SVGProps } from 'react'
import { cn } from '@/lib/utils'

/** Placed as its own `<svg>` — on a page, or inside the star map's (x, y, width, height). */
export function GamblersRuin({
  defeated = false,
  className,
  ...rest
}: { defeated?: boolean; className?: string } & Omit<SVGProps<SVGSVGElement>, 'className' | 'viewBox'>) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn('text-destructive', defeated && 'opacity-40', className)}
      role="img"
      aria-label={defeated ? 'Gambler’s Ruin, defeated' : 'Gambler’s Ruin, a cracked die'}
      {...rest}
    >
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* The cube: top, left and right faces. */}
        <path d="M100 28 L166 64 L100 100 L34 64 Z" />
        <path d="M34 64 L34 140 L100 176 L100 100" />
        <path d="M166 64 L166 140 L100 176" />
        {/* The crack, down the near edge and across the right face. */}
        <path d="M100 100 L108 118 L96 132 L110 150 L102 176" strokeWidth="2.5" />
        <path d="M110 150 L128 146 L140 158" strokeWidth="2" />
        {defeated && <path d="M112 116 L150 96" strokeWidth="2" />}
      </g>
      <g fill="currentColor">
        {/* One on top… */}
        <ellipse cx="100" cy="64" rx="9" ry="5" />
        {/* …two on the left… */}
        <ellipse cx="52" cy="92" rx="5" ry="7" transform="rotate(-28 52 92)" />
        <ellipse cx="82" cy="148" rx="5" ry="7" transform="rotate(-28 82 148)" />
        {/* …and three on the right, one lost to the crack. */}
        <ellipse cx="148" cy="92" rx="5" ry="7" transform="rotate(28 148 92)" />
        <ellipse cx="118" cy="148" rx="5" ry="7" transform="rotate(28 118 148)" opacity="0.35" />
        <ellipse cx="133" cy="120" rx="5" ry="7" transform="rotate(28 133 120)" />
      </g>
    </svg>
  )
}
