// Corpus test: the content scripts and the app agree about the exams and the links.
//
// The Python side of the vault — the syllabus lint, the link validator, the
// exam audit — can't import this app, so it reads two small JSON files instead:
// `scripts/exam_catalog.json` (each exam page, its ids, its bank and its status)
// and `scripts/fixtures/link_resolution.json` (what a question's `wiki_link:`
// entry means). This is where those mirrors are pinned against the TypeScript
// they mirror: change `examStatus`, `examIdFromFile` or `slugForLink` without the
// JSON (or the other way round) and this fails, instead of the checkers quietly
// judging the vault by different rules from the ones the app reads it by.

import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { examStatus } from '@/lib/examStatus'
import { examIdFromFile } from '@/lib/wikiRoutes'
import { parseExamMetadata, parseExamSyllabus, wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { slugForLink } from '@/lib/conceptMatch'
import { getSyllabusPdfLink } from '@/data/examPdfLinks'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const readJson = <T,>(rel: string): T => JSON.parse(readFileSync(path.join(REPO_ROOT, rel), 'utf-8')) as T

interface CatalogRow {
  page: string
  exam_id: string
  wiki_id: string
  progress_key: string
  body: 'SOA' | 'CAS'
  bank: string | null
  status: 'ready' | 'beta' | 'development'
}
const catalog = readJson<{ exams: CatalogRow[] }>('scripts/exam_catalog.json').exams

describe('scripts/exam_catalog.json', () => {
  it('lists every exam page in the vault, once', () => {
    const pages = readdirSync(REPO_ROOT).filter(f => /^Exam .+\.md$/.test(f)).sort()
    expect(catalog.map(e => e.page).sort()).toEqual(pages)
  })

  it.each(catalog)('$page — ids match what the app derives from the page', row => {
    const meta = parseExamMetadata(readFileSync(path.join(REPO_ROOT, row.page), 'utf-8'))
    expect(meta?.examId).toBe(row.exam_id)
    expect(wikiExamIdToProgressKey(row.exam_id)).toBe(row.progress_key)
    expect(examIdFromFile(row.page)).toBe(row.wiki_id)
  })

  it.each(catalog)('$page — status mirrors lib/examStatus', row => {
    expect(examStatus(row.progress_key)).toBe(row.status)
  })

  it.each(catalog.filter(e => e.bank))('$page — its question bank exists', row => {
    expect(existsSync(path.join(REPO_ROOT, 'questions', row.bank!))).toBe(true)
  })
})

describe('scripts/fixtures/link_resolution.json', () => {
  const cases = readJson<{ question_links: { link: string; slug: string }[] }>(
    'scripts/fixtures/link_resolution.json',
  ).question_links

  it.each(cases)('slugForLink($link) matches vault_links.question_link_slug', ({ link, slug }) => {
    expect(slugForLink(link)).toBe(slug)
  })
})

describe('scripts/concept_aliases.json', () => {
  const tables = readJson<{ aliases: Record<string, string>; namesakes: Record<string, Record<string, string>> }>(
    'scripts/concept_aliases.json',
  )
  const targets = new Set([
    ...Object.values(tables.aliases),
    ...Object.values(tables.namesakes).flatMap(ns => Object.values(ns)),
  ])

  it.each([...targets].sort())('%s is a concept page, spelled exactly as the app fetches it', name => {
    expect(existsSync(path.join(REPO_ROOT, 'Concepts', `${name}.md`))).toBe(true)
  })

  it('keys namesakes by exam ids the catalogue knows', () => {
    const ids = new Set(['default', ...catalog.map(e => e.wiki_id)])
    for (const ns of Object.values(tables.namesakes)) {
      for (const key of Object.keys(ns)) expect(ids).toContain(key)
    }
  })
})

// `.syllabus/<wiki id>/syllabus.json` is scripts/syllabus_extract.py's output:
// the objectives transcribed from a syllabus PDF. The PDF it names must be the
// one the exam page's syllabus button opens (`data/examPdfLinks.ts`), or the page
// would claim to transcribe one document and link the reader to another.
const syllabusDir = path.join(REPO_ROOT, '.syllabus')
const extracted = existsSync(syllabusDir)
  ? readdirSync(syllabusDir).filter(id => existsSync(path.join(syllabusDir, id, 'syllabus.json')))
  : []

describe.skipIf(extracted.length === 0)('.syllabus/*/syllabus.json', () => {
  it.each(extracted)('%s — cites the syllabus the app links', id => {
    const data = readJson<{ source_url: string }>(`.syllabus/${id}/syllabus.json`)
    expect(getSyllabusPdfLink(id)?.url).toBe(data.source_url)
  })
})

// The Python lint (scripts/syllabus_lint.py) checks the page's structure with
// its own regexes; this is the app's parser reading the same pages, so the two
// can't drift into disagreeing about what counts as an objective.
describe('exam pages, as the app parses them', () => {
  it.each(catalog)('$page — every objective has a weight and a concept, and the page has sources', row => {
    const content = readFileSync(path.join(REPO_ROOT, row.page), 'utf-8')
    const syllabus = parseExamSyllabus(content, row.exam_id, `Exam ${row.exam_id}`, '', row.page)
    expect(syllabus.topics.length).toBeGreaterThan(0)
    for (const topic of syllabus.topics) {
      expect(topic.weight, `${topic.name} has no {weight}`).toBeTruthy()
      expect(topic.concepts.length, `${topic.name} links no concept`).toBeGreaterThan(0)
    }
    expect(syllabus.resources.length).toBeGreaterThan(0)
  })
})
