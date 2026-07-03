import { describe, it, expect, vi } from 'vitest'

// exportData imports the Supabase client, which throws at module load when the
// VITE_SUPABASE_* env vars are absent (as they are under vitest). The functions
// exercised here are pure and never touch it, so a bare stub is enough.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import {
  csvEscape,
  responsesToCsv,
  buildExportFilename,
  type ExportedResponse,
} from './exportData'

function response(overrides: Partial<ExportedResponse> = {}): ExportedResponse {
  return {
    answered_at: '2026-07-01T12:00:00.000Z',
    exam: 'Probability',
    topic: 'Random Variables',
    question_id: 'P-042',
    chosen_answer: 'B',
    correct_answer: 'C',
    is_correct: false,
    time_spent_seconds: 45,
    ...overrides,
  }
}

describe('csvEscape', () => {
  it('leaves simple values untouched', () => {
    expect(csvEscape('Probability')).toBe('Probability')
    expect(csvEscape(42)).toBe('42')
  })

  it('renders null/undefined as empty', () => {
    expect(csvEscape(null)).toBe('')
    expect(csvEscape(undefined)).toBe('')
  })

  it('quotes values containing commas, quotes or newlines', () => {
    expect(csvEscape('Annuities, immediate')).toBe('"Annuities, immediate"')
    expect(csvEscape('say "hi"')).toBe('"say ""hi"""')
    expect(csvEscape('line1\nline2')).toBe('"line1\nline2"')
  })

  it('defuses spreadsheet formula injection', () => {
    expect(csvEscape('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)")
    expect(csvEscape('+1')).toBe("'+1")
    // A value that is both a formula and contains a comma gets prefixed then quoted.
    expect(csvEscape('@cmd,x')).toBe('"\'@cmd,x"')
  })
})

describe('responsesToCsv', () => {
  it('emits a header row plus one row per answered question', () => {
    const csv = responsesToCsv([response()])
    const lines = csv.replace(/^﻿/, '').trimEnd().split('\r\n')
    expect(lines[0]).toBe('Date,Exam,Topic,Question ID,Your Answer,Correct Answer,Result,Time (seconds)')
    expect(lines[1]).toBe('2026-07-01T12:00:00.000Z,Probability,Random Variables,P-042,B,C,Incorrect,45')
    expect(lines).toHaveLength(2)
  })

  it('renders is_correct as a human-readable Result', () => {
    const csv = responsesToCsv([response({ is_correct: true })])
    const row = csv.replace(/^﻿/, '').trimEnd().split('\r\n')[1]
    expect(row.split(',')[6]).toBe('Correct')
  })

  it('renders missing answer/topic/time as empty fields', () => {
    const csv = responsesToCsv([response({ chosen_answer: null, topic: null, exam: null, time_spent_seconds: null })])
    const cells = csv.replace(/^﻿/, '').trimEnd().split('\r\n')[1].split(',')
    expect(cells[1]).toBe('') // exam
    expect(cells[2]).toBe('') // topic
    expect(cells[4]).toBe('') // your answer
    expect(cells[7]).toBe('') // time
  })

  it('quotes answer text that contains commas', () => {
    const csv = responsesToCsv([response({ chosen_answer: '1,000', correct_answer: '2,000' })])
    const row = csv.replace(/^﻿/, '').trimEnd().split('\r\n')[1]
    expect(row).toContain('"1,000"')
    expect(row).toContain('"2,000"')
  })

  it('starts with a UTF-8 BOM', () => {
    expect(responsesToCsv([response()]).charCodeAt(0)).toBe(0xfeff)
  })
})

describe('buildExportFilename', () => {
  const date = new Date('2026-07-03T09:30:00.000Z')

  it('names all-exam exports', () => {
    expect(buildExportFilename(null, date)).toBe('actuarial-notes-performance-all-exams-2026-07-03.csv')
  })

  it('slugifies the exam label for scoped exports', () => {
    expect(buildExportFilename('FM', date)).toBe('actuarial-notes-performance-financial-mathematics-2026-07-03.csv')
  })
})
