/**
 * A figure on every tool card (docs/actuarial-tools.md §6.7): each tool's run
 * turned into one small picture of its answer, as plain data that
 * `components/tools/ToolFigure.tsx` draws. Pure and tested.
 *
 * R11 is the rule this module keeps: a figure only draws numbers the tool
 * computed. Where a curve needs more points than one run gives (a price
 * against its yield, Z against the claim count), they come from running the
 * same engine again over a range of the input (`sweep`), never from a second
 * formula — so the figure can't disagree with the tiles.
 *
 * It lives app-side rather than in `lib/tools/`, so the engine bundle the
 * connector runs stays as it is.
 */

import { DISTRIBUTIONS, type DistributionKey } from '@/lib/distributions'
import { runTool, toolById, type NumberUnit, type TableRow, type ToolInput, type ToolResult } from '@/lib/tools'

/** What a mark stands for: the base it rests on, the tool's result (drawn in the result colour), or context. */
export type Role = 'base' | 'result' | 'muted'

export interface Point { x: number; y: number }

export type FigureSpec =
  | {
      kind: 'bars'
      labels: string[]
      /** Stacked bottom to top. */
      stacks: { name: string; values: number[]; role: Role }[]
      /** An outline per bar (the premium behind expected claims). */
      outline?: { name: string; values: number[] }
      /** A secondary series drawn as a line across the bars (a loan's balance), on its own scale. */
      line?: { name: string; values: number[] }
      unit: NumberUnit
    }
  | {
      kind: 'lines'
      series: { name: string; points: Point[]; role: Role }[]
      /** Dots: data points, each origin's factor. */
      dots?: (Point & { role: Role; name: string })[]
      /** The run's own point on the curve, and the input dragging it sets. */
      point?: Point & { name: string; drag?: { field: string } }
      /** The area under one series between two x values. */
      shade?: { series: number; from: number; to: number }
      /** A level drawn across (a mean, an asymptote). */
      level?: { y: number; name: string }
      /** A straight line through a point (a duration's tangent). */
      tangent?: Point & { slope: number }
      /** Tick labels for the x axis at given values (ages, intervals). */
      xTicks?: { x: number; label: string }[]
      /** Draw y from zero rather than the data's own range. */
      zero?: boolean
      xUnit: NumberUnit
      yUnit: NumberUnit
      /** Points are discrete: draw the curve as stems. */
      stems?: boolean
      /** The y values are log10 of the quantity (a mortality curve): labels print 10^y. */
      yLog?: boolean
    }
  | { kind: 'heat'; rows: (number | null)[][] }
  | { kind: 'flows'; items: { t: number; amount: number; pv: number }[] }
  | { kind: 'split'; bars: { name: string; parts: { name: string; value: number; role: Role }[] }[]; unit: NumberUnit }
  | { kind: 'axis'; ticks: { name: string; value: number; role: Role }[]; unit: NumberUnit }
  | { kind: 'span'; from: string; to: string; years: number }

const num = (v: unknown) => Number(v)
const rowsOf = (input: ToolInput, key = 'rows') => (input[key] as TableRow[]) ?? []

/** `n` evenly spaced values from `a` to `b`. */
export function range(a: number, b: number, n: number): number[] {
  if (n < 2 || a === b) return [a]
  return Array.from({ length: n }, (_, k) => a + ((b - a) * k) / (n - 1))
}

/**
 * The tool run again at each value of one input, reading one number out of
 * each result: the curve's points, from the engine (R11). A value the engine
 * refuses is left out rather than guessed.
 */
export function sweep(toolId: string, input: ToolInput, key: string, xs: number[], read: (r: ToolResult) => number): Point[] {
  const spec = toolById(toolId)
  if (!spec) return []
  const out: Point[] = []
  for (const x of xs) {
    try {
      const y = read(runTool(spec, { ...input, [key]: x }))
      if (Number.isFinite(y)) out.push({ x, y })
    } catch {
      // Outside the field's bounds or the method's domain: no point.
    }
  }
  return out
}

