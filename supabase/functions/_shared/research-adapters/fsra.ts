// FSRA adapter — Financial Services Regulatory Authority of Ontario.
//
// Reality notes:
//   - FSRA publishes insurance guidance, bulletins, and consultations on
//     fsrao.ca. The listings are rendered as HTML anchor lists within a
//     content region; the regex-based `parseListingLinks` below is a
//     conservative starting point and will likely need adjustment once an
//     adapter run against the live site reveals the actual DOM shape.
//   - FSRA's primary P&C-relevant output is auto-insurance product guidance,
//     rate-filing requirements, and market-conduct bulletins — these map to
//     Exam 6C/8 (product regulation, market conduct) syllabus material.
//   - All FSRA publications are in English; jurisdiction is Ontario only.
//   - The newsroom consultation page uses the same HTML structure as the
//     guidance page, so the same link parser handles both.

import type { AdapterContext, AdapterResult, DocumentInsert } from './types.ts'
import { emptyResult } from './types.ts'

const AGENT_ID = 'fsra'
const SOURCE_NAME = 'fsra'

const LISTING_PAGES = [
  { url: 'https://www.fsrao.ca/industry/insurance/regulatory-framework/guidance-and-bulletins', label: 'Guidance and Bulletins' },
  { url: 'https://www.fsrao.ca/newsroom/consultation-documents', label: 'Consultations' },
]

// Same memory-budget rationale as the OSFI adapter — 2 per page keeps us
// safely under the 150 MB edge-function limit on the free plan.
const MAX_DOCS_PER_LISTING_PAGE = 2
const MAX_RAW_TEXT_CHARS = 20_000

interface ListingLink {
  title: string
  href: string
}

// Conservative <a>-tag scrape. FSRA's site structures guidance links inside
// a `.content-area` or similar wrapper; the regex filters on hrefs that look
// like guidance slugs (/regulation/, /guidance/, /bulletin/, /consultation/)
// to skip navigation/utility links.
function parseListingLinks(html: string, baseUrl: string): ListingLink[] {
  const out: ListingLink[] = []
  const linkRe = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
  const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  let match: RegExpExecArray | null
  while ((match = linkRe.exec(html)) !== null) {
    const href = match[1]
    const title = stripTags(match[2])
    if (!title || title.length < 8) continue
    // Keep links whose title or path suggests a regulatory document.
    if (
      !/bulletin|guidance|circular|consultation|directive|notice|advisory/i.test(title) &&
      !/\/regulation\/|\/guidance\/|\/bulletin\/|\/consultation\//i.test(href)
    ) continue
    const absolute = href.startsWith('http') ? href : new URL(href, baseUrl).toString()
    out.push({ title, href: absolute })
  }
  return out
}

function classifyDocumentType(title: string): DocumentInsert['type'] {
  if (/consultation/i.test(title)) return 'consultation_paper'
  if (/bulletin/i.test(title)) return 'regulatory_bulletin'
  if (/circular/i.test(title)) return 'regulatory_circular'
  if (/directive|guideline|guidance/i.test(title)) return 'approved_guideline'
  return 'regulatory_bulletin'
}

async function buildDocument(
  ctx: AdapterContext,
  link: ListingLink,
  errors: AdapterResult['errors'],
): Promise<DocumentInsert | null> {
  const rawText = await ctx.fetchText(link.href)
  if (!rawText) {
    errors.push({ source: SOURCE_NAME, message: 'Failed to fetch document text', url: link.href })
    return null
  }

  const extraction = await ctx.extract(rawText, link.href)
  const base: DocumentInsert = {
    agent_id: AGENT_ID,
    type: classifyDocumentType(link.title),
    title: link.title,
    published_at: new Date().toISOString(),
    jurisdiction_provinces: ['ON'],
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
    // LLM may refine the province list (e.g. if doc is explicitly province-scoped);
    // fall back to the Ontario default if it returns nothing useful.
    jurisdiction_provinces: extraction.jurisdictionProvinces?.length
      ? extraction.jurisdictionProvinces
      : ['ON'],
  }
}

export async function fetchFsraUpdates(ctx: AdapterContext): Promise<AdapterResult> {
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
        const doc = await buildDocument(ctx, link, result.errors)
        if (doc) result.documents.push(doc)
      } catch (err) {
        result.errors.push({ source: SOURCE_NAME, message: (err as Error)?.message ?? 'Unknown error', url: link.href })
      }
    }
  }

  return result
}
