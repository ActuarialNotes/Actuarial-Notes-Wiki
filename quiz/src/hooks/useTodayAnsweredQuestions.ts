// Question IDs today's quizzes have already served on this device.
//
// Feeds the `seenIds` option of lib/studyPlan's coverage selection, which holds
// those questions back so a Today's Plan re-launch ("Continue Studying") draws
// questions the user hasn't just answered. Every surface that sizes or starts a
// plan quiz reads it from here, so the badge count and the quiz it launches stay
// in agreement.

import { useEffect, useMemo, useState } from 'react'
import { ANSWERED_EVENT, readTodayAnsweredIds } from '@/lib/dailyProgressStore'

export function useTodayAnsweredQuestions(): Set<string> {
  const [ids, setIds] = useState<string[]>(() => readTodayAnsweredIds())

  useEffect(() => {
    const refresh = () => setIds(readTodayAnsweredIds())
    window.addEventListener(ANSWERED_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(ANSWERED_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return useMemo(() => new Set(ids), [ids])
}
