import { create } from 'zustand'

/**
 * The sidebar drawer's open state, below `lg`.
 *
 * It lives outside `Sidebar` because the button that opens it does too: on a
 * route whose own top bar carries the nav button (see `lib/mobileNavHost.ts`),
 * the hamburger is rendered by that bar — a floating search bar — rather than
 * by the app header. The drawer itself is still `Sidebar`'s.
 */
interface MobileNavState {
  open: boolean
  openNav: () => void
  closeNav: () => void
}

export const useMobileNav = create<MobileNavState>(set => ({
  open: false,
  openNav: () => set({ open: true }),
  closeNav: () => set({ open: false }),
}))
