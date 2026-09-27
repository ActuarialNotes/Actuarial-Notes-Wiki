import type { SittingMilestone } from '../lib/sittingTimeline'
import type { ExamSitting } from './examSittings'

/**
 * **What the examining bodies publish about each sitting**, beyond the window
 * `data/examSittings.ts` already carries: when registration opens and closes,
 * PCPA's exam deadline and project submission deadline, and when results come
 * out. Read by the study guide's info button
 * (`components/wiki/ExamSittingInfoButton.tsx`) through `lib/sittingTimeline.ts`.
 *
 * ── Rules for this file ─────────────────────────────────────────────────────
 * The same rule as `examPdfLinks.ts` and the pass-rate tables: a date here is
 * **transcribed from the publisher, never constructed**. CAS and SOA both keep
 * a regular-looking calendar, and both break it — a results date that "is
 * always about eight weeks later" is exactly the guess this file exists to
 * keep out. A date that hasn't been published is simply **absent**, and the
 * info panel then shows the dates that are, and nothing in the gap.
 *
 * Every entry names the page its dates came from (`sources`), and the panel
 * links it, so a candidate can check the date against the publisher before
 * booking anything on it. A qualifier the publisher attaches ("subject to
 * change") rides on the milestone as its `note`, in the publisher's words.
 */

export interface SittingSource {
  /** What the link is, as the reader will see it — "CAS — Exam Schedule". */
  label: string
  url: string
}

export interface SittingDetails {
  /**
   * The exams (exam_progress keys — `P`, `CAS-5`, `CAS-PCPA`) the entry
   * covers. CAS runs one calendar for all its upper-level exams, so one entry
   * can serve several.
   */
  examIds: string[]
  /** The window's first day — the `startDate` of the sittings row it details. */
  startDate: string
  /**
   * Only for a sitting offered in two formats that start the same day (SOA's
   * CBT window and paper day), where each has its own dates.
   */
  format?: ExamSitting['format']
  milestones: SittingMilestone[]
  /** Anything else the publisher says about this sitting, in its words. */
  notes?: string[]
  sources: SittingSource[]
}

/** What stays the same from sitting to sitting: how the exam is sat. */
export interface ExamAbout {
  /** Label / value rows — "Length" / "4 hours (4.5-hour appointment)". */
  facts: { label: string; value: string }[]
  /** The examining body's own page for the exam — always somewhere to go. */
  source: SittingSource
  /** The documents the facts were read from, where not the page itself. */
  factSources?: SittingSource[]
}

// ── Sources ───────────────────────────────────────────────────────────────────
// Every page below was read on 2026-09-27.

const CAS_EXAM = 'https://www.casact.org/exam/'
const SOA_EXAM = 'https://www.soa.org/education/exam-req/'

const CAS_SOBE: SittingSource = {
  // "Revision 1, 6/26/2026" of the 2026 Syllabus — despite the filename. It
  // says of itself that its dates "take precedence over all other sources,
  // including the CAS website".
  label: 'CAS — 2026 Syllabus of Basic Education',
  url: 'https://www.casact.org/sites/default/files/2025-01/2025_SOBE.pdf',
}
const CAS_OCT_2026_REGISTRATION: SittingSource = {
  label: 'CAS — October/November 2026 registration',
  url: 'https://www.casact.org/article/registration-now-open-octobernovember-cas-exams',
}
const CAS_PCPA: SittingSource = {
  label: 'CAS — PCPA',
  url: `${CAS_EXAM}property-casualty-predictive-analytics-pcpa`,
}
const CAS_PCPA_OUTLINE: SittingSource = {
  // v.8, "Updated: 9.9.2026", "Effective: September 2026". Its page 2 is the
  // "Project Administration Details" table: exam deadline, registration
  // deadline, window, submission deadline, results — with no year printed.
  label: 'CAS — PCPA content outline',
  url: 'https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf',
}
const CAS_FEES: SittingSource = {
  label: 'CAS — Exam fees',
  url: 'https://www.casact.org/exams-admissions/exams/exam-fees',
}

