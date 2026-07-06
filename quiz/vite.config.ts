/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readdir, readFile } from 'fs/promises'
import fm from 'front-matter'

const REPO_ROOT = path.resolve(__dirname, '..')

const _buildEnv = loadEnv('', __dirname, 'VITE_')
const GITHUB_REPO = _buildEnv.VITE_GITHUB_REPO || 'ActuarialNotes/Actuarial-Notes-Wiki'
const GITHUB_BRANCH = _buildEnv.VITE_GITHUB_BRANCH || 'main'

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

function extractCoverImageUrl(content: string): string | undefined {
  const m = /!\[\[([^\]]+)\]\]/.exec(content)
  if (!m) return undefined
  const imagePath = m[1].trim()
  if (!IMAGE_EXT_RE.test(imagePath)) return undefined
  const resolved = imagePath.includes('/') ? imagePath : `Media/Attachments/${imagePath}`
  const encoded = resolved.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${encoded}`
}

interface WikiIndexItem {
  category: 'exam' | 'concept' | 'document'
  name: string
  path: string
  topic?: string
  author?: string
  year?: number
  title?: string
  edition?: string
  publisher?: string
  coverImage?: string
}

interface WikiBundleData {
  files: Record<string, string>
  index: WikiIndexItem[]
}

async function collectWikiContent(): Promise<WikiBundleData> {
  const files: Record<string, string> = {}
  const index: WikiIndexItem[] = []

  // Exam files at repo root
  const rootEntries = await readdir(REPO_ROOT).catch(() => [] as string[])
  for (const name of rootEntries) {
    if (!name.endsWith('.md') || !/^Exam\b/i.test(name)) continue
    const text = await readFile(path.join(REPO_ROOT, name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[name] = text
    index.push({ category: 'exam', name: name.replace(/\.md$/i, ''), path: name })
  }

  // Concepts/
  const conceptEntries = await readdir(path.join(REPO_ROOT, 'Concepts')).catch(() => [] as string[])
  for (const name of conceptEntries) {
    if (!name.endsWith('.md')) continue
    const text = await readFile(path.join(REPO_ROOT, 'Concepts', name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[`Concepts/${name}`] = text
    index.push({ category: 'concept', name: name.replace(/\.md$/i, ''), path: `Concepts/${name}` })
  }

  // Resources/Books/
  const bookEntries = await readdir(path.join(REPO_ROOT, 'Resources/Books')).catch(() => [] as string[])
  for (const name of bookEntries) {
    if (!name.endsWith('.md')) continue
    const text = await readFile(path.join(REPO_ROOT, 'Resources/Books', name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[`Resources/Books/${name}`] = text
    const attrs = (fm<Record<string, unknown>>(text).attributes ?? {}) as Record<string, unknown>
    const yearNum = attrs['Year'] ? parseInt(String(attrs['Year']), 10) : undefined
    index.push({
      category: 'document',
      name: name.replace(/\.md$/i, ''),
      path: `Resources/Books/${name}`,
      author: (attrs['Authors'] || attrs['Author']) ? String(attrs['Authors'] || attrs['Author']) : undefined,
      year: Number.isFinite(yearNum) ? yearNum : undefined,
      title: attrs['Title'] ? String(attrs['Title']) : undefined,
      edition: attrs['Edition'] ? String(attrs['Edition']) : undefined,
      publisher: attrs['Publisher'] ? String(attrs['Publisher']) : undefined,
      coverImage: extractCoverImageUrl(text),
    })
  }

  return { files, index }
}

function wikiContentPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:wiki-content'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'wiki-content',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const data = await collectWikiContent()
      return `export default ${JSON.stringify(data)}`
    },
  }
}

// ── Resource timeline ────────────────────────────────────────────────────────
// A flat, dated index of the content that powers the Resources heatmap: books
// (Resources/Books), historical events (Resources/Events), regulation
// (Resources/Regulation), and regulator-published loss-trend/capital benchmarks
// (Resources/Benchmarks). Kept separate from the wiki-content index above so the
// search/index logic — which only understands 'exam' | 'concept' | 'document' —
// is unaffected.

type TimelineKind = 'book' | 'event' | 'regulation' | 'benchmark'

const TIMELINE_SOURCES: { dir: string; kind: TimelineKind }[] = [
  { dir: 'Resources/Books', kind: 'book' },
  { dir: 'Resources/Events', kind: 'event' },
  { dir: 'Resources/Regulation', kind: 'regulation' },
  { dir: 'Resources/Benchmarks', kind: 'benchmark' },
]

interface TimelineRawEntry {
  id: string
  kind: TimelineKind
  /** 'YYYY-MM-DD' (full date) or 'YYYY' (year-only, e.g. textbooks). */
  date: string
  title: string
  name: string
  path: string
  summary?: string
  jurisdiction?: string
  lob?: string[]
  impactLevel?: string
  status?: string
  issuingBody?: string
  author?: string
  publisher?: string
  edition?: string
  year?: number
  coverImage?: string
}

// front-matter delegates to js-yaml, which parses an unquoted `date: 1965-03-18`
// into a JS Date (UTC midnight). Normalise both Dates and strings to a plain key.
function toDateString(v: unknown): string | undefined {
  if (v == null) return undefined
  if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
  const s = String(v).trim()
  return s || undefined
}

function yearFromFilename(name: string): string | undefined {
  const m = /\((\d{4})\)/.exec(name)
  return m ? m[1] : undefined
}

const MD_LINK_RE = /\[([^\]]+)\]\([^)]+\)/g
const MD_BOLD_RE = /\*\*([^*]+)\*\*/g
const MD_ITALIC_RE = /(?<!\*)\*([^*]+)\*(?!\*)/g

// First descriptive paragraph of the body, stripped of headings and markdown.
function extractSummary(raw: string): string | undefined {
  const body = raw.replace(/^---[\s\S]*?\n---[ \t]*\r?\n?/, '')
  let cur = ''
  let first = ''
  for (const lineRaw of body.split('\n')) {
    const line = lineRaw.trim()
    if (/^#{1,6}\s/.test(line) || line === '') {
      if (cur.trim()) { first = cur.trim(); break }
      continue
    }
    cur += (cur ? ' ' : '') + line
  }
  if (!first && cur.trim()) first = cur.trim()
  if (!first) return undefined
  let s = first
    .replace(MD_LINK_RE, '$1')
    .replace(MD_BOLD_RE, '$1')
    .replace(MD_ITALIC_RE, '$1')
    .trim()
  if (s.length > 260) s = s.slice(0, 257).trimEnd() + '…'
  return s
}

async function collectResourceTimeline(): Promise<TimelineRawEntry[]> {
  const entries: TimelineRawEntry[] = []

  for (const { dir, kind } of TIMELINE_SOURCES) {
    const names = await readdir(path.join(REPO_ROOT, dir)).catch(() => [] as string[])
    for (const name of names) {
      if (!name.endsWith('.md')) continue
      const text = await readFile(path.join(REPO_ROOT, dir, name), 'utf-8').catch(() => null)
      if (text == null) continue
      const attrs = (fm<Record<string, unknown>>(text).attributes ?? {}) as Record<string, unknown>
      const bare = name.replace(/\.md$/i, '')

      // Effective/published date. Books usually carry only `date`/`Year`; events &
      // regulation carry a full ISO `date`. Fall back to a year in the filename.
      const date =
        toDateString(attrs['date']) ??
        toDateString(attrs['Year']) ??
        yearFromFilename(bare)
      if (!date) continue // no resolvable date → omit from the timeline (still in the grid)

      const yearNum = parseInt(date.slice(0, 4), 10)
      const isBook = kind === 'book'
      // A file in Resources/Regulation may declare `type: event`; honour it.
      const declaredType = String(attrs['type'] ?? '').toLowerCase()
      const resolvedKind: TimelineKind =
        declaredType === 'event' ? 'event'
        : declaredType === 'regulation' ? 'regulation'
        : kind

      entries.push({
        id: attrs['id'] ? String(attrs['id']) : bare,
        kind: resolvedKind,
        date,
        title: String(attrs['title'] || attrs['Title'] || bare),
        name: bare,
        path: `${dir}/${name}`,
        summary: isBook ? undefined : extractSummary(text),
        jurisdiction: attrs['jurisdiction'] ? String(attrs['jurisdiction']) : undefined,
        lob: Array.isArray(attrs['lob']) ? attrs['lob'].map(String) : undefined,
        impactLevel: attrs['impact_level'] ? String(attrs['impact_level']) : undefined,
        status: attrs['status'] ? String(attrs['status']) : undefined,
        issuingBody: attrs['issuing_body'] ? String(attrs['issuing_body']) : undefined,
        author: (attrs['Authors'] || attrs['Author']) ? String(attrs['Authors'] || attrs['Author']) : undefined,
        publisher: attrs['Publisher'] ? String(attrs['Publisher']) : undefined,
        edition: attrs['Edition'] ? String(attrs['Edition']) : undefined,
        year: Number.isFinite(yearNum) ? yearNum : undefined,
        coverImage: isBook ? extractCoverImageUrl(text) : undefined,
      })
    }
  }

  entries.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  return entries
}

function resourceTimelinePlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:resource-timeline'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'resource-timeline',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const data = await collectResourceTimeline()
      return `export default ${JSON.stringify(data)}`
    },
  }
}

async function collectQuestions(): Promise<string[]> {
  const rawFiles: string[] = []
  const questionsDir = path.join(REPO_ROOT, 'questions')
  const examDirs = await readdir(questionsDir).catch(() => [] as string[])
  for (const examDir of examDirs) {
    const examPath = path.join(questionsDir, examDir)
    const files = await readdir(examPath).catch(() => [] as string[])
    for (const name of files) {
      if (!name.endsWith('.md')) continue
      const text = await readFile(path.join(examPath, name), 'utf-8').catch(() => null)
      if (text != null) rawFiles.push(text)
    }
  }
  return rawFiles
}

function questionsContentPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:questions-content'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'questions-content',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const questions = await collectQuestions()
      return `export default ${JSON.stringify(questions)}`
    },
  }
}

export default defineConfig({
  plugins: [react(), wikiContentPlugin(), resourceTimelinePlugin(), questionsContentPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Unit tests (vitest) live alongside the modules they cover under src/. Scope
  // collection to src/ so the Playwright E2E specs in e2e/*.spec.ts — which
  // import @playwright/test and only run under `playwright test` — aren't swept
  // up by vitest's default **/*.spec.ts glob.
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