/** Bars of the latest diagonal with the reserve stacked on it, one per origin. */
function reserveBars(result: ToolResult): FigureSpec {
  const rows = rowsOf(result.input)
  return {
    kind: 'bars',
    labels: rows.map(r => String(r.origin)),
    stacks: [
      { name: 'Latest', values: rows.map(r => num(r.latest)), role: 'base' },
      { name: String(result.values.reserve_label ?? 'Reserve'), values: (result.values.reserve as number[]) ?? [], role: 'result' },
    ],
    unit: 'money',
  }
}

/** Present values of a list of flows, from the Present Value tool at one rate. */
function presentValues(flows: { time: number; amount: number }[], i: number): number[] {
  const spec = toolById('finance.present_value')!
  try {
    const r = runTool(spec, { i, flows: flows.map(f => ({ time: f.time, amount: f.amount, spot: null })) })
    return (r.table?.rows ?? []).map(row => num(row.pv))
  } catch {
    return flows.map(() => NaN)
  }
}

type Builder = (result: ToolResult) => FigureSpec | null

const BUILDERS: Record<string, Builder> = {
  // ── Data Sources ─────────────────────────────────────────────────────────
  // Mortality over the whole table on a log scale (it rises roughly
  // exponentially with age), the ages read highlighted.
  'data.life_table': r => {
    const ages = r.values.all_ages as number[]
    const qx = r.values.all_qx as number[]
    const read = new Set(r.values.ages as number[])
    const log = (q: number) => Math.log10(Math.max(q, 1e-6))
    const x = num(r.input.x)
    return {
      kind: 'lines',
      series: [
        { name: 'qₓ', points: ages.map((a, k) => ({ x: a, y: log(qx[k]) })), role: 'base' },
        { name: 'qₓ, the ages read', points: ages.flatMap((a, k) => (read.has(a) ? [{ x: a, y: log(qx[k]) }] : [])), role: 'result' },
      ],
      point: { x, y: log(qx[ages.indexOf(x)]), name: `q${x}`, drag: { field: 'x' } },
      xTicks: [0, 20, 40, 60, 80, 100].filter(a => a <= ages[ages.length - 1]).map(a => ({ x: a, label: String(a) })),
      yLog: true,
      xUnit: 'count',
      yUnit: 'plain',
    }
  },

  'data.price_index': r => {
    const index = r.values.index as number[]
    const periods = r.values.periods as string[]
    const n = index.length
    // The first and last values the change is measured between, joined.
    const line = [{ x: 0, y: index[0] }, { x: n - 1, y: index[n - 1] }]
    const step = Math.max(1, Math.ceil(n / 5))
    return {
      kind: 'lines',
      series: [
        { name: 'Index', points: index.map((y, k) => ({ x: k, y })), role: 'base' },
        { name: 'Annualised change', points: line, role: 'result' },
      ],
      xTicks: periods.flatMap((p, k) => (k % step === 0 ? [{ x: k, label: p.slice(0, 4) }] : [])),
      xUnit: 'plain',
      yUnit: 'plain',
    }
  },

  'data.yield_curve': r => {
    const terms = r.values.terms as number[]
    const yields = r.values.yields as number[]
    const term = num(r.values.term)
    return {
      kind: 'lines',
      series: [{ name: 'Par yield', points: terms.map((t, k) => ({ x: t, y: yields[k] })), role: 'base' }],
      dots: terms.map((t, k) => ({ x: t, y: yields[k], role: 'muted' as Role, name: `${(r.values.term_labels as string[])[k]}` })),
      point: { x: term, y: num(r.values.yield), name: String(r.input.term) },
      xTicks: [1, 5, 10, 20, 30].map(t => ({ x: t, label: `${t}y` })),
      xUnit: 'years',
      yUnit: 'percent',
    }
  },

  // ── Reserving ────────────────────────────────────────────────────────────
  'reserving.ratio_triangle': r => ({ kind: 'heat', rows: r.values.ratios as (number | null)[][] }),

  'reserving.age_to_age_factors': r => {
    const intervals = r.values.intervals as string[]
    const factors = r.values.factors as TableRow[]
    const averages = r.values.averages as (number | null)[]
    const dots = intervals.flatMap((label, j) =>
      factors.flatMap(row => (row[label] == null ? [] : [{ x: j, y: num(row[label]), role: 'muted' as Role, name: `${row.origin}, ${label}` }])),
    )
    return {
      kind: 'lines',
      series: [{ name: 'Average', points: averages.flatMap((v, j) => (v == null ? [] : [{ x: j, y: v }])), role: 'result' }],
      dots,
      xTicks: intervals.map((label, j) => ({ x: j, label })),
      xUnit: 'plain',
      yUnit: 'factor',
    }
  },

  'reserving.development_to_ultimate': r => {
    const ages = r.values.ages as number[]
    const developed = r.values.percent_developed as number[]
    return {
      kind: 'lines',
      series: [{ name: '% developed', points: ages.map((a, k) => ({ x: a, y: developed[k] })), role: 'result' }],
      dots: ages.map((a, k) => ({ x: a, y: developed[k], role: 'result' as Role, name: `Age ${a}` })),
      level: { y: 1, name: 'Ultimate' },
      xTicks: ages.map(a => ({ x: a, label: String(a) })),
      zero: true,
      xUnit: 'count',
      yUnit: 'percent',
    }
  },

  'reserving.chain_ladder': reserveBars,
  'reserving.bornhuetter_ferguson': reserveBars,
  'reserving.benktander': reserveBars,
  'reserving.cape_cod': r => {
    const bars = reserveBars(r)
    if (bars.kind !== 'bars') return bars
    return { ...bars, outline: { name: 'Used-up premium × ELR', values: (r.values.used_up as number[]).map(u => u * num(r.values.elr)) } }
  },

  'reserving.expected_claims': r => {
    const rows = rowsOf(r.input)
    return {
      kind: 'bars',
      labels: rows.map(row => String(row.origin)),
      stacks: [{ name: 'Expected claims', values: r.values.expected as number[], role: 'result' }],
      outline: { name: 'Earned premium', values: rows.map(row => num(row.premium)) },
      unit: 'money',
    }
  },

  // ── Ratemaking ───────────────────────────────────────────────────────────
  'ratemaking.earned_premium': r => ({
    kind: 'bars',
    labels: (r.values.years as number[]).map(String),
    stacks: [
      { name: 'Earned', values: r.values.earned as number[], role: 'result' },
      { name: 'Unearned', values: r.values.unearned as number[], role: 'muted' },
    ],
    unit: 'money',
  }),

  'ratemaking.on_level_factors': r => {
    const portions = r.values.portions as number[][]
    const levels = r.values.levels as number[]
    return {
      kind: 'bars',
      labels: (r.values.years as number[]).map(String),
      stacks: levels.map((level, k) => ({
        name: `Rate level ${level.toFixed(4)}`,
        values: portions.map(p => p[k] ?? 0),
        role: (k === levels.length - 1 ? 'result' : k % 2 ? 'muted' : 'base') as Role,
      })),
      unit: 'percent',
    }
  },

  'ratemaking.trend_fit': r => {
    const rows = r.table?.rows ?? []
    const left = new Set(r.values.excluded as string[])
    return {
      kind: 'lines',
      series: [{ name: 'Fitted', points: rows.map((row, k) => ({ x: k, y: num(row.fitted) })), role: 'result' }],
      // A point left out of the fit, or outside its window, is drawn muted.
      dots: rows.map((row, k) => ({ x: k, y: num(row.value), role: (row.fitted == null || left.has(String(row.period)) ? 'muted' : 'base') as Role, name: String(row.period) })),
      xUnit: 'plain',
      yUnit: 'plain',
    }
  },

  'ratemaking.trend_factor': r => ({ kind: 'span', from: String(r.values.from), to: String(r.values.to), years: num(r.values.period) }),

  // The trend factor's path through time: the past trend's slope to the latest point, then the future's.
  'ratemaking.two_step_trend': r => {
    const p1 = num(r.values.past_period)
    const p2 = num(r.values.future_period)
    const f1 = num(r.values.past_factor)
    const total = num(r.values.factor)
    return {
      kind: 'lines',
      series: [
        { name: 'Past', points: [{ x: 0, y: 1 }, { x: p1, y: f1 }], role: 'base' },
        { name: 'Future', points: [{ x: p1, y: f1 }, { x: p1 + p2, y: total }], role: 'result' },
      ],
      dots: [{ x: p1, y: f1, role: 'base' as Role, name: String(r.values.pivot) }],
      xTicks: [{ x: 0, label: String(r.values.from) }, { x: p1, label: String(r.values.pivot) }, { x: p1 + p2, label: String(r.values.to) }],
      xUnit: 'years',
      yUnit: 'factor',
    }
  },

  'ratemaking.combined_trend': r => ({
    kind: 'axis',
    ticks: [
      { name: 'Frequency', value: num(r.values.frequency), role: 'muted' },
      { name: 'Severity', value: num(r.values.severity), role: 'muted' },
      ...(r.values.direct == null ? [] : [{ name: 'Direct', value: num(r.values.direct), role: 'base' as Role }]),
      { name: 'Combined', value: num(r.values.trend), role: 'result' },
    ],
    unit: 'percent',
  }),

  'ratemaking.expense_ratios': r => {
    const F = num(r.values.fixed_provision)
    const V = num(r.values.variable_provision)
    return {
      kind: 'split',
      bars: [{ name: 'Premium', parts: [
        { name: 'Fixed expense', value: F, role: 'result' },
        { name: 'Variable expense', value: V, role: 'base' },
        { name: 'Losses and profit', value: Math.max(0, 1 - F - V), role: 'muted' },
      ] }],
      unit: 'percent',
    }
  },

  'ratemaking.permissible_loss_ratio': r => ({
    kind: 'split',
    bars: [{ name: 'Premium', parts: [
      { name: 'Permissible loss ratio', value: num(r.values.permissible_loss_ratio), role: 'result' },
      { name: 'Fixed expense', value: num(r.input.fixed), role: 'base' },
      { name: 'Variable expense', value: num(r.input.variable), role: 'base' },
      { name: 'Profit', value: num(r.input.profit), role: 'muted' },
    ] }],
    unit: 'percent',
  }),

  // What the rates need (projected loss ratio plus fixed expense) beside what
  // they allow (the variable permissible loss ratio), on one scale: the
  // indicated change is how far the first bar reaches past the second.
  'ratemaking.loss_ratio_method': r => {
    const lr = num(r.input.loss_ratio)
    const fixed = num(r.input.fixed)
    const allowed = num(r.values.variable_permissible_loss_ratio)
    const part = (name: string, value: number, role: Role) => ({ name, value, role })
    return {
      kind: 'split',
      bars: [
        { name: 'Needed', parts: [part('Loss & LAE ratio', lr, 'base'), part('Fixed expense', fixed, 'muted')] },
        { name: 'Allowed', parts: [part('Variable permissible loss ratio', allowed, 'result')] },
      ],
      unit: 'percent',
    }
  },

  'ratemaking.pure_premium_method': r => {
    const rate = num(r.values.indicated_rate)
    const pp = num(r.input.pure_premium)
    const fixed = num(r.input.fixed)
    return {
      kind: 'split',
      bars: [{ name: 'Indicated rate', parts: [
        { name: 'Pure premium', value: pp / rate, role: 'result' },
        { name: 'Fixed expense', value: fixed / rate, role: 'base' },
        { name: 'Variable expense and profit', value: Math.max(0, 1 - (pp + fixed) / rate), role: 'muted' },
      ] }],
      unit: 'percent',
    }
  },

  // ── Loss distributions ───────────────────────────────────────────────────
  'distributions.distribution': r => {
    const key = String(r.input.family) as DistributionKey
    const dist = DISTRIBUTIONS[key]
    if (!dist) return null
    const discrete = dist.kind === 'discrete'
    const lo = sweep('distributions.distribution', r.input, 'q', [0.002], res => num(res.values.quantile))[0]?.y
    const hi = sweep('distributions.distribution', r.input, 'q', [0.998], res => num(res.values.quantile))[0]?.y
    if (lo == null || hi == null) return null
    const x = num(r.input.x)
    const a = Math.min(lo, x)
    const b = Math.max(hi, x)
    const xs = discrete ? range(Math.floor(a), Math.ceil(b), Math.min(61, Math.ceil(b) - Math.floor(a) + 1)).map(Math.round) : range(a, b, 61)
    const curve = sweep('distributions.distribution', r.input, 'x', xs, res => num(res.values.density))
    return {
      kind: 'lines',
      series: [{ name: discrete ? 'Probability' : 'Density', points: curve, role: 'base' }],
      shade: { series: 0, from: a, to: x },
      point: { x, y: num(r.values.density), name: 'x', drag: { field: 'x' } },
      zero: true,
      stems: discrete,
      xUnit: 'plain',
      yUnit: 'plain',
    }
  },

  'distributions.limited_expected_value': r => {
    const u = num(r.input.u)
    const mean = num(r.values.mean)
    const top = Math.max(u * 1.5, Number.isFinite(mean) ? mean * 2.5 : u * 3)
    const curve = sweep('distributions.limited_expected_value', r.input, 'u', range(0, top, 49), res => num(res.values.lev))
    return {
      kind: 'lines',
      series: [{ name: 'E[X∧u]', points: curve, role: 'base' }],
      point: { x: u, y: num(r.values.lev), name: 'u', drag: { field: 'u' } },
      level: Number.isFinite(mean) ? { y: mean, name: 'E[X]' } : undefined,
      zero: true,
      xUnit: 'money',
      yUnit: 'money',
    }
  },

  'distributions.expected_payment': r => {
    const d = num(r.input.deductible)
    const limit = num(r.input.limit)
    const top = Math.max(d * 2, Number.isFinite(limit) && limit > 0 ? limit : num(r.values.lev_u) * 2, 1)
    const curve = sweep('distributions.expected_payment', r.input, 'deductible', range(0, top, 41), res => num(res.values.per_loss))
    return {
      kind: 'lines',
      series: [{ name: 'Per loss', points: curve, role: 'base' }],
      point: { x: d, y: num(r.values.per_loss), name: 'd', drag: { field: 'deductible' } },
      zero: true,
      xUnit: 'money',
      yUnit: 'money',
    }
  },

  // ── Credibility ──────────────────────────────────────────────────────────
  'credibility.full_credibility_standard': r => {
    const z = num(r.values.z)
    const normal = { family: 'normal', mu: 0, sigma: 1 }
    const curve = sweep('distributions.distribution', normal, 'x', range(-3.5, 3.5, 57), res => num(res.values.density))
    return {
      kind: 'lines',
      series: [{ name: 'Normal', points: curve, role: 'base' }],
      shade: { series: 0, from: -z, to: z },
      zero: true,
      xUnit: 'plain',
      yUnit: 'plain',
    }
  },

  'credibility.partial_credibility': r => {
    const standard = num(r.input.standard)
    const claims = num(r.input.claims)
    const top = Math.max(standard * 1.25, claims * 1.1)
    const curve = sweep('credibility.partial_credibility', r.input, 'claims', range(0, top, 49), res => num(res.values.z))
    return {
      kind: 'lines',
      series: [{ name: 'Z', points: curve, role: 'base' }],
      point: { x: claims, y: num(r.values.z), name: 'Z', drag: { field: 'claims' } },
      level: { y: 1, name: 'Full credibility' },
      zero: true,
      xUnit: 'count',
      yUnit: 'plain',
    }
  },

  'credibility.buhlmann_credibility': r => {
    const n = num(r.input.exposure)
    const k = num(r.values.k)
    const top = Math.max(n * 2, k * 4, 1)
    const curve = sweep('credibility.buhlmann_credibility', r.input, 'exposure', range(0, top, 49), res => num(res.values.z))
    return {
      kind: 'lines',
      series: [{ name: 'Z', points: curve, role: 'base' }],
      point: { x: n, y: num(r.values.z), name: 'Z', drag: { field: 'exposure' } },
      level: { y: 1, name: 'Z → 1' },
      zero: true,
      xUnit: 'plain',
      yUnit: 'plain',
    }
  },

  // ── Financial mathematics ────────────────────────────────────────────────
  'finance.interest_converter': r => ({
    kind: 'axis',
    ticks: [
      { name: 'δ', value: num(r.values.delta), role: 'muted' },
      { name: 'd', value: num(r.values.d), role: 'muted' },
      { name: `d(${r.values.m})`, value: num(r.values.nominal_discount), role: 'base' },
      { name: `i(${r.values.m})`, value: num(r.values.nominal_interest), role: 'base' },
      { name: 'i', value: num(r.values.i), role: 'result' },
    ],
    unit: 'percent',
  }),

  'finance.annuity': r => {
    const n = Math.min(num(r.input.n), 120)
    if (!Number.isFinite(n) || n <= 0) return null
    const due = r.input.timing === 'due'
    const flows = Array.from({ length: n }, (_, k) => ({ time: due ? k : k + 1, amount: num(r.input.payment) }))
    const pvs = presentValues(flows, num(r.input.i))
    return { kind: 'flows', items: flows.map((f, k) => ({ t: f.time, amount: f.amount, pv: pvs[k] })) }
  },

  'finance.present_value': r => ({
    kind: 'flows',
    items: (r.table?.rows ?? []).map(row => ({ t: num(row.time), amount: num(row.amount), pv: num(row.pv) })),
  }),

  'finance.internal_rate_of_return': r => {
    const flows = rowsOf(r.input, 'flows').map(f => ({ time: num(f.time), amount: num(f.amount) }))
    const irr = num(r.values.irr)
    const top = Math.max(0.2, Number.isFinite(irr) ? irr * 2 : 0.2)
    const npv = sweep('finance.present_value', { flows: flows.map(f => ({ ...f, spot: null })) }, 'i', range(-0.05, top, 49), res => num(res.values.present_value))
    return {
      kind: 'lines',
      series: [{ name: 'NPV', points: npv, role: 'base' }],
      dots: ((r.values.rates as number[]) ?? []).map(rate => ({ x: rate, y: 0, role: 'result' as Role, name: 'IRR' })),
      level: { y: 0, name: 'NPV = 0' },
      xUnit: 'percent',
      yUnit: 'money',
    }
  },

  'finance.loan_schedule': r => {
    const interest = r.values.interest as number[]
    const principal = r.values.principal as number[]
    return {
      kind: 'bars',
      labels: interest.map((_, k) => String(k + 1)),
      stacks: [
        { name: 'Principal', values: principal, role: 'result' },
        { name: 'Interest', values: interest, role: 'muted' },
      ],
      line: { name: 'Balance', values: r.values.balance as number[] },
      unit: 'money',
    }
  },

  'finance.bond_price': r => priceYield(r, 'finance.bond_price', num(r.input.yield), num(r.values.price)),
  'finance.bond_yield': r => priceYield(r, 'finance.bond_price', num(r.values.nominal_yield), num(r.input.price)),

  'finance.bond_amortization': r => {
    const book = r.values.book_value as number[]
    const price = num(r.values.price)
    return {
      kind: 'lines',
      series: [{ name: 'Book value', points: [price, ...book].map((y, k) => ({ x: k, y })), role: 'result' }],
      level: { y: num(r.input.redemption ?? r.input.face), name: 'Redemption' },
      xUnit: 'count',
      yUnit: 'money',
    }
  },

  'finance.duration_convexity': r => {
    const i = num(r.input.i)
    const curve = sweep('finance.duration_convexity', r.input, 'i', range(Math.max(-0.02, i - 0.06), i + 0.06, 41), res => num(res.values.present_value))
    const pv = num(r.values.present_value)
    // The tangent's slope: dP/di = −modified duration × P, from the run's own figures.
    return {
      kind: 'lines',
      series: [{ name: 'Price', points: curve, role: 'base' }],
      point: { x: i, y: pv, name: 'P', drag: { field: 'i' } },
      tangent: { x: i, y: pv, slope: -num(r.values.modified) * pv },
      xUnit: 'percent',
      yUnit: 'money',
    }
  },

  'finance.redington_immunization': r => {
    const i = num(r.input.i)
    const xs = range(Math.max(-0.02, i - 0.05), i + 0.05, 41)
    const assets = sweep('finance.redington_immunization', r.input, 'i', xs, res => num(res.values.pv_assets))
    const liabilities = sweep('finance.redington_immunization', r.input, 'i', xs, res => num(res.values.pv_liabilities))
    return {
      kind: 'lines',
      series: [
        { name: 'Assets', points: assets, role: 'result' },
        { name: 'Liabilities', points: liabilities, role: 'base' },
      ],
      point: { x: i, y: num(r.values.pv_assets), name: 'i', drag: { field: 'i' } },
      xUnit: 'percent',
      yUnit: 'money',
    }
  },
}

