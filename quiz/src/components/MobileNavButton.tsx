import { Menu } from 'lucide-react'
import { useMobileNav } from '@/hooks/useMobileNav'
import { useCollectGlow } from '@/hooks/useCollectGlow'
import { cn } from '@/lib/utils'

interface MobileNavButtonProps {
  /**
   * The search this button shares its row with is in use, so give the row over
   * to the input: the button folds to zero width (and eats the row's gap) and
   * the input grows into the space. It is the only thing on the line the reader
   * is not using, and typing wants the width more than the drawer does.
   */
  collapsed?: boolean
  className?: string
}

/**
 * The way into the sidebar drawer below `lg`.
 *
 * It is rendered either by the app header (`Sidebar.tsx`) or, on a route that
 * already pins a bar to the top of the viewport, by that bar — see
 * `lib/mobileNavHost.ts` for which routes do which. Exactly one of the two
 * mounts it on any given route, so the hamburger is always in the same corner
 * whichever page the reader is on.
 *
 * It wears the collect ring/glow because the deck lives behind it: on a phone
 * the Flashcards row is inside the drawer, so this is where a card landing has
 * to show.
 */
export function MobileNavButton({ collapsed = false, className }: MobileNavButtonProps) {
  const openNav = useMobileNav(s => s.openNav)
  const collectGlow = useCollectGlow()

  return (
    <button
      type="button"
      onClick={openNav}
      aria-label="Open navigation"
      aria-hidden={collapsed || undefined}
      tabIndex={collapsed ? -1 : undefined}
      data-flashcard-nav
      className={cn(
        'relative flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-lg',
        'text-foreground transition-[width,opacity,margin] duration-200 lg:hidden',
        collapsed ? 'pointer-events-none -mr-2 w-0 opacity-0' : 'w-9 opacity-100 hover:bg-accent',
        className,
      )}
    >
      {collectGlow > 0 && <span key={`ring-${collectGlow}`} className="flashcard-nav-ring" aria-hidden="true" />}
      <Menu key={`icon-${collectGlow}`} className={cn('h-4 w-4 shrink-0', collectGlow > 0 && 'flashcard-nav-glow')} />
    </button>
  )
}
