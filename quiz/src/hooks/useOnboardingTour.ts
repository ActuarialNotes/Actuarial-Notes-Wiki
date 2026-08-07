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

// Where the visitor had got to. The tour walks across pages and outlives a
// reload — mobile Safari drops a backgrounded tab constantly — and coming back
// to step 1 of 17 after nine steps of work is the tour at its most infuriating.
// Only the position is stored; nothing here decides whether the tour runs.
const PROGRESS_KEY = 'actuarial_onboarding_tour_v2_progress'

function markTourSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, 'done')
    localStorage.removeItem(PROGRESS_KEY)
  } catch {
    /* ignore — storage may be unavailable (private mode) */
  }
}

interface TourProgress {
  step: number
  expanded: boolean
}

function loadProgress(): TourProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return { step: 0, expanded: false }
    const parsed = JSON.parse(raw) as Partial<TourProgress>
    return {
      step: Number.isFinite(parsed.step) ? Math.max(0, Math.floor(parsed.step as number)) : 0,
      expanded: parsed.expanded === true,
    }
  } catch {
    return { step: 0, expanded: false }
  }
}

function saveProgress(progress: TourProgress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
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

export const useOnboardingTour = create<OnboardingTourState>(set => {
  // Every move writes the position through, so a reload mid-tour picks up where
  // the visitor left off instead of restarting them at "Welcome".
  const move = (
    update: (s: OnboardingTourState) => { step: number; dir: 1 | -1; expanded: boolean },
  ) =>
    set(s => {
      const next = update(s)
      next.step = Math.max(0, next.step)
      saveProgress({ step: next.step, expanded: next.expanded })
      return next
    })

  return {
    active: false,
    expanded: false,
    step: 0,
    dir: 1,
    autoStart: () => {
      if (hasSeenTour()) return
      const { step, expanded } = loadProgress()
      set({ active: true, expanded, step, dir: 1 })
    },
    restart: () => {
      saveProgress({ step: 0, expanded: true })
      set({ active: true, expanded: true, step: 0, dir: 1 })
    },
    expand: () => move(s => ({ step: s.step, dir: s.dir, expanded: true })),
    collapse: () => move(s => ({ step: s.step, dir: s.dir, expanded: false })),
    next: () => move(s => ({ step: s.step + 1, dir: 1, expanded: s.expanded })),
    prev: () => move(s => ({ step: s.step - 1, dir: -1, expanded: s.expanded })),
    goTo: step => move(s => ({ step, dir: step >= s.step ? 1 : -1, expanded: s.expanded })),
    finish: () => {
      markTourSeen()
      set({ active: false, expanded: false, step: 0, dir: 1 })
    },
  }
})

export { hasSeenTour }
