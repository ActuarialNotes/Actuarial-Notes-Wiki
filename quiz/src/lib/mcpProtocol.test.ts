import { describe, it, expect, vi } from 'vitest'
// The MCP transport the connector speaks (quiz/api/_mcp/protocol.js), against a
// stub server — both protocol eras, and every rejection a client relies on to
// tell them apart. See docs/ai-connector.md.
import {
  ErrorCode,
  LEGACY_VERSIONS,
  McpError,
  MODERN_VERSIONS,
  ResourceNotFoundError,
  SUPPORTED_VERSIONS,
  decodeHeaderValue,
  handleMcpHttp,
} from '../../api/_mcp/protocol.js'

const MODERN = '2026-07-28'
const INFO = { name: 'stub', version: '1.0.0' }

const server = {
  info: INFO,
  instructions: 'Use the stub.',
  capabilities: { tools: {}, resources: {} },
  cacheTtlMs: 1234,
  methods: {
    'tools/list': () => ({ tools: [{ name: 'echo', inputSchema: { type: 'object' } }] }),
    'tools/call': (params: { name?: string; arguments?: unknown }) => {
      if (params.name === 'boom') throw new Error('kaboom')
      return { content: [{ type: 'text', text: JSON.stringify(params.arguments) }] }
    },
    'resources/read': (params: { uri?: string }) => {
      if (params.uri !== 'x://ok') throw new ResourceNotFoundError(params.uri)
      return { contents: [{ uri: 'x://ok', text: 'hello' }] }
    },
    'prompts/get': () => {
      throw new McpError(ErrorCode.INVALID_PARAMS, 'Unknown prompt')
    },
  },
}

type Headers = Record<string, string>
const post = (body: unknown, headers: Headers = {}, extra: Record<string, unknown> = {}) =>
  handleMcpHttp({ method: 'POST', headers, body, ...extra }, server)
const parse = (out: { body?: string }) => JSON.parse(out.body ?? 'null')

const meta = (version = MODERN, caps: unknown = {}) => ({
  'io.modelcontextprotocol/protocolVersion': version,
  'io.modelcontextprotocol/clientCapabilities': caps,
  'io.modelcontextprotocol/clientInfo': { name: 'test', version: '1' },
})
function modern(method: string, params: Record<string, unknown> = {}, headers: Headers = {}) {
  const name = (params.name ?? params.uri) as string | undefined
  return post(
    { jsonrpc: '2.0', id: 9, method, params: { ...params, _meta: meta() } },
    {
      'mcp-protocol-version': MODERN,
      'mcp-method': method,
      ...(name !== undefined ? { 'mcp-name': name } : {}),
      ...headers,
    },
  )
}

describe('versions', () => {
  it('speaks 2026-07-28 and the four initialize-era revisions', () => {
    expect(MODERN_VERSIONS).toEqual([MODERN])
    expect(LEGACY_VERSIONS).toEqual(['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'])
    expect(SUPPORTED_VERSIONS[0]).toBe(MODERN)
  })
})

