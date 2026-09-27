import { Car, Droplets, FolderKanban, Store, type LucideIcon } from 'lucide-react'
import { LogoTile, type LogoTileSize } from '@/components/LogoTile'
import { programmeOf } from '@/data/projects'
import { examAccentStyle } from '@/lib/examColors'
import type { CaseId } from '@/lib/pcpaData'
import { cn } from '@/lib/utils'

/**
 * A brief's tile: the line of business it is about, as an icon in the same
 * tile an exam's card leads with, filled with the colour of the exam it is a
 * project for (`lib/examColors.ts`) — so a brief is recognisably PCPA's the way
 * an exam's logo is recognisably that exam's. The icon, not the colour, is
 * what tells one brief of an exam from the next.
 *
 * A programme whose exam has no hue keeps the neutral tile.
 */

const ICONS: Record<CaseId, LucideIcon> = {
  'bop-frequency': Store,
  'auto-severity': Car,
  'ho-water': Droplets,
}

const ICON_SIZE: Record<LogoTileSize, string> = { xs: 'h-3 w-3', sm: 'h-3.5 w-3.5', md: 'h-5 w-5', lg: 'h-6 w-6' }

export function BriefTile({ caseId, size = 'lg', className }: { caseId: CaseId; size?: LogoTileSize; className?: string }) {
  const Icon = ICONS[caseId] ?? FolderKanban
  const accent = examAccentStyle(programmeOf(caseId)?.examKey ?? '')
  return (
    <LogoTile
      size={size}
      style={accent}
      className={cn(accent ? 'bg-[var(--exam-accent-vivid)] text-white shadow-sm' : 'bg-muted text-foreground', className)}
    >
      <Icon className={ICON_SIZE[size]} />
    </LogoTile>
  )
}
