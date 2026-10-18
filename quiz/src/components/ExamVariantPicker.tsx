import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ExamVariantOption {
  /** What choosing it reports — a variant's label or code. */
  value: string
  /** The region: "Canada". */
  label: string
}

/**
 * The **region** of an exam sat under a syllabus per jurisdiction — Exam 6's
 * Canada, United States, International — shown under the exam strip once such
 * an exam is chosen (`lib/examVariants.ts`). **All** keeps every variant on the
 * shelf. A radiogroup of pills, the same choice on the Resources page and in
 * the Store.
 */
export function ExamVariantPicker({
  examName,
  options,
  value,
  onChange,
  className,
}: {
  /** The exam the regions are of — "Exam 6" — for the group's accessible name. */
  examName: string
  options: readonly ExamVariantOption[]
  /** The chosen variant, or null for all of them. */
  value: string | null
  onChange: (value: string | null) => void
  className?: string
}) {
  return (
    <div role="radiogroup" aria-label={`${examName} region`} className={cn('flex flex-wrap items-center gap-1.5', className)} data-testid="exam-variants">
      <VariantPill active={value === null} onClick={() => onChange(null)}>All regions</VariantPill>
      {options.map(o => (
        <VariantPill key={o.value} active={value === o.value} onClick={() => onChange(value === o.value ? null : o.value)}>
          {o.label}
        </VariantPill>
      ))}
    </div>
  )
}

function VariantPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active ? 'border-transparent bg-foreground text-background' : 'bg-card hover:bg-accent',
      )}
    >
      {children}
    </button>
  )
}
