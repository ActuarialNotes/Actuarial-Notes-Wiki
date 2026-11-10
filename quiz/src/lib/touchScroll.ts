/**
 * **Touch scrolling for the spreadsheet grid** — the maths behind
 * `hooks/useSheetTouchScroll.ts`.
 *
 * Fortune-sheet draws its cells on a canvas and scrolls by two hidden
 * scrollbar elements, so a finger on the grid moves nothing by itself. Its own
 * touch handler subtracts the whole drag so far from the *current* scroll on
 * every move, which makes the grid lurch further the longer the finger moves,
 * and it never stops the browser panning the page behind. This replaces it:
 * the grid follows the finger one-to-one, a drag that starts mostly along one
 * axis stays on it, and a flick carries on and slows the way a native list
 * does.
 */

/** How far a finger moves before a touch is a drag rather than a tap (px). */
export const DRAG_SLOP = 6

/** A drag this many times further along one axis than the other keeps to it. */
export const AXIS_LOCK_RATIO = 1.8

/** Momentum's time constant (ms): iOS's list deceleration. */
export const MOMENTUM_TIME_CONSTANT = 325

/** Slower than this (px/ms) a flick doesn't carry on, and momentum stops. */
export const MIN_VELOCITY = 0.05

/** Fastest a flick carries on at (px/ms). */
export const MAX_VELOCITY = 6

/** Only the samples in this window (ms) before the finger lifts set the flick. */
export const VELOCITY_WINDOW = 100

export type ScrollAxis = 'x' | 'y' | 'both'

/** Which axes a drag moves, decided once it has gone past the slop; null before. */
export function dragAxis(dx: number, dy: number): ScrollAxis | null {
  const ax = Math.abs(dx)
  const ay = Math.abs(dy)
  if (Math.hypot(ax, ay) < DRAG_SLOP) return null
  if (ay >= ax * AXIS_LOCK_RATIO) return 'y'
  if (ax >= ay * AXIS_LOCK_RATIO) return 'x'
  return 'both'
}

/** A movement kept to the drag's axis. */
export function onAxis(axis: ScrollAxis, dx: number, dy: number): { dx: number; dy: number } {
  return { dx: axis === 'y' ? 0 : dx, dy: axis === 'x' ? 0 : dy }
}

export interface TouchSample { t: number; x: number; y: number }

/**
 * The finger's velocity (px/ms) as it lifted, from the samples in the last
 * `VELOCITY_WINDOW` ms — a finger that stopped before lifting has none.
 */
export function releaseVelocity(samples: readonly TouchSample[], now: number): { vx: number; vy: number } {
  const recent = samples.filter(s => now - s.t <= VELOCITY_WINDOW)
  if (recent.length < 2) return { vx: 0, vy: 0 }
  const first = recent[0]
  const last = recent[recent.length - 1]
  const dt = last.t - first.t
  if (dt <= 0) return { vx: 0, vy: 0 }
  const clamp = (v: number) => Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, v))
  return { vx: clamp((last.x - first.x) / dt), vy: clamp((last.y - first.y) / dt) }
}

/**
 * One frame of momentum: how far to move in `dt` ms and the velocity after
 * it, decaying exponentially. Returns null once it is too slow to see.
 */
export function momentumStep(vx: number, vy: number, dt: number): { dx: number; dy: number; vx: number; vy: number } | null {
  if (Math.hypot(vx, vy) < MIN_VELOCITY) return null
  const decay = Math.exp(-dt / MOMENTUM_TIME_CONSTANT)
  // The distance travelled over the frame is the integral of v·e^(−t/τ).
  const travel = MOMENTUM_TIME_CONSTANT * (1 - decay)
  return { dx: vx * travel, dy: vy * travel, vx: vx * decay, vy: vy * decay }
}
