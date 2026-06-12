// Shared types for research document ingestion (research-ingest-url) and the
// LLM extraction step (extract.ts) it calls.

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
