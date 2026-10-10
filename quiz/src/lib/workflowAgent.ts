/**
 * **Deploying a workflow with AI** (docs/workflow-builder.md) — the reader's
 * own Anthropic API key, Claude, and the workflow's own steps as its tools.
 *
 * The agent is given the workflow as a brief (`describeWorkflow`: every step
 * in run order, what it is for, what leads into it, its current input and
 * result) and three tools that run *here*, in the browser, on the same engine
 * as the cards: `run_tool` (any calculation on the workflow), `describe_tool`
 * (a tool's input schema) and `read_concept` (a concept page on the workflow).
 * It works the steps in order, carries values along the connections the
 * engine doesn't wire itself, and writes the result up. The connector's
 * contract holds (docs/ai-connector.md): it computes nothing itself, names the
 * judgments left at their defaults, and invents no data a step needs.
 *
 * The request is built and the loop run here, but the transport is injected
 * (`send`), so the loop is tested without the SDK or the network; the page
 * hands in the SDK's `beta.messages.create`. The key never leaves the browser
 * except to api.anthropic.com.
 */

import type Anthropic from '@anthropic-ai/sdk'
import { describeTool, formatValue, runTool, toolById, ToolInputError } from './tools'
import {
  CUSTOM_DATA,
  EDGE_LABEL,
  KIND_LABEL,
  edgeKind,
  runOrder,
  stepName,
  stepTool,
  type StepRun,
  type Workflow,
} from './workflow'

export type AgentMessage = Anthropic.Beta.BetaMessage
export type AgentParams = Anthropic.Beta.MessageCreateParamsNonStreaming

/** The model a workflow is deployed on. */
export const WORKFLOW_MODEL = 'claude-opus-5-5'
/** How many model turns one deployment may take before it stops and says so. */
export const MAX_TURNS = 24
/** Server-side refusal fallback: a declined turn is re-run on a model the API picks. */
const FALLBACK_BETA = 'server-side-fallback-2026-07-01'
/** The most a single tool result hands back, in characters. */
const RESULT_LIMIT = 16_000
const CONCEPT_LIMIT = 14_000

const json = (v: unknown, limit: number) => {
  const s = JSON.stringify(v)
  return s.length > limit ? `${s.slice(0, limit)}… [cut at ${limit} characters]` : s
}

export type BriefAudience = 'api' | 'connector'

/**
 * The workflow as a brief: its goal, then every step in run order with what
 * it is, what it is for, what leads into it and out of it, and — for a tool —
 * the input it currently runs on and what that gave. The same text is the
 * deployed agent's first message and what *Copy for Claude* puts on the
 * clipboard for a reader who uses the Actuarial Notes connector instead.
 */
