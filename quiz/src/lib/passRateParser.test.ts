import { describe, it, expect } from 'vitest'
// The parser lives with the serverless function that runs it (there is one
// implementation, not a mirrored copy) — this suite is what keeps it honest,
// since the function itself can only be exercised against the live sources.
import {
  extractPassRateRecords,
  parseHtmlTables,
  parsePercent,
  parseCount,
  parseSittingLabel,
} from '../../../api/lib/passRates.js'

describe('parseSittingLabel', () => {
  it('reads the seasonal sittings CAS publishes', () => {
    expect(parseSittingLabel('Spring 2019')).toEqual({ year: 2019, session: 'Spring' })
    expect(parseSittingLabel('2013 Fall')).toEqual({ year: 2013, session: 'Fall' })
    expect(parseSittingLabel('fall 2018')).toEqual({ year: 2018, session: 'Fall' })
  })

  it('reads the monthly windows the SOA publishes', () => {
    expect(parseSittingLabel('Mar-2026')).toEqual({ year: 2026, month: 3 })
    expect(parseSittingLabel('November 2025')).toEqual({ year: 2025, month: 11 })
    expect(parseSittingLabel('2026-03')).toEqual({ year: 2026, month: 3 })
  })

  it('falls back to the bare year, and rejects a row with no year at all', () => {
    expect(parseSittingLabel('2019')).toEqual({ year: 2019 })
    expect(parseSittingLabel('Total')).toBeNull()
    expect(parseSittingLabel('')).toBeNull()
  })
})

describe('parsePercent', () => {
  it('reads the published forms', () => {
    expect(parsePercent('46.2%')).toBe(46.2)
    expect(parsePercent(' 51 ')).toBe(51)
    expect(parsePercent('0.462')).toBe(46.2)
  })

  it('rejects anything that isn\'t a percentage', () => {
    expect(parsePercent('n/a')).toBeUndefined()
    expect(parsePercent('')).toBeUndefined()
    expect(parsePercent('146%')).toBeUndefined()
  })
})

describe('parseCount', () => {
  it('reads thousands separators and rejects non-counts', () => {
    expect(parseCount('1,163')).toBe(1163)
    expect(parseCount('978')).toBe(978)
    expect(parseCount('—')).toBeUndefined()
  })
})

describe('parseHtmlTables', () => {
  it('returns each table as rows of cell text, tags and entities stripped', () => {
    const tables = parseHtmlTables(`
      <table><tr><th>Date</th><th>Pass&nbsp;Rate</th></tr>
      <tr><td><a href="#">Spring 2019</a></td><td>46.2%</td></tr></table>
    `)
    expect(tables).toEqual([[['Date', 'Pass Rate'], ['Spring 2019', '46.2%']]])
  })
})

describe('extractPassRateRecords', () => {
  it('reads a CAS-shaped table with both raw and effective ratios', () => {
    const html = `
      <table>
        <tr><th>Sitting</th><th>Exams Taken</th><th>Pass Ratio</th><th>Effective Pass Ratio</th></tr>
        <tr><td>Spring 2019</td><td>1,234</td><td>42.0%</td><td>46.2%</td></tr>
        <tr><td>Fall 2018</td><td>1,010</td><td>40.5%</td><td>44.1%</td></tr>
      </table>
    `
    expect(extractPassRateRecords(html)).toEqual([
      { year: 2019, session: 'Spring', candidates: 1234, passRate: 42, effectivePassRate: 46.2 },
      { year: 2018, session: 'Fall', candidates: 1010, passRate: 40.5, effectivePassRate: 44.1 },
    ])
  })

  it('reads an SOA-shaped table that has a raw pass rate only', () => {
    const html = `
      <table>
        <tr><th>DATE</th><th>NUMBER PASSED</th><th>PASS RATE</th></tr>
        <tr><td>Mar-2026</td><td>978</td><td>46.2%</td></tr>
        <tr><td>Jan-2026</td><td>1163</td><td>49.2%</td></tr>
      </table>
    `
    expect(extractPassRateRecords(html)).toEqual([
      { year: 2026, month: 3, passed: 978, passRate: 46.2 },
      { year: 2026, month: 1, passed: 1163, passRate: 49.2 },
    ])
  })

  it('never mistakes the effective column for the raw one', () => {
    const html = `
      <table>
        <tr><th>Date</th><th>Effective Pass Rate</th></tr>
        <tr><td>Spring 2019</td><td>46.2%</td></tr>
      </table>
    `
    expect(extractPassRateRecords(html)).toEqual([
      { year: 2019, session: 'Spring', effectivePassRate: 46.2 },
    ])
  })

  it('derives the pass rate when the source gives only the two counts', () => {
    const csv = 'Sitting,Number Sat,Number Passed\nSpring 2019,1000,462\n'
    expect(extractPassRateRecords(csv, 'csv')).toEqual([
      { year: 2019, session: 'Spring', candidates: 1000, passed: 462, passRate: 46.2 },
    ])
  })

  it('picks the statistics table out of a page full of layout tables', () => {
    const html = `
      <table><tr><td>Site navigation</td></tr></table>
      <table>
        <tr><th>Date</th><th>Pass Rate</th></tr>
        <tr><td>Spring 2019</td><td>46.2%</td></tr>
        <tr><td>Fall 2018</td><td>44.1%</td></tr>
      </table>
    `
    expect(extractPassRateRecords(html)).toHaveLength(2)
  })

  it('skips rows with no sitting and rows with no figures — a totals row is not a sitting', () => {
    const html = `
      <table>
        <tr><th>Date</th><th>Pass Rate</th></tr>
        <tr><td>Spring 2019</td><td>46.2%</td></tr>
        <tr><td>All sittings</td><td>44.0%</td></tr>
        <tr><td>Fall 2018</td><td>n/a</td></tr>
      </table>
    `
    expect(extractPassRateRecords(html)).toEqual([
      { year: 2019, session: 'Spring', passRate: 46.2 },
    ])
  })

  it('reads a JSON feed with the same headings', () => {
    const json = JSON.stringify([
      { date: 'Spring 2019', 'pass rate': '42%', 'effective pass ratio': '46.2%' },
    ])
    expect(extractPassRateRecords(json, 'json')).toEqual([
      { year: 2019, session: 'Spring', passRate: 42, effectivePassRate: 46.2 },
    ])
  })

  it('returns nothing for a layout it does not understand, rather than guessing', () => {
    expect(extractPassRateRecords('<p>No tables here</p>')).toEqual([])
    expect(extractPassRateRecords('<table><tr><td>Spring 2019</td></tr></table>')).toEqual([])
    expect(extractPassRateRecords('not json at all', 'json')).toEqual([])
  })
})
