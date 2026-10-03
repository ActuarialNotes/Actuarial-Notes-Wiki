import { describe, expect, it } from 'vitest'
import {
  STORE_AISLES,
  STORE_EXAMS,
  aisleCounts,
  bookExamKeys,
  buildStoreItems,
  calculatorAllowed,
  dayLabel,
  daysBetween,
  formatPrice,
  inDays,
  parseAisle,
  parseStoreExam,
  priceSummary,
  readingExamKey,
  registrationPrice,
  registrationUrgency,
  registrationProducts,
  registrationStatus,
  shortDate,
  showcase,
  storeShelf,
  type StudyProduct,
  comparableExams,
  comparisonFactLabels,
  comparisonFor,
  hasRefinement,
  isFreeItem,
  makerOptions,
  parsePriceBands,
  priceBandOf,
  reviewTally,
  reviewsFor,
  splitPeople,
  storeDisclaimer,
  type ShelfFilter,
  type StoreReview,
} from './store'
import { EXAM_FEES } from '../data/examFees'
import { EXAM_HUES } from './examColors'
import { TRACKS } from '../data/tracks'
import type { StoreBook } from './storeBooks'

describe('formatPrice', () => {
  it('drops the cents from a whole amount and keeps them otherwise', () => {
    expect(formatPrice({ amount: 199, currency: 'USD' })).toBe('$199')
    expect(formatPrice({ amount: 21.95, currency: 'USD' })).toBe('$21.95')
    expect(formatPrice({ amount: 1100, currency: 'USD' })).toBe('$1,100')
  })

  it('says a price of nothing is free', () => {
    expect(formatPrice({ amount: 0, currency: 'USD' })).toBe('Free')
  })

  it('says which dollar a Canadian price is in', () => {
    expect(formatPrice({ amount: 50, currency: 'CAD' })).toBe('CA$50')
  })
})

describe('priceSummary', () => {
  it('is the price itself when there is one', () => {
    expect(priceSummary([{ amount: 99, currency: 'USD' }])).toEqual({ price: { amount: 99, currency: 'USD' }, from: false })
  })

  it('is the lowest, marked "from", when the prices differ', () => {
    const summary = priceSummary([
      { amount: 199, currency: 'USD' },
      { amount: 149, currency: 'USD' },
      { amount: 249, currency: 'USD' },
    ])
    expect(summary).toEqual({ price: { amount: 149, currency: 'USD' }, from: true })
  })

  it('never compares across currencies', () => {
    const summary = priceSummary([
      { amount: 100, currency: 'USD' },
      { amount: 50, currency: 'CAD' },
    ])
    expect(summary?.price).toEqual({ amount: 100, currency: 'USD' })
    expect(summary?.from).toBe(true)
  })

  it('is nothing for no prices', () => {
    expect(priceSummary([])).toBeNull()
  })
})

describe('dates', () => {
  it('counts whole days, negative once passed', () => {
    expect(daysBetween('2026-10-02', '2026-10-02')).toBe(0)
    expect(daysBetween('2026-10-02', '2026-12-15')).toBe(74)
    expect(daysBetween('2026-10-02', '2026-09-30')).toBe(-2)
    // Across a daylight-saving change: still whole days.
    expect(daysBetween('2026-10-30', '2026-11-02')).toBe(3)
  })

  it('prints dates the way the shelf reads them', () => {
    expect(shortDate('2026-10-02')).toBe('Oct 2, 2026')
    expect(dayLabel('2026-12-15', '2026-10-02')).toBe('Dec 15')
    expect(dayLabel('2027-01-14', '2026-10-02')).toBe('Jan 14, 2027')
    expect(inDays(0)).toBe('today')
    expect(inDays(1)).toBe('tomorrow')
    expect(inDays(12)).toBe('in 12 days')
  })
})

