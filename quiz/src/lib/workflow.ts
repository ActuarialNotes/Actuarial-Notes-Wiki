/**
 * **The Workflow Builder** (docs/workflow-builder.md) — a workflow as data:
 * data, calculations and concepts as steps on a grid, joined by directed
 * connections that say what flows into what, and the pure functions that keep
 * one valid and run it.
 *
 * Four kinds of step:
 * - **data** — a Data Sources tool (a published table: life table, price
 *   index, yield curve), the reader's own data described in words, or a CSV
 *   they uploaded (`lib/workflowCsv.ts`), its columns mapped onto the inputs
 *   of the steps it connects to;
 * - **tool** — a calculation: any other Actuarial Tool (`lib/tools`);
 * - **concept** — a vault concept page: the method, definition or judgment a
 *   step rests on;
 * - **workflow** — a whole workflow from the reader's library, or a template,
 *   as one step: a **sub-workflow**. It joins the steps around it through its
 *   own first and last calculations (`entrySteps`, `exitResults`), so a
 *   workflow can be read at whichever level of detail suits.
 *
 * A connection runs one way, from a step to one that follows it, and a
 * workflow never loops back on itself (`connectReason`): it is a procedure,
 * read and run in order (`runOrder`). A connection between two tools whose
 * engine already hands one's result to the other (`ToolSpec.next`, the card's
 * *Send to…*) carries those values — `evaluateWorkflow` runs the chain live,
 * the way each tool card does. Any other connection is descriptive: it says
 * what the step is for, and Claude carries the values across when the reader
 * runs the workflow through the connector (`lib/workflowBrief.ts`).
 *
 * Nothing here is invented: a step's figures are what its tool computes from
 * what the reader typed or the connection carried, and a judgment left at its
 * default is reported as one (`ToolResult.judgments`). Pure and tested.
 */

import { defaultInput, runTool, toolById, ToolInputError, type ToolHandoff, type ToolInput, type ToolResult, type ToolSpec } from './tools'
import { STEP, fits, freeCellNear, nearestFit, type Cell } from './workflowGrid'
import { csvInput, guessMapping, parseCsvTable, parseMapping, type CsvMapping, type CsvTable } from './workflowCsv'

export type StepKind = 'data' | 'tool' | 'concept' | 'workflow'

/** The `ref` of a data step that is the reader's own data, described in words. */
export const CUSTOM_DATA = 'custom'
/** The `ref` of a data step that is a CSV the reader uploaded. */
export const CSV_DATA = 'csv'
/** A sub-workflow's `ref` for a template, rather than a workflow in the reader's library. */
export const TEMPLATE_PREFIX = 'template:'

export interface WorkflowNode {
  id: string
  kind: StepKind
  /**
   * A tool's id (`reserving.chain_ladder`), a concept page's name,
   * `CUSTOM_DATA` or `CSV_DATA`, or — for a sub-workflow — a library
   * workflow's id or `template:<id>`.
   */
  ref: string
  col: number
  row: number
  /** What this step is for, in the reader's words. */
  note?: string
  /** A tool step's own input — what the reader set on its card. */
  input?: ToolInput
  /** The reader's own data: its name (a sub-workflow's title, as last seen)… */
  label?: string
  /** …and what it holds — a description, or the figures pasted in. */
  data?: string
  /** An uploaded CSV, as it was read. */
  csv?: CsvTable
}

export interface WorkflowEdge {
  from: string
  to: string
  /** What passes along it, in the reader's words. */
  note?: string
  /** From a CSV: which of its columns fill which of the next tool's inputs. */
  map?: CsvMapping
}

export interface Workflow {
  id: string
  title: string
  /** What the workflow is for — the goal the brief for Claude opens with. */
  goal: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  updatedAt: number
  /**
   * Which grid the steps' positions are in. 2 is the fine grid
   * (`lib/workflowGrid.ts`); a workflow saved before it had none, and its
   * coarse cells are spread onto the fine grid as it is read (`parseWorkflow`).
   */
  grid: typeof GRID_VERSION
  /** In the reader's library: listed on the starting screen, and usable as a sub-workflow. */
  saved?: boolean
}

