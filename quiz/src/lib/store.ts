// The **Store** — real products an actuarial candidate buys, gathered in one
// place: exam registration, study materials, the calculators the exams allow,
// and the syllabus textbooks. Nothing is sold here. Every product links out to
// the page where it is bought, and the app never sees the sale.
//
// This module is the Store's logic, kept pure so it can be tested without a
// page: what the aisles are, which exams the shelf can be narrowed to, how a
// product is matched to an exam, how a price is printed, and how a
// registration "product" is assembled from what the app already knows about
// each exam — its fee (`data/examFees.ts`) and its sittings
// (`data/examSittings.ts`, `data/examSittingDetails.ts`).
//
// The rule that keeps it honest is the vault's (`docs/store.md`): a price, a
// date or a list of contents is **transcribed from the seller, never
// constructed**, and carries the date it was read. Where a seller doesn't
// print something, the Store shows nothing in its place.

import type { CSSProperties } from 'react'
import { EXAM_FEES, feeTotal, type ExamFee } from '../data/examFees'
import { getSittingsForExam, type ExamSitting } from '../data/examSittings'
import { EXAM_ABOUT, sittingDetailsFor } from '../data/examSittingDetails'
import { daysBetween } from './sittingTimeline'
import { examAccentStyle } from './examColors'
import type { StoreBook } from './storeBooks'
import { STORE_SELLERS } from '../data/storeCatalog'

// ── Aisles ────────────────────────────────────────────────────────────────────

export type StoreAisle = 'registration' | 'study' | 'calculators' | 'textbooks'

/** In the order a candidate needs them: sign up, study, sit (with a calculator), read. */
export const STORE_AISLES: readonly StoreAisle[] = ['registration', 'study', 'calculators', 'textbooks']

export const AISLE_LABEL: Record<StoreAisle, string> = {
  registration: 'Registration',
  study: 'Study materials',
  calculators: 'Calculators',
  textbooks: 'Textbooks',
}

export function parseAisle(value: string | null | undefined): StoreAisle | null {
  return STORE_AISLES.find(a => a === value) ?? null
}

// ── Exams ─────────────────────────────────────────────────────────────────────

export type ExamBody = 'SOA' | 'CAS'

export interface StoreExam {
  /** The exam_progress key — `P`, `MAS-I`, `CAS-5`, `CAS-DA`. */
  key: string
  /** What the shelf calls it. */
  name: string
  /** Who sets it (and so whose calculator list applies). DISCs are The Institutes' courses: no list. */
  body: ExamBody | null
}

/**
 * The exams the shelf can be narrowed to, in the order of the ladder — the
 * preliminary exams, the MAS exams and the DISCs, then the upper exams with
 * PCPA where it is sat, after Exam 5. Read left to right, the strip of exam
 * logos runs the accent ramp from blue to red (`lib/examColors.ts`).
 */
export const STORE_EXAMS: readonly StoreExam[] = [
  { key: 'P', name: 'Exam P', body: 'SOA' },
  { key: 'FM', name: 'Exam FM', body: 'SOA' },
  { key: 'MAS-I', name: 'Exam MAS-I', body: 'CAS' },
  { key: 'MAS-II', name: 'Exam MAS-II', body: 'CAS' },
  { key: 'CAS-IA', name: 'DISC-IA', body: null },
  { key: 'CAS-DA', name: 'DISC-DA', body: null },
  { key: 'CAS-RM', name: 'DISC-RM', body: null },
  { key: 'CAS-5', name: 'Exam 5', body: 'CAS' },
  { key: 'CAS-PCPA', name: 'PCPA', body: 'CAS' },
  { key: 'CAS-6', name: 'Exam 6', body: 'CAS' },
  { key: 'CAS-7', name: 'Exam 7', body: 'CAS' },
  { key: 'CAS-8', name: 'Exam 8', body: 'CAS' },
  { key: 'CAS-9', name: 'Exam 9', body: 'CAS' },
]

const EXAM_BY_KEY = new Map(STORE_EXAMS.map(e => [e.key, e]))

export function storeExam(key: string): StoreExam | undefined {
  return EXAM_BY_KEY.get(key)
}

export function parseStoreExam(value: string | null | undefined): string | null {
  return value && EXAM_BY_KEY.has(value) ? value : null
}

function examRank(key: string): number {
  const i = STORE_EXAMS.findIndex(e => e.key === key)
  return i === -1 ? STORE_EXAMS.length : i
}

/**
 * The exam a reading-list label names — the labels `lib/resourceExams.ts`
 * prints on a resource's pills ("Exam P-1", "Exam 6C") — or undefined.
 */
