import { useAuth } from '@/hooks/useAuth'
import { useMobileNav } from '@/hooks/useMobileNav'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { GuestAvatar } from '@/components/GuestAvatar'
import { cn } from '@/lib/utils'

interface MobileNavButtonProps {
  /**
   * The search this button shares its row with is in use, so give the row over
   * to the input: the button folds to zero width (and eats the row's gap) and
   * the input grows into the space. It is the only thing on the line the reader
   * is not using, and typing wants the width more than the menu does.
   */
  collapsed?: boolean
  className?: string
}

/**
 * The reader's avatar in the top corner, below `lg`: the way into the menu
 * (the sidebar, drawn as a drawer).
 *
 * On a phone the four places are the bar at the bottom of the screen
 * (`components/BottomBar.tsx`), so this is no longer how a reader moves
 * between them. It opens what the bar doesn't hold: the exam switcher, every
 * page of every place, and the You menu with the Store, Settings, theme and
 * sound.
 *
 * It is rendered either by the app header (`Sidebar.tsx`) or, on a route that
 * already pins a bar to the top of the viewport, by that bar — see
 * `lib/mobileNavHost.ts` for which routes do which. Exactly one of the two
 * mounts it on any given route, so it is always in the same corner whichever
 * page the reader is on.
 */
export function MobileNavButton({ collapsed = false, className }: MobileNavButtonProps) {
  const openNav = useMobileNav(s => s.openNav)
  const { user } = useAuth()

  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    ''
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''

  return (
    <button
      type="button"
      onClick={openNav}
      aria-label="Open menu"
      aria-hidden={collapsed || undefined}
      tabIndex={collapsed ? -1 : undefined}
      className={cn(
        'relative flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-full',
        'text-muted-foreground transition-[width,opacity,margin] duration-200 lg:hidden',
        collapsed ? 'pointer-events-none -mr-2 w-0 opacity-0' : 'w-10 opacity-100 hover:bg-accent',
        className,
      )}
    >
      {user
        ? <AvatarDisplay avatarUrl={avatarUrl} initials={name.slice(0, 2).toUpperCase()} size={28} />
        : <GuestAvatar className="h-6 w-6" />}
    </button>
  )
}
