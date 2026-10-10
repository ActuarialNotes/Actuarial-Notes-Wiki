import { describe, expect, it } from 'vitest'
import { runTool, toolById, type TableField } from '@/lib/tools'
import {
  COLUMN_SOURCES,
  SCALAR_SOURCES,
  fillColumn,
  formatCell,
  mapColumn,
  nudge,
  parseScale,
  setColumn,
  sliderRange,
  stepFor,
} from './toolColumns'

describe('formatCell', () => {
  it('prints a typed number as its column does', () => {
    expect(formatCell('1700', 'money')).toBe('1,700')
    expect(formatCell(1234.5, 'money')).toBe('1,234.5')
    expect(formatCell('1.6995', 'factor')).toBe('1.6995')
    expect(formatCell(0.05, 'percent')).toBe('5%')
    expect(formatCell('1700*1.05', 'money')).toBe('1,785')
  })
  it('leaves what it cannot read as typed', () => {
    expect(formatCell('lots', 'money')).toBe('lots')
    expect(formatCell('', 'money')).toBe('')
    expect(formatCell(null, 'money')).toBe('')
  })
})

describe('steps and ranges', () => {
  it('nudges a factor in the third decimal and an amount by about 1%', () => {
    expect(stepFor('factor', 1.7)).toBe(0.001)
    expect(stepFor('money', 1950)).toBe(10)
    expect(stepFor('money', 50)).toBe(1)
    expect(nudge(1.6995, 'factor', 1)).toBe(1.7005)
    expect(nudge(0.05, 'percent', -1)).toBe(0.0475)
  })
  it('centres the slider on the value', () => {
    const r = sliderRange('factor', 1.5)
    expect(r.min).toBeCloseTo(1.35)
    expect(r.max).toBeCloseTo(1.65)
    expect(sliderRange('money', 0).min).toBe(0)
  })
})

describe('column operations', () => {
  const rows = [{ cdf: '1.1' }, { cdf: 1.5 }, { cdf: '' }]
  it('scales by a multiplier, a percent change or an addition', () => {
    expect(parseScale('×1.05')!(100)).toBeCloseTo(105)
    expect(parseScale('1.05')!(100)).toBeCloseTo(105)
    expect(parseScale('+5%')!(100)).toBeCloseTo(105)
    expect(parseScale('-10%')!(100)).toBeCloseTo(90)
    expect(parseScale('+100')!(100)).toBe(200)
    expect(parseScale('lots')).toBeNull()
  })
  it('maps, sets and fills a column, leaving blanks alone', () => {
    expect(mapColumn(rows, 'cdf', 'factor', n => n * 2).map(r => r.cdf)).toEqual([2.2, 3, ''])
    expect(setColumn(rows, 'cdf', 1).map(r => r.cdf)).toEqual([1, 1, 1])
    expect(fillColumn(rows, 'cdf', [2, null, 3]).map(r => r.cdf)).toEqual([2, 1.5, 3])
  })
})

describe('sources', () => {
  it('names only real tools, fields and columns', () => {
    for (const [key, sources] of Object.entries(COLUMN_SOURCES)) {
      const [tool, column] = key.split(':')
      const spec = toolById(tool)!
      expect(spec, key).toBeDefined()
      const grid = spec.fields.find(f => f.kind === 'table') as TableField
      expect(grid.columns.map(c => c.key), key).toContain(column)
      for (const s of sources) expect(toolById(s.tool), s.tool).toBeDefined()
    }
    for (const [key, sources] of Object.entries(SCALAR_SOURCES)) {
      const [tool, field] = key.split(':')
      expect(toolById(tool)!.fields.map(f => f.key), key).toContain(field)
      for (const s of sources) expect(toolById(s.tool), s.tool).toBeDefined()
    }
  })

  it('fills BF\'s CDFs from Development to Ultimate by position', () => {
    const [source] = COLUMN_SOURCES['reserving.bornhuetter_ferguson:cdf']
    const result = runTool(toolById(source.tool)!, {})
    const cdfs = result.values.cdfs as number[]
    const rows = ['2020', '2021', '2022', '2023'].map(origin => ({ origin }))
    expect(source.take(result, rows)).toEqual([cdfs[3], cdfs[2], cdfs[1], cdfs[0]])
    // An origin older than every age takes the tail.
    const more = ['2018', ...rows.map(r => r.origin)].map(origin => ({ origin }))
    expect(source.take(result, more)[0]).toBe(cdfs[cdfs.length - 1])
  })

  it('fills BF\'s expected claims from Expected Claims, by origin', () => {
    const [source] = COLUMN_SOURCES['reserving.bornhuetter_ferguson:expected']
    const rows = [{ origin: '2020' }, { origin: '2021' }, { origin: '2022' }, { origin: '2023' }]
    const result = runTool(toolById(source.tool)!, source.prefill!(rows))
    const values = source.take(result, rows)
    expect(values).toEqual(result.values.expected)
    expect(values.every(v => typeof v === 'number')).toBe(true)
  })

  it('fills the latest values from the triangle\'s diagonal', () => {
    const [source] = COLUMN_SOURCES['reserving.chain_ladder:latest']
    const result = runTool(toolById(source.tool)!, {})
    expect(source.take(result, [{ origin: '2023' }, { origin: '2020' }])).toEqual([1300, 1700])
  })

  it('fills the selected factors from the age-to-age averages, by age', () => {
    const [source] = COLUMN_SOURCES['reserving.development_to_ultimate:factor']
    const result = runTool(toolById(source.tool)!, {})
    const taken = source.take(result, [{ age: 12 }, { age: 24 }, { age: 36 }, { age: 48 }])
    expect(taken[0]).toBeCloseTo((1500 + 1700 + 1800) / (1000 + 1100 + 1200))
    expect(taken[3]).toBeNull()
  })

  it('takes a scalar from its source tool', () => {
    const [source] = SCALAR_SOURCES['ratemaking.trend_factor:trend']
    const result = runTool(toolById(source.tool)!, {})
    expect(source.take(result)).toBe(result.values.trend)
  })
})

