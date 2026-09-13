import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { fromSlug, examDisplayName } from '@/lib/wikiRoutes'

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

// Wiki route slugs are `toSlug` output (spaces as `+`, the rest
// percent-encoded), so the page's name is read back with `fromSlug` rather than
// guessed at — a slug split on '-' turned "Exam+MAS-I+(CAS)" into
// "Exam+MAS I+(CAS)".
function slugToTitle(slug: string): string {
  return fromSlug(slug)
}

function getPageTitle(pathname: string): string {
  if (STATIC_TITLES[pathname]) return STATIC_TITLES[pathname]

  // An exam's tab title drops the examining-body suffix its file name carries,
  // the same as every other surface that shows an exam's name.
  const wikiExam = pathname.match(/^\/wiki\/exam\/(.+)$/)
  if (wikiExam) return `${examDisplayName(slugToTitle(wikiExam[1]))} | Actuarial Notes`

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
