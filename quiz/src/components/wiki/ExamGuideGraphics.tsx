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

/** A clock beside the question grid. Question count differs by exam. */
function FormatFrame({ className, questions, done }: GraphicProps & { questions: number; done: number }) {
  // Rows of ten, vertically centred on the clock however many rows that takes.
  const rows = Math.ceil(questions / 10)
  const top = 44 - (rows * 13 - 4) / 2
  const cells = Array.from({ length: questions }, (_, i) => ({
    x: 92 + (i % 10) * 10.4,
    y: top + Math.floor(i / 10) * 13,
    done: i < done,
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

/** 3 hours, 30 questions (Exam P). */
export function FormatGraphic({ className }: GraphicProps) {
  return <FormatFrame className={className} questions={30} done={12} />
}

/** 2.5 hours, 35 questions (Exam FM). */
export function FormatFmGraphic({ className }: GraphicProps) {
  return <FormatFrame className={className} questions={35} done={14} />
}

/** The aid sheet you may not bring, struck through. */
function CrossedSheet({ x }: { x: number }) {
  return (
    <g transform={`translate(${x - 26} 0)`}>
      <rect x="26" y="18" width="52" height="52" rx="4" fill="currentColor" className="text-muted-foreground/15" />
      <rect x="26" y="18" width="52" height="52" rx="4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-muted-foreground/40" />
      {[28, 38, 48, 58].map(y => (
        <line key={y} x1="34" y1={y} x2="70" y2={y} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground/30" />
      ))}
      <line x1="24" y1="72" x2="80" y2="16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-destructive/70" />
    </g>
  )
}

/** No sheet and no tables at all — the Exam FM case. */
export function NoAidSheetGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <CrossedSheet x={74} />
    </Frame>
  )
}

/** A formula sheet you don't get, next to the normal table you do. */
export function FormulaSheetGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      {/* The sheet you may not bring */}
      <CrossedSheet x={26} />

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

/** Money moved through time: a present value growing along an accumulation curve. */
export function AccumulationGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <line x1="26" y1="72" x2="184" y2="72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="26" y1="72" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {/* the value you hold at t = 0, and where it lands at t = n */}
      <line x1="26" y1="62" x2="176" y2="62" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/35" />
      <line x1="26" y1="20" x2="176" y2="20" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/35" />
      <line x1="176" y1="72" x2="176" y2="20" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/35" />
      <path d="M32 62C86 58 130 48 176 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
      <circle cx="32" cy="62" r="3.4" fill="currentColor" className="text-primary" />
      <circle cx="176" cy="20" r="3.4" fill="currentColor" className="text-primary" />
    </Frame>
  )
}

/** An annuity: level payments discounted back to one present value. */
export function AnnuityGraphic({ className }: GraphicProps) {
  const pays = [78, 100, 122, 144, 166]
  return (
    <Frame className={className}>
      <line x1="26" y1="66" x2="184" y2="66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {/* the level payments */}
      {pays.map(x => (
        <rect key={x} x={x - 4} y="40" width="8" height="26" rx="2" fill="currentColor" className="text-muted-foreground/45" />
      ))}
      {/* their present value, at time 0 */}
      <rect x="30" y="24" width="12" height="42" rx="2.5" fill="currentColor" className="text-primary/75" />
      {/* discounting: everything folds back to that first bar */}
      <path d="M164 32C124 12 74 12 44 20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" className="text-primary/60" />
      <polyline points="50,15 43,20.5 50,25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60" />
      {pays.map(x => (
        <line key={x} x1={x} y1="66" x2={x} y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/40" />
      ))}
    </Frame>
  )
}

/** A loan payment splitting into interest and principal, period by period. */
export function AmortizationGraphic({ className }: GraphicProps) {
  const interest = [32, 27, 21, 15, 9, 4]
  const total = 44
  return (
    <Frame className={className}>
      {interest.map((int, i) => {
        const x = 28 + i * 25
        const principal = total - int
        return (
          <g key={i}>
            <rect x={x} y={70 - total} width="16" height={int} rx="2" fill="currentColor" className="text-muted-foreground/35" />
            <rect x={x} y={70 - principal} width="16" height={principal} rx="2" fill="currentColor" className="text-primary/70" />
          </g>
        )
      })}
      <line x1="22" y1="72" x2="182" y2="72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
    </Frame>
  )
}

