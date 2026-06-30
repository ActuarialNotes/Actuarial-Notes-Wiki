import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// Controls the globally-mounted CollectConceptModal. Any concept-name surface
// (e.g. the lock icon in ConceptPopup) opens the collect flow by calling
// `open(ref)`; the modal itself lives once at the app root.

interface CollectState {
  ref: WikiEntryRef | null
  open: (ref: WikiEntryRef) => void
  close: () => void
}

export const useCollect = create<CollectState>(set => ({
  ref: null,
  open: ref => set({ ref }),
  close: () => set({ ref: null }),
}))
