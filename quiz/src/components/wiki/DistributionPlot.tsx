/**
 * The SVG canvas of a distribution simulator: the theoretical curve (or mass
 * stems), the histogram of whatever variates have been simulated, mean/σ
 * markers, and a hover readout.
 *
 * Colour follows the style guide — the theoretical shape is the one thing that
 * gets `--primary`, the empirical bars are muted, and axes are hairlines at low
 * opacity, so the plot reads the same in every theme and in dark mode.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import type { DistParams, DistributionSpec } from '@/lib/distributions'
import {
  binSamples,
  buildContinuousCurve,
  buildMassPoints,
  empiricalCdf,
  formatStat,
  formatTick,
  niceTicks,
  tallySamples,
  type Histogram,
} from '@/lib/distributionPlot'

const VB_W = 520
const PAD_RIGHT = 12
const PAD_TOP = 14
const CONTINUOUS_BINS = 36
/** Below this rendered width the axis title is dropped — the labels need the room. */
const Y_LABEL_MIN_WIDTH = 520
/**
 * Axis type size in **CSS pixels**. The SVG scales its viewBox to the container,
 * so a fixed `fontSize` would shrink to ~7px on a phone; the rendered width is
 * measured and the font size converted back into viewBox units, keeping labels
 * the same physical size on every screen.
 */
const AXIS_FONT_PX = 13

export interface DistributionPlotProps {
  spec: DistributionSpec
  params: DistParams
  view: 'pdf' | 'cdf'
  samples: number[]
  /** viewBox height; the SVG itself always scales to its container width. */
  height?: number
}

