import { describe, it, expect } from 'vitest'
import { RESEARCH_METRICS, metricDef, isKnownMetric, metricOrder } from './researchMetrics'

describe('metricDef', () => {
  it('resolves a known metric', () => {
    expect(metricDef('combined_ratio')?.label).toBe('Combined ratio')
    expect(metricDef('mct_ratio')?.betterDirection).toBe('higher')
  })

  it('returns undefined for an unknown metric', () => {
    expect(metricDef('not_a_metric')).toBeUndefined()
    expect(isKnownMetric('not_a_metric')).toBe(false)
  })
})

describe('formatting', () => {
  it('formats percentage metrics to one decimal', () => {
    expect(metricDef('combined_ratio')!.format(95.63)).toBe('95.6%')
  })

  it('formats premium volume as CAD millions', () => {
    expect(metricDef('net_written_premium')!.format(12345)).toBe('$12,345M')
  })
})

describe('catalog integrity', () => {
  it('has unique metric names', () => {
    const names = RESEARCH_METRICS.map(m => m.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('orders metrics by catalog position', () => {
    expect(metricOrder('combined_ratio')).toBeLessThan(metricOrder('net_written_premium'))
    expect(metricOrder('unknown')).toBe(Number.MAX_SAFE_INTEGER)
  })
})
