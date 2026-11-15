import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ASSUMPTION_KINDS, parseAssumptionSet, type AssumptionSet } from './assumptionBank'
import {
  DATA_NEEDS,
  NEEDS_BY_TABLE_DOCUMENT,
  NEEDS_BY_TABLE_TOOL,
  NEED_BY_KIND,
  NO_FILTERS,
  buildCatalogue,
  detailKicker,
  detailValue,
  filterCatalogue,
  groupCatalogue,
  groupName,
  groupSetRows,
  needOptions,
  publisherOptions,
  readCatalogueFilters,
  typeOptions,
  withCatalogueParam,
} from './dataCatalogue'
import { TOOLS, toolBySlug, toolSlug } from './tools'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'

const dir = join(__dirname, '../../../Assumptions')
const SETS: AssumptionSet[] = readdirSync(dir)
  .filter(f => f.endsWith('.md'))
  .map(f => parseAssumptionSet(`Assumptions/${f}`, readFileSync(join(dir, f), 'utf8')))

const ITEMS = buildCatalogue(COWORK_ENTITIES, COWORK_RESOURCES, SETS, slug => toolBySlug(slug)?.name ?? null)
const byName = (name: string) => ITEMS.find(i => i.name === name)!

describe('the needs', () => {
  it('files every kind of figure under a need the page offers', () => {
    const needs = DATA_NEEDS.map(n => n.id)
    for (const kind of Object.keys(ASSUMPTION_KINDS)) {
      if (kind === 'fact') continue
      expect(needs, kind).toContain(NEED_BY_KIND[kind as keyof typeof NEED_BY_KIND])
    }
  })

  it('files every published table and every document with a table under a need', () => {
    expect(Object.keys(NEEDS_BY_TABLE_TOOL).sort()).toEqual(TOOLS.filter(t => t.area === 'data').map(toolSlug).sort())
    const withTable = COWORK_RESOURCES.filter(r => r.table && !r.tool).map(r => r.id)
    expect(Object.keys(NEEDS_BY_TABLE_DOCUMENT).sort()).toEqual(withTable.sort())
    for (const item of ITEMS.filter(i => i.type === 'table')) expect(item.needs.length, item.name).toBeGreaterThan(0)
  })

  it('files every value under a need', () => {
    for (const item of ITEMS.filter(i => i.type === 'value')) expect(item.needs.length, item.name).toBe(1)
  })
})

describe('buildCatalogue', () => {
  it('lists every document once, as a table or a document, and every bank row once', () => {
    const docs = ITEMS.filter(i => i.type !== 'value')
    expect(docs.map(i => i.resource!.id)).toEqual(COWORK_RESOURCES.map(r => r.id))
    const rows = ITEMS.filter(i => i.type === 'value').flatMap(i => i.rows.map(r => r.id))
    expect(rows.sort()).toEqual(SETS.flatMap(s => s.rows.map(r => r.id)).sort())
    expect(new Set(ITEMS.map(i => i.id)).size).toBe(ITEMS.length)
  })

  it('ties every value to its document and publisher in the source catalogue', () => {
    for (const item of ITEMS.filter(i => i.type === 'value')) {
      expect(item.resource, item.name).not.toBeNull()
      expect(item.entity, item.name).not.toBeNull()
    }
  })

  it('reads a value off the bank, and says when one hasn’t been entered', () => {
    const profit = byName('Profit provision (pre-tax, maximum)')
    expect(profit).toMatchObject({ type: 'value', value: '6.0%', ready: true, needs: ['expenses'], publisher: 'AIRB', region: 'Alberta', edition: '2026' })
    const trends = byName('Loss cost trends, by coverage')
    expect(trends).toMatchObject({ value: 'Not entered', ready: false, needs: ['trend'] })
  })

  it('folds a figure per accident year into one row', () => {
    const ulae = byName('ULAE factor, accident years 2021–2025')
    expect(ulae.rows.map(r => r.raw)).toEqual(['1.1356', '1.1172', '1.1172', '1.1198', '1.1189'])
    expect(ulae.value).toBe('5 values')
  })

  it('makes a document a tool reads a table that is ready, and one with blank figures a table that is not', () => {
    const life = ITEMS.find(i => i.id === 'table:' + COWORK_RESOURCES.find(r => r.tool?.input?.table === 'nchs-us-life-tables')!.id)!
    expect(life).toMatchObject({ type: 'table', ready: true, value: 'Life Table', needs: ['mortality'] })
    const fsra = ITEMS.find(i => i.id === 'table:fsra-ppa-loss-trend-benchmarks')!
    expect(fsra).toMatchObject({ type: 'table', ready: false, value: 'Not entered', needs: ['trend'] })
  })

  it('files a document under the needs its values answer, and no other', () => {
    const mct = ITEMS.find(i => i.type === 'document' && i.resource && SETS.some(s => s.title.startsWith('MCT') && i.name && s.source === (i.resource!.wikiRef?.name ?? '')))
    expect(mct?.needs).toEqual(['capital'])
    expect(ITEMS.some(i => i.type === 'document' && i.needs.length === 0)).toBe(true)
  })
})

