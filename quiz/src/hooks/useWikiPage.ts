import { createContext, useContext, type ReactNode } from 'react'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// What a Study Guides page tells the layout around it (components/wiki/
// WikiLayout.tsx, which provides it): its walk, its exam, and what the header
// strip shows — title, logo, badge, back link and status banners.

export interface WikiPageContextValue {
  setPageRefs: (refs: WikiEntryRef[]) => void
  setExamId: (id: string | null) => void
  setPageTitle: (title: string | null) => void
  /**
   * The exam's logo, which *replaces* the title text in the header strip — a
   * page whose whole body is headed "Exam P-1" doesn't need the strip to say
   * it again. `pageTitle` is still required: it is what the tile is labelled
   * with for a screen reader, and what the strip falls back to.
   */
  setPageIcon: (icon: ReactNode) => void
  setPageTitleBadge: (badge: ReactNode) => void
  setBackLink: (link: ReactNode) => void
  setIsInDevelopment: (v: boolean) => void
  setIsBeta: (v: boolean) => void
}

export const WikiPageContext = createContext<WikiPageContextValue | null>(null)

export function useWikiPage() {
  const ctx = useContext(WikiPageContext)
  if (!ctx) throw new Error('useWikiPage must be used inside <WikiLayout>')
  return ctx
}
