import { describe, expect, it } from 'vitest'
import { backdropOpacity, closesOnRelease, dragOffset, flickCloses, sheetPlacement, startsDrag, startsResize } from './sheetDrag'

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

describe('startsResize', () => {
  it('is a move up on the handle, past the slop', () => {
    expect(startsResize(0, -20, true)).toBe(true)
    expect(startsResize(0, -4, true)).toBe(false)
    expect(startsResize(0, 20, true)).toBe(false)
  })
  it('is the handle\'s alone, and not a sideways move', () => {
    expect(startsResize(0, -20, false)).toBe(false)
    expect(startsResize(30, -20, true)).toBe(false)
  })
})

describe('sheetPlacement', () => {
  it('grows the sheet as the handle goes up, to the room there is', () => {
    expect(sheetPlacement(300, -100, 300, 700)).toEqual({ height: 400, offset: 0 })
    expect(sheetPlacement(300, -900, 300, 700)).toEqual({ height: 700, offset: 0 })
  })
  it('shrinks it as the handle goes down, to its smallest', () => {
    expect(sheetPlacement(500, 100, 300, 700)).toEqual({ height: 400, offset: 0 })
    expect(sheetPlacement(500, 200, 300, 700)).toEqual({ height: 300, offset: 0 })
  })
  it('takes the sheet with the finger past its smallest', () => {
    expect(sheetPlacement(500, 260, 300, 700)).toEqual({ height: 300, offset: 60 })
    expect(sheetPlacement(300, 50, 300, 700)).toEqual({ height: 300, offset: 50 })
  })
  it('never asks for more than the room, even when the smallest is larger', () => {
    expect(sheetPlacement(200, 0, 300, 200)).toEqual({ height: 200, offset: 0 })
  })
})

describe('flickCloses', () => {
  it('needs a hard flick that has travelled', () => {
    expect(flickCloses(1.5, 100)).toBe(true)
    expect(flickCloses(0.6, 100)).toBe(false)
    expect(flickCloses(1.5, 30)).toBe(false)
    expect(flickCloses(-2, -100)).toBe(false)
  })
})
