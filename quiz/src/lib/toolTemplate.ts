// The tool template's rules, as data (docs/actuarial-tools.md §19): which tools
// are drawn by it, where a slider lives, how inputs are grouped, where each
// value came from, how a grid numbers its columns, and the keypad the edit
// sheet types with. Pure; `components/tools/ToolTemplate.tsx` draws it.

import { TOOLS, formatValue, runTool, toolById, type ChoiceField, type DateField, type NumberField, type TableColumn, type ToolField, type ToolHandoff, type ToolInput, type ToolResult, type ToolSpec } from './tools'

/**
 * The tile a template tool leads its answer card with, where it isn't the
 * first: Expense Ratios answers with the total, F + V, and prints F and V
 * beside it (the engine's tile order is public API, so it stays).
 */
export const LEAD_TILE: Readonly<Record<string, string>> = {
  'ratemaking.expense_ratios': 'F + V',
}

/** The run's tiles in the order the answer card draws them: the lead first. */
export function tilesInOrder<T extends { symbol: string }>(toolId: string, tiles: readonly T[]): T[] {
  const lead = LEAD_TILE[toolId]
  const k = lead ? tiles.findIndex(t => t.symbol === lead) : -1
  return k <= 0 ? [...tiles] : [tiles[k], ...tiles.slice(0, k), ...tiles.slice(k + 1)]
}

/** A tool with this many scalar inputs or fewer keeps a slider on each row; past it, a row opens the edit sheet. */
export const INLINE_SLIDER_LIMIT = 3

export type ScalarField = NumberField | ChoiceField | DateField

export const isScalar = (f: ToolField): f is ScalarField => f.kind === 'number' || f.kind === 'choice' || f.kind === 'date'

/**
 * The scalar inputs on screen, in the order the formula takes them (the
 * spec's). Past `INLINE_SLIDER_LIMIT` inputs the reader's **judgments** (R3:
 * the choices a run must report as made or left at their default) lead in a
 * group of their own; at or under it they stay in the formula's order, marked
 * ◆ (docs/tool-template-v2.md §3.2).
 */
export function inputGroups(fields: readonly ScalarField[]): { judgments: ScalarField[]; inputs: ScalarField[] } {
  if (fields.length <= INLINE_SLIDER_LIMIT) return { judgments: [], inputs: [...fields] }
  return {
    judgments: fields.filter(f => f.judgment),
    inputs: fields.filter(f => !f.judgment),
  }
}

/** A number as an input shows it: an amount without the cents it doesn't have, a year without a separator. */
export function fieldText(value: number, f: Pick<NumberField, 'unit' | 'integer' | 'min'>): string {
  if (f.unit === 'money') return value.toLocaleString('en-US', { maximumFractionDigits: 2 })
  if (f.integer && f.min >= 1000) return String(value)
  return formatValue(value, f.unit)
}

/** Whether a tool's number rows carry their own slider (the count is of the inputs on screen). */
export const slidersInline = (scalars: readonly ScalarField[]) => scalars.length <= INLINE_SLIDER_LIMIT

/**
 * Where a value came from — the **source tag** every input carries. Colour
 * belongs to the exam, so a tag is told by its mark and its words.
 */
export type ValueSource =
  | { kind: 'default' }
  | { kind: 'yours' }
  | { kind: 'published'; label: string; checked: boolean; figure?: string }
  | { kind: 'linked'; label: string; tool?: string }

/**
 * A value taken from another tool, remembered with the value it brought: the
 * tag says "linked" for as long as the input still holds that value, and
 * "yours" once the reader changes it — no bookkeeping on every edit.
 */
export interface Origin {
  label: string
  value: string
  /** The tool it came from, when it is one: what "Open" opens. */
  tool?: string
}

export const originOf = (label: string, value: unknown, tool?: string): Origin =>
  tool ? { label, value: JSON.stringify(value), tool } : { label, value: JSON.stringify(value) }
export const originHolds = (origin: Origin | undefined, value: unknown): origin is Origin =>
  !!origin && origin.value === JSON.stringify(value)

