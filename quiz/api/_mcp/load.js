// Where the connector's knowledge comes from: the `/ai/knowledge-base.json`
// asset the build emits (vite.config.ts → src/lib/knowledgeBase.ts), fetched
// from the deployment serving this function and indexed once per warm instance.
//
// Why fetch our own static asset rather than import it: Vercel may bundle the
// functions in `api/` before the app build has written anything, so the export
// can't be relied on to exist when this file is packaged. Fetched from the same
// origin, the function always reads the content its own deployment serves.

import { indexKnowledgeBase } from './knowledgeBase.js'

/** Mirrors KNOWLEDGE_BASE_ASSET in src/lib/knowledgeBase.ts. */
export const KNOWLEDGE_BASE_PATH = '/ai/knowledge-base.json'

const FETCH_TIMEOUT_MS = 15000
const MAX_CACHED = 4

/** Indexes by export URL. A failed load is dropped so the next request retries. */
const cache = new Map()

const HOST_RE = /^[a-z0-9.-]+(?::\d{1,5})?$/i

/**
 * The export's URL for a request: `MCP_KB_URL` when the operator set one,
 * otherwise this deployment's own origin, read off the Host header. Vercel only
 * routes a request here when its Host is one of the deployment's domains, and
 * the cache is keyed by URL, so a forged Host could only ever affect the
 * requests that carry it.
 */
export function knowledgeBaseUrl(headers, env = process.env) {
  if (env.MCP_KB_URL) return env.MCP_KB_URL
  const host = String(headers?.host ?? '').trim()
  if (!HOST_RE.test(host)) throw new Error('Cannot tell which deployment to read the knowledge base from')
  const local = /^(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(host)
  return `${local ? 'http' : 'https'}://${host}${KNOWLEDGE_BASE_PATH}`
}

/**
 * Headers for fetching the export. A preview deployment sits behind Vercel's
 * deployment protection; the automation bypass secret, when the project has one,
 * lets the function read its own preview's assets.
 */
export function knowledgeBaseHeaders(env = process.env) {
  const headers = { Accept: 'application/json' }
  if (env.VERCEL_AUTOMATION_BYPASS_SECRET) headers['x-vercel-protection-bypass'] = env.VERCEL_AUTOMATION_BYPASS_SECRET
  return headers
}

async function fetchIndex(url, fetchImpl, headers) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetchImpl(url, { headers, signal: controller.signal })
    if (!response.ok) throw new Error(`Knowledge base responded ${response.status}`)
    return indexKnowledgeBase(await response.json())
  } finally {
    clearTimeout(timer)
  }
}

/** The indexed knowledge base at `url`, fetched on first use. */
export function loadIndex(url, { fetchImpl = fetch, headers = knowledgeBaseHeaders() } = {}) {
  let entry = cache.get(url)
  if (!entry) {
    entry = fetchIndex(url, fetchImpl, headers).catch(err => {
      cache.delete(url)
      throw err
    })
    cache.set(url, entry)
    if (cache.size > MAX_CACHED) cache.delete(cache.keys().next().value)
  }
  return entry
}

/** For tests. */
export function clearIndexCache() {
  cache.clear()
}
