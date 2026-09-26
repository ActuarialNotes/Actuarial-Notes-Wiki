// The vault as a knowledge base an AI assistant can read — the "facts" half of
// the Claude / ChatGPT connector (see docs/ai-connector.md).
//
// Built once, at bundle time: `vite.config.ts` (knowledgeBasePlugin) reads the
// vault, hands the raw files to `buildKnowledgeBase`, and emits the result as a
// static asset (`/ai/knowledge-base.json`). The MCP endpoint (`quiz/api/mcp.js`)
// loads that asset from its own deployment and serves tools over it, so what an
// assistant reads is always exactly what the deployed app renders.
//
// The rules this module keeps:
//
//  - **The app's parsers, not a second reading of the vault.** Questions go
//    through `parseQuestion`, exam objectives through `parseExamSyllabus`, source
//    readings through `extractSourceMaterial`, fact-check verdicts through
//    `factCheckBadge` — so a question the app drops, or a page the app badges
//    "Known issue", says the same thing to an assistant.
//  - **A critically flagged question reaches nobody.** `filterQuestions` keeps a
//    question with an open critical finding out of every quiz, by any route;
//    here it is left out of the export altogether and listed as withheld.
//  - **Nothing is invented.** Every field is read off the vault. An exam page
//    with no weights has objectives with no weights; a question with no sitting
//    names none.
//
// Imports are relative, not `@/`-aliased: the vite config pulls this module
// into its own Node graph, which doesn't resolve the alias.

import fm from 'front-matter'
import { parseQuestion, type AnswerOption, type Difficulty, type QuestionType } from './parser'
import { parseExamMetadata, parseExamSyllabus } from './wikiParser'
import { extractSourceMaterial } from './sourceMaterial'
import {
  factCheckBadge,
  hasCriticalFinding,
  summarizeSource,
  verificationFromAttributes,
  type Verification,
  type VerificationStatus,
} from './verification'
import { examDisplayName, wikiRoute } from './wikiRoutes'

/** Bumped whenever the shape below changes; the connector refuses a version it doesn't know. */
export const KNOWLEDGE_BASE_VERSION = 1

/** Where the build emits the export, relative to the site root. */
export const KNOWLEDGE_BASE_ASSET = 'ai/knowledge-base.json'

// ── Inputs ───────────────────────────────────────────────────────────────────

/** One row of `scripts/exam_catalog.json` — the pinned list of exam pages. */
export interface ExamCatalogRow {
  page: string
  exam_id: string
  wiki_id: string
  progress_key: string
  body: string
  bank: string | null
  status: string
}

export interface KeystoneSource {
  id: string
  concepts: { name: string; why: string }[]
}

export interface KnowledgeBaseSources {
  /**
   * Repo-relative path → markdown for every page: the root `Exam *.md` pages,
   * `Concepts/`, `Resources/**` and `Guides/**`.
   */
  pages: Record<string, string>
  /** Repo-relative path (`questions/<bank>/<file>.md`) → markdown. */
  questions: Record<string, string>
  catalog: ExamCatalogRow[]
  /** `scripts/concept_aliases.json` → `aliases`: normalised variant → concept page. */
  aliases: Record<string, string>
  keystones: KeystoneSource[]
  site: {
    /** Public origin of the app, e.g. `https://quiz.actuarialnotes.com`. */
    url: string
    /** `owner/name` of the vault's GitHub repository. */
    repo: string
    branch: string
    commit?: string | null
    builtAt: string
  }
}

// ── Output ───────────────────────────────────────────────────────────────────

export interface KbFactCheck {
  status: VerificationStatus
  /** The verdict the in-app Fact Check badge shows, e.g. "Not fact checked". */
  label: string
  detail: string
  /** ISO date of the last check, or null. */
  checked: string | null
  sources: { label: string; url: string | null; locator: string | null }[]
  openFindings: number
  openCritical: number
}

export type KbDocKind = 'exam' | 'concept' | 'resource' | 'guide'

