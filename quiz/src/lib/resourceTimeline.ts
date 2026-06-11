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

/** All entries for a given (year, month) cell, sorted books-last then by title. */
export function entriesForMonth(
  entries: TimelineEntry[],
  year: number,
  month: number,
): TimelineEntry[] {
  const kindOrder: Record<TimelineKind, number> = { event: 0, regulation: 1, benchmark: 2, book: 3 }
  return entries
    .filter(e => e.year === year && (e.month ?? 0) === month)
    .sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind] || a.title.localeCompare(b.title))
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
