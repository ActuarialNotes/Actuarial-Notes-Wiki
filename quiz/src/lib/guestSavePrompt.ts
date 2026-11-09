/**
 * The guest **save your progress** prompt: a dialog on /review after a guest's
 * first finished quiz, asking them to make an account so the quiz — and the
 * concept levels, streak and XP it earned, all kept in this browser until then —
 * is saved with it. Asked once per browser: closing it either way records it,
 * and after that the score card's quieter sign-in line is the only ask.
 *
 * Pure decision + a storage wrapper, so the rule is tested without a page.
 */

export const GUEST_SAVE_PROMPT_KEY = 'actuarial_guest_save_prompt_v1'

export interface GuestSavePromptInput {
  /** The auth state is still resolving — don't guess. */
  authLoading: boolean
  signedIn: boolean
  /** The quiz on screen was finished signed out (`CompletedSession.needsCloudSync`). */
  finishedAsGuest: boolean
  /** The prompt has been answered before in this browser. */
  alreadyAsked: boolean
}

export function shouldAskGuestToSave(input: GuestSavePromptInput): boolean {
  return !input.authLoading && !input.signedIn && input.finishedAsGuest && !input.alreadyAsked
}

/** Read the stored flag; a storage that throws reads as asked, so it never nags. */
export function readGuestSavePromptAsked(storage: Pick<Storage, 'getItem'> | null = safeStorage()): boolean {
  try {
    return storage ? storage.getItem(GUEST_SAVE_PROMPT_KEY) !== null : true
  } catch {
    return true
  }
}

export function markGuestSavePromptAsked(
  storage: Pick<Storage, 'setItem'> | null = safeStorage(),
  now: Date = new Date(),
): void {
  try {
    storage?.setItem(GUEST_SAVE_PROMPT_KEY, now.toISOString())
  } catch { /* quota or blocked storage — nothing to do */ }
}

function safeStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}
