import { describe, it, expect } from 'vitest'
import { fieldVisible, fromMode, initialDraft, parseClipboardBlock, toMode } from './toolDraft'
import { toolResultSheets, runToolCall } from './toolExport'
import { runTool, toolById, type ToolSpec } from './tools'

const spec = (id: string) => toolById(id) as ToolSpec

describe('the card draft', () => {
  it('leaves judgments out until chosen, so the run reports them as defaults (R3)', () => {
    const draft = initialDraft(spec('ratemaking.loss_ratio_method'))
    expect(draft).not.toHaveProperty('profit')
    expect(draft).toHaveProperty('loss_ratio', 0.65)
    expect(runTool(spec('ratemaking.loss_ratio_method'), draft).judgments).toEqual([expect.objectContaining({ field: 'profit', default: true })])
  })

  it('lays a run link\'s input over the defaults, judgments included', () => {
    const draft = initialDraft(spec('ratemaking.loss_ratio_method'), { profit: 0.03, nonsense: 1 })
    expect(draft.profit).toBe(0.03)
    expect(draft).not.toHaveProperty('nonsense')
  })

  it('shows a field only while its controlling field allows it', () => {
    const full = spec('credibility.full_credibility_standard')
    const cv = full.fields.find(f => f.key === 'cv')!
    expect(fieldVisible(full, cv, initialDraft(full))).toBe(false)
    expect(fieldVisible(full, cv, { ...initialDraft(full), basis: 'severity' })).toBe(true)
  })
})

describe('pasting from Excel', () => {
  it('reads a tab-separated block, and leaves a single value to the browser', () => {
    expect(parseClipboardBlock('1\t2\r\n3\t4\n')).toEqual([['1', '2'], ['3', '4']])
    expect(parseClipboardBlock('1\n2')).toEqual([['1'], ['2']])
    expect(parseClipboardBlock('1,200')).toBeNull()
  })
})

describe('cumulative ↔ incremental', () => {
  const cumulative = [[100, 150, 165], [110, 170, null], [120, null, null]]

  it('round-trips a triangle', () => {
    const inc = toMode(cumulative, 'incremental')
    expect(inc).toEqual([[100, 50, 15], [110, 60, null], [120, null, null]])
    expect(fromMode(inc, 'incremental')).toEqual(cumulative)
  })

  it('passes a cell that is not a number through, so the engine names it', () => {
    expect(fromMode([[10, 'x', 5]], 'incremental')).toEqual([[10, 'x', 5]])
    expect(fromMode([['5', '', '']], 'incremental')).toEqual([[5, null, null]])
  })
})

describe('the export', () => {
  it('files the result, the inputs, the working and what the run was', () => {
    const s = spec('reserving.bornhuetter_ferguson')
    const result = runTool(s, initialDraft(s))
    const sheets = toolResultSheets(s, result)
    expect(sheets.map(x => x.name)).toEqual(['Result', 'Inputs', 'Headline', 'Origins', 'Working', 'About this run'])
    const about = sheets.find(x => x.name === 'About this run')!.rows
    expect(about).toContainEqual(['Input hash', result.inputHash])
    expect(about.some(r => String(r[1]).includes('Bornhuetter-Ferguson Method'))).toBe(true)
  })

  it('marks a judgment left at its default in the workpaper', () => {
    const s = spec('reserving.age_to_age_factors')
    const about = toolResultSheets(s, runTool(s, initialDraft(s))).find(x => x.name === 'About this run')!.rows
    expect(about).toContainEqual(['Judgment: Average', 'volume_all (default — not chosen)'])
  })

  it('writes the run_tool call an agent would make', () => {
    expect(JSON.parse(runToolCall(spec('finance.annuity'), { n: 5 }))).toEqual({ tool: 'finance.annuity', input: { n: 5 } })
  })
})
