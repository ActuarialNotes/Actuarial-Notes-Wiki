/**
 * **Concept Craft's board** — the physics and the geometry, with no DOM in it
 * (docs/concept-craft.md).
 *
 * The board is a small force simulation in the d3-force mould, written out
 * here because it is forty lines and the app has no graph library to borrow
 * one from:
 *
 * - every concept is a **body** the size of its card, and every found recipe
 *   adds a **junction** body the size of its relation tag, sitting between the
 *   two ingredients with the result hanging off it — so the tag is a thing on
 *   the board that other things keep clear of, not a label painted over them;
 * - **springs** pull each ingredient and the result toward their junction;
 * - every pair of bodies **repels**, and overlapping rectangles are pushed
 *   apart outright (**collision**), which is what keeps a fifty-concept graph
 *   from becoming a spiderweb of cards on top of each other;
 * - a weak **gravity** toward the origin stops the whole graph drifting off;
 * - **alpha** is the temperature: every force is scaled by it, it cools each
 *   tick, and the loop stops once it is cold. A craft or a "tidy" reheats it.
 *
 * A **pinned** body (the one under the reader's finger) feels nothing and is
 * moved only by the hand. Everything here mutates the bodies it is handed —
 * this runs sixty times a second — and returns plain numbers, so it is tested
 * without a canvas.
 */

export interface Body {
  x: number
  y: number
  vx: number
  vy: number
  /** The body's box, centred on (x, y). */
  w: number
  h: number
  pinned: boolean
  /**
   * Held in the hand and passing over the others: no force reaches it and it
   * pushes nothing. Without this the card under it would be shoved out of the
   * way of the drop meant for it.
   */
  ghost?: boolean
  /**
   * The row the body belongs on, as a world y. A body with one is held to its
   * row (and drawn to the middle sideways only); one without floats free under
   * gravity on both axes.
   */
  row?: number
}

export interface Spring {
  a: string
  b: string
  /** The rest length, centre to centre. */
  length: number
  /**
   * Hang `b` straight below `a` rather than anywhere at that distance — how a
   * result sits under the tag that made it, so a board reads top to bottom
   * from what the reader started with to what they built.
   */
  below?: boolean
}

export interface Point {
  x: number
  y: number
}

/** The board's camera: a world point p is drawn at `p * k + (x, y)`. */
export interface View {
  x: number
  y: number
  k: number
}

export const MIN_ZOOM = 0.35
export const MAX_ZOOM = 1.8
/** Below this the board is cold and the loop can stop. */
export const ALPHA_MIN = 0.004
const ALPHA_DECAY = 0.03
const VELOCITY_KEEP = 0.55
const SPRING_K = 0.12
const CHARGE = 2600
const GRAVITY = 0.012
const ROW_K = 0.12
/** The distance between two rows of the board, in world px. */
export const ROW_GAP = 150
/** Clear space kept around every body, in world px. */
const GAP = 14

/** A concept card's box for its name: wraps at about 18 characters, two lines at most. */
export function cardSize(name: string): { w: number; h: number } {
  const chars = Math.min(name.length, 22)
  const w = Math.max(92, Math.min(176, chars * 7.4 + 30))
  const lines = name.length * 7.4 + 30 > 176 ? 2 : 1
  return { w, h: lines === 2 ? 52 : 38 }
}

/** A relation tag's box. */
export function tagSize(label: string): { w: number; h: number } {
  return { w: Math.max(56, label.length * 6.1 + 18), h: 22 }
}

export function makeBody(at: Point, size: { w: number; h: number }): Body {
  return { x: at.x, y: at.y, vx: 0, vy: 0, w: size.w, h: size.h, pinned: false }
}

/**
 * One tick of the simulation at temperature `alpha`. Returns how far the
 * furthest body moved, so the caller can stop early on a settled board.
 */
