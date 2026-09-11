import { useEffect, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import {
  buildChapters,
  chapterOutlineLevel,
  destPageNumber,
  type PdfChapter,
  type PdfOutlineNode,
  type ResolvedOutlineNode,
} from '@/lib/pdfChapters'

// The chapters of the open document, read off its outline — the bookmarks a
// PDF viewer normally shows in a sidebar. They become the segments of the
// reader's page bar, the way a video's chapters segment its timeline.
//
// Resolving them is the part that needs the document: a bookmark points at a
// page *object*, and only pdf.js can say which page that is. Everything that
// can be decided from the values alone is in `lib/pdfChapters.ts`.
//
// A document with no outline — a scanned photocopy, which is most of the older
// papers — simply has no chapters, and the bar stays the plain strip it has
// always been. Nothing here invents one.

/** The page a bookmark points at, 1-indexed, or null if it can't be followed. */
async function outlinePage(doc: PDFDocumentProxy, node: PdfOutlineNode): Promise<number | null> {
  try {
    // A named destination is a key into the document's own table; an explicit
    // one is already the array that table would have returned.
    const dest = typeof node.dest === 'string' ? await doc.getDestination(node.dest) : node.dest
    const direct = destPageNumber(dest)
    if (direct !== null) return direct
    const ref = Array.isArray(dest) ? dest[0] : null
    if (!ref || typeof ref !== 'object') return null
    return (await doc.getPageIndex(ref as Parameters<PDFDocumentProxy['getPageIndex']>[0])) + 1
  } catch {
    // One bookmark pointing at a page the document doesn't have shouldn't cost
    // the reader the other forty.
    return null
  }
}

/** The open document's chapters — `[]` while loading, and for a document with none. */
export function usePdfChapters(doc: PDFDocumentProxy | null): PdfChapter[] {
  const [chapters, setChapters] = useState<PdfChapter[]>([])

  useEffect(() => {
    setChapters([])
    if (!doc) return

    let cancelled = false
    void (async () => {
      try {
        const outline = (await doc.getOutline()) as PdfOutlineNode[] | null
        if (cancelled) return
        const level = chapterOutlineLevel(outline)
        if (level.length === 0) return
        const resolved: ResolvedOutlineNode[] = await Promise.all(
          level.map(async node => ({ title: node.title, page: await outlinePage(doc, node) })),
        )
        if (cancelled) return
        setChapters(buildChapters(resolved, doc.numPages))
      } catch {
        // An outline that won't parse is not worth telling anyone about: the
        // bar is then exactly what it is for a document that has none.
      }
    })()

    return () => { cancelled = true }
  }, [doc])

  return chapters
}
