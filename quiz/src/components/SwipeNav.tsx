import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePlaceLinks } from '@/components/nav/Places'
import { showsPlaceBar } from '@/lib/places'
import { inEdgeGutter, neighbourPlace, SWIPE_EVENT, swipeDirection, type SwipeDirection } from '@/lib/swipeNav'

/** Where the place bar is drawn: a phone or a narrow window. */
const PHONE = '(max-width: 1023.98px)'
/** Things that use a sideways drag themselves, and anything laid over the page. */
const OWN_SWIPES = [
  'input', 'textarea', 'select', '[contenteditable="true"]', '[role="slider"]', '[role="dialog"]',
  '[aria-modal="true"]', '[data-own-keys]', '[data-no-swipe]', '[data-sheet-handle]', 'canvas',
  '.concept-popup-aside', '.paper-scrim',
].join(', ')

/** Can anything from `target` up scroll sideways? Then the swipe is its scroll. */
function scrollsSideways(target: Element): boolean {
  for (let node: Element | null = target; node && node !== document.body; node = node.parentElement) {
    if (node.scrollWidth > node.clientWidth + 1) {
      const overflow = getComputedStyle(node).overflowX
      if (overflow === 'auto' || overflow === 'scroll') return true
    }
  }
  return false
}

/**
 * **A swipe moves the desk** (lib/swipeNav.ts). On a phone, a sideways swipe
 * on a page with the place bar goes to the place beside it; on any other page
 * it is announced as `SWIPE_EVENT`, which the quiz answers by turning the
 * question. A swipe that starts on something scrolling sideways, a field, a
 * slider or an open sheet is left to it. Mounted once, beside the place bar.
 */
export default function SwipeNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const links = usePlaceLinks()
  const latest = useRef({ pathname, links, navigate })
  latest.current = { pathname, links, navigate }

  useEffect(() => {
    let start: { x: number; y: number; t: number; scroll: number } | null = null

    const onStart = (e: TouchEvent) => {
      start = null
      if (e.touches.length !== 1 || !window.matchMedia(PHONE).matches) return
      const touch = e.touches[0]
      const target = e.target
      if (!(target instanceof Element) || inEdgeGutter(touch.clientX, window.innerWidth)) return
      if (target.closest(OWN_SWIPES) || scrollsSideways(target)) return
      start = { x: touch.clientX, y: touch.clientY, t: e.timeStamp, scroll: window.scrollY }
    }
    const onMove = (e: TouchEvent) => { if (e.touches.length !== 1) start = null }
    const onEnd = (e: TouchEvent) => {
      const began = start
      start = null
      const touch = e.changedTouches[0]
      if (!began || !touch || e.touches.length > 0) return
      // A page that scrolled under the finger was being read, not swiped.
      if (Math.abs(window.scrollY - began.scroll) > 12) return
      if (window.getSelection()?.toString()) return
      const direction = swipeDirection(touch.clientX - began.x, touch.clientY - began.y, e.timeStamp - began.t)
      if (!direction) return
      const { pathname: path, links: places, navigate: go } = latest.current
      if (showsPlaceBar(path)) {
        const next = neighbourPlace(places.find(p => p.current)?.id ?? null, direction)
        const to = places.find(p => p.id === next)?.to
        if (to) go(to)
        return
      }
      window.dispatchEvent(new CustomEvent<SwipeDirection>(SWIPE_EVENT, { detail: direction }))
    }
    const onCancel = () => { start = null }

    const passive = { passive: true } as const
    document.addEventListener('touchstart', onStart, passive)
    document.addEventListener('touchmove', onMove, passive)
    document.addEventListener('touchend', onEnd, passive)
    document.addEventListener('touchcancel', onCancel, passive)
    return () => {
      document.removeEventListener('touchstart', onStart)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onEnd)
      document.removeEventListener('touchcancel', onCancel)
    }
  }, [])

  return null
}
