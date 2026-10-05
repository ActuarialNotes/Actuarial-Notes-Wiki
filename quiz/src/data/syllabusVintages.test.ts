import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SYLLABUS_VINTAGES } from './syllabusVintages'
import { extractSourceMaterial } from '../lib/sourceMaterial'
import { examPillLabel } from '../lib/resourceExams'

// Holds the vintage table to the vault: every exam it names has a page, and
// every reading it names is spelled the vault's way — or, for one the vault
// has no page for and the exam page doesn't link, titled the outline's way.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const EXAM_PAGES = new Map(
  readdirSync(REPO_ROOT)
    .filter(file => /^Exam .*\.md$/.test(file))
    .map(file => [examPillLabel(file.replace(/\.md$/, '')), file] as const),
)

const BOOKS = new Set(readdirSync(path.join(REPO_ROOT, 'Resources/Books')).map(file => file.replace(/\.md$/, '')))

describe('SYLLABUS_VINTAGES', () => {
  for (const [exam, editions] of Object.entries(SYLLABUS_VINTAGES)) {
    describe(exam, () => {
      it('is an exam the vault has a page for', () => {
        expect(EXAM_PAGES.has(exam)).toBe(true)
      })

      it('lists distinct editions, the oldest with nothing to diff against', () => {
        expect(editions.length).toBeGreaterThan(0)
        expect(new Set(editions.map(e => e.label)).size).toBe(editions.length)
        const oldest = editions[editions.length - 1]
        expect(oldest.added ?? []).toEqual([])
        expect(oldest.dropped ?? []).toEqual([])
      })

      it('cites the examining body’s own document for every edition', () => {
        for (const { source } of editions) {
          expect(source.url).toMatch(/^https:\/\/www\.(casact|soa)\.org\//)
          expect(source.title.trim()).not.toBe('')
        }
      })

      it('never adds and drops the same reading in one edition', () => {
        for (const edition of editions) {
          const added = new Set(edition.added ?? [])
          expect((edition.dropped ?? []).filter(name => added.has(name))).toEqual([])
        }
      })

      it('names a reading the vault’s way, or titles it the outline’s way', () => {
        const lower = new Map([...BOOKS].map(name => [name.toLowerCase(), name]))
        const file = EXAM_PAGES.get(exam)
        const onPage = new Set(
          file ? extractSourceMaterial(readFileSync(path.join(REPO_ROOT, file), 'utf-8')).entries.map(e => e.name) : [],
        )
        for (const edition of editions) {
          for (const name of [...(edition.added ?? []), ...(edition.dropped ?? [])]) {
            const page = lower.get(name.toLowerCase())
            // A reading with a page is spelled the page's way…
            if (page) expect(name).toBe(page)
            // …one the exam page links is named as it links it…
            else if (onPage.has(name)) continue
            // …and one with neither is an outline's abbreviation, so it carries the outline's title.
            else expect(edition.titles?.[name], `${exam} ${edition.label}: ${name}`).toBeTruthy()
          }
        }
      })
    })
  }
})