export interface KbDoc {
  /** Stable id: `concept/Bayes Theorem`, `exam/P`, `resource/…`, `guide/…`. */
  id: string
  kind: KbDocKind
  title: string
  /** Repo-relative path of the source file. */
  path: string
  /** Where a person reads it: the app's page when it has one, else GitHub. */
  url: string
  /** The page body as plain markdown — frontmatter, HTML and Obsidian syntax removed. */
  text: string
  /** The first paragraph, flattened, for search results. */
  summary: string
  /** Titles of the vault pages this one links to, in order of first mention. */
  links: string[]
  /** Exam keys the page belongs to (a syllabus concept, a syllabus reading, an exam's guide). */
  exams: string[]
  /** Other names the page is known by. */
  aliases: string[]
  /** Front-matter metadata worth showing (author, year, jurisdiction, source links…). */
  meta: Record<string, string | number | boolean | string[]>
  factCheck: KbFactCheck
}

export interface KbObjective {
  title: string
  /** The share of the exam, as the page writes it (`23–30%`), or null. */
  weight: string | null
  /** Concept names in the order the syllabus introduces them. */
  concepts: string[]
}

export interface KbReading {
  title: string
  /** The chapters or sections assigned, as the page writes them. */
  detail: string | null
  /** The reading's own resource page, when the vault has one. */
  docId: string | null
}

export type KbExamStatus = 'ready' | 'beta' | 'development'

export interface KbExam {
  /** The short key an assistant passes around: `P`, `FM`, `MAS-I`, `5`, `6C`… */
  key: string
  /** The exam page's own id (`P-1`, `FM-2`, `5`). */
  examId: string
  name: string
  body: string
  subject: string
  status: KbExamStatus
  docId: string
  url: string
  summary: string
  objectives: KbObjective[]
  readings: KbReading[]
  keystones: { name: string; why: string }[]
  guides: { id: string; title: string }[]
  /** `questions/<bank>/`, or null for an exam with no question bank yet. */
  bank: string | null
  /** Questions a practice set may draw (withheld and off-syllabus ones excluded). */
  questionCount: number
}

export interface KbQuestionPart {
  label: string
  points: number
  stem: string
  type: 'multiple-choice' | 'free-entry'
  options: AnswerOption[]
  /** '' for an essay part, which has a model answer but no key. */
  answer: string
  explanation: string
  examinerReport: string | null
}

export interface KbQuestion {
  id: string
  /** Exam key of the bank the question sits in. */
  exam: string
  bank: string
  path: string
  /** Opens the question in the app. */
  url: string
  topic: string
  objective: string
  difficulty: Difficulty
  type: QuestionType
  points: number
  /** Concept page names the question is tagged with. */
  concepts: string[]
  /** `Fall 2013`, `2019`, or null when the question names no sitting. */
  sitting: string | null
  originallyExam: string | null
  offSyllabus: boolean
  stem: string
  options: AnswerOption[]
  answer: string
  explanation: string
  examinerReport: string | null
  parts: KbQuestionPart[] | null
  factCheck: KbFactCheck
}

