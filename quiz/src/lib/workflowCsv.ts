/**
 * **The reader's own data, as a CSV** (docs/workflows.md) — a file
 * uploaded onto a workflow's board, and the mapping that connects its
 * columns to a calculation's inputs.
 *
 * A CSV step holds the table as it was read (`parseCsv`: the header row, then
 * the rows, every cell as the text the file had). A connection from it to a
 * tool carries a **mapping** per input field (`CsvMapping`):
 *
 * - a **table** field takes one CSV column per table column — the dates or
 *   periods into its text column, the values into its number columns — and
 *   every CSV row becomes a row of the table;
 * - a **triangle** field takes the whole CSV as the triangle: origins down the
 *   first column, ages across the header;
 * - a **date** or **number** field takes one cell: a column, and its first,
 *   last or n-th row.
 *
 * `csvInput` turns the mapping into the values the connection carries, and the
 * engine reads them as it reads anything typed (`normalizeInput`: "1,200",
 * "5%", "2023-07-01"), so a cell it can't read is named by the tool's own
 * error rather than guessed at here. Nothing is computed from the file — no
 * sums, no averages: a mapping only moves cells. Pure and tested.
 */

import type { ToolInput, ToolSpec } from './tools'

export interface CsvTable {
  /** The file's name, as uploaded. */
  name: string
  columns: string[]
  /** Every row as the file's own text, one cell per column. */
  rows: string[][]
}

/** One field's mapping. Columns are indexes into `CsvTable.columns`. */
export type FieldMap =
  | { kind: 'columns'; columns: Record<string, number> }
  | { kind: 'triangle' }
  /** One cell. `row` counts from 0; -1 is the last row. */
  | { kind: 'cell'; column: number; row: number }

/** Field key → how the CSV fills it. */
export type CsvMapping = Record<string, FieldMap>

export const CSV_LIMITS = { rows: 2000, columns: 60, bytes: 300_000 } as const

export type CsvParse = { ok: true; table: CsvTable } | { ok: false; error: string }

/** The delimiter a file uses: whichever of comma, semicolon or tab splits its header most. */
function delimiterOf(text: string): string {
  const head = text.slice(0, text.search(/\r?\n|$/))
  const counts = [',', ';', '\t'].map(d => [d, head.split(d).length] as const)
  counts.sort((a, b) => b[1] - a[1])
  return counts[0][1] > 1 ? counts[0][0] : ','
}

/**
 * Read a CSV: quoted cells (with `""` for a quote and line breaks inside),
 * CRLF or LF, a comma, semicolon or tab between cells, a byte-order mark
 * dropped. The first row is the header. Blank rows are skipped, short rows
 * padded, and a file too large for the board says so rather than being cut.
 */
export function parseCsv(text: string, name = 'data.csv'): CsvParse {
  if (text.length > CSV_LIMITS.bytes) return { ok: false, error: `That file is ${Math.round(text.length / 1000)} KB; a board holds CSVs up to ${CSV_LIMITS.bytes / 1000} KB.` }
  const src = text.replace(/^\uFEFF/, '')
  const delim = delimiterOf(src)
  const records: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') quoted = false
      else cell += ch
      continue
    }
    if (ch === '"' && cell.trim() === '') {
      quoted = true
      cell = ''
    } else if (ch === delim) {
      row.push(cell)
      cell = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++
      row.push(cell)
      records.push(row)
      row = []
      cell = ''
    } else cell += ch
  }
  if (cell !== '' || row.length) {
    row.push(cell)
    records.push(row)
  }
  const rows = records.map(r => r.map(c => c.trim())).filter(r => r.some(c => c !== ''))
  if (rows.length < 2) return { ok: false, error: 'A CSV needs a header row and at least one row of data.' }
  const [header, ...body] = rows
  if (header.length > CSV_LIMITS.columns) return { ok: false, error: `That file has ${header.length} columns; a board holds up to ${CSV_LIMITS.columns}.` }
  if (body.length > CSV_LIMITS.rows) return { ok: false, error: `That file has ${body.length} rows; a board holds up to ${CSV_LIMITS.rows}.` }
  const width = Math.max(header.length, ...body.map(r => r.length))
  const columns = Array.from({ length: width }, (_, j) => header[j] || `Column ${j + 1}`)
  return {
    ok: true,
    table: { name, columns, rows: body.map(r => Array.from({ length: width }, (_, j) => r[j] ?? '')) },
  }
}

