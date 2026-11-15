// The **Data Sources catalogue** (`/data-sources`, `pages/DataSources`): one
// list of everything a model can take from a published document, in one row
// shape, under what the model needs it for.
//
// Three types of item:
//
//   value     one figure (or one run of them, a factor per accident year) from
//             the Assumptions Bank, with the page it was read from
//   table     a document the app reads as data: a published table a Data
//             Sources tool opens (`SourceResource.tool`), or one whose rows a
//             workflow takes (`SourceResource.table`)
//   document  everything else a publisher issued: text to read
//
// and seven **needs** — what a model wants an input for — which every value
// and table is filed under, and a document too when it gives a value.
//
// Nothing is authored here but the two small tables that say which need a
// kind of figure and a published table answer. The items are **derived** from
// the bank's sets and the source catalogue, so the page can't list a thing
// the app doesn't hold. Pure and tested (`dataCatalogue.test.ts`).

import { effectiveLabel, formatAssumptionValue, type AssumptionKind, type AssumptionRow, type AssumptionSet } from './assumptionBank'
import {
  entityById,
  formatPublished,
  resourceKindLabel,
  resourcePageName,
  type LibraryState,
  type SourceEntity,
  type SourceResource,
} from './coworkSources'

export type DataNeed = 'trend' | 'development' | 'expenses' | 'mortality' | 'rates' | 'capital' | 'results'

/** The needs, in the order the page offers them. */
export const DATA_NEEDS: { id: DataNeed; label: string }[] = [
  { id: 'trend', label: 'Trend and inflation' },
  { id: 'development', label: 'Loss development' },
  { id: 'expenses', label: 'Expenses and profit' },
  { id: 'mortality', label: 'Mortality' },
  { id: 'rates', label: 'Interest rates' },
  { id: 'capital', label: 'Capital' },
  { id: 'results', label: 'Company results' },
]

/** The need each kind of figure answers. A `fact` takes the need of the figures around it. */
export const NEED_BY_KIND: Record<Exclude<AssumptionKind, 'fact'>, DataNeed> = {
  trend: 'trend',
  'reform-factor': 'trend',
  'development-factor': 'development',
  'tail-factor': 'development',
  'loss-ratio': 'expenses',
  'fixed-expense': 'expenses',
  'variable-expense': 'expenses',
  'total-expense': 'expenses',
  'profit-provision': 'expenses',
  'ulae-factor': 'expenses',
  'cat-load': 'expenses',
  'discount-rate': 'rates',
  'capital-ratio': 'capital',
  'capital-factor': 'capital',
  'confidence-level': 'capital',
  'mortality-ratio': 'mortality',
}

/** The needs a published table answers, by the slug of the Data Sources tool that reads it. */
export const NEEDS_BY_TABLE_TOOL: Record<string, DataNeed[]> = {
  'price-index': ['trend'],
  'life-table': ['mortality'],
  'yield-curve': ['rates'],
  'insurer-return': ['results', 'capital'],
}

/** The needs a document's own table answers (`SourceResource.table`), by the document's id. */
export const NEEDS_BY_TABLE_DOCUMENT: Record<string, DataNeed[]> = {
  'fsra-ppa-loss-trend-benchmarks': ['trend'],
}

export type CatalogueType = 'value' | 'table' | 'document'

export const CATALOGUE_TYPES: { id: CatalogueType; label: string }[] = [
  { id: 'value', label: 'Values' },
  { id: 'table', label: 'Tables' },
  { id: 'document', label: 'Documents' },
]

export interface CatalogueItem {
  /** A bank row's id, `table:<resource id>` or `doc:<resource id>`. */
  id: string
  type: CatalogueType
  name: string
  needs: DataNeed[]
  /** The row's own word for its type: Value, Table, or the document's kind. */
  typeLabel: string
  /** The publisher, when the catalogue lists it. */
  entity: SourceEntity | null
  /** The publisher's short name, as the row prints it. */
  publisher: string
  region: string
  /** The year or edition the row prints after the region. */
  edition: string
  /** The row's right-hand column: a value's figure, or what stands in for one. */
  value: string
  /** Whether a model can take it as it stands: a figure that has been entered, or a table a tool reads. */
  ready: boolean
  /** The source catalogue's document behind the item, when it has one. */
  resource: SourceResource | null
  /** A value's set, and its row — or rows, for a run of them. */
  set: AssumptionSet | null
  rows: AssumptionRow[]
}

