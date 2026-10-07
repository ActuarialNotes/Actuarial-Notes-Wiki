// The pictures on the Store's cards.
//
// A product is shown by its seller's own picture of it wherever the seller's
// page has one (`ProductImage`, copied into `public/store-products/` — never
// hotlinked, so browsing sends no request to a seller):
//
//   • a **cover** — the flat front of a manual, as the seller shows it — is
//     bound into a book: a 3/4 view with its spine turned towards the reader,
//     the spine printed with the cover's own left edge, a hinge crease and the
//     light catching the board (`BoundCover`);
//   • a **photo** — a calculator, a laptop, a box — is shown as it is, standing
//     on the stage with its own shadow (`ProductPhoto`).
//
// A product with no picture gets the same book, its cover printed in the
// exam's accent (`lib/examColors.ts`) with the product's own title, its seller
// and what kind of thing it is (`MockupBook`) — so a shelf narrowed to Exam FM
// is FM's indigo, and a mock-up never pretends to be a real jacket: the words
// on it are the Store's, set in the Store's type. A calculator with no picture
// (the BA-35, discontinued) is drawn from what tells the models apart
// (`CalculatorArt`).
//
// They are pictures, not information: the card names the product and its
// seller beside every one, so each is `aria-hidden`. Nothing here moves on its
// own; the object lifts a little when its card is hovered — a book turns a
// little more towards the reader — and only where motion is welcome.

import { useId, type CSSProperties, type ReactNode } from 'react'
import { STORE_SELLERS } from '@/data/storeCatalog'
import { examMonogramLines } from '@/lib/examLogo'
import {
  COVER_TITLE_WIDTH,
  STUDY_KIND_LABEL,
  artAccentStyle,
  coverTitle,
  type CalculatorLook,
  type CalculatorProduct,
  type StudyProduct,
} from '@/lib/store'
import type { StoreBook } from '@/lib/storeBooks'
import { cn } from '@/lib/utils'

/**
 * The stage a picture stands on: the exam's soft wash, a light falling from
 * the top left, and the object lifted on hover. `children` is the picture,
 * centred — a drawn scene is a 160×100 SVG box.
 */
export function ArtStage({
  examKey,
  neutral,
  className,
  children,
  overlay,
}: {
  examKey?: string
  /** A plain stage — for a calculator or a textbook, which bring their own colour. */
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
        // A size container, so a picture can fit both of the stage's sides (`BOOK_HEIGHT`).
        'relative isolate overflow-hidden [container-type:size]',
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

/** The ground shadow a drawn object stands on. */
function Shadow({ cx = 80, width = 36 }: { cx?: number; width?: number }) {
  return <ellipse cx={cx} cy={91} rx={width} ry={3.5} fill="black" opacity={0.12} />
}

// ── Books ────────────────────────────────────────────────────────────────────

/**
 * A hardback in 3/4 view, `face` its front board. The spine is a face of its
 * own, turned 90° back from the board's left edge and printed with `spine`
 * (a CSS background); the board carries a hinge crease and a sheen. Sized by
 * height — the face sets the width from its own proportions.
 */
function BookBinding({ face, spine, style }: { face: ReactNode; spine: string; style?: CSSProperties }) {
  return (
    <span className="relative block h-full [perspective:800px]" style={style}>
      {/* The book's shadow on the stage, cast down and to the right. */}
      <span className="absolute -bottom-[4%] left-[6%] h-[7%] w-full rounded-[50%] bg-black/40 blur-[6px]" />
      <span
        className={cn(
          'relative block h-full [transform-style:preserve-3d] [transform:rotateY(30deg)]',
          'transition-transform duration-500 ease-out motion-safe:group-hover:[transform:rotateY(18deg)]',
        )}
      >
        <span
          className="absolute inset-y-0 right-full w-[11%] origin-right rounded-l-[2px] [transform:rotateY(-90deg)]"
          style={{ background: spine }}
        />
        <span className="relative block h-full overflow-hidden rounded-r-[3px] rounded-l-[1px] shadow-[6px_8px_14px_-6px_rgba(0,0,0,0.5)]">
          {face}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.32) 0%, rgba(255,255,255,0.28) 2.2%, rgba(0,0,0,0.12) 4.5%, transparent 9%),' +
                'linear-gradient(118deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 30%, transparent 46%),' +
                'linear-gradient(0deg, rgba(0,0,0,0.12), transparent 30%)',
            }}
          />
        </span>
      </span>
    </span>
  )
}

/**
 * How tall a book stands: most of the stage's height, but never so tall that
 * its width — about four-fifths of its height, and the spine besides — runs
 * past the stage's sides on a narrow card.
 */
const BOOK_HEIGHT = 'block h-[min(84cqh,88cqw)] max-h-40'

/** The darkening the spine's print gets — it faces away from the light. */
const SPINE_SHADE = 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.38))'

/** A seller's flat cover, bound into a book. */
export function BoundCover({ src }: { src: string }) {
  return (
    <span className={BOOK_HEIGHT}>
      <BookBinding
        face={<img src={src} alt="" loading="lazy" decoding="async" className="block h-full w-auto max-w-none" />}
        // The spine is printed with the cover's own left edge, as a wraparound jacket is.
        spine={`${SPINE_SHADE}, url("${src}") left center / auto 100% no-repeat, #1f2937`}
      />
    </span>
  )
}

