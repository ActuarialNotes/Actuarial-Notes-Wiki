import { describe, it, expect } from 'vitest'
import {
  parseEntryDate,
  monthKey,
  toTimelineEntries,
  buildMonthCounts,
  entriesForMonth,
  latestPopulatedMonth,
  searchTimelineEntries,
  entryToRef,
  type TimelineRawEntry,
} from './resourceTimeline'

function raw(partial: Partial<TimelineRawEntry> & { date: string; title: string }): TimelineRawEntry {
  return {
    id: partial.id ?? partial.title,
    kind: partial.kind ?? 'event',
    name: partial.name ?? partial.title,
    path: partial.path ?? `Resources/X/${partial.title}.md`,
    ...partial,
  }
}

describe('parseEntryDate', () => {
  it('parses a full ISO date to a zero-based month', () => {
    expect(parseEntryDate('1965-03-18')).toEqual({ year: 1965, month: 2 })
  })
  it('parses a year-month date', () => {
    expect(parseEntryDate('1987-07')).toEqual({ year: 1987, month: 6 })
  })
  it('treats a bare year as month-less', () => {
    expect(parseEntryDate('2019')).toEqual({ year: 2019, month: null })
  })
  it('falls back to the first 4-digit run for noisy input', () => {
    expect(parseEntryDate('circa 1774 AD')).toEqual({ year: 1774, month: null })
  })
  it('returns NaN year for unparseable input', () => {
    expect(parseEntryDate('n/a').year).toBeNaN()
  })
})

describe('monthKey', () => {
  it('pads the month and lands year-only entries in January', () => {
    expect(monthKey(1987, 6)).toBe('1987-07')
    expect(monthKey(2019, null)).toBe('2019-01')
  })
})

describe('toTimelineEntries', () => {
  it('resolves year/month and drops entries with no parseable year', () => {
    const entries = toTimelineEntries([
      raw({ date: '1965-03-18', title: 'CIA' }),
      raw({ date: '2019', title: 'Ross', kind: 'book' }),
      raw({ date: 'n/a', title: 'bad' }),
    ])
    expect(entries).toHaveLength(2)
    expect(entries[0]).toMatchObject({ year: 1965, month: 2 })
    expect(entries[1]).toMatchObject({ year: 2019, month: null })
  })
})

describe('buildMonthCounts', () => {
  it('counts entries per cell, bucketing year-only into January', () => {
    const counts = buildMonthCounts(toTimelineEntries([
      raw({ date: '2019-01-10', title: 'a' }),
      raw({ date: '2019', title: 'b', kind: 'book' }),     // → 2019-01
      raw({ date: '2019-05-02', title: 'c' }),
    ]))
    expect(counts.get('2019-01')).toBe(2)
    expect(counts.get('2019-05')).toBe(1)
    expect(counts.get('2019-09')).toBeUndefined()
  })
})

describe('entriesForMonth', () => {
  it('returns the cell entries with events before books', () => {
    const entries = toTimelineEntries([
      raw({ date: '1987-07', title: 'Book Z', kind: 'book' }),
      raw({ date: '1987-07-02', title: 'OSFI', kind: 'regulation' }),
      raw({ date: '1987-07-15', title: 'Milestone', kind: 'event' }),
      raw({ date: '1990-01-01', title: 'Other', kind: 'event' }),
    ])
    const cell = entriesForMonth(entries, 1987, 6)
    expect(cell.map(e => e.title)).toEqual(['Milestone', 'OSFI', 'Book Z'])
  })
})

describe('latestPopulatedMonth', () => {
  it('finds the most recent cell with data', () => {
    const entries = toTimelineEntries([
      raw({ date: '1762-09-07', title: 'old' }),
      raw({ date: '2023-01-01', title: 'newer' }),
      raw({ date: '2010-09-01', title: 'mid' }),
    ])
    expect(latestPopulatedMonth(entries)).toEqual({ year: 2023, month: 0 })
  })
  it('returns null for no entries', () => {
    expect(latestPopulatedMonth([])).toBeNull()
  })
})

describe('searchTimelineEntries', () => {
  const entries = toTimelineEntries([
    raw({
      date: '2026-07-01',
      title: 'Ontario Auto Insurance Reform',
      issuingBody: 'Financial Services Regulatory Authority of Ontario (FSRA)',
      summary: 'Transition to SABS optionality.',
      kind: 'regulation',
    }),
    raw({
      date: '2026-06-09',
      title: 'Domestic Stability Buffer Letter',
      issuingBody: 'Office of the Superintendent of Financial Institutions (OSFI)',
      summary: 'Maintains the buffer at 3.50%.',
      kind: 'regulation',
    }),
    raw({ date: '2019', title: 'Loss Models', kind: 'book', author: 'Klugman' }),
  ])

  it('matches case-insensitively across title, summary, and issuing body', () => {
    expect(searchTimelineEntries(entries, 'osfi').map(e => e.title)).toEqual(['Domestic Stability Buffer Letter'])
    expect(searchTimelineEntries(entries, 'sabs').map(e => e.title)).toEqual(['Ontario Auto Insurance Reform'])
    expect(searchTimelineEntries(entries, 'klugman').map(e => e.title)).toEqual(['Loss Models'])
  })

  it('requires every whitespace-separated term to match (AND semantics)', () => {
    expect(searchTimelineEntries(entries, 'ontario auto').map(e => e.title)).toEqual(['Ontario Auto Insurance Reform'])
    expect(searchTimelineEntries(entries, 'osfi reform')).toEqual([])
  })

  it('returns nothing for a blank query', () => {
    expect(searchTimelineEntries(entries, '   ')).toEqual([])
  })
})

describe('entryToRef', () => {
  it('maps books and benchmarks to the resource kind', () => {
    const [book] = toTimelineEntries([
      raw({ date: '2019', title: 'Loss Models', kind: 'book', name: 'Loss Models', path: 'Resources/Books/Loss Models.md' }),
    ])
    expect(entryToRef(book)).toEqual({ kind: 'resource', name: 'Loss Models', path: 'Resources/Books/Loss Models.md' })
  })

  it('maps regulation and events to their own kinds, preserving the explicit path', () => {
    const [reg] = toTimelineEntries([
      raw({ date: '2026-07-01', title: 'SABS Reform', kind: 'regulation', name: 'SABS Reform', path: 'Resources/Regulation/SABS Reform.md' }),
    ])
    expect(entryToRef(reg)).toEqual({ kind: 'regulation', name: 'SABS Reform', path: 'Resources/Regulation/SABS Reform.md' })

    const [evt] = toTimelineEntries([
      raw({ date: '1965-03-18', title: 'CIA Founded', kind: 'event', name: 'CIA Founded', path: 'Resources/Events/CIA Founded.md' }),
    ])
    expect(entryToRef(evt)).toEqual({ kind: 'event', name: 'CIA Founded', path: 'Resources/Events/CIA Founded.md' })
  })
})
