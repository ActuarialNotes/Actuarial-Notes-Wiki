// Shared LLM extraction step for research-ingest adapters. Calls Anthropic
// with the structured-extraction prompt and parses its JSON response into an
// ExtractionResult. Adapters call `extract(rawText, sourceUrl)` once they have
// a document's plain-text content; this keeps the Anthropic integration (auth,
// retries, JSON-repair) in one place rather than duplicated per adapter.

import type { ExtractionResult, ExtractedMetric, DocumentType } from './types.ts'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'
const MAX_TOKENS = 4096
const MAX_CHARS = 60000

const VALID_DOCUMENT_TYPES: ReadonlySet<string> = new Set([
  'regulatory_bulletin', 'regulatory_circular', 'consultation_paper',
  'approved_guideline', 'rate_filing_summary', 'supervisory_framework',
  'annual_report', 'quarterly_supplement', 'md_and_a', 'press_release',
  'investor_presentation', 'industry_statistics', 'research_report',
  'cia_educational_note',
])

// Canonical benchmark metric_name slugs. Keep in sync with the client-side
// catalog in quiz/src/lib/researchMetrics.ts (RESEARCH_METRICS) — this is a Deno
// edge module and can't import the Vite source, so the list is duplicated by
// hand. The extraction prompt instructs the model to use exactly these slugs so
// research_metrics.metric_name stays consistent with what the UI knows how to
// render. Unknown names are logged but not dropped (see asMetrics).
const CANONICAL_METRIC_NAMES = [
  'combined_ratio', 'loss_ratio', 'expense_ratio',
  'mct_ratio', 'roe', 'premium_growth', 'net_written_premium',
  'direct_written_premium', 'earned_premium',
] as const
const CANONICAL_METRIC_SET: ReadonlySet<string> = new Set(CANONICAL_METRIC_NAMES)

const EXTRACTION_PROMPT = `Extract structured data from the following Canadian insurance industry document.
Return ONLY valid JSON matching this schema. Use null for absent fields.
Do not guess or infer values not explicitly stated in the document.

For "metrics", only extract financial/statistical figures that map to one of
these canonical metric names; use the exact slug, and omit any metric that does
not fit one of them:
${CANONICAL_METRIC_NAMES.join(', ')}

{
  "documentType": "<one of the DocumentType enum values>",
  "jurisdictionProvinces": ["ON", "AB", ...],
  "effectiveDate": "YYYY-MM-DD or null",
  "supersedes": "title and date of superseded document, or null",
  "metrics": [
    {
      "name": "combined_ratio",
      "value": 96.4,
      "unit": "%",
      "period": "Q3_2024",
      "province": "ON or null if consolidated",
      "sourcePage": 12,
      "sourceText": "verbatim sentence the number appears in, <= 200 chars"
    }
  ],
  "examTags": ["exam-6c-cas"],
  "summary": "2-3 sentence plain-language summary of this document"
}

Document:
`

function asStringArray(v: unknown): string[] | null {
  if (!Array.isArray(v)) return null
  const out = v.filter((x): x is string => typeof x === 'string')
  return out.length > 0 ? out : null
}

function asDocumentType(v: unknown): DocumentType | null {
  return typeof v === 'string' && VALID_DOCUMENT_TYPES.has(v) ? (v as DocumentType) : null
}

function asMetrics(v: unknown): ExtractedMetric[] {
  if (!Array.isArray(v)) return []
  const out: ExtractedMetric[] = []
  for (const raw of v) {
    if (!raw || typeof raw !== 'object') continue
    const m = raw as Record<string, unknown>
    if (
      typeof m.name !== 'string' || typeof m.value !== 'number' ||
      typeof m.unit !== 'string' || typeof m.period !== 'string' ||
      typeof m.sourcePage !== 'number' || typeof m.sourceText !== 'string'
    ) continue
    // Keep non-canonical names (permissive) but surface them so the catalog can
    // be extended deliberately rather than silently drifting.
    if (!CANONICAL_METRIC_SET.has(m.name)) {
      console.warn('research-ingest: non-canonical metric name extracted:', m.name)
    }
    out.push({
      name: m.name,
      value: m.value,
      unit: m.unit,
      period: m.period,
      province: typeof m.province === 'string' ? m.province : null,
      sourcePage: m.sourcePage,
      sourceText: m.sourceText.slice(0, 200),
    })
  }
  return out
}

function parseJsonResponse(text: string): Record<string, unknown> | null {
  const tryParse = (s: string) => {
    try { return JSON.parse(s) as Record<string, unknown> } catch { return null }
  }
  let parsed = tryParse(text.trim())
  if (parsed) return parsed

  const fence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fence) {
    parsed = tryParse(fence[1])
    if (parsed) return parsed
  }
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end > start) {
    parsed = tryParse(text.slice(start, end + 1))
    if (parsed) return parsed
  }
  return null
}

/**
 * Run the extraction prompt over a document's raw text. Returns null (rather
 * than throwing) on any failure — callers should fall back to inserting the
 * document with `is_in_review: true` and no derived fields, per "partial
 * success is fine, log to errors instead".
 */
export async function extractStructuredData(rawText: string, sourceUrl: string): Promise<ExtractionResult | null> {
  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) {
    console.warn('research-ingest: ANTHROPIC_API_KEY not set, skipping extraction for', sourceUrl)
    return null
  }

  const truncated = rawText.length > MAX_CHARS ? rawText.slice(0, MAX_CHARS) : rawText

  let res: Response
  try {
    res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: [{ role: 'user', content: EXTRACTION_PROMPT + truncated }],
      }),
    })
  } catch (err) {
    console.error('research-ingest: extraction request failed for', sourceUrl, err)
    return null
  }
  if (!res.ok) {
    console.error('research-ingest: extraction API error', res.status, 'for', sourceUrl)
    return null
  }

  const data = await res.json()
  const content: string | undefined = data?.content?.[0]?.text
  if (!content) return null

  const parsed = parseJsonResponse(content)
  if (!parsed) {
    console.error('research-ingest: could not parse extraction JSON for', sourceUrl)
    return null
  }

  const confidenceFromMetrics = (metrics: ExtractedMetric[]) =>
    metrics.length > 0 ? 1 : 0.6 // no metrics extracted -> lower confidence, route to review

  const metrics = asMetrics(parsed.metrics)
  return {
    documentType: asDocumentType(parsed.documentType),
    jurisdictionProvinces: asStringArray(parsed.jurisdictionProvinces),
    effectiveDate: typeof parsed.effectiveDate === 'string' ? parsed.effectiveDate : null,
    supersedes: typeof parsed.supersedes === 'string' ? parsed.supersedes : null,
    metrics,
    examTags: asStringArray(parsed.examTags) ?? [],
    summary: typeof parsed.summary === 'string' ? parsed.summary : null,
    confidence: confidenceFromMetrics(metrics),
  }
}
