import { useMemo } from 'react'
import { ExamLogo } from '@/components/ExamLogo'
import { FloatingSearchBack } from '@/components/FloatingSearchBar'
import { QuizExamInfoButton } from '@/components/QuizExamInfoButton'
import { QuizStudyGuideButton } from '@/components/landing/QuizStudyGuideButton'
import { examStudyGuideFor } from '@/lib/examMenu'
import { filterQuestions, type Question } from '@/lib/parser'
import { quizWikiExamId, type QuizExam } from '@/lib/quizBuilder'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

/**
 * The strip that names the exam being configured in the search bar — the
 * study guide's strip (WikiExam), less what is about a sitting rather than a
 * quiz: no version menu, no syllabus. Its info button describes the bank
 * instead (QuizExamInfoButton) — and where the study guide's strip has a
 * Start Quiz, this has the way back to the study guide. Undefined on the exam
 * list.
 */
export function useQuizExamStrip(
  exam: QuizExam | undefined,
  questions: Question[],
  syllabi: WikiExamSyllabus[],
  onBack: () => void,
) {
  const topic = exam?.value ?? ''
  const examBank = useMemo(
    () => (topic ? filterQuestions(questions, { exam: topic, includeOffSyllabus: true }) : []),
    [questions, topic],
  )
  const studyGuide = useMemo(() => examStudyGuideFor(syllabi, topic), [syllabi, topic])
  if (!exam) return undefined
  return {
    title: exam.label,
    icon: <ExamLogo examKey={exam.progressKey} size="md" />,
    backLink: <FloatingSearchBack label="Change exam" onClick={onBack} />,
    actions: (
      <span className="inline-flex items-center gap-1.5 shrink-0">
        <QuizExamInfoButton
          exam={exam.value}
          examLabel={exam.label}
          progressKey={exam.progressKey}
          // The study guide's id, for Exam 6's variants (`6c-1`).
          wikiExamId={quizWikiExamId(exam)}
          questions={examBank}
        />
        {studyGuide && <QuizStudyGuideButton examFileName={studyGuide} />}
      </span>
    ),
  }
}
