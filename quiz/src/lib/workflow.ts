/**
 * **The Workflow Builder** (docs/workflow-builder.md) — a workflow as data:
 * data, calculations and concepts as steps on a grid, joined by directed
 * connections that say what flows into what, and the pure functions that keep
 * one valid and run it.
 *
 * Three kinds of step:
 * - **data** — a Data Sources tool (a published table: life table, price
 *   index, yield curve), or the reader's own data, described in words;
 * - **tool** — a calculation: any other Actuarial Tool (`lib/tools`);
 * - **concept** — a vault concept page: the method, definition or judgment a
 *   step rests on.
 *
 * A connection runs one way, from a step to one that follows it, and a
 * workflow never loops back on itself (`connectReason`): it is a procedure,
 * read and run in order (`runOrder`). A connection between two tools whose
 * engine already hands one's result to the other (`ToolSpec.next`, the card's
 * *Send to…*) carries those values — `evaluateWorkflow` runs the chain live,
 * the way each tool card does. Any other connection is descriptive: it says
 * what the step is for, and an AI deploying the workflow carries the values
 * across (`lib/workflowAgent.ts`).
 *
 * Nothing here is invented: a step's figures are what its tool computes from
 * what the reader typed or the connection carried, and a judgment left at its
 * default is reported as one (`ToolResult.judgments`). Pure and tested.
 */

import { defaultInput, runTool, toolById, ToolInputError, type ToolHandoff, type ToolInput, type ToolResult, type ToolSpec } from './tools'
import { cellKey, freeCellNear, type Cell } from './workflowGrid'

export type StepKind = 'data' | 'tool' | 'concept'

/** The `ref` of a data step that is the reader's own data rather than a published table. */
export const CUSTOM_DATA = 'custom'

export interface WorkflowNode {
  id: string
  kind: StepKind
  /** A tool's id (`reserving.chain_ladder`), a concept page's name, or `CUSTOM_DATA`. */
  ref: string
  col: number
  row: number
  /** What this step is for, in the reader's words. */
  note?: string
  /** A tool step's own input — what the reader set on its card. */
  input?: ToolInput
  /** The reader's own data: its name… */
  label?: string
  /** …and what it holds — a description, or the figures pasted in. */
  data?: string
}

export interface WorkflowEdge {
  from: string
  to: string
  /** What passes along it, in the reader's words. */
  note?: string
}

export interface Workflow {
  id: string
  title: string
  /** What the workflow is for — the brief an AI deploying it is given. */
  goal: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  updatedAt: number
}

export const EMPTY_TITLE = 'Untitled workflow'

export function newWorkflow(id: string, now: number, title = EMPTY_TITLE): Workflow {
  return { id, title, goal: '', nodes: [], edges: [], updatedAt: now }
}

// ─── What a step is ──────────────────────────────────────────────────────────

/** The tool behind a data or tool step (none for a concept, or the reader's own data). */
export function stepTool(node: Pick<WorkflowNode, 'kind' | 'ref'>): ToolSpec | undefined {
  return node.kind === 'concept' || node.ref === CUSTOM_DATA ? undefined : toolById(node.ref)
}

/** A step's name, as its card prints it. */
export function stepName(node: WorkflowNode): string {
  if (node.kind === 'concept') return node.ref
  if (node.ref === CUSTOM_DATA) return node.label?.trim() || 'Your data'
  return stepTool(node)?.name ?? node.ref
}

/** What the kind of step is called. */
export const KIND_LABEL: Record<StepKind, string> = {
  data: 'Data',
  tool: 'Calculation',
  concept: 'Concept',
}

/** The kind a tool makes a step of: a Data Sources tool is data, every other a calculation. */
export function kindOfTool(spec: ToolSpec): StepKind {
  return spec.area === 'data' ? 'data' : 'tool'
}

// ─── Editing ─────────────────────────────────────────────────────────────────

const touched = (wf: Workflow, patch: Partial<Workflow>, now: number): Workflow => ({ ...wf, ...patch, updatedAt: now })

