// **Who may open the Community tab** (docs/community.md). Pure, like the
// Tutor's `canUseTutor`: the sidebar row and the route guard both read this
// one rule, so neither decides it for itself. To everyone it leaves out the
// tab doesn't exist — no sidebar row, `/community` redirects to the dashboard,
// and its code is a lazy chunk they never download.
//
// This is a UI gate, not a security boundary: the catalogue is bundled seed
// data, the feed is public posts, and what a reader follows is localStorage.

/** The accounts the tab is open to while it is in Preview, by sign-in email, compared case-insensitively. */
export const COMMUNITY_APPROVED_EMAILS: readonly string[] = [
  'jordan@actuarialnotes.com',
]

export interface CommunityViewer {
  signedIn: boolean
  email?: string | null
}

export function isCommunityApproved(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return COMMUNITY_APPROVED_EMAILS.some(e => e.toLowerCase() === normalized)
}

/**
 * Whether this viewer may open the tab. `openToAll` is the e2e build's
 * override (`COMMUNITY_OPEN_TO_ALL`); a deployed build never sets it.
 */
export function canEnterCommunity(viewer: CommunityViewer, openToAll = false): boolean {
  if (openToAll) return true
  return viewer.signedIn && isCommunityApproved(viewer.email)
}
