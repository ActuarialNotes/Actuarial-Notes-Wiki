/**
 * Picking assumptions rather than typing them (docs/actuarial-tools.md §6.6):
 * how a grid cell is printed, what a stepper nudges it by, what a column's
 * "Set every row" and "Scale" do, and where each assumption can be filled from
 * — the tool that produces it, run in a sheet over the card. Pure and tested;
 * `components/tools/ToolGrid.tsx` and `ColumnSources.tsx` draw it.
 *
 * Every value a source fills in comes out of the engine (`runTool`), never a
 * second formula, and arrives as the reader's choice, not a default (R3).
 */

import { formatValue, readNumber, runTool, toolById, type NumberUnit, type TableRow, type ToolInput, type ToolResult, type Triangle } from '@/lib/tools'

type DraftRow = Record<string, unknown>

/** A typed number as its column prints it once the cell loses focus: `1700` → `1,700`. Anything unreadable is left as typed. */
export function formatCell(raw: unknown, unit: NumberUnit | undefined): string {
  if (raw == null || raw === '') return ''
  const n = readNumber(raw, unit === 'percent')
  if (n === null) return String(raw)
  switch (unit) {
    case 'money':
    case 'count':
      return n.toLocaleString('en-US', { maximumFractionDigits: 6 })
    case 'percent':
      return formatValue(n, 'percent')
    default:
      return String(Math.round(n * 1e10) / 1e10)
  }
}

/** A column's total, printed the way its cells are — so `1,700` sits over `6,650`, not `6,650.00`. */
export function formatTotal(value: number, unit: NumberUnit | undefined): string {
  return formatCell(value, unit)
}

/** What a stepper's − and + move a value by: a thousandth of a factor, a quarter-point of a rate, about 1% of an amount. */
export function stepFor(unit: NumberUnit | undefined, value: number): number {
  switch (unit) {
    case 'factor':
      return 0.001
    case 'percent':
      return 0.0025
    case 'count':
      return 1
    case 'years':
      return 0.25
    case 'money': {
      const target = Math.abs(value) / 100
      if (target < 1) return 1
      return 10 ** Math.floor(Math.log10(target))
    }
    default:
      return Math.abs(value) >= 10 ? 10 ** Math.floor(Math.log10(Math.abs(value) / 100)) : 0.01
  }
}

/**
 * The slider's ends around a value: ±10% for a factor or a rate (a CDF moves
 * in the third decimal), ±50% for an amount, never narrower than twenty steps.
 */
export function sliderRange(unit: NumberUnit | undefined, value: number): { min: number; max: number; step: number } {
  const step = stepFor(unit, value)
  const share = unit === 'factor' || unit === 'percent' ? 0.1 : 0.5
  const half = Math.max(Math.abs(value) * share, step * 20)
  let min = value - half
  if ((unit === 'money' || unit === 'count' || unit === 'factor') && value >= 0) min = Math.max(0, min)
  return { min: snap(min, step), max: snap(value + half, step), step }
}

const snap = (v: number, step: number) => Math.round(v / step) * step

/** A value nudged by `steps` steps, cleaned of floating-point dust at the step's precision. */
export function nudge(value: number, unit: NumberUnit | undefined, steps: number): number {
  const step = stepFor(unit, value)
  const places = Math.max(0, -Math.floor(Math.log10(step)) + 1)
  return Number((value + steps * step).toFixed(places))
}

/**
 * "Scale by…": `×1.05`, `*1.05`, `1.05` (a multiplier), `+5%` / `-5%` (a
 * change), or `+100` (an addition). Null when the text isn't one of those.
 */
export function parseScale(text: string): ((n: number) => number) | null {
  const t = text.trim().replace(/\s+/g, '').replace(/^[×x*]/, '*')
  if (!t) return null
  if (t.startsWith('*')) {
    const m = readNumber(t.slice(1), false)
    return m === null ? null : n => n * m
  }
  const pct = /^([+\-−])(\d*\.?\d+)%$/.exec(t)
  if (pct) {
    const sign = pct[1] === '+' ? 1 : -1
    const r = sign * Number(pct[2]) / 100
    return n => n * (1 + r)
  }
  if (/^[+\-−]/.test(t)) {
    const a = readNumber(t.replace('−', '-'), false)
    return a === null ? null : n => n + a
  }
  const m = readNumber(t, false)
  return m === null ? null : n => n * m
}

