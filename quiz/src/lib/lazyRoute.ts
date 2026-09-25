import { createElement, lazy, useRef, type ComponentType } from 'react'

/**
 * `React.lazy`, plus a `preload` that makes the next render **synchronous**.
 *
 * A `lazy()` component suspends on its first render even when its chunk has
 * already arrived: React only learns the import resolved a microtask after it
 * asks, so it commits the Suspense fallback first. For a page change drawn as
 * a view transition that one frame is the whole problem — the transition
 * snapshots the new page as it commits, so it captures a spinner, and an exam
 * card on the arriving page has nothing to be carried to (see
 * `lib/viewTransition.ts`). Once `preload` has resolved, this renders the
 * module's own component directly and nothing suspends.
 *
 * Which of the two a mounted page renders is fixed when it mounts: switching
 * from the lazy wrapper to the module's component mid-life would be a new
 * element type, and would remount the page.
 */
export function lazyRoute<P extends object>(load: () => Promise<{ default: ComponentType<P> }>) {
  let loaded: ComponentType<P> | null = null
  const preload = () => load().then(mod => {
    loaded = mod.default
    return mod
  })
  const Lazy = lazy(preload) as unknown as ComponentType<P>

  function LazyRoute(props: P) {
    const direct = useRef(loaded).current
    return createElement(direct ?? Lazy, props)
  }

  return { Component: LazyRoute, preload }
}