export interface KnowledgeBase {
  version: typeof KNOWLEDGE_BASE_VERSION
  builtAt: string
  commit: string | null
  site: string
  repo: string
  branch: string
  counts: { exams: number; concepts: number; resources: number; guides: number; questions: number; withheld: number }
  exams: KbExam[]
  docs: KbDoc[]
  questions: KbQuestion[]
  /** Questions kept out of the export, and why. */
  withheld: { id: string; exam: string; reason: string }[]
  /** Normalised variant (see {@link normalizeTerm}) → concept page name. */
  aliases: Record<string, string>
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * The key a name is looked up by: lower-case, accents folded (`Bühlmann` →
 * `buhlmann`), apostrophes dropped, hyphens and underscores as spaces. Mirrors
 * `normalize_term` in scripts/vault_links.py, which is how the curated
 * `concept_aliases.json` keys are written — plus the accent fold, since a
 * reader types "Buhlmann". `quiz/api/_mcp/knowledgeBase.js` normalises the
 * same way at run time.
 */
export function normalizeTerm(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** `P-1` → `P`, `FM-2` → `FM`; every other exam id is already its key. */
export function examKeyFromExamId(examId: string): string {
  return /^[A-Z]+-\d+$/.test(examId) ? examId.replace(/-\d+$/, '') : examId
}

/**
 * Parentheses percent-encoded as well. `encodeURIComponent` leaves them alone,
 * and the vault's file names are full of them (`Basic Ratemaking (Werner -
 * 2016)`) — a bare `)` ends a markdown link's URL early, in this module's own
 * figure links and in every citation an assistant writes.
 */
function encodeParens(url: string): string {
  return url.replace(/\(/g, '%28').replace(/\)/g, '%29')
}

function encodedPath(path: string): string {
  return encodeParens(path.split('/').map(encodeURIComponent).join('/'))
}

function githubBlobUrl(repo: string, branch: string, path: string): string {
  return `https://github.com/${repo}/blob/${branch}/${encodedPath(path)}`
}

function githubRawUrl(repo: string, branch: string, path: string): string {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${encodedPath(path)}`
}

/** The app's own page for a vault entry, safe to drop into a markdown link. */
function appUrl(site: string, ref: Parameters<typeof wikiRoute>[0]): string {
  return `${site}${encodeParens(wikiRoute(ref))}`
}

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

/** A wiki-link target's page name: the last path segment, without `.md`. */
function linkTitle(target: string): string {
  const clean = target.trim().replace(/\\$/, '')
  return (clean.includes('/') ? clean.split('/').pop()! : clean).replace(/\.md$/i, '').trim()
}

/** An Obsidian comment, `%%…%%` — invisible in the vault, so invisible here. */
const COMMENT_RE = /%%[\s\S]*?%%/g
/** `[[a\|b]]` — the pipe escaped because the link sits in a table. */
const ESCAPED_PIPE_LINK_RE = /\[\[([^\]]*?)\\\|([^\]]*?)\]\]/g
const EMBED_RE = /!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g
const LINK_RE = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g
const CALLOUT_RE = /^((?:>[ \t]*)+)\[!(\w+)\][+-]?[ \t]*(.*)$/

function calloutHeading(type: string, rawTitle: string): string {
  const tag = /\{([^}]*)\}\s*$/.exec(rawTitle)
  const title = (tag ? rawTitle.slice(0, tag.index) : rawTitle).trim()
  const tagText = tag?.[1].trim() ?? ''
  const kind = type.toLowerCase()
  const typeLabel = kind.charAt(0).toUpperCase() + kind.slice(1)
  if (tagText && /%/.test(tagText)) return `**${title || typeLabel} (${tagText})**`
  if (tagText) return title ? `**${tagText}: ${title}**` : `**${tagText}**`
  if (kind === 'question') return title ? `**Q: ${title}**` : '**Question**'
  return `**${title || typeLabel}**`
}

/**
 * Obsidian markdown → markdown any reader understands. Links become their
 * display text (the page list travels separately in `links`), embedded figures
 * become a link to the image, callout headers become bold lines, and the
 * frontmatter, HTML chrome and `%%comments%%` go. LaTeX is left alone: models
 * read it natively, and every formula stays exactly as authored.
 */
export function cleanVaultMarkdown(markdown: string, repo: string, branch: string): string {
  const body = markdown.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, '')
  const text = body
    .replace(/\r\n/g, '\n')
    .replace(COMMENT_RE, '')
    .replace(/<div\b[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<\/?(?:div|span|br)\b[^>]*>/gi, '')
    .replace(ESCAPED_PIPE_LINK_RE, '[[$1|$2]]')
    .replace(EMBED_RE, (_all, target: string) => {
      const path = target.trim()
      const name = linkTitle(path)
      if (!IMAGE_EXT_RE.test(path)) return `(see “${name}”)`
      const resolved = path.includes('/') ? path : `Media/Attachments/${path}`
      const label = name.replace(IMAGE_EXT_RE, '').replace(/[_]+/g, ' ')
      return `[Figure: ${label}](${githubRawUrl(repo, branch, resolved)})`
    })
    .replace(LINK_RE, (_all, target: string, display?: string) => (display?.trim() || linkTitle(target)))
    .split('\n')
    .map(line => {
      const m = CALLOUT_RE.exec(line)
      return m ? `${m[1].replace(/[ \t]+$/, '')} ${calloutHeading(m[2], m[3])}` : line.replace(/[ \t]+$/, '')
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
  return text.trim()
}

/** Titles of the pages a markdown file links to, in order, without embeds. */
export function extractLinkTitles(markdown: string): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  const text = markdown.replace(COMMENT_RE, '').replace(ESCAPED_PIPE_LINK_RE, '[[$1|$2]]')
  for (const m of text.matchAll(/(?<!!)\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
    const title = linkTitle(m[1])
    const key = title.toLowerCase()
    if (!title || seen.has(key)) continue
    seen.add(key)
    out.push(title)
  }
  return out
}

/** The first paragraph of cleaned markdown, flattened to one line of prose. */
export function summarize(text: string, max = 300): string {
  for (const block of text.split(/\n\s*\n/)) {
    // A heading is a title, not prose — but it often shares a block with the
    // paragraph under it (`# Exam P-1` directly above the exam's description).
    const para = block.split('\n').filter(l => !/^#{1,6}\s/.test(l.trim())).join('\n').trim()
    if (!para || /^\[Figure:[^\]]*\]\([^)]*\)$/.test(para)) continue
    const flat = para
      .split('\n')
      .map(l => l.replace(/^(?:>\s*)+/, '').replace(/^\s*(?:[-*+]|\d+\.)\s+/, '').trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*|__|`/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!flat) continue
    if (flat.length <= max) return flat
    const cut = flat.slice(0, max - 1)
    const space = cut.lastIndexOf(' ')
    return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`
  }
  return ''
}

function factCheckOf(v: Verification | null): KbFactCheck {
  const badge = factCheckBadge(v)
  return {
    status: v?.status ?? 'unverified',
    label: badge.label,
    detail: badge.detail,
    checked: v?.lastChecked ?? null,
    sources: (v?.sources ?? []).map(summarizeSource),
    openFindings: v?.openFindings ?? 0,
    openCritical: v?.openCritical ?? 0,
  }
}

function attributesOf(markdown: string): Record<string, unknown> {
  try {
    return (fm<Record<string, unknown>>(markdown).attributes ?? {}) as Record<string, unknown>
  } catch {
    return {}
  }
}

/** Front matter → the metadata worth handing an assistant (the verification block has its own field). */
function metaOf(attrs: Record<string, unknown>): Record<string, string | number | boolean | string[]> {
  const meta: Record<string, string | number | boolean | string[]> = {}
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'verification' || value == null) continue
    if (value instanceof Date) {
      if (!isNaN(value.getTime())) meta[key] = value.toISOString().slice(0, 10)
    } else if (Array.isArray(value)) {
      const items = value.filter(v => v != null && typeof v !== 'object').map(String)
      if (items.length) meta[key] = items
    } else if (typeof value === 'string') {
      // "[casact.org](https://…)" — keep the URL, which is the part a reader follows.
      const trimmed = value.trim()
      const link = /^\[[^\]]*\]\((https?:[^)\s]+)\)$/.exec(trimmed)
      if (trimmed) meta[key] = link ? link[1] : trimmed
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      meta[key] = value
    }
  }
  return meta
}