/** The next free id: `n1`, `n2`… — never one a removed step had while it is still referenced. */
export function nextNodeId(wf: Workflow): string {
  let max = 0
  for (const n of wf.nodes) {
    const m = /^n(\d+)$/.exec(n.id)
    if (m) max = Math.max(max, Number(m[1]))
  }
  return `n${max + 1}`
}

export function takenCells(wf: Workflow): Set<string> {
  return new Set(wf.nodes.map(cellKey))
}

export interface NewStep {
  kind: StepKind
  ref: string
  label?: string
}

/**
 * Put a step on the board: after `after` (in the column to its right, level
 * with it or as near as that column has room, and connected from it, when that
 * connection is allowed), or else at the top of a new column at the board's
 * right edge.
 */
export function addStep(wf: Workflow, step: NewStep, now: number, after?: string | null): { workflow: Workflow; id: string } {
  const id = nextNodeId(wf)
  const taken = takenCells(wf)
  const prev = after ? wf.nodes.find(n => n.id === after) : undefined
  let cell: Cell
  if (prev) cell = freeCellNear(taken, { col: prev.col + 1, row: prev.row })
  else if (wf.nodes.length === 0) cell = { col: 0, row: 0 }
  else {
    const right = Math.max(...wf.nodes.map(n => n.col))
    cell = freeCellNear(taken, { col: right + 1, row: 0 })
  }
  const node: WorkflowNode = { id, kind: step.kind, ref: step.ref, col: cell.col, row: cell.row }
  if (step.label) node.label = step.label
  let next = touched(wf, { nodes: [...wf.nodes, node] }, now)
  if (prev && connectReason(next, prev.id, id) === null) next = connect(next, prev.id, id, now)
  return { workflow: next, id }
}

/** Move a step to another cell — only an empty one. Returns the workflow unchanged otherwise. */
export function moveStep(wf: Workflow, id: string, to: Cell, now: number): Workflow {
  if (to.col < 0 || to.row < 0) return wf
  const node = wf.nodes.find(n => n.id === id)
  if (!node || (node.col === to.col && node.row === to.row)) return wf
  if (wf.nodes.some(n => n.id !== id && n.col === to.col && n.row === to.row)) return wf
  return touched(wf, { nodes: wf.nodes.map(n => (n.id === id ? { ...n, col: to.col, row: to.row } : n)) }, now)
}

/** Take a step off the board, with every connection to or from it. */
export function removeStep(wf: Workflow, id: string, now: number): Workflow {
  return touched(wf, {
    nodes: wf.nodes.filter(n => n.id !== id),
    edges: wf.edges.filter(e => e.from !== id && e.to !== id),
  }, now)
}

export function updateStep(wf: Workflow, id: string, patch: Partial<Omit<WorkflowNode, 'id' | 'kind' | 'ref'>>, now: number): Workflow {
  return touched(wf, { nodes: wf.nodes.map(n => (n.id === id ? { ...n, ...patch } : n)) }, now)
}

export type ConnectRefusal = 'missing' | 'self' | 'duplicate' | 'cycle'

/** Why `from → to` can't be drawn, or null when it can. */
export function connectReason(wf: Workflow, from: string, to: string): ConnectRefusal | null {
  if (!wf.nodes.some(n => n.id === from) || !wf.nodes.some(n => n.id === to)) return 'missing'
  if (from === to) return 'self'
  if (wf.edges.some(e => e.from === from && e.to === to)) return 'duplicate'
  // A loop: `to` already leads back to `from`.
  if (reaches(wf, to, from)) return 'cycle'
  return null
}

/** What a refusal says, in one line. */
export const REFUSAL_TEXT: Record<ConnectRefusal, string> = {
  missing: 'That step is no longer on the board',
  self: 'A step can’t lead to itself',
  duplicate: 'Those two are already connected',
  cycle: 'That would loop back: a workflow runs one way',
}

/** Does a path of connections run from `a` to `b`? */
export function reaches(wf: Workflow, a: string, b: string): boolean {
  const out = new Map<string, string[]>()
  for (const e of wf.edges) out.set(e.from, [...(out.get(e.from) ?? []), e.to])
  const seen = new Set<string>()
  const stack = [a]
  while (stack.length) {
    const at = stack.pop()!
    if (at === b) return true
    if (seen.has(at)) continue
    seen.add(at)
    stack.push(...(out.get(at) ?? []))
  }
  return false
}

