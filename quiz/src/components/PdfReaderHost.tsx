import { usePdfReader } from '@/hooks/usePdfReader'
import { PdfViewerPanel } from '@/components/PdfViewerPanel'

/**
 * The app's single exam-PDF reader, mounted once at the root.
 *
 * Every PDF button in the app opens its document through `usePdfReader`
 * (`PdfLinkButton` is the button), and this is the one place the panel is
 * drawn. Being a root-level child is the whole point: the reader then clears
 * every dialog and sheet that can open it, and survives that host closing or
 * unmounting underneath it.
 *
 * Keyed on the document's URL so switching papers remounts the panel rather
 * than leaving the previous document's page number, zoom and scroll position
 * on the new one.
 */
export function PdfReaderHost() {
  const doc = usePdfReader(state => state.doc)
  const closePdf = usePdfReader(state => state.closePdf)
  if (!doc) return null
  return (
    <PdfViewerPanel
      key={doc.url}
      url={doc.url}
      title={doc.title}
      subtitle={doc.subtitle}
      hostFullScreen={doc.hostFullScreen}
      onClose={closePdf}
    />
  )
}

export default PdfReaderHost
