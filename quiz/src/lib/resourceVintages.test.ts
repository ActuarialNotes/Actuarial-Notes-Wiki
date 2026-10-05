import { describe, expect, it } from 'vitest'
import type { WikiIndexItem } from './wikiIndex'
import type { SyllabusEdition } from '../data/syllabusVintages'
import {
  editionReadings,
  vintageFromParams,
  vintageShelf,
  vintageToParams,
  vintageView,
  withCurrentExams,
} from './resourceVintages'

function doc(name: string, exams: string[] = []): WikiIndexItem {
  return { category: 'document', name, path: `Resources/Books/${name}.md`, exams }
}

const source = (label: string) => ({ url: `https://example.org/${label}.pdf`, title: `${label} outline` })

// Fall 2026 added B and E, dropped C; Fall 2025 added C, dropped D (Fall 2024's).
const EDITIONS: SyllabusEdition[] = [
  { label: 'Fall 2026', source: source('2026'), added: ['B', 'E'], dropped: ['C'] },
  { label: 'Fall 2025', source: source('2025'), added: ['C'], dropped: ['D'] },
  { label: 'Fall 2024', source: source('2024') },
]
const editionsFor = (exam: string) => (exam === 'Exam 6C' ? EDITIONS : [])

// The exam page keeps the retired C for the record; E has no vault page.
const SHELF: WikiIndexItem[] = [
  doc('A', ['Exam 6C']),
  doc('B', ['Exam 6C']),
  doc('C', ['Exam 6C', 'Exam 5']),
  doc('D'),
  doc('Z', ['Exam 5']),
]

const names = (set: Set<string>) => [...set].sort()

describe('editionReadings', () => {
  it('walks each earlier list back from the page through the diffs', () => {
    const [f26, f25, f24] = editionReadings(['A', 'B', 'C'], EDITIONS)
    expect(names(f26)).toEqual(['a', 'b', 'e'])
    expect(names(f25)).toEqual(['a', 'c'])
    expect(names(f24)).toEqual(['a', 'd'])
  })

  it('has nothing to say about an exam with no edition on file', () => {
    expect(editionReadings(['A'], [])).toEqual([])
  })
})

describe('withCurrentExams', () => {
  it('untags a reading the newest edition dropped, and only from that exam', () => {
    const books = withCurrentExams(SHELF, editionsFor)
    expect(books.find(b => b.name === 'C')?.exams).toEqual(['Exam 5'])
    expect(books.find(b => b.name === 'A')?.exams).toEqual(['Exam 6C'])
    // An untouched item is the same object.
    expect(books.find(b => b.name === 'Z')).toBe(SHELF[4])
  })
})

describe('vintageView', () => {
  it('applies only to exactly one exam with editions on file', () => {
    expect(vintageView(SHELF, new Set(), null, editionsFor)).toBeNull()
    expect(vintageView(SHELF, new Set(['Exam 6C', 'Exam 5']), null, editionsFor)).toBeNull()
    expect(vintageView(SHELF, new Set(['Exam 5']), null, editionsFor)).toBeNull()
  })

  it('defaults to the newest edition, and an unknown label falls back to it', () => {
    for (const label of [null, 'Spring 1999']) {
      const view = vintageView(SHELF, new Set(['Exam 6C']), label, editionsFor)!
      expect(view.edition.label).toBe('Fall 2026')
      expect(view.previous?.label).toBe('Fall 2025')
      expect(view.added).toEqual(['B', 'E'])
      expect(view.dropped).toEqual(['C'])
      expect(view.counts).toEqual([3, 2, 2])
    }
  })

  it('compares the oldest edition on file with nothing', () => {
    const view = vintageView(SHELF, new Set(['Exam 6C']), 'Fall 2024', editionsFor)!
    expect(view.previous).toBeNull()
    expect(view.added).toEqual([])
    expect(view.dropped).toEqual([])
  })
})

describe('vintageShelf', () => {
  const view = (label: string | null) => vintageView(SHELF, new Set(['Exam 6C']), label, editionsFor)!
  const shelf = (label: string | null, showDropped = false) =>
    vintageShelf(SHELF, view(label), showDropped).map(e => `${e.item.name}${e.change ? `:${e.change}` : ''}${e.stub ? '*' : ''}`)

  it('shows the edition’s readings, retired ones off it', () => {
    expect(shelf('Fall 2024')).toEqual(['A', 'D'])
  })

  it('always marks the additions and leads with them, a reading with no page drawn as a stub', () => {
    expect(shelf(null)).toEqual(['B:added', 'E:added*', 'A'])
    expect(shelf('Fall 2025')).toEqual(['C:added', 'A'])
  })

  it('puts the dropped readings back on the shelf only on request, after the additions', () => {
    expect(shelf(null, true)).toEqual(['B:added', 'E:added*', 'C:dropped', 'A'])
    expect(shelf('Fall 2025', true)).toEqual(['C:added', 'D:dropped', 'A'])
  })

  it('marks nothing on the oldest edition on file, which has nothing to compare with', () => {
    expect(shelf('Fall 2024', true)).toEqual(['A', 'D'])
  })
})

describe('vintageShelf, tagging', () => {
  it('tags a reading with the exam on an edition that assigned it, even once retired', () => {
    const books = withCurrentExams(SHELF, editionsFor)
    const view = vintageView(books, new Set(['Exam 6C']), 'Fall 2025', editionsFor)!
    const c = vintageShelf(books, view, false).find(e => e.item.name === 'C')!
    expect(c.item.exams).toEqual(['Exam 5', 'Exam 6C'])
  })

  it('titles a stub the way the edition does', () => {
    const titled: SyllabusEdition[] = [
      { ...EDITIONS[0], titles: { E: 'The E Manual' } },
      ...EDITIONS.slice(1),
    ]
    const view = vintageView(SHELF, new Set(['Exam 6C']), null, () => titled)!
    const e = vintageShelf(SHELF, view, false).find(entry => entry.item.name === 'E')!
    expect(e.stub).toBe(true)
    expect(e.item.title).toBe('The E Manual')
  })
})

describe('vintage params', () => {
  it('round-trips the vintage and the dropped-readings choice, keeping other parameters', () => {
    const params = vintageToParams('Fall 2025', true, new URLSearchParams('exam=Exam+6C'))
    expect(params.toString()).toBe('exam=Exam+6C&vintage=Fall+2025&changes=dropped')
    expect(vintageFromParams(params)).toEqual({ label: 'Fall 2025', showDropped: true })
  })

  it('reads an older link’s changes=added as nothing, and clears what it is given empty', () => {
    expect(vintageFromParams(new URLSearchParams('changes=added'))).toEqual({ label: null, showDropped: false })
    expect(vintageFromParams(new URLSearchParams('changes=added&changes=dropped')).showDropped).toBe(true)
    expect(vintageToParams(null, false, new URLSearchParams('vintage=Fall+2025&changes=added&q=1')).toString()).toBe('q=1')
  })
})
