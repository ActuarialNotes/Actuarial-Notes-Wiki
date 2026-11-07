import { getSyllabusPdfLink } from '@/data/examPdfLinks'
import { PdfLinkButton } from '@/components/PdfLinkButton'
import { inkToolTile } from '@/components/ui/ink'

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
 * The header strip is one row shared with the exam's logo, its version menu
 * (`ExamVersionMenu`) and the sitting's info button (`ExamSittingInfoButton`),
 * so the button is drawn at the menu's height rather than a full PDF button's,
 * without the `PDF` chip (the icon and tooltip carry it), and on a phone
 * without its label too — the row is a phone's width, and PCPA's adds a
 * Project button to it.
 *
 * An exam whose syllabus isn't in `data/examPdfLinks.ts` renders nothing —
 * `getSyllabusPdfLink` returning null is the honest answer, where a guessed URL
 * is a 404 the candidate discovers for themselves.
 */
export function ExamSyllabusButton({
  examId,
  examLabel,
}: {
  examId: string
  examLabel: string
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
      // An Ink tool tile (style guide §7.0), like Info and Quiz beside it.
      className={inkToolTile(false, 'min-h-0 border-0 bg-transparent py-0 pt-0.5 shadow-none [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:text-current')}
      shortLabel="Syllabus"
    />
  )
}
