import { useEffect, type RefObject } from 'react'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

/** The `data-wikiref` a rendered link to `ref` carries — what the highlight looks for. */
export function refKey(ref: WikiEntryRef): string {
  return `${ref.kind}:${ref.name.toLowerCase()}`
}

/**
 * The study guide's **active-concept highlight**, for any surface that renders
 * links to the concepts the popup is walking: while the popup is open on a walk
 * that was opened from this surface (`sourcePath` matches the popup's), the
 * mention the popup is showing is flagged `.wiki-link--active`, everything else
 * on the surface fades (`.concept-focus-mode`), any collapsed callout around it
 * opens, and it is scrolled into the part of the window the popup leaves free.
 *
 * A mention is any element under `rootRef` with a `data-wikiref` of `refKey`'s
 * shape. `WikiArticle` draws its wiki links that way; the quiz draws the
 * concepts named in a question that way (`lib/conceptMentions.ts`).
 *
 * `sourcePath` omitted matches any popup that names a source — the article's
 * old behaviour, kept for an article rendered without one.
 */
export function useConceptHighlight(rootRef: RefObject<HTMLElement>, sourcePath?: string): void {
  const popupOpen = useConceptPopup(s => s.open)
  const popupIndex = useConceptPopup(s => s.index)
  const popupSource = useConceptPopup(s => s.sourcePath)
  const popupCurrent = useConceptPopup(s => s.list[s.index])
  const popupOccurrences = useConceptPopup(s => s.occurrences)
  const popupOccurrenceIndex = useConceptPopup(s => s.occurrenceIndex)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const clear = () => {
      root.querySelectorAll('.wiki-link--active').forEach(el => el.classList.remove('wiki-link--active'))
      root.classList.remove('concept-focus-mode')
    }
    clear()
    if (!popupOpen || !popupCurrent) return
    // Focus mode only applies when the popup was opened from a specific page
    // (popupSource is set). If null (e.g. opened from Dashboard or
    // Flashcards), no surface should receive concept-focus-mode.
    if (!popupSource) return
    if (sourcePath && sourcePath !== popupSource) return
    // Use getAttribute comparison instead of CSS.escape to avoid any selector
    // escaping edge-cases (colons, spaces, quotes in concept names).
    const key = refKey(popupCurrent)
    // Source-material links in exam markdown are parsed as 'concept' kind by
    // hrefToEntryRef (bare names default to concept), but the popup stores them
    // as 'resource'. Check both keys so the highlight still finds the DOM node.
    const altKey =
      popupCurrent.kind === 'resource'
        ? `concept:${popupCurrent.name.toLowerCase()}`
        : popupCurrent.kind === 'concept'
        ? `resource:${popupCurrent.name.toLowerCase()}`
        : null
    const matches = Array.from(root.querySelectorAll<HTMLElement>('[data-wikiref]'))
      .filter(el => {
        const attr = el.getAttribute('data-wikiref')
        return attr === key || (altKey !== null && attr === altKey)
      })
    // Which mention to highlight: the occurrence the user clicked / navigated
    // to (dimmed repeats included). Falls back to the first when occurrence nav
    // isn't active or the concept doesn't match the current occurrence entry.
    const wantOcc =
      popupOccurrences && popupOccurrences[popupOccurrenceIndex]?.name.toLowerCase() === popupCurrent.name.toLowerCase()
        ? popupOccurrences[popupOccurrenceIndex]!.occurrence
        : 0
    const target = matches[Math.min(wantOcc, matches.length - 1)] ?? matches[0] ?? null
    if (!target) return
    target.classList.add('wiki-link--active')
    root.classList.add('concept-focus-mode')

    // Expand any collapsed callout ancestors so the target becomes visible.
    let node: HTMLElement | null = target.parentElement
    while (node && node !== root) {
      if (node.dataset.calloutBody !== undefined && node.hidden) {
        const toggle = node.parentElement?.querySelector<HTMLButtonElement>('[data-callout-toggle]')
        toggle?.click()
      }
      node = node.parentElement
    }

    function doScroll() {
      // --concept-split-height is set by ConceptPopup.useEffect which runs in
      // the same commit. Read it here (inside rAF) so it's already applied.
      const splitHeightStr = getComputedStyle(document.documentElement)
        .getPropertyValue('--concept-split-height').trim()
      const splitHeight = parseFloat(splitHeightStr) || 0
      const effectiveBottom = window.innerHeight - splitHeight
      // Account for whatever chrome is pinned to the top of the viewport — the
      // sticky floating search bar, and below lg the fixed nav header it rests
      // under — so concepts near the top of the page aren't treated as "in
      // view" when they are hidden behind it. Measured rather than hardcoded:
      // the bar sits at a different offset on either side of the lg breakpoint.
      const searchBar = document.querySelector<HTMLElement>('[data-floating-search]')
      const stickyOffset = searchBar ? searchBar.getBoundingClientRect().bottom : 56
      const rect = target!.getBoundingClientRect()
      const inView = rect.top >= stickyOffset && rect.bottom <= effectiveBottom
      if (!inView) {
        // Center within the visible area between the sticky bar and popup panel.
        const visibleHeight = effectiveBottom - stickyOffset
        const scrollBy = rect.top - stickyOffset - (visibleHeight / 2 - rect.height / 2)
        window.scrollBy({ top: scrollBy, behavior: 'smooth' })
      }
    }

    // Always defer via double rAF so that:
    // 1. ConceptPopup.useEffect has run and set --concept-split-height.
    // 2. Any callout re-renders have been committed and laid out.
    requestAnimationFrame(() => requestAnimationFrame(doScroll))
  }, [rootRef, popupOpen, popupIndex, popupOccurrences, popupOccurrenceIndex, popupSource, popupCurrent, sourcePath])
}
