/**
 * **Where the reader came from** — the app's own record of the history stack,
 * so every way back in the app can go back to the page the reader actually
 * left rather than to a parent someone hardcoded.
 *
 * The browser keeps the history but won't say what is in it. So `PaperRouter`
 * records each entry as the reader arrives on it, by the index the router
 * already writes into `history.state` (`idx`): a link lays a new entry at the
 * next index and drops everything past it, a redirect overwrites the entry it
 * is on, and Back/Forward move along the entries that are there. With that,
 * a back control asks `backTarget` for the nearest earlier entry that is a
 * different *page* — a filter, a `?concept=` popup or a hash on the same page
 * is the same place — and either:
 *
 * - goes **Back** to it (`navigate(delta)`), which is the browser's own Back:
 *   the history stays one coherent stack, the page comes back scrolled where it
 *   was left (`routeScrollMemory.ts`) with its filters and search intact, and
 *   the move is drawn as a sheet swiped off (`viewTransition.ts`); or
 * - when the reader arrived from outside the app (a search result, a bookmark,
 *   a reload past what the record holds), goes **up** to the page's logical
 *   parent — the fallback each surface names — the way it always did.
 *
 * The control names the place either way: `placeLabel` reads a name off the
 * path, and a page that knows a better one (an exam's builder, a Cowork
 * source, a project brief) writes it onto its own entry (`labelEntry`).
 *
 * The record is mirrored to sessionStorage — per tab, like the history it
 * describes — and checked against the entry's key whenever the reader lands on
 * an index the record didn't see them leave, so a record from another visit is
 * never trusted. Pure; `hooks/useBack.ts` is the React half.
 */

import { examDisplayName, fromSlug } from './wikiRoutes'

export interface TrailEntry {
  /** The router's key for the history entry. */
  key: string
  /** pathname + search + hash — everything needed to say, and to rebuild, the place. */
  path: string
  /** A name the page gave itself, better than one read off the path. */
  label?: string
}

export interface NavTrail {
  /** Entries by history index; null where the record has nothing. */
  entries: (TrailEntry | null)[]
  /** The index of the entry on screen. */
  index: number
}

export type TrailAction = 'PUSH' | 'POP' | 'REPLACE'

const STORAGE_KEY = 'nav-trail'
/** Entries kept — a session's worth of Back. */
const MAX_ENTRIES = 200

export function emptyTrail(): NavTrail {
  return { entries: [], index: 0 }
}

