import { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Quiz Battle's intro plays **once per visit** to `/battle`
// (docs/quiz-battle-redesign.md §3.1). A visit is a history entry: arriving
// at the page plays it; anything that remounts the page in the same entry — a
// re-render, a skin swap, Back to an entry already seen — doesn't. The entries
// seen are this module's, so the memory lasts as long as the tab's app does
// and nothing is stored.

const seen = new Set<string>()

/** Whether the intro should play now, and how it ends (its own end, or a tap). */
export function useBattleIntro(wanted: boolean): { showing: boolean; finish: () => void } {
  const { key } = useLocation()
  const [showing, setShowing] = useState(() => {
    if (!wanted || seen.has(key)) return false
    seen.add(key)
    return true
  })
  const finish = useCallback(() => setShowing(false), [])
  return { showing, finish }
}
