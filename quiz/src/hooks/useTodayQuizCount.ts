// Questions still needed to finish today's study plan — per exam and summed
// across every active exam. This is the single source for the "questions left
// today" badge, which appears on every surface a quiz that would accomplish
// those questions can be started from (see components/TodayQuizBadge.tsx):
// the Quiz nav tab, the Sidebar Quiz row + exam-pill menu, the Quiz tab's exam
// cards and Start button, and the Dashboard's "Start Today's Quiz".
//
// The per-exam math lives in lib/todayPlanCount.ts (pure + tested); this hook
// only assembles the study plans it needs.

import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress, EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { todayPlanCountForExam } from '@/lib/todayPlanCount'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { readTodayLevelUps, LEVELUP_EVENT } from '@/lib/dailyProgressStore'
import { useTodayAnsweredQuestions } from '@/hooks/useTodayAnsweredQuestions'
import type { TodayPlanCount } from '@/lib/todayPlanCount'
import type { StudyPlan } from '@/lib/studyPlan'

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

  // Concepts levelled up today, so the total drops questions for exams whose
  // plan is already finished — same source Landing.tsx uses when it actually
  // sizes the launched quiz.
  const [todayLevelUps, setTodayLevelUps] = useState(() => readTodayLevelUps())
  useEffect(() => {
    const refresh = () => setTodayLevelUps(readTodayLevelUps())
    window.addEventListener(LEVELUP_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(LEVELUP_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  const doneConceptSlugs = useMemo(
    () => new Set(todayLevelUps.map(l => l.conceptSlug.toLowerCase())),
    [todayLevelUps],
  )

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

    const byExam: Record<string, TodayPlanCount> = {}
    let total = 0
    for (const [examId, topic] of Object.entries(EXAM_ID_TO_TOPIC)) {
      if (examProgress[examId] !== 'in_progress') continue
      const entry = todayPlanCountForExam(plansByExamId[examId], topic, allQuestions, doneConceptSlugs, answeredQuestionIds)
      if (entry.count === 0 && !entry.complete) continue
      byExam[examId] = entry
      if (!entry.complete) total += entry.count
    }
    return { byExam, total }
  }, [user, isPremium, examProgress, allQuestions, planP, planFM, planMAS, planCAS5, doneConceptSlugs, answeredQuestionIds])
}

/** Total questions left in today's plan across every active exam. */
export function useTodayQuizCount(): number {
  return useTodayQuizCounts().total
}
