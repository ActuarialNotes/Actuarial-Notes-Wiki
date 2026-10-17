import { LogoTile } from '@/components/LogoTile'
import type { LogoTileSize } from '@/lib/logoTile'
import { cn } from '@/lib/utils'

/**
 * Concept Craft's tile — a piece of the board itself: two concepts joined by
 * a tag, and the one they make hanging below it. It carries `.dark` so it is
 * the board's own black whatever the reader's theme, the way the board is
 * (docs/concept-craft.md). Decorative: whatever carries it also names it.
 */
export function CraftLogo({ size = 'lg', className }: { size?: LogoTileSize; className?: string }) {
  return (
    <LogoTile size={size} className={cn('dark bg-background text-foreground shadow-sm', className)}>
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M6.5 7.5 L12 11 L17.5 7.5 M12 11 V16.2" strokeLinecap="round" opacity={0.55} />
        <rect x="2.5" y="4.5" width="7" height="5" rx="1.6" fill="currentColor" stroke="none" />
        <rect x="14.5" y="4.5" width="7" height="5" rx="1.6" fill="currentColor" stroke="none" />
        <path d="M12 9.2 L13.8 11 L12 12.8 L10.2 11 Z" fill="currentColor" stroke="none" />
        <rect x="8.5" y="15.5" width="7" height="5" rx="1.6" />
      </svg>
    </LogoTile>
  )
}
