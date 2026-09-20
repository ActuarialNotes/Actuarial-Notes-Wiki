import { describe, it, expect } from 'vitest'
import {
  APP_MODES,
  DEFAULT_MODE,
  canEnterMode,
  modeDestination,
  modeForPath,
  modeLockReason,
  modeSpec,
} from './appMode'

const PRO = { signedIn: true, isPro: true }
const FREE = { signedIn: true, isPro: false }
const GUEST = { signedIn: false, isPro: false }

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

describe('canEnterMode', () => {
  it('lets anyone into study', () => {
    expect(canEnterMode('study', GUEST)).toBe(true)
    expect(canEnterMode('study', FREE)).toBe(true)
  })

  it('lets only an active Pro into cowork', () => {
    expect(canEnterMode('cowork', PRO)).toBe(true)
    expect(canEnterMode('cowork', FREE)).toBe(false)
    expect(canEnterMode('cowork', GUEST)).toBe(false)
  })
})

describe('modeLockReason', () => {
  it('says nothing about a mode the viewer may enter', () => {
    expect(modeLockReason('cowork', PRO)).toBeNull()
    expect(modeLockReason('study', GUEST)).toBeNull()
  })

  it('asks a signed-out viewer to sign in, and a free one to upgrade', () => {
    expect(modeLockReason('cowork', GUEST)).toMatch(/sign in/i)
    expect(modeLockReason('cowork', FREE)).toMatch(/pro/i)
  })
})

describe('modeDestination', () => {
  it('sends an entitled viewer to the mode home', () => {
    expect(modeDestination('cowork', PRO)).toBe('/cowork')
    expect(modeDestination('study', GUEST)).toBe('/dashboard')
  })

  it('sends a free account to upgrade and a guest to sign in', () => {
    expect(modeDestination('cowork', FREE)).toBe('/upgrade')
    expect(modeDestination('cowork', GUEST)).toBe('/auth')
  })
})