/** Every row's cell in `key` replaced by `f` of its number; a blank or unreadable cell is left alone. */
export function mapColumn(rows: DraftRow[], key: string, unit: NumberUnit | undefined, f: (n: number) => number): DraftRow[] {
  return rows.map(row => {
    const n = readNumber(row[key], unit === 'percent')
    return n === null ? row : { ...row, [key]: tidy(f(n)) }
  })
}

/** Every row's cell in `key` set to one value. */
export function setColumn(rows: DraftRow[], key: string, value: number): DraftRow[] {
  return rows.map(row => ({ ...row, [key]: value }))
}

/** A column filled from a list (a source's result), row by row; a null leaves the row's cell as it was. */
export function fillColumn(rows: DraftRow[], key: string, values: (number | null)[]): DraftRow[] {
  return rows.map((row, i) => (values[i] == null ? row : { ...row, [key]: tidy(values[i]!) }))
}

const tidy = (n: number) => Math.round(n * 1e10) / 1e10

// ── Where an assumption comes from ──────────────────────────────────────────

/**
 * A tool that can fill a column (or a scalar) of another tool's card. The
 * sheet opens `tool`'s card, `prefill`ed from the card being filled where it
 * can be, and `take` reads the values out of its result for each row.
 */
export interface ColumnSource {
  tool: string
  /** How the values are matched to rows, in one line, shown in the sheet. */
  how: string
  prefill?: (rows: DraftRow[]) => ToolInput | undefined
  take: (result: ToolResult, rows: DraftRow[]) => (number | null)[]
}

export interface ScalarSource {
  tool: string
  how: string
  take: (result: ToolResult) => number | null
}

const origins = (rows: DraftRow[]) => rows.map(r => String(r.origin ?? ''))

/**
 * CDFs matched to origins by position, as a triangle lays them out: the
 * latest origin is at the first age, the one before it at the second, and an
 * origin older than every age takes the last CDF (the tail).
 */
function cdfsByPosition(result: ToolResult, rows: DraftRow[]): (number | null)[] {
  const cdfs = (result.values.cdfs as number[] | undefined) ?? []
  if (!cdfs.length) return rows.map(() => null)
  return rows.map((_, i) => cdfs[Math.min(rows.length - 1 - i, cdfs.length - 1)])
}

/** A per-origin list from the source matched by origin name, else by position. */
function byOrigin(sourceOrigins: string[], values: (number | null)[], rows: DraftRow[]): (number | null)[] {
  const named = origins(rows)
  const index = new Map(sourceOrigins.map((o, i) => [o, i]))
  const allNamed = named.every(o => index.has(o))
  return named.map((o, i) => {
    const k = allNamed ? index.get(o)! : i
    return values[k] ?? null
  })
}

const FROM_DEVELOPMENT: ColumnSource = {
  tool: 'reserving.development_to_ultimate',
  how: 'Matched by position: the latest origin takes the first age’s CDF, the next oldest the second, and so on.',
  take: cdfsByPosition,
}

const FROM_EXPECTED_CLAIMS: ColumnSource = {
  tool: 'reserving.expected_claims',
  how: 'Matched by origin.',
  prefill: rows => {
    const spec = toolById('reserving.expected_claims')!
    const field = spec.fields.find(f => f.key === 'rows')!
    const defaults = (field as { default: TableRow[] }).default
    const same = defaults.length === rows.length
    return { rows: rows.map((r, i) => ({ origin: String(r.origin ?? ''), premium: same ? defaults[i].premium : '', elr: null })) }
  },
  take: (result, rows) => {
    const table = result.table?.rows ?? []
    return byOrigin(table.map(r => String(r.origin)), (result.values.expected as number[]) ?? [], rows)
  },
}

/** The latest diagonal of the triangle Age-to-Age Factors was run on. */
const FROM_TRIANGLE_LATEST: ColumnSource = {
  tool: 'reserving.age_to_age_factors',
  how: 'Each origin’s latest value in the triangle, matched by origin.',
  take: (result, rows) => {
    const tri = result.input.triangle as Triangle
    const latest = tri.values.map(row => {
      const filled = row.filter((v): v is number => v != null)
      return filled.length ? filled[filled.length - 1] : null
    })
    return byOrigin(tri.origins, latest, rows)
  },
}

