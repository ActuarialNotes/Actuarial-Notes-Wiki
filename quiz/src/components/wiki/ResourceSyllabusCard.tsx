import { ChevronRight } from 'lucide-react'
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
 * `ui/ListPanel.tsx` — the exam's logo, its name, a chevron — since each row
 * opens that exam's study guide. The assignment itself is body text at the
 * article's size: it is the content of the row, not fine print.
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
          <li key={a.exam}>
            <button
              type="button"
              onClick={() => onOpen({ kind: 'exam', name: a.exam })}
              className={cn(
                'group relative flex w-full items-start gap-3 py-3 text-left transition-colors duration-150',
                'hover:bg-accent/40 active:bg-accent/60',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                compact ? 'pl-3 pr-2' : 'pl-4 pr-3',
                // The hairline between rows, inset to start under the text
                // (padding + the 34px tile + the gap), as ListPanel draws it.
                i > 0 && "before:pointer-events-none before:absolute before:right-0 before:top-0 before:h-px before:bg-border/60 before:content-['']",
                i > 0 && (compact ? 'before:left-[58px]' : 'before:left-[62px]'),
              )}
            >
              <ExamLogo examKey={examProgressKeyFromFile(a.exam)} size="md" />
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold leading-snug">{a.label}</span>
                {a.detail && (
                  <span className="mt-1 block text-base leading-relaxed text-foreground/80">
                    {plainText(a.detail)}
                  </span>
                )}
              </span>
              <ChevronRight
                className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
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