/** A scalar input's source, most specific first. */
export function scalarSource({
  touched,
  published,
  origin,
  value,
  linkedBy,
}: {
  /** The draft holds a value of its own for the field. */
  touched: boolean
  /** The published figure it is, when it is one. */
  published?: { label: string; checked: boolean; figure?: string } | null
  origin?: Origin
  value: unknown
  /** Filled by a workflow's link. */
  linkedBy?: string | null
}): ValueSource {
  if (published) return { kind: 'published', ...published }
  if (linkedBy) return { kind: 'linked', label: linkedBy }
  if (originHolds(origin, value)) return origin.tool ? { kind: 'linked', label: origin.label, tool: origin.tool } : { kind: 'linked', label: origin.label }
  return touched ? { kind: 'yours' } : { kind: 'default' }
}

/**
 * A grid column's source. A column is the example's while every cell still
 * matches the example's — a reader who typed one triangle cell hasn't made
 * the CDF column theirs.
 */
export function columnSource(
  rows: readonly Record<string, unknown>[] | undefined,
  defaults: readonly Record<string, unknown>[],
  key: string,
  origin?: Origin,
): ValueSource {
  const column = (rs: readonly Record<string, unknown>[]) => rs.map(r => r[key])
  if (!rows) return { kind: 'default' }
  if (originHolds(origin, column(rows))) return { kind: 'linked', label: origin.label }
  const same = rows.length === defaults.length && rows.every((r, i) => Number(r[key]) === Number(defaults[i][key]) || String(r[key] ?? '') === String(defaults[i][key] ?? ''))
  return same ? { kind: 'default' } : { kind: 'yours' }
}

/**
 * Whether a row says where its value came from with a chip of its own: a
 * judgment always does, and any input not at its default (§3.4). The rest of
 * a group shares one "All ● Default" line.
 */
export const ownChip = (judgment: boolean | undefined, source: ValueSource) => !!judgment || source.kind !== 'default'

/** The shared line's word: "All" when every row of the group is at its default, else "The rest". */
export function sharedDefaultLabel(rows: readonly { judgment?: boolean; source: ValueSource }[]): string | null {
  const shared = rows.filter(r => !ownChip(r.judgment, r.source)).length
  if (!shared) return null
  return shared === rows.length ? 'All' : 'The rest'
}

/** A column's values, as the origin a fill records. */
export const columnValues = (rows: readonly Record<string, unknown>[], key: string) => rows.map(r => r[key])

/**
 * A grid's column numbers, the way a published exhibit numbers them: every
 * column but the first (the origin, which names the row) in the order drawn —
 * the inputs, then the computed columns.
 */
export function columnNumbers(inputs: readonly TableColumn[], computed: readonly TableColumn[]): Map<string, number> {
  const out = new Map<string, number>()
  ;[...inputs.slice(1), ...computed].forEach((c, i) => out.set(c.key, i + 1))
  return out
}

/** A computed column's formula, `{key}` references written as the exhibit's column numbers. */
export function formulaText(formula: string, numbers: ReadonlyMap<string, number>): string {
  return formula.replace(/\{(\w+)\}/g, (whole, key: string) => {
    const n = numbers.get(key)
    return n === undefined ? whole : `(${n})`
  })
}

/** The reading a method is taught from, short: "Friedland, Ch. 9". */
export function readingLabel(readings: readonly { resource: string; locator?: string }[]): string | null {
  const first = readings[0]
  if (!first) return null
  const author = first.resource.match(/\(([^()–-]+?)\s*[-–]\s*\d{4}\)\s*$/)?.[1]?.trim()
  const name = author ?? first.resource.replace(/\s*\([^)]*\)\s*$/, '')
  return first.locator ? `${name}, ${first.locator}` : name
}

// ---------------------------------------------------------------------------
// Takes from / Gives to (docs/tool-template-v2.md §3.3): a tool's neighbours,
// read off every tool's hand-offs (`spec.next`) in both directions.

export interface Neighbour {
  /** The tool on the other side. */
  tool: ToolSpec
  /** The hand-off between the two: the sender's `next` entry. */
  handoff: ToolHandoff
}

