import { describe, expect, it } from 'vitest'
import { CHAINS, chainPlace } from './toolChains'
import { toolById } from './tools'

describe('the tool chains', () => {
  it('names only tools that exist, each once', () => {
    const ids = CHAINS.flatMap(c => c.steps.flat())
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(toolById(id), id).toBeDefined()
  })

  it('places Bornhuetter-Ferguson after Development to Ultimate, beside the other methods', () => {
    const place = chainPlace('reserving.bornhuetter_ferguson')!
    expect(place.before.at(-1)).toEqual(['reserving.development_to_ultimate'])
    expect(place.alternatives).toContain('reserving.chain_ladder')
    expect(place.alternatives).not.toContain('reserving.bornhuetter_ferguson')
  })

  it('leaves a tool in no chain without a strip', () => {
    expect(chainPlace('finance.annuity')).toBeNull()
  })
})
