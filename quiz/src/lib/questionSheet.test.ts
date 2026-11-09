import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion } from './parser'
import {
  cellAddress, clampDockWidth, columnWidths, clampWindowRect, defaultWindowRect, formulaFunctions, insertAtCaret,
  markdownTables, offListCells, offListFunctions, parseCell, partWantsSheet, questionMarkdown, questionWorkbook, shownValue,
} from './questionSheet'
import type { RichCell } from './project/sheetFile'
import pearsonVue from '../data/pearsonVueFunctions.json'

const STEM = `Given the following information:

**Cumulative Paid Claims (\\$000)**

| Accident Year | 12 Months | 24 Months |
|---|---|---|
| 2012 | \\$1,089,000 | \\$2,042,370 |
| 2013 | \\$1,709,000 | |

Ultimate Claim Counts

| AY | Ultimate |
|:--|--:|
| 2013 | 220 |

Estimate unpaid claims.`

describe('markdownTables', () => {
  it('reads each table with the line above it as its caption', () => {
    const tables = markdownTables(STEM)
    expect(tables).toHaveLength(2)
    expect(tables[0].caption).toBe('Cumulative Paid Claims ($000)')
    expect(tables[0].header).toEqual(['Accident Year', '12 Months', '24 Months'])
    expect(tables[0].rows[1]).toEqual(['2013', '\\$1,709,000', ''])
    expect(tables[1].caption).toBe('Ultimate Claim Counts')
  })

  it('takes no caption from a paragraph', () => {
    const md = 'A long sentence that is plainly part of the question, not a label for the table below it at all.\n\n| a | b |\n|---|---|\n| 1 | 2 |'
    expect(markdownTables(md)[0].caption).toBeNull()
  })

  it('ignores a pipe line that is not a table', () => {
    expect(markdownTables('| just text |\nmore')).toEqual([])
  })
})

describe('parseCell', () => {
  it('makes figures numbers, keeping how they were printed', () => {
    expect(parseCell('\\$1,709,000')).toEqual({ value: 1709000, shown: '$1,709,000', format: '"$"#,##0' })
    expect(parseCell('1,000,000')).toEqual({ value: 1000000, shown: '1,000,000', format: '#,##0' })
    expect(parseCell('132')).toEqual({ value: 132, shown: '132', format: null })
    expect(parseCell('0.05')).toEqual({ value: 0.05, shown: '0.05', format: null })
    expect(parseCell('12.5%')).toEqual({ value: 0.125, shown: '12.5%', format: '0.0%' })
    expect(parseCell('(2,500)').value).toBe(-2500)
    expect(parseCell('-3.25').value).toBe(-3.25)
    expect(parseCell('$\\$400$')).toEqual({ value: 400, shown: '$400', format: '"$"#,##0' })
  })

  it('leaves words, labels and math as text', () => {
    expect(parseCell('12 Months').value).toBe('12 Months')
    expect(parseCell('**Total**').value).toBe('Total')
    expect(parseCell('$\\alpha$').value).toBe('$\\alpha$')
    expect(parseCell('').value).toBe('')
    expect(parseCell('(5').value).toBe('(5')
  })
})

describe('questionWorkbook', () => {
  it('stacks the tables under their captions, one sheet', () => {
    const book = questionWorkbook([STEM])
    expect(book.sheets).toHaveLength(1)
    const rows = book.sheets[0].rows
    expect(rows[0]).toEqual([{ v: 'Cumulative Paid Claims ($000)', bl: 1, tb: '1' }])
    expect((rows[1][0] as RichCell).v).toBe('Accident Year')
    expect(rows[2][0]).toBe(2012)
    expect(rows[3][1]).toEqual({ v: 1709000, m: '$1,709,000', ct: { fa: '"$"#,##0', t: 'n' } })
    expect(rows[3][2]).toBeNull()
    expect(rows[4]).toEqual([])
    expect(rows[5]).toEqual([{ v: 'Ultimate Claim Counts', bl: 1, tb: '1' }])
    expect(rows[7]).toEqual([2013, 220])
  })

  it('opens a blank sheet for a question with no table', () => {
    expect(questionWorkbook(['No tables here.']).sheets[0].rows).toEqual([])
  })

  it('reads the parts after the stem', () => {
    const md = questionMarkdown({ stem: 'Stem.', parts: [{ stem: '| x |\n|---|\n| 1 |' }] })
    expect(questionWorkbook(md).sheets[0].rows).toHaveLength(2)
  })
})

