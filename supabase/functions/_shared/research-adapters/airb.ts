// AIRB adapter — Alberta Insurance Rate Board.
//
// Reality notes:
//   - The AIRB reviews and approves auto insurance base rates for Alberta's
//     private passenger vehicles; its primary output is rate orders, hearing
//     decisions, and consultation notices published at irb.alberta.ca.
//   - These documents map most directly to Exam 6C/8 (rate regulation,
//     product regulation) and are Alberta-jurisdiction only.
//   - The AIRB website is a Government of Alberta property and may serve
//     listing pages as ASP.NET WebForms or SharePoint HTML — the regex-based
//     link parser below targets `<a>` tags whose text or href signals a rate
//     order, decision, or hearing document.
//   - PDFs are the typical delivery format for final rate orders; the
//     `fetchText` helper in the orchestrator routes these through `unpdf`.
//   - All AIRB publications are English-only; no bilingual treatment needed.

import type { AdapterContext, AdapterResult, DocumentInsert } from './types.ts'
import { emptyResult } from './types.ts'

const AGENT_ID = 'airb'
const SOURCE_NAME = 'airb'

const LISTING_PAGES = [
  { url: 'https://irb.alberta.ca/Pages/RulesMakingProcess.aspx', label: 'Rate Orders and Decisions' },
  { url: 'https://irb.alberta.ca/Pages/default.aspx', label: 'Home / Recent Publications' },
]

const MAX_DOCS_PER_LISTING_PAGE = 2
const MAX_RAW_TEXT_CHARS = 20_000

interface ListingLink {
  title: string
  href: string
}

// AIRB's site is a SharePoint/Alberta.ca host. Link titles that signal
// regulatory documents include: "Order", "Decision", "Rate", "Hearing",
// "Notice", "Bulletin". Hrefs typically contain /Documents/ or .pdf suffixes.
function parseListingLinks(html: string, baseUrl: string): ListingLink[] {
  const out: ListingLink[] = []
  const linkRe = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
  const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  let match: RegExpExecArray | null
  while ((match = linkRe.exec(html)) !== null) {
    const href = match[1]
    const title = stripTags(match[2])
    if (!title || title.length < 6) continue
    if (
      !/order|decision|rate|hearing|notice|bulletin|filing|circular/i.test(title) &&
      !/\/Documents\/|\.pdf$/i.test(href)
    ) continue
    // Skip anchor-only or javascript: hrefs.
    if (href.startsWith('#') || href.startsWith('javascript:')) continue
    const absolute = href.startsWith('http') ? href : new URL(href, baseUrl).toString()
    out.push({ title, href: absolute })
  }
  return out
}

function classifyDocumentType(title: string): DocumentInsert['type'] {
  if (/order|decision/i.test(title)) return 'rate_filing_summary'
  if (/consultation|notice/i.test(title)) return 'consultation_paper'
  if (/bulletin|circular/i.test(title)) return 'regulatory_bulletin'
  if (/guideline|framework/i.test(title)) return 'supervisory_framework'
  return 'rate_filing_summary'
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
    jurisdiction_provinces: ['AB'],
    line_of_business: ['auto'],         // AIRB is auto-rate-only by mandate
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
    // AIRB is always Alberta-only; don't let the LLM widen the scope.
    jurisdiction_provinces: ['AB'],
  }
}

export async function fetchAirbUpdates(ctx: AdapterContext): Promise<AdapterResult> {
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
