import { describe, expect, it } from 'vitest'
import { areaCounts, searchTools } from './toolSearch'

const ids = (q: string, area: Parameters<typeof searchTools>[1] = null) => searchTools(q, area).map(t => t.id)

describe('searchTools', () => {
  it('finds a tool by its name first', () => {
    expect(ids('chain ladder')[0]).toBe('reserving.chain_ladder')
    expect(ids('bornhuetter')[0]).toBe('reserving.bornhuetter_ferguson')
  })

  it('finds a tool by the short name a reader types', () => {
    expect(ids('BF')[0]).toBe('reserving.bornhuetter_ferguson')
    expect(ids('LDF')).toContain('reserving.age_to_age_factors')
    expect(ids('YTM')[0]).toBe('finance.bond_yield')
  })

  it('finds a tool by the question it answers', () => {
    expect(ids('what loss ratio do the rates allow')).toContain('ratemaking.permissible_loss_ratio')
  })

  it('finds a tool by its method\'s concept page', () => {
    expect(ids('Tail Factor')).toContain('reserving.development_to_ultimate')
  })

  it('narrows to one practice area', () => {
    const found = searchTools('ratio', 'ratemaking')
    expect(found.length).toBeGreaterThan(0)
    expect(found.every(t => t.area === 'ratemaking')).toBe(true)
  })

  it('finds nothing for an empty query', () => {
    expect(searchTools('  ')).toEqual([])
  })

  it('counts what each area would leave', () => {
    const counts = areaCounts('ratio')
    expect(counts.reserving).toBeGreaterThan(0)
    expect(counts.ratemaking).toBeGreaterThan(0)
  })
})
