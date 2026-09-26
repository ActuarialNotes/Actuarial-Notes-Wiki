import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory, type BrowserHistory, type Location, type Action } from '@remix-run/router'
import { canTransition, carriesExams, isPageMove, paperMove, startViewTransition } from '@/lib/viewTransition'

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
 * Four details are load-bearing:
 *
 * - **`flushSync`.** A transition snapshots the page the moment its callback
 *   returns. A React 18 update is otherwise deferred, so the "after" picture
 *   would be taken before the new page existed.
 * - **The preload.** The wiki and Cowork routes are `lazy()`, so flushing
 *   straight into one draws its Suspense spinner and slides *that* in. The
 *   route's chunk is warmed first and the transition starts once it has come.
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
          flushSync(() => {
            // A new page opens at its top. Back and Forward leave the scroll
            // to the page (the wiki restores its own), and a hash to the browser.
            if (action === 'PUSH' && !location.hash) window.scrollTo(0, 0)
            setState(next)
          })
        }, {
          paper: move,
          carry: carriesExams(from.pathname, location.pathname),
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
  }, [history])

  return (
    <Router location={state.location} navigationType={state.action} navigator={history}>
      {children}
    </Router>
  )
}

/**
 * Where the page's sheet starts: the left edge of `<main>`, which is the
 * sidebar's width on a desktop and 0 on a phone, where the sidebar is a drawer.
 */
function sheetInset(): number {
  const main = document.querySelector('main')
  return main ? main.getBoundingClientRect().left : 0
}
