// The Model Context Protocol over Streamable HTTP, for a server that keeps no
// state between requests — which is what a serverless function is.
//
// MCP changed shape in revision 2026-07-28, and the assistants a reader brings
// don't all move at once, so this speaks both eras on one endpoint (the spec's
// "dual-era server", basic/versioning):
//
//   legacy  2024-11-05 … 2025-11-25   The client opens with an `initialize`
//           handshake and then sends plain JSON-RPC, naming its version in the
//           MCP-Protocol-Version header. A session is optional in those
//           revisions; this server never mints one, so every request is
//           answered on its own and nothing needs to survive between them.
//   modern  2026-07-28                 No handshake. Every request carries its
//           version and client capabilities in `params._meta`, mirrors its
//           method (and tool/prompt name or resource URI) into Mcp-Method /
//           Mcp-Name headers that must match the body, and every result
//           carries `resultType` — plus `ttlMs`/`cacheScope` on the cacheable
//           ones and the server's identity in `_meta`.
//
// The era is read off each request, never remembered: an `initialize`, or a
// request with no per-request version, is legacy; one whose `_meta` names
// 2026-07-28 is modern. Anything the server can't serve gets the error its era
// expects, so a dual-era client falls back or retries correctly.
//
// This module is transport logic only — it knows nothing about actuarial
// content. `server.js` supplies the tools, resources and prompts; `../mcp.js`
// adapts it to Vercel's request/response. No dependencies, so it is exercised
// directly by src/lib/mcpProtocol.test.ts.

export const MODERN_VERSIONS = ['2026-07-28']
export const LEGACY_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05']
export const SUPPORTED_VERSIONS = [...MODERN_VERSIONS, ...LEGACY_VERSIONS]

/** What a legacy request with no MCP-Protocol-Version header speaks (streamable-http §Protocol Version Header). */
const HEADERLESS_VERSION = '2025-03-26'

export const ErrorCode = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  /** 2025-11-25 and earlier only; modern servers report a missing resource as INVALID_PARAMS. */
  LEGACY_RESOURCE_NOT_FOUND: -32002,
  HEADER_MISMATCH: -32020,
  UNSUPPORTED_PROTOCOL_VERSION: -32022,
}

export const META = {
  protocolVersion: 'io.modelcontextprotocol/protocolVersion',
  clientInfo: 'io.modelcontextprotocol/clientInfo',
  clientCapabilities: 'io.modelcontextprotocol/clientCapabilities',
  serverInfo: 'io.modelcontextprotocol/serverInfo',
  subscriptionId: 'io.modelcontextprotocol/subscriptionId',
}

/** Methods whose name (or URI) is mirrored into the Mcp-Name header, and the body field it mirrors. */
const NAMED_METHODS = { 'tools/call': 'name', 'prompts/get': 'name', 'resources/read': 'uri' }

/** Results a client may cache: they carry `ttlMs` and `cacheScope` in the modern era (server/utilities/caching). */
const CACHEABLE_METHODS = new Set([
  'server/discover',
  'tools/list',
  'prompts/list',
  'resources/list',
  'resources/templates/list',
  'resources/read',
])

/** An error a handler throws to answer with a JSON-RPC error rather than a result. */
export class McpError extends Error {
  constructor(code, message, data) {
    super(message)
    this.code = code
    this.data = data
  }
}

/** A resource URI the server doesn't have. Its error code depends on the era. */
export class ResourceNotFoundError extends McpError {
  constructor(uri) {
    super(ErrorCode.INVALID_PARAMS, `Resource not found: ${uri}`, { uri })
    this.resourceNotFound = true
  }
}

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

function headerValue(headers, name) {
  if (!headers) return undefined
  const value = headers[name] ?? headers[name.toLowerCase()]
  if (Array.isArray(value)) return value.join(', ')
  return typeof value === 'string' ? value : undefined
}

/**
 * A mirrored header's value as the body would hold it. A value that isn't
 * plain ASCII travels as `=?base64?…?=` (streamable-http §Value Encoding);
 * null when that encoding is malformed.
 */
