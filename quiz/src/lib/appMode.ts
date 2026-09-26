/**
 * The app's **modes** — which product a reader is currently in.
 *
 * Actuarial Notes started as one thing: a study guide with quizzes and
 * flashcards. Cowork is the second product under the same roof, and the two
 * are not tabs of each other — they have different navigation, different
 * content and different readers. A mode is therefore a *place*, not a filter:
 * every route belongs to exactly one of them, and the pill beside the wordmark
 * says which one you are standing in.
 *
 * This module is the one definition. `components/ModeSwitcher.tsx` renders the
 * pill from it, `Sidebar.tsx` picks which nav rows to show by it, and `App.tsx`
 * reads `modeForPath` to keep the two honest. Pure and tested, so the answer to
 * "which mode is /cowork/deliverables?" can't drift between the three.
 *
 * Availability is a property of the mode, not of a surface: Cowork is Pro-only
 * and in Preview, and both facts live here so the pill, the nav and the route
 * guard all state them the same way.
 *
 * While a mode is in Preview it is open only to the accounts on
 * `PREVIEW_APPROVED_EMAILS` — not to every Pro subscriber — and to everyone
 * else it doesn't exist: the pill isn't drawn at all (`showsModeSwitcher`),
 * so there is nothing to switch to and nothing locked to wonder about.
 */

export type AppMode = 'study' | 'cowork'

/** What it takes to enter a mode. */
export type ModeAccess = 'open' | 'pro'

export interface AppModeSpec {
  id: AppMode
  /** The word on the pill. Deliberately one word — it sits beside a wordmark. */
  label: string
  /** The line under the label in the switcher's menu. */
  tagline: string
  /** Where entering the mode lands. */
  home: string
  /**
   * The route prefixes the mode owns. `modeForPath` matches the *longest*
   * prefix, so a mode can own a sub-tree of another mode's namespace without
   * the order of this list mattering.
   */
  routes: string[]
  access: ModeAccess
  /** True while the mode is still being built out — renders a Preview chip. */
  preview: boolean
}

/**
 * Study is first and is the fallback: an unknown route is a study route, which
 * is what keeps every existing page (the dashboard, the quiz, /settings, a 404)
 * in the mode it has always been in.
 */
export const APP_MODES: AppModeSpec[] = [
  {
    id: 'study',
    label: 'Study',
    tagline: 'Syllabus guides, flashcards and exam practice',
    home: '/dashboard',
    routes: [],
    access: 'open',
    preview: false,
  },
  {
    id: 'cowork',
    label: 'Cowork',
    tagline: 'Source library and actuarial deliverables',
    home: '/cowork',
    routes: ['/cowork'],
    access: 'pro',
    preview: true,
  },
]

export const DEFAULT_MODE: AppMode = 'study'

/**
 * The accounts a Preview mode is open to, by sign-in email (compared
 * case-insensitively). Approving someone for Cowork is adding a line here.
 *
 * This is a UI gate, not a security boundary: it decides what the app shows
 * and which routes it serves, and Cowork's catalogue is bundled seed data and
 * its stores are localStorage, so there is no server data behind it to guard.
 */
export const PREVIEW_APPROVED_EMAILS: readonly string[] = [
  'jordan@actuarialnotes.com',
]

/** Whether an account is approved for the modes still in Preview. */
export function isPreviewApproved(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return PREVIEW_APPROVED_EMAILS.some(e => e.toLowerCase() === normalized)
}

export function modeSpec(id: AppMode): AppModeSpec {
  return APP_MODES.find(m => m.id === id) ?? APP_MODES[0]
}

function isUnder(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`)
}

/**
 * Which mode a path belongs to. Longest matching prefix wins, so `/cowork` and
 * a hypothetical `/cowork/x` owned by different modes would still resolve the
 * way the route table reads. Anything unclaimed is Study.
 */
export function modeForPath(pathname: string): AppMode {
  let best: { mode: AppMode; length: number } | null = null
  for (const mode of APP_MODES) {
    for (const route of mode.routes) {
      if (isUnder(pathname, route) && (!best || route.length > best.length)) {
        best = { mode: mode.id, length: route.length }
      }
    }
  }
  return best?.mode ?? DEFAULT_MODE
}

export interface ModeViewer {
  signedIn: boolean
  isPro: boolean
  /** The signed-in account's email — what Preview approval is keyed on. */
  email?: string | null
}

/**
 * Whether this viewer can see the mode at all. A mode out of Preview is
 * visible to everyone (locked or not); one in Preview only to an approved,
 * signed-in account.
 */
export function isModeVisible(id: AppMode, viewer: ModeViewer): boolean {
  const spec = modeSpec(id)
  if (!spec.preview) return true
  return viewer.signedIn && isPreviewApproved(viewer.email)
}

/** The modes this viewer can see, in `APP_MODES` order. */
export function visibleModes(viewer: ModeViewer): AppModeSpec[] {
  return APP_MODES.filter(m => isModeVisible(m.id, viewer))
}

/**
 * Whether the mode pill is drawn for this viewer. A switcher with one place
 * in it switches nothing, so a viewer who can see only Study sees no pill.
 */
export function showsModeSwitcher(viewer: ModeViewer): boolean {
  return visibleModes(viewer).length > 1
}

/**
 * Whether this viewer may enter the mode. An `open` mode always lets them in.
 * A mode in Preview lets in exactly its approved accounts — approval is the
 * whole gate while it is being built, Pro or not. Otherwise a `pro` mode needs
 * an active Pro subscription, and being signed out is just one way of not
 * having one.
 */
export function canEnterMode(id: AppMode, viewer: ModeViewer): boolean {
  const spec = modeSpec(id)
  if (spec.access === 'open') return true
  if (spec.preview) return isModeVisible(id, viewer)
  return viewer.signedIn && viewer.isPro
}

/**
 * Why a mode is locked, for the one line the switcher shows under a row the
 * viewer can't pick. `null` when it isn't locked.
 */
export function modeLockReason(id: AppMode, viewer: ModeViewer): string | null {
  if (canEnterMode(id, viewer)) return null
  if (!viewer.signedIn) return 'Sign in with Pro to open Cowork'
  return 'Included with Pro'
}

/**
 * Where a viewer who picked a mode — or followed a link into one — should
 * land: its home when they may enter. A Preview mode they aren't approved for
 * doesn't exist for them, so they land on the default mode's home rather than
 * on a sign-in or upgrade page that couldn't let them in. Otherwise signing in
 * comes first — there is nothing to upgrade until there is an account to
 * upgrade.
 */
export function modeDestination(id: AppMode, viewer: ModeViewer): string {
  if (canEnterMode(id, viewer)) return modeSpec(id).home
  if (!isModeVisible(id, viewer)) return modeSpec(DEFAULT_MODE).home
  return viewer.signedIn ? '/upgrade' : '/auth'
}
