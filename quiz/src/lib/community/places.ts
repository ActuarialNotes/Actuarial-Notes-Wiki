// The Community tab's **places** and **events** as data (docs/community.md):
// the communities actuaries gather in — forums online, societies, CAS regional
// affiliates and local actuaries' clubs in real life — and the meetings they
// hold. The catalogue is authored in `data/communityPlaces.ts` and
// `data/communityEvents.ts`; this module is what the page asks of it: which
// events are still to come, which are near the reader, what each is about.
//
// The rule is the vault's: **transcribed, never constructed.** Every name,
// date, venue and link is copied from the organiser's own page, with the page
// and the day it was read (`source`, `checked`), and a fact the page doesn't
// state is absent — an event with no venue on its page has none here. Where a
// place *is* — a city's coordinates — is the one thing worked out rather than
// read, and only so a distance can be measured; it is never printed.
// Pure and tested.

import { topicsFor, type TopicId } from './topics'

export type PlaceKind = 'forum' | 'social' | 'society' | 'regional-affiliate' | 'local-club' | 'student' | 'chat'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface PlaceLocation extends GeoPoint {
  city: string
  /** Province or state, as the organiser writes it. */
  region: string | null
  /** ISO 3166 alpha-2. */
  country: string
}

export interface CommunityPlace {
  id: string
  name: string
  short: string | null
  kind: PlaceKind
  online: boolean
  url: string
  eventsUrl: string | null
  /** Where a local community meets; null for one that is online only. */
  location: PlaceLocation | null
  /** For a regional affiliate: the states/provinces it says it serves, as it says it. */
  covers: string | null
  /** One sentence of what its own page says it is. */
  description: string
  /** Topics beyond the ones its name and description carry. */
  extraTopics?: readonly TopicId[]
  source: string
  checked: string
}

export interface CommunityEvent {
  id: string
  title: string
  /** A place id from the catalogue, or the organiser's name when it isn't one. */
  host: string
  /** YYYY-MM-DD. */
  start: string
  /** YYYY-MM-DD, or null for a one-day event. */
  end: string | null
  venue: string | null
  /** Null for an online-only event. */
  location: PlaceLocation | null
  virtual: boolean
  hybrid: boolean
  url: string
  summary: string
  extraTopics?: readonly TopicId[]
  source: string
  checked: string
}

export const PLACE_KIND_LABEL: Record<PlaceKind, string> = {
  forum: 'Forum',
  social: 'Social',
  society: 'Society',
  'regional-affiliate': 'CAS regional affiliate',
  'local-club': 'Local club',
  student: 'Student club',
  chat: 'Chat',
}

/** What a kind of place is about by being that kind — a CAS affiliate is P&C, a club meets. */
const KIND_TOPICS: Partial<Record<PlaceKind, readonly TopicId[]>> = {
  'regional-affiliate': ['pc', 'events'],
  'local-club': ['events'],
  student: ['exams', 'careers'],
}

function uniqueTopics(ids: readonly TopicId[]): TopicId[] {
  return [...new Set(ids)]
}

export function placeTopics(place: CommunityPlace): TopicId[] {
  return uniqueTopics([
    ...topicsFor(`${place.name} ${place.description}`),
    ...(KIND_TOPICS[place.kind] ?? []),
    ...(place.extraTopics ?? []),
  ])
}

export function eventTopics(event: CommunityEvent): TopicId[] {
  return uniqueTopics(['events', ...topicsFor(`${event.title} ${event.summary}`), ...(event.extraTopics ?? [])])
}

/** Today as YYYY-MM-DD in the reader's own calendar. */
export function localDay(now: Date): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Events not yet over on `today`, soonest first (ties by title). */
export function upcomingEvents(events: readonly CommunityEvent[], today: string): CommunityEvent[] {
  return events
    .filter(e => (e.end ?? e.start) >= today)
    .sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title))
}

/** Whether an event is on today. */
export function isHappening(event: CommunityEvent, today: string): boolean {
  return event.start <= today && (event.end ?? event.start) >= today
}

