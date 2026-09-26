/**
 * The PCPA workspace's spreadsheet files (`.sheet`) — what the spreadsheet
 * editor (Fortune-sheet, an open-source Excel-style grid with a formula
 * engine) saves, in a form compact enough to keep a whole data set in
 * (`docs/pcpa-project.md`).
 *
 * Fortune-sheet hands back every cell as an object; sixteen thousand rows of
 * that is tens of megabytes of JSON. Here a cell holding a plain value is just
 * the value, and only a cell with a formula or formatting keeps an object —
 * a data set stays close to its CSV size.
 *
 * Pure and tested. The editor is `components/project/SpreadsheetEditor.tsx`.
 */

import { csvNumber, parseCsv, toCsv, type CsvValue } from '../csv'
import type { Sheet as XlsxSheet } from '../xlsx'

export type Primitive = string | number | boolean

/** A cell with more than a value: a formula, a number format or styling. */
export interface RichCell {
  v?: Primitive
  m?: string
  f?: string
  ct?: { fa?: string; t?: string }
  bl?: number
  it?: number
  fc?: string
  bg?: string
  fs?: number
  ht?: number
}

export type StoredCell = Primitive | RichCell | null

export interface SheetFileSheet {
  name: string
  rows: StoredCell[][]
}

export interface SheetFile {
  version: 1
  sheets: SheetFileSheet[]
}

/** Fortune-sheet's shapes, as far as this module touches them. */
export interface FortuneCell extends RichCell {
  [key: string]: unknown
}

export interface FortuneSheet {
  name: string
  id?: string
  order?: number
  status?: number
  row?: number
  column?: number
  data?: (FortuneCell | null)[][]
  celldata?: { r: number; c: number; v: FortuneCell | null }[]
  [key: string]: unknown
}

/** Rows the editor opens a CSV with, at most — past this a grid stops being usable. */
export const SHEET_ROW_LIMIT = 30_000

const STYLE_KEYS = ['bl', 'it', 'fc', 'bg', 'fs', 'ht'] as const

function compactCell(cell: FortuneCell | null | undefined): StoredCell {
  if (!cell) return null
  const hasValue = cell.v !== undefined && cell.v !== null && cell.v !== ''
  const format = cell.ct?.fa && cell.ct.fa !== 'General' ? cell.ct : undefined
  const styles = STYLE_KEYS.filter(k => cell[k] !== undefined && cell[k] !== null && cell[k] !== 0)
  if (!cell.f && !format && styles.length === 0) return hasValue ? (cell.v as Primitive) : null
  const rich: RichCell = {}
  if (hasValue) rich.v = cell.v as Primitive
  if (cell.f) rich.f = cell.f
  if (format) {
    rich.ct = { fa: format.fa, t: format.t }
    if (cell.m !== undefined && cell.m !== null) rich.m = String(cell.m)
  }
  for (const k of styles) (rich as Record<string, unknown>)[k] = cell[k]
  return rich
}

function trimRows(rows: StoredCell[][]): StoredCell[][] {
  const out = rows.map(row => {
    let end = row.length
    while (end > 0 && row[end - 1] === null) end--
    return row.slice(0, end)
  })
  let last = out.length
  while (last > 0 && out[last - 1].length === 0) last--
  return out.slice(0, last)
}

/** What the editor reports on a change, reduced to what is stored. */
export function fromFortune(sheets: FortuneSheet[]): SheetFile {
  const ordered = [...sheets].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  return {
    version: 1,
    sheets: ordered.map(sheet => {
      let rows: StoredCell[][]
      if (sheet.data) {
        rows = sheet.data.map(row => (row ?? []).map(compactCell))
      } else {
        rows = []
        for (const cell of sheet.celldata ?? []) {
          while (rows.length <= cell.r) rows.push([])
          const row = rows[cell.r]
          while (row.length < cell.c) row.push(null)
          row[cell.c] = compactCell(cell.v)
        }
      }
      return { name: sheet.name, rows: trimRows(rows) }
    }),
  }
}