/** The averages Age-to-Age Factors takes, matched to the age each factor develops from. */
const FROM_AGE_TO_AGE: ColumnSource = {
  tool: 'reserving.age_to_age_factors',
  how: 'Each age takes the average factor from it to the next age; the last age is left for the tail.',
  take: (result, rows) => {
    const ages = (result.values.ages as number[]) ?? []
    const averages = (result.values.averages as (number | null)[]) ?? []
    return rows.map(r => {
      const k = ages.indexOf(Number(r.age))
      return k >= 0 && k < averages.length ? averages[k] : null
    })
  },
}

/** Keyed `toolId:columnKey`. */
export const COLUMN_SOURCES: Record<string, ColumnSource[]> = {
  'reserving.chain_ladder:cdf': [FROM_DEVELOPMENT],
  'reserving.chain_ladder:latest': [FROM_TRIANGLE_LATEST],
  'reserving.bornhuetter_ferguson:cdf': [FROM_DEVELOPMENT],
  'reserving.bornhuetter_ferguson:expected': [FROM_EXPECTED_CLAIMS],
  'reserving.bornhuetter_ferguson:latest': [FROM_TRIANGLE_LATEST],
  'reserving.benktander:cdf': [FROM_DEVELOPMENT],
  'reserving.benktander:expected': [FROM_EXPECTED_CLAIMS],
  'reserving.benktander:latest': [FROM_TRIANGLE_LATEST],
  'reserving.cape_cod:cdf': [FROM_DEVELOPMENT],
  'reserving.cape_cod:latest': [FROM_TRIANGLE_LATEST],
  'reserving.development_to_ultimate:factor': [FROM_AGE_TO_AGE],
}

/** Keyed `toolId:fieldKey`: a scalar input another tool computes. */
/**
 * A par yield (nominal, convertible semiannually) as the effective annual rate
 * a cash-flow tool takes — converted by Interest Converter's own engine, not
 * by a formula here.
 */
function effectiveFromParYield(r: ToolResult): number | null {
  try {
    const converted = runTool(toolById('finance.interest_converter')!, { form: 'nominal_interest', m: 2, rate: Number(r.values.yield) })
    return Number(converted.values.i)
  } catch {
    return null
  }
}

const FROM_YIELD_CURVE: ScalarSource = {
  tool: 'data.yield_curve',
  how: 'The par yield at the chosen term, converted to an effective annual rate (it is nominal, convertible semiannually).',
  take: effectiveFromParYield,
}

export const SCALAR_SOURCES: Record<string, ScalarSource[]> = {
  'ratemaking.trend_factor:trend': [
    { tool: 'ratemaking.trend_fit', how: 'The fitted annual trend.', take: r => Number(r.values.trend) },
    { tool: 'data.price_index', how: 'The index’s annualised change over the window chosen.', take: r => Number(r.values.annual_change) },
  ],
  'finance.present_value:i': [FROM_YIELD_CURVE],
  'finance.duration_convexity:i': [FROM_YIELD_CURVE],
  'finance.redington_immunization:i': [FROM_YIELD_CURVE],
  'finance.annuity:i': [FROM_YIELD_CURVE],
  'ratemaking.loss_ratio_method:fixed': [{ tool: 'ratemaking.expense_ratios', how: 'The fixed expense provision.', take: r => Number(r.values.fixed_provision) }],
  'ratemaking.loss_ratio_method:variable': [{ tool: 'ratemaking.expense_ratios', how: 'The variable expense provision.', take: r => Number(r.values.variable_provision) }],
  'ratemaking.permissible_loss_ratio:fixed': [{ tool: 'ratemaking.expense_ratios', how: 'The fixed expense provision.', take: r => Number(r.values.fixed_provision) }],
  'ratemaking.permissible_loss_ratio:variable': [{ tool: 'ratemaking.expense_ratios', how: 'The variable expense provision.', take: r => Number(r.values.variable_provision) }],
  'ratemaking.pure_premium_method:variable': [{ tool: 'ratemaking.expense_ratios', how: 'The variable expense provision.', take: r => Number(r.values.variable_provision) }],
  'reserving.expected_claims:elr': [{ tool: 'reserving.cape_cod', how: 'The ELR the Cape Cod method finds in the data.', take: r => Number(r.values.elr) }],
}

export function columnSources(toolId: string, key: string): ColumnSource[] {
  return COLUMN_SOURCES[`${toolId}:${key}`] ?? []
}

