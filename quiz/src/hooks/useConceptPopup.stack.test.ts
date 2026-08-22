import { describe, it, expect, beforeEach } from 'vitest'
import { useConceptPopup } from './useConceptPopup'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// The page stack: a link followed inside the popup opens a new page on top of
// the one being read (Obsidian's stacked pages, folded into title bars down the
// pane), and every move of the Previous / Next walk starts a fresh trail from
// wherever it landed.

const concept = (name: string): WikiEntryRef => ({ kind: 'concept', name })
const book = (name: string): WikiEntryRef => ({ kind: 'resource', name })

const list = [concept('Bias-Variance Tradeoff'), concept('Cross-Validation')]
const pageNames = () => useConceptPopup.getState().pages.map(p => p.name)

describe('useConceptPopup page stack', () => {
  beforeEach(() => useConceptPopup.getState().close())

  it('opens with the entry as the only page', () => {
    useConceptPopup.getState().openAt(list, 1, 'Exam MAS-I (CAS).md')
    expect(pageNames()).toEqual(['Cross-Validation'])
    expect(useConceptPopup.getState().pageIndex).toBe(0)
  })

  it('stacks a followed link instead of replacing the page being read', () => {
    useConceptPopup.getState().openAt([book('An Introduction to Statistical Learning')], 0, '/wiki')
    useConceptPopup.getState().pushPage(0, concept('Bias-Variance Tradeoff'))

    const s = useConceptPopup.getState()
    expect(pageNames()).toEqual(['An Introduction to Statistical Learning', 'Bias-Variance Tradeoff'])
    expect(s.pageIndex).toBe(1)
    // The walk itself hasn't moved — the footer still reads the source page's
    // concepts, and the article behind keeps highlighting where it stands.
    expect(s.index).toBe(0)
    expect(s.list).toHaveLength(1)
  })

  it('a folded page reopens without disturbing the trail', () => {
    useConceptPopup.getState().openAt([book('ISL')], 0, '/wiki')
    useConceptPopup.getState().pushPage(0, concept('Cross-Validation'))
    useConceptPopup.getState().focusPage(0)
    expect(useConceptPopup.getState().pageIndex).toBe(0)
    expect(pageNames()).toEqual(['ISL', 'Cross-Validation'])
  })

  it('closing a page falls back to the one it was opened from', () => {
    useConceptPopup.getState().openAt([book('ISL')], 0, '/wiki')
    useConceptPopup.getState().pushPage(0, concept('Cross-Validation'))
    useConceptPopup.getState().closePage(1)
    expect(pageNames()).toEqual(['ISL'])
    expect(useConceptPopup.getState().open).toBe(true)
  })

  it('closing the last page closes the popup', () => {
    useConceptPopup.getState().openAt([book('ISL')], 0, '/wiki')
    useConceptPopup.getState().closePage(0)
    expect(useConceptPopup.getState().open).toBe(false)
    expect(useConceptPopup.getState().pages).toEqual([])
  })

  it('prev/next starts a fresh trail on the concept stepped onto', () => {
    useConceptPopup.getState().openAt(list, 0, 'Exam MAS-I (CAS).md')
    useConceptPopup.getState().pushPage(0, concept('Linear Regression'))
    useConceptPopup.getState().navigate(1)

    expect(pageNames()).toEqual(['Cross-Validation'])
    expect(useConceptPopup.getState().pageIndex).toBe(0)
  })

  it('jumping from another surface replaces the stack too', () => {
    useConceptPopup.getState().openAt(list, 0, 'Exam MAS-I (CAS).md')
    useConceptPopup.getState().pushPage(0, concept('Linear Regression'))
    // A link followed on the flashcard back — the popup is re-aimed, not stacked.
    useConceptPopup.getState().jumpTo(concept('Cross-Validation'))
    expect(pageNames()).toEqual(['Cross-Validation'])

    useConceptPopup.getState().pushPage(0, concept('Linear Regression'))
    useConceptPopup.getState().jumpTo(concept('Loss Ratio'))
    expect(pageNames()).toEqual(['Loss Ratio'])
  })

  it('a filter change rebuilds the stack from the concept it lands on', () => {
    const studyPlan = [concept('Cross-Validation')]
    useConceptPopup.getState().openAt(list, 0, 'Exam MAS-I (CAS).md', studyPlan, null)
    useConceptPopup.getState().pushPage(0, concept('Linear Regression'))
    useConceptPopup.getState().setDashboardFilter('study-plan')
    expect(pageNames()).toEqual(['Cross-Validation'])
  })

  it('ignores a push while nothing is open', () => {
    useConceptPopup.getState().pushPage(0, concept('Cross-Validation'))
    expect(useConceptPopup.getState().pages).toEqual([])
  })
})
