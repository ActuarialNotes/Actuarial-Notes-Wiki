// Today's session card (docs/redesign-spec.md §4.2): the title and the session
// length, a bar cut into the steps, up to three steps that unfold their
// concepts in place, and Start, the screen's one filled button. Once
// everything has been tried it is the Done state: the bar full, the steps as
// Fixed / Learned / Reviewed, and what to do next.
//
// The data is `SessionView` (`lib/todaySession.ts`); nothing here decides what
// is in a session.

import { useState } from 'react'
import { ChevronDown, ChevronRight, Play, Plus, Repeat, RotateCcw, type LucideIcon } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { Button } from '@/components/ui/button'
import { OUTLINE_CARD } from '@/components/ui/OutlineCard'
import {
  KEEP_GOING_LENGTH,
  SESSION_STEP_LABEL,
  type SessionStep,
  type SessionStepKind,
  type SessionView,
} from '@/lib/todaySession'
import { cn } from '@/lib/utils'

const STEP_ICON: Record<SessionStepKind, LucideIcon> = {
  fix: RotateCcw,
  learn: Plus,
  review: Repeat,
}

/** Steps with this few concepts or fewer are listed open when they are the only step. */
const OPEN_WHEN_ALONE = 3

export interface SessionCardProps {
  view: SessionView
  /** Opens the session length sheet. */
  onLength: () => void
  onStart: () => void
  launching: boolean
  /** Opens a concept of the session in the reader. */
  onConcept: (name: string) => void
  /** The concept the reader is open on, lower-cased: its row stays lit. */
  currentConcept: string | null
  /** Questions missed today and not yet fixed: the Done state's filled button. */
  missedToday: number
  onFixMissed: () => void
  onKeepGoing: () => void
  /** List every step's concepts open under it (the desktop layout). */
  expanded?: boolean
  className?: string
}

export function SessionCard({
  view, onLength, onStart, launching, onConcept, currentConcept,
  missedToday, onFixMissed, onKeepGoing, expanded = false, className,
}: SessionCardProps) {
  const alone = view.steps.length === 1 && view.steps[0].count <= OPEN_WHEN_ALONE
  const [open, setOpen] = useState<SessionStepKind | null>(null)
  const dim = currentConcept !== null

  return (
    <section
      aria-label="Today's session"
      data-testid="today-session"
      className={cn(OUTLINE_CARD, 'flex flex-col gap-4 p-5 lg:gap-5 lg:rounded-3xl lg:p-7', className)}
    >
      <div className={cn('flex items-center justify-between transition-opacity', dim && 'opacity-30')}>
        <h1 className="text-xl font-bold lg:text-[26px]">Today</h1>
        {view.finished ? (
          <CheckMark className="h-8 w-8 text-foreground" label="Today's session is done" />
        ) : (
          <Button
            variant="edge"
            size="sm"
            onClick={onLength}
            aria-haspopup="dialog"
            aria-label={`Session length, ${view.minutes} minutes. Change`}
            className="gap-1.5 px-3 text-[15px] lg:h-10 lg:px-3.5 lg:text-base"
          >
            <span className="tabular-nums">{view.minutes} min</span>
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          </Button>
        )}
      </div>

      {/* One piece per step, as long as its share of the session. A piece
          fills as its questions are tried. */}
      <div aria-hidden="true" className={cn('flex h-2 gap-1 transition-opacity', dim && 'opacity-30')}>
        {view.steps.map(step => (
          <span key={step.kind} className="overflow-hidden rounded bg-border" style={{ flex: `${step.count} 1 0` }}>
            <span
              className="block h-full rounded bg-foreground transition-[width] duration-300"
              style={{ width: `${(step.attempted / step.count) * 100}%` }}
            />
          </span>
        ))}
      </div>

      <div className="flex flex-col">
        {view.steps.map((step, i) => (
          <Step
            key={step.kind}
            step={step}
            finished={view.finished}
            last={i === view.steps.length - 1}
            open={expanded || alone || open === step.kind}
            fixed={expanded || alone}
            onToggle={() => setOpen(o => (o === step.kind ? null : step.kind))}
            onConcept={onConcept}
            currentConcept={currentConcept}
          />
        ))}
      </div>

      {view.finished ? (
        <div className={cn('flex flex-col gap-3 transition-opacity', dim && 'opacity-30')}>
          {missedToday > 0 && (
            <Button size="main" className="w-full" data-sound="begin" onClick={onFixMissed} disabled={launching}>
              {missedToday === 1 ? 'Fix the 1 you missed' : `Fix the ${missedToday} you missed`}
            </Button>
          )}
          <Button
            variant={missedToday > 0 ? 'edge' : 'default'}
            size={missedToday > 0 ? 'lg' : 'main'}
            className={cn('w-full', missedToday > 0 && 'h-[52px] text-base')}
            onClick={onKeepGoing}
          >
            Keep going · {KEEP_GOING_LENGTH} min
          </Button>
        </div>
      ) : (
        <Button
          size="main"
          data-sound="begin"
          data-testid="today-start"
          onClick={onStart}
          disabled={launching}
          className={cn('w-full transition-opacity lg:h-[60px]', dim && 'opacity-30')}
        >
          <Play className="h-[18px] w-[18px] fill-current" aria-hidden="true" />
          Start
        </Button>
      )}
    </section>
  )
}