/** A bond's price against its yield, the bond's own point marked — from Bond Price, run over a range of yields. */
function priceYield(r: ToolResult, toolId: string, y: number, price: number): FigureSpec {
  const input = { face: r.input.face, coupon: r.input.coupon, redemption: r.input.redemption, years: r.input.years, m: r.input.m }
  const curve = sweep(toolId, input, 'yield', range(Math.max(0.0001, y - 0.06), y + 0.06, 41), res => num(res.values.price))
  return {
    kind: 'lines',
    series: [{ name: 'Price', points: curve, role: 'base' }],
    point: { x: y, y: price, name: 'P', drag: r.tool === 'finance.bond_price' ? { field: 'yield' } : undefined },
    level: { y: num(r.input.redemption ?? r.input.face), name: 'Redemption' },
    xUnit: 'percent',
    yUnit: 'money',
  }
}

/** Whether a tool has a figure: the registry test holds every tool to it (R11). */
export function hasFigure(toolId: string): boolean {
  return toolId in BUILDERS
}

/** The run's figure, or null when its numbers can't be drawn (a degenerate input). */
export function figureFor(result: ToolResult): FigureSpec | null {
  const build = BUILDERS[result.tool]
  if (!build) return null
  try {
    return build(result)
  } catch {
    return null
  }
}

