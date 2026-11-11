import { useId, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExamLogo } from '@/components/ExamLogo'
import { examProgressKeyFromFile } from '@/lib/examMenu'
import type { SyllabusAssignment } from '@/lib/resourceMeta'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

const ROW_CLASS = cn(
  'group flex w-full items-center gap-3 py-3 text-left transition-colors duration-150',
  'hover:bg-accent/40 active:bg-accent/60',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
)

/**
 * One exam a resource is a reading for, as a row of the resource page's
 * reference card (`ResourceReferenceCard`): the exam's logo and name. A row
 * with an assignment is a disclosure — open, it shows the chapters and
 * sections assigned, in the syllabus's words, and a button onto the exam's
 * study guide. A row with nothing to show opens the study guide directly.
 * `extractSyllabusAssignments` lifts the rows out of the page's
 * "On the syllabus" callout.
 */
export function SyllabusAssignmentRow({
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