export function describeWorkflow(wf: Workflow, runs: Map<string, StepRun>, audience: BriefAudience = 'api'): string {
  const order = runOrder(wf)
  const number = new Map(order.map((n, i) => [n.id, i + 1]))
  const label = (id: string) => {
    const n = wf.nodes.find(m => m.id === id)
    return n ? `step ${number.get(id)} (${stepName(n)})` : id
  }
  const lines: string[] = []
  lines.push(`# Workflow: ${wf.title}`)
  lines.push('')
  lines.push(wf.goal.trim() ? `Goal: ${wf.goal.trim()}` : 'Goal: none given — work out what the workflow computes and report that.')
  if (audience === 'connector') {
    lines.push('')
    lines.push('Run it with the Actuarial Notes connector: `run_tool` for every calculation (never the arithmetic yourself), `describe_tool` for a tool\'s inputs, and `get_concept` for each concept step.')
  }
  lines.push('')
  lines.push(`## Steps, in run order (${order.length})`)
  for (const node of order) {
    lines.push('')
    const spec = stepTool(node)
    const kind = KIND_LABEL[node.kind]
    lines.push(`### ${number.get(node.id)}. ${stepName(node)} — ${kind}${spec ? ` (\`${spec.id}\`)` : ''}`)
    if (spec) lines.push(`Answers: ${spec.answers}`)
    if (node.note?.trim()) lines.push(`Note: ${node.note.trim()}`)
    const into = wf.edges.filter(e => e.to === node.id)
    const outOf = wf.edges.filter(e => e.from === node.id)
    if (into.length) lines.push(`Comes after: ${into.map(e => `${label(e.from)} — ${EDGE_LABEL[edgeKind(wf, e)]}${e.note ? `: ${e.note}` : ''}`).join('; ')}`)
    if (outOf.length) lines.push(`Leads to: ${outOf.map(e => `${label(e.to)} — ${EDGE_LABEL[edgeKind(wf, e)]}${e.note ? `: ${e.note}` : ''}`).join('; ')}`)
    if (node.kind === 'concept') {
      lines.push(`A concept page: read it (${audience === 'api' ? '`read_concept`' : '`get_concept`'}) and apply it to the steps it informs.`)
    } else if (node.ref === CUSTOM_DATA) {
      lines.push(node.data?.trim() ? `The user's data:\n\n${node.data.trim()}` : 'The user\'s own data — they described none. Say what this step needs and ask for it.')
    } else {
      const run = runs.get(node.id)
      if (run?.piped.length) {
        lines.push(`Filled by its connections: ${run.piped.map(p => `${p.fields.join(', ')} from ${label(p.from)}`).join('; ')}`)
      }
      if (run?.result) {
        lines.push(`Current input: ${json(run.result.input, 3000)}`)
        lines.push(`Current result: ${run.result.summary}`)
        const defaults = run.result.judgments.filter(j => j.default)
        if (defaults.length) lines.push(`Judgments left at their default: ${defaults.map(j => j.label).join(', ')}`)
        if (run.result.warnings.length) lines.push(`Warnings: ${run.result.warnings.join(' ')}`)
      } else if (run?.error) {
        lines.push(`Its current input can't be read: ${run.error}`)
      }
    }
  }
  return lines.join('\n')
}

export const SYSTEM_PROMPT = [
  'You deploy actuarial workflows built in Actuarial Notes\' Workflow Builder, for a student of the SOA and CAS exams.',
  'The user\'s message is the workflow: its goal, and its steps in the order they run — data, calculations and concept pages, with the connections between them.',
  '',
  'Work through the steps in order.',
  '- Every figure comes from `run_tool`. Never do the arithmetic yourself, not even a sum.',
  '- A step\'s current input is what the user set on its card; run it as it stands unless a connection says to pass an earlier result into it.',
  '- "sends values" connections are already wired: the brief shows the values they carried. For a "feeds" connection, read what the earlier step returned and pass the values the next tool needs into its input. Call `describe_tool` first when you change a tool\'s input.',
  '- For a concept step, `read_concept` and use what the page says — a method\'s steps, a definition, a judgment — in the steps it informs.',
  '- A judgment left at its default is the user\'s call, not a selection: say which you ran at their defaults.',
  '- Invent no data. If a step needs figures the workflow does not hold, say exactly what is missing rather than assuming a value.',
  '- Quote every warning a tool returns.',
  '',
  'Finish with a short report in markdown: the answer to the goal, a line per step with its headline result, the judgments left at their defaults, the warnings, and what the user should check before relying on it. This is study material, not professional actuarial advice; say so once.',
].join('\n')

