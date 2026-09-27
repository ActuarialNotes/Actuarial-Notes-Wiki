import { Car, Droplets, FolderKanban, Store, type LucideIcon } from 'lucide-react'
import { LogoTile, type LogoTileSize } from '@/components/LogoTile'
import type { CaseId } from '@/lib/pcpaData'
import { cn } from '@/lib/utils'

/**
 * A brief's tile: the line of business it is about, as an icon in the same
 * tile an exam's card leads with. PCPA has no place on the exam colour ramp
 * (`lib/examColors.ts`), so the tile is the neutral one — the icon, not the
 * colour, is what tells one brief from the next.
 */

const ICONS: Record<CaseId, LucideIcon> = {
  'bop-frequency': Store,
  'auto-severity': Car,
  'ho-water': Droplets,
}

const ICON_SIZE: Record<LogoTileSize, string> = { sm: 'h-3.5 w-3.5', md: 'h-5 w-5', lg: 'h-6 w-6' }

export function BriefTile({ caseId, size = 'lg', className }: { caseId: CaseId; size?: LogoTileSize; className?: string }) {
  const Icon = ICONS[caseId] ?? FolderKanban
  return (
    <LogoTile size={size} className={cn('bg-muted text-foreground', className)}>
      <Icon className={ICON_SIZE[size]} />
    </LogoTile>
  )
}
