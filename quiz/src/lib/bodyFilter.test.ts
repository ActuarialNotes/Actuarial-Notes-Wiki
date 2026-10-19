import { describe, it, expect } from 'vitest'
import { defaultBody, defaultGuideBody, parseBody, parseGuideBody, SOA_TRACK_KEYS, CAS_TRACK_KEYS, CIA_TRACK_KEYS } from './bodyFilter'

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

describe('the CIA, on the Study Guides tab only', () => {
  it('opens the Study Guides tab on the CIA for a CIA track', () => {
    for (const track of CIA_TRACK_KEYS) expect(defaultGuideBody(track)).toBe('CIA')
    for (const track of CAS_TRACK_KEYS) expect(defaultGuideBody(track)).toBe('CAS')
    expect(defaultGuideBody('DEFAULT')).toBe('SOA')
  })

  it('opens a tab with no CIA ladder on the SOA for a CIA track', () => {
    for (const track of CIA_TRACK_KEYS) expect(defaultBody(track)).toBe('SOA')
  })

  it('reads a stored CIA as a choice only where the CIA is offered', () => {
    expect(parseGuideBody('CIA')).toBe('CIA')
    expect(parseGuideBody('CAS')).toBe('CAS')
    expect(parseGuideBody('cia')).toBeNull()
    expect(parseBody('CIA')).toBeNull()
  })
})
