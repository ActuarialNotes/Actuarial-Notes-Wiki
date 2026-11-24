import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useExamProgress } from '@/contexts/examProgress'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { quizTabExam } from '@/lib/quizBuilder'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'

/**
 * Which exam the Quiz tab is on (docs/redesign-spec.md §6): the one its
 * address names (`?topic=`, a bank label), else the exam in focus. There is no
 * exam list: the exam is changed with the switcher in the strip.
 *
 * An address that names one of the reader's exams puts it in focus; one that
 * names any other exam opens its builder as a visit and leaves the focus
 * alone (lib/examFocus.ts). `topic` is '' when there is no builder to show: a
 * reader with no exams, or an exam in focus with no question bank.
 */
export function useQuizExamScreen() {
  const [searchParams] = useSearchParams()
  const { focusId, setFocusId } = useExamProgress()
  const { exams, active, activeKey, loading } = useExamInFocus()
  const urlTopic = searchParams.get('topic') ?? ''
  const exam = quizTabExam(urlTopic, active && activeKey ? { progressKey: activeKey, examId: active.examId } : null)

  // The reader's exam that the address names, if it does.
  const named = urlTopic && exam
    ? exams.find(e => wikiExamIdToProgressKey(e.examId) === exam.progressKey && (!exam.examId || e.examId === exam.examId))
    : undefined
  const namedId = named?.examId ?? null
  useEffect(() => {
    if (!loading && namedId && focusId !== namedId) setFocusId(namedId)
  }, [loading, namedId, focusId, setFocusId])

  return {
    topic: exam?.value ?? '',
    /** The address names the exam (a visit when it isn't one of the reader's). */
    visiting: !!urlTopic && !!exam && !named,
    /** The exam in focus, when it has no builder to open. */
    focusWithoutBank: !urlTopic && !exam ? active : null,
    hasExams: exams.length > 0,
    loading,
  }
}