const SOA_SCHEDULE: SittingSource = {
  label: 'SOA — Exam schedule',
  url: 'https://www.soa.org/education/exam-schedule/',
}
const SOA_RESULTS: SittingSource = {
  // The "Release Schedule" tab: candidate-number and transcript dates.
  label: 'SOA — Exam results',
  url: 'https://www.soa.org/education/exam-results/',
}
const SOA_FEES: SittingSource = {
  label: 'SOA — Exam fees',
  url: 'https://www.soa.org/education/exam-req/syllabus-study-materials/exam-and-module-fees/',
}

// ── How each exam is sat ──────────────────────────────────────────────────────

// CAS's content outlines give the appointment and the item types; none gives a
// question count ("the total number of questions may vary from one exam sitting
// to the next" — the Syllabus), so none is shown.
const CAS_LENGTH = { label: 'Length', value: '4 hours (4.5-hour appointment)' }
const CAS_DELIVERY = { label: 'Delivery', value: 'Pearson VUE test centre' }
const CAS_MAS_ITEMS = {
  label: 'Question types',
  value: 'Multiple choice, multiple selection, point and click, fill in the blank, matching',
}
const CAS_UPPER_ITEMS = {
  label: 'Question types',
  value: 'Constructed response and spreadsheet, with multiple choice, multiple selection, point and click, fill in the blank and matching',
}
const CAS_UPPER_FEE = { label: 'Fee', value: '$850 ($680 full-time students)' }

function casOutline(exam: string, url: string): SittingSource {
  return { label: `CAS — ${exam} content outline`, url }
}

// SOA's syllabi: "a three-hour exam that consists of 30 multiple-choice
// questions" (P), "a 2.5-hour exam that consists of 30 multiple-choice
// questions" (FM), and "Unofficial pass/fail results will be sent within one
// hour to the email address you used to schedule your appointment."
const SOA_UNOFFICIAL = { label: 'Unofficial result', value: 'Emailed within an hour of a CBT exam' }
const SOA_DELIVERY = { label: 'Delivery', value: 'Prometric test centre; paper and pencil at select international centres' }
const SOA_FEE = { label: 'Fee', value: '$275' }

export const EXAM_ABOUT: Record<string, ExamAbout> = {
  // ── SOA ───────────────────────────────────────────────────────────────────
  P: {
    facts: [
      { label: 'Length', value: '3 hours' },
      { label: 'Questions', value: '30 multiple choice' },
      SOA_DELIVERY,
      SOA_UNOFFICIAL,
      SOA_FEE,
    ],
    source: { label: 'SOA — Exam P', url: `${SOA_EXAM}edu-exam-p-detail/` },
    factSources: [
      { label: 'SOA — Exam P syllabus (November 2026)', url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf' },
      SOA_FEES,
    ],
  },
  FM: {
    facts: [
      { label: 'Length', value: '2.5 hours' },
      { label: 'Questions', value: '30 multiple choice' },
      SOA_DELIVERY,
      SOA_UNOFFICIAL,
      SOA_FEE,
    ],
    source: { label: 'SOA — Exam FM', url: `${SOA_EXAM}edu-exam-fm-detail/` },
    factSources: [
      { label: 'SOA — Exam FM syllabus (December 2026)', url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf' },
      SOA_FEES,
    ],
  },

  // ── CAS ───────────────────────────────────────────────────────────────────
  'MAS-I': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_MAS_ITEMS, { label: 'Fee', value: '$550 ($440 full-time students)' }],
    source: { label: 'CAS — Exam MAS-I', url: `${CAS_EXAM}exam-mas-i-modern-actuarial-statistics-i` },
    factSources: [casOutline('MAS-I', 'https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf'), CAS_FEES],
  },
  'MAS-II': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_MAS_ITEMS, { label: 'Fee', value: '$550 ($440 full-time students)' }],
    source: { label: 'CAS — Exam MAS-II', url: `${CAS_EXAM}exam-mas-ii-modern-actuarial-statistics-ii` },
    factSources: [casOutline('MAS-II', 'https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf'), CAS_FEES],
  },
  'CAS-5': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_UPPER_ITEMS, CAS_UPPER_FEE],
    source: { label: 'CAS — Exam 5', url: `${CAS_EXAM}exam-5-basic-ratemaking-and-est-claim-liabilities` },
    factSources: [casOutline('Exam 5', 'https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf'), CAS_FEES],
  },
  // Exam 6 is one exam key with a syllabus per nation, and CAS a page per
  // syllabus — so these two are keyed by the study guide (`GUIDE_ABOUT`).
  'CAS-7': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_UPPER_ITEMS, CAS_UPPER_FEE],
    source: { label: 'CAS — Exam 7', url: `${CAS_EXAM}exam-7-advanced-estimation-claims-liabilities` },
    factSources: [casOutline('Exam 7', 'https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf'), CAS_FEES],
  },
  'CAS-8': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_UPPER_ITEMS, CAS_UPPER_FEE],
    source: { label: 'CAS — Exam 8', url: `${CAS_EXAM}exam-8-advanced-ratemaking` },
    factSources: [casOutline('Exam 8', 'https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf'), CAS_FEES],
  },
  'CAS-9': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_UPPER_ITEMS, CAS_UPPER_FEE],
    source: { label: 'CAS — Exam 9', url: `${CAS_EXAM}exam-9-risk-management-actuaries` },
    factSources: [casOutline('Exam 9', 'https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf'), CAS_FEES],
  },
  // PCPA is two parts, and the sittings are the project's: the exam is sat on
  // demand ("available continuously year-round"), and gates the project.
  'CAS-PCPA': {
    facts: [
      { label: 'Exam', value: '2 hours (2.5-hour appointment), 40 questions' },
      { label: 'Exam delivery', value: 'On demand, year-round, at Pearson VUE' },
      { label: 'Exam result', value: 'On screen at the test centre; final in the CAS portal 15 days later' },
      { label: 'Project', value: 'Remote, through the project portal; report of at most 1,250 words' },
      { label: 'Fees', value: '$300 exam, $700 project ($240 and $560 full-time students)' },
    ],
    source: CAS_PCPA,
    factSources: [CAS_PCPA_OUTLINE, CAS_FEES],
  },
}

