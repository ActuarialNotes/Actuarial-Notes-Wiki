// OSFI Open Government financial-data adapter.
//
// Fetches the PC1 (P&C Core Financial Statement Return, Active Companies)
// dataset from Canada's Open Government portal (open.canada.ca) via the CKAN
// API, parses the quarterly CSV, and emits:
//   - one `industry_statistics` document per CSV file fetched
//   - research_metrics rows for the Canadian P&C industry aggregate
//     (attributed to the 'osfi' agent)
//
// Industry aggregates (not per-company) are emitted here because:
//   (a) OSFI is the publisher/collector, so `osfi` is the right agent for
//       industry-wide derived figures.
//   (b) Individual companies in the PC1 data would overlap with metrics from
//       the company-specific adapters (intact.ts etc.), causing duplicate
//       agent_id×period keys that buildChartData would silently merge.
//
// Data notes:
//   - OSFI publishes PC1 data on open.canada.ca with a ~3-month lag after
//     quarter-end. The adapter fetches the two most recent CSV resources so
//     the first run after a new quarter drops catches both the new and prior
//     quarter without requiring two scheduled runs.
//   - Dollar values in the PC1 return are in thousands of CAD; this adapter
//     converts to millions for the `cad_millions` unit.
//   - OSFI has changed CSV column headers between dataset versions; each field
//     is resolved via a priority list of known variants (see COL_CANDIDATES).

import type { AdapterContext, AdapterResult, DocumentInsert, MetricInsert } from './types.ts'
import { emptyResult } from './types.ts'

const AGENT_ID = 'osfi'
const SOURCE_NAME = 'osfi-findata'

const OGP_CKAN_SEARCH = 'https://open.canada.ca/data/en/api/3/action/package_search'

// OSFI's organization slug on open.canada.ca.
const OSFI_ORG_FQ = 'organization:osfi-bsif'

// Search terms that identify the active-companies PC1 dataset.
const PC1_QUERY = 'PC1 property casualty active'

// Regex tested against a package's title/name to confirm it's the right dataset.
const PC1_PACKAGE_RE = /pc1|property.casualty.*core|p&c.*core/i

// At most two most-recent CSV files per adapter run (new + prior quarter).
const MAX_CSV_FILES = 2

// PC1 values are in thousands CAD → divide by 1000 to get millions.
const K_TO_M = 0.001

// Column-name candidates in priority order. OSFI has used slightly different
// header names across dataset versions; first match in the actual CSV wins.
const COL_CANDIDATES = {
  institution: ['institution_name', 'company_name', 'entity_name', 'institution'],
  period: ['reporting_period', 'period', 'year_quarter', 'quarter', 'fiscal_period'],
  lob: ['line_of_business', 'lob', 'business_line', 'line'],
  nwp: ['net_premium_written', 'net_written_premium', 'nwp'],
  earned: ['net_premium_earned', 'net_earned_premium', 'earned_premium'],
  claims: ['total_claims_incurred', 'net_claims_incurred', 'claims_incurred', 'total_losses_and_lae'],
  expenses: ['underwriting_expenses', 'operating_expenses', 'net_expenses'],
  combined: ['combined_ratio'],
  loss: ['loss_ratio'],
  expRatio: ['expense_ratio'],
}

type ColMap = { [K in keyof typeof COL_CANDIDATES]: string | null }

interface CsvRow { [col: string]: string }

// ─── CSV parsing ─────────────────────────────────────────────────────────────

function splitCSVLine(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes }
    else if (ch === ',' && !inQuotes) { out.push(cur); cur = '' }
    else { cur += ch }
  }
  out.push(cur)
  return out
}

function parseCSV(text: string): CsvRow[] {
  const lines = text.replace(/\r\n?/g, '\n').trim().split('\n')
  if (lines.length < 2) return []
  const headers = splitCSVLine(lines[0]).map(h =>
    h.toLowerCase().replace(/^"|"$/g, '').trim().replace(/[\s/()-]+/g, '_').replace(/_+$/g, '')
  )
  const rows: CsvRow[] = []
  for (const line of lines.slice(1)) {
    const vals = splitCSVLine(line)
    if (vals.every(v => !v.trim())) continue
    const row: CsvRow = {}
    headers.forEach((h, i) => { row[h] = (vals[i] ?? '').trim().replace(/^"|"$/g, '') })
    rows.push(row)
  }
  return rows
}

function resolveColMap(headers: string[]): ColMap {
  const out = {} as ColMap
  for (const [field, candidates] of Object.entries(COL_CANDIDATES) as [keyof typeof COL_CANDIDATES, string[]][]) {
    out[field] = candidates.find(c => headers.includes(c)) ?? null
  }
  return out
}

