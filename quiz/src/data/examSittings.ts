export interface ExamSitting {
  examId: string
  format: 'CBT' | 'P/P'
  startDate: string       // ISO YYYY-MM-DD
  endDate: string | null  // null = single-day
  registrationDeadline: string | null
}

// All 2026 exam sittings sourced from Exam Database 2026-03-30.csv.
// examId values match the app's canonical IDs from tracks.ts.
// Duplicate rows (regional variants that share the same sitting window) are included;
// getSittingsForExam() deduplicates by (startDate, endDate, format).
export const EXAM_SITTINGS: ExamSitting[] = [
  // ── CAS ──────────────────────────────────────────────────────────────────
  { examId: 'MAS-I',    format: 'CBT', startDate: '2026-01-28', endDate: '2026-02-03', registrationDeadline: '2026-01-08' },
  { examId: 'MAS-II',   format: 'CBT', startDate: '2026-01-28', endDate: '2026-02-03', registrationDeadline: '2026-01-08' },
  { examId: 'CAS-PCPA', format: 'CBT', startDate: '2026-03-16', endDate: '2026-03-31', registrationDeadline: null },
  { examId: 'CAS-5',    format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: null },
  { examId: 'CAS-6',    format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: null },
  { examId: 'CAS-6',    format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: null }, // US variant — deduped at query time
  { examId: 'CAS-7',    format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: null },
  { examId: 'CAS-8',    format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: null },
  { examId: 'CAS-9',    format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-21', registrationDeadline: null },
  { examId: 'MAS-I',    format: 'CBT', startDate: '2026-04-22', endDate: '2026-05-01', registrationDeadline: '2026-03-25' },
  { examId: 'MAS-II',   format: 'CBT', startDate: '2026-04-22', endDate: '2026-05-01', registrationDeadline: '2026-03-25' },
  { examId: 'CAS-PCPA', format: 'CBT', startDate: '2026-06-15', endDate: '2026-06-30', registrationDeadline: null },
  { examId: 'MAS-I',    format: 'CBT', startDate: '2026-07-29', endDate: '2026-08-04', registrationDeadline: '2026-07-09' },
  { examId: 'MAS-II',   format: 'CBT', startDate: '2026-07-29', endDate: '2026-08-04', registrationDeadline: '2026-07-09' },
  { examId: 'CAS-PCPA', format: 'CBT', startDate: '2026-09-16', endDate: '2026-09-30', registrationDeadline: null },
  { examId: 'CAS-5',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null },
  { examId: 'CAS-6',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null }, // Canada variant
  { examId: 'CAS-6',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null }, // Intl variant — deduped
  { examId: 'CAS-6',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null }, // US variant — deduped
  { examId: 'CAS-7',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null },
  { examId: 'CAS-8',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null },
  { examId: 'CAS-9',    format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: null },
  { examId: 'MAS-I',    format: 'CBT', startDate: '2026-10-28', endDate: '2026-11-05', registrationDeadline: '2026-09-29' },
  { examId: 'MAS-II',   format: 'CBT', startDate: '2026-10-28', endDate: '2026-11-05', registrationDeadline: '2026-09-29' },
  { examId: 'CAS-PCPA', format: 'CBT', startDate: '2026-12-16', endDate: '2026-12-31', registrationDeadline: null },

  // ── SOA ──────────────────────────────────────────────────────────────────
  // FAM — long CBT window spanning two sittings
  { examId: 'FAM', format: 'CBT', startDate: '2025-10-23', endDate: '2026-10-29', registrationDeadline: '2026-09-22' },
  // FSA March sitting
  { examId: 'FSA-GH101',  format: 'CBT', startDate: '2026-03-03', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-GI101',  format: 'CBT', startDate: '2026-03-03', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-ILA101', format: 'CBT', startDate: '2026-03-03', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-INV201', format: 'CBT', startDate: '2026-03-03', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-RET101', format: 'CBT', startDate: '2026-03-03', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CFE201', format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-GH201',  format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' }, // GH 201-C
  { examId: 'FSA-GH201',  format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' }, // GH 201-U — deduped
  { examId: 'FSA-GI201',  format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-ILA201', format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' }, // ILA 201-I
  { examId: 'FSA-ILA201', format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' }, // ILA 201-U — deduped
  { examId: 'FSA-INV101', format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-RET201', format: 'CBT', startDate: '2026-03-04', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CP311',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CP312',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CP321',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CP341',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CP351',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-GH301',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-GI301',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-GI302',  format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-RET301', format: 'CBT', startDate: '2026-03-07', endDate: null, registrationDeadline: '2026-02-16' },
  { examId: 'FSA-CFE101', format: 'CBT', startDate: '2026-03-23', endDate: null, registrationDeadline: '2026-02-16' },
  // Spring sittings
  { examId: 'FM',     format: 'CBT', startDate: '2026-04-02', endDate: '2026-04-13', registrationDeadline: null },
  { examId: 'PA',     format: 'CBT', startDate: '2026-04-14', endDate: '2026-04-17', registrationDeadline: null },
  { examId: 'ALTAM',  format: 'CBT', startDate: '2026-04-21', endDate: null,         registrationDeadline: null },
  { examId: 'ASTAM',  format: 'CBT', startDate: '2026-04-22', endDate: null,         registrationDeadline: null },
  { examId: 'P',      format: 'P/P', startDate: '2026-05-08', endDate: '2026-05-19', registrationDeadline: null },
  { examId: 'P',      format: 'CBT', startDate: '2026-05-08', endDate: null,         registrationDeadline: '2026-04-08' },
  { examId: 'SRM',    format: 'P/P', startDate: '2026-05-22', endDate: null,         registrationDeadline: null },
  { examId: 'SRM',    format: 'CBT', startDate: '2026-05-28', endDate: null,         registrationDeadline: '2026-04-21' },
  { examId: 'FM',     format: 'P/P', startDate: '2026-06-11', endDate: null,         registrationDeadline: null },
  { examId: 'FM',     format: 'CBT', startDate: '2026-06-22', endDate: null,         registrationDeadline: '2026-05-06' },
  // FSA July sitting
  { examId: 'FSA-GH101',  format: 'CBT', startDate: '2026-07-01', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-ILA101', format: 'CBT', startDate: '2026-07-01', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FAM',         format: 'P/P', startDate: '2026-07-01', endDate: null, registrationDeadline: null },
  { examId: 'FSA-GH201',  format: 'CBT', startDate: '2026-07-02', endDate: null, registrationDeadline: '2026-06-16' }, // GH 201-C
  { examId: 'FSA-GH201',  format: 'CBT', startDate: '2026-07-02', endDate: null, registrationDeadline: '2026-06-16' }, // GH 201-U — deduped
  { examId: 'FSA-ILA201', format: 'CBT', startDate: '2026-07-02', endDate: null, registrationDeadline: '2026-06-16' }, // ILA 201-I
  { examId: 'FSA-ILA201', format: 'CBT', startDate: '2026-07-02', endDate: null, registrationDeadline: '2026-06-16' }, // ILA 201-U — deduped
  { examId: 'FSA-CP341',  format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-CP351',  format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-GH301',  format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-GI301',  format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-GI302',  format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-INV201', format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-RET101', format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-RET201', format: 'CBT', startDate: '2026-07-03', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-GI101',  format: 'CBT', startDate: '2026-07-04', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-INV101', format: 'CBT', startDate: '2026-07-04', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'P',           format: 'CBT', startDate: '2026-07-08', endDate: '2026-07-19', registrationDeadline: '2026-06-10' },
  { examId: 'FSA-CFE101', format: 'CBT', startDate: '2026-07-20', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FSA-CFE201', format: 'CBT', startDate: '2026-07-20', endDate: null, registrationDeadline: '2026-06-16' },
  { examId: 'FAM',         format: 'CBT', startDate: '2026-07-27', endDate: null, registrationDeadline: '2026-06-02' },
  // Summer / fall sittings
  { examId: 'FM',  format: 'CBT', startDate: '2026-08-06', endDate: '2026-08-17', registrationDeadline: '2026-07-08' },
  { examId: 'SRM', format: 'CBT', startDate: '2026-09-02', endDate: '2026-09-08', registrationDeadline: '2026-08-05' },
  { examId: 'SRM', format: 'P/P', startDate: '2026-09-02', endDate: null,         registrationDeadline: null },
  { examId: 'P',   format: 'CBT', startDate: '2026-09-10', endDate: '2026-09-21', registrationDeadline: '2026-08-12' },
  { examId: 'P',   format: 'P/P', startDate: '2026-09-10', endDate: null,         registrationDeadline: null },
  { examId: 'FM',  format: 'CBT', startDate: '2026-10-01', endDate: '2026-10-12', registrationDeadline: '2026-09-02' },
  { examId: 'FM',  format: 'P/P', startDate: '2026-10-01', endDate: null,         registrationDeadline: null },
  { examId: 'PA',    format: 'CBT', startDate: '2026-10-13', endDate: '2026-10-16', registrationDeadline: '2026-09-07' },
  { examId: 'ALTAM', format: 'CBT', startDate: '2026-10-21', endDate: null,         registrationDeadline: '2026-09-14' },
  { examId: 'ASTAM', format: 'CBT', startDate: '2026-10-22', endDate: null,         registrationDeadline: '2026-09-14' },
  { examId: 'FAM',   format: 'P/P', startDate: '2026-10-23', endDate: null,         registrationDeadline: null },
  { examId: 'P',     format: 'CBT', startDate: '2026-11-04', endDate: '2026-11-15', registrationDeadline: '2026-09-30' },
  // FSA November sitting
  { examId: 'FSA-CFE101', format: 'CBT', startDate: '2026-11-06', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-INV201', format: 'CBT', startDate: '2026-11-06', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-GH101',  format: 'CBT', startDate: '2026-11-07', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-ILA101', format: 'CBT', startDate: '2026-11-07', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-GH201',  format: 'CBT', startDate: '2026-11-08', endDate: null, registrationDeadline: '2026-10-13' }, // GH 201-C
  { examId: 'FSA-GH201',  format: 'CBT', startDate: '2026-11-08', endDate: null, registrationDeadline: '2026-10-13' }, // GH 201-U — deduped
  { examId: 'FSA-GH301',  format: 'CBT', startDate: '2026-11-08', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-ILA201', format: 'CBT', startDate: '2026-11-08', endDate: null, registrationDeadline: '2026-10-13' }, // ILA 201-I
  { examId: 'FSA-ILA201', format: 'CBT', startDate: '2026-11-08', endDate: null, registrationDeadline: '2026-10-13' }, // ILA 201-U — deduped
  { examId: 'FSA-CP351',  format: 'CBT', startDate: '2026-11-09', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-RET101', format: 'CBT', startDate: '2026-11-09', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-RET301', format: 'CBT', startDate: '2026-11-09', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-CP312',  format: 'CBT', startDate: '2026-11-20', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-GI201',  format: 'CBT', startDate: '2026-11-20', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-INV101', format: 'CBT', startDate: '2026-11-20', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-CP311',  format: 'CBT', startDate: '2026-11-29', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FSA-CP321',  format: 'CBT', startDate: '2026-11-29', endDate: null, registrationDeadline: '2026-10-13' },
  { examId: 'FM', format: 'CBT', startDate: '2026-12-03', endDate: '2026-12-14', registrationDeadline: '2026-11-04' },
]

/**
 * Returns upcoming sittings for an exam, deduplicated and sorted by startDate.
 * A sitting is considered upcoming if its endDate (or startDate for single-day) >= today.
 */
export function getSittingsForExam(examId: string, today = new Date()): ExamSitting[] {
  const todayISO = today.toISOString().slice(0, 10)
  const seen = new Set<string>()
  return EXAM_SITTINGS
    .filter(s => s.examId === examId)
    .filter(s => (s.endDate ?? s.startDate) >= todayISO)
    .filter(s => {
      const key = sittingKey(s)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
}

/** Returns true if the given ISO date falls within any known sitting window for this exam. */
export function isValidSittingDate(examId: string, date: string): boolean {
  return EXAM_SITTINGS.some(s => {
    if (s.examId !== examId) return false
    if (s.endDate) return date >= s.startDate && date <= s.endDate
    return date === s.startDate
  })
}

export interface ExamVariant {
  id: string
  label: string
}

/** Exams that have regional variants the user must choose between during onboarding. */
export const LOCALIZED_EXAMS: Record<string, ExamVariant[]> = {
  'CAS-6': [
    { id: 'US',  label: 'United States' },
    { id: 'CA',  label: 'Canada' },
    { id: 'INT', label: 'International' },
  ],
}

/** Maps a localized exam's chosen variant ID to the wiki examId whose syllabus matches it. */
export const LOCALIZED_EXAM_VARIANT_IDS: Record<string, Record<string, string>> = {
  'CAS-6': { US: '6U', CA: '6C', INT: '6U' },
}

/**
 * For exams with regional variants (e.g. CAS-6's "6C"/"6U" syllabi), returns true if
 * `examId` is the syllabus matching the user's selected `variant` for `progressKey`.
 * Exams without variants, or with no variant selected yet, always match.
 */
export function matchesSelectedVariant(progressKey: string, examId: string, variant: string | null | undefined): boolean {
  const variantMap = LOCALIZED_EXAM_VARIANT_IDS[progressKey]
  if (!variantMap || !variant) return true
  const expectedExamId = variantMap[variant]
  return !expectedExamId || examId === expectedExamId
}

/** Formats a sitting's date range for display, e.g. "Jul 8–19, 2026" or "Jul 27, 2026" */
export function formatSittingDate(sitting: ExamSitting): string {
  const start = new Date(sitting.startDate + 'T00:00:00')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  if (!sitting.endDate) {
    return `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`
  }
  const end = new Date(sitting.endDate + 'T00:00:00')
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${months[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`
  }
  return `${months[start.getMonth()]} ${start.getDate()} – ${months[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`
}

/** Whether `date` (ISO YYYY-MM-DD) falls inside the sitting's window. */
export function sittingContains(sitting: ExamSitting, date: string | null | undefined): boolean {
  if (!date) return false
  if (sitting.endDate) return date >= sitting.startDate && date <= sitting.endDate
  return date === sitting.startDate
}

/**
 * The sitting a study guide is being read *for* — its version. The reader's
 * own exam date wins when it lands in one of the upcoming sittings; otherwise
 * it is the next sitting. Null when no upcoming sitting is known, in which case
 * the page names no version rather than inventing one.
 */
export function currentSitting(sittings: ExamSitting[], targetDate: string | null | undefined): ExamSitting | null {
  return sittings.find(s => sittingContains(s, targetDate)) ?? sittings[0] ?? null
}

/** One sitting's identity — the same triple `getSittingsForExam` dedupes on. */
export function sittingKey(sitting: ExamSitting): string {
  return `${sitting.startDate}|${sitting.endDate ?? ''}|${sitting.format}`
}

/**
 * The version a study guide shows, given the reader's recorded exam date (only
 * for a tracked exam) and the sitting they last picked from the version menu.
 *
 * The record decides, since it is what the study plan paces to; the pick only
 * breaks a tie inside it — Exam P's paper day falls inside its CBT window, so a
 * date alone can't say which of the two was chosen. With no record, the pick
 * stands on its own, and with neither it is the next sitting.
 */
export function selectVersion(
  sittings: ExamSitting[],
  recordDate: string | null | undefined,
  pickedKey: string | null | undefined,
): ExamSitting | null {
  const picked = pickedKey ? sittings.find(s => sittingKey(s) === pickedKey) : undefined
  if (recordDate) {
    if (picked && sittingContains(picked, recordDate)) return picked
    return currentSitting(sittings, recordDate)
  }
  return picked ?? currentSitting(sittings, null)
}

/**
 * Longest span, in days, that `examWindowFor` treats as one sitting's window.
 * The CAS and SOA CBT windows run one to two weeks (PCPA's project window about
 * a fortnight); a row that spans more is a registration span covering several
 * sittings (FAM's Oct 2025 – Oct 2026 row), not a window anyone sits in.
 */
export const MAX_EXAM_WINDOW_DAYS = 31

/** An exam's sitting window: the first and last day it can be sat, ISO. */
export interface ExamWindow {
  start: string
  end: string
}

/**
 * The published window the reader's exam date falls in — the stretch the
 * Dashboard's schedule strip shades around exam day. Past sittings count too
 * (a date that has gone by still sat in its window). Where two rows contain the
 * date (Exam P's paper day inside its CBT window) the wider window wins; a row
 * longer than `MAX_EXAM_WINDOW_DAYS` is not a window. Null when the date is in
 * no known window — the exam day is then the whole of it, and nothing is
 * shaded that the sittings table doesn't say.
 */
export function examWindowFor(
  examId: string,
  examDate: string | null | undefined,
  sittings: ExamSitting[] = EXAM_SITTINGS,
): ExamWindow | null {
  if (!examDate) return null
  let best: ExamWindow | null = null
  let bestDays = -1
  for (const s of sittings) {
    if (s.examId !== examId || !s.endDate || !sittingContains(s, examDate)) continue
    const days = Math.round(
      (Date.parse(s.endDate + 'T00:00:00Z') - Date.parse(s.startDate + 'T00:00:00Z')) / 86400000,
    ) + 1
    if (days > MAX_EXAM_WINDOW_DAYS || days <= bestDays) continue
    best = { start: s.startDate, end: s.endDate }
    bestDays = days
  }
  return best
}

/** A sitting named as a version: its month and year, e.g. "Nov 2026". */
export function sittingVersionLabel(sitting: ExamSitting): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const [year, month] = sitting.startDate.split('-').map(Number)
  return `${months[month - 1]} ${year}`
}
