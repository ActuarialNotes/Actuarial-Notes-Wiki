import { describe, expect, it } from 'vitest'
import { fromCsv, fromFortune, parseSheetFile, sheetToCsv, toFortune, toXlsxSheets, type FortuneSheet } from './sheetFile'

describe('sheet files', () => {
  it('opens a CSV with typed cells and a bold header, keeping ids as text', () => {
    const { file, truncated } = fromCsv('policy_id,exposure,state\n0200002,1,IL\n0200005,0.5,\n', 'policies')
    expect(truncated).toBe(0)
    expect(file.sheets[0].rows).toEqual([
      [{ v: 'policy_id', bl: 1 }, { v: 'exposure', bl: 1 }, { v: 'state', bl: 1 }],
      ['0200002', 1, 'IL'],
      ['0200005', 0.5, null],
    ])
  })

  it('stores plain values as values and keeps formulas and formats', () => {
    const sheet: FortuneSheet = {
      name: 'Sheet1',
      data: [
        [{ v: 2, m: '2', ct: { fa: 'General', t: 'n' } }, { v: 3, m: '3', ct: { fa: 'General', t: 'n' } }, { v: 5, m: '5', f: '=A1+B1', ct: { fa: 'General', t: 'n' } }],
        [{ v: 0.25, m: '25%', ct: { fa: '0%', t: 'n' } }, null, null],
        [null, null, null],
      ],
    }
    const file = fromFortune([sheet])
    expect(file.sheets[0].rows).toEqual([[2, 3, { v: 5, f: '=A1+B1' }], [{ v: 0.25, ct: { fa: '0%', t: 'n' }, m: '25%' }]])
  })

  it('round-trips through the editor\'s shape', () => {
    const { file } = fromCsv('a,b\n1,x\n2,y\n', 'data')
    const reopened = fromFortune(toFortune(file))
    expect(reopened).toEqual(file)
  })

  it('exports computed values as CSV and xlsx rows', () => {
    const file = fromFortune([{ name: 'S', data: [[{ v: 'x' }, { v: 'y' }], [{ v: 1 }, { v: 2, f: '=A2+1' }]] }])
    expect(sheetToCsv(file.sheets[0])).toBe('x,y\n1,2\n')
    expect(toXlsxSheets(file)[0].rows).toEqual([['x', 'y'], [1, 2]])
  })

  it('opens an unreadable file as an empty workbook', () => {
    expect(parseSheetFile('not json').sheets).toHaveLength(1)
  })
})
