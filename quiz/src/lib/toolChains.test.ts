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

  it('places the ratemaking and finance tools in their chains', () => {
    expect(chainPlace('ratemaking.permissible_loss_ratio')!.before.at(-1)).toEqual(['ratemaking.expense_ratios'])
    expect(chainPlace('ratemaking.loss_ratio_method')!.alternatives).toEqual(['ratemaking.pure_premium_method'])
    const annuity = chainPlace('finance.annuity')!
    expect(annuity.chain.id).toBe('interest')
    expect(annuity.before).toEqual([['finance.interest_converter']])
    expect(chainPlace('finance.bond_yield')!.alternatives).toEqual(['finance.bond_price'])
  })

  it('has the hand-offs the tools review found missing (docs/tools-ux-review.md §3.7)', () => {
    const gives = (from: string, to: string) => (toolById(from)!.next ?? []).some(h => h.tool === to)
    for (const to of ['chain_ladder', 'bornhuetter_ferguson', 'benktander', 'cape_cod']) expect(gives('reserving.development_to_ultimate', `reserving.${to}`), to).toBe(true)
    expect(gives('reserving.expected_claims', 'reserving.bornhuetter_ferguson')).toBe(true)
    expect(gives('finance.interest_converter', 'finance.annuity')).toBe(true)
    expect(gives('finance.interest_converter', 'finance.loan_schedule')).toBe(true)
    expect(gives('finance.annuity', 'finance.internal_rate_of_return')).toBe(true)
    expect(gives('finance.bond_price', 'finance.bond_yield')).toBe(true)
  })

  it('leaves a tool in no chain without a strip', () => {
    expect(chainPlace('distributions.distribution')).toBeNull()
  })
})