let senders: Map<string, Neighbour[]> | null = null

/** The reverse index: for each tool, the tools whose `next` names it. Built once from the registry. */
export function buildSenders(tools: readonly ToolSpec[]): Map<string, Neighbour[]> {
  const out = new Map<string, Neighbour[]>()
  for (const tool of tools) {
    for (const handoff of tool.next ?? []) {
      if (!toolById(handoff.tool)) continue
      const list = out.get(handoff.tool) ?? []
      list.push({ tool, handoff })
      out.set(handoff.tool, list)
    }
  }
  return out
}

/** The tools in front of this one: every tool whose `next` names it. */
export function takesFrom(toolId: string): Neighbour[] {
  senders ??= buildSenders(TOOLS)
  return senders.get(toolId) ?? []
}

/** The tools after this one: its own `next`, each target a real tool. */
export function givesTo(spec: ToolSpec): Neighbour[] {
  return (spec.next ?? []).flatMap(handoff => {
    const tool = toolById(handoff.tool)
    return tool ? [{ tool, handoff }] : []
  })
}

/** One value a hand-off carries: the field it fills on the arriving tool, and the value. */
export interface Carried {
  field: ToolField
  value: unknown
}

/** What a hand-off would carry from a result, field by field, in the arriving tool's order. */
export function carried(target: ToolSpec, built: Partial<ToolInput>): Carried[] {
  return target.fields.flatMap(field => (field.key in built && built[field.key] !== undefined ? [{ field, value: built[field.key] }] : []))
}

/**
 * The value a sender's hand-off would put in one of this tool's fields, from
 * a run of the sender — its last this session, or null when it hasn't run.
 * A hand-off that doesn't fill the field gives undefined.
 */
export function handoffValue(neighbour: Neighbour, key: string, input: ToolInput | undefined): number | null | undefined {
  if (!fills(neighbour, key)) return undefined
  if (!input) return null
  try {
    const result: ToolResult = runTool(neighbour.tool, input)
    const v = neighbour.handoff.build(result.input, result)[key]
    return typeof v === 'number' && Number.isFinite(v) ? v : null
  } catch {
    return null
  }
}

const FILLS = new Map<string, Set<string>>()

/** Whether a hand-off fills a field at all: read once from the sender's example run. */
export function fills(neighbour: Neighbour, key: string): boolean {
  const id = `${neighbour.tool.id}>${neighbour.handoff.tool}`
  if (!FILLS.has(id)) {
    let keys: string[] = []
    try {
      const r = runTool(neighbour.tool, {})
      keys = Object.keys(neighbour.handoff.build(r.input, r))
    } catch {
      keys = []
    }
    FILLS.set(id, new Set(keys))
  }
  return FILLS.get(id)!.has(key)
}

/** The query a run's URL carries to name the tool that sent it, so its values arrive linked. */
export const FROM_PARAM = 'from'

/** The path that opens a hand-off's run on the arriving tool, naming the sender. */
export function handoffPath(runPath: string, senderSlug: string): string {
  const hash = runPath.indexOf('#')
  const path = hash < 0 ? runPath : runPath.slice(0, hash)
  const rest = hash < 0 ? '' : runPath.slice(hash)
  return `${path}?${FROM_PARAM}=${encodeURIComponent(senderSlug)}${rest}`
}

/**
 * The origins a run arriving from another tool records: each value it
 * carried, as linked to the sender, for as long as the field still holds it.
 */
export function arrivalOrigins(spec: ToolSpec, sender: ToolSpec | undefined, input: unknown): Record<string, Origin> {
  if (!sender || !input || typeof input !== 'object') return {}
  const out: Record<string, Origin> = {}
  for (const f of spec.fields) {
    const v = (input as Record<string, unknown>)[f.key]
    if (v !== undefined) out[f.key] = originOf(sender.name, v, sender.id)
  }
  return out
}

// ---------------------------------------------------------------------------
// A published figure's context (§3.5): where it applies and on what basis.

