// The square, rounded tile the app's card logos are drawn on.
//
// Two things lead a card with one: an exam's monogram (`ExamLogo`, filled with
// the exam's own accent) and a guide's icon (the Study Guides home page). They
// share this tile so the two kinds of card are the same object — same edge,
// same radius, same optical weight — rather than a 48px tile beside a loose
// 20px glyph.
//
// The size is a single edge length in pixels and everything inside scales off
// it, so the same tile works at 26px in a list row and 48px on a card. The
// radius tracks the edge: a fixed `rounded-lg` reads as a very round tile at
// 26px and a barely-rounded one at 48px.

import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const LOGO_TILE_SIZES = {
  /** A list row or a pill. */
  sm: 26,
  /** The wiki header strip, where the tile stands in for the exam's title. */
  md: 34,
  /**
   * A card. One size for every grid that shows them — the Study Guides grid
   * and the quiz builder — so the same exam is the same object on either tab.
   */
  lg: 48,
} as const

export type LogoTileSize = keyof typeof LOGO_TILE_SIZES

/** The edge length, in px, a tile of this size is drawn at. */
export function logoTileEdge(size: LogoTileSize): number {
  return LOGO_TILE_SIZES[size]
}

export function LogoTile({
  size = 'md',
  style,
  className,
  children,
}: {
  size?: LogoTileSize
  style?: CSSProperties
  className?: string
  children?: ReactNode
}) {
  const edge = LOGO_TILE_SIZES[size]

  return (
    <span
      aria-hidden="true"
      style={{
        width: edge,
        height: edge,
        borderRadius: Math.round(edge * 0.28),
        ...style,
      }}
      className={cn(
        'inline-flex shrink-0 select-none flex-col items-center justify-center',
        className,
      )}
    >
      {children}
    </span>
  )
}
