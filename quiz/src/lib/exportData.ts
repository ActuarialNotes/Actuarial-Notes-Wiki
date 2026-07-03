// Builds and downloads a CSV export of the user's performance data. Used by the
// "Export performance data" control in Settings.
//
// The exported table is the quiz-session history — the same data summarised by
// the "Study history" line (session count + average score) above the control.
// Each row is one completed quiz/mock-exam, scoped to a single exam or to every
// exam, mirroring the Reset History scope selector.

import type { QuizSession } from '@/lib/supabase'
import { EXAM_ID_TO_LABEL } from '@/lib/examIds'

const CSV_COLUMNS = [
  'Date',
  'Exam',
  'Topic',
  'Mode',
  'Total Questions',
  'Correct',
  'Accuracy (%)',
  'Time (seconds)',
] as const

/**
 * Escapes a single value for RFC 4180 CSV output. Wraps the value in double
 * quotes when it contains a comma, quote or newline, doubling any embedded
 * quotes. A leading =/+/-/@ is prefixed with a single quote to defuse spreadsheet
 * formula injection when the file is opened in Excel/Sheets.
 */
export function csvEscape(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  let str = String(value)
  if (/^[=+\-@]/.test(str)) str = `'${str}`
  if (/[",\n\r]/.test(str)) {
    str = `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/** Returns only the sessions belonging to `examId`, or all sessions when null. */
export function filterSessionsByExam(sessions: QuizSession[], examId: string | null): QuizSession[] {
  if (examId === null) return sessions
  const examLabel = EXAM_ID_TO_LABEL[examId] ?? examId
  return sessions.filter(s => s.exam === examLabel)
}

/** Renders quiz sessions as a CSV string (with header row and UTF-8 BOM). */
export function sessionsToCsv(sessions: QuizSession[]): string {
  const rows = sessions.map(s => {
    const accuracy = s.total_questions > 0
      ? Math.round((s.correct_count / s.total_questions) * 100)
      : 0
    return [
      s.completed_at,
      s.exam ?? '',
      s.topic ?? '',
      s.mode,
      s.total_questions,
      s.correct_count,
      accuracy,
      s.time_taken_seconds ?? '',
    ].map(csvEscape).join(',')
  })
  // Leading BOM so Excel opens the file as UTF-8.
  return '﻿' + [CSV_COLUMNS.join(','), ...rows].join('\r\n') + '\r\n'
}

/** Builds a descriptive, filesystem-safe filename for the export. */
export function buildExportFilename(examId: string | null, date = new Date()): string {
  const scope = examId === null
    ? 'all-exams'
    : (EXAM_ID_TO_LABEL[examId] ?? examId).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const day = date.toISOString().slice(0, 10)
  return `actuarial-notes-performance-${scope}-${day}.csv`
}

/** Triggers a browser download of `csv` under `filename`. */
export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