// ─── Period normalisation ────────────────────────────────────────────────────

// OSFI uses "2024Q3", "Q3_2024", "Q3 2024", "Q3-2024", or just "2024".
function normalizePeriod(raw: string): string {
  const s = raw.trim()
  const m1 = s.match(/^(\d{4})Q(\d)$/i)
  if (m1) return `Q${m1[2]}_${m1[1]}`
  const m2 = s.match(/^Q(\d)[_\s-](\d{4})$/i)
  if (m2) return `Q${m2[1]}_${m2[2]}`
  const m3 = s.match(/^(\d{4})$/)
  if (m3) return `FY${m3[1]}`
  return s
}

// ─── Numeric helpers ─────────────────────────────────────────────────────────

function toFloat(v: string | undefined): number {
  if (!v) return 0
  const n = parseFloat(v.replace(/[$,%\s]/g, ''))
  return isNaN(n) ? 0 : n
}

// OSFI sometimes stores ratios as a decimal fraction (0.945 = 94.5%) rather
// than a percentage. Values < 2 are assumed to be fractional and scaled up.
function normalizeRatio(v: number): number {
  return v > 0 && v < 2 ? v * 100 : v
}

// ─── Aggregation ─────────────────────────────────────────────────────────────

// Financial totals for one period across all companies in the industry.
interface PeriodAgg {
  nwp: number
  earned: number
  claims: number
  expenses: number
  rowCount: number
}

function aggregateByPeriod(rows: CsvRow[], colMap: ColMap): Map<string, PeriodAgg> {
  const map = new Map<string, PeriodAgg>()

  for (const row of rows) {
    const institution = colMap.institution ? (row[colMap.institution] ?? '').trim() : ''
    if (!institution) continue
    // Skip any pre-computed "Total" or "Industry" rows to avoid double-counting.
    if (/^(total|all companies|industry aggregate)/i.test(institution)) continue

    const rawPeriod = colMap.period ? (row[colMap.period] ?? '').trim() : ''
    if (!rawPeriod) continue
    const period = normalizePeriod(rawPeriod)

    let entry = map.get(period)
    if (!entry) {
      entry = { nwp: 0, earned: 0, claims: 0, expenses: 0, rowCount: 0 }
      map.set(period, entry)
    }

    // LOB rows within the same company+period are additive for dollar figures.
    entry.nwp += colMap.nwp ? toFloat(row[colMap.nwp]) : 0
    entry.earned += colMap.earned ? toFloat(row[colMap.earned]) : 0
    entry.claims += colMap.claims ? toFloat(row[colMap.claims]) : 0
    entry.expenses += colMap.expenses ? toFloat(row[colMap.expenses]) : 0
    entry.rowCount++
  }

  return map
}

// ─── Metric construction ─────────────────────────────────────────────────────

function buildIndustryMetrics(period: string, agg: PeriodAgg, sourceUrl: string): MetricInsert[] {
  const out: MetricInsert[] = []

  const push = (name: string, value: number, unit: string, text: string) => {
    if (!isFinite(value) || value === 0) return
    out.push({
      agent_id: AGENT_ID,
      metric_name: name,
      value,
      unit,
      period,
      province: null,
      line_of_business: null,
      source_page: 1,
      source_text: text.slice(0, 200),
      confidence: 0.9,
      sourceUrl,
    })
  }

  if (agg.nwp > 0) {
    const nwpM = agg.nwp * K_TO_M
    push(
      'net_written_premium',
      nwpM,
      'cad_millions',
      `Canadian P&C industry net written premium ${period}: $${nwpM.toFixed(0)}M (OSFI PC1 Open Data)`,
    )
  }

  if (agg.earned > 0) {
    // Derive ratios from primitives (more reliable than averaging per-row ratios).
    if (agg.claims > 0) {
      const loss = (agg.claims / agg.earned) * 100
      push('loss_ratio', loss, '%', `Canadian P&C industry loss ratio ${period}: ${loss.toFixed(1)}% (OSFI PC1 Open Data)`)
    }
    if (agg.expenses > 0) {
      const exp = (agg.expenses / agg.earned) * 100
      push('expense_ratio', exp, '%', `Canadian P&C industry expense ratio ${period}: ${exp.toFixed(1)}% (OSFI PC1 Open Data)`)
    }
    if (agg.claims > 0 && agg.expenses > 0) {
      const combined = ((agg.claims + agg.expenses) / agg.earned) * 100
      push('combined_ratio', combined, '%', `Canadian P&C industry combined ratio ${period}: ${combined.toFixed(1)}% (OSFI PC1 Open Data)`)
    }
  }

  return out
}

