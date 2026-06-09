// research-ingest — orchestrator entry point, triggered by pg_cron.
//
// Calls each source adapter in turn, inserts the documents/metrics it returns,
// and logs (but does not throw on) per-adapter failures — partial success is
// the expected steady state for a multi-source scraper. Adapters are pure
// functions over an AdapterContext that provides shared fetch/extraction
// helpers, so each one stays a small, testable unit (see _shared/research-adapters/).
//
// pg_cron schedule (set via `select cron.schedule(...)` in a migration once
// this function is deployed):
//   - Daily   : OSFI, FSRA, AIRB, AMF        (new bulletins/circulars)
//   - Quarterly: Intact, Aviva Canada         (~mid-Feb/May/Aug/Nov, post-earnings)
//   - Annual  : IBC "Facts of the Industry"
// IBC adapter is not yet implemented.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { extractStructuredData } from '../_shared/research-adapters/extract.ts'
import { fetchOsfiUpdates } from '../_shared/research-adapters/osfi.ts'
import { fetchOsfiFindata } from '../_shared/research-adapters/osfi-findata.ts'
import { fetchFsraUpdates } from '../_shared/research-adapters/fsra.ts'
import { fetchAirbUpdates } from '../_shared/research-adapters/airb.ts'
import { fetchAmfUpdates } from '../_shared/research-adapters/amf.ts'
import { fetchIntactUpdates } from '../_shared/research-adapters/intact.ts'
import type { AdapterContext, AdapterResult, AdapterError, MetricInsert } from '../_shared/research-adapters/types.ts'

const CRON_SECRET_HEADER = 'x-cron-secret'

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

// Fetch a URL's text content. HTML is decoded directly; PDFs are routed
// through `unpdf` (a pure-JS, edge-runtime-friendly extractor — no native
// deps, unlike pdf-parse/pdfjs-dist's worker requirements). Anything else is
// skipped. Network/parse failures return null so adapters can log and continue.
async function fetchText(url: string): Promise<string | null> {
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
    console.error('research-ingest: fetchText failed for', url, err)
    return null
  }
}

function buildContext(): AdapterContext {
  return {
    fetchText,
    extract: extractStructuredData,
  }
}

interface AdapterRun {
  name: string
  run: (ctx: AdapterContext) => Promise<AdapterResult>
}

const ADAPTERS: AdapterRun[] = [
  { name: 'osfi', run: fetchOsfiUpdates },
  { name: 'osfi-findata', run: fetchOsfiFindata },
  { name: 'fsra', run: fetchFsraUpdates },
  { name: 'airb', run: fetchAirbUpdates },
  { name: 'amf', run: fetchAmfUpdates },
  { name: 'intact-financial', run: fetchIntactUpdates },
]

// Insert a batch of documents, then their metrics with `document_id` filled in
// from the insert results (matched by url, since metrics arrive without one).
async function persistAdapterResult(
  admin: ReturnType<typeof createClient>,
  adapterName: string,
  result: AdapterResult,
  errors: AdapterError[],
): Promise<{ documentsInserted: number; metricsInserted: number }> {
  let documentsInserted = 0
  let metricsInserted = 0

  if (result.documents.length > 0) {
    const { data: inserted, error } = await admin
      .from('research_documents')
      .upsert(result.documents, { onConflict: 'url', ignoreDuplicates: true })
      .select('id, url')

    if (error) {
      errors.push({ source: adapterName, message: `Document insert failed: ${error.message}` })
    } else {
      documentsInserted = inserted?.length ?? 0

      if (result.metrics.length > 0 && inserted) {
        // Adapters tag each metric with `sourceUrl` (the same value used as
        // the document's `url`); resolve that to the just-(up)serted row's id
        // and drop the transient field before writing to research_metrics,
        // which has no `sourceUrl` column.
        const idByUrl = new Map<string, string>()
        for (const row of inserted as Array<{ id: string; url: string }>) idByUrl.set(row.url, row.id)

        const metricsToInsert: Array<Omit<MetricInsert, 'sourceUrl'> & { document_id: string }> = []
        for (const { sourceUrl, ...metric } of result.metrics) {
          const documentId = idByUrl.get(sourceUrl)
          if (!documentId) {
            errors.push({ source: adapterName, message: `Could not resolve document for metric "${metric.metric_name}" — no inserted document with url`, url: sourceUrl })
            continue
          }
          metricsToInsert.push({ ...metric, document_id: documentId })
        }

        if (metricsToInsert.length > 0) {
          const { error: metricsError, data: insertedMetrics } = await admin
            .from('research_metrics')
            .insert(metricsToInsert)
            .select('id')
          if (metricsError) {
            errors.push({ source: adapterName, message: `Metric insert failed: ${metricsError.message}` })
          } else {
            metricsInserted = insertedMetrics?.length ?? 0
          }
        }
      }
    }
  }

  return { documentsInserted, metricsInserted }
}

Deno.serve(async (req: Request) => {
  // Guard against unauthenticated invocation — pg_cron calls this with a
  // shared secret header (set alongside the cron job definition).
  const expectedSecret = Deno.env.get('RESEARCH_INGEST_CRON_SECRET')
  if (expectedSecret && req.headers.get(CRON_SECRET_HEADER) !== expectedSecret) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const admin = createClient(supabaseUrl, serviceRoleKey)
  const ctx = buildContext()

  const summary: Array<{ adapter: string; documents: number; metrics: number; errors: AdapterError[] }> = []
  const allErrors: AdapterError[] = []

  for (const adapter of ADAPTERS) {
    let result: AdapterResult
    try {
      result = await adapter.run(ctx)
    } catch (err) {
      const message = (err as Error)?.message ?? 'Unknown adapter error'
      allErrors.push({ source: adapter.name, message })
      summary.push({ adapter: adapter.name, documents: 0, metrics: 0, errors: [{ source: adapter.name, message }] })
      continue
    }

    const adapterErrors = [...result.errors]
    const { documentsInserted, metricsInserted } = await persistAdapterResult(admin, adapter.name, result, adapterErrors)
    allErrors.push(...adapterErrors)
    summary.push({ adapter: adapter.name, documents: documentsInserted, metrics: metricsInserted, errors: adapterErrors })
  }

  for (const e of allErrors) console.error(`research-ingest [${e.source}]:`, e.message, e.url ?? '')

  return json({ summary, errorCount: allErrors.length })
})