export function step(bodies: Record<string, Body>, springs: readonly Spring[], alpha: number): number {
  const ids = Object.keys(bodies)
  const list = ids.map(id => bodies[id])
  const solid = list.filter(b => !b.ghost)

  // Springs: each end pulled toward (or pushed off to) the rest length.
  for (const s of springs) {
    const a = bodies[s.a]
    const b = bodies[s.b]
    if (!a || !b || a.ghost || b.ghost) continue
    if (s.below) {
      // Sideways, toward a column; a body with a row leaves its height to it.
      const ex = (b.x - a.x) * SPRING_K * alpha
      const ey = b.row === undefined ? (b.y - a.y - s.length) * SPRING_K * alpha : 0
      if (!a.pinned) {
        a.vx += ex
        a.vy += ey
      }
      if (!b.pinned) {
        b.vx -= ex
        b.vy -= ey
      }
      continue
    }
    let dx = b.x - a.x
    let dy = b.y - a.y
    let d = Math.hypot(dx, dy)
    if (d < 1e-3) {
      dx = 1
      dy = 0
      d = 1
    }
    const f = ((d - s.length) / d) * SPRING_K * alpha
    // Between two bodies with rows a spring only draws them into line: the
    // rows own the heights, and a long spring across several rows would
    // otherwise drag a card halfway to the row of what it made.
    const vertical = a.row !== undefined && b.row !== undefined ? 0 : 1
    if (!a.pinned) {
      a.vx += dx * f
      a.vy += dy * f * vertical
    }
    if (!b.pinned) {
      b.vx -= dx * f
      b.vy -= dy * f * vertical
    }
  }

  // Repulsion: every pair, inverse-square on the centre distance.
  for (let i = 0; i < solid.length; i++) {
    const a = solid[i]
    for (let j = i + 1; j < solid.length; j++) {
      const b = solid[j]
      let dx = b.x - a.x
      let dy = b.y - a.y
      let d2 = dx * dx + dy * dy
      if (d2 < 1) {
        // Two bodies on one spot: split them along a fixed axis by index, so
        // the result doesn't depend on a random draw.
        dx = j - i
        dy = 1
        d2 = dx * dx + dy * dy
      }
      const d = Math.sqrt(d2)
      const f = (CHARGE * alpha) / Math.max(d2, 400)
      const fx = (dx / d) * f
      // Across two rows the push is sideways only: the rows own the heights.
      const fy = a.row !== undefined && b.row !== undefined && a.row !== b.row ? 0 : (dy / d) * f
      if (!a.pinned) {
        a.vx -= fx
        a.vy -= fy
      }
      if (!b.pinned) {
        b.vx += fx
        b.vy += fy
      }
    }
  }

  // Gravity toward the origin, then integrate.
  let moved = 0
  for (const body of list) {
    if (body.pinned) {
      body.vx = 0
      body.vy = 0
      continue
    }
    body.vx -= body.x * GRAVITY * alpha
    if (body.row === undefined) body.vy -= body.y * GRAVITY * alpha
    else body.vy += (body.row - body.y) * ROW_K * alpha
    body.vx *= VELOCITY_KEEP
    body.vy *= VELOCITY_KEEP
    body.x += body.vx
    body.y += body.vy
    moved = Math.max(moved, Math.hypot(body.vx, body.vy))
  }

  moved = Math.max(moved, separate(solid))
  return moved
}

/**
 * Push overlapping boxes apart along the axis they overlap least on. Applied
 * to positions, not velocities, and at any temperature: two cards on top of
 * each other is never a state worth easing out of.
 */
export function separate(list: readonly Body[]): number {
  let moved = 0
  for (let i = 0; i < list.length; i++) {
    const a = list[i]
    for (let j = i + 1; j < list.length; j++) {
      const b = list[j]
      // Two bodies bound for different rows pass through each other on the
      // way: settled, their rows keep them apart, and pushing them here would
      // only wedge one above the other on the wrong row.
      if (a.row !== undefined && b.row !== undefined && a.row !== b.row) continue
      const ox = (a.w + b.w) / 2 + GAP - Math.abs(b.x - a.x)
      const oy = (a.h + b.h) / 2 + GAP - Math.abs(b.y - a.y)
      if (ox <= 0 || oy <= 0) continue
      if (a.pinned && b.pinned) continue
      const share = a.pinned || b.pinned ? 1 : 0.5
      // On one row, apart sideways: the row is where both belong.
      const sameRow = a.row !== undefined && a.row === b.row
      if (ox < oy || sameRow) {
        const dir = b.x >= a.x ? 1 : -1
        const push = ox * share * dir
        if (!a.pinned) a.x -= push
        if (!b.pinned) b.x += push
        moved = Math.max(moved, Math.abs(push))
      } else {
        const dir = b.y >= a.y ? 1 : -1
        const push = oy * share * dir
        if (!a.pinned) a.y -= push
        if (!b.pinned) b.y += push
        moved = Math.max(moved, Math.abs(push))
      }
    }
  }
  return moved
}

export function cool(alpha: number): number {
  const next = alpha * (1 - ALPHA_DECAY)
  return next < ALPHA_MIN ? 0 : next
}

