import type { PastExamRow } from './pastExams'
import type { ExamSession } from '@/data/pastExams'

// The client half of the live pass-rate pipeline. `api/pass-rates.js` fetches
// and parses the published statistics server-side (the examining bodies send no
// CORS headers, so the browser can't); this module decides what to do with the
// result: cache it, and lay it over the authored catalogue.
//
// The authored figures in `data/pastExams.ts` remain the floor. Live records
// win where they exist, so the app shows the current published numbers, but an
// unreachable source, a redesigned page or an offline user degrades to the
// catalogue instead of to blanks.

/** One sitting's published statistics, as returned by `api/pass-rates.js`. */
export interface PassRateRecord {
  year: number
  session?: ExamSession
  /** Month, for publishers who report CBT windows rather than seasons. */
  month?: number
  candidates?: number
  passed?: number
  passRate?: number
  effectivePassRate?: number
}

export interface PassRatePayload {
  exam: string
  /** False when no source is configured for this exam — not an error. */
  configured?: boolean
  source?: string
  fetchedAt?: string
  records: PassRateRecord[]
}

/** Figures are republished twice a year; a week-old copy is still current. */
export const PASS_RATE_TTL_MS = 7 * 24 * 60 * 60 * 1000
const CACHE_PREFIX = 'actuarial_pass_rates_v1_'

interface CacheEntry {
  storedAt: number
  payload: PassRatePayload
}

/** Only the fields the app displays, and only when they're real numbers. */
function sanitizeRecord(raw: unknown): PassRateRecord | null {
  if (!raw || typeof raw !== 'object') return null
  const record = raw as Record<string, unknown>
  const year = Number(record.year)
  if (!Number.isInteger(year)) return null

  const session = record.session === 'Spring' || record.session === 'Fall' ? record.session : undefined
  const num = (value: unknown): number | undefined => {
    const n = Number(value)
    return Number.isFinite(n) ? n : undefined
  }
  const percent = (value: unknown): number | undefined => {
    const n = num(value)
    return n !== undefined && n >= 0 && n <= 100 ? n : undefined
  }

  const parsed: PassRateRecord = {
    year,
    ...(session && { session }),
    ...(num(record.month) !== undefined && { month: num(record.month) }),
    ...(num(record.candidates) !== undefined && { candidates: num(record.candidates) }),
    ...(num(record.passed) !== undefined && { passed: num(record.passed) }),
    ...(percent(record.passRate) !== undefined && { passRate: percent(record.passRate) }),
    ...(percent(record.effectivePassRate) !== undefined && { effectivePassRate: percent(record.effectivePassRate) }),
  }
  if (parsed.passRate === undefined && parsed.effectivePassRate === undefined) return null
  return parsed
}

/** A payload from the endpoint or from cache, with anything malformed dropped. */
export function sanitizePayload(raw: unknown, exam: string): PassRatePayload {
  const source = (raw ?? {}) as Record<string, unknown>
  const records = Array.isArray(source.records)
    ? source.records.map(sanitizeRecord).filter((r): r is PassRateRecord => r !== null)
    : []
  return {
    exam,
    configured: source.configured !== false,
    ...(typeof source.source === 'string' && { source: source.source }),
    ...(typeof source.fetchedAt === 'string' && { fetchedAt: source.fetchedAt }),
    records,
  }
}

/**
 * Lays live records over the shelf's rows, matched on year **and** session.
 *
 * Monthly records (the SOA's CBT windows) match no row and are ignored here —
 * they describe a testing window, not a paper anyone can sit in the app.
 */
export function applyPassRates(rows: PastExamRow[], records: PassRateRecord[]): PastExamRow[] {
  if (records.length === 0) return rows
  const bySitting = new Map<string, PassRateRecord>()
  for (const record of records) {
    if (record.month !== undefined && record.session === undefined) continue
    bySitting.set(`${record.year}|${record.session ?? ''}`, record)
  }
  if (bySitting.size === 0) return rows

  return rows.map(row => {
    const live = bySitting.get(`${row.year}|${row.session ?? ''}`)
    if (!live) return row
    return {
      ...row,
      candidates: live.candidates ?? row.candidates,
      passRate: live.passRate ?? row.passRate,
      effectivePassRate: live.effectivePassRate ?? row.effectivePassRate,
    }
  })
}

export function readCachedPassRates(exam: string, now = Date.now()): PassRatePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + exam)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (!entry?.storedAt || now - entry.storedAt > PASS_RATE_TTL_MS) return null
    return sanitizePayload(entry.payload, exam)
  } catch {
    return null
  }
}

export function writeCachedPassRates(exam: string, payload: PassRatePayload, now = Date.now()): void {
  try {
    localStorage.setItem(CACHE_PREFIX + exam, JSON.stringify({ storedAt: now, payload } satisfies CacheEntry))
  } catch {
    /* private mode / quota — the figures are a nicety, not worth failing over */
  }
}

/**
 * Where the endpoint lives. Same-origin by default, matching `api/research`;
 * `VITE_PASS_RATES_URL` covers a deploy where the SPA and the functions sit on
 * different origins.
 */
export function passRatesEndpoint(exam: string): string {
  const base = import.meta.env.VITE_PASS_RATES_URL || '/api/pass-rates'
  return `${base}?exam=${encodeURIComponent(exam)}`
}