const READING_LABEL_KEYS: Readonly<Record<string, string>> = {
  'Exam P-1': 'P',
  'Exam FM-2': 'FM',
  'Exam MAS-I': 'MAS-I',
  'Exam MAS-II': 'MAS-II',
  'Exam DISC-IA': 'CAS-IA',
  'Exam DISC-DA': 'CAS-DA',
  'Exam DISC-RM': 'CAS-RM',
  'Exam 5': 'CAS-5',
  'Exam PCPA': 'CAS-PCPA',
  'Exam 6C': 'CAS-6',
  'Exam 6U': 'CAS-6',
  'Exam 7': 'CAS-7',
  'Exam 8': 'CAS-8',
  'Exam 9': 'CAS-9',
}

export function readingExamKey(label: string): string | undefined {
  return READING_LABEL_KEYS[label]
}

// ── Prices ────────────────────────────────────────────────────────────────────

export type Currency = 'USD' | 'CAD'

export interface StorePrice {
  amount: number
  currency: Currency
  /** A qualifier the seller attaches — "per month", "6-month access". */
  note?: string
}

/** `$199`, `$21.95`, `CA$1,100` — cents only when there are some — and `Free` for nothing. */
export function formatPrice(price: Pick<StorePrice, 'amount' | 'currency'>): string {
  if (price.amount === 0) return 'Free'
  const whole = Number.isInteger(price.amount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price.amount)
}

/**
 * What a card prints for a set of prices: the one price, or the lowest with
 * "From" when they differ. Prices in two currencies aren't compared — the
 * first currency listed wins and the rest are left to the product sheet.
 */
export function priceSummary(prices: readonly StorePrice[]): { price: StorePrice; from: boolean } | null {
  if (prices.length === 0) return null
  const currency = prices[0]!.currency
  const same = prices.filter(p => p.currency === currency)
  const low = same.reduce((a, b) => (b.amount < a.amount ? b : a))
  const from = same.some(p => p.amount !== low.amount) || same.length < prices.length
  return { price: low, from }
}

// ── The authored catalogue (`data/storeCatalog.ts`) ──────────────────────────

export type SellerKind = 'examining-body' | 'study-provider' | 'manufacturer' | 'retailer'

export interface StoreSeller {
  id: string
  name: string
  /** A monogram for the tile when the logo is missing — "SOA", "CA". */
  short: string
  kind: SellerKind
  site: string
  /**
   * The seller's own mark, copied into `quiz/public/store-sellers/` rather
   * than hotlinked: a hotlink would make merely browsing the Store send a
   * request to every seller on it (the reasoning `lib/resourceMeta.ts` gives
   * for the "Get a copy" logos).
   */
  logo?: string
}

/** One choice the seller offers for a product — a format, an access length, a package. */
export interface StoreOption {
  name: string
  /**
   * The set of choices it belongs to, where the page splits them — ACTEX's
   * licences with and without instructional videos, Coaching Actuaries'
   * access lengths of Learn Complete and of Learn Lite.
   */
  group?: string
  price?: StorePrice
  /** The seller's own description of this option, where it has one. */
  description?: string
}

/** One place a product can be bought, as its page was read on `checked`. */
export interface StoreOffer {
  sellerId: string
  url: string
  price?: StorePrice
  options?: StoreOption[]
  /** When the page was read (ISO date). */
  checked: string
  /** A qualifier on the offer itself, in the seller's words. */
  note?: string
}

export type StudyKind = 'manual' | 'video' | 'practice' | 'flashcards' | 'bundle' | 'seminar' | 'course'

/** The order kinds stand in on a shelf: the books, then the teaching, then the drilling, then the bundles of all three. */
export const STUDY_KIND_ORDER: readonly StudyKind[] = ['manual', 'video', 'seminar', 'course', 'practice', 'flashcards', 'bundle']

export const STUDY_KIND_LABEL: Record<StudyKind, string> = {
  manual: 'Study manual',
  video: 'Video course',
  practice: 'Practice',
  flashcards: 'Flashcards',
  bundle: 'Bundle',
  seminar: 'Seminar',
  course: 'Online course',
}

/** A study material: a manual, a course, a question bank, a package of them. */
export interface StudyProduct {
  id: string
  kind: StudyKind
  /** As the seller titles it. */
  name: string
  exams: string[]
  /** Who makes it — and, here, sells it: the offer is on the maker's own site. */
  offer: StoreOffer
  /** What the seller says is included, condensed faithfully. */
  includes?: string[]
  /** Format, edition, access, authors — label / value, as the page states them. */
  facts?: { label: string; value: string }[]
  /** One sentence from the seller's own description, verbatim. */
  quote?: string
  /** The exam windows a course package is sold for, as the seller lists them. */
  windows?: string[]
  /** Which aisle it stands in — a course that includes the exam is sold as registration. */
  aisle?: 'study' | 'registration'
}

/** What the examining bodies say about calculators, transcribed. */
export interface CalculatorPolicy {
  body: ExamBody
  url: string
  /** The page or document, as the reader will see it linked. */
  label: string
  /** The approved models, in the body's words and order. */
  models: string[]
  /** Its rules, verbatim. */
  rules: string[]
  checked: string
}

