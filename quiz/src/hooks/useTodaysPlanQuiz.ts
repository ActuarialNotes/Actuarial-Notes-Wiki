import { useCallback, useMemo } from 'react'
import { EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useTodayCompletions } from '@/hooks/useTodayCompletions'
import { useTodayAnsweredQuestions } from '@/hooks/useTodayAnsweredQuestions'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { Question } from '@/lib/parser'
import { planConceptsToday, planDoneConceptSlugs } from '@/lib/planCompletion'
import { questionsOnConcepts, todayConceptChips, todaysPlanSelection } from '@/lib/quizBuilder'
import { minQuestionsToCoverConcepts, todayISO } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

/**
 * Today's study plan for the exam open in the quiz builder (`topic`, a bank
 * label): the plan itself, the concepts it names, and the question pool that
 * finishes it. The builder's choices — which source, how many questions —
 * stay with the page; this is what the plan offers it.
 */
export function useTodaysPlanQuiz({
  topic,
  syllabi,
  masteryRecords,
  masteryLoading,
  targetDates,
  examProgress,
  questions,
  inLevels,
}: {
  topic: string
  syllabi: WikiExamSyllabus[]
  masteryRecords: ConceptMasteryRecord[]
  masteryLoading: boolean
  targetDates: Record<string, string | null | undefined>
  examProgress: Record<string, string | undefined>
  questions: Question[]
  /** The difficulty filter (`inDifficultyLevels`). */
  inLevels: (q: Question) => boolean
}) {
  const syllabusForTopic = useMemo(
    () => syllabi.find(s => s.examTopic === topic || s.examLabel === topic) ?? null,
    [syllabi, topic],
  )

  const examIdForPlan = useMemo(
    () => Object.entries(EXAM_ID_TO_TOPIC).find(([, t]) => t === topic)?.[0] ?? null,
    [topic],
  )
  const examDateForPlan = examIdForPlan ? (targetDates[examIdForPlan] ?? null) : null

  // Today's Plan only applies to the exam the user is actively working
  // toward — not every exam they happen to browse to on this screen.
  const examInProgress = !!examIdForPlan && examProgress[examIdForPlan] === 'in_progress'

  const { plan, loading: planLoading } = useStudyPlan(
    syllabusForTopic,
    masteryRecords,
    examDateForPlan,
    masteryLoading,
  )

  // Concepts from today's study plan (used for "today" badges on concept cards)
  const todayConcepts = useMemo(() => todayConceptChips(plan), [plan])

  // Concepts in today's plan (handles review_mode), for the plan's list and count.
  const todayConceptNames = useMemo(() => planConceptsToday(plan), [plan])

  // Questions available for today's study plan concepts — every concept it
  // names, not only those still to do.
  const todayAvailableCount = useMemo(() => {
    if (!plan || !topic || !todayConceptNames.length) return 0
    return questionsOnConcepts(questions, topic, todayConceptNames, inLevels).length
  }, [plan, questions, topic, inLevels, todayConceptNames])

  // Questions today's quizzes have already served — held back from the draw so a
  // re-launch of the plan gives new questions instead of the ones just answered.
  const todayAnsweredIds = useTodayAnsweredQuestions()

  // Today's level-ups (this device merged with the cross-device signal) — the
  // input to the "already done today" test the plan checklist ticks with.
  const completedToday = useTodayCompletions(examIdForPlan)

  // Concepts today's plan still wants worked on, by the same rule the Dashboard
  // checklist paints with: dropped once advanced today (anywhere) or once
  // mastery already sits at today's target. Sizing off level-ups alone kept
  // asking for concepts that need no work — a Level 3 maintenance refresher is
  // already at target and can never produce a level-up. See lib/planCompletion.
  const doneConceptSlugs = useMemo(
    () => planDoneConceptSlugs({
      plan,
      syllabus: syllabusForTopic,
      masteryRecords,
      examProgressKey: examIdForPlan,
      levelUps: completedToday,
      today: todayISO(),
    }),
    [plan, syllabusForTopic, masteryRecords, examIdForPlan, completedToday],
  )

  // Resolve today's plan into the concepts still to be completed and the question
  // pool that can cover them (`todaysPlanSelection`) — the `seenIds` option on
  // the coverage helpers is what keeps extra practice on a finished plan from
  // being a replay of the questions just answered. The pool keeps to the
  // difficulty choice unless `allLevels` asks for every level (the menu's
  // per-level counts).
  const buildTodaysPlanSelection = useCallback(
    (allLevels = false) =>
      todaysPlanSelection(plan, topic, questions, doneConceptSlugs, allLevels ? undefined : inLevels),
    [plan, topic, questions, doneConceptSlugs, inLevels],
  )

  // Fewest questions needed to cover the whole (remaining) plan — the count a
  // dashboard-launched Today's Quiz auto-selects to complete the day's plan.
  const todaysPlanFullCount = useMemo(() => {
    const sel = buildTodaysPlanSelection()
    if (!sel) return 0
    return minQuestionsToCoverConcepts(sel.todayQs, sel.concepts, { seenIds: todayAnsweredIds })
  }, [buildTodaysPlanSelection, todayAnsweredIds])

  return {
    syllabusForTopic,
    examIdForPlan,
    examInProgress,
    plan,
    planLoading,
    todayConcepts,
    todayConceptNames,
    planConceptCount: todayConceptNames.length,
    todayAvailableCount,
    todayAnsweredIds,
    buildTodaysPlanSelection,
    todaysPlanFullCount,
  }
}
