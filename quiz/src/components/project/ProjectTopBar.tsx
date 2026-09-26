import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Clock } from 'lucide-react'
import { MobileNavButton } from '@/components/MobileNavButton'
import { CheckMark } from '@/components/CheckMark'
import { attemptPhase, timeLeft, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { cn } from '@/lib/utils'

/**
 * The project pages' one row of chrome: the drawer button below `lg` (these
 * routes host it — `lib/mobileNavHost.ts`), the way back, the title, whatever
 * the page puts in the middle, and the window's countdown on the right.
 */
export function ProjectTopBar({
  backTo,
  backLabel,
  title,
  subtitle,
  children,
  right,
}: {
  backTo: string
  backLabel: string
  title: string
  subtitle?: string
  children?: ReactNode
  right?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-2 backdrop-blur-sm sm:px-3">
      <MobileNavButton />
      <Link to={backTo} aria-label={backLabel} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
        <ChevronLeft className="h-5 w-5" />
      </Link>
      <div className={cn('min-w-0', children ? 'hidden flex-1 md:block' : 'flex-1')}>
        <p className="truncate text-sm font-semibold leading-tight">{title}</p>
        {subtitle && <p className="truncate text-xs leading-tight text-muted-foreground">{subtitle}</p>}
      </div>
      {children && <div className="flex min-w-0 flex-1 justify-center md:flex-none">{children}</div>}
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </header>
  )
}

const URGENCY_CLASS = {
  calm: 'bg-muted text-muted-foreground',
  soon: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
  final: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-200',
  closed: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-200',
}

/** The attempt's state in a pill: time left in the window, untimed, closed or submitted. */
export function WindowPill({ attempt, now, compact = false }: { attempt: ProjectAttempt; now: number; compact?: boolean }) {
  const phase = attemptPhase(attempt, now)
  if (phase === 'submitted') {
    return (
      <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-muted px-3 text-xs font-medium">
        <CheckMark className="h-3.5 w-3.5" /> Submitted
      </span>
    )
  }
  if (attempt.deadline === null) {
    return <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-muted px-3 text-xs font-medium text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Untimed</span>
  }
  const left = timeLeft(attempt.deadline, now)
  return (
    <span
      className={cn('inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium tabular-nums', URGENCY_CLASS[left.urgency])}
      title={`Submissions close ${new Date(attempt.deadline).toLocaleString()}`}
    >
      <Clock className="h-3.5 w-3.5" />
      {compact ? left.label.replace(' left', '') : left.label}
    </span>
  )
}
