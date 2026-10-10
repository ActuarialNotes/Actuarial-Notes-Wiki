/**
 * The Data Sources' tables (docs/actuarial-tools.md §4.11): published tables,
 * each read mechanically off its publisher's own file by
 * `scripts/dataset_extract.py` into `datasets/<id>.json`, with the URL, sha256
 * and date read of every file and the publisher's licence. Never edited by
 * hand — re-run the script, and the diff is the new edition.
 *
 * They ride with the engine because a tool computes synchronously and the
 * connector runs the same engine; the engine only loads in the Tools page's
 * lazy chunk, and the tables are small (month-end curves, monthly indexes
 * since 2000, single-age life tables).
 */

import nchsLife from './datasets/nchs-us-life-tables.json'
import statcanLife from './datasets/statcan-life-table.json'
import blsIndexes from './datasets/bls-price-indexes.json'
import statcanCpi from './datasets/statcan-cpi.json'
import treasury from './datasets/us-treasury-par-yields.json'

export interface SourceFile {
  url: string
  sha256: string
  read: string
  title: string
}

interface DatasetBase {
  id: string
  title: string
  publisher: string
  edition: string
  report: string
  licence: { name: string; url: string }
  /** The dataset's own page in the vault (R5). */
  page: string
  sources: SourceFile[]
}

export interface LifeTableDataset extends DatasetBase {
  kind: 'life_table'
  ages: number[]
  last_age_open: boolean
  sexes: Record<string, string>
  series: Record<string, { qx: number[]; lx: number[]; ex: number[] }>
}

export interface IndexSeries {
  id: string
  title: string
  frequency: 'monthly' | 'quarterly'
  /** "2000-01" for a monthly series, "2000-Q1" for a quarterly one. */
  start: string
  /** One value per period from `start`; null where the publisher printed none. */
  values: (number | null)[]
}

export interface IndexDataset extends DatasetBase {
  kind: 'index_series'
  series: IndexSeries[]
}

export interface YieldCurveDataset extends DatasetBase {
  kind: 'yield_curve'
  basis: string
  terms: number[]
  term_labels: string[]
  curves: { date: string; yields: (number | null)[] }[]
}

export const LIFE_TABLES = [nchsLife, statcanLife] as LifeTableDataset[]
export const INDEX_DATASETS = [blsIndexes, statcanCpi] as IndexDataset[]
export const YIELD_CURVES = [treasury] as YieldCurveDataset[]

export type Dataset = LifeTableDataset | IndexDataset | YieldCurveDataset
export const DATASETS: Dataset[] = [...LIFE_TABLES, ...INDEX_DATASETS, ...YIELD_CURVES]

/** The period label of the k-th value of a series: "2024-03" or "2024-Q1". */
export function periodAt(series: IndexSeries, k: number): string {
  if (series.frequency === 'quarterly') {
    const [y, q] = series.start.split('-Q').map(Number)
    const n = (y * 4 + (q - 1)) + k
    return `${Math.floor(n / 4)}-Q${(n % 4) + 1}`
  }
  const [y, m] = series.start.split('-').map(Number)
  const n = y * 12 + (m - 1) + k
  return `${Math.floor(n / 12)}-${String((n % 12) + 1).padStart(2, '0')}`
}

/** A period's position in years (the middle of its month or quarter), for an annualised change. */
export function periodYears(period: string): number {
  const q = /^(\d{4})-Q(\d)$/.exec(period)
  if (q) return Number(q[1]) + (Number(q[2]) - 0.5) / 4
  const [y, m] = period.split('-').map(Number)
  return y + (m - 0.5) / 12
}

/** A series' key in a choice field: "dataset:series". */
export const seriesKey = (ds: IndexDataset, s: IndexSeries) => `${ds.id}:${s.id}`

export function findSeries(key: string): { dataset: IndexDataset; series: IndexSeries } | null {
  const [dsId, ...rest] = key.split(':')
  const dataset = INDEX_DATASETS.find(d => d.id === dsId)
  const series = dataset?.series.find(s => s.id === rest.join(':'))
  return dataset && series ? { dataset, series } : null
}

/** The line every result from a dataset carries: what was read, from whom, when, under which licence. */
export function provenance(ds: DatasetBase): string {
  const read = ds.sources.map(s => s.read).sort().pop()
  return `${ds.title}, ${ds.publisher} (edition ${ds.edition}, read ${read}; ${ds.licence.name}).`
}

/** The datasets a Data Source tool reads, for the card's menu and the connector's description. */
export function datasetsFor(toolId: string): Dataset[] {
  switch (toolId) {
    case 'data.life_table': return LIFE_TABLES
    case 'data.price_index': return INDEX_DATASETS
    case 'data.yield_curve': return YIELD_CURVES
    default: return []
  }
}
