// What the connector records about its own use — one event per JSON-RPC
// request, written as one JSON log line by ../mcp.js (`{"mcp_usage": …}`), so
// Vercel's logs can be filtered and counted by method, tool, client and outcome.
//
// The rule is the app's analytics rule (docs/analytics-and-monitoring.md): no
// personal data. Nothing here identifies a person — no IP address, no session,
// no account (the connector has none). Tool arguments are kept by an allowlist
// of the ones that say *what* was studied (an exam, a concept, a calculator);
// a student's answer, their own data for a calculator and anything else
// free-form never leaves the request. The one free-text field kept is a
// search query, cut short and with emails and long numbers blanked, as the
// app does before it sends a search term to GA (`redactPii` in
// src/lib/analyticsPolicy.ts).
//
// Also here: the campaign parameters on the links the connector hands out
// (a practice set, a calculator run), so GA shows a visit that came from it.
// No dependencies; tested by src/lib/mcpUsage.test.ts.

/** Tool arguments recorded as they are: they name what was asked for, never who asked. */
const KEPT_ARGUMENTS = ['exam', 'concept', 'objective', 'topic', 'difficulty', 'sitting', 'type', 'area', 'tool', 'question_id', 'count', 'limit']

/** Free-text arguments recorded cut short and redacted. */
const TEXT_ARGUMENTS = ['query']
const MAX_TEXT = 80
const MAX_VALUE = 120

const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/g
const LONG_NUMBER_PATTERN = /\d[\d\s-]{7,}\d/g

/** `text` with emails and long digit runs blanked — the app's `redactPii`. */
export function redactText(text) {
  return text.replace(EMAIL_PATTERN, '[redacted email]').replace(LONG_NUMBER_PATTERN, '[redacted number]')
}

function isObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function shortString(v, max) {
  if (typeof v !== 'string') return undefined
  const s = v.trim()
  if (!s) return undefined
  return s.length > max ? `${s.slice(0, max)}…` : s
}

/** The allowlisted summary of a tool call's arguments, or undefined when nothing is kept. */
export function argumentSummary(args) {
  if (!isObject(args)) return undefined
  const out = {}
  for (const key of KEPT_ARGUMENTS) {
    const v = args[key]
    if (typeof v === 'number' && Number.isFinite(v)) out[key] = v
    else if (typeof v === 'boolean') out[key] = v
    else {
      const s = shortString(v, MAX_VALUE)
      if (s) out[key] = s
    }
  }
  for (const key of TEXT_ARGUMENTS) {
    const s = shortString(args[key], MAX_TEXT)
    if (s) out[key] = redactText(s)
  }
  if (Array.isArray(args.runs)) out.runs = args.runs.length
  return Object.keys(out).length ? out : undefined
}

/**
 * A client's name from its User-Agent: the first product token, without its
 * version or anything after it (`Claude-User/1.0 (+https://…)` → `Claude-User`).
 * A legacy client names itself only in its `initialize`, so every later
 * request is known by this alone.
 */
export function userAgentProduct(ua) {
  if (typeof ua !== 'string') return undefined
  const m = /^\s*([A-Za-z][\w.+-]{0,40})/.exec(ua)
  return m ? m[1] : undefined
}

/**
 * One request's usage event.
 *
 * @param {object} r
 * @param {'legacy' | 'modern'} r.era
 * @param {string} [r.protocolVersion]
 * @param {string} r.method      The JSON-RPC method.
 * @param {object} [r.params]    The request's params (only the name/uri and allowlisted arguments are read).
 * @param {object} [r.clientInfo] `{ name, version }`, when the request carries it.
 * @param {string} [r.userAgent]
 * @param {object} [r.result]    The handler's result, when it answered.
 * @param {number} [r.errorCode] The JSON-RPC error code, when it failed.
 * @param {number} [r.ms]        Time spent answering.
 */
export function usageEvent({ era, protocolVersion, method, params, clientInfo, userAgent, result, errorCode, ms }) {
  const p = isObject(params) ? params : {}
  const event = { era, method }
  if (protocolVersion) event.protocol = protocolVersion
  if (method === 'tools/call' || method === 'prompts/get') {
    const name = shortString(p.name, MAX_VALUE)
    if (name) event.name = name
    const args = argumentSummary(p.arguments)
    if (args) event.args = args
  } else if (method === 'resources/read') {
    const uri = shortString(p.uri, MAX_VALUE)
    if (uri) event.name = uri
  }
  const info = isObject(clientInfo) ? clientInfo : method === 'initialize' && isObject(p.clientInfo) ? p.clientInfo : undefined
  const client = info ? shortString(info.name, 60) : undefined
  if (client) {
    event.client = client
    const version = shortString(info.version, 30)
    if (version) event.client_version = version
  }
  const agent = userAgentProduct(userAgent)
  if (agent) event.user_agent = agent
  event.outcome = errorCode !== undefined ? 'error' : isObject(result) && result.isError === true ? 'tool_error' : 'ok'
  if (errorCode !== undefined) event.error_code = errorCode
  if (typeof ms === 'number' && Number.isFinite(ms)) event.ms = Math.max(0, Math.round(ms))
  return event
}

/** The campaign parameters on every link into the app the connector hands out. */
export const LINK_SOURCE = 'mcp'
export const LINK_MEDIUM = 'ai_connector'

/**
 * `url` with the connector's campaign parameters, `utm_campaign` naming the
 * tool that handed it out. Added to the query, ahead of any fragment (a
 * calculator run carries its input in `#input=`).
 */
export function withConnectorSource(url, campaign) {
  const hash = url.indexOf('#')
  const base = hash === -1 ? url : url.slice(0, hash)
  const fragment = hash === -1 ? '' : url.slice(hash)
  const tags = `utm_source=${LINK_SOURCE}&utm_medium=${LINK_MEDIUM}${campaign ? `&utm_campaign=${encodeURIComponent(campaign)}` : ''}`
  return `${base}${base.includes('?') ? '&' : '?'}${tags}${fragment}`
}
