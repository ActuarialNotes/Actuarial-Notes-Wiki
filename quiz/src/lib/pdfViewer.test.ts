import { describe, it, expect } from 'vitest'
import {
  anchoredScroll,
  canvasPixelRatio,
  clampPage,
  clampScroll,
  clampZoom,
  fitHeightScale,
  fitWidthScale,
  formatZoom,
  MAX_ZOOM,
  MIN_ZOOM,
  nudgeZoom,
  pageFitZoom,
  pinchZoom,
  WIDTH_ZOOM,
} from './pdfViewer'

// A4 in PDF points, which is what an exam paper is.
const A4_WIDTH = 595
const A4_HEIGHT = 842

describe('fitWidthScale', () => {
  it('fits the page across the panel, minus its margin', () => {
    // 390px phone: the page is drawn a little narrower than the panel.
    const scale = fitWidthScale(390, A4_WIDTH)
    expect(A4_WIDTH * scale).toBeCloseTo(358, 0)
  })

  it('waits rather than guessing before the panel has been measured', () => {
    expect(fitWidthScale(0, A4_WIDTH)).toBe(0)
    expect(fitWidthScale(390, 0)).toBe(0)
  })

  it('keeps a usable width in a panel dragged down to nothing', () => {
    expect(fitWidthScale(20, A4_WIDTH)).toBeGreaterThan(0)
  })
})

describe('pageFitZoom', () => {
  it('is the width fit on a phone, where the panel is shaped like a page', () => {
    // 390×620 of page area: fitting the width very nearly fits the page, so the
    // slider starts where it always did and nothing about the phone changes.
    expect(pageFitZoom(390, 620, A4_WIDTH, A4_HEIGHT)).toBeCloseTo(1, 1)
    // A panel taller than the page needs never zooms out past the width fit —
    // there is nothing to gain from a page narrower than the panel.
    expect(pageFitZoom(390, 1200, A4_WIDTH, A4_HEIGHT)).toBe(WIDTH_ZOOM)
  })

  it('drops below the width fit on a desktop panel, which is a wide strip', () => {
    // 1200×500: a page fitted to that width is ~1650px tall, three panels deep.
    const zoom = pageFitZoom(1200, 500, A4_WIDTH, A4_HEIGHT)
    expect(zoom).toBeLessThan(1)
    // And at that zoom the whole page is on screen: its drawn height is the
    // panel's, less the margin it sits in.
    const drawn = A4_HEIGHT * fitWidthScale(1200, A4_WIDTH) * zoom
    expect(drawn).toBeCloseTo(500 - 32, 0)
    expect(drawn).toBeCloseTo(A4_HEIGHT * fitHeightScale(500, A4_HEIGHT), 6)
  })

  it('stops shrinking the page in a panel dragged down to a sliver', () => {
    expect(pageFitZoom(1200, 40, A4_WIDTH, A4_HEIGHT)).toBe(MIN_ZOOM)
  })

  it('waits for a measurement rather than fitting to a guess', () => {
    expect(pageFitZoom(0, 500, A4_WIDTH, A4_HEIGHT)).toBe(WIDTH_ZOOM)
    expect(pageFitZoom(1200, 0, A4_WIDTH, A4_HEIGHT)).toBe(WIDTH_ZOOM)
    expect(pageFitZoom(1200, 500, 0, 0)).toBe(WIDTH_ZOOM)
  })
})

describe('canvasPixelRatio', () => {
  // A page fitted to a phone, which is where the resolution floor does its work:
  // 358 CSS px across an A4 page is a scale of 0.6, and at the screen's own
  // ratio that draws the page at ~125 dpi.
  const PHONE_FIT = { width: 358, height: 506, scale: 358 / A4_WIDTH }

  it('draws a fitted page at a real resolution, not the screen’s ratio', () => {
    // ~125 dpi is fine for vector text and loses a scanned page, so the ratio
    // is raised until the page is drawn at 3 device pixels per PDF point.
    const ratio = canvasPixelRatio(PHONE_FIT.width, PHONE_FIT.height, 3, PHONE_FIT.scale)
    expect(ratio).toBeGreaterThan(3)
    expect(PHONE_FIT.scale * ratio).toBeCloseTo(3, 5)
  })

  it('reaches the same resolution on a desktop screen with no ratio to spend', () => {
    // dpr 1, a wide panel: the page is already large in CSS pixels, so a
    // smaller ratio gets there — but it gets there.
    const scale = 868 / A4_WIDTH
    const ratio = canvasPixelRatio(868, 1228, 1, scale)
    expect(scale * ratio).toBeCloseTo(3, 5)
  })

  it('is the screen’s ratio again once zoom alone clears the floor', () => {
    expect(canvasPixelRatio(600, 800, 2, 4)).toBe(2)
    expect(canvasPixelRatio(600, 800, 1, 4)).toBe(1)
  })

  it('backs off before asking for a canvas the browser would refuse', () => {
    // A4 at 4× zoom on a 3× screen is ~50 megapixels unchecked.
    const ratio = canvasPixelRatio(2380, 3368, 3, 4)
    expect(ratio).toBeLessThan(3)
    expect(2380 * ratio * 3368 * ratio).toBeLessThanOrEqual(8_000_000 + 1)
  })

  it('holds the budget against the resolution floor, not only the screen', () => {
    // A fitted page in a very tall panel: the floor would ask for more pixels
    // than the budget allows, and the budget wins.
    const ratio = canvasPixelRatio(3000, 4000, 3, 0.2)
    expect(3000 * ratio * 4000 * ratio).toBeLessThanOrEqual(8_000_000 + 1)
  })

  it('never drops below half a device pixel, however large the page', () => {
    expect(canvasPixelRatio(20000, 20000, 3, 10)).toBe(0.5)
  })
})

