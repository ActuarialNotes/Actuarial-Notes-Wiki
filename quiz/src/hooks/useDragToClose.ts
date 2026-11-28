import { useEffect, useRef, type RefObject } from 'react'
import {
  backdropOpacity,
  closesOnRelease,
  DRAG_SLOP,
  flickCloses,
  sheetPlacement,
  startsDrag,
  startsResize,
} from '@/lib/sheetDrag'

/** Below `sm`, where a popup is a sheet from the foot of the screen with a handle. */
const SHEET_QUERY = '(max-width: 639.98px)'
const SETTLE_MS = 200
/** How long after closing a sheet that is still mounted counts as kept open. */
const KEPT_OPEN_MS = 1000
/** The most of the screen a sheet with no `max-height` of its own may take. */
const MAX_FRACTION = 0.92

const OWN_TOUCHES = 'input, textarea, select, [contenteditable="true"], [role="slider"], [data-no-sheet-drag]'

/** Whether `target` and everything up to `panel` is scrolled to its top. */
function atTop(target: Element | null, panel: HTMLElement): boolean {
  for (let node = target; node; node = node.parentElement) {
    if (node.scrollTop > 0) return false
    if (node === panel) return true
  }
  return panel.scrollTop <= 0
}

export interface SheetDragOptions {
  /** The dimmed page, when it is its own element: it fades with the pull. */
  backdrop?: RefObject<HTMLElement | null>
  enabled?: boolean
  /**
   * Only the handle drags the sheet. For a pane whose content pans and
   * scrolls on its own (the concept reader, a document).
   */
  handleOnly?: boolean
  /**
   * The sheet rises from the foot of the screen at every width, so the handle
   * works at every width and with a mouse. Otherwise only below `sm`.
   */
  anyWidth?: boolean
  /** The smallest height the handle shrinks the sheet to. Default: the height it opened at. */
  minHeight?: number
  /** The sheet's new height, as it is dragged (`done` false) and when the handle is let go. */
  onResize?: (height: number, done: boolean) => void
}

/**
 * **Pull a sheet by its handle to resize it, and down to close it**
 * (lib/sheetDrag.ts). A drag up on the handle (marked `data-sheet-handle`)
 * makes the sheet taller; a drag down makes it shorter, and once it is at its
 * smallest the sheet goes with the finger. Letting go far enough down, or
 * with a flick, slides it off and calls `onClose`; anything less puts it back
 * at the height it was dragged to. A touch that moves down anywhere on the
 * sheet while its content is scrolled to the top pulls it the same way.
 *
 * Only on a phone, where a popup is a sheet, unless `anyWidth`. A text field,
 * a slider or anything marked `data-no-sheet-drag` keeps its own touches.
 */
