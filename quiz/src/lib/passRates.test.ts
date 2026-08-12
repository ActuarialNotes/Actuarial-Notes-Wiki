import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  applyPassRates,
  readCachedPassRates,
  sanitizePayload,
  writeCachedPassRates,
  PASS_RATE_TTL_MS,
  type PassRateRecord,
} from './passRates'
import type { PastExamRow } from './pastExams'

function row(partial: Partial<PastExamRow> & { year: number }): PastExamRow {
  return {
    key: `${partial.year}|${partial.session ?? ''}`,
    label: `${partial.session ?? ''} ${partial.year}`.trim(),
    bankCount: 0,
    available: false,
    ...partial,
  }
}

describe('applyPassRates', () => {
  const rows = [
    row({ year: 2019, session: 'Spring', bankCount: 25, available: true }),
    row({ year: 2018, session: 'Fall' }),
  ]

  it('lays live figures onto the matching sitting', () => {
    const merged = applyPassRates(rows, [
      { year: 2019, session: 'Spring', passRate: 42, effectivePassRate: 46.2, candidates: 1234 },
    ])
    expect(merged[0]).toMatchObject({ passRate: 42, effectivePassRate: 46.2, candidates: 1234 })
    expect(merged[1].passRate).toBeUndefined()
  })

  it('leaves the shelf untouched when there are no records', () => {
    expect(applyPassRates(rows, [])).toBe(rows)
  })

  it('matches on session as well as year — Spring figures never land on Fall', () => {
    const merged = applyPassRates(rows, [{ year: 2019, session: 'Fall', passRate: 99 }])
    expect(merged[0].passRate).toBeUndefined()
  })

  it('ignores monthly records, which describe a testing window and not a paper', () => {
    const merged = applyPassRates([row({ year: 2026 })], [{ year: 2026, month: 3, passRate: 46.2 }])
    expect(merged[0].passRate).toBeUndefined()
  })

  it('keeps an authored figure the live source is missing', () => {
    const authored = [row({ year: 2019, session: 'Spring', passRate: 40, effectivePassRate: 44 })]
    const merged = applyPassRates(authored, [{ year: 2019, session: 'Spring', effectivePassRate: 46.2 }])
    expect(merged[0]).toMatchObject({ passRate: 40, effectivePassRate: 46.2 })
  })

  it('does not mutate the rows it was given', () => {
    const authored = [row({ year: 2019, session: 'Spring' })]
    applyPassRates(authored, [{ year: 2019, session: 'Spring', passRate: 42 }])
    expect(authored[0].passRate).toBeUndefined()
  })
})

describe('sanitizePayload', () => {
  it('keeps well-formed records', () => {
    const payload = sanitizePayload(
      { records: [{ year: 2019, session: 'Spring', passRate: 42, effectivePassRate: 46.2 }] },
      'Exam 5',
    )
    expect(payload.records).toEqual([
      { year: 2019, session: 'Spring', passRate: 42, effectivePassRate: 46.2 },
    ])
  })

  it('drops records the endpoint should never have sent', () => {
    const payload = sanitizePayload(
      {
        records: [
          { year: 'nineteen', passRate: 42 },        // unusable year
          { year: 2019, session: 'Spring' },          // no figure at all
          { year: 2018, session: 'Fall', passRate: 140 }, // out of range
          null,
        ],
      },
      'Exam 5',
    )
    expect(payload.records).toEqual([])
  })

  it('survives a response that is not shaped like a payload', () => {
    expect(sanitizePayload(null, 'Exam 5').records).toEqual([])
    expect(sanitizePayload({ records: 'nope' }, 'Exam 5').records).toEqual([])
  })

  it('carries the unconfigured flag through, so a silent exam is not an error', () => {
    expect(sanitizePayload({ configured: false, records: [] }, 'Probability').configured).toBe(false)
  })
})

describe('the pass-rate cache', () => {
  const records: PassRateRecord[] = [{ year: 2019, session: 'Spring', effectivePassRate: 46.2 }]

  // Same stub the streakStore suite installs — these tests exercise the cache,
  // not a browser.
  let store: Map<string, string>
  beforeEach(() => {
    store = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
      key: () => null,
      length: 0,
    })
  })
  afterEach(() => vi.unstubAllGlobals())

  it('round-trips a payload', () => {
    writeCachedPassRates('Exam 5', { exam: 'Exam 5', records })
    expect(readCachedPassRates('Exam 5')?.records).toEqual(records)
  })

  it('is scoped per exam', () => {
    writeCachedPassRates('Exam 5', { exam: 'Exam 5', records })
    expect(readCachedPassRates('Exam MAS-I')).toBeNull()
  })

  it('expires once the figures are a week old', () => {
    const stored = Date.now()
    writeCachedPassRates('Exam 5', { exam: 'Exam 5', records }, stored)
    expect(readCachedPassRates('Exam 5', stored + PASS_RATE_TTL_MS - 1)).not.toBeNull()
    expect(readCachedPassRates('Exam 5', stored + PASS_RATE_TTL_MS + 1)).toBeNull()
  })

  it('treats a corrupted entry as a miss rather than throwing', () => {
    localStorage.setItem('actuarial_pass_rates_v1_Exam 5', '{not json')
    expect(readCachedPassRates('Exam 5')).toBeNull()
  })
})
