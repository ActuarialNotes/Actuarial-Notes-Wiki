import { FileText } from 'lucide-react'

// The metadata pills on a resource card — shared by the study-guide home
// shelf and the exam pages' source-material gallery so the two shelves stay
// the same object.
//
// Two weights, and the difference is the point (docs/style-guide.md §3): the
// bibliographic facts are supporting detail and stay muted, while the exam a
// source is a reading for is what a candidate is actually scanning the shelf
// for — so it leads the row in the primary tint.

export function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
      {children}
    </span>
  )
}

export function ExamPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
      {children}
    </span>
  )
}

/**
 * The source is a PDF the app reads — a card says so before it is opened, so a
 * shelf can be scanned for what is readable right now against what has to be
 * got hold of. The same page icon, in the same tint, that leads the resource
 * page's **Read PDF** button: the mark on the card is the button it leads to.
 * Set only for a PDF the reader opens (`WikiIndexItem.pdf`), never a guess.
 */
export function PdfPill() {
  return (
    <span
      title="PDF — read it in the app"
      className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground"
    >
      <FileText className="h-3 w-3 shrink-0 text-primary" aria-hidden />
      PDF
    </span>
  )
}
