import { describe, it, expect, afterEach, vi } from 'vitest'
// The serverless handler itself (quiz/api/mcp.js) and the loader behind it
// (quiz/api/_mcp/load.js), with the network stubbed: CORS, the origin and rate
// policies, body parsing, and how the knowledge base is found and cached.
import handler, { allowedOrigin, rateLimitWait } from '../../api/mcp.js'
import { clearIndexCache, knowledgeBaseHeaders, knowledgeBaseUrl, loadIndex } from '../../api/_mcp/load.js'
import { buildKnowledgeBase } from './knowledgeBase'

const KB = buildKnowledgeBase({
  pages: {
    'Exam P-1 (SOA).md': '<div class="exam-nav" data-current="P-1|Probability"></div>\n\n# Exam P-1\nProbability.\n\n> [!example]- General Probability {100%}\n> [[Bayes Theorem]]\n',
    'Concepts/Bayes Theorem.md': 'Reverses a conditional.',
  },
  questions: {},
  catalog: [{ page: 'Exam P-1 (SOA).md', exam_id: 'P-1', wiki_id: 'p-1', progress_key: 'P', body: 'SOA', bank: null, status: 'ready' }],
  aliases: {},
  keystones: [],
  site: { url: 'https://quiz.actuarialnotes.com', repo: 'o/r', branch: 'main', builtAt: '2026-09-26T00:00:00.000Z' },
})

function mockRes() {
  const res = {
    statusCode: 0,
    body: undefined as string | undefined,
    headers: {} as Record<string, string>,
    status(code: number) { res.statusCode = code; return res },
    setHeader(key: string, value: string) { res.headers[key] = value },
    end(payload?: string) { res.body = payload; return res },
  }
  return res
}

let address = 0
async function call(req: Record<string, unknown>) {
  const res = mockRes()
  // A fresh client address per call, so the rate limiter only bites where a test means it to.
  const headers = { host: 'quiz.actuarialnotes.com', 'x-forwarded-for': `10.0.0.${++address}`, ...(req.headers as object) }
  await handler({ method: 'POST', ...req, headers }, res)
  return res
}

const initialize = { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {} } }
const listExams = { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'list_exams', arguments: {} } }

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  clearIndexCache()
})

describe('the MCP endpoint', () => {
  it('answers a CORS preflight, echoing the headers asked for', async () => {
    const res = await call({ method: 'OPTIONS', headers: { 'access-control-request-headers': 'content-type, mcp-protocol-version, mcp-method' } })
    expect(res.statusCode).toBe(204)
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*')
    expect(res.headers['Access-Control-Allow-Headers']).toBe('content-type, mcp-protocol-version, mcp-method')
  })

  it('initializes without touching the knowledge base', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    const res = await call({ body: initialize })
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body!).result.serverInfo.name).toBe('actuarial-notes')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("reads the knowledge base from its own deployment, once", async () => {
    const fetchSpy = vi.fn(async () => new Response(JSON.stringify(KB), { status: 200 }))
    vi.stubGlobal('fetch', fetchSpy)
    const first = await call({ body: listExams })
    expect(JSON.parse(first.body!).result.content[0].text).toMatch(/\| P \| Exam P-1 — Probability/)
    await call({ body: listExams })
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy.mock.calls[0]).toEqual(['https://quiz.actuarialnotes.com/ai/knowledge-base.json', expect.anything()])
  })

  it('parses a body that arrives as a string, and rejects one that is not JSON', async () => {
    expect(JSON.parse((await call({ body: JSON.stringify(initialize) })).body!).result.protocolVersion).toBe('2025-06-18')
    const bad = await call({ body: '{nope' })
    expect(bad.statusCode).toBe(400)
    expect(JSON.parse(bad.body!).error.code).toBe(-32700)
    // Vercel's lazy body parser throws on malformed JSON; that's a parse error too.
    const throwing = mockRes()
    await handler({ method: 'POST', headers: { host: 'x.test' }, get body() { throw new Error('Invalid JSON') } }, throwing)
    expect(throwing.statusCode).toBe(400)
  })

  it('reports an unreachable knowledge base as a JSON-RPC error, and retries next time', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 503 })))
    const res = await call({ body: listExams })
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body!).error).toMatchObject({ code: -32603, message: expect.stringMatching(/could not be loaded/) })
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(KB), { status: 200 })))
    expect(JSON.parse((await call({ body: listExams })).body!).result.isError).toBeFalsy()
  })

  it('refuses a browser origin the operator has not allowed', async () => {
    vi.stubEnv('MCP_ALLOWED_ORIGINS', 'https://claude.ai, https://chatgpt.com')
    expect((await call({ body: initialize, headers: { origin: 'https://evil.example' } })).statusCode).toBe(403)
    expect((await call({ body: initialize, headers: { origin: 'https://claude.ai' } })).statusCode).toBe(200)
    expect((await call({ body: initialize })).statusCode).toBe(200)
  })

  it('rate-limits one address, with Retry-After', async () => {
    vi.stubEnv('MCP_RATE_LIMIT', '2')
    const headers = { 'x-forwarded-for': '192.0.2.1' }
    expect((await call({ body: initialize, headers })).statusCode).toBe(200)
    expect((await call({ body: initialize, headers })).statusCode).toBe(200)
    const limited = await call({ body: initialize, headers })
    expect(limited.statusCode).toBe(429)
    expect(Number(limited.headers['Retry-After'])).toBeGreaterThan(0)
    expect((await call({ body: initialize, headers: { 'x-forwarded-for': '192.0.2.2' } })).statusCode).toBe(200)
  })
})

