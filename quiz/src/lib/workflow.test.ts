import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { toolById } from './tools'
import { STEP, overlaps } from './workflowGrid'
import {
  CSV_DATA,
  CUSTOM_DATA,
  GRID_VERSION,
  TEMPLATE_PREFIX,
  canNest,
  resolverFor,
  withResolvedLabels,
  TEMPLATES,
  addStep,
  carriedTile,
  connect,
  connectReason,
  disconnect,
  edgeKind,
  edgeLabel,
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
    expect(wf.nodes.find(n => n.id === id)).toMatchObject({ col: STEP.cols, row: 0 })
    expect(wf.edges).toEqual([{ from: 'n1', to: id }])
    // A second step after the same one is a branch: below the first, still after it.
    const third = addStep(wf, { kind: 'tool', ref: 'reserving.chain_ladder' }, 3, 'n1')
    expect(third.workflow.nodes.find(n => n.id === third.id)).toMatchObject({ col: STEP.cols, row: STEP.rows })
  })

  it('starts a new column at the right edge when nothing is selected', () => {
    const wf = addStep(chain('Chain Ladder Method'), { kind: 'concept', ref: 'Duration' }, 2).workflow
    expect(wf.nodes[1]).toMatchObject({ col: STEP.cols, row: 0 })
    expect(wf.edges).toEqual([])
  })

  it('never reuses an id', () => {
    const wf = removeStep(chain('a.b', 'c.d', 'e.f'), 'n2', 2)
    expect(nextNodeId(wf)).toBe('n4')
  })
})

