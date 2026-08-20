// The client half of the exam-PDF viewer: where a source paper is read from,
// and what it's called once saved.
//
// Nothing here fetches the publisher directly. `api/exam-pdf.js` re-serves the
// file from our own origin, because the examining bodies send no CORS headers,
// may refuse to be framed, and can't be saved through a cross-origin
// `<a download>`. This module only builds the URLs and keeps the same
// allowlist the endpoint enforces, so an unsupported source is refused before a
// viewer is opened rather than after a request round-trips.

/** Hosts whose PDFs the endpoint will serve. Mirrors `DEFAULT_HOSTS` in `api/exam-pdf.js`. */
export const EXAM_PDF_HOSTS = ['casact.org', 'www.casact.org', 'soa.org', 'www.soa.org']

/** Can this URL be shown in the viewer? https, a `.pdf`, on a publisher we proxy. */
export function isSupportedPdfSource(url: string): boolean {
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === 'https:' &&
      EXAM_PDF_HOSTS.includes(parsed.hostname.toLowerCase()) &&
      /\.pdf$/i.test(parsed.pathname)
    )
  } catch {
    return false
  }
}

/** The proxy endpoint. Overridable for a split deployment, as `VITE_PASS_RATES_URL` is. */
export function examPdfEndpoint(): string {
  return import.meta.env.VITE_EXAM_PDF_URL || '/api/exam-pdf'
}

/** Where the viewer reads the document's bytes from. */
export function pdfProxyUrl(sourceUrl: string): string {
  return `${examPdfEndpoint()}?url=${encodeURIComponent(sourceUrl)}`
}

/** The same file, served as an attachment so the browser saves it. */
export function pdfDownloadUrl(sourceUrl: string): string {
  return `${examPdfEndpoint()}?url=${encodeURIComponent(sourceUrl)}&download=1`
}

/** The file's own name (`sp19-5.pdf`), used as the download filename. */
export function pdfFileName(sourceUrl: string): string {
  try {
    const name = new URL(sourceUrl).pathname.split('/').pop()
    return name && /\.pdf$/i.test(name) ? name : 'exam.pdf'
  } catch {
    return 'exam.pdf'
  }
}

/** The publisher, for the "where did this come from" line under the viewer. */
export function pdfSourceHost(sourceUrl: string): string {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