describe('registrationStatus', () => {
  it('skips a sitting whose registration has closed for the next one, and says when it opens', () => {
    // Exam P's November 2026 window closed for registration on Sep 30; the
    // January 2027 window's registration opens "week of October 26, 2026".
    const status = registrationStatus('P', '2026-10-02')
    expect(status.state).toBe('opens')
    expect(status.sitting?.startDate).toBe('2027-01-14')
    expect(status.sitting?.format).toBe('CBT')
    expect(status.opens).toBe('2026-10-26')
    expect(status.opensWeekOf).toBe(true)
    expect(status.deadline).toBe('2026-12-15')
  })

  it('counts the days left once registration has opened', () => {
    const status = registrationStatus('P', '2026-11-01')
    expect(status.state).toBe('open')
    expect(status.deadline).toBe('2026-12-15')
    expect(status.daysLeft).toBe(44)
  })

  it('carries the time the body prints on the deadline', () => {
    const status = registrationStatus('FM', '2026-10-02')
    expect(status.state).toBe('open')
    expect(status.sitting?.startDate).toBe('2026-12-03')
    expect(status.deadlineNote).toBe('10:00 AM U.S. Central')
  })

  it('says registration has closed when the next published sitting is closed', () => {
    const status = registrationStatus('CAS-5', '2026-10-02')
    expect(status.state).toBe('closed')
    expect(status.sitting?.startDate).toBe('2026-10-19')
    expect(status.daysLeft).toBeUndefined()
  })

  it('takes a deadline the body published for the sitting over a sittings row that has none', () => {
    // PCPA's December 2026 project: its row carries no deadline, its details
    // carry the standing calendar's December 9.
    const status = registrationStatus('CAS-PCPA', '2026-10-02')
    expect(status.state).toBe('open')
    expect(status.sitting?.startDate).toBe('2026-12-16')
    expect(status.deadline).toBe('2026-12-09')
  })

  it('says when registration opens, before it has', () => {
    // CAS opened October/November 2026 registration on July 15.
    const status = registrationStatus('CAS-5', '2026-07-01')
    expect(status.state).toBe('opens')
    expect(status.opens).toBe('2026-07-15')
    expect(status.deadline).toBe('2026-09-29')
  })

  it('says nothing is scheduled rather than guessing a date', () => {
    expect(registrationStatus('CAS-5', '2027-06-01').state).toBe('unscheduled')
    expect(registrationStatus('CAS-DA', '2026-10-02').state).toBe('unscheduled')
  })
})

