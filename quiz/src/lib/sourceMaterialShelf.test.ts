import { describe, expect, it } from 'vitest'
import type { WikiIndexItem } from './wikiIndex'
import type { SyllabusEdition } from '../data/syllabusVintages'
import { sourceMaterialShelf, type SourceMaterialEntry } from './sourceMaterial'

function doc(name: string, exams: string[] = []): WikiIndexItem {
  return { category: 'document', name, path: `Resources/Books/${name}.md`, exams }
}
const entry = (name: string, detail?: string): SourceMaterialEntry => ({ name, target: name, label: name, detail })
const source = (label: string) => ({ url: `https://example.org/${label}.pdf`, title: `${label} outline` })

// Fall 2026 added B, dropped C; Fall 2025 added C, dropped D.
const EDITIONS: SyllabusEdition[] = [
  { label: 'Fall 2026', source: source('2026'), added: ['B'], dropped: ['C'] },
  { label: 'Fall 2025', source: source('2025'), added: ['C'], dropped: ['D'] },
  { label: 'Fall 2024', source: source('2024') },
]
const editionsFor = (exam: string) => (exam === 'Exam 6C' ? EDITIONS : [])

// The page lists A, B, the retired C, and N, which has no resource page.
const ENTRIES = [entry('A', 'Ch. 1'), entry('B'), entry('C'), entry('N', 'All')]
const INDEX = [doc('A', ['Exam 6C']), doc('B', ['Exam 6C']), doc('C', ['Exam 6C']), doc('D'), doc('Z', ['Exam 5'])]

const shelfNames = (exam: string | null, label: string | null, dropped = false) =>
  sourceMaterialShelf(ENTRIES, INDEX, exam, label, dropped, editionsFor).shelf
    .map(e => `${e.item.name}${e.change ? `:${e.change}` : ''}`)

describe('sourceMaterialShelf', () => {
  it('lists the page in its own order when the exam has no editions', () => {
    expect(shelfNames('Exam 5', null)).toEqual(['A', 'B', 'C', 'N'])
    expect(shelfNames(null, null)).toEqual(['A', 'B', 'C', 'N'])
  })

  it('shows the newest edition, its additions first, its drops only on request', () => {
    expect(shelfNames('Exam 6C', null)).toEqual(['B:added', 'A', 'N'])
    expect(shelfNames('Exam 6C', null, true)).toEqual(['B:added', 'C:dropped', 'A', 'N'])
  })

  it('walks back to an older edition, bringing readings the page no longer lists', () => {
    expect(shelfNames('Exam 6C', 'Fall 2025')).toEqual(['C:added', 'A', 'N'])
    expect(shelfNames('Exam 6C', 'Fall 2025', true)).toEqual(['C:added', 'D:dropped', 'A', 'N'])
  })

  it('keeps the page line beside each reading it lists', () => {
    const { shelf } = sourceMaterialShelf(ENTRIES, INDEX, 'Exam 6C', 'Fall 2025', true, editionsFor)
    expect(shelf.find(e => e.item.name === 'A')?.source?.detail).toBe('Ch. 1')
    expect(shelf.find(e => e.item.name === 'N')?.item.path).toBe('')
    expect(shelf.find(e => e.item.name === 'D')?.source).toBeUndefined()
  })
})
