// **Ship cosmetics** — what a player's ship can wear in Actuaria's Hangar
// (docs/actuaria-online.md §7.3). Cosmetic only: nothing here touches a
// battle's score, and a ship is never sent over a battle room — Quiz Battle
// draws only the app's own avatars.
//
// A sibling of the Store's animal catalogue (lib/cosmetics.ts) rather than a
// kind inside it: the ids are namespaced `ship:<slot>:<name>`, bought through
// the same `purchase_cosmetic` RPC and owned in the same `user_cosmetics`
// table, and a slot only ever holds an id of its own kind
// (`lib/actuaria/prefs.ts`). Prices follow the existing economy — quests pay
// ~40–55 gems a day, a basic cosmetic is 10 and a rare one 50.
//
// The paints are the cosmetic's content, not interface colour, so they are
// values here the way an animal's palette is — but kept clear of the meaning
// map (no green, red or amber hull: those say right, wrong and at risk).

import type { ShipSlot } from '@/lib/actuaria/prefs'

export type ShipRarity = 'common' | 'rare'

export interface ShipCosmetic {
  /** `ship:<slot>:<name>` — the id `purchase_cosmetic` records. */
  id: string
  slot: ShipSlot
  name: string
  priceGems: number
  rarity: ShipRarity
  /** A hull paint: the fill and its panel lines. */
  hull?: { base: string; accent: string }
  /** An engine trail's colour. */
  trail?: string
  /** Not sold: earned — the Stop-Loss Shield is a raid's reward for the kill (§7.7). */
  raidOnly?: boolean
}

export const BASIC_PRICE = 10
export const RARE_PRICE = 50

export const SHIP_COSMETICS: readonly ShipCosmetic[] = [
  // Hull paints — 10 basic, 50 rare.
  { id: 'ship:hull:graphite', slot: 'hull', name: 'Graphite', priceGems: BASIC_PRICE, rarity: 'common',
    hull: { base: 'hsl(220 8% 30%)', accent: 'hsl(220 8% 55%)' } },
  { id: 'ship:hull:ivory', slot: 'hull', name: 'Ivory', priceGems: BASIC_PRICE, rarity: 'common',
    hull: { base: 'hsl(40 25% 88%)', accent: 'hsl(40 10% 55%)' } },
  { id: 'ship:hull:cobalt', slot: 'hull', name: 'Cobalt', priceGems: BASIC_PRICE, rarity: 'common',
    hull: { base: 'hsl(222 60% 42%)', accent: 'hsl(222 70% 72%)' } },
  { id: 'ship:hull:indigo', slot: 'hull', name: 'Indigo', priceGems: BASIC_PRICE, rarity: 'common',
    hull: { base: 'hsl(248 40% 38%)', accent: 'hsl(248 55% 70%)' } },
  { id: 'ship:hull:nebula', slot: 'hull', name: 'Nebula', priceGems: RARE_PRICE, rarity: 'rare',
    hull: { base: 'hsl(268 45% 28%)', accent: 'hsl(300 60% 72%)' } },
  { id: 'ship:hull:eclipse', slot: 'hull', name: 'Eclipse', priceGems: RARE_PRICE, rarity: 'rare',
    hull: { base: 'hsl(0 0% 6%)', accent: 'hsl(45 30% 80%)' } },

  // Engine trails — 10.
  { id: 'ship:trail:ion', slot: 'trail', name: 'Ion', priceGems: BASIC_PRICE, rarity: 'common', trail: 'hsl(210 90% 62%)' },
  { id: 'ship:trail:plasma', slot: 'trail', name: 'Plasma', priceGems: BASIC_PRICE, rarity: 'common', trail: 'hsl(275 80% 66%)' },
  { id: 'ship:trail:starlight', slot: 'trail', name: 'Starlight', priceGems: BASIC_PRICE, rarity: 'common', trail: 'hsl(0 0% 96%)' },

  // Calculator skins — the two the exams allow, 10 each.
  { id: 'ship:calculator:ba-ii-plus', slot: 'calculator', name: 'BA II Plus', priceGems: BASIC_PRICE, rarity: 'common' },
  { id: 'ship:calculator:ti-30xs', slot: 'calculator', name: 'TI-30XS MultiView', priceGems: BASIC_PRICE, rarity: 'common' },

  // Decals — earned, never sold. Granted by the database to everyone who dealt
  // damage when a cohort's raid boss falls (actuaria_raid_hit).
  { id: 'ship:decal:stop-loss-shield', slot: 'decal', name: 'Stop-Loss Shield', priceGems: 0, rarity: 'rare', raidOnly: true },
]

/**
 * What the Store sells: everything but the raid's reward. A function, not a
 * constant, so the Store — in the main chunk — carries none of this catalogue
 * while ACTUARIA_ENABLED is off (a top-level call can't be tree-shaken away).
 */
export function storeShips(): ShipCosmetic[] {
  return SHIP_COSMETICS.filter(c => !c.raidOnly)
}

export function shipCosmetic(id: string | null | undefined): ShipCosmetic | undefined {
  return id ? SHIP_COSMETICS.find(c => c.id === id) : undefined
}

export const SHIP_SLOT_LABEL: Record<ShipSlot, string> = {
  hull: 'Hull paint',
  trail: 'Engine trail',
  calculator: 'Calculator bay',
  decal: 'Decal',
}
