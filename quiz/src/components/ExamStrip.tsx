import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { ExamLogo } from '@/components/ExamLogo'
import { LogoTile } from '@/components/LogoTile'
import { examAccentStyle } from '@/lib/examColors'
import { cn } from '@/lib/utils'

export interface ExamStripItem {
  /** What choosing it reports — the Store's exam key, the Resources page's exam label. */
  value: string
  /** The exam's name, for the accessible label and the tooltip. */
  name: string
  /** The `exam_progress` key its logo and accent are drawn from. */
  logoKey: string
}

/**
 * The exams, as the ladder's logos left to right — the accent ramp from blue
 * to red — with **All** first. A radiogroup: one tab stop, arrows move. An
 * exam the reader is studying carries a dot. Choosing the chosen exam again
 * goes back to All.
 *
 * The Store's exam filter and the Resources page's; one strip, so an exam is
 * picked the same way on both shelves.
 */
export function ExamStrip({
  exams,
  value,
  studying,
  onChange,
  className,
}: {
  exams: readonly ExamStripItem[]
  value: string | null
  studying?: ReadonlySet<string>
  onChange: (value: string | null) => void
  /** Overrides the bleed into the page gutter (`-mx-4 px-4`) where the page's gutter differs. */
  className?: string
}) {
  const groupRef = useRef<HTMLDivElement>(null)
  const choices: (string | null)[] = [null, ...exams.map(e => e.value)]

  function onKeyDown(e: ReactKeyboardEvent) {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (delta === 0) return
    e.preventDefault()
    const at = choices.indexOf(value)
    const next = choices[(at + delta + choices.length) % choices.length] ?? null
    onChange(next)
    groupRef.current?.querySelector<HTMLElement>(`[data-exam="${CSS.escape(next ?? 'all')}"]`)?.focus()
  }

  // Keep the chosen exam in view when the strip scrolls sideways (a phone).
  // The strip alone scrolls, never the page: `scrollIntoView` would also move
  // the window, and fight the router putting a returning reader back where
  // they were (lib/routeScrollMemory.ts).
  useEffect(() => {
    const strip = groupRef.current
    const el = strip?.querySelector<HTMLElement>(`[data-exam="${CSS.escape(value ?? 'all')}"]`)
    if (!strip || !el || strip.scrollWidth <= strip.clientWidth) return
    const left = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2
    strip.scrollTo({ left: Math.max(0, left) })
  }, [value])

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Exam"
      onKeyDown={onKeyDown}
      className={cn(
        'relative -mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      <ExamChoice id="all" ariaLabel="All exams" active={value === null} onSelect={() => onChange(null)}>
        <LogoTile size="md" className="bg-foreground text-[13px] font-bold text-background shadow-sm">
          All
        </LogoTile>
      </ExamChoice>
      {exams.map(exam => (
        <ExamChoice
          key={exam.value}
          id={exam.value}
          ariaLabel={exam.name}
          active={value === exam.value}
          dimmed={value !== null && value !== exam.value}
          studying={studying?.has(exam.value)}
          accent={exam.logoKey}
          onSelect={() => onChange(value === exam.value ? null : exam.value)}
        >
          <ExamLogo examKey={exam.logoKey} size="md" />
        </ExamChoice>
      ))}
    </div>
  )
}

function ExamChoice({
  id,
  ariaLabel,
  active,
  dimmed,
  studying,
  accent,
  onSelect,
  children,
}: {
  id: string
  ariaLabel: string
  active: boolean
  dimmed?: boolean
  studying?: boolean
  accent?: string
  onSelect: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={`${ariaLabel}${studying ? ' (studying)' : ''}`}
      title={ariaLabel}
      tabIndex={active ? 0 : -1}
      data-exam={id}
      onClick={onSelect}
      style={accent ? examAccentStyle(accent) : undefined}
      className={cn(
        'group relative flex shrink-0 items-center justify-center rounded-xl p-1.5 transition-[background-color,opacity] duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? accent
            ? 'bg-[var(--exam-accent-soft)] ring-1 ring-[var(--exam-accent-muted)]'
            : 'bg-accent'
          : 'hover:bg-accent/60',
        dimmed && 'opacity-55 hover:opacity-100',
      )}
    >
      <span className="transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5">{children}</span>
      {studying && (
        <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" aria-hidden />
      )}
    </button>
  )
}
