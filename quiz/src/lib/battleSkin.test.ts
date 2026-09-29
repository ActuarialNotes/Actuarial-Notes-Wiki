import { describe, expect, it } from 'vitest'
import { joinPath } from './battleRoom'
import { ACTUARIA_SKIN, PLAIN_SKIN, battleSkin, claimsReviewPath, skinJoinPath } from './battleSkin'

describe('battle skins (docs/actuaria-online.md §6.8)', () => {
  it('leaves Quiz Battle’s own page in its own words', () => {
    expect(battleSkin(undefined)).toBe(PLAIN_SKIN)
    expect(PLAIN_SKIN.title).toBe('Quiz Battle')
    expect(PLAIN_SKIN.lobby).toEqual({ title: 'Random opponent', plain: null })
    expect(PLAIN_SKIN.reviewMisses).toBe(false)
    // The plain skin's invite link is the one Quiz Battle has always made.
    expect(skinJoinPath(PLAIN_SKIN, 'AB2C')).toBe(joinPath('AB2C'))
  })

  it('renames the ways in under the Actuaria skin, each carrying its plain name', () => {
    const skin = battleSkin('actuaria')
    expect(skin).toBe(ACTUARIA_SKIN)
    expect(skin.title).toBe('Monte Carlo Station')
    expect(skin.lobby).toEqual({ title: 'Open channel', plain: 'Random opponent' })
    expect(skin.friend).toEqual({ title: 'Private channel', plain: 'A friend online' })
    expect(skin.local).toEqual({ title: 'Dogfight', plain: 'Same screen' })
    expect(skin.home.path).toBe('/actuaria/map')
    expect(skin.review).toBe('Claims review')
    expect(skin.reviewMisses).toBe(true)
    expect(skin.abilities).toBe(true)
    expect(PLAIN_SKIN.abilities).toBe(false)
  })

  it('invites a friend to the page the room was made on — the code is the same room either way', () => {
    expect(skinJoinPath(ACTUARIA_SKIN, 'AB2C')).toBe('/actuaria/battle?join=AB2C')
    expect(skinJoinPath(PLAIN_SKIN, 'AB2C')).toBe('/battle?join=AB2C')
  })

  it('opens a claims review as an ordinary quiz, by id', () => {
    expect(claimsReviewPath(['p-1', 'p 2'])).toBe('/quiz?ids=p-1,p%202')
  })
})
