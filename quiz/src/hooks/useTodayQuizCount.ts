// Total number of questions needed to complete today's study plan across every
// active exam — mirrors the per-exam "Today's Quiz" auto-sizing on the Quiz tab
// (see Landing.tsx's todaysPlanFullCount), summed for the Quiz nav badge.

import { useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress, EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { minQuestionsToCoverConcepts } from '@/lib/studyPlan'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { StudyPlan } from '@/lib/studyPlan'
import type { Question } from '@/lib/parser'

function questionsNeededForPlan(
  plan: StudyPlan | null,
  topic: string,
  allQuestions: Question[],
): number {
  if (!plan) return 0
  const displayConcepts = plan.status === 'review_mode' ? (plan.reviewConcepts ?? []) : plan.todaysConcepts
  if (displayConcepts.length === 0) return 0

  const conceptSet = new Set(displayConcepts.map(c => c.toLowerCase()))
  const todayQs = allQuestions.filter(q => {
    if (q.exam !== topic) return false
    return q.wiki_link.some(link => {
      const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
      const n = clean.split('/').filter(Boolean).pop()?.toLowerCase() ?? ''
      return conceptSet.has(n)
    })
  })
  if (todayQs.length === 0) return 0
  return minQuestionsToCoverConcepts(todayQs, displayConcepts)
}

/**
 * Sum of the fewest-questions-to-complete-today's-plan across every exam the
 * user has marked "in progress" and has an active study plan for. Premium-only,
 * same as Today's Plan on the Quiz tab; returns 0 for signed-out/free users.
 */
export function useTodayQuizCount(): number {
  const { user } = useAuth()
  const { isPremium } = useSubscription()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()
  const { questions: allQuestions } = useAllQuestions()

  const syllabusP    = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'P') ?? null
  const syllabusFM   = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'FM') ?? null
  const syllabusMAS  = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'MAS-I') ?? null
  const syllabusCAS5 = syllabi.find(s => wikiExamIdToProgressKey(s.examId) === 'CAS-5') ?? null

  const { plan: planP }    = useStudyPlan(syllabusP,    masteryRecords, targetDates['P'] ?? null,     masteryLoading)
  const { plan: planFM }   = useStudyPlan(syllabusFM,   masteryRecords, targetDates['FM'] ?? null,    masteryLoading)
  const { plan: planMAS }  = useStudyPlan(syllabusMAS,  masteryRecords, targetDates['MAS-I'] ?? null, masteryLoading)
  const { plan: planCAS5 } = useStudyPlan(syllabusCAS5, masteryRecords, targetDates['CAS-5'] ?? null, masteryLoading)

  return useMemo(() => {
    if (!user || !isPremium) return 0

    const plansByExamId: Record<string, StudyPlan | null> = {
      P: planP, FM: planFM, 'MAS-I': planMAS, 'CAS-5': planCAS5,
    }

    let total = 0
    for (const [examId, topic] of Object.entries(EXAM_ID_TO_TOPIC)) {
      if (examProgress[examId] !== 'in_progress') continue
      total += questionsNeededForPlan(plansByExamId[examId], topic, allQuestions)
    }
    return total
  }, [user, isPremium, examProgress, allQuestions, planP, planFM, planMAS, planCAS5])
}
