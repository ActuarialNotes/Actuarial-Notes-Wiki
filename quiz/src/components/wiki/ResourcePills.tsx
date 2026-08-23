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
