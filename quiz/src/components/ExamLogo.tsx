// The exam **logo** — a square, rounded tile carrying the exam's monogram,
// filled with the exam's own accent colour.
//
// It is branding, not information: every surface that shows a logo also names
// the exam beside it, and the tile's job is to make one exam's card
// recognisable before the title is read. Because the fill is the accent ramp
// (`lib/examColors.ts` — blue at Exam P through to red at Exam 9), a row of
// logos also says where on the ladder each exam sits.
//
// The monogram and its type scale are `lib/examLogo.ts`; the size here is a
// single edge length in pixels and everything inside scales off it, so the
// same tile works at 28px on a quiz card and 44px on a study-guide card.
//
// A requirement that is not an exam has no accent (VEE, the DISCs, PCPA, the
// professionalism courses), so it gets a neutral tile rather than a borrowed
// colour — same shape, same anchor, no false position on the ladder.

import { examAccentStyle } from '@/lib/examColors'
import { examMonogram } from '@/lib/examLogo'
import { cn } from '@/lib/utils'

const SIZES = {
  /** A list row or a pill. */
  sm: 26,
  /** The quiz builder's exam cards. */
  md: 34,
  /** The Study Guides grid. */
  lg: 40,
} as const

export function ExamLogo({
  examKey,
  size = 'md',
  muted = false,
  className,
}: {
  /** The `exam_progress` key: `P`, `FM`, `MAS-I`, `CAS-5`, … */
  examKey: string
  size?: keyof typeof SIZES
  /**
   * Hold the colour back — for an exam whose material isn't built yet, where a
   * full-strength logo would read as something to study from. The exam keeps
   * its hue (it still has a place on the ladder), just as a tint rather than a
   * fill, so it sits with the dashed, dimmed card around it.
   */
  muted?: boolean
  className?: string
}) {
  const edge = SIZES[size]
  const accent = examAccentStyle(examKey)
  const { lines, fontScale } = examMonogram(examKey)

  return (
    <span
      aria-hidden="true"
      style={{
        ...accent,
        width: edge,
        height: edge,
        // The radius tracks the tile: a fixed `rounded-lg` reads as a very
        // round tile at 26px and a barely-rounded one at 40px.
        borderRadius: Math.round(edge * 0.28),
        fontSize: `${(fontScale * edge).toFixed(1)}px`,
      }}
      className={cn(
        'inline-flex shrink-0 select-none flex-col items-center justify-center',
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
    </span>
  )
}