/** Immunization: assets and liabilities balanced across a fulcrum. */
export function ImmunizationGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      {/* the beam, level */}
      <rect x="30" y="44" width="140" height="6" rx="3" fill="currentColor" className="text-muted-foreground/45" />
      {/* assets left, liabilities right — equal moment about the pivot */}
      <rect x="44" y="20" width="32" height="22" rx="3" fill="currentColor" className="text-primary/70" />
      <rect x="124" y="26" width="32" height="16" rx="3" fill="currentColor" className="text-muted-foreground/40" />
      <rect x="124" y="20" width="32" height="4" rx="2" fill="currentColor" className="text-muted-foreground/25" />
      {/* the pivot: the duration you match them at */}
      <path d="M100 50 88 70h24z" fill="currentColor" className="text-primary/60" />
      <line x1="70" y1="72" x2="130" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground/40" />
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

/** 4 hours, 45 questions (Exam MAS-I). */
export function FormatMasIGraphic({ className }: GraphicProps) {
  return <FormatFrame className={className} questions={45} done={18} />
}

/** The three syllabus sections as one bar, with the largest one filled. */
export function SectionWeightsGraphic({ className }: GraphicProps) {
  // Midpoints of the published ranges: 25% / 25% / 50%.
  const x0 = 20
  const width = 160
  const parts = [
    { w: 0.25, accent: false },
    { w: 0.25, accent: false },
    { w: 0.50, accent: true },
  ]
  let x = x0
  return (
    <Frame className={className}>
      {parts.map((p, i) => {
        const w = width * p.w
        const bar = (
          <rect
            key={i}
            x={x + 2}
            y="34"
            width={w - 4}
            height="20"
            rx="4"
            fill="currentColor"
            className={p.accent ? 'text-primary/75' : 'text-muted-foreground/30'}
          />
        )
        x += w
        return bar
      })}
      <text x={x0 + width * 0.125} y="70" textAnchor="middle" fontSize="11" fill="currentColor" className="text-muted-foreground/70">A</text>
      <text x={x0 + width * 0.375} y="70" textAnchor="middle" fontSize="11" fill="currentColor" className="text-muted-foreground/70">B</text>
      <text x={x0 + width * 0.75} y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" className="text-primary">C</text>
      <text x={x0 + width * 0.75} y="28" textAnchor="middle" fontSize="11" fill="currentColor" className="text-primary/80">half the paper</text>
    </Frame>
  )
}

/** One arrival stream splitting into two thinned streams. */
export function PoissonStreamGraphic({ className }: GraphicProps) {
  const arrivals = [40, 58, 72, 96, 118, 134, 160]
  return (
    <Frame className={className}>
      <line x1="20" y1="30" x2="184" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {arrivals.map((x, i) => (
        <circle key={x} cx={x} cy="30" r="3.6" fill="currentColor" className={i % 3 === 0 ? 'text-primary' : 'text-muted-foreground/55'} />
      ))}
      {/* the split */}
      <path d="M100 36 60 58" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" className="text-muted-foreground/40" />
      <path d="M100 36 140 58" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" className="text-muted-foreground/40" />
      <line x1="20" y1="70" x2="96" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="108" y1="70" x2="184" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {[34, 52, 78].map(x => (
        <circle key={x} cx={x} cy="70" r="3.4" fill="currentColor" className="text-primary" />
      ))}
      {[118, 140, 152, 172].map(x => (
        <circle key={x} cx={x} cy="70" r="3.4" fill="currentColor" className="text-muted-foreground/55" />
      ))}
    </Frame>
  )
}

