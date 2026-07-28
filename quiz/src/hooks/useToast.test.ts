import { describe, it, expect, beforeEach } from 'vitest'
import { useToast, addedToDeckMessage, showAddedToDeck } from './useToast'

beforeEach(() => {
  useToast.setState({ toast: null })
})

describe('addedToDeckMessage', () => {
  it('reads as a single confirmation for one card', () => {
    expect(addedToDeckMessage(1)).toBe('Added to Deck')
  })

  it('counts the cards for a batch', () => {
    expect(addedToDeckMessage(27)).toBe('27 cards added to Deck')
  })
})

describe('showAddedToDeck', () => {
  it('shows nothing when no card was actually added', () => {
    showAddedToDeck(0)
    expect(useToast.getState().toast).toBeNull()
  })

  it('replaces the visible toast rather than stacking', () => {
    showAddedToDeck(1)
    const first = useToast.getState().toast
    showAddedToDeck(3)
    const second = useToast.getState().toast
    expect(second?.message).toBe('3 cards added to Deck')
    expect(second?.id).not.toBe(first?.id)
  })
})

describe('dismissToast', () => {
  it('ignores a stale dismiss from a replaced toast', () => {
    showAddedToDeck(1)
    const stale = useToast.getState().toast!
    showAddedToDeck(2)
    useToast.getState().dismissToast(stale.id)
    expect(useToast.getState().toast?.message).toBe('2 cards added to Deck')
  })

  it('dismisses the matching toast', () => {
    showAddedToDeck(1)
    useToast.getState().dismissToast(useToast.getState().toast!.id)
    expect(useToast.getState().toast).toBeNull()
  })
})
