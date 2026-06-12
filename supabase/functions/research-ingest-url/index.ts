// research-ingest-url — on-demand ingestion of a single source by URL.
//
// The corpus is otherwise grown from verified sources loaded in batches; this
// lets a signed-in user paste a URL to a specific bulletin, guideline, or
// regulation and have it fetched, extracted, and inserted into
// research_documents immediately via the shared fetchText + extraction
// pipeline (see _shared/research-adapters/), without listing-page context.
//
// Auth: the caller's Supabase session bearer token identifies the user; the
// actual corpus write is done with the service-role key (research_documents is
// service-role-write-only). Optionally attaches the new doc to a project the
// caller owns.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { extractStructuredData } from '../_shared/research-adapters/extract.ts'
import { fetchText } from '../_shared/research-adapters/fetchText.ts'
import type { DocumentInsert, DocumentType } from '../_shared/research-adapters/types.ts'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Vary': 'Origin',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

const VALID_DOCUMENT_TYPES: ReadonlySet<string> = new Set([
  'regulatory_bulletin', 'regulatory_circular', 'consultation_paper',
  'approved_guideline', 'rate_filing_summary', 'supervisory_framework',
  'annual_report', 'quarterly_supplement', 'md_and_a', 'press_release',
  'investor_presentation', 'industry_statistics', 'research_report',
  'cia_educational_note',
])

const DEFAULT_DOC_TYPE: DocumentType = 'regulatory_bulletin'
const FALLBACK_AGENT_ID = 'user-added'
const MAX_RAW_TEXT_CHARS = 20_000
const MAX_TITLE_CHARS = 240

// Map a source hostname to a known agent slug, so ad-hoc docs from a recognized
// regulator/insurer site are attributed correctly rather than dumped into the
// generic 'user-added' bucket. Suffix match keeps subdomains (www., etc.) working.
const HOST_AGENT_MAP: Array<[string, string]> = [
  ['osfi-bsif.gc.ca', 'osfi'],
  ['fsrao.ca', 'fsra'],
  ['airb.alberta.ca', 'airb'],
  ['lautorite.qc.ca', 'amf'],
  ['bcfsa.ca', 'bcfsa'],
  ['ibc.ca', 'ibc'],
  ['gisa-asag.ca', 'gisa'],
  ['icbc.com', 'icbc'],
  ['intactfc.com', 'intact-financial'],
  ['desjardins.com', 'desjardins-general'],
  ['avivacanada.com', 'aviva-canada'],
  ['tdinsurance.com', 'td-insurance'],
  ['cooperators.ca', 'cooperators'],
  ['definityfinancial.com', 'definity'],
  ['allstate.ca', 'allstate-canada'],
  ['wawanesa.com', 'wawanesa'],
  ['chubb.com', 'chubb-canada'],
  ['goremutual.ca', 'gore-mutual'],
  ['sgicanada.ca', 'sgi-canada'],
  ['mpi.mb.ca', 'mpi'],
  ['saaq.gouv.qc.ca', 'saaq'],
]

function inferAgentId(url: string): string {
  let host: string
  try {
    host = new URL(url).hostname.toLowerCase()
  } catch {
    return FALLBACK_AGENT_ID
  }
  for (const [domain, agentId] of HOST_AGENT_MAP) {
    if (host === domain || host.endsWith(`.${domain}`)) return agentId
  }
  return FALLBACK_AGENT_ID
}

