// The filled Practice button (docs/redesign-spec.md §7): "Practice" at
// the foot of a concept, "Practice <objective>" at the end of an opened
// objective. A link, so it can be opened in a new tab like any other. Given
// a `concept`, a plain click opens the concept's questions over the page
// (components/practice/PracticeOverlay.tsx) instead of going to the search.

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { usePracticeOverlay } from '@/stores/practiceOverlay'

function PlayMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn('shrink-0 fill-current', className)}>
      <path d="M7 4l13 8-13 8z" />
    </svg>
  )
}

export function PracticeButton({
  to,
  children,
  aside,
  size = 'main',
  onClick,
  concept,
  className,
}: {
  to: string
  /** The concept whose questions a plain click opens over the page. */
  concept?: string
  children: ReactNode
  /** Set lighter after the label: "152 questions". */
  aside?: ReactNode
  /** `main` is the page's 58px action; `foot` the reader's 52px one. */
  size?: 'main' | 'foot'
  onClick?: () => void
  className?: string
}) {
  const openPractice = usePracticeOverlay(s => s.open)
  return (
    <Link
      to={to}
      onClick={e => {
        onClick?.()
        if (!concept || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        openPractice(concept)
      }}
      data-testid="practice-button"
      className={cn(
        'flex min-w-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground',
        size === 'main' ? 'h-[58px] gap-2.5 px-6 text-[17px]' : 'h-[52px] gap-2 px-5 text-base',
        className,
      )}
    >
      <PlayMark className={size === 'main' ? 'h-[18px] w-[18px]' : 'h-4 w-4'} />
      <span className="truncate">{children}</span>
      {aside && <span className="shrink-0 font-medium">{aside}</span>}
    </Link>
  )
}
