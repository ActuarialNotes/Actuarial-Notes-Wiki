import { useCallback, useState } from 'react'
import { parseKitDone, toggleKitStep, type KitDone, type KitStepId } from '@/lib/storeKit'

const KEY = 'actuarial_store_kit_v1'

function read(): KitDone {
  try {
    return parseKitDone(localStorage.getItem(KEY))
  } catch {
    return {}
  }
}

/**
 * The exam kit's ticks — which steps the reader has sorted, by exam
 * (`lib/storeKit.ts`). Kept in this browser only: it is a reader's own
 * checklist, and nothing else in the app reads it.
 */
export function useStoreKit() {
  const [done, setDone] = useState<KitDone>(read)
  const toggle = useCallback((exam: string, step: KitStepId) => {
    setDone(prev => {
      const next = toggleKitStep(prev, exam, step)
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        // Storage refused (a private window): the tick lasts the visit.
      }
      return next
    })
  }, [])
  return { done, toggle }
}
