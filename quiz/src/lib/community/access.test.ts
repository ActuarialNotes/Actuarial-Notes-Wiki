import { describe, expect, it } from 'vitest'
import { COMMUNITY_APPROVED_EMAILS, canEnterCommunity, isCommunityApproved } from './access'

describe('Community access', () => {
  it('is open to the approved account alone', () => {
    expect(COMMUNITY_APPROVED_EMAILS).toEqual(['jordan@actuarialnotes.com'])
    expect(canEnterCommunity({ signedIn: true, email: 'jordan@actuarialnotes.com' })).toBe(true)
    expect(canEnterCommunity({ signedIn: true, email: ' Jordan@ActuarialNotes.com ' })).toBe(true)
    expect(canEnterCommunity({ signedIn: true, email: 'someone@example.com' })).toBe(false)
  })

  it('is closed when signed out, whatever the email', () => {
    expect(canEnterCommunity({ signedIn: false, email: 'jordan@actuarialnotes.com' })).toBe(false)
    expect(isCommunityApproved(null)).toBe(false)
  })

  it('opens to everyone only in the preview build', () => {
    expect(canEnterCommunity({ signedIn: false }, true)).toBe(true)
  })
})
