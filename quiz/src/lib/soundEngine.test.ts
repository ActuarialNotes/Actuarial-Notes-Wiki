import { describe, it, expect } from 'vitest'
import {
  ACTIVATION_EVENTS,
  PENDING_CUE_MAX_AGE_MS,
  getSoundSettings,
  pendingCueIsFresh,
  playSound,
  soundContextState,
} from './soundEngine'

describe('activation events', () => {
  // The iPhone regression: sound worked on desktop but never started on iOS
  // because the context was only resumed from `pointerdown`. WebKit does not
  // count a press as user activation for Web Audio — only the release does.
  it('does not treat a press as enough to start audio', () => {
    expect(ACTIVATION_EVENTS).not.toContain('pointerdown')
    expect(ACTIVATION_EVENTS).not.toContain('touchstart')
    expect(ACTIVATION_EVENTS).not.toContain('mousedown')
  })

  it('covers the release of a touch, a mouse press and a key', () => {
    expect(ACTIVATION_EVENTS).toContain('touchend')
    expect(ACTIVATION_EVENTS).toContain('pointerup')
    expect(ACTIVATION_EVENTS).toContain('click')
    expect(ACTIVATION_EVENTS).toContain('keydown')
  })
})

describe('pendingCueIsFresh', () => {
  // A cue dropped by a not-yet-started context is replayed on the activation
  // event that follows it, which on a tap is the `touchend` a few tens of
  // milliseconds later.
  it('keeps a cue across a normal tap', () => {
    expect(pendingCueIsFresh(1_000, 1_040)).toBe(true)
    expect(pendingCueIsFresh(1_000, 1_000)).toBe(true)
  })

  it('keeps a cue across a slow press-and-hold, up to the limit', () => {
    expect(pendingCueIsFresh(1_000, 1_000 + PENDING_CUE_MAX_AGE_MS)).toBe(true)
  })

  it('drops a cue that would arrive detached from the action', () => {
    expect(pendingCueIsFresh(1_000, 1_000 + PENDING_CUE_MAX_AGE_MS + 1)).toBe(false)
    expect(pendingCueIsFresh(1_000, 9_000)).toBe(false)
  })
})

describe('engine safety', () => {
  it('reports no audio support outside a browser instead of throwing', () => {
    // This suite runs in node: there is no window, so there is no AudioContext.
    expect(() => playSound('correct')).not.toThrow()
    expect(soundContextState()).toBe('unsupported')
  })

  it('falls back to sensible defaults when localStorage is unavailable', () => {
    const settings = getSoundSettings()
    expect(settings.enabled).toBe(true)
    expect(settings.volume).toBeGreaterThan(0)
    expect(settings.volume).toBeLessThanOrEqual(1)
    // Taking over the audio session is opt-in: a phone set to silent stays
    // silent unless the user says otherwise.
    expect(settings.ignoreSilentSwitch).toBe(false)
  })
})