describe('zoom', () => {
  it('reads the bottom of the range as "Fit", wherever the panel puts it', () => {
    expect(formatZoom(WIDTH_ZOOM)).toBe('Fit')
    expect(formatZoom(1.5)).toBe('1.5×')
    // On a desktop panel the whole-page fit is below 1×, so that is the size
    // called "Fit" and the width fit reads as the number it is.
    expect(formatZoom(0.4, 0.4)).toBe('Fit')
    expect(formatZoom(1, 0.4)).toBe('1.0×')
  })

  it('never goes below the fitted page — there is nothing to read out there', () => {
    expect(clampZoom(0.25)).toBe(WIDTH_ZOOM)
    expect(clampZoom(9)).toBe(MAX_ZOOM)
    expect(clampZoom(2.4)).toBe(2.4)
    expect(clampZoom(Number.NaN)).toBe(WIDTH_ZOOM)
  })

  it('opens the range down to the whole-page fit the panel asks for', () => {
    expect(clampZoom(0.25, 0.4)).toBe(0.4)
    expect(clampZoom(0.6, 0.4)).toBe(0.6)
    expect(clampZoom(Number.NaN, 0.4)).toBe(0.4)
    // A minimum outside the range the panel allows can't widen it either way.
    expect(clampZoom(0.05, 0.01)).toBe(MIN_ZOOM)
    expect(clampZoom(1.4, 2)).toBe(1.4)
  })

  it('moves a visible amount per key press, and stops at both ends', () => {
    expect(nudgeZoom(1, 1)).toBe(1.25)
    expect(nudgeZoom(1, -1)).toBe(WIDTH_ZOOM)
    expect(nudgeZoom(0.5, -1, 0.4)).toBe(0.4)
    expect(nudgeZoom(MAX_ZOOM, 1)).toBe(MAX_ZOOM)
  })

  it('scales a pinch from the size it started at', () => {
    expect(pinchZoom(1, 100, 200)).toBe(2)
    expect(pinchZoom(2, 200, 100)).toBe(1)
    // Spreading the fingers past the top of the range still stops there.
    expect(pinchZoom(2, 100, 400)).toBe(MAX_ZOOM)
    // A gesture with nothing to measure leaves the zoom alone.
    expect(pinchZoom(1.5, 0, 120)).toBe(1.5)
    // Pinching in stops at the fitted page, wherever the panel puts it.
    expect(pinchZoom(1, 200, 40, 0.4)).toBe(0.4)
  })
})

describe('panning a zoomed page', () => {
  it('has nowhere to go while the page fits', () => {
    expect(clampScroll(120, 400, 400)).toBe(0)
    expect(clampScroll(-40, 900, 400)).toBe(0)
  })

  it('stops at the far edge rather than past it', () => {
    expect(clampScroll(999, 900, 400)).toBe(500)
    expect(clampScroll(200, 900, 400)).toBe(200)
  })

  it('holds the middle of the panel still across a zoom', () => {
    // A 400px-wide panel showing a 400px page, zoomed to 2×: what was in the
    // middle of the panel is still in the middle of the panel.
    expect(anchoredScroll(0, 200, 400, 800, 400)).toBe(200)
    // And back out again.
    expect(anchoredScroll(200, 200, 800, 400, 400)).toBe(0)
  })

  it('holds the point a pinch was centred on, not the middle', () => {
    // Pinching near the left edge of the panel keeps that column in place.
    expect(anchoredScroll(0, 50, 400, 800, 400)).toBe(50)
  })

  it('never leaves the reader outside the page', () => {
    // Zooming out at the bottom of a long page: the offset that would keep the
    // anchor still is past the end, so it pins to the end.
    expect(anchoredScroll(1600, 200, 2000, 500, 400)).toBe(100)
    expect(anchoredScroll(120, 200, 0, 800, 400)).toBe(120)
  })
})

describe('clampPage', () => {
  it('keeps the page inside the document', () => {
    expect(clampPage(0, 47)).toBe(1)
    expect(clampPage(48, 47)).toBe(47)
    expect(clampPage(12, 47)).toBe(12)
  })

  it('survives a document that isn’t loaded yet', () => {
    expect(clampPage(3, 0)).toBe(1)
    expect(clampPage(Number.NaN, 10)).toBe(1)
  })
})
