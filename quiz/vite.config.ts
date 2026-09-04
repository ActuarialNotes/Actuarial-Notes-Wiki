/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { PDFJS_ASSET_DIRS } from './src/lib/pdfjsAssets'
import path from 'path'
import { readdir, readFile } from 'fs/promises'
import fm from 'front-matter'
import { KEYSTONE_EXAMS } from './src/data/keystoneConcepts'
import { buildResourceExamMap, examsForResource } from './src/lib/resourceExams'
import { examDisplayName, examIdFromFile } from './src/lib/wikiRoutes'

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
  exams?: string[]
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
  const examPages: { name: string; markdown: string }[] = []
  const rootEntries = await readdir(REPO_ROOT).catch(() => [] as string[])
  for (const name of rootEntries) {
    if (!name.endsWith('.md') || !/^Exam\b/i.test(name)) continue
    const text = await readFile(path.join(REPO_ROOT, name), 'utf-8').catch(() => null)
    if (text == null) continue
    files[name] = text
    const bare = name.replace(/\.md$/i, '')
    index.push({ category: 'exam', name: bare, path: name })
    examPages.push({ name: bare, markdown: text })
  }

  // Which exams each resource is a syllabus reading for — inverted from the
  // exam pages' Source Material callouts, since the resource pages themselves
  // don't name an exam.
  const examMap = buildResourceExamMap(examPages)

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
    const bare = name.replace(/\.md$/i, '')
    const exams = examsForResource(examMap, bare)
    index.push({
      category: 'document',
      name: bare,
      path: `Resources/Books/${name}`,
      exams: exams.length > 0 ? exams : undefined,
      author: (attrs['Authors'] || attrs['Author']) ? String(attrs['Authors'] || attrs['Author']) : undefined,
      year: Number.isFinite(yearNum) ? yearNum : undefined,
      title: attrs['Title'] ? String(attrs['Title']) : undefined,
      edition: attrs['Edition'] ? String(attrs['Edition']) : undefined,
      publisher: attrs['Publisher'] ? String(attrs['Publisher']) : undefined,
      coverImage: extractCoverImageUrl(text),
    })
  }

  // Guides/<exam page>/<tip>.md — the exam-page orientation tips. Their
  // markdown rides along in `files` so the concept viewer opens one without a
  // network fetch, but they stay out of `index`: a tip is read from its exam's
  // card, not found by searching the wiki for a concept. The list of them is
  // its own module (`virtual:exam-guides`, below).
  const guideExams = await readdir(path.join(REPO_ROOT, 'Guides')).catch(() => [] as string[])
  for (const examDir of guideExams) {
    const dir = path.join(REPO_ROOT, 'Guides', examDir)
    for (const name of await readdir(dir).catch(() => [] as string[])) {
      if (!name.endsWith('.md')) continue
      const text = await readFile(path.join(dir, name), 'utf-8').catch(() => null)
      if (text != null) files[`Guides/${examDir}/${name}`] = text
    }
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

// Flashcard-collect comprehension checks: one markdown file per concept under
// comprehension-checks/<exam-id>/<Concept Name>.md, parsed at runtime by
// lib/comprehensionCheckParser.ts. Structured just like the question bank above.
async function collectComprehensionChecks(): Promise<string[]> {
  const rawFiles: string[] = []
  const root = path.join(REPO_ROOT, 'comprehension-checks')
  const examDirs = await readdir(root).catch(() => [] as string[])
  for (const examDir of examDirs) {
    const examPath = path.join(root, examDir)
    const files = await readdir(examPath).catch(() => [] as string[])
    for (const name of files) {
      if (!name.endsWith('.md')) continue
      const text = await readFile(path.join(examPath, name), 'utf-8').catch(() => null)
      if (text != null) rawFiles.push(text)
    }
  }
  return rawFiles
}

function comprehensionChecksPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:comprehension-checks'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'comprehension-checks',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const checks = await collectComprehensionChecks()
      return `export default ${JSON.stringify(checks)}`
    },
  }
}

