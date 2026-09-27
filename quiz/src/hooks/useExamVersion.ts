import { useCallback, useMemo } from 'react'
import { create } from 'zustand'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import {
  getSittingsForExam,
  selectVersion,
  sittingContains,
  sittingKey,
  type ExamSitting,
} from '@/data/examSittings'

/**
 * The last sitting picked from each exam's version menu, for this visit.
 *
 * In memory only: for a reader who isn't sitting the exam, a pick is a way of
 * looking at another sitting, not a fact about them, and it changes no one's
 * record. For one who is, it still settles which of two overlapping sittings
 * the recorded date means (`selectVersion`).
 */
const useVersionPicks = create<{
  picks: Record<string, string>
  pick: (progressKey: string, key: string) => void
}>(set => ({
  picks: {},
  pick: (progressKey, key) => set(s => ({ picks: { ...s.picks, [progressKey]: key } })),
}))

/**
 * A study guide's **version** — which sitting of the exam the page is being
 * read for — shared by everything in the sticky header that depends on it: the
 * version menu that changes it and the info button that describes it. Both call
 * this hook, so they can't disagree about which sitting is selected.
 *
 * For a signed-in reader who is sitting the exam, choosing a version writes
 * their exam date (the last day of the window, the same date the study-plan
 * settings' sitting list sets), so the plan paces to the sitting the header
 * names. Anyone else's choice lasts for the visit.
 */
export function useExamVersion(progressKey: string) {
  const { user } = useAuth()
  const { progress, targetDates, updateTargetDate } = useExamProgress()
  const sittings = useMemo(() => getSittingsForExam(progressKey), [progressKey])
  const tracked = !!user && progress[progressKey] === 'in_progress'
  const recordDate = tracked ? targetDates[progressKey] : null
  const pickedKey = useVersionPicks(s => s.picks[progressKey])
  const pick = useVersionPicks(s => s.pick)

  const selected = useMemo(
    () => selectVersion(sittings, recordDate, pickedKey),
    [sittings, recordDate, pickedKey],
  )

  const choose = useCallback((sitting: ExamSitting) => {
    pick(progressKey, sittingKey(sitting))
    if (tracked && !sittingContains(sitting, recordDate)) {
      void updateTargetDate(progressKey, sitting.endDate ?? sitting.startDate)
    }
  }, [pick, progressKey, tracked, recordDate, updateTargetDate])

  return { sittings, selected, choose }
}
