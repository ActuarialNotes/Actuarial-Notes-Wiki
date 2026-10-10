import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { toolById } from './tools'
import {
  CUSTOM_DATA,
  TEMPLATES,
  addStep,
  connect,
  connectReason,
  disconnect,
  edgeKind,
  evaluateWorkflow,
  fromTemplate,
  moveStep,
  newWorkflow,
  nextNodeId,
  parseWorkflow,
  removeStep,
  runOrder,
  stepName,
  stepOwnInput,
  updateEdge,
  type Workflow,
} from './workflow'

const VAULT = resolve(__dirname, '../../..')

const empty = () => newWorkflow('wf', 0)

/** A workflow of the given steps, in a row, ids n1… */
function chain(...refs: string[]): Workflow {
  let wf = empty()
  for (const ref of refs) {
    const kind = ref.includes('.') ? (ref.startsWith('data.') ? 'data' : 'tool') : 'concept'
    wf = addStep(wf, { kind, ref }, 1).workflow
  }
  return wf
}

describe('adding steps', () => {
  it('starts an empty board at the first cell', () => {
    const { workflow, id } = addStep(empty(), { kind: 'tool', ref: 'reserving.chain_ladder' }, 1)
    expect(id).toBe('n1')
    expect(workflow.nodes[0]).toMatchObject({ col: 0, row: 0 })
  })

  it('puts a step added after another in the next column, and connects it', () => {
    let wf = addStep(empty(), { kind: 'tool', ref: 'reserving.age_to_age_factors' }, 1).workflow
    const { workflow, id } = addStep(wf, { kind: 'tool', ref: 'reserving.development_to_ultimate' }, 2, 'n1')
    wf = workflow
    expect(wf.nodes.find(n => n.id === id)).toMatchObject({ col: 1, row: 0 })
    expect(wf.edges).toEqual([{ from: 'n1', to: id }])
    // A second step after the same one is a branch: below the first, still after it.
    const third = addStep(wf, { kind: 'tool', ref: 'reserving.chain_ladder' }, 3, 'n1')
    expect(third.workflow.nodes.find(n => n.id === third.id)).toMatchObject({ col: 1, row: 1 })
  })

  it('starts a new column at the right edge when nothing is selected', () => {
    const wf = addStep(chain('Chain Ladder Method'), { kind: 'concept', ref: 'Duration' }, 2).workflow
    expect(wf.nodes[1]).toMatchObject({ col: 1, row: 0 })
    expect(wf.edges).toEqual([])
  })

  it('never reuses an id', () => {
    const wf = removeStep(chain('a.b', 'c.d', 'e.f'), 'n2', 2)
    expect(nextNodeId(wf)).toBe('n4')
  })
})

describe('moving steps', () => {
  it('moves a step to an empty cell only', () => {
    const wf = chain('Chain Ladder Method', 'Duration')
    expect(moveStep(wf, 'n1', { col: 1, row: 0 }, 2)).toBe(wf)
    expect(moveStep(wf, 'n1', { col: -1, row: 0 }, 2)).toBe(wf)
    expect(moveStep(wf, 'n1', { col: 3, row: 2 }, 2).nodes[0]).toMatchObject({ col: 3, row: 2 })
  })
})

describe('connections', () => {
  it('refuses a step to itself, a duplicate and a loop', () => {
    let wf = chain('Chain Ladder Method', 'Duration', 'Bornhuetter-Ferguson Method')
    wf = connect(connect(wf, 'n1', 'n2', 1), 'n2', 'n3', 1)
    expect(connectReason(wf, 'n1', 'n1')).toBe('self')
    expect(connectReason(wf, 'n1', 'n2')).toBe('duplicate')
    expect(connectReason(wf, 'n3', 'n1')).toBe('cycle')
    expect(connectReason(wf, 'n1', 'n9')).toBe('missing')
    expect(connectReason(wf, 'n1', 'n3')).toBeNull()
    expect(connect(wf, 'n3', 'n1', 2)).toBe(wf)
  })

  it('drops a step’s connections with it', () => {
    let wf = chain('Chain Ladder Method', 'Duration', 'Bornhuetter-Ferguson Method')
    wf = connect(connect(wf, 'n1', 'n2', 1), 'n2', 'n3', 1)
    expect(removeStep(wf, 'n2', 2).edges).toEqual([])
    expect(disconnect(wf, 'n1', 'n2', 2).edges).toEqual([{ from: 'n2', to: 'n3' }])
  })

  it('names what a connection does', () => {
    let wf = chain('reserving.age_to_age_factors', 'reserving.development_to_ultimate', 'reserving.chain_ladder', 'Chain Ladder Method')
    wf = connect(connect(connect(wf, 'n1', 'n2', 1), 'n2', 'n3', 1), 'n4', 'n3', 1)
    expect(edgeKind(wf, { from: 'n1', to: 'n2' })).toBe('handoff')
    expect(edgeKind(wf, { from: 'n2', to: 'n3' })).toBe('feeds')
    expect(edgeKind(wf, { from: 'n4', to: 'n3' })).toBe('informs')
    expect(edgeKind(wf, { from: 'n3', to: 'n4' })).toBe('applies')
  })
})