function pathnameOf(path: string): string {
  const bare = path.split(/[?#]/)[0] || '/'
  return bare.length > 1 ? bare.replace(/\/+$/, '') || '/' : bare
}

function cap(entries: (TrailEntry | null)[], index: number): (TrailEntry | null)[] {
  if (entries.length <= MAX_ENTRIES) return entries
  // Forget the oldest; keep the indexes where they are.
  const cut = Math.max(0, Math.min(index, entries.length) - MAX_ENTRIES + 1)
  return entries.map((e, i) => (i < cut ? null : e))
}

/**
 * The record after the reader arrives on `entry` at history index `index`.
 *
 * `fresh` marks a document that loaded onto an entry the router had never
 * stamped (a typed URL, a link from another site): nothing before it is the
 * app's, whatever the record says.
 */
export function recordArrival(
  trail: NavTrail,
  index: number,
  entry: TrailEntry,
  action: TrailAction,
  fresh = false,
): NavTrail {
  if (!Number.isInteger(index) || index < 0) return trail
  if (fresh) {
    const entries: (TrailEntry | null)[] = Array(index).fill(null)
    entries[index] = entry
    return { entries, index }
  }
  const known = trail.entries[index] ?? null
  let entries: (TrailEntry | null)[]
  if (action === 'PUSH') {
    entries = trail.entries.slice(0, index)
    while (entries.length < index) entries.push(null)
    entries[index] = entry
  } else if (action === 'REPLACE') {
    entries = trail.entries.slice()
    while (entries.length < index) entries.push(null)
    entries[index] = entry
  } else if (known && known.key === entry.key) {
    // Back or Forward onto an entry the record saw: keep what it knew.
    entries = trail.entries.slice()
    entries[index] = { ...entry, label: entry.label ?? known.label }
  } else {
    // An entry the record doesn't know — another visit's, or a gap. Nothing
    // around it can be trusted to be what is in the history now.
    entries = Array(index).fill(null)
    entries[index] = entry
  }
  return { entries: cap(entries, index), index }
}

/** Write the name a page gives itself onto its own entry. */
export function labelEntry(trail: NavTrail, key: string, label: string | undefined): NavTrail {
  const current = trail.entries[trail.index]
  if (!current || current.key !== key || current.label === label) return trail
  const entries = trail.entries.slice()
  entries[trail.index] = { ...current, label }
  return { ...trail, entries }
}

export interface BackTarget {
  /** How far back it is, as `navigate()` takes it (always negative). */
  delta: number
  entry: TrailEntry
}

export interface BackOptions {
  /**
   * Places that are not somewhere to go back *to* from this page — the review
   * screen skips the quiz it reviewed, which would only start a new one.
   */
  skip?: (path: string) => boolean
  /**
   * The only place this page goes back to. The page left is the target when
   * it passes, and otherwise there is none and the control leads up to its
   * fallback — an exam's study guide always returns to the exam list, never
   * to the Dashboard or quiz it was opened from.
   */
  only?: (path: string) => boolean
}

/** The sign-in screens: never a place to go back to. */
function isAuthPath(pathname: string): boolean {
  return pathname === '/auth' || pathname.startsWith('/auth/')
}

/**
 * The page the reader came from: the nearest earlier entry on another page
 * (and not one `skip` rules out), or null when the record doesn't reach one —
 * the reader came in from outside the app, so the surface's fallback applies.
 */
export function backTarget(trail: NavTrail, options: BackOptions = {}): BackTarget | null {
  const current = trail.entries[trail.index]
  if (!current) return null
  const here = pathnameOf(current.path)
  for (let i = trail.index - 1; i >= 0; i--) {
    const entry = trail.entries[i]
    // A gap: what lies behind it isn't known to be the app's.
    if (!entry) return null
    const there = pathnameOf(entry.path)
    if (there === here || isAuthPath(there)) continue
    if (options.skip?.(entry.path)) continue
    if (options.only && !options.only(entry.path)) return null
    return { delta: i - trail.index, entry }
  }
  return null
}

const STATIC_LABELS: Record<string, string> = {
  '/': 'Quiz',
  '/dashboard': 'Dashboard',
  '/wiki': 'Study Guides',
  '/wiki/resources': 'Resources',
  '/flashcards': 'Flashcards',
  '/search': 'Search',
  '/quiz': 'Quiz',
  '/review': 'Review',
  '/games': 'Games',
  '/battle': 'Quiz Battle',
  '/craft': 'Concept Craft',
  '/project': 'Projects',
  '/store': 'Store',
  '/store/gems': 'Gem Shop',
  '/settings': 'Settings',
  '/upgrade': 'Upgrade',
  '/research': 'Research',
  '/cowork': 'Sources',
  '/cowork/sources': 'Sources',
  '/cowork/workflows': 'Workflows',
  '/actuaria': 'Actuaria',
  '/actuaria/map': 'Star map',
  '/actuaria/battle': 'Monte Carlo Station',
  '/actuaria/daily': 'Daily',
  '/actuaria/cohort': 'Cohort',
  '/actuaria/hangar': 'Hangar',
}

/** What a place is called, read off its path alone. */
export function placeLabel(path: string): string {
  const pathname = pathnameOf(path)
  const fixed = STATIC_LABELS[pathname]
  if (fixed) return fixed
  const wiki = /^\/wiki\/(exam|concept|resource)\/(.+)$/.exec(pathname)
  if (wiki) {
    try {
      const name = fromSlug(wiki[2]!)
      return wiki[1] === 'exam' ? examDisplayName(name) : name
    } catch {
      return 'Study Guides'
    }
  }
  if (pathname.startsWith('/wiki/question/')) return 'Question'
  if (pathname.startsWith('/project/')) return 'Project'
  if (pathname.startsWith('/craft/')) return 'Concept Craft'
  if (pathname.startsWith('/cowork/sources/')) return 'Source'
  if (pathname.startsWith('/actuaria/sector')) return 'Sector'
  if (pathname.startsWith('/actuaria/simulation')) return 'Simulation'
  if (pathname.startsWith('/actuaria/raid')) return 'Raid'
  if (pathname.startsWith('/actuaria/')) return 'Actuaria'
  if (pathname.startsWith('/research/')) return 'Research'
  return 'Back'
}

/** An entry's name: the one its page gave it, or the one its path says. */
export function entryLabel(entry: TrailEntry): string {
  return entry.label || placeLabel(entry.path)
}

export function loadTrail(storage: Pick<Storage, 'getItem'> | undefined): NavTrail {
  try {
    const raw = storage?.getItem(STORAGE_KEY)
    if (!raw) return emptyTrail()
    const parsed = JSON.parse(raw) as Partial<NavTrail>
    const index = typeof parsed.index === 'number' && Number.isInteger(parsed.index) && parsed.index >= 0 ? parsed.index : 0
    const entries = Array.isArray(parsed.entries)
      ? parsed.entries.map(e => {
        if (typeof e !== 'object' || e === null) return null
        const { key, path, label } = e as Partial<TrailEntry>
        if (typeof key !== 'string' || typeof path !== 'string') return null
        return typeof label === 'string' ? { key, path, label } : { key, path }
      })
      : []
    return { entries, index }
  } catch {
    return emptyTrail()
  }
}

export function saveTrail(storage: Pick<Storage, 'setItem'> | undefined, trail: NavTrail): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(trail))
  } catch { /* storage full or blocked: the in-memory copy still works */ }
}
