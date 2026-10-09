import type { TableRow, ToolSpec, Triangle } from '../types'

const AVERAGES = [
  { value: 'volume', label: 'Volume-weighted' },
  { value: 'simple', label: 'Simple' },
  { value: 'medial', label: 'Medial' },
  { value: 'geometric', label: 'Geometric' },
]

/** What each average is, for the trace and an agent reading the schema. */
const AVERAGE_MEANING: Record<string, string> = {
  volume: 'the sum of the later values over the sum of the earlier ones (volume-weighted)',
  simple: 'the simple mean of the factors',
  medial: 'the simple mean with the highest and lowest factor left out (with fewer than three, the simple mean)',
  geometric: 'the geometric mean of the factors',
}

/** "volume-weighted, latest 5" — the average as the trace and the summary name it. */
export function averageName(method: string, latest: number): string {
  const name = AVERAGES.find(a => a.value === method)?.label.toLowerCase() ?? method
  return `${name}, ${latest > 0 ? `latest ${latest}` : 'all years'}`
}

/** The interval a factor spans, "12–24". */
export const intervalLabel = (from: number, to: number) => `${from}–${to}`

interface Pair { factor: number; from: number; to: number }

/** Every origin's factor from age j to j + 1, oldest origin first. */
export function factorsAt(tri: Triangle, j: number): Pair[] {
  const out: Pair[] = []
  for (const row of tri.values) {
    const from = row[j]
    const to = row[j + 1]
    if (from == null || to == null || from === 0) continue
    out.push({ factor: to / from, from, to })
  }
  return out
}

/**
 * The chosen average of one interval's factors over its latest `latest`
 * origins (all of them at 0), or null when there are none to average. Medial
 * drops the one highest and one lowest factor, as Friedland's "Latest 5x1"
 * does, and with fewer than three factors is the simple mean (Friedland,
 * Chapter 7, Exhibit I's footnote).
 */
export function averageFactor(pairs: Pair[], method: string, latest = 0): number | null {
  const ps = latest > 0 ? pairs.slice(-latest) : pairs
  if (!ps.length) return null
  const simple = (xs: Pair[]) => xs.reduce((s, p) => s + p.factor, 0) / xs.length
  switch (method) {
    case 'simple':
      return simple(ps)
    case 'medial': {
      if (ps.length < 3) return simple(ps)
      const sorted = [...ps].sort((a, b) => a.factor - b.factor)
      return simple(sorted.slice(1, -1))
    }
    case 'geometric':
      return Math.exp(ps.reduce((s, p) => s + Math.log(p.factor), 0) / ps.length)
    default:
      return ps.reduce((s, p) => s + p.to, 0) / ps.reduce((s, p) => s + p.from, 0)
  }
}

export const ageToAgeFactors: ToolSpec = {
  id: 'reserving.age_to_age_factors',
  version: '1.0.0',
  name: 'Age-to-Age Factors',
  area: 'reserving',
  answers: 'How has each origin developed between ages, and what is the average at each age?',
  fields: [
    {
      kind: 'triangle', key: 'triangle', label: 'Cumulative triangle',
      description: 'A cumulative development triangle: origins (accident years) down, evaluation ages in months across, null below the diagonal.',
      default: {
        origins: ['2020', '2021', '2022', '2023'],
        ages: [12, 24, 36, 48],
        values: [
          [1000, 1500, 1650, 1700],
          [1100, 1700, 1850, null],
          [1200, 1800, null, null],
          [1300, null, null, null],
        ],
      },
    },
    {
      kind: 'choice', key: 'average', label: 'Average', judgment: true, options: AVERAGES, default: 'volume',
      description: `Which average of each interval's factors to take: ${AVERAGES.map(a => `${a.value} (${AVERAGE_MEANING[a.value]})`).join('; ')}.`,
    },
    {
      kind: 'number', key: 'latest', label: 'Latest years', symbol: 'n', unit: 'count', integer: true, judgment: true,
      min: 0, max: 100, sliderMax: 10, step: 1, default: 0, zeroLabel: 'All',
      description: 'Average over the latest n origins at each age (the most recent diagonals). 0 averages every origin.',
    },
  ],
  notation: () => 'fⱼ = Cᵢ,ⱼ₊₁ / Cᵢ,ⱼ',
  view: 'table',
  compute: input => {
    const tri = input.triangle as Triangle
    const method = String(input.average)
    const latest = Number(input.latest)
    const named = averageName(method, latest)
    const intervals = tri.ages.slice(0, -1).map((age, j) => ({ j, label: intervalLabel(age, tri.ages[j + 1]) }))
    const rows: TableRow[] = tri.origins.map((origin, o) => {
      const row: TableRow = { origin }
      for (const { j, label } of intervals) {
        const from = tri.values[o][j]
        const to = tri.values[o][j + 1]
        row[label] = from != null && to != null && from !== 0 ? to / from : null
      }
      return row
    })
    const warnings: string[] = []
    const averages: (number | null)[] = intervals.map(({ j, label }) => {
      const pairs = factorsAt(tri, j)
      if (pairs.length === 1) warnings.push(`The ${label} factor rests on one origin.`)
      return averageFactor(pairs, method, latest)
    })
    const footer: TableRow = { origin: 'Average' }
    intervals.forEach(({ label }, k) => { footer[label] = averages[k] })
    const shown = intervals
      .map(({ label }, k) => (averages[k] == null ? null : `${label} ${averages[k]!.toFixed(4)}`))
      .filter(Boolean)
    return {
      tiles: [],
      table: {
        columns: [
          { key: 'origin', label: 'Origin', kind: 'text' },
          ...intervals.map(({ label }) => ({ key: label, label, kind: 'number' as const, unit: 'factor' as const, computed: true })),
        ],
        rows,
        footer,
      },
      trace: intervals.flatMap(({ j, label }, k) => {
        const pairs = factorsAt(tri, j)
        if (!pairs.length || averages[k] == null) return []
        const used = latest > 0 ? Math.min(latest, pairs.length) : pairs.length
        const formula = method === 'volume'
          ? `Σ C(${tri.ages[j + 1]}) / Σ C(${tri.ages[j]}) over ${used} origin${used === 1 ? '' : 's'}`
          : `${named}: ${used} factor${used === 1 ? '' : 's'}`
        return [{ label: `Average ${label}`, formula, result: averages[k]!, unit: 'factor' as const }]
      }),
      warnings,
      values: { intervals: intervals.map(i => i.label), ages: tri.ages, averages, factors: rows },
      summary: `Age-to-age averages (${named}): ${shown.join(', ')}.`,
    }
  },
  method: {
    concepts: ['Age to Age Factor', 'Development Factor'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 7' }],
  },
  next: [
    {
      tool: 'reserving.development_to_ultimate',
      label: 'Development to Ultimate',
      build: (input, output) => {
        const tri = input.triangle as Triangle
        const averages = output.values.averages as (number | null)[]
        return {
          factors: tri.ages.map((age, j) => ({ age, factor: j < averages.length ? averages[j] ?? 1 : null })),
        }
      },
    },
  ],
}
