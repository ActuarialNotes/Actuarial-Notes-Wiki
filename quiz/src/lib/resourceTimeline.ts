// Pure helpers for the Resources heatmap/timeline. The raw, dated entries are
// produced at build time by the `virtual:resource-timeline` Vite plugin (see
// quiz/vite.config.ts) from the markdown vault:
//   - Resources/Books        → books (usually year-only dates)
//   - Resources/Events       → historical milestones
//   - Resources/Regulation   → regulation & accounting standards
// A future Resources/Benchmarks (OSFI PC-1) directory flows through the same path.
//
// Nothing here imports the virtual module, so every function below is unit
// testable in isolation (see resourceTimeline.test.ts).

import type { WikiEntryRef } from '@/lib/wikiRoutes'

export type TimelineKind = 'book' | 'event' | 'regulation' | 'benchmark'

/** Shape emitted by the build-time plugin. */
export interface TimelineRawEntry {
  id: string
  kind: TimelineKind
  /** 'YYYY-MM-DD' (full date) or 'YYYY' (year-only). */
  date: string
  title: string
  name: string
  path: string
  summary?: string
  jurisdiction?: string
  lob?: string[]
  impactLevel?: string
  status?: string
  issuingBody?: string
  author?: string
  publisher?: string
  edition?: string
  year?: number
  coverImage?: string
}

/** Normalised entry with year/month resolved for grid placement. */
export interface TimelineEntry extends TimelineRawEntry {
  year: number
  /** 0–11, or null when only a year is known (e.g. a textbook edition). */
  month: number | null
}

/** Earliest year shown on the heatmap. Data before ~1950 is intentionally sparse. */
export const TIMELINE_MIN_YEAR = 1700

/**
 * Parse a raw date string into a year and (optional) month index.
 * Year-only values ('2019') resolve to month = null; these are placed in the
 * January row of the grid by convention but rendered without a month elsewhere.
 */
export function parseEntryDate(date: string): { year: number; month: number | null } {
  const trimmed = (date ?? '').trim()
  const yearOnly = /^(\d{4})$/.exec(trimmed)
  if (yearOnly) return { year: parseInt(yearOnly[1], 10), month: null }
  const full = /^(\d{4})-(\d{2})/.exec(trimmed)
  if (full) {
    const month = parseInt(full[2], 10) - 1
    return { year: parseInt(full[1], 10), month: month >= 0 && month <= 11 ? month : null }
  }
  // Last resort: pull the first 4-digit run as a year.
  const loose = /(\d{4})/.exec(trimmed)
  return { year: loose ? parseInt(loose[1], 10) : NaN, month: null }
}

/** Stable key for a (year, month) cell. Year-only entries land in month 0. */
export function monthKey(year: number, month: number | null): string {
  return `${year}-${String((month ?? 0) + 1).padStart(2, '0')}`
}

/** Resolve raw entries to grid-ready entries, dropping any with an unparseable year. */
export function toTimelineEntries(raw: TimelineRawEntry[]): TimelineEntry[] {
  const out: TimelineEntry[] = []
  for (const e of raw) {
    const { year, month } = parseEntryDate(e.date)
    if (!Number.isFinite(year)) continue
    out.push({ ...e, year, month })
  }
  return out
}

/** Count of entries per month cell, keyed by monthKey(). */
export function buildMonthCounts(entries: TimelineEntry[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const e of entries) {
    const key = monthKey(e.year, e.month)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}

/** Tie-break order for entries that land in the same cell or share a date. */
const KIND_ORDER: Record<TimelineKind, number> = { event: 0, regulation: 1, benchmark: 2, book: 3 }

/** All entries for a given (year, month) cell, sorted books-last then by title. */
export function entriesForMonth(
  entries: TimelineEntry[],
  year: number,
  month: number,
): TimelineEntry[] {
  return entries
    .filter(e => e.year === year && (e.month ?? 0) === month)
    .sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.title.localeCompare(b.title))
}

/** All entries, most recent first — used for the "All resources" list view. */
export function entriesNewestFirst(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) =>
    b.date.localeCompare(a.date) || KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.title.localeCompare(b.title),
  )
}

/** The most recent (year, month) cell that has at least one entry, if any. */
export function latestPopulatedMonth(entries: TimelineEntry[]): { year: number; month: number } | null {
  let best: { year: number; month: number } | null = null
  for (const e of entries) {
    const m = e.month ?? 0
    if (!best || e.year > best.year || (e.year === best.year && m > best.month)) {
      best = { year: e.year, month: m }
    }
  }
  return best
}

/**
 * Keyword search over timeline entries (title, name, summary, issuing body,
 * author, publisher, jurisdiction, status). Every whitespace-separated term in
 * `query` must match somewhere (AND semantics); a blank query matches nothing.
 */
export function searchTimelineEntries(entries: TimelineEntry[], query: string): TimelineEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []
  return entries.filter(entry => {
    const haystack = [
      entry.title,
      entry.name,
      entry.summary,
      entry.issuingBody,
      entry.author,
      entry.publisher,
      entry.jurisdiction,
      entry.status,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return terms.every(term => haystack.includes(term))
  })
}

// Map a timeline entry to a popup-viewer ref. Books open as 'resource' (so the
// metadata card renders); events/regulation open via their explicit repo path,
// which also handles the `type: event` file that lives in Resources/Regulation/.
export function entryToRef(entry: TimelineEntry): WikiEntryRef {
  const kind: WikiEntryRef['kind'] =
    entry.kind === 'book' || entry.kind === 'benchmark' ? 'resource'
    : entry.kind === 'regulation' ? 'regulation'
    : 'event'
  return { kind, name: entry.name, path: entry.path }
}
