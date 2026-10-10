import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DATASETS, INDEX_DATASETS, LIFE_TABLES, YIELD_CURVES, periodAt, periodYears, findSeries, seriesKey } from './datasets'

const VAULT = resolve(__dirname, '../../../../..')

// The rules a dataset is held to (docs/actuarial-tools.md §4.11): every file it
// was read from named with its sha256 and date, a licence that allows reuse,
// and a page in the vault.
describe('datasets', () => {
  it.each(DATASETS.map(d => [d.id, d] as const))('%s names its sources, licence and page', (_id, ds) => {
    expect(ds.sources.length).toBeGreaterThan(0)
    for (const s of ds.sources) {
      expect(s.url).toMatch(/^https:\/\//)
      expect(s.sha256).toMatch(/^[0-9a-f]{64}$/)
      expect(s.read).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
    expect(['Public domain (a work of the US federal government)', 'Statistics Canada Open Licence']).toContain(ds.licence.name)
    const page = resolve(VAULT, ds.page)
    expect(existsSync(page), ds.page).toBe(true)
    expect(readFileSync(page, 'utf8')).toContain('## Sources')
  })

  it('holds each life table to whole ages with probabilities and a closing age', () => {
    for (const t of LIFE_TABLES) {
      for (const col of Object.values(t.series)) {
        expect(col.qx).toHaveLength(t.ages.length)
        expect(col.qx.every(q => q > 0 && q <= 1)).toBe(true)
        expect(col.qx[col.qx.length - 1]).toBe(1)
        expect(col.lx[0]).toBe(100000)
        // lx falls with age.
        expect(col.lx.every((l, k) => k === 0 || l <= col.lx[k - 1])).toBe(true)
      }
    }
  })

  it('keeps a missing month as a gap', () => {
    const all = findSeries('bls-price-indexes:CUUR0000SA0')!
    const k = all.series.values.findIndex(v => v === null)
    expect(periodAt(all.series, k)).toBe('2025-10')
  })

  it('reads periods and their place in years', () => {
    const s = INDEX_DATASETS[0].series[0]
    expect(periodAt(s, 0)).toBe('2000-01')
    expect(periodAt(s, 13)).toBe('2001-02')
    expect(periodAt({ ...s, frequency: 'quarterly', start: '2001-Q4' }, 2)).toBe('2002-Q2')
    expect(periodYears('2024-01')).toBeCloseTo(2024 + 0.5 / 12)
    expect(periodYears('2024-Q1')).toBeCloseTo(2024.125)
    expect(findSeries(seriesKey(INDEX_DATASETS[1], INDEX_DATASETS[1].series[0]))?.series.id).toBe('All-items')
  })

  it('keeps one curve a month, rates as decimals', () => {
    const c = YIELD_CURVES[0]
    const months = c.curves.map(x => x.date.slice(0, 7))
    expect(new Set(months).size).toBe(months.length)
    expect(c.curves.every(x => x.yields.every(y => y === null || (y > -0.01 && y < 0.2)))).toBe(true)
  })
})
