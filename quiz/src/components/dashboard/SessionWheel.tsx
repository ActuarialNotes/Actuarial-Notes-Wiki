import { useMemo } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import {
  RING_CX,
  RING_CY,
  RING_INNER_R,
  RING_OUTER_R,
  RING_VIEWBOX,
  ringArcPath,
  ringPins,
  ringPolar,
  ringTopicGroups,
  type RingSegment,
} from '@/lib/readinessRing'
import { masteryFill } from '@/lib/masteryFill'

/** The pin badge's radius, in ring units. */
const BADGE_R = 11

/**
 * The Study Guide wheel at the head of **Today's session**: one arc per
 * syllabus concept, filled by its level (`lib/readinessRing.ts`), with the
 * readiness score in the middle — and a numbered pin on each concept the
 * session asks for, the number being its step in the list below
 * (`sessionPins` in `lib/todaySession.ts`). The pinned arcs are outlined, so
 * where today's work sits in the syllabus reads at a glance.
 *
 * The whole wheel is one button: it opens the Study Guide popup, where every
 * arc can be read.
 */
export function SessionWheel({
  segments,
  pins,
  pct,
  moveToday,
  flash,
  onOpen,
}: {
  segments: RingSegment[]
  /** Pin number per concept, keyed by lower-cased name. */
  pins: ReadonlyMap<string, number>
  /** The readiness score, rounded. */
  pct: number
  /** Points the score moved today — an arrow beside it when non-zero. */
  moveToday: number
  flash?: boolean
  onOpen: () => void
}) {
  const placed = useMemo(() => ringPins(segments, pins), [segments, pins])
  const groups = useMemo(() => ringTopicGroups(segments), [segments])
  // The pinned arcs, one per concept — the same first arc its pin sits on.
  const pinned = useMemo(
    () => placed.map(p => segments.find(s => s.conceptName === p.conceptName)!),
    [placed, segments],
  )
  // Grow the drawing just enough to hold the outermost badge.
  const reach = Math.max(RING_OUTER_R + 6, ...placed.map(p => p.r + BADGE_R + 3))
  const pad = Math.max(0, Math.ceil(reach - RING_VIEWBOX / 2))
  const size = RING_VIEWBOX + 2 * pad

  const label = `Exam readiness ${pct}%${pinned.length > 0 ? `, today's ${pinned.length} concept${pinned.length === 1 ? '' : 's'} pinned` : ''} — open the study guide`

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={label}
      className="relative mx-auto block w-full max-w-[290px] rounded-full transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <svg
        viewBox={`${-pad} ${-pad} ${size} ${size}`}
        className="block h-auto w-full"
        aria-hidden="true"
        style={{
          filter: flash ? 'drop-shadow(0 0 10px rgba(34,197,94,0.55))' : 'none',
          transition: 'filter 0.5s ease-out',
        }}
      >
        <circle
          cx={RING_CX} cy={RING_CY}
          r={(RING_OUTER_R + RING_INNER_R) / 2}
          fill="none"
          strokeWidth={RING_OUTER_R - RING_INNER_R}
          stroke="rgba(34,197,94,0.06)"
        />
        {segments.map((seg, i) => (
          <path key={i} d={ringArcPath(seg.startDeg, seg.endDeg, RING_OUTER_R, RING_INNER_R)} fill={masteryFill(seg.state)} />
        ))}
        {groups.map((g, i) => {
          const a = ringPolar(g.boundaryDeg, RING_INNER_R - 5)
          const b = ringPolar(g.boundaryDeg, RING_OUTER_R + 5)
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth={1} opacity={0.25} />
        })}
        {/* Today's concepts: the arc outlined, a tick out to its badge. */}
        {pinned.map((seg, i) => (
          <path
            key={`p${i}`}
            d={ringArcPath(seg.startDeg, seg.endDeg, RING_OUTER_R, RING_INNER_R)}
            fill="currentColor"
            fillOpacity={0.22}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        ))}
        {placed.map(p => {
          const from = ringPolar(p.angleDeg, RING_OUTER_R + 1)
          const to = ringPolar(p.angleDeg, p.r - BADGE_R)
          return (
            <g key={p.conceptName}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="currentColor" strokeWidth={1.5} opacity={0.8} />
              <circle cx={p.x} cy={p.y} r={BADGE_R} className="fill-foreground" />
              <text
                x={p.x} y={p.y + 4.3} textAnchor="middle" fontSize={12.5} fontWeight={800}
                className="fill-background"
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>
      <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="flex items-center gap-1">
          <span
            className="text-4xl font-extrabold leading-none tracking-tight tabular-nums transition-colors sm:text-5xl"
            style={flash ? { color: '#22c55e' } : undefined}
          >
            {pct}%
          </span>
          {moveToday !== 0 && (
            <span
              className={`flex items-center text-sm font-semibold tabular-nums ${moveToday > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              title={`Readiness ${moveToday > 0 ? 'up' : 'down'} ${Math.abs(moveToday)} today`}
            >
              {moveToday > 0 ? <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />}
              {Math.abs(moveToday)}
            </span>
          )}
        </span>
        <span className="mt-1 text-sm text-muted-foreground">ready</span>
      </span>
    </button>
  )
}
