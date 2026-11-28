import { useEffect, useState } from 'react'
import { motionAllowed } from '@/lib/viewTransition'

/**
 * Keeps something on screen for `ms` after it is closed, so its closing can
 * be drawn. `mounted` says whether to render it; `leaving` is true for those
 * last `ms`. A reader who asked for less motion gets no wait.
 */
export function usePresence(open: boolean, ms: number): { mounted: boolean; leaving: boolean } {
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)
  useEffect(() => {
    if (open || !mounted) return
    if (!motionAllowed()) { setMounted(false); return }
    const timer = window.setTimeout(() => setMounted(false), ms)
    return () => window.clearTimeout(timer)
  }, [open, mounted, ms])
  return { mounted: open || mounted, leaving: !open && mounted }
}
