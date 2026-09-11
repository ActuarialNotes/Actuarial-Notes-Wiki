import { describe, it, expect } from 'vitest'
import { navProgressPercent } from '@/components/NavProgressBar'
import {
  MAX_NAV_SEGMENTS,
  navSegments,
  scrubKeyTarget,
  scrubPageStep,
  scrubPosition,
  scrubPositionAt,
  scrubRatio,
  segmentAt,
  segmentFillPercent,
  segmentKeyTarget,
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

describe('navSegments', () => {
  it('runs each mark to the item before the next one', () => {
    expect(navSegments([{ start: 1, label: 'Q1' }, { start: 5, label: 'Q2' }], 8)).toEqual([
      { start: 1, end: 4, label: 'Q1' },
      { start: 5, end: 8, label: 'Q2' },
    ])
  })

  it('makes the run before the first mark an unnamed stretch of its own', () => {
    // A cover page and a contents page are not part of question 1.
    expect(navSegments([{ start: 3, label: 'Q1' }], 6)).toEqual([
      { start: 1, end: 2, label: undefined },
      { start: 3, end: 6, label: 'Q1' },
    ])
  })

  it('sorts and clamps whatever order the source had', () => {
    expect(navSegments([{ start: 9, label: 'C' }, { start: 1, label: 'A' }, { start: 4, label: 'B' }], 10))
      .toEqual([
        { start: 1, end: 3, label: 'A' },
        { start: 4, end: 8, label: 'B' },
        { start: 9, end: 10, label: 'C' },
      ])
    expect(navSegments([{ start: 1, label: 'A' }, { start: 99, label: 'B' }], 5)).toEqual([
      { start: 1, end: 4, label: 'A' },
      { start: 5, end: 5, label: 'B' },
    ])
  })

  it('keeps the first of two marks on one item', () => {
    expect(navSegments([{ start: 2, label: 'first' }, { start: 2, label: 'second' }], 4)).toEqual([
      { start: 1, end: 1, label: undefined },
      { start: 2, end: 4, label: 'first' },
    ])
  })

  it('leaves the bar plain when the marks say nothing', () => {
    // One stretch covering everything is a bar, not a chapter list.
    expect(navSegments([], 10)).toEqual([])
    expect(navSegments([{ start: 1, label: 'All of it' }], 10)).toEqual([])
    expect(navSegments([{ start: 1 }], 0)).toEqual([])
    expect(navSegments([{ start: NaN, label: 'nowhere' }], 10)).toEqual([])
  })

  it('leaves the bar plain rather than cutting it into hairlines', () => {
    const marks = Array.from({ length: MAX_NAV_SEGMENTS + 5 }, (_, i) => ({ start: i + 1, label: `${i}` }))
    expect(navSegments(marks, 400)).toEqual([])
    // One fewer is still a bar worth segmenting.
    expect(navSegments(marks.slice(0, MAX_NAV_SEGMENTS), 400)).toHaveLength(MAX_NAV_SEGMENTS)
  })
})

describe('segmentAt', () => {
  const segments = navSegments([{ start: 1, label: 'A' }, { start: 5, label: 'B' }], 9)

  it('finds the stretch a position falls in', () => {
    expect(segmentAt(segments, 1)?.label).toBe('A')
    expect(segmentAt(segments, 4)?.label).toBe('A')
    expect(segmentAt(segments, 5)?.label).toBe('B')
    expect(segmentAt(segments, 9)?.label).toBe('B')
  })

  it('is null off the ends and with no segments at all', () => {
    expect(segmentAt(segments, 0)).toBeNull()
    expect(segmentAt(segments, 99)).toBeNull()
    expect(segmentAt([], 3)).toBeNull()
    expect(segmentAt(segments, NaN)).toBeNull()
  })
})

describe('segmentFillPercent', () => {
  const segment = { start: 5, end: 8, label: 'B' }

  it('fills a stretch by how far into it the position is', () => {
    expect(segmentFillPercent(segment, 5)).toBe(25)
    expect(segmentFillPercent(segment, 6)).toBe(50)
    expect(segmentFillPercent(segment, 8)).toBe(100)
  })

  it('is empty before the stretch and full after it', () => {
    expect(segmentFillPercent(segment, 4)).toBe(0)
    expect(segmentFillPercent(segment, 1)).toBe(0)
    expect(segmentFillPercent(segment, 9)).toBe(100)
  })

  it('agrees with the plain bar about where an item leaves the fill', () => {
    // The last item of a stretch fills it, exactly as it fills `i / total` of
    // an unsegmented bar — the two readings can't disagree.
    const total = 12
    const segments = navSegments([{ start: 1, label: 'A' }, { start: 7, label: 'B' }], total)
    expect(segmentFillPercent(segments[0], 6)).toBe(100)
    expect(navProgressPercent(6, total)).toBe(50)
    expect(segments[0].end / total).toBe(0.5)
  })
})

describe('segmentKeyTarget', () => {
  const chapters = navSegments(
    [{ start: 1, label: 'A' }, { start: 100, label: 'B' }, { start: 400, label: 'C' }],
    1000,
  )

  it('steps forward a chapter at a time', () => {
    expect(segmentKeyTarget('ArrowRight', 1, chapters, 1000)).toBe(100)
    expect(segmentKeyTarget('ArrowRight', 150, chapters, 1000)).toBe(400)
    expect(segmentKeyTarget('ArrowUp', 150, chapters, 1000)).toBe(400)
    expect(segmentKeyTarget('PageUp', 1, chapters, 1000)).toBe(100)
  })

  it('goes to the end from the last chapter', () => {
    expect(segmentKeyTarget('ArrowRight', 500, chapters, 1000)).toBe(1000)
  })

  it('goes back to the top of this chapter before the one before it', () => {
    // A transport control, not a slider: a press can't skip what you're reading.
    expect(segmentKeyTarget('ArrowLeft', 250, chapters, 1000)).toBe(100)
    expect(segmentKeyTarget('ArrowLeft', 100, chapters, 1000)).toBe(1)
    expect(segmentKeyTarget('PageDown', 450, chapters, 1000)).toBe(400)
  })

  it('stops at the ends rather than erroring', () => {
    expect(segmentKeyTarget('ArrowLeft', 1, chapters, 1000)).toBe(1)
    expect(segmentKeyTarget('Home', 700, chapters, 1000)).toBe(1)
    expect(segmentKeyTarget('End', 5, chapters, 1000)).toBe(1000)
  })

  it('leaves keys that are not ours alone', () => {
    expect(segmentKeyTarget('Enter', 5, chapters, 1000)).toBeNull()
    expect(segmentKeyTarget('ArrowRight', 5, [], 1000)).toBeNull()
  })
})