/**
 * For an exam key shared by several study guides (Exam 6's Canada and US
 * syllabi), the publisher page for each guide — by wiki exam id (`6c-1`).
 */
const GUIDE_ABOUT: Record<string, ExamAbout> = {
  '6c-1': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_UPPER_ITEMS, CAS_UPPER_FEE],
    source: { label: 'CAS — Exam 6 Canada', url: `${CAS_EXAM}exam-6c-regulation-and-financial-reporting-canada` },
    factSources: [casOutline('Exam 6C', 'https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf'), CAS_FEES],
  },
  '6u-1': {
    facts: [CAS_LENGTH, CAS_DELIVERY, CAS_UPPER_ITEMS, CAS_UPPER_FEE],
    source: { label: 'CAS — Exam 6 United States', url: `${CAS_EXAM}exam-6u-regulation-and-financial-reporting-us` },
    factSources: [casOutline('Exam 6U', 'https://www.casact.org/sites/default/files/2026-03/Exam_6U_CO_2026_Fall.pdf'), CAS_FEES],
  },
}

// ── Each sitting ──────────────────────────────────────────────────────────────
// Sittings from September 2026 on. Past sittings drop out of the version menu
// (`getSittingsForExam`), so nothing earlier is detailed.

/** CAS publishes no results date for an exam sitting, only a rule of thumb. */
const CAS_RESULTS_NOTE =
  'CAS publishes no results date for this sitting. Its candidate guide puts results 6–8 weeks after the window closes.'