function displayOf(value: Primitive): string {
  return typeof value === 'number' ? String(value) : typeof value === 'boolean' ? (value ? 'TRUE' : 'FALSE') : value
}

function fortuneCell(cell: StoredCell): FortuneCell | null {
  if (cell === null || cell === undefined) return null
  if (typeof cell !== 'object') {
    return { v: cell, m: displayOf(cell), ct: { fa: 'General', t: typeof cell === 'number' ? 'n' : 'g' } }
  }
  const out: FortuneCell = { ...cell }
  if (cell.v !== undefined && cell.m === undefined) out.m = displayOf(cell.v)
  if (!cell.ct) out.ct = { fa: 'General', t: typeof cell.v === 'number' ? 'n' : 'g' }
  return out
}

/** A stored workbook as the editor opens it. */
export function toFortune(file: SheetFile): FortuneSheet[] {
  const sheets = file.sheets.length ? file.sheets : [{ name: 'Sheet1', rows: [] }]
  return sheets.map((sheet, i) => {
    const celldata: { r: number; c: number; v: FortuneCell | null }[] = []
    let columns = 0
    sheet.rows.forEach((row, r) => {
      columns = Math.max(columns, row.length)
      row.forEach((cell, c) => {
        const v = fortuneCell(cell)
        if (v) celldata.push({ r, c, v })
      })
    })
    return {
      name: sheet.name,
      id: `sheet-${i + 1}`,
      order: i,
      status: i === 0 ? 1 : 0,
      row: Math.max(100, sheet.rows.length + 50),
      column: Math.max(26, columns + 8),
      celldata,
    }
  })
}

/** Whether a CSV field should become a number: plain numerals, but not an id like "0200002". */
function csvCell(text: string): Primitive | null {
  if (text === '') return null
  if (/^-?0\d/.test(text)) return text
  const n = csvNumber(text)
  return n !== null && /^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(text.trim()) ? n : text
}

/** A CSV opened as a one-sheet workbook. Reports whether rows were left out. */
export function fromCsv(csvText: string, sheetName: string): { file: SheetFile; truncated: number } {
  const { columns, rows } = parseCsv(csvText)
  const kept = rows.slice(0, SHEET_ROW_LIMIT)
  const header: StoredCell[] = columns.map(c => ({ v: c, bl: 1 }))
  return {
    file: { version: 1, sheets: [{ name: sheetName.slice(0, 31) || 'Sheet1', rows: [header, ...kept.map(r => r.map(csvCell))] }] },
    truncated: rows.length - kept.length,
  }
}

export function emptySheetFile(): SheetFile {
  return { version: 1, sheets: [{ name: 'Sheet1', rows: [] }] }
}

export function parseSheetFile(text: string): SheetFile {
  try {
    const parsed = JSON.parse(text) as SheetFile
    if (parsed && Array.isArray(parsed.sheets)) return { version: 1, sheets: parsed.sheets.filter(s => s && Array.isArray(s.rows)) }
  } catch {
    // An unreadable file opens empty rather than failing the workspace.
  }
  return emptySheetFile()
}

function valueOf(cell: StoredCell): CsvValue {
  if (cell === null || cell === undefined) return null
  if (typeof cell === 'object') return cell.v === undefined ? null : typeof cell.v === 'boolean' ? (cell.v ? 'TRUE' : 'FALSE') : cell.v
  return typeof cell === 'boolean' ? (cell ? 'TRUE' : 'FALSE') : cell
}

/** One sheet's computed values as CSV — the first row is taken as the header. */
export function sheetToCsv(sheet: SheetFileSheet): string {
  const width = Math.max(0, ...sheet.rows.map(r => r.length))
  const grid = sheet.rows.map(r => Array.from({ length: width }, (_, c) => valueOf(r[c] ?? null)))
  const [header = [], ...body] = grid
  return toCsv(header.map(h => (h === null ? '' : String(h))), body)
}

/** Every sheet's computed values, for the xlsx writer. */
export function toXlsxSheets(file: SheetFile): XlsxSheet[] {
  return file.sheets.map(sheet => ({
    name: sheet.name,
    rows: sheet.rows.map(r => r.map(valueOf)),
  }))
}
