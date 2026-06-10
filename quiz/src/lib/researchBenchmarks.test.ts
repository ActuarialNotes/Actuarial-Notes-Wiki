import { describe, it, expect } from 'vitest'
import { buildChartData, summarizeBySeries, seriesKey, type MetricRow } from './researchBenchmarks'

// National (unsegmented) rows: province + line null.
function nat(agent_id: string, value: number, period: string): MetricRow {
  return { agent_id, value, period, province: null, line_of_business: null }
}

const rows: MetricRow[] = [
  nat('intact-financial', 95.6, 'FY2023'),
  nat('intact-financial', 93.1, 'FY2022'),
  nat('intact-financial', 91.0, 'FY2021'),
  nat('aviva-canada', 97.2, 'FY2023'),
]

describe('seriesKey', () => {
  it('combines agent, province and line into a stable identity', () => {
    expect(seriesKey({ agent_id: 'intact-financial', province: 'ON', line_of_business: 'personal_auto' }))
      .toBe('intact-financial|ON|personal_auto')
  })

  it('treats null province/line as empty segments', () => {
    expect(seriesKey({ agent_id: 'intact-financial', province: null, line_of_business: null }))
      .toBe('intact-financial||')
  })
})

describe('buildChartData', () => {
  it('pivots rows into one point per period ordered chronologically', () => {
    const { points, seriesKeys } = buildChartData(rows)
    expect(points.map(p => p.period)).toEqual(['FY2021', 'FY2022', 'FY2023'])
    expect(seriesKeys).toContain('intact-financial||')
    expect(points[2]['intact-financial||']).toBe(95.6)
    expect(points[2]['aviva-canada||']).toBe(97.2)
  })

  it('leaves a sparse cell undefined when a series has no value for a period', () => {
    const { points } = buildChartData(rows)
    expect(points[0]['aviva-canada||']).toBeUndefined()
  })

  it('keeps province/line-segmented rows of the same agent as distinct series', () => {
    // National + two provincial figures for one agent in the same period must
    // NOT collapse into a single agent-keyed cell.
    const segmented: MetricRow[] = [
      { agent_id: 'intact-financial', value: 70, period: 'FY2023', province: 'ON', line_of_business: 'personal_auto' },
      { agent_id: 'intact-financial', value: 62, period: 'FY2023', province: 'AB', line_of_business: 'personal_auto' },
      nat('intact-financial', 66, 'FY2023'),
    ]
    const { points, seriesKeys } = buildChartData(segmented)
    expect(seriesKeys).toHaveLength(3)
    expect(points).toHaveLength(1)
    expect(points[0]['intact-financial|ON|personal_auto']).toBe(70)
    expect(points[0]['intact-financial|AB|personal_auto']).toBe(62)
    expect(points[0]['intact-financial||']).toBe(66)
  })
})

describe('summarizeBySeries', () => {
  it('picks latest and prior by period order, not array order', () => {
    const [intact] = summarizeBySeries(rows).filter(s => s.agentId === 'intact-financial')
    expect(intact.latest).toEqual({ value: 95.6, period: 'FY2023' })
    expect(intact.previous).toEqual({ value: 93.1, period: 'FY2022' })
    expect(intact.delta).toBeCloseTo(2.5)
    expect(intact.deltaPct).toBeCloseTo((2.5 / 93.1) * 100)
  })

  it('returns null deltas for a single-period series', () => {
    const [aviva] = summarizeBySeries(rows).filter(s => s.agentId === 'aviva-canada')
    expect(aviva.previous).toBeNull()
    expect(aviva.delta).toBeNull()
    expect(aviva.deltaPct).toBeNull()
  })

  it('guards divide-by-zero when the prior value is 0', () => {
    const zeroRows: MetricRow[] = [nat('x', 0, 'FY2022'), nat('x', 5, 'FY2023')]
    const [x] = summarizeBySeries(zeroRows)
    expect(x.delta).toBe(5)
    expect(x.deltaPct).toBeNull()
  })

  it('includes the full chronological series for the sparkline', () => {
    const [intact] = summarizeBySeries(rows).filter(s => s.agentId === 'intact-financial')
    expect(intact.series.map(p => p.value)).toEqual([91.0, 93.1, 95.6])
  })

  it('summarizes each agent×province×line scope independently', () => {
    const segmented: MetricRow[] = [
      { agent_id: 'intact-financial', value: 72, period: 'FY2022', province: 'ON', line_of_business: 'personal_auto' },
      { agent_id: 'intact-financial', value: 70, period: 'FY2023', province: 'ON', line_of_business: 'personal_auto' },
      { agent_id: 'intact-financial', value: 64, period: 'FY2023', province: 'AB', line_of_business: 'personal_auto' },
    ]
    const summaries = summarizeBySeries(segmented)
    expect(summaries).toHaveLength(2)
    const on = summaries.find(s => s.seriesKey === 'intact-financial|ON|personal_auto')!
    expect(on.province).toBe('ON')
    expect(on.lineOfBusiness).toBe('personal_auto')
    expect(on.latest).toEqual({ value: 70, period: 'FY2023' })
    expect(on.delta).toBeCloseTo(-2)
    const ab = summaries.find(s => s.seriesKey === 'intact-financial|AB|personal_auto')!
    expect(ab.previous).toBeNull()
  })
})
