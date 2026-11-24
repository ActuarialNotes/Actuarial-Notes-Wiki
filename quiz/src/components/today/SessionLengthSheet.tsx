// "How long today?" (docs/redesign-spec.md §4.3): the four session lengths,
// each showing what fits as dots, one per question, grouped Fix, Learn,
// Review. "Use this every day" keeps the choice as the reader's length (R9);
// without it the choice is for today.

import { useId, useState } from 'react'
import { CheckMark } from '@/components/CheckMark'
import { Button } from '@/components/ui/button'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import {
  SESSION_LENGTHS,
  SESSION_STEP_LABEL,
  SESSION_STEP_ORDER,
  countsSummary,
  type SessionCounts,
  type SessionLength,
} from '@/lib/todaySession'
import { cn } from '@/lib/utils'

export function SessionLengthSheet({
  minutes,
  countsByLength,
  standing,
  onPick,
  onClose,
}: {
  minutes: SessionLength
  /** What fits in each length, for the exam Today shows; without it the rows carry no dots. */
  countsByLength?: Record<SessionLength, SessionCounts>
  /** Opened from Settings: the choice is the reader's length for every day, and nothing asks. */
  standing?: boolean
  onPick: (minutes: SessionLength, everyDay: boolean) => void
  onClose: () => void
}) {
  const titleId = useId()
  const [picked, setPicked] = useState<SessionLength>(minutes)
  const [everyDay, setEveryDay] = useState(true)

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>{standing ? 'Session length' : 'How long today?'}</PopupTitle>

      <div role="radiogroup" aria-label="Session length" className="flex flex-col gap-2.5">
        {SESSION_LENGTHS.map(option => {
          const on = option === picked
          const counts = countsByLength?.[option] ?? null
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={counts ? `${option} minutes: ${countsSummary(counts)}` : `${option} minutes`}
              onClick={() => setPicked(option)}
              className={cn(
                'grid min-h-[72px] grid-cols-[88px_minmax(0,1fr)_28px] items-center gap-x-3.5 rounded-[18px] px-[18px] py-3 text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
                on ? 'border-2 border-foreground' : 'border-[1.5px] border-border',
              )}
            >
              <span className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-bold tabular-nums">{option}</span>
                <span className="text-[15px]">min</span>
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
      {countsByLength && <ul aria-hidden="true" className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
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
