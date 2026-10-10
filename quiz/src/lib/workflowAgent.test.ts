import { describe, expect, it } from 'vitest'
import { CUSTOM_DATA, TEMPLATES, addStep, evaluateWorkflow, fromTemplate, newWorkflow, updateStep, type Workflow } from './workflow'
import {
  SYSTEM_PROMPT,
  WORKFLOW_MODEL,
  agentTools,
  callAgentTool,
  deployWorkflow,
  describeWorkflow,
  firstRequest,
  stepsForCall,
  type AgentMessage,
  type AgentParams,
  type DeployEvent,
} from './workflowAgent'

const reserve = () => fromTemplate(TEMPLATES[0], 'wf', 1)
const pages: Record<string, string> = { 'Chain Ladder Method': '---\nverification: {}\n---\nThe chain ladder method projects…' }
const read = (name: string) => pages[name]

function message(content: AgentMessage['content'], stop: AgentMessage['stop_reason']): AgentMessage {
  return {
    id: 'msg',
    type: 'message',
    role: 'assistant',
    model: WORKFLOW_MODEL,
    content,
    stop_reason: stop,
    stop_sequence: null,
    usage: { input_tokens: 1, output_tokens: 1 },
  } as unknown as AgentMessage
}

describe('the brief', () => {
  it('lists every step in run order, with its connections, input and result', () => {
    const wf = reserve()
    const brief = describeWorkflow(wf, evaluateWorkflow(wf))
    expect(brief).toContain('# Workflow: Reserve review')
    expect(brief).toContain(`Goal: ${TEMPLATES[0].goal}`)
    // The concept leads, then the three development tools in order.
    const order = ['Chain Ladder Method', 'Age-to-Age Factors', 'Development to Ultimate', 'Chain Ladder —', 'Bornhuetter-Ferguson']
    const at = order.map(name => brief.indexOf(`. ${name}`))
    expect(at.every(i => i > 0)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
    expect(brief).toContain('Filled by its connections: factors from step 2 (Age-to-Age Factors)')
    expect(brief).toMatch(/Current result: Age-to-age averages/)
    expect(brief).toContain('sends values')
  })

  it('carries the reader’s own data, and asks for it when there is none', () => {
    const { workflow: blank, id } = addStep(newWorkflow('wf', 0), { kind: 'data', ref: CUSTOM_DATA, label: 'Paid triangle' }, 1)
    expect(describeWorkflow(blank, new Map())).toMatch(/they described none/)
    const wf = updateStep(blank, id, { data: 'AY 2020: 100, 150' }, 2)
    expect(describeWorkflow(wf, new Map())).toContain('AY 2020: 100, 150')
  })

  it('points a connector user at the connector’s own tools', () => {
    const wf = reserve()
    const brief = describeWorkflow(wf, evaluateWorkflow(wf), 'connector')
    expect(brief).toContain('`get_concept`')
    expect(brief).not.toContain('`read_concept`')
  })
})

describe('the tools', () => {
  it('offers only what is on the workflow', () => {
    const tools = agentTools(reserve())
    expect(tools.map(t => t.name)).toEqual(['run_tool', 'describe_tool', 'read_concept'])
    const run = tools[0].input_schema.properties as { tool: { enum: string[] } }
    expect(run.tool.enum).toEqual([
      'reserving.age_to_age_factors',
      'reserving.development_to_ultimate',
      'reserving.chain_ladder',
      'reserving.bornhuetter_ferguson',
    ])
    expect(agentTools(newWorkflow('wf', 0))).toEqual([])
  })

  it('runs a tool on the engine, and refuses one not on the workflow', () => {
    const wf = reserve()
    const ok = callAgentTool(wf, 'run_tool', { tool: 'reserving.chain_ladder', input: {} }, read)
    expect(ok.isError).toBe(false)
    const payload = JSON.parse(ok.content)
    expect(payload.tool).toBe('reserving.chain_ladder')
    expect(payload.tiles.length).toBeGreaterThan(0)
    expect(callAgentTool(wf, 'run_tool', { tool: 'finance.annuity', input: {} }, read).isError).toBe(true)
    expect(callAgentTool(wf, 'run_tool', { tool: 'reserving.chain_ladder', input: { rows: 'oops' } }, read).isError).toBe(true)
  })

  it('reads a concept on the workflow, without its frontmatter', () => {
    const wf = reserve()
    const page = callAgentTool(wf, 'read_concept', { name: 'chain ladder method' }, read)
    expect(page).toMatchObject({ isError: false, content: 'The chain ladder method projects…' })
    expect(callAgentTool(wf, 'read_concept', { name: 'Duration' }, read).isError).toBe(true)
    expect(callAgentTool(wf, 'teleport', {}, read).isError).toBe(true)
  })

  it('names the steps a call is about', () => {
    const wf = reserve()
    expect(stepsForCall(wf, 'run_tool', { tool: 'reserving.chain_ladder' })).toEqual(['n4'])
    expect(stepsForCall(wf, 'read_concept', { name: 'Chain Ladder Method' })).toEqual(['n1'])
    expect(stepsForCall(wf, 'run_tool', null)).toEqual([])
  })
})

describe('a deployment', () => {
  it('asks for the model with the system prompt, the tools and the refusal fallback', () => {
    const wf = reserve()
    const params = firstRequest(wf, evaluateWorkflow(wf))
    expect(params).toMatchObject({ model: 'claude-opus-5-5', system: SYSTEM_PROMPT, fallbacks: 'default', betas: ['server-side-fallback-2026-07-01'] })
    expect(params.messages).toHaveLength(1)
  })

  it('answers tool calls here, all in one message, until the model ends its turn', async () => {
    const wf: Workflow = reserve()
    const sent: AgentParams[] = []
    const replies = [
      message([
        { type: 'text', text: 'Running the chain.', citations: null },
        { type: 'tool_use', id: 't1', name: 'run_tool', input: { tool: 'reserving.chain_ladder', input: {} } },
        { type: 'tool_use', id: 't2', name: 'read_concept', input: { name: 'Chain Ladder Method' } },
      ] as AgentMessage['content'], 'tool_use'),
      message([{ type: 'text', text: '## Report', citations: null }] as AgentMessage['content'], 'end_turn'),
    ]
    const events: DeployEvent[] = []
    await deployWorkflow({
      workflow: wf,
      runs: evaluateWorkflow(wf),
      readConcept: read,
      send: async params => {
        sent.push(structuredClone(params))
        return replies[sent.length - 1]
      },
      onEvent: e => events.push(e),
    })
    expect(sent).toHaveLength(2)
    const second = sent[1].messages
    expect(second).toHaveLength(3)
    expect(second[1].role).toBe('assistant')
    const results = second[2].content as { type: string; tool_use_id: string; is_error?: boolean }[]
    expect(results.map(r => [r.type, r.tool_use_id])).toEqual([['tool_result', 't1'], ['tool_result', 't2']])
    expect(events.map(e => e.type)).toEqual(['text', 'tool', 'tool', 'text', 'done'])
    expect(events.at(-1)).toEqual({ type: 'done', reason: 'finished' })
    expect(events[1]).toMatchObject({ type: 'tool', stepIds: ['n4'] })
  })

  it('stops when told to, when the model declines, and after its last turn', async () => {
    const wf = reserve()
    const runs = evaluateWorkflow(wf)
    const loop = message([{ type: 'tool_use', id: 't', name: 'describe_tool', input: { tool: 'reserving.chain_ladder' } }] as AgentMessage['content'], 'tool_use')
    const last = (events: DeployEvent[]) => events.at(-1)

    const capped: DeployEvent[] = []
    await deployWorkflow({ workflow: wf, runs, readConcept: read, send: async () => loop, onEvent: e => capped.push(e), maxTurns: 3 })
    expect(last(capped)).toEqual({ type: 'done', reason: 'max_turns' })
    expect(capped.filter(e => e.type === 'tool')).toHaveLength(3)

    const declined: DeployEvent[] = []
    await deployWorkflow({ workflow: wf, runs, readConcept: read, send: async () => message([], 'refusal'), onEvent: e => declined.push(e) })
    expect(last(declined)).toEqual({ type: 'done', reason: 'refusal' })

    const controller = new AbortController()
    controller.abort()
    const stopped: DeployEvent[] = []
    await deployWorkflow({ workflow: wf, runs, readConcept: read, send: async () => loop, onEvent: e => stopped.push(e), signal: controller.signal })
    expect(stopped).toEqual([{ type: 'done', reason: 'stopped' }])
  })
})
