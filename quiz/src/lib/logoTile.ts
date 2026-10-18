// The edge lengths a LogoTile (components/LogoTile.tsx) is drawn at — one
// number per size, which everything inside the tile scales off.

export const LOGO_TILE_SIZES = {
  /** A menu row, beside one line of body text — the "Get a copy" menu. */
  xs: 20,
  /** A list row or a pill. */
  sm: 26,
  /** The wiki header strip, where the tile stands in for the exam's title. */
  md: 34,
  /**
   * A card, or a row of a grouped list (`ui/ListPanel.tsx`). One size for
   * both exam lists — Study Guides and the quiz builder — so the same exam is
   * the same object on either tab.
   */
  lg: 48,
} as const

export type LogoTileSize = keyof typeof LOGO_TILE_SIZES

/** The edge length, in px, a tile of this size is drawn at. */
export function logoTileEdge(size: LogoTileSize): number {
  return LOGO_TILE_SIZES[size]
}
