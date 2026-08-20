import { useEffect, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'

// Loads one PDF for the viewer panel.
//
// pdf.js is pulled in on demand — the library and its worker are a large chunk
// nobody who never opens a paper should pay for — and torn down with the
// document, so closing the panel releases the worker's memory rather than
// leaving a 60-page render context alive behind the quiz builder.

export type PdfStatus = 'loading' | 'ready' | 'error'

export interface PdfDocumentState {
  doc: PDFDocumentProxy | null
  pageCount: number
  status: PdfStatus
  /** Set when `status` is `error`, phrased for a reader rather than a log. */
  error: string | null
}

/** The document at `url` (already proxied — see `lib/examPdf.ts`). */
export function usePdfDocument(url: string | null): PdfDocumentState {
  const [state, setState] = useState<PdfDocumentState>({
    doc: null,
    pageCount: 0,
    status: 'loading',
    error: null,
  })

  useEffect(() => {
    if (!url) {
      setState({ doc: null, pageCount: 0, status: 'loading', error: null })
      return
    }

    let cancelled = false
    // Tearing down is the *loading task's* job in pdf.js: it aborts the fetch
    // and destroys the worker, which the document proxy alone can't.
    let task: { destroy: () => Promise<void> } | null = null
    setState({ doc: null, pageCount: 0, status: 'loading', error: null })

    void (async () => {
      try {
        const { pdfjs, STANDARD_FONT_DATA_URL } = await import('@/lib/pdfjsSetup')
        const loadingTask = pdfjs.getDocument({ url, standardFontDataUrl: STANDARD_FONT_DATA_URL })
        task = loadingTask
        const doc = await loadingTask.promise
        if (cancelled) return
        setState({ doc, pageCount: doc.numPages, status: 'ready', error: null })
      } catch (err) {
        if (cancelled) return
        // Everything that can go wrong here — the endpoint isn't deployed, the
        // publisher moved the file, the network died — reaches the reader as
        // one sentence plus the link out to the source, which is the only
        // action any of them leaves.
        const message = err instanceof Error ? err.message : 'Unknown error'
        setState({ doc: null, pageCount: 0, status: 'error', error: message })
      }
    })()

    return () => {
      cancelled = true
      void task?.destroy()
    }
  }, [url])

  return state
}