/** A label with a trailing year taken off: "ULAE factor, accident year 2021" → its stem and 2021. */
function yearStem(label: string): { stem: string; year: string } | null {
  const m = /^(.*\D)(\d{4})$/.exec(label)
  return m ? { stem: m[1]!.trimEnd(), year: m[2]! } : null
}

/**
 * A set's rows as the catalogue lists them: a run of rows that are one figure
 * per year — same kind, unit, basis and place in the document, labels alike
 * but for the year they end in — is one group, and every other row is its own.
 */
export function groupSetRows(rows: readonly AssumptionRow[]): AssumptionRow[][] {
  const groups: AssumptionRow[][] = []
  for (const row of rows) {
    const last = groups[groups.length - 1]
    const prev = last?.[last.length - 1]
    const a = prev ? yearStem(prev.label) : null
    const b = yearStem(row.label)
    const alike =
      prev && a && b && a.stem === b.stem && a.year !== b.year &&
      prev.kind === row.kind && prev.unit === row.unit && prev.basis === row.basis &&
      prev.locator === row.locator && (prev.raw === '') === (row.raw === '')
    if (alike) last!.push(row)
    else groups.push([row])
  }
  return groups
}

/** A group's name: the row's own, or the stem with the span of years ("… accident years 2021–2025"). */
export function groupName(rows: readonly AssumptionRow[]): string {
  const first = rows[0]!
  if (rows.length === 1) return first.label
  const a = yearStem(first.label)!
  const b = yearStem(rows[rows.length - 1]!.label)!
  const stem = /\byear$/.test(a.stem) ? `${a.stem}s` : a.stem
  return `${stem} ${a.year}–${b.year}`
}

function needOfRows(set: AssumptionSet): DataNeed | null {
  const tally = new Map<DataNeed, number>()
  for (const r of set.rows) {
    if (r.kind === 'fact') continue
    const need = NEED_BY_KIND[r.kind]
    tally.set(need, (tally.get(need) ?? 0) + 1)
  }
  return [...tally.entries()].sort((x, y) => y[1] - x[1])[0]?.[0] ?? null
}

function yearOf(iso: string | null): string {
  return iso ? /^\d{4}/.exec(iso)?.[0] ?? '' : ''
}

function tableNeeds(resource: SourceResource): DataNeed[] {
  if (resource.tool) return NEEDS_BY_TABLE_TOOL[resource.tool.slug] ?? []
  return NEEDS_BY_TABLE_DOCUMENT[resource.id] ?? []
}

/** Whether a document's own table has every figure entered. */
function tableEntered(resource: SourceResource): boolean {
  return Boolean(resource.table && resource.table.rows.every(r => r.slice(1).every(cell => cell !== '')))
}

/**
 * Every item, in the order the page lists them before grouping: the values,
 * newest set first, then each document in the source catalogue's order.
 * `toolName` names the Data Sources tool a table opens in.
 */
export function buildCatalogue(
  entities: SourceEntity[],
  resources: readonly SourceResource[],
  sets: readonly AssumptionSet[],
  toolName: (slug: string) => string | null = () => null,
): CatalogueItem[] {
  const current = [...sets.filter(s => !s.supersededBy)].sort(
    (a, b) => b.effective.localeCompare(a.effective) || a.title.localeCompare(b.title),
  )
  const resourceOfSet = (set: AssumptionSet) => resources.find(r => resourcePageName(r) === set.source) ?? null
  const needsOfResource = new Map<string, Set<DataNeed>>()

  const values: CatalogueItem[] = current.flatMap(set => {
    const resource = resourceOfSet(set)
    const entity = resource ? entityById(entities, resource.entityId) : null
    const fallback = needOfRows(set)
    return groupSetRows(set.rows).map(rows => {
      const first = rows[0]!
      const need = first.kind === 'fact' ? fallback : NEED_BY_KIND[first.kind]
      if (need && resource) {
        if (!needsOfResource.has(resource.id)) needsOfResource.set(resource.id, new Set())
        needsOfResource.get(resource.id)!.add(need)
      }
      const entered = first.raw !== ''
      return {
        id: first.id,
        type: 'value' as const,
        name: groupName(rows),
        needs: need ? [need] : [],
        typeLabel: 'Value',
        entity,
        publisher: entity?.short ?? (set.shortName || set.publisher),
        region: entity?.jurisdiction ?? set.jurisdiction,
        edition: yearOf(set.effective),
        value: !entered ? 'Not entered' : rows.length > 1 ? `${rows.length} values` : formatAssumptionValue(first),
        ready: entered,
        resource,
        set,
        rows,
      }
    })
  })

  const documents: CatalogueItem[] = resources.map(resource => {
    const entity = entityById(entities, resource.entityId)
    const isTable = Boolean(resource.tool || resource.table)
    const given = [...(needsOfResource.get(resource.id) ?? [])]
    const needs = isTable ? [...new Set([...tableNeeds(resource), ...given])] : given
    return {
      id: `${isTable ? 'table' : 'doc'}:${resource.id}`,
      type: isTable ? ('table' as const) : ('document' as const),
      name: resource.title,
      // The needs in the page's order, whatever order they were found in.
      needs: DATA_NEEDS.map(n => n.id).filter(n => needs.includes(n)),
      typeLabel: isTable ? 'Table' : resourceKindLabel(resource.kind),
      entity,
      publisher: entity?.short ?? '',
      region: entity?.jurisdiction ?? '',
      edition: yearOf(resource.published),
      value: resource.tool ? toolName(resource.tool.slug) ?? '' : resource.table && !tableEntered(resource) ? 'Not entered' : '',
      ready: resource.tool ? true : resource.table ? tableEntered(resource) : false,
      resource,
      set: null,
      rows: [],
    }
  })

  return [...values, ...documents]
}

