import { create } from 'zustand'
import type { AttemptView } from '@/lib/attemptViews'

/**
 * The project attempt open on screen, as the sidebar mirrors it under Projects:
 * its id, the views its page offers and the one showing (`lib/attemptViews.ts`).
 *
 * The attempt page publishes it and clears it when it closes. It lives outside
 * the page because the sidebar is in the main bundle and the attempt is not:
 * reading the attempts store from the sidebar would bring the authored briefs
 * into every page's first load.
 */
export interface AttemptNav {
  attemptId: string
  views: AttemptView[]
  view: AttemptView
}

interface AttemptNavState {
  current: AttemptNav | null
  show: (current: AttemptNav) => void
  /** Clears `attemptId`'s entry — and only its, so a closing page can't clear the next one's. */
  clear: (attemptId: string) => void
}

export const useAttemptNav = create<AttemptNavState>(set => ({
  current: null,
  show: current => set({ current }),
  clear: attemptId => set(s => (s.current?.attemptId === attemptId ? { current: null } : s)),
}))
