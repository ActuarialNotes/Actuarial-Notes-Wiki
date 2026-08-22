import type { WikiEntryRef } from '@/lib/wikiRoutes'

/**
 * How far down each page of the concept popup's stack has been read.
 *
 * Only the open page of the stack is mounted, so folding one into its title bar
 * unmounts its `ConceptPagePanel` — that is what keeps one page's state from
 * leaking into the next, but it would also throw away the reader's place. This
 * module is where that one piece of state outlives the mount, which is what
 * makes a folded page's bar a way *back* to the page rather than a way to load
 * it again.
 *
 * Module state rather than store state: nothing outside the popup reads it, it
 * never needs to drive a render, and it lives exactly as long as one popup
 * session (`clearPageScrollMemory` on close — the trail those offsets belong to
 * is gone with it).
 *
 * Offsets are recorded as the page *scrolls*, never on the way out: by the time
 * a `useEffect` cleanup runs during an unmount React has already detached the
 * body, and a detached element's `scrollTop` reads 0.
 */

const offsets = new Map<string, number>()

function key(ref: WikiEntryRef): string {
  return `${ref.kind}:${ref.name.toLowerCase()}`
}

/** Record where a page is scrolled to. A page at the top is simply forgotten. */
export function rememberPageScroll(ref: WikiEntryRef, top: number): void {
  if (top > 0) offsets.set(key(ref), top)
  else offsets.delete(key(ref))
}

/** Where this page was left, or 0 for one that hasn't been read yet. */
export function recallPageScroll(ref: WikiEntryRef): number {
  return offsets.get(key(ref)) ?? 0
}

/** Forget every remembered position — called when the popup closes. */
export function clearPageScrollMemory(): void {
  offsets.clear()
}
