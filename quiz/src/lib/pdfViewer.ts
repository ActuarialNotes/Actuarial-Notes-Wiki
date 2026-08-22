// The reading maths behind the exam-PDF panel: how big to draw a page, and
// what the zoom control does. Pure, so the awkward parts — a page wider than
// the panel, a zoom that would render a 40-megapixel canvas, a page number that
// walked off the end of the document — are settled here rather than inside a
// render effect.

/** Padding kept either side of the page, so it doesn't butt against the panel. */
const PAGE_MARGIN_PX = 16

/**
 * Zoom is a multiple of fit-to-width, so 1 always means "the page drawn across
 * the panel" and the range runs up from there to 4×. It is continuous rather
 * than a ladder of stops because the control is the same slider the image
 * gallery and math focus mode use — the reader drags to the size the small
 * print on *this* scan needs, which is rarely one of seven preset stops.
 */
export const WIDTH_ZOOM = 1
export const MAX_ZOOM = 4

/**
 * The bottom of the range is not fit-to-width but **fit-to-page**: the zoom at
 * which the whole page is on screen, which is `pageFitZoom` below and is never
 * more than 1.
 *
 * A page is taller than it is wide, so on a phone — where the panel is about
 * the same shape — fitting the width fits the page and the two are the same
 * number. On a desktop the panel is a wide, short strip: a page fitted to its
 * width runs two or three panel-heights down, and the reader opens a document
 * to the top third of page 1 with no way to see the rest of it at once. So the
 * slider starts wherever the whole page fits and 1× — the width fit — sits a
 * little way along it.
 *
 * `MIN_ZOOM` is the floor under that: a panel dragged down to a sliver would
 * otherwise fit the page by shrinking it to nothing.
 */
export const MIN_ZOOM = 0.2

/** The slider's granularity, matching the other two zoom sliders in the app. */
export const ZOOM_SLIDER_STEP = 0.05

/** How far the +/- keys move, which wants to be a visible jump, not a nudge. */
export const KEY_ZOOM_STEP = 0.25

/**
 * A zoom inside the range this panel allows.
 *
 * `minZoom` is the whole-page fit, which depends on the panel's shape and so
 * arrives from the component; it defaults to the width fit for the moment
 * before the page has been measured, when there is no page fit to know.
 */
export function clampZoom(zoom: number, minZoom: number = WIDTH_ZOOM): number {
  const floor = Math.max(MIN_ZOOM, Math.min(WIDTH_ZOOM, minZoom))
  if (!Number.isFinite(zoom)) return floor
  return Math.max(floor, Math.min(MAX_ZOOM, zoom))
}

/**
 * A canvas is a bitmap, so a big page at a high zoom on a retina screen can ask
 * for hundreds of megabytes. Total pixels are capped instead of trusting
 * devicePixelRatio: past this, sharper is indistinguishable and the tab dies.
 */
const MAX_CANVAS_PIXELS = 8_000_000

/**
 * The floor under the render resolution, in device pixels per PDF point — 3
 * px/pt is ~216 dpi.
 *
 * Screen resolution is the wrong target for these documents. A page fitted to
 * a phone is drawn at roughly 0.6 device pixels per point even on a 3× screen,
 * i.e. ~125 dpi — fine for vector text, which is rasterised at whatever size it
 * is asked for, and thin for the **scanned** pages the examining bodies publish,
 * which are 200–300 dpi bitmaps then squeezed down by ~2.5× inside the canvas.
 * A photocopy is made of strokes about a pixel wide, and that is the reduction
 * they are least able to afford.
 *
 * Drawing at least ~216 dpi keeps those strokes wider than a canvas pixel
 * however the panel is sized, and leaves the last step down to the screen's own
 * pixels to the compositor. The pixel budget above still has the final say — at
 * a deep zoom the page is past this resolution anyway and nothing here applies.
 *
 * This is a quality choice and nothing more. It was written believing it would
 * fix the pages that rendered as ghosts, and it did not: those were scans whose
 * image never decoded at all, for want of `wasmUrl` (see `lib/pdfjsAssets.ts`).
 * Worth keeping, worth not mistaking for a cure.
 */
const MIN_DEVICE_PIXELS_PER_POINT = 3

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
 * The pdf.js scale that fits a page's *height* to the panel — the same sum
 * down the short axis, with the same margin, since the page sits in a box
 * padded on all four sides.
 */
export function fitHeightScale(containerHeight: number, pageHeightAtScale1: number): number {
  if (!(containerHeight > 0) || !(pageHeightAtScale1 > 0)) return 0
  const usable = Math.max(containerHeight - PAGE_MARGIN_PX * 2, 120)
  return usable / pageHeightAtScale1
}

