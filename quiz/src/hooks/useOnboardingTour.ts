import { create } from 'zustand'

// Persisted flag so the guided tour only auto-launches on a visitor's first
// time on the site. Bumping the version string re-shows the tour to everyone.
const STORAGE_KEY = 'actuarial_onboarding_tour_v2'

function hasSeenTour(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'done'
  } catch {
    return false
  }
}

function markTourSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, 'done')
  } catch {
    /* ignore — storage may be unavailable (private mode) */
  }
}

interface OnboardingTourState {
  active: boolean
  // The tour lives as a small launcher button in the bottom-right corner until
  // the visitor opens it. Only an *expanded* tour navigates, spotlights targets
  // and listens for taps — collapsed it is inert, so it can never sit on top of
  // the page a first-time visitor is trying to read.
  expanded: boolean
  step: number
  // Which way the last step change went (+1 forward, -1 back). Steps that skip
  // themselves (e.g. "collect a card" when the card is already collected) move
  // the same direction the user was travelling, so Back can't bounce off them.
  dir: 1 | -1
  // Launch the tour from the first step, but only if the visitor hasn't
  // already seen (completed or dismissed) it. Safe to call on every mount.
  autoStart: () => void
  // Force the tour open from the start, ignoring the persisted flag — used by
  // an explicit "replay the tour" affordance.
  restart: () => void
  expand: () => void
  collapse: () => void
  next: () => void
  prev: () => void
  goTo: (step: number) => void
  // Close the tour and remember it so it won't auto-launch again.
  finish: () => void
}

export const useOnboardingTour = create<OnboardingTourState>(set => ({
  active: false,
  expanded: false,
  step: 0,
  dir: 1,
  autoStart: () => {
    if (!hasSeenTour()) set({ active: true, expanded: false, step: 0, dir: 1 })
  },
  restart: () => set({ active: true, expanded: true, step: 0, dir: 1 }),
  expand: () => set({ expanded: true }),
  collapse: () => set({ expanded: false }),
  next: () => set(s => ({ step: s.step + 1, dir: 1 })),
  prev: () => set(s => ({ step: Math.max(0, s.step - 1), dir: -1 })),
  goTo: step => set(s => ({ step: Math.max(0, step), dir: step >= s.step ? 1 : -1 })),
  finish: () => {
    markTourSeen()
    set({ active: false, expanded: false, step: 0, dir: 1 })
  },
}))

export { hasSeenTour }
