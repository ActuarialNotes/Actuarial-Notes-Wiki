import { describe, it, expect } from 'vitest'
import {
  stateToYIndex,
  levelAtTime,
  makeScales,
  Y_LEVELS,
  Y_LABELS,
  PAD_TOP,
  CHART_H,
} from '@/components/ui/LearningProgressGraph'
import type { LevelEvent } from '@/lib/learningHistory'
import type { AttemptDot } from '@/hooks/useConceptLearningHistory'

// Fixed reference dates so tests are deterministic.
const T1 = new Date('2026-01-10T12:00:00Z')
const T2 = new Date('2026-01-20T12:00:00Z')
const T3 = new Date('2026-03-01T12:00:00Z')
const BEFORE_T1 = new Date('2026-01-01T12:00:00Z')

// ── stateToYIndex ─────────────────────────────────────────────────────────────

describe('stateToYIndex', () => {
  it('maps forgotten to 0 (lowest position)', () => {
    expect(stateToYIndex('forgotten')).toBe(0)
  })

  it('maps new to 1', () => {
    expect(stateToYIndex('new')).toBe(1)
  })

  it('maps level1 to 2', () => {
    expect(stateToYIndex('level1')).toBe(2)
  })

  it('maps level2 to 3', () => {
    expect(stateToYIndex('level2')).toBe(3)
  })

  it('maps level3 to 4 (highest position)', () => {
    expect(stateToYIndex('level3')).toBe(4)
  })

  it('all five states map to distinct y-indices', () => {
    const indices = new Set([
      stateToYIndex('forgotten'),
      stateToYIndex('new'),
      stateToYIndex('level1'),
      stateToYIndex('level2'),
      stateToYIndex('level3'),
    ])
    expect(indices.size).toBe(5)
  })

  it('forgotten is strictly below new', () => {
    expect(stateToYIndex('forgotten')).toBeLessThan(stateToYIndex('new'))
  })
})

// ── Y_LEVELS / Y_LABELS consistency ──────────────────────────────────────────

describe('Y_LEVELS and Y_LABELS', () => {
  it('have the same length', () => {
    expect(Y_LEVELS.length).toBe(Y_LABELS.length)
  })

  it('Y_LEVELS includes all 5 mastery states', () => {
    expect(Y_LEVELS).toContain('forgotten')
    expect(Y_LEVELS).toContain('new')
    expect(Y_LEVELS).toContain('level1')
    expect(Y_LEVELS).toContain('level2')
    expect(Y_LEVELS).toContain('level3')
  })

  it('Y_LABELS entry for forgotten does not say "New"', () => {
    const forgottenIdx = Y_LEVELS.indexOf('forgotten')
    expect(forgottenIdx).toBeGreaterThanOrEqual(0)
    expect(Y_LABELS[forgottenIdx]).not.toBe('New')
  })

  it('each Y_LEVEL maps to a unique index in stateToYIndex', () => {
    const indices = Y_LEVELS.map(s => stateToYIndex(s))
    const unique = new Set(indices)
    expect(unique.size).toBe(Y_LEVELS.length)
  })
})

// ── levelAtTime ───────────────────────────────────────────────────────────────

describe('levelAtTime', () => {
  it('returns "new" for empty events at any time', () => {
    expect(levelAtTime(T1, [])).toBe('new')
  })

  it('returns from-state of first event when hovering before any event', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'level3', to: 'level2' },
    ]
    expect(levelAtTime(BEFORE_T1, events)).toBe('level3')
  })

  it('returns "new" before first event when first event starts from new', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
    ]
    expect(levelAtTime(BEFORE_T1, events)).toBe('new')
  })

  it('returns to-state of an event at exactly that event timestamp', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
    ]
    expect(levelAtTime(T1, events)).toBe('level1')
  })

  it('returns to-state of the last passed event for a time between events', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
      { at: T3, from: 'level1', to: 'level2' },
    ]
    // T2 is between T1 and T3
    expect(levelAtTime(T2, events)).toBe('level1')
  })

  it('returns to-state of the final event for a time after all events', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
      { at: T2, from: 'level1', to: 'level2' },
    ]
    expect(levelAtTime(T3, events)).toBe('level2')
  })

  it('handles downward forgotten transitions correctly', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
      { at: T2, from: 'level1', to: 'level2' },
      { at: T3, from: 'level2', to: 'forgotten' },
    ]
    expect(levelAtTime(T3, events)).toBe('forgotten')
    // Between T2 and T3, still at level2
    const mid = new Date('2026-02-01T12:00:00Z')
    expect(levelAtTime(mid, events)).toBe('level2')
  })

  it('returns from-state before a decay event when concept started at level3', () => {
    const events: LevelEvent[] = [
      { at: T2, from: 'level3', to: 'level2' },  // first event is a decay
    ]
    // Before the decay, concept was at level3
    expect(levelAtTime(BEFORE_T1, events)).toBe('level3')
    expect(levelAtTime(T1, events)).toBe('level3')
    // After the decay, it dropped to level2
    expect(levelAtTime(T3, events)).toBe('level2')
  })
})

