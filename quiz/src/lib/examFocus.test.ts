import { describe, expect, it } from 'vitest'
import { EXAM_SITTINGS, type ExamSitting } from '../data/examSittings'
import { TRACKS } from '../data/tracks'
import {
  addExamBody, addExamSections, addressFocus, browserExamsToMerge, daysAwayLabel, daysLeftLabel, daysUntil,
  focusOnLoad, isUsableExamDate, nearestSittingExam, offeredSittings, parseBrowserExams, parseStoredFocus,
  readerExams, resolveFocus, switcherRows, variantForPage, type ExamPage,
} from './examFocus'

const page = (examId: string, examLabel = `Exam ${examId}`, examTopic = 'Topic'): ExamPage =>
  ({ examId, examLabel, examTopic, fileName: `Exam ${examId} (X)` })

const P = page('P-1')
const FM = page('FM-2')
const MAS = page('MAS-I')
const C6 = page('6C')
const U6 = page('6U')
const PAGES = [P, FM, MAS, C6, U6]
const TODAY = new Date(2026, 10, 23) // 23 Nov 2026

describe('the stored choice', () => {
  it('reads an exam id and nothing else', () => {
    expect(parseStoredFocus('P-1')).toBe('P-1')
    expect(parseStoredFocus(' 6C ')).toBe('6C')
    expect(parseStoredFocus('')).toBeNull()
    expect(parseStoredFocus(null)).toBeNull()
    expect(parseStoredFocus(7)).toBeNull()
    expect(parseStoredFocus('<script>')).toBeNull()
    expect(parseStoredFocus('x'.repeat(41))).toBeNull()
  })

  it('opens a device on the account\'s exam, and on the browser\'s when the account has none', () => {
    expect(focusOnLoad('FM-2', 'P-1')).toBe('FM-2')
    expect(focusOnLoad(undefined, 'P-1')).toBe('P-1')
    expect(focusOnLoad({ bad: true }, 'P-1')).toBe('P-1')
    expect(focusOnLoad(null, null)).toBeNull()
  })
})

describe('the reader\'s exams', () => {
  it('are the exams in progress, on the page of the region picked', () => {
    const progress = { P: 'in_progress', FM: 'completed', 'CAS-6': 'in_progress' }
    expect(readerExams(PAGES, progress, { 'CAS-6': 'CA' }).map(e => e.examId)).toEqual(['P-1', '6C'])
    expect(readerExams(PAGES, progress, { 'CAS-6': 'US' }).map(e => e.examId)).toEqual(['P-1', '6U'])
  })

  it('names the region a page stands for', () => {
    expect(variantForPage('CAS-6', '6C')).toBe('CA')
    expect(variantForPage('CAS-6', '6U')).toBe('US')
    expect(variantForPage('P', 'P-1')).toBeNull()
  })
})

describe('the exam in focus', () => {
  const exams = [P, FM, MAS]

  it('is the exam last used', () => {
    expect(resolveFocus('FM-2', exams, {}, TODAY)).toBe(FM)
  })

  it('reads an older build\'s exam_progress key', () => {
    expect(resolveFocus('FM', exams, {}, TODAY)).toBe(FM)
    expect(resolveFocus('CAS-6', [P, C6], {}, TODAY)).toBe(C6)
  })

  it('is the nearest sitting the first time', () => {
    const dates = { P: '2027-03-01', FM: '2026-12-09', 'MAS-I': null }
    expect(resolveFocus(null, exams, dates, TODAY)).toBe(FM)
    expect(nearestSittingExam(exams, dates, TODAY)).toBe(FM)
  })

  it('passes over a date that has gone by', () => {
    expect(resolveFocus(null, exams, { P: '2026-05-08', FM: '2027-02-10' }, TODAY)).toBe(FM)
  })

  it('is the first exam when none has a date', () => {
    expect(resolveFocus(null, exams, {}, TODAY)).toBe(P)
  })

  it('moves on when the stored exam is no longer the reader\'s', () => {
    expect(resolveFocus('MAS-I', [P, FM], { FM: '2026-12-09' }, TODAY)).toBe(FM)
  })

  it('is nothing for a reader with no exams', () => {
    expect(resolveFocus('P-1', [], {}, TODAY)).toBeNull()
  })

  it('follows an address that names one of the reader\'s exams, and no other', () => {
    expect(addressFocus('FM-2', exams)).toBe('FM-2')
    expect(addressFocus('6C', exams)).toBeNull()
  })
})

