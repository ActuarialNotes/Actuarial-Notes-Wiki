/**
 * **Sources** — the entities that publish, and the documents they publish.
 *
 * The distinction is the whole point of the tab. An actuary does not follow
 * "documents"; they follow *publishers* — OSFI, FSRA, the CIA, their own
 * competitors' annual reports, one trade paper — and take whatever those
 * publish. So a source is an **entity**, and a **resource** is one thing that
 * entity published. Adding an entity to the library says "I follow this";
 * adding a resource says "I am using this one document", and it implies the
 * first (you cannot use a document from a publisher you don't follow), which is
 * why `addResource` below adds the entity too.
 *
 * Some resources already exist in the vault: a textbook has a
 * `Resources/Books/` page, an ASOP has one under `Resources/Regulation/`. Those
 * carry a `wikiRef` and open as the wiki page they are. The rest are Cowork's
 * own seed documents, authored as markdown in `data/coworkSources.ts` and
 * registered as virtual vault files (`lib/coworkContent.ts`) so *both* kinds
 * open in the same popup viewer, with the same page stack and the same actions.
 * That is requirement 1 — the core interactivity is Study Mode's — and it is
 * kept by not having a second reader at all.
 *
 * Pure and tested: everything here takes data and returns data.
 */

import type { WikiEntryRef } from '@/lib/wikiRoutes'
import type { ActuarialFunction, PracticeArea } from '@/lib/coworkFacets'

/** What kind of organisation publishes it — the filter the entity list offers. */
export type EntityCategory =
  | 'regulator'
  | 'standards'
  | 'insurer'
  | 'media'
  | 'consulting'
  | 'industry-data'

export interface EntityCategorySpec {
  id: EntityCategory
  label: string
  description: string
}

export const ENTITY_CATEGORIES: EntityCategorySpec[] = [
  { id: 'regulator', label: 'Regulators', description: 'Supervisors whose rules bind the business' },
  { id: 'standards', label: 'Standards bodies', description: 'Actuarial and accounting standard setters' },
  { id: 'insurer', label: 'Insurers', description: 'Carriers whose own disclosure is a benchmark' },
  { id: 'industry-data', label: 'Industry data', description: 'Pooled statistics and benchmark exhibits' },
  { id: 'consulting', label: 'Consulting', description: 'Firms publishing market and technical research' },
  { id: 'media', label: 'Trade press', description: 'Reporting that dates events and names the parties' },
]

/** What kind of document it is. Drives the row's icon and the type filter. */
export type ResourceKind =
  | 'textbook'
  | 'standard'
  | 'regulation'
  | 'guideline'
  | 'bulletin'
  | 'filing'
  | 'report'
  | 'news'
  | 'dataset'

export interface ResourceKindSpec {
  id: ResourceKind
  label: string
  /** Plural, for a count ("3 guidelines"). */
  plural: string
}

export const RESOURCE_KINDS: ResourceKindSpec[] = [
  { id: 'textbook', label: 'Textbook', plural: 'textbooks' },
  { id: 'standard', label: 'Standard', plural: 'standards' },
  { id: 'regulation', label: 'Regulation', plural: 'regulations' },
  { id: 'guideline', label: 'Guideline', plural: 'guidelines' },
  { id: 'bulletin', label: 'Bulletin', plural: 'bulletins' },
  { id: 'filing', label: 'Filing', plural: 'filings' },
  { id: 'report', label: 'Report', plural: 'reports' },
  { id: 'news', label: 'News', plural: 'news items' },
  { id: 'dataset', label: 'Dataset', plural: 'datasets' },
]

export function resourceKindLabel(kind: ResourceKind): string {
  return RESOURCE_KINDS.find(k => k.id === kind)?.label ?? kind
}

export interface SourceEntity {
  id: string
  name: string
  /** The acronym or short form, for the logo tile. Two to five characters. */
  short: string
  category: EntityCategory
  /** Where its writ runs — "Canada", "Ontario", "Global". */
  jurisdiction: string
  /** One paragraph: who they are and why an actuary reads them. */
  about: string
  /** The publisher's own site, when there is one to link. */
  site?: string
  practiceAreas: PracticeArea[]
}

/**
 * One document an entity published.
 *
 * Provenance is transcribed, never constructed — the same rule the vault keeps
 * for pass rates and examiner's reports (`docs/mock-exam-browser.md`). A
 * resource with no published date says so rather than being dated from the
 * year its neighbours carry, and `url` is the publisher's own link or absent.
 */
