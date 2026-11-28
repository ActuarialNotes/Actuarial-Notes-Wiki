import { useEffect, useRef, type RefObject } from 'react'
import { backdropOpacity, closesOnRelease, DRAG_SLOP, dragOffset, startsDrag } from '@/lib/sheetDrag'

/** Below `sm`, where a popup is a sheet from the foot of the screen with a handle. */
const SHEET_QUERY = '(max-width: 639.98px)'
const SETTLE_MS = 200

/** Whether `target` and everything up to `panel` is scrolled to its top. */
function atTop(target: Element | null, panel: HTMLElement): boolean {
  for (let node = target; node; node = node.parentElement) {
    if (node.scrollTop > 0) return false
    if (node === panel) return true
  }
  return panel.scrollTop <= 0
}

/**
 * **Pull a sheet down to close it** (lib/sheetDrag.ts). A touch that moves
 * down on the sheet's handle (marked `data-sheet-handle`), or anywhere on the
 * sheet while its content is scrolled to the top, takes the sheet with the
 * finger; letting go far enough down, or with a flick, slides it off and
 * calls `onClose`, and anything less puts it back. Only on a phone, where the
 * popup is a sheet; a text field, a slider or anything marked
 * `data-no-sheet-drag` keeps its own touches.
 *
 * `backdrop`, when the dimmed page is its own element, fades with the pull.
 */
export function useDragToClose(
  panel: RefObject<HTMLElement | null>,
  onClose: () => void,
  { backdrop, enabled = true }: { backdrop?: RefObject<HTMLElement | null>; enabled?: boolean } = {},
): void {
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    const el = panel.current
    if (!el || !enabled) return

    let tracking = false
    let dragging = false
    let onHandle = false
    let top = true
    let start = { x: 0, y: 0 }
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

    const onStart = (e: TouchEvent) => {
      tracking = false
      dragging = false
      if (e.touches.length !== 1) return
      if (!window.matchMedia(SHEET_QUERY).matches) return
      const target = e.target as Element | null
      if (!target || target.closest('input, textarea, select, [contenteditable="true"], [role="slider"], [data-no-sheet-drag]')) return
      const t = e.touches[0]
      tracking = true
      onHandle = !!target.closest('[data-sheet-handle]')
      top = atTop(target, el)
      start = { x: t.clientX, y: t.clientY }
      offset = 0
      samples = [{ t: e.timeStamp, y: t.clientY }]
    }

    const onMove = (e: TouchEvent) => {
      if (!tracking) return
      if (e.touches.length !== 1) { tracking = false; return }
      const t = e.touches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (!dragging) {
        if (startsDrag(dx, dy, top, onHandle)) {
          dragging = true
          start = { x: t.clientX, y: t.clientY - DRAG_SLOP }
        } else {
          // Past the slop in any other direction: the content scrolls as usual.
          if (Math.abs(dx) > DRAG_SLOP || Math.abs(dy) > DRAG_SLOP) tracking = false
          return
        }
      }
      if (e.cancelable) e.preventDefault()
      offset = dragOffset(t.clientY - start.y)
      samples.push({ t: e.timeStamp, y: t.clientY })
      if (samples.length > 12) samples = samples.slice(-6)
      place(offset, false)
    }

    const onEnd = (e: TouchEvent) => {
      if (!tracking) return
      tracking = false
      if (!dragging) return
      dragging = false
      const recent = samples.filter(s => e.timeStamp - s.t <= 100)
      const first = recent[0] ?? samples[samples.length - 1]
      const last = samples[samples.length - 1]
      const velocity = last && first && last.t > first.t ? (last.y - first.y) / (last.t - first.t) : 0
      if (closesOnRelease(offset, el.offsetHeight, velocity)) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          close.current()
          return
        }
        place(el.offsetHeight + 40, true)
        timer = window.setTimeout(() => {
          close.current()
          // Still on screen (the caller kept it open): put it back.
          requestAnimationFrame(() => { if (el.isConnected) reset() })
        }, SETTLE_MS)
      } else {
        place(0, true)
        timer = window.setTimeout(reset, SETTLE_MS)
      }
    }

    const opts = { passive: false } as const
    el.addEventListener('touchstart', onStart, opts)
    el.addEventListener('touchmove', onMove, opts)
    el.addEventListener('touchend', onEnd, opts)
    el.addEventListener('touchcancel', onEnd, opts)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
      window.clearTimeout(timer)
    }
  }, [panel, backdrop, enabled])
}
