import { create } from 'zustand'

// A single, app-wide transient confirmation ("Added to Deck", …). Only one
// toast is ever visible: a newer message replaces the current one rather than
// stacking, so rapid adds read as one calm confirmation instead of a pile-up.
// The host component lives once at the app root (`components/Toast.tsx`).

export const TOAST_DURATION_MS = 2200

export interface ToastMessage {
  id: number
  message: string
}

interface ToastState {
  toast: ToastMessage | null
  showToast: (message: string) => void
  /** Dismiss the current toast; pass an id to only dismiss that specific one. */
  dismissToast: (id?: number) => void
}

let nextId = 0

export const useToast = create<ToastState>((set, get) => ({
  toast: null,
  showToast: (message) => set({ toast: { id: ++nextId, message } }),
  dismissToast: (id) => {
    const current = get().toast
    if (!current) return
    // A stale timer from a replaced toast must not close the newer one.
    if (id !== undefined && current.id !== id) return
    set({ toast: null })
  },
}))

/** "Added to Deck" for one card, "N cards added to Deck" for a batch. */
export function addedToDeckMessage(count: number): string {
  return count > 1 ? `${count} cards added to Deck` : 'Added to Deck'
}

/**
 * Confirm that `count` cards were just added to the flashcard deck. Call this
 * only with the number of *newly* added cards — adding a card that's already
 * in the deck is a no-op and shouldn't be confirmed.
 */
export function showAddedToDeck(count: number) {
  if (count < 1) return
  useToast.getState().showToast(addedToDeckMessage(count))
}
