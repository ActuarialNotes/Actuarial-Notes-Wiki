import type { WikiEntryRef } from '@/lib/wikiRoutes'

/**
 * The concept popup's **page stack** — the Obsidian "stacked pages" model.
 *
 * Following a wiki link inside the popup used to swap the panel's body, which
 * lost the page you were reading: on a resource page like *An Introduction to
 * Statistical Learning*, tapping **Cross-Validation** replaced the book you
 * were half-way through. Instead a link now *pushes* a new page onto a stack.
 * The pages behind it fold up into title bars above the one being read and stay
 * one tap away, the way a stack of sheets shows its edges.
 *
 * The stack is **vertical**: the popup is a pane the width of the phone and the
 * pages fold along its short axis, so a collapsed page reads as a legible row
 * ("Calculus") rather than a sideways strip of letters. Exactly one page is
 * open at a time — height is the pane's scarce dimension, and two half-height
 * pages would leave neither readable.
 *
 * This module is the decision layer: which pages the stack holds and which one
 * is open. The rendering lives in `components/wiki/ConceptPopup.tsx` (the shell
 * + bars) and `components/wiki/ConceptPagePanel.tsx` (one page).
 *
 * The stack is a *trail*, not a history: it only ever grows by following a
 * link, and the popup rebuilds it from a single page whenever the Previous /
 * Next walk moves (see `hooks/useConceptPopup.ts`).
 */

/**
 * How many pages one stack holds, base included. Past this the oldest page
 * drops off: a trail that long has stopped being a trail, and every collapsed
 * bar costs a row of the height the page being read needs. Deep enough that the
 * usual two-or-three-link detour never loses anything.
 */
export const MAX_STACK_PAGES = 5

export interface PageStack {
  /** Oldest first; the last entry is the most recently opened page. */
  pages: WikiEntryRef[]
  /** Index of the expanded, focused page. */
  index: number
}

/** Do two refs point at the same wiki page? */
export function samePage(a: WikiEntryRef, b: WikiEntryRef): boolean {
  return a.kind === b.kind && a.name.toLowerCase() === b.name.toLowerCase()
}

/** A fresh stack holding one page — what every prev/next step resets to. */
export function openStack(ref: WikiEntryRef): PageStack {
  return { pages: [ref], index: 0 }
}

function clampIndex(pages: WikiEntryRef[], index: number): number {
  return Math.max(0, Math.min(pages.length - 1, index))
}

/**
 * Follow a link found on the page at `from`.
 *
 * Anything to the right of that page is dropped first: those pages were opened
 * *from* it, so a new link taken from the same page starts a new branch rather
 * than burying the old one. If the target is already somewhere in what remains,
 * the stack focuses it instead of opening a second copy — a page appears once.
 */
export function pushPage(stack: PageStack, from: number, ref: WikiEntryRef): PageStack {
  const at = clampIndex(stack.pages, from)
  const kept = stack.pages.slice(0, at + 1)
  const existing = kept.findIndex(p => samePage(p, ref))
  if (existing >= 0) return { pages: kept, index: existing }

  const pages = [...kept, ref]
  // Overflow drops from the oldest end, so the page just opened is always kept.
  const overflow = Math.max(0, pages.length - MAX_STACK_PAGES)
  const trimmed = pages.slice(overflow)
  return { pages: trimmed, index: trimmed.length - 1 }
}

/** Open the page at `i` (tapping its bar). Out-of-range indices are clamped. */
export function focusPage(stack: PageStack, i: number): PageStack {
  if (!stack.pages.length) return stack
  return { pages: stack.pages, index: clampIndex(stack.pages, i) }
}

/**
 * Close one page. Focus falls back to the page on its left, so closing the page
 * you are reading lands on the one you came from. Returns an empty stack when
 * the last page goes — the caller closes the popup itself.
 */
export function closePage(stack: PageStack, i: number): PageStack {
  if (i < 0 || i >= stack.pages.length) return stack
  const pages = stack.pages.filter((_, n) => n !== i)
  if (!pages.length) return { pages, index: 0 }
  const index = stack.index === i ? Math.max(0, i - 1) : stack.index > i ? stack.index - 1 : stack.index
  return { pages, index: clampIndex(pages, index) }
}
