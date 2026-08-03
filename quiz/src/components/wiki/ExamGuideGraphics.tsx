import type { ReactNode } from 'react'

/**
 * The illustrations that head each page of an exam-guide popup (and the top of
 * the card that opens it) — see `data/examGuides.ts` and `ExamGuideCards.tsx`.
 *
 * Deliberately plain: flat geometry on a `bg-muted/40` plate, no gradients and
 * no text labels beyond the odd numeral. Colour comes from `currentColor`, set
 * by a `text-*` token class on each shape, so every theme and both light/dark
 * modes keep working (see docs/style-guide.md §2.1). Nothing here animates.
 */

interface GraphicProps {
  className?: string
}

const VIEW_BOX = '0 0 200 88'

function Frame({ className, children }: GraphicProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      role="presentation"
      aria-hidden="true"
      className={`w-full h-auto rounded-lg bg-muted/40 ${className ?? ''}`}
    >
      {children}
    </svg>
  )
}

/** 3 hours, 30 questions: a clock beside the 30-question grid. */
export function FormatGraphic({ className }: GraphicProps) {
  const cells = Array.from({ length: 30 }, (_, i) => ({
    x: 92 + (i % 10) * 10.4,
    y: 26 + Math.floor(i / 10) * 13,
    done: i < 12,
  }))
  return (
    <Frame className={className}>
      <circle cx="44" cy="44" r="23" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground/35" />
      {[0, 90, 180, 270].map(deg => (
        <line
          key={deg}
          x1="44"
          y1="25"
          x2="44"
          y2="28.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-muted-foreground/50"
          transform={`rotate(${deg} 44 44)`}
        />
      ))}
      <line x1="44" y1="44" x2="44" y2="31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
      <line x1="44" y1="44" x2="55" y2="49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
      <circle cx="44" cy="44" r="2.6" fill="currentColor" className="text-primary" />

      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="8"
          height="9"
          rx="2"
          fill="currentColor"
          className={c.done ? 'text-primary/70' : 'text-muted-foreground/25'}
        />
      ))}
    </Frame>
  )
}

/** A formula sheet you don't get, next to the normal table you do. */
export function FormulaSheetGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      {/* The sheet you may not bring */}
      <rect x="26" y="18" width="52" height="52" rx="4" fill="currentColor" className="text-muted-foreground/15" />
      <rect x="26" y="18" width="52" height="52" rx="4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-muted-foreground/40" />
      {[28, 38, 48, 58].map(y => (
        <line key={y} x1="34" y1={y} x2="70" y2={y} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground/30" />
      ))}
      <line x1="24" y1="72" x2="80" y2="16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-destructive/70" />

      {/* The normal table you're given on-screen */}
      <rect x="118" y="18" width="56" height="52" rx="4" fill="currentColor" className="text-card" />
      <rect x="118" y="18" width="56" height="52" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
      <path d="M124 44c6 0 6-14 12-14s6 14 12 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" transform="translate(10 4)" />
      <line x1="126" y1="52" x2="166" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {[59, 65].map(y => (
        <line key={y} x1="126" y1={y} x2="152" y2={y} stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/30" />
      ))}
    </Frame>
  )
}

/** Bring two approved calculators. */
export function CalculatorGraphic({ className }: GraphicProps) {
  const body = (dx: number, accent: boolean) => (
    <g transform={`translate(${dx} 0)`}>
      <rect x="0" y="14" width="52" height="60" rx="6" fill="currentColor" className={accent ? 'text-primary/15' : 'text-muted-foreground/10'} />
      <rect x="0" y="14" width="52" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="2" className={accent ? 'text-primary/70' : 'text-muted-foreground/40'} />
      <rect x="7" y="21" width="38" height="12" rx="2" fill="currentColor" className={accent ? 'text-primary/45' : 'text-muted-foreground/25'} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={7 + (i % 4) * 10.5}
          y={39 + Math.floor(i / 4) * 10.5}
          width="7.5"
          height="7.5"
          rx="1.8"
          fill="currentColor"
          className={accent ? 'text-primary/40' : 'text-muted-foreground/30'}
        />
      ))}
    </g>
  )
  return (
    <Frame className={className}>
      {body(42, false)}
      {body(106, true)}
    </Frame>
  )
}

