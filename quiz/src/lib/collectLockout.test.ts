import { describe, it, expect } from 'vitest'
import {
  COLLECT_LOCKOUT_STEPS_MS,
  clearLockout,
  formatLockoutRemaining,
  formatLockoutShort,
  isLockedOut,
  lockoutDurationMs,
  lockoutFor,
  nextLockoutDurationMs,
  registerMiss,
  remainingLockoutMs,
  sanitizeLockouts,
  type CollectLockouts,
} from './collectLockout'

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const T0 = Date.UTC(2026, 7, 18, 10, 39)

describe('collect lockout escalation', () => {
  it('locks for 30 minutes on the first miss', () => {
    const after = registerMiss({}, 'Report Year', T0)
    expect(lockoutFor(after, 'Report Year')).toEqual({ misses: 1, lockedUntil: T0 + 30 * MINUTE })
    expect(isLockedOut(lockoutFor(after, 'Report Year'), T0 + 29 * MINUTE)).toBe(true)
    expect(isLockedOut(lockoutFor(after, 'Report Year'), T0 + 30 * MINUTE)).toBe(false)
  })

  it('locks for a day on the second miss, a wait after the first lifted', () => {
    const first = registerMiss({}, 'Report Year', T0)
    // The reader waited it out, came back, and missed again.
    const retryAt = T0 + 45 * MINUTE
    const second = registerMiss(first, 'Report Year', retryAt)
    expect(lockoutFor(second, 'Report Year')).toEqual({ misses: 2, lockedUntil: retryAt + DAY })
  })

  it('keeps the day-long wait for every further miss', () => {
    let state: CollectLockouts = {}
    let now = T0
    for (let i = 0; i < 5; i++) {
      state = registerMiss(state, 'Report Year', now)
      now += remainingLockoutMs(lockoutFor(state, 'Report Year'), now) + MINUTE
    }
    expect(lockoutFor(state, 'Report Year')!.misses).toBe(5)
    expect(lockoutDurationMs(5)).toBe(DAY)
    expect(COLLECT_LOCKOUT_STEPS_MS).toEqual([30 * MINUTE, DAY])
  })

  it('never shortens a lock that is still running', () => {
    const first = registerMiss({}, 'Report Year', T0)
    // A second miss one minute in (a stale tab, say) must not trade the
    // remaining 29 minutes for a shorter wait — and here it earns a day.
    const second = registerMiss(first, 'Report Year', T0 + MINUTE)
    expect(remainingLockoutMs(lockoutFor(second, 'Report Year'), T0 + MINUTE)).toBe(DAY)
  })

  it('matches concepts case- and space-insensitively', () => {
    const state = registerMiss({}, '  report year  ', T0)
    expect(isLockedOut(lockoutFor(state, 'Report Year'), T0)).toBe(true)
  })

  it('warns with the wait the next miss would cost', () => {
    expect(nextLockoutDurationMs(undefined)).toBe(30 * MINUTE)
    const first = registerMiss({}, 'Report Year', T0)
    expect(nextLockoutDurationMs(lockoutFor(first, 'Report Year'))).toBe(DAY)
  })

  it('forgets a concept once it is collected', () => {
    const state = registerMiss({}, 'Report Year', T0)
    expect(clearLockout(state, 'report year')).toEqual({})
    // Clearing something that was never locked returns the same object.
    expect(clearLockout(state, 'Accident Year')).toBe(state)
  })

  it('treats an unknown concept as open', () => {
    expect(isLockedOut(lockoutFor({}, 'Report Year'), T0)).toBe(false)
    expect(remainingLockoutMs(undefined, T0)).toBe(0)
  })
})

describe('sanitizeLockouts', () => {
  it('keeps well-formed records and drops the rest', () => {
    const parsed = sanitizeLockouts({
      'report year': { misses: 2, lockedUntil: T0 + DAY },
      'Accident Year': { misses: 1.7, lockedUntil: T0 },
      'no misses': { misses: 0, lockedUntil: T0 },
      'bad shape': { lockedUntil: T0 },
      'not an object': 3,
      '': { misses: 1, lockedUntil: T0 },
    })
    expect(parsed).toEqual({
      'report year': { misses: 2, lockedUntil: T0 + DAY },
      'accident year': { misses: 1, lockedUntil: T0 },
    })
  })

  it('shrugs off junk', () => {
    expect(sanitizeLockouts(null)).toEqual({})
    expect(sanitizeLockouts('nope')).toEqual({})
    expect(sanitizeLockouts([{ misses: 1, lockedUntil: T0 }])).toEqual({})
  })
})

describe('formatting the wait', () => {
  it('rounds up so a live countdown never reads zero', () => {
    expect(formatLockoutRemaining(30 * MINUTE)).toBe('30 minutes')
    expect(formatLockoutRemaining(29 * MINUTE + 30_000)).toBe('30 minutes')
    expect(formatLockoutRemaining(MINUTE)).toBe('1 minute')
    expect(formatLockoutRemaining(59_500)).toBe('60 seconds')
    expect(formatLockoutRemaining(1)).toBe('1 second')
    expect(formatLockoutRemaining(0)).toBe('now')
    expect(formatLockoutRemaining(90 * MINUTE)).toBe('2 hours')
    expect(formatLockoutRemaining(DAY)).toBe('1 day')
    // The whole of the last hour of a day-long wait reads as a day, not as the
    // "24 hours" a plain hours-then-days split would produce.
    expect(formatLockoutRemaining(DAY - MINUTE)).toBe('1 day')
    // Anything past 23 hours rounds into the day rather than reading "24 hours".
    expect(formatLockoutRemaining(23 * HOUR + MINUTE)).toBe('1 day')
    expect(formatLockoutRemaining(23 * HOUR)).toBe('23 hours')
  })

  it('abbreviates for chips', () => {
    expect(formatLockoutShort(29 * MINUTE)).toBe('29m')
    expect(formatLockoutShort(90 * MINUTE)).toBe('2h')
    expect(formatLockoutShort(DAY)).toBe('1d')
    expect(formatLockoutShort(0)).toBe('0m')
  })
})
