import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useExamProgress } from '@/contexts/examProgress'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { bankLabelFor } from '@/lib/examIds'
import { practiceTopic } from '@/lib/practiceHome'
import { quizExamFor } from '@/lib/quizBuilder'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'

/**
 * Which exam Practice is showing (`topic`, a bank label), from the address or
 * the exam in focus (docs/redesign-spec.md §6, §7a.1). There is no exam list:
 * the exam is changed with the switcher at the top of the page.
 *
 * `?topic=` names an exam outright, which is how a quiz quit or finished comes
 * back to the exam it was started from. If it is one of the reader's exams it
 * comes into focus; any other exam opens as a visit and leaves the focus alone
 * (lib/examFocus.ts). `topic` is '' when there is nothing to open: a reader
 * with no exams, or an exam in focus with no question bank. `?exams=1`, the
 * exam list's address until Phase E, reads as the bare page.
 */
export function useQuizExamScreen() {
  const [searchParams] = useSearchParams()
  const { focusId, setFocusId } = useExamProgress()
  const { exams, active, loading } = useExamInFocus()

  const urlTopic = searchParams.get('topic') ?? ''
  const focus = active ? bankLabelFor(active) ?? '' : ''
  const topic = practiceTopic({
    urlTopic,
    showList: false,
    focus,
    remembered: '',
    offered: label => !!quizExamFor(label),
  })
  const exam = topic ? quizExamFor(topic) : undefined

  // The reader's exam that the address names, when it names one of theirs.
  const named = urlTopic && exam
    ? exams.find(e => wikiExamIdToProgressKey(e.examId) === exam.progressKey && (!exam.examId || e.examId === exam.examId))
    : undefined
  const namedId = named?.examId ?? null
  useEffect(() => {
    if (!loading && namedId && focusId !== namedId) setFocusId(namedId)
  }, [loading, namedId, focusId, setFocusId])

  // A change of exam opens at the top, like a new page.
  const shown = useRef(topic)
  useLayoutEffect(() => {
    if (shown.current === topic) return
    shown.current = topic
    window.scrollTo(0, 0)
  }, [topic])

  return {
    topic,
    /** The address names an exam that isn't one of the reader's. */
    visiting: !!urlTopic && !!exam && !named && !loading,
    /** The exam in focus, when it has no question bank to open. */
    focusWithoutBank: !topic ? active : null,
    hasExams: exams.length > 0,
    /** The reader's exams are still loading and nothing names an exam yet. */
    focusLoading: loading && !urlTopic,
  }
}
