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