/** Read a chosen file as a CSV table, or say why it can't be. */
export async function readCsvFile(file: Pick<File, 'name' | 'text'>): Promise<CsvParse> {
  try {
    return parseCsv(await file.text(), file.name)
  } catch {
    return { ok: false, error: `Couldn’t read ${file.name}.` }
  }
}

export type ColumnKind = 'date' | 'number' | 'text'

const DATE_RE = /^(\d{4}-\d{1,2}(-\d{1,2})?|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}(\s?[QqHh]\d|-\d{2}))$/
const NUMBER_RE = /^[-+(]?[$€£]?\s*[\d,]*\.?\d+(e[-+]?\d+)?\s*%?\)?$/i

/** What a column holds, by its cells: dates (and periods: 2023Q1, 2023-04), numbers, or text. */
export function columnKind(table: CsvTable, column: number): ColumnKind {
  const cells = table.rows.map(r => r[column]).filter(c => c !== '')
  if (!cells.length) return 'text'
  if (cells.every(c => DATE_RE.test(c))) return 'date'
  if (cells.every(c => NUMBER_RE.test(c))) {
    // Whole years read as dates: a period, not a value.
    if (cells.every(c => /^(19|20)\d{2}$/.test(c))) return 'date'
    return 'number'
  }
  return 'text'
}

/** Which of a tool's inputs a CSV can fill. Choices can't: a CSV holds data, not judgments. */
export function mappableFields(spec: ToolSpec) {
  return spec.fields.filter(f => f.kind === 'table' || f.kind === 'triangle' || f.kind === 'number' || f.kind === 'date')
}

/** Can a CSV be read as a triangle: origins down its first column, ages across its header? */
export function triangleShaped(table: CsvTable): boolean {
  return table.columns.length >= 3 && table.rows.length >= 2 && table.columns.slice(1).every(c => /^\d+(\.\d+)?$/.test(c.trim()))
}

const cellAt = (table: CsvTable, column: number, row: number) => {
  const r = row < 0 ? table.rows.length + row : row
  return table.rows[r]?.[column]
}

/**
 * The values a connection from a CSV carries into a tool: each mapped field
 * filled from the file's cells, exactly as they read. A mapping that names a
 * column the file no longer has is skipped.
 */
export function csvInput(table: CsvTable, spec: ToolSpec, mapping: CsvMapping | undefined): Partial<ToolInput> {
  const out: Partial<ToolInput> = {}
  if (!mapping) return out
  for (const field of mappableFields(spec)) {
    const map = mapping[field.key]
    if (!map) continue
    if (field.kind === 'table' && map.kind === 'columns') {
      const pairs = field.columns.map(c => [c.key, map.columns[c.key]] as const).filter(([, j]) => j !== undefined && j >= 0 && j < table.columns.length)
      if (!pairs.length) continue
      out[field.key] = table.rows.map(r => Object.fromEntries(pairs.map(([key, j]) => [key, r[j]])))
    } else if (field.kind === 'triangle' && map.kind === 'triangle' && triangleShaped(table)) {
      out[field.key] = {
        origins: table.rows.map(r => r[0]),
        ages: table.columns.slice(1).map(Number),
        values: table.rows.map(r => r.slice(1).map(c => (c === '' ? null : c))),
      } as never
    } else if ((field.kind === 'number' || field.kind === 'date') && map.kind === 'cell') {
      const value = cellAt(table, map.column, map.row)
      if (value !== undefined && value !== '') out[field.key] = value
    }
  }
  return out
}

