/**
 * OSFI's insurer filings, as the engine sees them (docs/osfi-tools-design.md,
 * design C): what each federally regulated P&C insurer filed on PC4 page 10.00,
 * the Minimum Capital Test's summary, every IFRS 17 quarter.
 *
 * The file is `data/filings/osfi-pc4-summary.json`, written by
 * `scripts/osfi_extract.py export-summary` from OSFI's open-data API and never
 * edited by hand. It is too big to ride in the engine (the connector's engine
 * is a committed bundle), so it is **installed**, the way the Assumptions Bank
 * is (`bank.ts`): the app fetches it when a tool that reads it opens
 * (`lib/toolFilings.ts`), and the connector loads it from its own deployment.
 * Nothing installed, and a tool that needs it answers with an input error that
 * says so.
 *
 * A **filed cell** is a source an input can take, as a published figure is:
 * a number field that names the addresses it takes (`filed` on the field) may
 * be given `{ "filed": "osfi-pc:2026Q2:27906:P100005001" }` instead of a
 * number. `normalizeInput` reads the value in, and the run records where it
 * came from: the judgment's `filed`, a working step quoting OSFI's label, and
 * the reference with its period's hash in the input hash.
 *
 * The rules are the plan's (docs/osfi-pc-data.md §2): as filed, labelled only
 * by OSFI, the licence's attribution with every figure, no correction, and no
 * total row. Only non-zero cells are published, so a line an insurer filed
 * nothing on reads as zero.
 *
 * Imports are relative only — the engine is bundled outside the app's alias.
 */

import type { DatasetBase } from './data/datasets'

export interface FilingLine {
  address: string
  page: string
  line: string
  column: string
  en: string
  fr: string
}

export interface FilingPeriod {
  period: string
  resource_last_modified: string | null
  read_at: string
  /** The sha256 of the whole PC4 return that quarter: the manifest's, in `.osfi/pc/<period>/`. */
  pc4_sha256: string
  /** The sha256 of this quarter's slice, as `osfi_extract.summary_hash` computes it. */
  sha256: string
  /** Institution id → one value per line, in `lines` order; null where nothing was published. */
  values: Record<string, (number | null)[]>
}

export interface FilingsFile {
  id: string
  title: string
  publisher: string
  return: string
  return_title: string
  page: string
  portal: string
  vault_page: string
  units: string
  licence: { name: string; url: string; attribution: string }
  note: string
  lines: FilingLine[]
  institutions: Record<string, { en: string; fr: string; group: string; group_fr: string }>
  periods: FilingPeriod[]
}

/** The dataset's name in a reference: `osfi-pc:<period>:<institution>:<address>`. */
export const FILINGS_DATASET = 'osfi-pc'

/** The page 10.00 lines the tools read (OSFI's line numbers, column 01). */
export const MCT_LINES = {
  capital: 'P100001001', // 10 Total capital available
  netAssets: 'P100002501', // 25 Total net assets available (a branch)
  insurance: 'P100005001', // 50 Insurance risk margin
  market: 'P100008001', // 80 Market risk margin
  credit: 'P100010001', // 100 Credit risk margin
  operational: 'P100010501', // 105 Operational risk margin
  diversification: 'P100011001', // 110 Less: diversification credit
  target: 'P100011501', // 115 Total capital required at target
  minimum: 'P100013001', // 130 Total minimum capital required
  ratio: 'P100014001', // 140 Ratio (line 10 or line 25 as a % of line 130)
} as const

/** The line that is a ratio, in %; every other line is in $000. */
export const isRatioLine = (address: string) => address === MCT_LINES.ratio

let installed: FilingsFile | null = null
let lineAt = new Map<string, number>()

/** Install the filings (the app does when a tool that reads them opens; the connector from its deployment). */
export function installFilings(file: FilingsFile | null): void {
  installed = file
  lineAt = new Map((file?.lines ?? []).map((l, k) => [l.address, k]))
}

export function filingsInstalled(): FilingsFile | null {
  return installed
}

/** The error a tool gives when the filings aren't loaded where it runs. */
export const NOT_LOADED = "OSFI's filings aren't loaded here. Open the tool in the app, or try again in a moment."

/** `2026Q2` → `Q2 2026`. */
export function periodLabel(period: string): string {
  const m = /^(\d{4})Q([1-4])$/.exec(period)
  return m ? `Q${m[2]} ${m[1]}` : period
}

/** Every quarter on file, newest first. */
export function filingPeriods(): string[] {
  return (installed?.periods ?? []).map(p => p.period).sort().reverse()
}

export function filingPeriod(period: string): FilingPeriod | undefined {
  return installed?.periods.find(p => p.period === period)
}

export function filingLine(address: string): FilingLine | undefined {
  const k = lineAt.get(address)
  return k === undefined ? undefined : installed!.lines[k]
}

export function institutionName(id: string): string | undefined {
  return installed?.institutions[id]?.en
}