/** A picture of the thing itself, standing on the stage. */
export function ProductPhoto({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="block h-auto max-h-[82%] w-auto max-w-[84%] object-contain [filter:drop-shadow(0_6px_8px_rgba(0,0,0,0.3))_drop-shadow(0_1px_1px_rgba(0,0,0,0.2))]"
    />
  )
}

const SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", serif'
const SANS = 'ui-sans-serif, system-ui, sans-serif'

/**
 * A product with no picture of its own, as a book whose cover the Store
 * printed: the exam's accent, the seller across the top, the product's title,
 * and the exam's monogram over what kind of thing it is.
 */
export function MockupBook({ title, by, label, examKey }: { title: string; by?: string; label?: string; examKey?: string }) {
  const { size, lines } = coverTitle(title)
  const monogram = examKey ? examMonogramLines(examKey) : []
  const light = useId()
  // Letter-spaced capitals run about three-quarters of their size each; a long name is set smaller to fit.
  const bySize = by ? Math.min(6.4, COVER_TITLE_WIDTH / (by.length * 0.78)) : 0
  return (
    <span className={BOOK_HEIGHT} style={artAccentStyle(examKey)}>
      <BookBinding
        spine={`${SPINE_SHADE}, var(--exam-accent-vivid)`}
        face={
          <svg viewBox="0 0 120 160" className="block h-full w-auto" style={{ aspectRatio: '3 / 4' }} role="presentation">
            <defs>
              <linearGradient id={light} x1="0" y1="0" x2="0.35" y2="1">
                <stop offset="0" stopColor="white" stopOpacity={0.16} />
                <stop offset="0.55" stopColor="white" stopOpacity={0} />
                <stop offset="1" stopColor="black" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <rect width={120} height={160} style={{ fill: 'var(--exam-accent-vivid)' }} />
            <rect width={120} height={160} fill={`url(#${light})`} />
            {/* A designer's touch: rings rising from the bottom-right corner. */}
            <g fill="none" stroke="white" strokeOpacity={0.09}>
              {[30, 46, 62, 78].map(r => (
                <circle key={r} cx={120} cy={160} r={r} strokeWidth={r === 30 ? 9 : 1.4} />
              ))}
            </g>
            {by && (
              <text x={13} y={19} fill="white" fillOpacity={0.82} fontSize={bySize} fontWeight={700} letterSpacing="0.14em" fontFamily={SANS}>
                {by.toUpperCase()}
              </text>
            )}
            <rect x={13} y={25} width={22} height={1.6} rx={0.8} fill="white" opacity={0.7} />
            <text x={13} y={42 + size * 0.8} fill="white" fontSize={size} fontWeight={700} fontFamily={SERIF} letterSpacing="-0.01em">
              {lines.map((line, i) => (
                <tspan key={i} x={13} dy={i === 0 ? 0 : size * 1.16}>{line}</tspan>
              ))}
            </text>
            {monogram.length > 0 && (
              <g>
                <rect x={13} y={124} width={24} height={24} rx={5} fill="white" />
                <text
                  x={25}
                  y={monogram.length > 1 ? 134 : 140.5}
                  textAnchor="middle"
                  style={{ fill: 'var(--exam-accent-vivid)' }}
                  fontSize={monogram.length > 1 || monogram[0]!.length > 2 ? 8 : 12}
                  fontWeight={800}
                  fontFamily={SANS}
                >
                  {monogram.map((line, i) => (
                    <tspan key={i} x={25} dy={i === 0 ? 0 : 8}>{line}</tspan>
                  ))}
                </text>
              </g>
            )}
            {label && (
              <text x={monogram.length ? 43 : 13} y={139} fill="white" fillOpacity={0.85} fontSize={6.2} fontWeight={700} letterSpacing="0.12em" fontFamily={SANS}>
                {label.toUpperCase()}
              </text>
            )}
          </svg>
        }
      />
    </span>
  )
}

/** The picture for a study material: the seller's own, or the Store's book. */
export function StudyArt({ product, examKey }: { product: StudyProduct; examKey?: string }) {
  const { image } = product
  if (image?.shape === 'cover') return <BoundCover src={image.src} />
  if (image) return <ProductPhoto src={image.src} />
  return (
    <MockupBook
      title={product.name}
      by={STORE_SELLERS[product.offer.sellerId]?.name}
      label={STUDY_KIND_LABEL[product.kind]}
      examKey={examKey}
    />
  )
}

/** A textbook: its cover from the vault, bound — or the Store's book with its title. */
export function TextbookArt({ book, examKey }: { book: StoreBook; examKey?: string }) {
  if (book.coverImage) return <BoundCover src={book.coverImage} />
  return <MockupBook title={book.title} by={book.publisher} label={book.type} examKey={examKey} />
}

/** A calculator: the maker's photograph, or the drawing where there is none. */
export function CalculatorPicture({ calculator }: { calculator: CalculatorProduct }) {
  return calculator.image ? <ProductPhoto src={calculator.image.src} /> : <CalculatorArt look={calculator.look} />
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
function CalculatorArt({ look }: { look: CalculatorLook }) {
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
