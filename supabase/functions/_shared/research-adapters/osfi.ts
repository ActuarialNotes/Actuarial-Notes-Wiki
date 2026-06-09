// OSFI adapter — Office of the Superintendent of Financial Institutions.
//
// Reality notes (per the ingestion design — encode adjustments here as you
// learn more from the live site):
//   - OSFI is the most structurally consistent of the regulator sources: its
//     "Letters and Guides" and "Guidelines" index pages are plain HTML listings
//     (title + date + link), not PDF-only like FSRA.
//   - MCT (Minimum Capital Test) guideline updates are the single most
//     exam-relevant document type from this source — they map directly to
//     Exam 6C/8 solvency-regulation syllabus material.
//   - The regex-based `parseListingLinks` below is a deliberately conservative
//     starting point (title text + href off `<a>` tags within the listing
//     container). OSFI's markup will need to be inspected against the live
//     page and this swapped for an HTML-parser-based selector once an adapter
//     run against production reveals the actual DOM shape — do not assume the
//     regex below survives a markup change.
//   - All OSFI publications are federal and English/French bilingual; we take
//     the English version as canonical (matches how the rest of the corpus is
//     modelled — only AMF needs the bilingual `metadata` treatment).

import type { AdapterContext, AdapterResult, DocumentInsert } from './types.ts'
import { emptyResult } from './types.ts'

const AGENT_ID = 'osfi'
const SOURCE_NAME = 'osfi'

const LISTING_PAGES = [
  { url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?f%5B0%5D=guidance_type%3A2616', label: 'Guidelines' },
  { url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?f%5B0%5D=guidance_type%3A2617', label: 'Letters and Advisories' },
]

// Cap per listing page to avoid the 150 MB edge-function memory limit on the
// free plan. OSFI guideline pages are large HTML documents; 2 per page (4
// total per run) keeps peak usage safely under the limit. Raise once on a
// paid plan or after switching to a streaming/chunked fetch approach.
const MAX_DOCS_PER_LISTING_PAGE = 2

// Truncate raw text before storing — large OSFI pages can be 500 KB+ and
// accumulate quickly across multiple documents in the same run.
const MAX_RAW_TEXT_CHARS = 20_000

interface ListingLink {
  title: string
  href: string
  dateText: string | null
}

// Scrape a listing page for individual guidance document links.
//
// Key design notes (informed by inspecting OSFI's actual HTML):
//   - Individual document URLs follow /en/guidance/guidance-library/<slug>.
//     Requiring a non-empty slug after /guidance-library/ filters out the
//     listing hub itself (/en/guidance/guidance-library) and navigation
//     breadcrumb links (/en/guidance) which were matching the old broad regex
//     and, via .slice(0, MAX_DOCS_PER_LISTING_PAGE), crowding out real docs.
//   - OSFI (GC Web Theme / Drupal) renders dates as
//     <time datetime="YYYY-MM-DD"> inside the same item block as the title.
//     We search a 1000-char window around each matched link to pick that up.
function parseListingLinks(html: string, baseUrl: string): ListingLink[] {
  const out: ListingLink[] = []
  const seen = new Set<string>()
  const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  // Match hrefs of the form /…/guidance-library/<slug> where <slug> starts
  // with an alphanumeric character — this excludes the bare listing hub URL
  // (/guidance-library with no trailing path segment) and query-param-only
  // variants (/guidance-library?f[0]=…).
  const linkRe = /<a[^>]+href="([^"]*\/guidance-library\/[a-z0-9][^"?#]*)"[^>]*>([\s\S]*?)<\/a>/gi

  let match: RegExpExecArray | null
  while ((match = linkRe.exec(html)) !== null) {
    const rawHref = match[1]
    if (seen.has(rawHref)) continue
    seen.add(rawHref)

    const title = stripTags(match[2])
    if (!title || title.length < 8) continue

    // Look for <time datetime="YYYY-MM-DD"> within the same item block.
    const linkPos = match.index
    const vicinity = html.slice(Math.max(0, linkPos - 300), linkPos + 800)
    const timeMatch = /datetime="(\d{4}-\d{2}-\d{2})"/.exec(vicinity)
    const dateText = timeMatch ? timeMatch[1] : null

    const absolute = rawHref.startsWith('http') ? rawHref : new URL(rawHref, baseUrl).toString()
    out.push({ title, href: absolute, dateText })
  }

  return out
}

function classifyDocumentType(title: string): DocumentInsert['type'] {
  if (/guideline/i.test(title)) return 'approved_guideline'
  if (/letter|advisory/i.test(title)) return 'regulatory_circular'
  if (/consultation/i.test(title)) return 'consultation_paper'
  return 'regulatory_bulletin'
}

async function buildDocument(ctx: AdapterContext, link: ListingLink, errors: AdapterResult['errors']): Promise<DocumentInsert | null> {
  const rawText = await ctx.fetchText(link.href)
  if (!rawText) {
    errors.push({ source: SOURCE_NAME, message: `Failed to fetch document text`, url: link.href })
    return null
  }

  const extraction = await ctx.extract(rawText, link.href)
  const base: DocumentInsert = {
    agent_id: AGENT_ID,
    type: classifyDocumentType(link.title),
    title: link.title,
    published_at: link.dateText ? new Date(link.dateText).toISOString() : new Date().toISOString(),
    jurisdiction_provinces: [],          // OSFI is federal — no provincial scoping
    line_of_business: null,
    url: link.href,
    pdf_url: link.href.toLowerCase().endsWith('.pdf') ? link.href : null,
    raw_text: rawText.length > MAX_RAW_TEXT_CHARS ? rawText.slice(0, MAX_RAW_TEXT_CHARS) : rawText,
    is_in_review: true,
  }

  if (!extraction) return base

  return {
    ...base,
    type: extraction.documentType ?? base.type,
    effective_date: extraction.effectiveDate,
    summary: extraction.summary,
    exam_tags: extraction.examTags,
    extraction_confidence: extraction.confidence,
    is_in_review: extraction.confidence < 0.85,
  }
}

export async function fetchOsfiUpdates(ctx: AdapterContext): Promise<AdapterResult> {
  const result = emptyResult()

  for (const page of LISTING_PAGES) {
    const html = await ctx.fetchText(page.url)
    if (!html) {
      result.errors.push({ source: SOURCE_NAME, message: `Failed to fetch listing page (${page.label})`, url: page.url })
      continue
    }

    const links = parseListingLinks(html, page.url).slice(0, MAX_DOCS_PER_LISTING_PAGE)
    for (const link of links) {
      try {
        // OSFI publications (guidelines/letters) rarely carry the kind of
        // quantitative disclosures `research_metrics` is meant for — that's
        // mostly insurer financial-disclosure territory (see intact.ts).
        const doc = await buildDocument(ctx, link, result.errors)
        if (doc) result.documents.push(doc)
      } catch (err) {
        result.errors.push({ source: SOURCE_NAME, message: (err as Error)?.message ?? 'Unknown error processing link', url: link.href })
      }
    }
  }

  return result
}
