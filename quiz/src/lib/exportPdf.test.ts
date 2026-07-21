import { describe, it, expect, vi, afterEach } from 'vitest'
import { buildProgressReport, buildPdfFilename, formatDuration, renderProgressReportPdf } from './exportPdf'
import type { ExportedResponse } from './exportData'

function resp(overrides: Partial<ExportedResponse>): ExportedResponse {
  return {
    answered_at: '2026-07-20T10:00:00.000Z',
    exam: 'Exam P',
    topic: 'Probability',
    question_id: 'q1',
    chosen_answer: 'A',
    correct_answer: 'A',
    is_correct: true,
    time_spent_seconds: 30,
    ...overrides,
  }
}

describe('buildProgressReport', () => {
  it('returns a zeroed report for no rows', () => {
    const r = buildProgressReport([])
    expect(r.answered).toBe(0)
    expect(r.correct).toBe(0)
    expect(r.incorrect).toBe(0)
    expect(r.accuracy).toBe(0)
    expect(r.avgTimeSeconds).toBeNull()
    expect(r.daysStudied).toBe(0)
    expect(r.firstAnsweredAt).toBeNull()
    expect(r.lastAnsweredAt).toBeNull()
    expect(r.byExam).toEqual([])
    expect(r.byTopic).toEqual([])
  })

  it('tallies answered, correct, incorrect and accuracy', () => {
    const r = buildProgressReport([
      resp({ is_correct: true }),
      resp({ is_correct: false }),
      resp({ is_correct: true }),
      resp({ is_correct: false }),
    ])
    expect(r.answered).toBe(4)
    expect(r.correct).toBe(2)
    expect(r.incorrect).toBe(2)
    expect(r.accuracy).toBe(0.5)
  })

  it('averages only rows that recorded a time', () => {
    const r = buildProgressReport([
      resp({ time_spent_seconds: 10 }),
      resp({ time_spent_seconds: 30 }),
      resp({ time_spent_seconds: null }),
    ])
    expect(r.avgTimeSeconds).toBe(20)
  })

  it('counts distinct UTC days and tracks the date range', () => {
    const r = buildProgressReport([
      resp({ answered_at: '2026-07-18T23:00:00.000Z' }),
      resp({ answered_at: '2026-07-20T01:00:00.000Z' }),
      resp({ answered_at: '2026-07-20T12:00:00.000Z' }),
    ])
    expect(r.daysStudied).toBe(2)
    expect(r.firstAnsweredAt).toBe('2026-07-18T23:00:00.000Z')
    expect(r.lastAnsweredAt).toBe('2026-07-20T12:00:00.000Z')
  })

  it('groups by exam and topic, sorted by volume', () => {
    const r = buildProgressReport([
      resp({ exam: 'Exam P', topic: 'Probability', is_correct: true }),
      resp({ exam: 'Exam P', topic: 'Probability', is_correct: false }),
      resp({ exam: 'Exam FM', topic: 'Annuities', is_correct: true }),
    ])
    expect(r.byExam).toEqual([
      { label: 'Exam P', answered: 2, correct: 1, accuracy: 0.5 },
      { label: 'Exam FM', answered: 1, correct: 1, accuracy: 1 },
    ])
    expect(r.byTopic[0].label).toBe('Probability')
    expect(r.byTopic[0].answered).toBe(2)
  })

  it('folds blank/absent exam or topic into Uncategorized', () => {
    const r = buildProgressReport([
      resp({ exam: null, topic: '   ' }),
      resp({ exam: '', topic: null }),
    ])
    expect(r.byExam).toEqual([{ label: 'Uncategorized', answered: 2, correct: 2, accuracy: 1 }])
    expect(r.byTopic).toEqual([{ label: 'Uncategorized', answered: 2, correct: 2, accuracy: 1 }])
  })
})

describe('buildPdfFilename', () => {
  it('embeds the scope slug and date, ending in .pdf', () => {
    expect(buildPdfFilename('exam-p', new Date('2026-07-21T00:00:00Z')))
      .toBe('actuarial-notes-progress-report-exam-p-2026-07-21.pdf')
  })
})

describe('formatDuration', () => {
  it('formats sub-minute, minute and null durations', () => {
    expect(formatDuration(null)).toBe('—')
    expect(formatDuration(45)).toBe('45s')
    expect(formatDuration(65)).toBe('1m 05s')
    expect(formatDuration(600)).toBe('10m 00s')
  })
})

describe('renderProgressReportPdf', () => {
  // Skip the logo fetch so we exercise the render path against the real jsPDF —
  // any bad API call or colour spread throws here — then assert real PDF bytes.
  afterEach(() => vi.restoreAllMocks())

  function expectPdf(doc: { output: (t: 'arraybuffer') => ArrayBuffer }): void {
    const header = new TextDecoder().decode(new Uint8Array(doc.output('arraybuffer')).slice(0, 5))
    expect(header).toBe('%PDF-')
  }

  it('renders a populated, multi-page report to a valid PDF', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('no network in test')))
    const rows: ExportedResponse[] = Array.from({ length: 40 }, (_, i) =>
      resp({
        exam: i % 2 === 0 ? 'Exam P' : 'Exam FM',
        topic: `Topic ${i % 20}`,
        is_correct: i % 3 !== 0,
        question_id: `q${i}`,
      }),
    )
    const doc = await renderProgressReportPdf(buildProgressReport(rows), { scopeLabel: 'All exams', owner: 'Test User' })
    expectPdf(doc)
  })

  it('renders the empty-state report to a valid PDF', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('no network in test')))
    const doc = await renderProgressReportPdf(buildProgressReport([]), { scopeLabel: 'Exam P', owner: 'Test User' })
    expectPdf(doc)
  })
})
