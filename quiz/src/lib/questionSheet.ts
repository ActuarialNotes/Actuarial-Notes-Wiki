/**
 * A question's spreadsheet — **Open in Spreadsheet** (docs/question-spreadsheet.md).
 *
 * Three jobs, all pure:
 *
 *  1. **Lay the question's tables into a sheet.** Every markdown table in the
 *     stem and the parts goes in, stacked down column A under its caption (the
 *     bold line the bank writes above it), with numbers made numbers —
 *     `\$1,709,000` becomes 1709000 shown as `$1,709,000`. The cells are read
 *     off the question mechanically: nothing is retyped, the vault's rule for
 *     anything a paper prints.
 *  2. **Check formulas against the exam day's function list.** Which functions
 *     a formula calls, and which of those the exam's spreadsheet doesn't offer
 *     (`offListFunctions`, `offListCells`). The list itself is data —
 *     `data/pearsonVueFunctions.json`, read off the test vendor's own file.
 *  3. **Insert a cell into an answer.** The selected cell's address and the
 *     value it shows (`cellAddress`, `shownValue`), and the text an answer box
 *     holds once that value is dropped in at the caret (`insertAtCaret`).
 *
 * The workbook shape is the Projects workspace's (`lib/project/sheetFile.ts`),
 * so the same Fortune-sheet editor opens it.
 */

import type { RichCell, SheetFile, StoredCell } from './project/sheetFile'

// ── Tables → sheet ──────────────────────────────────────────────────────────

export interface MarkdownTable {
  /** The line written above the table — usually bold — or null. */
  caption: string | null
  header: string[]
  rows: string[][]
}

const TABLE_LINE = /^\s*\|.*\|\s*$/
const SEPARATOR = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/

function splitRow(line: string): string[] {
  let body = line.trim()
  if (body.startsWith('|')) body = body.slice(1)
  if (body.endsWith('|') && !body.endsWith('\\|')) body = body.slice(0, -1)
  // Split on pipes that aren't escaped.
  const cells: string[] = []
  let cur = ''
  for (let i = 0; i < body.length; i++) {
    const ch = body[i]
    if (ch === '\\' && body[i + 1] === '|') { cur += '|'; i++; continue }
    if (ch === '|') { cells.push(cur.trim()); cur = ''; continue }
    cur += ch
  }
  cells.push(cur.trim())
  return cells
}

