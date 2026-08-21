import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  GripHorizontal,
  Loader2,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { useSoundEffects, useSoundOnMount } from '@/hooks/useSoundEffects'
import { usePdfDocument } from '@/hooks/usePdfDocument'
import { pdfDownloadUrl, pdfProxyUrl, pdfSourceHost } from '@/lib/examPdf'
import {
  anchoredScroll,
  canvasPixelRatio,
  clampPage,
  clampZoom,
  DEFAULT_ZOOM,
  fitWidthScale,
  formatZoom,
  MAX_ZOOM,
  MIN_ZOOM,
  nudgeZoom,
  pinchZoom,
  ZOOM_SLIDER_STEP,
} from '@/lib/pdfViewer'

/**
 * What the panel shows when it can't show the document. Every failure here —
 * the endpoint isn't deployed, the publisher moved the file, a page won't
 * render — leaves the reader the same two actions, so they share one card.
 */
function ReadingFailure({ message, url, sourceHost }: { message: string; url: string; sourceHost: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          Open at {sourceHost || 'the source'}
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        </a>
        <a
          href={pdfDownloadUrl(url)}
          download
          className="inline-flex min-h-[40px] items-center gap-2 rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-accent/40 hover:text-foreground transition-colors"
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          Download
        </a>
      </div>
    </div>
  )
}

interface Props {
  /** The publisher's URL for the PDF — casact.org / soa.org. */
  url: string
  /** What the document is, e.g. "Examiner's Report". */
  title: string
  /** Which paper it belongs to, e.g. "Exam 5 · Spring 2019". */
  subtitle?: string
  onClose: () => void
}

/**
 * The exam-PDF reader: a past paper read *in* the app rather than in a browser
 * tab you then have to find your way back from.
 *
 * It wears the concept popup's shell — the same slide-up bottom panel, the same
 * drag-to-resize handle and shared preferred height, the same focus-mode
 * expand, the same Previous / position / Next footer — because a source
 * document is another thing you read beside your work. Pages here are what
 * concepts are there.
 *
 * The pages are drawn by pdf.js rather than handed to a browser's PDF plugin
 * (`lib/pdfjsSetup.ts` explains why), and the bytes come from `quiz/api/exam-pdf.js`
 * rather than the publisher (`lib/examPdf.ts` explains why). Everything assumes
 * that can still fail — a moved file, an endpoint that isn't deployed — so the
 * publisher's own copy is always one tap away.
 */
