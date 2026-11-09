import { describe, expect, it } from 'vitest'
import { authErrorMessage } from './authMessages'

describe('authErrorMessage', () => {
  it('says what went wrong for the errors Supabase sends', () => {
    expect(authErrorMessage('Invalid login credentials')).toBe('Wrong email or password. Check both and try again.')
    expect(authErrorMessage('Email not confirmed')).toMatch(/isn’t confirmed/)
    expect(authErrorMessage('User already registered', 'signup')).toMatch(/Sign in instead/)
    expect(authErrorMessage('Email rate limit exceeded')).toMatch(/Wait a minute/)
  })

  it('never passes the raw message through', () => {
    const raw = 'AuthApiError: unexpected_failure 500'
    expect(authErrorMessage(raw)).not.toContain(raw)
    expect(authErrorMessage(raw, 'signup')).toMatch(/couldn’t be created/)
    expect(authErrorMessage(raw, 'password')).toMatch(/couldn’t be changed/)
  })
})
