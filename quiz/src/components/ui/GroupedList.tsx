// A grouped list of *facts*: a small label over one rounded surface of rows,
// each row a label on the left and its value on the right — the shape of a
// phone's Settings, used where a popup reads out what something is rather than
// where to go (that is `ListPanel`, whose rows are links with chevrons). The
// study guide's sitting panel is built from it: Dates, The exam, Sources.
//
// The surface is an outline in the line colour with hairlines between its
// rows (the redesign's tile, style guide §13.1); a host on a screen not yet
// redesigned (the Store's sheet) passes a filled surface instead.

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
  /** Added to the surface's classes. */
  className?: string
}) {
  return (
    <section className="space-y-2">
      {label && <h3 className="text-[13px] font-semibold">{label}</h3>}
      <GroupSurface className={className}>{children}</GroupSurface>
      {footer && <div className="space-y-1 text-[13px] leading-relaxed">{footer}</div>}
    </section>
  )
}

export function GroupSurface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-[18px] border border-border divide-y divide-border', className)}>
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
  strong,
  className,
}: {
  marker?: ReactNode
  label: ReactNode
  detail?: ReactNode
  value?: ReactNode
  strong?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex gap-3 px-3.5 py-3 text-[15px]', detail ? 'items-start' : 'items-center', className)}>
      {marker && <span className={cn('flex w-4 shrink-0 justify-center', detail ? 'h-5 items-center' : '')}>{marker}</span>}
      <div className="min-w-0 flex-1">
        <div className={cn(strong && 'font-semibold')}>{label}</div>
        {detail && <div className="mt-0.5 text-[13px] leading-relaxed">{detail}</div>}
      </div>
      {value && (
        <span className={cn('shrink-0 text-right tabular-nums', strong && 'font-semibold')}>
          {value}
        </span>
      )}
    </div>
  )
}
