import { useCallback, useEffect, useRef, useState } from 'react'

// Persists the concept popup's split-pane height between sessions under the
// same localStorage key publish.js uses, so the user's preferred size carries
// over if they ever hop between the two sites.
const STORAGE_KEY = 'concept-split-height'
const DEFAULT_HEIGHT = 0.5 // 50vh
const MIN_PX = 150
const MAX_FRAC = 0.85

function clampHeight(px: number): number {
  const max = Math.max(MIN_PX, window.innerHeight * MAX_FRAC)
  return Math.min(max, Math.max(MIN_PX, px))
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
  beginDrag: (startY: number) => void
}

export function useSplitHeight(): SplitHeightApi {
  const [height, setHeight] = useState<number>(() => {
    if (typeof window === 'undefined') return 400
    return readStored() ?? Math.round(window.innerHeight * DEFAULT_HEIGHT)
  })

  const dragState = useRef<{ startY: number; startH: number } | null>(null)

  // Reclamp if the window resizes below the current height.
  useEffect(() => {
    function onResize() {
      setHeight(h => clampHeight(h))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const beginDrag = useCallback((startY: number) => {
    dragState.current = { startY, startH: height }

    function onMove(clientY: number) {
      const st = dragState.current
      if (!st) return
      // Dragging up (clientY < startY) makes the panel taller.
      const next = clampHeight(st.startH + (st.startY - clientY))
      setHeight(next)
    }

    function onMouseMove(e: MouseEvent) {
      e.preventDefault()
      onMove(e.clientY)
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches[0]) onMove(e.touches[0].clientY)
    }
    function onUp() {
      const st = dragState.current
      dragState.current = null
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      if (st) {
        setHeight(h => {
          writeStored(h)
          return h
        })
      }
    }

    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onUp)
  }, [height])

  return { height, beginDrag }
}
