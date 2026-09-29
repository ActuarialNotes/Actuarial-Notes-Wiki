import { describe, expect, it } from 'vitest'
import { BATTLE_WORDS, LEXICON, plainTerm, sectorName, term } from './lexicon'

describe('the Actuaria lexicon', () => {
  it('gives every in-world word a plain app term', () => {
    for (const [id, entry] of Object.entries(LEXICON)) {
      expect(entry.term.trim(), id).not.toBe('')
      expect(entry.plain.trim(), id).not.toBe('')
    }
  })

  it('reads a word and its plain term by id', () => {
    expect(term('sector')).toBe('Sector')
    expect(plainTerm('sector')).toBe('An exam')
    expect(term('coverage')).toBe('Coverage')
    expect(plainTerm('coverage')).toMatch(/streak/i)
  })

  it('keeps gems called gems (D3) — one balance, one name', () => {
    expect(term('gems')).toBe('Gems')
    const words = Object.values(LEXICON).map(e => e.term.toLowerCase())
    expect(words).not.toContain('premium')
  })

  it('names a sector the way the exam logo cuts the key', () => {
    expect(sectorName('P')).toBe('Sector P')
    expect(sectorName('MAS-I')).toBe('Sector MAS-I')
    expect(sectorName('CAS-5')).toBe('Sector 5')
  })

  it('carries each way into a battle with its plain name (§6.8)', () => {
    expect(BATTLE_WORDS.lobby).toBe('Open channel')
    expect(BATTLE_WORDS.lobbyPlain).toBe('Random opponent')
    expect(BATTLE_WORDS.friend).toBe('Private channel')
    expect(BATTLE_WORDS.friendPlain).toBe('A friend online')
    expect(BATTLE_WORDS.local).toBe('Dogfight')
    expect(BATTLE_WORDS.localPlain).toBe('Same screen')
    expect(BATTLE_WORDS.title).toBe('Monte Carlo Station')
  })

  it('has no ranks, hulls or hit points — the canvas words the spec dropped (§11, D4)', () => {
    const words = Object.values(LEXICON).map(e => e.term.toLowerCase()).join(' ')
    for (const dropped of ['cadet', 'admiral', 'hull', 'hp', 'rating']) {
      expect(words).not.toMatch(new RegExp(`\\b${dropped}\\b`))
    }
    // Surplus is only ever the in-world word for points.
    expect(LEXICON.surplus.plain).toMatch(/points/i)
  })
})
