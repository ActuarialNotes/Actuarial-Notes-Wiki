// A long list shown a page at a time: the first `PAGE_SIZE` items, then a
// **Show more** button that adds another page (components/ShowMore.tsx,
// hooks/usePagedList.ts). The Resources shelf drew all of its 800-odd cards at
// once, which on a phone was a page over a hundred screens long; a reader
// narrows a list with its filters, and the list only has to show enough to
// tell whether the filters found the right thing.
//
// How many are showing is remembered per list and per filter choice for the
// browser session, so coming Back to a list finds as much of it open as was
// left, and the scroll position the router restores still lands on a card.

export const PAGE_SIZE = 24

/** How many items to show: a stored count, floored at one page and capped at the list. */
export function shownCount(stored: unknown, total: number, size = PAGE_SIZE): number {
  const n = typeof stored === 'number' && Number.isFinite(stored) ? Math.floor(stored) : size
  return Math.min(total, Math.max(size, n))
}

/** The count after one more page. */
export function nextShownCount(count: number, total: number, size = PAGE_SIZE): number {
  return Math.min(total, count + size)
}

/** How many the next press adds, for the button's label. */
export function nextPageSize(count: number, total: number, size = PAGE_SIZE): number {
  return Math.max(0, Math.min(size, total - count))
}

const PREFIX = 'actuarial_paged:'

export function loadShownCount(key: string, total: number, size = PAGE_SIZE): number {
  let stored: unknown = null
  try {
    const raw = sessionStorage.getItem(PREFIX + key)
    stored = raw === null ? null : Number(raw)
  } catch { /* private window: one page */ }
  return shownCount(stored, total, size)
}

export function saveShownCount(key: string, count: number): void {
  try { sessionStorage.setItem(PREFIX + key, String(count)) } catch { /* not kept */ }
}
