import { describe, it, expect } from 'vitest'
import { flashcardShelfExams } from './flashcardShelf'
import type { WikiExamSyllabus } from './wikiParser'

function syllabus(examId: string, examLabel: string): WikiExamSyllabus {
  return { examId, examLabel, examTopic: examLabel, resources: [], topics: [] }
}

// Bundle order is file order — alphabetical, not the ladder.
const SYLLABI = [
  syllabus('5', 'Exam 5'),
  syllabus('6C', 'Exam 6C'),
  syllabus('6U', 'Exam 6U'),
  syllabus('7', 'Exam 7'),
  syllabus('FM-2', 'Exam FM'),
  syllabus('MAS-I', 'Exam MAS-I'),
  syllabus('MAS-II', 'Exam MAS-II'),
  syllabus('P-1', 'Exam P'),
]

const ids = (s: WikiExamSyllabus[]) => s.map(x => x.examId)

describe('flashcardShelfExams', () => {
  it('offers every studiable exam, up the ladder, with nothing in progress', () => {
    expect(ids(flashcardShelfExams(SYLLABI, {}, {}))).toEqual(['P-1', 'FM-2', 'MAS-I', 'MAS-II', '5'])
  })

  it('leaves exams still in development off the shelf, whatever their status', () => {
    const out = flashcardShelfExams(SYLLABI, { 'CAS-7': 'in_progress', 'CAS-6': 'in_progress' }, {})
    expect(ids(out)).not.toContain('7')
    expect(ids(out)).not.toContain('6C')
  })

  it('leads with the exams being studied, and puts passed exams last', () => {
    const out = flashcardShelfExams(SYLLABI, { 'MAS-I': 'in_progress', P: 'completed' }, {})
    expect(ids(out)).toEqual(['MAS-I', 'FM-2', 'MAS-II', '5', 'P-1'])
  })

  it('keeps the ladder order among several exams in progress', () => {
    const out = flashcardShelfExams(SYLLABI, { 'CAS-5': 'in_progress', FM: 'in_progress' }, {})
    expect(ids(out).slice(0, 2)).toEqual(['FM-2', '5'])
  })
})
