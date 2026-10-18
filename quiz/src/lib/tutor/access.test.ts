import { describe, expect, it } from 'vitest'
import { TUTOR_APPROVED_EMAILS, TUTOR_STAGE, canUseTutor, isTutorApproved, tutorPreviewRequested } from './access'

describe('who gets the Tutor', () => {
  it('is in Preview, for the one approved account', () => {
    expect(TUTOR_STAGE).toBe('preview')
    expect(TUTOR_APPROVED_EMAILS).toEqual(['jordan@actuarialnotes.com'])
  })

  it('in Preview: the approved account, signed in, and nobody else — Pro or not', () => {
    expect(canUseTutor({ signedIn: true, email: 'jordan@actuarialnotes.com' }, 'preview')).toBe(true)
    expect(canUseTutor({ signedIn: true, email: 'someone@example.com', isPro: true }, 'preview')).toBe(false)
    expect(canUseTutor({ signedIn: false, email: 'jordan@actuarialnotes.com' }, 'preview')).toBe(false)
  })

  it('in Beta: the approved accounts and every Pro subscriber', () => {
    expect(canUseTutor({ signedIn: true, email: 'someone@example.com', isPro: true }, 'beta')).toBe(true)
    expect(canUseTutor({ signedIn: true, email: 'someone@example.com', isPro: false }, 'beta')).toBe(false)
    expect(canUseTutor({ signedIn: true, email: 'jordan@actuarialnotes.com', isPro: false }, 'beta')).toBe(true)
  })

  it('when open: every signed-in account, never a signed-out one', () => {
    expect(canUseTutor({ signedIn: true, email: 'someone@example.com' }, 'open')).toBe(true)
    expect(canUseTutor({ signedIn: false }, 'open')).toBe(false)
  })

  it('matches the email case-insensitively and nothing near it', () => {
    expect(isTutorApproved('  Jordan@ActuarialNotes.com ')).toBe(true)
    expect(isTutorApproved('jordan@actuarialnotes.co')).toBe(false)
    expect(isTutorApproved(null)).toBe(false)
  })
})

describe('the preview build’s request', () => {
  it('is a page asking by name, and nothing else', () => {
    expect(tutorPreviewRequested({ getItem: k => (k === 'actuarial_tutor_preview' ? 'on' : null) })).toBe(true)
    expect(tutorPreviewRequested({ getItem: () => null })).toBe(false)
    expect(tutorPreviewRequested({ getItem: () => { throw new Error('blocked') } })).toBe(false)
    expect(tutorPreviewRequested(null)).toBe(false)
  })
})