/** Whether an insurer is a foreign company's Canadian branch, tested on the BAAT rather than the MCT. */
export function isBranch(id: string): boolean {
  return installed?.institutions[id]?.group.startsWith('Foreign') ?? false
}

/** Every insurer that filed in a quarter, by name. */
export function filersIn(period: string): string[] {
  const p = filingPeriod(period)
  if (!p) return []
  return Object.keys(p.values).sort((a, b) => (institutionName(a) ?? a).localeCompare(institutionName(b) ?? b))
}

/** One filed value: null when the insurer didn't file that quarter, 0 for a line it filed nothing on. */
export function filedValue(period: string, institution: string, address: string): number | null {
  const row = filingPeriod(period)?.values[institution]
  const k = lineAt.get(address)
  if (!row || k === undefined) return null
  return row[k] ?? 0
}

/** A filed cell's reference, as an input gives it. */
export const filedRefOf = (period: string, institution: string, address: string) =>
  `${FILINGS_DATASET}:${period}:${institution}:${address}`

/** A field's input that names a filed cell rather than giving a number. */
export function filedRef(raw: unknown): string | null {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const ref = (raw as Record<string, unknown>).filed
    if (typeof ref === 'string' && ref.trim()) return ref.trim()
  }
  return null
}

/** Where a filed value came from — on its judgment, and in the working. */
export interface FiledSource {
  filed: string
  dataset: string
  publisher: string
  institution: string
  name: string
  period: string
  return: string
  page: string
  line: string
  address: string
  label: string
  label_fr: string
  units: string
  /** The quarter's slice hash: a refiling changes it, and so the run's input hash. */
  sha256: string
  /** Published as zero: OSFI publishes only non-zero cells. */
  blank: boolean
  attribution: string
}

export interface FiledCell {
  value: number
  source: FiledSource
}

/** Read a reference, or say exactly what's wrong with it. Throws `Error` with a message for the field's error. */
export function filedCell(ref: string): FiledCell {
  if (!installed) throw new Error(NOT_LOADED)
  const m = /^([a-z-]+):(\d{4}Q[1-4]):(\d+):(P\d{9})$/.exec(ref)
  if (!m || m[1] !== FILINGS_DATASET) {
    throw new Error(`"${ref}" isn't a filed cell: write it "${FILINGS_DATASET}:<quarter>:<OSFI id>:<address>", e.g. "${filedRefOf('2026Q2', '27906', MCT_LINES.insurance)}".`)
  }
  const [, , period, institution, address] = m
  const p = filingPeriod(period)
  if (!p) throw new Error(`OSFI's filings here run ${filingPeriods().at(-1)} to ${filingPeriods()[0]}; ${period} isn't one of them.`)
  const line = filingLine(address)
  if (!line) throw new Error(`${address} isn't a line of PC4 page ${installed.page}, the page loaded here.`)
  const row = p.values[institution]
  if (!row) throw new Error(`OSFI has no PC4 filing from institution ${institution} for ${periodLabel(period)}.`)
  const raw = row[lineAt.get(address)!]
  return {
    value: raw ?? 0,
    source: {
      filed: ref,
      dataset: FILINGS_DATASET,
      publisher: installed.publisher,
      institution,
      name: institutionName(institution) ?? institution,
      period,
      return: installed.return,
      page: line.page,
      line: line.line,
      address,
      label: line.en,
      label_fr: line.fr,
      units: isRatioLine(address) ? '%' : '$000',
      sha256: p.sha256,
      blank: raw == null,
      attribution: installed.licence.attribution,
    },
  }
}

/** A filed cell in a run's words: "Intact Insurance Company, Q2 2026, PC4 page 10.00 line 50". */
export const filedPlace = (s: Pick<FiledSource, 'name' | 'period' | 'return' | 'page' | 'line'>) =>
  `${s.name}, ${periodLabel(s.period)}, ${s.return} page ${s.page} line ${s.line}`

/** The installed filings as a dataset, for the card's menu (what it reads, when, under which licence). */
export function filingsDataset(): (DatasetBase & { kind: 'filings' }) | null {
  if (!installed) return null
  const periods = installed.periods.map(p => p.period).sort()
  return {
    kind: 'filings',
    id: installed.id,
    title: `${installed.title}: ${installed.return_title}, page ${installed.page}`,
    publisher: installed.publisher,
    edition: `${periodLabel(periods[0])} to ${periodLabel(periods[periods.length - 1])}`,
    report: installed.portal,
    licence: { name: installed.licence.name, url: installed.licence.url },
    page: installed.vault_page,
    sources: installed.periods.map(p => ({
      url: installed!.portal,
      sha256: p.pc4_sha256.replace(/^sha256:/, ''),
      read: p.read_at.slice(0, 10),
      title: `${installed!.return}, ${periodLabel(p.period)}`,
    })),
  }
}
