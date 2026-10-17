// Shared SVG step-function graph for concept learning history.
// Used by LearningProgressModal and ConceptCoverageSection.

import { useRef, useState } from 'react'
import { levelAtTime } from '@/lib/learningHistory'
import type { LevelEvent } from '@/lib/learningHistory'
import {
  VB_W,
  VB_H,
  PAD_LEFT,
  PAD_TOP,
  CHART_W,
  CHART_H,
  Y_LEVELS,
  Y_LABELS,
  stateToYIndex,
  makeScales,
} from '@/lib/learningProgressGraph'
import type { AttemptDot } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'

// ─── Labels ───────────────────────────────────────────────────────────────────

/**
 * The same rows read as Credibility, for Actuaria (docs/actuaria-online.md §6.5):
 * a level's Z. Forgotten and New are both 0 — Forgotten keeps an F so the two
 * rows stay told apart.
 */
const Y_LABELS_Z = ['F', '0', '0.33', '0.67', '1.00']

/** How the graph labels itself: the app's level names, or Actuaria's Z. */
export type GraphPresentation = 'app' | 'actuaria'

// ─── Component ────────────────────────────────────────────────────────────────

export interface GraphProps {
  levelEvents: LevelEvent[]
  attemptDots: AttemptDot[]
  onHoverLevel: (level: MasteryState | null) => void
  /** Question the attempt list below the graph is filtered to, if any. */
  selectedQuestionId?: string | null
  /** Set to make the dots clickable — each one toggles the filter to its question. */
  onSelectQuestion?: (questionId: string | null) => void
  /** `actuaria` labels the y-axis in Credibility (Z) rather than level names. */
  presentation?: GraphPresentation
  /**
   * Projected decay — the steps still to come if nothing is reviewed
   * (`syntheticDecayEvents` run forward), drawn dashed on from today.
   */
  projection?: LevelEvent[]
}

export function ProgressGraph({
  levelEvents,
  attemptDots,
  onHoverLevel,
  selectedQuestionId = null,
  onSelectQuestion,
  presentation = 'app',
  projection = [],
}: GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursorX, setCursorX] = useState<number | null>(null)
  const until = projection.length > 0 ? projection[projection.length - 1].at : null
  const { xScale, xInverse, yScale, buildXLabels, buildStepPath, buildProjectionPath } = makeScales(levelEvents, attemptDots, until)
  const yLabels = presentation === 'actuaria' ? Y_LABELS_Z : Y_LABELS

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
    // Dots stop propagation, so a click that reaches the canvas is a click off
    // the dots — the natural way to drop the filter again.
    onSelectQuestion?.(null)
  }

  const xLabels = buildXLabels()
  const stepPath = buildStepPath()
  const projectionPath = buildProjectionPath(projection, projection[0]?.from ?? 'new')
  const selectable = !!onSelectQuestion

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
              {yLabels[i]}
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

      {/* Projected decay: where the line goes if nothing is reviewed. */}
      {projectionPath && (
        <path
          d={projectionPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="5 5"
          strokeLinejoin="round"
          opacity={0.45}
          data-testid="graph-projection"
        />
      )}

      {/* Attempt dots. When a select handler is supplied each dot is a control
          that filters the question list below to the question it answered; the
          dots for other questions dim so the chosen one stands out. */}
      {spreadDots.map(({ dot, cx, cy }, idx) => {
        const isSelected = !!selectedQuestionId && dot.questionId === selectedQuestionId
        const isDimmed = !!selectedQuestionId && !isSelected
        const toggle = () => onSelectQuestion?.(isSelected ? null : dot.questionId)
        return (
          <g
            key={idx}
            role={selectable ? 'button' : undefined}
            tabIndex={selectable ? 0 : undefined}
            aria-pressed={selectable ? isSelected : undefined}
            aria-label={selectable ? `${dot.isCorrect ? 'Correct' : 'Incorrect'} attempt on ${dot.at.toLocaleDateString()} — show this question` : undefined}
            className={selectable ? 'cursor-pointer outline-none' : undefined}
            onClick={selectable ? e => { e.stopPropagation(); toggle() } : undefined}
            onKeyDown={selectable
              ? e => {
                  if (e.key !== 'Enter' && e.key !== ' ') return
                  e.preventDefault()
                  e.stopPropagation()
                  toggle()
                }
              : undefined}
          >
            {/* Transparent hit area — the visible dot is a small tap target. */}
            {selectable && <circle cx={cx} cy={cy} r={DOT_R + 5} fill="transparent" />}
            {isSelected && (
              <circle
                cx={cx} cy={cy} r={DOT_R + 3.5}
                fill="none" stroke="currentColor" strokeWidth={1.5} strokeOpacity={0.8}
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={DOT_R}
              fill={dot.isCorrect ? '#22c55e' : '#ef4444'}
              stroke="white"
              strokeWidth={2}
              opacity={isDimmed ? 0.25 : 0.9}
            />
          </g>
        )
      })}

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