/** How a calculator is drawn (`components/store/CalculatorArt.tsx`). */
export interface CalculatorLook {
  /** Lines on the display: the TI-30Xa has one, the MultiView four. */
  lines: 1 | 2 | 4
  body: 'black' | 'charcoal' | 'navy' | 'silver' | 'slate'
  /** The keypad's highlight keys — `2nd`, `enter`. */
  accent: 'green' | 'amber' | 'sky' | 'none'
  /** A financial calculator's top row (CPT, ENTER, the TVM keys) reads differently. */
  financial?: boolean
  solar?: boolean
}

export interface CalculatorProduct {
  id: string
  /** The model, as the maker names it. */
  model: string
  makerId: string
  makerUrl?: string
  approvedBy: ExamBody[]
  look: CalculatorLook
  /** Facts from the maker's page: display, power. */
  facts?: { label: string; value: string }[]
  /** What it does, from the maker's page. */
  features?: string[]
  quote?: string
  offers: StoreOffer[]
  /** A search for the model at Amazon — a search, never a listing. */
  amazonSearch?: string
  /**
   * Its twin on the same line of the bodies' lists — "TI-30XS MultiView (or
   * XB battery)" — sold as a separate model.
   */
  variants?: { model: string; note: string; makerUrl?: string; amazonSearch?: string }[]
  /** No longer made: the maker keeps no product page and no seller lists it new. */
  discontinued?: boolean
  checked: string
}

/** Every price an offer carries — its own and its options'. */
export function offerPrices(offer: StoreOffer): StorePrice[] {
  const prices: StorePrice[] = []
  if (offer.price) prices.push(offer.price)
  for (const option of offer.options ?? []) if (option.price) prices.push(option.price)
  return prices
}

// ── Dates ─────────────────────────────────────────────────────────────────────

