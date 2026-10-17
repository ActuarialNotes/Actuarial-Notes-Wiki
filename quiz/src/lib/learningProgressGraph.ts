// The geometry of the concept learning-history graph
// (components/ui/LearningProgressGraph.tsx): the viewBox and its padding, the
// five level rows, and the time/level scales the step path and the attempt dots
// are drawn on. Pure, so the scales are tested on their own.

import { levelAtTime } from '@/lib/learningHistory'
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

export function makeScales(levelEvents: LevelEvent[], attemptDots: AttemptDot[], until?: Date | null) {
  const allTimes = [
    ...levelEvents.map(e => e.at.getTime()),
    ...attemptDots.map(d => d.at.getTime()),
  ]
  const now = Date.now()
  const tMin = allTimes.length > 0 ? Math.min(...allTimes) - 12 * 3600_000 : now - 7 * 86400_000
  // Guard against a zero (or inverted) span so xScale can never divide by zero
  // and emit NaN coordinates into the SVG path. A projection runs the axis on
  // past today, to its last step and a day beyond.
  const tMax = Math.max(now + 12 * 3600_000, tMin + 86400_000, until ? until.getTime() + 86400_000 : 0)
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

  // The solid line runs to now when a projection follows it, to the edge otherwise.
  const solidEnd = until ? Math.min(now, tMax) : tMax

  function buildStepPath(): string {
    const initialState = levelEvents[0]?.from ?? 'new'
    const startY = yScale(stateToYIndex(initialState))
    const startX = xScale(new Date(tMin))
    if (levelEvents.length === 0) {
      return `M ${startX} ${startY} H ${xScale(new Date(solidEnd))}`
    }
    let d = `M ${startX} ${startY}`
    for (const ev of levelEvents) {
      const x = xScale(ev.at)
      d += ` H ${x} V ${yScale(stateToYIndex(ev.to))}`
    }
    d += ` H ${xScale(new Date(solidEnd))}`
    return d
  }

  /** The decay still to come, as dashes on from now: `from` the level held today. */
  function buildProjectionPath(projection: LevelEvent[], current: MasteryState): string {
    if (projection.length === 0) return ''
    let d = `M ${xScale(new Date(solidEnd))} ${yScale(stateToYIndex(current))}`
    for (const ev of projection) {
      d += ` H ${xScale(ev.at)} V ${yScale(stateToYIndex(ev.to))}`
    }
    d += ` H ${xScale(new Date(tMax))}`
    return d
  }

  return { xScale, xInverse, yScale, buildXLabels, buildStepPath, buildProjectionPath, tMin, tMax }
}

export { levelAtTime }
