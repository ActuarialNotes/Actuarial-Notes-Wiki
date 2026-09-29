import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useConceptPopup } from '@/hooks/useConceptPopup'

/**
 * Open a landmark in the concept popup — the same split pane the study guide
 * reads a concept in (there is no second reader). `names` is the walk Previous
 * / Next steps through: the list the landmark was picked from.
 */
export function useOpenLandmark() {
  const openAt = useConceptPopup(s => s.openAt)
  const { pathname } = useLocation()
  return useCallback(
    (names: readonly string[], index: number) => {
      openAt(names.map(name => ({ kind: 'concept' as const, name })), index, pathname)
    },
    [openAt, pathname],
  )
}
