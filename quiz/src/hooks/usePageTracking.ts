import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare function gtag(...args: unknown[]): void

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    if (typeof gtag === 'undefined') return
    gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    })
  }, [location.pathname, location.search])
}
