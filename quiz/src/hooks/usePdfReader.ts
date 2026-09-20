import { create } from 'zustand'

/**
 * **The app's one PDF reader**, as a store rather than a panel each surface
 * mounts for itself.
 *
 * Every published document the app links to — a past paper's examiner's
 * report, its solutions, an exam's syllabus, a resource page's ASOP, the paper
 * behind the question on screen — is read *here*, in `PdfViewerPanel`, not in a
 * browser tab the reader then has to find their way back from. That rule only
 * holds if the reader can open from anywhere, and a panel mounted inside its
 * opener can't:
 *
 * - a reader rendered inside a dialog is pinned to that dialog's stacking
 *   context, so it opened *behind* the sheet that asked for it — which is why
 *   the Fact Check shelf's cards and the quiz's Question info panel used to
 *   send their documents to a new tab instead;
 * - a reader rendered inside a card unmounts when the card does, so stepping to
 *   the next concept, or closing the panel that opened it, took the document
 *   with it.
 *
 * One host (`components/PdfReaderHost.tsx`, mounted at the app root) fixes
 * both: the panel is a top-level child at the top of the layer ladder, and it
 * outlives whatever opened it.
 *
 * It is also the single answer to "is a document being read right now", which
 * the surfaces that bind `Esc` and the arrow keys need — the reader owns those
 * keys while it is up (`docs/style-guide.md` §8.3), and they hand them over by
 * reading this store rather than by prop-drilling a callback back up.
 */

export interface PdfReaderDoc {
  /** The publisher's URL for the PDF — what `lib/examPdf.ts` proxies. */
  url: string
  /** What the document is, e.g. "Examiner's Report". */
  title: string
  /** Which paper it belongs to, e.g. "Exam 5 · Spring 2019". */
  subtitle?: string
  /**
   * Whether the surface it was opened from is itself full screen (the concept
   * popup in focus mode), so the reader covers that page instead of leaving
   * the chrome-sized gaps the page has already filled.
   */
  hostFullScreen?: boolean
}

interface PdfReaderState {
  /** The document being read, or null when the reader is closed. */
  doc: PdfReaderDoc | null
  openPdf: (doc: PdfReaderDoc) => void
  closePdf: () => void
  /**
   * Close the reader only if it is showing this document. Used by a surface
   * whose selection moved on (the past-paper shelf) so it can drop *its* open
   * document without closing one something else put up.
   */
  closePdfIf: (url: string) => void
}

export const usePdfReader = create<PdfReaderState>((set, get) => ({
  doc: null,
  openPdf: doc => set({ doc }),
  closePdf: () => set({ doc: null }),
  closePdfIf: url => {
    if (get().doc?.url === url) set({ doc: null })
  },
}))

/** Open a document from outside React — an event handler, a store, a callback. */
export function openPdfReader(doc: PdfReaderDoc): void {
  usePdfReader.getState().openPdf(doc)
}

/**
 * Is a document being read right now?
 *
 * The subscription every keyboard-owning surface makes: `ConceptPopup`, the
 * Fact Check sheet and anything else that binds `Esc` or the arrows returns
 * early while this is true, so one press closes the document rather than the
 * document *and* the page behind it.
 */
export function useIsReadingPdf(): boolean {
  return usePdfReader(state => state.doc !== null)
}
