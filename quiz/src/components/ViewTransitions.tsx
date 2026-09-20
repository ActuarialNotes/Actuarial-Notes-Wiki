import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isPlainLeftClick,
  linkTargetPath,
  shouldTransitionTo,
  startViewTransition,
} from '@/lib/viewTransition'

/**
 * The one delegated click listener that turns a tab switch into a **view
 * transition** — the same shape as `SoundEffects`, `MathFocus` and
 * `ImageFocus`: mounted once in `App`, nothing else has to opt a link in
 * beyond marking it.
 *
 * A link opts in with `data-view-transition`. On a plain left click we take
 * the navigation over: `preventDefault` before React sees the event, which is
 * what makes React Router's own handler stand down (it checks
 * `defaultPrevented`), while the link's `onClick` — closing the mobile drawer,
 * say — still runs. Then the route change happens inside
 * `document.startViewTransition`, so the browser can tween every element the
 * two pages share (`lib/viewTransition.ts` hands out the names) and cross-fade
 * the rest.
 *
 * Two details are load-bearing:
 *
 * - **`flushSync`.** The transition snapshots the DOM the moment the callback
 *   returns. A React 18 update is concurrent by default, so without flushing
 *   it the "after" snapshot is taken before the new page exists and the
 *   animation is a cross-fade of the old page with itself.
 * - **The preload.** The wiki routes are `lazy()`, so flushing straight into
 *   one renders its Suspense fallback — the transition would morph the exam
 *   card into a spinner. `preload` warms the chunk first and the transition
 *   starts once it resolves.
 */
export default function ViewTransitions({
  preload,
}: {
  /** Warms the chunks a path needs, or returns null when it needs none. */
  preload?: (path: string) => Promise<unknown> | null
}) {
  const navigate = useNavigate()
  const location = useLocation()

  // Read at click time, not at bind time: the listener is bound once and the
  // location changes underneath it.
  const currentPath = useRef('')
  currentPath.current = `${location.pathname}${location.search}${location.hash}`

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!isPlainLeftClick(e)) return
      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[data-view-transition]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      // A link that opens elsewhere or saves a file is not a navigation.
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const to = linkTargetPath(anchor.getAttribute('href'), window.location.origin)
      if (!to || !shouldTransitionTo(currentPath.current, to)) return

      // From here the navigation is ours. Stand React Router's link handler
      // down without stopping the event, so the link's own onClick still runs.
      e.preventDefault()

      const run = () => startViewTransition(() => flushSync(() => navigate(to)))
      const pending = preload?.(to)
      if (pending) pending.then(run, run)
      else run()
    }

    // Capture, so `defaultPrevented` is already set by the time React's
    // delegated handler at the root container sees the click.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate, preload])

  return null
}
