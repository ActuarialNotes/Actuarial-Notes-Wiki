import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackSearch } from '@/lib/analytics'
import { contentGroup, searchTerm } from '@/lib/analyticsPolicy'

/** How long the reader must stop typing before what they typed counts as a search. */
const SEARCH_SETTLE_MS = 1500

/**
 * Report what a search box was used to look for — GA4's recommended `search`
 * event, once per term, after the reader pauses. Every keystroke is not a
 * search; "bay", "baye", "bayes" are one. The scope is the section of the app
 * the box sits in (the page's content group) unless the caller names one.
 *
 * What readers look for and can't find is the content backlog, so this is
 * mounted wherever there is a search box: `FloatingSearchInput` (the wiki,
 * Dashboard, Flashcards and Cowork bars), the quiz builder's search and the
 * Search page.
 */
export function useSearchTracking(text: string, scope?: string): void {
  const { pathname } = useLocation()
  const where = scope ?? contentGroup(pathname)
  const reported = useRef<string | null>(null)

  useEffect(() => {
    const term = searchTerm(text)
    if (!term || term === reported.current) return
    const timer = setTimeout(() => {
      reported.current = term
      trackSearch({ search_term: term, search_scope: where })
    }, SEARCH_SETTLE_MS)
    return () => clearTimeout(timer)
  }, [text, where])
}
