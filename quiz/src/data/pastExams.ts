// The catalogue of *real* past exam sittings the mock-exam browser lists.
//
// The question bank only holds the sittings that have been converted into
// `questions/<exam-id>/*.md` so far, but a candidate browsing for a past paper
// wants to see the whole shelf — including the sittings that exist and haven't
// been added yet, so they read as "not here yet" rather than "never happened".
// `lib/pastExams.ts` merges this catalogue with whatever the bank actually
// holds; a sitting present in the bank but missing here still shows up, so
// importing a new paper never requires editing this file first.
//
// Scope: the sittings whose papers the examining body released publicly. CAS
// stopped publishing full past papers once the upper-level exams moved to
// computer-based testing, so the shelf ends at Spring 2019 for Exam 5 and
// Fall 2019 for MAS-I. Exam P and Exam FM aren't listed at all — the SOA
// publishes a rolling sample-question set rather than dated papers, so those
// exams have no sittings to browse (the browser falls back to the generated
// mock alone).

export type ExamSession = 'Spring' | 'Fall'

/**
 * Per-sitting result statistics, as published by the examining body.
 *
 * Every field is optional and **unset by default**: these are real-world
 * figures, so a value here must come from the examining body's published
 * statistics (CAS "Summary of Exam Statistics") or an aggregator such as
 * Actuarial Lookup — never an estimate. A sitting with no figures renders a
 * muted "—" and the browser links out to the lookup instead of guessing.
 */
export interface PastExamStats {
  /** Candidates who sat the exam — CAS calls this "exams taken". */
  candidates?: number
  /** Raw pass ratio as a percentage, 0–100. */
  passRate?: number
  /**
   * The **effective pass ratio** as a percentage, 0–100: the raw ratio with
   * candidates who scored under half the pass mark removed, i.e. the pass rate
   * among candidates who made a serious attempt. This is the number a
   * candidate actually cares about, which is why it's the one the browser
   * leads with.
   */
  effectivePassRate?: number
}

export interface PastExamSitting extends PastExamStats {
  /** Exam topic, matching `Question.exam` (e.g. `'Exam 5'`). */
  exam: string
  year: number
  session: ExamSession
  /**
   * Questions on the real paper, when known. The bank may hold fewer (a
   * partially converted sitting), so this is the honest "how long was the real
   * thing" figure rather than the draw size.
   */
  officialQuestionCount?: number
}

/** Every sitting the browser knows about, in no particular order. */
export const PAST_EXAM_SITTINGS: PastExamSitting[] = [
  // ── CAS Exam 5 ─── released papers run Spring/Fall through Spring 2019 ────
  { exam: 'Exam 5', year: 2019, session: 'Spring' },
  { exam: 'Exam 5', year: 2018, session: 'Fall' },
  { exam: 'Exam 5', year: 2018, session: 'Spring' },
  { exam: 'Exam 5', year: 2017, session: 'Fall' },
  { exam: 'Exam 5', year: 2017, session: 'Spring' },
  { exam: 'Exam 5', year: 2016, session: 'Fall' },
  { exam: 'Exam 5', year: 2016, session: 'Spring' },
  { exam: 'Exam 5', year: 2015, session: 'Fall' },
  { exam: 'Exam 5', year: 2015, session: 'Spring' },
  { exam: 'Exam 5', year: 2014, session: 'Fall' },
  { exam: 'Exam 5', year: 2014, session: 'Spring' },
  { exam: 'Exam 5', year: 2013, session: 'Fall' },
  { exam: 'Exam 5', year: 2013, session: 'Spring' },
  { exam: 'Exam 5', year: 2012, session: 'Fall' },
  { exam: 'Exam 5', year: 2012, session: 'Spring' },
  { exam: 'Exam 5', year: 2011, session: 'Fall' },
  { exam: 'Exam 5', year: 2011, session: 'Spring' },

  // ── CAS Exam MAS-I ─── first sat Spring 2018 ──────────────────────────────
  { exam: 'Exam MAS-I', year: 2019, session: 'Fall' },
  { exam: 'Exam MAS-I', year: 2019, session: 'Spring' },
  { exam: 'Exam MAS-I', year: 2018, session: 'Fall' },
  { exam: 'Exam MAS-I', year: 2018, session: 'Spring' },
]

/**
 * Where a candidate can look the exam's pass ratios up. Shown as a link in the
 * browser header, and the honest answer for every sitting whose statistics
 * aren't filled in above.
 */
export const PASS_RATE_LOOKUP: Record<string, { url: string; label: string }> = {
  'Exam 5': { url: 'https://www.actuarial-lookup.com/exams/5', label: 'Actuarial Lookup' },
  'Exam MAS-I': { url: 'https://www.actuarial-lookup.com/exams/mas-i', label: 'Actuarial Lookup' },
}

/** The catalogue's sittings for one exam. */
export function getPastExamSittings(exam: string): PastExamSitting[] {
  return PAST_EXAM_SITTINGS.filter(s => s.exam === exam)
}

/** The pass-rate lookup for one exam, if there is one. */
export function getPassRateLookup(exam: string): { url: string; label: string } | null {
  return PASS_RATE_LOOKUP[exam] ?? null
}
