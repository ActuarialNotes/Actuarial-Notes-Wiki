import { useEffect, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { describeNonPdfResponse, looksLikePdf } from '@/lib/examPdf'

// Loads one PDF for the viewer panel.
//
// pdf.js is pulled in on demand — the library and its worker are a large chunk
// nobody who never opens a paper should pay for — and torn down with the
// document, so closing the panel releases the worker's memory rather than
// leaving a 60-page render context alive behind the quiz builder.
//
// The bytes are fetched here rather than handed to pdf.js as a URL, so that a
// response which *isn't* a PDF can be described honestly. pdf.js can only say
// "Invalid PDF structure", which is true of an error page, a redirect and a
// truncated file alike, and reads as "this document is corrupt" when the real
// answer is usually "nothing served the document".

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
    // Tearing down is the *loading task's* job in pdf.js: it aborts the parse
    // and destroys the worker, which the document proxy alone can't.
    let task: { destroy: () => Promise<void> } | null = null
    const controller = new AbortController()
    setState({ doc: null, pageCount: 0, status: 'loading', error: null })

    void (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal })
        const buffer = await response.arrayBuffer()
        if (cancelled) return

        if (!response.ok || !looksLikePdf(new Uint8Array(buffer.slice(0, 8)))) {
          const body = new TextDecoder().decode(buffer.slice(0, 2048))
          const reason = describeNonPdfResponse(
            response.status,
            response.headers.get('content-type') ?? '',
            body,
          )
          throw new Error(reason)
        }

        const { pdfjs, STANDARD_FONT_DATA_URL } = await import('@/lib/pdfjsSetup')
        const loadingTask = pdfjs.getDocument({ data: buffer, standardFontDataUrl: STANDARD_FONT_DATA_URL })
        task = loadingTask
        const doc = await loadingTask.promise
        if (cancelled) return
        setState({ doc, pageCount: doc.numPages, status: 'ready', error: null })
      } catch (err) {
        if (cancelled || (err as { name?: string })?.name === 'AbortError') return
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
      controller.abort()
      void task?.destroy()
    }
  }, [url])

  return state
}
