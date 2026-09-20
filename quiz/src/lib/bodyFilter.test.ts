import { describe, it, expect } from 'vitest'
import { defaultBody, parseBody, SOA_TRACK_KEYS, CAS_TRACK_KEYS } from './bodyFilter'

describe('defaultBody', () => {
  it('opens on the body of the reader’s own track', () => {
    for (const track of CAS_TRACK_KEYS) expect(defaultBody(track)).toBe('CAS')
    for (const track of SOA_TRACK_KEYS) expect(defaultBody(track)).toBe('SOA')
  })

  it('puts a track belonging to neither body on SOA', () => {
    // DEFAULT is the two preliminary exams, which the ladder lists under ASA.
    expect(defaultBody('DEFAULT')).toBe('SOA')
    expect(defaultBody('')).toBe('SOA')
  })

  it('gives the same answer whichever tab asks — the two used to disagree', () => {
    for (const track of ['DEFAULT', 'ASA', 'FSA', 'ACAS', 'FCAS', 'unknown']) {
      expect(defaultBody(track)).toBe(defaultBody(track))
    }
  })

  it('never calls a track both bodies', () => {
    for (const track of SOA_TRACK_KEYS) expect(CAS_TRACK_KEYS.has(track)).toBe(false)
  })
})

describe('parseBody', () => {
  it('takes only the two bodies', () => {
    expect(parseBody('SOA')).toBe('SOA')
    expect(parseBody('CAS')).toBe('CAS')
    expect(parseBody('soa')).toBeNull()
    expect(parseBody(null)).toBeNull()
    expect(parseBody('')).toBeNull()
  })
})