/** Draw `from → to`, if it may be drawn; otherwise the workflow unchanged. */
export function connect(wf: Workflow, from: string, to: string, now: number): Workflow {
  if (connectReason(wf, from, to) !== null) return wf
  return touched(wf, { edges: [...wf.edges, { from, to }] }, now)
}

export function disconnect(wf: Workflow, from: string, to: string, now: number): Workflow {
  return touched(wf, { edges: wf.edges.filter(e => !(e.from === from && e.to === to)) }, now)
}

export function updateEdge(wf: Workflow, from: string, to: string, patch: Partial<Pick<WorkflowEdge, 'note'>>, now: number): Workflow {
  return touched(wf, { edges: wf.edges.map(e => (e.from === from && e.to === to ? { ...e, ...patch } : e)) }, now)
}

export const edgeKey = (e: Pick<WorkflowEdge, 'from' | 'to'>) => `${e.from}>${e.to}`

// ─── What a connection does ──────────────────────────────────────────────────

/**
 * - `handoff`: tool to tool, along a hand-off the engine defines — the values
 *   flow, and the next card fills itself in;
 * - `informs`: a concept to a step — the method or judgment it rests on;
 * - `applies`: a step to a concept — where it is the worked instance of one;
 * - `feeds`: anything else — a step whose result the next one uses, said in
 *   words, which an AI deploying the workflow carries across.
 */
export type EdgeKind = 'handoff' | 'informs' | 'applies' | 'feeds'

export function handoffFor(from: WorkflowNode | undefined, to: WorkflowNode | undefined): ToolHandoff | undefined {
  if (!from || !to) return undefined
  const a = stepTool(from)
  const b = stepTool(to)
  if (!a || !b) return undefined
  return a.next?.find(h => h.tool === b.id)
}

export function edgeKind(wf: Workflow, e: Pick<WorkflowEdge, 'from' | 'to'>): EdgeKind {
  const from = wf.nodes.find(n => n.id === e.from)
  const to = wf.nodes.find(n => n.id === e.to)
  if (from?.kind === 'concept') return 'informs'
  if (to?.kind === 'concept') return 'applies'
  return handoffFor(from, to) ? 'handoff' : 'feeds'
}

export const EDGE_LABEL: Record<EdgeKind, string> = {
  handoff: 'sends values',
  informs: 'informs',
  applies: 'applies',
  feeds: 'feeds',
}

// ─── Running it ──────────────────────────────────────────────────────────────

/**
 * The order the steps run in: every step after all the steps that lead into
 * it, and otherwise in reading order — column by column, top to bottom.
 */
export function runOrder(wf: Workflow): WorkflowNode[] {
  const byId = new Map(wf.nodes.map(n => [n.id, n]))
  const indegree = new Map(wf.nodes.map(n => [n.id, 0]))
  for (const e of wf.edges) if (byId.has(e.from) && byId.has(e.to)) indegree.set(e.to, (indegree.get(e.to) ?? 0) + 1)
  const reading = (a: WorkflowNode, b: WorkflowNode) => a.col - b.col || a.row - b.row
  const ready = wf.nodes.filter(n => indegree.get(n.id) === 0).sort(reading)
  const out: WorkflowNode[] = []
  while (ready.length) {
    const n = ready.shift()!
    out.push(n)
    for (const e of wf.edges) {
      if (e.from !== n.id || !byId.has(e.to)) continue
      const left = (indegree.get(e.to) ?? 0) - 1
      indegree.set(e.to, left)
      if (left === 0) {
        ready.push(byId.get(e.to)!)
        ready.sort(reading)
      }
    }
  }
  // A loop can't be drawn (`connectReason`), but a stored workflow is untrusted:
  // anything left over runs last rather than not at all.
  for (const n of [...wf.nodes].sort(reading)) if (!out.includes(n)) out.push(n)
  return out
}

