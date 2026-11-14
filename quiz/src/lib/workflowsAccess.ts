// **Who may use Workflows and the Data Sources' publishers** (docs/cowork.md).
// Pure, like the Tutor's `canUseTutor` and Community's `canEnterCommunity`:
// the sidebar, the Data Sources page and the route guard all read this one
// rule, so none of them decides it for itself.
//
// While in Preview they are open only to the accounts below. To everyone else
// they don't exist: no Workflows row, `/workflows` redirects to the dashboard,
// and the Data Sources page shows its tables and the Assumptions Bank (open to
// everyone) without the publishers and their documents.
//
// This is a UI gate, not a security boundary: the catalogue is bundled seed
// data and the library and workflow stores are localStorage, so there is no
// server data behind it to guard.

/** The accounts Workflows is open to while in Preview, by sign-in email, compared case-insensitively. */
export const PREVIEW_APPROVED_EMAILS: readonly string[] = [
  'jordan@actuarialnotes.com',
]

export interface WorkflowsViewer {
  signedIn: boolean
  email?: string | null
}

/** Whether an account is approved for the Preview. */
export function isPreviewApproved(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return PREVIEW_APPROVED_EMAILS.some(e => e.toLowerCase() === normalized)
}

/**
 * Whether this viewer may use Workflows and the publishers. `openToAll` is the
 * e2e build's override (`COWORK_OPEN_TO_ALL`); a deployed build never sets it.
 */
export function canUseWorkflows(viewer: WorkflowsViewer, openToAll = false): boolean {
  if (openToAll) return true
  return viewer.signedIn && isPreviewApproved(viewer.email)
}