/** Markdown emphasis and escapes off a short line of text. */
export function plainText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, '$1$2')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\\([$%&_#|*])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function captionFrom(line: string | undefined): string | null {
  if (!line) return null
  const text = plainText(line.replace(/^#+\s*/, '')).replace(/:$/, '').trim()
  // A caption is a label, not a paragraph of the question.
  if (!text || text.length > 90 || TABLE_LINE.test(line)) return null
  return text
}

/** Every GFM table in a block of markdown, in order, with its caption. */
export function markdownTables(markdown: string): MarkdownTable[] {
  const lines = markdown.split(/\r?\n/)
  const tables: MarkdownTable[] = []
  for (let i = 0; i < lines.length - 1; i++) {
    if (!TABLE_LINE.test(lines[i]) || !lines[i + 1].includes('|') || !SEPARATOR.test(lines[i + 1])) continue
    let prev = i - 1
    while (prev >= 0 && lines[prev].trim() === '') prev--
    const header = splitRow(lines[i]).map(plainText)
    const rows: string[][] = []
    let j = i + 2
    while (j < lines.length && TABLE_LINE.test(lines[j])) {
      rows.push(splitRow(lines[j]))
      j++
    }
    tables.push({ caption: captionFrom(lines[prev]), header, rows })
    i = j - 1
  }
  return tables
}

export interface ParsedCell {
  value: string | number
  /** The text as the question prints it (the cell's display). */
  shown: string
  /** A number format for Fortune-sheet, when the text carried one. */
  format: string | null
}

const NUMBER = /^(\()?\s*(-)?\s*(\$)?\s*(-)?\s*(\d{1,3}(?:,\d{3})+|\d+)?(\.\d+)?\s*(%)?\s*(\))?$/

function decimalsOf(fraction: string | undefined): string {
  return fraction && fraction.length > 1 ? '.' + '0'.repeat(fraction.length - 1) : ''
}

/**
 * A table cell's text as a spreadsheet value. A plain number, a dollar amount,
 * a thousands-separated figure, a percentage or a bracketed negative becomes a
 * number with the format it was printed in; anything else stays text.
 */
export function parseCell(raw: string): ParsedCell {
  let text = raw.trim()
  // Inline math wrapping a bare figure: `$0.05$`, `$\$400$`.
  const math = /^\$(.+)\$$/.exec(text)
  if (math && !/[a-zA-Z{}^_]/.test(math[1].replace(/\\[$%,]/g, ''))) text = math[1]
  const shown = plainText(text.replace(/\\,/g, ','))
  const m = NUMBER.exec(shown)
  if (!m || (!m[5] && !m[6])) return { value: shown, shown, format: null }
  const [, open, minus1, dollar, minus2, whole, fraction, percent, close] = m
  if (Boolean(open) !== Boolean(close)) return { value: shown, shown, format: null }
  let n = Number(`${whole ?? '0'}${fraction ?? ''}`.replace(/,/g, ''))
  if (open || minus1 || minus2) n = -n
  const decimals = decimalsOf(fraction)
  if (percent) {
    return { value: n / 100, shown, format: `0${decimals}%` }
  }
  const grouped = Boolean(whole && whole.includes(','))
  if (dollar) return { value: n, shown, format: `"$"#,##0${decimals}` }
  if (grouped) return { value: n, shown, format: `#,##0${decimals}` }
  return { value: n, shown, format: null }
}

function storedCell(parsed: ParsedCell, bold = false): StoredCell {
  if (parsed.value === '' && !bold) return null
  if (!parsed.format && !bold) return parsed.value
  const cell: RichCell = { v: parsed.value }
  if (parsed.format) {
    cell.ct = { fa: parsed.format, t: 'n' }
    cell.m = parsed.shown
  }
  if (bold) cell.bl = 1
  return cell
}

/** The sheet's one tab — the test driver gives one worksheet per question. */
export const QUESTION_SHEET_NAME = 'Sheet1'

/**
 * A question's opening workbook: its tables, stacked under their captions with
 * a blank row between, in the order the question prints them. A question with
 * no table opens a blank sheet.
 */
export function questionWorkbook(markdown: readonly string[]): SheetFile {
  const rows: StoredCell[][] = []
  for (const block of markdown) {
    for (const table of markdownTables(block)) {
      if (rows.length) rows.push([])
      if (table.caption) rows.push([{ v: table.caption, bl: 1, tb: '1' }])
      rows.push(table.header.map(h => storedCell(parseCell(h), true)))
      for (const row of table.rows) rows.push(row.map(cell => storedCell(parseCell(cell))))
    }
  }
  return { version: 1, sheets: [{ name: QUESTION_SHEET_NAME, rows }] }
}

/**
 * Column widths (px) wide enough for what each column holds, so a header like
 * "Accident Year" or a figure like "$1,709,000" isn't cut off. A caption — a
 * row's lone label — runs over its neighbours instead, so it doesn't count.
 */
export function columnWidths(file: SheetFile, sheetIndex = 0): Record<string, number> {
  const widths: Record<string, number> = {}
  for (const row of file.sheets[sheetIndex]?.rows ?? []) {
    // A caption is a row's one label, in its first cell.
    const filled = row.filter(cell => shownValue(cell) !== '')
    if (filled.length === 1 && shownValue(row[0]) !== '' && typeof (typeof row[0] === 'object' && row[0] !== null ? row[0].v : row[0]) === 'string') continue
    row.forEach((cell, c) => {
      const text = shownValue(cell)
      if (!text) return
      const px = Math.round(Math.min(240, Math.max(73, text.length * 7.5 + 18)))
      if (px > (widths[c] ?? 0)) widths[c] = px
    })
  }
  return widths
}

/** The markdown a question's tables are read from: the stem, then each part's. */
export function questionMarkdown(question: { stem: string; parts?: readonly { stem: string }[] }): string[] {
  return [question.stem, ...(question.parts ?? []).map(p => p.stem)]
}

// ── Formulas against the exam day's list ────────────────────────────────────

/**
 * The functions a formula calls, upper-cased, each once, in order. Text in
 * quotes is skipped (`=IF(A1="SUM(",…)` calls IF only), and Excel's `_xlfn.`
 * prefix is dropped.
 */
export function formulaFunctions(formula: string): string[] {
  const code = formula.replace(/"(?:[^"]|"")*"/g, '""')
  const names: string[] = []
  const re = /(^|[^A-Za-z0-9_.$!:])([A-Za-z_][A-Za-z0-9_.]*)\s*\(/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code))) {
    const name = m[2].toUpperCase().replace(/^_XLFN\./, '').replace(/^_XLWS\./, '')
    if (!names.includes(name)) names.push(name)
  }
  return names
}

