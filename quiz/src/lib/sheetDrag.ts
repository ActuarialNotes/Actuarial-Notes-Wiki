// **A sheet with a handle can be pulled down to close it.** The pure half of
// `hooks/useDragToClose.ts`: when a touch becomes a drag of the sheet, how far
// the sheet follows the finger, and whether letting go closes it.

/** How far (px) a finger moves before a touch is read as a drag. */
export const DRAG_SLOP = 8

/**
 * Whether a touch that has moved (dx, dy) starts pulling the sheet down: it is
 * moving down more than sideways, and the sheet's content is at its top (or
 * the touch began on the handle, which always pulls).
 */
export function startsDrag(dx: number, dy: number, atTop: boolean, onHandle: boolean): boolean {
  if (dy <= DRAG_SLOP) return false
  if (Math.abs(dx) > dy) return false
  return atTop || onHandle
}

/** Where the sheet sits for a finger `dy` below where the drag began: never above its place. */
export function dragOffset(dy: number): number {
  return Math.max(0, dy)
}

/**
 * Whether letting go closes the sheet: pulled past a quarter of its height
 * (at least 80px, at most 200px), or flicked down faster than 0.5 px/ms.
 */
export function closesOnRelease(offset: number, height: number, velocity: number): boolean {
  if (offset <= 0) return false
  if (velocity > 0.5 && offset > DRAG_SLOP * 2) return true
  const threshold = Math.min(200, Math.max(80, height * 0.25))
  return offset >= threshold
}

/** The backdrop's opacity while the sheet is `offset` down a sheet `height` tall. */
export function backdropOpacity(offset: number, height: number): number {
  if (height <= 0) return 1
  return Math.max(0, Math.min(1, 1 - offset / height))
}

// **…and pulled by its handle to resize it.** Dragging the handle up makes the
// sheet taller, up to the room there is; dragging down makes it shorter, down
// to its smallest size, and any further pull takes the sheet with the finger,
// which is the pull that closes it.

/**
 * Whether a touch on the handle that has moved (dx, dy) starts resizing the
 * sheet upwards: it is moving up more than sideways. (A move down is
 * `startsDrag`'s.)
 */
export function startsResize(dx: number, dy: number, onHandle: boolean): boolean {
  if (!onHandle) return false
  if (dy >= -DRAG_SLOP) return false
  return Math.abs(dx) <= -dy
}

/**
 * Where a sheet `startHeight` tall sits for a finger `dy` below where the
 * drag began: its height, held between `min` and `max`, and how far it has
 * been pulled down past its smallest size.
 */
export function sheetPlacement(
  startHeight: number,
  dy: number,
  min: number,
  max: number,
): { height: number; offset: number } {
  const floor = Math.min(min, max)
  const wanted = startHeight - dy
  // Past its tallest the sheet still gives a little, less the further it is pulled.
  if (wanted > max) return { height: max + rubberBand(wanted - max), offset: 0 }
  if (wanted >= floor) return { height: wanted, offset: 0 }
  return { height: floor, offset: floor - wanted }
}

/**
 * Whether letting go of the handle closes the sheet although it was not
 * pulled past its smallest size: a hard flick down (over 1 px/ms) that has
 * already travelled 60px.
 */
export function flickCloses(velocity: number, travelled: number): boolean {
  return velocity > 1 && travelled > 60
}

// **…and it moves like something with weight.** A sheet let go keeps the
// speed it was thrown at: it settles faster after a flick than after a slow
// pull, and a resize carries a little past where the finger left it.

/** The curve a sheet settles on: fast away from the finger, easing into place with no overshoot. */
export const SETTLE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** The most (px) a sheet gives when pulled past its tallest. */
export const RUBBER_ROOM = 48

/**
 * How far a sheet moves for a pull of `over` px past a limit: nearly all of
 * it at first, then less and less, never more than `room`.
 */
export function rubberBand(over: number, room: number = RUBBER_ROOM): number {
  if (over <= 0 || room <= 0) return 0
  return room * (1 - 1 / ((over * 0.55) / room + 1))
}

/**
 * The finger's speed (px/ms, down is positive) over its last 100ms, from the
 * touch's samples. Zero when it had stopped before letting go.
 */
export function releaseVelocity(samples: readonly { t: number; y: number }[], now: number): number {
  const last = samples[samples.length - 1]
  if (!last) return 0
  const first = samples.find(s => now - s.t <= 100) ?? last
  return last.t > first.t ? (last.y - first.y) / (last.t - first.t) : 0
}

/**
 * How long (ms) a sheet takes to settle over `distance` px when let go at
 * `velocity` px/ms: the time the throw would take, held between 140 and 360ms.
 */
export function settleMs(distance: number, velocity: number): number {
  const d = Math.abs(distance)
  if (d < 1) return 140
  const speed = Math.max(Math.abs(velocity), 0.6)
  return Math.round(Math.min(360, Math.max(140, (d / speed) * 1.8)))
}

/** How long (ms) a thrown sheet keeps going before it comes to rest. */
const COAST_MS = 120
/** A sheet let go this close (px) to its tallest goes all the way. */
const SNAP_PX = 36

/**
 * The height a sheet comes to rest at when its handle is let go at `height`
 * with the finger moving at `velocity` px/ms (down is positive): a little
 * further the way it was going, between `min` and `max`, and all the way up
 * when that leaves it just short.
 */
export function coastHeight(height: number, velocity: number, min: number, max: number): number {
  const floor = Math.min(min, max)
  const wanted = Math.min(max, Math.max(floor, height - velocity * COAST_MS))
  return max - wanted <= SNAP_PX ? max : Math.round(wanted)
}
