import { describe, it, expect } from 'vitest'
import {
  MENU_GAP_PX,
  MENU_MIN_HEIGHT_PX,
  MENU_VIEWPORT_MARGIN_PX,
  placeMenu,
  type MenuAnchorRect,
} from './menuPlacement'

const PHONE = { width: 393, height: 852 }
const DESKTOP = { width: 1440, height: 900 }
const MENU = { width: 224, maxHeight: 448 }

function rect(partial: Partial<MenuAnchorRect>): MenuAnchorRect {
  return { left: 0, right: 0, top: 0, bottom: 0, ...partial }
}

describe('placeMenu — horizontally', () => {
  it('hangs from the trigger\'s left edge when there is room', () => {
    const p = placeMenu(rect({ left: 40, right: 200, top: 80, bottom: 110 }), DESKTOP, MENU)
    expect(p.left).toBe(40)
  })

  it('slides left to clear the right edge', () => {
    const p = placeMenu(rect({ left: 1380, right: 1420, top: 80, bottom: 110 }), DESKTOP, MENU)
    expect(p.left).toBe(DESKTOP.width - MENU.width - MENU_VIEWPORT_MARGIN_PX)
    expect(p.left + MENU.width).toBeLessThanOrEqual(DESKTOP.width - MENU_VIEWPORT_MARGIN_PX)
  })

  // The bug this module was written for: a wide trigger near the left edge of a
  // phone has room on neither side, and right-aligning it put the start of
  // every row past x = 0.
  it('never runs off the left edge for a wide trigger on a phone', () => {
    const p = placeMenu(rect({ left: 17, right: 179, top: 60, bottom: 92 }), PHONE, MENU)
    expect(p.left).toBe(17)
    expect(p.left).toBeGreaterThanOrEqual(MENU_VIEWPORT_MARGIN_PX)
    expect(p.left + MENU.width).toBeLessThanOrEqual(PHONE.width - MENU_VIEWPORT_MARGIN_PX)
  })

  it('pulls a trigger that starts past the left margin back inside', () => {
    const p = placeMenu(rect({ left: -30, right: 60, top: 60, bottom: 92 }), PHONE, MENU)
    expect(p.left).toBe(MENU_VIEWPORT_MARGIN_PX)
  })

  it('keeps the left edge on screen when the menu is wider than the viewport', () => {
    const p = placeMenu(rect({ left: 100, right: 160, top: 60, bottom: 92 }), { width: 200, height: 600 }, MENU)
    expect(p.left).toBe(MENU_VIEWPORT_MARGIN_PX)
  })
})

describe('placeMenu — vertically', () => {
  it('hangs below the trigger, gapped', () => {
    const p = placeMenu(rect({ left: 40, right: 200, top: 80, bottom: 110 }), DESKTOP, MENU)
    expect(p.above).toBe(false)
    expect(p.top).toBe(110 + MENU_GAP_PX)
    expect(p.bottom).toBeNull()
  })

  it('cuts its height to the room below rather than spilling past the fold', () => {
    const p = placeMenu(rect({ left: 40, right: 200, top: 500, bottom: 530 }), DESKTOP, MENU)
    expect(p.above).toBe(false)
    expect(p.maxHeight).toBe(DESKTOP.height - 530 - MENU_GAP_PX - MENU_VIEWPORT_MARGIN_PX)
    expect((p.top ?? 0) + p.maxHeight).toBeLessThanOrEqual(DESKTOP.height - MENU_VIEWPORT_MARGIN_PX)
  })

  it('opens above a trigger with almost no room below it', () => {
    const p = placeMenu(rect({ left: 40, right: 200, top: 800, bottom: 830 }), DESKTOP, MENU)
    expect(p.above).toBe(true)
    expect(p.top).toBeNull()
    expect(p.bottom).toBe(DESKTOP.height - 800 + MENU_GAP_PX)
    // Room above is ample here, so it keeps its natural height.
    expect(p.maxHeight).toBe(MENU.maxHeight)
  })

  it('stays below while the room there is still usable', () => {
    const bottom = DESKTOP.height - MENU_MIN_HEIGHT_PX - MENU_GAP_PX - MENU_VIEWPORT_MARGIN_PX
    const p = placeMenu(rect({ left: 40, right: 200, top: bottom - 30, bottom }), DESKTOP, MENU)
    expect(p.above).toBe(false)
    expect(p.maxHeight).toBe(MENU_MIN_HEIGHT_PX)
  })

  it('stays below when there is no more room above either', () => {
    // A trigger filling a short viewport: flipping would show even less.
    const p = placeMenu(rect({ left: 40, right: 200, top: 20, bottom: 260 }), { width: 393, height: 300 }, MENU)
    expect(p.above).toBe(false)
    expect(p.maxHeight).toBeGreaterThan(0)
  })

  it('never reports a height of zero or less', () => {
    const p = placeMenu(rect({ left: 40, right: 200, top: 0, bottom: 300 }), { width: 393, height: 300 }, MENU)
    expect(p.maxHeight).toBeGreaterThan(0)
  })
})