/** Today as an ISO date, in the reader's own calendar. */
export function isoDay(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Whole days between two ISO dates — the sitting timeline's count, so the two never disagree. */
export { daysBetween }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** `Oct 2, 2026` — how the Store says when something was read. */
export function shortDate(iso: string): string {
  return `${MONTHS[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}, ${iso.slice(0, 4)}`
}

/** `Oct 2` this year, `Jan 14, 2027` otherwise. */
export function dayLabel(iso: string, today: string): string {
  const base = `${MONTHS[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}`
  return iso.slice(0, 4) === today.slice(0, 4) ? base : `${base}, ${iso.slice(0, 4)}`
}

/** "today", "tomorrow", "in 12 days". */
export function inDays(days: number): string {
  if (days <= 0) return 'today'
  if (days === 1) return 'tomorrow'
  return `in ${days} days`
}

// ── Registration ──────────────────────────────────────────────────────────────

export interface RegistrationPage {
  label: string
  url: string
  /** How the body says registration works, in its words (read 2026-10-02). */
  notes: string[]
}

/** Where each body takes registrations. */
export const REGISTRATION_PAGES: Readonly<Record<ExamBody, RegistrationPage>> = {
  SOA: {
    label: 'SOA — Exam registration',
    url: 'https://www.soa.org/education/exam-req/registration/edu-registration/',
    notes: [
      'Exams P and FM are offered as continuous registration. For these two exams, registration closes at 10:00 AM U.S. CDT/CST on the posted date.',
      'Examinations are NON-REFUNDABLE.',
    ],
  },
  CAS: {
    label: 'CAS — Exam registration',
    url: 'https://www.casact.org/exams-admissions/exam-registration',
    notes: ['All candidates must register online and pay the required fees by the registration deadline.'],
  },
}

export type RegistrationState =
  /** A sitting is taking registrations: register by `deadline`. */
  | 'open'
  /** The next sitting has a published deadline, but registration hasn't opened yet. */
  | 'opens'
  /** Registration for the next published sitting has closed. */
  | 'closed'
  /** No upcoming sitting has been published. */
  | 'unscheduled'

export interface RegistrationStatus {
  state: RegistrationState
  /** The sitting this status is about — the one to register for, or the next one published. */
  sitting?: ExamSitting
  /** Its registration deadline (ISO), when published. */
  deadline?: string
  /** The time on that deadline, as the body prints it — "10:00 AM U.S. Central". */
  deadlineNote?: string
  /** Whole days left to register, while `open`. */
  daysLeft?: number
  /** When registration opens, while `opens`. */
  opens?: string
  /** The body gives a week, not a day: "Registration opens week of October 26". */
  opensWeekOf?: boolean
}

/**
 * One row per window: a sitting offered as a CBT window and a paper day that
 * start together (SOA's P and FM) is one sitting to register for, and the
 * window is the row that says how long it runs.
 */
function windows(sittings: readonly ExamSitting[]): ExamSitting[] {
  const byStart = new Map<string, ExamSitting>()
  for (const s of sittings) {
    const held = byStart.get(s.startDate)
    if (!held || (held.format !== 'CBT' && s.format === 'CBT')) byStart.set(s.startDate, s)
  }
  return [...byStart.values()].sort((a, b) => a.startDate.localeCompare(b.startDate))
}

/**
 * A sitting's registration dates. A deadline transcribed into
 * `data/examSittingDetails.ts` is the body's own word on that sitting and
 * replaces the one its sittings row carries — the timeline's rule
 * (`lib/sittingTimeline.ts`) — so the ticket and the info panel never disagree.
 */
function registrationDates(
  examKey: string,
  sitting: ExamSitting,
): { deadline?: string; deadlineNote?: string; opens?: string; opensWeekOf?: boolean } {
  const milestones = sittingDetailsFor(examKey, sitting)?.milestones ?? []
  const transcribed = milestones.find(m => m.kind === 'registration-deadline')
  const deadline = transcribed?.date ?? sitting.registrationDeadline ?? undefined
  const opens = milestones.find(m => m.kind === 'registration-opens')
  return { deadline, deadlineNote: transcribed?.note, opens: opens?.date, opensWeekOf: /week of/i.test(opens?.label ?? '') }
}

/**
 * Where an exam's registration stands on `today` (ISO): the first published
 * sitting whose deadline hasn't passed — open, or not open yet — else the next
 * sitting (closed), else nothing published. Read from the sittings tables: a
 * deadline is the body's, never estimated from a pattern.
 */
export function registrationStatus(examKey: string, today: string): RegistrationStatus {
  const todayDate = new Date(`${today}T12:00:00`)
  const dated = windows(getSittingsForExam(examKey, todayDate)).map(sitting => ({ sitting, ...registrationDates(examKey, sitting) }))
  const live = dated.find(d => d.deadline && d.deadline >= today)
  const pick = live ?? dated[0]
  if (!pick) return { state: 'unscheduled' }

  const status: RegistrationStatus = { state: 'closed', sitting: pick.sitting }
  if (pick.deadline) status.deadline = pick.deadline
  if (pick.deadlineNote) status.deadlineNote = pick.deadlineNote
  if (live) {
    if (live.opens && live.opens > today) {
      status.state = 'opens'
      status.opens = live.opens
      if (live.opensWeekOf) status.opensWeekOf = true
    } else {
      status.state = 'open'
      status.daysLeft = daysBetween(today, live.deadline!)
    }
  }
  return status
}

export interface RegistrationProduct {
  examKey: string
  body: ExamBody
  fee: ExamFee
  /** How the exam is sat — `EXAM_ABOUT`'s rows, less the fee (which is the price). */
  facts: { label: string; value: string }[]
  /** The body's own page for the exam. */
  examPage: { label: string; url: string }
  register: RegistrationPage
}

/** The registration "product" for every exam with a transcribed fee, in ladder order. */
export function registrationProducts(): RegistrationProduct[] {
  const out: RegistrationProduct[] = []
  for (const exam of STORE_EXAMS) {
    const fee = EXAM_FEES[exam.key]
    if (!fee || !exam.body) continue
    const about = EXAM_ABOUT[exam.key]
    out.push({
      examKey: exam.key,
      body: fee.body,
      fee,
      facts: (about?.facts ?? []).filter(f => f.label !== 'Fee' && f.label !== 'Fees'),
      examPage: about?.source ?? { label: REGISTRATION_PAGES[fee.body].label, url: REGISTRATION_PAGES[fee.body].url },
      register: REGISTRATION_PAGES[fee.body],
    })
  }
  return out
}

/** A registration's price: the full fee to sit every part. */
export function registrationPrice(product: RegistrationProduct): StorePrice {
  return { amount: feeTotal(product.fee), currency: 'USD' }
}

// ── Exam matching ─────────────────────────────────────────────────────────────

/** The exams a textbook is a reading for, as store keys, in ladder order. */
export function bookExamKeys(book: StoreBook): string[] {
  const keys = new Set<string>()
  for (const r of book.readings) {
    const key = readingExamKey(r.exam)
    if (key) keys.add(key)
  }
  return [...keys].sort((a, b) => examRank(a) - examRank(b))
}

/** Whether a calculator the given bodies approve may be taken into this exam. */
export function calculatorAllowed(approvedBy: readonly ExamBody[], examKey: string): boolean {
  const body = storeExam(examKey)?.body
  return !!body && approvedBy.includes(body)
}

/** Sort keys by the ladder. */
export function byLadder(a: string, b: string): number {
  return examRank(a) - examRank(b)
}

// ── The shelf ─────────────────────────────────────────────────────────────────

interface ItemBase {
  id: string
  aisle: StoreAisle
  name: string
  /** The exams it is for, in ladder order. A calculator's are its bodies' (`calculatorAllowed`). */
  exams: string[]
  /** Who sells it, when one seller does. */
  sellerId?: string
  /** Every price it is offered at — the card prints the lowest. */
  prices: StorePrice[]
  /** Who publishes it — the seller, the examining body, a book's publisher — and who wrote it. */
  makers: Makers
}

export interface Makers {
  publishers: string[]
  authors: string[]
}

export type StoreItem =
  | (ItemBase & { type: 'registration'; registration: RegistrationProduct })
  | (ItemBase & { type: 'study'; study: StudyProduct })
  | (ItemBase & { type: 'calculator'; calculator: CalculatorProduct })
  | (ItemBase & { type: 'book'; book: StoreBook })

export interface StoreCatalog {
  study: readonly StudyProduct[]
  calculators: readonly CalculatorProduct[]
}

/**
 * Everything on the Store's shelves, aisle by aisle: a registration per exam
 * with a fee, the study materials (a course package that includes the exam
 * stands with registration), the calculators and the textbooks.
 */
export function buildStoreItems(catalog: StoreCatalog, books: readonly StoreBook[]): StoreItem[] {
  const items: StoreItem[] = []

  for (const registration of registrationProducts()) {
    const exam = storeExam(registration.examKey)!
    items.push({
      type: 'registration',
      id: `register-${registration.examKey}`,
      aisle: 'registration',
      name: `Register for ${exam.name}`,
      exams: [registration.examKey],
      sellerId: registration.body.toLowerCase(),
      prices: [registrationPrice(registration)],
      makers: { publishers: sellerNames(registration.body.toLowerCase()), authors: [] },
      registration,
    })
  }

  // Exam by exam, and within an exam like with like — the manuals together,
  // then the courses, the practice banks, the bundles — cheapest first, so a
  // shelf reads as a comparison rather than as each seller's catalogue.
  const ladder = (exams: readonly string[]) => [...exams].sort(byLadder)
  const lowest = (product: StudyProduct) => Math.min(...offerPrices(product.offer).map(p => p.amount), Infinity)
  const study = [...catalog.study].sort((a, b) =>
    examRank(ladder(a.exams)[0] ?? '') - examRank(ladder(b.exams)[0] ?? '') ||
    STUDY_KIND_ORDER.indexOf(a.kind) - STUDY_KIND_ORDER.indexOf(b.kind) ||
    lowest(a) - lowest(b) ||
    a.name.localeCompare(b.name),
  )
  for (const product of study) {
    items.push({
      type: 'study',
      id: product.id,
      aisle: product.aisle ?? 'study',
      name: product.name,
      exams: ladder(product.exams),
      sellerId: product.offer.sellerId,
      prices: offerPrices(product.offer),
      makers: {
        publishers: sellerNames(product.offer.sellerId),
        authors: (product.facts ?? []).filter(f => f.label === 'By').flatMap(f => splitPeople(f.value)),
      },
      study: product,
    })
  }

  for (const calculator of catalog.calculators) {
    items.push({
      type: 'calculator',
      id: calculator.id,
      aisle: 'calculators',
      name: calculator.model,
      exams: [],
      sellerId: calculator.makerId,
      prices: calculator.offers.flatMap(offerPrices),
      makers: { publishers: sellerNames(calculator.makerId), authors: [] },
      calculator,
    })
  }

  for (const book of books) {
    items.push({
      type: 'book',
      id: `book-${book.isbn}`,
      aisle: 'textbooks',
      name: book.title,
      exams: bookExamKeys(book),
      prices: [],
      makers: { publishers: book.publisher ? [book.publisher] : [], authors: book.authors ? splitPeople(book.authors) : [] },
      book,
    })
  }

  // Aisle by aisle; registration up the ladder, a DISC's course package in
  // its place among the exams; every other aisle in the order it was built in.
  canonicalAuthors(items)

  return STORE_AISLES.flatMap(aisle => {
    const shelf = items.filter(i => i.aisle === aisle)
    return aisle === 'registration' ? shelf.sort((a, b) => byLadder(a.exams[0] ?? '', b.exams[0] ?? '')) : shelf
  })
}

/**
 * The registrations to put first: what can be registered for now, soonest
 * deadline first — then a course that includes its exam (on sale now, with no
 * deadline printed), then a registration that hasn't opened yet, then the
 * closed and the unscheduled. The front shelf leads with this; the aisle
 * itself stays in ladder order.
 */
export function registrationUrgency(items: readonly StoreItem[], today: string): StoreItem[] {
  const rank = (item: StoreItem): [number, number] => {
    if (item.type !== 'registration') return [1, 0]
    const status = registrationStatus(item.exams[0]!, today)
    if (status.state === 'open') return [0, status.daysLeft ?? 0]
    if (status.state === 'opens') return [2, daysBetween(today, status.opens!)]
    return [status.state === 'closed' ? 3 : 4, 0]
  }
  return items
    .map((item, i) => ({ item, i, rank: rank(item) }))
    .sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1] || a.i - b.i)
    .map(x => x.item)
}

