import { describe, expect, it } from 'vitest'
import { CUSTOM_DATA, TEMPLATES, addStep, evaluateWorkflow, fromTemplate, newWorkflow, updateStep } from './workflow'
import { HOW_TO_RUN, describeWorkflow } from './workflowBrief'

const reserve = () => fromTemplate(TEMPLATES[0], 'wf', 1)

describe('the brief for Claude', () => {
  it('opens with the goal and how to run it with the connector', () => {
    const wf = reserve()
    const brief = describeWorkflow(wf, evaluateWorkflow(wf))
    expect(brief.startsWith('# Workflow: Reserve review')).toBe(true)
    expect(brief).toContain(`Goal: ${TEMPLATES[0].goal}`)
    expect(brief).toContain(HOW_TO_RUN)
    for (const tool of ['`run_tool`', '`describe_tool`', '`get_concept`']) expect(brief).toContain(tool)
  })

  it('lists every step in run order, with its connections, input and result', () => {
    const wf = reserve()
    const brief = describeWorkflow(wf, evaluateWorkflow(wf))
    const order = ['Chain Ladder Method', 'Age-to-Age Factors', 'Development to Ultimate', 'Chain Ladder —', 'Bornhuetter-Ferguson']
    const at = order.map(name => brief.indexOf(`. ${name}`))
    expect(at.every(i => i > 0)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
    expect(brief).toContain('step 2 (Age-to-Age Factors) — linked: carries factors')
    expect(brief).toContain('step 3 (Development to Ultimate) — its result is used by the next step')
    expect(brief).toContain('step 1 (Chain Ladder Method) — the concept it rests on')
    expect(brief).toMatch(/Current input: \{/)
    expect(brief).toMatch(/Current result: Age-to-age averages/)
  })

  it('carries the reader’s own data, and asks for it when there is none', () => {
    const { workflow: blank, id } = addStep(newWorkflow('wf', 0), { kind: 'data', ref: CUSTOM_DATA, label: 'Paid triangle' }, 1)
    expect(describeWorkflow(blank, new Map())).toMatch(/I described none/)
    const wf = updateStep(blank, id, { data: 'AY 2020: 100, 150' }, 2)
    expect(describeWorkflow(wf, new Map())).toContain('AY 2020: 100, 150')
  })
})

describe('the brief, at more than one level', () => {
  it('lists a sub-workflow’s own steps under it, each with what it runs on', async () => {
    const { resolverFor, TEMPLATE_PREFIX } = await import('./workflow')
    const wf = addStep(newWorkflow('h', 0, 'Host'), { kind: 'workflow', ref: TEMPLATE_PREFIX + 'bond-risk', label: 'Bond pricing and risk' }, 1).workflow
    const resolve = resolverFor([])
    const brief = describeWorkflow(wf, evaluateWorkflow(wf, resolve), resolve)
    expect(brief).toContain('### 1. Bond pricing and risk — Workflow')
    expect(brief).toContain('A sub-workflow of 5 steps, in run order:')
    expect(brief).toMatch(/\n {2}\d\. Bond Price — Calculation \(`finance\.bond_price`\)\n {5}Current input:/)
  })

  it('carries an uploaded CSV whole, and says which columns fill which inputs', async () => {
    const { CSV_DATA } = await import('./workflow')
    const csv = { name: 'cpi.csv', columns: ['Quarter', 'Index'], rows: [['2022Q1', '100'], ['2022Q2', '101']] }
    let wf = addStep(newWorkflow('w', 0), { kind: 'data', ref: CSV_DATA, csv }, 1).workflow
    wf = addStep(wf, { kind: 'tool', ref: 'ratemaking.trend_fit' }, 1, 'n1').workflow
    const brief = describeWorkflow(wf, evaluateWorkflow(wf))
    expect(brief).toContain('My data, uploaded as cpi.csv (2 rows):')
    expect(brief).toContain('```csv\nQuarter,Index\n2022Q1,100\n2022Q2,101\n```')
    expect(brief).toContain('Mapped into step 2 (Trend Fit): Points ← period: Quarter, value: Index')
  })
})
