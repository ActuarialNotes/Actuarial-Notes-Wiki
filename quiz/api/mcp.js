// Vercel serverless function — Actuarial Notes as an MCP server, the endpoint a
// reader adds to Claude or ChatGPT as a custom connector:
//
//   https://quiz.actuarialnotes.com/api/mcp
//
// Streamable HTTP, stateless, read-only and public (no sign-in: everything it
// serves is the published vault). Both MCP protocol eras are spoken on this one
// endpoint — see _mcp/protocol.js — and the tools, resources and prompts are in
// _mcp/server.js. docs/ai-connector.md is the full account.
//
// It lives under `quiz/api/` for the same reason `exam-pdf.js` does: the app is
// its own Vercel project rooted at `quiz/`, and this has to share its origin to
// read the knowledge-base export the build puts there.
//
// Environment variables (all optional):
//   MCP_KB_URL              read the export from this URL instead of this
//                           deployment's own /ai/knowledge-base.json
//   MCP_PUBLIC_SITE_URL     the site the server names as its home and icon
//                           (default https://quiz.actuarialnotes.com)
//   MCP_ALLOWED_ORIGINS     comma-separated browser origins allowed to call it;
//                           unset or `*` allows any (see allowedOrigin)
//   MCP_RATE_LIMIT          requests per minute per client address on one
//                           instance (default 600; 0 turns the limit off)

import { ErrorCode, handleMcpHttp } from './_mcp/protocol.js'
import { DEFAULT_SITE_URL, createActuarialNotesServer } from './_mcp/server.js'
import { knowledgeBaseUrl, loadIndex } from './_mcp/load.js'

const RATE_WINDOW_MS = 60 * 1000
const DEFAULT_RATE_LIMIT = 600
const RATE_LIMITED = -31429 // application-defined: outside JSON-RPC's reserved range, as the spec asks

/** Timestamps of recent requests per client address, on this instance. */
const recent = new Map()

function clientAddress(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim()
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || 'unknown'
}

/**
 * Seconds to wait when a client is over the limit, or 0. Generous by design:
 * Claude and ChatGPT reach a connector from shared addresses, so a tight limit
 * per address would throttle everybody using the same assistant at once.
 */
export function rateLimitWait(key, now = Date.now(), limit = Number(process.env.MCP_RATE_LIMIT ?? DEFAULT_RATE_LIMIT)) {
  if (!Number.isFinite(limit) || limit <= 0) return 0
  const cutoff = now - RATE_WINDOW_MS
  const times = (recent.get(key) ?? []).filter(t => t > cutoff)
  if (recent.size > 5000) {
    for (const [k, v] of recent) if (!v.length || v[v.length - 1] <= cutoff) recent.delete(k)
  }
  if (times.length >= limit) {
    recent.set(key, times)
    return Math.max(1, Math.ceil((times[0] + RATE_WINDOW_MS - now) / 1000))
  }
  times.push(now)
  recent.set(key, times)
  return 0
}

/**
 * Whether a browser origin may call the endpoint. The spec asks servers to
 * check Origin because a server on localhost can be reached from any web page
 * by DNS rebinding. This one is public, holds no credentials and serves only
 * published notes, so any origin is allowed unless the operator narrows it —
 * and a request with no Origin (Claude's and ChatGPT's servers) is never a
 * browser's.
 */
export function allowedOrigin(origin, configured = process.env.MCP_ALLOWED_ORIGINS) {
  if (!origin || !configured || configured.trim() === '*') return true
  return configured.split(',').map(o => o.trim()).filter(Boolean).includes(origin)
}

/** The parsed JSON body, or `bodyError` when it isn't JSON. */
function readBody(req) {
  let raw
  try {
    raw = req.body // Vercel parses JSON lazily and throws on a malformed body
  } catch {
    return { bodyError: true }
  }
  if (raw == null || raw === '') return { body: undefined }
  if (typeof raw === 'string' || raw instanceof Uint8Array) {
    try {
      return { body: JSON.parse(typeof raw === 'string' ? raw : Buffer.from(raw).toString('utf8')) }
    } catch {
      return { bodyError: true }
    }
  }
  return { body: raw }
}

function setCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS')
  // Echo what a preflight asks for: MCP clients send MCP-Protocol-Version,
  // Mcp-Method, Mcp-Name and Mcp-Param-* headers, and the list keeps growing.
  const asked = req.headers?.['access-control-request-headers']
  res.setHeader(
    'Access-Control-Allow-Headers',
    typeof asked === 'string' && /^[\w\s,-]+$/.test(asked)
      ? asked
      : 'Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id, Last-Event-ID',
  )
  res.setHeader('Access-Control-Max-Age', '86400')
}

export default async function handler(req, res) {
  setCors(req, res)
  if (req.method === 'OPTIONS') return res.status(204).end()

  const reject = (status, code, message, extra = {}) => {
    res.setHeader('Content-Type', 'application/json')
    for (const [k, v] of Object.entries(extra)) res.setHeader(k, v)
    return res.status(status).end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code, message } }))
  }
  if (!allowedOrigin(req.headers?.origin)) return reject(403, ErrorCode.INVALID_REQUEST, 'Origin not allowed')
  const wait = rateLimitWait(clientAddress(req))
  if (wait > 0) return reject(429, RATE_LIMITED, `Rate limit exceeded; retry in ${wait}s`, { 'Retry-After': String(wait) })

  const server = createActuarialNotesServer({
    loadIndex: () => loadIndex(knowledgeBaseUrl(req.headers)),
    siteUrl: process.env.MCP_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  })
  const { body, bodyError } = readBody(req)
  const out = await handleMcpHttp({ method: req.method, headers: req.headers ?? {}, body, bodyError }, server, err => {
    console.error('[mcp]', err)
  })
  for (const [key, value] of Object.entries(out.headers)) res.setHeader(key, value)
  res.status(out.status)
  return out.body === undefined ? res.end() : res.end(out.body)
}
