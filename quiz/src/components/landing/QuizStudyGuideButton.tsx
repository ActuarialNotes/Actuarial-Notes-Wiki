import { BookOpen } from 'lucide-react'
import { HeaderLinkButton } from '@/components/HeaderLinkButton'
import { wikiRoute } from '@/lib/wikiRoutes'

/**
 * The way from the quiz builder to the exam's study guide, in the builder's
 * strip beside its info button. The counterpart of the study guide's
 * **Start Quiz** (`ExamQuizButton`), so the two are one round trip.
 */
export function QuizStudyGuideButton({ examFileName }: { examFileName: string }) {
  return (
    <HeaderLinkButton
      to={wikiRoute({ kind: 'exam', name: examFileName })}
      icon={BookOpen}
      label="Study Guide"
      title="This exam's study guide — its syllabus, concepts and readings"
    />
  )
}
