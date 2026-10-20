import { Gamepad2 } from 'lucide-react'
import { LogoTile } from '@/components/LogoTile'
import type { LogoTileSize } from '@/lib/logoTile'
import { PLAYER_HUES } from '@/lib/battleDisplay'

/**
 * The Games tile — a controller on the two players' colours, run together
 * rather than split, since it stands for every game and not one battle.
 * Decorative: whatever carries it also names it.
 */
export function GamesLogo({ size = 'lg', className }: { size?: LogoTileSize; className?: string }) {
  const [a, b] = PLAYER_HUES
  return (
    <LogoTile
      size={size}
      className={['text-white shadow-sm', className].filter(Boolean).join(' ')}
      style={{ background: `linear-gradient(135deg, hsl(${a} 90% 44%), hsl(${b} 90% 44%))` }}
    >
      <Gamepad2 className="h-1/2 w-1/2" />
    </LogoTile>
  )
}
