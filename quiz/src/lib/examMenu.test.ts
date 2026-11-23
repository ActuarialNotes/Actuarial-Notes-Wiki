import { describe, expect, it } from 'vitest'
import {
  examPageIdFromFile,
  examProgressKeyFromFile,
  examQuizTopic,
  examStudyGuideFor,
  studyGuidesForResource,
  todaysPlanConcepts,
} from './examMenu'
import type { WikiExamSyllabus } from './wikiParser'

describe('examProgressKeyFromFile', () => {
  it('keys every vault exam page the way exam_progress does', () => {
    expect(examProgressKeyFromFile('Exam P-1 (SOA)')).toBe('P')
    expect(examProgressKeyFromFile('Exam FM-2 (SOA)')).toBe('FM')
    expect(examProgressKeyFromFile('Exam MAS-I (CAS)')).toBe('MAS-I')
    expect(examProgressKeyFromFile('Exam 5 (CAS)')).toBe('CAS-5')
    expect(examProgressKeyFromFile('Exam 6C (CAS)')).toBe('CAS-6')
    expect(examProgressKeyFromFile('Exam 9 (CAS)')).toBe('CAS-9')
    expect(examProgressKeyFromFile('Exam PCPA (CAS)')).toBe('CAS-PCPA')
  })

  it('ignores a .md extension', () => {
    expect(examProgressKeyFromFile('Exam 9 (CAS).md')).toBe('CAS-9')
  })
})

describe('examQuizTopic', () => {
  it('names the bank each exam page quizzes from', () => {
    expect(examQuizTopic('Exam P-1 (SOA)')).toBe('Probability')
    expect(examQuizTopic('Exam FM-2 (SOA).md')).toBe('Financial Mathematics')
    expect(examQuizTopic('Exam MAS-I (CAS)')).toBe('Exam MAS-I')
    expect(examQuizTopic('Exam 5 (CAS)')).toBe('Exam 5')
    expect(examQuizTopic('Exam 6C (CAS)')).toBe('Exam 6C')
    expect(examQuizTopic('Exam 9 (CAS)')).toBe('Exam 9')
    expect(examQuizTopic('Exam DISC-DA (CAS)')).toBe('Exam DISC-DA')
  })

  it('has none for an exam with no bank', () => {
    expect(examQuizTopic('Exam 6U (CAS)')).toBeUndefined()
    expect(examQuizTopic('Exam PCPA (CAS)')).toBeUndefined()
  })
})

describe('examPageIdFromFile', () => {
  it('keeps the variant a shared progress key loses', () => {
    expect(examPageIdFromFile('Exam 6C (CAS)')).toBe('6C')
    expect(examPageIdFromFile('Exam 6U (CAS).md')).toBe('6U')
    expect(examPageIdFromFile('Exam P-1 (SOA)')).toBe('P-1')
  })
})

describe('todaysPlanConcepts', () => {
  const today = '2026-09-27'

  it("returns today's concepts from a plan generated today", () => {
    expect(todaysPlanConcepts({ generatedDate: today, todaysConcepts: ['Loss Cost', 'Quota Share'] }, today))
      .toEqual(['Loss Cost', 'Quota Share'])
  })

  it("is null for yesterday's plan, an empty day, or no plan", () => {
    expect(todaysPlanConcepts({ generatedDate: '2026-09-26', todaysConcepts: ['Loss Cost'] }, today)).toBeNull()
    expect(todaysPlanConcepts({ generatedDate: today, todaysConcepts: [] }, today)).toBeNull()
    expect(todaysPlanConcepts(null, today)).toBeNull()
    expect(todaysPlanConcepts(undefined, today)).toBeNull()
  })
})

describe('studyGuidesForResource', () => {
  const syllabus = (fileName: string, readings: string[]): WikiExamSyllabus => ({
    examId: fileName,
    examLabel: fileName,
    examTopic: '',
    topics: [],
    resources: readings.map(name => ({ name, target: name })),
    fileName,
  })
  const ROSS = 'A First Course in Probability (Ross - 2019)'
  const syllabi = [
    syllabus('Exam MAS-I (CAS)', [ROSS, 'Other (X - 2020)']),
    syllabus('Exam P-1 (SOA)', [ROSS]),
    syllabus('Exam 5 (CAS)', ['Other (X - 2020)']),
  ]

  it('finds every study guide that lists the reading, in ladder order', () => {
    expect(studyGuidesForResource(syllabi, ROSS).map(s => s.fileName)).toEqual([
      'Exam P-1 (SOA)',
      'Exam MAS-I (CAS)',
    ])
  })

  it('matches the page name regardless of case and spacing', () => {
    expect(studyGuidesForResource(syllabi, `  ${ROSS.toLowerCase()} `)).toHaveLength(2)
  })

  it('is empty for a resource no study guide lists', () => {
    expect(studyGuidesForResource(syllabi, 'Unlisted (Nobody - 2001)')).toEqual([])
    expect(studyGuidesForResource(syllabi, '')).toEqual([])
  })
})

describe('examStudyGuideFor', () => {
  const page = (fileName: string, examId: string) =>
    ({ examId, examLabel: '', examTopic: '', topics: [], resources: [], fileName })
  const syllabi = [
    page('Exam P-1 (SOA)', 'P-1'),
    page('Exam 5 (CAS)', '5'),
    page('Exam 6U (CAS)', '6U'),
    page('Exam 6C (CAS)', '6C'),
  ]

  it('finds the exam page a bank answers to', () => {
    expect(examStudyGuideFor(syllabi, 'Probability')).toBe('Exam P-1 (SOA)')
    expect(examStudyGuideFor(syllabi, 'Exam 5')).toBe('Exam 5 (CAS)')
    // 6U shares 6C's progress key but not its bank.
    expect(examStudyGuideFor(syllabi, 'Exam 6C')).toBe('Exam 6C (CAS)')
  })

  it('has none for a bank no page in hand quizzes from', () => {
    expect(examStudyGuideFor(syllabi, 'Exam 9')).toBeUndefined()
    expect(examStudyGuideFor(syllabi, '')).toBeUndefined()
  })
})
