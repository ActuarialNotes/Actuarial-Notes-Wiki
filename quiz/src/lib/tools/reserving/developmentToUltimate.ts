import { ToolInputError, type TableRow, type ToolSpec } from '../types'

export const developmentToUltimate: ToolSpec = {
  id: 'reserving.development_to_ultimate',
  version: '1.0.0',
  name: 'Development to Ultimate',
  area: 'reserving',
  answers: 'What are the cumulative development factors to ultimate?',
  fields: [
    { kind: 'number', key: 'tail', label: 'Tail factor', symbol: 'T', unit: 'factor', judgment: true, min: 0.5, max: 5, sliderMax: 1.5, step: 0.001, default: 1, description: 'Development beyond the last age. 1 assumes none.' },
    {
      kind: 'table', key: 'factors', label: 'Selected factors', minRows: 1, maxRows: 60,
      description: 'Each evaluation age with the selected age-to-age factor from it to the next age. Leave the last age\'s factor blank: only the tail develops it.',
      columns: [
        { key: 'age', label: 'Age', kind: 'number', unit: 'count' },
        { key: 'factor', label: 'Factor to next', kind: 'number', unit: 'factor', optional: true },
      ],
      default: [
        { age: 12, factor: 1.5 },
        { age: 24, factor: 1.1 },
        { age: 36, factor: 1.03 },
        { age: 48, factor: null },
      ],
    },
  ],
  notation: () => 'CDFⱼ = fⱼ · fⱼ₊₁ ⋯ · T',
  view: 'table',
  grid: 'factors',
  compute: input => {
    const tail = Number(input.tail)
    const rows = input.factors as TableRow[]
    rows.forEach((r, k) => {
      if (r.factor == null && k < rows.length - 1) {
        throw new ToolInputError('factors', `Age ${r.age} has no factor. Only the last age may be left blank.`)
      }
      if (r.factor != null && Number(r.factor) <= 0) throw new ToolInputError('factors', `Age ${r.age}'s factor must be positive.`)
    })
    const cdfs: number[] = new Array(rows.length)
    let running = tail
    for (let k = rows.length - 1; k >= 0; k--) {
      running *= rows[k].factor == null ? 1 : Number(rows[k].factor)
      cdfs[k] = running
    }
    const out = rows.map((r, k) => Object.assign({}, r, { cdf: cdfs[k], developed: 1 / cdfs[k] }))
    const warnings = rows.some(r => r.factor != null && Number(r.factor) < 1)
      ? ['A factor below 1 develops downward: usual for reported claims with redundant case reserves, unusual for paid.']
      : []
    return {
      tiles: [
        { symbol: `CDF${rows[0].age}`, label: 'First age', value: cdfs[0], unit: 'factor' },
        { symbol: 'T', label: 'Tail', value: tail, unit: 'factor' },
      ],
      table: {
        columns: [
          { key: 'age', label: 'Age', kind: 'number', unit: 'count' },
          { key: 'factor', label: 'Factor to next', kind: 'number', unit: 'factor', optional: true },
          { key: 'cdf', label: 'CDF', kind: 'number', unit: 'factor', computed: true },
          { key: 'developed', label: '% developed', kind: 'number', unit: 'percent', computed: true },
        ],
        rows: out,
      },
      trace: out.map(r => ({
        label: `CDF at ${r.age}`,
        formula: r.factor == null ? 'T' : `${Number(r.factor).toFixed(4)} × CDF at the next age`,
        result: r.cdf,
        unit: 'factor' as const,
      })),
      warnings,
      values: { ages: rows.map(r => r.age), cdfs, percent_developed: out.map(r => r.developed), tail },
    }
  },
  method: {
    concepts: ['Cumulative Development Factor', 'Tail Factor'],
    readings: [{ resource: 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)', locator: 'Ch. 7' }],
  },
}
