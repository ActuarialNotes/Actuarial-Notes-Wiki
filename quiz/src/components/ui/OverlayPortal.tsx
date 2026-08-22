import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/**
 * Renders a full-screen overlay into `document.body`.
 *
 * A `z-index` only orders an element against its *siblings* inside the nearest
 * stacking context. An overlay rendered inside one — the concept popup
 * (`z-40`, `z-56` in focus mode), the add-flashcards sheet (`z-[64]`), the
 * collect dialog (`z-[120]`) — is therefore capped at that ancestor's layer no
 * matter how high its own `z-[NN]` is, so it opens *behind* anything painted
 * above the host: the floating search bar (`z-50`), the bottom nav, a sibling
 * panel. Worse, a transformed ancestor (the flashcard's swipe/flip transform)
 * makes `position: fixed` resolve against that element instead of the
 * viewport, and the overlay lands glued to a card rather than covering the
 * screen.
 *
 * Portalling to the body is the one fix for both: the overlay becomes a
 * top-level child, so its place on the ladder in `docs/style-guide.md` §8.2 is
 * the place it actually takes. React context and event bubbling follow the
 * React tree, so nothing else about the host changes.
 *
 * Every overlay that can be opened from more than one host should go through
 * this — see the components listed in §8.2.
 */
export function OverlayPortal({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') return null
  return createPortal(children, document.body)
}
