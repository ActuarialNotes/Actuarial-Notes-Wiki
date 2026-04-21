import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { WikiSearchPanel } from '@/components/wiki/WikiSearchPanel'

// Each wiki page publishes the list of entries it references so the search
// panel can scope "This Page" results to them. Also lets pages advertise the
// current exam id, which the popup uses for the learned-concepts store.
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
  const [examId, setExamIdState] = useState<string | null>(null)

  const setPageRefs = useCallback((refs: WikiEntryRef[]) => setPageRefsState(refs), [])
  const setExamId = useCallback((id: string | null) => setExamIdState(id), [])

  // Reset page state on every route change; each page repopulates on mount.
  useEffect(() => {
    return () => {
      setPageRefsState([])
      setExamIdState(null)
    }
  }, [])

  return (
    <WikiPageContext.Provider value={{ setPageRefs, setExamId }}>
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-72 shrink-0 border-r bg-background/60 h-screen sticky top-0 flex-col">
          <WikiSearchPanel pageRefs={pageRefs} />
        </aside>
        <div className="flex-1 min-w-0">
          <div className="lg:hidden border-b bg-background/60">
            <details>
              <summary className="px-4 py-2 text-sm font-medium cursor-pointer select-none">
                Wiki search & filters
              </summary>
              <div className="max-h-[60vh] overflow-y-auto border-t">
                <WikiSearchPanel pageRefs={pageRefs} />
              </div>
            </details>
          </div>
          <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
      <ConceptPopup examId={examId} />
    </WikiPageContext.Provider>
  )
}