// ── Exam guides ──────────────────────────────────────────────────────────────
// The tip pages behind an exam page's "How to Study" card: one markdown file
// per tip under Guides/<exam page>/<tip>.md, ordered by each page's `order:`
// frontmatter. Only the list is collected here — the markdown itself is already
// in the wiki bundle above, since the concept viewer reads a tip exactly like
// any other wiki page. Mirrors `ExamGuideFile` in src/lib/examGuides.ts, which
// can't be imported here (it resolves `@/…`, which tsconfig.node.json doesn't).
interface ExamGuideFileEntry {
  examId: string
  examPage: string
  examLabel: string
  title: string
  path: string
  order: number | null
}

async function collectExamGuides(): Promise<ExamGuideFileEntry[]> {
  const root = path.join(REPO_ROOT, 'Guides')
  const entries: ExamGuideFileEntry[] = []
  for (const examDir of await readdir(root).catch(() => [] as string[])) {
    const dir = path.join(root, examDir)
    for (const name of (await readdir(dir).catch(() => [] as string[])).sort()) {
      if (!name.endsWith('.md')) continue
      const text = await readFile(path.join(dir, name), 'utf-8').catch(() => null)
      if (text == null) continue
      const attrs = (fm<Record<string, unknown>>(text).attributes ?? {}) as Record<string, unknown>
      const order = Number(attrs['order'])
      entries.push({
        examId: examIdFromFile(examDir),
        examPage: `${examDir}.md`,
        examLabel: examDisplayName(examDir),
        title: name.replace(/\.md$/i, ''),
        path: `Guides/${examDir}/${name}`,
        order: Number.isFinite(order) ? order : null,
      })
    }
  }
  return entries
}

function examGuidesPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:exam-guides'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'exam-guides',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const guides = await collectExamGuides()
      return `export default ${JSON.stringify(guides)}`
    },
  }
}

// Keystone link map: for every keystone concept page, the other concept pages it
// links to directly. This is what the `strong_key` study plan orders by — a
// keystone, then the concepts its own page leans on (see lib/studyPlanOrder.ts).
//
// Only keystone pages are collected. The whole concept graph would be ~45 kB of
// JSON in the main chunk to answer a question the plan only ever asks about the
// ~15 concepts per exam in the catalogue.
async function collectKeystoneLinks(): Promise<Record<string, string[]>> {
  const dir = path.join(REPO_ROOT, 'Concepts')
  const entries = await readdir(dir).catch(() => [] as string[])
  // Every real concept page, keyed lowercase — a link only counts when it lands
  // on one of these (so figure embeds, resources and exam pages drop out).
  const pages = new Map<string, string>()
  for (const name of entries) {
    if (name.endsWith('.md')) pages.set(name.slice(0, -3).toLowerCase(), name.slice(0, -3))
  }

  const links: Record<string, string[]> = {}
  for (const exam of KEYSTONE_EXAMS) {
    for (const { name } of exam.concepts) {
      const page = pages.get(name.toLowerCase())
      if (!page) continue  // keystone.test.ts pins this, but never emit a dead key
      const text = await readFile(path.join(dir, `${page}.md`), 'utf-8').catch(() => null)
      if (text == null) continue
      const out: string[] = []
      const seen = new Set<string>([page.toLowerCase()])  // never link a page to itself
      for (const match of text.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
        const target = match[1].trim().split('/').pop()?.replace(/\.md$/i, '').trim() ?? ''
        const key = target.toLowerCase()
        if (!key || seen.has(key)) continue
        const linked = pages.get(key)
        if (!linked) continue
        seen.add(key)
        out.push(linked)
      }
      links[page] = out
    }
  }
  return links
}

function keystoneLinksPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:keystone-links'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'keystone-links',
    resolveId: (id) => id === VIRTUAL_ID ? RESOLVED_ID : undefined,
    load: async (id) => {
      if (id !== RESOLVED_ID) return
      const links = await collectKeystoneLinks()
      return `export default ${JSON.stringify(links)}`
    },
  }
}

/**
 * Serves the asset directories pdf.js loads at runtime, from `/pdf-<dir>/`.
 *
 * The exam-PDF viewer draws pages itself (see `lib/pdfjsSetup.ts`), and pdf.js
 * keeps a surprising amount of itself outside its bundle, fetched on demand
 * from URLs the caller has to supply. Miss one and the failure is silent: the
 * part of the page that needed it simply isn't drawn, with a `warn()` in the
 * console and no error anywhere the reader can see.
 *
 *   standard_fonts  A PDF that names Helvetica/Times/Courier without embedding
 *                   it — routine for anything produced from Word — renders
 *                   blank text without these font programs.
 *   wasm            The image codecs. **CCITT fax and JBIG2 live here**, which
 *                   is to say every bitonal scan: the examining bodies' older
 *                   papers are photocopies, and their ink is a CCITT image.
 *                   JPEG 2000 (openjpeg) and colour management (qcms) too.
 *                   Without it `JBig2CCITTFaxImage.decode` throws "failed to
 *                   initialize", the image object resolves to null, and the
 *                   scan is never painted — a ghost page carrying only
 *                   whatever else the page happened to draw.
 *   cmaps           Character maps for CID-keyed fonts that name a predefined
 *                   encoding rather than embedding one.
 *   iccs           The fallback ICC profile.
 *
 * They ship inside pdfjs-dist rather than in `public/`, so they're copied into
 * the build here and read straight from node_modules in dev. Nothing is
 * fetched until a document actually needs it, so none of this is weight on a
 * reader who never opens a paper.
 */
function pdfjsAssetsPlugin(): Plugin {
  // Directory in pdfjs-dist → the path it is served from. `lib/pdfjsAssets.ts`
  // is the shared list; `lib/pdfjsSetup.ts` builds the matching URLs from it.
  const DIRS: Record<string, string> = PDFJS_ASSET_DIRS
  const CONTENT_TYPES: Record<string, string> = {
    '.wasm': 'application/wasm',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.bcmap': 'application/octet-stream',
    '.icc': 'application/vnd.iccprofile',
    '.pfb': 'application/x-font-type1',
    '.ttf': 'font/ttf',
  }
  const dirFor = (name: string) => path.resolve(__dirname, 'node_modules/pdfjs-dist', name)
  // Flat directories of ordinary filenames — anything else isn't ours to serve.
  const safeName = (name: string) => /^[\w.-]+$/.test(name) && name !== '..'

  return {
    name: 'pdfjs-assets',
    configureServer(server) {
      for (const [dir, prefix] of Object.entries(DIRS)) {
        server.middlewares.use(`/${prefix}/`, async (req, res, next) => {
          const name = decodeURIComponent((req.url ?? '').replace(/^\/+/, '').split('?')[0])
          if (!safeName(name)) return next()
          try {
            const body = await readFile(path.join(dirFor(dir), name))
            res.setHeader('Content-Type', CONTENT_TYPES[path.extname(name).toLowerCase()] ?? 'font/otf')
            res.end(body)
          } catch {
            next()
          }
        })
      }
    },
    async generateBundle() {
      for (const [dir, prefix] of Object.entries(DIRS)) {
        for (const name of await readdir(dirFor(dir))) {
          if (!safeName(name)) continue
          this.emitFile({
            type: 'asset',
            fileName: `${prefix}/${name}`,
            source: await readFile(path.join(dirFor(dir), name)),
          })
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), wikiContentPlugin(), resourceTimelinePlugin(), questionsContentPlugin(), comprehensionChecksPlugin(), examGuidesPlugin(), keystoneLinksPlugin(), pdfjsAssetsPlugin()],
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