describe('formulas against the list', () => {
  const allowed = new Set(['SUM', 'IF', 'XLOOKUP', 'EXP'])

  it('names the functions a formula calls, once each, skipping text', () => {
    expect(formulaFunctions('=SUM(A1:A3)+sum(B1)*IF(C1="MAX(",1,EXP(2))')).toEqual(['SUM', 'IF', 'EXP'])
    expect(formulaFunctions('=_xlfn.FORECAST.LINEAR(4,B1:B3,A1:A3)')).toEqual(['FORECAST.LINEAR'])
    expect(formulaFunctions('=A1*(B2+C3)')).toEqual([])
  })

  it('flags only what is off the list, and only in a formula', () => {
    expect(offListFunctions('=LET(x,1,x)+SUM(A1)', allowed)).toEqual(['LET'])
    expect(offListFunctions('LET(x)', allowed)).toEqual([])
  })

  it('finds the cells that use such functions', () => {
    const book = { version: 1 as const, sheets: [{ name: 'Sheet1', rows: [[1, { v: 2, f: '=SUM(A1)' }], [null, { v: 3, f: '=FORECAST.LINEAR(1,A1:A2,B1:B2)' }]] }] }
    expect(offListCells(book, allowed)).toEqual([{ row: 1, column: 1, address: 'B2', functions: ['FORECAST.LINEAR'] }])
  })
})

