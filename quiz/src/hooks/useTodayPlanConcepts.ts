// The concepts today's study plan is asking for, for a single exam, as the
// lower-cased keys a caller holding `slugForLink` slugs can test membership in
// (see `planConceptKeys` — aliased syllabus links resolve under both their
// display name and their raw target).
//
// This is the read-only "is this concept on today's list?" question, kept apart
// from `useTodayQuizCount`, which assembles every exam's plan to *size* a quiz.
// The pre-quiz concept list uses it to mark the concepts whose level-up would
// actually move today's plan forward.

import { useMemo } from 'react'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useExamProgress } from '@/contexts/examProgress'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { matchesSelectedVariant } from '@/data/examSittings'
import { planConceptKeys } from '@/lib/planCompletion'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'

const EMPTY: Set<string> = new Set()

/**
 * Today's plan concepts for `examProgressKey` (`P`, `FM`, `MAS-I`, `CAS-5`).
 * Returns an empty set when the exam is unknown or has no plan for today —
 * and for a reader who isn't Pro: the study plan is a Pro feature, so nobody
 * else has a "today's list" for a concept to be on (the Dashboard and the quiz
 * builder lock theirs the same way).
 */
export function useTodayPlanConcepts(examProgressKey: string | null): Set<string> {
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { targetDates, examVariants } = useExamProgress()
  const { isPro } = useSubscription()

  // Pick the syllabus for this exam, honouring the sitting variant the learner
  // selected (an exam can ship more than one syllabus file, e.g. FM-2 vs FM-3).
  const syllabus = useMemo(() => {
    // No plan to build for a reader without one — don't generate it either.
    if (!examProgressKey || !isPro) return null
    const matches = syllabi.filter(s => wikiExamIdToProgressKey(s.examId) === examProgressKey)
    return (
      matches.find(s => matchesSelectedVariant(examProgressKey, s.examId, examVariants[examProgressKey])) ??
      matches[0] ??
      null
    )
  }, [syllabi, examProgressKey, examVariants, isPro])

  const { plan } = useStudyPlan(
    syllabus,
    masteryRecords,
    examProgressKey ? (targetDates[examProgressKey] ?? null) : null,
    masteryLoading,
  )

  return useMemo(
    () => (isPro && plan ? planConceptKeys(plan, syllabus) : EMPTY),
    [isPro, plan, syllabus],
  )
}
