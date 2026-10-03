// The pictures on the Store's cards.
//
// A product is drawn, not photographed: the Store holds no seller's images
// (copying a box shot would be lifting a brand's own material, and hotlinking
// one would send a request to the seller from every visit), so each card leads
// with a small illustration of the *kind* of thing it is — a book for a study
// manual, a screen for a video course, a stack of question cards for a
// practice bank, a gift box for a bundle — painted in the exam's own accent
// (`lib/examColors.ts`). A shelf narrowed to Exam FM is a shelf of FM's indigo;
// the whole Store, unfiltered, runs the ramp from blue to red.
//
// They are pictures, not information: the card names the product and its
// seller beside every one, so each drawing is `aria-hidden`. Nothing here moves
// on its own; the object lifts a little when its card is hovered, and only
// where the reader hasn't asked for reduced motion.

import type { ReactNode } from 'react'
import { examMonogramLines } from '@/lib/examLogo'
import { artAccentStyle, type CalculatorLook, type StudyKind } from '@/lib/store'
import { cn } from '@/lib/utils'

const VIVID = { fill: 'var(--exam-accent-vivid)' }
const ACCENT = { fill: 'var(--exam-accent)' }
const CARD = { fill: 'hsl(var(--card))' }
const INK = { fill: 'hsl(var(--foreground))' }

/**
 * The stage a picture stands on: the exam's soft wash, a light falling from
 * the top left, and the object lifted on hover. `children` is the SVG scene,
 * drawn in a 160×100 box.
 */