export function decodeHeaderValue(raw) {
  const m = /^=\?base64\?([A-Za-z0-9+/]*={0,2})\?=$/.exec(raw)
  if (!m) return raw.startsWith('=?base64?') ? null : raw
  try {
    return Buffer.from(m[1], 'base64').toString('utf8')
  } catch {
    return null
  }
}

function json(status, payload, extra = {}) {
  return {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  }
}

const accepted = () => ({ status: 202, headers: {}, body: undefined })

const errorPayload = (id, code, message, data) => ({
  jsonrpc: '2.0',
  id: id ?? null,
  error: data === undefined ? { code, message } : { code, message, data },
})

function sse(messages) {
  return {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'X-Accel-Buffering': 'no' },
    body: messages.map(m => `event: message\ndata: ${JSON.stringify(m)}\n\n`).join(''),
  }
}

/** A JSON-RPC message this module can act on, or the error that says why not. */
function classify(message) {
  if (!isObject(message) || message.jsonrpc !== '2.0') return { invalid: 'Not a JSON-RPC 2.0 message' }
  const hasId = 'id' in message
  if (typeof message.method === 'string') {
    if (!hasId) return { kind: 'notification' }
    if (typeof message.id !== 'string' && typeof message.id !== 'number') {
      return { invalid: 'A request id must be a string or a number' }
    }
    if (message.params !== undefined && !isObject(message.params)) return { invalid: 'params must be an object', id: message.id }
    return { kind: 'request' }
  }
  if (hasId && ('result' in message || 'error' in message)) return { kind: 'response' }
  return { invalid: 'Not a request, notification or response' }
}

function serverCapabilities(server) {
  return server.capabilities
}

function discoverResult(server) {
  return {
    supportedVersions: SUPPORTED_VERSIONS,
    capabilities: serverCapabilities(server),
    ...(server.instructions ? { instructions: server.instructions } : {}),
  }
}

async function runHandler(server, method, params, ctx) {
  const handler = server.methods[method]
  if (!handler) throw new McpError(ErrorCode.METHOD_NOT_FOUND, `Method not found: ${method}`)
  const result = await handler(params ?? {}, ctx)
  return isObject(result) ? result : {}
}

/** The JSON-RPC error a thrown value becomes, in the given era. */
function errorFor(err, era) {
  if (err instanceof McpError) {
    const code = err.resourceNotFound && era === 'legacy' ? ErrorCode.LEGACY_RESOURCE_NOT_FOUND : err.code
    return { code, message: err.message, data: err.data }
  }
  return { code: ErrorCode.INTERNAL_ERROR, message: 'Internal error' }
}

// ── Legacy era ───────────────────────────────────────────────────────────────

async function legacyResponse(message, server, headers, log) {
  const { method, id } = message
  const params = isObject(message.params) ? message.params : {}
  try {
    if (method === 'initialize') {
      // Version negotiation, legacy style: echo the client's version when it is
      // one we speak, otherwise offer our latest and let the client decide.
      const requested = params.protocolVersion
      const protocolVersion = LEGACY_VERSIONS.includes(requested) ? requested : LEGACY_VERSIONS[0]
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion,
          capabilities: serverCapabilities(server),
          serverInfo: server.info,
          ...(server.instructions ? { instructions: server.instructions } : {}),
        },
      }
    }
    if (method === 'ping') return { jsonrpc: '2.0', id, result: {} }
    if (method === 'server/discover') return { jsonrpc: '2.0', id, result: discoverResult(server) }
    const ctx = {
      era: 'legacy',
      protocolVersion: headerValue(headers, 'mcp-protocol-version') ?? HEADERLESS_VERSION,
      clientInfo: undefined,
    }
    return { jsonrpc: '2.0', id, result: await runHandler(server, method, params, ctx) }
  } catch (err) {
    if (!(err instanceof McpError)) log?.(err)
    const { code, message: text, data } = errorFor(err, 'legacy')
    return errorPayload(id, code, text, data)
  }
}

async function legacy(message, server, headers, log) {
  const { kind } = classify(message)
  // A notification (`notifications/initialized`, `notifications/cancelled`) or a
  // response to a request we never send: accepted, nothing to answer.
  if (kind !== 'request') return accepted()
  return json(200, await legacyResponse(message, server, headers, log))
}