describe('registrationProducts', () => {
  const products = registrationProducts()

  it('has one per exam with a transcribed fee, in ladder order', () => {
    const keys = products.map(p => p.examKey)
    expect(keys).toEqual(STORE_EXAMS.map(e => e.key).filter(k => EXAM_FEES[k]))
  })

  it('prices a registration at the whole fee, and leaves the fee out of the facts', () => {
    const pcpa = products.find(p => p.examKey === 'CAS-PCPA')!
    expect(registrationPrice(pcpa)).toEqual({ amount: 1000, currency: 'USD' })
    for (const p of products) {
      expect(p.facts.some(f => f.label === 'Fee' || f.label === 'Fees')).toBe(false)
      expect(p.register.url).toMatch(/^https:\/\//)
    }
  })
})

describe('exams', () => {
  it('lists every exam on the DEFAULT and ACAS tracks that the shelf can narrow to', () => {
    const tracked = new Set(TRACKS.flatMap(t => t.sections.flatMap(s => s.items.map(i => i.id))))
    for (const exam of STORE_EXAMS) expect(tracked.has(exam.key), exam.key).toBe(true)
  })

  it('runs the accent ramp left to right', () => {
    const hues = STORE_EXAMS.map(e => EXAM_HUES[e.key]).filter((h): h is number => h !== undefined)
    expect(hues).toEqual([...hues].sort((a, b) => a - b))
  })

  it('reads the exam and aisle off the URL, and nothing else', () => {
    expect(parseStoreExam('FM')).toBe('FM')
    expect(parseStoreExam('FAM')).toBeNull()
    expect(parseStoreExam(null)).toBeNull()
    expect(parseAisle('calculators')).toBe('calculators')
    expect(parseAisle('cosmetics')).toBeNull()
    expect(STORE_AISLES).toHaveLength(4)
  })

  it('maps every reading-list label to an exam', () => {
    for (const label of ['Exam P-1', 'Exam FM-2', 'Exam MAS-I', 'Exam MAS-II', 'Exam 5', 'Exam PCPA', 'Exam 6C', 'Exam 6U', 'Exam 7', 'Exam 8', 'Exam 9']) {
      expect(readingExamKey(label), label).toBeDefined()
    }
  })

  it('puts a book on the shelf of every exam that assigns it, once', () => {
    const book: StoreBook = {
      name: 'x',
      title: 'x',
      isbn: '9780000000000',
      type: 'Textbook',
      readings: [{ exam: 'Exam 6U' }, { exam: 'Exam MAS-II' }, { exam: 'Exam 6C' }],
    }
    expect(bookExamKeys(book)).toEqual(['MAS-II', 'CAS-6'])
  })

  it('allows a calculator into the exams of the bodies that list it', () => {
    expect(calculatorAllowed(['SOA'], 'FM')).toBe(true)
    expect(calculatorAllowed(['SOA'], 'MAS-I')).toBe(false)
    expect(calculatorAllowed(['SOA', 'CAS'], 'CAS-7')).toBe(true)
    // The DISCs are The Institutes' online exams: no body's list applies.
    expect(calculatorAllowed(['SOA', 'CAS'], 'CAS-DA')).toBe(false)
  })
})

describe('the shelf', () => {
  const study = (id: string, exams: string[], kind: StudyProduct['kind'], amount: number): StudyProduct => ({
    id,
    kind,
    name: id,
    exams,
    offer: { sellerId: 'x', url: 'https://x.test', price: { amount, currency: 'USD' }, checked: '2026-10-02' },
  })

  const items = buildStoreItems(
    {
      study: [
        study('fm-bundle', ['FM'], 'bundle', 300),
        study('p-practice', ['P'], 'practice', 50),
        study('p-manual-dear', ['P'], 'manual', 250),
        study('p-manual-cheap', ['P'], 'manual', 150),
        study('mas-manual', ['MAS-I'], 'manual', 200),
        study('disc', ['CAS-DA'], 'course', 820),
      ].map((p, i) => (i === 5 ? { ...p, aisle: 'registration' as const } : p)),
      calculators: [],
    },
    [],
  )

  it('stands study materials exam by exam, like with like, cheapest first', () => {
    expect(items.filter(i => i.aisle === 'study').map(i => i.id)).toEqual([
      'p-manual-cheap',
      'p-manual-dear',
      'p-practice',
      'fm-bundle',
      'mas-manual',
    ])
  })

  it('puts a course that includes its exam among the registrations, up the ladder', () => {
    const registration = items.filter(i => i.aisle === 'registration').map(i => i.exams[0])
    expect(registration).toContain('CAS-DA')
    expect(registration.indexOf('CAS-DA')).toBeGreaterThan(registration.indexOf('MAS-II'))
    expect(registration.indexOf('CAS-DA')).toBeLessThan(registration.indexOf('CAS-5'))
  })

  it('showcases an aisle one exam at a time, up the ladder', () => {
    const shelf = items.filter(i => i.aisle === 'study')
    expect(showcase(shelf, 4).map(i => i.id)).toEqual(['p-manual-cheap', 'fm-bundle', 'mas-manual', 'p-manual-dear'])
  })

  it('narrowed to an exam, stands a bundle for two exams with the bundles', () => {
    const both = buildStoreItems(
      { study: [study('p-fm-bundle', ['P', 'FM'], 'bundle', 500), study('fm-manual', ['FM'], 'manual', 150)], calculators: [] },
      [],
    )
    const fm = storeShelf(both, { exam: 'FM', aisle: 'study' })[0]!.items.map(i => i.id)
    expect(fm).toEqual(['fm-manual', 'p-fm-bundle'])
  })

  it('narrows to an exam and drops the aisles left empty', () => {
    const shelf = storeShelf(items, { exam: 'FM', aisle: null })
    expect(shelf.map(g => g.aisle)).toEqual(['registration', 'study'])
    expect(aisleCounts(items, 'FM')).toEqual({ registration: 1, study: 1, calculators: 0, textbooks: 0 })
    expect(storeShelf(items, { exam: 'FM', aisle: 'textbooks' })).toEqual([])
  })
})

describe('registrationUrgency', () => {
  it('leads with what can be registered for now, soonest deadline first', () => {
    const items = buildStoreItems({ study: [], calculators: [] }, [])
    const order = registrationUrgency(items.filter(i => i.aisle === 'registration'), '2026-10-02').map(i => i.exams[0])
    // FM closes Nov 4 and PCPA Dec 9; P opens the week of Oct 26; the CAS
    // exams' October windows closed Sep 29.
    expect(order.slice(0, 2)).toEqual(['FM', 'CAS-PCPA'])
    expect(order.indexOf('P')).toBe(2)
    expect(order.indexOf('CAS-5')).toBeGreaterThan(order.indexOf('P'))
  })
})

describe('the filters', () => {
  const study = (id: string, exams: string[], amount: number, by?: string, sellerId = 'actex'): StudyProduct => ({
    id,
    kind: 'manual',
    name: id,
    exams,
    offer: { sellerId, url: 'https://x.test', price: { amount, currency: 'USD' }, checked: '2026-10-02' },
    facts: by ? [{ label: 'By', value: by }] : undefined,
  })
  const items = buildStoreItems(
    {
      study: [
        study('free-course', ['P'], 0, undefined, 'tia'),
        study('cheap', ['P'], 60, 'Jim Bedford, FCAS, MAAA'),
        study('mid', ['FM'], 250, 'Geoff Werner (ratemaking half) and Michael McPhail (reserving half)'),
        study('dear', ['FM'], 900),
      ],
      calculators: [],
    },
    [],
  )
  const ids = (filter: Partial<ShelfFilter>) =>
    storeShelf(items, { exam: null, aisle: 'study', ...filter }).flatMap(g => g.items.map(i => i.id))

  it('splits a "By" line into the people it names, without their credentials or roles', () => {
    expect(splitPeople('Jim Bedford, FCAS, MAAA')).toEqual(['Jim Bedford'])
    expect(splitPeople('Geoff Werner (ratemaking half) and Michael McPhail (reserving half)')).toEqual(['Geoff Werner', 'Michael McPhail'])
    expect(splitPeople('MAS-I Team: Tom Wakefield, Nao Mimoto, Jeffrey Pai')).toEqual(['Tom Wakefield', 'Nao Mimoto', 'Jeffrey Pai'])
    expect(splitPeople('Grossack (study manual); GOAL questions by Monadic (Hilary Masuka)')).toEqual(['Grossack', 'Monadic'])
    expect(splitPeople('Dr. Lendie Follett (course author)')).toEqual(['Lendie Follett'])
    expect(splitPeople('Dinius/Sadow/Okine')).toEqual(['Dinius', 'Sadow', 'Okine'])
  })

  it('leaves a team out, and joins a surname to the one full name it can mean', () => {
    expect(splitPeople('P Team')).toEqual([])
    const named = buildStoreItems(
      {
        study: [
          study('a', ['P'], 1, 'Weishaus'),
          study('b', ['P'], 1, 'Abraham Weishaus'),
          study('c', ['FM'], 1, 'S. Broverman'),
          study('d', ['FM'], 1, 'Samuel Broverman'),
          study('e', ['FM'], 1, 'Grossack'),
        ],
        calculators: [],
      },
      [],
    )
    expect(named.filter(i => i.type === 'study').map(i => i.makers.authors[0])).toEqual([
      'Abraham Weishaus',
      'Abraham Weishaus',
      'Samuel Broverman',
      'Samuel Broverman',
      'Grossack',
    ])
  })

  it('keeps only what is free', () => {
    expect(ids({ free: true })).toEqual(['free-course'])
    expect(isFreeItem(items.find(i => i.id === 'cheap')!)).toBe(false)
  })

  it('bands an item by its lowest price, any band chosen', () => {
    expect(priceBandOf(items.find(i => i.id === 'mid')!)).toBe('100-299')
    expect(ids({ prices: ['under-100'] })).toEqual(['free-course', 'cheap'])
    expect(ids({ prices: ['100-299', '600-plus'] })).toEqual(['mid', 'dear'])
    expect(parsePriceBands(['600-plus', 'nonsense', 'under-100'])).toEqual(['under-100', '600-plus'])
  })

  it('matches a publisher or an author, any of them', () => {
    expect(ids({ makers: ['Michael McPhail'] })).toEqual(['mid'])
    expect(ids({ makers: ['The Infinite Actuary', 'Jim Bedford'] })).toEqual(['free-course', 'cheap'])
    const options = makerOptions(items, { exam: 'FM', aisle: null })
    expect(options.publishers).toEqual([['ACTEX Learning', 2], ['Society of Actuaries', 1]])
    expect(options.authors.map(([name]) => name)).toEqual(['Geoff Werner', 'Michael McPhail'])
  })

  it('combines the filters, and counts the aisles under them', () => {
    expect(ids({ exam: 'FM', prices: ['600-plus'] })).toEqual(['dear'])
    expect(hasRefinement({ exam: 'FM', aisle: null })).toBe(false)
    expect(hasRefinement({ exam: null, aisle: null, free: true })).toBe(true)
    expect(aisleCounts(items, { exam: null, aisle: null, free: true }).study).toBe(1)
  })
})

describe('the comparison table', () => {
  const study = (id: string, kind: StudyProduct['kind'], amount: number, facts: { label: string; value: string }[] = []): StudyProduct => ({
    id,
    kind,
    name: id,
    exams: ['MAS-I'],
    offer: { sellerId: 'actex', url: 'https://x.test', price: { amount, currency: 'USD' }, checked: '2026-10-02' },
    facts,
  })
  const items = buildStoreItems(
    {
      study: [
        study('practice', 'practice', 90, [{ label: 'Access', value: '6 months' }]),
        study('manual-dear', 'manual', 300, [{ label: 'Format', value: 'Print' }, { label: 'By', value: 'A' }]),
        study('manual-cheap', 'manual', 200, [{ label: 'By', value: 'B' }]),
      ],
      calculators: [],
    },
    [],
  )

  it('lays an exam’s study materials side by side, like with like, cheapest first', () => {
    expect(comparisonFor(items, 'MAS-I').map(i => i.id)).toEqual(['manual-cheap', 'manual-dear', 'practice'])
    expect(comparisonFor(items, 'FM')).toEqual([])
    expect(comparableExams(items).map(e => e.key)).toEqual(['MAS-I'])
  })

  it('carries a row for every fact any of them states, in the order first seen', () => {
    expect(comparisonFactLabels(comparisonFor(items, 'MAS-I').map(i => i.study))).toEqual(['By', 'Format', 'Access'])
  })
})

describe('storeDisclaimer', () => {
  it('names the seller and the date its page was read', () => {
    const text = storeDisclaimer('ACTEX Learning', '2026-10-02').join(' ')
    expect(text).toContain('not affiliated with, endorsed by, sponsored by or acting for ACTEX Learning, the Society of Actuaries')
    expect(text).toContain('as read on October 2, 2026')
    expect(text).toContain('“as is”')
  })

  it('names an examining body once when it is the seller', () => {
    const text = storeDisclaimer('Society of Actuaries', null).join(' ')
    expect(text.match(/Society of Actuaries/g)).toHaveLength(1)
    expect(text).not.toContain('as read on')
  })
})

describe('reviews', () => {
  const review = (id: string, date: string | null, source: StoreReview['source'] = 'reddit'): StoreReview => ({
    productIds: [id],
    source,
    url: 'https://www.reddit.com/r/actuary/comments/x/',
    author: 'a',
    date,
    quote: 'q',
  })

  it('lists a product’s reviews newest first, and tallies them by source', () => {
    const reviews = [review('p', '2023-01-01'), review('p', null, 'publisher'), review('p', '2025-05-05', 'actuarial-outpost'), review('q', '2024-01-01')]
    expect(reviewsFor('p', reviews).map(r => r.date)).toEqual(['2025-05-05', '2023-01-01', null])
    expect(reviewTally(reviewsFor('p', reviews))).toEqual([
      { source: 'reddit', count: 1 },
      { source: 'actuarial-outpost', count: 1 },
      { source: 'publisher', count: 1 },
    ])
  })
})
