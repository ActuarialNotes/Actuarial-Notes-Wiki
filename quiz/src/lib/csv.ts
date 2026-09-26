/**
 * CSV in and out, for the PCPA project workspace (`docs/pcpa-project.md`).
 *
 * The workspace hands a candidate CSV files, the way the CAS hands out its
 * project data, and reads the tables their code writes back to `output/`. Both
 * directions go through here so the two agree on what a CSV is: RFC 4180 —
 * comma-separated, `"` quoting with `""` as the escape, CRLF or LF rows.
 *
 * A blank field is a missing value. That is how the project data marks one, and
 * it is what both `read.csv` (for numeric columns) and `pandas.read_csv` read
 * as NA without being told.
 */

export type CsvValue = string | number | null

/** Serialises a table. `null` writes an empty field; numbers are written as-is. */
export function toCsv(columns: string[], rows: CsvValue[][]): string {
  const cell = (value: CsvValue): string => {
    if (value === null || value === undefined) return ''
    const str = typeof value === 'number' ? formatNumber(value) : value
    return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
  }
  const lines = [columns.map(cell).join(',')]
  for (const row of rows) lines.push(row.map(cell).join(','))
  return lines.join('\n') + '\n'
}

/** A number as a data file would carry it: no exponent for ordinary money. */
function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return ''
  if (Number.isInteger(value)) return String(value)
  // Up to 6 decimals, trailing zeros trimmed — never "0.30000000000000004".
  return String(Number(value.toFixed(6)))
}

/**
 * Parses CSV text into a header and string rows. Quoted fields may hold commas,
 * quotes and newlines. A leading byte-order mark is dropped. Rows are not
 * padded — a short row stays short, which is itself a thing a reader may want
 * to see.
 */
export function parseCsv(text: string): { columns: string[]; rows: string[][] } {
  const src = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  const records: string[][] = []
  let record: string[] = []
  let field = ''
  let quoted = false
  let i = 0
  const n = src.length

  while (i < n) {
    const ch = src[i]
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i += 2; continue }
        quoted = false
        i++
        continue
      }
      field += ch
      i++
      continue
    }
    if (ch === '"' && field === '') { quoted = true; i++; continue }
    if (ch === ',') { record.push(field); field = ''; i++; continue }
    if (ch === '\r' || ch === '\n') {
      record.push(field)
      records.push(record)
      record = []
      field = ''
      i += ch === '\r' && src[i + 1] === '\n' ? 2 : 1
      continue
    }
    field += ch
    i++
  }
  if (field !== '' || record.length > 0) {
    record.push(field)
    records.push(record)
  }

  const [columns = [], ...rows] = records
  return { columns, rows }
}

/** Reads a field as a number, or null for a blank or non-numeric field. */
export function csvNumber(value: string | undefined): number | null {
  if (value === undefined) return null
  const trimmed = value.trim()
  if (trimmed === '' || /^(na|nan|null|none)$/i.test(trimmed)) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}
