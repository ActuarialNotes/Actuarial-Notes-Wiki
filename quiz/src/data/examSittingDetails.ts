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
  /** Label / value rows — "Length" / "4 hours". */
  facts: { label: string; value: string }[]
  /** The examining body's own page for the exam — always somewhere to go. */
  source: SittingSource
}

const CAS_EXAM = 'https://www.casact.org/exam/'
const SOA_EXAM = 'https://www.soa.org/education/exam-req/'

export const EXAM_ABOUT: Record<string, ExamAbout> = {
  // ── SOA ───────────────────────────────────────────────────────────────────
  P: { facts: [], source: { label: 'SOA — Exam P', url: `${SOA_EXAM}edu-exam-p-detail/` } },
  FM: { facts: [], source: { label: 'SOA — Exam FM', url: `${SOA_EXAM}edu-exam-fm-detail/` } },

  // ── CAS ───────────────────────────────────────────────────────────────────
  'MAS-I': { facts: [], source: { label: 'CAS — Exam MAS-I', url: `${CAS_EXAM}exam-mas-i-modern-actuarial-statistics-i` } },
  'MAS-II': { facts: [], source: { label: 'CAS — Exam MAS-II', url: `${CAS_EXAM}exam-mas-ii-modern-actuarial-statistics-ii` } },
  'CAS-5': { facts: [], source: { label: 'CAS — Exam 5', url: `${CAS_EXAM}exam-5-basic-ratemaking-and-est-claim-liabilities` } },
  // Exam 6 is one exam key with a syllabus per nation, and CAS a page per
  // syllabus — so these two are keyed by the study guide (`GUIDE_ABOUT`).
  'CAS-7': { facts: [], source: { label: 'CAS — Exam 7', url: `${CAS_EXAM}exam-7-advanced-estimation-claims-liabilities` } },
  'CAS-8': { facts: [], source: { label: 'CAS — Exam 8', url: `${CAS_EXAM}exam-8-advanced-ratemaking` } },
  'CAS-9': { facts: [], source: { label: 'CAS — Exam 9', url: `${CAS_EXAM}exam-9-risk-management-actuaries` } },
  'CAS-PCPA': { facts: [], source: { label: 'CAS — PCPA', url: `${CAS_EXAM}property-casualty-predictive-analytics-pcpa` } },
}

/**
 * For an exam key shared by several study guides (Exam 6's Canada and US
 * syllabi), the publisher page for each guide — by wiki exam id (`6c-1`).
 */
const GUIDE_ABOUT: Record<string, ExamAbout> = {
  '6c-1': { facts: [], source: { label: 'CAS — Exam 6 Canada', url: `${CAS_EXAM}exam-6c-regulation-and-financial-reporting-canada` } },
  '6u-1': { facts: [], source: { label: 'CAS — Exam 6 United States', url: `${CAS_EXAM}exam-6u-regulation-and-financial-reporting-us` } },
}

export const SITTING_DETAILS: SittingDetails[] = []

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
