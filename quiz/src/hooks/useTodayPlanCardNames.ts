// The concept *names* today's study plan is asking for, across every exam
// marked in progress — the list the Flashcards "+" menu builds a deck from in
// one tap.
//
// The two neighbouring hooks answer different questions and are deliberately
// kept apart: `useTodayPlanConcepts` answers "is this one concept on today's
// list?" for a single exam (lower-cased keys, membership only), and
// `useTodayQuizCount` assembles every exam's plan to *size* a quiz. This one is
// the only place that needs the names themselves, in the order a learner would
// read them — exam by exam, plan order within an exam.
//
// Hooks can't be called in a loop, so the four studiable exams are spelled out
// the same way `useTodayQuizCounts` spells them out.

import { useMemo } from 'react'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { matchesSelectedVariant } from '@/data/examSittings'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

/** The exams that ship a syllabus a plan can be built from. */
const PLAN_EXAM_KEYS = ['P', 'FM', 'MAS-I', 'CAS-5'] as const

/** What a plan schedules today: its own concepts, or the spaced-review set. */
function conceptsFor(plan: StudyPlan | null): string[] {
  if (!plan) return []
  return plan.status === 'review_mode' ? plan.reviewConcepts : plan.todaysConcepts
}

export interface TodayPlanCardNames {
  /** Today's concepts, exam by exam, de-duplicated across exams. */
  names: string[]
  /** True while any exam's plan is still being generated. */
  loading: boolean
  /** True when at least one in-progress exam has a target date set — the same
   *  "the plan is set up" test the sheet's Today's Study Plan section uses. A
   *  plan object exists without one; it just has nothing to schedule against. */
  hasPlan: boolean
}

const EMPTY: TodayPlanCardNames = { names: [], loading: false, hasPlan: false }

/**
 * Today's plan concepts across every in-progress exam, as display names.
 */
export function useTodayPlanCardNames(): TodayPlanCardNames {
  const { syllabi } = useWikiSyllabus()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { progress: examProgress, targetDates, examVariants } = useExamProgress()

  // One syllabus per exam, honouring the sitting variant the learner selected
  // (an exam can ship more than one syllabus file, e.g. FM-2 vs FM-3).
  const syllabusFor = useMemo(() => {
    const map: Record<string, WikiExamSyllabus | null> = {}
    for (const key of PLAN_EXAM_KEYS) {
      const matches = syllabi.filter(s => wikiExamIdToProgressKey(s.examId) === key)
      map[key] =
        matches.find(s => matchesSelectedVariant(key, s.examId, examVariants[key])) ??
        matches[0] ??
        null
    }
    return map
  }, [syllabi, examVariants])

  // Only build a plan for an exam that is actually in progress — an idle exam's
  // plan is work nobody asked for, and its concepts don't belong in this list.
  const active = (key: string) => (examProgress[key] === 'in_progress' ? syllabusFor[key] : null)
  const syllabusP = active('P')
  const syllabusFM = active('FM')
  const syllabusMAS = active('MAS-I')
  const syllabusCAS5 = active('CAS-5')

  const { plan: planP, loading: loadingP } =
    useStudyPlan(syllabusP, masteryRecords, targetDates['P'] ?? null, masteryLoading)
  const { plan: planFM, loading: loadingFM } =
    useStudyPlan(syllabusFM, masteryRecords, targetDates['FM'] ?? null, masteryLoading)
  const { plan: planMAS, loading: loadingMAS } =
    useStudyPlan(syllabusMAS, masteryRecords, targetDates['MAS-I'] ?? null, masteryLoading)
  const { plan: planCAS5, loading: loadingCAS5 } =
    useStudyPlan(syllabusCAS5, masteryRecords, targetDates['CAS-5'] ?? null, masteryLoading)

  const loading = masteryLoading || loadingP || loadingFM || loadingMAS || loadingCAS5

  return useMemo(() => {
    const plans = [planP, planFM, planMAS, planCAS5]
    if (plans.every(p => !p)) return loading ? { ...EMPTY, loading: true } : EMPTY

    const seen = new Set<string>()
    const names: string[] = []
    for (const plan of plans) {
      for (const name of conceptsFor(plan)) {
        const key = name.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        names.push(name)
      }
    }
    return { names, loading, hasPlan: plans.some(p => !!p?.config?.targetReadyDate) }
  }, [planP, planFM, planMAS, planCAS5, loading])
}
