// **Abilities** — what each of Quiz Battle's power-ups is called in Actuaria,
// what it does in a line, and the concept that unlocks it
// (docs/actuaria-online.md §7.2). What an ability *does* in a battle is the
// engine's (`lib/battle.ts`), not this table's; this is the Hangar's catalogue.
//
// Each ability is unlocked by mastering a concept — read through the mastery
// ladder, so decay can take it away again. Reinsurance is the starter, open to
// everyone. `abilities.test.ts` holds every `concept` to a real concept page
// linked from the syllabus of the exam named.

import type { AbilityId } from '@/lib/battle'
import type { MasteryState } from '@/lib/mastery'

export interface AbilityDef {
  id: AbilityId
  name: string
  /** One line: what it does. */
  effect: string
  /** The exam_progress key of the concept's exam; null for the starter. */
  exam: string | null
  /** The concept that unlocks it; null for the starter. */
  concept: string | null
  /** The level the concept must hold. */
  minLevel: Extract<MasteryState, 'level1' | 'level2' | 'level3'> | null
}

export const ACTUARIA_ABILITIES: readonly AbilityDef[] = [
  {
    id: 'reinsurance',
    name: 'Reinsurance',
    effect: 'Halve your next claim (−50 → −25).',
    exam: null,
    concept: null,
    minLevel: null,
  },
  {
    id: 'bayesian-update',
    name: 'Bayesian Update',
    effect: 'Strike one wrong option from this question, on your screen only.',
    exam: 'P',
    concept: 'Bayes Theorem',
    minLevel: 'level2',
  },
  {
    id: 'double-down',
    name: 'Double Down',
    effect: 'Arm before answering: this round ×2 — but a miss is a claim of −50.',
    exam: 'P',
    concept: 'Expected Value',
    minLevel: 'level2',
  },
  {
    id: 'time-value',
    name: 'Time Value',
    effect: 'This round’s speed bonus as if you’d answered 30 s sooner.',
    exam: 'FM',
    concept: 'Present Value',
    minLevel: 'level2',
  },
  {
    id: 'immunization',
    name: 'Immunization',
    effect: 'A miss this round doesn’t break your streak.',
    exam: 'FM',
    concept: 'Immunization',
    minLevel: 'level3',
  },
]

export function abilityDef(id: AbilityId): AbilityDef | undefined {
  return ACTUARIA_ABILITIES.find(a => a.id === id)
}
