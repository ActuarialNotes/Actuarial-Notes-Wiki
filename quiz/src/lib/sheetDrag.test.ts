import { describe, expect, it } from 'vitest'
import {
  backdropOpacity, closesOnRelease, coastHeight, dragOffset, flickCloses, releaseVelocity, rubberBand, RUBBER_ROOM,
  settleMs, sheetPlacement, startsDrag, startsResize,
} from './sheetDrag'

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
    expect(sheetPlacement(300, -400, 300, 700)).toEqual({ height: 700, offset: 0 })
  })
  it('gives a little past its tallest, and never more than the rubber room', () => {
    const over = sheetPlacement(300, -900, 300, 700)
    expect(over.offset).toBe(0)
    expect(over.height).toBeGreaterThan(700)
    expect(over.height).toBeLessThan(700 + RUBBER_ROOM)
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

describe('rubberBand', () => {
  it('is nothing at or inside the limit', () => {
    expect(rubberBand(0)).toBe(0)
    expect(rubberBand(-20)).toBe(0)
  })
  it('follows less and less, and never reaches the room', () => {
    const a = rubberBand(20)
    const b = rubberBand(40)
    expect(a).toBeGreaterThan(0)
    expect(b - a).toBeLessThan(a)
    expect(rubberBand(100000)).toBeLessThan(RUBBER_ROOM)
  })
})

describe('releaseVelocity', () => {
  it('is the speed over the last 100ms', () => {
    const samples = [{ t: 0, y: 0 }, { t: 400, y: 10 }, { t: 450, y: 60 }, { t: 500, y: 110 }]
    expect(releaseVelocity(samples, 500)).toBeCloseTo(1)
  })
  it('is zero for a finger that had stopped, or with nothing to go on', () => {
    expect(releaseVelocity([{ t: 0, y: 0 }, { t: 100, y: 80 }], 600)).toBe(0)
    expect(releaseVelocity([], 0)).toBe(0)
  })
})

describe('settleMs', () => {
  it('is shorter after a flick than after a slow pull', () => {
    expect(settleMs(300, 2)).toBeLessThan(settleMs(300, 0))
  })
  it('stays between 140 and 360ms', () => {
    expect(settleMs(0, 0)).toBe(140)
    expect(settleMs(5, 3)).toBe(140)
    expect(settleMs(5000, 0)).toBe(360)
  })
})

describe('coastHeight', () => {
  it('stays where it was let go when the finger had stopped', () => {
    expect(coastHeight(400, 0, 200, 800)).toBe(400)
  })
  it('carries on the way it was thrown', () => {
    expect(coastHeight(400, -1, 200, 800)).toBe(520)
    expect(coastHeight(400, 1, 200, 800)).toBe(280)
  })
  it('stops at its smallest and its tallest', () => {
    expect(coastHeight(250, 3, 200, 800)).toBe(200)
    expect(coastHeight(700, -3, 200, 800)).toBe(800)
  })
  it('goes all the way up when it would rest just short', () => {
    expect(coastHeight(780, 0, 200, 800)).toBe(800)
  })
})
