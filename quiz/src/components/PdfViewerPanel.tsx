import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { useSoundEffects, useSoundOnMount } from '@/hooks/useSoundEffects'
import { usePdfDocument } from '@/hooks/usePdfDocument'
import { pdfDownloadUrl, pdfProxyUrl, pdfSourceHost } from '@/lib/examPdf'
import {
  canvasPixelRatio,
  canZoom,
  clampPage,
  DEFAULT_ZOOM,
  fitWidthScale,
  formatZoom,
  stepZoom,
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
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM)
  const [rendering, setRendering] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sourceHost = pdfSourceHost(url)

  const close = useCallback(() => {
    play('close')
    onClose()
  }, [play, onClose])

  // A new document starts at its first page, at fit-width.
  useEffect(() => {
    setPage(1)
    setZoom(DEFAULT_ZOOM)
  }, [proxied])

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
    setZoom(current => stepZoom(current, direction))
  }, [])

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

  // Draw the current page. Re-runs on page, zoom and width; the previous render
  // is cancelled so a fast flick through pages can't paint an older page over a
  // newer one.
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
        const viewport = pdfPage.getViewport({ scale: fit * zoom })
        // The canvas is a bitmap: it's sized in device pixels for sharpness and
        // laid out in CSS pixels, with the ratio capped so a deep zoom on a
        // retina screen can't ask for a canvas the browser refuses to allocate.
        const ratio = canvasPixelRatio(viewport.width, viewport.height, window.devicePixelRatio)
        canvas.width = Math.floor(viewport.width * ratio)
        canvas.height = Math.floor(viewport.height * ratio)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`

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
  }, [doc, page, zoom, containerWidth])

  // Each page starts at its top — landing halfway down page 12 because page 11
  // was scrolled is disorienting.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [page])

  const position = pageCount > 0 ? `${clampPage(page, pageCount)} of ${pageCount}` : ''

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
          wider than the panel and panning it is the point of zooming. */}
      <div
        ref={scrollRef}
        className="relative flex-1 min-h-0 overflow-auto overscroll-contain bg-muted/40 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {status === 'error' ? (
          <ReadingFailure
            message={error ? `This document couldn't be loaded — ${error}.` : "This document couldn't be loaded."}
            url={url}
            sourceHost={sourceHost}
          />
        ) : (
          <div className="flex min-h-full w-full justify-center p-4">
            <canvas ref={canvasRef} className="max-w-none shadow-sm" aria-label={`Page ${page}`} />
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

      {/* Footer: Previous / where you are / Next, as in the concept popup, with
          the zoom stop and the way back to the publisher's copy. */}
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

        <div className="self-center flex shrink-0 flex-col items-center gap-0.5 px-2">
          <span className="text-sm sm:text-xs text-muted-foreground tabular-nums">
            {position || '—'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={status !== 'ready' || !canZoom(zoom, -1)}
              onClick={() => changeZoom(-1)}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40 transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center text-xs text-muted-foreground tabular-nums">
              {formatZoom(zoom)}
            </span>
            <button
              type="button"
              disabled={status !== 'ready' || !canZoom(zoom, 1)}
              onClick={() => changeZoom(1)}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40 transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
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