// Derive a human title. ExtractionResult carries no title (the scrapers get it
// from the listing anchor), so pull it from the page: HTML <title>/<h1>, else
// the first substantive line of the extracted text, else the URL.
function deriveTitle(rawText: string, url: string): string {
  const titleTag = rawText.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    ?? rawText.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
  if (titleTag) {
    const cleaned = titleTag.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    if (cleaned) return cleaned.slice(0, MAX_TITLE_CHARS)
  }
  const firstLine = rawText
    .replace(/<[^>]+>/g, ' ')
    .split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim())
    .find(l => l.length >= 12)
  if (firstLine) return firstLine.slice(0, MAX_TITLE_CHARS)
  return url.slice(0, MAX_TITLE_CHARS)
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return json({ error: 'Unauthorized' }, 401)
  const token = authHeader.replace(/^Bearer\s+/i, '')

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const admin = createClient(supabaseUrl, serviceRoleKey)

  const { data: { user }, error: userErr } = await admin.auth.getUser(token)
  if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

  let body: { url?: unknown; projectId?: unknown }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const { url, projectId } = body
  if (!isHttpUrl(url)) return json({ error: 'Invalid or missing url' }, 400)
  if (projectId !== undefined && typeof projectId !== 'string') {
    return json({ error: 'Invalid projectId' }, 400)
  }

  // If a project was named, verify the caller owns it before doing any work.
  // Service-role bypasses RLS, so this user_id filter is the authorization gate.
  if (typeof projectId === 'string') {
    const { data: project } = await admin
      .from('research_projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', user.id)
      .maybeSingle()
    if (!project) return json({ error: 'Project not found' }, 403)
  }

  const rawText = await fetchText(url)
  if (!rawText) return json({ error: 'Could not extract text from the URL' }, 422)

  let extraction
  try {
    extraction = await extractStructuredData(rawText, url)
  } catch (err) {
    console.error('research-ingest-url: extraction threw for', url, err)
    extraction = null
  }

  const docType =
    extraction?.documentType && VALID_DOCUMENT_TYPES.has(extraction.documentType)
      ? extraction.documentType
      : DEFAULT_DOC_TYPE
  // Route to the review queue when extraction failed or was low-confidence.
  const isInReview = !extraction || extraction.confidence < 0.85

  const doc: DocumentInsert = {
    agent_id: inferAgentId(url),
    type: docType,
    title: deriveTitle(rawText, url),
    published_at: extraction?.effectiveDate
      ? new Date(extraction.effectiveDate).toISOString()
      : new Date().toISOString(),
    effective_date: extraction?.effectiveDate ?? null,
    jurisdiction_provinces: extraction?.jurisdictionProvinces ?? null,
    url,
    pdf_url: url.toLowerCase().endsWith('.pdf') ? url : null,
    summary: extraction?.summary ?? null,
    exam_tags: extraction?.examTags ?? null,
    extraction_confidence: extraction?.confidence ?? null,
    is_in_review: isInReview,
    raw_text: rawText.slice(0, MAX_RAW_TEXT_CHARS),
  }

  // Upsert on url; ignoreDuplicates means an existing url yields an empty insert
  // result, which we treat as a duplicate.
  const { data: upserted, error: upsertErr } = await admin
    .from('research_documents')
    .upsert([doc], { onConflict: 'url', ignoreDuplicates: true })
    .select('id, agent_id, type, title, published_at, url, summary, jurisdiction_provinces, exam_tags, is_in_review')

  if (upsertErr) {
    console.error('research-ingest-url: insert failed for', url, upsertErr.message)
    return json({ error: 'Failed to save the document' }, 502)
  }

  let status: 'created' | 'duplicate' = 'created'
  let document = upserted?.[0] ?? null

  if (!document) {
    // Duplicate url — fetch the existing row so the caller can still link it.
    status = 'duplicate'
    const { data: existing } = await admin
      .from('research_documents')
      .select('id, agent_id, type, title, published_at, url, summary, jurisdiction_provinces, exam_tags, is_in_review')
      .eq('url', url)
      .maybeSingle()
    document = existing ?? null
  }

  if (!document) return json({ error: 'Failed to save the document' }, 502)

  // Attach to the project if requested (ownership already verified above).
  if (typeof projectId === 'string') {
    const { error: linkErr } = await admin
      .from('research_project_documents')
      .upsert(
        [{ project_id: projectId, document_id: (document as { id: string }).id }],
        { onConflict: 'project_id,document_id', ignoreDuplicates: true },
      )
    if (linkErr) console.error('research-ingest-url: project link failed:', linkErr.message)
  }

  return json({ status, document })
})
