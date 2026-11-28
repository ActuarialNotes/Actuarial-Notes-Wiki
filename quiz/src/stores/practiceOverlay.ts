// The concept's practice overlay (components/practice/PracticeOverlay.tsx):
// a concept's Practice button opens its questions over the page the reader
// is on, rather than going to the one search. Mounted once, at the app root
// (PracticeOverlayHost).

import { create } from 'zustand'

interface PracticeOverlayState {
  /** The concept whose questions are showing, or null while closed. */
  concept: string | null
  open: (concept: string) => void
  close: () => void
}

export const usePracticeOverlay = create<PracticeOverlayState>(set => ({
  concept: null,
  open: concept => set({ concept }),
  close: () => set({ concept: null }),
}))
