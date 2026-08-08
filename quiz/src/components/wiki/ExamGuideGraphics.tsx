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

/* ---------------------------------------------------------------------------
 * Card covers
 *
 * The face of the card itself, as opposed to the wide illustration that heads a
 * page inside the popup. A cover is square and drawn at the same size as the
 * readiness card's dial (88, scaling down with the card) so the three cards in
 * the row read as one row of equal-weight marks — the wide page graphics were
 * only ever ~40px tall in a third-of-a-phone column, which is what made them
 * look like stray icons. No `bg-muted/40` plate either: the dial beside them
 * has none.
 * ------------------------------------------------------------------------- */

const COVER_VIEW_BOX = '0 0 88 88'

function CoverFrame({ className, children }: GraphicProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={COVER_VIEW_BOX}
      role="presentation"
      aria-hidden="true"
      className={`block h-auto w-full max-w-[88px] ${className ?? ''}`}
    >
      {children}
    </svg>
  )
}

/**
 * Exam-day cover: a clock, ring-weighted to match the readiness dial beside it.
 */
export function ClockCover({ className }: GraphicProps) {
  return (
    <CoverFrame className={className}>
      <circle cx="44" cy="44" r="40" fill="none" stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} strokeWidth="8" />
      {[0, 90, 180, 270].map(deg => (
        <line
          key={deg}
          x1="44"
          y1="14"
          x2="44"
          y2="20"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-muted-foreground/50"
          transform={`rotate(${deg} 44 44)`}
        />
      ))}
      <line x1="44" y1="44" x2="44" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary" />
      <line x1="44" y1="44" x2="60" y2="52" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary" />
      <circle cx="44" cy="44" r="4.5" fill="currentColor" className="text-primary" />
    </CoverFrame>
  )
}

/**
 * How-to-study cover: study effort stacking up, with the curve it buys.
 */
export function StudyCover({ className }: GraphicProps) {
  const bars = [
    { x: 20, h: 22 },
    { x: 40, h: 36 },
    { x: 60, h: 50 },
  ]
  return (
    <CoverFrame className={className}>
      {bars.map(b => (
        <rect key={b.x} x={b.x} y={74 - b.h} width="14" height={b.h} rx="4" fill="currentColor" className="text-muted-foreground/25" />
      ))}
      <line x1="10" y1="76" x2="80" y2="76" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-muted-foreground/40" />
      <path d="M16 60C34 56 46 40 68 18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary" />
      <circle cx="68" cy="18" r="6" fill="currentColor" className="text-primary" />
    </CoverFrame>
  )
}

