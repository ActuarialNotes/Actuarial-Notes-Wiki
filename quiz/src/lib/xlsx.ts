/**
 * A minimal **.xlsx writer** — enough of the format to hand someone a real
 * workbook, and no more.
 *
 * Why write one rather than take a dependency: an export is the last step of
 * the Cowork loop and the only thing that leaves the app, so it is worth the
 * few hundred bytes of arithmetic here instead of ~700 KB of SheetJS in the
 * bundle for a feature that writes cells and nothing else. What it does *not*
 * do is the reason it stays small: no formulas, no styling beyond a bold header
 * row, no shared-string table (values are written as inline strings), no
 * compression. A spreadsheet application reads all of that fine.
 *
 * An .xlsx is a ZIP of XML parts. The two pieces that have to be exactly right
 * are the ZIP container (local header, central directory, end record — with a
 * CRC-32 per entry) and the workbook's part-to-part relationships. Both are
 * written here with **stored** (uncompressed) entries, which is a legal ZIP and
 * removes the only piece that would need a deflate implementation.
 *
 * Pure: `buildXlsx` takes rows and returns bytes, so the whole format is
 * testable without a DOM. `downloadWorkbook` is the one impure helper.
 */

/** A cell. `null` writes an empty cell rather than the string "null". */
export type CellValue = string | number | boolean | null

export interface Sheet {
  /** Excel caps a sheet name at 31 characters and forbids : \ / ? * [ ]. */
  name: string
  /** The header row, written bold. Optional — a sheet may be rows alone. */
  columns?: string[]
  rows: CellValue[][]
}

/* --------------------------------------------------------------------- CRC */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[i] = c >>> 0
  }
  return table
})()

export function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

/* --------------------------------------------------------------------- XML */

/**
 * Escapes text for an XML text node or attribute. The control characters XML
 * 1.0 forbids outright are dropped rather than escaped — a stray \u0001 in a
 * pasted title would otherwise make the whole workbook unreadable.
 */
export function xmlEscape(value: string): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** `0 → A`, `25 → Z`, `26 → AA`. Excel's column naming is base-26 bijective. */
export function columnName(index: number): string {
  let n = Math.max(0, Math.floor(index))
  let name = ''
  for (;;) {
    name = String.fromCharCode(65 + (n % 26)) + name
    n = Math.floor(n / 26) - 1
    if (n < 0) return name
  }
}

/**
 * Excel rejects a workbook whose sheet name is empty, over 31 characters or
 * carries one of the six reserved characters, so the name is cleaned rather
 * than passed through — an export must never fail on its own tab label.
 */
export function safeSheetName(name: string, fallback = 'Sheet'): string {
  const cleaned = name.replace(/[:\\/?*[\]]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 31)
  return cleaned || fallback
}

function cellXml(ref: string, value: CellValue, bold: boolean): string {
  const style = bold ? ' s="1"' : ''
  if (value === null || value === undefined || value === '') return `<c r="${ref}"${style}/>`
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `<c r="${ref}"${style}><v>${value}</v></c>`
  }
  if (typeof value === 'boolean') {
    return `<c r="${ref}"${style} t="b"><v>${value ? 1 : 0}</v></c>`
  }
  // `xml:space="preserve"` keeps a value that is meant to be indented or that
  // ends in a space from being trimmed back by the reader.
  return `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${xmlEscape(String(value))}</t></is></c>`
}

function sheetXml(sheet: Sheet): string {
  const rows: string[] = []
  let rowIndex = 1
  if (sheet.columns?.length) {
    const cells = sheet.columns.map((c, i) => cellXml(`${columnName(i)}${rowIndex}`, c, true)).join('')
    rows.push(`<row r="${rowIndex}">${cells}</row>`)
    rowIndex++
  }
  for (const row of sheet.rows) {
    const cells = row.map((v, i) => cellXml(`${columnName(i)}${rowIndex}`, v, false)).join('')
    rows.push(`<row r="${rowIndex}">${cells}</row>`)
    rowIndex++
  }
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    `<sheetData>${rows.join('')}</sheetData>` +
    '</worksheet>'
  )
}

/** Two fonts and two cell formats: the header row is bold, everything else isn't. */
const STYLES_XML =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
  '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font>' +
  '<font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
  '<fills count="1"><fill><patternFill patternType="none"/></fill></fills>' +
  '<borders count="1"><border/></borders>' +
  '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
  '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
  '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>' +
  '</styleSheet>'

/* --------------------------------------------------------------------- ZIP */

interface ZipEntry {
  name: string
  data: Uint8Array
}

function utf8(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

function u16(value: number): number[] {
  return [value & 0xff, (value >>> 8) & 0xff]
}

function u32(value: number): number[] {
  return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]
}

/**
 * A ZIP with every entry **stored**. `date` sets the DOS timestamp each entry
 * carries — passed in rather than read from the clock so the same workbook
 * built twice is byte-identical, which is what makes the container testable.
 */
