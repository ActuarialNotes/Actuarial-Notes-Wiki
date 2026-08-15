import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CaseStudyPanel } from '@/components/CaseStudyPanel'
import { getCaseStudy } from '@/data/caseStudies'
import type { Question } from '@/lib/parser'

interface Props {
  question: Question
}

/**
 * The "Case Study" button a question carries when it can only be answered
 * against a supplemental booklet, plus the panel it opens.
 *
 * Self-contained on purpose: it renders nothing at all unless the question
 * declares a `case_study` that resolves, so every surface that shows a question
 * can drop it in unconditionally and surfaces that never see one pay nothing.
 * That's why it lives with the question rather than in the quiz chrome — a
 * candidate meeting one of these questions in search, in review or in a mock
 * exam needs the booklet just as much as one meeting it mid-quiz.
 */
export function CaseStudyLink({ question }: Props) {
  const [open, setOpen] = useState(false)
  const study = getCaseStudy(question.case_study)
  if (!study) return null

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        // w-fit: the card header is a flex column, which would otherwise
        // stretch the button to the full card width and make it read as a
        // banner rather than a control.
        className="w-fit mb-3 gap-2"
        title={`Open ${study.title}`}
      >
        <BookOpen className="h-4 w-4" />
        Case Study
      </Button>
      {open && <CaseStudyPanel study={study} onClose={() => setOpen(false)} />}
    </>
  )
}
