// The Assumptions Bank — published figures and facts as data (docs/assumptions-bank.md).
//
// A set is one vault file, `Assumptions/<name>.md`: one table, or one group of
// figures under one heading, of one published document, each row with where in
// the document it is printed. `scripts/assumption_lint.py` holds the files to
// the shape this module parses (and `--against` holds each figure to the
// document's own text); VERIFY fact checks them like any page.
//
// Two halves:
//   - `parseAssumptionSet` runs at build time (`virtual:assumption-bank` in
//     `vite.config.ts`) and turns a file into a plain record.
//   - The lookups run in the app: the sets a resource page supplies (what
//     Cowork shows on a document) and the live figures of one kind on a date
//     (what a tool field will be offered, Phase 1).
//
// Nothing is computed onto a figure: `number` is the value as the document
// prints it; `decimal` only moves a percentage's point, so a tool that takes
// 0.278 for 27.8% never has to know the unit.
//
// Imports are relative — `vite.config.ts` pulls this into its own Node graph.

import fm from 'front-matter'
import { verificationFromAttributes, type Verification } from './verification'

/** The closed vocabulary (`scripts/assumption_vocab.json`, held equal by the test). */
export const ASSUMPTION_KINDS = {
  trend: ['%'],
  'loss-ratio': ['%'],
  'expense-ratio': ['%'],
  'fixed-expense': ['%', 'CAD', 'USD'],
  'variable-expense': ['%'],
  'profit-provision': ['%'],
  'development-factor': ['factor'],
  'ulae-factor': ['factor'],
  'tail-factor': ['factor'],
  'reform-factor': ['factor'],
  'discount-rate': ['%'],
  'capital-ratio': ['%'],
  'capital-factor': ['factor', '%'],
  'confidence-level': ['%'],
  'mortality-ratio': ['%'],
  'cat-load': ['CAD', 'USD', '%'],
  fact: [''],
} as const satisfies Record<string, readonly string[]>

export type AssumptionKind = keyof typeof ASSUMPTION_KINDS
export type AssumptionUnit = '%' | 'factor' | 'CAD' | 'USD' | ''

export interface AssumptionRow {
  /** `<set id>#<row slug>`: how a run, a brief or an agent names this figure. */
  id: string
  label: string
  kind: AssumptionKind
  unit: AssumptionUnit
  /** The cell as written; `''` where the figure has not been read off the document. */
  raw: string
  /** A figure as the document prints it (27.8 for 27.8%); null for a fact or a blank. */
  number: number | null
  /** A figure as a tool takes it (0.278 for 27.8%, 1.094 for a factor); null for a fact or a blank. */
  decimal: number | null
  /** Where in the document it is printed. */
  locator: string
}

export interface AssumptionSet {
  /** The file's name without `.md` — its address. */
  id: string
  path: string
  title: string
  /** The resource page of the document it is read from (the `Source` link's target). */
  source: string
  publisher: string
  edition: string
  /** The date the figures apply from (YYYY-MM-DD). */
  effective: string
  /** The set that replaces this one, when a newer edition has been added. */
  supersededBy: string | null
  jurisdiction: string
  practice: string | null
  extraction: 'transcribed' | 'extracted'
  /** The copy that was read. */
  document: string
  sourceSha256: string
  read: string
  licence: string | null
  /** The lead paragraph(s). */
  lead: string
  rows: AssumptionRow[]
  verification: Verification | null
}

