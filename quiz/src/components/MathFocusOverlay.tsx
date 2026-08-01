import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react'
import { useSoundEffects, useSoundOnMount } from '@/hooks/useSoundEffects'
import {
  MATH_FOCUS_BASE_PX,
  fitScale,
  stepIndex,
} from '@/lib/mathFocus'
import { NavProgressBar } from '@/components/NavProgressBar'

interface Props {
  /** Detached copies of the equations in the tapped scope, in reading order. */
  equations: HTMLElement[]
  initialIndex: number
  onClose: () => void
}

const ZOOM_STEP = 0.25
const ZOOM_MIN = 0.5
const ZOOM_MAX = 3

/**
 * Focus mode for a single equation: the tapped formula blown up to fill the
 * screen, with Previous/Next stepping through the rest of the equations around
 * it. Mounted by `components/MathFocus.tsx`, never rendered directly.
 *
 * The equations arrive as already-detached DOM nodes rather than as LaTeX
 * source, which is what lets this work anywhere KaTeX has rendered — the wiki,
 * a flashcard, the collect modal — without the caller knowing what it drew.
 */
export function MathFocusOverlay({ equations, initialIndex, onClose }: Props) {
  // Paper: the same sheet-sliding cue every overlay in the app opens with.
  useSoundOnMount('open')
  const { play } = useSoundEffects()
  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [fit, setFit] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)
  const holderRef = useRef<HTMLDivElement>(null)

  const count = equations.length
  const canPrev = index > 0
  const canNext = index < count - 1

  const step = useCallback((delta: -1 | 1) => {
    setIndex(current => {
      const next = stepIndex(current, delta, count)
      if (next !== current) {
        play('page')
        setZoom(1)
      }
      return next
    })
  }, [count, play])

  // Mount the copy and work out how far it can be blown up. Measuring happens
  // at MATH_FOCUS_BASE_PX and the result is applied as a font size (rather than
  // a transform) so the glyphs stay crisp at every scale.
  useLayoutEffect(() => {
    const holder = holderRef.current
    const stage = stageRef.current
    const source = equations[index]
    if (!holder || !stage || !source) return
    holder.replaceChildren(source.cloneNode(true))

    function measure() {
      if (!holder || !stage) return
      holder.style.fontSize = `${MATH_FOCUS_BASE_PX}px`
      // The inner .katex box is inline-block, so it reports the equation's own
      // size; .katex-display is a full-width block and would always "fit".
      const box = holder.querySelector<HTMLElement>('.katex') ?? holder
      const rect = box.getBoundingClientRect()
      setFit(fitScale(rect.width, rect.height, stage.clientWidth - 32, stage.clientHeight - 32))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [equations, index])

  useLayoutEffect(() => {
    const holder = holderRef.current
    if (holder) holder.style.fontSize = `${MATH_FOCUS_BASE_PX * fit * zoom}px`
  }, [fit, zoom])

  // Esc leaves, arrows step, +/− zoom — the shortcuts the image gallery and the
  // concept popup already train.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === '+' || e.key === '=') setZoom(z => Math.min(ZOOM_MAX, z + ZOOM_STEP))
      else if (e.key === '-') setZoom(z => Math.max(ZOOM_MIN, z - ZOOM_STEP))
      else if (e.key === '0') setZoom(1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, step])

  // Focus mode covers the viewport, so lock the page behind it — restoring
  // whatever was there rather than clearing, since this can open on top of a
  // surface that locked scrolling first (the popup's own focus mode).
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])

  return (
    <div
      // Excludes the magnified copy from the delegated tap-to-magnify listener,
      // which would otherwise treat a tap on the equation as a fresh request.
      data-math-magnify="none"
      className="fixed inset-0 z-[85] flex flex-col bg-background/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Equation focus"
      onWheel={e => e.stopPropagation()}
    >
      {/* Top bar — position on the left, exit on the right */}
      <div className="flex items-center justify-between h-14 shrink-0 px-4">
        <span className="text-sm text-muted-foreground tabular-nums">
          {count > 1 ? `${index + 1} / ${count}` : 'Equation'}
        </span>
        <button
          type="button"
          onClick={onClose}
          data-sound="close"
          className="text-muted-foreground hover:text-foreground p-1"
          title="Close (Esc)"
          aria-label="Close equation focus"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage — a tap on the empty space around the equation closes, matching
          the image gallery. The equation itself scrolls when it's too wide to
          fit even at the minimum scale. */}
      <div
        ref={stageRef}
        className="flex-1 min-h-0 overflow-auto flex items-center justify-center px-4"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <div
          ref={holderRef}
          className="text-foreground [&_.katex-display]:!my-0 [&_.katex-display]:!overflow-visible [&_.katex-display]:!pb-0"
        />
      </div>

      {/* Zoom — the fitted size is 100%; the buttons scale relative to it. */}
      <div className="flex items-center justify-center gap-3 shrink-0 py-2">
        <button
          type="button"
          onClick={() => setZoom(z => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
          disabled={zoom <= ZOOM_MIN}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom(1)}
          className="text-xs text-muted-foreground hover:text-foreground tabular-nums w-12 text-center transition-colors"
          aria-label="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          onClick={() => setZoom(z => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
          disabled={zoom >= ZOOM_MAX}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Footer nav — the same Previous / Next shape as the concept popup. */}
      {count > 1 && (
        <>
        <NavProgressBar
          current={index + 1}
          total={count}
          className="border-t"
          label={`Equation ${index + 1} of ${count}`}
        />
        <div className="flex items-stretch h-16 shrink-0 bg-background/60">
          <button
            type="button"
            disabled={!canPrev}
            data-sound="none"
            onClick={() => step(-1)}
            className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-6 w-6 sm:h-5 sm:w-5" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            disabled={!canNext}
            data-sound="none"
            onClick={() => step(1)}
            className="flex-1 flex items-center justify-center gap-2 px-4 text-base sm:text-sm font-medium hover:bg-accent/60 active:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="h-6 w-6 sm:h-5 sm:w-5" />
          </button>
        </div>
        </>
      )}
    </div>
  )
}