function Step({
  step, finished, last, open, fixed, onToggle, onConcept, currentConcept,
}: {
  step: SessionStep
  finished: boolean
  last: boolean
  open: boolean
  /** The list is always open: the row is a heading, not a button. */
  fixed: boolean
  onToggle: () => void
  onConcept: (name: string) => void
  currentConcept: string | null
}) {
  const Icon = STEP_ICON[step.kind]
  const label = SESSION_STEP_LABEL[step.kind]
  const dim = currentConcept !== null
  const count = finished ? step.achieved : step.count
  const of = finished
    ? (step.achieved < step.count ? step.count : null)
    : step.of
  // A miss with no one concept behind it has no page to open, so it has no row.
  const rows = step.items.filter(item => item.concept !== null)
  const canOpen = rows.length > 0

  const head = (
    <>
      {!finished && <Icon className="h-[22px] w-[22px] shrink-0" aria-hidden="true" />}
      <span className="flex-1 text-[17px] font-medium">{finished ? label.done : label.todo}</span>
      <span className="text-[17px] font-bold tabular-nums">{count}</span>
      {of !== null && <span className="min-w-[44px] text-right text-sm tabular-nums">of {of}</span>}
      {!fixed && canOpen && (
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      )}
    </>
  )
  const headClass = cn(
    'flex min-h-[52px] w-full items-center gap-3.5 text-left transition-opacity',
    dim && 'opacity-30',
  )

  return (
    <div className={cn(!last && 'border-b border-border')} data-step={step.kind}>
      {fixed || !canOpen ? (
        <div className={headClass}>{head}</div>
      ) : (
        <button type="button" className={headClass} aria-expanded={open} onClick={onToggle}>
          {head}
        </button>
      )}
      {open && canOpen && (
        <ul className="pb-2">
          {rows.map(item => {
            const current = currentConcept !== null && item.concept!.toLowerCase() === currentConcept
            return (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => onConcept(item.concept!)}
                  aria-current={current || undefined}
                  data-study-concept={item.concept!.toLowerCase()}
                  className={cn(
                    '-mx-2 flex min-h-[46px] w-[calc(100%+1rem)] items-center gap-3 rounded-xl py-2 pl-11 pr-3 text-left text-base transition-[opacity,background-color]',
                    current
                      ? 'bg-foreground font-semibold text-ground'
                      : cn('hover:bg-foreground/10', dim && 'opacity-30'),
                  )}
                >
                  <span className={cn('min-w-0 flex-1', item.achieved && !current && 'line-through')}>{item.concept}</span>
                  {item.achieved
                    ? <CheckMark className={cn('h-5 w-5 shrink-0', current ? 'text-ground' : 'text-foreground')} label="Done" />
                    : <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
