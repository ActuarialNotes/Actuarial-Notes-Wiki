import { describe, it, expect } from 'vitest'
import { isSoundEvent, resolveInteractionSound, type InteractionTarget } from './soundInteractions'

function target(partial: Partial<InteractionTarget> & { tag: string }): InteractionTarget {
  return partial
}

describe('resolveInteractionSound', () => {
  it('clicks for the ordinary controls', () => {
    expect(resolveInteractionSound(target({ tag: 'BUTTON' }))).toBe('click')
    expect(resolveInteractionSound(target({ tag: 'a' }))).toBe('click')
    expect(resolveInteractionSound(target({ tag: 'summary' }))).toBe('click')
    expect(resolveInteractionSound(target({ tag: 'div', role: 'button' }))).toBe('click')
    expect(resolveInteractionSound(target({ tag: 'li', role: 'menuitem' }))).toBe('click')
  })

  it('stays silent for text entry and for anything unrecognised', () => {
    expect(resolveInteractionSound(target({ tag: 'input', type: 'text' }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'textarea' }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'select' }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'input', type: 'range' }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'div' }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'p' }))).toBeNull()
    expect(resolveInteractionSound(null)).toBeNull()
  })

  it('says which way a toggle just flipped', () => {
    expect(resolveInteractionSound(target({ tag: 'input', type: 'checkbox', checked: false }))).toBe('toggleOn')
    expect(resolveInteractionSound(target({ tag: 'input', type: 'checkbox', checked: true }))).toBe('toggleOff')
    expect(resolveInteractionSound(target({ tag: 'button', role: 'switch', checked: true }))).toBe('toggleOff')
    expect(resolveInteractionSound(target({ tag: 'div', role: 'menuitemcheckbox', checked: false }))).toBe('toggleOn')
  })

  it('uses the softer cue for picking one of several', () => {
    expect(resolveInteractionSound(target({ tag: 'input', type: 'radio' }))).toBe('select')
    expect(resolveInteractionSound(target({ tag: 'div', role: 'tab' }))).toBe('select')
    expect(resolveInteractionSound(target({ tag: 'div', role: 'option' }))).toBe('select')
  })

  it('lets data-sound override the default', () => {
    expect(resolveInteractionSound(target({ tag: 'button', explicit: 'open' }))).toBe('open')
    expect(resolveInteractionSound(target({ tag: 'div', explicit: 'page' }))).toBe('page')
    expect(resolveInteractionSound(target({ tag: 'input', type: 'text', explicit: 'correct' }))).toBe('correct')
  })

  it('lets data-sound="none" silence a control that would otherwise click', () => {
    expect(resolveInteractionSound(target({ tag: 'button', explicit: 'none' }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'div', role: 'button', explicit: ' none ' }))).toBeNull()
  })

  it('ignores a data-sound naming a cue that does not exist', () => {
    expect(resolveInteractionSound(target({ tag: 'button', explicit: 'kaboom' }))).toBeNull()
  })

  it('never makes a sound for a disabled control, whatever it asks for', () => {
    expect(resolveInteractionSound(target({ tag: 'button', disabled: true }))).toBeNull()
    expect(resolveInteractionSound(target({ tag: 'div', role: 'button', disabled: true, explicit: 'correct' }))).toBeNull()
  })
})

describe('isSoundEvent', () => {
  it('recognises catalogue names only', () => {
    expect(isSoundEvent('correct')).toBe(true)
    expect(isSoundEvent('open')).toBe(true)
    expect(isSoundEvent('wrong')).toBe(false)
    expect(isSoundEvent('none')).toBe(false)
    expect(isSoundEvent('')).toBe(false)
  })
})
