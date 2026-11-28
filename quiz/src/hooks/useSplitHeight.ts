import { useCallback, useEffect, useState } from 'react'

// Persists the concept popup's split-pane height between sessions under the
// same localStorage key publish.js uses, so the user's preferred size carries
// over if they ever hop between the two sites.
const STORAGE_KEY = 'concept-split-height'
const DEFAULT_HEIGHT = 0.5 // 50vh
/** The smallest the pane is dragged to; pulled further, it closes. */
export const SPLIT_MIN_PX = 180
const MAX_FRAC = 0.92

function clampHeight(px: number): number {
  const max = Math.max(SPLIT_MIN_PX, window.innerHeight * MAX_FRAC)
  return Math.min(max, Math.max(SPLIT_MIN_PX, px))
}

function readStored(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const n = parseFloat(raw)
    if (!Number.isFinite(n) || n <= 0) return null
    return n
  } catch {
    return null
  }
}

function writeStored(px: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Math.round(px)))
  } catch {
    /* quota — skip */
  }
}

export interface SplitHeightApi {
  height: number
  /**
   * The pane dragged to `height` by its handle (`useDragToClose`'s
   * `onResize`); kept for the next visit once the handle is let go.
   */
  resize: (height: number, done: boolean) => void
}

export function useSplitHeight(): SplitHeightApi {
  const [height, setHeight] = useState<number>(() => {
    if (typeof window === 'undefined') return 400
    const stored = readStored()
    return stored !== null ? clampHeight(stored) : Math.round(window.innerHeight * DEFAULT_HEIGHT)
  })

  // Reclamp if the window resizes below the current height.
  useEffect(() => {
    function onResize() {
      setHeight(h => clampHeight(h))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const resize = useCallback((next: number, done: boolean) => {
    const clamped = clampHeight(next)
    setHeight(clamped)
    if (done) writeStored(clamped)
  }, [])

  return { height, resize }
}
