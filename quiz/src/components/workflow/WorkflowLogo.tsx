import { LogoTile } from '@/components/LogoTile'
import type { LogoTileSize } from '@/lib/logoTile'
import { cn } from '@/lib/utils'

/**
 * The Workflows tile — a piece of the board: three steps locked in
 * their cells, one leading into the next two. It carries `.dark`, as Concept
 * Craft's does, so it is the board's own black whatever the reader's theme.
 * Decorative: whatever carries it also names it.
 */
export function WorkflowLogo({ size = 'lg', className }: { size?: LogoTileSize; className?: string }) {
  return (
    <LogoTile size={size} className={cn('dark bg-background text-foreground shadow-sm', className)}>
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M8.5 12 C11 12 11 6.5 14.5 6.5 M8.5 12 C11 12 11 17.5 14.5 17.5" strokeLinecap="round" opacity={0.55} />
        <rect x="1.5" y="9.5" width="7" height="5" rx="1.6" fill="currentColor" stroke="none" />
        <rect x="15.5" y="4" width="7" height="5" rx="1.6" fill="currentColor" stroke="none" />
        <rect x="15.5" y="15" width="7" height="5" rx="1.6" />
      </svg>
    </LogoTile>
  )
}
