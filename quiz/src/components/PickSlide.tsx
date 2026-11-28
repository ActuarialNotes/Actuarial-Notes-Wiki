import { useEffect } from 'react'
import { motionAllowed } from '@/lib/viewTransition'
import { isClearColor, isOn, movedPicks, PICK_ATTRIBUTES, type PickChange } from '@/lib/pickSlide'

const SLIDE_MS = 240
const EASE = 'cubic-bezier(0.25, 0.6, 0.3, 1)'
/** A set that keeps its picks where they are: mark it, or any ancestor, `data-pick-slide="none"`. */
const OPT_OUT = '[data-pick-slide="none"]'

const running = new WeakMap<Element, () => void>()

/** Slide the fill of `to` from where `from` stands, inside the parent they share. */
function slide(from: HTMLElement, to: HTMLElement) {
  const parent = to.parentElement
  if (!parent || typeof to.animate !== 'function' || to.closest(OPT_OUT)) return
  running.get(parent)?.()

  // Both usually fade their colours; read where each ends up, not where the fade starts.
  const fromTransition = from.style.transition
  const toTransition = to.style.transition
  from.style.transition = 'none'
  to.style.transition = 'none'
  const look = getComputedStyle(to)
  const fill = look.backgroundColor
  const a = from.getBoundingClientRect()
  const b = to.getBoundingClientRect()
  if (isClearColor(fill) || !a.width || !a.height || !b.width || !b.height) {
    from.style.transition = fromTransition
    to.style.transition = toTransition
    return
  }

  const frame = parent.getBoundingClientRect()
  const x = -frame.left - parent.clientLeft + parent.scrollLeft
  const y = -frame.top - parent.clientTop + parent.scrollTop
  const parentPosition = parent.style.position
  const parentIsolation = parent.style.isolation
  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative'
  parent.style.isolation = 'isolate'

  const ghost = document.createElement('span')
  ghost.setAttribute('aria-hidden', 'true')
  ghost.style.cssText = `position:absolute;z-index:-1;pointer-events:none;margin:0;background:${fill};border-radius:${look.borderRadius};`
  parent.appendChild(ghost)
  const toFill = to.style.backgroundColor
  to.style.backgroundColor = 'transparent'

  let done = false
  const finish = () => {
    if (done) return
    done = true
    running.delete(parent)
    ghost.remove()
    to.style.backgroundColor = toFill
    // Settle the fill before the fade is handed back, or it would fade in again.
    void getComputedStyle(to).backgroundColor
    from.style.transition = fromTransition
    to.style.transition = toTransition
    parent.style.position = parentPosition
    parent.style.isolation = parentIsolation
  }
  running.set(parent, finish)
  const box = (r: DOMRect) => ({
    left: `${r.left + x}px`, top: `${r.top + y}px`, width: `${r.width}px`, height: `${r.height}px`,
  })
  const animation = ghost.animate([box(a), box(b)], { duration: SLIDE_MS, easing: EASE, fill: 'both' })
  animation.onfinish = finish
  animation.oncancel = finish
}

/**
 * **The pick slides** (lib/pickSlide.ts): one listener for the whole app.
 * When the chosen one of a set changes, its fill travels from the old choice
 * to the new one. It reads the ARIA attributes the controls already carry, so
 * no control opts in. Mounted once in `App`.
 */
export default function PickSlide() {
  useEffect(() => {
    if (typeof MutationObserver !== 'function') return
    const observer = new MutationObserver(records => {
      if (!motionAllowed()) return
      const changes: PickChange<HTMLElement, Element>[] = []
      for (const record of records) {
        const target = record.target
        if (!(target instanceof HTMLElement) || !record.attributeName || !target.isConnected) continue
        const on = isOn(target.getAttribute(record.attributeName))
        if (on === isOn(record.oldValue)) continue
        changes.push({ target, parent: target.parentElement, on })
      }
      for (const { from, to } of movedPicks(changes)) slide(from, to)
    })
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: [...PICK_ATTRIBUTES],
    })
    return () => observer.disconnect()
  }, [])
  return null
}
