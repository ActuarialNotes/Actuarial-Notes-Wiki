import { describe, expect, it } from 'vitest'
import { DRAG_SLOP, MAX_VELOCITY, dragAxis, momentumStep, onAxis, releaseVelocity } from './touchScroll'

describe('dragAxis', () => {
  it('is no drag inside the slop', () => {
    expect(dragAxis(DRAG_SLOP - 2, 2)).toBeNull()
  })
  it('keeps a mostly vertical drag vertical', () => {
    expect(dragAxis(3, 20)).toBe('y')
  })
  it('keeps a mostly horizontal drag horizontal', () => {
    expect(dragAxis(-20, 4)).toBe('x')
  })
  it('moves both ways on a diagonal', () => {
    expect(dragAxis(15, 15)).toBe('both')
  })
})

describe('onAxis', () => {
  it('drops the other axis', () => {
    expect(onAxis('y', 5, 9)).toEqual({ dx: 0, dy: 9 })
    expect(onAxis('x', 5, 9)).toEqual({ dx: 5, dy: 0 })
    expect(onAxis('both', 5, 9)).toEqual({ dx: 5, dy: 9 })
  })
})

describe('releaseVelocity', () => {
  it('reads the last stretch of the drag', () => {
    const samples = [
      { t: 0, x: 0, y: 0 },
      { t: 500, x: 0, y: 10 },
      { t: 550, x: 0, y: 60 },
      { t: 600, x: 0, y: 110 },
    ]
    expect(releaseVelocity(samples, 600)).toEqual({ vx: 0, vy: 1 })
  })
  it('is still for a finger that stopped before lifting', () => {
    expect(releaseVelocity([{ t: 0, x: 0, y: 0 }, { t: 10, x: 0, y: 50 }], 400)).toEqual({ vx: 0, vy: 0 })
  })
  it('caps a wild flick', () => {
    const v = releaseVelocity([{ t: 0, x: 0, y: 0 }, { t: 1, x: 0, y: 1000 }], 1)
    expect(v.vy).toBe(MAX_VELOCITY)
  })
})

describe('momentumStep', () => {
  it('moves along the velocity and slows', () => {
    const step = momentumStep(0, 2, 16)!
    expect(step.dy).toBeGreaterThan(0)
    expect(step.dy).toBeLessThan(2 * 16)
    expect(step.vy).toBeLessThan(2)
    expect(step.dx).toBe(0)
  })
  it('stops once too slow to see', () => {
    expect(momentumStep(0, 0.01, 16)).toBeNull()
  })
  it('comes to rest', () => {
    let v = { vx: 0, vy: 3 }
    let frames = 0
    for (let s = momentumStep(v.vx, v.vy, 16); s; s = momentumStep(v.vx, v.vy, 16)) {
      v = s
      frames++
    }
    expect(frames).toBeGreaterThan(10)
    expect(frames).toBeLessThan(200)
  })
})