/** Great-circle distance in kilometres. */
export function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const rad = (d: number) => (d * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** The reach a reader picks for "near me". `null` is anywhere. */
export const RADIUS_OPTIONS: readonly { km: number | null; label: string }[] = [
  { km: 50, label: '50 km' },
  { km: 250, label: '250 km' },
  { km: 1000, label: '1,000 km' },
  { km: null, label: 'Anywhere' },
]

export interface Home extends GeoPoint {
  /** What the picker shows — a city's name and province or state. */
  label: string
  /** The city's province or state, as the catalogue writes it ("ON"), when known. */
  region?: string | null
  country?: string
}

export interface NearbySplit<T> {
  /** In person within reach, nearest first. */
  near: { item: T; km: number }[]
  /** Online — online only, or in person out of reach but joinable online. */
  online: T[]
  /** In person only, beyond reach. */
  farther: { item: T; km: number }[]
  /** Neither a city nor online — a regional affiliate, which serves a territory. */
  elsewhere: T[]
}

/**
 * Split things with a location into what is near home, what is online and
 * what is farther away. With no home, everything in person is "farther", at
 * no distance, in the order given.
 */
export function splitByDistance<T>(
  items: readonly T[],
  where: (item: T) => { location: GeoPoint | null; online: boolean },
  home: GeoPoint | null,
  radiusKm: number | null,
): NearbySplit<T> {
  const out: NearbySplit<T> = { near: [], online: [], farther: [], elsewhere: [] }
  for (const item of items) {
    const { location, online } = where(item)
    if (!location) {
      if (online) out.online.push(item)
      else out.elsewhere.push(item)
      continue
    }
    if (!home) {
      out.farther.push({ item, km: 0 })
      continue
    }
    const km = distanceKm(home, location)
    if (radiusKm === null || km <= radiusKm) out.near.push({ item, km })
    // Out of reach in person but open online (a hybrid meeting): it is in reach
    // after all, the online way.
    else if (online) out.online.push(item)
    else out.farther.push({ item, km })
  }
  // A stable sort, so an equal distance keeps the order it came in (soonest first for events).
  out.near.sort((a, b) => a.km - b.km)
  if (home) out.farther.sort((a, b) => a.km - b.km)
  return out
}

/** "Nearby", "85 km away", "1,240 km away". */
export function distanceText(km: number): string {
  if (km < 10) return 'Nearby'
  const rounded = km < 100 ? Math.round(km) : Math.round(km / 10) * 10
  return `${rounded.toLocaleString('en-US')} km away`
}

export function eventWhere(e: CommunityEvent): { location: GeoPoint | null; online: boolean } {
  return { location: e.virtual ? null : e.location, online: e.virtual || e.hybrid }
}

export function placeWhere(p: CommunityPlace): { location: GeoPoint | null; online: boolean } {
  return { location: p.location, online: p.online }
}

/**
 * The cities a reader can call home: every city a place or an in-person event
 * is in, once each (the first coordinates seen for it), alphabetically.
 */
export function homeCities(places: readonly CommunityPlace[], events: readonly CommunityEvent[]): Home[] {
  const seen = new Map<string, Home>()
  const add = (loc: PlaceLocation | null) => {
    if (!loc) return
    const label = cityLabel(loc)
    if (!seen.has(label)) seen.set(label, { label, lat: loc.lat, lng: loc.lng, region: loc.region, country: loc.country })
  }
  places.forEach(p => add(p.location))
  events.forEach(e => add(e.virtual ? null : e.location))
  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label))
}

export function cityLabel(loc: PlaceLocation): string {
  return loc.region ? `${loc.city}, ${loc.region}` : `${loc.city}, ${loc.country}`
}

/** The home in `cities` nearest a point — what "Use my location" settles on, labelled as the reader's own. */
export function nearestCity(cities: readonly Home[], at: GeoPoint): Home | null {
  let best: { home: Home; km: number } | null = null
  for (const home of cities) {
    const km = distanceKm(home, at)
    if (!best || km < best.km) best = { home, km }
  }
  return best?.home ?? null
}

/** A home read back from storage, or null. */
export function parseHome(raw: unknown): Home | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (typeof r.label !== 'string' || !r.label.trim()) return null
  if (typeof r.lat !== 'number' || typeof r.lng !== 'number') return null
  if (Math.abs(r.lat) > 90 || Math.abs(r.lng) > 180) return null
  return {
    label: r.label,
    lat: r.lat,
    lng: r.lng,
    region: typeof r.region === 'string' ? r.region : null,
    country: typeof r.country === 'string' ? r.country : undefined,
  }
}

/**
 * Province and state codes as the names an affiliate's territory is written
 * in. A fact table, not a judgment: it is how "ON" in a city's location meets
 * "Ontario" in OCCA's.
 */
