import { useEffect } from 'react'

// The first-load screen is plain HTML in index.html (#boot, the development
// triangle), drawn before any bundle arrives. It fills one diagonal per step of
// the boot; the steps after the app's code has loaded are reported from here
// through `window.__boot`. The last one, "page", waits until no route fallback
// (`PageLoading`) is on screen, so the triangle lifts onto a page rather than
// onto a loading mark.

type BootStep = 'start' | 'session' | 'drawn' | 'page'

declare global {
  interface Window { __boot?: (step: BootStep) => void }
}

/** Mark a step of the boot done (and every step before it). A no-op once the screen has lifted. */
export function bootStep(step: BootStep) {
  window.__boot?.(step)
}

let holds = 0
let drawn = false
// A page that never stops loading still gets the screen out of the way.
const GIVE_UP_MS = 10_000

function settle() {
  if (drawn && holds === 0) bootStep('page')
}

/** Held by a route fallback while it is on screen: the first page isn't ready yet. */
export function useBootHold() {
  useEffect(() => {
    holds++
    return () => {
      holds--
      settle()
    }
  }, [])
}

/** Rendered beside the app: the app has committed its first render. */
export function BootDone() {
  useEffect(() => {
    drawn = true
    bootStep('drawn')
    settle()
    const timer = window.setTimeout(() => bootStep('page'), GIVE_UP_MS)
    return () => window.clearTimeout(timer)
  }, [])
  return null
}
