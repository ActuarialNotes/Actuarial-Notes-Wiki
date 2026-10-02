// A grouped list: one card surface holding a run of rows, each a link with a
// chevron — the pattern a phone's Settings and its App Store use for "tap to go
// somewhere". The exam lists on the Quiz and Study Guides tabs are drawn with
// it (`components/ExamRow.tsx`), and so are the one-row panels above them
// (Quiz Battle, the general guide, Actuaria Online), so everything on those two
// pages that opens somewhere looks it.
//
// Why rows rather than a grid of cards: a card with no arrow and a row of
// filled pills inside it read as a panel of information, not as one target. A
// row has a chevron, presses as a whole (the row fills with a wash), and carries
// its facts as plain text so nothing on it looks like a second button.
//
// A hairline separates two rows, inset to start under the text rather than the
// tile — it is drawn by each row's `::before` and the panel hides it on the
// first row (the first two, in two columns), so a row needs no idea of where it
// sits.

import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ListPanel({
  columns = 1,
  className,
  children,
}: {
  /** Two columns from `sm` up, for a list long enough to fill them. */
  columns?: 1 | 2
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 overflow-hidden rounded-xl bg-card text-card-foreground shadow-[var(--shadow-card)]',
        '[&>*:first-child]:before:hidden',
        columns === 2 && 'sm:grid-cols-2 sm:[&>*:nth-child(2)]:before:hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface ListRowProps {
  /** The row's tile — a 48px `LogoTile` (`ExamLogo`, `BattleLogo`, …). */
  leading: ReactNode
  title: ReactNode
  /** A small status tag set beside the title (an exam's *Beta*). */
  tag?: ReactNode
  /** One line under the title; truncated rather than wrapped. */
  subtitle?: ReactNode
  /** A line of facts under that, as plain `text-xs` text — never pills. */
  meta?: ReactNode
  /** Before the chevron: a count, a checkmark. */
  trailing?: ReactNode
  /** Material that isn't there yet: the title steps back to muted. */
  dimmed?: boolean
  /** A route makes the row a link; otherwise it is a button calling `onClick`. */
  to?: string
  onClick?: () => void
  /** Custom properties the row's classes read — an exam's accent. */
  style?: CSSProperties
  /** Extra classes; the hover/press wash can be overridden from here. */
  className?: string
  'data-tour'?: string
  'data-testid'?: string
}

export function ListRow({
  leading,
  title,
  tag,
  subtitle,
  meta,
  trailing,
  dimmed = false,
  to,
  onClick,
  style,
  className,
  ...data
}: ListRowProps) {
  const body = (
    <>
      {leading}
      <span className="min-w-0 flex-1">
        {/* Wraps rather than squeezing: a long tag drops under the title
            instead of cutting the title short. */}
        <span className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className={cn('min-w-0 max-w-full truncate text-base font-semibold leading-snug', dimmed && 'text-muted-foreground')}>
            {title}
          </span>
          {tag}
        </span>
        {subtitle && <span className="block truncate text-sm text-muted-foreground">{subtitle}</span>}
        {meta && (
          <span className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs tabular-nums text-muted-foreground">
            {meta}
          </span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {trailing}
        <ChevronRight
          className="h-4 w-4 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground group-active:translate-x-0.5 group-active:text-foreground"
          aria-hidden
        />
      </span>
    </>
  )

  const classes = cn(
    'group relative flex w-full items-center gap-3 py-3 pl-4 pr-3 text-left transition-colors duration-150',
    'hover:bg-accent/40 active:bg-accent/60',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
    // The hairline above every row but the first: inset by the row's left
    // padding, the 48px tile and the gap (16 + 48 + 12), so it runs under
    // the text the way a phone's grouped lists draw it.
    "before:pointer-events-none before:absolute before:left-[76px] before:right-0 before:top-0 before:h-px before:bg-border/60 before:content-['']",
    className,
  )

  return to ? (
    <Link to={to} style={style} className={classes} {...data}>
      {body}
    </Link>
  ) : (
    <button type="button" onClick={onClick} style={style} className={classes} {...data}>
      {body}
    </button>
  )
}
