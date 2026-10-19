import { describe, expect, it } from 'vitest'
import {
  countdownLabel,
  daysUntil,
  distanceKm,
  distanceText,
  eventDateLabel,
  eventTile,
  eventTopics,
  eventWhere,
  eventsByMonth,
  homeCities,
  nearestCity,
  parseHome,
  placeWhere,
  placeTopics,
  servingHome,
  splitByDistance,
  upcomingEvents,
  type CommunityEvent,
  type CommunityPlace,
} from './places'

const TORONTO = { city: 'Toronto', region: 'ON', country: 'CA', lat: 43.6532, lng: -79.3832 }
const MONTREAL = { city: 'Montréal', region: 'QC', country: 'CA', lat: 45.5019, lng: -73.5674 }
const CHICAGO = { city: 'Chicago', region: 'IL', country: 'US', lat: 41.8781, lng: -87.6298 }

const event = (over: Partial<CommunityEvent>): CommunityEvent => ({
  id: 'e',
  title: 'Fall Meeting',
  host: 'x',
  start: '2026-11-05',
  end: null,
  venue: null,
  location: TORONTO,
  virtual: false,
  hybrid: false,
  url: 'https://example.org',
  summary: 'A meeting.',
  source: 'https://example.org',
  checked: '2026-10-19',
  ...over,
})

const place = (over: Partial<CommunityPlace>): CommunityPlace => ({
  id: 'p',
  name: 'Club',
  short: null,
  kind: 'local-club',
  online: false,
  url: 'https://example.org',
  eventsUrl: null,
  location: TORONTO,
  covers: null,
  description: 'A club.',
  source: 'https://example.org',
  checked: '2026-10-19',
  ...over,
})

describe('upcomingEvents', () => {
  it('keeps what is not over, soonest first', () => {
    const list = upcomingEvents(
      [
        event({ id: 'past', start: '2026-10-01' }),
        event({ id: 'running', start: '2026-10-18', end: '2026-10-20' }),
        event({ id: 'later', start: '2027-03-01' }),
        event({ id: 'soon', start: '2026-10-25' }),
      ],
      '2026-10-19',
    )
    expect(list.map(e => e.id)).toEqual(['running', 'soon', 'later'])
  })
})

describe('distance and nearness', () => {
  it('measures Toronto to Montréal at about 504 km', () => {
    expect(distanceKm(TORONTO, MONTREAL)).toBeGreaterThan(490)
    expect(distanceKm(TORONTO, MONTREAL)).toBeLessThan(520)
    expect(distanceKm(TORONTO, TORONTO)).toBe(0)
  })

  it('splits near, online and farther', () => {
    const events = [
      event({ id: 'mtl', location: MONTREAL }),
      event({ id: 'to', location: TORONTO }),
      event({ id: 'web', location: null, virtual: true }),
      event({ id: 'chi', location: CHICAGO, hybrid: true }),
    ]
    const split = splitByDistance(events, eventWhere, TORONTO, 600)
    expect(split.near.map(n => n.item.id)).toEqual(['to', 'mtl'])
    expect(split.online.map(e => e.id)).toEqual(['web', 'chi'])
    expect(split.farther).toEqual([])
  })

  it('says a distance the way a person would', () => {
    expect(distanceText(4)).toBe('Nearby')
    expect(distanceText(84.6)).toBe('85 km away')
    expect(distanceText(1238)).toBe('1,240 km away')
  })

  it('keeps everything in reach with no radius, and nothing near with no home', () => {
    const events = [event({ id: 'chi', location: CHICAGO })]
    expect(splitByDistance(events, eventWhere, TORONTO, null).near).toHaveLength(1)
    const homeless = splitByDistance(events, eventWhere, null, 50)
    expect(homeless.near).toHaveLength(0)
    expect(homeless.farther).toHaveLength(1)
  })

  it('lists home cities once each and finds the nearest', () => {
    const cities = homeCities([place({}), place({ location: null, online: true })], [event({ location: MONTREAL }), event({ location: TORONTO })])
    expect(cities.map(c => c.label)).toEqual(['Montréal, QC', 'Toronto, ON'])
    expect(nearestCity(cities, { lat: 43.5, lng: -79.6 })?.label).toBe('Toronto, ON')
    expect(nearestCity([], TORONTO)).toBeNull()
  })

  it('reads a stored home or refuses it', () => {
    expect(parseHome({ label: 'Toronto, ON', lat: 43.6, lng: -79.4, region: 'ON' })).toMatchObject({ label: 'Toronto, ON', lat: 43.6, lng: -79.4, region: 'ON' })
    expect(parseHome({ label: 'x', lat: 200, lng: 0 })).toBeNull()
    expect(parseHome({ lat: 1, lng: 1 })).toBeNull()
    expect(parseHome('Toronto')).toBeNull()
  })
})