export interface SourceResource {
  id: string
  entityId: string
  title: string
  kind: ResourceKind
  /** ISO date, or a bare `YYYY` when only the year is published. Null if none. */
  published: string | null
  /** One line: what the document is and what it settles. */
  summary: string
  /**
   * The vault page for this work, when the wiki already carries it. Set for a
   * syllabus textbook or an ASOP; absent for a Cowork-only seed document, which
   * carries `docPath` instead.
   */
  wikiRef?: WikiEntryRef
  /**
   * The virtual vault path a Cowork-only document is registered at, so the
   * popup viewer can read it exactly as it reads a real page.
   */
  docPath?: string
  url?: string
  /**
   * True for an entry that illustrates the shape of the catalogue rather than
   * naming a document Cowork carries. Cowork ships with seed data while the
   * corpus is built out, and a reader has to be able to tell the two apart —
   * so a sample says so on its row, and never carries a date or a link it
   * cannot support.
   */
  sample?: boolean
  practiceAreas: PracticeArea[]
  functions: ActuarialFunction[]
  /**
   * What attaching this document to a deliverable contributes to its
   * assumptions table. This is the mechanical half of "the analysis populates
   * itself": the basis is the document, so the row can name it.
   */
  assumptions?: ResourceAssumption[]
}

export interface ResourceAssumption {
  label: string
  /**
   * Absent when the document supplies the *row* but not the number — a figure
   * the reader has to read off their own data, or a sample entry standing in
   * for a document Cowork does not yet carry. A blank value with a locator is
   * the honest form of "populated": the analysis knows what it needs and where
   * it comes from, and does not invent it.
   */
  value?: string
  /** Where in the document it comes from — a section, a table, a page. */
  locator?: string
}

/** The popup-viewer target for a resource: a vault page or its virtual one. */
export function resourceEntryRef(resource: SourceResource): WikiEntryRef | null {
  if (resource.wikiRef) return resource.wikiRef
  if (resource.docPath) return { kind: 'resource', name: resource.title, path: resource.docPath }
  return null
}

/** Sort key for a resource: newest first, undated last. */
function publishedRank(published: string | null): number {
  if (!published) return -Infinity
  // A bare year sorts as its first day, which keeps `2024` behind `2024-06-01`
  // rather than ahead of it — an undated-within-the-year document is older
  // than one we can place.
  const iso = /^\d{4}$/.test(published) ? `${published}-01-01` : published
  const t = Date.parse(iso)
  return Number.isNaN(t) ? -Infinity : t
}

export function sortResourcesByDate(resources: SourceResource[]): SourceResource[] {
  return [...resources].sort((a, b) => {
    const diff = publishedRank(b.published) - publishedRank(a.published)
    if (diff !== 0 && Number.isFinite(diff)) return diff
    if (publishedRank(a.published) !== publishedRank(b.published)) {
      return publishedRank(b.published) - publishedRank(a.published)
    }
    return a.title.localeCompare(b.title)
  })
}

