import { describe, it, expect } from 'vitest'
import committed from '@/data/conceptTools.json'
import { TOOLS, toolPath } from './tools'
import { buildConceptTools, toolsForConcept, type ConceptToolIndex } from './conceptTools'

const fromRegistry = buildConceptTools(
  TOOLS.map(t => ({ name: t.name, area: t.area, concepts: t.method.concepts, path: toolPath(t) })),
)

describe('concept → tools', () => {
  it('the committed index is the registry’s — run `npm run tools:bundle` if this fails', () => {
    expect(committed).toEqual(fromRegistry)
  })

  it('offers every tool from at least one concept page', () => {
    const offered = new Set(Object.values(fromRegistry).flat().map(t => t.path))
    for (const t of TOOLS) expect(offered.has(toolPath(t)), t.id).toBe(true)
  })

  it('finds a concept whatever its case, and nothing for a concept no tool names', () => {
    const index = committed as ConceptToolIndex
    expect(toolsForConcept(index, 'Chain Ladder Method')[0]).toEqual({ name: 'Chain Ladder', path: '/tools/chain-ladder' })
    expect(toolsForConcept(index, ' chain ladder method ')).toHaveLength(1)
    expect(toolsForConcept(index, 'Probability')).toEqual([])
  })

  it('puts the tool that is the method before one that uses it, and a calculator before a table', () => {
    const index = buildConceptTools([
      { name: 'Table', area: 'data', concepts: ['Trend'], path: '/data-sources/table' },
      { name: 'User', area: 'ratemaking', concepts: ['Other', 'Trend'], path: '/tools/user' },
      { name: 'Method', area: 'ratemaking', concepts: ['Trend'], path: '/tools/method' },
    ])
    expect(index.trend.map(t => t.name)).toEqual(['Method', 'Table', 'User'])
  })

  it('lists a tool once for a concept it names twice', () => {
    const index = buildConceptTools([{ name: 'A', area: 'finance', concepts: ['X', 'x'], path: '/tools/a' }])
    expect(index.x).toHaveLength(1)
  })
})