describe('dates', () => {
  it('prints a date or a range the short way', () => {
    expect(eventDateLabel('2026-11-08', null)).toBe('Nov 8, 2026')
    expect(eventDateLabel('2026-11-08', '2026-11-11')).toBe('Nov 8–11, 2026')
    expect(eventDateLabel('2026-10-30', '2026-11-02')).toBe('Oct 30 – Nov 2, 2026')
    expect(eventDateLabel('2026-12-30', '2027-01-02')).toBe('Dec 30, 2026 – Jan 2, 2027')
  })

  it('draws a calendar tile', () => {
    expect(eventTile('2026-11-08')).toEqual({ month: 'NOV', day: '8' })
  })

  it('counts down', () => {
    expect(daysUntil('2026-10-24', '2026-10-19')).toBe(5)
    expect(countdownLabel(event({ start: '2026-10-19' }), '2026-10-19')).toBe('Today')
    expect(countdownLabel(event({ start: '2026-10-18', end: '2026-10-20' }), '2026-10-19')).toBe('Happening now')
    expect(countdownLabel(event({ start: '2026-10-20' }), '2026-10-19')).toBe('Tomorrow')
    expect(countdownLabel(event({ start: '2026-10-24' }), '2026-10-19')).toBe('In 5 days')
    expect(countdownLabel(event({ start: '2026-11-16' }), '2026-10-19')).toBe('In 4 weeks')
    expect(countdownLabel(event({ start: '2027-03-19' }), '2026-10-19')).toBe('In 5 months')
  })

  it('groups by month in order', () => {
    const groups = eventsByMonth([event({ id: 'a', start: '2026-11-01' }), event({ id: 'b', start: '2026-11-20' }), event({ id: 'c', start: '2027-01-05' })])
    expect(groups.map(g => [g.label, g.events.map(e => e.id)])).toEqual([
      ['November 2026', ['a', 'b']],
      ['January 2027', ['c']],
    ])
  })
})

describe('topics', () => {
  it('tags every event as an event, and a CAS affiliate as P&C', () => {
    expect(eventTopics(event({ title: 'Exam 5 study session' }))).toEqual(expect.arrayContaining(['events', 'exams', 'exam-5']))
    expect(placeTopics(place({ kind: 'regional-affiliate' }))).toEqual(expect.arrayContaining(['pc', 'events']))
    expect(placeTopics(place({ kind: 'forum', online: true, location: null, extraTopics: ['careers'] }))).toContain('careers')
  })
})

describe('servingHome', () => {
  const occa = place({ id: 'occa', kind: 'regional-affiliate', location: null, covers: 'Ontario' })
  const cagny = place({ id: 'cagny', kind: 'regional-affiliate', location: null, covers: 'New York, New Jersey, Eastern Pennsylvania' })
  const aaiard = place({ id: 'aaiard', kind: 'regional-affiliate', location: null, covers: 'Québec' })
  const all = [occa, cagny, aaiard]
  it('matches a home province or state to the territory an affiliate names', () => {
    expect(servingHome(all, { label: 'Toronto, ON', lat: 0, lng: 0, region: 'ON' }).map(p => p.id)).toEqual(['occa'])
    expect(servingHome(all, { label: 'Philadelphia, PA', lat: 0, lng: 0, region: 'PA' }).map(p => p.id)).toEqual(['cagny'])
    expect(servingHome(all, { label: 'Montréal, QC', lat: 0, lng: 0, region: 'QC' }).map(p => p.id)).toEqual(['aaiard'])
  })
  it('matches nothing without a region', () => {
    expect(servingHome(all, null)).toEqual([])
    expect(servingHome(all, { label: 'x', lat: 0, lng: 0 })).toEqual([])
  })
  it('puts a place with neither a city nor a site elsewhere', () => {
    expect(splitByDistance([occa], placeWhere, null, null).elsewhere).toEqual([occa])
  })
})
