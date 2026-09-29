// **Credibility** — how Actuaria reads the mastery ladder and the readiness
// score (docs/actuaria-online.md §3, §6.5).
//
// Credibility is not a second score. A landmark's Z is its concept's mastery
// level, read through `resolveConceptState` with decay applied at read time
// (docs/concept-learning-progression.md); a sector's Z is the exam's readiness
// score over 100 (`computeExamReadiness`, docs/exam-readiness.md). This module
// only turns those into the numbers and words an in-world screen prints, and
// projects the next step of orbital decay — the existing decay ladder, run
// forward from the concept's last right answer.

import { syntheticDecayEvents, type LevelEvent } from '@/lib/learningHistory'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { masteryFill } from '@/lib/masteryFill'

// ── Landmark Z ──────────────────────────────────────────────────────────────

/** A concept's credit toward Z: none until it is learned, then a third per level. */
export const LANDMARK_Z: Readonly<Record<MasteryState, number>> = {
  new: 0,
  forgotten: 0,
  level1: 1 / 3,
  level2: 2 / 3,
  level3: 1,
}

export function landmarkZ(state: MasteryState): number {
  return LANDMARK_Z[state]
}

/** "0.67" — a Z to two places, the way every readout prints it. */
export function formatZ(z: number): string {
  // Rounded on hundredths first so 2/3 prints 0.67, never 0.66666….
  return (Math.round(Math.max(0, Math.min(1, z)) * 100) / 100).toFixed(2)
}

// ── Sector Z ────────────────────────────────────────────────────────────────

/** A sector's fill: readiness is measured in mastery's green (style guide §7.5). */
export const SECTOR_FILL = masteryFill('level3', false)

export interface SectorCredibility {
  /** 0–1, the readiness score over 100. */
  z: number
  /** The readout, "0.62". Always the Dashboard's rounded percentage over 100. */
  label: string
  /** The Dashboard's number — `Math.round(overallPct)`. */
  percent: number
}

/**
 * A sector's Credibility from the exam's readiness percentage. The label is
 * built from the *rounded* percentage, so Z × 100 is always the number the
 * Dashboard prints beside the same exam — never one off from a float.
 */
export function sectorCredibility(overallPct: number): SectorCredibility {
  const clamped = Math.max(0, Math.min(100, overallPct))
  const percent = Math.round(clamped)
  return { z: clamped / 100, label: (percent / 100).toFixed(2), percent }
}

// ── Orbital decay ───────────────────────────────────────────────────────────

export interface DecayStep extends LevelEvent {
  /** Whole days from `now` to the step, rounded up — "in 3 days". 0 means today. */
  inDays: number
}

const MS_PER_DAY = 24 * 60 * 60 * 1000
/** Far enough ahead to see every step of the ladder from Level 3 (51 days). */
const HORIZON_MS = 400 * MS_PER_DAY

/**
 * The next step down the decay ladder for a concept, or null for one with
 * nothing left to lose (New, Forgotten, or never answered right). Projected by
 * the same function that draws decay on the learning-progress graph
 * (`syntheticDecayEvents`), so the date here is the date the graph's dashes
 * fall on, and the date `decayIfStale` will act on.
 */
export function nextDecayStep(record: ConceptMasteryRecord | undefined, now: Date): DecayStep | null {
  if (!record || !record.last_correct_at) return null
  if (record.state === 'new' || record.state === 'forgotten') return null
  const lastCorrect = new Date(record.last_correct_at)
  if (Number.isNaN(lastCorrect.getTime())) return null
  const steps = syntheticDecayEvents(record.state, lastCorrect, new Date(now.getTime() + HORIZON_MS))
  const next = steps.find(step => step.at.getTime() > now.getTime())
  if (!next) return null
  return { ...next, inDays: Math.max(0, Math.ceil((next.at.getTime() - now.getTime()) / MS_PER_DAY)) }
}

/** "L2 → L1 in 3 days", "L1 → Forgotten tomorrow". */
export function describeDecayStep(step: DecayStep): string {
  const when = step.inDays <= 0 ? 'today' : step.inDays === 1 ? 'tomorrow' : `in ${step.inDays} days`
  return `${shortLevel(step.from)} → ${shortLevel(step.to)} ${when}`
}

function shortLevel(state: MasteryState): string {
  if (state === 'level1') return 'L1'
  if (state === 'level2') return 'L2'
  if (state === 'level3') return 'L3'
  return MASTERY_LABEL[state]
}
