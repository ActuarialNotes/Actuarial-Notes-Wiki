import { useEffect } from 'react'

/**
 * Hold the page still while something is laid over it (a search's results):
 * a list that scrolls over a page that also scrolls sends every other swipe
 * to the wrong one. The scrollbar's width is kept as padding, so the page
 * under the overlay doesn't jump sideways when the bar goes.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return
    const { body, documentElement: root } = document
    const overflow = body.style.overflow
    const paddingRight = body.style.paddingRight
    const bar = window.innerWidth - root.clientWidth
    body.style.overflow = 'hidden'
    if (bar > 0) body.style.paddingRight = `${bar}px`
    return () => {
      body.style.overflow = overflow
      body.style.paddingRight = paddingRight
    }
  }, [active])
}