const REGION_NAMES: Record<string, string> = {
  AB: 'Alberta', BC: 'British Columbia', MB: 'Manitoba', NB: 'New Brunswick', NL: 'Newfoundland', NS: 'Nova Scotia',
  ON: 'Ontario', PE: 'Prince Edward Island', QC: 'Québec', SK: 'Saskatchewan',
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut',
  DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

function fold(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/**
 * The communities that say they serve the reader's province or state — the
 * CAS regional affiliates, by the territory each writes on its page. A
 * territory written in part ("Eastern Pennsylvania", "Northern California")
 * still counts: the page says the affiliate serves some of it.
 */
export function servingHome(places: readonly CommunityPlace[], home: Home | null): CommunityPlace[] {
  const name = home?.region ? REGION_NAMES[home.region.toUpperCase()] ?? home.region : null
  if (!name) return []
  const want = fold(name)
  return places.filter(p => p.covers && p.covers.split(',').some(t => new RegExp(`\\b${want}\\b`).test(fold(t.trim()))))
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parts(day: string): { y: number; m: number; d: number } {
  const [y, m, d] = day.split('-').map(Number)
  return { y, m, d }
}

/** "Nov 8, 2026", "Nov 8–11, 2026", "Oct 30 – Nov 2, 2026", "Dec 30, 2026 – Jan 2, 2027". */
export function eventDateLabel(start: string, end: string | null): string {
  const a = parts(start)
  if (!end || end === start) return `${MONTHS[a.m - 1]} ${a.d}, ${a.y}`
  const b = parts(end)
  if (a.y !== b.y) return `${MONTHS[a.m - 1]} ${a.d}, ${a.y} – ${MONTHS[b.m - 1]} ${b.d}, ${b.y}`
  if (a.m !== b.m) return `${MONTHS[a.m - 1]} ${a.d} – ${MONTHS[b.m - 1]} ${b.d}, ${a.y}`
  return `${MONTHS[a.m - 1]} ${a.d}–${b.d}, ${a.y}`
}

/** The calendar tile's two lines: "NOV" over "8". */
export function eventTile(start: string): { month: string; day: string } {
  const { m, d } = parts(start)
  return { month: MONTHS[m - 1].toUpperCase(), day: String(d) }
}

/** Whole days from `today` to an event's start (0 on the day, negative once begun). */
export function daysUntil(start: string, today: string): number {
  const t = (s: string) => {
    const { y, m, d } = parts(s)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((t(start) - t(today)) / 86_400_000)
}

/** "Today", "Tomorrow", "In 5 days", "In 3 weeks", "Happening now". */
export function countdownLabel(event: CommunityEvent, today: string): string {
  if (isHappening(event, today)) return event.start === today ? 'Today' : 'Happening now'
  const n = daysUntil(event.start, today)
  if (n === 1) return 'Tomorrow'
  if (n < 14) return `In ${n} days`
  if (n < 60) return `In ${Math.round(n / 7)} weeks`
  return `In ${Math.round(n / 30)} months`
}

/** Events grouped by the month they start in, in order: [{ key: '2026-11', label: 'November 2026', events }]. */
export function eventsByMonth(events: readonly CommunityEvent[]): { key: string; label: string; events: CommunityEvent[] }[] {
  const LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const groups = new Map<string, CommunityEvent[]>()
  for (const e of events) {
    const key = e.start.slice(0, 7)
    const list = groups.get(key) ?? []
    list.push(e)
    groups.set(key, list)
  }
  return [...groups.entries()].map(([key, list]) => {
    const { y, m } = parts(`${key}-01`)
    return { key, label: `${LONG[m - 1]} ${y}`, events: list }
  })
}

/** Places and events whose words carry every word of the query. */
export function searchPlaces(places: readonly CommunityPlace[], query: string): CommunityPlace[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return [...places]
  return places.filter(p => {
    const hay = `${p.name} ${p.short ?? ''} ${p.description} ${p.location ? cityLabel(p.location) : ''} ${p.covers ?? ''}`.toLowerCase()
    return words.every(w => hay.includes(w))
  })
}

export function searchEvents(events: readonly CommunityEvent[], query: string): CommunityEvent[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return [...events]
  return events.filter(e => {
    const hay = `${e.title} ${e.host} ${e.summary} ${e.venue ?? ''} ${e.location ? cityLabel(e.location) : 'online'}`.toLowerCase()
    return words.every(w => hay.includes(w))
  })
}