/**
 * A few items to stand for a whole aisle, taken one exam at a time up the
 * ladder — P, then FM, then MAS-I — and round again, so the Store's front
 * shelf shows its range (and the accent ramp) rather than six of Exam P's.
 * Items for no one exam (the calculators) keep their order.
 */
export function showcase(items: readonly StoreItem[], count: number): StoreItem[] {
  const byExam = new Map<string, StoreItem[]>()
  const unbound: StoreItem[] = []
  for (const item of items) {
    const key = item.exams[0]
    if (!key) {
      unbound.push(item)
      continue
    }
    const list = byExam.get(key) ?? []
    list.push(item)
    byExam.set(key, list)
  }
  const queues = [...byExam.entries()].sort(([a], [b]) => byLadder(a, b)).map(([, list]) => list)
  const out: StoreItem[] = [...unbound.slice(0, count)]
  for (let round = 0; out.length < count && queues.some(q => q.length > round); round++) {
    for (const queue of queues) {
      if (out.length >= count) break
      if (queue[round]) out.push(queue[round]!)
    }
  }
  return out
}

/** Whether an item belongs on the shelf of this exam. */
export function itemMatchesExam(item: StoreItem, examKey: string): boolean {
  if (item.type === 'calculator') return calculatorAllowed(item.calculator.approvedBy, examKey)
  return item.exams.includes(examKey)
}