export function PdfViewerPanel({ url, title, subtitle, onClose }: Props) {
  const { play } = useSoundEffects()
  // A sheet of paper sliding out, same as the concept popup opening.
  useSoundOnMount('open')
  const { height, beginDrag } = useSplitHeight()
  const [focusMode, setFocusMode] = useState(false)

  const proxied = useMemo(() => pdfProxyUrl(url), [url])
  const { doc, pageCount, status, error } = usePdfDocument(proxied)

  const [page, setPage] = useState(1)
  // Three zooms, because a page is a bitmap that takes a moment to redraw and
  // the slider moves continuously:
  //   `zoom`       what the reader has asked for, live under their finger;
  //   `renderZoom` what the drawing effect is working towards, which lags the
  //                slider until it settles (redrawing on every 0.05 step would
  //                queue dozens of cancelled renders);
  //   `sizedZoom`  what the drawn bitmap is sized for.
  // The gap between the first and the last is covered by scaling that bitmap
  // with a CSS transform, so the page grows under the finger and only goes
  // crisp once the render lands. The *layout* follows the zoom immediately
  // either way — see `pageBoxRef` — so the redraw changes sharpness and
  // nothing else.
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM)
  const [renderZoom, setRenderZoom] = useState<number>(DEFAULT_ZOOM)
  const [sizedZoom, setSizedZoom] = useState<number>(DEFAULT_ZOOM)
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null)
  const [rendering, setRendering] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [dragging, setDragging] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // The box the page occupies in the layout. It is sized for the zoom the
  // reader has asked for, not for the bitmap inside it, which is what makes the
  // scrollable area grow with the gesture instead of at the end of it.
  const pageBoxRef = useRef<HTMLDivElement>(null)
  // The live zoom, readable from the gesture listeners, which are attached once
  // and would otherwise close over a stale one.
  const zoomRef = useRef(DEFAULT_ZOOM)
  // Where the panel was looking when a zoom was asked for, so the same point
  // can be put back once the page has grown. Held from the event that changed
  // the zoom until the layout effect below consumes it.
  const zoomAnchorRef = useRef<{
    left: number
    top: number
    width: number
    height: number
    clientWidth: number
    clientHeight: number
    focus: { x: number; y: number } | null
  } | null>(null)
  const dragRef = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null)
  const sourceHost = pdfSourceHost(url)

  useEffect(() => { zoomRef.current = zoom }, [zoom])
  const requestZoomRef = useRef<(next: number, focus?: { x: number; y: number } | null) => void>(() => {})

  /**
   * Every zoom goes through here: the slider, the pinch, ctrl+wheel, the keys.
   *
   * The panel is measured *before* the change, while the DOM still shows the
   * old size, because that measurement is what the point being held still is
   * expressed against. `focus` is where the reader is looking — the midpoint
   * between their fingers in a pinch, the pointer under a trackpad zoom, and
   * the middle of the panel for a slider that has no position of its own.
   */
  const requestZoom = useCallback((next: number, focus?: { x: number; y: number } | null) => {
    const target = clampZoom(next)
    if (target === zoomRef.current) return
    const el = scrollRef.current
    if (el) {
      zoomAnchorRef.current = {
        left: el.scrollLeft,
        top: el.scrollTop,
        width: el.scrollWidth,
        height: el.scrollHeight,
        clientWidth: el.clientWidth,
        clientHeight: el.clientHeight,
        focus: focus ?? null,
      }
    }
    zoomRef.current = target
    setZoom(target)
  }, [])

  useEffect(() => { requestZoomRef.current = requestZoom }, [requestZoom])

  /**
   * Hold that point still, in the same frame the page changed size.
   *
   * A layout effect, so the scroll offset is corrected after the box has been
   * re-sized but before the browser paints: the page grows around what the
   * reader is looking at rather than around the top-left corner and a scroll
   * correction they can see happening.
   */
  useLayoutEffect(() => {
    const el = scrollRef.current
    const anchor = zoomAnchorRef.current
    if (!el || !anchor) return
    zoomAnchorRef.current = null
    el.scrollLeft = anchoredScroll(
      anchor.left,
      anchor.focus?.x ?? anchor.clientWidth / 2,
      anchor.width,
      el.scrollWidth,
      anchor.clientWidth,
    )
    el.scrollTop = anchoredScroll(
      anchor.top,
      anchor.focus?.y ?? anchor.clientHeight / 2,
      anchor.height,
      el.scrollHeight,
      anchor.clientHeight,
    )
  }, [zoom])

  const close = useCallback(() => {
    play('close')
    onClose()
  }, [play, onClose])

  // A new document starts at its first page, at fit-width.
  useEffect(() => {
    setPage(1)
    setZoom(DEFAULT_ZOOM)
    setRenderZoom(DEFAULT_ZOOM)
  }, [proxied])

  // Follow the slider once it stops moving. A drag across the whole range fires
  // ~60 changes; each one would start a page render only to have it cancelled
  // by the next, so the reader would see the CSS preview and never a sharp page.
  useEffect(() => {
    if (zoom === renderZoom) return
    const timer = window.setTimeout(() => setRenderZoom(zoom), 140)
    return () => window.clearTimeout(timer)
  }, [zoom, renderZoom])

  // Stepping pages is a page flick, not a press — the cue the concept popup's
  // Previous/Next makes.
  const turnPage = useCallback((direction: -1 | 1) => {
    setPage(current => {
      const next = clampPage(current + direction, pageCount)
      if (next !== current) play('page')
      return next
    })
  }, [pageCount, play])

  const changeZoom = useCallback((direction: -1 | 1) => {
    requestZoom(nudgeZoom(zoomRef.current, direction))
  }, [requestZoom])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Esc leaves focus mode first, then closes — same as the concept popup.
      if (e.key === 'Escape') {
        if (focusMode) setFocusMode(false)
        else close()
        return
      }
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
      if (e.key === 'ArrowLeft') turnPage(-1)
      else if (e.key === 'ArrowRight') turnPage(1)
      else if (e.key === '+' || e.key === '=') changeZoom(1)
      else if (e.key === '-') changeZoom(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, focusMode, turnPage, changeZoom])

  // Focus mode covers the whole viewport, so lock the page behind it exactly as
  // the concept popup does.
  useEffect(() => {
    if (!focusMode) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [focusMode])

  // The panel is resizable and the sidebar collapses under it, so the page is
  // re-fitted to whatever width it actually has rather than measured once.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    setContainerWidth(el.clientWidth)
    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width ?? 0
      if (width > 0) setContainerWidth(width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [status])

  // Draw the current page. Re-runs on page, settled zoom and width; the previous
  // render is cancelled so a fast flick through pages can't paint an older page
  // over a newer one.
  useEffect(() => {
    if (!doc || containerWidth <= 0) return
    let cancelled = false
    let task: { cancel: () => void } | null = null
    setRendering(true)
    setPageError(null)

    void (async () => {
      try {
        const pdfPage = await doc.getPage(clampPage(page, doc.numPages))
        if (cancelled) return
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        // Nothing to draw on, or nothing to fit to. Bail out of the *spinner*
        // as well — a stuck "Rendering page…" reads as a hang.
        if (!canvas || !context) {
          setRendering(false)
          return
        }

        const fit = fitWidthScale(containerWidth, pdfPage.getViewport({ scale: 1 }).width)
        if (!fit) {
          setRendering(false)
          return
        }
        const scale = fit * renderZoom
        const viewport = pdfPage.getViewport({ scale })
        // The canvas is a bitmap: it's sized in device pixels for sharpness and
        // laid out in CSS pixels, with the ratio held above a real resolution
        // (a fitted page is only ~125 dpi at the screen's own ratio, which
        // scanned pages don't survive) and capped so a deep zoom on a retina
        // screen can't ask for a canvas the browser refuses to allocate.
        const ratio = canvasPixelRatio(viewport.width, viewport.height, window.devicePixelRatio, scale)
        const width = Math.floor(viewport.width)
        const height = Math.floor(viewport.height)
        canvas.width = Math.floor(viewport.width * ratio)
        canvas.height = Math.floor(viewport.height * ratio)
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        // The bitmap now *is* the size the box has been laid out at, so the
        // transform that was standing in for it comes off, and the box is
        // pinned to the same size it already had. Both are written here rather
        // than left to the re-render below: that lands a frame later, and this
        // frame would otherwise paint a full-size page scaled up again on top
        // of a box that no longer matches it.
        canvas.style.transform = ''
        if (pageBoxRef.current) {
          pageBoxRef.current.style.width = `${width}px`
          pageBoxRef.current.style.height = `${height}px`
        }
        setSizedZoom(renderZoom)
        setPageSize({ width, height })
        // Sizing a canvas resets its context, so the filtering hint has to be
        // set after: whatever reduction is left when a 300 dpi scan meets this
        // canvas should be averaged rather than point-sampled.
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = 'high'

        const renderTask = pdfPage.render({
          canvasContext: context,
          canvas,
          viewport,
          transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
        })
        task = renderTask
        await renderTask.promise
        if (!cancelled) {
          setRendering(false)
          setPageError(null)
        }
      } catch (err) {
        // Cancellation is the normal case here — the page changed under the
        // render — and is not a failure. Anything else is, and says so rather
        // than leaving an empty rectangle the reader has to interpret.
        if (cancelled || (err as { name?: string })?.name === 'RenderingCancelledException') return
        setRendering(false)
        setPageError(err instanceof Error ? err.message : 'Unknown error')
      }
    })()

    return () => {
      cancelled = true
      task?.cancel()
    }
  }, [doc, page, renderZoom, containerWidth])

  // Each page starts at its top — landing halfway down page 12 because page 11
  // was scrolled is disorienting.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [page])

  /**
   * Panning, on the three things this is read on.
   *
   * A zoomed page is bigger than the panel in both directions, and reaching the
   * rest of it is the whole point of zooming. The page area is a scroll
   * container, so a finger already pans it natively (with momentum, which no
   * hand-rolled version matches) — `touch-action: pan-x pan-y` keeps that while
   * taking pinch away from the browser, which would otherwise zoom the whole
   * site rather than the document. That leaves the two the browser gives us
   * nothing for: a mouse, which gets grab-and-drag over the page, and a
   * trackpad's pinch, which arrives as ctrl+wheel.
   */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    function distance(touches: TouchList) {
      const [a, b] = [touches[0], touches[1]]
      return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY)
    }

    function focusOf(touches: TouchList) {
      const rect = el!.getBoundingClientRect()
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
        y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top,
      }
    }

    let pinch: { distance: number; zoom: number } | null = null

    function onTouchStart(e: TouchEvent) {
      pinch = e.touches.length === 2
        ? { distance: distance(e.touches), zoom: zoomRef.current }
        : null
    }

    function onTouchMove(e: TouchEvent) {
      if (!pinch || e.touches.length !== 2) return
      // Non-passive so this can be prevented: two fingers on a scroll container
      // is a scroll gesture to the browser, and we want it to be a zoom.
      e.preventDefault()
      requestZoomRef.current(pinchZoom(pinch.zoom, pinch.distance, distance(e.touches)), focusOf(e.touches))
    }

    function onTouchEnd(e: TouchEvent) {
      if (e.touches.length < 2) pinch = null
    }

    function onWheel(e: WheelEvent) {
      // ctrl+wheel is what a trackpad pinch and a browser zoom shortcut both
      // send. Over the document it should zoom the document.
      if (!e.ctrlKey) return
      e.preventDefault()
      const rect = el!.getBoundingClientRect()
      requestZoomRef.current(
        zoomRef.current * Math.exp(-e.deltaY / 200),
        { x: e.clientX - rect.left, y: e.clientY - rect.top },
      )
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('wheel', onWheel)
    }
  }, [])

  // Grab-and-drag for a mouse. Only from the page itself: a drag started on the
  // failure card would capture the pointer and swallow the click on its links.
  function startPan(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollRef.current
    if (!el || e.pointerType === 'touch' || e.button !== 0) return
    if ((e.target as HTMLElement).tagName !== 'CANVAS') return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop }
    setDragging(true)
  }

  function pan(e: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    const el = scrollRef.current
    if (!drag || !el || drag.id !== e.pointerId) return
    el.scrollLeft = drag.left - (e.clientX - drag.x)
    el.scrollTop = drag.top - (e.clientY - drag.y)
  }

  function endPan(e: React.PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.id !== e.pointerId) return
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
    dragRef.current = null
    setDragging(false)
  }

  const position = pageCount > 0 ? `${clampPage(page, pageCount)} of ${pageCount}` : ''
  // How far the drawn page has to be stretched to stand in for the zoom the
  // reader has asked for. 1 whenever the two agree, which is most of the time.
  const previewScale = sizedZoom > 0 ? zoom / sizedZoom : 1

  return createPortal(
    <aside
      // The concept popup's class carries the sidebar-width offset on desktop
      // and the whole focus-mode layer in index.css, so both panels sit and
      // expand identically.
      className="concept-popup-aside fixed left-0 right-0 bottom-14 md:bottom-0 z-50 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-focus={focusMode}
      style={{ height: focusMode ? undefined : `min(${height}px, 100vh)` }}
      // Non-modal, like the concept popup: the shelf behind stays live, so this
      // is a document you read beside the quiz rather than a dialog over it.
      role="complementary"
      aria-label={subtitle ? `${title} — ${subtitle}` : title}
    >
      {!focusMode && (
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize document panel"
          onMouseDown={e => {
            e.preventDefault()
            beginDrag(e.clientY)
          }}
          onTouchStart={e => {
            if (e.touches[0]) beginDrag(e.touches[0].clientY)
          }}
          className="flex h-4 items-center justify-center cursor-row-resize hover:bg-accent/60 active:bg-accent/80 transition-colors select-none touch-none"
        >
          <GripHorizontal className="h-3 w-6 text-muted-foreground/60" />
        </div>
      )}

      {/* Header: what you're reading, then save / expand / close. Focus mode
          spans the viewport, so it shares the body's reading column. */}
      <div className={`flex items-center gap-2 h-16 shrink-0 ${focusMode ? 'w-full max-w-4xl mx-auto px-4 sm:px-6' : 'px-3'}`}>
        <div className="flex-1 min-w-0">
          <h2 className="truncate font-semibold text-lg sm:text-xl min-w-0">{title}</h2>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <a
          href={pdfDownloadUrl(url)}
          download
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Download PDF"
          aria-label="Download PDF"
        >
          <Download className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={() => setFocusMode(v => !v)}
          aria-pressed={focusMode}
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title={focusMode ? 'Exit full screen (Esc)' : 'Full screen'}
          aria-label={focusMode ? 'Exit full screen' : 'Full screen'}
        >
          {focusMode ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={close}
          data-sound="none"
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Close"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* The page. Scrolls in both directions, because a zoomed-in page is
          wider than the panel and panning it is the point of zooming.
          `pan-x pan-y` keeps a one-finger drag scrolling natively while
          reserving pinch for the zoom handler above. */}
      <div
        ref={scrollRef}
        className="relative flex-1 min-h-0 overflow-auto overscroll-contain bg-muted/40 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        style={{ touchAction: 'pan-x pan-y' }}
        onPointerDown={startPan}
        onPointerMove={pan}
        onPointerUp={endPan}
        onPointerCancel={endPan}
      >
        {status === 'error' ? (
          <ReadingFailure
            message={error ? `This document couldn't be loaded — ${error}.` : "This document couldn't be loaded."}
            url={url}
            sourceHost={sourceHost}
          />
        ) : (
          <div className="flex min-h-full w-full p-4">
            {/* The page's box in the layout, sized for the zoom that has been
                *asked* for — so the scrollable area grows with the gesture
                rather than in a step when the redraw lands, and the redraw
                itself changes nothing but sharpness.

                `m-auto` centres it rather than `justify-center` on the row:
                auto margins collapse to zero once the page outgrows the panel,
                where `justify-center` would push half of it off the left edge —
                into space a scroll container can't reach. */}
            <div
              ref={pageBoxRef}
              className="m-auto shrink-0 shadow-sm"
              style={pageSize ? {
                width: Math.round(pageSize.width * previewScale),
                height: Math.round(pageSize.height * previewScale),
              } : undefined}
            >
              <canvas
                ref={canvasRef}
                className="block max-w-none origin-top-left"
                style={{
                  // Between a slider move and the redraw that follows it, the
                  // page on screen is the last bitmap stretched to fill the box
                  // above. Scaled from its top-left corner, which is where the
                  // box's own corner is, so every point of the page lands
                  // exactly where the redraw will put it.
                  transform: previewScale === 1 ? undefined : `scale(${previewScale})`,
                  cursor: dragging ? 'grabbing' : 'grab',
                }}
                aria-label={`Page ${page}`}
              />
            </div>
          </div>
        )}

        {/* A page that wouldn't draw covers the canvas rather than replacing it:
            the canvas has to stay mounted, or turning to a page that *does*
            draw would have nothing to draw on. */}
        {pageError && status !== 'error' && (
          <div className="absolute inset-0 bg-card/95">
            <ReadingFailure
              message={`This page couldn't be drawn (${pageError}).`}
              url={url}
              sourceHost={sourceHost}
            />
          </div>
        )}

        {(status === 'loading' || rendering) && status !== 'error' && !pageError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              {status === 'loading' ? 'Loading document…' : 'Rendering page…'}
            </span>
          </div>
        )}
      </div>

      {/* Zoom — the same slider the image gallery and math focus mode use
          (`.zoom-slider`), for the same reason: on a phone it is dragged with
          the thumb already holding the device, which a pair of small +/- targets
          in the footer never was. 1× is the fitted page and the scale goes up
          from there; the two custom properties recolour the shared control for
          the card this panel sits on rather than the gallery's black. */}
      <div
        className="flex items-center gap-3 sm:gap-4 shrink-0 border-t px-4 sm:px-6 py-1"
        style={{
          '--zoom-slider-track': 'hsl(var(--foreground) / 0.18)',
          '--zoom-slider-thumb': 'hsl(var(--foreground))',
        } as CSSProperties}
      >
        <span className="text-sm text-muted-foreground tabular-nums w-6 shrink-0">
          {MIN_ZOOM}×
        </span>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={ZOOM_SLIDER_STEP}
          value={zoom}
          disabled={status !== 'ready'}
          onChange={e => requestZoom(parseFloat(e.target.value))}
          className="zoom-slider flex-1 disabled:opacity-40"
          aria-label="Zoom"
        />
        <span className="text-sm text-muted-foreground tabular-nums w-6 shrink-0 text-right">
          {MAX_ZOOM}×
        </span>
        <span className="text-sm text-foreground tabular-nums w-10 text-right shrink-0 font-semibold">
          {formatZoom(zoom)}
        </span>
        {zoom > MIN_ZOOM && (
          <button
            type="button"
            onClick={() => requestZoom(DEFAULT_ZOOM)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            reset
          </button>
        )}
      </div>

      {/* Footer: Previous / where you are / Next, as in the concept popup, with
          the way back to the publisher's copy. */}
      <div className="flex items-stretch h-16 shrink-0 border-t bg-background/60">
        <button
          type="button"
          disabled={status !== 'ready' || page <= 1}
          data-sound="none"
          onClick={() => turnPage(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
          <span>Previous</span>
        </button>

        <div className="self-center flex shrink-0 flex-col items-center px-2">
          <span className="text-sm sm:text-xs text-muted-foreground tabular-nums">
            {position || '—'}
          </span>
        </div>

        <button
          type="button"
          disabled={status !== 'ready' || page >= pageCount}
          data-sound="none"
          onClick={() => turnPage(1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Who published it, and the way out to their copy — the reader's check
          that this is the real document, and their escape hatch if the panel
          ever can't show it. */}
      {!focusMode && (
        <div className="flex items-center justify-between gap-2 h-10 shrink-0 border-t px-3 sm:px-4">
          <span className="truncate text-xs text-muted-foreground">
            {sourceHost ? `Published by ${sourceHost}` : 'Source document'}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded px-1.5 py-1 text-xs text-muted-foreground hover:bg-accent/40 hover:text-foreground transition-colors"
          >
            Open in new tab
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </a>
        </div>
      )}
    </aside>,
    document.body,
  )
}
