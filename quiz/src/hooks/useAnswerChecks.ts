import { useEffect, useState } from 'react'

type AnswerChecks = typeof import('@/lib/answerChecks')

let loaded: AnswerChecks | null = null

/**
 * The answer checks (lib/answerChecks.ts), fetched the first time `enabled`
 * is true — a written part locked in — and null until they arrive. Kept out
 * of the first page's bundle: the quiz is on it, but no check runs before an
 * answer is confirmed.
 */
export function useAnswerChecks(enabled: boolean): AnswerChecks | null {
  const [checks, setChecks] = useState<AnswerChecks | null>(loaded)
  useEffect(() => {
    if (!enabled || checks) return
    let live = true
    import('@/lib/answerChecks').then(mod => {
      loaded = mod
      if (live) setChecks(mod)
    })
    return () => { live = false }
  }, [enabled, checks])
  return checks
}
