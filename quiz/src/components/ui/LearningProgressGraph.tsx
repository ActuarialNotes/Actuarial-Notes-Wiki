// Shared SVG step-function graph for concept learning history.
// Used by LearningProgressModal and ConceptCoverageSection.

import { useRef, useState } from 'react'
import type { LevelEvent } from '@/lib/learningHistory'
import type { AttemptDot } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'

// ─── Constants ────────────────────────────────────────────────────────────────

export const VB_W = 500
export const VB_H = 240
export const PAD_LEFT = 42
export const PAD_RIGHT = 16
export const PAD_TOP = 16
export const PAD_BOTTOM = 36
export const CHART_W = VB_W - PAD_LEFT - PAD_RIGHT
export const CHART_H = VB_H - PAD_TOP - PAD_BOTTOM

export const Y_LEVELS: MasteryState[] = ['forgotten', 'new', 'level1', 'level2', 'level3']
export const Y_LABELS = ['Forgotten', 'New', '1', '2', '3']

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function stateToYIndex(state: MasteryState): number {
  switch (state) {
    case 'level3':    return 4
    case 'level2':    return 3
    case 'level1':    return 2
    case 'new':       return 1
    case 'forgotten': return 0
  }
}

export function makeScales(levelEvents: LevelEvent[], attemptDots: AttemptDot[]) {
  const allTimes = [
    ...levelEvents.map(e => e.at.getTime()),
    ...attemptDots.map(d => d.at.getTime()),
  ]
  const now = Date.now()
  const tMin = allTimes.length > 0 ? Math.min(...allTimes) - 12 * 3600_000 : now - 7 * 86400_000
  // Guard against a zero (or inverted) span so xScale can never divide by zero
  // and emit NaN coordinates into the SVG path.
  const tMax = Math.max(now + 12 * 3600_000, tMin + 86400_000)
  const tSpan = tMax - tMin

  function xScale(t: Date): number {
    return PAD_LEFT + ((t.getTime() - tMin) / tSpan) * CHART_W
  }

  function xInverse(px: number, svgWidth: number): Date {
    const scaledX = (px / svgWidth) * VB_W
    const ratio = (scaledX - PAD_LEFT) / CHART_W
    return new Date(tMin + ratio * tSpan)
  }

  function yScale(yIndex: number): number {
    return PAD_TOP + CHART_H - (yIndex / 4) * CHART_H
  }

  function buildXLabels(): { label: string; x: number }[] {
    const steps = 4
    const labels: { label: string; x: number }[] = []
    for (let i = 0; i <= steps; i++) {
      const t = new Date(tMin + (i / steps) * (tMax - tMin))
      const x = xScale(t)
      if (x < PAD_LEFT + 10 || x > PAD_LEFT + CHART_W - 10) continue
      labels.push({
        label: t.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        x,
      })
    }
    return labels
  }

  function buildStepPath(): string {
    const initialState = levelEvents[0]?.from ?? 'new'
    const startY = yScale(stateToYIndex(initialState))
    const startX = xScale(new Date(tMin))
    if (levelEvents.length === 0) {
      return `M ${startX} ${startY} H ${xScale(new Date(tMax))}`
    }
    let d = `M ${startX} ${startY}`
    for (const ev of levelEvents) {
      const x = xScale(ev.at)
      d += ` H ${x} V ${yScale(stateToYIndex(ev.to))}`
    }
    d += ` H ${xScale(new Date(tMax))}`
    return d
  }

  return { xScale, xInverse, yScale, buildXLabels, buildStepPath, tMin, tMax }
}

export function levelAtTime(time: Date, levelEvents: LevelEvent[]): MasteryState {
  let state: MasteryState = levelEvents[0]?.from ?? 'new'
  for (const ev of levelEvents) {
    if (ev.at <= time) state = ev.to
    else break
  }
  return state
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface GraphProps {
  levelEvents: LevelEvent[]
  attemptDots: AttemptDot[]
  onHoverLevel: (level: MasteryState | null) => void
}

export function ProgressGraph({ levelEvents, attemptDots, onHoverLevel }: GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursorX, setCursorX] = useState<number | null>(null)
  const { xScale, xInverse, yScale, buildXLabels, buildStepPath } = makeScales(levelEvents, attemptDots)

  function getHoveredLevel(clientX: number): MasteryState {
    const rect = svgRef.current!.getBoundingClientRect()
    const time = xInverse(clientX - rect.left, rect.width)
    return levelAtTime(time, levelEvents)
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current!.getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * VB_W
    setCursorX(svgX)
    onHoverLevel(getHoveredLevel(e.clientX))
  }

  function handleMouseLeave() {
    setCursorX(null)
    onHoverLevel(null)
  }

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    onHoverLevel(getHoveredLevel(e.clientX))
  }

  const xLabels = buildXLabels()
  const stepPath = buildStepPath()

  // Several attempts answered in the same quiz session share one timestamp
  // (and, if their level didn't change, one level) and would otherwise render
  // as perfectly overlapping circles — looking like a single attempt. Spread
  // dots that land on (nearly) the same pixel position out horizontally so
  // each attempt stays visible.
  const DOT_R = 5.5
  const positionedDots = attemptDots.map(dot => ({
    dot,
    cx: xScale(dot.at),
    cy: yScale(stateToYIndex(dot.levelAtTime)),
  }))
  const dotGroups = new Map<string, typeof positionedDots>()
  for (const p of positionedDots) {
    const key = `${Math.round(p.cx)}:${Math.round(p.cy)}`
    const group = dotGroups.get(key)
    if (group) group.push(p)
    else dotGroups.set(key, [p])
  }
  const spreadDots: { dot: AttemptDot; cx: number; cy: number }[] = []
  for (const group of dotGroups.values()) {
    group.forEach((p, i) => {
      const offset = (i - (group.length - 1) / 2) * (DOT_R + 1)
      spreadDots.push({ dot: p.dot, cx: p.cx + offset, cy: p.cy })
    })
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      className="w-full cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Grid lines + Y labels */}
      {Y_LEVELS.map((state, i) => {
        const cy = yScale(stateToYIndex(state))
        return (
          <g key={state}>
            <line
              x1={PAD_LEFT} x2={PAD_LEFT + CHART_W}
              y1={cy} y2={cy}
              stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3"
            />
            <text
              x={PAD_LEFT - 5} y={cy + 4}
              textAnchor="end" fontSize={11}
              fill="currentColor" opacity={0.5}
            >
              {Y_LABELS[i]}
            </text>
          </g>
        )
      })}

      {/* X-axis date labels */}
      {xLabels.map(({ label, x }) => (
        <text key={label} x={x} y={VB_H - 8} textAnchor="middle" fontSize={12} fill="currentColor" opacity={0.4}>
          {label}
        </text>
      ))}

      {/* Step-function line */}
      <path
        d={stepPath}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        opacity={0.7}
      />

      {/* Attempt dots */}
      {spreadDots.map(({ dot, cx, cy }, idx) => (
        <circle
          key={idx}
          cx={cx}
          cy={cy}
          r={DOT_R}
          fill={dot.isCorrect ? '#22c55e' : '#ef4444'}
          stroke="white"
          strokeWidth={2}
          opacity={0.9}
        />
      ))}

      {/* Hover cursor line */}
      {cursorX !== null && (
        <line
          x1={cursorX} x2={cursorX}
          y1={PAD_TOP} y2={PAD_TOP + CHART_H}
          stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="4 3"
        />
      )}
    </svg>
  )
}
