import { describe, it, expect } from 'vitest'
// The connector's usage events and link tags (quiz/api/_mcp/usage.js), and the
// transport reporting one event per request (protocol.js). See docs/ai-connector.md.
import { argumentSummary, redactText, usageEvent, userAgentProduct, withConnectorSource } from '../../api/_mcp/usage.js'
import { handleMcpHttp } from '../../api/_mcp/protocol.js'

describe('argumentSummary', () => {
  it('keeps what was asked for and drops everything a student typed', () => {
    expect(argumentSummary({
      exam: 'P', concept: 'Bayes Theorem', count: 3, difficulty: 'hard',
      answer: 'B, because…', parts: [{ answer: 'x' }], input: { rows: [1, 2] }, exclude: ['p-1'], seed: 4,
    })).toEqual({ exam: 'P', concept: 'Bayes Theorem', count: 3, difficulty: 'hard' })
    expect(argumentSummary({ tool: 'ratemaking.trend_fit', runs: [{}, {}, {}] })).toEqual({ tool: 'ratemaking.trend_fit', runs: 3 })
    expect(argumentSummary({ question_id: 'cas5-2019s-q12', answer: 'A' })).toEqual({ question_id: 'cas5-2019s-q12' })
    expect(argumentSummary({ answer: 'A' })).toBeUndefined()
    expect(argumentSummary('nope')).toBeUndefined()
  })

  it('cuts a search query short and blanks emails and long numbers', () => {
    expect(argumentSummary({ query: 'mail me at a.b@example.com or 555-123-4567' })).toEqual({
      query: 'mail me at [redacted email] or [redacted number]',
    })
    const long = argumentSummary({ query: 'x'.repeat(200) }) as { query: string }
    expect(long.query.length).toBe(81)
    expect(redactText('chain ladder 2019')).toBe('chain ladder 2019')
  })
})

describe('usageEvent', () => {
  it('names a tool call, its client and how it went — and nothing about who', () => {
    const event = usageEvent({
      era: 'modern', protocolVersion: '2026-07-28', method: 'tools/call',
      params: { name: 'get_concept', arguments: { concept: 'Credibility' } },
      clientInfo: { name: 'claude-ai', version: '0.1.0' },
      userAgent: 'Claude-User/1.0 (+https://example.com) 203.0.113.9',
      result: { content: [] }, ms: 12.4,
    })
    expect(event).toEqual({
      era: 'modern', method: 'tools/call', protocol: '2026-07-28', name: 'get_concept',
      args: { concept: 'Credibility' }, client: 'claude-ai', client_version: '0.1.0',
      user_agent: 'Claude-User', outcome: 'ok', ms: 12,
    })
    expect(JSON.stringify(event)).not.toContain('203.0.113.9')
  })

  it('reads a legacy client off its initialize, and tells a tool error from a protocol error', () => {
    expect(usageEvent({ era: 'legacy', method: 'initialize', params: { clientInfo: { name: 'openai-mcp', version: '1.0.0' } }, result: {} }))
      .toMatchObject({ client: 'openai-mcp', outcome: 'ok' })
    expect(usageEvent({ era: 'legacy', method: 'tools/call', params: { name: 'search' }, result: { isError: true } }).outcome).toBe('tool_error')
    expect(usageEvent({ era: 'modern', method: 'resources/read', params: { uri: 'actuarialnotes://exams' }, errorCode: -32602 }))
      .toMatchObject({ name: 'actuarialnotes://exams', outcome: 'error', error_code: -32602 })
  })

  it('takes a client name from the first product token of a User-Agent only', () => {
    expect(userAgentProduct('python-httpx/0.27.0')).toBe('python-httpx')
    expect(userAgentProduct('Mozilla/5.0 (Macintosh)')).toBe('Mozilla')
    expect(userAgentProduct('  ')).toBeUndefined()
    expect(userAgentProduct(undefined)).toBeUndefined()
  })
})

describe('withConnectorSource', () => {
  it('tags the query, ahead of a fragment', () => {
    expect(withConnectorSource('https://x.test/quiz?ids=a,b', 'get_practice_questions'))
      .toBe('https://x.test/quiz?ids=a,b&utm_source=mcp&utm_medium=ai_connector&utm_campaign=get_practice_questions')
    expect(withConnectorSource('https://x.test/tools/trend-fit#input=abc', 'run_tool'))
      .toBe('https://x.test/tools/trend-fit?utm_source=mcp&utm_medium=ai_connector&utm_campaign=run_tool#input=abc')
  })
})

describe('the transport reports one event per request', () => {
  const server = {
    info: { name: 'stub', version: '1' },
    capabilities: { tools: {} },
    cacheTtlMs: 1,
    methods: {
      'tools/call': (params: { name?: string }) => {
        if (params.name === 'boom') throw new Error('kaboom')
        return { content: [] }
      },
    },
  }
  const run = async (body: unknown, headers: Record<string, string> = {}) => {
    const events: Record<string, unknown>[] = []
    await handleMcpHttp({ method: 'POST', headers, body }, server, () => {}, e => events.push(e as Record<string, unknown>))
    return events
  }

  it('legacy: the handshake with its client, then tool calls', async () => {
    expect(await run({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', clientInfo: { name: 'c', version: '2' } } }))
      .toEqual([expect.objectContaining({ era: 'legacy', method: 'initialize', protocol: '2025-06-18', client: 'c', outcome: 'ok' })])
    expect(await run({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'echo', arguments: { exam: 'FM' } } }, { 'mcp-protocol-version': '2025-11-25', 'user-agent': 'Claude-User' }))
      .toEqual([expect.objectContaining({ method: 'tools/call', name: 'echo', args: { exam: 'FM' }, protocol: '2025-11-25', user_agent: 'Claude-User', outcome: 'ok' })])
    expect(await run({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'boom' } }))
      .toEqual([expect.objectContaining({ outcome: 'error', error_code: -32603 })])
  })

  it('legacy: nothing for a notification, one per request in a batch', async () => {
    expect(await run({ jsonrpc: '2.0', method: 'notifications/initialized' })).toEqual([])
    expect(await run([
      { jsonrpc: '2.0', id: 1, method: 'ping' },
      { jsonrpc: '2.0', method: 'notifications/initialized' },
      { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'echo' } },
    ], { 'mcp-protocol-version': '2025-03-26' })).toHaveLength(2)
  })

  it('modern: the client from _meta, and a rejected request reported with its code', async () => {
    const meta = {
      'io.modelcontextprotocol/protocolVersion': '2026-07-28',
      'io.modelcontextprotocol/clientCapabilities': {},
      'io.modelcontextprotocol/clientInfo': { name: 'claude-ai', version: '1' },
    }
    const headers = { 'mcp-protocol-version': '2026-07-28', 'mcp-method': 'tools/call', 'mcp-name': 'echo' }
    expect(await run({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'echo', _meta: meta } }, headers))
      .toEqual([expect.objectContaining({ era: 'modern', name: 'echo', client: 'claude-ai', outcome: 'ok' })])
    expect(await run({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'other', _meta: meta } }, headers))
      .toEqual([expect.objectContaining({ outcome: 'error', error_code: -32020 })])
  })

  it('a throwing observer never fails the request', async () => {
    const out = await handleMcpHttp({ method: 'POST', headers: {}, body: { jsonrpc: '2.0', id: 1, method: 'ping' } }, server, () => {}, () => { throw new Error('x') })
    expect(out.status).toBe(200)
  })
})