export interface ShelfFilter {
  exam: string | null
  aisle: StoreAisle | null
  /** Only what costs nothing: a free course, a textbook its publisher puts online. */
  free?: boolean
  /** Price bands, any of them (OR). An item with no printed price is in none. */
  prices?: readonly PriceBand[]
  /** Publishers and authors, any of them (OR) — `Makers`, by name. */
  makers?: readonly string[]
}

/** Whether any of the free / price / maker filters is on — the shelf then shows every match, not a preview. */
export function hasRefinement(filter: ShelfFilter): boolean {
  return !!filter.free || (filter.prices?.length ?? 0) > 0 || (filter.makers?.length ?? 0) > 0
}

/** Whether an item passes every filter but the aisle (AND across filters, OR within one). */
export function itemMatchesFilter(item: StoreItem, filter: ShelfFilter): boolean {
  if (filter.exam && !itemMatchesExam(item, filter.exam)) return false
  if (filter.free && !isFreeItem(item)) return false
  if (filter.prices?.length) {
    const band = priceBandOf(item)
    if (!band || !filter.prices.includes(band)) return false
  }
  if (filter.makers?.length) {
    const names = [...item.makers.publishers, ...item.makers.authors]
    if (!filter.makers.some(m => names.includes(m))) return false
  }
  return true
}

/**
 * The shelf as filtered: each aisle with what is in it, empty aisles dropped.
 * Narrowed to one exam, study materials stand like with like — a bundle for P
 * and FM among FM's bundles, not ahead of FM's manuals because P comes first.
 */
export function storeShelf(items: readonly StoreItem[], filter: ShelfFilter): { aisle: StoreAisle; items: StoreItem[] }[] {
  return STORE_AISLES
    .filter(aisle => !filter.aisle || filter.aisle === aisle)
    .map(aisle => {
      const shelf = items.filter(i => i.aisle === aisle && itemMatchesFilter(i, filter))
      return { aisle, items: filter.exam && aisle === 'study' ? byKindThenPrice(shelf) : shelf }
    })
    .filter(group => group.items.length > 0)
}

function byKindThenPrice(items: StoreItem[]): StoreItem[] {
  const kindRank = (item: StoreItem) => (item.type === 'study' ? STUDY_KIND_ORDER.indexOf(item.study.kind) : STUDY_KIND_ORDER.length)
  const low = (item: StoreItem) => lowestPrice(item) ?? Infinity
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => kindRank(a.item) - kindRank(b.item) || low(a.item) - low(b.item) || a.i - b.i)
    .map(x => x.item)
}

/** How many items each aisle holds under a filter (its own aisle aside) — the aisle pills' counts. */
export function aisleCounts(items: readonly StoreItem[], filter: ShelfFilter | string | null): Record<StoreAisle, number> {
  const f: ShelfFilter = typeof filter === 'object' && filter !== null ? filter : { exam: filter, aisle: null }
  const counts = { registration: 0, study: 0, calculators: 0, textbooks: 0 } as Record<StoreAisle, number>
  for (const item of items) if (itemMatchesFilter(item, f)) counts[item.aisle]++
  return counts
}

// ── Price filters ─────────────────────────────────────────────────────────────

/** Free: every price it is sold at is nothing — or, a textbook, its publisher puts it online. */
export function isFreeItem(item: StoreItem): boolean {
  if (item.type === 'book') return !!item.book.freeUrl
  return item.prices.length > 0 && item.prices.every(p => p.amount === 0)
}

/** The lowest price an item is printed at, or null when it carries none (a textbook, a discontinued calculator). */
export function lowestPrice(item: StoreItem): number | null {
  if (item.type === 'book' && item.book.freeUrl) return 0
  return item.prices.length ? Math.min(...item.prices.map(p => p.amount)) : null
}

