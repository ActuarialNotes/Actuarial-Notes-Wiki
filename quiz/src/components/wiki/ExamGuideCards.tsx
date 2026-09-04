import { useId, useMemo, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, Compass } from 'lucide-react'
import { guideForExam } from '@/data/examGuides'
import { GUIDE_TITLE, guideLabel, type ExamGuide } from '@/lib/examGuides'
import { useConceptPopup } from '@/hooks/useConceptPopup'

/**
 * The orientation row above an exam page's learning objectives: the readiness
 * card and the "How to Study" card, and the list of tips the guide opens.
 *
 * The two cards are the same size and the same shape — a horizontal
 * `rounded-lg bg-card` row at a learning objective's padding (`MarkdownCallout`'s
 * `px-4 py-3`, tightened to `px-3` below `sm` where the row is two-up on a
 * phone), each carrying a mark, a two-line label and a chevron — so the row
 * reads as the head of the list it introduces rather than a banner over it. The
 * guide's second line is the exam it is for, the readiness card's is its band.
 *
 * The guide card is a disclosure, not a dialog: it expands in place to the list
 * of its tips, the way a learning objective expands to its concepts. Each tip
 * is a page of the vault (`Guides/<exam page>/<tip>.md`) and opens in the
 * concept viewer, so a tip is read, linked and walked exactly like a concept —
 * the popup's Previous / Next steps through the guide in order, and a
 * `[[wikilink]]` inside a tip stacks the concept on top of it.
 *
 * Content lives in `Guides/` (see `data/examGuides.ts`); `WikiArticle` decides
 * where the row lands (the `<div class="exam-guides"></div>` marker in the exam
 * markdown).
 */

interface CardProps {
  guide: ExamGuide
  open: boolean
  panelId: string
  onToggle: () => void
}

function ExamGuideCard({ guide, open, panelId, onToggle }: CardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={guideLabel(guide)}
      className="flex min-w-0 flex-1 basis-0 items-center gap-2.5 rounded-lg bg-card px-3 py-3 text-left text-card-foreground sm:gap-3 sm:px-4 transition-colors duration-150 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* The learning-objective header row, part for part: mark, label, and the
          disclosure chevron. No page count — it sat where an objective puts its
          exam weight, which made it look like a figure worth reading. */}
      <Compass className="h-4 w-4 shrink-0 text-primary" />
      <span className="min-w-0 flex-1">
        {/* Two lines rather than "How to Study for Exam MAS-I" on one: at half
            the row the single line either wraps to three or truncates away the
            exam — which is the half a reader needs. */}
        <span className="block truncate text-sm font-medium text-foreground">{GUIDE_TITLE}</span>
        <span className="block truncate text-xs text-muted-foreground">{guide.examLabel}</span>
      </span>
      <ChevronDown
        className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
        aria-hidden="true"
      />
    </button>
  )
}

interface ListProps {
  guide: ExamGuide
  panelId: string
  onOpen: (index: number) => void
}

/**
 * The guide's tips, listed the way a learning objective lists what it covers:
 * one row each, in reading order, each opening its page in the concept viewer.
 */
function ExamGuideList({ guide, panelId, onOpen }: ListProps) {
  return (
    <ul id={panelId} className="mt-2 overflow-hidden rounded-lg bg-card">
      {guide.pages.map((page, i) => (
        <li key={page.ref.path} className="border-t border-border/40 first:border-t-0">
          <button
            type="button"
            onClick={() => onOpen(i)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span className="w-4 shrink-0 text-xs tabular-nums text-muted-foreground">{i + 1}</span>
            <span className="min-w-0 flex-1 text-sm font-medium text-foreground">{page.title}</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  )
}

interface ExamGuideCardsProps {
  examId: string
  /**
   * A card rendered first in the row, beside the guide — the readiness card
   * (`ExamReadinessCard`). Passed in rather than imported because it needs the
   * page's syllabus and concept-popup wiring, which live in `WikiExam`.
   */
  leadCard?: ReactNode
}

export function ExamGuideCards({ examId, leadCard }: ExamGuideCardsProps) {
  const guide = useMemo(() => guideForExam(examId), [examId])
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const openAt = useConceptPopup(s => s.openAt)
  if (!guide && !leadCard) return null

  // The walk the popup's Previous / Next follows is the guide itself, and the
  // page it was opened from is the exam page — the same source path every other
  // way into the popup from this page reports.
  const openTip = (index: number) => {
    if (!guide) return
    openAt(guide.pages.map(p => p.ref), index, guide.examPage)
  }

  return (
    <div className="not-prose my-4">
      <div className="flex items-stretch gap-3">
        {leadCard}
        {guide && (
          <ExamGuideCard
            guide={guide}
            open={open}
            panelId={panelId}
            onToggle={() => setOpen(o => !o)}
          />
        )}
      </div>
      {guide && open && <ExamGuideList guide={guide} panelId={panelId} onOpen={openTip} />}
    </div>
  )
}
