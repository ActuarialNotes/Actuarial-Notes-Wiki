// The reading maths behind the exam-PDF panel: how big to draw a page, and
// what the zoom control does. Pure, so the awkward parts — a page wider than
// the panel, a zoom that would render a 40-megapixel canvas, a page number that
// walked off the end of the document — are settled here rather than inside a
// render effect.

/** Padding kept either side of the page, so it doesn't butt against the panel. */
const PAGE_MARGIN_PX = 16

/** Zoom is a multiple of fit-to-width, so 1 always means "the page fits". */
export const ZOOM_STEPS = [0.5, 0.75, 1, 1.5, 2, 3, 4] as const
export const DEFAULT_ZOOM = 1

/**
 * A canvas is a bitmap, so a big page at a high zoom on a retina screen can ask
 * for hundreds of megabytes. Total pixels are capped instead of trusting
 * devicePixelRatio: past this, sharper is indistinguishable and the tab dies.
 */
const MAX_CANVAS_PIXELS = 8_000_000

/**
 * The pdf.js scale that fits a page's width to the panel.
 *
 * Returns 0 when the container hasn't been measured yet — the caller should
 * wait rather than render a page at a guessed size and reflow it a frame later.
 */
export function fitWidthScale(containerWidth: number, pageWidthAtScale1: number): number {
  if (!(containerWidth > 0) || !(pageWidthAtScale1 > 0)) return 0
  const usable = Math.max(containerWidth - PAGE_MARGIN_PX * 2, 120)
  return usable / pageWidthAtScale1
}

/**
 * How many device pixels to draw per CSS pixel: the screen's ratio, reduced
 * when that would exceed the pixel budget for this page.
 */
export function canvasPixelRatio(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio: number,
  maxPixels: number = MAX_CANVAS_PIXELS,
): number {
  const ratio = Math.max(1, devicePixelRatio || 1)
  const area = Math.max(cssWidth * cssHeight, 1)
  const capped = Math.sqrt(maxPixels / area)
  return Math.max(0.5, Math.min(ratio, capped))
}

/** The next zoom stop in a direction, stopping at either end of the ladder. */
export function stepZoom(current: number, direction: -1 | 1): number {
  const steps = ZOOM_STEPS
  if (direction === 1) return steps.find(step => step > current + 1e-6) ?? steps[steps.length - 1]
  return [...steps].reverse().find(step => step < current - 1e-6) ?? steps[0]
}

export function canZoom(current: number, direction: -1 | 1): boolean {
  return stepZoom(current, direction) !== current
}

/** "Fit" reads better than "100%" for the stop where the page fits the panel. */
export function formatZoom(zoom: number): string {
  return Math.abs(zoom - 1) < 1e-6 ? 'Fit' : `${Math.round(zoom * 100)}%`
}

/** Keeps a page number inside a document that may have shrunk under it. */
export function clampPage(page: number, pageCount: number): number {
  if (!Number.isFinite(page) || pageCount < 1) return 1
  return Math.min(Math.max(Math.round(page), 1), pageCount)
}