export type PriceBand = 'under-100' | '100-299' | '300-599' | '600-plus'

/** The price filter's bands, cheapest first. A band holds an item whose *lowest* price falls in it. */
export const PRICE_BANDS: readonly { id: PriceBand; label: string; min: number; max: number }[] = [
  { id: 'under-100', label: 'Under $100', min: 0, max: 100 },
  { id: '100-299', label: '$100 – $299', min: 100, max: 300 },
  { id: '300-599', label: '$300 – $599', min: 300, max: 600 },
  { id: '600-plus', label: '$600 and up', min: 600, max: Infinity },
]

export function parsePriceBands(values: readonly string[]): PriceBand[] {
  return PRICE_BANDS.map(b => b.id).filter(id => values.includes(id))
}

export function priceBandOf(item: StoreItem): PriceBand | null {
  const low = lowestPrice(item)
  if (low === null) return null
  return PRICE_BANDS.find(b => low >= b.min && low < b.max)?.id ?? null
}

// ── Publishers and authors ────────────────────────────────────────────────────

function sellerNames(sellerId: string): string[] {
  const seller = STORE_SELLERS[sellerId]
  return seller ? [seller.name] : []
}

const CREDENTIAL = /^(?:FCAS|ACAS|FSA|ASA|MAAA|CERA|FCIA|ACIA|CFA|PhD|Ph\.D\.|CPA)$/i

/**
 * The people a "By" line or a book's Authors names, one by one, as written:
 * "Geoff Werner (ratemaking half) and Michael McPhail (reserving half)" →
 * Geoff Werner, Michael McPhail; "Jim Bedford, FCAS, MAAA" → Jim Bedford. A
 * team's name and a role in brackets are the seller's wording about the
 * people, not people, and are left out.
 */
export function splitPeople(text: string): string[] {
  const names = text
    .replace(/\([^)]*\)/g, ' ')
    .split(/;|\/|,|\band\b|&/)
    .map(part => part
      .replace(/^.*\bTeam:\s*/i, '')
      .replace(/^.*\bby\s+/i, '')
      .replace(/^Dr\.?\s+/i, '')
      .replace(/\s+/g, ' ')
      .trim())
    .filter(part => part && !CREDENTIAL.test(part) && !/\bTeam$/i.test(part))
  return [...new Set(names)]
}

/**
 * One person, one name in the filter: a seller that prints a surname alone
 * ("Weishaus") or with an initial ("S. Broverman") means the one author on the
 * shelf with that surname (and initial) written in full — when there is
 * exactly one. Anything less certain is left as printed.
 */
export function canonicalAuthors(items: StoreItem[]): void {
  const all = [...new Set(items.flatMap(i => i.makers.authors))]
  const words = (name: string) => name.split(' ')
  const isFull = (name: string) => words(name).length >= 2 && !/^[A-Z]\.$/.test(words(name)[0]!)
  const canonical = new Map<string, string>()
  for (const name of all) {
    if (isFull(name)) continue
    const surname = words(name).at(-1)!
    const initial = words(name).length > 1 ? words(name)[0]![0] : null
    const matches = all.filter(n => isFull(n) && words(n).at(-1) === surname && (!initial || n.startsWith(initial)))
    if (matches.length === 1) canonical.set(name, matches[0]!)
  }
  for (const item of items) {
    item.makers.authors = [...new Set(item.makers.authors.map(n => canonical.get(n) ?? n))]
  }
}

