import { describe, it, expect } from 'vitest'
import { ROOM, pinkNoise, roomImpulse, softClipCurve } from './soundEngine'

/** A seeded stand-in for Math.random, so the buffers are the same every run. */
function seeded(seed = 7): () => number {
  let state = seed
  return () => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
}

function energy(data: Float32Array, from = 0, to = data.length): number {
  let sum = 0
  for (let i = from; i < to; i++) sum += data[i] * data[i]
  return sum
}

/**
 * How much of a signal's energy is in its sample-to-sample change: 2 for white
 * noise, and falling as the energy moves down the spectrum. A cheap stand-in for
 * "how bright is this" that needs no FFT.
 */
function brightness(data: Float32Array, from = 1, to = data.length): number {
  let change = 0
  for (let i = Math.max(1, from); i < to; i++) change += (data[i] - data[i - 1]) ** 2
  return change / energy(data, from, to)
}

describe('pinkNoise', () => {
  const white = Float32Array.from({ length: 48000 }, seeded(3)).map(x => x * 2 - 1)
  const pink = pinkNoise(48000, seeded(3))

  it('keeps white noise’s level, so the catalogue’s noise gains mean what they did', () => {
    const rms = Math.sqrt(energy(pink) / pink.length)
    expect(rms).toBeCloseTo(Math.sqrt(1 / 3), 3)
  })

  it('is far darker than white noise — gentle, not hiss', () => {
    expect(brightness(white)).toBeGreaterThan(1.8)
    expect(brightness(pink)).toBeLessThan(brightness(white) / 3)
  })
})

describe('roomImpulse', () => {
  const rate = 48000
  const [left, right] = roomImpulse(rate, 1, seeded(11))
  const delay = Math.floor(rate * ROOM.preDelay)
  const quarter = Math.floor((left.length - delay) / 4)

  it('answers the strike after a pre-delay, not on top of it', () => {
    expect(energy(left, 0, delay)).toBe(0)
    expect(energy(left, delay, delay + quarter)).toBeGreaterThan(0)
  })

  it('decays, and ends on silence rather than a step', () => {
    expect(energy(left, left.length - quarter)).toBeLessThan(energy(left, delay, delay + quarter) / 1000)
    expect(Math.abs(left[left.length - 1])).toBe(0)
    expect(Math.abs(right[right.length - 1])).toBe(0)
  })

  it('is a small room — the tail is gone well inside a second', () => {
    expect(ROOM.rt60).toBeLessThanOrEqual(0.8)
  })

  it('darkens as it rings, the way a room does', () => {
    // The top end dies first: late in the tail, far less of the energy is in
    // fast change than just after the onset.
    const early = brightness(left, delay + 1, delay + quarter)
    const late = brightness(left, delay + 2 * quarter, delay + 3 * quarter)
    expect(late).toBeLessThan(early / 2)
  })

  it('opens out in stereo — two independent channels', () => {
    let cross = 0
    for (let i = 0; i < left.length; i++) cross += left[i] * right[i]
    const correlation = cross / Math.sqrt(energy(left) * energy(right))
    expect(Math.abs(correlation)).toBeLessThan(0.2)
  })
})

describe('softClipCurve', () => {
  const points = 2049
  const curve = softClipCurve(points, 0.8)
  const at = (x: number) => curve[Math.round(((x + 1) / 2) * (points - 1))]

  it('is a straight wire below the knee, so no cue on its own is touched', () => {
    for (const x of [-0.8, -0.5, -0.1, 0, 0.1, 0.5, 0.79]) expect(at(x)).toBeCloseTo(x, 3)
  })

  it('rounds an overlap off instead of clipping it flat', () => {
    expect(at(1)).toBeLessThan(1)
    expect(at(1)).toBeGreaterThan(0.9)
    for (let i = 1; i < curve.length; i++) expect(curve[i]).toBeGreaterThanOrEqual(curve[i - 1])
    for (let i = 0; i < curve.length; i++) expect(Math.abs(curve[i])).toBeLessThan(1)
  })

  it('treats both halves of the wave alike', () => {
    for (const x of [0.3, 0.85, 0.95, 1]) expect(at(-x)).toBeCloseTo(-at(x), 6)
  })
})
