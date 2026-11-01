import { useCallback, useEffect, useRef, type FocusEvent, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { trackSearch } from '@/lib/analytics'
import { contentGroup, searchReport, type SearchOutcome } from '@/lib/analyticsPolicy'

export interface SearchTrackingOptions {
  /** How many results the box is showing for what was typed. Omit where the box has no list of its own. */
  resultCount?: number
  /** The section the box searches; the page's content group when omitted. */
  scope?: string
}

/** Spread onto the search `<input>` — they are how the hook knows the reader is done. */
export interface SearchInputHandlers {
  onFocus: (e: FocusEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

interface Pending {
  text: string
  resultCount?: number
  scope: string
}

/**
 * Report what a search box was used to look for — GA4's recommended `search`
 * event, once per term, when the reader is **done** with it rather than when
 * they pause: a pause fires mid-word ("liability", "liability for",
 * "liability for in"), and a term reported before its results are read can't
 * say whether they helped. So the event fires, with the term as it then stands
 * and how many results it was showing (`result_count`), when the reader
 *
 *   • opens a result — a pointer lands inside `[data-search-results]` within
 *     the box's region (`search_outcome: 'opened'`);
 *   • presses Enter (`'submitted'`);
 *   • leaves — a pointer or focus outside the region, the box cleared, the page
 *     hidden or left (`'left'`).
 *
 * The region is the box's nearest `[data-search-region]` ancestor (the floating
 * bar, the Search page), so a scope pill or a filter is still the search. A
 * search that ends in `left` with `result_count: 0` is one that led nowhere —
 * what readers look for and can't find is the content backlog.
 *
 * Mounted wherever there is a search box: `FloatingSearchInput` (the wiki,
 * Dashboard, Flashcards, Cowork, Store and Tools bars), the quiz builder's
 * search and the Search page.
 */
export function useSearchTracking(text: string, { resultCount, scope }: SearchTrackingOptions = {}): SearchInputHandlers {
  const { pathname } = useLocation()
  const where = scope ?? contentGroup(pathname)
  const pending = useRef<Pending | null>(null)
  const reported = useRef<string | null>(null)
  const input = useRef<HTMLInputElement | null>(null)
  const mounted = useRef(false)

  const commit = useCallback((outcome: SearchOutcome) => {
    const current = pending.current
    if (!current) return
    const params = searchReport({ ...current, outcome }, reported.current)
    if (!params) return
    reported.current = params.search_term
    trackSearch(params)
  }, [])

  // What would be reported now. Clearing the box is leaving the term it held.
  useEffect(() => {
    if (text.trim()) {
      pending.current = { text, resultCount, scope: where }
    } else if (pending.current) {
      commit('left')
      pending.current = null
    }
  }, [text, resultCount, where, commit])

  useEffect(() => {
    mounted.current = true
    const regionOf = (el: HTMLElement) => el.closest<HTMLElement>('[data-search-region]') ?? el.parentElement ?? el

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target
      if (!pending.current || !(target instanceof Element)) return
      // A box never focused — the Search page opened with `?q=` — has no
      // element to find its region by; the page is the search then.
      const region = input.current ? regionOf(input.current) : document.body
      const results = target.closest('[data-search-results]')
      if (results && region.contains(results)) commit('opened')
      else if (!region.contains(target)) commit('left')
    }
    const onHidden = () => {
      if (document.visibilityState === 'hidden') commit('left')
    }
    const onPageHide = () => commit('left')

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('visibilitychange', onHidden)
    window.addEventListener('pagehide', onPageHide)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('visibilitychange', onHidden)
      window.removeEventListener('pagehide', onPageHide)
      // A route change takes the box with it. A result opened on the way out
      // was already reported as opened, so this only catches leaving — a tick
      // later, so StrictMode's rehearsal unmount in development isn't one.
      mounted.current = false
      setTimeout(() => {
        if (!mounted.current) commit('left')
      })
    }
  }, [commit])

  return {
    onFocus: e => {
      input.current = e.currentTarget
    },
    onBlur: e => {
      input.current = e.currentTarget
      // Focus moved somewhere (Tab) outside the region. A blur with nowhere to
      // go — a click on plain text, another window — is left to the pointer and
      // visibility listeners, which know where the reader went.
      const next = e.relatedTarget
      if (!(next instanceof Element)) return
      const region = e.currentTarget.closest('[data-search-region]') ?? e.currentTarget.parentElement
      if (region && !region.contains(next)) commit('left')
    },
    onKeyDown: e => {
      input.current = e.currentTarget
      if (e.key === 'Enter') commit('submitted')
    },
  }
}