describe('the sheet', () => {
  it('lists the reader\'s exams with days left and the syllabus, the one in focus checked', () => {
    const rows = switcherRows([P, FM], 'P-1', { P: '2027-01-14', FM: null }, { P: 27.4, FM: 0 }, TODAY)
    expect(rows).toEqual([
      { examId: 'P-1', key: 'P', label: 'Exam P-1', daysLeft: 52, pct: 27, current: true },
      { examId: 'FM-2', key: 'FM', label: 'Exam FM-2', daysLeft: null, pct: 0, current: false },
    ])
  })

  it('shows no days for a date that has passed, and keeps the bar inside 0 to 100', () => {
    const [row] = switcherRows([P], null, { P: '2026-11-01' }, { P: 140 }, TODAY)
    expect(row.daysLeft).toBeNull()
    expect(row.pct).toBe(100)
    expect(row.current).toBe(false)
  })

  it('puts the soonest exam first and the undated last', () => {
    const rows = switcherRows([P, FM, MAS], null, { P: null, FM: '2027-04-14', 'MAS-I': '2027-01-14' }, {}, TODAY)
    expect(rows.map(r => r.examId)).toEqual(['MAS-I', 'FM-2', 'P-1'])
  })

  it('words the days', () => {
    expect(daysLeftLabel(52)).toBe('52 days')
    expect(daysLeftLabel(1)).toBe('1 day')
    expect(daysLeftLabel(0)).toBe('Today')
    expect(daysAwayLabel(52)).toBe('52 days away')
    expect(daysAwayLabel(1)).toBe('Tomorrow')
    expect(daysAwayLabel(0)).toBe('Open now')
    expect(daysUntil('2027-01-14', TODAY)).toBe(52)
  })
})

