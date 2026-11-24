// The pieces Apply's screens share (docs/redesign-spec.md §7c): the four-step
// bar of a project, and the labelled row that leads somewhere.

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ATTEMPT_VIEW_LABEL } from '@/lib/attemptViews'
import { stepSummary, type AttemptOverview, type OverviewStep } from '@/lib/attemptOverview'
import { cn } from '@/lib/utils'

export function Chevron({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn('h-4 w-4 shrink-0', className)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

const stepLabel = (step: OverviewStep) => ATTEMPT_VIEW_LABEL[step]

const SEGMENT: Record<AttemptOverview['steps'][number]['state'], string> = {
  done: 'bg-foreground',
  // Dashed: the step being worked. The gaps show the ground, in either theme.
  current: 'bg-[repeating-linear-gradient(90deg,hsl(var(--foreground))_0_6px,transparent_6px_10px)]',
  todo: 'bg-border',
}

/**
 * A project's four steps as one bar: done solid, the current one dashed and
 * its name in bold, the rest in the line colour. One image to a screen reader.
 */
export function StepBar({ overview, size = 'md', className }: { overview: AttemptOverview; size?: 'sm' | 'md'; className?: string }) {
  return (
    <div role="img" aria-label={stepSummary(overview, stepLabel)} data-testid="step-bar" data-step={overview.current} className={cn('flex gap-1.5', className)}>
      {overview.steps.map(step => (
        <span key={step.id} className={cn('flex min-w-0 flex-1 flex-col', size === 'md' ? 'gap-2' : 'gap-1.5')} data-state={step.state}>
          <span className={cn('rounded-full', size === 'md' ? 'h-2' : 'h-1.5', SEGMENT[step.state])} />
          <span className={cn('truncate text-[13px]', step.state === 'current' ? 'font-bold' : 'font-medium')}>{stepLabel(step.id)}</span>
        </span>
      ))}
    </div>
  )
}

/** A row that leads somewhere: what leads it, its label, a value, a chevron. */
export function ApplyRow({
  to,
  onClick,
  leading,
  label,
  value,
  replace,
  className,
  testId,
}: {
  to?: string
  onClick?: () => void
  leading?: ReactNode
  label: ReactNode
  value?: ReactNode
  replace?: boolean
  className?: string
  testId?: string
}) {
  const cls = cn(
    'flex min-h-14 w-full items-center gap-3.5 text-left text-[17px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    className,
  )
  const body = (
    <>
      {leading}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {value && <span className="shrink-0 text-[15px]">{value}</span>}
      <Chevron />
    </>
  )
  return to
    ? <Link to={to} replace={replace} onClick={onClick} className={cls} data-testid={testId}>{body}</Link>
    : <button type="button" onClick={onClick} className={cls} data-testid={testId}>{body}</button>
}
