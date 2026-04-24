import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// An ordered list of concept/resource refs plus the current index — drives
// the popup's prev/next footer and keyboard arrows.

interface ConceptPopupState {
  open: boolean
  list: WikiEntryRef[]
  index: number
  // What triggered the popup — used by "This Page" search to compute scope.
  sourcePath: string | null
  openAt: (list: WikiEntryRef[], index: number, sourcePath?: string | null) => void
  navigate: (delta: number) => void
  jumpTo: (ref: WikiEntryRef) => void
  close: () => void
  // Closes the popup if the user navigated away from the page that opened it —
  // called by WikiLayout on every route change to keep the split pane in sync.
  closeOnNavigation: (pathname: string) => void
}

export const useConceptPopup = create<ConceptPopupState>((set, get) => ({
  open: false,
  list: [],
  index: 0,
  sourcePath: null,
  openAt: (list, index, sourcePath = null) =>
    set({ open: true, list, index: Math.max(0, Math.min(index, list.length - 1)), sourcePath }),
  navigate: delta => {
    const { list, index } = get()
    if (!list.length) return
    const next = Math.max(0, Math.min(list.length - 1, index + delta))
    set({ index: next })
  },
  jumpTo: ref => {
    const { list } = get()
    const existingIdx = list.findIndex(
      r => r.kind === ref.kind && r.name.toLowerCase() === ref.name.toLowerCase(),
    )
    if (existingIdx >= 0) {
      set({ index: existingIdx })
    } else {
      // Append & jump — mirrors publish.js behaviour when following a link
      // from inside a concept.
      const next = [...list, ref]
      set({ list: next, index: next.length - 1 })
    }
  },
  close: () => set({ open: false, list: [], index: 0, sourcePath: null }),
  closeOnNavigation: pathname => {
    const { open, sourcePath } = get()
    if (open && sourcePath && sourcePath !== pathname) {
      set({ open: false, list: [], index: 0, sourcePath: null })
    }
  },
}))
