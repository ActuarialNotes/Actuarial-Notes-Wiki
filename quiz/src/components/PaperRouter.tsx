import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory, type BrowserHistory, type Location, type Action } from '@remix-run/router'
import { canTransition, isPageMove, paperMove, sheetInset, startViewTransition } from '@/lib/viewTransition'
import { arrivalScroll, loadScrollMemory, rememberScroll, saveScrollMemory, type ScrollMemory } from '@/lib/routeScrollMemory'

function sessionStore(): Storage | undefined {
  try { return window.sessionStorage } catch { return undefined }
}

/** Gives up on a restore that hasn't landed by then — the page never grew tall enough. */
const RESTORE_TIMEOUT_MS = 3000
/** Frames a restore must hold for before it is left to the page. */
const RESTORE_SETTLE_FRAMES = 10
const TAKE_OVER = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
let cancelRestore: (() => void) | null = null

/**
 * Scroll the window to `top`, and hold it there while the page settles. A page
 * coming back often renders its content a few frames after it mounts, so it
 * can be too short to get there at first; and chrome the page before it set
 * (an exam's banner over the wiki) is cleared a frame later, which the
 * browser's scroll anchoring answers by moving the window. Stops once the
 * position has held for a few frames, on timeout, or the moment the reader
 * scrolls for themselves.
 */
function scrollToSettled(top: number) {
  cancelRestore?.()
  cancelRestore = null
  window.scrollTo({ top, behavior: 'instant' })
  if (top === 0) return

  const started = performance.now()
  let frame = 0
  let held = 0
  const stop = () => {
    cancelAnimationFrame(frame)
    for (const type of TAKE_OVER) window.removeEventListener(type, stop, true)
    if (cancelRestore === stop) cancelRestore = null
  }
  const tick = () => {
    if (Math.abs(window.scrollY - top) <= 1) held++
    else {
      held = 0
      window.scrollTo({ top, behavior: 'instant' })
    }
    if (held >= RESTORE_SETTLE_FRAMES || performance.now() - started > RESTORE_TIMEOUT_MS) stop()
    else frame = requestAnimationFrame(tick)
  }
  for (const type of TAKE_OVER) window.addEventListener(type, stop, { capture: true, passive: true })
  cancelRestore = stop
  frame = requestAnimationFrame(tick)
}

/**
 * `BrowserRouter`, with every change of page drawn as **paper on a desk** —
 * see `lib/viewTransition.ts` for the moves and `index.css` for how they look.
 *
 * It is `BrowserRouter`'s own few lines (one browser history, its location in
 * state, a `<Router>` over it) with the history's listener wrapped, which is
 * why nothing in the app has to opt in: a sidebar link, a `<Link>` in a card,
 * a `navigate()` after a quiz is submitted and the browser's Back button all
 * arrive here as the same history update.
 *
 * It also keeps the reader's place: the window's position is recorded as each
 * page is left and put back when Back or Forward returns to it
 * (`lib/routeScrollMemory.ts` decides; the browser's own restoration is off).
 *
 * Four details are load-bearing:
 *
 * - **`flushSync`.** A transition snapshots the page the moment its callback
 *   returns. A React 18 update is otherwise deferred, so the "after" picture
 *   would be taken before the new page existed.
 * - **The preload.** The wiki and Cowork routes are `lazy()`, so flushing
 *   straight into one draws its Suspense spinner and slides *that* in. The
 *   route's chunk is warmed first and the transition starts once it has come
 *   — and warmed earlier still, as the pointer reaches the link, so the click
 *   doesn't wait on a download.
 * - **The newest update wins.** Every update takes a ticket; a transition that
 *   comes up after a newer update has already landed does nothing, so a slow
 *   chunk can never pull the reader back to the page they clicked past.
 * - **A gesture already animated Back.** Safari's edge swipe and Chrome's
 *   predictive back draw their own transition before `popstate` fires
 *   (`hasUAVisualTransition`); sliding the page again after it would show the
 *   move twice.
 */