export function buildZip(entries: ZipEntry[], date = new Date(2020, 0, 1)): Uint8Array {
  const dosTime = ((date.getHours() << 11) | (date.getMinutes() << 5) | (Math.floor(date.getSeconds() / 2))) & 0xffff
  const dosDate = (((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()) & 0xffff

  const local: number[] = []
  const central: number[] = []
  let offset = 0

  for (const entry of entries) {
    const nameBytes = utf8(entry.name)
    const crc = crc32(entry.data)
    const size = entry.data.length

    // Flag bit 11 marks the filename as UTF-8, which every part name here is.
    const header = [
      ...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0),
      ...u16(dosTime), ...u16(dosDate),
      ...u32(crc), ...u32(size), ...u32(size),
      ...u16(nameBytes.length), ...u16(0),
    ]
    local.push(...header, ...nameBytes, ...entry.data)

    central.push(
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0),
      ...u16(dosTime), ...u16(dosDate),
      ...u32(crc), ...u32(size), ...u32(size),
      ...u16(nameBytes.length), ...u16(0), ...u16(0),
      ...u16(0), ...u16(0), ...u32(0),
      ...u32(offset),
      ...nameBytes,
    )
    offset += header.length + nameBytes.length + size
  }

  const end = [
    ...u32(0x06054b50), ...u16(0), ...u16(0),
    ...u16(entries.length), ...u16(entries.length),
    ...u32(central.length), ...u32(offset), ...u16(0),
  ]

  return Uint8Array.from([...local, ...central, ...end])
}

/* ---------------------------------------------------------------- workbook */

/**
 * Builds a workbook from its sheets. Sheet names are made safe and
 * de-duplicated — Excel refuses a workbook with two tabs of the same name, and
 * two exports of the same table is a thing a reader will do.
 */
export function buildXlsx(sheets: Sheet[], date?: Date): Uint8Array {
  const used = new Set<string>()
  const named = sheets.map((sheet, i) => {
    let name = safeSheetName(sheet.name, `Sheet${i + 1}`)
    if (used.has(name.toLowerCase())) {
      let n = 2
      // Leave room for the " (n)" suffix inside the 31-character cap.
      while (used.has(safeSheetName(`${name} (${n})`).toLowerCase())) n++
      name = safeSheetName(`${name} (${n})`)
    }
    used.add(name.toLowerCase())
    return { ...sheet, name }
  })

  const entries: ZipEntry[] = []

  const overrides = named
    .map((_, i) =>
      `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`,
    )
    .join('')

  entries.push({
    name: '[Content_Types].xml',
    data: utf8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
        overrides +
        '</Types>',
    ),
  })

  entries.push({
    name: '_rels/.rels',
    data: utf8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
        '</Relationships>',
    ),
  })

  entries.push({
    name: 'xl/workbook.xml',
    data: utf8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
        named
          .map((s, i) => `<sheet name="${xmlEscape(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`)
          .join('') +
        '</sheets></workbook>',
    ),
  })

  entries.push({
    name: 'xl/_rels/workbook.xml.rels',
    data: utf8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        named
          .map(
            (_, i) =>
              `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`,
          )
          .join('') +
        `<Relationship Id="rId${named.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
        '</Relationships>',
    ),
  })

  entries.push({ name: 'xl/styles.xml', data: utf8(STYLES_XML) })

  named.forEach((sheet, i) => {
    entries.push({ name: `xl/worksheets/sheet${i + 1}.xml`, data: utf8(sheetXml(sheet)) })
  })

  return buildZip(entries, date)
}

export const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

/** Renders sheets as CSV — one sheet only, for the plain-text export option. */
export function sheetToCsv(sheet: Sheet): string {
  const escape = (value: CellValue): string => {
    if (value === null || value === undefined) return ''
    let str = String(value)
    // Defuse spreadsheet formula injection, the same way lib/exportData.ts does.
    if (/^[=+\-@]/.test(str)) str = `'${str}`
    return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
  }
  const lines = [
    ...(sheet.columns?.length ? [sheet.columns.map(escape).join(',')] : []),
    ...sheet.rows.map(row => row.map(escape).join(',')),
  ]
  // Leading BOM so Excel opens the file as UTF-8.
  return '﻿' + lines.join('\r\n') + '\r\n'
}

/** Hands the reader a file. The one impure function in this module. */
export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoked on the next tick: revoking synchronously races the click in Safari.
  setTimeout(() => URL.revokeObjectURL(url), 0)
}

export function downloadWorkbook(filename: string, sheets: Sheet[]): void {
  const bytes = buildXlsx(sheets, new Date())
  // A fresh ArrayBuffer copy — a Uint8Array view can be a slice of a larger
  // buffer, and Blob would then carry the whole of it.
  downloadBlob(filename, new Blob([bytes.slice().buffer], { type: XLSX_MIME }))
}

export function downloadCsvSheet(filename: string, sheet: Sheet): void {
  downloadBlob(filename, new Blob([sheetToCsv(sheet)], { type: 'text/csv;charset=utf-8' }))
}