/** The tools a deployment of this workflow may call — only what is on it. */
export function agentTools(wf: Workflow): Anthropic.Beta.BetaTool[] {
  const tools = [...new Set(wf.nodes.map(n => stepTool(n)?.id).filter((id): id is string => !!id))]
  const concepts = [...new Set(wf.nodes.filter(n => n.kind === 'concept').map(n => n.ref))]
  const out: Anthropic.Beta.BetaTool[] = []
  if (tools.length) {
    out.push({
      name: 'run_tool',
      description: 'Run one of the workflow\'s calculations on the Actuarial Notes engine and get its result: headline figures, values, judgments and warnings. Fields left out take their defaults.',
      input_schema: {
        type: 'object',
        properties: {
          tool: { type: 'string', enum: tools, description: 'The tool id, as the workflow names it.' },
          input: { type: 'object', description: 'The tool\'s input, field by field (see describe_tool).', additionalProperties: true },
        },
        required: ['tool', 'input'],
      },
    })
    out.push({
      name: 'describe_tool',
      description: 'A workflow tool\'s inputs as JSON Schema, with what it computes and the method it follows.',
      input_schema: {
        type: 'object',
        properties: { tool: { type: 'string', enum: tools } },
        required: ['tool'],
      },
    })
  }
  if (concepts.length) {
    out.push({
      name: 'read_concept',
      description: 'Read one of the workflow\'s concept pages from the Actuarial Notes vault (markdown).',
      input_schema: {
        type: 'object',
        properties: { name: { type: 'string', enum: concepts } },
        required: ['name'],
      },
    })
  }
  return out
}

