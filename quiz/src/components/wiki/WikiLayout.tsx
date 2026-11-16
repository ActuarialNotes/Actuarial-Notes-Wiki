import { useCallback, useLayoutEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { WikiFloatingSearch } from '@/components/wiki/WikiFloatingSearch'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiPageContext } from '@/hooks/useWikiPage'
import wikiBundle from 'virtual:wiki-content'
import { installWikiBundle } from '@/lib/wikiBundle'
import { cn } from '@/lib/utils'

installWikiBundle(wikiBundle)

export function WikiLayout({ children }: { children: ReactNode }) {
  const [pageRefs, setPageRefsState] = useState<WikiEntryRef[]>([])
  const [, setExamIdState] = useState<string | null>(null)
  const [pageTitle, setPageTitleState] = useState<string | null>(null)
  const [pageIcon, setPageIconState] = useState<ReactNode>(null)
  const [pageTitleBadge, setPageTitleBadgeState] = useState<ReactNode>(null)
  const [backLink, setBackLinkState] = useState<ReactNode>(null)
  const [isInDevelopment, setIsInDevelopmentState] = useState(false)
  const [isBeta, setIsBetaState] = useState(false)
  const location = useLocation()
  const closeOnNavigation = useConceptPopup(s => s.closeOnNavigation)
  const popupOpen = useConceptPopup(s => s.open)

  const setPageRefs = useCallback((refs: WikiEntryRef[]) => setPageRefsState(refs), [])
  const setExamId = useCallback((id: string | null) => setExamIdState(id), [])
  const setPageTitle = useCallback((title: string | null) => setPageTitleState(title), [])
  const setPageIcon = useCallback((icon: ReactNode) => setPageIconState(icon), [])
  const setPageTitleBadge = useCallback((badge: ReactNode) => setPageTitleBadgeState(badge), [])
  const setBackLink = useCallback((link: ReactNode) => setBackLinkState(link), [])
  const setIsInDevelopment = useCallback((v: boolean) => setIsInDevelopmentState(v), [])
  const setIsBeta = useCallback((v: boolean) => setIsBetaState(v), [])

  // A layout effect so this reset always commits before the descendant page's
  // own useEffect calls that populate pageTitle/pageTitleBadge/backLink on the
  // same initial mount — otherwise ordering between this effect and the page's
  // is unspecified and the page's values can get clobbered back to null.
  useLayoutEffect(() => {
    // Detect if this is a return to the same wiki page (e.g. coming back from another tab).
    // Read before saving so we can compare the previous location against the current one.
    let isReturn = false
    try {
      const stored = sessionStorage.getItem('wiki:last-path') || ''
      isReturn = stored.split('?')[0] === location.pathname
    } catch { /* ignore */ }

    try {
      sessionStorage.setItem('wiki:last-path', location.pathname + location.search)
    } catch { /* ignore */ }

    setPageRefsState([])
    setExamIdState(null)
    setPageTitleState(null)
    setPageIconState(null)
    setPageTitleBadgeState(null)
    setBackLinkState(null)
    setIsInDevelopmentState(false)
    setIsBetaState(false)

    // Only close the popup when genuinely navigating to a different page within
    // the wiki. On a return visit (same pathname, component remounted) the popup
    // was already open and should stay that way.
    if (!isReturn) {
      closeOnNavigation(location.pathname)
    }
  }, [location.pathname, location.search, closeOnNavigation])

  // The Resources shelf is a shelf, so it takes the wide column; every other
  // page of the wiki is read, on the reading column (index.css, `page-column`).
  const wide = location.pathname === '/wiki/resources'

  return (
    <WikiPageContext.Provider value={{ setPageRefs, setExamId, setPageTitle, setPageIcon, setPageTitleBadge, setBackLink, setIsInDevelopment, setIsBeta }}>
      <div className="min-h-screen flex flex-col">
        <WikiFloatingSearch
          width={wide ? 'lg' : 'md'}
          pageRefs={pageRefs}
          pageTitle={pageTitle}
          pageIcon={pageIcon}
          pageTitleBadge={pageTitleBadge}
          backLink={backLink}
          isInDevelopment={isInDevelopment}
          isBeta={isBeta}
        />
        <div
          className={cn('page-column flex-1 py-8', !wide && 'page-reading')}
          style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
        >
          {children}
        </div>
      </div>
      <ConceptPopup />
    </WikiPageContext.Provider>
  )
}

export default WikiLayout