export interface CatalogueFilters {
  need: DataNeed | null
  type: CatalogueType | null
  region: string | null
  /** A publisher's id. */
  publisher: string | null
  /** Only what a model can take as it stands. */
  ready: boolean
  /** One set of values, by its id — what a document's values link narrows to. */
  set: string | null
  /** Only the reader's library, when given. */
  library?: LibraryState
}

export const NO_FILTERS: CatalogueFilters = { need: null, type: null, region: null, publisher: null, ready: false, set: null }

function matches(item: CatalogueItem, f: CatalogueFilters, skip?: keyof CatalogueFilters): boolean {
  if (skip !== 'need' && f.need && !item.needs.includes(f.need)) return false
  if (skip !== 'type' && f.type && item.type !== f.type) return false
  if (skip !== 'region' && f.region && item.region !== f.region) return false
  if (skip !== 'publisher' && f.publisher && item.entity?.id !== f.publisher) return false
  if (f.ready && !item.ready) return false
  if (f.set && item.set?.id !== f.set) return false
  if (f.library) {
    const taken = item.resource ? f.library.resourceIds.includes(item.resource.id) : false
    const followed = item.entity ? f.library.entityIds.includes(item.entity.id) : false
    if (!taken && !followed) return false
  }
  return true
}

/** The items the filters keep. `skip` leaves one filter out — the pool its own options are counted over. */
export function filterCatalogue(items: readonly CatalogueItem[], filters: CatalogueFilters, skip?: keyof CatalogueFilters): CatalogueItem[] {
  return items.filter(item => matches(item, filters, skip))
}

export interface CountedOption {
  value: string
  label: string
  count: number
}

/** Each need with how many items choosing it would leave, the other filters applied. */
export function needOptions(items: readonly CatalogueItem[], filters: CatalogueFilters): CountedOption[] {
  const pool = filterCatalogue(items, filters, 'need')
  return DATA_NEEDS.map(n => ({ value: n.id, label: n.label, count: pool.filter(i => i.needs.includes(n.id)).length }))
}

export function typeOptions(items: readonly CatalogueItem[], filters: CatalogueFilters): CountedOption[] {
  const pool = filterCatalogue(items, filters, 'type')
  return CATALOGUE_TYPES.map(t => ({ value: t.id, label: t.label, count: pool.filter(i => i.type === t.id).length }))
}

/** The regions the catalogue has anything from, by name. */
export function regionOptions(items: readonly CatalogueItem[], filters: CatalogueFilters): CountedOption[] {
  const pool = filterCatalogue(items, filters, 'region')
  const regions = [...new Set(items.map(i => i.region).filter(Boolean))].sort((a, b) => a.localeCompare(b))
  return regions.map(r => ({ value: r, label: r, count: pool.filter(i => i.region === r).length }))
}