const LINK = /^\[\[([^\]|#]+)\]\]$/
const NUMBER = /^-?\d+(\.\d+)?$/
const HEADER = ['Assumption', 'Kind', 'Value', 'Unit', 'Locator']

function slug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function cells(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim())
}

function str(attrs: Record<string, unknown>, key: string): string {
  const v = attrs[key]
  return v == null ? '' : String(v)
}

function linkTarget(value: string): string {
  return LINK.exec(value.trim())?.[1].trim() ?? ''
}

export function isAssumptionKind(kind: string): kind is AssumptionKind {
  return Object.prototype.hasOwnProperty.call(ASSUMPTION_KINDS, kind)
}

/**
 * A set file as a record. Throws on a file the lint would fail on the points
 * the readers depend on (no table, a wrong header, an unknown kind, a figure
 * that isn't a number), so a bad file fails the build rather than serving a
 * figure wrongly.
 */
export function parseAssumptionSet(path: string, text: string): AssumptionSet {
  const { attributes, body } = fm<Record<string, unknown>>(text)
  const id = path.replace(/^.*\//, '').replace(/\.md$/i, '')
  const lines = body.split('\n')
  const headerAt = lines.findIndex(l => l.trim().startsWith('|'))
  if (headerAt < 0) throw new Error(`${path}: no table`)
  if (cells(lines[headerAt]).join('|') !== HEADER.join('|')) throw new Error(`${path}: table header must be | ${HEADER.join(' | ')} |`)

  const rows: AssumptionRow[] = []
  const used = new Set<string>()
  for (let i = headerAt + 2; i < lines.length && lines[i].trim().startsWith('|'); i++) {
    const [label, kind, raw, unit, locator] = cells(lines[i])
    if (!isAssumptionKind(kind)) throw new Error(`${path}: row "${label}" has unknown kind "${kind}"`)
    const figure = kind !== 'fact' && raw !== ''
    if (figure && !NUMBER.test(raw)) throw new Error(`${path}: row "${label}" value "${raw}" is not a plain number`)
    const number = figure ? Number(raw) : null
    let rowSlug = slug(label)
    for (let n = 2; used.has(rowSlug); n++) rowSlug = `${slug(label)}-${n}`
    used.add(rowSlug)
    rows.push({
      id: `${id}#${rowSlug}`,
      label,
      kind,
      unit: unit as AssumptionUnit,
      raw,
      number,
      decimal: number == null ? null : unit === '%' ? Math.round(number * 1e10) / 1e12 : number,
      locator,
    })
  }

  const lead = lines
    .slice(0, headerAt)
    .filter(l => l.trim() && !l.startsWith('#'))
    .join('\n')
    .trim()

  return {
    id,
    path,
    title: str(attributes, 'Title'),
    source: linkTarget(str(attributes, 'Source')),
    publisher: str(attributes, 'Publisher'),
    edition: str(attributes, 'Edition'),
    effective: str(attributes, 'Effective'),
    supersededBy: linkTarget(str(attributes, 'Superseded by')) || null,
    jurisdiction: str(attributes, 'Jurisdiction'),
    practice: str(attributes, 'Practice') || null,
    extraction: str(attributes, 'Extraction') === 'extracted' ? 'extracted' : 'transcribed',
    document: str(attributes, 'Document'),
    sourceSha256: str(attributes, 'Source sha256'),
    read: str(attributes, 'Read'),
    licence: str(attributes, 'Licence') || null,
    lead,
    rows,
    verification: verificationFromAttributes(attributes),
  }
}

/** A row's value as a person reads it: `27.8%`, `1.094`, `CAD 466`, the fact's words, or `''`. */
export function formatAssumptionValue(row: Pick<AssumptionRow, 'raw' | 'unit' | 'kind'>): string {
  if (!row.raw) return ''
  if (row.kind === 'fact' || row.unit === 'factor' || row.unit === '') return row.raw
  if (row.unit === '%') return `${row.raw}%`
  return `${row.unit} ${row.raw}`
}

/** The sets read from one resource page, by its name (the `Source` link's target), newest first. */
export function setsForResource(sets: readonly AssumptionSet[], resourceName: string): AssumptionSet[] {
  return sets.filter(s => s.source === resourceName).sort((a, b) => b.effective.localeCompare(a.effective))
}

/** Whether a set is in force on a date: effective by then, and not replaced by a set that is. */
export function inForce(set: AssumptionSet, asOf: string, sets: readonly AssumptionSet[]): boolean {
  if (set.effective > asOf) return false
  if (!set.supersededBy) return true
  const next = sets.find(s => s.id === set.supersededBy)
  return !next || next.effective > asOf
}

export interface AssumptionMatch {
  set: AssumptionSet
  row: AssumptionRow
}

/**
 * The figures of the given kinds in force on a date — what a tool's field is
 * offered. Blank rows and facts are left out (there is nothing to fill a field
 * with); a jurisdiction narrows to that place and the country it is in.
 */
export function figuresOfKind(
  sets: readonly AssumptionSet[],
  kinds: readonly AssumptionKind[],
  { asOf, jurisdiction }: { asOf: string; jurisdiction?: string },
): AssumptionMatch[] {
  const places = jurisdiction ? new Set([jurisdiction, jurisdiction.split('-')[0]]) : null
  return sets
    .filter(s => inForce(s, asOf, sets) && (!places || places.has(s.jurisdiction)))
    .flatMap(set => set.rows.filter(r => r.decimal != null && kinds.includes(r.kind)).map(row => ({ set, row })))
}

/** A row by its id (`<set>#<row>`), or null. */
export function assumptionById(sets: readonly AssumptionSet[], id: string): AssumptionMatch | null {
  const set = sets.find(s => s.id === id.split('#')[0])
  const row = set?.rows.find(r => r.id === id)
  return set && row ? { set, row } : null
}