/** A log-likelihood peaking at the estimate. */
export function LikelihoodGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <line x1="26" y1="72" x2="182" y2="72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="26" y1="72" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <path d="M34 70c30 0 40-48 62-48s32 48 62 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
      <line x1="96" y1="72" x2="96" y2="22" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" className="text-muted-foreground/45" />
      <circle cx="96" cy="22" r="3.8" fill="currentColor" className="text-primary" />
    </Frame>
  )
}

/** A survival curve stepping down with age. */
export function SurvivalCurveGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <line x1="26" y1="72" x2="182" y2="72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="26" y1="72" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <path
        d="M26 20h22v7h22v9h22v13h22v16h22v9h22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="text-primary"
      />
      <line x1="26" y1="20" x2="176" y2="20" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/30" />
    </Frame>
  )
}

/** A coefficient table: the output an exam question asks you to read. */
export function ModelOutputGraphic({ className }: GraphicProps) {
  const rows = [26, 40, 54, 68]
  return (
    <Frame className={className}>
      <rect x="24" y="14" width="152" height="60" rx="4" fill="currentColor" className="text-card" />
      <rect x="24" y="14" width="152" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/35" />
      <line x1="24" y1="32" x2="176" y2="32" stroke="currentColor" strokeWidth="1.6" className="text-muted-foreground/35" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="32" y={y - 4} width="40" height="5" rx="2.5" fill="currentColor" className={i === 0 ? 'text-muted-foreground/55' : 'text-muted-foreground/30'} />
          <rect x="82" y={y - 4} width="22" height="5" rx="2.5" fill="currentColor" className="text-muted-foreground/30" />
          <rect x="112" y={y - 4} width="22" height="5" rx="2.5" fill="currentColor" className="text-muted-foreground/30" />
          <rect x="142" y={y - 4} width="26" height="5" rx="2.5" fill="currentColor" className={i === 0 ? 'text-muted-foreground/55' : 'text-primary/75'} />
        </g>
      ))}
    </Frame>
  )
}

/** Four diagnostic panels, read at a glance. */
export function DiagnosticPanelsGraphic({ className }: GraphicProps) {
  const panel = (x: number, y: number, children: ReactNode) => (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="76" height="34" rx="4" fill="currentColor" className="text-card" />
      <rect x="0" y="0" width="76" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-muted-foreground/30" />
      {children}
    </g>
  )
  return (
    <Frame className={className}>
      {/* residuals in a band */}
      {panel(20, 10, (
        <>
          <line x1="8" y1="17" x2="68" y2="17" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" className="text-muted-foreground/40" />
          {[12, 22, 30, 40, 50, 60].map((cx, i) => (
            <circle key={cx} cx={cx} cy={17 + [-6, 4, -3, 6, -5, 2][i]} r="2.2" fill="currentColor" className="text-primary/70" />
          ))}
        </>
      ))}
      {/* QQ line */}
      {panel(104, 10, (
        <>
          <line x1="8" y1="28" x2="68" y2="6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/40" />
          {[12, 22, 32, 42, 52, 62].map((cx, i) => (
            <circle key={cx} cx={cx} cy={27 - i * 4 + [0, 1, 0, -1, -2, -4][i]} r="2.2" fill="currentColor" className="text-primary/70" />
          ))}
        </>
      ))}
      {/* histogram */}
      {panel(20, 48, (
        <>
          {[6, 14, 24, 18, 11, 6].map((h, i) => (
            <rect key={i} x={10 + i * 10} y={28 - h} width="7" height={h} rx="1.5" fill="currentColor" className="text-primary/55" />
          ))}
        </>
      ))}
      {/* box plot */}
      {panel(104, 48, (
        <>
          <line x1="10" y1="17" x2="66" y2="17" stroke="currentColor" strokeWidth="1.6" className="text-muted-foreground/45" />
          <rect x="24" y="10" width="26" height="14" rx="2.5" fill="currentColor" className="text-primary/25" />
          <rect x="24" y="10" width="26" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-primary/70" />
          <line x1="36" y1="10" x2="36" y2="24" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </>
      ))}
    </Frame>
  )
}
