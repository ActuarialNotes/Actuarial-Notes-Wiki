import { describe, it, expect } from 'vitest'
import { buildChartData, summarizeByAgent, type MetricRow } from './researchBenchmarks'

const rows: MetricRow[] = [
  { agent_id: 'intact-financial', value: 95.6, period: 'FY2023' },
  { agent_id: 'intact-financial', value: 93.1, period: 'FY2022' },
  { agent_id: 'intact-financial', value: 91.0, period: 'FY2021' },
  { agent_id: 'aviva-canada', value: 97.2, period: 'FY2023' },
]

describe('buildChartData', () => {
  it('pivots rows into one point per period ordered chronologically', () => {
    const { points, agentIds } = buildChartData(rows)
    expect(points.map(p => p.period)).toEqual(['FY2021', 'FY2022', 'FY2023'])
    expect(agentIds).toContain('intact-financial')
    expect(points[2]['intact-financial']).toBe(95.6)
    expect(points[2]['aviva-canada']).toBe(97.2)
  })

  it('leaves a sparse cell undefined when an agent has no value for a period', () => {
    const { points } = buildChartData(rows)
    expect(points[0]['aviva-canada']).toBeUndefined()
  })
})

describe('summarizeByAgent', () => {
  it('picks latest and prior by period order, not array order', () => {
    const [intact] = summarizeByAgent(rows).filter(s => s.agentId === 'intact-financial')
    expect(intact.latest).toEqual({ value: 95.6, period: 'FY2023' })
    expect(intact.previous).toEqual({ value: 93.1, period: 'FY2022' })
    expect(intact.delta).toBeCloseTo(2.5)
    expect(intact.deltaPct).toBeCloseTo((2.5 / 93.1) * 100)
  })

  it('returns null deltas for a single-period agent', () => {
    const [aviva] = summarizeByAgent(rows).filter(s => s.agentId === 'aviva-canada')
    expect(aviva.previous).toBeNull()
    expect(aviva.delta).toBeNull()
    expect(aviva.deltaPct).toBeNull()
  })

  it('guards divide-by-zero when the prior value is 0', () => {
    const zeroRows: MetricRow[] = [
      { agent_id: 'x', value: 0, period: 'FY2022' },
      { agent_id: 'x', value: 5, period: 'FY2023' },
    ]
    const [x] = summarizeByAgent(zeroRows)
    expect(x.delta).toBe(5)
    expect(x.deltaPct).toBeNull()
  })

  it('includes the full chronological series for the sparkline', () => {
    const [intact] = summarizeByAgent(rows).filter(s => s.agentId === 'intact-financial')
    expect(intact.series.map(p => p.value)).toEqual([91.0, 93.1, 95.6])
  })
})
