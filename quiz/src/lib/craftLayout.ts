/**
 * **Concept Craft's board** — the physics and the geometry, with no DOM in it
 * (docs/concept-craft.md).
 *
 * The board is a small force simulation in the d3-force mould, written out
 * here because it is forty lines and the app has no graph library to borrow
 * one from:
 *
 * - every concept on the board is a **body** the size of its card;
 * - every connection found is a **spring** between its two cards, stiffer and
 *   shorter the stronger the connection — so the strongly connected gather
 *   and the loosely connected sit further out, and the map's shape says what
 *   its numbers say;
 * - every pair of bodies **repels**, and overlapping rectangles are pushed
 *   apart outright (**collision**), which is what keeps an eighty-concept graph
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
}

export interface Spring {
  a: string
  b: string
  /** The rest length, centre to centre. */
  length: number
  /** How hard it pulls, as a share of the full spring (1 when left out). */
  k?: number
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
/** Clear space kept around every body, in world px. */
const GAP = 14

/** A concept card's box for its name: wraps at about 18 characters, two lines at most. */
export function cardSize(name: string): { w: number; h: number } {
  const chars = Math.min(name.length, 22)
  const w = Math.max(92, Math.min(176, chars * 7.4 + 30))
  const lines = name.length * 7.4 + 30 > 176 ? 2 : 1
  return { w, h: lines === 2 ? 52 : 38 }
}

/**
 * A connection's spring, from its strength (0–100): the strongest pull their
 * cards to a short arm's length, the faintest hang loose at nearly three
 * times that. `reach` is how much of the length the cards themselves take up
 * (half of each one's width), so the gap between them — where the strength
 * is written — is what the strength decides.
 */
export function connectionSpring(a: string, b: string, strength: number, reach = 0): Spring {
  const s = Math.min(100, Math.max(0, strength)) / 100
  return { a, b, length: reach + 150 - 100 * s, k: 0.25 + 0.75 * s }
}

/**
 * How thick a connection's line is drawn, in board units: the strength to the
 * power 1.5 over a wide range — 0.6 for nothing, about 4.5 at 50, 11.6 at 100 —
 * so how strong a connection is reads at a glance, before any number does, and
 * the strong lines stand out of a busy board rather than merely darker.
 */
export function lineWidth(strength: number): number {
  const s = Math.min(100, Math.max(0, strength)) / 100
  return 0.6 + 11 * Math.pow(s, 1.5)
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
    let dx = b.x - a.x
    let dy = b.y - a.y
    let d = Math.hypot(dx, dy)
    if (d < 1e-3) {
      dx = 1
      dy = 0
      d = 1
    }
    const f = ((d - s.length) / d) * SPRING_K * (s.k ?? 1) * alpha
    if (!a.pinned) {
      a.vx += dx * f
      a.vy += dy * f
    }
    if (!b.pinned) {
      b.vx -= dx * f
      b.vy -= dy * f
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
      const fy = (dy / d) * f
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
    body.vy -= body.y * GRAVITY * alpha
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
      const ox = (a.w + b.w) / 2 + GAP - Math.abs(b.x - a.x)
      const oy = (a.h + b.h) / 2 + GAP - Math.abs(b.y - a.y)
      if (ox <= 0 || oy <= 0) continue
      if (a.pinned && b.pinned) continue
      const share = a.pinned || b.pinned ? 1 : 0.5
      if (ox < oy) {
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

/**
 * Where a concept arriving beside `anchor` appears: on the far side of it from
 * the middle of the board, so the map grows outward rather than into itself,
 * turned by `turn` (radians) so two arrivals at one card don't land on one spot.
 */
export function spawnNear(anchor: Point, centre: Point, turn = 0): Point {
  let angle = Math.atan2(anchor.y - centre.y, anchor.x - centre.x)
  if (Math.hypot(anchor.x - centre.x, anchor.y - centre.y) < 1) angle = Math.PI / 2
  angle += turn
  return { x: anchor.x + Math.cos(angle) * 170, y: anchor.y + Math.sin(angle) * 170 }
}

/**
 * Where the `i`-th of `n` concepts a connection made appears: off the middle of
 * the line between the two cards that made it, on the side away from the
 * middle of the board, the `n` fanned out along the line — so what a pair made
 * hangs off that pair, the way a result hangs under the terms that make it.
 */
export function spawnBeside(a: Point, b: Point, centre: Point, i = 0, n = 1): Point {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  let ux = b.x - a.x
  let uy = b.y - a.y
  const len = Math.hypot(ux, uy)
  if (len < 1e-3) {
    ux = 1
    uy = 0
  } else {
    ux /= len
    uy /= len
  }
  // The normal, turned to point away from the middle of the board (or down,
  // when the pair sits on it).
  let nx = -uy
  let ny = ux
  const away = (mx - centre.x) * nx + (my - centre.y) * ny
  if (away < 0 || (Math.abs(away) < 1e-3 && ny < 0)) {
    nx = -nx
    ny = -ny
  }
  const along = (i - (n - 1) / 2) * 190
  return { x: mx + nx * 150 + ux * along, y: my + ny * 150 + uy * along }
}

/**
 * Concepts arriving with nowhere else to go. A few go side by side across the
 * middle of the board; more are laid out in a sunflower spiral around it, so a
 * whole board restored at once starts as a disc the forces can settle, not a
 * line they can't fold up.
 */
export function seedPositions(count: number): Point[] {
  if (count <= 3) return Array.from({ length: count }, (_, i) => ({ x: (i - (count - 1) / 2) * 220, y: 0 }))
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const r = 130 * Math.sqrt(i)
    return { x: Math.round(r * Math.cos(i * golden)), y: Math.round(r * Math.sin(i * golden) * 0.7) }
  })
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
 * so what is drawn on a line sits on the stretch of it between two cards, not
 * under either. Returns the centre itself when `from` is inside the box.
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

/** The middle of the stretch of line between two cards — where its label goes. */
export function lineLabelPoint(a: Pick<Body, 'x' | 'y' | 'w' | 'h'>, b: Pick<Body, 'x' | 'y' | 'w' | 'h'>): Point {
  const p = edgeToBox(b, a, 0)
  const q = edgeToBox(a, b, 0)
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }
}
