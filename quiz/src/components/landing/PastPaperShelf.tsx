import { useMemo } from 'react'
import { PastExamBrowser } from '@/components/PastExamBrowser'
import { filterQuestions, type Question, type QuizMode } from '@/lib/parser'
import { practiceExamQuestions, type PastExamRow } from '@/lib/pastExams'
import { shelfPdfLinks, type QuizSitting } from '@/lib/quizBuilder'

/**
 * The past-paper source on the quiz builder: the exam's sittings
 * (`buildPastExamRows`, docs/mock-exam-browser.md) under the generated Mix,
 * with the documents behind the selection.
 */
export function PastPaperShelf({
  topic,
  examLabel,
  questions,
  rows,
  selected,
  onSelect,
  mode,
  count,
}: {
  /** The exam, as a bank label. */
  topic: string
  examLabel: string
  questions: Question[]
  rows: PastExamRow[]
  selected: QuizSitting
  onSelect: (sitting: QuizSitting) => void
  mode: QuizMode
  /** The quiz's question count. */
  count: number
}) {
  // What the "Mix" row draws: the exam-shaped question count, unless the bank
  // holds fewer than that.
  const practiceCount = practiceExamQuestions(topic)
  const examQuestionCount = useMemo(
    () => (topic ? filterQuestions(questions, { exam: topic }).length : 0),
    [questions, topic],
  )
  const mixQuestionCount = Math.min(practiceCount, examQuestionCount || practiceCount)

  // The source paper behind the current selection, and its worked solutions
  // where they're a separate download.
  const { reportLink, solutionsLink } = shelfPdfLinks(topic, selected, rows.length)

  return (
    <PastExamBrowser
      rows={rows}
      selected={selected}
      onSelect={onSelect}
      mixCount={mode === 'mock-exam' ? mixQuestionCount : Math.min(count, examQuestionCount)}
      examLabel={examLabel}
      reportLink={reportLink}
      solutionsLink={solutionsLink}
    />
  )
}
