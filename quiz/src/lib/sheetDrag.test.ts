import { describe, expect, it } from 'vitest'
import { backdropOpacity, closesOnRelease, dragOffset, startsDrag } from './sheetDrag'

describe('startsDrag', () => {
  it('needs a move down past the slop', () => {
    expect(startsDrag(0, 4, true, false)).toBe(false)
    expect(startsDrag(0, 20, true, false)).toBe(true)
    expect(startsDrag(0, -20, true, true)).toBe(false)
  })
  it('leaves a sideways move alone', () => {
    expect(startsDrag(30, 20, true, true)).toBe(false)
  })
  it('scrolls the content unless it is at its top or the touch is on the handle', () => {
    expect(startsDrag(0, 20, false, false)).toBe(false)
    expect(startsDrag(0, 20, false, true)).toBe(true)
  })
})

describe('dragOffset', () => {
  it('never lifts the sheet above its place', () => {
    expect(dragOffset(-30)).toBe(0)
    expect(dragOffset(42)).toBe(42)
  })
})

describe('closesOnRelease', () => {
  it('closes past a quarter of the height, within 80 and 200px', () => {
    expect(closesOnRelease(100, 400, 0)).toBe(true)
    expect(closesOnRelease(99, 400, 0)).toBe(false)
    expect(closesOnRelease(79, 200, 0)).toBe(false)
    expect(closesOnRelease(80, 200, 0)).toBe(true)
    expect(closesOnRelease(200, 1600, 0)).toBe(true)
  })
  it('closes on a flick', () => {
    expect(closesOnRelease(30, 800, 0.8)).toBe(true)
    expect(closesOnRelease(10, 800, 0.8)).toBe(false)
  })
  it('does not close a sheet back in place', () => {
    expect(closesOnRelease(0, 400, 2)).toBe(false)
  })
})

describe('backdropOpacity', () => {
  it('fades with the pull', () => {
    expect(backdropOpacity(0, 400)).toBe(1)
    expect(backdropOpacity(200, 400)).toBe(0.5)
    expect(backdropOpacity(800, 400)).toBe(0)
  })
})