const RESOURCE_CATEGORY: Record<string, string> = {
  books: 'book',
  regulation: 'regulation',
  events: 'event',
  benchmarks: 'benchmark',
  data: 'data',
}

/** `Concepts/Conditional+Probability` → `Conditional Probability`. */
function conceptFromWikiLink(link: string): string {
  const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
  let last = clean.split('/').filter(Boolean).pop() ?? ''
  try {
    last = decodeURIComponent(last)
  } catch { /* already plain */ }
  return last.trim()
}

// ── Reading the vault ────────────────────────────────────────────────────────

/**
 * The two filesystem calls the collector needs, passed in so this module stays
 * free of Node imports (it is type-checked with the app). Paths are
 * repo-relative; `''` is the vault root.
 */
export interface VaultReader {
  /** Entries of a directory, or [] when it doesn't exist. */
  list(dir: string): Promise<{ name: string; isDirectory: boolean }[]>
  /** A file's text, or null when it can't be read. */
  read(path: string): Promise<string | null>
}

async function markdownUnder(vault: VaultReader, dir: string, into: Record<string, string>, depth: number): Promise<void> {
  for (const entry of await vault.list(dir)) {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory) {
      if (depth > 0 && !entry.name.startsWith('.')) await markdownUnder(vault, path, into, depth - 1)
      continue
    }
    if (!entry.name.endsWith('.md')) continue
    const text = await vault.read(path)
    if (text != null) into[path] = text
  }
}