describe('candidates', () => {
  it('offers each distinct average of an interval\'s factors', async () => {
    const { averageCandidates } = await import('./toolColumns')
    const spec = toolById('reserving.age_to_age_factors')!
    const input = { triangle: (spec.fields[0] as { default: unknown }).default } as never
    const chips = averageCandidates(input, 12)
    expect(chips[0]).toEqual({ label: 'Vol-wtd all', value: (1500 + 1700 + 1800) / (1000 + 1100 + 1200) })
    // Averages that agree to four decimals are offered once (here simple all ≈ volume-weighted).
    expect(chips.map(c => c.label)).toEqual(['Vol-wtd all', 'Medial 5', 'Geometric 4'])
    // The last age has no factor to the next.
    expect(averageCandidates(input, 48)).toEqual([])
  })

  it('offers a CDF cell the last Development to Ultimate run\'s CDF at its position', async () => {
    const { cellCandidates } = await import('./toolColumns')
    const rows = [{ origin: '2022' }, { origin: '2023' }]
    const last = (id: string) => (id === 'reserving.development_to_ultimate' ? {} : undefined)
    const chips = cellCandidates('reserving.bornhuetter_ferguson', 'cdf', rows, 1, last as never)
    const cdfs = runTool(toolById('reserving.development_to_ultimate')!, {}).values.cdfs as number[]
    expect(chips).toEqual([{ label: 'Last CDFs', value: cdfs[0] }])
    expect(cellCandidates('reserving.bornhuetter_ferguson', 'cdf', rows, 1, () => undefined)).toEqual([])
  })
})

describe('the selection grid', () => {
  it('lays out every average at every interval, from the engine', async () => {
    const { averageRows, selectionsToFactors } = await import('./toolColumns')
    const spec = toolById('reserving.age_to_age_factors')!
    const input = { triangle: (spec.fields[0] as { default: unknown }).default } as never
    const rows = averageRows(input)
    expect(rows.map(r => r.label)).toEqual(['Vol-wtd all', 'Vol-wtd 3', 'Vol-wtd 5', 'Simple all', 'Simple 5', 'Medial 5', 'Geometric 4'])
    expect(rows[0].values).toEqual(runTool(spec, input).values.averages)
    const factors = selectionsToFactors([12, 24, 36, 48], rows[0].values, [null, { value: 1.2, from: 'Simple all' }, null])
    expect(factors.factors).toEqual([
      { age: 12, factor: rows[0].values[0] },
      { age: 24, factor: 1.2 },
      { age: 36, factor: rows[0].values[2] },
      { age: 48, factor: null },
    ])
  })
})

describe('data sources as sources', () => {
  it('takes a trend from a price index and a rate from the yield curve, through the engine', async () => {
    const { SCALAR_SOURCES } = await import('./toolColumns')
    const [, fromIndex] = SCALAR_SOURCES['ratemaking.trend_factor:trend']
    const idx = runTool(toolById('data.price_index')!, {})
    expect(fromIndex.take(idx)).toBe(idx.values.annual_change)
    const [fromCurve] = SCALAR_SOURCES['finance.present_value:i']
    const curve = runTool(toolById('data.yield_curve')!, {})
    const y = Number(curve.values.yield)
    expect(fromCurve.take(curve)).toBeCloseTo((1 + y / 2) ** 2 - 1, 12)
  })
})
