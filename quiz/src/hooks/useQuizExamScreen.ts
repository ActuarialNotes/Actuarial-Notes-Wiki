import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTodayExam } from '@/hooks/useTodayExam'
import { bankLabelFor } from '@/lib/examIds'
import { PRACTICE_EXAM_KEY, practiceTopic } from '@/lib/practiceHome'
import { quizExamFor } from '@/lib/quizBuilder'
import { moveScreen } from '@/lib/viewTransition'

function remembered(): string {
  try { return localStorage.getItem(PRACTICE_EXAM_KEY) ?? '' } catch { return '' }
}

/**
 * Which exam Practice is showing (`topic`, a bank label; '' for the exam
 * list), and the moves between them (docs/redesign-spec.md §7a.1).
 *
 * The page opens on the exam in focus: the one Today shows when the reader is
 * studying an exam with a question bank, else the exam last practised in this
 * browser (`practiceTopic`, lib/practiceHome.ts). `?topic=` names an exam
 * outright, which is how a quiz quit or finished comes back to the exam it
 * was started from, and `?exams=1` is the exam list, the way to another exam
 * until the exam switcher (§6, Phase E) replaces it. Each is an entry of its
 * own, so the browser's Back undoes the move.
 *
 * Opening an exam makes it the exam in focus: remembered here, and shown on
 * Today too when it is one the reader is studying.
 */
export function useQuizExamScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { active, selectByKey, loading } = useTodayExam()

  const urlTopic = searchParams.get('topic') ?? ''
  const showList = searchParams.get('exams') === '1'
  const focus = active ? bankLabelFor(active) ?? '' : ''
  const topic = practiceTopic({
    urlTopic,
    showList,
    focus,
    remembered: remembered(),
    offered: label => !!quizExamFor(label),
  })

  // The exam on screen is the one to open on next time.
  useEffect(() => {
    if (!topic || !quizExamFor(topic)) return
    try { localStorage.setItem(PRACTICE_EXAM_KEY, topic) } catch { /* private window */ }
  }, [topic])

  const openExam = useCallback((value: string) => {
    const exam = quizExamFor(value)
    if (exam) selectByKey(exam.progressKey)
    // Both screens are `/`, so the router sees no page move; the page names it
    // (lib/viewTransition.ts): an exam is laid over the list, and the list is
    // what lies under it.
    moveScreen('push', () => navigate(`/?topic=${encodeURIComponent(value)}`))
  }, [navigate, selectByKey])

  const showExams = useCallback(() => moveScreen('pop', () => navigate('/?exams=1')), [navigate])

  // A change of exam, or to the list, opens at the top like a new page.
  const shown = useRef(topic)
  useLayoutEffect(() => {
    if (shown.current === topic) return
    shown.current = topic
    window.scrollTo(0, 0)
  }, [topic])

  const focusLoading = loading && !urlTopic && !showList
  // With no exam to open on, the bare address is the exam list. It moves to the
  // list's own address, so Back from an exam picked there returns to the list
  // and not to the exam just remembered.
  useEffect(() => {
    if (!topic && !showList && !focusLoading) navigate('/?exams=1', { replace: true })
  }, [topic, showList, focusLoading, navigate])

  return { topic, openExam, showExams, focusLoading }
}
