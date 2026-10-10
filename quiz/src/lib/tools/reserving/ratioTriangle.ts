import { formatValue } from '../format'
import { ToolInputError, type TableColumn, type TableRow, type ToolSpec, type Triangle } from '../types'

const example = (values: (number | null)[][]): Triangle => ({ origins: ['2021', '2022', '2023'], ages: [12, 24, 36], values })

export const ratioTriangle: ToolSpec = {
  id: 'reserving.ratio_triangle',
  version: '1.0.0',
  name: 'Ratio Triangle',
  area: 'reserving',
  answers: 'How does one triangle compare with another, cell by cell?',
  fields: [
    {
      kind: 'triangle', key: 'numerator', label: 'Numerator',
      description: 'The triangle on top: paid claims for paid-to-reported, closed counts for closed-to-reported, case outstanding for the average case.',
      default: example([[400, 1000, 1500], [450, 1100, null], [500, null, null]]),
    },
    {
      kind: 'triangle', key: 'denominator', label: 'Denominator',
      description: 'The triangle beneath, of the same shape: reported claims, reported counts, open counts.',
      default: example([[1000, 1500, 1650], [1100, 1700, null], [1200, null, null]]),
    },
  ],
  notation: () => 'Rᵢⱼ = Aᵢⱼ / Bᵢⱼ',
  view: 'table',
  compute: input => {
    const A = input.numerator as Triangle
    const B = input.denominator as Triangle
    if (A.values.length !== B.values.length || A.values.some((r, i) => r.length !== B.values[i].length)) {
      throw new ToolInputError('denominator', `The two triangles must be the same shape: ${A.values.length} origins by ${A.values[0].length} ages, and ${B.values.length} by ${B.values[0].length}.`)
    }
    const warnings: string[] = []
    const ratios = A.values.map((row, i) => row.map((a, j) => {
      const b = B.values[i][j]
      if (a === null || b === null) {
        if (a !== b) throw new ToolInputError('denominator', `Origin ${A.origins[i]} has a value at ${A.ages[j]} in one triangle and not the other.`)
        return null
      }
      if (b === 0) {
        warnings.push(`Origin ${A.origins[i]} at ${A.ages[j]}: the denominator is 0, so the ratio is left blank.`)
        return null
      }
      return a / b
    }))
    const ageKey = (age: number) => String(age)
    const columns: TableColumn[] = [
      { key: 'origin', label: 'Origin', kind: 'text' },
      ...A.ages.map(age => ({ key: ageKey(age), label: String(age), kind: 'number' as const, unit: 'factor' as const })),
    ]
    const rows: TableRow[] = A.origins.map((origin, i) => Object.assign({ origin }, Object.fromEntries(A.ages.map((age, j) => [ageKey(age), ratios[i][j]]))))
    // The all-origin ratio at each age: the column totals' ratio, so each origin weighs by its size.
    const pooled = A.ages.map((_, j) => {
      let a = 0
      let b = 0
      A.values.forEach((row, i) => {
        if (row[j] !== null && B.values[i][j] !== null) {
          a += row[j]!
          b += B.values[i][j]!
        }
      })
      return b === 0 ? null : a / b
    })
    const latest = ratios.map(row => [...row].reverse().find(r => r !== null) ?? null)
    return {
      tiles: [
        { symbol: 'R', label: `Latest, ${A.origins[A.origins.length - 1]}`, value: latest[latest.length - 1] ?? NaN, unit: 'factor' },
        { symbol: 'R̄', label: `All origins at ${A.ages[0]}`, value: pooled[0] ?? NaN, unit: 'factor' },
      ],
      table: {
        columns: columns.map((c, k) => (k === 0 ? c : { ...c, computed: true })),
        rows,
        footer: Object.assign({ origin: 'All origins' }, Object.fromEntries(A.ages.map((age, j) => [ageKey(age), pooled[j]]))),
      },
      trace: A.ages.map((age, j) => ({ label: `All origins at ${age}`, formula: 'Σ A / Σ B down the column', result: pooled[j] ?? NaN, unit: 'factor' as const })),
      warnings,
      values: { ratios, pooled, latest },
      summary: `Ratio triangle of ${A.origins.length} origins; the latest origin's ratio is ${formatValue(latest[latest.length - 1] ?? NaN, 'factor')}.`,
    }
  },
  method: {
    concepts: ['Development Triangle', 'Data Diagnostic Analysis'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 6' }],
  },
}
