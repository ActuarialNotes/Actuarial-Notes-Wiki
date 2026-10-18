import { useId, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExamLogo } from '@/components/ExamLogo'
import { examProgressKeyFromFile } from '@/lib/examMenu'
import type { SyllabusAssignment } from '@/lib/resourceMeta'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

/**
 * "On the syllabus" — the exams a resource is a reading for and what each
 * assigns, drawn directly under the metadata card rather than as a callout
 * part-way down the article (`extractSyllabusAssignments` lifts it out of the
 * page). It is the second half of the citation: the card says what the
 * document is, this says why a candidate is reading it.
 *
 * Same surface as `ResourceMetaCard` (hairline border, `bg-card`, the muted
 * kicker) so the two read as one block, and rows in the grouped-list shape of
 * `ui/ListPanel.tsx` — the exam's logo, its name, a chevron. A row with an
 * assignment is a disclosure: collapsed it names the exam, expanded it shows
 * the chapters and sections assigned and a button onto the exam's study guide.
 * A row with nothing to show opens the study guide directly.
 */
export function ResourceSyllabusCard({
  assignments,
  onOpen,
  compact,
  className,
}: {
  assignments: SyllabusAssignment[]
  onOpen: (ref: WikiEntryRef) => void
  compact?: boolean
  className?: string
}) {
  if (assignments.length === 0) return null
  return (
    <section
      aria-label="On the syllabus"
      className={cn(
        'not-prose overflow-hidden rounded-lg border border-border bg-card',
        compact ? 'mb-4' : 'mb-5',
        className,
      )}
    >
      <h2 className={cn(
        'text-[11px] font-semibold uppercase tracking-wider text-muted-foreground',
        compact ? 'px-3 pt-3 pb-1' : 'px-4 pt-4 pb-1',
      )}>
        On the syllabus
      </h2>
      <ul>
        {assignments.map((a, i) => (
          <li
            key={a.exam}
            className={cn(
              'relative',
              // The hairline between rows, inset to start under the text
              // (padding + the 34px tile + the gap), as ListPanel draws it.
              i > 0 && "before:pointer-events-none before:absolute before:right-0 before:top-0 before:h-px before:bg-border/60 before:content-['']",
              i > 0 && (compact ? 'before:left-[58px]' : 'before:left-[62px]'),
            )}
          >
            <AssignmentRow assignment={a} onOpen={onOpen} compact={compact} />
          </li>
        ))}
      </ul>
    </section>
  )
}

const ROW_CLASS = cn(
  'group flex w-full items-center gap-3 py-3 text-left transition-colors duration-150',
  'hover:bg-accent/40 active:bg-accent/60',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
)

function AssignmentRow({
  assignment: a,
  onOpen,
  compact,
}: {
  assignment: SyllabusAssignment
  onOpen: (ref: WikiEntryRef) => void
  compact?: boolean
}) {
  const [open, setOpen] = useState(false)
  const bodyId = useId()
  const pad = compact ? 'pl-3 pr-2' : 'pl-4 pr-3'
  const openExam = () => onOpen({ kind: 'exam', name: a.exam })
  const head = (
    <>
      <ExamLogo examKey={examProgressKeyFromFile(a.exam)} size="md" />
      <span className="min-w-0 flex-1 text-base font-semibold leading-snug">{a.label}</span>
    </>
  )

  if (!a.detail) {
    return (
      <button type="button" onClick={openExam} className={cn(ROW_CLASS, pad)}>
        {head}
        <ChevronRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden
        />
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
        className={cn(ROW_CLASS, pad)}
      >
        {head}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:text-foreground',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div
          id={bodyId}
          className={cn('pb-3', compact ? 'pl-[58px] pr-3' : 'pl-[62px] pr-4')}
        >
          <p className="text-base leading-relaxed text-foreground/80">{plainText(a.detail)}</p>
          <button
            type="button"
            onClick={openExam}
            className={cn(
              'mt-3 inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium',
              'transition-colors duration-150 hover:bg-accent/60',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            Open {a.label} study guide
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </>
  )
}

/**
 * The detail as text: a `[[link]]` in it reads as its label. The row is
 * already one button onto the exam, so a link inside it can't be a second
 * target.
 */
function plainText(detail: string): string {
  return detail.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target: string, label?: string) =>
    (label ?? target).trim(),
  )
}
