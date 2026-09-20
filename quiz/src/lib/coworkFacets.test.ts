import { describe, it, expect } from 'vitest'
import { FACET_AXES, facetCount, facetLabel, facetPills } from './coworkFacets'

describe('the facet catalogue', () => {
  it('carries the five axes a deliverable is described by', () => {
    expect(FACET_AXES.map(a => a.key)).toEqual([
      'practiceArea',
      'function',
      'audience',
      'driver',
      'timeOrientation',
    ])
  })

  it('gives every value a label and a line explaining it', () => {
    for (const axis of FACET_AXES) {
      expect(axis.values.length).toBeGreaterThan(1)
      for (const value of axis.values) {
        expect(value.label).not.toBe('')
        expect(value.description).not.toBe('')
      }
    }
  })

  it('has no duplicate value ids within an axis', () => {
    for (const axis of FACET_AXES) {
      const ids = axis.values.map(v => v.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })
})

describe('facetLabel', () => {
  it('names a known value', () => {
    expect(facetLabel('function', 'financial-reporting')).toBe('Financial reporting')
  })

  it('falls back to the raw id rather than showing nothing', () => {
    expect(facetLabel('function', 'nonsense')).toBe('nonsense')
  })
})

describe('facetPills', () => {
  it('reads in facet order, not in the order the answers arrived', () => {
    const pills = facetPills({ timeOrientation: 'prospective', practiceArea: 'pc' })
    expect(pills.map(p => p.key)).toEqual(['practiceArea', 'timeOrientation'])
  })

  it('skips an axis that has not been answered', () => {
    expect(facetPills({ practiceArea: 'pc' })).toHaveLength(1)
  })

  it('is empty for a deliverable that has answered nothing', () => {
    expect(facetPills({})).toHaveLength(0)
  })
})

describe('facetCount', () => {
  it('counts the axes pinned down', () => {
    expect(facetCount({})).toBe(0)
    expect(facetCount({ practiceArea: 'pc', audience: 'regulator' })).toBe(2)
  })
})
