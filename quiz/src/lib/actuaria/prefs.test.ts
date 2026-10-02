import { describe, expect, it } from 'vitest'
import { cleanLoadout, defaultPrefs, parsePrefs, prefsToRow, rowToPrefs, withPatch } from './prefs'

describe('Actuaria prefs', () => {
  it('starts with Reinsurance equipped, the title unseen and the hub card up', () => {
    expect(defaultPrefs()).toEqual({
      loadout: ['reinsurance'],
      hubDismissed: false,
      titleSeen: false,
      ship: { hull: null, trail: null, calculator: null, decal: null },
    })
  })

  it('reads anything unreadable as the default', () => {
    for (const raw of [null, undefined, 3, 'x', [], { hubDismissed: 'yes' }]) {
      expect(parsePrefs(raw).hubDismissed).toBe(false)
    }
    expect(parsePrefs({ titleSeen: true }).titleSeen).toBe(true)
  })

  it('keeps a loadout to three distinct ids', () => {
    expect(cleanLoadout(['a', 'a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c'])
    expect(cleanLoadout(['a', 4, '', 'x'.repeat(80), 'b'])).toEqual(['a', 'b'])
    expect(cleanLoadout('reinsurance')).toEqual(['reinsurance'])
    // An empty loadout is a choice, and is kept.
    expect(parsePrefs({ loadout: [] }).loadout).toEqual([])
  })

  it('only puts a slot’s own kind of cosmetic in it', () => {
    const prefs = parsePrefs({ ship: { hull: 'ship:hull:nebula', trail: 'ship:hull:nebula', calculator: 'fox:arctic' } })
    expect(prefs.ship).toEqual({ hull: 'ship:hull:nebula', trail: null, calculator: null, decal: null })
  })

  it('round-trips through the user_actuaria row', () => {
    const prefs = withPatch(defaultPrefs(), { titleSeen: true, loadout: ['reinsurance', 'double-down'], ship: { hull: 'ship:hull:nebula', trail: null, calculator: null, decal: null } })
    const row = prefsToRow('u1', prefs)
    expect(row).toMatchObject({ user_id: 'u1', title_seen: true, hub_dismissed: false, loadout: ['reinsurance', 'double-down'] })
    expect(rowToPrefs(row)).toEqual(prefs)
    expect(rowToPrefs(null)).toBeNull()
  })

  it('patches one ship slot without clearing the others', () => {
    const start = withPatch(defaultPrefs(), { ship: { hull: 'ship:hull:nebula', trail: 'ship:trail:ion', calculator: null, decal: null } })
    const next = withPatch(start, { ship: { ...start.ship, trail: null } })
    expect(next.ship).toEqual({ hull: 'ship:hull:nebula', trail: null, calculator: null, decal: null })
  })
})
