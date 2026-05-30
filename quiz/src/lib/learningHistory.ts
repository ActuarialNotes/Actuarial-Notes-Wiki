// Pure utilities for computing synthetic level events in the learning history graph.
// Kept separate from the hook so they can be unit-tested without loading Supabase.

import {
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
} from './mastery'
import type { MasteryState } from './mastery'

export interface LevelEvent {
  at: Date
  from: MasteryState
  to: MasteryState
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Compute the synthetic downward level events caused by time-based decay.
 * Mirrors the cascade logic in decayIfStale() so the graph line drops at
 * exactly the same point that the state machine would.
 */
export function syntheticDecayEvents(
  lastLevel: MasteryState,
  lastCorrectAt: Date,
  now: Date,
): LevelEvent[] {
  const events: LevelEvent[] = []
  let state = lastLevel
  let origin = lastCorrectAt.getTime()

  if (state === 'level3') {
    const at = new Date(origin + DECAY_DAYS_LEVEL3 * MS_PER_DAY)
    if (at > now) return events
    events.push({ at, from: 'level3', to: 'level2' })
    state = 'level2'
    origin = at.getTime()
  }
  if (state === 'level2') {
    const at = new Date(origin + DECAY_DAYS_LEVEL2 * MS_PER_DAY)
    if (at > now) return events
    events.push({ at, from: 'level2', to: 'level1' })
    state = 'level1'
    origin = at.getTime()
  }
  if (state === 'level1') {
    const at = new Date(origin + DECAY_DAYS_LEVEL1 * MS_PER_DAY)
    if (at > now) return events
    events.push({ at, from: 'level1', to: 'forgotten' })
  }
  return events
}
