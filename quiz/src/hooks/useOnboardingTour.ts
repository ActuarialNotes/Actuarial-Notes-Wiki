import { create } from 'zustand'

// Persisted flag so the guided tour only auto-launches on a visitor's first
// time on the site. Bumping the version string re-shows the tour to everyone.
const STORAGE_KEY = 'actuarial_onboarding_tour_v1'

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
  step: number
  // Launch the tour from the first step, but only if the visitor hasn't
  // already seen (completed or dismissed) it. Safe to call on every mount.
  autoStart: () => void
  // Force the tour open from the start, ignoring the persisted flag — used by
  // an explicit "replay the tour" affordance.
  restart: () => void
  next: () => void
  prev: () => void
  goTo: (step: number) => void
  // Close the tour and remember it so it won't auto-launch again.
  finish: () => void
}

export const useOnboardingTour = create<OnboardingTourState>(set => ({
  active: false,
  step: 0,
  autoStart: () => {
    if (!hasSeenTour()) set({ active: true, step: 0 })
  },
  restart: () => set({ active: true, step: 0 }),
  next: () => set(s => ({ step: s.step + 1 })),
  prev: () => set(s => ({ step: Math.max(0, s.step - 1) })),
  goTo: step => set({ step: Math.max(0, step) }),
  finish: () => {
    markTourSeen()
    set({ active: false, step: 0 })
  },
}))

export { hasSeenTour }
