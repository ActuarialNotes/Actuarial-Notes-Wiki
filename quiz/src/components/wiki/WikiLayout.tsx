import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { WikiFloatingSearch } from '@/components/wiki/WikiFloatingSearch'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import wikiBundle from 'virtual:wiki-content'
import { setWikiContentLookup } from '@/lib/github'
import { setWikiIndexBundle } from '@/lib/wikiIndex'

setWikiContentLookup((path: string) => wikiBundle.files[path])
setWikiIndexBundle(wikiBundle.index)

interface WikiPageContextValue {
  setPageRefs: (refs: WikiEntryRef[]) => void
  setExamId: (id: string | null) => void
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
  const location = useLocation()
  const closeOnNavigation = useConceptPopup(s => s.closeOnNavigation)
  const popupOpen = useConceptPopup(s => s.open)

  const setPageRefs = useCallback((refs: WikiEntryRef[]) => setPageRefsState(refs), [])
  const setExamId = useCallback((id: string | null) => setExamIdState(id), [])

  useEffect(() => {
    setPageRefsState([])
    setExamIdState(null)
    closeOnNavigation(location.pathname)
  }, [location.pathname, closeOnNavigation])

  return (
    <WikiPageContext.Provider value={{ setPageRefs, setExamId }}>
      <div className="min-h-screen flex flex-col">
        <WikiFloatingSearch pageRefs={pageRefs} />
        <div
          className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full"
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
