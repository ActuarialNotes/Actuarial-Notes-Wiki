import { describe, expect, it } from 'vitest'
import { csvNumber, parseCsv, toCsv } from './csv'

describe('toCsv', () => {
  it('quotes fields that need it and leaves blanks for null', () => {
    const text = toCsv(['a', 'b', 'c'], [['x, y', null, 1.5], ['say "hi"', 'line\nbreak', 2]])
    expect(text).toBe('a,b,c\n"x, y",,1.5\n"say ""hi""","line\nbreak",2\n')
  })

  it('never writes floating-point noise', () => {
    expect(toCsv(['v'], [[0.1 + 0.2]])).toBe('v\n0.3\n')
  })
})

describe('parseCsv', () => {
  it('round-trips what toCsv writes', () => {
    const rows = [['x, y', '', '1.5'], ['say "hi"', 'line\nbreak', '2']]
    const parsed = parseCsv(toCsv(['a', 'b', 'c'], rows))
    expect(parsed.columns).toEqual(['a', 'b', 'c'])
    expect(parsed.rows).toEqual(rows)
  })

  it('accepts CRLF rows, a byte-order mark and no trailing newline', () => {
    expect(parseCsv('﻿a,b\r\n1,2\r\n3,4')).toEqual({ columns: ['a', 'b'], rows: [['1', '2'], ['3', '4']] })
  })
})

describe('csvNumber', () => {
  it('reads numbers and treats blanks and NA spellings as missing', () => {
    expect(csvNumber('3.25')).toBe(3.25)
    expect(csvNumber(' 7 ')).toBe(7)
    expect(csvNumber('')).toBeNull()
    expect(csvNumber('NA')).toBeNull()
    expect(csvNumber('abc')).toBeNull()
  })
})
