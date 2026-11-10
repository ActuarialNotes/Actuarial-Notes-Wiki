import { useEffect, type RefObject } from 'react'
import { dragAxis, momentumStep, onAxis, releaseVelocity, type ScrollAxis, type TouchSample } from '@/lib/touchScroll'

/**
 * **A finger scrolls the spreadsheet, not the page** (lib/touchScroll.ts).
 *
 * Fortune-sheet's own touch scrolling lurches, re-renders on every touch event
 * and lets the page behind pan along with it. This takes the grid's touches
 * first (capture phase, so Fortune-sheet's handler never sees them), moves its
 * two scrollbar elements at most once a frame, and carries a flick on with
 * momentum. A tap is left alone, so it still selects the cell.
 *
 * `root` is the element the Workbook is mounted in.
 */
export function useSheetTouchScroll(root: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = root.current
    if (!el) return

    let scrollX: HTMLElement | null = null
    let scrollY: HTMLElement | null = null
    let tracking = false
    let start = { x: 0, y: 0 }
    let last = { x: 0, y: 0 }
    let axis: ScrollAxis | null = null
    let samples: TouchSample[] = []
    let pending = { dx: 0, dy: 0 }
    let frame = 0
    let momentum = 0

    const flush = () => {
      frame = 0
      if (scrollX && pending.dx) scrollX.scrollLeft -= pending.dx
      if (scrollY && pending.dy) scrollY.scrollTop -= pending.dy
      pending = { dx: 0, dy: 0 }
    }
    const stopMomentum = () => {
      cancelAnimationFrame(momentum)
      momentum = 0
    }
    const glide = (vx: number, vy: number) => {
      let then = performance.now()
      const step = (now: number) => {
        const next = momentumStep(vx, vy, now - then)
        then = now
        if (!next) { momentum = 0; return }
        vx = next.vx
        vy = next.vy
        if (scrollX) scrollX.scrollLeft -= next.dx
        if (scrollY) scrollY.scrollTop -= next.dy
        momentum = requestAnimationFrame(step)
      }
      momentum = requestAnimationFrame(step)
    }

    const onStart = (e: TouchEvent) => {
      stopMomentum()
      tracking = false
      if (e.touches.length !== 1) return
      const target = e.target as Element | null
      if (!target?.closest('.fortune-sheet-overlay')) return
      // Editing a cell, dragging a selection handle, or inside a menu or
      // dialog: those keep their own touches.
      if (target.closest(
        'input, textarea, [contenteditable="true"], .luckysheet-cs-touchhandle, .fortune-context-menu, .fortune-dialog, .luckysheet-input-box',
      )) return
      scrollX = el.querySelector<HTMLElement>('.luckysheet-scrollbar-x')
      scrollY = el.querySelector<HTMLElement>('.luckysheet-scrollbar-y')
      if (!scrollX && !scrollY) return
      const t = e.touches[0]
      tracking = true
      start = { x: t.clientX, y: t.clientY }
      last = start
      axis = null
      samples = [{ t: e.timeStamp, x: t.clientX, y: t.clientY }]
      e.stopPropagation()
    }

    const onMove = (e: TouchEvent) => {
      if (!tracking) return
      if (e.touches.length !== 1) { tracking = false; return }
      e.stopPropagation()
      if (e.cancelable) e.preventDefault()
      const t = e.touches[0]
      axis ??= dragAxis(t.clientX - start.x, t.clientY - start.y)
      if (!axis) return
      const move = onAxis(axis, t.clientX - last.x, t.clientY - last.y)
      last = { x: t.clientX, y: t.clientY }
      samples.push({ t: e.timeStamp, x: t.clientX, y: t.clientY })
      if (samples.length > 20) samples = samples.slice(-10)
      pending = { dx: pending.dx + move.dx, dy: pending.dy + move.dy }
      if (!frame) frame = requestAnimationFrame(flush)
    }

    const onEnd = (e: TouchEvent) => {
      if (!tracking) return
      tracking = false
      e.stopPropagation()
      if (!axis) return // a tap: let it select the cell
      if (e.cancelable) e.preventDefault()
      if (frame) { cancelAnimationFrame(frame); flush() }
      const v = releaseVelocity(samples, e.timeStamp)
      const { dx: vx, dy: vy } = onAxis(axis, v.vx, v.vy)
      glide(vx, vy)
    }

    const capture = { capture: true, passive: false } as const
    el.addEventListener('touchstart', onStart, capture)
    el.addEventListener('touchmove', onMove, capture)
    el.addEventListener('touchend', onEnd, capture)
    el.addEventListener('touchcancel', onEnd, capture)
    return () => {
      el.removeEventListener('touchstart', onStart, capture)
      el.removeEventListener('touchmove', onMove, capture)
      el.removeEventListener('touchend', onEnd, capture)
      el.removeEventListener('touchcancel', onEnd, capture)
      cancelAnimationFrame(frame)
      stopMomentum()
    }
  }, [root])
}

/** Whether anything between `target` and `boundary` can scroll on its own. */
function scrollsInside(target: Element | null, boundary: Element): boolean {
  for (let node = target; node && node !== boundary; node = node.parentElement) {
    if (node.matches('input, textarea, [contenteditable="true"]')) return true
    const style = getComputedStyle(node)
    const y = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight
    const x = /(auto|scroll)/.test(style.overflowX) && node.scrollWidth > node.clientWidth
    if (x || y) return true
  }
  return false
}

/**
 * **A panel over the page keeps its touches.** A drag on a fixed panel's
 * header, toolbar or footer would otherwise pan the page underneath it. Lists
 * that scroll inside the panel, and text fields, still get theirs.
 */
export function useContainTouches(pane: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = pane.current
    if (!el) return
    const onMove = (e: TouchEvent) => {
      if (e.defaultPrevented || !e.cancelable) return
      if (!scrollsInside(e.target as Element | null, el)) e.preventDefault()
    }
    el.addEventListener('touchmove', onMove, { passive: false })
    return () => el.removeEventListener('touchmove', onMove)
  }, [pane])
}