describe('allowedOrigin / rateLimitWait', () => {
  it('allows any origin, and server-to-server calls, unless narrowed', () => {
    expect(allowedOrigin('https://anything.example', undefined)).toBe(true)
    expect(allowedOrigin('https://anything.example', '*')).toBe(true)
    expect(allowedOrigin(undefined, 'https://claude.ai')).toBe(true)
    expect(allowedOrigin('https://claude.ai', 'https://claude.ai')).toBe(true)
    expect(allowedOrigin('https://claude.ai.evil.example', 'https://claude.ai')).toBe(false)
  })

  it('counts a sliding minute, and can be switched off', () => {
    expect(rateLimitWait('k', 1_000, 1)).toBe(0)
    expect(rateLimitWait('k', 2_000, 1)).toBe(59)
    expect(rateLimitWait('k', 61_001, 1)).toBe(0)
    expect(rateLimitWait('k', 61_002, 0)).toBe(0)
  })
})

describe('the knowledge base loader', () => {
  it("builds the export's URL from the request's own host", () => {
    expect(knowledgeBaseUrl({ host: 'quiz.actuarialnotes.com' }, {})).toBe('https://quiz.actuarialnotes.com/ai/knowledge-base.json')
    expect(knowledgeBaseUrl({ host: 'localhost:8787' }, {})).toBe('http://localhost:8787/ai/knowledge-base.json')
    expect(knowledgeBaseUrl({ host: 'x.test' }, { MCP_KB_URL: 'https://cdn.example/kb.json' })).toBe('https://cdn.example/kb.json')
    for (const host of ['', 'evil.example/path?', 'a b', 'user@evil.example']) {
      expect(() => knowledgeBaseUrl({ host }, {}), host).toThrow()
    }
  })

  it('sends the deployment-protection bypass only when the project has one', () => {
    expect(knowledgeBaseHeaders({})).toEqual({ Accept: 'application/json' })
    expect(knowledgeBaseHeaders({ VERCEL_AUTOMATION_BYPASS_SECRET: 's3cret' })).toEqual({ Accept: 'application/json', 'x-vercel-protection-bypass': 's3cret' })
  })

  it('keeps one index per URL and refuses an export it cannot read', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(KB), { status: 200 }))
    const a = await loadIndex('https://a.test/kb.json', { fetchImpl, headers: {} })
    expect(await loadIndex('https://a.test/kb.json', { fetchImpl, headers: {} })).toBe(a)
    await loadIndex('https://b.test/kb.json', { fetchImpl, headers: {} })
    expect(fetchImpl).toHaveBeenCalledTimes(2)
    const wrongVersion = vi.fn(async () => new Response(JSON.stringify({ ...KB, version: 99 }), { status: 200 }))
    await expect(loadIndex('https://c.test/kb.json', { fetchImpl: wrongVersion, headers: {} })).rejects.toThrow(/version: 99/)
  })
})
