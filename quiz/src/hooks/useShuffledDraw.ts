import { useEffect, useRef, useState } from 'react'

/**
 * The quiz builder's shuffled draw. Tapping the deck card fixes a specific set
 * of questions for the next quiz (`keepDraw`); the set is cleared whenever
 * `signature` — everything the draw depends on, `drawSignature` in
 * lib/quizBuilder.ts — changes, so Start can never launch a draw that no
 * longer matches the filters on screen. `shuffleTick` counts the draws and
 * `justShuffled` holds for a moment after one, for the deck card's animation.
 */
export function useShuffledDraw(signature: string) {
  const [drawnIds, setDrawnIds] = useState<string[] | null>(null)
  const [shuffleTick, setShuffleTick] = useState(0)
  const [justShuffled, setJustShuffled] = useState(false)
  const shuffleTimerRef = useRef<number | null>(null)

  useEffect(() => {
    setDrawnIds(null)
    setJustShuffled(false)
  }, [signature])

  useEffect(() => () => {
    if (shuffleTimerRef.current !== null) window.clearTimeout(shuffleTimerRef.current)
  }, [])

  function keepDraw(ids: string[]) {
    setDrawnIds(ids)
    setShuffleTick(t => t + 1)
    setJustShuffled(true)
    if (shuffleTimerRef.current !== null) window.clearTimeout(shuffleTimerRef.current)
    shuffleTimerRef.current = window.setTimeout(() => setJustShuffled(false), 1800)
  }

  return { drawnIds, shuffleTick, justShuffled, keepDraw }
}
