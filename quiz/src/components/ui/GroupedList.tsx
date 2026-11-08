// A grouped list of *facts*: a small label over one rounded surface of rows,
// each row a label on the left and its value on the right — the shape of a
// phone's Settings, used where a popup reads out what something is rather than
// where to go (that is `ListPanel`, whose rows are links with chevrons). The
// study guide's sitting panel is built from it: Dates, The exam, Sources.
//
// The surface is `bg-card`, so a group reads as a card on a `bg-background`
// sheet; a host already on `bg-card` (the Store's sheet) passes a muted
// surface instead.

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Group({
  label,
  children,
  footer,
  className,
}: {
  label?: string
  children: ReactNode
  /** Small print under the surface, in the publisher's words. */
  footer?: ReactNode
  /** The surface's classes — `bg-card` unless replaced. */
  className?: string
}) {
  return (
    <section className="space-y-1.5">
      {label && <h3 className="px-1.5 text-xs font-medium text-muted-foreground">{label}</h3>}
      <GroupSurface className={className}>{children}</GroupSurface>
      {footer && <div className="space-y-1 px-1.5 text-xs leading-relaxed text-muted-foreground">{footer}</div>}
    </section>
  )
}

export function GroupSurface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl bg-card divide-y divide-border/60', className)}>
      {children}
    </div>
  )
}

/**
 * One row: an optional marker, the label (with a line or two under it), and
 * the value at the right. A value too long for the right edge goes under the
 * label instead — pass it as `detail` — so it never wraps in a narrow column.
 */
export function GroupRow({
  marker,
  label,
  detail,
  value,
  dimmed,
  strong,
  className,
}: {
  marker?: ReactNode
  label: ReactNode
  detail?: ReactNode
  value?: ReactNode
  dimmed?: boolean
  strong?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex gap-3 px-3.5 py-2.5 text-sm', detail ? 'items-start' : 'items-center', className)}>
      {marker && <span className={cn('flex w-4 shrink-0 justify-center', detail ? 'h-5 items-center' : '')}>{marker}</span>}
      <div className="min-w-0 flex-1">
        <div className={cn(strong && 'font-semibold', dimmed && 'text-muted-foreground')}>{label}</div>
        {detail && <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{detail}</div>}
      </div>
      {value && (
        <span className={cn('shrink-0 text-right tabular-nums', dimmed ? 'text-muted-foreground/80' : 'text-muted-foreground', strong && 'font-medium text-foreground')}>
          {value}
        </span>
      )}
    </div>
  )
}