/** Register a figure for a tool defined outside the core engine (the Data Sources). */
export function registerFigure(toolId: string, build: Builder): void {
  BUILDERS[toolId] = build
}

// ── Geometry, shared by the component and its tests ─────────────────────────

/** A linear map from a data range onto pixels; a flat range is centred. */
export function scale(d0: number, d1: number, p0: number, p1: number): (v: number) => number {
  if (!Number.isFinite(d0) || !Number.isFinite(d1) || d0 === d1) return () => (p0 + p1) / 2
  return v => p0 + ((v - d0) / (d1 - d0)) * (p1 - p0)
}

/** The y range a lines figure needs to show every mark it draws. */
export function linesExtent(f: Extract<FigureSpec, { kind: 'lines' }>): { x: [number, number]; y: [number, number] } {
  const xs: number[] = []
  const ys: number[] = []
  for (const s of f.series) for (const p of s.points) { xs.push(p.x); ys.push(p.y) }
  for (const d of f.dots ?? []) { xs.push(d.x); ys.push(d.y) }
  if (f.point) { xs.push(f.point.x); ys.push(f.point.y) }
  if (f.level) ys.push(f.level.y)
  if (f.zero) ys.push(0)
  const finite = (a: number[]) => a.filter(Number.isFinite)
  const fx = finite(xs)
  const fy = finite(ys)
  if (!fx.length || !fy.length) return { x: [0, 1], y: [0, 1] }
  let y0 = Math.min(...fy)
  let y1 = Math.max(...fy)
  const pad = (y1 - y0) * 0.08 || Math.abs(y1) * 0.1 || 1
  if (!(f.zero && y0 >= 0)) y0 -= pad
  y1 += pad
  return { x: [Math.min(...fx), Math.max(...fx)], y: [y0, y1] }
}

/**
 * A row for each axis label so that none overlaps another (rows 0–3: above
 * the line, below it, then further out each way): left to right, each label
 * takes the first row whose last label is at least `gap` pixels away.
 */
export function labelRows(xs: number[], gap: number): number[] {
  const order = xs.map((x, k) => ({ x, k })).sort((a, b) => a.x - b.x)
  const last: number[] = []
  const out = new Array<number>(xs.length).fill(0)
  for (const { x, k } of order) {
    let row = last.findIndex(l => x - l >= gap)
    if (row < 0) row = last.length < 4 ? last.length : 0
    last[row] = x
    out[k] = row
  }
  return out
}