describe('an open item', () => {
  it('leads with one entered value, and says what kind it is', () => {
    const profit = byName('Profit provision (pre-tax, maximum)')
    expect(detailValue(profit)).toBe('6.0%')
    expect(detailKicker(profit)).toBe('Value · A cap')
    const trends = byName('Loss cost trends, by coverage')
    expect(detailValue(trends)).toBeNull()
    expect(detailKicker(trends)).toBe('Value · Selected · Not entered from the document yet')
    expect(detailValue(byName('ULAE factor, accident years 2021–2025'))).toBeNull()
    // A fact is the document's words, not a figure to lead with.
    expect(detailValue(byName('Capital test'))).toBeNull()
    expect(detailKicker(ITEMS.find(i => i.id === 'table:fsra-ppa-loss-trend-benchmarks')!)).toBe('Table · Not entered from the document yet')
  })
})

describe('groupSetRows', () => {
  const row = (label: string, extra = {}) => ({ id: label, label, kind: 'ulae-factor', unit: 'factor', raw: '1', number: 1, decimal: 1, locator: 'p. 1', basis: 'observed', meaning: '', fits: '', ...extra }) as never
  it('keeps rows that differ in anything but the year apart', () => {
    expect(groupSetRows([row('A 2021'), row('A 2022'), row('B 2023')]).map(g => g.length)).toEqual([2, 1])
    expect(groupSetRows([row('A 2021'), row('A 2022', { locator: 'p. 2' })]).map(g => g.length)).toEqual([1, 1])
    expect(groupSetRows([row('Minimum ratio'), row('Target ratio')]).map(g => g.length)).toEqual([1, 1])
  })
  it('names a run by its span', () => {
    expect(groupName([row('Factor, accident year 2021'), row('Factor, accident year 2022')])).toBe('Factor, accident years 2021–2022')
    expect(groupName([row('Alone')])).toBe('Alone')
  })
})

describe('filters', () => {
  it('counts each need and type over the other filters', () => {
    const all = needOptions(ITEMS, NO_FILTERS)
    expect(all.find(n => n.value === 'mortality')!.count).toBe(2)
    const tables = needOptions(ITEMS, { ...NO_FILTERS, type: 'table' })
    expect(tables.find(n => n.value === 'expenses')!.count).toBe(0)
    const types = typeOptions(ITEMS, { ...NO_FILTERS, need: 'mortality' })
    expect(types.map(t => t.count)).toEqual([0, 2, 0])
  })

  it('keeps only what a model can take as it stands when asked', () => {
    const ready = filterCatalogue(ITEMS, { ...NO_FILTERS, ready: true })
    expect(ready.every(i => i.ready && i.type !== 'document')).toBe(true)
    expect(ready.some(i => i.name === 'Loss development factors')).toBe(false)
  })

  it('narrows to a publisher, a set and the reader’s library', () => {
    const airb = filterCatalogue(ITEMS, { ...NO_FILTERS, publisher: 'airb' })
    expect(airb.length).toBeGreaterThan(0)
    expect(airb.every(i => i.entity?.id === 'airb')).toBe(true)
    const set = SETS.find(s => s.title.startsWith('MCT'))!
    expect(filterCatalogue(ITEMS, { ...NO_FILTERS, set: set.id }).every(i => i.set?.id === set.id)).toBe(true)
    expect(filterCatalogue(ITEMS, { ...NO_FILTERS, library: { entityIds: [], resourceIds: [] } })).toEqual([])
    const mine = filterCatalogue(ITEMS, { ...NO_FILTERS, library: { entityIds: [], resourceIds: ['fsra-ppa-loss-trend-benchmarks'] } })
    expect(mine.map(i => i.id)).toEqual(['table:fsra-ppa-loss-trend-benchmarks'])
  })

  it('offers every publisher the catalogue has anything from', () => {
    expect(publisherOptions(ITEMS, NO_FILTERS).every(p => p.count > 0)).toBe(true)
  })
})

describe('groupCatalogue', () => {
  it('lists each item once, under its first need, usable ones first and documents last', () => {
    const groups = groupCatalogue(ITEMS, null)
    expect(groups.flatMap(g => g.items).length).toBe(ITEMS.length)
    const expenses = groups.find(g => g.need === 'expenses')!.items
    const rank = (i: (typeof ITEMS)[number]) => (i.type === 'document' ? 2 : i.ready ? 0 : 1)
    expect(expenses.map(rank)).toEqual([...expenses.map(rank)].sort())
    expect(groups[groups.length - 1]!.label).toBe('Other documents')
  })

  it('is one group when a need is chosen', () => {
    const shown = filterCatalogue(ITEMS, { ...NO_FILTERS, need: 'capital' })
    expect(groupCatalogue(shown, 'capital').map(g => g.label)).toEqual(['Capital'])
  })
})

describe('the address', () => {
  it('reads the filters it carries and ignores what it doesn’t know', () => {
    const f = readCatalogueFilters(new URLSearchParams('need=trend&type=table&region=Ontario&ready=1&set=x'))
    expect(f).toEqual({ need: 'trend', type: 'table', region: 'Ontario', publisher: null, ready: true, set: 'x' })
    expect(readCatalogueFilters(new URLSearchParams('need=nope&type=figure'))).toEqual(NO_FILTERS)
    expect(readCatalogueFilters(new URLSearchParams(''), 'osfi').publisher).toBe('osfi')
  })

  it('changes one key and keeps the rest', () => {
    const p = new URLSearchParams('need=trend&item=a')
    expect(withCatalogueParam(p, 'ready', true).toString()).toBe('need=trend&item=a&ready=1')
    expect(withCatalogueParam(p, 'need', null).toString()).toBe('item=a')
  })
})
