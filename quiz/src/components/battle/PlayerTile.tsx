import { AvatarDisplay, ANIMAL_TYPES, parseAvatarUrl } from '@/components/AvatarDisplay'
import { playerAccentStyle, playerInitials } from '@/lib/battleDisplay'
import type { BattlePlayer, Seat } from '@/lib/battle'
import { cn } from '@/lib/utils'

/**
 * The avatars a battle will draw: the app's own animals and colours. An image
 * avatar is a URL, and online it is a URL the *other* player chose — so it is
 * never fetched here; that player gets their initials instead.
 */
function drawableAvatar(url: string | undefined): string | null {
  if (!url) return null
  const parsed = parseAvatarUrl(url)
  if (parsed.type === 'animal' && ANIMAL_TYPES.includes(parsed.value)) return url
  if (parsed.type === 'color' && /^#[0-9a-f]{3,8}$/i.test(parsed.value)) return url
  return null
}

/**
 * A player's face on the board: their avatar ringed in their colour, or their
 * initials on it. Decorative — their name is always printed beside it.
 */
export function PlayerTile({
  seat,
  player,
  size = 40,
  className,
}: {
  seat: Seat
  player: BattlePlayer | null
  size?: number
  className?: string
}) {
  const avatar = drawableAvatar(player?.avatarUrl)
  return (
    <span
      aria-hidden
      style={{ ...playerAccentStyle(seat), width: size, height: size }}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full ring-2 ring-[var(--player)] ring-offset-2 ring-offset-background',
        !avatar && 'bg-[var(--player-vivid)] font-semibold text-white',
        className,
      )}
    >
      {avatar ? (
        <AvatarDisplay avatarUrl={avatar} initials={playerInitials(player?.name ?? '')} size={size} />
      ) : (
        <span style={{ fontSize: Math.round(size * 0.38) }}>{player ? playerInitials(player.name) : '?'}</span>
      )}
    </span>
  )
}
