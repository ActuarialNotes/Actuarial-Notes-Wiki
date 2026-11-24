import { describe, expect, it } from 'vitest'
import { CARD_BACK_PARTS, deckCountLabel, opensDeck, toggleBackPart, type CardBackPart } from './flashcardDeck'

describe('deckCountLabel', () => {
  it('counts one card in the singular', () => {
    expect(deckCountLabel(1)).toBe('1 card')
    expect(deckCountLabel(0)).toBe('0 cards')
    expect(deckCountLabel(6)).toBe('6 cards')
    expect(deckCountLabel(1200)).toBe('1,200 cards')
  })
})

describe('opensDeck', () => {
  it('opens the deck for the links that asked for it or for the old gallery', () => {
    expect(opensDeck('deck')).toBe(true)
    expect(opensDeck('gallery')).toBe(true)
  })
  it('leaves the card on screen for anything else', () => {
    expect(opensDeck(null)).toBe(false)
    expect(opensDeck('')).toBe(false)
    expect(opensDeck('study')).toBe(false)
  })
})

describe('toggleBackPart', () => {
  it('switches one part and leaves the set it was given alone', () => {
    const before = new Set<CardBackPart>(['definition', 'math'])
    const without = toggleBackPart(before, 'math')
    expect([...without]).toEqual(['definition'])
    expect([...before]).toEqual(['definition', 'math'])
    expect(toggleBackPart(without, 'images').has('images')).toBe(true)
  })
  it('names every part once', () => {
    expect(CARD_BACK_PARTS.map(p => p.part)).toEqual(['definition', 'math', 'images'])
  })
})
