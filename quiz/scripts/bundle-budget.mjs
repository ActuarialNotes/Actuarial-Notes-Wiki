#!/usr/bin/env node
// The first-paint budget (roadmap E3): what every reader downloads before the
// app can draw anything — the entry script `dist/index.html` loads, the chunks
// it preloads and its stylesheets — measured gzipped, the way it travels.
//
// The question bank used to sit in the entry chunk (3.7 MB gzip), so every
// question added slowed the first paint for every reader, including one who
// only opened the Dashboard. It is a lazy chunk now (`fetchAllQuestions` in
// src/lib/github.ts); this check is what keeps it — or the next megabyte of
// bundled content — from drifting back in unnoticed.
//
//   node scripts/bundle-budget.mjs [distDir]      (after `npm run build`)
//
// Raise the budget deliberately, in the PR that needs it, and say why.

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const BUDGET_KB = 900

const dist = path.resolve(process.argv[2] ?? 'dist')
const html = readFileSync(path.join(dist, 'index.html'), 'utf8')

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1]
const assets = new Set()
for (const tag of html.match(/<script\b[^>]*>/g) ?? []) {
  const src = attr(tag, 'src')
  if (src && /\btype="module"/.test(tag)) assets.add(src)
}
for (const tag of html.match(/<link\b[^>]*>/g) ?? []) {
  const rel = attr(tag, 'rel')
  const href = attr(tag, 'href')
  if (href && (rel === 'modulepreload' || rel === 'stylesheet') && href.startsWith('/assets/')) assets.add(href)
}
if (![...assets].some(a => a.endsWith('.js'))) {
  console.error(`bundle-budget: no entry script found in ${path.join(dist, 'index.html')}`)
  process.exit(1)
}

let total = 0
const rows = [...assets].map(asset => {
  const bytes = readFileSync(path.join(dist, asset.replace(/^\//, '')))
  const gz = gzipSync(bytes, { level: 9 }).length
  total += gz
  return { asset, raw: bytes.length, gz }
})

const kb = n => `${(n / 1024).toFixed(1)} kB`
for (const r of rows.sort((a, b) => b.gz - a.gz)) {
  console.log(`${kb(r.gz).padStart(10)} gzip  ${kb(r.raw).padStart(11)} raw  ${r.asset}`)
}
const verdict = `first paint: ${kb(total)} gzip, budget ${BUDGET_KB} kB`
if (total > BUDGET_KB * 1024) {
  console.error(`bundle-budget: over budget — ${verdict}`)
  process.exit(1)
}
console.log(`bundle-budget: ok — ${verdict}`)