// ─── CKAN discovery ──────────────────────────────────────────────────────────

interface CsvResource {
  url: string
  name: string
  modified: string
}

async function findPc1CsvResources(ctx: AdapterContext, errors: AdapterResult['errors']): Promise<CsvResource[]> {
  const searchUrl =
    `${OGP_CKAN_SEARCH}?q=${encodeURIComponent(PC1_QUERY)}&fq=${encodeURIComponent(OSFI_ORG_FQ)}&rows=20&sort=metadata_modified+desc`

  const text = await ctx.fetchText(searchUrl)
  if (!text) {
    errors.push({ source: SOURCE_NAME, message: 'Failed to reach Open Government CKAN API', url: searchUrl })
    return []
  }

  let packages: unknown[]
  try {
    const parsed = JSON.parse(text) as { result?: { results?: unknown[] } }
    packages = parsed?.result?.results ?? []
  } catch {
    errors.push({ source: SOURCE_NAME, message: 'Failed to parse CKAN search JSON', url: searchUrl })
    return []
  }

  const pkg = (packages as Array<{ title?: string; name?: string; resources?: unknown[] }>)
    .find(p => PC1_PACKAGE_RE.test(p.title ?? '') || PC1_PACKAGE_RE.test(p.name ?? ''))

  if (!pkg) {
    errors.push({ source: SOURCE_NAME, message: 'PC1 dataset not found in CKAN results', url: searchUrl })
    return []
  }

  return ((pkg.resources ?? []) as Array<{ url?: string; name?: string; id?: string; format?: string; last_modified?: string; created?: string }>)
    .filter(r => r.format?.toUpperCase() === 'CSV' || r.url?.toLowerCase().endsWith('.csv'))
    .map(r => ({ url: r.url ?? '', name: r.name ?? r.id ?? 'PC1', modified: r.last_modified ?? r.created ?? '' }))
    .filter(r => r.url)
    .sort((a, b) => b.modified.localeCompare(a.modified))
    .slice(0, MAX_CSV_FILES)
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function fetchOsfiFindata(ctx: AdapterContext): Promise<AdapterResult> {
  const result = emptyResult()

  const csvResources = await findPc1CsvResources(ctx, result.errors)
  if (csvResources.length === 0) return result

  for (const resource of csvResources) {
    const csvText = await ctx.fetchText(resource.url)
    if (!csvText) {
      result.errors.push({ source: SOURCE_NAME, message: 'Failed to fetch CSV', url: resource.url })
      continue
    }

    const rows = parseCSV(csvText)
    if (rows.length === 0) {
      result.errors.push({ source: SOURCE_NAME, message: 'CSV parsed to 0 rows', url: resource.url })
      continue
    }

    const headers = Object.keys(rows[0])
    const colMap = resolveColMap(headers)

    if (!colMap.institution || !colMap.period) {
      result.errors.push({
        source: SOURCE_NAME,
        message: `Required columns (institution, period) not resolved. Found headers: ${headers.slice(0, 12).join(', ')}`,
        url: resource.url,
      })
      continue
    }

    // One document row per CSV file — upsert(ignoreDuplicates) makes re-runs safe.
    const publishedAt = resource.modified ? new Date(resource.modified).toISOString() : new Date().toISOString()
    const doc: DocumentInsert = {
      agent_id: AGENT_ID,
      type: 'industry_statistics',
      title: `OSFI PC1 Financial Data — ${resource.name}`,
      published_at: publishedAt,
      url: resource.url,
      jurisdiction_provinces: [],
      line_of_business: null,
      summary:
        'OSFI PC1 Core Financial Statement Return for federally regulated P&C insurers. ' +
        'Contains net written premium, claims, expenses, and derived industry-aggregate ' +
        'benchmarks (combined ratio, loss ratio, expense ratio). Source: Canada Open Government portal.',
      exam_tags: ['6c-1', '8-1'],
      extraction_confidence: 0.9,
      is_in_review: false,
      raw_text: null,
    }
    result.documents.push(doc)

    const periodAgg = aggregateByPeriod(rows, colMap)

    for (const [period, agg] of periodAgg) {
      // Skip periods with too few rows to be meaningful (e.g. stray header rows).
      if (agg.rowCount < 3) continue
      const metrics = buildIndustryMetrics(period, agg, resource.url)
      result.metrics.push(...metrics)
    }
  }

  return result
}
