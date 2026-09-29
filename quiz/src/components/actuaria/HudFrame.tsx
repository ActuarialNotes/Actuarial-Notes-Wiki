// A **HUD panel** — a card with four signal-coloured corner ticks
// (docs/actuaria-online.md §4.2).
//
// The ticks say "this is live, and it is yours to act on". They go on three
// things only — the selected-sector panel on the star map, the question card
// under the Actuaria skin of the Battle page, and the raid boss — and never on
// a plain card, or they stop meaning anything.

import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Radius = 'lg' | 'xl' | '2xl'

const CORNER: Record<Radius, { tl: string; tr: string; bl: string; br: string; panel: string }> = {
  lg: { tl: 'rounded-tl-lg', tr: 'rounded-tr-lg', bl: 'rounded-bl-lg', br: 'rounded-br-lg', panel: 'rounded-lg' },
  xl: { tl: 'rounded-tl-xl', tr: 'rounded-tr-xl', bl: 'rounded-bl-xl', br: 'rounded-br-xl', panel: 'rounded-xl' },
  '2xl': { tl: 'rounded-tl-2xl', tr: 'rounded-tr-2xl', bl: 'rounded-bl-2xl', br: 'rounded-br-2xl', panel: 'rounded-2xl' },
}

export function HudFrame({
  as: Tag = 'div',
  radius = 'xl',
  surface = true,
  className,
  children,
  ...rest
}: {
  as?: ElementType
  /** The panel's corner — the ticks bend to the same radius. */
  radius?: Radius
  /** Paint the card surface (off when wrapping something that already has one). */
  surface?: boolean
  className?: string
  children?: ReactNode
  [data: `data-${string}`]: string | undefined
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>) {
  const r = CORNER[radius]
  const tick = 'pointer-events-none absolute h-4 w-4 border-actuaria-signal'
  return (
    <Tag className={cn('relative', r.panel, surface && 'bg-card', className)} {...rest}>
      <span aria-hidden="true" className={cn(tick, 'left-0 top-0 border-l-2 border-t-2', r.tl)} />
      <span aria-hidden="true" className={cn(tick, 'right-0 top-0 border-r-2 border-t-2', r.tr)} />
      <span aria-hidden="true" className={cn(tick, 'bottom-0 left-0 border-b-2 border-l-2', r.bl)} />
      <span aria-hidden="true" className={cn(tick, 'bottom-0 right-0 border-b-2 border-r-2', r.br)} />
      {children}
    </Tag>
  )
}
