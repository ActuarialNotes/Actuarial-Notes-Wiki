import { describe, it, expect } from 'vitest'
import { provinceFromJurisdiction, filterTimelineEntries } from './resourceTimelineFilters'
import { toTimelineEntries, type TimelineRawEntry } from './resourceTimeline'
import type { ResearchFilters } from '@/stores/researchStore'

const EMPTY_FILTERS: ResearchFilters = {
  agentIds: [],
  docTypes: [],
  provinces: [],
  linesOfBusiness: [],
  dateFrom: null,
  dateTo: null,
}

function raw(partial: Partial<TimelineRawEntry> & { date: string; title: string }): TimelineRawEntry {
  return {
    id: partial.id ?? partial.title,
    kind: partial.kind ?? 'event',
    name: partial.name ?? partial.title,
    path: partial.path ?? `Resources/X/${partial.title}.md`,
    ...partial,
  }
}

describe('provinceFromJurisdiction', () => {
  it('extracts the province from a CA-XX jurisdiction', () => {
    expect(provinceFromJurisdiction('CA-ON')).toBe('ON')
  })
  it('returns null for federal/international jurisdictions', () => {
    expect(provinceFromJurisdiction('CA')).toBeNull()
    expect(provinceFromJurisdiction('UK')).toBeNull()
    expect(provinceFromJurisdiction(undefined)).toBeNull()
  })
})

describe('filterTimelineEntries', () => {
  const entries = toTimelineEntries([
    raw({ date: '2025-08-01', title: 'FSRA Filing Specs', kind: 'regulation', jurisdiction: 'CA-ON', issuingBody: 'Financial Services Regulatory Authority of Ontario (FSRA)', lob: ['Auto-Personal', 'Auto-Commercial'] }),
    raw({ date: '1987-07-02', title: 'Creation of OSFI', kind: 'regulation', jurisdiction: 'CA', issuingBody: 'Parliament of Canada', lob: ['Life', 'Health', 'P&C'] }),
    raw({ date: '2023-01-01', title: 'IFRS 17', kind: 'regulation', jurisdiction: 'Global', issuingBody: 'International Accounting Standards Board (IASB) / OSFI', lob: ['Life', 'Health', 'P&C'] }),
    raw({ date: '2019', title: 'A First Course in Probability', kind: 'book' }),
  ])

  it('returns all entries when no filters are active', () => {
    expect(filterTimelineEntries(entries, EMPTY_FILTERS)).toHaveLength(4)
  })

  it('filters by province via jurisdiction', () => {
    const result = filterTimelineEntries(entries, { ...EMPTY_FILTERS, provinces: ['ON'] })
    expect(result.map(e => e.title)).toEqual(['FSRA Filing Specs'])
  })

  it('filters by agent via issuing body', () => {
    const result = filterTimelineEntries(entries, { ...EMPTY_FILTERS, agentIds: ['osfi'] })
    expect(result.map(e => e.title)).toEqual(['IFRS 17'])
  })

  it('filters by line of business', () => {
    const result = filterTimelineEntries(entries, { ...EMPTY_FILTERS, linesOfBusiness: ['commercial_auto'] })
    expect(result.map(e => e.title)).toEqual(['FSRA Filing Specs'])
  })

  it('filters by date range, including year-only entries', () => {
    const result = filterTimelineEntries(entries, { ...EMPTY_FILTERS, dateFrom: '2024-01-01' })
    expect(result.map(e => e.title)).toEqual(['FSRA Filing Specs'])
  })
})
