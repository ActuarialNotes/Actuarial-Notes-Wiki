import { describe, expect, it } from 'vitest'
import { ACTUARIA_APPROVED_EMAILS, actuariaDestination, canEnterActuaria, isActuariaApproved } from './access'

describe('entering Actuaria', () => {
  it('is for a signed-in, approved account', () => {
    expect(canEnterActuaria({ signedIn: true, email: 'jordan@actuarialnotes.com' }, false)).toBe(true)
    expect(canEnterActuaria({ signedIn: true, email: 'someone@example.com' }, false)).toBe(false)
    expect(canEnterActuaria({ signedIn: true, email: null }, false)).toBe(false)
    expect(canEnterActuaria({ signedIn: false, email: 'jordan@actuarialnotes.com' }, false)).toBe(false)
  })

  it('matches the email case-insensitively and nothing near it', () => {
    expect(isActuariaApproved('  Jordan@ActuarialNotes.com ')).toBe(true)
    expect(isActuariaApproved('jordan@actuarialnotes.co')).toBe(false)
    expect(isActuariaApproved('')).toBe(false)
    expect(isActuariaApproved(undefined)).toBe(false)
  })

  it('is open to anyone in a preview build', () => {
    expect(canEnterActuaria({ signedIn: false }, true)).toBe(true)
  })

  it('sends everyone else to sign in, then to the dashboard', () => {
    expect(actuariaDestination({ signedIn: false })).toBe('/auth')
    expect(actuariaDestination({ signedIn: true, email: 'someone@example.com' })).toBe('/dashboard')
  })
})

describe('the database holds cohorts to the same list', () => {
  it('approves exactly the accounts the app does', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const sql = readFileSync(fileURLToPath(new URL('../../../../supabase/migrations/20261002_actuaria_approved.sql', import.meta.url)), 'utf8')
    const list = sql.match(/lower\(u\.email\) = ANY \(ARRAY\[([^\]]*)\]\)/)
    expect(list).not.toBeNull()
    const emails = [...list![1].matchAll(/'([^']*)'/g)].map(m => m[1])
    expect(emails).toEqual(ACTUARIA_APPROVED_EMAILS.map(e => e.toLowerCase()))
    // Both ways into a cohort check it.
    expect(sql.match(/IF NOT actuaria_is_approved\(v_user\) THEN/g)).toHaveLength(2)
  })
})
