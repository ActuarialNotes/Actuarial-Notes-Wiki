// The client half of the exam-PDF viewer: where a source paper is read from,
// and what it's called once saved.
//
// Nothing here fetches the publisher directly. `quiz/api/exam-pdf.js` re-serves the
// file from our own origin, because the examining bodies send no CORS headers,
// may refuse to be framed, and can't be saved through a cross-origin
// `<a download>`. This module only builds the URLs and keeps the same
// allowlist the endpoint enforces, so an unsupported source is refused before a
// viewer is opened rather than after a request round-trips.

/**
 * Hosts whose PDFs the endpoint will serve. Mirrors `DEFAULT_HOSTS` in
 * `quiz/api/exam-pdf.js`.
 *
 * Wider than the exams alone: a source document a resource page links to — an
 * ASOP on the standards board's site — is read in the same viewer, so its
 * publisher belongs here too. Adding a host here without adding it there opens
 * a viewer the endpoint then refuses.
 */
export const EXAM_PDF_HOSTS = [
  'casact.org',
  'www.casact.org',
  'soa.org',
  'www.soa.org',
  'actuarialstandardsboard.org',
  'www.actuarialstandardsboard.org',
]

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

/** The first bytes of every PDF. Anything else is not one, whatever it claims. */
const PDF_MAGIC = '%PDF-'

export function looksLikePdf(bytes: Uint8Array): boolean {
  if (bytes.length < PDF_MAGIC.length) return false
  for (let i = 0; i < PDF_MAGIC.length; i++) {
    if (bytes[i] !== PDF_MAGIC.charCodeAt(i)) return false
  }
  return true
}

/**
 * A reader-facing sentence for a response that came back without a PDF in it.
 *
 * The case worth naming precisely is HTML: the app is a single-page app whose
 * host rewrites unknown paths to `index.html`, so a deployment missing the
 * endpoint answers **200 with the app's own page**. Handed to a PDF parser that
 * reads as "invalid structure", which sends whoever debugs it hunting for a
 * corrupt file instead of a missing function.
 */
export function describeNonPdfResponse(status: number, contentType: string, body: string): string {
  const type = contentType.toLowerCase()
  const trimmed = body.trimStart()

  if (type.includes('text/html') || trimmed.startsWith('<!') || trimmed.startsWith('<html')) {
    return "the PDF service isn't available on this deployment"
  }
  if (type.includes('json')) {
    try {
      const parsed = JSON.parse(body) as { error?: unknown }
      if (typeof parsed.error === 'string' && parsed.error) return parsed.error
    } catch {
      /* not the JSON it claimed to be — fall through */
    }
  }
  if (status < 200 || status >= 300) return `the service responded ${status}`
  return 'the response was not a PDF'
}

/** The publisher, for the "where did this come from" line under the viewer. */
export function pdfSourceHost(sourceUrl: string): string {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
