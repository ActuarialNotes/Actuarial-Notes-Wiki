import { describe, expect, it } from 'vitest'
import { canUseWorkflows, isPreviewApproved } from './workflowsAccess'

describe('isPreviewApproved', () => {
  it('matches an approved email case-insensitively, trimmed', () => {
    expect(isPreviewApproved('jordan@actuarialnotes.com')).toBe(true)
    expect(isPreviewApproved('  Jordan@ActuarialNotes.com ')).toBe(true)
  })
  it('refuses anyone else, and no email at all', () => {
    expect(isPreviewApproved('someone@example.com')).toBe(false)
    expect(isPreviewApproved('jordan@actuarialnotes.co')).toBe(false)
    expect(isPreviewApproved('')).toBe(false)
    expect(isPreviewApproved(null)).toBe(false)
    expect(isPreviewApproved(undefined)).toBe(false)
  })
})

describe('canUseWorkflows', () => {
  it('lets in an approved, signed-in account only', () => {
    expect(canUseWorkflows({ signedIn: true, email: 'jordan@actuarialnotes.com' })).toBe(true)
    expect(canUseWorkflows({ signedIn: true, email: 'someone@example.com' })).toBe(false)
    expect(canUseWorkflows({ signedIn: false, email: 'jordan@actuarialnotes.com' })).toBe(false)
    expect(canUseWorkflows({ signedIn: false })).toBe(false)
  })
  it('opens to everyone in the preview build', () => {
    expect(canUseWorkflows({ signedIn: false }, true)).toBe(true)
  })
})
