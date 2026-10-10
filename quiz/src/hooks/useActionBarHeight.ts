import { useEffect, type RefObject } from 'react'

/**
 * Publishes the height of a fixed bottom action bar as `--action-bar-height`
 * on the document root, for the whole time that bar is mounted.
 *
 * Two things need this number and neither can know it statically, because the
 * bar grows and shrinks with its contents (the quiz builder's bar gains a deck
 * card, a sitting selector, a plan badge):
 *
 * 1. The page underneath, so its bottom padding clears the bar exactly instead
 *    of reserving a hard-coded guess and either clipping the last row or
 *    leaving a hole.
 * 2. Anything else parked in that corner — the onboarding launcher
 *    (`components/OnboardingTour.tsx`) sat directly on top of the quiz
 *    builder's Start button before this existed.
 *
 * The variable is absent (and reads as its `0px` fallback) on pages with no
 * action bar, so consumers can offset by it unconditionally.
 */
/**
 * The bar whose height the variable holds now. Two bars can be up at once for
 * a moment — Actuaria's tab bar standing down as a battle's action bar takes the
 * foot of the screen — and the one leaving must not clear the one arriving.
 */
let owner: object | null = null

export function useActionBarHeight(ref: RefObject<HTMLElement | null>, active = true) {
  useEffect(() => {
    const root = document.documentElement
    const el = ref.current

    if (!active || !el) {
      if (owner === null) root.style.removeProperty('--action-bar-height')
      return
    }

    const me = {}
    owner = me
    // What the page has to keep clear is everything from the bar's top edge to
    // the bottom of the window — the bar, and anything the browser keeps under
    // it (a phone browser's toolbar can sit between a `bottom-0` bar and the
    // window's edge). Measured rather than taken as the bar's own height, so a
    // page scrolled to its end shows its last row above the bar, not under it.
    const publish = () => {
      if (owner !== me) return
      const rect = el.getBoundingClientRect()
      const below = document.documentElement.clientHeight - rect.top
      const reserve = Math.max(rect.height, below > 0 ? below : 0)
      root.style.setProperty('--action-bar-height', `${Math.round(reserve)}px`)
    }
    const observer = new ResizeObserver(publish)
    observer.observe(el)
    window.addEventListener('resize', publish)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', publish)
      if (owner !== me) return
      owner = null
      root.style.removeProperty('--action-bar-height')
    }
  }, [ref, active])
}