export const EMPTY_TITLE = 'Untitled workflow'
export const GRID_VERSION = 2

export function newWorkflow(id: string, now: number, title = EMPTY_TITLE): Workflow {
  return { id, title, goal: '', nodes: [], edges: [], updatedAt: now, grid: GRID_VERSION }
}

// ─── What a step is ──────────────────────────────────────────────────────────

/** The tool behind a data or tool step (none for a concept, the reader's own data or a sub-workflow). */
export function stepTool(node: Pick<WorkflowNode, 'kind' | 'ref'>): ToolSpec | undefined {
  if (node.kind === 'concept' || node.kind === 'workflow' || node.ref === CUSTOM_DATA || node.ref === CSV_DATA) return undefined
  return toolById(node.ref)
}

/** A step's name, as its card prints it. */
export function stepName(node: WorkflowNode): string {
  if (node.kind === 'concept') return node.ref
  if (node.kind === 'workflow') return node.label?.trim() || 'Workflow'
  if (node.ref === CSV_DATA) return node.csv?.name || 'Your CSV'
  if (node.ref === CUSTOM_DATA) return node.label?.trim() || 'Your data'
  return stepTool(node)?.name ?? node.ref
}

/** What the kind of step is called. */
export const KIND_LABEL: Record<StepKind, string> = {
  data: 'Data',
  tool: 'Calculation',
  concept: 'Concept',
  workflow: 'Workflow',
}

// ─── Sub-workflows ───────────────────────────────────────────────────────────

/** Finds the workflow a sub-workflow step names: one in the reader's library, or a template. */
export type WorkflowResolver = (ref: string) => Workflow | undefined

/** How deep sub-workflows may nest before evaluation stops — far past anything useful. */
const MAX_DEPTH = 6

const templateCache = new Map<string, Workflow>()
/** A template as a workflow, under its sub-workflow ref (`template:<id>`). */
export function templateWorkflow(ref: string): Workflow | undefined {
  if (!ref.startsWith(TEMPLATE_PREFIX)) return undefined
  if (!templateCache.has(ref)) {
    const t = TEMPLATES.find(x => TEMPLATE_PREFIX + x.id === ref)
    if (!t) return undefined
    templateCache.set(ref, fromTemplate(t, ref, 0))
  }
  return templateCache.get(ref)
}

/** A resolver over the reader's workflows, falling back to the templates. */
export function resolverFor(workflows: readonly Workflow[]): WorkflowResolver {
  const byId = new Map(workflows.map(w => [w.id, w]))
  return ref => byId.get(ref) ?? templateWorkflow(ref)
}

/** Does the workflow `ref` hold `target` as a step, at any depth? */
export function contains(resolve: WorkflowResolver, ref: string, target: string, depth = 0): boolean {
  const wf = resolve(ref)
  if (!wf || depth > MAX_DEPTH) return false
  return wf.nodes.some(n => n.kind === 'workflow' && (n.ref === target || contains(resolve, n.ref, target, depth + 1)))
}

/** May workflow `ref` go on `host`'s board? Not itself, and nothing that already holds it. */
export function canNest(resolve: WorkflowResolver, hostId: string, ref: string): boolean {
  return ref !== hostId && !contains(resolve, ref, hostId)
}

/** Steps nothing leads into: where a sub-workflow is entered. */
export function sourceSteps(wf: Workflow): WorkflowNode[] {
  return wf.nodes.filter(n => !wf.edges.some(e => e.to === n.id))
}

/** Steps that lead nowhere: what a sub-workflow hands on. */
export function sinkSteps(wf: Workflow): WorkflowNode[] {
  return wf.nodes.filter(n => !wf.edges.some(e => e.from === n.id))
}

/**
 * Where values coming into a step land: a calculation itself, or — for a
 * sub-workflow — each of its first calculations (those nothing inside it leads
 * into).
 */
export function entrySteps(node: WorkflowNode, resolve?: WorkflowResolver): { node: WorkflowNode; spec: ToolSpec }[] {
  if (node.kind === 'workflow') {
    const inner = resolve?.(node.ref)
    if (!inner) return []
    return sourceSteps(inner).flatMap(n => {
      const spec = stepTool(n)
      return spec ? [{ node: n, spec }] : []
    })
  }
  const spec = stepTool(node)
  return spec ? [{ node, spec }] : []
}

