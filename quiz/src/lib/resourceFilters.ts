import type { WikiIndexItem } from './wikiIndex'
import { compareExamLabels } from './resourceExams'
import { examDisplayName } from './wikiRoutes'
import { wikiExamIdToProgressKey } from './wikiParser'
import { CAS_TRACK_KEYS, CIA_TRACK_KEYS, SOA_TRACK_KEYS, type GuideBody } from './bodyFilter'
import { TRACKS } from '../data/tracks'

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

// ── The exam strip ───────────────────────────────────────────────────────────
//
// The Exam filter is drawn as the Store's strip of exam logos
// (`components/ExamStrip.tsx`), one exam at a time, under the SOA/CAS picker
// the Study Guides page carries (`lib/bodyFilter.ts`). The strip is a body's
// ladder — the exams of its two credentials, in the order the Study Guides
// page lists them — less any exam the vault has no page for.

export interface ResourceStripExam {
  /** The exam's label, as a resource's `exams` carry it: `Exam P-1`, `Exam GH-201C`. */
  label: string
  /** The `exam_progress` key its logo is drawn from: `P`, `CAS-6`, `FSA-GH201`. */
  key: string
}

const BODY_TRACKS: Record<GuideBody, ReadonlySet<string>> = { SOA: SOA_TRACK_KEYS, CAS: CAS_TRACK_KEYS, CIA: CIA_TRACK_KEYS }
const TRACK_ORDER = ['ACAS', 'FCAS', 'ASA', 'FSA', 'ACIA', 'FCIA']

/** An exam page's progress key, from its name (`Exam GH-201C (SOA)` → `FSA-GH201`). */
function examPageKey(name: string): string {
  return wikiExamIdToProgressKey(examDisplayName(name).replace(/^Exam\s+/i, '').trim())
}

/**
 * One body's exams, from the vault's exam pages (`Exam P-1 (SOA)`, …): walked
 * down the body's credential tracks so the strip reads as its ladder, each
 * exam once (P and FM sit on both an associate and a fellow track), an exam's
 * regional variants (6C, 6U) side by side.
 */
export function resourceStripExams(examPageNames: readonly string[], body: GuideBody): ResourceStripExam[] {
  const byKey = new Map<string, string[]>()
  for (const name of examPageNames) {
    const key = examPageKey(name)
    const labels = byKey.get(key) ?? []
    labels.push(examDisplayName(name))
    byKey.set(key, labels)
  }
  const out: ResourceStripExam[] = []
  const seen = new Set<string>()
  for (const trackKey of TRACK_ORDER) {
    if (!BODY_TRACKS[body].has(trackKey)) continue
    const track = TRACKS.find(t => t.key === trackKey)
    for (const section of track?.sections ?? []) {
      for (const item of section.items) {
        if (seen.has(item.id)) continue
        seen.add(item.id)
        for (const label of [...(byKey.get(item.id) ?? [])].sort(compareExamLabels)) {
          out.push({ label, key: item.id })
        }
      }
    }
  }
  return out
}

/**
 * The body a shelf opens on when its URL names an exam: the exam's own body if
 * only another body's ladder has it (a link to Exam 7 opens on CAS whatever
 * was last picked), otherwise the one picked.
 */
export function bodyForExam<B extends string>(
  label: string | null,
  picked: B,
  strips: Readonly<Record<B, readonly ResourceStripExam[]>>,
): B {
  if (!label || strips[picked].some(e => e.label === label)) return picked
  const other = (Object.keys(strips) as B[]).find(b => b !== picked && strips[b].some(e => e.label === label))
  return other ?? picked
}

/**
 * The shelf under a body with no exam chosen: every reading for one of the
 * body's exams, and every resource that is no exam's reading — those belong to
 * neither body, so neither hides them.
 */
export function resourcesForBody(
  items: readonly WikiIndexItem[],
  strip: readonly ResourceStripExam[],
): WikiIndexItem[] {
  const labels = new Set(strip.map(e => e.label))
  return items.filter(item => !item.exams?.length || item.exams.some(l => labels.has(l)))
}
