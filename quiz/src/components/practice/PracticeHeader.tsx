import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { backLabel, useBack } from '@/hooks/useBack'
import { cn } from '@/lib/utils'

/** A round, outlined 44px button in a Practice screen's top row (style guide §13.9). */
export const PRACTICE_HEADER_BUTTON =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground text-foreground ' +
  'transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

/** The way back from a screen under Practice: to the page left, else up to Practice. */
export function PracticeBack({ className }: { className?: string }) {
  const back = useBack({ to: '/', label: 'Practice' })
  const label = back.fromTrail ? backLabel(back) : 'Back to Practice'
  return (
    <Link
      to={back.to}
      onClick={back.onLinkClick}
      aria-label={label}
      title={label}
      data-testid="practice-back"
      className={cn(
        '-ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <ChevronLeft className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
    </Link>
  )
}

/**
 * The top row of a screen opened from Practice (docs/redesign-spec.md §7a):
 * the way back, an optional mark (the exam's logo), the screen's name, and
 * its own buttons at the right.
 */
export function PracticeHeader({
  title,
  lead,
  children,
  className,
}: {
  title: string
  /** Drawn between the back arrow and the title: the exam's logo. */
  lead?: ReactNode
  /** The row's buttons, at the right. */
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <PracticeBack />
      {lead}
      <h1 className="min-w-0 flex-1 truncate text-[22px] font-bold leading-tight">{title}</h1>
      {children}
    </div>
  )
}
