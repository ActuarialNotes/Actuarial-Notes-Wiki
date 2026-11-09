// The tools a reader used last, for the catalogue's "Pick up where you left
// off" (docs/tool-template-v3.md §5): each tool's answer as its page last
// showed it. This device only (localStorage, R7), like the drafts the pages
// keep; the pure merge is tested, the storage wrapped so a blocked store reads
// as empty.

export interface RecentTool {
  slug: string
  /** The answer as the page printed it: "1,077.95". */
  value: string
  at: number
}

const KEY = 'actuarial_tools_recent_v1'
export const RECENT_MAX = 6

/** The list with this tool's latest answer at its head, once, and no longer than RECENT_MAX. */
export function withRecent(list: readonly RecentTool[], entry: RecentTool): RecentTool[] {
  return [entry, ...list.filter(r => r.slug !== entry.slug)].slice(0, RECENT_MAX)
}

/** A stored list read back, anything malformed dropped. */
export function parseRecent(text: string | null): RecentTool[] {
  if (!text) return []
  try {
    const raw = JSON.parse(text) as unknown
    if (!Array.isArray(raw)) return []
    return raw
      .filter((r): r is RecentTool => !!r && typeof r === 'object' && typeof (r as RecentTool).slug === 'string' && typeof (r as RecentTool).value === 'string' && typeof (r as RecentTool).at === 'number')
      .slice(0, RECENT_MAX)
  } catch {
    return []
  }
}

export function readRecent(): RecentTool[] {
  try {
    return parseRecent(window.localStorage.getItem(KEY))
  } catch {
    return []
  }
}

export function recordRecent(slug: string, value: string): void {
  try {
    const list = readRecent()
    if (list[0]?.slug === slug && list[0].value === value) return
    window.localStorage.setItem(KEY, JSON.stringify(withRecent(list, { slug, value, at: Date.now() })))
  } catch {
    // A private window or blocked storage: nothing to remember.
  }
}
