// Where a menu hangs off the control that opened it.
//
// The rule this module exists to keep: a menu is never off screen. Aligning it
// with its trigger is only a *preference* — the viewport gets the last word, so
// a trigger near an edge shifts the menu back inside rather than pushing half of
// it past the edge, and a trigger with little room below opens the menu above
// itself instead of running off the bottom.
//
// The trap it closes is the one that only shows up on a phone: picking a side by
// asking "is there room on the right?" and, when there isn't, right-aligning
// without asking the same of the left. A wide trigger sitting near the left edge
// — the concept popup's title, which is the trigger for its whole action menu —
// fails both tests at once, and the menu lands with its first few characters
// past x = 0, unreachable and unreadable.
//
// Pure: it takes measurements and returns numbers, so both the portalled
// (`fixed`) and the anchored (`absolute`) form of the menu can be placed from
// the same arithmetic.

/** The part of a `DOMRect` a placement needs. */
export interface MenuAnchorRect {
  left: number
  right: number
  top: number
  bottom: number
}

export interface MenuViewport {
  width: number
  height: number
}

export interface MenuPlacementOptions {
  /** The menu's width. Fixed by its class, so the caller knows it up front. */
  width: number
  /** How tall the menu is allowed to get when there is room for it. */
  maxHeight: number
  /** The breathing space between the trigger and the menu. */
  gap?: number
  /** How close to an edge of the viewport the menu may sit. */
  margin?: number
}

export interface MenuPlacement {
  /** Viewport x of the menu's left edge. */
  left: number
  /** Viewport y of its top edge — `null` when it is placed from its bottom. */
  top: number | null
  /** Distance from the viewport's bottom edge, when placed above the trigger. */
  bottom: number | null
  /** What it may grow to here, which is what makes it scroll instead of spill. */
  maxHeight: number
  /** Whether it opened above the trigger rather than below it. */
  above: boolean
}

export const MENU_GAP_PX = 4
export const MENU_VIEWPORT_MARGIN_PX = 8

/**
 * The smallest menu worth opening downwards. Below this, a couple of rows over
 * a scrollbar, flipping above the trigger shows more of the menu than staying
 * put — above that, the space below is enough and the menu stays where the eye
 * expects it, under the control it belongs to.
 */
export const MENU_MIN_HEIGHT_PX = 160

/**
 * Place a menu against the control that opened it.
 *
 * Horizontally it prefers the trigger's left edge (menus read left to right, so
 * that is where the rows start); it slides left only far enough to clear the
 * viewport's right margin, and never past the left margin — a menu too wide for
 * the viewport keeps its *left* edge on screen, since a row cut off at the end
 * still says what it does.
 *
 * Vertically it hangs below the trigger unless that leaves less than
 * `MENU_MIN_HEIGHT_PX` and there is more room above, in which case it opens
 * upwards. Either way `maxHeight` is cut to the room it actually has, so a long
 * menu scrolls inside the viewport instead of continuing past the fold.
 */
export function placeMenu(
  anchor: MenuAnchorRect,
  viewport: MenuViewport,
  options: MenuPlacementOptions,
): MenuPlacement {
  const gap = options.gap ?? MENU_GAP_PX
  const margin = options.margin ?? MENU_VIEWPORT_MARGIN_PX
  const width = Math.max(0, options.width)

  const minLeft = margin
  const maxLeft = viewport.width - width - margin
  const left = maxLeft < minLeft
    // Wider than the viewport allows: pin the left edge, cut off the tail.
    ? minLeft
    : Math.min(maxLeft, Math.max(minLeft, anchor.left))

  const roomBelow = viewport.height - anchor.bottom - gap - margin
  const roomAbove = anchor.top - gap - margin
  const above = roomBelow < MENU_MIN_HEIGHT_PX && roomAbove > roomBelow

  const room = above ? roomAbove : roomBelow
  // Never returns 0: a menu with nowhere to go is still better opened as a
  // scrollable sliver than as nothing at all.
  const maxHeight = Math.max(1, Math.min(options.maxHeight, room))

  return above
    ? { left, top: null, bottom: Math.max(margin, viewport.height - anchor.top + gap), maxHeight, above }
    : { left, top: Math.min(viewport.height - margin, anchor.bottom + gap), bottom: null, maxHeight, above }
}
