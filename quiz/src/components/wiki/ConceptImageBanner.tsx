import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import {
  defaultParams,
  distributionForImage,
  type DistributionSpec,
} from '@/lib/distributions'
import { buildContinuousCurve, buildMassPoints } from '@/lib/distributionPlot'

/**
 * A concept's figure, shown at the top of the concept popup.
 *
 * This replaces the rainbow "gallery" icon that used to sit in the popup
 * header: a picture a concept page ships with is content, not a tool, so it
 * leads the page instead of hiding behind chrome. Tapping it still opens
 * `ImageGalleryModal` — the full-screen pan/zoom view is unchanged, this is
 * only a new way in.
 *
 * Only the first figure is shown; a concept with several gets Previous/Next
 * beneath it rather than a stack that pushes the definition off-screen.
 *
 * A figure the vault draws as a distribution illustration is not shown as a
 * picture at all. Those embeds are static snapshots that the app renders as a
 * live simulator (see `docs/distribution-simulators.md`), so the banner shows
 * a **card** — a preview of the shape plus the distribution's name — that opens
 * the simulator in the same full-screen modal. That card wears the same
 * travelling rainbow foil edge as a collected flashcard (`.simulator-foil-ring`
 * in index.css): both mark a surface with something live behind it.
 */

export interface BannerImage {
  src: string
  alt: string
  caption: string
}

interface ConceptImageBannerProps {
  images: BannerImage[]
  /** Open the gallery at this index into the *original* `images` array. */
  onOpen: (index: number) => void
  className?: string
}

// The preview sparkline's viewBox. Wide and short — it is a hint at the
// distribution's shape, not a readable plot (the simulator behind the card
// draws the real one, axes and all).
const VB_W = 120
const VB_H = 44
const PAD = 3

/** Map a curve/stem series into the preview's viewBox. */
function scaler(xs: number[], ys: number[]) {
  const xLo = Math.min(...xs)
  const xHi = Math.max(...xs)
  const yHi = Math.max(...ys, Number.MIN_VALUE)
  const xSpan = xHi - xLo || 1
  return {
    sx: (x: number) => PAD + ((x - xLo) / xSpan) * (VB_W - 2 * PAD),
    sy: (y: number) => VB_H - PAD - (y / yHi) * (VB_H - 2 * PAD),
  }
}

function DistributionPreview({ spec }: { spec: DistributionSpec }) {
  const shape = useMemo(() => {
    const params = defaultParams(spec)
    if (spec.kind === 'discrete') {
      const points = buildMassPoints(spec, params)
      const { sx, sy } = scaler(points.map(p => p.k), points.map(p => p.mass))
      return {
        kind: 'stems' as const,
        stems: points.map(p => ({ x: sx(p.k), y: sy(p.mass) })),
      }
    }
    const points = buildContinuousCurve(spec, params, 'pdf', 72)
    const { sx, sy } = scaler(points.map(p => p.x), points.map(p => p.y))
    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x).toFixed(2)},${sy(p.y).toFixed(2)}`).join(' ')
    const base = VB_H - PAD
    return {
      kind: 'curve' as const,
      line,
      area: `${line} L${sx(points[points.length - 1].x).toFixed(2)},${base} L${sx(points[0].x).toFixed(2)},${base} Z`,
    }
  }, [spec])

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-11 w-24 shrink-0 text-primary"
      role="presentation"
      aria-hidden
    >
      {shape.kind === 'curve' ? (
        <>
          <path d={shape.area} fill="currentColor" opacity={0.16} />
          <path d={shape.line} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
        </>
      ) : (
        shape.stems.map((s, i) => (
          <line
            key={i}
            x1={s.x}
            x2={s.x}
            y1={s.y}
            y2={VB_H - PAD}
            stroke="currentColor"
            strokeWidth={Math.max(1.2, (VB_W - 2 * PAD) / (shape.stems.length * 2.2))}
            strokeLinecap="round"
            opacity={0.75}
          />
        ))
      )}
    </svg>
  )
}

export function ConceptImageBanner({ images, onOpen, className }: ConceptImageBannerProps) {
  const [index, setIndex] = useState(0)
  // A figure whose file 404s is dropped rather than left as a broken frame the
  // Previous/Next counter still counts.
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set())

  // New concept — back to its first figure, and give every one another chance
  // to load. `images` is fresh state per fetch in ConceptPopup, so identity is
  // a fine signal here.
  useEffect(() => {
    setIndex(0)
    setFailed(new Set())
  }, [images])

  const usable = images.filter(img => !failed.has(img.src))
  if (usable.length === 0) return null

  const safe = Math.min(index, usable.length - 1)
  const current = usable[safe]
  const distribution = distributionForImage(current.src)
  const open = () => onOpen(images.indexOf(current))

  // The popup this sits in is itself `bg-card`, so the card *shadow* has
  // nothing to lift off — an inset region on a card takes the hairline instead
  // (docs/style-guide.md §6.2: borders and shadows are alternatives). The
  // simulator card supplies its own edge (the foil ring), so the hairline is
  // kept out of the shared base.
  const cardClass =
    'group block w-full rounded-lg text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className={`not-prose mb-4${className ? ` ${className}` : ''}`}>
      {distribution ? (
        <button
          type="button"
          onClick={open}
          data-sound="open"
          // No `border` here: `.simulator-foil-ring` paints the travelling
          // rainbow edge the collected flashcards use, and a hairline underneath
          // it would read as a second, static border (see index.css).
          className={`${cardClass} simulator-foil-ring flex items-center gap-3 p-3`}
          aria-label={`Open the ${distribution.title} simulator`}
        >
          <DistributionPreview spec={distribution} />
          {/* The distribution's name is the whole label — the preview shape and
              the sliders icon already say "live simulator", so naming the knobs
              in a sub-line only crowded the card. */}
          <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm font-semibold leading-snug tracking-tight">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span className="min-w-0 truncate">{distribution.title}</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={open}
          data-sound="open"
          className={`${cardClass} overflow-hidden border border-border p-2`}
          aria-label={`View ${current.alt || 'figure'} full screen`}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            // Concept figures are portrait (see docs/concept-figures.md), so a
            // landscape-era height cap would shrink them to an unreadable column.
            className="mx-auto max-h-80 w-full object-contain"
            onError={() => setFailed(prev => new Set(prev).add(current.src))}
          />
        </button>
      )}

      {current.caption && (
        <p className="mt-1.5 text-center text-xs italic text-muted-foreground">{current.caption}</p>
      )}

      {usable.length > 1 && (
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            data-sound="page"
            onClick={() => setIndex(safe - 1)}
            disabled={safe === 0}
            className="rounded-full bg-muted/40 p-1.5 text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-muted/40"
            aria-label="Previous figure"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {safe + 1} / {usable.length}
          </span>
          <button
            type="button"
            data-sound="page"
            onClick={() => setIndex(safe + 1)}
            disabled={safe === usable.length - 1}
            className="rounded-full bg-muted/40 p-1.5 text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-muted/40"
            aria-label="Next figure"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