/** The publishers the catalogue has anything from, by name. */
export function publisherOptions(items: readonly CatalogueItem[], filters: CatalogueFilters): CountedOption[] {
  const pool = filterCatalogue(items, filters, 'publisher')
  const byId = new Map(items.flatMap(i => (i.entity ? [[i.entity.id, i.entity] as const] : [])))
  return [...byId.values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(e => ({ value: e.id, label: e.name, count: pool.filter(i => i.entity?.id === e.id).length }))
}

export interface CatalogueGroup {
  need: DataNeed | null
  label: string
  items: CatalogueItem[]
}

/** What can be used as it stands first, then what hasn't been entered, then the documents to read. */
function rank(item: CatalogueItem): number {
  return item.type === 'document' ? 2 : item.ready ? 0 : 1
}

/**
 * The list as the page draws it. With one need chosen it is that need's
 * items; with none, each item sits under the first need it answers, and the
 * documents that answer none close the list.
 */
export function groupCatalogue(items: readonly CatalogueItem[], need: DataNeed | null): CatalogueGroup[] {
  const sorted = (list: CatalogueItem[]) => [...list].sort((a, b) => rank(a) - rank(b))
  if (need) {
    const label = DATA_NEEDS.find(n => n.id === need)!.label
    return items.length ? [{ need, label, items: sorted([...items]) }] : []
  }
  const groups: CatalogueGroup[] = DATA_NEEDS.map(n => ({ need: n.id, label: n.label, items: sorted(items.filter(i => i.needs[0] === n.id)) }))
  const rest = items.filter(i => i.needs.length === 0)
  const others = [
    { need: null, label: 'Other values and tables', items: rest.filter(i => i.type !== 'document') },
    { need: null, label: 'Other documents', items: rest.filter(i => i.type === 'document') },
  ]
  return [...groups, ...others].filter(g => g.items.length > 0)
}

/** The line under a row's name: publisher, region, year. */
export function itemSubtitle(item: CatalogueItem): string {
  return [item.publisher, item.region, item.edition].filter(Boolean).join(' · ')
}

/** A document's sets of values, newest first. */
export function setsOfResource(resource: SourceResource, sets: readonly AssumptionSet[]): AssumptionSet[] {
  const page = resourcePageName(resource)
  return page
    ? sets.filter(s => s.source === page && !s.supersededBy).sort((a, b) => b.effective.localeCompare(a.effective))
    : []
}

/** When a value's set came into force and a document was published, as the detail's facts print them. */
export function itemDate(item: CatalogueItem): string {
  if (item.set) return effectiveLabel(item.set.effective)
  return item.resource?.published ? formatPublished(item.resource.published) : ''
}

/** The words for a value's basis (`BASES` in `assumptionBank.ts`). */
const BASIS_LABEL: Record<string, string> = {
  cap: 'A cap',
  selected: 'Selected',
  benchmark: 'A benchmark',
  observed: 'Observed',
  minimum: 'A minimum',
  target: 'A target',
}

/** The line over an item's name: its type, and what kind of value or document it is. */
export function detailKicker(item: CatalogueItem): string {
  if (item.type === 'value') {
    const basis = BASIS_LABEL[item.rows[0]?.basis ?? '']
    return ['Value', basis, item.ready ? '' : 'Not entered from the document yet'].filter(Boolean).join(' · ')
  }
  if (item.type === 'table') return item.ready ? 'Table' : 'Table · Not entered from the document yet'
  return ['Document', item.resource ? resourceKindLabel(item.resource.kind) : ''].filter(Boolean).join(' · ')
}

/** The figure an item leads with: one entered value's. A run of values, a fact in words and a table lead with their name. */
export function detailValue(item: CatalogueItem): string | null {
  const row = item.rows[0]
  return item.type === 'value' && item.ready && item.rows.length === 1 && row!.kind !== 'fact' ? formatAssumptionValue(row!) : null
}

// ── The address ───────────────────────────────────────────────────────────

const isNeed = (v: string | null): v is DataNeed => DATA_NEEDS.some(n => n.id === v)
const isType = (v: string | null): v is CatalogueType => CATALOGUE_TYPES.some(t => t.id === v)

/** The filters a `/data-sources` address carries. The publisher of a publisher's own page is passed in. */
export function readCatalogueFilters(params: URLSearchParams, publisher: string | null = null): CatalogueFilters {
  const need = params.get('need')
  const type = params.get('type')
  return {
    need: isNeed(need) ? need : null,
    type: isType(type) ? type : null,
    region: params.get('region') || null,
    publisher: publisher ?? (params.get('publisher') || null),
    ready: params.get('ready') === '1',
    set: params.get('set') || null,
  }
}

/** The address's query with one filter changed, every other key kept. A null or false value drops the key. */
export function withCatalogueParam(params: URLSearchParams, key: string, value: string | boolean | null): URLSearchParams {
  const next = new URLSearchParams(params)
  if (value === null || value === false || value === '') next.delete(key)
  else next.set(key, value === true ? '1' : value)
  return next
}
