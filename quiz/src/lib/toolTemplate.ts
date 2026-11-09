// The tool template's rules, as data (docs/actuarial-tools.md §19): which tools
// are drawn by it, where a slider lives, how inputs are grouped, where each
// value came from, how a grid numbers its columns, and the keypad the edit
// sheet types with. Pure; `components/tools/ToolTemplate.tsx` draws it.

import type { ChoiceField, DateField, NumberField, TableColumn, ToolField, ToolSpec } from './tools'

/**
 * The tools drawn by the template while it is checked on a phone, before
 * the other tools move over: the three shapes a tool comes in (a grid,
 * a short scalar tool, a long one) and the two test tools — a choice that
 * changes which inputs exist, and a triangle with its selection exhibit.
 */
export const TEMPLATE_TOOLS: ReadonlySet<string> = new Set([
  'data.insurer_return',
  'capital.mct_ratio',
  'reserving.bornhuetter_ferguson',
  'ratemaking.permissible_loss_ratio',
  'finance.bond_price',
  'distributions.limited_expected_value',
  'reserving.age_to_age_factors',
])

export const usesTemplate = (spec: ToolSpec) => TEMPLATE_TOOLS.has(spec.id)

/** A tool with this many scalar inputs or fewer keeps a slider on each row; past it, a row opens the edit sheet. */
export const INLINE_SLIDER_LIMIT = 3

export type ScalarField = NumberField | ChoiceField | DateField

export const isScalar = (f: ToolField): f is ScalarField => f.kind === 'number' || f.kind === 'choice' || f.kind === 'date'

/**
 * The scalar inputs on screen, split into the reader's **judgments** (R3: the
 * choices a run must report as made or left at their default) and the rest.
 * Each keeps the spec's order.
 */
export function inputGroups(fields: readonly ScalarField[]): { judgments: ScalarField[]; inputs: ScalarField[] } {
  return {
    judgments: fields.filter(f => f.judgment),
    inputs: fields.filter(f => !f.judgment),
  }
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
  | { kind: 'published'; label: string; checked: boolean }
  | { kind: 'linked'; label: string }
  /** A value as filed with OSFI: where it was filed, and OSFI's label for the line. */
  | { kind: 'filed'; label: string; title: string }

/**
 * A value taken from another tool, remembered with the value it brought: the
 * tag says "linked" for as long as the input still holds that value, and
 * "yours" once the reader changes it — no bookkeeping on every edit.
 */
export interface Origin {
  label: string
  value: string
}

export const originOf = (label: string, value: unknown): Origin => ({ label, value: JSON.stringify(value) })
export const originHolds = (origin: Origin | undefined, value: unknown): origin is Origin =>
  !!origin && origin.value === JSON.stringify(value)

/** A scalar input's source, most specific first. */
export function scalarSource({
  touched,
  published,
  origin,
  value,
  linkedBy,
  filed,
}: {
  /** The draft holds a value of its own for the field. */
  touched: boolean
  /** The published figure it is, when it is one. */
  published?: { label: string; checked: boolean } | null
  origin?: Origin
  value: unknown
  /** Filled by a workflow's link. */
  linkedBy?: string | null
  /** The filed cell it is, when it is one. */
  filed?: { label: string; title: string } | null
}): ValueSource {
  if (published) return { kind: 'published', ...published }
  if (filed) return { kind: 'filed', ...filed }
  if (linkedBy) return { kind: 'linked', label: linkedBy }
  if (originHolds(origin, value)) return { kind: 'linked', label: origin.label }
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