describe('legacy era (initialize handshake)', () => {
  it('echoes a version it speaks and describes the server', async () => {
    const out = await post({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'c', version: '1' } } })
    expect(out.status).toBe(200)
    expect(out.headers['Content-Type']).toBe('application/json')
    expect(parse(out)).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: { protocolVersion: '2025-06-18', capabilities: server.capabilities, serverInfo: INFO, instructions: 'Use the stub.' },
    })
  })

  it('offers its latest legacy version when the client asks for one it does not speak', async () => {
    for (const asked of ['1999-01-01', MODERN, undefined]) {
      const out = await post({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: asked } })
      expect(parse(out).result.protocolVersion).toBe('2025-11-25')
    }
  })

  it('never mints a session', async () => {
    const out = await post({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-11-25' } })
    expect(Object.keys(out.headers).map(h => h.toLowerCase())).not.toContain('mcp-session-id')
  })

  it('accepts notifications and client responses with 202 and no body', async () => {
    for (const body of [
      { jsonrpc: '2.0', method: 'notifications/initialized' },
      { jsonrpc: '2.0', method: 'notifications/cancelled', params: { requestId: 3 } },
      { jsonrpc: '2.0', id: 5, result: {} },
    ]) {
      const out = await post(body, { 'mcp-protocol-version': '2025-06-18' })
      expect(out.status).toBe(202)
      expect(out.body).toBeUndefined()
    }
  })

  it('answers ping, serves a handler, and adds no modern decorations', async () => {
    expect(parse(await post({ jsonrpc: '2.0', id: 2, method: 'ping' }))).toEqual({ jsonrpc: '2.0', id: 2, result: {} })
    const list = parse(await post({ jsonrpc: '2.0', id: 3, method: 'tools/list' }, { 'mcp-protocol-version': '2025-11-25' }))
    expect(list.result).toEqual({ tools: [{ name: 'echo', inputSchema: { type: 'object' } }] })
  })

  it('treats a request with no version header as 2025-03-26 and still serves it', async () => {
    const out = await post({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'echo', arguments: { a: 1 } } })
    expect(parse(out).result.content[0].text).toBe('{"a":1}')
  })

  it('reports a missing resource with the legacy -32002', async () => {
    const out = await post({ jsonrpc: '2.0', id: 4, method: 'resources/read', params: { uri: 'x://nope' } }, { 'mcp-protocol-version': '2025-06-18' })
    expect(out.status).toBe(200)
    expect(parse(out).error).toMatchObject({ code: -32002, data: { uri: 'x://nope' } })
  })

  it('reports an unknown method in-band', async () => {
    const out = await post({ jsonrpc: '2.0', id: 5, method: 'logging/setLevel', params: { level: 'info' } })
    expect(out.status).toBe(200)
    expect(parse(out).error.code).toBe(ErrorCode.METHOD_NOT_FOUND)
  })

  it('hides an unexpected failure behind an internal error, and reports it', async () => {
    const log = vi.fn()
    const out = await handleMcpHttp({ method: 'POST', headers: {}, body: { jsonrpc: '2.0', id: 6, method: 'tools/call', params: { name: 'boom' } } }, server, log)
    expect(parse(out).error).toEqual({ code: ErrorCode.INTERNAL_ERROR, message: 'Internal error' })
    expect(log).toHaveBeenCalledOnce()
  })

  it('answers a 2025-03-26 batch, skipping notifications', async () => {
    const out = await post([
      { jsonrpc: '2.0', method: 'notifications/initialized' },
      { jsonrpc: '2.0', id: 1, method: 'ping' },
      { jsonrpc: '2.0', id: 2, method: 'nope' },
    ])
    expect(parse(out)).toEqual([
      { jsonrpc: '2.0', id: 1, result: {} },
      { jsonrpc: '2.0', id: 2, error: { code: ErrorCode.METHOD_NOT_FOUND, message: 'Method not found: nope' } },
    ])
    expect((await post([{ jsonrpc: '2.0', method: 'notifications/initialized' }])).status).toBe(202)
    expect((await post([])).status).toBe(400)
  })
})

