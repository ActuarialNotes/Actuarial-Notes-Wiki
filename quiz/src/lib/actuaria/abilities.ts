// **Ability unlocks** — which of a player's abilities they can take into a
// battle, read off their mastery (docs/actuaria-online.md §7.2, §6.7).
//
// An ability is unlocked while its concept holds the level it asks for, read
// through `resolveConceptState` with decay applied — so a concept left to
// decay locks its ability again ("Requirement lapsed"). The loadout a player
// keeps in the Hangar is a choice; the loadout they take into a battle is that
// choice cut to what is unlocked when the battle starts, and an ability taken
// in stays usable for that battle whatever happens to the concept during it.

import { ACTUARIA_ABILITIES, type AbilityDef } from '@/data/actuariaAbilities'
import { LOADOUT_MAX, cleanLoadout, type AbilityId } from '@/lib/battle'
import { buildMasteryLookup, lookupConceptRecord, resolveConceptState } from '@/lib/conceptMatch'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'

const RANK: Record<MasteryState, number> = { forgotten: 0, new: 0, level1: 1, level2: 2, level3: 3 }

export interface AbilityStatus {
  def: AbilityDef
  unlocked: boolean
  /** The concept's level now, decay applied — null for the starter. */
  state: MasteryState | null
  /** It held the level once and decay took it away: review the concept. */
  lapsed: boolean
}

export function abilityStatus(def: AbilityDef, records: readonly ConceptMasteryRecord[], now: Date): AbilityStatus {
  if (!def.concept || !def.minLevel || !def.exam) return { def, unlocked: true, state: null, lapsed: false }
  const rows = records.filter(r => r.exam_id === def.exam)
  const lookup = buildMasteryLookup(rows)
  const concept = { name: def.concept }
  const state = resolveConceptState(lookup, concept, now)
  const stored = lookupConceptRecord(lookup, concept)?.state ?? 'new'
  const unlocked = RANK[state] >= RANK[def.minLevel]
  return { def, unlocked, state, lapsed: !unlocked && RANK[stored] >= RANK[def.minLevel] }
}

export function abilityStatuses(records: readonly ConceptMasteryRecord[], now: Date): AbilityStatus[] {
  return ACTUARIA_ABILITIES.map(def => abilityStatus(def, records, now))
}

/** The abilities a player takes into a battle: their Hangar loadout, cut to what is unlocked now. */
export function battleLoadout(equipped: readonly string[], records: readonly ConceptMasteryRecord[], now: Date): AbilityId[] {
  const unlocked = new Set(abilityStatuses(records, now).filter(s => s.unlocked).map(s => s.def.id))
  return cleanLoadout(equipped).filter(id => unlocked.has(id))
}

/**
 * The Hangar's equip toggle: off if it's on; on if there's room and it's
 * unlocked. A full loadout is left as it is — the player takes one off first.
 */
export function toggleEquip(equipped: readonly string[], id: AbilityId, unlocked: boolean): string[] {
  if (equipped.includes(id)) return equipped.filter(x => x !== id)
  if (!unlocked || cleanLoadout(equipped).length >= LOADOUT_MAX) return [...equipped]
  return [...equipped, id]
}
