import { describe, expect, it } from 'vitest'
import { SHIP_COSMETICS, shipCosmetic, storeShips } from '@/data/actuariaShips'
import { STOP_LOSS_SHIELD } from './raid'
import { defaultPrefs, parsePrefs, SHIP_SLOTS } from './prefs'
import { equipPatch, ownedShipIds, shipView, slotCosmetics, STOCK } from './ship'

const stock = defaultPrefs().ship

describe('the ship catalogue (§7.3)', () => {
  it('namespaces every id by its slot, once', () => {
    const ids = SHIP_COSMETICS.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const c of SHIP_COSMETICS) expect(c.id.startsWith(`ship:${c.slot}:`)).toBe(true)
  })

  it('prices hull paints 10 basic / 50 rare, and trails and calculators 10', () => {
    for (const c of SHIP_COSMETICS) {
      if (c.raidOnly) expect(c.priceGems).toBe(0)
      else if (c.slot === 'hull') expect(c.priceGems).toBe(c.rarity === 'rare' ? 50 : 10)
      else expect(c.priceGems).toBe(10)
    }
  })

  it('stocks every slot, and sells the two calculators the exams allow', () => {
    for (const slot of SHIP_SLOTS) expect(SHIP_COSMETICS.some(c => c.slot === slot)).toBe(true)
    expect(SHIP_COSMETICS.filter(c => c.slot === 'calculator').map(c => c.name)).toEqual(['BA II Plus', 'TI-30XS MultiView'])
  })

  it('gives a paint its colours and a trail its colour', () => {
    for (const c of SHIP_COSMETICS) {
      if (c.slot === 'hull') expect(c.hull).toBeDefined()
      if (c.slot === 'trail') expect(c.trail).toBeDefined()
    }
  })

  it('sells everything but the raid’s reward, which the database grants', () => {
    expect(storeShips().some(c => c.raidOnly)).toBe(false)
    expect(shipCosmetic(STOP_LOSS_SHIELD)).toMatchObject({ slot: 'decal', raidOnly: true })
  })

  it('stores an equipped id through the prefs parser unchanged', () => {
    const ship = { hull: 'ship:hull:cobalt', trail: 'ship:trail:ion', calculator: 'ship:calculator:ba-ii-plus', decal: 'ship:decal:stop-loss-shield' }
    expect(parsePrefs({ ship }).ship).toEqual(ship)
  })
})

describe('the ship as drawn', () => {
  const owned = new Set(['ship:hull:cobalt', 'ship:trail:ion'])

  it('is the stock ship with nothing equipped', () => {
    expect(shipView(stock, owned)).toEqual({
      look: { hull: null, trail: null, calculator: null, decal: null },
      labels: { hull: STOCK, trail: STOCK, calculator: STOCK, decal: 'None' },
    })
  })

  it('wears what is equipped and owned', () => {
    const view = shipView({ hull: 'ship:hull:cobalt', trail: 'ship:trail:ion', calculator: null, decal: null }, owned)
    expect(view.look.hull).toEqual(shipCosmetic('ship:hull:cobalt')!.hull)
    expect(view.look.trail).toBe(shipCosmetic('ship:trail:ion')!.trail)
    expect(view.labels).toEqual({ hull: 'Cobalt', trail: 'Ion', calculator: STOCK, decal: 'None' })
  })

  it('draws the stock part for a slot naming something not owned', () => {
    const view = shipView({ hull: 'ship:hull:nebula', trail: null, calculator: 'ship:calculator:ti-30xs', decal: 'ship:decal:stop-loss-shield' }, owned)
    expect(view.labels).toEqual({ hull: STOCK, trail: STOCK, calculator: STOCK, decal: 'None' })
  })

  it('trusts the slots while ownership is still being read', () => {
    expect(shipView({ ...stock, hull: 'ship:hull:nebula' }, null).labels.hull).toBe('Nebula')
  })

  it('ignores an id that is not in the catalogue', () => {
    expect(shipView({ ...stock, hull: 'ship:hull:gold-plated' }, null).labels.hull).toBe(STOCK)
  })
})

describe('equipping', () => {
  const owned = new Set(['ship:hull:cobalt', 'ship:hull:graphite'])

  it('puts an owned item in its own slot, replacing what was there', () => {
    expect(equipPatch(stock, 'ship:hull:cobalt', owned)).toEqual({ hull: 'ship:hull:cobalt' })
    expect(equipPatch({ ...stock, hull: 'ship:hull:cobalt' }, 'ship:hull:graphite', owned)).toEqual({ hull: 'ship:hull:graphite' })
  })

  it('takes it off again', () => {
    expect(equipPatch({ ...stock, hull: 'ship:hull:cobalt' }, 'ship:hull:cobalt', owned)).toEqual({ hull: null })
  })

  it('never equips what the player does not own', () => {
    expect(equipPatch(stock, 'ship:hull:nebula', owned)).toBeNull()
    expect(equipPatch(stock, 'ship:hull:unknown', new Set(['ship:hull:unknown']))).toBeNull()
  })

  it('reads ship ids out of the whole inventory', () => {
    expect([...ownedShipIds(['fox:crimson', 'ship:trail:ion', 'banner:custom'])]).toEqual(['ship:trail:ion'])
  })

  it('lists a slot owned-first', () => {
    expect(slotCosmetics('hull', new Set(['ship:hull:nebula']))[0].id).toBe('ship:hull:nebula')
  })
})
