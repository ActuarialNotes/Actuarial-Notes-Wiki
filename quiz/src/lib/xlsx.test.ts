import { describe, it, expect } from 'vitest'
import {
  buildXlsx,
  buildZip,
  columnName,
  crc32,
  safeSheetName,
  sheetToCsv,
  xmlEscape,
  type Sheet,
} from './xlsx'

const FIXED = new Date(2020, 0, 1, 12, 0, 0)

function decode(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes)
}

/**
 * Reads the part names out of a stored ZIP's central directory. Names are
 * decoded from the *bytes* rather than from a decoded string: decoding the
 * whole archive first would turn its binary headers into replacement
 * characters and throw every offset off.
 */
function zipEntryNames(bytes: Uint8Array): string[] {
  const names: string[] = []
  // Each central-directory header is followed by its filename; find them by
  // the signature rather than by parsing the whole structure.
  for (let i = 0; i < bytes.length - 4; i++) {
    if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x01 && bytes[i + 3] === 0x02) {
      const nameLen = bytes[i + 28] | (bytes[i + 29] << 8)
      names.push(decode(bytes.slice(i + 46, i + 46 + nameLen)))
    }
  }
  return names
}

describe('crc32', () => {
  it('matches the published check value for "123456789"', () => {
    expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926)
  })

  it('is zero for empty input', () => {
    expect(crc32(new Uint8Array())).toBe(0)
  })
})

describe('columnName', () => {
  it('counts A..Z then AA', () => {
    expect(columnName(0)).toBe('A')
    expect(columnName(25)).toBe('Z')
    expect(columnName(26)).toBe('AA')
    expect(columnName(27)).toBe('AB')
    expect(columnName(51)).toBe('AZ')
    expect(columnName(52)).toBe('BA')
    expect(columnName(701)).toBe('ZZ')
    expect(columnName(702)).toBe('AAA')
  })
})

describe('xmlEscape', () => {
  it('escapes the five XML entities', () => {
    expect(xmlEscape(`<a & "b" 'c'>`)).toBe('&lt;a &amp; &quot;b&quot; &apos;c&apos;&gt;')
  })

  it('drops control characters XML 1.0 forbids', () => {
    expect(xmlEscape('a\u0001b')).toBe('ab')
  })

  it('keeps tabs and newlines, which are legal', () => {
    expect(xmlEscape('a\tb\nc')).toBe('a\tb\nc')
  })
})

describe('safeSheetName', () => {
  it('strips the characters Excel reserves', () => {
    expect(safeSheetName('Loss / ALAE [2024]')).toBe('Loss ALAE 2024')
  })

  it('caps at 31 characters', () => {
    expect(safeSheetName('x'.repeat(50))).toHaveLength(31)
  })

  it('falls back when nothing survives', () => {
    expect(safeSheetName('///', 'Sheet1')).toBe('Sheet1')
  })
})

describe('buildZip', () => {
  it('writes one central-directory entry per file', () => {
    const bytes = buildZip(
      [
        { name: 'a.txt', data: new TextEncoder().encode('hello') },
        { name: 'dir/b.txt', data: new TextEncoder().encode('world') },
      ],
      FIXED,
    )
    expect(zipEntryNames(bytes)).toEqual(['a.txt', 'dir/b.txt'])
  })

  it('starts with the local-file-header signature and ends with the EOCD', () => {
    const bytes = buildZip([{ name: 'a.txt', data: new Uint8Array([1]) }], FIXED)
    expect([...bytes.slice(0, 4)]).toEqual([0x50, 0x4b, 0x03, 0x04])
    expect([...bytes.slice(-22, -18)]).toEqual([0x50, 0x4b, 0x05, 0x06])
  })

  it('is byte-identical for the same input and date', () => {
    const entries = [{ name: 'a.txt', data: new TextEncoder().encode('hello') }]
    expect(buildZip(entries, FIXED)).toEqual(buildZip(entries, FIXED))
  })
})

describe('buildXlsx', () => {
  const sheets: Sheet[] = [
    { name: 'Experience', columns: ['Year', 'Premium'], rows: [[2024, 1000], [2025, null]] },
  ]

  it('writes the parts a reader needs to open the workbook', () => {
    const names = zipEntryNames(buildXlsx(sheets, FIXED))
    expect(names).toContain('[Content_Types].xml')
    expect(names).toContain('_rels/.rels')
    expect(names).toContain('xl/workbook.xml')
    expect(names).toContain('xl/_rels/workbook.xml.rels')
    expect(names).toContain('xl/styles.xml')
    expect(names).toContain('xl/worksheets/sheet1.xml')
  })

  it('writes numbers as values and text as inline strings', () => {
    const xml = decode(buildXlsx(sheets, FIXED))
    expect(xml).toContain('<c r="A2"><v>2024</v></c>')
    expect(xml).toContain('t="inlineStr"')
  })

  it('writes an empty cell for null rather than the word null', () => {
    const xml = decode(buildXlsx(sheets, FIXED))
    expect(xml).toContain('<c r="B3"/>')
    expect(xml).not.toContain('null')
  })

  it('marks the header row bold', () => {
    const xml = decode(buildXlsx(sheets, FIXED))
    expect(xml).toContain('<c r="A1" s="1"')
  })

  it('de-duplicates sheet names, which Excel refuses', () => {
    const bytes = buildXlsx(
      [
        { name: 'Summary', rows: [] },
        { name: 'Summary', rows: [] },
      ],
      FIXED,
    )
    const xml = decode(bytes)
    expect(xml).toContain('name="Summary"')
    expect(xml).toContain('name="Summary (2)"')
  })

  it('declares one worksheet override per sheet', () => {
    const xml = decode(buildXlsx([{ name: 'A', rows: [] }, { name: 'B', rows: [] }], FIXED))
    expect(xml.match(/worksheets\/sheet\d+\.xml" ContentType/g)).toHaveLength(2)
  })

  it('escapes a sheet name that carries an ampersand', () => {
    const xml = decode(buildXlsx([{ name: 'Loss & ALAE', rows: [] }], FIXED))
    expect(xml).toContain('name="Loss &amp; ALAE"')
  })
})

describe('sheetToCsv', () => {
  it('writes the header then the rows, CRLF separated', () => {
    const csv = sheetToCsv({ name: 'S', columns: ['A', 'B'], rows: [['1', '2']] })
    expect(csv).toBe('﻿A,B\r\n1,2\r\n')
  })

  it('quotes a value containing a comma', () => {
    const csv = sheetToCsv({ name: 'S', rows: [['a,b']] })
    expect(csv).toContain('"a,b"')
  })

  it('defuses a leading = so a spreadsheet does not treat it as a formula', () => {
    const csv = sheetToCsv({ name: 'S', rows: [['=SUM(A1)']] })
    expect(csv).toContain("'=SUM(A1)")
  })
})

describe('buildZip with large entries', () => {
  it('stores a multi-megabyte entry without overflowing the call stack', () => {
    const data = new Uint8Array(3 * 1024 * 1024).fill(7)
    const zip = buildZip([{ name: 'big.bin', data }])
    // Local header (30) + name + data + central directory (46 + name) + end record (22).
    expect(zip.length).toBe(30 + 7 + data.length + 46 + 7 + 22)
  })
})
