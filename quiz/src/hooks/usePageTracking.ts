import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTracking() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (typeof window.gtag !== 'function') return
    window.gtag('config', 'G-YTVSN1NTV9', {
      page_path: location.pathname + location.search,
    })
  }, [location.pathname, location.search])
}
