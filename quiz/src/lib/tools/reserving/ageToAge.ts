import type { TableRow, ToolSpec, Triangle } from '../types'

const AVERAGES = [
  { value: 'volume_all', label: 'Volume, all' },
  { value: 'simple_all', label: 'Simple, all' },
  { value: 'volume_3', label: 'Volume, latest 3' },
  { value: 'simple_3', label: 'Simple, latest 3' },
  { value: 'medial_5', label: 'Medial, latest 5' },
  { value: 'geometric_all', label: 'Geometric, all' },
]

/** What each average is, for the trace and an agent reading the schema. */
const AVERAGE_MEANING: Record<string, string> = {
  volume_all: 'volume-weighted over all origins',
  simple_all: 'simple mean over all origins',
  volume_3: 'volume-weighted over the latest 3 origins',
  simple_3: 'simple mean over the latest 3 origins',
  medial_5: 'mean of the latest 5, excluding the highest and lowest',
  geometric_all: 'geometric mean over all origins',
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

/** The chosen average of one interval's factors, or null when there are none to average. */
export function averageFactor(pairs: Pair[], kind: string): number | null {
  if (!pairs.length) return null
  const latest = (n: number) => pairs.slice(-n)
  const simple = (ps: Pair[]) => ps.reduce((s, p) => s + p.factor, 0) / ps.length
  const volume = (ps: Pair[]) => ps.reduce((s, p) => s + p.to, 0) / ps.reduce((s, p) => s + p.from, 0)
  switch (kind) {
    case 'simple_all': return simple(pairs)
    case 'volume_3': return volume(latest(3))
    case 'simple_3': return simple(latest(3))
    case 'medial_5': {
      const ps = latest(5)
      if (ps.length < 3) return simple(ps)
      const sorted = [...ps].sort((a, b) => a.factor - b.factor)
      return simple(sorted.slice(1, -1))
    }
    case 'geometric_all': return Math.exp(pairs.reduce((s, p) => s + Math.log(p.factor), 0) / pairs.length)
    default: return volume(pairs)
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
      kind: 'choice', key: 'average', label: 'Average', judgment: true, options: AVERAGES, default: 'volume_all',
      description: `Which average of each interval's factors to take: ${AVERAGES.map(a => `${a.value} (${AVERAGE_MEANING[a.value]})`).join(', ')}.`,
    },
  ],
  notation: () => 'fⱼ = Cᵢ,ⱼ₊₁ / Cᵢ,ⱼ',
  view: 'table',
  compute: input => {
    const tri = input.triangle as Triangle
    const kind = String(input.average)
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
      return averageFactor(pairs, kind)
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
        const formula = kind.startsWith('volume')
          ? `Σ C(${tri.ages[j + 1]}) / Σ C(${tri.ages[j]}) over ${kind === 'volume_3' ? Math.min(3, pairs.length) : pairs.length} origins`
          : `${AVERAGE_MEANING[kind] ?? kind}, ${pairs.length} factors`
        return [{ label: `Average ${label}`, formula, result: averages[k]!, unit: 'factor' as const }]
      }),
      warnings,
      values: { intervals: intervals.map(i => i.label), ages: tri.ages, averages, factors: rows },
      summary: `Age-to-age averages (${AVERAGE_MEANING[kind] ?? kind}): ${shown.join(', ')}.`,
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