/** The calculations a step hands its results on from: itself, or a sub-workflow's last ones. */
export function exitSpecs(node: WorkflowNode, resolve?: WorkflowResolver, depth = 0): ToolSpec[] {
  if (node.kind === 'workflow') {
    const inner = resolve?.(node.ref)
    if (!inner || depth > MAX_DEPTH) return []
    return sinkSteps(inner).flatMap(n => exitSpecs(n, resolve, depth + 1))
  }
  const spec = stepTool(node)
  return spec ? [spec] : []
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

/** Where every card but `except` sits — what a move or a new step must keep clear of. */
export function otherCards(wf: Workflow, except?: string): Cell[] {
  return wf.nodes.filter(n => n.id !== except)
}

export interface NewStep {
  kind: StepKind
  ref: string
  label?: string
  csv?: CsvTable
}

/**
 * Put a step on the board: after `after` (a `STEP` to its right, level with it
 * or as near as there is room, and connected from it, when that connection is
 * allowed), or else beside the board's right edge, level with its top.
 */
export function addStep(wf: Workflow, step: NewStep, now: number, after?: string | null): { workflow: Workflow; id: string } {
  const id = nextNodeId(wf)
  const cards = otherCards(wf)
  const prev = after ? wf.nodes.find(n => n.id === after) : undefined
  let cell: Cell
  if (prev) cell = freeCellNear(cards, { col: prev.col + STEP.cols, row: prev.row })
  else if (wf.nodes.length === 0) cell = { col: 0, row: 0 }
  else {
    const right = Math.max(...wf.nodes.map(n => n.col))
    const top = Math.min(...wf.nodes.map(n => n.row))
    cell = freeCellNear(cards, { col: right + STEP.cols, row: top })
  }
  const node: WorkflowNode = { id, kind: step.kind, ref: step.ref, col: cell.col, row: cell.row }
  if (step.label) node.label = step.label
  if (step.csv) node.csv = step.csv
  let next = touched(wf, { nodes: [...wf.nodes, node] }, now)
  if (prev && connectReason(next, prev.id, id) === null) next = link(next, prev.id, id, now)
  return { workflow: next, id }
}

/** Where a step dropped at `at` lands: there, or the nearest place clear of every other card. */
export function landingCell(wf: Workflow, id: string, at: Cell): Cell {
  return nearestFit(otherCards(wf, id), at)
}

/**
 * Move a step anywhere on the board. A drop on top of another card lands in
 * the nearest place clear of it (`landingCell`), so a move is never refused.
 */
export function moveStep(wf: Workflow, id: string, to: Cell, now: number): Workflow {
  const node = wf.nodes.find(n => n.id === id)
  if (!node) return wf
  const at = landingCell(wf, id, to)
  if (node.col === at.col && node.row === at.row) return wf
  return touched(wf, { nodes: wf.nodes.map(n => (n.id === id ? { ...n, col: at.col, row: at.row } : n)) }, now)
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

/**
 * Draw `from → to` as the reader does: a connection out of a CSV into a tool
 * starts with a guess at which columns fill which inputs (`guessMapping`), for
 * the reader to check on the connection's panel.
 */
export function link(wf: Workflow, from: string, to: string, now: number): Workflow {
  const next = connect(wf, from, to, now)
  if (next === wf) return next
  const source = wf.nodes.find(n => n.id === from)
  const target = wf.nodes.find(n => n.id === to)
  const spec = target && stepTool(target)
  if (source?.ref !== CSV_DATA || !source.csv || !spec) return next
  const map = guessMapping(source.csv, spec)
  return Object.keys(map).length ? updateEdge(next, from, to, { map }, now) : next
}

export function disconnect(wf: Workflow, from: string, to: string, now: number): Workflow {
  return touched(wf, { edges: wf.edges.filter(e => !(e.from === from && e.to === to)) }, now)
}

export function updateEdge(wf: Workflow, from: string, to: string, patch: Partial<Pick<WorkflowEdge, 'note' | 'map'>>, now: number): Workflow {
  return touched(wf, { edges: wf.edges.map(e => (e.from === from && e.to === to ? { ...e, ...patch } : e)) }, now)
}

export const edgeKey = (e: Pick<WorkflowEdge, 'from' | 'to'>) => `${e.from}>${e.to}`

// ─── What a connection does ──────────────────────────────────────────────────

/**
 * - `handoff`: tool to tool, along a hand-off the engine defines — the values
 *   flow, and the next card fills itself in (the step is *linked*);
 * - `informs`: a concept to a step — the method or judgment it rests on;
 * - `applies`: a step to a concept — where it is the worked instance of one;
 * - `feeds`: anything else — a step whose result the next one uses, said in
 *   words, which Claude carries across when the workflow is run.
 */
export type EdgeKind = 'handoff' | 'informs' | 'applies' | 'feeds'

export function handoffFor(from: WorkflowNode | undefined, to: WorkflowNode | undefined): ToolHandoff | undefined {
  if (!from || !to) return undefined
  const a = stepTool(from)
  const b = stepTool(to)
  if (!a || !b) return undefined
  return a.next?.find(h => h.tool === b.id)
}

/** Does any calculation `from` hands on from have a hand-off to one `to` is entered by? */
function linksThrough(from: WorkflowNode, to: WorkflowNode, resolve?: WorkflowResolver): boolean {
  const exits = exitSpecs(from, resolve)
  return entrySteps(to, resolve).some(({ spec }) => exits.some(a => a.next?.some(h => h.tool === spec.id)))
}

export function edgeKind(wf: Workflow, e: Pick<WorkflowEdge, 'from' | 'to'> & { map?: CsvMapping }, resolve?: WorkflowResolver): EdgeKind {
  const from = wf.nodes.find(n => n.id === e.from)
  const to = wf.nodes.find(n => n.id === e.to)
  if (!from || !to) return 'feeds'
  if (from.kind === 'concept') return 'informs'
  if (to.kind === 'concept') return 'applies'
  // A CSV is a link once its columns are mapped onto the next tool's inputs.
  if (from.ref === CSV_DATA) {
    const edge = wf.edges.find(x => x.from === e.from && x.to === e.to) ?? e
    return stepTool(to) && edge.map && Object.keys(edge.map).length ? 'handoff' : 'feeds'
  }
  return linksThrough(from, to, resolve) ? 'handoff' : 'feeds'
}

/**
 * What a connection is called on the board. Only a concept's says anything:
 * values moving from one step to the next are the line itself, and need no
 * word on it.
 */
export function edgeLabel(kind: EdgeKind): string | null {
  return kind === 'informs' || kind === 'applies' ? kind : null
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
  /**
   * The fields a connection filled, by the step it came from. For a
   * sub-workflow, each named with the step inside it that took it in
   * (`Trend Fit: points`).
   */
  piped: { from: string; fields: string[] }[]
  /** What the step hands on: its own result, or a sub-workflow's last calculations' results. */
  exits: ToolResult[]
  /** A sub-workflow's own steps, run. */
  inner?: { workflow: Workflow; runs: Map<string, StepRun> }
}

/** Values carried into the calculation `spec` along one connection from `from`. */
function carriedInto(
  from: WorkflowNode,
  edge: WorkflowEdge,
  upstream: StepRun | undefined,
  spec: ToolSpec,
): Partial<ToolInput> {
  if (from.ref === CSV_DATA) return from.csv ? csvInput(from.csv, spec, edge.map) : {}
  const out: Partial<ToolInput> = {}
  for (const result of upstream?.exits ?? []) {
    const handoff = toolById(result.tool)?.next?.find(h => h.tool === spec.id)
    if (!handoff) continue
    try {
      Object.assign(out, handoff.build(result.input, result))
    } catch {
      // A hand-off that can't read its source carries nothing.
    }
  }
  return out
}

const errorText = (err: unknown) => (err instanceof ToolInputError ? `${err.field}: ${err.message}` : err instanceof Error ? err.message : String(err))

/**
 * Run every calculation in order, each on its own input with whatever a link
 * carries from the steps before it laid over the top — so a chain reads live,
 * the way one card does. A link is an engine hand-off from a calculation (or
 * from a sub-workflow's last calculations), or a CSV's mapped columns.
 *
 * A sub-workflow is run whole, on its own steps' inputs, with what links into
 * it laid over its first calculations (`overrides`, by the inner step's id); it
 * hands on its last calculations' results. A step whose input can't be read
 * says why and hands nothing on; a sub-workflow that is no longer in the
 * library says so.
 */
export function evaluateWorkflow(
  wf: Workflow,
  resolve?: WorkflowResolver,
  overrides?: ReadonlyMap<string, Partial<ToolInput>>,
  depth = 0,
): Map<string, StepRun> {
  const runs = new Map<string, StepRun>()
  const byId = new Map(wf.nodes.map(n => [n.id, n]))
  for (const node of runOrder(wf)) {
    const into = wf.edges.filter(e => e.to === node.id)
    if (node.kind === 'workflow') {
      const inner = resolve?.(node.ref)
      if (!inner || depth >= MAX_DEPTH) {
        runs.set(node.id, { input: null, result: null, error: inner ? 'Sub-workflows nest too deep here.' : 'This workflow is no longer in your library.', piped: [], exits: [] })
        continue
      }
      const innerOverrides = new Map<string, Partial<ToolInput>>()
      const piped: StepRun['piped'] = []
      for (const e of into) {
        const from = byId.get(e.from)
        if (!from) continue
        const fields: string[] = []
        for (const { node: entry, spec } of entrySteps(node, resolve)) {
          const values = carriedInto(from, e, runs.get(from.id), spec)
          if (!Object.keys(values).length) continue
          innerOverrides.set(entry.id, { ...(innerOverrides.get(entry.id) ?? {}), ...values })
          fields.push(...Object.keys(values).map(f => `${stepName(entry)}: ${f}`))
        }
        if (fields.length) piped.push({ from: e.from, fields })
      }
      const innerRuns = evaluateWorkflow(inner, resolve, innerOverrides, depth + 1)
      const exits = sinkSteps(inner).flatMap(n => innerRuns.get(n.id)?.exits ?? [])
      runs.set(node.id, { input: null, result: null, error: null, piped, exits, inner: { workflow: inner, runs: innerRuns } })
      continue
    }
    const spec = stepTool(node)
    if (!spec) continue
    const piped: StepRun['piped'] = []
    const carried: Partial<ToolInput> = { ...(overrides?.get(node.id) ?? {}) }
    for (const e of into) {
      const from = byId.get(e.from)
      if (!from) continue
      const values = carriedInto(from, e, runs.get(from.id), spec)
      if (!Object.keys(values).length) continue
      Object.assign(carried, values)
      piped.push({ from: e.from, fields: Object.keys(values) })
    }
    const input = { ...(node.input ?? {}), ...carried } as ToolInput
    try {
      const result = runTool(spec, input)
      runs.set(node.id, { input: result.input, result, error: null, piped, exits: [result] })
    } catch (err) {
      runs.set(node.id, { input, result: null, error: errorText(err), piped, exits: [] })
    }
  }
  return runs
}

/** How many of a sub-workflow's calculations can't run on what they have — said on its card. */
export function innerErrors(run: StepRun | undefined): number {
  if (!run?.inner) return 0
  let n = 0
  for (const r of run.inner.runs.values()) n += r.error ? 1 : innerErrors(r)
  return n
}

/**
 * A workflow with every sub-workflow step named by what it resolves to now —
 * a library workflow renamed since it was added reads under its new name.
 */
export function withResolvedLabels(wf: Workflow, resolve: WorkflowResolver): Workflow {
  let changed = false
  const nodes = wf.nodes.map(n => {
    if (n.kind !== 'workflow') return n
    const title = resolve(n.ref)?.title
    if (!title || title === n.label) return n
    changed = true
    return { ...n, label: title }
  })
  return changed ? { ...wf, nodes } : wf
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

/**
 * Which of an upstream step's headline figures a connection carries: the tile
 * whose value is one the hand-off put into the next step's input (`input`, the
 * fields named). The board marks it on the upstream card while the step it
 * feeds is open, so the reader sees where the linked value came from. -1 when
 * no headline figure is carried — a hand-off of a whole table, say.
 */
export function carriedTile(upstream: ToolResult, input: ToolInput, fields: readonly string[]): number {
  const carried = fields.map(f => input[f]).filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
  return upstream.tiles.findIndex(t => carried.some(v => Math.abs(t.value - v) <= 1e-9 * Math.max(1, Math.abs(v))))
}

// ─── Reading it back ─────────────────────────────────────────────────────────

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)
const KINDS: StepKind[] = ['data', 'tool', 'concept', 'workflow']

/**
 * A stored workflow, read field by field: localStorage is the reader's own,
 * but a page must open whatever an older version or a hand edit left there.
 * A workflow from before the fine grid has its cells spread onto it; a step
 * that lands on another is moved to the nearest place clear of it; connections
 * to nowhere are dropped, and so is any connection that would close a loop.
 */
export function parseWorkflow(raw: unknown): Workflow | null {
  if (!isObject(raw) || typeof raw.id !== 'string') return null
  // The first grid was coarse: a cell a card wide and a card high.
  const spread = raw.grid === GRID_VERSION ? { cols: 1, rows: 1 } : STEP
  const nodes: WorkflowNode[] = []
  for (const n of Array.isArray(raw.nodes) ? raw.nodes : []) {
    if (!isObject(n) || typeof n.id !== 'string' || typeof n.ref !== 'string') continue
    if (!KINDS.includes(n.kind as StepKind)) continue
    if (nodes.some(m => m.id === n.id)) continue
    const stored = { col: Number(n.col) * spread.cols, row: Number(n.row) * spread.rows }
    if (!Number.isInteger(stored.col) || !Number.isInteger(stored.row)) continue
    const { col, row } = fits(nodes, stored) ? stored : nearestFit(nodes, stored)
    const node: WorkflowNode = { id: n.id, kind: n.kind as StepKind, ref: n.ref, col, row }
    if (typeof n.note === 'string') node.note = n.note
    if (typeof n.label === 'string') node.label = n.label
    if (typeof n.data === 'string') node.data = n.data
    if (isObject(n.input)) node.input = n.input as ToolInput
    if (n.ref === CSV_DATA) {
      const csv = parseCsvTable(n.csv)
      if (csv) node.csv = csv
    }
    nodes.push(node)
  }
  let wf: Workflow = {
    id: raw.id,
    title: typeof raw.title === 'string' && raw.title.trim() ? raw.title : EMPTY_TITLE,
    goal: typeof raw.goal === 'string' ? raw.goal : '',
    nodes,
    edges: [],
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : 0,
    grid: GRID_VERSION,
  }
  if (raw.saved === true) wf.saved = true
  for (const e of Array.isArray(raw.edges) ? raw.edges : []) {
    if (!isObject(e) || typeof e.from !== 'string' || typeof e.to !== 'string') continue
    const next = connect(wf, e.from, e.to, wf.updatedAt)
    if (next === wf) continue
    const patch: Partial<Pick<WorkflowEdge, 'note' | 'map'>> = {}
    if (typeof e.note === 'string') patch.note = e.note
    const map = parseMapping(e.map)
    if (map) patch.map = map
    wf = Object.keys(patch).length ? updateEdge(next, e.from, e.to, patch, wf.updatedAt) : next
  }
  return wf
}

// ─── Templates ───────────────────────────────────────────────────────────────

export interface WorkflowTemplate {
  id: string
  title: string
  goal: string
  /** Steps in reading order, each placed in `STEP`s — a card and a gutter. */
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
      const node: WorkflowNode = { id: `n${i + 1}`, kind: s.kind, ref: s.ref, col: s.col * STEP.cols, row: s.row * STEP.rows }
      if (s.note) node.note = s.note
      if (s.label) node.label = s.label
      return node
    }),
  }
  for (const [a, b] of t.edges) wf = connect(wf, `n${a + 1}`, `n${b + 1}`, now)
  return wf
}
