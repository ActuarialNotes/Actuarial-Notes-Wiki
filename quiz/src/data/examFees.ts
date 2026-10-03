/**
 * **What each exam costs to sit** — the examining bodies' fee tables,
 * transcribed. Two surfaces read it, and it is the one copy of the numbers
 * either of them prints:
 *
 *   • the study guide's info panel (`data/examSittingDetails.ts` builds its
 *     "Fee" row from `feeFact`), and
 *   • the Store's **Registration** aisle (`lib/store.ts`), which shows the fee
 *     as the price of registering.
 *
 * ── Rules for this file ─────────────────────────────────────────────────────
 * The rule of `examSittingDetails.ts` and the pass-rate tables: a fee is
 * **transcribed from the body's own fee page, never constructed**. A fee the
 * page doesn't print is absent, and the surfaces show none. What a body says
 * the fee includes, or what it costs to cancel, is carried in its own words.
 *
 * Every amount is in US dollars — both pages say so ("All amounts are in U.S.
 * dollars", SOA; CAS prints `$` throughout and bills in USD).
 */

export interface FeePart {
  /** What this part of the fee is for, when an exam has more than one — "exam", "project". */
  part?: string
  /** The candidate fee, in US dollars. */
  amount: number
  /** The full-time student rate, where the body offers one. */
  student?: number
}

export interface ExamFee {
  body: 'SOA' | 'CAS'
  parts: FeePart[]
  /** The fee page, as the reader will see it linked. */
  source: { label: string; url: string }
  /** When the page was read (ISO date). */
  checked: string
  /** What the body says the fee pays for, in its words. */
  includes?: string[]
  /** The fine print the body attaches — cancellation, no-shows — in its words. */
  terms?: string[]
}

const SOA_FEES_PAGE = {
  label: 'SOA — Exam fees',
  url: 'https://www.soa.org/education/exam-req/syllabus-study-materials/exam-and-module-fees/',
}
const CAS_FEES_PAGE = {
  label: 'CAS — Exam fees',
  url: 'https://www.casact.org/exams-admissions/exams/exam-fees',
}

// SOA — "Exam and e-Learning Module Fees, Updated December 16, 2025", ASA
// Exams and Modules 2026: "Probability (P) Exam $ 275.00", "Financial
// Mathematics (FM) Exam $ 275.00". Read 2026-10-02.
const SOA_PRELIMINARY: Omit<ExamFee, 'parts'> = {
  body: 'SOA',
  source: SOA_FEES_PAGE,
  checked: '2026-10-02',
  includes: ['The fees for the preliminary (ASA) exams include electronic access to the required study notes.'],
  terms: ['Reduced exam fees, exam reimbursement, and scholarship opportunities are available to eligible candidates.'],
}

// CAS — "Exam and Project Fees, updated April 2025". Read 2026-10-02.
const CAS_TERMS = [
  'Refund/Cancellation Fee: $200 (cancel the Pearson VUE appointment as well as the CAS registration by the refund deadline).',
  'Cancellation after refund deadline: Forfeiture of exam fee.',
  'No-show Fee: Forfeiture of exam fee and $100 administrative fee (any exam cancelled within 48 hours of appointment is considered a no-show).',
]
const CAS_TABLE: Omit<ExamFee, 'parts'> = {
  body: 'CAS',
  source: CAS_FEES_PAGE,
  checked: '2026-10-02',
  terms: CAS_TERMS,
}

/** "MAS-I/MAS-II — Candidate: $550.00, Full-Time Student: $440.00". */
const CAS_MAS: ExamFee = { ...CAS_TABLE, parts: [{ amount: 550, student: 440 }] }
/** "Exams 5, 6-Canada, 6-International, 6-United States, 7, 8 and 9 — $850.00, $680.00". */
const CAS_UPPER: ExamFee = { ...CAS_TABLE, parts: [{ amount: 850, student: 680 }] }

/** Fees by exam_progress key. */
export const EXAM_FEES: Readonly<Record<string, ExamFee>> = {
  P: { ...SOA_PRELIMINARY, parts: [{ amount: 275 }] },
  FM: { ...SOA_PRELIMINARY, parts: [{ amount: 275 }] },
  'MAS-I': CAS_MAS,
  'MAS-II': CAS_MAS,
  'CAS-5': CAS_UPPER,
  'CAS-6': CAS_UPPER,
  'CAS-7': CAS_UPPER,
  'CAS-8': CAS_UPPER,
  'CAS-9': CAS_UPPER,
  // "PCPA Exam Candidate — $300.00 / $240.00", "PCPA Project Candidate —
  // $700.00 / $560.00". Two fees, paid at two different times: the exam
  // gates the project.
  'CAS-PCPA': {
    ...CAS_TABLE,
    parts: [
      { part: 'exam', amount: 300, student: 240 },
      { part: 'project', amount: 700, student: 560 },
    ],
  },
}

export function examFee(examId: string): ExamFee | null {
  return EXAM_FEES[examId] ?? null
}

/** `$275`, `$1,234` — whole dollars, as both fee tables print them. */
export function dollars(amount: number): string {
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
}

/**
 * The fee as one line of text: `$275`, `$550 ($440 full-time students)`,
 * `$300 exam, $700 project ($240 and $560 full-time students)`.
 */
export function feeText(fee: ExamFee): string {
  const main = fee.parts
    .map(p => (p.part ? `${dollars(p.amount)} ${p.part}` : dollars(p.amount)))
    .join(', ')
  const students = fee.parts.filter(p => p.student !== undefined)
  if (students.length === 0) return main
  const rates = students.map(p => dollars(p.student!))
  const joined = rates.length === 1 ? rates[0] : `${rates.slice(0, -1).join(', ')} and ${rates[rates.length - 1]}`
  return `${main} (${joined} full-time students)`
}

/** The info panel's row for an exam's fee — "Fees" when it is paid in parts. */
export function feeFact(examId: string): { label: string; value: string } {
  const fee = EXAM_FEES[examId]
  if (!fee) throw new Error(`No fee transcribed for ${examId}`)
  return { label: fee.parts.length > 1 ? 'Fees' : 'Fee', value: feeText(fee) }
}

/** The total a candidate pays to sit every part, in US dollars. */
export function feeTotal(fee: ExamFee, student = false): number {
  return fee.parts.reduce((sum, p) => sum + (student ? p.student ?? p.amount : p.amount), 0)
}