/** The clock the format graphics share, centred at (44, 44). */
function ClockFace() {
  return (
    <>
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
    </>
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
      <ClockFace />

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

/** 4 hours, 45 questions (MAS-I and MAS-II). */
export function FormatMasGraphic({ className }: GraphicProps) {
  return <FormatFrame className={className} questions={45} done={18} />
}

/**
 * The written-answer format: the same clock, but the paper is a handful of
 * questions carrying point values rather than a grid of equal boxes.
 */
export function FormatWrittenGraphic({ className }: GraphicProps) {
  const rows = [0, 1, 2, 3]
  return (
    <Frame className={className}>
      <ClockFace />
      {rows.map(i => {
        const y = 20 + i * 15
        return (
          <g key={i}>
            <rect x="92" y={y} width="70" height="10" rx="3" fill="currentColor" className="text-muted-foreground/25" />
            {/* the point value the question is worth — what the time budget is
                actually spent against */}
            <rect x="166" y={y} width="16" height="10" rx="5" fill="currentColor" className={i < 2 ? 'text-primary/60' : 'text-primary/25'} />
          </g>
        )
      })}
    </Frame>
  )
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

/** Marks are given per step: a worked answer, ticked line by line. */
export function PartialCreditGraphic({ className }: GraphicProps) {
  const lines = [72, 96, 60, 84]
  return (
    <Frame className={className}>
      <rect x="30" y="14" width="118" height="60" rx="5" fill="currentColor" className="text-card" />
      <rect x="30" y="14" width="118" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/35" />
      {lines.map((w, i) => {
        const y = 26 + i * 13
        return (
          <g key={i}>
            <rect x="40" y={y - 3} width={w} height="5" rx="2.5" fill="currentColor" className="text-muted-foreground/30" />
            {/* a tick in the margin for each step that earned its point */}
            <polyline
              points={`158,${y - 1} 163,${y + 4} 172,${y - 7}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={i < 3 ? 'text-primary' : 'text-primary/30'}
            />
          </g>
        )
      })}
    </Frame>
  )
}

/** Claims arriving at random times, and the wait between two of them. */
export function PoissonProcessGraphic({ className }: GraphicProps) {
  const arrivals = [34, 50, 58, 88, 100, 138, 168]
  return (
    <Frame className={className}>
      <line x1="18" y1="52" x2="184" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {arrivals.map(x => (
        <g key={x}>
          <line x1={x} y1="52" x2={x} y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
          <circle cx={x} cy="27" r="3.2" fill="currentColor" className="text-primary" />
        </g>
      ))}
      {/* the interarrival time, the thing that is actually exponential */}
      <line x1="100" y1="66" x2="138" y2="66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-foreground/60" />
      {[100, 138].map(x => (
        <line key={x} x1={x} y1="61" x2={x} y2="71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground/60" />
      ))}
    </Frame>
  )
}

/** A fitted line through data — the whole extended-linear-model section. */
export function RegressionGraphic({ className }: GraphicProps) {
  const points = [
    [46, 62], [60, 56], [72, 60], [86, 48], [98, 44],
    [112, 46], [124, 36], [138, 34], [152, 26], [166, 28],
  ]
  return (
    <Frame className={className}>
      <line x1="30" y1="72" x2="182" y2="72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="30" y1="72" x2="30" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <path d="M38 64C74 58 120 40 176 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill="currentColor" className="text-muted-foreground/55" />
      ))}
    </Frame>
  )
}

/** Residuals about zero: the diagnostic that says whether the fit is any good. */
export function DiagnosticsGraphic({ className }: GraphicProps) {
  const residuals = [-9, 6, -4, 11, -7, 3, -12, 8, -3, 5, -6, 10]
  return (
    <Frame className={className}>
      <line x1="20" y1="44" x2="182" y2="44" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" className="text-muted-foreground/45" />
      {residuals.map((r, i) => {
        const x = 30 + i * 13.5
        return (
          <g key={i}>
            <line x1={x} y1="44" x2={x} y2={44 + r} stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
            <circle cx={x} cy={44 + r} r="3.2" fill="currentColor" className="text-primary/75" />
          </g>
        )
      })}
    </Frame>
  )
}

/** Credibility: the observation and its complement, weighted into one estimate. */
export function CredibilityGraphic({ className }: GraphicProps) {
  const x0 = 26
  const width = 148
  const split = x0 + width * 0.62
  return (
    <Frame className={className}>
      <rect x={x0} y="40" width={width} height="18" rx="9" fill="currentColor" className="text-muted-foreground/25" />
      <path
        d={`M${x0 + 9} 40 H${split} V58 H${x0 + 9} a9 9 0 0 1 0 -18 Z`}
        fill="currentColor"
        className="text-primary/75"
      />
      {/* Z, where the weight lands */}
      <line x1={split} y1="30" x2={split} y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-foreground/70" />
      <circle cx={split} cy="26" r="4" fill="currentColor" className="text-foreground/70" />
      {/* the two things being blended */}
      <rect x={x0} y="20" width="36" height="5" rx="2.5" fill="currentColor" className="text-primary/60" />
      <rect x={x0 + width - 36} y="20" width="36" height="5" rx="2.5" fill="currentColor" className="text-muted-foreground/40" />
    </Frame>
  )
}

/** A mixed model: one slope, a different intercept for every group. */
export function MixedModelGraphic({ className }: GraphicProps) {
  const groups = [
    { dy: 0, cls: 'text-primary' },
    { dy: 14, cls: 'text-muted-foreground/55' },
    { dy: 28, cls: 'text-muted-foreground/40' },
  ]
  return (
    <Frame className={className}>
      <line x1="30" y1="76" x2="182" y2="76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      <line x1="30" y1="76" x2="30" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {groups.map(g => (
        <g key={g.dy}>
          <line x1="40" y1={44 + g.dy} x2="174" y2={16 + g.dy} stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" className={g.cls} />
          {[58, 96, 134].map(x => (
            <circle
              key={x}
              cx={x}
              cy={44 + g.dy - ((x - 40) / 134) * 28}
              r="2.8"
              fill="currentColor"
              className={g.cls}
            />
          ))}
        </g>
      ))}
    </Frame>
  )
}

/** A decision tree, split twice. */
export function TreeGraphic({ className }: GraphicProps) {
  const leaves = [58, 92, 126, 160]
  return (
    <Frame className={className}>
      <line x1="100" y1="22" x2="75" y2="44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-muted-foreground/40" />
      <line x1="100" y1="22" x2="143" y2="44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-muted-foreground/40" />
      <line x1="75" y1="50" x2="58" y2="66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-muted-foreground/40" />
      <line x1="75" y1="50" x2="92" y2="66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-muted-foreground/40" />
      <line x1="143" y1="50" x2="126" y2="66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-muted-foreground/40" />
      <line x1="143" y1="50" x2="160" y2="66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-muted-foreground/40" />
      <circle cx="100" cy="18" r="7" fill="currentColor" className="text-primary" />
      <circle cx="75" cy="46" r="6" fill="currentColor" className="text-primary/70" />
      <circle cx="143" cy="46" r="6" fill="currentColor" className="text-primary/70" />
      {leaves.map(x => (
        <rect key={x} x={x - 8} y="68" width="16" height="10" rx="3" fill="currentColor" className="text-muted-foreground/35" />
      ))}
    </Frame>
  )
}

/** A series, then the forecast it is fitted to produce. */
export function TimeSeriesGraphic({ className }: GraphicProps) {
  const history = [64, 52, 58, 44, 50, 38, 46, 34]
  const path = history.map((y, i) => `${i === 0 ? 'M' : 'L'}${24 + i * 14} ${y}`).join(' ')
  return (
    <Frame className={className}>
      <line x1="18" y1="76" x2="184" y2="76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {/* the forecast interval widening away from the last observation */}
      <path d="M122 34 L184 18 L184 54 Z" fill="currentColor" className="text-primary/15" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
      <path d="M122 34 L184 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" className="text-primary/70" />
      <line x1="122" y1="14" x2="122" y2="76" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/40" />
    </Frame>
  )
}

/** A development triangle, latest diagonal picked out. */
export function TriangleGraphic({ className }: GraphicProps) {
  const rows = 5
  const cells: { x: number; y: number; latest: boolean }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < rows - r; c++) {
      cells.push({ x: 56 + c * 22, y: 14 + r * 14, latest: c === rows - r - 1 })
    }
  }
  return (
    <Frame className={className}>
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width="19"
          height="11"
          rx="2.5"
          fill="currentColor"
          className={cell.latest ? 'text-primary/70' : 'text-muted-foreground/25'}
        />
      ))}
      {/* the accident years down the side */}
      {Array.from({ length: rows }, (_, r) => (
        <rect key={r} x="30" y={14 + r * 14} width="18" height="11" rx="2.5" fill="currentColor" className="text-muted-foreground/40" />
      ))}
    </Frame>
  )
}

/** The rate indication: what is needed against what is collected. */
export function RateIndicationGraphic({ className }: GraphicProps) {
  const need = [
    { h: 30, cls: 'text-primary/75' },
    { h: 12, cls: 'text-primary/45' },
    { h: 10, cls: 'text-primary/25' },
  ]
  let acc = 0
  return (
    <Frame className={className}>
      <line x1="26" y1="74" x2="182" y2="74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground/35" />
      {/* premium as collected today */}
      <rect x="52" y="32" width="40" height="42" rx="3" fill="currentColor" className="text-muted-foreground/30" />
      {/* losses, LAE and expenses stacked into what the rate has to cover */}
      {need.map((seg, i) => {
        const y = 74 - acc - seg.h
        acc += seg.h
        return <rect key={i} x="120" y={y} width="40" height={seg.h} rx="3" fill="currentColor" className={seg.cls} />
      })}
      <line x1="48" y1="32" x2="166" y2="32" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="text-muted-foreground/45" />
      {/* the gap between them, which is the indicated change */}
      <line x1="172" y1="30" x2="172" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <polyline points="167,23 172,17 177,23" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
    </Frame>
  )
}

/** Past papers, worked: a stack of sittings with the top one marked. */
export function PastPapersGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      {[{ dx: -16, dy: 8, cls: 'text-muted-foreground/20' }, { dx: -8, dy: 4, cls: 'text-muted-foreground/30' }].map(s => (
        <rect key={s.dx} x={82 + s.dx} y={14 + s.dy} width="52" height="60" rx="4" fill="currentColor" className={s.cls} />
      ))}
      <rect x="82" y="14" width="52" height="60" rx="4" fill="currentColor" className="text-card" />
      <rect x="82" y="14" width="52" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
      {[26, 34, 42, 50].map(y => (
        <line key={y} x1="90" y1={y} x2={y === 50 ? 114 : 126} y2={y} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-muted-foreground/30" />
      ))}
      <polyline
        points="92,63 100,71 124,58"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
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
