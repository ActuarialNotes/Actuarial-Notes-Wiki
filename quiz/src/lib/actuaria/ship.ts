// **The ship a player flies** — their equipped Hangar slots, read against what
// they own (docs/actuaria-online.md §6.7, §7.3). Pure.
//
// The Hangar only equips; the Store sells. A slot draws its cosmetic only while
// the player owns it — a stored slot naming something they don't (another
// browser's copy, a hand-edited blob) draws the stock part rather than a paint
// nobody paid for.

import { SHIP_COSMETICS, shipCosmetic, type ShipCosmetic } from '@/data/actuariaShips'
import type { ShipLoadout, ShipSlot } from './prefs'

export interface ShipLook {
  hull: { base: string; accent: string } | null
  trail: string | null
  calculator: string | null
}

export interface ShipView {
  look: ShipLook
  /** What each slot holds, as the bay's callouts say it: the name, or "Stock". */
  labels: Record<ShipSlot, string>
}

export const STOCK = 'Stock'

/**
 * The ship as drawn. `owned` is the player's cosmetic ids, or null while it
 * isn't known yet — then an equipped slot is trusted, since equipping checked it.
 */
export function shipView(ship: ShipLoadout, owned: ReadonlySet<string> | null): ShipView {
  const worn = (slot: ShipSlot): ShipCosmetic | undefined => {
    const item = shipCosmetic(ship[slot])
    if (!item || item.slot !== slot) return undefined
    return !owned || owned.has(item.id) ? item : undefined
  }
  const hull = worn('hull')
  const trail = worn('trail')
  const calculator = worn('calculator')
  return {
    look: {
      hull: hull?.hull ?? null,
      trail: trail?.trail ?? null,
      calculator: calculator?.name ?? null,
    },
    labels: {
      hull: hull?.name ?? STOCK,
      trail: trail?.name ?? STOCK,
      calculator: calculator?.name ?? STOCK,
    },
  }
}

/** A slot's cosmetics, owned ones first, each in catalogue order. */
export function slotCosmetics(slot: ShipSlot, owned: ReadonlySet<string>): ShipCosmetic[] {
  const all = SHIP_COSMETICS.filter(c => c.slot === slot)
  return [...all.filter(c => owned.has(c.id)), ...all.filter(c => !owned.has(c.id))]
}

/** The ship ids among a player's cosmetics. */
export function ownedShipIds(cosmeticIds: Iterable<string>): Set<string> {
  const known = new Set(SHIP_COSMETICS.map(c => c.id))
  return new Set([...cosmeticIds].filter(id => known.has(id)))
}

/**
 * The Hangar's equip: put `id` in its slot, or take it out if it's already
 * there — only something the player owns. Returns the slot patch, or null for
 * no change.
 */
export function equipPatch(ship: ShipLoadout, id: string, owned: ReadonlySet<string>): Partial<ShipLoadout> | null {
  const item = shipCosmetic(id)
  if (!item || !owned.has(id)) return null
  return { [item.slot]: ship[item.slot] === id ? null : id }
}