describe('the sittings offered', () => {
  const rows: ExamSitting[] = [
    { examId: 'X', format: 'CBT', startDate: '2026-09-10', endDate: '2026-09-21', registrationDeadline: null },
    { examId: 'X', format: 'CBT', startDate: '2027-01-14', endDate: '2027-01-25', registrationDeadline: null },
    { examId: 'X', format: 'P/P', startDate: '2027-01-14', endDate: null, registrationDeadline: null },
    { examId: 'X', format: 'CBT', startDate: '2027-03-01', endDate: '2027-03-12', registrationDeadline: null },
    { examId: 'X', format: 'CBT', startDate: '2027-05-07', endDate: '2027-05-18', registrationDeadline: null },
    { examId: 'X', format: 'CBT', startDate: '2027-07-01', endDate: '2027-07-12', registrationDeadline: null },
    { examId: 'Y', format: 'CBT', startDate: '2026-12-01', endDate: null, registrationDeadline: null },
    { examId: 'SPAN', format: 'CBT', startDate: '2026-10-23', endDate: '2027-10-29', registrationDeadline: null },
    { examId: 'OPEN', format: 'CBT', startDate: '2026-11-18', endDate: '2026-11-27', registrationDeadline: null },
  ]

  it('are the next three, one per start date, past ones left out', () => {
    expect(offeredSittings('X', TODAY, rows)).toEqual([
      { id: '2027-01-14', label: 'Jan 14–25, 2027', date: '2027-01-14', daysAway: 52 },
      { id: '2027-03-01', label: 'Mar 1–12, 2027', date: '2027-03-01', daysAway: 98 },
      { id: '2027-05-07', label: 'May 7–18, 2027', date: '2027-05-07', daysAway: 165 },
    ])
  })

  it('are none for an exam with no sitting on file, or only a registration span', () => {
    expect(offeredSittings('NONE', TODAY, rows)).toEqual([])
    expect(offeredSittings('SPAN', TODAY, rows)).toEqual([])
  })

  it('record today for a window that is already open', () => {
    expect(offeredSittings('OPEN', TODAY, rows)).toEqual([
      { id: '2026-11-18', label: 'Nov 18–27, 2026', date: '2026-11-23', daysAway: 0 },
    ])
  })

  it('are always rows of the published table', () => {
    const today = new Date(2026, 10, 23)
    for (const key of new Set(EXAM_SITTINGS.map(s => s.examId))) {
      const offered = offeredSittings(key, today)
      expect(offered.length).toBeLessThanOrEqual(3)
      for (const option of offered) {
        expect(EXAM_SITTINGS.some(s => s.examId === key && s.startDate === option.id)).toBe(true)
        expect(option.daysAway).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('takes another date only when it is a real day, today or later', () => {
    expect(isUsableExamDate('2026-11-23', TODAY)).toBe(true)
    expect(isUsableExamDate('2027-06-30', TODAY)).toBe(true)
    expect(isUsableExamDate('2026-11-22', TODAY)).toBe(false)
    expect(isUsableExamDate('2027-02-30', TODAY)).toBe(false)
    expect(isUsableExamDate('', TODAY)).toBe(false)
    expect(isUsableExamDate('next spring', TODAY)).toBe(false)
  })
})

describe('Add an exam', () => {
  const name = (p: ExamPage) => p.examLabel
  const pages: ExamPage[] = [
    page('P-1'), page('FM-2'), page('FAM'), page('SRM'), page('PA'), page('MAS-I'), page('5'),
    page('6C'), page('6U'), page('GH-101'), page('F1PC'),
  ]

  it('lists a body\'s studiable exams by credential and folds the ones in development', () => {
    const sections = addExamSections('SOA', TRACKS, pages, { P: 'in_progress', FM: 'completed' }, {}, name)
    const asa = sections.find(s => s.track === 'ASA')!
    expect(asa.rows.map(r => r.examId)).toEqual(['P-1', 'FM-2', 'FAM', 'SRM'])
    expect(asa.rows.map(r => r.added)).toEqual([true, false, false, false])
    expect(asa.rows[1].passed).toBe(true)
    expect(asa.development.map(r => r.examId)).toEqual(['PA'])
    const fsa = sections.find(s => s.track === 'FSA')!
    expect(fsa.rows).toEqual([])
    expect(fsa.development.map(r => r.examId)).toEqual(['GH-101'])
  })

  it('lists an exam once per body, and a regional exam by page', () => {
    const sections = addExamSections('CAS', TRACKS, pages, { 'CAS-6': 'in_progress' }, { 'CAS-6': 'CA' }, name)
    const all = sections.flatMap(s => [...s.rows, ...s.development]).map(r => r.examId)
    expect(new Set(all).size).toBe(all.length)
    const acas = sections.find(s => s.track === 'ACAS')!
    expect(acas.rows.map(r => r.examId)).toEqual(expect.arrayContaining(['P-1', 'FM-2', 'MAS-I', '5', '6C']))
    expect(acas.rows.find(r => r.examId === '6C')!.added).toBe(true)
    const us = acas.development.find(r => r.examId === '6U')!
    expect(us.added).toBe(false)
    expect(us.status).toBe('development')
  })

  it('shows the CIA\'s own requirements under the CIA', () => {
    const sections = addExamSections('CIA', TRACKS, pages, {}, {}, name)
    expect(sections.flatMap(s => s.development).map(r => r.examId)).toEqual(['F1PC'])
    expect(sections.flatMap(s => s.rows)).toEqual([])
  })

  it('opens on the stored body, else the reader\'s track\'s', () => {
    expect(addExamBody('CIA', 'ACAS')).toBe('CIA')
    expect(addExamBody(null, 'FCAS')).toBe('CAS')
    expect(addExamBody(null, 'ACIA')).toBe('CIA')
    expect(addExamBody(null, 'DEFAULT')).toBe('SOA')
  })
})

describe('a visitor\'s exams', () => {
  it('are read back from the browser, the malformed dropped', () => {
    const raw = JSON.stringify([
      { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' },
      { exam_id: 'CAS-6', status: 'in_progress', target_date: 'soon', variant: 'CA' },
      { exam_id: 'P', status: 'completed', target_date: null },
      { exam_id: 'FM', status: 'studying' },
      { exam_id: '<b>', status: 'in_progress' },
      null,
    ])
    expect(parseBrowserExams(raw)).toEqual([
      { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14', variant: null },
      { exam_id: 'CAS-6', status: 'in_progress', target_date: null, variant: 'CA' },
    ])
    expect(parseBrowserExams('not json')).toEqual([])
    expect(parseBrowserExams('{"a":1}')).toEqual([])
    expect(parseBrowserExams(null)).toEqual([])
  })

  it('join an account once: only the exams it has no row for', () => {
    const browser = parseBrowserExams(JSON.stringify([
      { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' },
      { exam_id: 'FM', status: 'in_progress', target_date: null },
      { exam_id: 'SRM', status: 'not_started', target_date: null },
    ]))
    expect(browserExamsToMerge(browser, new Set(['P'])).map(r => r.exam_id)).toEqual(['FM'])
  })
})
