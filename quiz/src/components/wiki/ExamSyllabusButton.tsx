import { getSyllabusPdfLink } from '@/data/examPdfLinks'
import { PdfLinkButton } from '@/components/PdfLinkButton'

/**
 * The publisher's syllabus for this exam, in the study guide's sticky header.
 *
 * The page below it is *our* reading of the syllabus — a candidate should be
 * able to check it against the examining body's own document without leaving
 * for a browser tab and finding their way back, so it opens in the same
 * slide-up reader every other PDF in the app does (`PdfLinkButton` →
 * `hooks/usePdfReader.ts`), with the publisher's copy and a download still one
 * tap away inside it. It rides the header rather than the title so it stays in
 * reach however far down the syllabus the reader has scrolled.
 *
 * The header strip is one row shared with the exam's logo, today's-plan pill
 * and status badge, so the button is drawn at the pill's height rather than a
 * full PDF button's, and without the `PDF` chip (the icon and tooltip carry
 * it). `iconOnlyOnPhone` drops the word below `sm` for when the plan pill is
 * also on the row — three controls and the logo don't fit a phone otherwise.
 *
 * An exam whose syllabus isn't in `data/examPdfLinks.ts` renders nothing —
 * `getSyllabusPdfLink` returning null is the honest answer, where a guessed URL
 * is a 404 the candidate discovers for themselves.
 */
export function ExamSyllabusButton({
  examId,
  examLabel,
  iconOnlyOnPhone = false,
}: {
  examId: string
  examLabel: string
  iconOnlyOnPhone?: boolean
}) {
  const link = getSyllabusPdfLink(examId)
  if (!link) return null

  return (
    <PdfLinkButton
      url={link.url}
      label={link.label}
      subtitle={examLabel}
      tooltip={`${examLabel} — the published syllabus (PDF)`}
      chip={false}
      labelClassName={iconOnlyOnPhone ? 'hidden sm:inline' : undefined}
      className="shrink-0 min-h-0 h-8 gap-1.5 px-2.5 py-1 text-xs"
    />
  )
}
