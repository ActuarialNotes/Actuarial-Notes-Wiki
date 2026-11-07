import { forwardRef, type CSSProperties, type ReactNode } from 'react'
import { Circle, Play } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import type { SessionRow, SessionStep } from '@/lib/todaySession'

interface Props {
  /** The exam's accent (`examAccentStyle`), washing the card. */
  accent?: CSSProperties
  /** The Study Guide wheel with today's concepts pinned (`SessionWheel`). */
  wheel: ReactNode
  steps: SessionStep[]
  /** Questions the session still asks for, all steps together. */
  totalQuestions: number
  /** Those questions at the exam's pace — null for an exam with no per-question pace. */
  totalMinutes: number | null
  /** Every step done today. */
  allDone: boolean
  /** Questions answered today, for the finished card. */
  answeredToday: number
  startLabel: string
  launching: boolean
  onStart: () => void
  onRow: (row: SessionRow, step: SessionStep) => void
  /** Beside the title — the streak badge. */
  titleAside?: ReactNode
  /** Under the Start button — Listen to today's plan. */
  listen?: ReactNode
  /** Under the steps — concepts completed beyond the plan. */
  footer?: ReactNode
  /** The concept the Start cascade is lighting (lower-cased). */
  cascadeConcept?: string | null
  /** The concept the popup has just moved to (lower-cased), flashed in the list. */
  flashingConcept?: string | null
  /** The concept the popup is reading from this list (lower-cased), held highlighted. */
  currentConcept?: string | null
  /** Concepts ticked off in the last moment, flashed green (lower-cased). */
  justCompleted?: ReadonlySet<string>
  /** The Start cascade's border trace. */
  trace?: boolean
  onOpenDayComplete?: () => void
}

function rowNote(row: SessionRow): string {
  if (row.target) return `→ ${MASTERY_LABEL[row.target]}`
  if (row.questions !== null) return `${row.questions} question${row.questions === 1 ? '' : 's'}`
  return ''
}

/**
 * **Today's session** (`lib/todaySession.ts`): the wheel, the session's size in
 * questions and minutes, then the steps themselves — each a numbered checklist
 * of its concepts — and one Start, which runs the whole session as one quiz.
 */
export const TodaySessionCard = forwardRef<HTMLDivElement, Props>(function TodaySessionCard({
  accent, wheel, steps, totalQuestions, totalMinutes, allDone, answeredToday,
  startLabel, launching, onStart, onRow, titleAside, listen, footer,
  cascadeConcept, flashingConcept, currentConcept, justCompleted, trace, onOpenDayComplete,
}, ref) {
  return (
    <section
      ref={ref}
      style={accent}
      aria-labelledby="today-session-heading"
      className="relative overflow-hidden rounded-3xl bg-card text-card-foreground shadow-sm"
    >
      {accent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_50%_0%,var(--exam-accent-soft),transparent_70%)]"
        />
      )}
      {trace && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="today-session-trace-foil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(56 189 248)" />
              <stop offset="35%" stopColor="rgb(232 121 249)" />
              <stop offset="70%" stopColor="rgb(250 204 21)" />
              <stop offset="100%" stopColor="rgb(56 189 248)" />
            </linearGradient>
          </defs>
          <rect
            x={0} y={0} width="100%" height="100%" rx={24} ry={24}
            fill="none" stroke="url(#today-session-trace-foil)" strokeWidth={2} pathLength={100}
            className="study-plan-trace-path"
          />
        </svg>
      )}

      <div className="relative space-y-5 px-5 pb-5 pt-3 sm:px-7 sm:pb-7">
        {wheel}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 id="today-session-heading" className="text-2xl font-extrabold tracking-tight">Today's session</h2>
            {allDone && (
              <button
                type="button"
                onClick={onOpenDayComplete}
                className="inline-flex rounded-full text-green-500 transition-colors hover:text-green-600"
                aria-label="Today's session complete — view the day's details"
              >
                <CheckMark className="h-6 w-6 text-current" />
              </button>
            )}
            {titleAside && <span className="ml-auto shrink-0">{titleAside}</span>}
          </div>

          {allDone ? (
            <p className="text-base text-muted-foreground">
              All done for today{answeredToday > 0 ? ` — ${answeredToday} question${answeredToday === 1 ? '' : 's'} answered` : ''}.
            </p>
          ) : totalQuestions > 0 && (
            <p className="flex flex-wrap items-baseline gap-x-7 gap-y-1">
              <span className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold leading-none tracking-tight tabular-nums">{totalQuestions}</span>
                <span className="text-lg font-semibold text-muted-foreground">question{totalQuestions === 1 ? '' : 's'}</span>
              </span>
              {totalMinutes !== null && (
                <span className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold leading-none tracking-tight tabular-nums">{totalMinutes}</span>
                  <span className="text-lg font-semibold text-muted-foreground">min</span>
                </span>
              )}
            </p>
          )}
        </div>

        <ol className="space-y-1">
          {steps.map(step => (
            <li key={step.kind} className="border-t border-border/70 pt-3">
              <div className="flex items-center gap-2.5 pb-1">
                {step.done ? (
                  <CheckMark className="h-6 w-6" label={`Step ${step.number} done`} />
                ) : (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[13px] font-extrabold text-background">
                    {step.number}
                  </span>
                )}
                <h3 className={`text-[15px] font-bold ${step.done ? 'text-muted-foreground' : ''}`}>{step.title}</h3>
              </div>
              <ul>
                {step.rows.map(row => {
                  const key = row.name.toLowerCase()
                  const lit = cascadeConcept === key
                  const flash = flashingConcept?.toLowerCase() === key
                  const current = !row.aggregate && currentConcept?.toLowerCase() === key
                  return (
                    <li
                      key={row.name}
                      className={
                        'rounded-lg ' +
                        (lit ? 'concept-row-foil ' : flash ? 'concept-row-highlight ' : '') +
                        (current ? 'concept-row-current ' : '') +
                        (justCompleted?.has(key) ? 'concept-success ' : '')
                      }
                    >
                      <button
                        type="button"
                        data-study-concept={row.aggregate ? undefined : key}
                        aria-current={current ? 'true' : undefined}
                        onClick={() => onRow(row, step)}
                        className="flex w-full items-center gap-3 rounded-lg py-1.5 pl-9 pr-1 text-left transition-colors hover:bg-foreground/5"
                      >
                        {row.done
                          ? <CheckMark className="h-5 w-5 shrink-0" />
                          : <Circle className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />}
                        <span className="min-w-0 flex-1">
                          <span className={`block text-base leading-snug ${row.done ? 'text-muted-foreground line-through' : ''}`}>
                            {row.name}
                          </span>
                          {row.section && (
                            <span className="block truncate text-[13px] text-muted-foreground">{row.section}</span>
                          )}
                        </span>
                        <span
                          className={`shrink-0 whitespace-nowrap text-sm ${row.done ? 'font-medium text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
                        >
                          {rowNote(row)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>

        {footer}

        <button
          type="button"
          data-sound="begin"
          onClick={onStart}
          disabled={launching}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-80"
        >
          <Play className={`h-5 w-5 shrink-0 ${launching ? 'animate-pulse' : ''}`} aria-hidden="true" />
          {startLabel}
        </button>

        {listen}
      </div>
    </section>
  )
})
