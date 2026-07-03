import { describe, it, expect } from 'vitest'
import {
  csvEscape,
  filterSessionsByExam,
  sessionsToCsv,
  buildExportFilename,
} from './exportData'
import type { QuizSession } from './supabase'

function session(overrides: Partial<QuizSession> = {}): QuizSession {
  return {
    id: 'id-1',
    user_id: 'u1',
    exam: 'Probability',
    topic: 'Random Variables',
    mode: 'quiz',
    total_questions: 10,
    correct_count: 8,
    time_taken_seconds: 300,
    completed_at: '2026-07-01T12:00:00.000Z',
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

describe('filterSessionsByExam', () => {
  const sessions = [
    session({ id: 'a', exam: 'Probability' }),
    session({ id: 'b', exam: 'Financial Mathematics' }),
    session({ id: 'c', exam: 'Probability' }),
  ]

  it('returns all sessions when examId is null', () => {
    expect(filterSessionsByExam(sessions, null)).toHaveLength(3)
  })

  it('filters by the exam label mapped from the exam id', () => {
    const result = filterSessionsByExam(sessions, 'P')
    expect(result.map(s => s.id)).toEqual(['a', 'c'])
  })

  it('returns nothing for an exam with no sessions', () => {
    expect(filterSessionsByExam(sessions, 'FM')).toHaveLength(1)
    expect(filterSessionsByExam([], 'P')).toHaveLength(0)
  })
})

describe('sessionsToCsv', () => {
  it('emits a header row plus one row per session', () => {
    const csv = sessionsToCsv([session()])
    const lines = csv.replace(/^﻿/, '').trimEnd().split('\r\n')
    expect(lines[0]).toBe('Date,Exam,Topic,Mode,Total Questions,Correct,Accuracy (%),Time (seconds)')
    expect(lines[1]).toBe('2026-07-01T12:00:00.000Z,Probability,Random Variables,quiz,10,8,80,300')
    expect(lines).toHaveLength(2)
  })

  it('computes accuracy and avoids divide-by-zero', () => {
    const csv = sessionsToCsv([session({ total_questions: 0, correct_count: 0 })])
    const row = csv.replace(/^﻿/, '').trimEnd().split('\r\n')[1]
    expect(row.split(',')[6]).toBe('0')
  })

  it('renders a null time as an empty field', () => {
    const csv = sessionsToCsv([session({ time_taken_seconds: null })])
    const row = csv.replace(/^﻿/, '').trimEnd().split('\r\n')[1]
    expect(row.endsWith(',')).toBe(true)
  })

  it('starts with a UTF-8 BOM', () => {
    expect(sessionsToCsv([session()]).charCodeAt(0)).toBe(0xfeff)
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
