// Today's concept level-ups for one exam, merged across devices.
//
// Combines the device-local signal written by quizStore (dailyProgressStore, kept
// live via LEVELUP_EVENT and cross-tab `storage` events) with the Supabase
// `daily_completions` read, so a quiz finished on another device still checks its
// concept off here. Both the Dashboard's Today card and the study-guide header's
// "Today's Study Plan" list read completions through this hook.

import { useEffect, useMemo, useState } from 'react'
import { useDailyCompletions } from '@/hooks/useDailyCompletions'
import { readTodayLevelUps, LEVELUP_EVENT, type DailyLevelUp } from '@/lib/dailyProgressStore'
import { mergeLevelUps } from '@/lib/planCompletion'
import { todayISO } from '@/lib/studyPlan'

export function useTodayCompletions(examProgressKey: string | null): DailyLevelUp[] {
  const [local, setLocal] = useState<DailyLevelUp[]>([])

  useEffect(() => {
    setLocal(readTodayLevelUps())
    function handleLevelUp(e: Event) {
      setLocal((e as CustomEvent<DailyLevelUp[]>).detail)
    }
    const levelUpKey = 'actuarial_daily_levelups_' + todayISO()
    function handleStorage(e: StorageEvent) {
      if (e.key === levelUpKey) setLocal(readTodayLevelUps())
    }
    window.addEventListener(LEVELUP_EVENT, handleLevelUp)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(LEVELUP_EVENT, handleLevelUp)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const remote = useDailyCompletions(examProgressKey)

  return useMemo(() => mergeLevelUps(local, remote), [local, remote])
}
