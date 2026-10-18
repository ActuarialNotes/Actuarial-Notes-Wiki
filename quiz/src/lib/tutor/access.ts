// **Who may use the Tutor** (docs/tutor.md §10). Pure, like Actuaria's
// `canEnterActuaria`: the host that decides whether the Tutor is drawn at all
// reads this one rule, so no surface decides it for itself. To everyone the
// stage leaves out the Tutor doesn't exist — no character, no setting, and its
// code is a lazy chunk they never download.
//
// The stages are the rollout, in order. Moving on is changing `TUTOR_STAGE`:
//   preview — the approved accounts alone (now);
//   beta    — the approved accounts and every Pro subscriber;
//   open    — every signed-in account (decision D25 settles free or Pro).

export type TutorStage = 'preview' | 'beta' | 'open'

/** Where the rollout stands. One line to move it on. */
export const TUTOR_STAGE: TutorStage = 'preview'

/**
 * The accounts the Tutor is open to in Preview (and still in Beta), by sign-in
 * email, compared case-insensitively.
 */
export const TUTOR_APPROVED_EMAILS: readonly string[] = [
  'jordan@actuarialnotes.com',
]

export interface TutorViewer {
  signedIn: boolean
  /** The signed-in account's email — what approval is keyed on. */
  email?: string | null
  /** An active Pro subscription — what Beta opens it to. */
  isPro?: boolean
}

export function isTutorApproved(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return TUTOR_APPROVED_EMAILS.some(e => e.toLowerCase() === normalized)
}

/**
 * Whether this viewer gets the Tutor at this stage. It is always signed-in
 * only: everything it does is about one candidate's record, and a signed-out
 * reader has none worth scheduling.
 */
export function canUseTutor(viewer: TutorViewer, stage: TutorStage = TUTOR_STAGE): boolean {
  if (!viewer.signedIn) return false
  if (isTutorApproved(viewer.email)) return true
  if (stage === 'beta') return viewer.isPro === true
  return stage === 'open'
}

/** The localStorage key a preview build's page sets to ask for the Tutor. */
export const TUTOR_PREVIEW_KEY = 'actuarial_tutor_preview'

/**
 * Whether this page has asked for the Tutor in a preview build. Read only when
 * the build is one (`TUTOR_OPEN_TO_ALL`); a deployed build never looks.
 */
export function tutorPreviewRequested(storage: Pick<Storage, 'getItem'> | null): boolean {
  try {
    return storage?.getItem(TUTOR_PREVIEW_KEY) === 'on'
  } catch {
    return false
  }
}