export interface ToolCallOutcome {
  content: string
  isError: boolean
  /** One line for the deployment log. */
  summary: string
}

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Answer one of the agent's tool calls, here in the browser. */
export function callAgentTool(
  wf: Workflow,
  name: string,
  raw: unknown,
  readConcept: (name: string) => string | undefined,
): ToolCallOutcome {
  const input = isObject(raw) ? raw : {}
  const onWorkflow = (id: unknown) => typeof id === 'string' && wf.nodes.some(n => stepTool(n)?.id === id)
  const fail = (message: string): ToolCallOutcome => ({ content: message, isError: true, summary: message })

  if (name === 'run_tool') {
    if (!onWorkflow(input.tool)) return fail(`"${String(input.tool)}" is not a tool on this workflow.`)
    const spec = toolById(input.tool as string)!
    try {
      const result = runTool(spec, isObject(input.input) ? input.input : {})
      const payload = {
        tool: result.tool,
        summary: result.summary,
        tiles: result.tiles.map(t => ({ label: t.label, symbol: t.symbol, value: t.value, shown: formatValue(t.value, t.unit) })),
        values: result.values,
        table: result.table && { columns: result.table.columns.map(c => c.key), rows: result.table.rows.slice(0, 60), footer: result.table.footer },
        judgments: result.judgments.map(j => ({ field: j.field, label: j.label, value: j.value, left_at_default: j.default })),
        warnings: result.warnings,
        input: result.input,
      }
      return { content: json(payload, RESULT_LIMIT), isError: false, summary: result.summary }
    } catch (err) {
      if (err instanceof ToolInputError) return fail(`${spec.name}: ${err.field} — ${err.message}`)
      return fail(`${spec.name} failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }
  if (name === 'describe_tool') {
    if (!onWorkflow(input.tool)) return fail(`"${String(input.tool)}" is not a tool on this workflow.`)
    const spec = toolById(input.tool as string)!
    return { content: json(describeTool(spec), RESULT_LIMIT), isError: false, summary: `Read ${spec.name}'s inputs` }
  }
  if (name === 'read_concept') {
    const wanted = typeof input.name === 'string' ? input.name : ''
    const node = wf.nodes.find(n => n.kind === 'concept' && n.ref.toLowerCase() === wanted.toLowerCase())
    if (!node) return fail(`"${wanted}" is not a concept on this workflow.`)
    const page = readConcept(node.ref)
    if (!page) return fail(`The page for ${node.ref} isn't in the notes.`)
    const body = page.replace(/^---\n[\s\S]*?\n---\n?/, '').trim()
    return {
      content: body.length > CONCEPT_LIMIT ? `${body.slice(0, CONCEPT_LIMIT)}…` : body,
      isError: false,
      summary: `Read ${node.ref}`,
    }
  }
  return fail(`There is no tool called ${name}.`)
}

export type DeployEvent =
  | { type: 'text'; text: string }
  | { type: 'tool'; id: string; name: string; input: unknown; outcome: ToolCallOutcome; stepIds: string[] }
  | { type: 'done'; reason: 'finished' | 'max_tokens' | 'max_turns' | 'refusal' | 'stopped' }

/** The workflow steps a tool call is about — what the board lights while it runs. */
export function stepsForCall(wf: Workflow, name: string, input: unknown): string[] {
  if (!isObject(input)) return []
  if (name === 'read_concept' && typeof input.name === 'string') {
    const wanted = input.name.toLowerCase()
    return wf.nodes.filter(n => n.kind === 'concept' && n.ref.toLowerCase() === wanted).map(n => n.id)
  }
  if ((name === 'run_tool' || name === 'describe_tool') && typeof input.tool === 'string') {
    return wf.nodes.filter(n => stepTool(n)?.id === input.tool).map(n => n.id)
  }
  return []
}

export interface DeployOptions {
  workflow: Workflow
  runs: Map<string, StepRun>
  send: (params: AgentParams, signal?: AbortSignal) => Promise<AgentMessage>
  readConcept: (name: string) => string | undefined
  onEvent: (event: DeployEvent) => void
  signal?: AbortSignal
  maxTurns?: number
}

/** The first request of a deployment — the brief, the system prompt and the tools. */
export function firstRequest(wf: Workflow, runs: Map<string, StepRun>): AgentParams {
  return {
    model: WORKFLOW_MODEL,
    max_tokens: 16_000,
    system: SYSTEM_PROMPT,
    tools: agentTools(wf),
    output_config: { effort: 'medium' },
    betas: [FALLBACK_BETA],
    fallbacks: 'default',
    messages: [{ role: 'user', content: describeWorkflow(wf, runs, 'api') }],
  }
}

/**
 * Run one deployment: the model works the workflow, calling its tools, until
 * it ends its turn — or is stopped, runs out of turns, or declines. Every
 * text block and tool call is reported as it happens (`onEvent`).
 */
export async function deployWorkflow({ workflow, runs, send, readConcept, onEvent, signal, maxTurns = MAX_TURNS }: DeployOptions): Promise<void> {
  const params = firstRequest(workflow, runs)
  const messages: Anthropic.Beta.BetaMessageParam[] = [...params.messages]
  for (let turn = 0; turn < maxTurns; turn++) {
    if (signal?.aborted) {
      onEvent({ type: 'done', reason: 'stopped' })
      return
    }
    const response = await send({ ...params, messages }, signal)
    // The whole content goes back — tool calls, thinking and any fallback block.
    messages.push({ role: 'assistant', content: response.content })
    for (const block of response.content) {
      if (block.type === 'text' && block.text.trim()) onEvent({ type: 'text', text: block.text })
    }
    if (response.stop_reason === 'refusal') {
      onEvent({ type: 'done', reason: 'refusal' })
      return
    }
    if (response.stop_reason === 'pause_turn') continue
    if (response.stop_reason !== 'tool_use') {
      onEvent({ type: 'done', reason: response.stop_reason === 'max_tokens' ? 'max_tokens' : 'finished' })
      return
    }
    const results: Anthropic.Beta.BetaToolResultBlockParam[] = []
    for (const block of response.content) {
      if (block.type !== 'tool_use') continue
      const outcome = callAgentTool(workflow, block.name, block.input, readConcept)
      onEvent({ type: 'tool', id: block.id, name: block.name, input: block.input, outcome, stepIds: stepsForCall(workflow, block.name, block.input) })
      results.push({ type: 'tool_result', tool_use_id: block.id, content: outcome.content, is_error: outcome.isError || undefined })
    }
    // Every result in one message, so parallel calls stay parallel.
    messages.push({ role: 'user', content: results })
  }
  onEvent({ type: 'done', reason: 'max_turns' })
}