export function ArtStage({
  examKey,
  neutral,
  className,
  children,
  overlay,
}: {
  examKey?: string
  /** A plain stage — for a calculator or a book cover, which bring their own colour. */
  neutral?: boolean
  className?: string
  children: ReactNode
  /** Drawn over the stage, outside the picture — the price sticker. */
  overlay?: ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      style={artAccentStyle(examKey)}
      className={cn(
        'relative isolate overflow-hidden',
        neutral ? 'bg-muted/70' : 'bg-[var(--exam-accent-soft)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_15%_0%,hsl(var(--background)/0.55),transparent_60%)]" />
      <div className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.04]">
        {children}
      </div>
      {overlay}
    </div>
  )
}

/** The ground shadow every object stands on. */
function Shadow({ cx = 80, width = 36 }: { cx?: number; width?: number }) {
  return <ellipse cx={cx} cy={91} rx={width} ry={3.5} fill="black" opacity={0.12} />
}

/** A study manual: a hardback in the exam's colour, its monogram on the cover. */
function BookShape({ examKey, x = 0, tilt = -6 }: { examKey?: string; x?: number; tilt?: number }) {
  const lines = examKey ? examMonogramLines(examKey) : []
  return (
    <g transform={`translate(${x} 0) rotate(${tilt} 82 50)`}>
      <rect x={59} y={10} width={48} height={72} rx={3.5} style={VIVID} />
      {/* The spine's shade, and the block of pages showing at the fore-edge. */}
      <rect x={59} y={10} width={7} height={72} rx={2} fill="black" opacity={0.2} />
      <rect x={105} y={13} width={4} height={66} rx={1} fill="white" opacity={0.92} />
      <rect x={105.6} y={20} width={2.8} height={0.7} fill="black" opacity={0.12} />
      <rect x={105.6} y={40} width={2.8} height={0.7} fill="black" opacity={0.12} />
      <rect x={105.6} y={60} width={2.8} height={0.7} fill="black" opacity={0.12} />
      <rect x={71} y={20} width={27} height={3} rx={1.5} fill="white" opacity={0.92} />
      <rect x={71} y={26} width={18} height={3} rx={1.5} fill="white" opacity={0.6} />
      {lines.length > 0 && (
        <text
          x={85}
          y={lines.length > 1 ? 52 : 60}
          textAnchor="middle"
          fill="white"
          fontWeight={800}
          fontSize={lines.length > 1 || lines[0]!.length > 2 ? 13 : 19}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          letterSpacing="-0.02em"
        >
          {lines.map((line, i) => (
            <tspan key={i} x={85} dy={i === 0 ? 0 : 14}>{line}</tspan>
          ))}
        </text>
      )}
    </g>
  )
}

/** A video course: a screen with a play button and a part-watched bar. */
function ScreenShape({ live = false }: { live?: boolean }) {
  return (
    <g>
      <rect x={70} y={70} width={20} height={9} style={ACCENT} opacity={0.45} />
      <rect x={58} y={78} width={44} height={4} rx={2} style={ACCENT} opacity={0.55} />
      <rect x={34} y={12} width={92} height={60} rx={7} style={VIVID} />
      <rect x={38} y={16} width={84} height={52} rx={4} style={CARD} />
      {live ? (
        <>
          {/* A seminar: someone at the front of the room, and the live dot. */}
          <circle cx={80} cy={36} r={8} style={VIVID} opacity={0.85} />
          <path d="M64 62 q16 -20 32 0 z" style={VIVID} opacity={0.85} />
          <rect x={44} y={21} width={20} height={7} rx={3.5} fill="rgb(239 68 68)" />
          <circle cx={48.5} cy={24.5} r={1.6} fill="white" />
          <text x={56.5} y={26.6} textAnchor="middle" fill="white" fontSize={4.6} fontWeight={800} fontFamily="ui-sans-serif, system-ui, sans-serif">LIVE</text>
        </>
      ) : (
        <>
          <circle cx={80} cy={39} r={13} style={VIVID} />
          <path d="M76 32 L89 39 L76 46 Z" fill="white" />
          <rect x={46} y={59} width={68} height={3} rx={1.5} style={INK} opacity={0.12} />
          <rect x={46} y={59} width={28} height={3} rx={1.5} style={VIVID} />
          <circle cx={74} cy={60.5} r={2.6} style={VIVID} />
        </>
      )}
    </g>
  )
}

/** A practice bank: a pile of question cards, the top one answered. */
function QuestionCardsShape() {
  return (
    <g>
      <g transform="rotate(9 80 50)">
        <rect x={54} y={18} width={54} height={64} rx={5} style={VIVID} opacity={0.35} />
      </g>
      <g transform="rotate(-5 80 50)">
        <rect x={54} y={16} width={54} height={64} rx={5} style={VIVID} opacity={0.6} />
      </g>
      <rect x={53} y={14} width={54} height={66} rx={5} style={CARD} />
      <rect x={53} y={14} width={54} height={66} rx={5} fill="none" stroke="var(--exam-accent-muted)" strokeWidth={1} />
      <circle cx={63} cy={25} r={5.5} style={VIVID} />
      <text x={63} y={27.8} textAnchor="middle" fill="white" fontSize={7.5} fontWeight={800} fontFamily="ui-sans-serif, system-ui, sans-serif">Q</text>
      <rect x={72} y={22} width={27} height={2.6} rx={1.3} style={INK} opacity={0.35} />
      <rect x={72} y={27} width={18} height={2.6} rx={1.3} style={INK} opacity={0.2} />
      {[38, 48, 58, 68].map((y, i) => (
        <g key={y}>
          {i === 1 ? (
            <>
              <circle cx={62} cy={y} r={3.4} style={VIVID} />
              <path d={`M60.4 ${y} l1.2 1.3 l2.4 -2.6`} stroke="white" strokeWidth={1.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <circle cx={62} cy={y} r={3} fill="none" stroke="hsl(var(--foreground))" strokeOpacity={0.3} strokeWidth={1} />
          )}
          <rect x={69} y={y - 1.3} width={i === 1 ? 26 : 22 - i * 2} height={2.6} rx={1.3} style={i === 1 ? VIVID : INK} opacity={i === 1 ? 0.9 : 0.22} />
        </g>
      ))}
    </g>
  )
}

/** Flashcards: two cards fanned, a question on the front one. */
function FlashcardsShape() {
  return (
    <g>
      <g transform="rotate(12 80 54)">
        <rect x={52} y={22} width={58} height={40} rx={5} style={VIVID} opacity={0.55} />
      </g>
      <g transform="rotate(-8 80 54)">
        <rect x={50} y={28} width={60} height={42} rx={5} style={CARD} />
        <rect x={50} y={28} width={60} height={42} rx={5} fill="none" stroke="var(--exam-accent-muted)" strokeWidth={1} />
        <text x={80} y={56} textAnchor="middle" style={VIVID} fontSize={22} fontWeight={800} fontFamily="ui-sans-serif, system-ui, sans-serif">?</text>
      </g>
    </g>
  )
}

/** A bundle: a gift box, tied with a ribbon. */
function GiftShape() {
  return (
    <g>
      <rect x={50} y={40} width={60} height={42} rx={4} style={VIVID} />
      <rect x={50} y={40} width={60} height={42} rx={4} fill="black" opacity={0.08} />
      <rect x={46} y={30} width={68} height={13} rx={3} style={VIVID} />
      <rect x={76} y={30} width={8} height={52} fill="white" opacity={0.92} />
      <rect x={50} y={52} width={60} height={6} fill="white" opacity={0.25} />
      {/* The bow: two loops and their tails. */}
      <path d="M80 30 C66 14, 58 26, 72 30 Z" fill="white" opacity={0.95} />
      <path d="M80 30 C94 14, 102 26, 88 30 Z" fill="white" opacity={0.95} />
      <circle cx={80} cy={30} r={3.4} fill="white" />
    </g>
  )
}

/** An online course: a laptop with a lesson ticked through. */
function LaptopShape() {
  return (
    <g>
      <rect x={40} y={14} width={80} height={54} rx={5} style={VIVID} />
      <rect x={44} y={18} width={72} height={46} rx={3} style={CARD} />
      {[26, 36, 46, 56].map((y, i) => (
        <g key={y}>
          {i < 2 ? (
            <>
              <circle cx={53} cy={y} r={3.2} style={VIVID} />
              <path d={`M51.5 ${y} l1.1 1.2 l2.2 -2.4`} stroke="white" strokeWidth={1.1} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <circle cx={53} cy={y} r={2.8} fill="none" stroke="hsl(var(--foreground))" strokeOpacity={0.3} strokeWidth={1} />
          )}
          <rect x={60} y={y - 1.3} width={44 - i * 5} height={2.6} rx={1.3} style={INK} opacity={i < 2 ? 0.4 : 0.18} />
        </g>
      ))}
      <path d="M30 70 h100 l-6 9 h-88 z" style={VIVID} />
      <rect x={70} y={70} width={20} height={2.5} rx={1.2} fill="white" opacity={0.5} />
    </g>
  )
}

/** The picture for a study material of this kind. */
export function StudyArt({ kind, examKey }: { kind: StudyKind; examKey?: string }) {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full max-h-40" role="presentation">
      <Shadow width={kind === 'bundle' ? 34 : kind === 'video' || kind === 'seminar' || kind === 'course' ? 46 : 32} />
      {kind === 'manual' && <BookShape examKey={examKey} />}
      {kind === 'video' && <ScreenShape />}
      {kind === 'seminar' && <ScreenShape live />}
      {kind === 'practice' && <QuestionCardsShape />}
      {kind === 'flashcards' && <FlashcardsShape />}
      {kind === 'bundle' && <GiftShape />}
      {kind === 'course' && <LaptopShape />}
    </svg>
  )
}

/** A textbook with no cover image of its own: the manual's hardback, untitled. */
export function PlainBookArt({ examKey }: { examKey?: string }) {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full max-h-40" role="presentation">
      <Shadow width={30} />
      <BookShape examKey={examKey} tilt={-4} />
    </svg>
  )
}

