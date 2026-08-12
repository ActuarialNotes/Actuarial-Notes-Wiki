// Pure parsing for published exam pass-rate tables — no network, no Vercel
// request/response, so it can be unit-tested directly (see
// quiz/src/lib/passRateParser.test.ts, which imports this file).
//
// The shape of these tables differs by publisher: CAS reports a sitting as
// "Spring 2019" with both a raw and an *effective* pass ratio; the SOA reports
// monthly CBT windows ("Mar-2026") with a raw pass rate only; aggregators
// re-publish either. Rather than pin a selector to one page's markup, we read
// whatever table is on the page and match its **column headings** — headings
// survive redesigns that selectors don't, and an unrecognized layout yields
// zero records (a silent fall back to the authored catalogue) instead of
// garbage figures.

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

/** Lowercase alphanumerics only — "Effective Pass Ratio" → "effectivepassratio". */
function normalizeKey(text) {
  return String(text ?? '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

/** Collapses whitespace and strips HTML entities a cell may carry. */
export function cleanCell(text) {
  return String(text ?? '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * A percentage as a number: `"46.2%"` → `46.2`, `"0.462"` → `46.2`.
 * A bare fraction ≤ 1 is read as a proportion — some feeds publish 0.462 — and
 * anything outside 0–100 is rejected rather than displayed as a wrong figure.
 */
export function parsePercent(text) {
  const raw = cleanCell(text).replace(/[%\s]/g, '').replace(/,/g, '')
  if (!raw || !/^-?\d*\.?\d+$/.test(raw)) return undefined
  let value = Number(raw)
  if (!Number.isFinite(value)) return undefined
  if (value > 0 && value <= 1 && /\./.test(raw)) value *= 100
  if (value < 0 || value > 100) return undefined
  return Math.round(value * 10) / 10
}

/** A count: `"1,163"` → `1163`. */
export function parseCount(text) {
  const raw = cleanCell(text).replace(/[,\s]/g, '')
  if (!raw || !/^\d+$/.test(raw)) return undefined
  return Number(raw)
}

/**
 * The sitting a row is labelled with.
 *
 * Handles the forms these publishers actually use: `"Spring 2019"`,
 * `"2019 Spring"`, `"Fall 2013"`, `"Mar-2026"`, `"March 2026"`, `"2026-03"`,
 * and a bare `"2019"`. Returns `null` when no year is present at all — a
 * totals row, a header repeat, or a layout we don't understand.
 */
export function parseSittingLabel(text) {
  const label = cleanCell(text)
  if (!label) return null

  const yearMatch = label.match(/(19|20)\d{2}/)
  if (!yearMatch) return null
  const year = Number(yearMatch[0])

  const seasonMatch = label.match(/spring|fall|autumn/i)
  if (seasonMatch) {
    const season = seasonMatch[0].toLowerCase()
    return { year, session: season === 'spring' ? 'Spring' : 'Fall' }
  }

  // "Mar-2026" / "March 2026"
  const monthName = MONTHS.findIndex(m => new RegExp(`\\b${m.slice(0, 3)}`, 'i').test(label.replace(String(year), '')))
  if (monthName >= 0) return { year, month: monthName + 1 }

  // "2026-03"
  const isoMatch = label.match(/(19|20)\d{2}[-/](\d{1,2})/)
  if (isoMatch) {
    const month = Number(isoMatch[2])
    if (month >= 1 && month <= 12) return { year, month }
  }

  return { year }
}

// Column headings, in priority order. The first heading that a table's header
// row matches wins the field.
const COLUMNS = {
  sitting: ['date', 'sitting', 'examdate', 'exam', 'session', 'administration'],
  candidates: ['numbersat', 'examstaken', 'candidates', 'numberofcandidates', 'sat', 'taken', 'numbertaking'],
  passed: ['numberpassed', 'passed', 'numberpassing', 'passes'],
  passRate: ['passrate', 'passratio', 'rawpassratio', 'rawpassrate'],
  effectivePassRate: ['effectivepassrate', 'effectivepassratio', 'effpassrate', 'effpassratio'],
}

/** Maps a table's header cells onto our fields; returns `{field: columnIndex}`. */
function mapColumns(headerCells) {
  const normalized = headerCells.map(normalizeKey)
  const mapping = {}
  for (const [field, candidates] of Object.entries(COLUMNS)) {
    for (const candidate of candidates) {
      // Effective ratios must not be captured by the plain pass-rate column, so
      // an exact match is preferred and a substring match only accepted when it
      // doesn't also look like the effective column.
      let index = normalized.indexOf(candidate)
      if (index === -1) {
        index = normalized.findIndex(h => h.includes(candidate) && (field === 'effectivePassRate' || !h.includes('effective')))
      }
      if (index !== -1) {
        mapping[field] = index
        break
      }
    }
  }
  return mapping
}

/** One record per row the mapping could resolve to a sitting. */
function rowsToRecords(rows) {
  if (rows.length < 2) return []
  const mapping = mapColumns(rows[0])
  if (mapping.sitting === undefined) return []
  if (mapping.passRate === undefined && mapping.effectivePassRate === undefined && mapping.passed === undefined) {
    return []
  }

  const records = []
  for (const cells of rows.slice(1)) {
    const sitting = parseSittingLabel(cells[mapping.sitting])
    if (!sitting) continue

    const record = { ...sitting }
    if (mapping.candidates !== undefined) record.candidates = parseCount(cells[mapping.candidates])
    if (mapping.passed !== undefined) record.passed = parseCount(cells[mapping.passed])
    if (mapping.passRate !== undefined) record.passRate = parsePercent(cells[mapping.passRate])
    if (mapping.effectivePassRate !== undefined) {
      record.effectivePassRate = parsePercent(cells[mapping.effectivePassRate])
    }

    // A published pass rate can be derived when the table gives the two counts
    // but no percentage column — the same arithmetic the publisher used.
    if (record.passRate === undefined && record.passed !== undefined && record.candidates) {
      record.passRate = Math.round((record.passed / record.candidates) * 1000) / 10
    }

    if (record.passRate === undefined && record.effectivePassRate === undefined) continue

    for (const key of Object.keys(record)) {
      if (record[key] === undefined) delete record[key]
    }
    records.push(record)
  }
  return records
}

/** Every `<table>` on the page, as arrays of rows of cell text. */
export function parseHtmlTables(html) {
  const tables = []
  const tableMatches = String(html ?? '').match(/<table[\s\S]*?<\/table>/gi) ?? []
  for (const table of tableMatches) {
    const rows = []
    const rowMatches = table.match(/<tr[\s\S]*?<\/tr>/gi) ?? []
    for (const row of rowMatches) {
      const cells = (row.match(/<(td|th)[\s\S]*?<\/\1>/gi) ?? []).map(cell =>
        cleanCell(cell.replace(/<[^>]*>/g, ' ')),
      )
      if (cells.length > 0) rows.push(cells)
    }
    if (rows.length > 0) tables.push(rows)
  }
  return tables
}

/** CSV/TSV into rows of cells. Quoted fields are honoured; the rest is naive on purpose. */
export function parseDelimited(text) {
  const rows = []
  for (const line of String(text ?? '').split(/\r?\n/)) {
    if (!line.trim()) continue
    const delimiter = line.includes('\t') ? '\t' : ','
    const cells = []
    let current = ''
    let quoted = false
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        if (quoted && line[i + 1] === '"') { current += '"'; i++ } else { quoted = !quoted }
      } else if (char === delimiter && !quoted) {
        cells.push(cleanCell(current))
        current = ''
      } else {
        current += char
      }
    }
    cells.push(cleanCell(current))
    rows.push(cells)
  }
  return rows
}

/**
 * Pass-rate records from a fetched source.
 *
 * `format` is `'html'`, `'csv'` or `'json'`. For HTML every table on the page
 * is tried and the one yielding the most records wins — publishers wrap their
 * statistics in layout tables, and the real one is the long one. JSON is
 * expected to be an array (or `{records: []}`) of objects using the same
 * headings as the tabular formats.
 */
export function extractPassRateRecords(text, format = 'html') {
  if (format === 'json') {
    let parsed
    try { parsed = JSON.parse(text) } catch { return [] }
    const list = Array.isArray(parsed) ? parsed : parsed?.records
    if (!Array.isArray(list) || list.length === 0) return []
    const headers = [...new Set(list.flatMap(item => Object.keys(item ?? {})))]
    const rows = [headers, ...list.map(item => headers.map(h => item?.[h] ?? ''))]
    return rowsToRecords(rows)
  }

  if (format === 'csv' || format === 'tsv') {
    return rowsToRecords(parseDelimited(text))
  }

  let best = []
  for (const table of parseHtmlTables(text)) {
    const records = rowsToRecords(table)
    if (records.length > best.length) best = records
  }
  return best
}
