/**
 * Whether a modal dialog is open *over* `host` — one that is neither the host
 * itself nor a dialog the host sits inside.
 *
 * A panel that closes on Escape or on a press outside it (the quiz search,
 * the Dashboard search, the concept questions modal) can open a dialog of its
 * own from one of its rows — a question's Info. That dialog is portalled to
 * the body (`OverlayPortal`), so a press on it is *outside* the panel's DOM,
 * and its Escape reaches the panel's key listener too: one press would close
 * the dialog and the panel it was opened from. While a dialog is layered over
 * it, the panel leaves those keys and presses to the dialog.
 */

/** The little of the DOM this reads, so it is testable without one. */
export interface DialogNode {
  contains(other: DialogNode | null): boolean
}

export interface DialogQueryRoot {
  querySelectorAll(selector: string): ArrayLike<DialogNode>
}

export const MODAL_DIALOG_SELECTOR = '[role="dialog"][aria-modal="true"]'

export function dialogOpenOver(
  host: DialogNode | null,
  root: DialogQueryRoot | undefined = typeof document === 'undefined' ? undefined : document as unknown as DialogQueryRoot,
): boolean {
  if (!root) return false
  return Array.from(root.querySelectorAll(MODAL_DIALOG_SELECTOR)).some(
    dialog => !host || !dialog.contains(host),
  )
}
