import { useMemo } from 'react'
import { QuizExamInfoButton } from '@/components/QuizExamInfoButton'
import { QuizStudyGuideButton } from '@/components/landing/QuizStudyGuideButton'
import { examAccentStyle } from '@/lib/examColors'
import { examStudyGuideFor } from '@/lib/examMenu'
import { ExamSwitcherButton } from '@/components/switcher/ExamSwitcherButton'
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
  /** The exam's study guide page id, when the builder is open on an exam the reader hasn't added. */
  visiting: string | null,
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
    // The strip's icon is the exam switcher: this exam, and the way to the reader's others.
    icon: <ExamSwitcherButton examKey={exam.progressKey} label={exam.label} visiting={visiting} />,
    actions: (
      // The exam's scope, so what is chosen in the strip fills with its colour.
      <span className="inline-flex items-center gap-0.5 shrink-0" style={examAccentStyle(exam.progressKey)}>
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