export interface StepRun {
  /** The input it ran on: its own, with what its connections carried laid over it. */
  input: ToolInput | null
  result: ToolResult | null
  error: string | null
  /** The fields a connection filled, by the step it came from. */
  piped: { from: string; fields: string[] }[]
}

/**
 * Run every tool step in order, each on its own input with whatever a
 * hand-off connection carries from the steps before it laid over the top —
 * so a chain reads live, the way one card does. A step whose input can't be
 * read says why and hands nothing on.
 */
export function evaluateWorkflow(wf: Workflow): Map<string, StepRun> {
  const runs = new Map<string, StepRun>()
  const byId = new Map(wf.nodes.map(n => [n.id, n]))
  for (const node of runOrder(wf)) {
    const spec = stepTool(node)
    if (!spec) continue
    const piped: StepRun['piped'] = []
    const carried: Partial<ToolInput> = {}
    for (const e of wf.edges) {
      if (e.to !== node.id) continue
      const from = byId.get(e.from)
      const handoff = handoffFor(from, node)
      const upstream = from && runs.get(from.id)
      if (!handoff || !upstream?.result) continue
      try {
        const values = handoff.build(upstream.result.input, upstream.result)
        Object.assign(carried, values)
        piped.push({ from: e.from, fields: Object.keys(values) })
      } catch {
        // A hand-off that can't read its source carries nothing.
      }
    }
    const input = { ...(node.input ?? {}), ...carried } as ToolInput
    try {
      const result = runTool(spec, input)
      runs.set(node.id, { input: result.input, result, error: null, piped })
    } catch (err) {
      const message = err instanceof ToolInputError ? `${err.field}: ${err.message}` : err instanceof Error ? err.message : String(err)
      runs.set(node.id, { input, result: null, error: message, piped })
    }
  }
  return runs
}

/**
 * What of a tool card's input is the step's *own*: the fields the reader moved
 * off their defaults, less those a connection fills. Only these are stored, so
 * a judgment the reader never touched still reads as left at its default
 * (`ToolResult.judgments`), and a value a connection carries is never frozen
 * into the step.
 */
export function stepOwnInput(spec: ToolSpec, input: ToolInput, piped: readonly string[] = []): ToolInput {
  const defaults = defaultInput(spec)
  const out: ToolInput = {}
  for (const [key, value] of Object.entries(input)) {
    if (piped.includes(key)) continue
    if (JSON.stringify(value) === JSON.stringify(defaults[key])) continue
    out[key] = value
  }
  return out
}

// ─── Reading it back ─────────────────────────────────────────────────────────

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)
const KINDS: StepKind[] = ['data', 'tool', 'concept']

/**
 * A stored workflow, read field by field: localStorage is the reader's own,
 * but a page must open whatever an older version or a hand edit left there.
 * Steps that can't be placed and connections to nowhere are dropped, and so
 * is any connection that would close a loop.
 */
export function parseWorkflow(raw: unknown): Workflow | null {
  if (!isObject(raw) || typeof raw.id !== 'string') return null
  const nodes: WorkflowNode[] = []
  const cells = new Set<string>()
  for (const n of Array.isArray(raw.nodes) ? raw.nodes : []) {
    if (!isObject(n) || typeof n.id !== 'string' || typeof n.ref !== 'string') continue
    if (!KINDS.includes(n.kind as StepKind)) continue
    const col = Number(n.col)
    const row = Number(n.row)
    if (!Number.isInteger(col) || !Number.isInteger(row) || col < 0 || row < 0) continue
    if (cells.has(`${col},${row}`) || nodes.some(m => m.id === n.id)) continue
    cells.add(`${col},${row}`)
    const node: WorkflowNode = { id: n.id, kind: n.kind as StepKind, ref: n.ref, col, row }
    if (typeof n.note === 'string') node.note = n.note
    if (typeof n.label === 'string') node.label = n.label
    if (typeof n.data === 'string') node.data = n.data
    if (isObject(n.input)) node.input = n.input as ToolInput
    nodes.push(node)
  }
  let wf: Workflow = {
    id: raw.id,
    title: typeof raw.title === 'string' && raw.title.trim() ? raw.title : EMPTY_TITLE,
    goal: typeof raw.goal === 'string' ? raw.goal : '',
    nodes,
    edges: [],
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : 0,
  }
  for (const e of Array.isArray(raw.edges) ? raw.edges : []) {
    if (!isObject(e) || typeof e.from !== 'string' || typeof e.to !== 'string') continue
    const next = connect(wf, e.from, e.to, wf.updatedAt)
    if (next === wf) continue
    wf = typeof e.note === 'string' ? updateEdge(next, e.from, e.to, { note: e.note }, wf.updatedAt) : next
  }
  return wf
}

