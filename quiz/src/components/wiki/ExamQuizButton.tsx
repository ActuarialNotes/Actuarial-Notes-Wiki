import { Play } from 'lucide-react'
import { HeaderLinkButton } from '@/components/HeaderLinkButton'
import { examQuizTopic } from '@/lib/examMenu'

/**
 * The way from an exam's study guide to its quiz: the exam's bank, open in the
 * quiz builder — the same place the title menu's Start Quiz row goes, kept in
 * the sticky header so it is in reach however far down the syllabus the reader
 * is. Its counterpart on the builder is `QuizStudyGuideButton`.
 *
 * An exam with no bank (6U, PCPA) renders nothing.
 */
export function ExamQuizButton({ examFileName }: { examFileName: string }) {
  const topic = examQuizTopic(examFileName)
  if (!topic) return null
  return (
    <HeaderLinkButton
      to={`/?topic=${encodeURIComponent(topic)}&mode=quiz`}
      icon={Play}
      label="Start Quiz"
      title="Quiz on this exam's questions"
      iconOnlyOnPhone
    />
  )
}
