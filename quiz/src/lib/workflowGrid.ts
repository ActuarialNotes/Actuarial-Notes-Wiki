/**
 * **The Workflow Builder's grid** — the geometry of a board whose cards are
 * locked in place (docs/workflow-builder.md). Where Concept Craft's board is a
 * force simulation (`lib/craftLayout.ts`) because a map of concepts is a shape
 * to be discovered, a workflow is a procedure to be read: every step sits in a
 * cell of a grid, left to right in the order it runs, and stays where it was
 * put. Nothing here moves on its own.
 *
 * The camera is Concept Craft's own (`View`, `zoomAt`, `toWorld`…, all from
 * `craftLayout.ts`), so the two boards pan, pinch and zoom alike. Pure and
 * tested; no DOM.
 */

import type { Body, Point } from './craftLayout'

/** One cell of the grid, in world px. A card sits in the middle of its cell. */
export const CELL = { w: 288, h: 136 } as const
/** A card. Smaller than its cell by the gutter a line — and its label — runs along. */
export const NODE = { w: 184, h: 84 } as const

export interface Cell {
  col: number
  row: number
}

export const cellKey = (c: Cell) => `${c.col},${c.row}`

/** The middle of a cell — where its card is centred. */
export function cellCentre(c: Cell): Point {
  return { x: (c.col + 0.5) * CELL.w, y: (c.row + 0.5) * CELL.h }
}

/** The cell a world point falls in. */
export function cellAt(p: Point): Cell {
  return { col: Math.floor(p.x / CELL.w), row: Math.floor(p.y / CELL.h) }
}

/** The world box of a cell's card — what a tap lands on. */
export function nodeBox(c: Cell): Body {
  const { x, y } = cellCentre(c)
  return { x, y, w: NODE.w, h: NODE.h, vx: 0, vy: 0, pinned: true }
}

/**
 * The free cell nearest `near`: `near` itself, then down its column (a second
 * step after the same one is a branch, drawn under the first), then above
 * it, then the columns further right. Never a negative cell, and never one to
 * the left of `near` — what follows a step is drawn after it.
 */
export function freeCellNear(taken: ReadonlySet<string>, near: Cell): Cell {
  const REACH = 16
  const candidates: { cell: Cell; score: number }[] = []
  for (let dr = -REACH; dr <= REACH; dr++) {
    for (let dc = 0; dc <= REACH; dc++) {
      const cell = { col: near.col + dc, row: near.row + dr }
      if (cell.col < 0 || cell.row < 0) continue
      // A step down the column is cheaper than one across: a branch stays
      // beside its siblings, and below them before above.
      candidates.push({ cell, score: 2 * dc + Math.abs(dr) + (dr < 0 ? 0.5 : 0) })
    }
  }
  candidates.sort((a, b) => a.score - b.score || a.cell.col - b.cell.col)
  for (const { cell } of candidates) if (!taken.has(cellKey(cell))) return cell
  // A board this full has room below it.
  let row = near.row + REACH + 1
  while (taken.has(cellKey({ col: near.col, row }))) row++
  return { col: near.col, row }
}

/**
 * A line from one card to another, as an SVG path: out of the source's right
 * edge, into the target's left edge, as a cubic that leaves and arrives level —
 * so a line reads as "then" even when its target sits behind its source.
 */
export function edgeGeometry(from: Cell, to: Cell): { d: string; start: Point; end: Point; mid: Point } {
  const a = cellCentre(from)
  const b = cellCentre(to)
  const start = { x: a.x + NODE.w / 2, y: a.y }
  // Stop short of the card and the dot a line arrives at, so the arrowhead
  // is drawn in the gutter.
  const end = { x: b.x - NODE.w / 2 - 7, y: b.y }
  const dx = end.x - start.x
  const reach = Math.max(40, Math.abs(dx) / 2, dx < 0 ? CELL.w * 0.6 : 0)
  const c1 = { x: start.x + reach, y: start.y }
  const c2 = { x: end.x - reach, y: end.y }
  // The curve at t = ½: where a line's label sits.
  const mid = {
    x: (start.x + 3 * c1.x + 3 * c2.x + end.x) / 8,
    y: (start.y + 3 * c1.y + 3 * c2.y + end.y) / 8,
  }
  const r = (n: number) => Math.round(n * 10) / 10
  return {
    d: `M${r(start.x)} ${r(start.y)} C${r(c1.x)} ${r(c1.y)} ${r(c2.x)} ${r(c2.y)} ${r(end.x)} ${r(end.y)}`,
    start,
    end,
    mid,
  }
}

/** The boxes of every card, for `fitView`. */
export function boxes(cells: readonly Cell[]): Body[] {
  return cells.map(nodeBox)
}
