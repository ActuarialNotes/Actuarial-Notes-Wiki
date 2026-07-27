import { create } from 'zustand'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import type { MasteryState } from '@/lib/mastery'

// Controls the globally-mounted CollectConceptModal. Any concept-name surface
// (e.g. the lock icon in ConceptPopup) opens the collect flow by calling
// `open(ref)`; the modal itself lives once at the app root.

export interface CollectOpenOptions {
  /**
   * The opener already knows this concept is collected — e.g. it rendered a
   * mastery pill for it. Without this the modal has to re-derive "collected"
   * from an async learning-history fetch, and briefly renders the collect
   * comprehension check for a card the user already owns.
   */
  collected?: boolean
  /** Mastery level the opener is displaying, so the card shows it immediately. */
  mastery?: MasteryState
}

interface CollectState {
  ref: WikiEntryRef | null
  /** Opener-supplied hints for the concept in `ref` (see CollectOpenOptions). */
  knownCollected: boolean
  knownMastery: MasteryState | null
  open: (ref: WikiEntryRef, opts?: CollectOpenOptions) => void
  close: () => void
}

export const useCollect = create<CollectState>(set => ({
  ref: null,
  knownCollected: false,
  knownMastery: null,
  open: (ref, opts) => set({
    ref,
    knownCollected: !!opts?.collected,
    knownMastery: opts?.mastery ?? null,
  }),
  close: () => set({ ref: null, knownCollected: false, knownMastery: null }),
}))
