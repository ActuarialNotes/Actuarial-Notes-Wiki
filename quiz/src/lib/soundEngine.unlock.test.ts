import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

/**
 * The iPhone regression, reproduced against a fake AudioContext that behaves
 * the way WebKit does: `resume()` always resolves, but only actually starts the
 * context when it was called from an event that grants user activation. On iOS
 * a press (`pointerdown`) is not such an event; the release is.
 *
 * Both halves of the bug live here — resuming only from the press, and then
 * discarding the held cue when that resume resolved without starting anything.
 */

let voices = 0

class FakeParam {
  value = 0
  setValueAtTime() { return this }
  exponentialRampToValueAtTime() { return this }
  linearRampToValueAtTime() { return this }
  setTargetAtTime() { return this }
}

class FakeNode {
  connect() { /* no-op */ }
  disconnect() { /* no-op */ }
}

class FakeOscillator extends FakeNode {
  frequency = new FakeParam()
  type = 'sine'
  start() { /* no-op */ }
  stop() { /* no-op */ }
}

class FakeBufferSource extends FakeNode {
  buffer: unknown = null
  loop = false
  start() { /* no-op */ }
  stop() { /* no-op */ }
}

class FakeContext {
  static latest: FakeContext | null = null
  /** Stands in for "this gesture granted user activation". */
  activationAllowed = false
  state: 'suspended' | 'running' = 'suspended'
  currentTime = 0
  sampleRate = 48000
  destination = new FakeNode()

  constructor() { FakeContext.latest = this }

  resume() {
    // WebKit resolves either way — it just doesn't start without activation.
    if (this.activationAllowed) this.state = 'running'
    return Promise.resolve()
  }
  createGain() { const g = new FakeNode() as FakeNode & { gain: FakeParam }; g.gain = new FakeParam(); return g }
  createOscillator() { voices++; return new FakeOscillator() }
  createBufferSource() { voices++; return new FakeBufferSource() }
  createBiquadFilter() {
    const f = new FakeNode() as FakeNode & { frequency: FakeParam; Q: FakeParam; type: string }
    f.frequency = new FakeParam(); f.Q = new FakeParam(); f.type = 'bandpass'
    return f
  }
  createBuffer(_channels: number, length: number) {
    return { getChannelData: () => new Float32Array(length) }
  }
}

type Engine = typeof import('./soundEngine')

async function loadEngine(): Promise<Engine> {
  vi.resetModules()
  voices = 0
  FakeContext.latest = null
  vi.stubGlobal('window', {
    AudioContext: FakeContext,
    setTimeout: () => 0,
  })
  return import('./soundEngine')
}

/** Let the `resume().then(...)` microtask chain settle. */
const settle = () => Promise.resolve().then(() => undefined)

describe('starting audio under iOS rules', () => {
  beforeEach(() => { voices = 0 })
  afterEach(() => { vi.unstubAllGlobals() })

  it('holds the first cue until a gesture is allowed to start the context', async () => {
    const engine = await loadEngine()

    // 1. The press. iOS refuses to start the context here.
    engine.unlockSound()
    engine.playSound('click')
    await settle()
    expect(FakeContext.latest, 'a context should have been created').not.toBeNull()
    expect(engine.soundContextState()).toBe('starting')
    expect(voices, 'nothing can be scheduled into a suspended context').toBe(0)

    // 2. Still the press — a second refused resume must not throw the held cue
    //    away. This is the bug that made the first fix look like no fix at all.
    engine.unlockSound()
    await settle()
    expect(voices).toBe(0)

    // 3. The release. Now the context is allowed to start, and the cue that was
    //    held from the press is played instead of being lost.
    FakeContext.latest!.activationAllowed = true
    engine.unlockSound()
    await settle()
    expect(engine.soundContextState()).toBe('running')
    expect(voices, 'the held cue should be replayed').toBeGreaterThan(0)
  })

  it('plays straight away once the context is running', async () => {
    const engine = await loadEngine()
    engine.unlockSound()
    FakeContext.latest!.activationAllowed = true
    engine.unlockSound()
    await settle()

    voices = 0
    engine.playSound('correct')
    expect(voices, 'no more holding once the context is running').toBeGreaterThan(0)
  })

  it('drops a held cue that has gone stale rather than firing it late', async () => {
    const engine = await loadEngine()
    engine.playSound('click')
    await settle()
    expect(voices).toBe(0)

    const realNow = Date.now
    Date.now = () => realNow() + engine.PENDING_CUE_MAX_AGE_MS + 50
    try {
      FakeContext.latest!.activationAllowed = true
      engine.unlockSound()
      await settle()
      expect(voices, 'a cue this old is no longer connected to the tap').toBe(0)
    } finally {
      Date.now = realNow
    }
  })

  it('stays silent while sound is switched off, without holding a cue', async () => {
    const engine = await loadEngine()
    engine.setSoundEnabled(false)
    engine.playSound('correct')
    FakeContext.latest && (FakeContext.latest.activationAllowed = true)
    engine.unlockSound()
    await settle()
    expect(voices).toBe(0)
    engine.setSoundEnabled(true)
  })
})
