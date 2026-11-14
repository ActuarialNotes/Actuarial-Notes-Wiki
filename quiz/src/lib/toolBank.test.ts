import { describe, it, expect } from 'vitest'
import bank from 'virtual:assumption-bank'
import { ASSUMPTION_KINDS } from './assumptionBank'
import { bankFigure, bankFigures, decodeRunInput, runTool, toolById } from '@/lib/tools'
import { figureUses, kindsIn, shelfRows, takesFigure, toBankFigures, toolsTakingFigures } from './toolBank'

describe('the bank, installed into the engine', () => {
  it('installs every figure of every set, and no fact or blank', () => {
    const figures = toBankFigures(bank)
    const rows = bank.flatMap(s => s.rows)
    expect(figures).toHaveLength(rows.filter(r => r.decimal != null).length)
    expect(bankFigures().map(f => f.id).sort()).toEqual(figures.map(f => f.id).sort())
    expect(figures.every(f => Number.isFinite(f.value) && f.resource && f.document.startsWith('https://'))).toBe(true)
  })

  it('runs a tool on the AIRB profit provision, and says where it came from', () => {
    const profit = bankFigures().find(f => f.kind === 'profit-provision' && f.set.startsWith('AIRB'))!
    expect(profit.value).toBe(0.06)
    const r = runTool(toolById('ratemaking.permissible_loss_ratio')!, { variable: 0.2, profit: { assumption: profit.id } })
    expect(r.input.profit).toBe(0.06)
    expect(r.judgments.find(j => j.field === 'profit')?.source?.publisher).toBe('Automobile Insurance Rate Board')
  })
})

describe('figureUses', () => {
  it('links a profit provision into every tool with a profit field, filled', () => {
    const profit = bank.flatMap(s => s.rows).find(r => r.kind === 'profit-provision')!
    const uses = figureUses(profit)
    expect(uses.map(u => u.tool.id).sort()).toEqual(['ratemaking.loss_ratio_method', 'ratemaking.permissible_loss_ratio', 'ratemaking.pure_premium_method'])
    const use = uses.find(u => u.tool.id === 'ratemaking.permissible_loss_ratio')!
    expect(use.path.startsWith('/tools/permissible-loss-ratio#input=')).toBe(true)
    expect(decodeRunInput(use.path.split('#')[1])).toEqual({ profit: { assumption: profit.id } })
    expect(bankFigure(profit.id)).toBeDefined()
  })

  it('offers nothing for a figure no tool takes, a fact or a blank', () => {
    const rows = bank.flatMap(s => s.rows)
    expect(figureUses(rows.find(r => r.kind === 'capital-ratio' && r.decimal != null)!)).toEqual([])
    expect(figureUses(rows.find(r => r.kind === 'fact')!)).toEqual([])
    expect(figureUses({ id: 'x#y', kind: 'trend', unit: '%', decimal: null })).toEqual([])
  })
})

describe('kindsIn', () => {
  it('lists the kinds the bank holds, in the vocabulary order', () => {
    const kinds = kindsIn(bank, Object.keys(ASSUMPTION_KINDS))
    expect(kinds).toContain('profit-provision')
    expect(kinds).toContain('ulae-factor')
    expect(kinds.indexOf('variable-expense')).toBeLessThan(kinds.indexOf('ulae-factor'))
  })
})

describe('the shelf’s filters', () => {
  const airb = bank.find(s => s.id.startsWith('AIRB'))!

  it('keeps what a filter keeps, folds the rest, and puts blanks last', () => {
    const all = shelfRows(airb.rows, null)
    expect(all.folded).toEqual([])
    const firstBlank = all.shown.findIndex(r => r.raw === '')
    expect(firstBlank).toBeGreaterThan(0)
    expect(all.shown.slice(firstBlank).every(r => r.raw === '')).toBe(true)
    const profit = shelfRows(airb.rows, r => r.kind === 'profit-provision')
    expect(profit.shown.map(r => r.kind)).toEqual(['profit-provision'])
    expect(profit.shown.length + profit.folded.length).toBe(airb.rows.length)
  })

  it('offers the tools that take a figure, and knows which figures each takes', () => {
    const tools = toolsTakingFigures()
    const plr = tools.find(t => t.id === 'ratemaking.permissible_loss_ratio')!
    expect(plr).toBeDefined()
    const profit = airb.rows.find(r => r.kind === 'profit-provision')!
    const ulae = airb.rows.find(r => r.kind === 'ulae-factor')!
    expect(takesFigure(plr, profit)).toBe(true)
    expect(takesFigure(plr, ulae)).toBe(false)
  })
})
