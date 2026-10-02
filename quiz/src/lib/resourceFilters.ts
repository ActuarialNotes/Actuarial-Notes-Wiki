import type { WikiIndexItem } from './wikiIndex'
import { compareExamLabels } from './resourceExams'

// The filters on the Study Guides tab's **Resources** page — Exam, Publisher
// and Year — as one definition: what each matches, the options each offers
// over the shelf (with the count choosing it would leave, the other filters
// applied), and how a choice rides the URL. `pages/wiki/WikiResources.tsx`
// draws them with the question lists' `MultiSelectDropdown`.
//
// Each facet is OR within itself (nothing chosen matches everything) and the
// facets are AND'd together, the rule `lib/questionFilters.ts` keeps for a
// list of questions. Every value is read off the wiki index — the exams a
// resource is a syllabus reading for (`lib/resourceExams.ts`) and its page's
// own `Publisher` and `Year` — so a resource whose page names no publisher is
// under none, rather than filed under a guess.

export type ResourceFacet = 'exam' | 'publisher' | 'year'

export const RESOURCE_FACETS: readonly ResourceFacet[] = ['exam', 'publisher', 'year']

export const RESOURCE_FACET_LABEL: Record<ResourceFacet, string> = {
  exam: 'Exam',
  publisher: 'Publisher',
  year: 'Year',
}

export type ResourceFacetSelection = Readonly<Record<ResourceFacet, ReadonlySet<string>>>

export interface ResourceFacetOption {
  value: string
  label: string
  /** Resources choosing this option would leave, the other facets applied. */
  count: number
}

export function emptyResourceFacets(): ResourceFacetSelection {
  return { exam: new Set(), publisher: new Set(), year: new Set() }
}

/** The selection with `value` flipped in or out of `facet`. */
export function toggleResourceFacet(
  selection: ResourceFacetSelection,
  facet: ResourceFacet,
  value: string,
): ResourceFacetSelection {
  const next = new Set(selection[facet])
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return { ...selection, [facet]: next }
}

export function hasResourceFilters(selection: ResourceFacetSelection): boolean {
  return RESOURCE_FACETS.some(facet => selection[facet].size > 0)
}

/** The values a resource counts under for one facet — none when its page doesn't say. */
export function resourceFacetValues(item: WikiIndexItem, facet: ResourceFacet): string[] {
  switch (facet) {
    case 'exam':
      return item.exams ?? []
    case 'publisher': {
      const publisher = item.publisher?.trim()
      return publisher ? [publisher] : []
    }
    case 'year':
      return item.year ? [String(item.year)] : []
  }
}

function matchesFacet(item: WikiIndexItem, facet: ResourceFacet, chosen: ReadonlySet<string>): boolean {
  return chosen.size === 0 || resourceFacetValues(item, facet).some(v => chosen.has(v))
}

/** Does `item` pass every facet, bar `skip` (the one whose options are being counted)? */
function matchesFacets(item: WikiIndexItem, selection: ResourceFacetSelection, skip?: ResourceFacet): boolean {
  return RESOURCE_FACETS.every(facet => facet === skip || matchesFacet(item, facet, selection[facet]))
}

/** The resources the selection leaves, in the order they came. */
export function filterResources(items: readonly WikiIndexItem[], selection: ResourceFacetSelection): WikiIndexItem[] {
  return items.filter(item => matchesFacets(item, selection))
}

/**
 * What a facet's dropdown offers: every value the shelf holds once the *other*
 * facets are applied, each with the resources choosing it would leave. Exams
 * in ladder order, publishers by name, years newest first. A value already
 * chosen stays listed (at a count of 0) even when the other facets have left
 * nothing under it, so it can still be unticked.
 */
export function resourceFacetOptions(
  items: readonly WikiIndexItem[],
  facet: ResourceFacet,
  selection: ResourceFacetSelection,
): ResourceFacetOption[] {
  const counts = new Map<string, number>()
  for (const item of items) {
    if (!matchesFacets(item, selection, facet)) continue
    for (const value of resourceFacetValues(item, facet)) counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  for (const value of selection[facet]) if (!counts.has(value)) counts.set(value, 0)

  const values = [...counts.keys()]
  switch (facet) {
    case 'exam':
      values.sort(compareExamLabels)
      break
    case 'publisher':
      values.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      break
    case 'year':
      values.sort((a, b) => Number(b) - Number(a) || b.localeCompare(a))
      break
  }
  return values.map(value => ({ value, label: value, count: counts.get(value) ?? 0 }))
}

/**
 * The selection a URL carries — `?exam=Exam+7&exam=Exam+8&year=2019` — so a
 * filtered shelf survives a reload, the browser's Back and the sidebar's
 * return to the tab, and can be linked to. Unknown parameters are ignored.
 */
export function resourceFacetsFromParams(params: URLSearchParams): ResourceFacetSelection {
  const read = (facet: ResourceFacet) => new Set(params.getAll(facet).map(v => v.trim()).filter(Boolean))
  return { exam: read('exam'), publisher: read('publisher'), year: read('year') }
}

/** `params` with the facets replaced by `selection`, everything else kept. */
export function resourceFacetsToParams(selection: ResourceFacetSelection, params = new URLSearchParams()): URLSearchParams {
  const next = new URLSearchParams(params)
  for (const facet of RESOURCE_FACETS) {
    next.delete(facet)
    for (const value of selection[facet]) next.append(facet, value)
  }
  return next
}
