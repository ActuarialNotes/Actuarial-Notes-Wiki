import { getSyllabusPdfLink } from '@/data/examPdfLinks'
import { PdfLinkButton } from '@/components/PdfLinkButton'

/**
 * The publisher's syllabus for this exam, beside the study guide's title.
 *
 * The page below it is *our* reading of the syllabus — a candidate should be
 * able to check it against the examining body's own document without leaving
 * for a browser tab and finding their way back, so it opens in the same
 * slide-up reader every other PDF in the app does (`PdfLinkButton` →
 * `hooks/usePdfReader.ts`), with the publisher's copy and a download still one
 * tap away inside it.
 *
 * An exam whose syllabus isn't in `data/examPdfLinks.ts` renders nothing —
 * `getSyllabusPdfLink` returning null is the honest answer, where a guessed URL
 * is a 404 the candidate discovers for themselves.
 */
export function ExamSyllabusButton({ examId, examLabel }: { examId: string; examLabel: string }) {
  const link = getSyllabusPdfLink(examId)
  if (!link) return null

  return (
    <PdfLinkButton
      url={link.url}
      label={link.label}
      subtitle={examLabel}
      tooltip={`${examLabel} — the published syllabus (PDF)`}
      className="shrink-0"
    />
  )
}