describe('moving steps', () => {
  it('moves a step anywhere, negative positions and all', () => {
    const wf = chain('Chain Ladder Method', 'Duration')
    expect(moveStep(wf, 'n1', { col: -7, row: -3 }, 2).nodes[0]).toMatchObject({ col: -7, row: -3 })
    expect(moveStep(wf, 'n1', { col: 3, row: 11 }, 2).nodes[0]).toMatchObject({ col: 3, row: 11 })
    expect(moveStep(wf, 'n1', { col: 0, row: 0 }, 2)).toBe(wf)
  })

  it('lands a step dropped on another beside it, never on top', () => {
    const wf = chain('Chain Ladder Method', 'Duration')
    const other = wf.nodes[1]
    const moved = moveStep(wf, 'n1', { col: other.col + 1, row: other.row }, 2).nodes[0]
    expect(overlaps(moved, other)).toBe(false)
    // As near the drop as it fits.
    expect(Math.abs(moved.col - (other.col + 1)) + Math.abs(moved.row - other.row)).toBeLessThan(STEP.cols)
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

  it('puts a word only on a concept’s connection', () => {
    expect(edgeLabel('handoff')).toBeNull()
    expect(edgeLabel('feeds')).toBeNull()
    expect(edgeLabel('informs')).toBe('informs')
    expect(edgeLabel('applies')).toBe('applies')
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

  it('finds the upstream figure a link carries', () => {
    let wf = chain('ratemaking.trend_fit', 'ratemaking.trend_factor')
    wf = connect(wf, 'n1', 'n2', 1)
    const runs = evaluateWorkflow(wf)
    const fit = runs.get('n1')!.result!
    const factor = runs.get('n2')!
    const at = carriedTile(fit, factor.input!, factor.piped[0].fields)
    expect(at).toBeGreaterThanOrEqual(0)
    expect(fit.tiles[at].value).toBeCloseTo(factor.input!.trend as number, 12)
    // A hand-off of a whole table carries no one figure.
    let dev = chain('reserving.age_to_age_factors', 'reserving.development_to_ultimate')
    dev = connect(dev, 'n1', 'n2', 1)
    const devRuns = evaluateWorkflow(dev)
    expect(carriedTile(devRuns.get('n1')!.result!, devRuns.get('n2')!.input!, ['factors'])).toBe(-1)
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

  it('drops what it can’t read and every loop, and moves a card off another', () => {
    const parsed = parseWorkflow({
      id: 'x',
      title: '  ',
      grid: GRID_VERSION,
      nodes: [
        { id: 'a', kind: 'concept', ref: 'A', col: 0, row: 0 },
        { id: 'b', kind: 'concept', ref: 'B', col: 1, row: 0 },
        { id: 'c', kind: 'robot', ref: 'C', col: 30, row: 0 },
        { id: 'd', kind: 'tool', ref: 'reserving.chain_ladder', col: 'left', row: 0 },
        { id: 'e', kind: 'concept', ref: 'E', col: -20, row: -9 },
      ],
      edges: [{ from: 'a', to: 'e' }, { from: 'e', to: 'a' }, { from: 'a', to: 'zz' }],
    })!
    expect(parsed.title).toBe('Untitled workflow')
    expect(parsed.nodes.map(n => n.id)).toEqual(['a', 'b', 'e'])
    expect(overlaps(parsed.nodes[0], parsed.nodes[1])).toBe(false)
    expect(parsed.nodes[2]).toMatchObject({ col: -20, row: -9 })
    expect(parsed.edges).toEqual([{ from: 'a', to: 'e' }])
    expect(parseWorkflow('nope')).toBeNull()
  })

  it('spreads a workflow saved on the first, coarse grid onto the fine one', () => {
    const parsed = parseWorkflow({
      id: 'old',
      title: 'Old',
      nodes: [
        { id: 'n1', kind: 'concept', ref: 'A', col: 0, row: 0 },
        { id: 'n2', kind: 'concept', ref: 'B', col: 1, row: 0 },
        { id: 'n3', kind: 'concept', ref: 'C', col: 1, row: 1 },
      ],
      edges: [{ from: 'n1', to: 'n2' }],
    })!
    expect(parsed.grid).toBe(GRID_VERSION)
    expect(parsed.nodes.map(n => [n.col, n.row])).toEqual([[0, 0], [STEP.cols, 0], [STEP.cols, STEP.rows]])
    // Read back again, it stays where it is.
    expect(parseWorkflow(JSON.parse(JSON.stringify(parsed)))).toEqual(parsed)
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
    for (const a of wf.nodes) for (const b of wf.nodes) if (a !== b) expect(overlaps(a, b), `${a.id} ${b.id}`).toBe(false)
    for (const [id, run] of evaluateWorkflow(wf)) expect(run.error, id).toBeNull()
  })
})

describe('sub-workflows', () => {
  /** A library workflow of one Trend Fit step, and a host that links it into a Trend Factor. */
  function nested() {
    let inner = addStep({ ...newWorkflow('inner', 0, 'Fit the trend'), saved: true }, { kind: 'tool', ref: 'ratemaking.trend_fit' }, 1).workflow
    inner = { ...inner, goal: 'Fit it' }
    let host = addStep(newWorkflow('host', 0), { kind: 'workflow', ref: 'inner', label: 'old name' }, 1).workflow
    host = addStep(host, { kind: 'tool', ref: 'ratemaking.trend_factor' }, 1, 'n1').workflow
    const resolve = resolverFor([inner, host])
    return { inner, host, resolve }
  }

  it('hands a sub-workflow’s last calculations on along the engine’s hand-offs', () => {
    const { host, resolve } = nested()
    expect(edgeKind(host, host.edges[0], resolve)).toBe('handoff')
    const runs = evaluateWorkflow(host, resolve)
    const sub = runs.get('n1')!
    expect(sub.inner?.workflow.id).toBe('inner')
    expect(sub.exits).toHaveLength(1)
    const factor = runs.get('n2')!
    expect(factor.piped).toEqual([{ from: 'n1', fields: ['trend'] }])
    expect(factor.input!.trend).toBe(sub.exits[0].values.trend)
  })

  it('takes what links into it in its first calculations', () => {
    // A Price Index hands its change on to a Trend Fit — the sub-workflow's first step.
    const { inner } = nested()
    let host = addStep(newWorkflow('host2', 0), { kind: 'data', ref: 'data.price_index' }, 1).workflow
    host = addStep(host, { kind: 'workflow', ref: 'inner' }, 1, 'n1').workflow
    const resolve = resolverFor([inner, host])
    expect(edgeKind(host, host.edges[0], resolve)).toBe('handoff')
    const runs = evaluateWorkflow(host, resolve)
    const sub = runs.get('n2')!
    expect(sub.piped[0].from).toBe('n1')
    expect(sub.piped[0].fields).toEqual(['Trend Fit: model', 'Trend Fit: per_year', 'Trend Fit: points'])
    // The inner Trend Fit runs on the index's own periods.
    const index = runs.get('n1')!.result!
    const innerFit = sub.inner!.runs.get('n1')!
    expect((innerFit.input!.points as { period: string }[]).map(p => p.period)).toEqual(index.values.periods)
  })

  it('runs a template as a sub-workflow', () => {
    const host = addStep(newWorkflow('h', 0), { kind: 'workflow', ref: TEMPLATE_PREFIX + 'reserve-review' }, 1).workflow
    const runs = evaluateWorkflow(host, resolverFor([]))
    expect(runs.get('n1')!.exits.map(r => r.tool).sort()).toEqual(['reserving.bornhuetter_ferguson', 'reserving.chain_ladder'])
  })

  it('says when a sub-workflow is no longer in the library', () => {
    const host = addStep(newWorkflow('h', 0), { kind: 'workflow', ref: 'gone' }, 1).workflow
    expect(evaluateWorkflow(host, resolverFor([])).get('n1')!.error).toMatch(/no longer/)
  })

  it('never nests a workflow in itself, at any depth', () => {
    const { inner, host, resolve } = nested()
    expect(canNest(resolve, 'inner', 'inner')).toBe(false)
    expect(canNest(resolve, 'inner', 'host')).toBe(false)
    expect(canNest(resolve, 'host', 'inner')).toBe(true)
    expect(canNest(resolverFor([inner, host]), 'inner', TEMPLATE_PREFIX + 'bond-risk')).toBe(true)
  })

  it('names a sub-workflow by its title now', () => {
    const { host, resolve } = nested()
    expect(withResolvedLabels(host, resolve).nodes[0].label).toBe('Fit the trend')
    const same = withResolvedLabels(withResolvedLabels(host, resolve), resolve)
    expect(withResolvedLabels(same, resolve)).toBe(same)
  })
})

describe('a CSV in a workflow', () => {
  const csv = { name: 'cpi.csv', columns: ['Quarter', 'Index'], rows: [['2022Q1', '100'], ['2022Q2', '101.5'], ['2022Q3', '103'], ['2022Q4', '104.2']] }

  it('links its guessed columns into the next tool, and runs it on them', () => {
    let wf = addStep(newWorkflow('w', 0), { kind: 'data', ref: CSV_DATA, csv }, 1).workflow
    wf = addStep(wf, { kind: 'tool', ref: 'ratemaking.trend_fit' }, 1, 'n1').workflow
    expect(wf.edges[0].map).toEqual({ points: { kind: 'columns', columns: { period: 0, value: 1 } } })
    expect(edgeKind(wf, wf.edges[0])).toBe('handoff')
    const fit = evaluateWorkflow(wf).get('n2')!
    expect(fit.error).toBeNull()
    expect(fit.piped).toEqual([{ from: 'n1', fields: ['points'] }])
    expect((fit.input!.points as { value: number }[]).map(p => p.value)).toEqual([100, 101.5, 103, 104.2])
  })

  it('is only a connection until a column is mapped', () => {
    let wf = addStep(newWorkflow('w', 0), { kind: 'data', ref: CSV_DATA, csv }, 1).workflow
    wf = addStep(wf, { kind: 'tool', ref: 'finance.annuity' }, 1, 'n1').workflow
    expect(edgeKind(wf, wf.edges[0])).toBe('feeds')
    expect(stepName(wf.nodes[0])).toBe('cpi.csv')
  })

  it('round-trips through storage, file, mapping and library flag', () => {
    let wf = addStep({ ...newWorkflow('w', 0), saved: true }, { kind: 'data', ref: CSV_DATA, csv }, 1).workflow
    wf = addStep(wf, { kind: 'tool', ref: 'ratemaking.trend_fit' }, 1, 'n1').workflow
    wf = addStep(wf, { kind: 'workflow', ref: TEMPLATE_PREFIX + 'bond-risk', label: 'Bonds' }, 1).workflow
    expect(parseWorkflow(JSON.parse(JSON.stringify(wf)))).toEqual(wf)
  })
})
