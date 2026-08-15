import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GripHorizontal, Maximize2, Minimize2, X } from 'lucide-react'
import { MarkdownText } from '@/components/MarkdownText'
import { useSplitHeight } from '@/hooks/useSplitHeight'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import type { CaseStudy } from '@/data/caseStudies'

interface Props {
  study: CaseStudy
  onClose: () => void
}

/**
 * The case-study reader: the supplemental booklet a question is read against,
 * shown alongside the question rather than in place of it.
 *
 * This is deliberately the *non-modal* panel — the same `.concept-popup-aside`
 * surface, drag handle and persisted height the concept popup and the
 * fix-mistakes panel use. In the exam room the booklet sits open on the desk
 * next to the paper; a blocking dialog would take the question away every time
 * the candidate wanted to check a number, which is exactly the wrong shape. The
 * page behind stays live, so the answer options remain clickable with the study
 * open, and focus mode is there for the moments when the candidate does want to
 * pore over 20 pages of model output full-screen.
 *
 * Content-wise it is a plain markdown render — the study's body is authored the
 * same way a question stem is (prose, fenced R output, plot embeds), so it goes
 * through MarkdownText and picks up KaTeX, tables and math focus for free.
 */
export function CaseStudyPanel({ study, onClose }: Props) {
  // Sheet-of-paper cue on the way in, matching the other panels.
  useSoundOnMount('open')
  const { height, beginDrag } = useSplitHeight()
  const [focusMode, setFocusMode] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => { onClose() }, [onClose])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Esc leaves focus mode first, then closes — same as the concept popup.
      if (e.key !== 'Escape') return
      if (focusMode) setFocusMode(false)
      else close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, focusMode])

  // Focus mode covers the whole viewport, so lock the page behind it.
  useEffect(() => {
    if (!focusMode) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [focusMode])

  // A fixed panel over the bottom half would otherwise bury whatever it covers —
  // on a quiz that means the answer options, which defeats the point of staying
  // non-modal. Pad the page by the panel's height so everything behind can still
  // be scrolled clear of it, exactly as WikiLayout does for the concept popup.
  useEffect(() => {
    if (focusMode) return
    document.body.style.paddingBottom = `${height + 24}px`
    return () => { document.body.style.paddingBottom = '' }
  }, [focusMode, height])

  const subtitle = [
    study.session && study.year ? `${study.session} ${study.year}` : study.year?.toString(),
    study.source,
  ].filter(Boolean).join(' · ')

  return createPortal(
    <aside
      className="concept-popup-aside fixed left-0 right-0 bottom-14 md:bottom-0 z-50 border-t bg-card text-card-foreground shadow-2xl flex flex-col"
      data-focus={focusMode}
      style={{ height: focusMode ? undefined : `min(${height}px, 100vh)` }}
      // Non-modal: the question behind stays answerable while the study is open.
      role="complementary"
      aria-label={`Case study: ${study.title}`}
    >
      {!focusMode && (
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize case study panel"
          onMouseDown={e => { e.preventDefault(); beginDrag(e.clientY) }}
          onTouchStart={e => { if (e.touches[0]) beginDrag(e.touches[0].clientY) }}
          className="flex h-4 items-center justify-center cursor-row-resize hover:bg-accent/60 active:bg-accent/80 transition-colors select-none touch-none"
        >
          <GripHorizontal className="h-3 w-6 text-muted-foreground/60" />
        </div>
      )}

      <div className={`flex items-center gap-2 h-16 shrink-0 ${focusMode ? 'w-full max-w-4xl mx-auto px-4 sm:px-6' : 'px-3'}`}>
        <div className="flex-1 min-w-0">
          <h2 className="truncate font-semibold text-lg sm:text-xl">{study.title}</h2>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setFocusMode(v => !v)}
          aria-pressed={focusMode}
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title={focusMode ? 'Exit focus mode (Esc)' : 'Focus mode'}
          aria-label={focusMode ? 'Exit focus mode' : 'Focus mode'}
        >
          {focusMode ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </button>
        {!focusMode && (
          <button
            type="button"
            onClick={close}
            data-sound="none"
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Close (Esc)"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Body — overflow-y:scroll (not auto) keeps this a scroll container even
          when the study is short, so overscroll-contain traps wheel events and
          the question behind never scrolls out from under the reader. */}
      <div
        ref={bodyRef}
        className={`flex-1 min-h-0 w-full overflow-y-scroll overscroll-contain px-4 sm:px-6 pb-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] ${focusMode ? 'max-w-4xl mx-auto' : ''}`}
      >
        {/* R output runs wide and must never wrap — a broken column ruins the
            reading. Each pre scrolls on its own axis instead. */}
        <MarkdownText
          className="prose prose-sm dark:prose-invert max-w-none [&_pre]:overflow-x-auto [&_pre]:text-xs [&_img]:max-w-full"
        >
          {study.body}
        </MarkdownText>
      </div>
    </aside>,
    document.body,
  )
}
