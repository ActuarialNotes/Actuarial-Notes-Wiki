import { Swords } from 'lucide-react'
import { LogoTile, type LogoTileSize } from '@/components/LogoTile'
import { PLAYER_HUES } from '@/lib/battleDisplay'

/**
 * Quiz Battle's tile — the card logo's shape, split corner to corner between
 * the two players' colours. Decorative: whatever carries it also names it.
 */
export function BattleLogo({ size = 'lg', className }: { size?: LogoTileSize; className?: string }) {
  const [a, b] = PLAYER_HUES
  return (
    <LogoTile
      size={size}
      className={['text-white shadow-sm', className].filter(Boolean).join(' ')}
      style={{ background: `linear-gradient(135deg, hsl(${a} 90% 44%) 50%, hsl(${b} 90% 44%) 50%)` }}
    >
      <Swords className="h-1/2 w-1/2" />
    </LogoTile>
  )
}
