// Questions still needed to finish today's study plan — per exam and summed
// across every active exam. This is the single source for the "questions left
// today" badge, which appears on every surface a quiz that would accomplish
// those questions can be started from (see components/TodayQuizBadge.tsx):
// the Quiz nav tab, the Sidebar Quiz row + exam-pill menu, the Quiz tab's exam
// cards and Start button, and the Dashboard's "Start Today's Quiz".
//
// The per-exam math lives in lib/todayPlanCount.ts (pure + tested); this hook
// only assembles the study plans it needs.

import { useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress, EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { todayPlanCountForExam } from '@/lib/todayPlanCount'
import { planDoneConceptSlugs } from '@/lib/planCompletion'
import { todayISO } from '@/lib/studyPlan'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { useTodayCompletions } from '@/hooks/useTodayCompletions'
import { useTodayAnsweredQuestions } from '@/hooks/useTodayAnsweredQuestions'
import type { TodayPlanCount } from '@/lib/todayPlanCount'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

export type { TodayPlanCount } from '@/lib/todayPlanCount'

export interface TodayQuizCounts {
  /** Per-exam counts, keyed by exam progress key (`P`, `FM`, `MAS-I`, `CAS-5`).
   *  Only exams marked "in progress" with an active plan get an entry. */
  byExam: Record<string, TodayPlanCount>
  /** Sum of the still-outstanding counts. Exams whose plan is already complete
   *  contribute 0, so the badge disappears once the day's work is done. */
  total: number
}

const EMPTY_COUNTS: TodayQuizCounts = { byExam: {}, total: 0 }

/**
 * Questions left in today's study plan, per exam and in total. Premium-only,
 * same as Today's Plan on the Quiz tab; returns empty for signed-out/free users.
 */
export function useTodayQuizCounts(): TodayQuizCounts {
  const { user } = useAuth()
  const { isPremium } = useSubscription()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()
  const { questions: allQuestions } = useAllQuestions()

  // Today's level-ups from this device merged with the cross-device signal —
  // the raw material for the "already done today" test below. Unscoped (every
  // exam) so one read serves all four plans; each plan only looks up its own
  // concepts.
  const completedToday = useTodayCompletions(null)

  // Questions today's quizzes already served — the launch prefers unseen ones,
  // so the badge has to size itself the same way.
  const answeredQuestionIds = useTodayAnsweredQuestions()

  const syllabusP    = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'P') ?? null
  const syllabusFM   = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'FM') ?? null
  const syllabusMAS  = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'MAS-I') ?? null
  const syllabusCAS5 = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'CAS-5') ?? null

  const { plan: planP }    = useStudyPlan(syllabusP,    masteryRecords, targetDates['P'] ?? null,     masteryLoading)
  const { plan: planFM }   = useStudyPlan(syllabusFM,   masteryRecords, targetDates['FM'] ?? null,    masteryLoading)
  const { plan: planMAS }  = useStudyPlan(syllabusMAS,  masteryRecords, targetDates['MAS-I'] ?? null, masteryLoading)
  const { plan: planCAS5 } = useStudyPlan(syllabusCAS5, masteryRecords, targetDates['CAS-5'] ?? null, masteryLoading)

  return useMemo(() => {
    if (!user || !isPremium) return EMPTY_COUNTS

    const plansByExamId: Record<string, StudyPlan | null> = {
      P: planP, FM: planFM, 'MAS-I': planMAS, 'CAS-5': planCAS5,
    }
    const syllabiByExamId: Record<string, WikiExamSyllabus | null> = {
      P: syllabusP, FM: syllabusFM, 'MAS-I': syllabusMAS, 'CAS-5': syllabusCAS5,
    }

    const today = todayISO()
    const byExam: Record<string, TodayPlanCount> = {}
    let total = 0
    for (const [examId, topic] of Object.entries(EXAM_ID_TO_TOPIC)) {
      if (examProgress[examId] !== 'in_progress') continue
      const plan = plansByExamId[examId] ?? null
      // Same "done today" rule the plan checklist ticks with, so the badge never
      // asks for questions against a concept the user sees struck through.
      const doneConceptSlugs = planDoneConceptSlugs({
        plan,
        syllabus: syllabiByExamId[examId] ?? null,
        masteryRecords,
        examProgressKey: examId,
        levelUps: completedToday,
        today,
      })
      const entry = todayPlanCountForExam(plan, topic, allQuestions, doneConceptSlugs, answeredQuestionIds)
      if (entry.count === 0 && !entry.complete) continue
      byExam[examId] = entry
      if (!entry.complete) total += entry.count
    }
    return { byExam, total }
  }, [user, isPremium, examProgress, allQuestions, planP, planFM, planMAS, planCAS5,
      syllabusP, syllabusFM, syllabusMAS, syllabusCAS5, masteryRecords, completedToday, answeredQuestionIds])
}

/** Total questions left in today's plan across every active exam. */
export function useTodayQuizCount(): number {
  return useTodayQuizCounts().total
}