/** Where a new concept appears: off the side of its two ingredients, past the tag between them. */
export function spawnPoint(a: Point, b: Point, turn = 1): Point {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  let nx = -(b.y - a.y)
  let ny = b.x - a.x
  const len = Math.hypot(nx, ny)
  if (len < 1e-3) {
    nx = 0
    ny = 1
  } else {
    nx /= len
    ny /= len
  }
  // Prefer below the pair, the way a sum is written under its terms.
  if (ny < 0) {
    nx = -nx
    ny = -ny
  }
  return { x: mx + nx * 96 * turn, y: my + ny * 96 * turn }
}

/** The opening layout: the primitives side by side along the top row, centred on the origin. */
export function seedPositions(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => ({ x: (i - (count - 1) / 2) * 190, y: 0 }))
}

/** The topmost card whose box (grown by `slop`) holds the point, skipping `except`. */
export function bodyAt(
  bodies: Record<string, Body>,
  candidates: readonly string[],
  p: Point,
  except?: string,
  slop = 10,
): string | null {
  let best: string | null = null
  let bestD = Infinity
  for (const id of candidates) {
    if (id === except) continue
    const b = bodies[id]
    if (!b) continue
    if (Math.abs(p.x - b.x) > b.w / 2 + slop || Math.abs(p.y - b.y) > b.h / 2 + slop) continue
    const d = Math.hypot(p.x - b.x, p.y - b.y)
    if (d < bestD) {
      bestD = d
      best = id
    }
  }
  return best
}

export function clampZoom(k: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, k))
}

export function toWorld(view: View, screen: Point): Point {
  return { x: (screen.x - view.x) / view.k, y: (screen.y - view.y) / view.k }
}

export function toScreen(view: View, world: Point): Point {
  return { x: world.x * view.k + view.x, y: world.y * view.k + view.y }
}

/** Zoom by `factor` keeping the world point under `at` (a screen point) where it is. */
export function zoomAt(view: View, at: Point, factor: number): View {
  const k = clampZoom(view.k * factor)
  const world = toWorld(view, at)
  return { k, x: at.x - world.x * k, y: at.y - world.y * k }
}

/** Room at a viewport's edges that something else is covering — a panel over the board. */
export interface Insets {
  top: number
  right: number
  bottom: number
  left: number
}

const NO_INSETS: Insets = { top: 0, right: 0, bottom: 0, left: 0 }

/**
 * The view that fits every body inside a `width` × `height` viewport, no
 * closer than 1:1, inside whatever `insets` leave uncovered.
 */
export function fitView(bodies: readonly Body[], width: number, height: number, padding = 48, insets: Insets = NO_INSETS): View {
  const free = {
    x: insets.left,
    y: insets.top,
    w: Math.max(1, width - insets.left - insets.right),
    h: Math.max(1, height - insets.top - insets.bottom),
  }
  if (bodies.length === 0 || width <= 0 || height <= 0) return { x: free.x + free.w / 2, y: free.y + free.h / 2, k: 1 }
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const b of bodies) {
    minX = Math.min(minX, b.x - b.w / 2)
    maxX = Math.max(maxX, b.x + b.w / 2)
    minY = Math.min(minY, b.y - b.h / 2)
    maxY = Math.max(maxY, b.y + b.h / 2)
  }
  const spanX = Math.max(1, maxX - minX)
  const spanY = Math.max(1, maxY - minY)
  const k = clampZoom(Math.min(1, (free.w - padding * 2) / spanX, (free.h - padding * 2) / spanY))
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  return { k, x: free.x + free.w / 2 - cx * k, y: free.y + free.h / 2 - cy * k }
}

/** Do any two boxes overlap (with the board's gap)? For tests and a settled-board check. */
export function anyOverlap(list: readonly Body[]): boolean {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i]
      const b = list[j]
      if (Math.abs(a.x - b.x) < (a.w + b.w) / 2 && Math.abs(a.y - b.y) < (a.h + b.h) / 2) return true
    }
  }
  return false
}

/**
 * Where the segment from `from` toward a box's centre crosses the box's edge —
 * so an edge's arrow ends at the card it points to, not under it. Returns the
 * centre itself when `from` is inside the box.
 */
export function edgeToBox(from: Point, box: Pick<Body, 'x' | 'y' | 'w' | 'h'>, inset = 3): Point {
  const dx = from.x - box.x
  const dy = from.y - box.y
  const hw = box.w / 2 + inset
  const hh = box.h / 2 + inset
  if (Math.abs(dx) <= hw && Math.abs(dy) <= hh) return { x: box.x, y: box.y }
  const t = Math.min(hw / Math.max(Math.abs(dx), 1e-6), hh / Math.max(Math.abs(dy), 1e-6))
  return { x: box.x + dx * t, y: box.y + dy * t }
}
