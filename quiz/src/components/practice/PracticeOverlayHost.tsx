// Mounts the concept's practice overlay once, at the app root, and fetches it
// the first time a Practice button opens it. Going to another page (starting
// the practice, opening a question) closes it.

import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePracticeOverlay } from '@/stores/practiceOverlay'

const PracticeOverlay = lazy(() => import('@/components/practice/PracticeOverlay'))

export function PracticeOverlayHost() {
  const concept = usePracticeOverlay(s => s.concept)
  const close = usePracticeOverlay(s => s.close)
  const { pathname } = useLocation()
  useEffect(() => { close() }, [pathname, close])
  if (!concept) return null
  return (
    <Suspense fallback={null}>
      <PracticeOverlay concept={concept} onClose={close} />
    </Suspense>
  )
}