async function legacyBatch(messages, server, headers, log) {
  // JSON-RPC batching existed in 2025-03-26 only; answered for that revision's
  // clients, never for a modern request.
  if (messages.length === 0) return json(400, errorPayload(null, ErrorCode.INVALID_REQUEST, 'Empty batch'))
  const out = []
  for (const message of messages) {
    const c = classify(message)
    if (c.invalid) out.push(errorPayload(c.id, ErrorCode.INVALID_REQUEST, c.invalid))
    else if (c.kind === 'request') out.push(await legacyResponse(message, server, headers, log))
  }
  return out.length ? json(200, out) : accepted()
}

// ── Modern era ───────────────────────────────────────────────────────────────

async function modern(message, server, headers, meta, log) {
  const { kind } = classify(message)
  if (kind !== 'request') return accepted()
  const { id, method } = message
  const params = isObject(message.params) ? message.params : {}
  const fail = (status, code, text, data) => json(status, errorPayload(id, code, text, data))

  // Validation, in the order the spec's error taxonomy reads: the version
  // declared in the body against its header, then whether we speak it, then
  // the rest of the required metadata and mirrored headers.
  const version = meta[META.protocolVersion]
  if (typeof version !== 'string' || version === '') {
    return fail(400, ErrorCode.INVALID_PARAMS, `Missing required _meta field ${META.protocolVersion}`)
  }
  const headerVersion = headerValue(headers, 'mcp-protocol-version')
  if (headerVersion === undefined) return fail(400, ErrorCode.HEADER_MISMATCH, 'Header mismatch: missing MCP-Protocol-Version header')
  if (headerVersion !== version) {
    return fail(400, ErrorCode.HEADER_MISMATCH, `Header mismatch: MCP-Protocol-Version header value '${headerVersion}' does not match body value '${version}'`)
  }
  if (!MODERN_VERSIONS.includes(version)) {
    return fail(400, ErrorCode.UNSUPPORTED_PROTOCOL_VERSION, 'Unsupported protocol version', { supported: SUPPORTED_VERSIONS, requested: version })
  }
  if (!isObject(meta[META.clientCapabilities])) {
    return fail(400, ErrorCode.INVALID_PARAMS, `Missing required _meta field ${META.clientCapabilities}`)
  }
  const methodHeader = headerValue(headers, 'mcp-method')
  if (methodHeader === undefined) return fail(400, ErrorCode.HEADER_MISMATCH, 'Header mismatch: missing Mcp-Method header')
  if (methodHeader !== method) {
    return fail(400, ErrorCode.HEADER_MISMATCH, `Header mismatch: Mcp-Method header value '${methodHeader}' does not match body value '${method}'`)
  }
  const nameField = NAMED_METHODS[method]
  if (nameField) {
    const raw = headerValue(headers, 'mcp-name')
    if (raw === undefined) return fail(400, ErrorCode.HEADER_MISMATCH, 'Header mismatch: missing Mcp-Name header')
    const decoded = decodeHeaderValue(raw)
    if (decoded === null || decoded !== params[nameField]) {
      return fail(400, ErrorCode.HEADER_MISMATCH, `Header mismatch: Mcp-Name header does not match body value '${params[nameField]}'`)
    }
  }

  const serverMeta = { [META.serverInfo]: server.info }
  const complete = result => ({
    resultType: 'complete',
    ...result,
    ...(CACHEABLE_METHODS.has(method) ? { ttlMs: server.cacheTtlMs, cacheScope: 'public' } : {}),
    _meta: { ...(isObject(result._meta) ? result._meta : {}), ...serverMeta },
  })

  if (method === 'subscriptions/listen') {
    // Nothing here ever changes while a deployment is live — the knowledge base
    // is a build artifact — so no notification type is honoured. Acknowledge
    // with an empty filter and close gracefully, as a server ending a
    // subscription on its own initiative does (patterns/subscriptions).
    const subscription = { [META.subscriptionId]: id }
    return sse([
      { jsonrpc: '2.0', method: 'notifications/subscriptions/acknowledged', params: { _meta: subscription, notifications: {} } },
      { jsonrpc: '2.0', id, result: { resultType: 'complete', _meta: { ...subscription, ...serverMeta } } },
    ])
  }

  const ctx = {
    era: 'modern',
    protocolVersion: version,
    clientInfo: isObject(meta[META.clientInfo]) ? meta[META.clientInfo] : undefined,
    clientCapabilities: meta[META.clientCapabilities],
  }
  try {
    const result = method === 'server/discover' ? discoverResult(server) : await runHandler(server, method, params, ctx)
    return json(200, { jsonrpc: '2.0', id, result: complete(result) })
  } catch (err) {
    if (!(err instanceof McpError)) log?.(err)
    const { code, message: text, data } = errorFor(err, 'modern')
    // An unknown method is a 404, so a client can tell it from a legacy server
    // that doesn't host this endpoint at all (streamable-http §Protocol Version Header).
    return fail(code === ErrorCode.METHOD_NOT_FOUND ? 404 : 200, code, text, data)
  }
}

