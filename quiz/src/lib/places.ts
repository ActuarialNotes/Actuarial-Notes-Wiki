/**
 * The four places of the app, in the order of the path a learner walks
 * (docs/design-review.md §5.2): **Today** (the day's session), **Learn** (the
 * study guide and its readings), **Practice** (quiz, flashcards, games) and
 * **Apply** (tools, data, projects, workflows).
 *
 * The sidebar lists them as its four rows, each with its pages under it; on a
 * phone they are the bar at the bottom of the screen. This module is the one
 * place that says which place a path is in, which pages a place holds, and
 * where the bottom bar is put away. Everything that is not a step on the path
 * (the Store, Community, Settings) belongs to no place: it is behind the
 * avatar. Pure and tested.
 */

export type PlaceId = 'today' | 'learn' | 'practice' | 'apply'

/** A page listed under a place. */
export type PlacePageId =
  | 'exams' | 'resources' | 'research'
  | 'quiz' | 'flashcards' | 'games'
  | 'tools' | 'data-sources' | 'projects' | 'workflows'

export interface Place {
  id: PlaceId
  label: string
}

/** The places, in the order of the path. */
export const PLACES: readonly Place[] = [
  { id: 'today', label: 'Today' },
  { id: 'learn', label: 'Learn' },
  { id: 'practice', label: 'Practice' },
  { id: 'apply', label: 'Apply' },
]

export interface PlacePage {
  id: PlacePageId
  place: PlaceId
  label: string
  /** Where the page is. */
  to: string
}

/** What a reader can open decides which pages are listed. */
export interface PlaceAccess {
  /** The Research page (flag-gated, signed-in). */
  research?: boolean
  /** Games (Quiz Battle and Concept Craft), in development behind a flag. */
  games?: boolean
  /** Tools and Data Sources. */
  tools?: boolean
  /** Workflows, in Preview. */
  workflows?: boolean
}

const PAGES: readonly (PlacePage & { needs?: keyof PlaceAccess })[] = [
  { id: 'exams', place: 'learn', label: 'Exams', to: '/wiki' },
  { id: 'resources', place: 'learn', label: 'Resources', to: '/wiki/resources' },
  { id: 'research', place: 'learn', label: 'Research', to: '/research', needs: 'research' },
  { id: 'quiz', place: 'practice', label: 'Quiz', to: '/' },
  { id: 'flashcards', place: 'practice', label: 'Flashcards', to: '/flashcards' },
  { id: 'games', place: 'practice', label: 'Games', to: '/games', needs: 'games' },
  { id: 'tools', place: 'apply', label: 'Tools', to: '/tools', needs: 'tools' },
  { id: 'data-sources', place: 'apply', label: 'Data Sources', to: '/data-sources', needs: 'tools' },
  { id: 'projects', place: 'apply', label: 'Projects', to: '/project' },
  { id: 'workflows', place: 'apply', label: 'Workflows', to: '/workflows', needs: 'workflows' },
]

/** The pages a place lists, for a reader with this access. Today is one page and lists none. */
export function placePages(place: PlaceId, access: PlaceAccess = {}): PlacePage[] {
  return PAGES
    .filter(p => p.place === place && (!p.needs || access[p.needs] === true))
    .map(({ id, place: owner, label, to }) => ({ id, place: owner, label, to }))
}

function pathnameOf(path: string): string {
  const bare = path.split(/[?#]/)[0] || '/'
  return bare.length > 1 ? bare.replace(/\/+$/, '') || '/' : bare
}

function isUnder(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`)
}

/**
 * Which of a place's pages a path is on, or null for a path on none of them
 * (the Store, Settings, sign-in). A resource page is under Resources; an exam,
 * concept or question page under Exams. The quiz and its results are the Quiz
 * page's; Quiz Battle and Concept Craft are Games'.
 */
export function pageOf(path: string): PlacePageId | null {
  const p = pathnameOf(path)
  if (isUnder(p, '/wiki/resources') || isUnder(p, '/wiki/resource')) return 'resources'
  if (isUnder(p, '/wiki')) return 'exams'
  if (isUnder(p, '/research')) return 'research'
  if (p === '/' || p === '/quiz' || p === '/review') return 'quiz'
  if (p === '/flashcards') return 'flashcards'
  if (p === '/games' || p === '/battle' || isUnder(p, '/craft')) return 'games'
  if (isUnder(p, '/tools')) return 'tools'
  if (isUnder(p, '/data-sources')) return 'data-sources'
  if (isUnder(p, '/project')) return 'projects'
  if (isUnder(p, '/workflows')) return 'workflows'
  return null
}

/** Which place a path is in, or null for one behind the avatar. */
export function placeOf(path: string): PlaceId | null {
  if (pathnameOf(path) === '/dashboard') return 'today'
  const page = pageOf(path)
  return page ? PAGES.find(p => p.id === page)!.place : null
}

/**
 * Whether the bottom bar is put away on a path. It goes where the app already
 * hides its chrome because the screen is the work: a quiz, a battle, the
 * Concept Craft board, a workflow's board, a project attempt, and the sign-in
 * screens. (The PDF reader, the concept popup and focus mode are drawn over
 * the bar, so they need no entry here.)
 */
export function hidesBottomBar(path: string): boolean {
  const p = pathnameOf(path)
  if (p === '/quiz' || p === '/battle') return true
  if (isUnder(p, '/craft')) return true
  if (p.startsWith('/workflows/')) return true
  if (p.startsWith('/project/')) return true
  return isUnder(p, '/auth')
}
