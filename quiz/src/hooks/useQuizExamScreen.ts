import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNavTrail } from '@/hooks/useBack'
import { isExamList } from '@/lib/quizBuilder'
import { moveScreen } from '@/lib/viewTransition'

/**
 * Which screen the Quiz tab is on: the exam list, or one exam's builder
 * (`topic`, a bank label; '' for the list).
 *
 * Picking an exam lays its builder over the exam list, and the back arrow
 * swipes it off again. Both are this one address, so the router never sees
 * the move; the page names it (`moveScreen`, lib/viewTransition.ts). The
 * builder opens at its top, the way a new page does, and the list comes back
 * scrolled to where it was left — set in a layout effect, so the new screen
 * is in place before the transition takes its picture.
 *
 * The exam is in the address all the same (`?topic=`), as an entry of its
 * own: the browser's Back closes the builder, a quiz quit or finished comes
 * back to *this exam's* builder rather than the list, and the builder is
 * named on the trail (`hooks/useBack.ts`) so the pages after it say so.
 */
export function useQuizExamScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [topic, setTopic] = useState(() => searchParams.get('topic') ?? '')

  const listScrollRef = useRef(0)
  const trail = useNavTrail()
  function openExam(value: string) {
    listScrollRef.current = window.scrollY
    moveScreen('push', () => {
      setTopic(value)
      navigate(`/?topic=${encodeURIComponent(value)}`)
    })
  }
  function closeExam() {
    // Opened from the list just before: Back to it, the browser's own Back.
    const previous = trail.entries[trail.index - 1]
    if (previous && isExamList(previous.path)) {
      navigate(-1)
      return
    }
    moveScreen('pop', () => {
      setTopic('')
      navigate('/', { replace: true })
    })
  }
  // Back and Forward move the address under the page: follow it, as the same
  // move a click would have made.
  const urlTopic = searchParams.get('topic') ?? ''
  const topicRef = useRef(topic)
  topicRef.current = topic
  useEffect(() => {
    if (urlTopic === topicRef.current) return
    if (urlTopic) listScrollRef.current = window.scrollY
    moveScreen(urlTopic ? 'push' : 'pop', () => setTopic(urlTopic))
  }, [urlTopic])

  const hasTopic = topic !== ''
  const shownHasTopic = useRef(hasTopic)
  useLayoutEffect(() => {
    if (shownHasTopic.current === hasTopic) return
    shownHasTopic.current = hasTopic
    window.scrollTo(0, hasTopic ? 0 : listScrollRef.current)
  }, [hasTopic])

  return { topic, openExam, closeExam }
}