const PLACES: Record<string, string> = {
  CA: 'Canada', US: 'United States',
  'CA-AB': 'Alberta', 'CA-BC': 'British Columbia', 'CA-MB': 'Manitoba', 'CA-NB': 'New Brunswick',
  'CA-NL': 'Newfoundland and Labrador', 'CA-NS': 'Nova Scotia', 'CA-NT': 'Northwest Territories',
  'CA-NU': 'Nunavut', 'CA-ON': 'Ontario', 'CA-PE': 'Prince Edward Island', 'CA-QC': 'Quebec',
  'CA-SK': 'Saskatchewan', 'CA-YT': 'Yukon',
}

/** A jurisdiction code as a place: `CA-AB` → "Alberta". An unknown code is printed as it is. */
export const placeName = (jurisdiction: string) => PLACES[jurisdiction] ?? jurisdiction

/** The chip's words for a published figure: "AIRB, Alberta". */
export function publishedLabel(f: { shortName?: string; publisher: string; jurisdiction: string }): string {
  return `${f.shortName || f.publisher}, ${placeName(f.jurisdiction)}`
}

/** What a basis means, said as the level-1 line says it. */
export const BASIS_LABELS: Readonly<Record<string, string>> = {
  cap: 'cap',
  selected: 'selection',
  benchmark: 'benchmark',
  observed: 'observed',
  minimum: 'minimum',
  target: 'target',
}

/** Level 1: one line of context — "Alberta, private passenger auto · cap". */
export function contextLine(f: { jurisdiction: string; line?: string; basis?: string }): string {
  const where = [placeName(f.jurisdiction), f.line ? f.line.toLowerCase() : ''].filter(Boolean).join(', ')
  const basis = f.basis ? BASIS_LABELS[f.basis] ?? f.basis : ''
  return [where, basis].filter(Boolean).join(' · ')
}

/** The page a locator cites ("Profit (p. 7)" → 7), for the PDF reader to open at. */
export function locatorPage(locator: string): number | null {
  const m = /\bpp?\.\s*(\d+)/.exec(locator)
  return m ? Number(m[1]) : null
}

/**
 * How the reader's value stands against a published figure, said only when
 * they differ: "Your 20% is above this cap." Within half a percent of the
 * figure, nothing is said.
 */
export function comparison(yours: number, figure: number, basis: string | undefined, shown: string): string | null {
  if (Math.abs(yours - figure) <= Math.max(1e-9, Math.abs(figure) * 0.005)) return null
  const word = basis === 'cap' || basis === 'minimum' || basis === 'target' ? `this ${basis}` : 'this figure'
  return `Your ${shown} is ${yours > figure ? 'above' : 'below'} ${word}.`
}

// ---------------------------------------------------------------------------
// The keypad (the edit sheet's own, so typing a value never brings up the
// phone's keyboard over the sheet).

export type KeypadKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | '±' | '⌫'

/** The longest entry the keypad takes: no field needs more digits than this. */
const MAX_LENGTH = 14

/**
 * The entry after one key. A leading zero gives way to the next digit, a
 * second point is ignored (as is any point for a whole number), ± flips the
 * sign where the field takes negatives, and ⌫ deletes back to an empty entry.
 */
export function pressKey(text: string, key: KeypadKey, opts: { negative?: boolean; integer?: boolean } = {}): string {
  const negative = text.startsWith('-')
  const body = negative ? text.slice(1) : text
  const signed = (b: string) => (negative ? `-${b}` : b)
  switch (key) {
    case '⌫':
      return negative && body.length <= 1 ? '' : text.slice(0, -1)
    case '±':
      if (!opts.negative) return text
      return negative ? body : `-${body}`
    case '.':
      if (opts.integer || body.includes('.')) return text
      return signed(body === '' ? '0.' : `${body}.`)
    default:
      if (text.length >= MAX_LENGTH) return text
      return signed(body === '0' ? key : body + key)
  }
}

/** The number an entry reads as ("0." reads as 0), or null while it is empty or a bare "-". */
export function keypadValue(text: string): number | null {
  if (!/^-?\d+(\.\d*)?$/.test(text)) return null
  const n = Number(text)
  return Number.isFinite(n) ? n : null
}
