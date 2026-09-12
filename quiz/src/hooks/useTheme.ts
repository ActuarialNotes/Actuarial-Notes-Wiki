import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'actuarial-notes-theme'

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light') return 'light'
  } catch {
    // ignore
  }
  return 'dark' // default to dark, matching wiki default
}

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// One theme, one copy of it. This used to be per-hook `useState`, which meant
// every caller held its own: toggling in Settings left the Sidebar's sun/moon
// icon showing the old mode until it remounted, and cross-tab sync only
// reached whichever copies happened to be listening. It matters more now that
// the concept figures read the theme too (see `lib/figureTheme.ts`) — a figure
// that kept a stale value would render in the wrong palette until its page was
// re-opened, which is the exact bug the fragment was added to fix.
let current: Theme = getStoredTheme()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function setTheme(next: Theme) {
  if (next === current) return
  current = next
  applyTheme(current)
  emit()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

// Cross-tab sync: when another tab (or the wiki) toggles the theme, pick it up.
if (typeof window !== 'undefined') {
  applyTheme(current)
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY) setTheme(e.newValue === 'light' ? 'light' : 'dark')
  })
}

/** The current theme, outside React (`lib/` helpers, event handlers). */
export function currentTheme(): Theme {
  return current
}

export function toggleTheme(): void {
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // ignore
  }
}

// The app has a single colour scheme (high contrast, see index.css); the only
// appearance choice left is light vs dark.
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme, currentTheme)
  return { theme, toggleTheme }
}
