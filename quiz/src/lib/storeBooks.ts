// The Store's **Textbooks** aisle, built from the vault rather than typed into
// the Store: every `Resources/Books` page that describes a book a candidate
// buys (a textbook or casebook with an ISBN), with the exams it is a syllabus
// reading for and the chapters each exam assigns.
//
// Both halves are already authored — the book's facts in its page's front
// matter, the reading assignment in each exam page's `Source Material`
// callout (`lib/sourceMaterial.ts`) — so the aisle can't drift from the study
// guides: a book added to an exam's reading list is on the shelf at the next
// build, and one dropped from every list leaves it.
//
// It runs at bundle time (`virtual:store-books` in `vite.config.ts`), so the
// Store carries a few kilobytes of book facts instead of the wiki's megabytes.
// Imports are relative, not `@/`-aliased, for that reason: the vite config
// pulls this module into its own Node graph, as it does `resourceExams.ts`.

import { extractSourceMaterial } from './sourceMaterial'
import { compareExamLabels, examPillLabel, type ExamPageSource } from './resourceExams'

/** One exam's assignment of the book. */
export interface StoreBookReading {
  /** The exam's label, as a resource pill prints it — "Exam P-1", "Exam 6C". */
  exam: string
  /** The chapters or sections the exam assigns, as the exam page writes them. */
  detail?: string
}

export interface StoreBook {
  /** The vault page's name — its route key (`/wiki/resource/<slug>`). */
  name: string
  title: string
  authors?: string
  publisher?: string
  year?: number
  edition?: string
  isbn: string
  /** `Type` from the front matter — "Textbook", "Casebook". */
  type: string
  /** The publisher's own free copy, when the page names one (`Available from`). */
  freeUrl?: string
  coverImage?: string
  readings: StoreBookReading[]
}

/** A `Resources/Books` page, its front matter already parsed. */
export interface BookPageSource {
  name: string
  attrs: Record<string, unknown>
  coverImage?: string
}

/** The kinds of document a candidate buys rather than reads free from the publisher. */
const BOUGHT_TYPES = new Set(['textbook', 'casebook'])

function str(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined
  const s = String(value).trim()
  return s || undefined
}

/** `[statlearning.com](https://www.statlearning.com/)` → the URL; a bare URL as is. */
export function linkTarget(value: string | undefined): string | undefined {
  if (!value) return undefined
  const md = /\]\((https?:\/\/[^)\s]+)\)/.exec(value)
  if (md) return md[1]
  return /^https?:\/\/\S+$/.test(value) ? value : undefined
}

/**
 * The books on the Textbooks aisle: pages typed Textbook or Casebook that carry
 * an ISBN and are a syllabus reading for at least one exam — in syllabus order
 * of their first exam, then by title.
 */
export function buildStoreBooks(examPages: ExamPageSource[], books: BookPageSource[]): StoreBook[] {
  const readings = new Map<string, StoreBookReading[]>()
  for (const page of examPages) {
    const exam = examPillLabel(page.name)
    for (const entry of extractSourceMaterial(page.markdown).entries) {
      const key = entry.name.toLowerCase()
      const list = readings.get(key) ?? []
      if (list.some(r => r.exam === exam)) continue
      list.push(entry.detail ? { exam, detail: entry.detail } : { exam })
      readings.set(key, list)
    }
  }

  const out: StoreBook[] = []
  for (const book of books) {
    const isbn = str(book.attrs['ISBN'])
    const type = str(book.attrs['Type'])
    if (!isbn || !type || !BOUGHT_TYPES.has(type.toLowerCase())) continue
    const assigned = [...(readings.get(book.name.toLowerCase()) ?? [])].sort((a, b) => compareExamLabels(a.exam, b.exam))
    if (assigned.length === 0) continue
    const year = Number.parseInt(str(book.attrs['Year']) ?? '', 10)
    const entry: StoreBook = {
      name: book.name,
      title: str(book.attrs['Title']) ?? book.name,
      isbn,
      type,
      readings: assigned,
    }
    const authors = str(book.attrs['Authors']) ?? str(book.attrs['Author'])
    if (authors) entry.authors = authors
    const publisher = str(book.attrs['Publisher'])
    if (publisher) entry.publisher = publisher
    if (Number.isFinite(year)) entry.year = year
    const edition = str(book.attrs['Edition'])
    if (edition) entry.edition = edition
    const freeUrl = linkTarget(str(book.attrs['Available from']))
    if (freeUrl) entry.freeUrl = freeUrl
    if (book.coverImage) entry.coverImage = book.coverImage
    out.push(entry)
  }

  return out.sort((a, b) =>
    compareExamLabels(a.readings[0]!.exam, b.readings[0]!.exam) || a.title.localeCompare(b.title),
  )
}