async function readJson<T>(vault: VaultReader, path: string, fallback: T): Promise<T> {
  const text = await vault.read(path)
  if (text == null) return fallback
  try {
    return JSON.parse(text) as T
  } catch {
    return fallback
  }
}

/**
 * Everything the knowledge base is built from. This is the one list of which
 * vault directories an assistant can read — the root exam pages, `Concepts/`,
 * all of `Resources/`, `Guides/` and the question bank — so add a new content
 * directory here as well as to the app's own collectors in vite.config.ts.
 */
export async function readKnowledgeBaseSources(
  vault: VaultReader,
): Promise<Pick<KnowledgeBaseSources, 'pages' | 'questions' | 'catalog' | 'aliases'>> {
  const pages: Record<string, string> = {}
  for (const entry of await vault.list('')) {
    if (entry.isDirectory || !/^Exam\b.*\.md$/i.test(entry.name)) continue
    const text = await vault.read(entry.name)
    if (text != null) pages[entry.name] = text
  }
  await markdownUnder(vault, 'Concepts', pages, 0)
  await markdownUnder(vault, 'Resources', pages, 3)
  await markdownUnder(vault, 'Guides', pages, 1)

  const questions: Record<string, string> = {}
  for (const bank of await vault.list('questions')) {
    if (bank.isDirectory) await markdownUnder(vault, `questions/${bank.name}`, questions, 0)
  }

  const catalog = await readJson<{ exams?: ExamCatalogRow[] }>(vault, 'scripts/exam_catalog.json', {})
  const aliases = await readJson<{ aliases?: Record<string, string> }>(vault, 'scripts/concept_aliases.json', {})
  return { pages, questions, catalog: catalog.exams ?? [], aliases: aliases.aliases ?? {} }
}

// ── Builder ──────────────────────────────────────────────────────────────────

