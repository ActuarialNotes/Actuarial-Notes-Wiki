// **Getting round Actuaria** — the in-world tabs, the order they lie in, and
// which one a path belongs to (docs/actuaria-online.md §5).
//
// The phone's bottom bar and the desktop HUD's tab row list the same places in
// the same order — Map, Battle, Daily, Cohort, Hangar — and `lib/viewTransition.ts`
// lays them on the desk in that order too, so a move between two of them slides
// the way the tabs read.

export type ActuariaTabId = 'map' | 'battle' | 'daily' | 'cohort' | 'hangar'

export interface ActuariaTab {
  id: ActuariaTabId
  label: string
  path: string
  /** The paths under the tab that are sheets over it (a sector over the map). */
  sheets: readonly string[]
}

export const ACTUARIA_TABS: readonly ActuariaTab[] = [
  { id: 'map', label: 'Map', path: '/actuaria/map', sheets: ['/actuaria/sector'] },
  { id: 'battle', label: 'Battle', path: '/actuaria/battle', sheets: ['/actuaria/simulation'] },
  { id: 'daily', label: 'Daily', path: '/actuaria/daily', sheets: [] },
  { id: 'cohort', label: 'Cohort', path: '/actuaria/cohort', sheets: ['/actuaria/raid'] },
  { id: 'hangar', label: 'Hangar', path: '/actuaria/hangar', sheets: [] },
]

/**
 * Whether the Cohort tab is shown. Cohorts and raids are the social phase (§9,
 * Phase 3); the tab stays hidden until they are there to open.
 */
export const COHORTS_LIVE: boolean = false

export function visibleTabs(cohortsLive: boolean = COHORTS_LIVE): ActuariaTab[] {
  return ACTUARIA_TABS.filter(t => t.id !== 'cohort' || cohortsLive)
}

function under(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`)
}

/** The tab a path lies under, or null for the title screen. */
export function actuariaTabFor(pathname: string): ActuariaTabId | null {
  const path = pathname.replace(/\/+$/, '') || '/'
  for (const tab of ACTUARIA_TABS) {
    if (under(path, tab.path) || tab.sheets.some(sheet => under(path, sheet))) return tab.id
  }
  return null
}
