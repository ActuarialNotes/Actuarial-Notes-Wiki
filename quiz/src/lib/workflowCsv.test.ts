import { describe, expect, it } from 'vitest'
import { toolById } from './tools'
import {
  CSV_LIMITS,
  columnKind,
  csvInput,
  csvText,
  guessMapping,
  mappedFields,
  parseCsv,
  parseCsvTable,
  parseMapping,
  readCsvFile,
  triangleShaped,
  type CsvTable,
} from './workflowCsv'

const table = (text: string, name = 'data.csv'): CsvTable => {
  const read = parseCsv(text, name)
  if (!read.ok) throw new Error(read.error)
  return read.table
}

describe('reading a CSV', () => {
  it('reads a header and rows, quoted cells and all', () => {
    const t = table('Year,"Premium, written",Note\n2021,"1,200","said ""hi""\nthere"\n2022,1300,\n')
    expect(t.columns).toEqual(['Year', 'Premium, written', 'Note'])
    expect(t.rows).toEqual([['2021', '1,200', 'said "hi"\nthere'], ['2022', '1300', '']])
  })

  it('takes a semicolon or a tab between cells, CRLF lines, and drops a byte-order mark and blank rows', () => {
    expect(table('﻿a;b\r\n1;2\r\n\r\n3;4').rows).toEqual([['1', '2'], ['3', '4']])
    expect(table('a\tb\n1\t2').columns).toEqual(['a', 'b'])
  })

  it('pads a short row and names a blank header', () => {
    const t = table('a,\n1,2,3')
    expect(t.columns).toEqual(['a', 'Column 2', 'Column 3'])
    expect(t.rows[0]).toEqual(['1', '2', '3'])
  })

  it('says why a file can’t be read rather than cutting it', () => {
    expect(parseCsv('just a header')).toMatchObject({ ok: false })
    const big = 'a\n' + Array.from({ length: CSV_LIMITS.rows + 1 }, (_, i) => i).join('\n')
    expect(parseCsv(big)).toMatchObject({ ok: false, error: expect.stringMatching(/rows/) })
  })

  it('reads a chosen file', async () => {
    expect(await readCsvFile({ name: 'x.csv', text: async () => 'a\n1' })).toMatchObject({ ok: true, table: { name: 'x.csv' } })
    expect(await readCsvFile({ name: 'x.csv', text: async () => { throw new Error('gone') } })).toMatchObject({ ok: false })
  })
})

describe('what a column holds', () => {
  const t = table('Date,Quarter,Year,Value,Name\n2023-01-01,2023Q1,2021,1.5%,a\n2023-04-01,2023Q2,2022,"1,200",b')
  it('tells dates and periods from values and text', () => {
    expect([0, 1, 2, 3, 4].map(j => columnKind(t, j))).toEqual(['date', 'date', 'date', 'number', 'text'])
  })
})

describe('connecting a CSV to a tool', () => {
  const trendFit = toolById('ratemaking.trend_fit')!
  const points = table('Quarter,Index\n2022Q1,100\n2022Q2,101.5\n2022Q3,103\n2022Q4,104.2')

  it('guesses a table’s columns by kind when no header names them', () => {
    expect(guessMapping(points, trendFit)).toEqual({ points: { kind: 'columns', columns: { period: 0, value: 1 } } })
  })

  it('guesses by name first', () => {
    const named = table('Value,Period\n100,2022Q1\n101,2022Q2')
    expect(guessMapping(named, trendFit)).toEqual({ points: { kind: 'columns', columns: { period: 1, value: 0 } } })
  })

  it('carries every row of the mapped columns, as the file has them', () => {
    const carried = csvInput(points, trendFit, guessMapping(points, trendFit))
    expect(carried.points).toEqual([
      { period: '2022Q1', value: '100' },
      { period: '2022Q2', value: '101.5' },
      { period: '2022Q3', value: '103' },
      { period: '2022Q4', value: '104.2' },
    ])
    expect(mappedFields(trendFit, points, guessMapping(points, trendFit))).toEqual(['points'])
  })

  it('carries one cell into a number or a date — first, last or the n-th row — and never guesses one', () => {
    const annuity = toolById('finance.present_value')!
    const rates = table('Date,Rate\n2023-01-01,4%\n2024-01-01,5%')
    expect(guessMapping(rates, annuity).i).toBeUndefined()
    expect(csvInput(rates, annuity, { i: { kind: 'cell', column: 1, row: -1 } })).toEqual({ i: '5%' })
    expect(csvInput(rates, annuity, { i: { kind: 'cell', column: 1, row: 0 } })).toEqual({ i: '4%' })
    const index = toolById('data.price_index')!
    expect(csvInput(rates, index, { start: { kind: 'cell', column: 0, row: 0 } })).toEqual({ start: '2023-01-01' })
  })

  it('reads a triangle-shaped file as a triangle', () => {
    const tri = table('AY,12,24,36\n2021,100,150,160\n2022,110,170,\n2023,120,,')
    expect(triangleShaped(tri)).toBe(true)
    const ata = toolById('reserving.age_to_age_factors')!
    expect(guessMapping(tri, ata)).toEqual({ triangle: { kind: 'triangle' } })
    expect(csvInput(tri, ata, { triangle: { kind: 'triangle' } }).triangle).toEqual({
      origins: ['2021', '2022', '2023'],
      ages: [12, 24, 36],
      values: [['100', '150', '160'], ['110', '170', null], ['120', null, null]],
    })
    expect(triangleShaped(points)).toBe(false)
  })

  it('skips a mapping to a column the file no longer has', () => {
    expect(csvInput(points, trendFit, { points: { kind: 'columns', columns: { period: 7 } } })).toEqual({})
  })
})

describe('reading a stored CSV and mapping back', () => {
  it('round-trips, and drops what it can’t read', () => {
    const t = table('a,b\n1,2')
    expect(parseCsvTable(JSON.parse(JSON.stringify(t)))).toEqual(t)
    expect(parseCsvTable({ columns: 'a' })).toBeNull()
    const map = { points: { kind: 'columns', columns: { period: 0, value: 'x' } }, i: { kind: 'cell', column: 1, row: -1 }, t: { kind: 'triangle' }, bad: { kind: 'wish' } }
    expect(parseMapping(map)).toEqual({ points: { kind: 'columns', columns: { period: 0 } }, i: { kind: 'cell', column: 1, row: -1 }, t: { kind: 'triangle' } })
    expect(parseMapping({})).toBeUndefined()
  })

  it('writes the file back out as text for the brief, the whole of a small one', () => {
    expect(csvText(table('a,b\n"x, y",2'))).toBe('a,b\n"x, y",2')
    expect(csvText(table('a\n1\n2\n3'), 2)).toBe('a\n1\n2\n… 1 more rows')
  })
})
