import { useSyncExternalStore } from 'react'

/**
 * Whether concept figures are collapsed in the concept popup.
 *
 * Figures start **collapsed**: a concept popup opens on a definition, and a
 * figure at the top of it pushes that definition below the fold. The corner
 * control unfolds it, and that choice is what gets remembered.
 *
 * The preference is deliberately *global*, not per-concept: someone who folds
 * the figure away to get at the definition wants it to stay folded as they page
 * through concepts, and to come back only when they expand it again. It is
 * persisted for the same reason — a reload shouldn't quietly undo the choice.
 * Only an explicit choice is stored, so `'0'` (expanded) is a real value here
 * rather than the absence of one.
 *
 * A module-level store (rather than component state) keeps every banner in
 * agreement and survives the banner unmounting, which it does whenever the
 * popup switches to Math View or Listen.
 */
const STORAGE_KEY = 'concept-figures-collapsed'

const DEFAULT_COLLAPSED = true

function readStored(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === '1') return true
    if (stored === '0') return false
    return DEFAULT_COLLAPSED
  } catch {
    return DEFAULT_COLLAPSED
  }
}

let collapsed = readStored()
const listeners = new Set<() => void>()

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSnapshot(): boolean {
  return collapsed
}

/** The app never hydrates, so this is only reached when a test renders to markup. */
function getServerSnapshot(): boolean {
  return collapsed
}

export function setFiguresCollapsed(next: boolean): void {
  if (collapsed === next) return
  collapsed = next
  try {
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
  } catch {
    /* quota — the preference just won't outlive the session */
  }
  listeners.forEach(listener => listener())
}

export function useFiguresCollapsed(): [boolean, (next: boolean) => void] {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return [value, setFiguresCollapsed]
}