export default function PaperRouter({
  children,
  preload,
}: {
  children: ReactNode
  /** Warms the chunks a path needs, or returns null when it needs none. */
  preload?: (path: string) => Promise<unknown> | null
}) {
  const historyRef = useRef<BrowserHistory>()
  if (!historyRef.current) historyRef.current = createBrowserHistory({ v5Compat: true })
  const history = historyRef.current

  const [state, setState] = useState<{ action: Action; location: Location }>({
    action: history.action,
    location: history.location,
  })

  const memoryRef = useRef<ScrollMemory>()
  if (!memoryRef.current) memoryRef.current = loadScrollMemory(sessionStore())
  // The location on screen — which, while a chunk loads, is not the latest
  // one the history has reported.
  const shownRef = useRef<Location | null>(null)

  const remember = useCallback((location: Location) => {
    memoryRef.current = rememberScroll(memoryRef.current!, location, window.scrollY)
    saveScrollMemory(sessionStore(), memoryRef.current)
  }, [])

  // The browser would restore on `popstate`, before the page it is restoring
  // has rendered. A reload or leaving the app records where the page was.
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const onPageHide = () => { if (shownRef.current) remember(shownRef.current) }
    window.addEventListener('pagehide', onPageHide)
    return () => {
      window.history.scrollRestoration = previous
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [remember])

  // Each page arrives where it should be: in a transition this runs inside the
  // `flushSync` below, so the arriving sheet is already in place when its
  // picture is taken.
  useLayoutEffect(() => {
    const from = shownRef.current
    shownRef.current = state.location
    const top = arrivalScroll(memoryRef.current!, from, state.location, state.action)
    if (top !== null) scrollToSettled(top)
  }, [state])

  // Read at update time, not at bind time: the listener is bound once.
  const preloadRef = useRef(preload)
  preloadRef.current = preload

  useLayoutEffect(() => {
    let ticket = 0
    // Where the reader is headed as of the latest update — not the rendered
    // location, which lags behind while a chunk loads.
    let heading = history.location
    let gestureDrewBack = false

    // Added before `history.listen` adds its own, so it has run by the time
    // the update below is handed over.
    const onPopState = (e: PopStateEvent) => {
      gestureDrewBack = (e as PopStateEvent & { hasUAVisualTransition?: boolean }).hasUAVisualTransition === true
    }
    window.addEventListener('popstate', onPopState)

    const unlisten = history.listen(({ action, location, delta }) => {
      // First, before anything moves: where the page being left was read to.
      if (shownRef.current) remember(shownRef.current)
      const mine = ++ticket
      const from = heading
      heading = location
      const next = { action, location }

      const byGesture = action === 'POP' && gestureDrewBack
      gestureDrewBack = false
      const move = byGesture ? null : paperMove(from.pathname, location.pathname, action, delta)

      if (!move || !canTransition()) {
        setState(next)
        return
      }

      const run = () => {
        if (mine !== ticket) return
        startViewTransition(() => {
          // A newer update landed while this one waited for its snapshot.
          if (mine !== ticket) return
          // The scroll is set by the layout effect above, as the page commits.
          flushSync(() => setState(next))
        }, {
          paper: move,
          inset: isPageMove(move) ? sheetInset() : 0,
          fallback: () => { if (mine === ticket) setState(next) },
        })
      }

      const path = `${location.pathname}${location.search}${location.hash}`
      const pending = preloadRef.current?.(path)
      if (pending) pending.then(run, run)
      else run()
    })

    return () => {
      unlisten()
      window.removeEventListener('popstate', onPopState)
    }
  }, [history, remember])

  // Warm a route's chunk the moment the reader shows intent — a pointer over a
  // link, focus on one — rather than when they click. The page is frozen from
  // the click until the new page has rendered (the transition holds the old
  // picture on screen until then), so a chunk still downloading at the click
  // is a pause the reader sees before anything moves.
  useEffect(() => {
    const onIntent = (e: Event) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || anchor.origin !== window.location.origin) return
      preloadRef.current?.(anchor.pathname)?.catch(() => { /* retried on the click */ })
    }
    document.addEventListener('pointerover', onIntent, { capture: true, passive: true })
    document.addEventListener('focusin', onIntent, true)
    return () => {
      document.removeEventListener('pointerover', onIntent, true)
      document.removeEventListener('focusin', onIntent, true)
    }
  }, [])

  return (
    <Router location={state.location} navigationType={state.action} navigator={history}>
      {children}
    </Router>
  )
}