/** Every publisher and author on the shelf (under the other filters), with how many items each has — the filter's options. */
export function makerOptions(items: readonly StoreItem[], filter: ShelfFilter): { publishers: [string, number][]; authors: [string, number][] } {
  const pool = items.filter(i => (!filter.aisle || i.aisle === filter.aisle) && itemMatchesFilter(i, { ...filter, makers: [] }))
  const tally = (pick: (m: Makers) => string[]) => {
    const counts = new Map<string, number>()
    for (const item of pool) for (const name of new Set(pick(item.makers))) counts.set(name, (counts.get(name) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }
  return { publishers: tally(m => m.publishers), authors: tally(m => m.authors) }
}

/** The exams that have anything on the shelf, in ladder order — the strip. */
export function stockedExams(items: readonly StoreItem[]): StoreExam[] {
  return STORE_EXAMS.filter(exam => items.some(item => item.type !== 'calculator' && itemMatchesExam(item, exam.key)))
}

// ── Pictures ──────────────────────────────────────────────────────────────────

/**
 * The accent a picture is painted in: the exam's, or — for something that
 * belongs to no rung of the ladder (a DISC course, a calculator every exam
 * allows) — a neutral slate, the way an exam logo falls back to a neutral
 * tile rather than borrowing a hue.
 */
export function artAccentStyle(examKey: string | undefined): CSSProperties {
  return (examKey ? examAccentStyle(examKey) : undefined) ?? NEUTRAL_ACCENT
}

const NEUTRAL_ACCENT = {
  '--exam-accent': 'rgb(100 116 139)',
  '--exam-accent-muted': 'rgb(100 116 139 / 0.45)',
  '--exam-accent-soft': 'rgb(100 116 139 / 0.12)',
  '--exam-accent-vivid': 'rgb(71 85 105)',
} as CSSProperties

// ── Comparing study materials ─────────────────────────────────────────────────

export type StudyItem = Extract<StoreItem, { type: 'study' }>

/** The study materials an exam's comparison table lays side by side: like with like, cheapest first. */
export function comparisonFor(items: readonly StoreItem[], examKey: string): StudyItem[] {
  const study = items.filter((i): i is StudyItem => i.type === 'study' && i.exams.includes(examKey))
  return byKindThenPrice(study) as StudyItem[]
}

/** The exams with at least two study materials to compare, in ladder order. */
export function comparableExams(items: readonly StoreItem[]): StoreExam[] {
  return STORE_EXAMS.filter(exam => comparisonFor(items, exam.key).length >= 2)
}

/**
 * The detail rows a comparison table carries — every fact label any of the
 * products prints ("Format", "Access", "By", "Edition"), in the order they
 * first appear. A product that doesn't state one shows nothing in its cell.
 */
export function comparisonFactLabels(products: readonly StudyProduct[]): string[] {
  const labels: string[] = []
  for (const p of products) for (const f of p.facts ?? []) if (!labels.includes(f.label)) labels.push(f.label)
  return labels
}

// ── The disclaimer ────────────────────────────────────────────────────────────

/**
 * The legal notice under every listing. It says what the Store is and isn't:
 * independent of the seller and of the examining bodies; names and marks
 * used only to identify the product; the facts transcribed on a date and
 * governed by the seller's own page; reviews quoted as their authors wrote
 * them; no advice; no warranty. `seller` and `checked` name the listing's own
 * seller and the date its page was read, where it has them.
 */
export function storeDisclaimer(seller: string | null, checked: string | null): string[] {
  const bodies = ['the Society of Actuaries', 'the Casualty Actuarial Society']
  const named = seller && !bodies.some(b => b.toLowerCase() === `the ${seller.toLowerCase()}`) ? [seller, ...bodies] : bodies
  const whom = `${named.join(', ')} or any other organization named here`
  return [
    `Actuarial Notes is an independent study resource. It is not affiliated with, endorsed by, sponsored by or acting for ${whom}. Product names, logos and trademarks are the property of their owners and appear only to identify the products.`,
    `Prices, contents, dates and other details are transcribed from the seller’s public page${checked ? ` as read on ${longDate(checked)}` : ''} and may have changed since. The seller’s own page and terms govern any purchase; confirm every detail there before you buy. Nothing in the Store is sold, and no payment for it is taken, on Actuarial Notes.`,
    'Reviews are excerpts of public posts and published testimonials, quoted as their authors wrote them and linked to where they appear. They are the opinions of their authors, not of Actuarial Notes, and are not verified purchases.',
    'This information is provided “as is”, for general information only, without warranty of any kind, and is not professional, financial or purchasing advice. Listing a product is not a recommendation, and no listing is a paid placement.',
  ]
}

function longDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y!, m! - 1, d!)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

// ── Reviews ───────────────────────────────────────────────────────────────────

/** Where a review was read: r/actuary, the Actuarial Outpost forum, or the seller's own page. */
export type ReviewSource = 'reddit' | 'actuarial-outpost' | 'publisher'

export const REVIEW_SOURCE_ORDER: readonly ReviewSource[] = ['reddit', 'actuarial-outpost', 'publisher']

/**
 * One review, **quoted as its author wrote it** — cut only at an ellipsis,
 * never reworded — with the link to where it appears and its date. A rating
 * is carried only when the source prints one beside the review.
 */
export interface StoreReview {
  productIds: string[]
  source: ReviewSource
  url: string
  author: string | null
  date: string | null
  quote: string
  rating?: number | null
  ratingOutOf?: number | null
}

/** A seller's own aggregate rating for a product, as its page prints it ("4.8 out of 5, 312 reviews"). */
export interface PublisherRating {
  productId: string
  value: number
  outOf: number
  count: number | null
  url: string
}

/** A product's reviews, newest first (undated last). */
export function reviewsFor(productId: string, reviews: readonly StoreReview[]): StoreReview[] {
  return reviews
    .filter(r => r.productIds.includes(productId))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

/** How many reviews a product has from each source, in source order, sources with none left out. */
export function reviewTally(reviews: readonly StoreReview[]): { source: ReviewSource; count: number }[] {
  return REVIEW_SOURCE_ORDER
    .map(source => ({ source, count: reviews.filter(r => r.source === source).length }))
    .filter(t => t.count > 0)
}
