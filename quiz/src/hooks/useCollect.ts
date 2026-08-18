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
  /**
   * An escape hatch out of the comprehension check, supplied by openers that
   * have somewhere else to send the reader. When present the modal draws a
   * **Skip** button under the options and calls this instead of just closing.
   *
   * Only the flashcard study loop passes one today: a check reached by rating a
   * card "Got it" interrupts a session, so a reader who can't answer it yet
   * needs a way past it that isn't guessing — skipping steps to the next card
   * and leaves this one uncollected and still in rotation. Openers with nowhere
   * to go next (the concept popup, the pre-quiz gate) omit it and keep the
   * plain close button.
   */
  onSkip?: () => void
}

interface CollectState {
  ref: WikiEntryRef | null
  /** Opener-supplied hints for the concept in `ref` (see CollectOpenOptions). */
  knownCollected: boolean
  knownMastery: MasteryState | null
  /** Opener-supplied skip handler, or null when the check can't be skipped. */
  onSkip: (() => void) | null
  open: (ref: WikiEntryRef, opts?: CollectOpenOptions) => void
  close: () => void
  /** Close the modal and hand control back to the opener's skip handler. */
  skip: () => void
}

const CLOSED = { ref: null, knownCollected: false, knownMastery: null, onSkip: null } as const

export const useCollect = create<CollectState>((set, get) => ({
  ...CLOSED,
  open: (ref, opts) => set({
    ref,
    knownCollected: !!opts?.collected,
    knownMastery: opts?.mastery ?? null,
    onSkip: opts?.onSkip ?? null,
  }),
  close: () => set(CLOSED),
  skip: () => {
    // Read the handler before clearing it, and run it after the modal is
    // already closed so it can move the opener on (the flashcard loop advances
    // to the next card) without racing the close.
    const handler = get().onSkip
    set(CLOSED)
    handler?.()
  },
}))