/** The functions a formula calls that aren't on `allowed`. */
export function offListFunctions(formula: string, allowed: ReadonlySet<string>): string[] {
  if (!formula.trim().startsWith('=')) return []
  return formulaFunctions(formula).filter(name => !allowed.has(name))
}

export interface OffListCell {
  row: number
  column: number
  address: string
  functions: string[]
}

/** Every cell of a sheet whose formula calls a function that isn't on `allowed`. */
export function offListCells(file: SheetFile, allowed: ReadonlySet<string>, sheetIndex = 0): OffListCell[] {
  const sheet = file.sheets[sheetIndex]
  if (!sheet) return []
  const out: OffListCell[] = []
  sheet.rows.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell || typeof cell !== 'object' || !cell.f) return
      const functions = offListFunctions(cell.f, allowed)
      if (functions.length) out.push({ row: r, column: c, address: cellAddress(r, c), functions })
    })
  })
  return out
}

// ── Inserting a cell into an answer ─────────────────────────────────────────

/** `(0, 0) → A1`, `(2, 7) → H3`. */
export function cellAddress(row: number, column: number): string {
  let n = Math.max(0, Math.floor(column))
  let name = ''
  for (;;) {
    name = String.fromCharCode(65 + (n % 26)) + name
    n = Math.floor(n / 26) - 1
    if (n < 0) break
  }
  return `${name}${Math.max(0, Math.floor(row)) + 1}`
}

/** What a cell shows: its formatted display, else its value; '' for an empty or errored cell. */
export function shownValue(cell: { v?: unknown; m?: unknown } | string | number | boolean | null | undefined): string {
  if (cell === null || cell === undefined) return ''
  if (typeof cell !== 'object') return typeof cell === 'boolean' ? (cell ? 'TRUE' : 'FALSE') : String(cell)
  const m = cell.m
  if (typeof m === 'string' && m !== '') return m
  if (typeof m === 'number') return String(m)
  const v = cell.v
  if (v === null || v === undefined) return ''
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE'
  return String(v)
}

/**
 * `text` with `insert` put in place of its selection `[start, end)`, and where
 * the caret lands after it. A space is added before the value when it would
 * otherwise run into the word before it ("=88" stays, "total88" doesn't).
 */
export function insertAtCaret(text: string, start: number, end: number, insert: string): { text: string; caret: number } {
  const a = Math.max(0, Math.min(start, text.length))
  const b = Math.max(a, Math.min(end, text.length))
  const before = text.slice(0, a)
  const pad = /[A-Za-z0-9.,)]$/.test(before) ? ' ' : ''
  const next = before + pad + insert + text.slice(b)
  return { text: next, caret: a + pad.length + insert.length }
}

