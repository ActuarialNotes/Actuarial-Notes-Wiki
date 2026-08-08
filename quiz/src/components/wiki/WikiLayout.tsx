import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import type { ConceptAssignment } from '@/lib/studyPlan'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { WikiFloatingSearch } from '@/components/wiki/WikiFloatingSearch'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import wikiBundle from 'virtual:wiki-content'
import { setWikiContentLookup } from '@/lib/github'
import { setWikiIndexBundle } from '@/lib/wikiIndex'

setWikiContentLookup((path: string) => wikiBundle.files[path])
setWikiIndexBundle(wikiBundle.index)

export interface StudyPlanHeaderData {
  items: { name: string }[]
  onSelect: (index: number) => void
  /** Exam key ('P' | 'FM' | 'MAS-I' | …) — scopes the cross-device completion read. */
  examProgressKey?: string | null
  /**
   * The cached plan's assignments, so the header can derive each concept's target
   * for today and tick off the ones already done. Mastery is read by the header
   * itself, which already subscribes to it for the unlock state.
   */
  assignments?: ConceptAssignment[]
}

interface WikiPageContextValue {
  setPageRefs: (refs: WikiEntryRef[]) => void
  setExamId: (id: string | null) => void
  setPageTitle: (title: string | null) => void
  setPageTitleBadge: (badge: ReactNode) => void
  setBackLink: (link: ReactNode) => void
  setStudyPlan: (plan: StudyPlanHeaderData | null) => void
  setIsInDevelopment: (v: boolean) => void
  setIsBeta: (v: boolean) => void
}

const WikiPageContext = createContext<WikiPageContextValue | null>(null)

export function useWikiPage() {
  const ctx = useContext(WikiPageContext)
  if (!ctx) throw new Error('useWikiPage must be used inside <WikiLayout>')
  return ctx
}

export function WikiLayout({ children }: { children: ReactNode }) {
  const [pageRefs, setPageRefsState] = useState<WikiEntryRef[]>([])
  const [, setExamIdState] = useState<string | null>(null)
  const [pageTitle, setPageTitleState] = useState<string | null>(null)
  const [pageTitleBadge, setPageTitleBadgeState] = useState<ReactNode>(null)
  const [backLink, setBackLinkState] = useState<ReactNode>(null)
  const [studyPlan, setStudyPlanState] = useState<StudyPlanHeaderData | null>(null)
  const [isInDevelopment, setIsInDevelopmentState] = useState(false)
  const [isBeta, setIsBetaState] = useState(false)
  const location = useLocation()
  const closeOnNavigation = useConceptPopup(s => s.closeOnNavigation)
  const popupOpen = useConceptPopup(s => s.open)

  const setPageRefs = useCallback((refs: WikiEntryRef[]) => setPageRefsState(refs), [])
  const setExamId = useCallback((id: string | null) => setExamIdState(id), [])
  const setPageTitle = useCallback((title: string | null) => setPageTitleState(title), [])
  const setPageTitleBadge = useCallback((badge: ReactNode) => setPageTitleBadgeState(badge), [])
  const setBackLink = useCallback((link: ReactNode) => setBackLinkState(link), [])
  const setStudyPlan = useCallback((plan: StudyPlanHeaderData | null) => setStudyPlanState(plan), [])
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
    setPageTitleBadgeState(null)
    setBackLinkState(null)
    setStudyPlanState(null)
    setIsInDevelopmentState(false)
    setIsBetaState(false)

    // Only close the popup when genuinely navigating to a different page within
    // the wiki. On a return visit (same pathname, component remounted) the popup
    // was already open and should stay that way.
    if (!isReturn) {
      closeOnNavigation(location.pathname)
    }
  }, [location.pathname, location.search, closeOnNavigation])

  return (
    <WikiPageContext.Provider value={{ setPageRefs, setExamId, setPageTitle, setPageTitleBadge, setBackLink, setStudyPlan, setIsInDevelopment, setIsBeta }}>
      <div className="min-h-screen flex flex-col">
        <WikiFloatingSearch
          pageRefs={pageRefs}
          pageTitle={pageTitle}
          pageTitleBadge={pageTitleBadge}
          backLink={backLink}
          studyPlan={studyPlan}
          isInDevelopment={isInDevelopment}
          isBeta={isBeta}
        />
        <div
          className="flex-1 px-4 sm:px-6 py-8 max-w-4xl mx-auto w-full"
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