// ─── Templates ───────────────────────────────────────────────────────────────

export interface WorkflowTemplate {
  id: string
  title: string
  goal: string
  /** Steps in reading order, each at its cell. */
  steps: (NewStep & Cell & { note?: string })[]
  /** Connections, by index into `steps`. */
  edges: [number, number][]
}

/**
 * A few workflows to start from, each one the chain a syllabus reading walks
 * through — built from the tools and concept pages the vault already has
 * (`workflow.test.ts` holds every ref to the engine and the vault).
 */
export const TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'reserve-review',
    title: 'Reserve review',
    goal: 'Estimate ultimate claims and the unpaid amount for each accident year by the development method, then by Bornhuetter-Ferguson, and compare the two.',
    steps: [
      { kind: 'concept', ref: 'Chain Ladder Method', col: 0, row: 1 },
      { kind: 'tool', ref: 'reserving.age_to_age_factors', col: 1, row: 0, note: 'Select the averages from the triangle.' },
      { kind: 'tool', ref: 'reserving.development_to_ultimate', col: 2, row: 0 },
      { kind: 'tool', ref: 'reserving.chain_ladder', col: 3, row: 0 },
      { kind: 'tool', ref: 'reserving.bornhuetter_ferguson', col: 3, row: 1 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [2, 4]],
  },
  {
    id: 'rate-indication',
    title: 'Rate indication',
    goal: 'Find the indicated rate change by the loss ratio method: premium at current rates, trended losses and the permissible loss ratio.',
    steps: [
      { kind: 'tool', ref: 'ratemaking.on_level_factors', col: 1, row: 0, note: 'Bring each year’s premium to current rates.' },
      { kind: 'tool', ref: 'ratemaking.trend_fit', col: 0, row: 1 },
      { kind: 'tool', ref: 'ratemaking.trend_factor', col: 1, row: 1 },
      { kind: 'tool', ref: 'ratemaking.expense_ratios', col: 0, row: 2 },
      { kind: 'tool', ref: 'ratemaking.permissible_loss_ratio', col: 1, row: 2 },
      { kind: 'tool', ref: 'ratemaking.loss_ratio_method', col: 2, row: 1 },
    ],
    edges: [[0, 5], [1, 2], [2, 5], [3, 4], [4, 5]],
  },
  {
    id: 'bond-risk',
    title: 'Bond pricing and risk',
    goal: 'Price a bond from its yield, then measure how sensitive that price is to a change in rates.',
    steps: [
      { kind: 'data', ref: 'data.yield_curve', col: 0, row: 0 },
      { kind: 'tool', ref: 'finance.bond_yield', col: 0, row: 1 },
      { kind: 'tool', ref: 'finance.bond_price', col: 1, row: 1 },
      { kind: 'tool', ref: 'finance.duration_convexity', col: 2, row: 1 },
      { kind: 'concept', ref: 'Duration', col: 2, row: 0 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [4, 3]],
  },
]

/** A template laid out as a fresh workflow. */
export function fromTemplate(t: WorkflowTemplate, id: string, now: number): Workflow {
  let wf: Workflow = {
    ...newWorkflow(id, now, t.title),
    goal: t.goal,
    nodes: t.steps.map((s, i) => {
      const node: WorkflowNode = { id: `n${i + 1}`, kind: s.kind, ref: s.ref, col: s.col, row: s.row }
      if (s.note) node.note = s.note
      if (s.label) node.label = s.label
      return node
    }),
  }
  for (const [a, b] of t.edges) wf = connect(wf, `n${a + 1}`, `n${b + 1}`, now)
  return wf
}
