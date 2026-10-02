import { describe, it, expect } from 'vitest'
import { orderConceptsForPlan, type OrderableConcept } from './studyPlanOrder'

function concept(name: string, numericWeight = 10): OrderableConcept {
  return { name, numericWeight }
}

describe('orderConceptsForPlan — strong_all', () => {
  it('keeps syllabus order, whatever the names are alphabetically', () => {
    const concepts = [concept('Zeta'), concept('Alpha'), concept('Mu')]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_all' })
    expect(ordered.map(c => c.name)).toEqual(['Zeta', 'Alpha', 'Mu'])
  })

  it('ignores topic weight — a light topic taught first is still taught first', () => {
    const concepts = [concept('First', 5), concept('Second', 50)]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_all' })
    expect(ordered.map(c => c.name)).toEqual(['First', 'Second'])
  })

  it('returns a copy, leaving the caller\'s array untouched', () => {
    const concepts = [concept('A'), concept('B')]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_all' })
    expect(ordered).not.toBe(concepts)
    expect(ordered).toEqual(concepts)
  })
})

describe('orderConceptsForPlan — strong_key', () => {
  it('orders by topic weight, heaviest first, then syllabus order', () => {
    const concepts = [concept('Light', 5), concept('Heavy A', 50), concept('Heavy B', 50)]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key' })
    expect(ordered.map(c => c.name)).toEqual(['Heavy A', 'Heavy B', 'Light'])
  })

  it('returns every concept exactly once, as a copy', () => {
    const concepts = [concept('A', 1), concept('B', 30), concept('C', 30), concept('D', 12)]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key' })
    expect(ordered).not.toBe(concepts)
    expect(ordered).toHaveLength(concepts.length)
    expect(new Set(ordered)).toEqual(new Set(concepts))
  })
})
