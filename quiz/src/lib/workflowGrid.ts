/**
 * **The workflow board's grid** — the geometry of a board whose cards stay
 * where they are put (docs/workflows.md). Where Concept Craft's board
 * is a force simulation (`lib/craftLayout.ts`) because a map of concepts is a
 * shape to be discovered, a workflow is a procedure to be read: nothing moves
 * on its own.
 *
 * The grid is fine — a card snaps to the nearest point of a 24 px lattice,
 * anywhere on an unbounded board, negative coordinates included — so a reader
 * lays a workflow out however it reads best. The one rule is that two cards
 * never overlap: a card dropped on another lands in the nearest place it fits
 * (`nearestFit`). New steps are laid out a `STEP` apart, so a chain built by
 * adding step after step comes out evenly spaced.
 *
 * A position (`Cell`) is the card's centre in grid units. The camera is
 * Concept Craft's own (`View`, `zoomAt`, `toWorld`…), so the two boards pan,
 * pinch and zoom alike. Pure and tested; no DOM.
 */

import type { Body, Point } from './craftLayout'

/** World px per grid unit — the lattice a card snaps to. */
export const GRID = 24
/** A card, in world px: 8 × 4 grid units. */
export const NODE = { w: 192, h: 96 } as const
const SPAN = { cols: NODE.w / GRID, rows: NODE.h / GRID }
/** Clear grid units kept between two cards, so a line and its arrowhead have room. */
const GAP = 1
/** How far apart new steps are laid out, in grid units: a card and a gutter for a line. */
export const STEP = { cols: 12, rows: 6 } as const

export interface Cell {
  col: number
  row: number
}

export const cellKey = (c: Cell) => `${c.col},${c.row}`

/** A card's centre, in world px. */
export function cellCentre(c: Cell): Point {
  return { x: c.col * GRID, y: c.row * GRID }
}

/** The grid point nearest a world point — where a card dropped there snaps. */
export function cellAt(p: Point): Cell {
  return { col: Math.round(p.x / GRID), row: Math.round(p.y / GRID) }
}

/** The world box of a card — what a tap lands on, and what `fitView` frames. */
export function nodeBox(c: Cell): Body {
  const { x, y } = cellCentre(c)
  return { x, y, w: NODE.w, h: NODE.h, vx: 0, vy: 0, pinned: true }
}

/** Would cards at these two places overlap, or come closer than the gutter a line needs? */
export function overlaps(a: Cell, b: Cell): boolean {
  return Math.abs(a.col - b.col) < SPAN.cols + GAP && Math.abs(a.row - b.row) < SPAN.rows + GAP
}

/** Does a card fit at `at`, clear of every other card? */
export function fits(cards: readonly Cell[], at: Cell): boolean {
  return cards.every(c => !overlaps(c, at))
}

/**
 * The place nearest `at` where a card fits — `at` itself when it is clear.
 * What a drop on top of another card resolves to: the card lands beside it,
 * on whichever side is nearer, rather than being refused.
 */
export function nearestFit(cards: readonly Cell[], at: Cell): Cell {
  if (fits(cards, at)) return at
  for (let r = 1; r < 200; r++) {
    let best: Cell | null = null
    let bestD = Infinity
    for (let dc = -r; dc <= r; dc++) {
      for (let dr = -r; dr <= r; dr++) {
        if (Math.max(Math.abs(dc), Math.abs(dr)) !== r) continue
        const c = { col: at.col + dc, row: at.row + dr }
        const d = Math.hypot(dc, dr)
        if (d < bestD && fits(cards, c)) {
          best = c
          bestD = d
        }
      }
    }
    if (best) return best
  }
  return { col: at.col, row: at.row + 200 }
}

/**
 * Where a new step goes near `near`: `near` itself, then down its column a
 * `STEP` at a time (a second step after the same one is a branch, drawn under
 * the first), then above it, then the columns further right. Never to the left
 * of `near` — what follows a step is drawn after it.
 */
export function freeCellNear(cards: readonly Cell[], near: Cell): Cell {
  const REACH = 12
  const candidates: { cell: Cell; score: number }[] = []
  for (let dr = -REACH; dr <= REACH; dr++) {
    for (let dc = 0; dc <= REACH; dc++) {
      const cell = { col: near.col + dc * STEP.cols, row: near.row + dr * STEP.rows }
      // A step down the column is cheaper than one across: a branch stays
      // beside its siblings, and below them before above.
      candidates.push({ cell, score: 2 * dc + Math.abs(dr) + (dr < 0 ? 0.5 : 0) })
    }
  }
  candidates.sort((a, b) => a.score - b.score || a.cell.col - b.cell.col)
  for (const { cell } of candidates) if (fits(cards, cell)) return cell
  return nearestFit(cards, near)
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
  const reach = Math.max(40, Math.abs(dx) / 2, dx < 0 ? NODE.w * 0.75 : 0)
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
