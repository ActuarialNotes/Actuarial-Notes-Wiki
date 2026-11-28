// "How long today?" (docs/redesign-spec.md §4.3): with a paid plan, today's
// plan first, at the minutes it takes; then the four fixed lengths, a shorter
// one taking part of the plan and a longer one going past it. Each row shows
// what fits as dots, one per question, grouped Fix, Learn, Review. "Use this
// every day" keeps the choice as the reader's length (R9); without it the
// choice is for today.

import { useId, useState } from 'react'
import { CheckMark } from '@/components/CheckMark'
import { Button } from '@/components/ui/button'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import {
  DEFAULT_SESSION_LENGTH,
  PLAN_LENGTH,
  SESSION_LENGTHS,
  SESSION_STEP_LABEL,
  SESSION_STEP_ORDER,
  countsSummary,
  type SessionChoice,
  type SessionOption,
} from '@/lib/todaySession'
import { cn } from '@/lib/utils'

const FIXED_OPTIONS: SessionOption[] = SESSION_LENGTHS.map(m => ({ choice: m, minutes: m }))

export function SessionLengthSheet({
  choice,
  options = FIXED_OPTIONS,
  standing,
  onPick,
  onClose,
}: {
  choice: SessionChoice
  /** The rows, with what fits in each for the exam Today shows; without counts the rows carry no dots. */
  options?: SessionOption[]
  /** Opened from Settings: the choice is the reader's length for every day, and nothing asks. */
  standing?: boolean
  onPick: (minutes: SessionChoice, everyDay: boolean) => void
  onClose: () => void
}) {
  const titleId = useId()
  // Today's plan with no plan to size it is the default length.
  const [picked, setPicked] = useState<SessionChoice>(
    options.some(o => o.choice === choice) ? choice : DEFAULT_SESSION_LENGTH,
  )
  const [everyDay, setEveryDay] = useState(true)
  const hasCounts = options.some(o => o.counts)

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>{standing ? 'Session length' : 'How long today?'}</PopupTitle>

      <div role="radiogroup" aria-label="Session length" className="flex flex-col gap-2.5">
        {options.map(option => {
          const on = option.choice === picked
          const counts = option.counts ?? null
          const isPlan = option.choice === PLAN_LENGTH
          const name = isPlan
            ? `Today's plan${option.minutes !== null ? `, ${option.minutes} minutes` : ''}`
            : `${option.minutes} minutes`
          return (
            <button
              key={option.choice}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={counts ? `${name}: ${countsSummary(counts)}` : name}
              onClick={() => setPicked(option.choice)}
              className={cn(
                'grid min-h-[72px] grid-cols-[88px_minmax(0,1fr)_28px] items-center gap-x-3.5 rounded-[18px] px-[18px] py-3 text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
                on ? 'border-2 border-foreground' : 'border-[1.5px] border-border',
              )}
            >
              <span className="flex flex-col">
                {option.minutes !== null && (
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold tabular-nums">{option.minutes}</span>
                    <span className="text-[15px]">min</span>
                  </span>
                )}
                {isPlan && (
                  <span className={option.minutes !== null ? 'text-[13px] font-semibold' : 'text-[17px] font-bold'}>
                    Today's plan
                  </span>
                )}
              </span>
              <span aria-hidden="true" className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                {counts && SESSION_STEP_ORDER.filter(kind => counts[kind] > 0).map(kind => (
                  <span key={kind} className="flex flex-wrap gap-[3px]">
                    {Array.from({ length: counts[kind] }, (_, i) => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-foreground" />
                    ))}
                  </span>
                ))}
              </span>
              {on && <CheckMark className="h-7 w-7 text-foreground" />}
            </button>
          )
        })}
      </div>

      {/* The key: the dots' groups, in the order they are drawn. */}
      {hasCounts && <ul aria-hidden="true" className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
        {SESSION_STEP_ORDER.map(kind => (
          <li key={kind} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            {SESSION_STEP_LABEL[kind].todo}
          </li>
        ))}
      </ul>}

      {!standing && <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-base">
        <input
          type="checkbox"
          checked={everyDay}
          onChange={e => setEveryDay(e.target.checked)}
          className="h-5 w-5 shrink-0 accent-[hsl(var(--foreground))]"
        />
        Use this every day
      </label>}

      <Button size="main" className="w-full" onClick={() => { onPick(picked, standing || everyDay); onClose() }}>
        Done
      </Button>
    </Popup>
  )
}
