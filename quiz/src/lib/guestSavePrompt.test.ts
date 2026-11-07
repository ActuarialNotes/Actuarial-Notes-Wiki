import { describe, expect, it } from 'vitest'
import {
  GUEST_SAVE_PROMPT_KEY,
  markGuestSavePromptAsked,
  readGuestSavePromptAsked,
  shouldAskGuestToSave,
} from './guestSavePrompt'

const base = { authLoading: false, signedIn: false, finishedAsGuest: true, alreadyAsked: false }

function memoryStorage() {
  const map = new Map<string, string>()
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => { map.set(k, v) },
  }
}

describe('shouldAskGuestToSave', () => {
  it('asks a guest after their first finished quiz', () => {
    expect(shouldAskGuestToSave(base)).toBe(true)
  })

  it('never asks twice', () => {
    expect(shouldAskGuestToSave({ ...base, alreadyAsked: true })).toBe(false)
  })

  it('does not ask a signed-in reader, or while auth is resolving', () => {
    expect(shouldAskGuestToSave({ ...base, signedIn: true })).toBe(false)
    expect(shouldAskGuestToSave({ ...base, authLoading: true })).toBe(false)
  })

  it('does not ask over a quiz that was finished signed in', () => {
    expect(shouldAskGuestToSave({ ...base, finishedAsGuest: false })).toBe(false)
  })
})

describe('the asked flag', () => {
  it('round-trips through storage', () => {
    const storage = memoryStorage()
    expect(readGuestSavePromptAsked(storage)).toBe(false)
    markGuestSavePromptAsked(storage, new Date('2026-11-07T12:00:00Z'))
    expect(storage.getItem(GUEST_SAVE_PROMPT_KEY)).toBe('2026-11-07T12:00:00.000Z')
    expect(readGuestSavePromptAsked(storage)).toBe(true)
  })

  it('reads as asked when storage is missing or throws', () => {
    expect(readGuestSavePromptAsked(null)).toBe(true)
    expect(readGuestSavePromptAsked({ getItem: () => { throw new Error('blocked') } })).toBe(true)
  })
})
