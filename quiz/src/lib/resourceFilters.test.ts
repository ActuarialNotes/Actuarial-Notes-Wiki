import { describe, expect, it } from 'vitest'
import type { WikiIndexItem } from './wikiIndex'
import {
  emptyResourceFacets,
  filterResources,
  hasResourceFilters,
  resourceFacetOptions,
  resourceFacetValues,
  resourceFacetsFromParams,
  resourceFacetsToParams,
  toggleResourceFacet,
  type ResourceFacetSelection,
} from './resourceFilters'

function doc(name: string, extra: Partial<WikiIndexItem> = {}): WikiIndexItem {
  return { category: 'document', name, path: `Resources/Books/${name}.md`, ...extra }
}

const SHELF: WikiIndexItem[] = [
  doc('Ross', { exams: ['Exam P-1'], publisher: 'Pearson', year: 2019 }),
  doc('Werner', { exams: ['Exam 5'], publisher: 'Casualty Actuarial Society', year: 2016 }),
  doc('Friedland', { exams: ['Exam 5', 'Exam 7'], publisher: 'Casualty Actuarial Society', year: 2010 }),
  doc('Marshall', { exams: ['Exam 7'], publisher: 'Institute of Actuaries of Australia', year: 2008 }),
  doc('MCT Guideline', { exams: ['Exam 6C'], publisher: 'Office of the Superintendent of Financial Institutions', year: 2023 }),
  // A page that names no publisher, no year and no exam.
  doc('Reference sheet'),
]

function select(partial: Partial<Record<keyof ResourceFacetSelection, string[]>>): ResourceFacetSelection {
  return {
    exam: new Set(partial.exam ?? []),
    publisher: new Set(partial.publisher ?? []),
    year: new Set(partial.year ?? []),
  }
}

const names = (items: WikiIndexItem[]) => items.map(i => i.name)

describe('resourceFacetValues', () => {
  it('reads the exams, the publisher and the year off the index item', () => {
    expect(resourceFacetValues(SHELF[2], 'exam')).toEqual(['Exam 5', 'Exam 7'])
    expect(resourceFacetValues(SHELF[2], 'publisher')).toEqual(['Casualty Actuarial Society'])
    expect(resourceFacetValues(SHELF[2], 'year')).toEqual(['2010'])
  })

  it('files a page that says nothing under nothing', () => {
    for (const facet of ['exam', 'publisher', 'year'] as const) {
      expect(resourceFacetValues(SHELF[5], facet)).toEqual([])
    }
    expect(resourceFacetValues(doc('Blank publisher', { publisher: '  ' }), 'publisher')).toEqual([])
  })
})

describe('filterResources', () => {
  it('keeps the whole shelf when nothing is chosen', () => {
    expect(filterResources(SHELF, emptyResourceFacets())).toEqual(SHELF)
  })

  it('ORs the choices within a facet', () => {
    expect(names(filterResources(SHELF, select({ exam: ['Exam P-1', 'Exam 7'] })))).toEqual(['Ross', 'Friedland', 'Marshall'])
  })

  it('ANDs the facets together', () => {
    const chosen = select({ exam: ['Exam 5'], publisher: ['Casualty Actuarial Society'], year: ['2016'] })
    expect(names(filterResources(SHELF, chosen))).toEqual(['Werner'])
  })

  it('leaves out a resource that names nothing once its facet is filtered', () => {
    expect(names(filterResources(SHELF, select({ year: ['2019'] })))).toEqual(['Ross'])
  })
})

describe('resourceFacetOptions', () => {
  it('lists exams in ladder order, publishers by name and years newest first', () => {
    const none = emptyResourceFacets()
    expect(resourceFacetOptions(SHELF, 'exam', none).map(o => o.value)).toEqual(['Exam P-1', 'Exam 5', 'Exam 6C', 'Exam 7'])
    expect(resourceFacetOptions(SHELF, 'publisher', none).map(o => o.value)).toEqual([
      'Casualty Actuarial Society',
      'Institute of Actuaries of Australia',
      'Office of the Superintendent of Financial Institutions',
      'Pearson',
    ])
    expect(resourceFacetOptions(SHELF, 'year', none).map(o => o.value)).toEqual(['2023', '2019', '2016', '2010', '2008'])
  })

  it('counts each option with the other facets applied, not its own', () => {
    const chosen = select({ exam: ['Exam 5'] })
    // Exam's own options are still counted over the whole shelf, so a second exam can be added.
    expect(resourceFacetOptions(SHELF, 'exam', chosen).find(o => o.value === 'Exam 7')?.count).toBe(2)
    // Publisher's are counted over Exam 5's readings alone.
    expect(resourceFacetOptions(SHELF, 'publisher', chosen)).toEqual([
      { value: 'Casualty Actuarial Society', label: 'Casualty Actuarial Society', count: 2 },
    ])
  })

  it('keeps a chosen value listed when the other facets leave nothing under it', () => {
    const chosen = select({ publisher: ['Pearson'], year: ['2008'] })
    expect(resourceFacetOptions(SHELF, 'publisher', chosen)).toEqual([
      { value: 'Institute of Actuaries of Australia', label: 'Institute of Actuaries of Australia', count: 1 },
      { value: 'Pearson', label: 'Pearson', count: 0 },
    ])
  })
})

describe('the selection', () => {
  it('toggles a value in and out of one facet only', () => {
    const once = toggleResourceFacet(emptyResourceFacets(), 'year', '2019')
    expect([...once.year]).toEqual(['2019'])
    expect(hasResourceFilters(once)).toBe(true)
    const twice = toggleResourceFacet(once, 'year', '2019')
    expect(twice.year.size).toBe(0)
    expect(hasResourceFilters(twice)).toBe(false)
  })

  it('round-trips through the URL, keeping parameters that are not its own', () => {
    const chosen = select({ exam: ['Exam 6C', 'Exam 7'], publisher: ["O'Reilly Media"], year: ['2023'] })
    const params = resourceFacetsToParams(chosen, new URLSearchParams('q=keep&year=1999'))
    expect(params.get('q')).toBe('keep')
    expect(params.getAll('year')).toEqual(['2023'])
    const back = resourceFacetsFromParams(new URLSearchParams(params.toString()))
    expect(back).toEqual(chosen)
  })

  it('reads an empty or unknown query as no filter', () => {
    expect(resourceFacetsFromParams(new URLSearchParams('exam=&sort=year'))).toEqual(emptyResourceFacets())
  })
})
