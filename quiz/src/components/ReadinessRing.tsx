import { useMemo } from 'react'
import { masteryFill } from '@/lib/masteryFill'
import {
  RING_CX,
  RING_CY,
  RING_INNER_R,
  RING_OUTER_R,
  RING_VIEWBOX,
  ringArcPath,
  type RingSegment,
} from '@/lib/readinessRing'

/**
 * The readiness ring at badge size — the Dashboard's Study Guide radial with
 * every piece of chrome stripped off: no legend, no section labels, no hover
 * readout, just the concept arcs and the score in the middle.
 *
 * It is the same shape from the same maths (`lib/readinessRing.ts`), so the
 * ring on an exam page's readiness card and the one on the Dashboard read as
 * one object seen at two sizes. At ~48px the individual arcs are below the
 * width of a hairline, which is the point: what survives the shrink is the
 * *proportion* of the ring that has any colour in it, and the gold of the
 * keystones.
 */
export function ReadinessRing({
  segments,
  pct,
  size = 48,
  className,
}: {
  segments: RingSegment[]
  pct: number
  size?: number
  className?: string
}) {
  const paths = useMemo(
    () => segments.map(seg => ({
      d: ringArcPath(seg.startDeg, seg.endDeg, RING_OUTER_R, RING_INNER_R),
      fill: masteryFill(seg.state, seg.keystone),
    })),
    [segments],
  )

  return (
    <svg
      viewBox={`0 0 ${RING_VIEWBOX} ${RING_VIEWBOX}`}
      width={size}
      height={size}
      className={`block shrink-0 ${className ?? ''}`}
      aria-hidden="true"
    >
      {/* The unfilled track, so a ring with nothing learned still reads as a ring. */}
      <circle
        cx={RING_CX} cy={RING_CY}
        r={(RING_OUTER_R + RING_INNER_R) / 2}
        fill="none"
        strokeWidth={RING_OUTER_R - RING_INNER_R}
        stroke="rgba(34,197,94,0.06)"
      />
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} />
      ))}
      {/* Sized off the viewBox, not the rendered pixels: the whole ring scales
          with `size`, and the number has to stay legible at the small end. */}
      <text
        x={RING_CX} y={RING_CY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={72}
        fontWeight={800}
        fill="currentColor"
        className="tabular-nums"
      >
        {Math.round(Math.max(0, Math.min(100, pct)))}
      </text>
    </svg>
  )
}