export function buildKnowledgeBase(sources: KnowledgeBaseSources): KnowledgeBase {
  const { repo, branch } = sources.site
  const site = sources.site.url.replace(/\/+$/, '')
  const docs: KbDoc[] = []
  const usedIds = new Set<string>()
  const uniqueId = (preferred: string, fallback: string) => {
    const id = usedIds.has(preferred) ? fallback : preferred
    usedIds.add(id)
    return id
  }
  const paths = Object.keys(sources.pages).sort()

  // Exams first: the objectives say which exams every concept and reading
  // belongs to, and the readings which exams a resource is on.
  const exams: KbExam[] = []
  const conceptExams = new Map<string, Set<string>>()
  const readingExams = new Map<string, Set<string>>()
  const note = (map: Map<string, Set<string>>, name: string, exam: string) => {
    const key = name.toLowerCase()
    if (!map.has(key)) map.set(key, new Set())
    map.get(key)!.add(exam)
  }

  const catalogByPage = new Map(sources.catalog.map(row => [row.page, row]))
  for (const row of sources.catalog) {
    const markdown = sources.pages[row.page]
    if (markdown == null) continue
    const bare = row.page.replace(/\.md$/i, '')
    const key = examKeyFromExamId(row.exam_id)
    const meta = parseExamMetadata(markdown)
    const syllabus = parseExamSyllabus(markdown, row.exam_id, examDisplayName(bare), meta?.examTopic ?? '', bare)
    const objectives: KbObjective[] = syllabus.topics.map(topic => ({
      title: topic.name,
      weight: topic.weight ?? null,
      concepts: topic.concepts.map(c => c.name),
    }))
    for (const objective of objectives) for (const c of objective.concepts) note(conceptExams, c, key)
    const readings = extractSourceMaterial(markdown).entries.map(entry => {
      note(readingExams, entry.name, key)
      return { title: entry.name, detail: entry.detail ?? null, docId: null as string | null }
    })
    const text = cleanVaultMarkdown(markdown, repo, branch)
    const docId = uniqueId(`exam/${key}`, `exam/${row.exam_id}`)
    exams.push({
      key,
      examId: row.exam_id,
      name: examDisplayName(bare),
      body: row.body,
      subject: meta?.examTopic ?? '',
      status: (['ready', 'beta', 'development'].includes(row.status) ? row.status : 'beta') as KbExamStatus,
      docId,
      url: appUrl(site, { kind: 'exam', name: bare }),
      summary: summarize(text),
      objectives,
      readings,
      keystones: sources.keystones.find(k => k.id === key)?.concepts.map(c => ({ name: c.name, why: c.why })) ?? [],
      guides: [],
      bank: row.bank,
      questionCount: 0,
    })
    docs.push({
      id: docId,
      kind: 'exam',
      title: `${examDisplayName(bare)} — ${meta?.examTopic ?? bare}`,
      path: row.page,
      url: appUrl(site, { kind: 'exam', name: bare }),
      text,
      summary: summarize(text),
      links: extractLinkTitles(markdown),
      exams: [key],
      aliases: [bare, examDisplayName(bare), `Exam ${key}`, meta?.examTopic ?? ''].filter(Boolean),
      meta: { body: row.body, status: row.status },
      factCheck: factCheckOf(verificationFromAttributes(attributesOf(markdown))),
    })
  }
  const examForGuideFolder = (folder: string) => {
    const row = catalogByPage.get(`${folder}.md`)
    return row ? examKeyFromExamId(row.exam_id) : null
  }
  const guidesByExam = new Map<string, { id: string; title: string; order: number }[]>()

  for (const path of paths) {
    const markdown = sources.pages[path]
    const lower = path.toLowerCase()
    const file = path.split('/').pop()!.replace(/\.md$/i, '')
    const attrs = attributesOf(markdown)
    const text = cleanVaultMarkdown(markdown, repo, branch)
    const base = {
      path,
      text,
      summary: summarize(text),
      links: extractLinkTitles(markdown).filter(t => t.toLowerCase() !== file.toLowerCase()),
      factCheck: factCheckOf(verificationFromAttributes(attrs)),
    }
    const frontAliases = Array.isArray(attrs.aliases) ? attrs.aliases.map(String).filter(Boolean) : []

    if (lower.startsWith('concepts/') && path.split('/').length === 2) {
      docs.push({
        ...base,
        id: uniqueId(`concept/${file}`, `concept/${path}`),
        kind: 'concept',
        title: file,
        url: appUrl(site, { kind: 'concept', name: file }),
        exams: [...(conceptExams.get(file.toLowerCase()) ?? [])],
        aliases: frontAliases,
        meta: {},
      })
    } else if (lower.startsWith('resources/')) {
      const folder = path.split('/')[1]?.toLowerCase() ?? ''
      const declared = String(attrs.type ?? '').toLowerCase()
      const category = declared === 'event' || declared === 'regulation' ? declared : (RESOURCE_CATEGORY[folder] ?? 'resource')
      const isBook = folder === 'books' && path.split('/').length === 3
      docs.push({
        ...base,
        id: uniqueId(`resource/${file}`, `resource/${path.replace(/\.md$/i, '')}`),
        kind: 'resource',
        title: file,
        url: isBook ? appUrl(site, { kind: 'resource', name: file }) : githubBlobUrl(repo, branch, path),
        exams: [...(readingExams.get(file.toLowerCase()) ?? [])],
        aliases: [...new Set([
          ...frontAliases,
          ...[attrs.title, attrs.Title].filter((t): t is string => typeof t === 'string' && t.trim() !== '' && t !== file),
        ])],
        meta: { category, ...metaOf(attrs) },
      })
    } else if (lower.startsWith('guides/')) {
      const segments = path.split('/')
      const folder = segments.length === 3 ? segments[1] : null
      const examKey = folder ? examForGuideFolder(folder) : null
      const id = uniqueId(folder ? `guide/${folder}/${file}` : `guide/${file}`, `guide/${path}`)
      docs.push({
        ...base,
        id,
        kind: 'guide',
        title: folder ? `${examDisplayName(folder)}: ${file}` : file,
        url: githubBlobUrl(repo, branch, path),
        exams: examKey ? [examKey] : [],
        aliases: [],
        meta: metaOf(attrs),
      })
      if (examKey) {
        // A present, numeric `order:` only — `Number(undefined)` is NaN and
        // `Number(null)` is 0, and neither is an authored position.
        const order = typeof attrs.order === 'number' ? attrs.order : Number(attrs.order ?? NaN)
        if (!guidesByExam.has(examKey)) guidesByExam.set(examKey, [])
        guidesByExam.get(examKey)!.push({ id, title: file, order: Number.isFinite(order) ? order : Infinity })
      }
    }
  }

  for (const exam of exams) {
    // The authored reading order; a tip with no `order:` goes last (lib/examGuides.ts).
    exam.guides = (guidesByExam.get(exam.key) ?? [])
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
      .map(({ id, title }) => ({ id, title }))
  }

  const docByTitle = new Map<string, KbDoc>()
  for (const doc of docs) if (doc.kind === 'resource' && !docByTitle.has(doc.title.toLowerCase())) docByTitle.set(doc.title.toLowerCase(), doc)
  for (const exam of exams) {
    for (const reading of exam.readings) reading.docId = docByTitle.get(reading.title.toLowerCase())?.id ?? null
  }

  // Questions, through the app's own parser.
  const questions: KbQuestion[] = []
  const withheld: KnowledgeBase['withheld'] = []
  const seenQuestions = new Set<string>()
  const examByBank = new Map(exams.filter(e => e.bank).map(e => [e.bank!, e]))
  for (const path of Object.keys(sources.questions).sort()) {
    const q = parseQuestion(sources.questions[path])
    if (!q || seenQuestions.has(q.id)) continue
    seenQuestions.add(q.id)
    const bank = path.split('/')[1] ?? ''
    const examKey = examByBank.get(bank)?.key ?? bank.replace(/^exam-/, '').toUpperCase()
    if (hasCriticalFinding(q.verification)) {
      withheld.push({ id: q.id, exam: examKey, reason: 'An unresolved critical fact-check finding.' })
      continue
    }
    questions.push({
      id: q.id,
      exam: examKey,
      bank,
      path,
      url: `${site}/quiz?ids=${encodeURIComponent(q.id)}`,
      topic: q.topic,
      objective: q.learning_objective,
      difficulty: q.difficulty,
      type: q.type,
      points: q.points,
      concepts: [...new Set(q.wiki_link.map(conceptFromWikiLink).filter(Boolean))],
      sitting: q.year ? (q.session ? `${q.session} ${q.year}` : String(q.year)) : null,
      originallyExam: q.originally_exam ?? null,
      offSyllabus: q.off_syllabus === true,
      stem: q.stem,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      examinerReport: q.examiner_report ?? null,
      parts: q.parts?.map(p => ({
        label: p.label,
        points: p.points,
        stem: p.stem,
        type: p.type,
        options: p.options,
        answer: p.answer,
        explanation: p.explanation,
        examinerReport: p.examiner_report ?? null,
      })) ?? null,
      factCheck: factCheckOf(q.verification ?? null),
    })
  }
  for (const exam of exams) {
    exam.questionCount = questions.filter(q => q.exam === exam.key && !q.offSyllabus).length
  }

  // Aliases: the curated table first, then the vault's own link text —
  // `[[Independent Events|Independence]]` says "Independence" means that page.
  // A display text that points at two different pages says nothing, and a
  // variant never shadows a real page title.
  const conceptTitles = new Map(docs.filter(d => d.kind === 'concept').map(d => [normalizeTerm(d.title), d.title]))
  const aliases: Record<string, string> = {}
  for (const [variant, page] of Object.entries(sources.aliases)) {
    const target = conceptTitles.get(normalizeTerm(page))
    const key = normalizeTerm(variant)
    if (target && key && !conceptTitles.has(key)) aliases[key] = target
  }
  const fromLinks = new Map<string, Set<string>>()
  const allMarkdown = [...Object.values(sources.pages)]
  for (const markdown of allMarkdown) {
    for (const m of markdown.replace(ESCAPED_PIPE_LINK_RE, '[[$1|$2]]').matchAll(/(?<!!)\[\[([^\]|#]+)(?:#[^\]|]*)?\|([^\]]+)\]\]/g)) {
      const target = conceptTitles.get(normalizeTerm(linkTitle(m[1])))
      const key = normalizeTerm(m[2])
      if (!target || !key || key.length < 3 || conceptTitles.has(key)) continue
      if (!fromLinks.has(key)) fromLinks.set(key, new Set())
      fromLinks.get(key)!.add(target)
    }
  }
  for (const [key, targets] of fromLinks) {
    if (targets.size === 1 && !(key in aliases)) aliases[key] = [...targets][0]
  }
  for (const doc of docs) {
    if (doc.kind !== 'concept') continue
    const own = Object.entries(aliases).filter(([, t]) => t === doc.title).map(([k]) => k)
    doc.aliases = [...new Set([...doc.aliases, ...own])]
  }

  const count = (kind: KbDocKind) => docs.filter(d => d.kind === kind).length
  return {
    version: KNOWLEDGE_BASE_VERSION,
    builtAt: sources.site.builtAt,
    commit: sources.site.commit ?? null,
    site,
    repo,
    branch,
    counts: {
      exams: exams.length,
      concepts: count('concept'),
      resources: count('resource'),
      guides: count('guide'),
      questions: questions.length,
      withheld: withheld.length,
    },
    exams,
    docs,
    questions,
    withheld,
    aliases,
  }
}

// ── llms.txt ─────────────────────────────────────────────────────────────────

const STATUS_WORD: Record<KbExamStatus, string> = {
  ready: 'complete',
  beta: 'beta — still being filled out',
  development: 'in development — syllabus outline only',
}

/**
 * `/llms.txt` — the llmstxt.org convention: a short markdown index an assistant
 * that is only browsing the site can read to find its way around, pointing it
 * at the connector for anything deeper.
 */
export function buildLlmsTxt(kb: KnowledgeBase, connectorUrl: string, skillUrl: string): string {
  const exams = kb.exams.map(e => {
    const bank = e.questionCount > 0 ? `, ${e.questionCount} practice questions` : ''
    return `- [${e.name} — ${e.subject}](${e.url}): ${e.body} · ${STATUS_WORD[e.status]}${bank}`
  })
  const general = kb.docs.filter(d => d.kind === 'guide' && d.exams.length === 0)
  return [
    '# Actuarial Notes',
    '',
    `> Study guides, concept pages and a practice-question bank for the SOA and CAS actuarial exams: ${kb.counts.concepts} concept pages, ${kb.counts.resources} source pages and ${kb.counts.questions} practice questions with worked solutions.`,
    '',
    'Every page is community-written study material. Each one carries a fact-check status; most have not yet been checked against the source text, and the official syllabus and readings always take precedence.',
    '',
    '## Exams',
    ...exams,
    ...(general.length ? ['', '## Guides', ...general.map(g => `- [${g.title}](${g.url}): ${g.summary}`)] : []),
    '',
    '## For AI assistants',
    `- [MCP connector](${connectorUrl}): add this URL as a custom connector in Claude or ChatGPT (no sign-in) to search the notes, read syllabi and concept pages, and practise exam questions with the official solutions.`,
    `- [Agent skill](${skillUrl}): a SKILL.md package that teaches an assistant to tutor with the connector — upload it in Claude or ChatGPT.`,
    `- [Knowledge base export](${kb.site}/${KNOWLEDGE_BASE_ASSET}): every page and question above as one JSON file.`,
    '',
  ].join('\n')
}