// ── Calculators ──────────────────────────────────────────────────────────────

const BODY: Record<CalculatorLook['body'], { shell: string; key: string; numKey: string; legend: string }> = {
  black: { shell: '#1d2127', key: '#3a4048', numKey: '#585f69', legend: '#e5e7eb' },
  charcoal: { shell: '#30353d', key: '#4a515b', numKey: '#d9dde3', legend: '#e5e7eb' },
  navy: { shell: '#1f2c4a', key: '#34456b', numKey: '#d6dcea', legend: '#e5e7eb' },
  silver: { shell: '#aeb6c0', key: '#4b525c', numKey: '#e6e9ed', legend: '#111827' },
  slate: { shell: '#3f4b5c', key: '#566377', numKey: '#d5dbe3', legend: '#e5e7eb' },
}

const ACCENT_KEY: Record<CalculatorLook['accent'], string | null> = {
  green: '#22c55e',
  amber: '#f59e0b',
  sky: '#38bdf8',
  none: null,
}

/**
 * A calculator, drawn from what tells the approved models apart at a glance:
 * how many lines its display shows (the TI-30Xa one, the MultiView four),
 * its body, its highlight keys, a financial calculator's TVM row, and the
 * solar strip where it has one.
 */
export function CalculatorArt({ look }: { look: CalculatorLook }) {
  const palette = BODY[look.body]
  const accent = ACCENT_KEY[look.accent]
  const displayH = look.lines === 4 ? 20 : look.lines === 2 ? 13 : 10
  const top = look.solar ? 21 : 16
  const keysTop = top + displayH + 7
  const rows = look.lines === 4 ? 8 : 7
  const pitchY = (92 - 6 - keysTop) / rows
  const cols = 5
  const pitchX = 7.4

  return (
    <svg viewBox="0 0 160 100" className="h-full w-full max-h-40" role="presentation">
      <Shadow width={26} />
      <g transform="rotate(-8 80 50)">
        <rect x={60} y={7} width={42} height={86} rx={6} fill={palette.shell} />
        {/* A soft highlight down the left edge, so the shell reads as a solid. */}
        <rect x={60} y={7} width={42} height={86} rx={6} fill="white" opacity={0.07} />
        <rect x={62} y={9} width={6} height={82} rx={3} fill="white" opacity={0.05} />
        {look.solar && (
          <g>
            <rect x={77} y={11} width={20} height={6} rx={1} fill="#3b2c2a" />
            {[0, 1, 2, 3].map(i => (
              <rect key={i} x={77.6 + i * 4.9} y={11.6} width={4.3} height={4.8} rx={0.5} fill="#5b4643" />
            ))}
          </g>
        )}
        <rect x={64} y={top} width={34} height={displayH} rx={2.2} fill="#b8c4a8" />
        <rect x={64} y={top} width={34} height={displayH} rx={2.2} fill="none" stroke="black" strokeOpacity={0.25} strokeWidth={1.2} />
        {Array.from({ length: look.lines }, (_, i) => {
          const lineH = displayH / look.lines
          const y = top + i * lineH + lineH / 2 - 0.9
          const last = i === look.lines - 1
          return (
            <rect
              key={i}
              x={last ? 80 : 67}
              y={y}
              width={last ? 15 : 22 - (i % 2) * 6}
              height={1.8}
              rx={0.6}
              fill="#2f3a2a"
              opacity={0.75}
            />
          )
        })}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const x = 64.2 + c * pitchX
            const y = keysTop + r * pitchY
            // The lower rows are the number pad; the upper ones are function
            // keys — on a financial calculator the second row is its TVM keys.
            const numberPad = r >= rows - 4 && c >= 1 && c <= 3
            const highlight = accent && ((r === 0 && c === 0) || (look.financial && r === 1 && c === 4))
            const enter = r === rows - 1 && c === 4
            const fill = highlight ? accent! : numberPad ? palette.numKey : enter ? (accent ?? palette.key) : palette.key
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width={pitchX - 1.6}
                height={pitchY - 1.6}
                rx={1.4}
                fill={fill}
                opacity={look.financial && r === 1 && !highlight ? 0.85 : 1}
              />
            )
          }),
        )}
      </g>
    </svg>
  )
}
