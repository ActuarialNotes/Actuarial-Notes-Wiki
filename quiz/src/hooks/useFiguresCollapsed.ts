import { useSyncExternalStore } from 'react'

/**
 * Whether concept figures are collapsed in the concept popup.
 *
 * The preference is deliberately *global*, not per-concept: someone who folds
 * the figure away to get at the definition wants it to stay folded as they page
 * through concepts, and to come back only when they expand it again. It is
 * persisted for the same reason — a reload shouldn't quietly undo the choice.
 *
 * A module-level store (rather than component state) keeps every banner in
 * agreement and survives the banner unmounting, which it does whenever the
 * popup switches to Math View or Listen.
 */
const STORAGE_KEY = 'concept-figures-collapsed'

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
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

/** Server render always starts expanded; the stored value arrives on hydration. */
function getServerSnapshot(): boolean {
  return false
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