describe('modern era (2026-07-28, per-request metadata)', () => {
  it('serves server/discover with versions, capabilities, identity and cache hints', async () => {
    const out = await modern('server/discover')
    expect(out.status).toBe(200)
    expect(parse(out)).toEqual({
      jsonrpc: '2.0',
      id: 9,
      result: {
        resultType: 'complete',
        supportedVersions: SUPPORTED_VERSIONS,
        capabilities: server.capabilities,
        instructions: 'Use the stub.',
        ttlMs: 1234,
        cacheScope: 'public',
        _meta: { 'io.modelcontextprotocol/serverInfo': INFO },
      },
    })
  })

  it('marks every result complete and names the server; caches lists and reads only', async () => {
    const list = parse(await modern('tools/list')).result
    expect(list).toMatchObject({ resultType: 'complete', ttlMs: 1234, cacheScope: 'public' })
    const call = parse(await modern('tools/call', { name: 'echo', arguments: { b: 2 } })).result
    expect(call.resultType).toBe('complete')
    expect(call._meta['io.modelcontextprotocol/serverInfo']).toEqual(INFO)
    expect(call).not.toHaveProperty('ttlMs')
    expect(parse(await modern('resources/read', { uri: 'x://ok' })).result).toMatchObject({ ttlMs: 1234, cacheScope: 'public' })
  })

  it('reports a missing resource as invalid params (-32602)', async () => {
    const out = await modern('resources/read', { uri: 'x://nope' })
    expect(out.status).toBe(200)
    expect(parse(out).error.code).toBe(ErrorCode.INVALID_PARAMS)
  })

  it('answers an unknown method with 404 and -32601, so a client can tell it from a legacy server', async () => {
    const out = await modern('nope/nope')
    expect(out.status).toBe(404)
    expect(parse(out).error.code).toBe(ErrorCode.METHOD_NOT_FOUND)
  })

  it('rejects an unsupported version with the versions it does speak', async () => {
    const out = await post(
      { jsonrpc: '2.0', id: 1, method: 'tools/list', params: { _meta: meta('2031-01-01') } },
      { 'mcp-protocol-version': '2031-01-01', 'mcp-method': 'tools/list' },
    )
    expect(out.status).toBe(400)
    expect(parse(out).error).toEqual({
      code: ErrorCode.UNSUPPORTED_PROTOCOL_VERSION,
      message: 'Unsupported protocol version',
      data: { supported: SUPPORTED_VERSIONS, requested: '2031-01-01' },
    })
  })

  it('rejects an unknown version named only in the header, in either era', async () => {
    const out = await post({ jsonrpc: '2.0', id: 1, method: 'tools/list' }, { 'mcp-protocol-version': '2031-01-01' })
    expect(out.status).toBe(400)
    expect(parse(out).error.code).toBe(ErrorCode.UNSUPPORTED_PROTOCOL_VERSION)
  })

  it('rejects headers that disagree with the body (-32020)', async () => {
    const cases: [Headers, RegExp][] = [
      [{ 'mcp-protocol-version': '' }, /MCP-Protocol-Version/],
      [{ 'mcp-method': 'tools/list' }, /Mcp-Method/],
      [{ 'mcp-name': 'other' }, /Mcp-Name/],
    ]
    for (const [override, message] of cases) {
      const headers: Headers = { 'mcp-protocol-version': MODERN, 'mcp-method': 'tools/call', 'mcp-name': 'echo', ...override }
      if (override['mcp-protocol-version'] === '') delete headers['mcp-protocol-version']
      const out = await post({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'echo', _meta: meta() } }, headers)
      expect(out.status).toBe(400)
      expect(parse(out).error.code).toBe(ErrorCode.HEADER_MISMATCH)
      expect(parse(out).error.message).toMatch(message)
    }
  })

  it('requires Mcp-Name on the named methods, and decodes a base64 one', async () => {
    const missing = await post(
      { jsonrpc: '2.0', id: 1, method: 'prompts/get', params: { name: 'p', _meta: meta() } },
      { 'mcp-protocol-version': MODERN, 'mcp-method': 'prompts/get' },
    )
    expect(parse(missing).error.code).toBe(ErrorCode.HEADER_MISMATCH)
    const encoded = `=?base64?${Buffer.from('ünï', 'utf8').toString('base64')}?=`
    const out = await modern('tools/call', { name: 'ünï', arguments: {} }, { 'mcp-name': encoded })
    expect(out.status).toBe(200)
  })

  it('rejects a request missing required metadata with 400 and -32602', async () => {
    const noCaps = await post(
      { jsonrpc: '2.0', id: 1, method: 'tools/list', params: { _meta: { 'io.modelcontextprotocol/protocolVersion': MODERN } } },
      { 'mcp-protocol-version': MODERN, 'mcp-method': 'tools/list' },
    )
    expect(noCaps.status).toBe(400)
    expect(parse(noCaps).error.code).toBe(ErrorCode.INVALID_PARAMS)
    // A modern header with no metadata at all.
    const bare = await post({ jsonrpc: '2.0', id: 1, method: 'tools/list' }, { 'mcp-protocol-version': MODERN, 'mcp-method': 'tools/list' })
    expect(bare.status).toBe(400)
    expect(parse(bare).error.code).toBe(ErrorCode.INVALID_PARAMS)
  })

  it('acknowledges subscriptions/listen with an empty filter and closes it gracefully', async () => {
    const out = await modern('subscriptions/listen', { notifications: { toolsListChanged: true } })
    expect(out.headers['Content-Type']).toBe('text/event-stream')
    const events = (out.body ?? '').trim().split('\n\n').map(e => JSON.parse(e.split('\ndata: ')[1]))
    expect(events[0]).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/subscriptions/acknowledged',
      params: { _meta: { 'io.modelcontextprotocol/subscriptionId': 9 }, notifications: {} },
    })
    expect(events[1]).toMatchObject({ id: 9, result: { resultType: 'complete', _meta: { 'io.modelcontextprotocol/subscriptionId': 9 } } })
  })
})

describe('HTTP', () => {
  it('answers GET and DELETE with 405: no standalone stream, no sessions', async () => {
    for (const method of ['GET', 'DELETE']) {
      const out = await handleMcpHttp({ method, headers: {} }, server)
      expect(out.status).toBe(405)
      expect(out.headers.Allow).toBe('POST, OPTIONS')
    }
  })

  it('rejects a body that is not JSON, or not JSON-RPC', async () => {
    const bad = await handleMcpHttp({ method: 'POST', headers: {}, bodyError: true }, server)
    expect(bad.status).toBe(400)
    expect(parse(bad).error.code).toBe(ErrorCode.PARSE_ERROR)
    for (const body of [undefined, 'x', { id: 1, method: 'ping' }, { jsonrpc: '2.0', id: null, method: 'ping' }]) {
      const out = await post(body)
      expect(out.status).toBe(400)
      expect(parse(out).error.code).toBe(ErrorCode.INVALID_REQUEST)
    }
  })
})

describe('decodeHeaderValue', () => {
  it('passes plain values through and decodes the base64 sentinel', () => {
    expect(decodeHeaderValue('get_weather')).toBe('get_weather')
    expect(decodeHeaderValue('=?base64?SGVsbG8sIOS4lueVjA==?=')).toBe('Hello, 世界')
    expect(decodeHeaderValue('=?base64?not base64!?=')).toBeNull()
  })
})