/**
 * The zoom at which the whole page is on screen: the width fit on a panel
 * shaped like a page, less than that on a panel shorter than one.
 *
 * Expressed as a zoom rather than a scale because zoom is what the rest of the
 * panel works in — this is the bottom of the slider's range, and the size a
 * document opens at. It is left exact rather than snapped to the slider's 0.05
 * grid: down here a whole step is a tenth of the zoom, and a page that doesn't
 * quite fit is the one thing this number exists to prevent.
 */
export function pageFitZoom(
  containerWidth: number,
  containerHeight: number,
  pageWidthAtScale1: number,
  pageHeightAtScale1: number,
): number {
  const width = fitWidthScale(containerWidth, pageWidthAtScale1)
  const height = fitHeightScale(containerHeight, pageHeightAtScale1)
  if (!width || !height) return WIDTH_ZOOM
  return Math.max(MIN_ZOOM, Math.min(WIDTH_ZOOM, height / width))
}

/**
 * How many device pixels to draw per CSS pixel: the larger of the screen's
 * ratio and whatever it takes to reach `MIN_DEVICE_PIXELS_PER_POINT`, reduced
 * when that would exceed the pixel budget for this page.
 *
 * `renderScale` is the pdf.js scale the page is being drawn at (`fit × zoom`),
 * which is what turns a CSS ratio into a resolution: a page drawn at scale `s`
 * with ratio `r` lands `s × r` device pixels on every PDF point. Zoomed in far
 * enough the scale alone clears the floor and this is the screen's ratio again,
 * exactly as before.
 */
export function canvasPixelRatio(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio: number,
  renderScale: number,
  maxPixels: number = MAX_CANVAS_PIXELS,
): number {
  const screen = Math.max(1, devicePixelRatio || 1)
  const scale = renderScale > 0 ? renderScale : 1
  const wanted = Math.max(screen, MIN_DEVICE_PIXELS_PER_POINT / scale)
  const area = Math.max(cssWidth * cssHeight, 1)
  const capped = Math.sqrt(maxPixels / area)
  return Math.max(0.5, Math.min(wanted, capped))
}

/** One keyboard press of zoom, stopping at either end of the range. */
export function nudgeZoom(current: number, direction: -1 | 1, minZoom: number = WIDTH_ZOOM): number {
  return clampZoom(clampZoom(current, minZoom) + direction * KEY_ZOOM_STEP, minZoom)
}

/**
 * "Fit" reads better than a number for the bottom of the range, where the whole
 * page is on screen. Everything above it is a multiple of the width fit, so on
 * a desktop panel the reader passes "1.0×" — the page across the panel — on the
 * way up, which is a size worth being able to aim for.
 */
export function formatZoom(zoom: number, minZoom: number = WIDTH_ZOOM): string {
  return Math.abs(zoom - minZoom) < 1e-6 ? 'Fit' : `${zoom.toFixed(1)}×`
}

/**
 * A scroll offset that stays inside its scrollable range.
 *
 * `content` is the full size of what is being scrolled and `viewport` the
 * window onto it, so a page that fits has nowhere to go and pins to 0.
 */
export function clampScroll(value: number, content: number, viewport: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(Math.max(content - viewport, 0), value))
}

/**
 * Where to scroll to after the page has been redrawn at a new size, so that
 * the point the reader was looking at is still under their finger.
 *
 * Without this, zooming re-anchors at the top-left corner: the paragraph you
 * zoomed in to read leaves the panel and has to be hunted down again. `focus`
 * is that point's offset from the panel's edge — the middle of the panel when
 * the zoom came from the slider, the midpoint between the fingers when it came
 * from a pinch.
 */
export function anchoredScroll(
  scroll: number,
  focus: number,
  oldContent: number,
  newContent: number,
  viewport: number,
): number {
  if (!(oldContent > 0) || !(newContent > 0)) return clampScroll(scroll, newContent, viewport)
  const ratio = newContent / oldContent
  return clampScroll((scroll + focus) * ratio - focus, newContent, viewport)
}

/** The zoom a pinch has reached: the gesture scales the size it started from. */
export function pinchZoom(
  startZoom: number,
  startDistance: number,
  distance: number,
  minZoom: number = WIDTH_ZOOM,
): number {
  if (!(startDistance > 0) || !(distance > 0)) return clampZoom(startZoom, minZoom)
  return clampZoom(startZoom * (distance / startDistance), minZoom)
}

/** Keeps a page number inside a document that may have shrunk under it. */
export function clampPage(page: number, pageCount: number): number {
  if (!Number.isFinite(page) || pageCount < 1) return 1
  return Math.min(Math.max(Math.round(page), 1), pageCount)
}