// ── Where the pane sits ─────────────────────────────────────────────────────

export interface Viewport { width: number; height: number }
export interface WindowRect { x: number; y: number; width: number; height: number }

/** The docked pane's width on a wide screen: at least 360 px, leaving the question 420 px. */
export function clampDockWidth(px: number, viewport: Viewport): number {
  const max = Math.max(360, viewport.width - 420)
  return Math.round(Math.min(max, Math.max(360, px)))
}

/** The docked pane's opening width: a little under half the screen, at most 820 px. */
export function defaultDockWidth(viewport: Viewport): number {
  return clampDockWidth(Math.min(820, viewport.width * 0.46), viewport)
}

/** The docked sheet's height on a narrow screen: between 180 px and 85% of it. */
export function clampDockHeight(px: number, viewport: Viewport): number {
  const max = Math.max(180, viewport.height * 0.85)
  return Math.round(Math.min(max, Math.max(180, px)))
}

const MIN_WINDOW = { width: 380, height: 260 }

/**
 * The popped-out window kept on screen: no smaller than it can be used at, no
 * bigger than the screen, and its title bar always within reach.
 */
export function clampWindowRect(rect: WindowRect, viewport: Viewport): WindowRect {
  const width = Math.round(Math.min(viewport.width - 16, Math.max(MIN_WINDOW.width, rect.width)))
  const height = Math.round(Math.min(viewport.height - 16, Math.max(MIN_WINDOW.height, rect.height)))
  const x = Math.round(Math.min(viewport.width - width - 8, Math.max(8, rect.x)))
  const y = Math.round(Math.min(viewport.height - height - 8, Math.max(8, rect.y)))
  return { x, y, width, height }
}

/** Where the window first opens: the lower right, over the answer, 760 × 520. */
export function defaultWindowRect(viewport: Viewport): WindowRect {
  const width = 760
  const height = 520
  return clampWindowRect({ x: viewport.width - width - 32, y: viewport.height - height - 32, width, height }, viewport)
}

// ── Which parts are worked in the spreadsheet ───────────────────────────────

// A part that asks for numbers — a triangle constructed, a factor calculated —
// is one the exam day's spreadsheet is for. Read off the command word, as the
// Tutor reads a part's kind (lib/tutor/items.ts); a table row is data, not an
// instruction, so it never counts.
// "estimate" is the verb, not "the estimate of …".
const NUMBER_WORDS = /\b(calculate|calculating|compute|computing|construct|constructing|create|build|produce|determine|(?<!\b(?:the|an|this|that|your|its|their)\s)estimate(?!s?\s+of\b)|derive|quantify|develop|complete|prepare|fill|tabulate|reconcile)\b/i
const ANY_COMMAND = /\b(calculate|compute|construct|create|build|produce|determine|estimate|derive|quantify|develop|complete|prepare|fill|tabulate|reconcile|explain|discuss|describe|identify|define|state|list|give|provide|name|outline|summari[sz]e|contrast|compare|differentiate|distinguish|interpret|comment|recommend|justify|evaluate|assess|critique|argue|propose|select|choose|decide|why|which)\b/i

function instructionText(markdown: string): string {
  return markdown
    .split('\n')
    .filter(line => !/^\s*\|/.test(line))
    .join('\n')
}

/**
 * Whether a part asks to be worked in the spreadsheet: its own instruction
 * names a calculation. A part with no command word of its own ("Paid losses.")
 * answers the question's preamble, so the preamble decides.
 */
export function partWantsSheet(partStem: string, preamble = ''): boolean {
  const own = instructionText(partStem)
  if (ANY_COMMAND.test(own)) return NUMBER_WORDS.test(own)
  return NUMBER_WORDS.test(instructionText(preamble))
}
