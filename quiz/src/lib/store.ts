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
      book,
    })
  }

  // Aisle by aisle; registration up the ladder, a DISC's course package in
  // its place among the exams; every other aisle in the order it was built in.
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
      const shelf = items.filter(i => i.aisle === aisle && (!filter.exam || itemMatchesExam(i, filter.exam)))
      return { aisle, items: filter.exam && aisle === 'study' ? byKindThenPrice(shelf) : shelf }
    })
    .filter(group => group.items.length > 0)
}

function byKindThenPrice(items: StoreItem[]): StoreItem[] {
  const kindRank = (item: StoreItem) => (item.type === 'study' ? STUDY_KIND_ORDER.indexOf(item.study.kind) : STUDY_KIND_ORDER.length)
  const low = (item: StoreItem) => Math.min(...item.prices.map(p => p.amount), Infinity)
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => kindRank(a.item) - kindRank(b.item) || low(a.item) - low(b.item) || a.i - b.i)
    .map(x => x.item)
}

/** How many items each aisle holds for an exam (or the whole Store) — the aisle pills' counts. */
export function aisleCounts(items: readonly StoreItem[], exam: string | null): Record<StoreAisle, number> {
  const counts = { registration: 0, study: 0, calculators: 0, textbooks: 0 } as Record<StoreAisle, number>
  for (const item of items) if (!exam || itemMatchesExam(item, exam)) counts[item.aisle]++
  return counts
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
