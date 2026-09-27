import { useCallback } from 'react'
import { X } from 'lucide-react'
import type { PdfPageRef } from '@/lib/pageStack'
import { recallPdfPage, rememberPdfPage } from '@/lib/pageScrollMemory'
import { PdfDocumentView } from '@/components/PdfViewerPanel'

/**
 * A published PDF read as a page of the concept popup's stack — what a
 * resource page's **Read PDF** opens when that page is being read in the popup.
 *
 * It used to open the app's reader (`PdfViewerPanel`), a panel of its own that
 * slid up over the popup and hid all of it: the page that offered the document,
 * the trail above that page, the walk below. Now the document stacks like a
 * followed link. The page it came from folds into a bar above it, one tap from
 * being read again, and closing the document (its ✕, Esc) lands back on that
 * page. See `docs/stacked-pages.md`.
 *
 * The reading itself is `PdfDocumentView`, the reader without its frame; the
 * popup is the frame here — its resize handle, its focus mode. While this page
 * is open the document's own page bar and Previous / Next stand in for the
 * popup's footer, which is why `ConceptPopup` drops that footer: the arrows
 * turn this document's pages, and two footers would each claim them.
 *
 * Mounted per page like `ConceptPagePanel`, so folding it unmounts the
 * document. The page it was left on is kept in `lib/pageScrollMemory.ts` and
 * opened again when its bar is tapped.
 */
export interface PdfPagePanelProps {
  entry: PdfPageRef
  /** True while the popup fills the viewport. */
  focusMode: boolean
  /** Close this page. The popup closes when its last page does. */
  onClose: () => void
  /** Popup-level controls (the focus-mode toggle). */
  trailing?: React.ReactNode
  /** Whether the document owns the arrow keys — not while a layer is over it. */
  keyboard: boolean
}

export function PdfPagePanel({ entry, focusMode, onClose, trailing, keyboard }: PdfPagePanelProps) {
  const remember = useCallback((page: number) => rememberPdfPage(entry.url, page), [entry.url])
  return (
    <PdfDocumentView
      url={entry.url}
      title={entry.name}
      subtitle={entry.subtitle}
      focusMode={focusMode}
      keyboard={keyboard}
      initialPage={recallPdfPage(entry.url)}
      onPageChange={remember}
      controls={
        <>
          {trailing}
          {/* Same close as a concept page's: gone in focus mode, where the
              toggle is the one control and Esc unwinds the stack. */}
          {!focusMode && (
            <button
              type="button"
              onClick={onClose}
              data-sound="none"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Close document"
              aria-label={`Close ${entry.name}`}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </>
      }
    />
  )
}
