import { describe, it, expect } from 'vitest'
import {
  MAX_STACK_PAGES,
  closePage,
  focusPage,
  openStack,
  pdfPage,
  pushPage,
  samePage,
} from './pageStack'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

const concept = (name: string): WikiEntryRef => ({ kind: 'concept', name })
const book = (name: string): WikiEntryRef => ({ kind: 'resource', name })
const names = (s: { pages: Array<{ name: string }> }) => s.pages.map(p => p.name)
const MATERIALITY_URL = 'https://www.cia-ica.ca/wp-content/uploads/2019/08/207099e.pdf'
const materiality = pdfPage({ url: MATERIALITY_URL, title: 'Materiality', subtitle: 'Canadian Institute of Actuaries · 2007' })

describe('samePage', () => {
  it('matches on kind and case-insensitive name', () => {
    expect(samePage(concept('Cross-Validation'), concept('cross-validation'))).toBe(true)
    expect(samePage(concept('Cross-Validation'), concept('Bias-Variance Tradeoff'))).toBe(false)
    // Concepts/X.md and Resources/Books/X.md are different files, so a shared
    // name is not a shared page.
    expect(samePage(concept('Ratemaking'), book('Ratemaking'))).toBe(false)
  })

  it('matches documents on their URL, not their title', () => {
    expect(samePage(materiality, pdfPage({ url: MATERIALITY_URL, title: 'Read PDF' }))).toBe(true)
    // Two papers can share a title — every sitting has an "Examiner's Report".
    expect(samePage(
      pdfPage({ url: 'https://www.casact.org/sites/default/files/2021-03/5_2019_spring.pdf', title: "Examiner's Report" }),
      pdfPage({ url: 'https://www.casact.org/sites/default/files/2021-03/5_2018_spring.pdf', title: "Examiner's Report" }),
    )).toBe(false)
    // A document is never the page it was opened from, whatever they're called.
    expect(samePage(materiality, book('Materiality'))).toBe(false)
    expect(samePage(book('Materiality'), materiality)).toBe(false)
  })
})

describe('pdfPage', () => {
  it('carries what the reader was asked to open, titled for its bar', () => {
    expect(materiality).toEqual({
      kind: 'pdf',
      name: 'Materiality',
      url: MATERIALITY_URL,
      subtitle: 'Canadian Institute of Actuaries · 2007',
    })
  })
})

describe('pushPage', () => {
  it('stacks a link followed from the page being read', () => {
    let stack = openStack(book('An Introduction to Statistical Learning'))
    stack = pushPage(stack, 0, concept('Bias-Variance Tradeoff'))
    stack = pushPage(stack, 1, concept('Cross-Validation'))

    expect(names(stack)).toEqual([
      'An Introduction to Statistical Learning',
      'Bias-Variance Tradeoff',
      'Cross-Validation',
    ])
    expect(stack.index).toBe(2)
  })

  it('drops the pages opened from a folded page before branching off it again', () => {
    let stack = openStack(book('ISL'))
    stack = pushPage(stack, 0, concept('Bias-Variance Tradeoff'))
    stack = pushPage(stack, 1, concept('Cross-Validation'))
    // Back to the book, then off in another direction.
    stack = pushPage(stack, 0, concept('Linear Regression'))

    expect(names(stack)).toEqual(['ISL', 'Linear Regression'])
    expect(stack.index).toBe(1)
  })

  it('focuses a page already in the stack instead of opening it twice', () => {
    let stack = openStack(concept('Bias-Variance Tradeoff'))
    stack = pushPage(stack, 0, concept('Cross-Validation'))
    stack = pushPage(stack, 1, concept('Bias-Variance Tradeoff'))

    expect(names(stack)).toEqual(['Bias-Variance Tradeoff', 'Cross-Validation'])
    expect(stack.index).toBe(0)
  })

  it('drops the oldest page once the stack is full, keeping the one just opened', () => {
    let stack = openStack(concept('C0'))
    for (let i = 1; i <= MAX_STACK_PAGES; i++) stack = pushPage(stack, i - 1, concept(`C${i}`))

    expect(stack.pages).toHaveLength(MAX_STACK_PAGES)
    expect(names(stack)[0]).toBe('C1')
    expect(names(stack).at(-1)).toBe(`C${MAX_STACK_PAGES}`)
    expect(stack.index).toBe(MAX_STACK_PAGES - 1)
  })

  it('stacks a document opened from a page like a followed link', () => {
    let stack = openStack(book('CIA Materiality'))
    stack = pushPage(stack, 0, materiality)
    expect(names(stack)).toEqual(['CIA Materiality', 'Materiality'])
    expect(stack.index).toBe(1)
    expect(stack.pages[1].kind).toBe('pdf')
  })

  it('drops what was opened from a folded page before stacking its document', () => {
    // The screenshot's stack: the Exam 6C page was opened from the resource
    // page and then stepped back past; Read PDF on the resource page branches.
    let stack = openStack(book('CIA Materiality'))
    stack = pushPage(stack, 0, { kind: 'exam', name: 'Exam 6C (CAS)' })
    stack = focusPage(stack, 0)
    stack = pushPage(stack, 0, materiality)
    expect(names(stack)).toEqual(['CIA Materiality', 'Materiality'])
    expect(stack.index).toBe(1)
  })

  it('returns to a document already in the stack rather than opening it twice', () => {
    let stack = openStack(book('CIA Materiality'))
    stack = pushPage(stack, 0, materiality)
    stack = focusPage(stack, 0)
    // Read PDF again from the same page: the branch past it is the document.
    stack = pushPage(stack, 0, materiality)
    expect(names(stack)).toEqual(['CIA Materiality', 'Materiality'])
    expect(stack.index).toBe(1)
  })

  it('clamps an out-of-range source index', () => {
    const stack = pushPage(openStack(concept('A')), 9, concept('B'))
    expect(names(stack)).toEqual(['A', 'B'])
  })
})

describe('focusPage', () => {
  it('expands the page tapped and leaves the trail intact', () => {
    let stack = openStack(concept('A'))
    stack = pushPage(stack, 0, concept('B'))
    stack = focusPage(stack, 0)
    expect(stack.index).toBe(0)
    expect(names(stack)).toEqual(['A', 'B'])
  })

  it('clamps out-of-range indices', () => {
    const stack = focusPage(openStack(concept('A')), 4)
    expect(stack.index).toBe(0)
  })
})

describe('closePage', () => {
  it('closing the focused page lands on the one it was opened from', () => {
    let stack = openStack(concept('A'))
    stack = pushPage(stack, 0, concept('B'))
    stack = pushPage(stack, 1, concept('C'))
    stack = closePage(stack, 2)
    expect(names(stack)).toEqual(['A', 'B'])
    expect(stack.index).toBe(1)
  })

  it('keeps the focused page focused when an earlier one closes', () => {
    let stack = openStack(concept('A'))
    stack = pushPage(stack, 0, concept('B'))
    stack = pushPage(stack, 1, concept('C'))
    stack = closePage(stack, 0)
    expect(names(stack)).toEqual(['B', 'C'])
    expect(stack.index).toBe(1)
  })

  it('empties the stack when the last page closes', () => {
    expect(closePage(openStack(concept('A')), 0).pages).toEqual([])
  })

  it('ignores an index that isn\'t in the stack', () => {
    const stack = openStack(concept('A'))
    expect(closePage(stack, 3)).toBe(stack)
  })
})
