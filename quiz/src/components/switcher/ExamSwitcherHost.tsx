// Mounts the exam switcher once, at the app root, and fetches its screens the
// first time it is opened.

import { lazy, Suspense } from 'react'
import { useExamSwitcher } from '@/stores/examSwitcher'

const ExamSwitcherSheet = lazy(() => import('@/components/switcher/ExamSwitcherSheet'))

export function ExamSwitcherHost() {
  const screen = useExamSwitcher(s => s.screen)
  if (!screen) return null
  return (
    <Suspense fallback={null}>
      <ExamSwitcherSheet />
    </Suspense>
  )
}
