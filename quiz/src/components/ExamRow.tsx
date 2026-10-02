// An exam as a row of a grouped list (`components/ui/ListPanel.tsx`) — the one
// way the Quiz tab and the Study Guides tab list exams, so the same exam is the
// same object on both: its logo, its name with the material's status beside it,
// its topic, a line of facts, and a chevron.
//
// The two tabs differ only in what the facts are (a question count on one, how
// ready the reader is on the other) and where the row goes, so those are the
// props; everything about how an exam *looks* lives here. They used to be two
// card components, kept in step by hand and by comment — and they drifted.
//
// The exam's accent (`lib/examColors.ts`) is the row's press and hover wash, so
// a tap answers in the exam's own colour. A requirement with no rung on the
// ladder (the DISCs) keeps the neutral wash `ListRow` starts with.

import type { ReactNode } from 'react'
import { Hammer } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { ListRow } from '@/components/ui/ListPanel'
import { examAccentStyle } from '@/lib/examColors'
import { EXAM_STATUS_LABEL, type ExamStatus } from '@/lib/examStatus'

export function ExamRow({
  examKey,
  title,
  topic,
  status,
  meta,
  trailing,
  to,
  onClick,
  tourId,
}: {
  /** The `exam_progress` key: `P`, `FM`, `MAS-I`, `CAS-5`, … */
  examKey: string
  title: string
  topic?: string | null
  /** How far along the exam's material is (`lib/examStatus.ts`). */
  status: ExamStatus
  /** The facts under the topic — `ExamRowMeta` keeps their separators. */
  meta?: ReactNode
  /** Before the chevron: today's plan count, a completed check. */
  trailing?: ReactNode
  to?: string
  onClick?: () => void
  tourId?: string
}) {
  const accent = examAccentStyle(examKey)
  const inDevelopment = status === 'development'

  return (
    <ListRow
      to={to}
      onClick={onClick}
      data-tour={tourId}
      style={accent}
      className={
        accent
          ? 'hover:bg-[color:var(--exam-accent-soft)] active:bg-[color:var(--exam-accent-soft)]'
          : undefined
      }
      // Decorative: the title beside it names the exam. An unbuilt exam keeps
      // its hue as a tint rather than a fill, so it never reads as material
      // to study from.
      leading={<ExamLogo examKey={examKey} size="lg" muted={inDevelopment} />}
      title={title}
      tag={<ExamStatusTag status={status} />}
      subtitle={topic}
      meta={meta}
      trailing={trailing}
      dimmed={inDevelopment}
    />
  )
}

/**
 * The material's status, as a tag beside the exam's name. Style guide §4.1:
 * Beta is a caution and takes amber; In Development is the same caution said
 * more strongly, in the dashed "nothing here yet" material. A finished exam
 * (P, FM) carries none.
 */
function ExamStatusTag({ status }: { status: ExamStatus }) {
  const label = EXAM_STATUS_LABEL[status]
  if (!label) return null
  return status === 'development' ? (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-muted-foreground/40 px-1.5 text-[11px] font-semibold leading-[18px] text-muted-foreground">
      <Hammer className="h-3 w-3" aria-hidden />
      {label}
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center rounded-full bg-amber-500/15 px-1.5 text-[11px] font-semibold leading-[18px] text-amber-600 dark:text-amber-400">
      {label}
    </span>
  )
}

/**
 * The row's facts, in order, with a dot between each — plain text, so nothing
 * under the title looks like a control. Empty entries are skipped, so a caller
 * can list what *might* be known.
 */
export function ExamRowMeta({ items }: { items: ReactNode[] }) {
  const shown = items.filter(item => item !== null && item !== undefined && item !== false && item !== '')
  if (shown.length === 0) return null
  return (
    <>
      {shown.map((item, i) => (
        <span key={i} className="contents">
          {i > 0 && <span aria-hidden className="opacity-60">·</span>}
          <span>{item}</span>
        </span>
      ))}
    </>
  )
}

/** A scheduled exam date in the meta line: information, so the blue info hue. */
export function ExamDateMeta({ children }: { children: ReactNode }) {
  return <span className="text-blue-600 dark:text-blue-400">{children}</span>
}
