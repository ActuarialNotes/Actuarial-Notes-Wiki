import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const STATIC_TITLES: Record<string, string> = {
  '/': 'Actuarial Notes',
  '/auth': 'Sign In | Actuarial Notes',
  '/auth/callback': 'Actuarial Notes',
  '/quiz': 'Quiz | Actuarial Notes',
  '/review': 'Review | Actuarial Notes',
  '/dashboard': 'Dashboard | Actuarial Notes',
  '/search': 'Search | Actuarial Notes',
  '/flashcards': 'Flashcards | Actuarial Notes',
  '/settings': 'Settings | Actuarial Notes',
  '/upgrade': 'Upgrade | Actuarial Notes',
  '/store': 'Store | Actuarial Notes',
  '/wiki': 'Wiki | Actuarial Notes',
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getPageTitle(pathname: string): string {
  if (STATIC_TITLES[pathname]) return STATIC_TITLES[pathname]

  const wikiExam = pathname.match(/^\/wiki\/exam\/(.+)$/)
  if (wikiExam) return `${slugToTitle(wikiExam[1])} | Actuarial Notes`

  const wikiConcept = pathname.match(/^\/wiki\/concept\/(.+)$/)
  if (wikiConcept) return `${slugToTitle(wikiConcept[1])} | Actuarial Notes`

  const wikiResource = pathname.match(/^\/wiki\/resource\/(.+)$/)
  if (wikiResource) return `${slugToTitle(wikiResource[1])} | Actuarial Notes`

  return 'Actuarial Notes'
}

export function usePageTracking() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    const title = getPageTitle(location.pathname)
    document.title = title

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (typeof window.gtag !== 'function') return
    window.gtag('config', 'G-YTVSN1NTV9', {
      page_path: location.pathname + location.search,
      page_title: title,
    })
  }, [location.pathname, location.search])
}
