import { describe, it, expect } from 'vitest'
import {
  MAX_STACK_PAGES,
  closePage,
  focusPage,
  openStack,
  pushPage,
  samePage,
  stackSlots,
} from './pageStack'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

const concept = (name: string): WikiEntryRef => ({ kind: 'concept', name })
const book = (name: string): WikiEntryRef => ({ kind: 'resource', name })
const names = (s: { pages: WikiEntryRef[] }) => s.pages.map(p => p.name)

describe('samePage', () => {
  it('matches on kind and case-insensitive name', () => {
    expect(samePage(concept('Cross-Validation'), concept('cross-validation'))).toBe(true)
    expect(samePage(concept('Cross-Validation'), concept('Bias-Variance Tradeoff'))).toBe(false)
    // Concepts/X.md and Resources/Books/X.md are different files, so a shared
    // name is not a shared page.
    expect(samePage(concept('Ratemaking'), book('Ratemaking'))).toBe(false)
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

  it('drops the pages opened from a spine before branching off it again', () => {
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

describe('stackSlots', () => {
  const opts = { width: 390, spineWidth: 36, minPanelWidth: 260 }

  it('leaves a lone page expanded — the popup looks exactly as it did', () => {
    expect(stackSlots(1, 0, opts)).toEqual(['panel'])
  })

  it('collapses the trail to spines on a phone-width panel', () => {
    expect(stackSlots(3, 2, opts)).toEqual(['spine', 'spine', 'panel'])
  })

  it('expands a run ending at the focused page when there is room', () => {
    // 1200px fits (1200 - 3·36) / (260 - 36) ≈ 4 panels, capped by the focus.
    expect(stackSlots(3, 2, { ...opts, width: 1200 })).toEqual(['panel', 'panel', 'panel'])
    expect(stackSlots(3, 1, { ...opts, width: 1200 })).toEqual(['panel', 'panel', 'spine'])
  })

  it('never expands past the focused page, so the newest page sits rightmost', () => {
    expect(stackSlots(4, 0, { ...opts, width: 1200 })).toEqual(['panel', 'spine', 'spine', 'spine'])
  })

  it('falls back to a single panel before the width is measured', () => {
    expect(stackSlots(3, 2, { width: 0 })).toEqual(['spine', 'spine', 'panel'])
  })

  it('always expands the focused page, however cramped', () => {
    const slots = stackSlots(4, 3, { ...opts, width: 200 })
    expect(slots).toEqual(['spine', 'spine', 'spine', 'panel'])
  })
})
