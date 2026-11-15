import type { RefObject } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A page title's menu, as the host hands it to whatever draws the title. */
export interface TitleMenuAction {
  /** The trigger. The host anchors its menu to this element's box. */
  ref: RefObject<HTMLButtonElement>
  open: boolean
  onToggle: () => void
  /** Accessible name, e.g. "Actions for Exam 9". */
  label: string
}

/**
 * The **More** button beside a title that has a menu: an exam's study guide, a
 * concept page, a resource page.
 *
 * The title used to be the trigger, underlined to say so, and an underline
 * also meant a link and a heading that unfolds (design review F17). Now the
 * title is text and its menu is this button, so an underline is a link and
 * nothing else.
 */
export function TitleMoreButton({
  action,
  tour,
  className,
}: {
  action: TitleMenuAction
  /** The onboarding tour's marker, where a step points at this menu. */
  tour?: string
  className?: string
}) {
  return (
    <button
      ref={action.ref}
      type="button"
      data-play-menu-trigger
      data-tour={tour}
      onClick={action.onToggle}
      aria-haspopup="menu"
      aria-expanded={action.open}
      aria-label={action.label}
      title="More"
      className={cn('title-more', className)}
    >
      <MoreHorizontal className="h-5 w-5" aria-hidden />
    </button>
  )
}