describe('running a workflow', () => {
  it('runs every step after the steps that lead into it, otherwise in reading order', () => {
    let wf = empty()
    wf = { ...wf, nodes: [
      { id: 'a', kind: 'concept', ref: 'A', col: 2, row: 0 },
      { id: 'b', kind: 'concept', ref: 'B', col: 0, row: 1 },
      { id: 'c', kind: 'concept', ref: 'C', col: 0, row: 0 },
    ] }
    wf = connect(wf, 'a', 'b', 1)
    expect(runOrder(wf).map(n => n.id)).toEqual(['c', 'a', 'b'])
  })

  it('hands one tool’s result to the next along an engine hand-off', () => {
    let wf = chain('reserving.age_to_age_factors', 'reserving.development_to_ultimate')
    wf = connect(wf, 'n1', 'n2', 1)
    const runs = evaluateWorkflow(wf)
    const ata = runs.get('n1')!.result!
    const cdf = runs.get('n2')!
    expect(cdf.error).toBeNull()
    expect(cdf.piped).toEqual([{ from: 'n1', fields: ['factors'] }])
    // The averages Age-to-Age Factors selected are the factors developed to ultimate.
    const averages = ata.values.averages as (number | null)[]
    const factors = cdf.input!.factors as { factor: number | null }[]
    expect(factors[0].factor).toBeCloseTo(averages[0]!, 10)
  })

  it('lets a step’s own input stand where no hand-off fills it', () => {
    let wf = chain('finance.bond_yield', 'finance.bond_price')
    wf = connect(wf, 'n1', 'n2', 1)
    wf = { ...wf, nodes: wf.nodes.map(n => (n.id === 'n2' ? { ...n, input: { face: 5000 } } : n)) }
    const run = evaluateWorkflow(wf).get('n2')!
    // The hand-off carries the bond's own terms over the step's: it prices the bond the yield was for.
    expect(run.input!.face).toBe(evaluateWorkflow(wf).get('n1')!.result!.input.face)
  })

  it('says why a step can’t run, and hands nothing on', () => {
    let wf = chain('finance.bond_yield', 'finance.bond_price')
    wf = connect(wf, 'n1', 'n2', 1)
    wf = { ...wf, nodes: wf.nodes.map(n => (n.id === 'n1' ? { ...n, input: { face: 'lots' } } : n)) }
    const runs = evaluateWorkflow(wf)
    expect(runs.get('n1')!.error).toMatch(/face/)
    expect(runs.get('n2')!.piped).toEqual([])
  })

  it('keeps only what the reader moved off its default, less what a connection fills', () => {
    const spec = toolById('finance.bond_price')!
    const run = evaluateWorkflow(chain('finance.bond_price')).get('n1')!.result!
    expect(stepOwnInput(spec, run.input)).toEqual({})
    expect(stepOwnInput(spec, { ...run.input, face: 2500, yield: 0.09 }, ['yield'])).toEqual({ face: 2500 })
  })
})

describe('steps', () => {
  it('names each kind of step', () => {
    const wf = addStep(chain('reserving.chain_ladder', 'Duration'), { kind: 'data', ref: CUSTOM_DATA, label: 'Paid triangle' }, 1).workflow
    expect(wf.nodes.map(stepName)).toEqual(['Chain Ladder', 'Duration', 'Paid triangle'])
  })
})

describe('reading a stored workflow back', () => {
  it('round-trips', () => {
    const wf = updateEdge(fromTemplate(TEMPLATES[0], 'wf', 5), 'n1', 'n2', { note: 'the method' }, 5)
    expect(parseWorkflow(JSON.parse(JSON.stringify(wf)))).toEqual(wf)
  })

  it('drops what it can’t place and every loop', () => {
    const parsed = parseWorkflow({
      id: 'x',
      title: '  ',
      nodes: [
        { id: 'a', kind: 'concept', ref: 'A', col: 0, row: 0 },
        { id: 'b', kind: 'concept', ref: 'B', col: 0, row: 0 },
        { id: 'c', kind: 'robot', ref: 'C', col: 1, row: 0 },
        { id: 'd', kind: 'tool', ref: 'reserving.chain_ladder', col: -1, row: 0 },
        { id: 'e', kind: 'concept', ref: 'E', col: 1, row: 0 },
      ],
      edges: [{ from: 'a', to: 'e' }, { from: 'e', to: 'a' }, { from: 'a', to: 'zz' }],
    })!
    expect(parsed.title).toBe('Untitled workflow')
    expect(parsed.nodes.map(n => n.id)).toEqual(['a', 'e'])
    expect(parsed.edges).toEqual([{ from: 'a', to: 'e' }])
    expect(parseWorkflow('nope')).toBeNull()
  })
})

describe('templates', () => {
  it.each(TEMPLATES)('$title names only tools and concept pages that exist, and runs cleanly', t => {
    for (const s of t.steps) {
      if (s.kind === 'concept') expect(existsSync(resolve(VAULT, 'Concepts', `${s.ref}.md`)), s.ref).toBe(true)
      else expect(toolById(s.ref), s.ref).toBeDefined()
    }
    const wf = fromTemplate(t, 'wf', 1)
    expect(wf.edges).toHaveLength(t.edges.length)
    expect(new Set(wf.nodes.map(n => `${n.col},${n.row}`)).size).toBe(wf.nodes.length)
    for (const [id, run] of evaluateWorkflow(wf)) expect(run.error, id).toBeNull()
  })
})