// ── makeScales ────────────────────────────────────────────────────────────────

describe('makeScales — yScale', () => {
  const { yScale } = makeScales([], [])

  it('index 0 (forgotten) maps to the bottom of the chart', () => {
    expect(yScale(0)).toBeCloseTo(PAD_TOP + CHART_H)
  })

  it('index 4 (level3) maps to the top of the chart', () => {
    expect(yScale(4)).toBeCloseTo(PAD_TOP)
  })

  it('index 2 (level1) maps to the midpoint', () => {
    expect(yScale(2)).toBeCloseTo(PAD_TOP + CHART_H * 0.5)
  })

  it('higher indices produce lower pixel y values (SVG coordinate system)', () => {
    expect(yScale(4)).toBeLessThan(yScale(3))
    expect(yScale(3)).toBeLessThan(yScale(2))
    expect(yScale(2)).toBeLessThan(yScale(1))
    expect(yScale(1)).toBeLessThan(yScale(0))
  })
})

describe('makeScales — buildStepPath', () => {
  it('empty events: horizontal line at the new state height', () => {
    const { buildStepPath, yScale } = makeScales([], [])
    const path = buildStepPath()
    const newY = yScale(stateToYIndex('new'))
    // Path starts with "M x y" — check the y coordinate matches 'new'
    const match = path.match(/^M [\d.]+ ([\d.]+)/)
    expect(match).not.toBeNull()
    expect(parseFloat(match![1])).toBeCloseTo(newY)
  })

  it('first event from level3: path starts at level3 height, not at forgotten/new bottom', () => {
    const events: LevelEvent[] = [
      { at: T2, from: 'level3', to: 'level2' },
    ]
    const dots: AttemptDot[] = []
    const { buildStepPath, yScale } = makeScales(events, dots)
    const path = buildStepPath()
    const level3Y = yScale(stateToYIndex('level3'))
    const forgottenY = yScale(stateToYIndex('forgotten'))
    const match = path.match(/^M [\d.]+ ([\d.]+)/)
    expect(match).not.toBeNull()
    const startY = parseFloat(match![1])
    expect(startY).toBeCloseTo(level3Y)
    // Must NOT be starting at forgotten/new level
    expect(startY).not.toBeCloseTo(forgottenY)
  })

  it('first event from new: path starts at new height', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
    ]
    const { buildStepPath, yScale } = makeScales(events, [])
    const path = buildStepPath()
    const newY = yScale(stateToYIndex('new'))
    const match = path.match(/^M [\d.]+ ([\d.]+)/)
    expect(match).not.toBeNull()
    expect(parseFloat(match![1])).toBeCloseTo(newY)
  })

  it('path contains H and V segments for each event', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
      { at: T2, from: 'level1', to: 'level2' },
    ]
    const { buildStepPath } = makeScales(events, [])
    const path = buildStepPath()
    // Each event adds " H x V y"
    const hCount = (path.match(/ H /g) ?? []).length
    const vCount = (path.match(/ V /g) ?? []).length
    // 2 events → 2 H V pairs + 1 trailing H
    expect(vCount).toBe(2)
    expect(hCount).toBe(3)
  })

  it('path ends with a horizontal line to tMax', () => {
    const events: LevelEvent[] = [
      { at: T1, from: 'new', to: 'level1' },
    ]
    const { buildStepPath } = makeScales(events, [])
    const path = buildStepPath()
    expect(path.trimEnd().endsWith('H') || path.includes(' H ')).toBe(true)
  })
})
