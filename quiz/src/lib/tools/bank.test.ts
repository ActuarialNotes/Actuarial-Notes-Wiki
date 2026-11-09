import { afterEach, describe, expect, it } from 'vitest'
import { ToolInputError, describeTool, figuresFor, installAssumptionBank, runTool, toolById, type BankFigure } from './index'

const PROFIT: BankFigure = {
  id: 'AIRB Benchmarks (2026)#profit-provision',
  label: 'Profit provision (pre-tax, maximum)',
  kind: 'profit-provision',
  unit: '%',
  value: 0.06,
  raw: '6.0',
  set: 'AIRB Benchmarks (2026)',
  title: 'Alberta auto benchmarks',
  publisher: 'Automobile Insurance Rate Board',
  edition: '2026 Annual Review',
  effective: '2026-10-01',
  supersededBy: null,
  jurisdiction: 'CA-AB',
  locator: 'Profit (p. 7)',
  document: 'https://example.org/airb.pdf',
  resource: 'AIRB Annual Review Report (2026)',
  verdict: 'unverified',
  openCritical: 0,
}
const EXPENSE: BankFigure = { ...PROFIT, id: 'AIRB Benchmarks (2026)#acquisition', label: 'Amortization of insurance acquisition cash flows', kind: 'variable-expense', value: 0.2, raw: '20.0', locator: 'p. 7' }
const TOTAL: BankFigure = { ...PROFIT, id: 'AIRB Benchmarks (2026)#total-expenses', label: 'Total expenses', kind: 'total-expense', value: 0.278, raw: '27.8', locator: 'p. 7' }
const ULAE: BankFigure = { ...PROFIT, id: 'AIRB Benchmarks (2026)#ulae', label: 'ULAE', kind: 'ulae-factor', unit: 'factor', value: 1.094, raw: '1.094' }

const plr = toolById('ratemaking.permissible_loss_ratio')!
const profitField = plr.fields.find(f => f.key === 'profit')!

afterEach(() => installAssumptionBank([]))

describe('a published figure as a tool input', () => {
  it('reads the figure in, and the run says where it came from', () => {
    installAssumptionBank([PROFIT, EXPENSE])
    const r = runTool(plr, { variable: 0.2, profit: { assumption: PROFIT.id } })
    expect(r.input.profit).toBe(0.06)
    const j = r.judgments.find(x => x.field === 'profit')!
    expect(j.default).toBe(false)
    expect(j.source).toMatchObject({ assumption: PROFIT.id, edition: '2026 Annual Review', locator: 'Profit (p. 7)', verdict: 'unverified' })
    expect(r.trace[0]).toMatchObject({ label: 'Profit & contingency: Profit provision (pre-tax, maximum)', result: 0.06 })
    expect(r.warnings.some(w => w.includes('6.0%') && w.includes('not been fact checked'))).toBe(true)
  })

  it('records a figure on a field that is not a judgment too', () => {
    installAssumptionBank([PROFIT, EXPENSE])
    const r = runTool(plr, { variable: { assumption: EXPENSE.id } })
    expect(r.judgments.find(x => x.field === 'variable')?.source?.assumption).toBe(EXPENSE.id)
  })

  it('does not warn once the figure is fact checked', () => {
    installAssumptionBank([{ ...PROFIT, verdict: 'verified' }])
    expect(runTool(plr, { profit: { assumption: PROFIT.id } }).warnings.some(w => w.includes('fact checked'))).toBe(false)
  })

  it('hashes the figure, not only the number', () => {
    installAssumptionBank([PROFIT])
    const typed = runTool(plr, { profit: 0.06 })
    const sourced = runTool(plr, { profit: { assumption: PROFIT.id } })
    expect(sourced.input).toEqual(typed.input)
    expect(sourced.inputHash).not.toBe(typed.inputHash)
  })

  it('refuses a figure the field does not take, or one it cannot find', () => {
    installAssumptionBank([PROFIT, ULAE])
    expect(() => runTool(plr, { profit: { assumption: ULAE.id } })).toThrow(ToolInputError)
    expect(() => runTool(plr, { fixed: { assumption: PROFIT.id } })).toThrow(/expense/)
    expect(() => runTool(plr, { profit: { assumption: 'nowhere#x' } })).toThrow(/no figure/)
    installAssumptionBank([])
    expect(() => runTool(plr, { profit: { assumption: PROFIT.id } })).toThrow(/not loaded/)
  })
})

describe('what a field is offered', () => {
  it('the figures of its kinds and unit, in force, never one with a critical finding', () => {
    installAssumptionBank([
      PROFIT,
      EXPENSE,
      ULAE,
      { ...PROFIT, id: 'old#p', supersededBy: 'AIRB Benchmarks (2026)' },
      { ...PROFIT, id: 'bad#p', openCritical: 1 },
    ])
    expect(figuresFor(profitField as never).map(f => f.id)).toEqual([PROFIT.id])
    expect(figuresFor(plr.fields.find(f => f.key === 'variable') as never).map(f => f.id)).toEqual([EXPENSE.id])
  })

  it('offers an expense figure only to the expense it measures', () => {
    installAssumptionBank([EXPENSE, TOTAL])
    // Acquisition costs are a variable expense; a total is neither the fixed nor the variable ratio.
    expect(figuresFor(plr.fields.find(f => f.key === 'fixed') as never)).toEqual([])
    expect(figuresFor(plr.fields.find(f => f.key === 'variable') as never).map(f => f.id)).toEqual([EXPENSE.id])
  })

  it('tells an agent the field takes one, and of which kinds', () => {
    const schema = describeTool(plr).input_schema.properties as Record<string, Record<string, unknown>>
    expect(schema.profit['x-assumption-kinds']).toEqual(['profit-provision'])
    expect(String(schema.profit.description)).toContain('{"assumption": "<id>"}')
    expect(schema.loss_ratio ?? schema.fixed).toBeDefined()
  })
})
