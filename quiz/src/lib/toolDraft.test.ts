import { describe, it, expect } from 'vitest'
import { fieldVisible, fromMode, groupSources, initialDraft, parseClipboardBlock, shortSource, toMode } from './toolDraft'
import { checksFor } from './tools'
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

describe('a source, named short', () => {
  it('cuts a vault page name to its author and year', () => {
    expect(shortSource('Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)')).toBe('Friedland (2010)')
    expect(shortSource('OSFI MCT')).toBe('OSFI MCT')
  })
})

describe('what a card says it was tested against', () => {
  it('gives one line per document, listing its pages', () => {
    const lines = groupSources(checksFor('credibility.partial_credibility'))
    expect(lines).toEqual([expect.objectContaining({ kind: 'document', label: 'Werner (2016), pp. 219, A-8, B-5, C-7' })])
  })

  it('opens the reader at the PDF page the exhibit is on, not the page number it prints', () => {
    // Friedland's p. 142 is the PDF's 148th page — the front matter is unnumbered.
    expect(groupSources(checksFor('reserving.expected_claims'))[0]).toMatchObject({ kind: 'document', page: 148 })
    expect(groupSources(checksFor('credibility.partial_credibility'))[0]).toMatchObject({ page: 231 })
  })

  it('gives one exhibit its locator, and folds exam questions into one link to the quiz', () => {
    expect(groupSources(checksFor('reserving.bornhuetter_ferguson'))[0].label).toBe('Friedland (2010), Ch. 9, Exhibit I, Sheet 1, p. 162')
    const [questions] = groupSources(checksFor('finance.present_value'))
    expect(questions).toEqual({
      kind: 'questions',
      url: '/quiz?ids=fm-026,fm-071,fm-082,fm-225,fm-245,fm-281',
      label: 'SOA Exam FM sample questions 26, 71, 82, 225, 245, 281',
    })
  })
})

describe('questions from several papers', () => {
  it('gives each paper or sample set its own line', () => {
    const lines = groupSources(checksFor('distributions.expected_payment'))
    expect(lines.map(l => l.label)).toEqual(['SOA Exam P sample questions 337, 601', 'CAS Exam MAS-I, Fall 2019, questions 1, 23'])
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
    expect(about).toContainEqual(['Judgment: Average', 'volume (default — not chosen)'])
    expect(about).toContainEqual(['Judgment: Latest years', '0 (default — not chosen)'])
  })

  it('writes the run_tool call an agent would make', () => {
    expect(JSON.parse(runToolCall(spec('finance.annuity'), { n: 5 }))).toEqual({ tool: 'finance.annuity', input: { n: 5 } })
  })
})
