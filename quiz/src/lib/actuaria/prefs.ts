// **A player's Actuaria settings** — the one small thing Actuaria stores of its
// own (docs/actuaria-online.md §8.1): the ability loadout, whether the title
// screen has been seen, whether the Study Guides hub card was dismissed, and
// the ship cosmetics equipped in the Hangar. Everything else a screen shows is
// read from state the app already keeps.
//
// Pure: the shape, its defaults, and the parsing that makes a stored row — or a
// localStorage blob a guest's browser wrote — safe to use. `prefsStore.ts` does
// the reading and writing.

/** An ability a player may take into a battle before any unlock — Reinsurance. */
export const STARTER_ABILITY = 'reinsurance'
/** Abilities a player can equip at once (§7.2). */
export const LOADOUT_SIZE = 3

export type ShipSlot = 'hull' | 'trail' | 'calculator' | 'decal'
export const SHIP_SLOTS: readonly ShipSlot[] = ['hull', 'trail', 'calculator', 'decal']

export type ShipLoadout = Record<ShipSlot, string | null>

export interface ActuariaPrefs {
  /** Equipped ability ids, at most `LOADOUT_SIZE`. */
  loadout: string[]
  hubDismissed: boolean
  titleSeen: boolean
  /** The ship cosmetic equipped in each slot, or null for the stock part. */
  ship: ShipLoadout
}

export function defaultPrefs(): ActuariaPrefs {
  return {
    loadout: [STARTER_ABILITY],
    hubDismissed: false,
    titleSeen: false,
    ship: { hull: null, trail: null, calculator: null, decal: null },
  }
}

const ID_MAX = 40
const isId = (x: unknown): x is string => typeof x === 'string' && x.length > 0 && x.length <= ID_MAX

/** A loadout as it may be stored: known-shaped ids, no repeats, at most three. */
export function cleanLoadout(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [STARTER_ABILITY]
  const out: string[] = []
  for (const id of raw) {
    if (isId(id) && !out.includes(id)) out.push(id)
    if (out.length === LOADOUT_SIZE) break
  }
  return out
}

function cleanShip(raw: unknown): ShipLoadout {
  const ship: ShipLoadout = { hull: null, trail: null, calculator: null, decal: null }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return ship
  const o = raw as Record<string, unknown>
  for (const slot of SHIP_SLOTS) {
    const id = o[slot]
    // A slot only ever holds an id of its own kind — `ship:hull:…` in the hull.
    ship[slot] = isId(id) && id.startsWith(`ship:${slot}:`) ? id : null
  }
  return ship
}

/** Whatever was stored, as prefs: every field checked, anything unreadable the default. */
export function parsePrefs(raw: unknown): ActuariaPrefs {
  const base = defaultPrefs()
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return base
  const o = raw as Record<string, unknown>
  return {
    loadout: 'loadout' in o ? cleanLoadout(o.loadout) : base.loadout,
    hubDismissed: o.hubDismissed === true,
    titleSeen: o.titleSeen === true,
    ship: cleanShip(o.ship),
  }
}

/** The `user_actuaria` row's columns. */
export interface ActuariaRow {
  loadout: string[] | null
  hub_dismissed: boolean | null
  title_seen: boolean | null
  ship: Record<string, unknown> | null
}

export function rowToPrefs(row: ActuariaRow | null | undefined): ActuariaPrefs | null {
  if (!row) return null
  return parsePrefs({
    loadout: row.loadout ?? undefined,
    hubDismissed: row.hub_dismissed,
    titleSeen: row.title_seen,
    ship: row.ship,
  })
}

export function prefsToRow(userId: string, prefs: ActuariaPrefs) {
  return {
    user_id: userId,
    loadout: prefs.loadout,
    hub_dismissed: prefs.hubDismissed,
    title_seen: prefs.titleSeen,
    ship: prefs.ship,
    updated_at: new Date().toISOString(),
  }
}

/** `prefs` with `patch` laid over it, cleaned again. */
export function withPatch(prefs: ActuariaPrefs, patch: Partial<ActuariaPrefs>): ActuariaPrefs {
  return parsePrefs({ ...prefs, ...patch, ship: { ...prefs.ship, ...(patch.ship ?? {}) } })
}
