// The reader's recent searches, kept in this browser: what the one search
// offers before anything is typed (pages/Search.tsx). A search is remembered
// when it led somewhere (a result opened, a practice started, Enter pressed),
// not on every keystroke, so the list holds whole queries.

export const RECENT_SEARCHES_KEY = 'actuarial_recent_searches'

/** How many are kept. */
export const RECENT_SEARCHES_MAX = 6

/** `list` with `term` at its head: trimmed, once only whatever its case, the oldest dropped. */
export function withRecentSearch(list: readonly string[], term: string, max = RECENT_SEARCHES_MAX): string[] {
  const clean = term.replace(/\s+/g, ' ').trim()
  if (clean.length < 2) return [...list]
  const rest = list.filter(t => t.toLowerCase() !== clean.toLowerCase())
  return [clean, ...rest].slice(0, max)
}

/** What storage holds, read as a list of terms; anything else is no list. */
export function parseRecentSearches(raw: string | null, max = RECENT_SEARCHES_MAX): string[] {
  if (!raw) return []
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value.filter((t): t is string => typeof t === 'string' && t.trim().length >= 2).slice(0, max)
  } catch {
    return []
  }
}

export function loadRecentSearches(): string[] {
  try { return parseRecentSearches(localStorage.getItem(RECENT_SEARCHES_KEY)) } catch { return [] }
}

export function saveRecentSearches(list: readonly string[]): void {
  try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list)) } catch { /* not kept */ }
}
