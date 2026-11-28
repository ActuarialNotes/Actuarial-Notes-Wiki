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
  if (wanted >= floor) return { height: Math.min(wanted, max), offset: 0 }
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
