// Intact Financial Corporation adapter.
//
// Reality notes (per the ingestion design):
//   - Best-in-class disclosure among the insurers in the corpus. The quarterly
//     investor-supplement PDFs are the highest-value target — unlike the
//     headline MD&A, they break results down by province and line of business,
//     which is exactly the granularity `research_metrics.province` /
//     `line_of_business` need.
//   - SEDAR+ (sedarplus.ca) is the canonical filing source; Intact's own
//     investor-relations page is a secondary mirror that's often easier to
//     scrape (stable URLs, no SEDAR+ session/search quirks). This adapter
//     prefers the IR page and falls back to nothing rather than guessing at
//     a SEDAR+ document id — a wrong id would silently skip a real filing.
//   - Quarterly cadence: results land ~mid-Feb, mid-May, mid-Aug, mid-Nov.
//     `research-ingest`'s pg_cron schedule should trigger this adapter on
//     that cadence rather than daily (see migration / cron config).
//   - Like osfi.ts, `parseSupplementLinks` is a conservative <a>-tag scrape
//     that will need adjustment once run against Intact's live IR markup.

import type { AdapterContext, AdapterResult, DocumentInsert, MetricInsert, ExtractionResult } from './types.ts'
import { emptyResult } from './types.ts'

const AGENT_ID = 'intact-financial'
const SOURCE_NAME = 'intact-financial'

const IR_SUPPLEMENT_PAGE = 'https://www.intactfc.com/English/investor-relations/financial-reports-and-filings/default.aspx'

interface SupplementLink {
  title: string
  href: string
}

function parseSupplementLinks(html: string, baseUrl: string): SupplementLink[] {
  const out: SupplementLink[] = []
  const linkRe = /<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi
  const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  let match: RegExpExecArray | null
  while ((match = linkRe.exec(html)) !== null) {
    const href = match[1]
    const title = stripTags(match[2])
    if (!title) continue
    if (!/supplement|investor|quarterly|financial report|md&a|management.s discussion/i.test(title)) continue
    const absolute = href.startsWith('http') ? href : new URL(href, baseUrl).toString()
    out.push({ title, href: absolute })
  }
  return out
}

function classifyDocumentType(title: string): DocumentInsert['type'] {
  if (/supplement/i.test(title)) return 'quarterly_supplement'
  if (/md&a|management.s discussion/i.test(title)) return 'md_and_a'
  if (/annual report/i.test(title)) return 'annual_report'
  if (/presentation/i.test(title)) return 'investor_presentation'
  return 'press_release'
}

// Build research_metrics rows from the extraction step's structured metrics.
// `document_id` isn't known yet — the orchestrator resolves it from
// `sourceUrl` once the matching document row has been inserted/upserted (see
// persistAdapterResult in research-ingest/index.ts, which strips `sourceUrl`
// before the actual `research_metrics` insert). Metrics below the schema's
// confidence floor are dropped; the document itself still lands with
// `is_in_review: true` so a human can recover them from the raw text.
function buildMetrics(extracted: ExtractionResult, sourceUrl: string): MetricInsert[] {
  if (extracted.confidence < 0.85) return []
  return extracted.metrics.map(m => ({
    agent_id: AGENT_ID,
    metric_name: m.name,
    value: m.value,
    unit: m.unit,
    period: m.period,
    province: m.province,
    line_of_business: 'personal_auto',
    source_page: m.sourcePage,
    source_text: m.sourceText,
    confidence: extracted.confidence,
    sourceUrl,
  }))
}

export async function fetchIntactUpdates(ctx: AdapterContext): Promise<AdapterResult> {
  const result = emptyResult()

  const html = await ctx.fetchText(IR_SUPPLEMENT_PAGE)
  if (!html) {
    result.errors.push({ source: SOURCE_NAME, message: 'Failed to fetch investor-relations page', url: IR_SUPPLEMENT_PAGE })
    return result
  }

  const links = parseSupplementLinks(html, IR_SUPPLEMENT_PAGE)
  for (const link of links) {
    try {
      const rawText = await ctx.fetchText(link.href)
      if (!rawText) {
        result.errors.push({ source: SOURCE_NAME, message: 'Failed to fetch PDF text', url: link.href })
        continue
      }

      const extraction = await ctx.extract(rawText, link.href)
      const doc: DocumentInsert = {
        agent_id: AGENT_ID,
        type: extraction?.documentType ?? classifyDocumentType(link.title),
        title: link.title,
        published_at: new Date().toISOString(),
        effective_date: extraction?.effectiveDate ?? null,
        jurisdiction_provinces: extraction?.jurisdictionProvinces ?? null,
        line_of_business: ['personal_auto'],
        // `url` must be the per-document canonical link (not the shared IR
        // listing page) — research_documents upserts on `url`, and every
        // document from this adapter would otherwise collapse onto one row.
        url: link.href,
        pdf_url: link.href,
        summary: extraction?.summary ?? null,
        exam_tags: extraction?.examTags ?? null,
        extraction_confidence: extraction?.confidence ?? null,
        is_in_review: !extraction || extraction.confidence < 0.85,
        raw_text: rawText,
      }
      result.documents.push(doc)

      if (extraction) result.metrics.push(...buildMetrics(extraction, link.href))
    } catch (err) {
      result.errors.push({ source: SOURCE_NAME, message: (err as Error)?.message ?? 'Unknown error processing link', url: link.href })
    }
  }

  return result
}