// ── Entry point ──────────────────────────────────────────────────────────────

/**
 * @typedef {object} McpServerDefinition
 * @property {{ name: string, version: string, title?: string, description?: string, websiteUrl?: string, icons?: object[] }} info
 * @property {string} [instructions]
 * @property {object} capabilities
 * @property {number} cacheTtlMs  Freshness hint for cacheable results.
 * @property {Record<string, (params: object, ctx: object) => unknown>} methods
 *   `tools/list`, `tools/call`, `resources/read`, … — each returns a result
 *   object (without the modern-era decorations, which are added here) or throws
 *   an {@link McpError}.
 */

/**
 * Answer one HTTP request to the MCP endpoint.
 *
 * @param {{ method: string, headers: Record<string, string | string[] | undefined>, body?: unknown, bodyError?: boolean }} request
 *   `body` is the parsed JSON; `bodyError` says the body could not be parsed.
 * @param {McpServerDefinition} server
 * @param {(err: unknown) => void} [log] Told about unexpected handler failures.
 * @returns {Promise<{ status: number, headers: Record<string, string>, body?: string }>}
 */
export async function handleMcpHttp(request, server, log) {
  const method = String(request.method || '').toUpperCase()
  if (method !== 'POST') {
    // No standalone SSE stream (legacy GET) and no sessions to end (legacy
    // DELETE): both are 405, which is how a client learns there are none.
    return json(405, errorPayload(null, ErrorCode.INVALID_REQUEST, 'This MCP endpoint accepts POST only (Streamable HTTP).'), { Allow: 'POST, OPTIONS' })
  }
  if (request.bodyError) return json(400, errorPayload(null, ErrorCode.PARSE_ERROR, 'Parse error: the body is not valid JSON'))

  const body = request.body
  if (Array.isArray(body)) return legacyBatch(body, server, request.headers, log)
  const c = classify(body)
  if (c.invalid) return json(400, errorPayload(c.id, ErrorCode.INVALID_REQUEST, `Invalid request: ${c.invalid}`))

  if (body.method === 'initialize') return legacy(body, server, request.headers, log)
  const meta = isObject(body.params) && isObject(body.params._meta) ? body.params._meta : {}
  const metaVersion = meta[META.protocolVersion]
  const headerVersion = headerValue(request.headers, 'mcp-protocol-version')

  // Per-request metadata naming a modern version is a modern request; one
  // naming a legacy version (which never carried it) is read as legacy.
  if (metaVersion !== undefined && !LEGACY_VERSIONS.includes(metaVersion)) {
    return modern(body, server, request.headers, meta, log)
  }
  if (headerVersion === undefined || LEGACY_VERSIONS.includes(headerVersion)) {
    return legacy(body, server, request.headers, log)
  }
  if (MODERN_VERSIONS.includes(headerVersion)) return modern(body, server, request.headers, meta, log)
  // A version nobody speaks: say which ones we do, in the modern error both
  // eras can read (a legacy client gets its 400 either way).
  if (c.kind !== 'request') return json(400, errorPayload(null, ErrorCode.UNSUPPORTED_PROTOCOL_VERSION, 'Unsupported protocol version', { supported: SUPPORTED_VERSIONS, requested: headerVersion }))
  return json(400, errorPayload(body.id, ErrorCode.UNSUPPORTED_PROTOCOL_VERSION, 'Unsupported protocol version', { supported: SUPPORTED_VERSIONS, requested: headerVersion }))
}
