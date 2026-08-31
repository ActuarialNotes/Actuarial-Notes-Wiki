import { useSyncExternalStore } from 'react'

/**
 * Whether to include questions the fact-check record flags as critically wrong.
 *
 * Off by default: `filterQuestions` drops any question carrying an unresolved
 * critical finding, because serving a student a question the record says is
 * wrong is the exact failure the whole fact-check layer exists to prevent.
 *
 * But it is a default, not a lock. Someone reviewing the bank needs to see the
 * flagged questions — that is how they get fixed — and a maintainer checking a
 * reported error has to be able to reach the question that was reported. There
 * is no longer a Settings control for it; the stored preference (and
 * `setShowFlaggedQuestions`) is what a maintainer flips.
 *
 * A module-level store, like `useFiguresCollapsed`, so every surface reading it
 * agrees without any one of them owning the state.
 */
const STORAGE_KEY = 'show-flagged-questions'

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

let showFlagged = readStored()
const listeners = new Set<() => void>()

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => { listeners.delete(onChange) }
}

function getSnapshot(): boolean {
  return showFlagged
}

/** Server render always excludes them; the stored value arrives on hydration. */
function getServerSnapshot(): boolean {
  return false
}

export function setShowFlaggedQuestions(next: boolean): void {
  if (showFlagged === next) return
  showFlagged = next
  try {
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
  } catch {
    /* quota — the preference just won't outlive the session */
  }
  listeners.forEach(listener => listener())
}

export function useShowFlaggedQuestions(): [boolean, (next: boolean) => void] {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return [value, setShowFlaggedQuestions]
}

/** Read the current value outside React (stores, plain functions). */
export function showFlaggedQuestions(): boolean {
  return showFlagged
}
