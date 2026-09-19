import { useEffect, useState } from 'react'
import { COLLECTED_EVENT } from '@/hooks/useCollectedCards'

/**
 * A counter that ticks up every time a flashcard is collected.
 *
 * Nav surfaces re-key their icon on it so the ring/glow animation replays on
 * each collection rather than only on the first — the deck is somewhere else
 * on screen (a sidebar row, or behind the hamburger), so the light-up is the
 * only sign the card landed. `0` means "nothing collected this session", which
 * is what keeps the animation off on first paint.
 */
export function useCollectGlow(): number {
  const [glow, setGlow] = useState(0)
  useEffect(() => {
    const onCollected = () => setGlow(k => k + 1)
    window.addEventListener(COLLECTED_EVENT, onCollected)
    return () => window.removeEventListener(COLLECTED_EVENT, onCollected)
  }, [])
  return glow
}
