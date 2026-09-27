import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { fallbackHead } from '@/lib/seo'
import { applyPageHead, currentCanonical } from '@/lib/documentHead'

export function usePageTracking() {
  const location = useLocation()
  const isFirstRender = useRef(true)
  const headWritten = useRef(false)

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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (typeof window.gtag !== 'function') return
    window.gtag('config', 'G-YTVSN1NTV9', {
      page_path: location.pathname + location.search,
      page_title: fallbackHead(location.pathname).title,
    })
  }, [location.pathname, location.search])
}
