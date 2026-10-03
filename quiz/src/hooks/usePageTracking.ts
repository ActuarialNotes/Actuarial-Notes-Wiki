import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { fallbackHead } from '@/lib/seo'
import { applyPageHead, currentCanonical } from '@/lib/documentHead'
import { trackPageView } from '@/lib/analytics'
import { isNewPageView, type PageAddress } from '@/lib/analyticsPolicy'

/**
 * How long an address must stand before it is counted. A redirect
 * (`<Navigate replace>` — a signed-out reader bounced off a gated route, a
 * concept link sent on to its study guide) replaces the address a moment after
 * it was pushed; waiting this long counts the page the reader lands on, not the
 * one that bounced them.
 */
const PAGE_VIEW_SETTLE_MS = 250

export function usePageTracking() {
  const location = useLocation()
  const action = useNavigationType()
  const headWritten = useRef(false)
  const counted = useRef<PageAddress | null>(null)
  // A view was scheduled and the address moved on before it was sent — the
  // next address inherits it, whatever kind of change that was.
  const pending = useRef(false)

  // The route's own head — its name, the site's description, its canonical URL
  // (see `fallbackHead` in lib/seo.ts). A layout effect, so it is in place
  // before any page's passive effect writes its fuller record over it
  // (`usePageHead`). A wiki page served from its own static file arrives with
  // that fuller record already in the head; the first pass leaves it alone
  // rather than blank it while the page's chunk loads.
  useLayoutEffect(() => {
    const head = fallbackHead(location.pathname)
    const firstPass = !headWritten.current
    headWritten.current = true
    if (firstPass && head.canonical && currentCanonical() === head.canonical) return
    applyPageHead(head)
  }, [location.pathname])

  // One page view per page the reader settles on — the first included, since
  // the tag is configured not to send its own (lib/analytics.ts). A page that
  // rewrites its own query string in place (filters) is not a new view; see
  // `isNewPageView`. The title is the route's fallback name rather than
  // `document.title`, which a lazily-loaded page may not have written yet.
  useEffect(() => {
    const address = { pathname: location.pathname, search: location.search }
    if (!pending.current && !isNewPageView(counted.current, address, action)) {
      counted.current = address
      return
    }
    pending.current = true
    const timer = setTimeout(() => {
      pending.current = false
      counted.current = address
      trackPageView({ ...address, title: fallbackHead(address.pathname).title })
    }, PAGE_VIEW_SETTLE_MS)
    return () => clearTimeout(timer)
  }, [location.pathname, location.search, action])
}