/** Human date for a row: `2025-03-14` → `14 Mar 2025`, `2024` → `2024`. */
export function formatPublished(published: string | null): string {
  if (!published) return 'Undated'
  if (/^\d{4}$/.test(published)) return published
  const d = new Date(`${published}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return published
  return d.toLocaleDateString('en-CA', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export interface SourceFilters {
  query?: string
  categories?: EntityCategory[]
  practiceAreas?: PracticeArea[]
  kinds?: ResourceKind[]
}

function matchesQuery(haystack: string[], query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  // Every whitespace-separated term has to appear somewhere, so "osfi capital"
  // finds a capital guideline published by OSFI rather than everything from
  // either. Terms are matched as substrings, not as words: an actuary types
  // "reserv" as often as "reserving".
  const terms = needle.split(/\s+/).filter(Boolean)
  const text = haystack.join(' \u0000 ').toLowerCase()
  return terms.every(t => text.includes(t))
}

export function resourceMatches(resource: SourceResource, filters: SourceFilters): boolean {
  if (filters.kinds?.length && !filters.kinds.includes(resource.kind)) return false
  if (filters.practiceAreas?.length && !resource.practiceAreas.some(p => filters.practiceAreas!.includes(p))) {
    return false
  }
  if (filters.query && !matchesQuery([resource.title, resource.summary, resourceKindLabel(resource.kind)], filters.query)) {
    return false
  }
  return true
}

/**
 * The entities to list, each with the resources of theirs that survived the
 * filters.
 *
 * An entity is kept when it matches the filters *itself* (its own name,
 * category and practice areas) or when any of its resources does — searching
 * for a bulletin should surface the regulator that issued it, with that
 * bulletin under it. An entity kept only on its own account keeps *all* its
 * resources: it matched as a publisher, so the answer is everything it
 * publishes, not nothing.
 */
export interface EntityGroup {
  entity: SourceEntity
  resources: SourceResource[]
  /** Its full catalogue size, so a filtered group can say what it is hiding. */
  total: number
}

export function groupSources(
  entities: SourceEntity[],
  resources: SourceResource[],
  filters: SourceFilters = {},
): EntityGroup[] {
  const byEntity = new Map<string, SourceResource[]>()
  for (const r of resources) {
    const list = byEntity.get(r.entityId)
    if (list) list.push(r)
    else byEntity.set(r.entityId, [r])
  }

  const hasFilter = Boolean(
    filters.query?.trim() || filters.categories?.length || filters.practiceAreas?.length || filters.kinds?.length,
  )

  const groups: EntityGroup[] = []
  for (const entity of entities) {
    const all = byEntity.get(entity.id) ?? []
    if (filters.categories?.length && !filters.categories.includes(entity.category)) continue

    const entityMatches =
      (!filters.practiceAreas?.length || entity.practiceAreas.some(p => filters.practiceAreas!.includes(p))) &&
      (!filters.query || matchesQuery([entity.name, entity.short, entity.about, entity.jurisdiction], filters.query)) &&
      !filters.kinds?.length

    const matched = all.filter(r => resourceMatches(r, filters))
    if (!hasFilter) {
      groups.push({ entity, resources: sortResourcesByDate(all), total: all.length })
      continue
    }
    if (entityMatches) {
      groups.push({ entity, resources: sortResourcesByDate(all), total: all.length })
      continue
    }
    if (matched.length) {
      groups.push({ entity, resources: sortResourcesByDate(matched), total: all.length })
    }
  }
  return groups
}

/* ------------------------------------------------------------------ library */

/**
 * What the reader has taken. Two sets, because the two are different claims:
 * `entityIds` is "I follow this publisher", `resourceIds` is "I am working from
 * this document". A deliverable draws from the second.
 */
export interface LibraryState {
  entityIds: string[]
  resourceIds: string[]
}

export const EMPTY_LIBRARY: LibraryState = { entityIds: [], resourceIds: [] }

function withId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids : [...ids, id]
}

function withoutId(ids: string[], id: string): string[] {
  return ids.filter(x => x !== id)
}

export function addEntity(state: LibraryState, entityId: string): LibraryState {
  return { ...state, entityIds: withId(state.entityIds, entityId) }
}

/**
 * Dropping a publisher drops the documents taken from it too. Keeping them
 * would leave the library holding a document whose source it no longer lists —
 * a deliverable citing it could name the document but not who published it.
 */
export function removeEntity(
  state: LibraryState,
  entityId: string,
  resources: SourceResource[],
): LibraryState {
  const owned = new Set(resources.filter(r => r.entityId === entityId).map(r => r.id))
  return {
    entityIds: withoutId(state.entityIds, entityId),
    resourceIds: state.resourceIds.filter(id => !owned.has(id)),
  }
}

/** Taking a document implies following its publisher — see the header note. */
export function addResource(state: LibraryState, resource: SourceResource): LibraryState {
  return {
    entityIds: withId(state.entityIds, resource.entityId),
    resourceIds: withId(state.resourceIds, resource.id),
  }
}

/** Dropping a document leaves the publisher followed: the two are separate claims. */
export function removeResource(state: LibraryState, resourceId: string): LibraryState {
  return { ...state, resourceIds: withoutId(state.resourceIds, resourceId) }
}

export function hasEntity(state: LibraryState, entityId: string): boolean {
  return state.entityIds.includes(entityId)
}

export function hasResource(state: LibraryState, resourceId: string): boolean {
  return state.resourceIds.includes(resourceId)
}

/** The library's documents, in the order they appear in the catalogue. */
export function libraryResources(state: LibraryState, resources: SourceResource[]): SourceResource[] {
  const taken = new Set(state.resourceIds)
  return resources.filter(r => taken.has(r.id))
}

/** The library's publishers, in catalogue order. */
export function libraryEntities(state: LibraryState, entities: SourceEntity[]): SourceEntity[] {
  const taken = new Set(state.entityIds)
  return entities.filter(e => taken.has(e.id))
}
