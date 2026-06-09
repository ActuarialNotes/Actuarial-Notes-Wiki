// Shared URL → plain-text fetcher for research ingestion.
//
// HTML is decoded directly; PDFs are routed through `unpdf` (a pure-JS,
// edge-runtime-friendly extractor — no native deps, unlike pdf-parse/pdfjs-dist's
// worker requirements). Network/parse failures return null so callers can log
// and continue. Used by both the scheduled orchestrator (research-ingest) and
// the on-demand add-by-URL function (research-ingest-url).

export async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-CA,en;q=0.9',
      },
    })
    if (!res.ok) return null

    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('pdf') || url.toLowerCase().endsWith('.pdf')) {
      const { extractText } = await import('https://esm.sh/unpdf@0.12.1')
      const buffer = new Uint8Array(await res.arrayBuffer())
      const { text } = await extractText(buffer, { mergePages: true })
      return Array.isArray(text) ? text.join('\n') : text
    }

    return await res.text()
  } catch (err) {
    console.error('research: fetchText failed for', url, err)
    return null
  }
}