const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/**
 * A first guess at a mapping when a CSV is connected to a tool, for the reader
 * to check: a table field is mapped when every column it needs finds a CSV
 * column, by name (the table column's key or label in the header) or else by
 * kind (a date column for a text one, the next unused number column for a
 * number one); a triangle field when the file is triangle-shaped. Single cells
 * are never guessed — which row is a judgment.
 */
export function guessMapping(table: CsvTable, spec: ToolSpec): CsvMapping {
  const out: CsvMapping = {}
  const kinds = table.columns.map((_, j) => columnKind(table, j))
  const headers = table.columns.map(words)
  for (const field of spec.fields) {
    if (field.kind === 'triangle' && triangleShaped(table)) {
      out[field.key] = { kind: 'triangle' }
      continue
    }
    if (field.kind !== 'table') continue
    const used = new Set<number>()
    const columns: Record<string, number> = {}
    let complete = true
    for (const c of field.columns) {
      const names = [words(c.key), words(c.label)].filter(Boolean)
      let j = headers.findIndex((h, k) => !used.has(k) && names.some(n => h === n || h.includes(n) || n.includes(h)))
      if (j < 0) j = kinds.findIndex((k, idx) => !used.has(idx) && (c.kind === 'text' ? k === 'date' || k === 'text' : k === 'number'))
      if (j < 0) {
        if (!c.optional) complete = false
        continue
      }
      used.add(j)
      columns[c.key] = j
    }
    if (complete && Object.keys(columns).length) out[field.key] = { kind: 'columns', columns }
  }
  return out
}

/** The fields a mapping fills — what the connection carries, for the link note. */
export function mappedFields(spec: ToolSpec, table: CsvTable, mapping: CsvMapping | undefined): string[] {
  return Object.keys(csvInput(table, spec, mapping))
}

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/** A stored CSV, read back field by field. */
export function parseCsvTable(raw: unknown): CsvTable | null {
  if (!isObject(raw) || !Array.isArray(raw.columns) || !Array.isArray(raw.rows)) return null
  const columns = raw.columns.map(c => String(c ?? ''))
  if (!columns.length || columns.length > CSV_LIMITS.columns || raw.rows.length > CSV_LIMITS.rows) return null
  const rows = raw.rows.filter(Array.isArray).map(r => columns.map((_, j) => String((r as unknown[])[j] ?? '')))
  return { name: typeof raw.name === 'string' ? raw.name : 'data.csv', columns, rows }
}

/** A stored mapping, read back field by field: anything that isn't one is dropped. */
export function parseMapping(raw: unknown): CsvMapping | undefined {
  if (!isObject(raw)) return undefined
  const out: CsvMapping = {}
  for (const [key, m] of Object.entries(raw)) {
    if (!isObject(m)) continue
    if (m.kind === 'triangle') out[key] = { kind: 'triangle' }
    else if (m.kind === 'cell' && Number.isInteger(m.column) && Number.isInteger(m.row)) out[key] = { kind: 'cell', column: m.column as number, row: m.row as number }
    else if (m.kind === 'columns' && isObject(m.columns)) {
      const columns = Object.fromEntries(Object.entries(m.columns).filter(([, j]) => Number.isInteger(j))) as Record<string, number>
      out[key] = { kind: 'columns', columns }
    }
  }
  return Object.keys(out).length ? out : undefined
}

/** The CSV as a few lines of text, for the brief Claude is given — the whole file if it is small. */
export function csvText(table: CsvTable, maxRows = 200): string {
  const quote = (c: string) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)
  const lines = [table.columns, ...table.rows.slice(0, maxRows)].map(r => r.map(quote).join(','))
  if (table.rows.length > maxRows) lines.push(`… ${table.rows.length - maxRows} more rows`)
  return lines.join('\n')
}
