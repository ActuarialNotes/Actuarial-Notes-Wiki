#!/usr/bin/env node
// Run the Claude / ChatGPT connector locally against a build — the same handler
// Vercel runs (api/mcp.js), with dist/ served beside it so the handler can read
// /ai/knowledge-base.json from its own origin exactly as it does when deployed.
//
//   npm run build && npm run mcp:local      → http://localhost:8787/api/mcp
//
// Then point any MCP client at that URL, for example:
//   npx @modelcontextprotocol/inspector          (transport: Streamable HTTP)
//   claude mcp add --transport http actuarial-notes-local http://localhost:8787/api/mcp
//
// See docs/ai-connector.md.

import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import handler from '../api/mcp.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const PORT = Number(process.env.PORT || 8787)
const TYPES = {
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.zip': 'application/zip',
  '.png': 'image/png',
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  if (url.pathname === '/api/mcp') {
    // The two things Vercel's runtime adds that plain Node doesn't: the request
    // body and `res.status()`.
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    req.body = chunks.length ? Buffer.concat(chunks).toString('utf8') : undefined
    res.status = code => {
      res.statusCode = code
      return res
    }
    try {
      await handler(req, res)
    } catch (err) {
      console.error(err)
      if (!res.headersSent) res.statusCode = 500
      res.end()
    }
    return
  }
  let file
  try {
    file = path.join(DIST, path.normalize(decodeURIComponent(url.pathname)))
  } catch {
    res.statusCode = 400
    return res.end('Bad path')
  }
  if (!file.startsWith(DIST + path.sep)) {
    res.statusCode = 403
    return res.end()
  }
  try {
    const body = await readFile(file)
    res.setHeader('Content-Type', TYPES[path.extname(file)] ?? 'application/octet-stream')
    res.end(body)
  } catch {
    res.statusCode = 404
    res.end('Not found — run `npm run build` first?')
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Actuarial Notes MCP connector: http://localhost:${PORT}/api/mcp (reading ${DIST})`)
})
