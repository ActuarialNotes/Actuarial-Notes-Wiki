import { describe, it, expect } from 'vitest'
import type { Question } from './parser'
import {
  formatExamLength,
  formatExamUnits,
  formatUnitTime,
  formatYearSpan,
  quizBankInfo,
} from './quizBankInfo'
import { EXAM_PACE } from './quizTiming'

const q = (partial: Partial<Question>): Question => ({ id: 'x-1', exam: 'Exam 5', ...partial }) as Question

describe('quizBankInfo', () => {
  it('splits a bank into past papers, samples, the vault and carried-over questions', () => {
    const info = quizBankInfo([
      q({ id: 'p-1', exam: 'Probability' }),
      q({ id: 'p-2', exam: 'Probability' }),
      q({ id: 'p-901', exam: 'Probability' }),
    ], 'Probability')
    expect(info.total).toBe(3)
    expect(info.sources).toMatchObject({ samples: 2, samplePublisher: 'SOA', vault: 1, pastPapers: 0, sittings: 0 })
  })

  it('counts sittings and their span, with session spellings normalised', () => {
    const info = quizBankInfo([
      q({ id: 'a', year: 2019, session: 'Spring' }),
      q({ id: 'b', year: 2019, session: 'sp' }),
      q({ id: 'c', year: 2014, session: 'Fall' }),
      q({ id: 'd', year: 2014 }),
    ], 'Exam 5')
    expect(info.sources).toMatchObject({ pastPapers: 4, sittings: 3, firstYear: 2014, lastYear: 2019 })
  })

  it('keeps a question sat on another exam out of this exam’s papers', () => {
    const info = quizBankInfo([
      q({ id: 'a', exam: 'Exam 9', year: 2018, originally_exam: 'Exam 7' }),
      q({ id: 'b', exam: 'Exam 9', year: 2018, originally_exam: 'Exam 9' }),
    ], 'Exam 9')
    expect(info.sources).toMatchObject({ carried: 1, pastPapers: 1 })
  })

  it('counts off-syllabus questions apart from the drawable total', () => {
    const info = quizBankInfo([
      q({ id: 'a', year: 2015 }),
      q({ id: 'b', year: 2015, off_syllabus: true }),
    ], 'Exam 5')
    expect(info.total).toBe(1)
    expect(info.offSyllabus).toBe(1)
    expect(info.sources.pastPapers).toBe(1)
  })

  it('carries the paper’s pace, or none for an exam with no pace on file', () => {
    expect(quizBankInfo([], 'Probability').pace).toBe(EXAM_PACE['Probability'])
    expect(quizBankInfo([], 'Exam 8').pace).toBeNull()
  })
})

describe('formatting', () => {
  it('says a sitting’s length', () => {
    expect(formatExamLength(180)).toBe('3 hours')
    expect(formatExamLength(150)).toBe('2.5 hours')
    expect(formatExamLength(60)).toBe('1 hour')
    expect(formatExamLength(100)).toBe('100 minutes')
  })

  it('says what the time is divided over, and the clock each gets', () => {
    expect(formatExamUnits(EXAM_PACE['Probability'])).toBe('30 questions')
    expect(formatExamUnits(EXAM_PACE['Exam 5'])).toBe('About 55 points')
    expect(formatUnitTime(EXAM_PACE['Probability'])).toBe('6:00')
    expect(formatUnitTime(EXAM_PACE['Financial Mathematics'])).toBe('5:00')
  })

  it('says a span of years', () => {
    expect(formatYearSpan(2012, 2019)).toBe('2012–2019')
    expect(formatYearSpan(2019, 2019)).toBe('2019')
    expect(formatYearSpan(null, null)).toBeNull()
  })
})