describe('the Pearson VUE list', () => {
  const list = new Set(pearsonVue.functions)

  it('was read off the vendor’s file', () => {
    expect(pearsonVue.source.sha256).toMatch(/^[0-9a-f]{64}$/)
    expect(pearsonVue.source.url).toMatch(/^https:\/\/www\.pearsonvue\.com\//)
    expect(list.size).toBeGreaterThan(400)
  })

  it('has the everyday functions and lacks the ones it says it lacks', () => {
    for (const name of ['SUM', 'SUMPRODUCT', 'INDEX', 'MATCH', 'XLOOKUP', 'LINEST', 'EXP', 'LN']) expect(list.has(name)).toBe(true)
    for (const name of pearsonVue.notInPearsonButInExcel) expect(list.has(name)).toBe(false)
    expect(pearsonVue.notInPearsonButInExcel).toContain('FORECAST.LINEAR')
  })
})

describe('inserting a cell', () => {
  it('names cells as a spreadsheet does', () => {
    expect(cellAddress(0, 0)).toBe('A1')
    expect(cellAddress(2, 7)).toBe('H3')
    expect(cellAddress(9, 26)).toBe('AA10')
  })

  it('reads what a cell shows', () => {
    expect(shownValue({ v: 1709000, m: '$1,709,000' })).toBe('$1,709,000')
    expect(shownValue({ v: 0.6 })).toBe('0.6')
    expect(shownValue(88)).toBe('88')
    expect(shownValue(null)).toBe('')
    expect(shownValue({ v: true })).toBe('TRUE')
  })

  it('puts the value at the caret, spacing it off a word', () => {
    expect(insertAtCaret('Open = ', 7, 7, '88')).toEqual({ text: 'Open = 88', caret: 9 })
    expect(insertAtCaret('total', 5, 5, '88')).toEqual({ text: 'total 88', caret: 8 })
    expect(insertAtCaret('a X b', 2, 3, '88')).toEqual({ text: 'a 88 b', caret: 4 })
    expect(insertAtCaret('', 0, 0, '88')).toEqual({ text: '88', caret: 2 })
    expect(insertAtCaret('abc', 99, 99, '1')).toEqual({ text: 'abc 1', caret: 5 })
  })
})

describe('columnWidths', () => {
  it('fits each column to what it holds, captions aside', () => {
    const widths = columnWidths(questionWorkbook([STEM]))
    expect(widths[0]).toBeGreaterThanOrEqual(Math.round('Accident Year'.length * 7.5 + 18))
    expect(widths[1]).toBeGreaterThanOrEqual(73)
    expect(widths[3]).toBeUndefined()
  })

  it('still knows a caption once the editor has saved it', () => {
    const saved = { version: 1 as const, sheets: [{ name: 'Sheet1', rows: [[{ v: 'A very long caption over the table', bl: 1 }], ['AY', 'Ult'], [2013, 220]] }] }
    expect(columnWidths(saved)[0]).toBe(73)
  })
})

describe('where the pane sits', () => {
  const screen = { width: 1440, height: 900 }

  it('keeps the docked width usable on both sides', () => {
    expect(clampDockWidth(100, screen)).toBe(360)
    expect(clampDockWidth(2000, screen)).toBe(1020)
  })

  it('keeps the window on screen', () => {
    expect(clampWindowRect({ x: -50, y: 2000, width: 100, height: 100 }, screen)).toEqual({ x: 8, y: 632, width: 380, height: 260 })
    const first = defaultWindowRect(screen)
    expect(first.x + first.width).toBeLessThanOrEqual(screen.width)
    expect(first.y + first.height).toBeLessThanOrEqual(screen.height)
  })
})

// The bank is the fixture: every question on an exam sat with a spreadsheet
// lays its tables out without losing one.
describe('the CAS banks', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../questions')
  const banks = ['exam-5', 'exam-6c', 'exam-7', 'exam-8', 'exam-9', 'exam-mas-i', 'exam-mas-ii']

  it('turns every table into rows of the sheet', () => {
    let tables = 0
    for (const bank of banks) {
      for (const file of readdirSync(path.join(root, bank)).filter(f => f.endsWith('.md'))) {
        const q = parseQuestion(readFileSync(path.join(root, bank, file), 'utf-8'))
        if (!q) continue
        const md = questionMarkdown(q)
        const found = md.flatMap(markdownTables)
        const rows = questionWorkbook(md).sheets[0].rows
        const expected = found.reduce((n, t) => n + (t.caption ? 1 : 0) + 1 + t.rows.length, 0) + Math.max(0, found.length - 1)
        expect(rows.length, file).toBe(expected)
        tables += found.length
      }
    }
    expect(tables).toBeGreaterThan(500)
  })

  it('lays out the Berquist-Sherman question as it prints', () => {
    const q = parseQuestion(readFileSync(path.join(root, 'exam-5', 'cas5-2013f-021.md'), 'utf-8'))!
    const rows = questionWorkbook(questionMarkdown(q)).sheets[0].rows
    expect(rows[0]).toEqual([{ v: 'Cumulative Closed Claim Counts', bl: 1, tb: '1' }])
    expect(rows[2]).toEqual([2009, 250, 400, 450, 500])
    const paid = rows.findIndex(r => (r[0] as RichCell | null)?.v === 'Cumulative Paid Claims ($000)')
    expect(rows[paid + 2][4]).toEqual({ v: 5425, m: '$5,425', ct: { fa: '"$"#,##0', t: 'n' } })
  })
})

describe('partWantsSheet', () => {
  it('marks a part that asks for numbers', () => {
    expect(partWantsSheet('Construct an annual incremental accident year paid loss triangle as of December 31, 2012.')).toBe(true)
    expect(partWantsSheet('Calculate the indicated rate change.')).toBe(true)
    expect(partWantsSheet('Calculate the reserve and recommend a method.')).toBe(true)
  })

  it('leaves a part that asks for words', () => {
    expect(partWantsSheet('Assess whether an accident year approach or a report year approach is more appropriate for reserving auto liability insurance.')).toBe(false)
    expect(partWantsSheet('Briefly explain why the loss development pattern changed.')).toBe(false)
    expect(partWantsSheet('Briefly describe a situation in which the actuary would not revise the estimate of ultimate claims.')).toBe(false)
  })

  it('reads the preamble when the part has no command word of its own', () => {
    expect(partWantsSheet('Paid losses.', 'Calculate the following.')).toBe(true)
    expect(partWantsSheet('A very long-tailed line.', 'Explain which method is preferable for each.')).toBe(false)
    expect(partWantsSheet('', 'Using the data below, estimate the ultimate losses.')).toBe(true)
  })

  it('ignores the words in a table', () => {
    expect(partWantsSheet('Explain the trend.\n| Calculated | 1.05 |')).toBe(false)
  })
})
