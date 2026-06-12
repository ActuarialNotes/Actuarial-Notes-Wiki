// Applies the shared Research-tab filters (researchStore.filters) to the
// Resources timeline/heatmap entries. Pure and unit-testable, mirroring the
// style of resourceTimeline.ts — see resourceTimelineFilters.test.ts.

import type { TimelineEntry } from './resourceTimeline'
import type { ResearchFilters } from '@/stores/researchStore'
import { agentMeta } from './researchOntology'

/** Maps a raw `lob` frontmatter value to its canonical line-of-business slug. */
const LOB_ALIASES: Record<string, string> = {
  'auto-personal': 'personal_auto',
  'auto-commercial': 'commercial_auto',
}

/**
 * Extract the province code from a "CA-XX" jurisdiction string (e.g.
 * "CA-ON" -> "ON"). Federal/international jurisdictions ("CA", "US", "UK",
 * "Global") have no associated province and resolve to null.
 */
export function provinceFromJurisdiction(jurisdiction?: string): string | null {
  if (!jurisdiction) return null
  const m = /^CA-([A-Z]{2,3})$/.exec(jurisdiction.trim())
  return m ? m[1] : null
}

function matchesAgents(entry: TimelineEntry, agentIds: string[]): boolean {
  if (agentIds.length === 0) return true
  if (!entry.issuingBody) return false
  return agentIds.some(id => {
    const meta = agentMeta(id)
    if (!meta) return false
    return entry.issuingBody!.includes(meta.shortName) || entry.issuingBody!.includes(meta.legalName)
  })
}

function matchesProvinces(entry: TimelineEntry, provinces: string[]): boolean {
  if (provinces.length === 0) return true
  const province = provinceFromJurisdiction(entry.jurisdiction)
  return province !== null && provinces.includes(province)
}

function matchesLinesOfBusiness(entry: TimelineEntry, lobs: string[]): boolean {
  if (lobs.length === 0) return true
  if (!entry.lob) return false
  return entry.lob.some(raw => {
    const slug = LOB_ALIASES[raw.toLowerCase()]
    return slug !== undefined && lobs.includes(slug)
  })
}

function matchesDateRange(entry: TimelineEntry, dateFrom: string | null, dateTo: string | null): boolean {
  if (dateFrom && entry.date < dateFrom) return false
  if (dateTo && entry.date > dateTo) return false
  return true
}

function matchesDocTypes(entry: TimelineEntry, docTypes: string[]): boolean {
  if (docTypes.length === 0) return true
  return docTypes.includes(entry.kind)
}

/** Narrow timeline entries down to those matching the active Research filters. */
export function filterTimelineEntries(entries: TimelineEntry[], filters: ResearchFilters): TimelineEntry[] {
  return entries.filter(entry =>
    matchesDocTypes(entry, filters.docTypes) &&
    matchesAgents(entry, filters.agentIds) &&
    matchesProvinces(entry, filters.provinces) &&
    matchesLinesOfBusiness(entry, filters.linesOfBusiness) &&
    matchesDateRange(entry, filters.dateFrom, filters.dateTo),
  )
}
