// A **sector's tile** — the exam's own logo (`ExamLogo`), with an orbit ring
// laid over it once the sector is charted, or held back to 40% with a lock disc
// in the corner while it is uncharted (docs/actuaria-online.md §4.5). The same
// object the exam grid and the quiz builder lead their cards with, so an exam
// is recognisably itself in space. Decorative: whatever carries it names it.

import { Lock } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { logoTileEdge, type LogoTileSize } from '@/components/LogoTile'
import { cn } from '@/lib/utils'

export function SectorTile({
  examKey,
  size = 'lg',
  charted = true,
  className,
}: {
  examKey: string
  size?: LogoTileSize
  charted?: boolean
  className?: string
}) {
  const edge = logoTileEdge(size)
  const lock = Math.max(14, Math.round(edge * 0.38))
  return (
    <span aria-hidden="true" className={cn('relative inline-flex shrink-0', className)} style={{ width: edge, height: edge }}>
      <ExamLogo examKey={examKey} size={size} className={cn(!charted && 'opacity-40')} />
      {charted ? (
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -inset-[20%] h-[140%] w-[140%] overflow-visible"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="43"
            ry="14"
            transform="rotate(-12 50 50)"
            fill="none"
            stroke="hsl(var(--actuaria-signal))"
            strokeWidth={size === 'lg' ? 2.2 : 3}
          />
        </svg>
      ) : (
        <span
          className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background"
          style={{ width: lock, height: lock }}
        >
          <Lock style={{ width: lock * 0.55, height: lock * 0.55 }} />
        </span>
      )}
    </span>
  )
}
