import { describe, it, expect } from 'vitest'
import {
  canvasPixelRatio,
  canZoom,
  clampPage,
  DEFAULT_ZOOM,
  fitWidthScale,
  formatZoom,
  stepZoom,
  ZOOM_STEPS,
} from './pdfViewer'

// A4 in PDF points, which is what an exam paper is.
const A4_WIDTH = 595

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

describe('canvasPixelRatio', () => {
  it('draws at the screen’s ratio when the page is a normal size', () => {
    expect(canvasPixelRatio(600, 800, 2)).toBe(2)
    expect(canvasPixelRatio(600, 800, 1)).toBe(1)
  })

  it('backs off before asking for a canvas the browser would refuse', () => {
    // A4 at 4× zoom on a 3× screen is ~50 megapixels unchecked.
    const ratio = canvasPixelRatio(2380, 3368, 3)
    expect(ratio).toBeLessThan(3)
    expect(2380 * ratio * 3368 * ratio).toBeLessThanOrEqual(8_000_000 + 1)
  })

  it('never drops below half a device pixel, however large the page', () => {
    expect(canvasPixelRatio(20000, 20000, 3)).toBe(0.5)
  })
})

describe('zoom', () => {
  it('starts at fit-to-width, which reads as "Fit" rather than 100%', () => {
    expect(DEFAULT_ZOOM).toBe(1)
    expect(formatZoom(DEFAULT_ZOOM)).toBe('Fit')
    expect(formatZoom(1.5)).toBe('150%')
  })

  it('steps through the ladder and stops at both ends', () => {
    expect(stepZoom(1, 1)).toBe(1.5)
    expect(stepZoom(1, -1)).toBe(0.75)
    expect(stepZoom(ZOOM_STEPS[ZOOM_STEPS.length - 1], 1)).toBe(4)
    expect(stepZoom(ZOOM_STEPS[0], -1)).toBe(0.5)
  })

  it('knows when a control has nowhere left to go', () => {
    expect(canZoom(1, 1)).toBe(true)
    expect(canZoom(4, 1)).toBe(false)
    expect(canZoom(0.5, -1)).toBe(false)
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
