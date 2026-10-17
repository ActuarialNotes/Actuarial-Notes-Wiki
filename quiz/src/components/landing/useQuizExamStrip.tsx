import { useMemo } from 'react'
import { ExamLogo } from '@/components/ExamLogo'
import { FloatingSearchBack } from '@/components/FloatingSearchBar'
import { QuizExamInfoButton } from '@/components/QuizExamInfoButton'
import { filterQuestions, type Question } from '@/lib/parser'
import { quizWikiExamId, type QuizExam } from '@/lib/quizBuilder'

/**
 * The strip that names the exam being configured in the search bar — the
 * study guide's strip (WikiExam), less what is about a sitting rather than a
 * quiz: no version menu, no syllabus. Its info button describes the bank
 * instead (QuizExamInfoButton). Undefined on the exam list.
 */
export function useQuizExamStrip(
  exam: QuizExam | undefined,
  questions: Question[],
  onBack: () => void,
) {
  const topic = exam?.value ?? ''
  const examBank = useMemo(
    () => (topic ? filterQuestions(questions, { exam: topic, includeOffSyllabus: true }) : []),
    [questions, topic],
  )
  if (!exam) return undefined
  return {
    title: exam.label,
    icon: <ExamLogo examKey={exam.progressKey} size="md" />,
    backLink: <FloatingSearchBack label="Change exam" onClick={onBack} />,
    actions: (
      <QuizExamInfoButton
        exam={exam.value}
        examLabel={exam.label}
        progressKey={exam.progressKey}
        // The study guide's id, for Exam 6's variants (`6c-1`).
        wikiExamId={quizWikiExamId(exam)}
        questions={examBank}
      />
    ),
  }
}
