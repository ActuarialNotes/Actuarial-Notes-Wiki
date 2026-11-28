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