export function DistributionPlot({ spec, params, view, samples, height = 250 }: DistributionPlotProps) {
  const [cursorX, setCursorX] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [renderedWidth, setRenderedWidth] = useState(VB_W)

  // Track the on-screen width so axis type can be sized in real pixels.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width
      if (width && width > 0) setRenderedWidth(width)
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  const axisFont = Math.min(24, Math.max(11, (AXIS_FONT_PX * VB_W) / renderedWidth))
  const showYLabel = renderedWidth >= Y_LABEL_MIN_WIDTH
  const discrete = spec.kind === 'discrete'

  const data = useMemo(() => {
    const [rangeLo, rangeHi] = spec.range(params)
    const curve = discrete ? [] : buildContinuousCurve(spec, params, view)
    const mass = discrete ? buildMassPoints(spec, params) : []
    // Discrete bars are centred on integers, so the axis runs half a step wider.
    const xLo = discrete ? rangeLo - 0.5 : rangeLo
    const xHi = discrete ? rangeHi + 0.5 : rangeHi
    const histogram: Histogram | null =
      samples.length === 0
        ? null
        : discrete
        ? tallySamples(samples, rangeLo, rangeHi)
        : binSamples(samples, rangeLo, rangeHi, CONTINUOUS_BINS)
    const empirical = histogram && view === 'cdf' ? empiricalCdf(histogram) : null

    let yMax: number
    if (view === 'cdf') {
      yMax = 1
    } else {
      const theoreticalMax = discrete
        ? Math.max(...mass.map(m => m.mass), 1e-9)
        : Math.max(...curve.map(pt => pt.y), 1e-9)
      const empiricalMax = histogram ? Math.max(0, ...histogram.bins.map(b => b.density)) : 0
      yMax = Math.max(theoreticalMax, empiricalMax) * 1.12
    }

    return { rangeLo, rangeHi, xLo, xHi, curve, mass, histogram, empirical, yMax }
  }, [spec, params, view, samples, discrete])

  const { xLo, xHi, curve, mass, histogram, empirical, yMax } = data
  const xSpan = xHi - xLo || 1

  const yTicks = niceTicks(0, yMax, 3).filter(t => t <= yMax)
  const xTicks = niceTicks(xLo, xHi, 5).filter(t => (discrete ? Number.isInteger(t) : true))

  // Gutters scale with the (pixel-constant) type: at phone width one glyph eats
  // ~3× the viewBox units it does on a desktop, so fixed padding would let the
  // tick labels run into the axis title or off the left edge.
  const widestYLabel = Math.max(...yTicks.map(t => formatTick(t).length), 1)
  const padLeft = Math.min(
    150,
    Math.round(axisFont * 0.58 * widestYLabel + axisFont * (showYLabel ? 1.9 : 0.7)),
  )
  const padBottom = Math.round(axisFont * 2.5)
  const chartW = VB_W - padLeft - PAD_RIGHT
  const chartH = height - PAD_TOP - padBottom

  function sx(x: number): number {
    return padLeft + ((x - xLo) / xSpan) * chartW
  }
  function sy(y: number): number {
    return PAD_TOP + chartH - (Math.min(y, yMax) / yMax) * chartH
  }

  const moments = spec.moments(params)
  const meanInWindow = moments.mean >= xLo && moments.mean <= xHi

  // ─── Hover readout ─────────────────────────────────────────────────────────
  const hovered = useMemo(() => {
    if (cursorX === null) return null
    const x = xLo + ((cursorX - padLeft) / chartW) * xSpan
    if (x < xLo || x > xHi) return null
    if (discrete) {
      const k = Math.round(x)
      return { x: k, density: spec.density(k, params), cumulative: spec.cdf(k, params) }
    }
    return { x, density: spec.density(x, params), cumulative: spec.cdf(x, params) }
  }, [cursorX, xLo, xHi, xSpan, chartW, padLeft, discrete, spec, params])

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorX(((e.clientX - rect.left) / rect.width) * VB_W)
  }

  const areaPath =
    curve.length > 0
      ? `M ${sx(curve[0].x)} ${sy(0)} ` +
        curve.map(pt => `L ${sx(pt.x)} ${sy(pt.y)}`).join(' ') +
        ` L ${sx(curve[curve.length - 1].x)} ${sy(0)} Z`
      : ''
  const linePath =
    curve.length > 0 ? `M ${curve.map(pt => `${sx(pt.x)} ${sy(pt.y)}`).join(' L ')}` : ''

  /**
   * Right-continuous staircase: the CDF holds its value until the next jump.
   * `jumps` are the x positions where the value changes to `values[i]`;
   * `startY` is the level carried in from the left of the window.
   */
  function stepPath(jumps: number[], values: number[], startY: number): string {
    let d = `M ${sx(xLo)} ${sy(startY)}`
    let previous = startY
    jumps.forEach((x, i) => {
      d += ` L ${sx(x)} ${sy(previous)} L ${sx(x)} ${sy(values[i])}`
      previous = values[i]
    })
    return `${d} L ${sx(xHi)} ${sy(previous)}`
  }

  const discreteCdfPath =
    discrete && view === 'cdf'
      ? stepPath(
          mass.map(pt => pt.k),
          mass.map(pt => pt.cumulative),
          mass.length > 0 ? Math.max(0, mass[0].cumulative - mass[0].mass) : 0,
        )
      : ''

  const empiricalPath =
    histogram && empirical && view === 'cdf'
      ? discrete
        ? stepPath(histogram.bins.map(b => b.center), empirical, histogram.below / histogram.n)
        : `M ${sx(xLo)} ${sy(histogram.below / histogram.n)} ` +
          histogram.bins.map((bin, i) => `L ${sx(bin.hi)} ${sy(empirical[i])}`).join(' ')
      : ''

  const label = `${spec.title}: ${view === 'pdf' ? spec.yLabel : 'P(X ≤ ' + spec.xLabel + ')'} for ${spec.notation(params)}`

  return (
    <div className="space-y-1">
      {/* Fixed-height readout strip so the plot never jumps as the cursor moves. */}
      <div className="flex items-center justify-between gap-2 h-5 text-sm text-muted-foreground tabular-nums">
        <span>
          {hovered ? (
            <>
              <span className="text-foreground font-medium">
                {spec.xLabel.split(' ')[0]} = {formatStat(hovered.x, { integer: discrete })}
              </span>
              {'  ·  '}
              {discrete ? 'P(X = k)' : 'f(x)'} = {formatStat(hovered.density)}
              {'  ·  '}
              P(X ≤ {discrete ? 'k' : 'x'}) = {formatStat(hovered.cumulative)}
            </>
          ) : (
            <span className="opacity-70">{spec.support}</span>
          )}
        </span>
        {histogram && histogram.n > 0 && (
          <span className="shrink-0">{histogram.n.toLocaleString()} draws</span>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="w-full text-muted-foreground touch-pan-y"
        role="img"
        aria-label={label}
        // Hover on a mouse; press-and-drag on touch. `touch-pan-y` keeps the
        // page scrollable while a horizontal drag scrubs the readout.
        onPointerDown={handleMove}
        onPointerMove={handleMove}
        onPointerUp={() => setCursorX(null)}
        onPointerLeave={() => setCursorX(null)}
      >
        {/* Y grid + labels */}
        {yTicks.map(t => (
          <g key={`y${t}`}>
            <line
              x1={padLeft}
              x2={padLeft + chartW}
              y1={sy(t)}
              y2={sy(t)}
              stroke="currentColor"
              strokeOpacity={0.12}
              strokeDasharray={t === 0 ? undefined : '3 3'}
            />
            <text x={padLeft - axisFont * 0.45} y={sy(t) + axisFont * 0.35} textAnchor="end" fontSize={axisFont} fill="currentColor" opacity={0.6}>
              {formatTick(t)}
            </text>
          </g>
        ))}

        {/* X ticks */}
        {xTicks.map(t => {
          // Keep the first and last labels from spilling into the y-axis
          // gutter / off the right edge by anchoring them inward.
          const x = sx(t)
          const halfWidth = formatTick(t).length * axisFont * 0.3
          const anchor =
            x - halfWidth < padLeft ? 'start' : x + halfWidth > VB_W - PAD_RIGHT ? 'end' : 'middle'
          return (
            <text
              key={`x${t}`}
              x={x}
              y={height - padBottom + axisFont * 1.1}
              textAnchor={anchor}
              fontSize={axisFont}
              fill="currentColor"
              opacity={0.6}
            >
              {formatTick(t)}
            </text>
          )
        })}
        <text x={padLeft + chartW} y={height - 3} textAnchor="end" fontSize={axisFont} fill="currentColor" opacity={0.5}>
          {spec.xLabel}
        </text>
        {/* The y-axis title is the first thing to go when the plot is narrow —
            the readout strip above already names what's plotted. */}
        {showYLabel && (
          <text
            transform={`rotate(-90 ${axisFont * 0.8} ${PAD_TOP + chartH / 2})`}
            x={axisFont * 0.8}
            y={PAD_TOP + chartH / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={axisFont}
            fill="currentColor"
            opacity={0.5}
          >
            {view === 'pdf' ? spec.yLabel : `P(X ≤ ${discrete ? 'k' : 'x'})`}
          </text>
        )}

        {/* ±1σ band around the mean — the visual anchor for the two headline stats */}
        {view === 'pdf' && meanInWindow && moments.sd > 0 && (
          <rect
            x={sx(Math.max(xLo, moments.mean - moments.sd))}
            width={Math.max(
              0,
              sx(Math.min(xHi, moments.mean + moments.sd)) - sx(Math.max(xLo, moments.mean - moments.sd)),
            )}
            y={PAD_TOP}
            height={chartH}
            className="fill-primary"
            opacity={0.06}
          />
        )}

        {/* Simulated draws */}
        {histogram && view === 'pdf' &&
          histogram.bins.map((bin, i) =>
            bin.count === 0 ? null : (
              <rect
                key={`h${i}`}
                x={sx(bin.lo) + (discrete ? 1.5 : 0.25)}
                width={Math.max(1, sx(bin.hi) - sx(bin.lo) - (discrete ? 3 : 0.5))}
                y={sy(bin.density)}
                height={Math.max(0, sy(0) - sy(bin.density))}
                fill="currentColor"
                opacity={0.28}
              />
            ),
          )}
        {empiricalPath && (
          <path d={empiricalPath} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.4} />
        )}

        {/* Theoretical shape */}
        {!discrete && view === 'pdf' && <path d={areaPath} className="fill-primary" opacity={0.1} />}
        {!discrete && <path d={linePath} fill="none" className="stroke-primary" strokeWidth={2} strokeLinejoin="round" />}
        {/* Discrete: stems for the mass, a staircase for the CDF */}
        {discrete && view === 'pdf' &&
          mass.map(pt => (
            <g key={`m${pt.k}`}>
              <line
                x1={sx(pt.k)}
                x2={sx(pt.k)}
                y1={sy(0)}
                y2={sy(pt.mass)}
                className="stroke-primary"
                strokeWidth={Math.max(1, Math.min(6, (chartW / Math.max(mass.length, 1)) * 0.28))}
                opacity={0.55}
              />
              {mass.length <= 45 && <circle cx={sx(pt.k)} cy={sy(pt.mass)} r={2.4} className="fill-primary" />}
            </g>
          ))}
        {discreteCdfPath && (
          <path
            d={discreteCdfPath}
            fill="none"
            className="stroke-primary"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}

        {/* Mean marker */}
        {meanInWindow && (
          <g>
            <line
              x1={sx(moments.mean)}
              x2={sx(moments.mean)}
              y1={PAD_TOP}
              y2={PAD_TOP + chartH}
              className="stroke-primary"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              opacity={0.7}
            />
            <text
              x={sx(moments.mean) + 5}
              y={PAD_TOP + 12}
              fontSize={axisFont}
              className="fill-primary"
              opacity={0.85}
            >
              E[X]
            </text>
          </g>
        )}

        {/* Hover crosshair */}
        {hovered && (
          <line
            x1={sx(hovered.x)}
            x2={sx(hovered.x)}
            y1={PAD_TOP}
            y2={PAD_TOP + chartH}
            stroke="currentColor"
            strokeOpacity={0.35}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        )}

        {/* Baseline */}
        <line
          x1={padLeft}
          x2={padLeft + chartW}
          y1={sy(0)}
          y2={sy(0)}
          stroke="currentColor"
          strokeOpacity={0.35}
        />
      </svg>
    </div>
  )
}
