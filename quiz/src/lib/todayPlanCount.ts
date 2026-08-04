// How many questions are still needed to finish today's study plan, for one exam.
//
// This is the pure core behind the "questions left today" badge that appears on
// every surface a plan-completing quiz can be launched from (see
// components/TodayQuizBadge.tsx and hooks/useTodayQuizCount.ts). It mirrors the
// "Today's Quiz" auto-sizing on the Quiz tab (Landing.tsx's todaysPlanFullCount)
// so the badge always matches the size of the quiz the surface actually starts.

import { minQuestionsToCoverConcepts } from '@/lib/studyPlan'
import { planConceptsToday } from '@/lib/planCompletion'
import type { StudyPlan } from '@/lib/studyPlan'
import type { Question } from '@/lib/parser'

export interface TodayPlanCount {
  /** Fewest questions still needed to finish today's plan for this exam. */
  count: number
  /** True once every concept in today's plan has been levelled up today. */
  complete: boolean
}

const NO_PLAN: TodayPlanCount = { count: 0, complete: false }

/**
 * Fewest questions needed to finish today's plan for one exam, plus whether the
 * plan is already done. Drops concepts already done today (`doneConceptSlugs`,
 * built with `planDoneConceptSlugs` so it matches the checklist's ticks) so the
 * count matches what the next launched quiz will actually contain — same as
 * Landing.tsx's buildTodaysPlanSelection. When
 * everything's done it reports `complete` and falls back to the full plan's
 * count (a re-launch keeps those questions available for extra practice), so
 * callers that hide a finished plan should check `complete`, not `count` —
 * or just use {@link badgeCountFor}.
 *
 * `seenQuestionIds` (questions today's quizzes already served) is passed
 * straight through to the coverage helper, which prefers unseen questions — so
 * the count stays the size of the quiz the launch actually builds.
 */
export function todayPlanCountForExam(
  plan: StudyPlan | null,
  topic: string,
  allQuestions: Question[],
  doneConceptSlugs: Set<string> = new Set(),
  seenQuestionIds?: ReadonlySet<string>,
): TodayPlanCount {
  if (!plan) return NO_PLAN
  const displayConcepts = planConceptsToday(plan)
  if (displayConcepts.length === 0) return NO_PLAN

  const remaining = displayConcepts.filter(c => !doneConceptSlugs.has(c.toLowerCase()))
  const complete = remaining.length === 0
  const concepts = complete ? displayConcepts : remaining

  const conceptSet = new Set(concepts.map(c => c.toLowerCase()))
  const todayQs = allQuestions.filter(q => {
    if (q.exam !== topic) return false
    return q.wiki_link.some(link => {
      const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
      const n = clean.split('/').filter(Boolean).pop()?.toLowerCase() ?? ''
      return conceptSet.has(n)
    })
  })
  if (todayQs.length === 0) return { count: 0, complete }
  return { count: minQuestionsToCoverConcepts(todayQs, concepts, { seenIds: seenQuestionIds }), complete }
}

/** Count-only form of {@link todayPlanCountForExam}, for callers that don't
 *  care whether the plan is finished. */
export function questionsNeededForPlan(
  plan: StudyPlan | null,
  topic: string,
  allQuestions: Question[],
  doneConceptSlugs: Set<string> = new Set(),
  seenQuestionIds?: ReadonlySet<string>,
): number {
  return todayPlanCountForExam(plan, topic, allQuestions, doneConceptSlugs, seenQuestionIds).count
}

/** What the badge should show for one exam: the outstanding count, or 0 once the
 *  plan is done (a finished plan still has a re-launchable question count, but
 *  nothing left to nag about). */
export function badgeCountFor(entry: TodayPlanCount | undefined): number {
  if (!entry || entry.complete) return 0
  return entry.count
}
