// **A swipe moves the desk.** The four places lie side by side
// (lib/viewTransition.ts), so on a phone a sideways swipe across a page goes
// to the place beside it, and in a quiz it turns to the next question or back
// to the last. This is the pure half of `components/SwipeNav.tsx`: what counts
// as a swipe, and where one leads.
//
// A swipe is read when the finger lifts, and is deliberately hard to make by
// accident: long, quick and nearly level. The move it starts is the one a tap
// on the place would draw.

import { PLACES, type PlaceId } from './places'

/** A touch that begins this close (px) to a side edge is the browser's own Back gesture. */
export const SWIPE_EDGE = 28
/** The least (px) a finger travels sideways for a swipe. */
export const SWIPE_MIN = 72
/** The longest (ms) a swipe takes: anything slower is a drag or a read. */
export const SWIPE_MAX_MS = 600

export type SwipeDirection = 'forward' | 'back'

/** Fired on the window, with the direction, for a swipe across a page that turns its own sheets (the quiz). */
export const SWIPE_EVENT = 'app:swipe'

/** Does a touch that began at `x` on a screen `width` wide belong to the browser's edge gesture? */
export function inEdgeGutter(x: number, width: number): boolean {
  return x < SWIPE_EDGE || x > width - SWIPE_EDGE
}

/**
 * What a touch that moved (dx, dy) in `ms` was: a swipe `forward` (the finger
 * went left, pulling the next sheet in), `back`, or not a swipe at all. It
 * must be at least `SWIPE_MIN` long, more than twice as wide as it is tall,
 * and done within `SWIPE_MAX_MS`.
 */
export function swipeDirection(dx: number, dy: number, ms: number): SwipeDirection | null {
  const across = Math.abs(dx)
  if (across < SWIPE_MIN) return null
  if (across <= Math.abs(dy) * 2) return null
  if (!(ms > 0) || ms > SWIPE_MAX_MS) return null
  return dx < 0 ? 'forward' : 'back'
}

/** The place beside `current` in the direction swiped, or null at either end (and outside the places). */
export function neighbourPlace(current: PlaceId | null, direction: SwipeDirection): PlaceId | null {
  const at = PLACES.findIndex(p => p.id === current)
  if (at < 0) return null
  return PLACES[at + (direction === 'forward' ? 1 : -1)]?.id ?? null
}
