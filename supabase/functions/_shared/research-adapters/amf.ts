// AMF adapter — Autorité des marchés financiers (Quebec).
//
// Reality notes:
//   - AMF publishes bilingual (French/English) insurance circulars, bulletins,
//     and consultation papers at lautorite.qc.ca. We target the English section
//     (/en/) as canonical — matching how the rest of the corpus is modelled;
//     the OSFI adapter comments note this explicitly for the bilingual case.
//   - AMF's primary P&C-relevant output is product-regulation circulars for
//     auto and property insurance, and market-conduct bulletins — these map to
//     Exam 6C/8 (Québec regulatory framework) syllabus material.
//   - The circulars listing is an HTML page where each publication is in an
//     anchor tag inside a table or list; the regex parser targets hrefs that
//     contain the AMF's document-path conventions (/publications/, /circulars/,
//     /bulletins/) or whose text signals a regulatory document type.
//   - PDF delivery is common for final circulars; `fetchText` routes those
//     through `unpdf` automatically.

import type { AdapterContext, AdapterResult, DocumentInsert } from './types.ts'
import { emptyResult } from './types.ts'

const AGENT_ID = 'amf'
const SOURCE_NAME = 'amf'

const LISTING_PAGES = [
  {
    url: 'https://lautorite.qc.ca/en/professionals/insurers/publications-and-forms/circulars',
    label: 'Insurance Circulars',
  },
  {
    url: 'https://lautorite.qc.ca/en/professionals/insurers/publications-and-forms/bulletins',
    label: 'Insurance Bulletins',
  },
]

const MAX_DOCS_PER_LISTING_PAGE = 2
const MAX_RAW_TEXT_CHARS = 20_000

interface ListingLink {
  title: string
  href: string
}

// lautorite.qc.ca serves its document listings as anchor tags inside a
// structured content area. We filter on href patterns for the /en/ subtree
// and title text that signals a circular, bulletin, or consultation. French
// title text is also accepted here (the document's canonical English content
// is what gets stored in raw_text once fetched).
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
      // English titles
      !/circular|bulletin|consultation|notice|directive|guideline|advisory/i.test(title) &&
      // French titles (circulaire, bulletin, consultation, avis, directive, ligne directrice)
      !/circulaire|avis|directive|ligne directrice/i.test(title) &&
      // URL path signals
      !/\/publications\/|\/circulars\/|\/bulletins\/|\/consultation\//i.test(href)
    ) continue
    if (href.startsWith('#') || href.startsWith('javascript:')) continue
    // Prefer the English subtree; if the href is French (/fr/), remap it.
    let canonicalHref = href.startsWith('http') ? href : new URL(href, baseUrl).toString()
    canonicalHref = canonicalHref.replace(/lautorite\.qc\.ca\/fr\//, 'lautorite.qc.ca/en/')
    out.push({ title, href: canonicalHref })
  }
  return out
}

function classifyDocumentType(title: string): DocumentInsert['type'] {
  if (/consultation/i.test(title)) return 'consultation_paper'
  if (/circular|circulaire/i.test(title)) return 'regulatory_circular'
  if (/bulletin/i.test(title)) return 'regulatory_bulletin'
  if (/guideline|ligne directrice|directive/i.test(title)) return 'approved_guideline'
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
    jurisdiction_provinces: ['QC'],
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
    // AMF is always Québec-only; don't let the LLM widen scope.
    jurisdiction_provinces: ['QC'],
  }
}

export async function fetchAmfUpdates(ctx: AdapterContext): Promise<AdapterResult> {
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
