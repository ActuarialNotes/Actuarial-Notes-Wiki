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
export function useActionBarHeight(ref: RefObject<HTMLElement | null>, active = true) {
  useEffect(() => {
    const root = document.documentElement
    const el = ref.current

    if (!active || !el) {
      root.style.removeProperty('--action-bar-height')
      return
    }

    const observer = new ResizeObserver(entries => {
      const height = entries[0]?.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight
      root.style.setProperty('--action-bar-height', `${Math.round(height)}px`)
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      root.style.removeProperty('--action-bar-height')
    }
  }, [ref, active])
}
