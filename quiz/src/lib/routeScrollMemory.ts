/**
 * Where the window was scrolled to on each page the reader has left, and where
 * it should be when they arrive on one — the app's own scroll restoration.
 *
 * The browser's (`history.scrollRestoration = 'auto'`) can't be trusted with a
 * single-page app: it restores on `popstate`, before the page it is restoring
 * has rendered, so a page whose content arrives a frame later is clamped to
 * whatever height was there. And the pages that used to keep their own place
 * saved it as they unmounted — after `PaperRouter` had already scrolled the
 * window to the top for the page replacing them, so what they saved was 0.
 *
 * So the router records the position at the moment it is told the reader is
 * leaving (`rememberScroll`, before anything else moves), keyed by the history
 * entry being left, and decides on arrival (`arrivalScroll`):
 *
 * - **Back / Forward** return to where that entry was left.
 * - **A new page** opens at its top — unless the link says it leads back *up*
 *   to a page (`{ state: RESTORE_SCROLL }`: an exam's "All exams" arrow, a
 *   resource's "All resources"), which returns to where that page was last
 *   left, whichever entry that was.
 * - **The same page** (a filter in the query, a `?concept=` popup, a hash) is
 *   left alone, as is a redirect.
 *
 * The memory is mirrored to sessionStorage, so a reload comes back to its
 * place too. Pure apart from that; the router does the scrolling.
 */

import type { Action, Location } from '@remix-run/router'

/** Link state that asks for the page's last position rather than its top. */
export const RESTORE_SCROLL = { restoreScroll: true } as const

export interface ScrollMemory {
  /** Position per history entry (`Location.key` with its path — see `entryId`). */
  byKey: Record<string, number>
  /** Position per path, the last time any entry of it was left. */
  byPath: Record<string, number>
}

const STORAGE_KEY = 'route-scroll-memory'
/** Entries kept per map — a session's worth of Back, not the whole history. */
const MAX_ENTRIES = 100

export function emptyScrollMemory(): ScrollMemory {
  return { byKey: {}, byPath: {} }
}

/**
 * A history entry's id. The key alone isn't enough: an entry with no state of
 * its own (the first page of a tab, a URL typed into the address bar) is keyed
 * `default`, so two different pages can share it.
 */
function entryId(location: Pick<Location, 'key' | 'pathname'>): string {
  return `${location.key} ${location.pathname}`
}

function capped(map: Record<string, number>, key: string, top: number): Record<string, number> {
  const next = { ...map }
  // Re-inserted so the most recently left entries are the ones kept.
  delete next[key]
  next[key] = top
  const keys = Object.keys(next)
  for (const old of keys.slice(0, Math.max(0, keys.length - MAX_ENTRIES))) delete next[old]
  return next
}

/** Record where the page at `location` was left. */
export function rememberScroll(memory: ScrollMemory, location: Pick<Location, 'key' | 'pathname'>, top: number): ScrollMemory {
  const y = Math.max(0, Math.round(top))
  return {
    byKey: capped(memory.byKey, entryId(location), y),
    byPath: capped(memory.byPath, location.pathname, y),
  }
}

function wantsRestore(state: unknown): boolean {
  return typeof state === 'object' && state !== null && (state as { restoreScroll?: unknown }).restoreScroll === true
}

/**
 * Where to scroll on arriving at `to` from `from` (null on the first render),
 * or null to leave the window where it is.
 */
export function arrivalScroll(
  memory: ScrollMemory,
  from: Pick<Location, 'pathname'> | null,
  to: Pick<Location, 'key' | 'pathname' | 'hash' | 'state'>,
  action: Action,
): number | null {
  // A reload, or a link opened straight onto this page: back where this entry
  // was left if it ever was, and otherwise wherever the browser put it.
  if (!from) return memory.byKey[entryId(to)] ?? null
  if (from.pathname === to.pathname) return null
  if (action === 'POP') return memory.byKey[entryId(to)] ?? 0
  if (action === 'REPLACE') return null
  if (to.hash) return null
  if (wantsRestore(to.state)) return memory.byPath[to.pathname] ?? 0
  return 0
}

export function loadScrollMemory(storage: Pick<Storage, 'getItem'> | undefined): ScrollMemory {
  try {
    const raw = storage?.getItem(STORAGE_KEY)
    if (!raw) return emptyScrollMemory()
    const parsed = JSON.parse(raw) as Partial<ScrollMemory>
    const clean = (map: unknown): Record<string, number> => {
      const out: Record<string, number> = {}
      if (typeof map !== 'object' || map === null) return out
      for (const [k, v] of Object.entries(map)) if (typeof v === 'number' && Number.isFinite(v) && v >= 0) out[k] = v
      return out
    }
    return { byKey: clean(parsed.byKey), byPath: clean(parsed.byPath) }
  } catch {
    return emptyScrollMemory()
  }
}

export function saveScrollMemory(storage: Pick<Storage, 'setItem'> | undefined, memory: ScrollMemory): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(memory))
  } catch { /* storage full or blocked: the in-memory copy still works */ }
}
