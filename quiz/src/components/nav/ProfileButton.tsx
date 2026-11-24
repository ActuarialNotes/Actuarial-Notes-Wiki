// The profile button (docs/redesign-spec.md R2, §7b): the reader's character in
// a ring, at the top right of a place on a phone. It opens You. On a wide
// screen the rail's foot carries the same link (`PlaceRail`).

import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { YOU_PATH } from '@/lib/you'
import { cn } from '@/lib/utils'

/** The name You is opened under: the account's, or "You" for a visitor. */
export function useProfileName(): { name: string; avatarUrl: string; initials: string; signedIn: boolean } {
  const { user } = useAuth()
  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'You'
  return {
    name,
    avatarUrl: (user?.user_metadata?.avatar_url as string | undefined) ?? '',
    initials: name.slice(0, 2).toUpperCase(),
    signedIn: !!user,
  }
}

/** The character in its ring, or a dashed ring for a visitor, who has none yet. */
export function ProfileRing({ size }: { size: number }) {
  const { avatarUrl, initials, signedIn } = useProfileName()
  if (!signedIn) {
    return (
      <span
        style={{ width: size, height: size }}
        className="block shrink-0 rounded-full border-2 border-dashed border-foreground"
        aria-hidden="true"
      />
    )
  }
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-foreground"
      aria-hidden="true"
    >
      <AvatarDisplay avatarUrl={avatarUrl} initials={initials} size={size - 4} />
    </span>
  )
}

export function ProfileButton({ claimable = 0, className }: {
  /** Quests finished and waiting to be collected, counted on the button. */
  claimable?: number
  className?: string
}) {
  const ready = claimable > 0 ? `. ${claimable} ${claimable === 1 ? 'quest' : 'quests'} to collect` : ''
  return (
    <Link
      to={YOU_PATH}
      aria-label={`You${ready}`}
      data-testid="profile-button"
      className={cn(
        'relative block shrink-0 rounded-full outline-none transition-transform duration-150 active:scale-90 focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <ProfileRing size={44} />
      {claimable > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-foreground px-1 text-[13px] font-bold leading-none text-ground tabular-nums" aria-hidden="true">
          {claimable}
        </span>
      )}
    </Link>
  )
}
