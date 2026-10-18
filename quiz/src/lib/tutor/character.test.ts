import { describe, expect, it } from 'vitest'
import { serializeAvatar } from '../avatar'
import { CHARACTERS } from '../characters'
import { DEFAULT_TUTOR_ANIMAL, tutorCharacter } from './character'

describe('the Tutor’s character', () => {
  it('is the account’s own, with the colourway bought for it', () => {
    const url = serializeAvatar({ type: 'animal', value: 'fox', variant: 'crimson' })
    expect(tutorCharacter(url)).toEqual({ avatarUrl: url, animal: 'fox', variant: 'crimson', name: 'Red Fox', chosen: true })
  })

  it('is a bought character in its own colours', () => {
    const url = serializeAvatar({ type: 'animal', value: 'owl' })
    expect(tutorCharacter(url)).toMatchObject({ animal: 'owl', variant: null, name: 'Owl', chosen: true })
  })

  it('is the first free character for an account with none equipped', () => {
    for (const none of [null, '', serializeAvatar({ type: 'color', value: '#475569' }), 'https://example.com/me.png']) {
      const c = tutorCharacter(none)
      expect(c).toMatchObject({ animal: DEFAULT_TUTOR_ANIMAL, chosen: false })
      expect(c.avatarUrl).toBe(serializeAvatar({ type: 'animal', value: DEFAULT_TUTOR_ANIMAL }))
    }
    expect(CHARACTERS.find(c => c.animal === DEFAULT_TUTOR_ANIMAL)?.free).toBe(true)
  })
})
