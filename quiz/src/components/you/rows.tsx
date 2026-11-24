// The pieces You's three screens are drawn from (docs/redesign-spec.md §7b,
// §2.3): the top row with its way out, a titled group of rows in an outlined
// card, a row that shows its value, and a switch.

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useBack } from '@/hooks/useBack'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { GROUND, OUTLINE_TILE } from '@/components/ui/OutlineCard'
import { cn } from '@/lib/utils'

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

/** One of You's screens: the ground, at reading width, under its top row. */
export function YouScreen({
  title, way, to, label, trailing, children, testId,
}: {
  title?: string
  /** A cross leaves You; an arrow goes back up it. */
  way: 'close' | 'back'
  /** Where the way out goes for a reader who opened the app on this screen. */
  to: string
  label: string
  trailing?: ReactNode
  children: ReactNode
  testId?: string
}) {
  const back = useBack({ to, label })
  const Icon = way === 'close' ? X : ChevronLeft
  return (
    <div className={cn(GROUND, 'min-h-dvh')} data-testid={testId}>
      <div className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col lg:max-w-[520px] lg:pt-6">
        <div className="flex items-center gap-2 pl-2 pr-5 pt-3">
          <Link
            to={back.to}
            state={RESTORE_SCROLL}
            onClick={back.onLinkClick}
            aria-label={way === 'close' ? 'Close' : `Back to ${back.label}`}
            className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', FOCUS)}
          >
            <Icon className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" />
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-[22px] font-bold">{title}</h1>
          {trailing}
        </div>
        {children}
      </div>
    </div>
  )
}

/** A titled group: its rows in one outlined card, hairlines between them. */
export function RowGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col" aria-label={title}>
      <h2 className="mb-1 text-[15px] font-bold">{title}</h2>
      <div className={cn(OUTLINE_TILE, 'flex flex-col divide-y divide-border px-4')}>{children}</div>
    </section>
  )
}

const ROW = 'flex min-h-[56px] w-full items-center gap-3.5 text-left'

/** A row that goes somewhere or opens something: its label, its value, a chevron. */
export function Row({
  label, value, leading, to, onClick, testId,
}: {
  label: string
  value?: string | null
  leading?: ReactNode
  to?: string
  onClick?: () => void
  testId?: string
}) {
  const inner = (
    <>
      {leading}
      <span className="min-w-0 flex-1 truncate text-[17px] font-medium">{label}</span>
      {value && <span className="max-w-[55%] shrink-0 truncate text-[15px]">{value}</span>}
      {(to || onClick) && <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />}
    </>
  )
  if (to) return <Link to={to} className={cn(ROW, FOCUS)} data-testid={testId}>{inner}</Link>
  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-haspopup="dialog" className={cn(ROW, FOCUS)} data-testid={testId}>
        {inner}
      </button>
    )
  }
  return <div className={ROW} data-testid={testId}>{inner}</div>
}

/** The switch as drawn: on is filled in the text colour, off is its outline. */
export function SwitchMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-8 w-[52px] shrink-0 rounded-full border-[1.5px] border-foreground p-[3px] transition-colors',
        on ? 'justify-end bg-foreground' : 'justify-start',
      )}
    >
      <span className={cn('h-[23px] w-[23px] rounded-full', on ? 'bg-ground' : 'bg-foreground')} />
    </span>
  )
}

/** A row that is a switch, flipped in place. */
export function SwitchRow({
  label, on, onChange, sound, testId,
}: {
  label: string
  on: boolean
  onChange: (next: boolean) => void
  /** `data-sound`, for a switch that makes its own sound or none. */
  sound?: string
  testId?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      data-sound={sound}
      data-testid={testId}
      onClick={() => onChange(!on)}
      className={cn(ROW, FOCUS)}
    >
      <span className="min-w-0 flex-1 truncate text-[17px] font-medium">{label}</span>
      <SwitchMark on={on} />
    </button>
  )
}

/** Two or three choices on one row, the chosen one filled. */
export function ChoiceRow<T extends string>({
  label, value, options, onChange,
}: {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (next: T) => void
}) {
  return (
    <div className={ROW}>
      <span className="min-w-0 flex-1 truncate text-[17px] font-medium">{label}</span>
      <span role="group" aria-label={label} className="flex shrink-0 gap-1 rounded-full border-[1.5px] border-foreground p-[3px]">
        {options.map(option => {
          const on = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={() => { if (!on) onChange(option.value) }}
              className={cn(
                'flex h-[30px] items-center rounded-full px-3 text-sm',
                FOCUS,
                on ? 'bg-foreground font-bold text-ground' : 'font-semibold',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </span>
    </div>
  )
}

/** A track with its fill, in the text colour: a level, a goal, a quest. */
export function Meter({ ratio, className, label }: { ratio: number; className?: string; label?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, ratio)) * 100)
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('block h-2 overflow-hidden rounded-full bg-border', className)}
    >
      <span className="block h-full rounded-full bg-foreground transition-[width] duration-300" style={{ width: `${pct}%` }} />
    </span>
  )
}