/** The 0–10 scale, with the pass mark at 6. */
export function ScoreScaleGraphic({ className }: GraphicProps) {
  const x0 = 20
  const width = 160
  const step = width / 10
  const passX = x0 + 6 * step
  return (
    <Frame className={className}>
      <rect x={x0} y="36" width={width} height="16" rx="8" fill="currentColor" className="text-muted-foreground/20" />
      <path
        d={`M${passX} 36 H${x0 + width - 8} a8 8 0 0 1 8 8 a8 8 0 0 1 -8 8 H${passX} Z`}
        fill="currentColor"
        className="text-primary/75"
      />
      {Array.from({ length: 11 }, (_, i) => (
        <line
          key={i}
          x1={x0 + i * step}
          y1="56"
          x2={x0 + i * step}
          y2={i % 5 === 0 ? 63 : 60}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="text-muted-foreground/40"
        />
      ))}
      <text x={x0} y="76" textAnchor="middle" fontSize="11" fill="currentColor" className="text-muted-foreground/70">0</text>
      <text x={x0 + width} y="76" textAnchor="middle" fontSize="11" fill="currentColor" className="text-muted-foreground/70">10</text>
      <line x1={passX} y1="20" x2={passX} y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <text x={passX} y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" className="text-primary">6</text>
    </Frame>
  )
}

/** Everything rests on general probability: a three-tier base. */
export function FoundationGraphic({ className }: GraphicProps) {
  const tiers = [
    { w: 44, label: false },
    { w: 78, label: false },
    { w: 116, label: true },
  ]
  return (
    <Frame className={className}>
      {tiers.map((t, i) => (
        <rect
          key={i}
          x={100 - t.w / 2}
          y={18 + i * 19}
          width={t.w}
          height="15"
          rx="3.5"
          fill="currentColor"
          className={t.label ? 'text-primary/75' : 'text-muted-foreground/25'}
        />
      ))}
      <line x1="34" y1="79" x2="166" y2="79" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/50" />
    </Frame>
  )
}

/** Twelve families as one set: a row of differently-shaped densities. */
export function DistributionsGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      {/* bell */}
      <path d="M14 64c8 0 8-34 16-34s8 34 16 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      {/* right-skewed */}
      <path d="M62 64c4-32 10-34 16-22s10 22 16 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground/55" />
      {/* uniform */}
      <path d="M110 64V36h32v28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="text-muted-foreground/55" />
      {/* discrete bars */}
      {[0, 1, 2, 3].map(i => (
        <line
          key={i}
          x1={158 + i * 9}
          y1="64"
          x2={158 + i * 9}
          y2={64 - [10, 24, 18, 8][i]}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-muted-foreground/55"
        />
      ))}
      <line x1="10" y1="66" x2="190" y2="66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/30" />
    </Frame>
  )
}

/** The payment variable: nothing, then a slope, then a cap. */
export function PayoutGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <line x1="26" y1="70" x2="182" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="26" y1="70" x2="26" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {/* deductible, then a 45° payout, then the benefit limit */}
      <line x1="70" y1="70" x2="70" y2="24" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/35" />
      <line x1="130" y1="70" x2="130" y2="24" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/35" />
      <line x1="26" y1="30" x2="176" y2="30" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/35" />
      <path d="M26 70h44l60-40h46" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="text-primary" />
      <circle cx="70" cy="70" r="3.2" fill="currentColor" className="text-primary" />
      <circle cx="130" cy="30" r="3.2" fill="currentColor" className="text-primary" />
    </Frame>
  )
}

/** The thing that actually costs marks: limits over a non-rectangular region. */
export function JointRegionGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <line x1="40" y1="70" x2="170" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="40" y1="70" x2="40" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <path d="M40 70h100L40 20Z" fill="currentColor" className="text-primary/25" />
      <path d="M40 70h100L40 20Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" className="text-primary" />
      {/* the vertical strip you integrate over */}
      <line x1="84" y1="70" x2="84" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-foreground/70" />
      <line x1="79" y1="48" x2="89" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground/70" />
      <line x1="79" y1="70" x2="89" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground/70" />
    </Frame>
  )
}

/** The four gaps, as a checklist. */
export function GapsGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      {[0, 1, 2, 3].map(i => {
        const y = 16 + i * 17
        return (
          <g key={i}>
            <rect x="46" y={y} width="13" height="13" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/70" />
            <polyline
              points={`48.8,${y + 6.6} 51.8,${y + 9.6} 56.4,${y + 3.6}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            />
            <rect x="67" y={y + 4} width={[86, 66, 78, 40][i]} height="5" rx="2.5" fill="currentColor" className="text-muted-foreground/30" />
          </g>
        )
      })}
    </Frame>
  )
}
