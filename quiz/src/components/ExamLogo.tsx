// The exam **logo** — a square, rounded tile carrying the exam's monogram,
// filled with the exam's own accent colour.
//
// It is branding, not information: every surface that shows a logo also names
// the exam beside it, and the tile's job is to make one exam's card
// recognisable before the title is read. Because the fill is the accent ramp
// (`lib/examColors.ts` — blue at Exam P through to red at Exam 9), a row of
// logos also says where on the ladder each exam sits.
//
// The monogram and its type scale are `lib/examLogo.ts`; the tile itself —
// edge lengths and radius — is `components/LogoTile.tsx`, shared with the
// guide cards on the Study Guides home page so a guide and an exam lead their
// cards with the same shape.
//
// A requirement that is not an exam has no accent (VEE, the DISCs, PCPA, the
// professionalism courses), so it gets a neutral tile rather than a borrowed
// colour — same shape, same anchor, no false position on the ladder.

import { examAccentStyle } from '@/lib/examColors'
import { examMonogram } from '@/lib/examLogo'
import { LogoTile, logoTileEdge, type LogoTileSize } from '@/components/LogoTile'
import { cn } from '@/lib/utils'

export function ExamLogo({
  examKey,
  size = 'md',
  muted = false,
  className,
}: {
  /** The `exam_progress` key: `P`, `FM`, `MAS-I`, `CAS-5`, … */
  examKey: string
  size?: LogoTileSize
  /**
   * Hold the colour back — for an exam whose material isn't built yet, where a
   * full-strength logo would read as something to study from. The exam keeps
   * its hue (it still has a place on the ladder), just as a tint rather than a
   * fill, so it sits with the dashed, dimmed card around it.
   */
  muted?: boolean
  className?: string
}) {
  const accent = examAccentStyle(examKey)
  const { lines, fontScale } = examMonogram(examKey)

  return (
    <LogoTile
      size={size}
      style={{
        ...accent,
        fontSize: `${(fontScale * logoTileEdge(size)).toFixed(1)}px`,
      }}
      className={cn(
        'font-bold uppercase leading-[1.02] tracking-tight',
        accent
          ? muted
            ? 'bg-[var(--exam-accent-soft)] text-[var(--exam-accent)]'
            : 'bg-[var(--exam-accent-vivid)] text-white shadow-sm'
          : 'bg-muted text-muted-foreground',
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </LogoTile>
  )
}
