// **Who may enter Actuaria** — the signed-in accounts on
// `ACTUARIA_APPROVED_EMAILS` (docs/actuaria-online.md, *Implementation notes*).
// Pure, like Cowork's `canEnterMode`: the route guard, the sidebar's PLAY row,
// the Study Guides hub card and the Store's Ships tab all read this one rule,
// so none of them decides it for itself. To everyone else Actuaria doesn't
// exist — no row, no card, no tab — the way a Preview mode has no pill. The
// database holds the social half to the same list (`actuaria_is_approved`),
// since a cohort is shared state a client guard alone can't protect.
//
// `openToAll` is the preview build's override (`ACTUARIA_OPEN_TO_ALL`): the
// e2e suite plays the world signed out.

/**
 * The accounts Actuaria is open to, by sign-in email (compared
 * case-insensitively). Letting someone in is adding a line here *and* to
 * `actuaria_is_approved` in supabase/migrations/20261002_actuaria_approved.sql
 * — access.test.ts holds the two lists equal.
 */
export const ACTUARIA_APPROVED_EMAILS: readonly string[] = [
  'jordan@actuarialnotes.com',
]

export interface ActuariaViewer {
  signedIn: boolean
  /** The signed-in account's email — what approval is keyed on. */
  email?: string | null
}

export function isActuariaApproved(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return ACTUARIA_APPROVED_EMAILS.some(e => e.toLowerCase() === normalized)
}

export function canEnterActuaria(viewer: ActuariaViewer, openToAll: boolean): boolean {
  return openToAll || (viewer.signedIn && isActuariaApproved(viewer.email))
}

/**
 * Where a viewer who can't enter goes instead: sign in first (the approved
 * account may simply be signed out), else the dashboard — there is nothing to
 * upgrade to.
 */
export function actuariaDestination(viewer: ActuariaViewer): string {
  return viewer.signedIn ? '/dashboard' : '/auth'
}
