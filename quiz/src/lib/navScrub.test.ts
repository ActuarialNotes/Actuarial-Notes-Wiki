import { describe, it, expect } from 'vitest'
import { navProgressPercent } from '@/components/NavProgressBar'
import {
  scrubKeyTarget,
  scrubPageStep,
  scrubPosition,
  scrubPositionAt,
  scrubRatio,
} from './navScrub'

describe('scrubRatio', () => {
  it('measures the pointer along the track', () => {
    expect(scrubRatio(100, 100, 200)).toBe(0)
    expect(scrubRatio(200, 100, 200)).toBe(0.5)
    expect(scrubRatio(300, 100, 200)).toBe(1)
  })

  it('clamps a drag that continues past either end', () => {
    // Pointer capture keeps sending moves after the finger leaves the bar.
    expect(scrubRatio(-500, 100, 200)).toBe(0)
    expect(scrubRatio(9999, 100, 200)).toBe(1)
  })

  it('returns 0 for a track that has no width yet', () => {
    expect(scrubRatio(150, 100, 0)).toBe(0)
    expect(scrubRatio(150, 100, -20)).toBe(0)
    expect(scrubRatio(NaN, 100, 200)).toBe(0)
  })
})

describe('scrubPosition', () => {
  it('splits the track evenly between the items', () => {
    expect(scrubPosition(0.1, 4)).toBe(1)
    expect(scrubPosition(0.3, 4)).toBe(2)
    expect(scrubPosition(0.6, 4)).toBe(3)
    expect(scrubPosition(0.9, 4)).toBe(4)
  })

  it('pins to the first item at the very start and the last at the very end', () => {
    expect(scrubPosition(0, 423)).toBe(1)
    expect(scrubPosition(1, 423)).toBe(423)
  })

  it('clamps a ratio from outside the track', () => {
    expect(scrubPosition(-2, 10)).toBe(1)
    expect(scrubPosition(4, 10)).toBe(10)
  })

  it('falls back to the first item for an empty or invalid sequence', () => {
    expect(scrubPosition(0.5, 0)).toBe(1)
    expect(scrubPosition(0.5, -3)).toBe(1)
    expect(scrubPosition(NaN, 10)).toBe(1)
    expect(scrubPosition(0.5, NaN)).toBe(1)
  })

  it('is the inverse of the fill: the item it picks reaches the finger', () => {
    // The contract that keeps a drag from reading as off-by-one — whatever the
    // scrub lands on must fill *past* the point that was grabbed.
    const total = 37
    for (let step = 0; step <= 100; step++) {
      const ratio = step / 100
      const fill = navProgressPercent(scrubPosition(ratio, total), total)
      expect(fill).toBeGreaterThanOrEqual(ratio * 100 - 1e-9)
      // ...and not by more than the one item's worth of track it owns.
      expect(fill - ratio * 100).toBeLessThanOrEqual(100 / total + 1e-9)
    }
  })
})

describe('scrubPositionAt', () => {
  it('turns a pointer position straight into an item', () => {
    // A 423-page report on a 400px-wide track, grabbed halfway.
    expect(scrubPositionAt(300, 100, 400, 423)).toBe(212)
    expect(scrubPositionAt(100, 100, 400, 423)).toBe(1)
    expect(scrubPositionAt(500, 100, 400, 423)).toBe(423)
  })
})

describe('scrubPageStep', () => {
  it('jumps a tenth of the way', () => {
    expect(scrubPageStep(423)).toBe(42)
    expect(scrubPageStep(100)).toBe(10)
  })

  it('never stalls on a short sequence', () => {
    expect(scrubPageStep(4)).toBe(1)
    expect(scrubPageStep(1)).toBe(1)
    expect(scrubPageStep(0)).toBe(1)
    expect(scrubPageStep(NaN)).toBe(1)
  })
})

describe('scrubKeyTarget', () => {
  it('steps one item on either axis', () => {
    expect(scrubKeyTarget('ArrowLeft', 5, 10)).toBe(4)
    expect(scrubKeyTarget('ArrowDown', 5, 10)).toBe(4)
    expect(scrubKeyTarget('ArrowRight', 5, 10)).toBe(6)
    expect(scrubKeyTarget('ArrowUp', 5, 10)).toBe(6)
  })

  it('jumps a page at a time', () => {
    expect(scrubKeyTarget('PageUp', 100, 423)).toBe(142)
    expect(scrubKeyTarget('PageDown', 100, 423)).toBe(58)
  })

  it('goes to the ends', () => {
    expect(scrubKeyTarget('Home', 200, 423)).toBe(1)
    expect(scrubKeyTarget('End', 200, 423)).toBe(423)
  })

  it('stops at the ends rather than wrapping', () => {
    expect(scrubKeyTarget('ArrowLeft', 1, 10)).toBe(1)
    expect(scrubKeyTarget('ArrowRight', 10, 10)).toBe(10)
    expect(scrubKeyTarget('PageDown', 3, 423)).toBe(1)
    expect(scrubKeyTarget('PageUp', 420, 423)).toBe(423)
  })

  it('leaves keys it does not own alone', () => {
    expect(scrubKeyTarget('Enter', 5, 10)).toBeNull()
    expect(scrubKeyTarget('Escape', 5, 10)).toBeNull()
    expect(scrubKeyTarget(' ', 5, 10)).toBeNull()
    expect(scrubKeyTarget('a', 5, 10)).toBeNull()
  })

  it('has nowhere to go in an empty sequence', () => {
    expect(scrubKeyTarget('ArrowRight', 1, 0)).toBeNull()
    expect(scrubKeyTarget('Home', 1, NaN)).toBeNull()
  })

  it('recovers from a position that has walked out of range', () => {
    expect(scrubKeyTarget('ArrowRight', 99, 10)).toBe(10)
    expect(scrubKeyTarget('ArrowLeft', -4, 10)).toBe(1)
  })
})