export function useDragToClose(
  panel: RefObject<HTMLElement | null>,
  onClose: () => void,
  { backdrop, enabled = true, handleOnly = false, anyWidth = false, minHeight, onResize }: SheetDragOptions = {},
): void {
  const close = useRef(onClose)
  close.current = onClose
  const resized = useRef(onResize)
  resized.current = onResize

  useEffect(() => {
    const el = panel.current
    if (!el || !enabled) return

    let tracking = false
    let dragging = false
    let onHandle = false
    let top = true
    let origin = { x: 0, y: 0 }
    let start = { x: 0, y: 0 }
    let startHeight = 0
    /** The height the sheet takes by itself, read before it is first resized. */
    let natural: number | null = null
    let sized = false
    let height = 0
    let offset = 0
    let samples: { t: number; y: number }[] = []
    let timer = 0

    const fade = (value: number | null) => {
      const b = backdrop?.current
      if (!b) return
      b.style.opacity = value === null ? '' : String(value)
    }
    const place = (y: number, animate: boolean) => {
      el.style.transition = animate ? `transform ${SETTLE_MS}ms ease-out` : 'none'
      el.style.transform = y ? `translateY(${y}px)` : ''
      const b = backdrop?.current
      if (b) b.style.transition = animate ? `opacity ${SETTLE_MS}ms ease-out` : 'none'
      fade(backdropOpacity(y, el.offsetHeight))
    }
    const reset = () => {
      el.style.transition = ''
      el.style.transform = ''
      const b = backdrop?.current
      if (b) b.style.transition = ''
      fade(null)
    }
    const maxHeight = () => {
      const own = parseFloat(getComputedStyle(el).maxHeight)
      const room = anyWidth ? window.innerHeight : (el.parentElement?.clientHeight || window.innerHeight)
      return Number.isFinite(own) && own > 0 ? own : room * MAX_FRACTION
    }
    const floor = () => minHeight ?? natural ?? startHeight

    const begin = (target: Element | null, x: number, y: number, t: number): boolean => {
      tracking = false
      dragging = false
      if (!anyWidth && !window.matchMedia(SHEET_QUERY).matches) return false
      if (!target || target.closest(OWN_TOUCHES)) return false
      onHandle = !!target.closest('[data-sheet-handle]')
      if (handleOnly && !onHandle) return false
      window.clearTimeout(timer)
      tracking = true
      top = atTop(target, el)
      origin = { x, y }
      start = { x, y }
      startHeight = el.offsetHeight
      if (natural === null || !el.style.height) natural = startHeight
      height = startHeight
      offset = 0
      sized = false
      samples = [{ t, y }]
      return true
    }

    /** Returns whether the move was the sheet's (the caller then keeps the page still). */
    const move = (x: number, y: number, t: number): boolean => {
      if (!tracking) return false
      const dx = x - start.x
      const dy = y - start.y
      if (!dragging) {
        if (startsDrag(dx, dy, top, onHandle)) {
          dragging = true
          start = { x, y: y - DRAG_SLOP }
        } else if (startsResize(dx, dy, onHandle)) {
          dragging = true
          start = { x, y: y + DRAG_SLOP }
        } else {
          // Past the slop in any other direction: the content scrolls as usual.
          if (Math.abs(dx) > DRAG_SLOP || Math.abs(dy) > DRAG_SLOP) tracking = false
          return false
        }
      }
      const next = sheetPlacement(startHeight, y - start.y, floor(), maxHeight())
      offset = next.offset
      if (next.height !== height || sized) {
        sized = true
        height = next.height
        // Back at the height it takes by itself, the sheet is left to size itself again.
        el.style.height = minHeight === undefined && height === natural ? '' : `${height}px`
        resized.current?.(height, false)
      }
      samples.push({ t, y })
      if (samples.length > 12) samples = samples.slice(-6)
      place(offset, false)
      return true
    }

    const end = (t: number) => {
      if (!tracking) return
      tracking = false
      if (!dragging) return
      dragging = false
      const recent = samples.filter(s => t - s.t <= 100)
      const first = recent[0] ?? samples[samples.length - 1]
      const last = samples[samples.length - 1]
      const velocity = last && first && last.t > first.t ? (last.y - first.y) / (last.t - first.t) : 0
      const travelled = last ? last.y - origin.y : 0
      const closes = closesOnRelease(offset, el.offsetHeight, velocity)
        || (onHandle && flickCloses(velocity, travelled))
      if (closes) {
        // A sheet pulled shut opens next at the height it had before the pull.
        const restore = () => { if (sized) resized.current?.(startHeight, true) }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          close.current()
          restore()
          return
        }
        place(el.offsetHeight + 40, true)
        timer = window.setTimeout(() => {
          close.current()
          restore()
          // The sheet stays off screen while the caller takes it away. React
          // may not unmount it before the next frame (Safari paints first),
          // so putting it back at once flashed the sheet and the dimmed page.
          // Only a caller that kept it open, well after, gets it back.
          timer = window.setTimeout(() => { if (el.isConnected) reset() }, KEPT_OPEN_MS)
        }, SETTLE_MS)
      } else {
        if (sized) resized.current?.(height, true)
        place(0, true)
        timer = window.setTimeout(reset, SETTLE_MS)
      }
    }

    const onStart = (e: TouchEvent) => {
      tracking = false
      dragging = false
      if (e.touches.length !== 1) return
      const t = e.touches[0]
      begin(e.target as Element | null, t.clientX, t.clientY, e.timeStamp)
    }
    const onMove = (e: TouchEvent) => {
      if (!tracking) return
      if (e.touches.length !== 1) { tracking = false; return }
      const t = e.touches[0]
      if (move(t.clientX, t.clientY, e.timeStamp) && e.cancelable) e.preventDefault()
    }
    const onEnd = (e: TouchEvent) => end(e.timeStamp)

    // A mouse drags the handle too, where the sheet is one at every width.
    const onMouseMove = (e: MouseEvent) => {
      if (move(e.clientX, e.clientY, e.timeStamp)) e.preventDefault()
    }
    const onMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      end(e.timeStamp)
    }
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      const target = e.target as Element | null
      if (!target?.closest('[data-sheet-handle]')) return
      if (!begin(target, e.clientX, e.clientY, e.timeStamp)) return
      e.preventDefault()
      document.body.style.cursor = 'row-resize'
      document.body.style.userSelect = 'none'
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }

    const opts = { passive: false } as const
    el.addEventListener('touchstart', onStart, opts)
    el.addEventListener('touchmove', onMove, opts)
    el.addEventListener('touchend', onEnd, opts)
    el.addEventListener('touchcancel', onEnd, opts)
    if (anyWidth) el.addEventListener('mousedown', onMouseDown)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.clearTimeout(timer)
    }
  }, [panel, backdrop, enabled, handleOnly, anyWidth, minHeight])
}
