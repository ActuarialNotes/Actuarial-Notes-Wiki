import { isYouRoute } from './you'

/**
 * The four places (docs/redesign-spec.md R2, §8 Phase F): Today, Learn,
 * Practice and Apply, in the order of the path a learner walks. They are a bar
 * at the bottom of a phone and a rail down the left of a wide screen
 * (`components/nav/Places.tsx`); the profile button beside them opens You.
 *
 * This module is the one place that says which place a path belongs to, where
 * the phone's bar is drawn, and which pages draw their own top row. Pure.
 */

export type PlaceId = 'today' | 'learn' | 'practice' | 'apply'

export interface Place {
  id: PlaceId
  label: string
  /** The place's home. Learn's is the exam in focus's study guide when there is one (`learnTarget`). */
  to: string
}

export const PLACES: readonly Place[] = [
  { id: 'today', label: 'Today', to: '/dashboard' },
  { id: 'learn', label: 'Learn', to: '/wiki' },
  { id: 'practice', label: 'Practice', to: '/' },
  { id: 'apply', label: 'Apply', to: '/apply' },
]

function isUnder(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`)
}

const PRACTICE_ROUTES = ['/papers', '/flashcards', '/search', '/quiz', '/review', '/games', '/battle', '/craft']
const APPLY_ROUTES = ['/apply', '/project', '/tools', '/workflows', '/data-sources']

/**
 * The place a path is in, or null for a page that belongs to none: You and
 * what is behind it (the Store, Community, Upgrade), and signing in.
 */
export function placeOf(pathname: string): PlaceId | null {
  if (pathname === '/') return 'practice'
  if (isUnder(pathname, '/dashboard')) return 'today'
  if (isUnder(pathname, '/wiki') || isUnder(pathname, '/research')) return 'learn'
  if (PRACTICE_ROUTES.some(route => isUnder(pathname, route))) return 'practice'
  if (APPLY_ROUTES.some(route => isUnder(pathname, route))) return 'apply'
  return null
}

/**
 * The session (docs/redesign-spec.md §5): a quiz and its results. No rail, no
 * bar and no top row, on every width; the question screen's own top row has
 * the way out.
 */
export function isSessionRoute(pathname: string): boolean {
  return pathname === '/quiz' || pathname === '/review'
}

/**
 * Whether the phone's place bar is drawn under a page.
 *
 * It is on every page a reader moves between places from. It is off a screen
 * that owns the bottom edge or the whole screen, each of which has its own way
 * back: the session, a game's board, You's three screens (a cross or a back
 * arrow), a concept or a question being read and a tool being used (their
 * foot is Practice this), the flashcards and the search (sheets over
 * Practice), a project being worked and a workflow's board.
 */
export function showsPlaceBar(pathname: string): boolean {
  if (isSessionRoute(pathname)) return false
  if (isYouRoute(pathname)) return false
  if (isUnder(pathname, '/auth') || isUnder(pathname, '/design')) return false
  if (isUnder(pathname, '/battle') || isUnder(pathname, '/craft')) return false
  if (pathname === '/flashcards' || pathname === '/search') return false
  if (pathname.startsWith('/wiki/concept/') || pathname.startsWith('/wiki/question/')) return false
  if (pathname.startsWith('/tools/')) return false
  if (pathname.startsWith('/project/')) return false
  if (pathname.startsWith('/workflows/')) return false
  return true
}

/**
 * Whether a page draws the top row of a phone itself.
 *
 * Below `lg` every page opens on one row. A page that has one of its own (the
 * exam and the profile button on Today and Practice, a search bar, a back
 * arrow and a title) draws it; every other page gets the app's
 * (`PlaceHeader`): the exam in focus and the profile button. `App.tsx` reads
 * this to decide whether to draw that row, so a route added here must draw a
 * top row of its own or it ends up with none.
 */
export function drawsOwnTopRow(pathname: string): boolean {
  if (isSessionRoute(pathname)) return true
  // Practice's home and Today: the exam switcher and the profile button.
  if (pathname === '/' || pathname === '/dashboard') return true
  // Practice's own screens: a back arrow to Practice and a title.
  if (pathname === '/flashcards' || pathname === '/papers' || pathname === '/search') return true
  // A project attempt and a brief (their top bars). The list of projects is a plain page.
  if (pathname.startsWith('/project/')) return true
  // The Concept Craft board, and the topic links that open it.
  if (isUnder(pathname, '/craft')) return true
  // The Store's search bar; the Gem Shop under it is a plain page.
  if (pathname === '/store') return true
  // Tools, Workflows and Data Sources: a search bar or a board's header.
  if (isUnder(pathname, '/tools') || isUnder(pathname, '/workflows') || isUnder(pathname, '/data-sources')) return true
  // You's three screens: a cross or a back arrow.
  if (isYouRoute(pathname)) return true
  // The study guides and the flag-gated research tab: a search bar on every page.
  return isUnder(pathname, '/wiki') || isUnder(pathname, '/research')
}

function bare(path: string): string {
  const pathname = path.split(/[?#]/)[0] || '/'
  try { return decodeURI(pathname) } catch { return pathname }
}

/**
 * Where Learn leads. Its home is the study guide of the exam in focus (`home`,
 * null for a reader with no exam), and Study Guides, the list above it, is one
 * step up. From another place it returns to the page last read in Learn; from
 * inside Learn it goes home; and from home it goes up to Study Guides, so the
 * place is always a way out of the page showing.
 */
export function learnTarget(pathname: string, lastPath: string | null, home: string | null): string {
  const here = bare(pathname)
  if (placeOf(here) === 'learn') {
    return home && bare(home) !== here ? home : '/wiki'
  }
  if (lastPath && placeOf(bare(lastPath)) === 'learn') return lastPath
  return home ?? '/wiki'
}
