import { describe, expect, it } from 'vitest'
import { COMMUNITY_EVENTS } from './communityEvents'
import { COMMUNITY_PLACES } from './communityPlaces'

// Holds the Community catalogue to its rule (docs/community.md): every entry a
// real, linked page read on a stated day, every event a well-formed date range
// and a host the reader can find, nothing an organiser's page wouldn't state.

const DAY = /^\d{4}-\d{2}-\d{2}$/
const isHttps = (u: string) => {
  try {
    const url = new URL(u)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

describe('community places', () => {
  it('has unique ids', () => {
    const ids = COMMUNITY_PLACES.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(COMMUNITY_PLACES.map(p => [p.id, p] as const))('%s is sourced and well-formed', (_id, p) => {
    expect(p.name.trim()).toBe(p.name)
    expect(isHttps(p.url)).toBe(true)
    expect(isHttps(p.source)).toBe(true)
    if (p.eventsUrl) expect(isHttps(p.eventsUrl)).toBe(true)
    expect(p.checked).toMatch(DAY)
    expect(p.description.length).toBeGreaterThan(20)
    expect(p.description.length).toBeLessThan(260)
    if (p.location) {
      expect(Math.abs(p.location.lat)).toBeLessThanOrEqual(90)
      expect(Math.abs(p.location.lng)).toBeLessThanOrEqual(180)
      expect(p.location.country).toMatch(/^[A-Z]{2}$/)
    }
    // An affiliate serves a territory, and says which.
    if (p.kind === 'regional-affiliate') expect(p.covers).toBeTruthy()
  })
})

describe('community events', () => {
  const placeIds = new Set(COMMUNITY_PLACES.map(p => p.id))

  it('has unique ids', () => {
    const ids = COMMUNITY_EVENTS.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(COMMUNITY_EVENTS.map(e => [e.id, e] as const))('%s is sourced and well-formed', (_id, e) => {
    expect(e.start).toMatch(DAY)
    if (e.end) {
      expect(e.end).toMatch(DAY)
      expect(e.end >= e.start).toBe(true)
    }
    expect(isHttps(e.url)).toBe(true)
    expect(isHttps(e.source)).toBe(true)
    expect(e.checked).toMatch(DAY)
    // A host written as an id must be a place; anything else is an organiser's name.
    if (/^[a-z0-9-]+$/.test(e.host)) expect(placeIds.has(e.host)).toBe(true)
    // An online-only event has no city; an in-person one has one.
    if (e.virtual) expect(e.location).toBeNull()
    else expect(e.location).not.toBeNull()
  })
})
