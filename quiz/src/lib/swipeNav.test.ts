import { describe, expect, it } from 'vitest'
import { inEdgeGutter, neighbourPlace, swipeDirection } from './swipeNav'

describe('swipeDirection', () => {
  it('reads a long, quick, level swipe', () => {
    expect(swipeDirection(-120, 10, 200)).toBe('forward')
    expect(swipeDirection(120, -10, 200)).toBe('back')
  })
  it('is not a swipe when short, steep or slow', () => {
    expect(swipeDirection(-60, 0, 200)).toBeNull()
    expect(swipeDirection(-120, 70, 200)).toBeNull()
    expect(swipeDirection(-120, 0, 900)).toBeNull()
    expect(swipeDirection(-120, 0, 0)).toBeNull()
  })
})

describe('inEdgeGutter', () => {
  it('leaves the screen edges to the browser', () => {
    expect(inEdgeGutter(10, 390)).toBe(true)
    expect(inEdgeGutter(380, 390)).toBe(true)
    expect(inEdgeGutter(200, 390)).toBe(false)
  })
})

describe('neighbourPlace', () => {
  it('walks the places in the navigation’s order', () => {
    expect(neighbourPlace('today', 'forward')).toBe('learn')
    expect(neighbourPlace('practice', 'back')).toBe('learn')
    expect(neighbourPlace('practice', 'forward')).toBe('apply')
  })
  it('stops at either end and outside the places', () => {
    expect(neighbourPlace('today', 'back')).toBeNull()
    expect(neighbourPlace('apply', 'forward')).toBeNull()
    expect(neighbourPlace(null, 'forward')).toBeNull()
  })
})
