import { useEffect } from 'react'
import { motionAllowed } from '@/lib/viewTransition'

// A dialog, a sheet, a menu and the reader's pane are each drawn arriving
// (`paper-scrim`, `paper-drop`, `concept-popup-aside` in index.css). Closing
// one unmounts it, which on screen is a cut. This draws the leaving too,
// without any of them having to stay mounted for it: when one of those
// elements is taken out of the page, the element itself is put back where it
// was for the length of a short exit animation and then removed for good.
//
// What is put back is only a picture. React has let go of it, so nothing in
// it responds; it is inert, hidden from assistive technology and takes no
// clicks, and focus, keys and the page underneath went back to the reader
// when the dialog closed. Mounted once, in `App`.

const LEAVES = '.paper-scrim, .paper-fade, .paper-drop, .concept-popup-aside'
/** Longer than the longest exit in index.css, in case `animationend` never comes. */
const GONE_AFTER_MS = 320

/** Where inside the overlay the reader had scrolled to: a detached element forgets. */
type ScrollMarks = Map<Element, number>

function leaves(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && !node.dataset.paperLeaving && node.matches(LEAVES)
}

/** Dragged shut by its handle: the sheet has already been drawn sliding away. */
function alreadyGone(el: HTMLElement): boolean {
  if (el.style.transform) return true
  return Array.from(el.children).some(child => child instanceof HTMLElement && !!child.style.transform)
}

export default function OverlayExit() {
  useEffect(() => {
    if (typeof MutationObserver === 'undefined') return
    const scrolled = new WeakMap<Element, ScrollMarks>()

    // Scroll events don't bubble, but they are captured on the way down.
    const onScroll = (e: Event) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const overlay = target.closest(LEAVES)
      if (!overlay) return
      let marks = scrolled.get(overlay)
      if (!marks) scrolled.set(overlay, (marks = new Map()))
      marks.set(target, target.scrollTop)
    }
    document.addEventListener('scroll', onScroll, { capture: true, passive: true })

    const observer = new MutationObserver(records => {
      // A page move has its own picture of what is leaving, and a reader who
      // asked for less motion gets none here either.
      if (document.documentElement.dataset.paper || !motionAllowed()) return
      // An overlay swapped for another in the same place (a menu stepping to
      // its next level) is a change of content, not a closing.
      const replaced = new Set<Node>()
      for (const record of records) {
        if (Array.from(record.addedNodes).some(leaves)) replaced.add(record.target)
      }
      for (const record of records) {
        if (replaced.has(record.target)) continue
        for (const node of record.removedNodes) {
          // Moved, not removed, or its parent went with it.
          if (!leaves(node) || node.isConnected) continue
          const parent = record.target
          if (!(parent instanceof Element) || !parent.isConnected) continue
          if (alreadyGone(node)) continue

          node.dataset.paperLeaving = 'true'
          node.inert = true
          node.setAttribute('aria-hidden', 'true')
          // A picture answers to nothing the dialog did, by name or by id.
          node.removeAttribute('data-testid')
          node.querySelectorAll('[data-testid]').forEach(el => el.removeAttribute('data-testid'))
          const before = record.nextSibling?.parentNode === parent ? record.nextSibling : null
          parent.insertBefore(node, before)
          scrolled.get(node)?.forEach((top, el) => { el.scrollTop = top })

          const done = () => {
            window.clearTimeout(timer)
            node.remove()
          }
          const timer = window.setTimeout(done, GONE_AFTER_MS)
          node.addEventListener('animationend', e => { if (e.target === node) done() })
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      document.removeEventListener('scroll', onScroll, true)
    }
  }, [])
  return null
}
