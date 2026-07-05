// Builds and downloads a CSV export of the user's performance data. Used by the
// "Export performance data" control in Settings.
//
// The exported table is question-level: one row per answered question, pulled
// from question_responses and joined to its quiz_sessions parent for the exam
// and topic context (question_responses itself only stores the question id and
// the answer). Rows are scoped to a single exam or to every exam, mirroring the
// Reset History scope selector.

import { supabase } from '@/lib/supabase'
import { EXAM_ID_TO_LABEL } from '@/lib/examIds'

const CSV_COLUMNS = [
  'Date',
  'Exam',
  'Topic',
  'Question ID',
  'Your Answer',
  'Correct Answer',
  'Result',
  'Time (seconds)',
] as const

/** A single answered-question row, flattened from question_responses + session. */
export interface ExportedResponse {
  answered_at: string
  exam: string | null
  topic: string | null
  question_id: string
  chosen_answer: string | null
  correct_answer: string
  is_correct: boolean
  time_spent_seconds: number | null
}

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

/** Renders answered-question rows as a CSV string (header row + UTF-8 BOM). */
export function responsesToCsv(rows: ExportedResponse[]): string {
  const body = rows.map(r => [
    r.answered_at,
    r.exam ?? '',
    r.topic ?? '',
    r.question_id,
    r.chosen_answer ?? '',
    r.correct_answer,
    r.is_correct ? 'Correct' : 'Incorrect',
    r.time_spent_seconds ?? '',
  ].map(csvEscape).join(','))
  // Leading BOM so Excel opens the file as UTF-8.
  return '﻿' + [CSV_COLUMNS.join(','), ...body].join('\r\n') + '\r\n'
}

// Shape returned by the embedded select below. The to-one session relationship
// comes back as an object, but PostgREST can also hand it back as a single-
// element array, so normalizeResponse handles both.
interface RawResponseRow {
  question_id: string
  chosen_answer: string | null
  correct_answer: string
  is_correct: boolean
  time_spent_seconds: number | null
  answered_at: string
  quiz_sessions: { exam: string | null; topic: string | null } | { exam: string | null; topic: string | null }[] | null
}

function normalizeResponse(row: RawResponseRow): ExportedResponse {
  const session = Array.isArray(row.quiz_sessions) ? row.quiz_sessions[0] : row.quiz_sessions
  return {
    answered_at: row.answered_at,
    exam: session?.exam ?? null,
    topic: session?.topic ?? null,
    question_id: row.question_id,
    chosen_answer: row.chosen_answer,
    correct_answer: row.correct_answer,
    is_correct: row.is_correct,
    time_spent_seconds: row.time_spent_seconds,
  }
}

/**
 * Fetches every answered question for the user, newest first, joined to its
 * session for exam/topic context. Pass `examId` to scope to one exam, or `null`
 * for all exams. Throws on a query error.
 */
export async function fetchExportResponses(userId: string, examId: string | null): Promise<ExportedResponse[]> {
  // !inner makes the join an inner join so a filter on quiz_sessions.exam
  // actually narrows the returned question_responses rows.
  let query = supabase
    .from('question_responses')
    .select('question_id, chosen_answer, correct_answer, is_correct, time_spent_seconds, answered_at, quiz_sessions!inner(exam, topic)')
    .eq('user_id', userId)
    .order('answered_at', { ascending: false })

  if (examId !== null) {
    const examLabel = EXAM_ID_TO_LABEL[examId] ?? examId
    query = query.eq('quiz_sessions.exam', examLabel)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return ((data ?? []) as unknown as RawResponseRow[]).map(normalizeResponse)
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