/** CAS's October/November 2026 administration: one calendar, two windows. */
const CAS_OCT_2026: SittingMilestone[] = [
  { kind: 'registration-opens', label: 'Registration opens', date: '2026-07-15', note: '11:00 AM ET' },
  { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-09-29', note: '11:59 PM ET' },
  { kind: 'deadline', label: 'Accommodation & holiday-extension requests', date: '2026-09-29' },
  { kind: 'deadline', label: 'Refund deadline', date: '2026-10-06' },
]

/**
 * SOA's CBT applications: "The latest a candidate can schedule a CBT
 * appointment is 48-hours prior to the start time of the exam on the final day
 * of the testing window."
 */
const SOA_CBT_BOOKING_NOTE =
  'Book a Prometric appointment no later than 48 hours before the start of the exam on the last day of the window.'

/** A 2027 SOA sitting: the schedule gives its deadline, with the time as printed. */
function soa2027(examId: string, startDate: string, deadline: string, time: string): SittingDetails {
  return {
    examIds: [examId],
    startDate,
    milestones: [{ kind: 'registration-deadline', label: 'Registration deadline', date: deadline, note: time }],
    sources: [SOA_SCHEDULE],
  }
}

export const SITTING_DETAILS: SittingDetails[] = [
  // ── CAS · October/November 2026 ───────────────────────────────────────────
  {
    examIds: ['CAS-5', 'CAS-6', 'CAS-7', 'CAS-8', 'CAS-9'],
    startDate: '2026-10-19',
    milestones: CAS_OCT_2026,
    notes: [CAS_RESULTS_NOTE],
    sources: [CAS_OCT_2026_REGISTRATION, CAS_SOBE],
  },
  {
    examIds: ['MAS-I', 'MAS-II'],
    startDate: '2026-10-28',
    milestones: CAS_OCT_2026,
    notes: [CAS_RESULTS_NOTE],
    sources: [CAS_OCT_2026_REGISTRATION, CAS_SOBE],
  },

  // ── CAS · PCPA projects ───────────────────────────────────────────────────
  {
    examIds: ['CAS-PCPA'],
    startDate: '2026-09-15',
    milestones: [
      { kind: 'registration-opens', label: 'Registration opens', date: '2026-07-29' },
      // "Candidates must pass the exam by August 25 to be eligible to register
      // for the September PCPA project." — the PCPA page.
      { kind: 'deadline', label: 'Exam deadline', date: '2026-08-25', note: 'Pass the exam by this date to register' },
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-09-08' },
      { kind: 'deadline', label: 'Refund deadline', date: '2026-09-08' },
      { kind: 'deadline', label: 'Project submission deadline', date: '2026-09-30' },
      { kind: 'results', label: 'Results release', date: '2026-11-30', note: 'Subject to change' },
    ],
    notes: [
      'CAS’s 2026 Syllabus of Basic Education gives the project start as September 16; the PCPA page and content outline give September 15.',
    ],
    sources: [CAS_PCPA, CAS_PCPA_OUTLINE, CAS_SOBE],
  },
  {
    // The content outline's standing calendar, whose December row is the
    // Syllabus's 2026 December project (Dec 16 – 31, grades "February 28/29").
    // CAS has posted no December 2026 registration notice yet, and its notices
    // have moved the standing dates before (June 2026 closed June 1, not June
    // 8; December 2025 closed December 8, not December 9) — hence the note.
    examIds: ['CAS-PCPA'],
    startDate: '2026-12-16',
    milestones: [
      { kind: 'deadline', label: 'Exam deadline', date: '2026-11-25', note: 'Last day to sit the exam and still register' },
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-12-09' },
      { kind: 'deadline', label: 'Project submission deadline', date: '2026-12-31' },
      { kind: 'results', label: 'Results release', date: '2027-02-28', note: 'Subject to change' },
    ],
    notes: [
      'From CAS’s standing PCPA calendar, which prints no year. CAS hasn’t posted registration for this project yet, and past notices have closed registration earlier than the calendar — check the PCPA page.',
    ],
    sources: [CAS_PCPA_OUTLINE, CAS_SOBE, CAS_PCPA],
  },

  // ── SOA · 2026 ────────────────────────────────────────────────────────────
  {
    examIds: ['FM'],
    startDate: '2026-10-01',
    format: 'CBT',
    milestones: [
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-09-02' },
      { kind: 'results', label: 'Passing candidate numbers posted', date: '2026-12-11' },
      { kind: 'results', label: 'Transcripts released', date: '2026-12-14' },
    ],
    notes: [SOA_CBT_BOOKING_NOTE],
    sources: [
      { label: 'SOA — October 2026 FM application (CBT)', url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/registration/2026-10-fm-cbt-app.pdf' },
      SOA_RESULTS,
      SOA_SCHEDULE,
    ],
  },
  {
    examIds: ['FM'],
    startDate: '2026-10-01',
    format: 'P/P',
    milestones: [
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-09-02' },
      { kind: 'results', label: 'Passing candidate numbers posted', date: '2026-12-11' },
      { kind: 'results', label: 'Transcripts released', date: '2026-12-14' },
    ],
    notes: ['The paper sitting runs 8:30 – 11:30 AM local time, at select international centres.'],
    sources: [
      { label: 'SOA — October 2026 FM application (paper)', url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/registration/2026-10-fm-pp-app.pdf' },
      SOA_RESULTS,
      SOA_SCHEDULE,
    ],
  },
  {
    examIds: ['P'],
    startDate: '2026-11-04',
    milestones: [
      // "registration closes at 10:00 AM U.S. CDT/CST on the posted date" —
      // SOA's registration page, for P and FM.
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-09-30', note: '10:00 AM U.S. Central' },
      { kind: 'results', label: 'Passing candidate numbers posted', date: '2027-01-15' },
      { kind: 'results', label: 'Transcripts released', date: '2027-01-18' },
    ],
    notes: [SOA_CBT_BOOKING_NOTE],
    sources: [
      SOA_SCHEDULE,
      { label: 'SOA — November 2026 P application', url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/registration/2026-11-p-cbt-app.pdf' },
      SOA_RESULTS,
    ],
  },
  {
    examIds: ['FM'],
    startDate: '2026-12-03',
    milestones: [
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-11-04', note: '10:00 AM U.S. Central' },
      // SOA's release schedule prints this sitting's candidate-number date as
      // "February 5, 2026" — before the exam, so a slip on SOA's page. It is
      // left out rather than corrected into a date SOA never printed.
      { kind: 'results', label: 'Transcripts released', date: '2027-02-08' },
    ],
    notes: [SOA_CBT_BOOKING_NOTE],
    sources: [
      SOA_SCHEDULE,
      { label: 'SOA — December 2026 FM application', url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/registration/2026-12-fm-cbt-fill-app.pdf' },
      SOA_RESULTS,
    ],
  },

  // ── SOA · 2027 — no results dates are published yet ──────────────────────
  soa2027('P', '2027-01-14', '2026-12-15', '11:59 PM'),
  soa2027('FM', '2027-02-04', '2027-01-05', '11:59 PM'),
  // Printed "11:59 AM", where every other 2027 deadline says PM — kept as printed.
  soa2027('P', '2027-03-01', '2027-02-02', '11:59 AM'),
  soa2027('FM', '2027-04-01', '2027-03-02', '11:59 PM'),
  soa2027('P', '2027-05-07', '2027-04-06', '11:59 PM'),
  soa2027('FM', '2027-06-10', '2027-05-11', '11:59 PM'),
  soa2027('P', '2027-07-01', '2027-06-01', '11:59 PM'),
  soa2027('FM', '2027-08-05', '2027-07-06', '11:59 PM'),
  soa2027('P', '2027-09-16', '2027-08-17', '11:59 PM'),
  soa2027('FM', '2027-10-01', '2027-08-31', '11:59 PM'),
  soa2027('P', '2027-11-03', '2027-10-05', '11:59 PM'),
  soa2027('FM', '2027-12-02', '2027-11-02', '11:59 PM'),
]

/** The transcribed details for one sitting of one exam, or null. */
export function sittingDetailsFor(examId: string, sitting: ExamSitting): SittingDetails | null {
  return SITTING_DETAILS.find(d =>
    d.examIds.includes(examId)
    && d.startDate === sitting.startDate
    && (!d.format || d.format === sitting.format),
  ) ?? null
}

/**
 * How an exam is sat, and the publisher's page for it, or null — the study
 * guide's own entry first (`wikiExamId`, e.g. `6u-1`), then the exam key's.
 */
export function examAbout(examId: string, wikiExamId?: string): ExamAbout | null {
  return (wikiExamId ? GUIDE_ABOUT[wikiExamId.toLowerCase()] : undefined) ?? EXAM_ABOUT[examId] ?? null
}
