// **Abilities** — what each of Quiz Battle's power-ups is called in Actuaria,
// what it does in a line, and the keystone that unlocks it
// (docs/actuaria-online.md §7.2). What an ability *does* in a battle is the
// engine's (`lib/battle.ts`), not this table's; this is the Hangar's catalogue.
//
// Each ability is unlocked by mastering a keystone concept — read through the
// mastery ladder, so decay can take it away again. Reinsurance is the starter,
// open to everyone. `abilities.test.ts` holds every `keystone` to a real one in
// data/keystoneConcepts.ts, of the exam named.

import type { AbilityId } from '@/lib/battle'
import type { MasteryState } from '@/lib/mastery'

export interface AbilityDef {
  id: AbilityId
  name: string
  /** One line: what it does. */
  effect: string
  /** The exam_progress key of the keystone's exam; null for the starter. */
  exam: string | null
  /** The keystone concept that unlocks it; null for the starter. */
  keystone: string | null
  /** The level the keystone must hold. */
  minLevel: Extract<MasteryState, 'level1' | 'level2' | 'level3'> | null
}

export const ACTUARIA_ABILITIES: readonly AbilityDef[] = [
  {
    id: 'reinsurance',
    name: 'Reinsurance',
    effect: 'Halve your next claim (−50 → −25).',
    exam: null,
    keystone: null,
    minLevel: null,
  },
  {
    id: 'bayesian-update',
    name: 'Bayesian Update',
    effect: 'Strike one wrong option from this question, on your screen only.',
    exam: 'P',
    keystone: 'Bayes Theorem',
    minLevel: 'level2',
  },
  {
    id: 'double-down',
    name: 'Double Down',
    effect: 'Arm before answering: this round ×2 — but a miss is a claim of −50.',
    exam: 'P',
    keystone: 'Expected Value',
    minLevel: 'level2',
  },
  {
    id: 'time-value',
    name: 'Time Value',
    effect: 'This round’s speed bonus as if you’d answered 30 s sooner.',
    exam: 'FM',
    keystone: 'Present Value',
    minLevel: 'level2',
  },
  {
    id: 'immunization',
    name: 'Immunization',
    effect: 'A miss this round doesn’t break your streak.',
    exam: 'FM',
    keystone: 'Immunization',
    minLevel: 'level3',
  },
]

export function abilityDef(id: AbilityId): AbilityDef | undefined {
  return ACTUARIA_ABILITIES.find(a => a.id === id)
}
