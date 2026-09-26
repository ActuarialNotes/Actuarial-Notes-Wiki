import { describe, it, expect } from 'vitest'
import {
  APP_MODES,
  DEFAULT_MODE,
  PREVIEW_APPROVED_EMAILS,
  canEnterMode,
  isModeVisible,
  isPreviewApproved,
  modeDestination,
  modeForPath,
  modeLockReason,
  modeSpec,
  showsModeSwitcher,
  visibleModes,
} from './appMode'

const PRO = { signedIn: true, isPro: true, email: 'someone@example.com' }
const FREE = { signedIn: true, isPro: false, email: 'someone@example.com' }
const GUEST = { signedIn: false, isPro: false }
const APPROVED = { signedIn: true, isPro: false, email: 'jordan@actuarialnotes.com' }
const APPROVED_PRO = { ...APPROVED, isPro: true }

describe('modeForPath', () => {
  it('claims the cowork tree for cowork', () => {
    expect(modeForPath('/cowork')).toBe('cowork')
    expect(modeForPath('/cowork/deliverables')).toBe('cowork')
    expect(modeForPath('/cowork/sources/fsra')).toBe('cowork')
  })

  it('leaves every study route in study mode', () => {
    for (const path of ['/', '/dashboard', '/wiki/concept/Expected+Value', '/flashcards', '/settings']) {
      expect(modeForPath(path)).toBe('study')
    }
  })

  it('does not claim a route that merely starts with the same letters', () => {
    expect(modeForPath('/coworkers')).toBe('study')
  })

  it('falls back to the default mode for anything unclaimed', () => {
    expect(modeForPath('/nonsense')).toBe(DEFAULT_MODE)
  })
})

describe('modeSpec', () => {
  it('returns the spec for every declared mode', () => {
    for (const mode of APP_MODES) {
      expect(modeSpec(mode.id).label).toBe(mode.label)
    }
  })

  it('marks Cowork as Pro-only and in preview', () => {
    const cowork = modeSpec('cowork')
    expect(cowork.access).toBe('pro')
    expect(cowork.preview).toBe(true)
  })

  it('leaves Study open to everyone and out of preview', () => {
    const study = modeSpec('study')
    expect(study.access).toBe('open')
    expect(study.preview).toBe(false)
  })
})

describe('preview approval', () => {
  it('approves jordan@actuarialnotes.com, ignoring case and whitespace', () => {
    expect(PREVIEW_APPROVED_EMAILS).toContain('jordan@actuarialnotes.com')
    expect(isPreviewApproved('jordan@actuarialnotes.com')).toBe(true)
    expect(isPreviewApproved('  Jordan@ActuarialNotes.com ')).toBe(true)
  })

  it('approves no one else', () => {
    expect(isPreviewApproved('someone@example.com')).toBe(false)
    expect(isPreviewApproved('jordan@actuarialnotes.co')).toBe(false)
    expect(isPreviewApproved('')).toBe(false)
    expect(isPreviewApproved(null)).toBe(false)
    expect(isPreviewApproved(undefined)).toBe(false)
  })
})

describe('mode visibility', () => {
  it('shows study to everyone', () => {
    for (const viewer of [GUEST, FREE, PRO, APPROVED]) {
      expect(isModeVisible('study', viewer)).toBe(true)
    }
  })

  it('hides cowork from every account that is not approved, Pro included', () => {
    expect(isModeVisible('cowork', GUEST)).toBe(false)
    expect(isModeVisible('cowork', FREE)).toBe(false)
    expect(isModeVisible('cowork', PRO)).toBe(false)
  })

  it('does not trust an approved email on a signed-out viewer', () => {
    expect(isModeVisible('cowork', { ...APPROVED, signedIn: false })).toBe(false)
  })

  it('shows cowork to an approved account', () => {
    expect(isModeVisible('cowork', APPROVED)).toBe(true)
    expect(visibleModes(APPROVED).map(m => m.id)).toEqual(['study', 'cowork'])
  })

  it('draws the switcher only for a viewer with somewhere to switch to', () => {
    expect(showsModeSwitcher(GUEST)).toBe(false)
    expect(showsModeSwitcher(FREE)).toBe(false)
    expect(showsModeSwitcher(PRO)).toBe(false)
    expect(showsModeSwitcher(APPROVED)).toBe(true)
  })
})

describe('canEnterMode', () => {
  it('lets anyone into study', () => {
    expect(canEnterMode('study', GUEST)).toBe(true)
    expect(canEnterMode('study', FREE)).toBe(true)
  })

  it('lets only approved accounts into cowork while it is in preview', () => {
    expect(canEnterMode('cowork', APPROVED)).toBe(true)
    expect(canEnterMode('cowork', APPROVED_PRO)).toBe(true)
    expect(canEnterMode('cowork', PRO)).toBe(false)
    expect(canEnterMode('cowork', FREE)).toBe(false)
    expect(canEnterMode('cowork', GUEST)).toBe(false)
  })
})

describe('modeLockReason', () => {
  it('says nothing about a mode the viewer may enter', () => {
    expect(modeLockReason('cowork', APPROVED)).toBeNull()
    expect(modeLockReason('study', GUEST)).toBeNull()
  })
})

describe('modeDestination', () => {
  it('sends an entitled viewer to the mode home', () => {
    expect(modeDestination('cowork', APPROVED)).toBe('/cowork')
    expect(modeDestination('study', GUEST)).toBe('/dashboard')
  })

  it('sends anyone not approved for a preview mode back to the dashboard', () => {
    expect(modeDestination('cowork', PRO)).toBe('/dashboard')
    expect(modeDestination('cowork', FREE)).toBe('/dashboard')
    expect(modeDestination('cowork', GUEST)).toBe('/dashboard')
  })
})