export function scalarSources(toolId: string, key: string): ScalarSource[] {
  return SCALAR_SOURCES[`${toolId}:${key}`] ?? []
}

// ── Candidates: values a cell's stepper offers as chips ─────────────────────

export interface Candidate {
  label: string
  value: number
}

/** The averages Age-to-Age Factors offers, each a method and a span. */
const AVERAGE_CHOICES: { average: string; latest: number; label: string }[] = [
  { average: 'volume', latest: 0, label: 'Vol-wtd all' },
  { average: 'volume', latest: 3, label: 'Vol-wtd 3' },
  { average: 'volume', latest: 5, label: 'Vol-wtd 5' },
  { average: 'simple', latest: 0, label: 'Simple all' },
  { average: 'simple', latest: 5, label: 'Simple 5' },
  { average: 'medial', latest: 5, label: 'Medial 5' },
  { average: 'geometric', latest: 4, label: 'Geometric 4' },
]

/**
 * Every average of one interval's factors, from a triangle: what an actuary
 * chooses an LDF among. Each is the engine's own run of Age-to-Age Factors
 * with that average, and averages that come out the same are offered once.
 */
export function averageCandidates(triangleInput: ToolInput, age: number): Candidate[] {
  const spec = toolById('reserving.age_to_age_factors')!
  const out: Candidate[] = []
  for (const choice of AVERAGE_CHOICES) {
    try {
      const r = runTool(spec, { ...triangleInput, average: choice.average, latest: choice.latest })
      const ages = r.values.ages as number[]
      const k = ages.indexOf(age)
      const v = (r.values.averages as (number | null)[])[k]
      if (k < 0 || v == null || k >= ages.length - 1) continue
      if (out.some(c => Math.abs(c.value - v) < 5e-5)) continue
      out.push({ label: choice.label, value: v })
    } catch {
      return out
    }
  }
  return out
}

/**
 * The chips a cell's stepper shows, from the session's last runs of the tools
 * that produce its column: the averages for a selected factor, the CDF a
 * Development to Ultimate run gives the row's position.
 */
export function cellCandidates(
  toolId: string,
  key: string,
  rows: DraftRow[],
  r: number,
  last: (toolId: string) => ToolInput | undefined,
): Candidate[] {
  if (toolId === 'reserving.development_to_ultimate' && key === 'factor') {
    const input = last('reserving.age_to_age_factors')
    const age = Number(rows[r]?.age)
    return input && Number.isFinite(age) ? averageCandidates(input, age) : []
  }
  if (key === 'cdf' && columnSources(toolId, 'cdf').length) {
    const input = last('reserving.development_to_ultimate')
    if (!input) return []
    try {
      const result = runTool(toolById('reserving.development_to_ultimate')!, input)
      const v = cdfsByPosition(result, rows)[r]
      return v == null ? [] : [{ label: 'Last CDFs', value: v }]
    } catch {
      return []
    }
  }
  return []
}

/** One row of the selection grid: an average, and its value at each interval (null where there are no factors). */
export interface AverageRow {
  label: string
  average: string
  latest: number
  values: (number | null)[]
}

/**
 * The averages an actuary selects LDFs among, every interval at once
 * (docs/actuarial-tools.md §6.6, the selection exhibit): one engine run of
 * Age-to-Age Factors per average. The triangle is the card's own input.
 */
export function averageRows(input: ToolInput): AverageRow[] {
  const spec = toolById('reserving.age_to_age_factors')!
  const rows: AverageRow[] = []
  for (const c of AVERAGE_CHOICES) {
    try {
      const r = runTool(spec, { ...input, average: c.average, latest: c.latest })
      rows.push({ label: c.label, average: c.average, latest: c.latest, values: r.values.averages as (number | null)[] })
    } catch {
      return []
    }
  }
  return rows
}

/** A selected factor and where it came from: an average's label. */
export interface Selection {
  value: number
  from: string
}

/**
 * The Development to Ultimate input the selections make: each age with its
 * selected factor (the card's average where none was picked), the last age
 * left for the tail.
 */
export function selectionsToFactors(ages: number[], averages: (number | null)[], selections: (Selection | null)[]): ToolInput {
  return {
    factors: ages.map((age, j) => ({
      age,
      factor: j < averages.length ? selections[j]?.value ?? averages[j] ?? 1 : null,
    })),
  }
}
