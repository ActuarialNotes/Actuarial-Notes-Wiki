// Shared types for research-ingest source adapters. Each adapter is a pure
// async function `(ctx: AdapterContext) => Promise<AdapterResult>` — no shared
// mutable state, no throwing on per-document failures (partial success is fine,
// log to `errors` instead).

export type DocumentType =
  | 'regulatory_bulletin' | 'regulatory_circular' | 'consultation_paper'
  | 'approved_guideline' | 'rate_filing_summary' | 'supervisory_framework'
  | 'annual_report' | 'quarterly_supplement' | 'md_and_a' | 'press_release'
  | 'investor_presentation' | 'industry_statistics' | 'research_report'
  | 'cia_educational_note'

export interface DocumentInsert {
  agent_id: string
  type: DocumentType
  title: string
  published_at: string             // ISO timestamp
  effective_date?: string | null    // YYYY-MM-DD
  jurisdiction_provinces?: string[] | null
  line_of_business?: string[] | null
  url: string
  pdf_url?: string | null
  summary?: string | null
  exam_tags?: string[] | null
  extraction_confidence?: number | null
  is_in_review?: boolean
  raw_text?: string | null
}

export interface MetricInsert {
  agent_id: string
  metric_name: string
  value: number
  unit: string
  period: string
  province?: string | null
  line_of_business?: string | null
  source_page: number
  source_text: string
  confidence: number
  // Transient join key — the canonical `url` of the document this metric was
  // extracted from. The orchestrator resolves it to a `document_id` after
  // inserting documents, then strips it before writing to `research_metrics`
  // (which has no such column). Adapters must set this to the same value they
  // used as the document's `url`.
  sourceUrl: string
}

export interface AdapterError {
  source: string
  message: string
  url?: string
}

export interface AdapterResult {
  documents: DocumentInsert[]
  metrics: MetricInsert[]
  errors: AdapterError[]
}

export function emptyResult(): AdapterResult {
  return { documents: [], metrics: [], errors: [] }
}

// Context handed to every adapter. `extract` runs the shared LLM extraction
// step (see extract.ts) — adapters call it once they've fetched a document's
// raw text, rather than each rolling their own Anthropic integration.
export interface AdapterContext {
  extract: (rawText: string, sourceUrl: string) => Promise<ExtractionResult | null>
  fetchText: (url: string) => Promise<string | null>
}

export interface ExtractedMetric {
  name: string
  value: number
  unit: string
  period: string
  province: string | null
  sourcePage: number
  sourceText: string
}

export interface ExtractionResult {
  documentType: DocumentType | null
  jurisdictionProvinces: string[] | null
  effectiveDate: string | null
  supersedes: string | null
  metrics: ExtractedMetric[]
  examTags: string[]
  summary: string | null
  confidence: number
}
