import { describe, expect, it } from 'vitest'
import { conceptAccentExam, conceptExams } from './conceptExam'
import type { WikiExamSyllabus } from './wikiParser'

function syllabus(examId: string, concepts: string[]): WikiExamSyllabus {
  return {
    examId,
    examLabel: `Exam ${examId}`,
    examTopic: '',
    resources: [],
    topics: [{ concepts: concepts.map(name => ({ name, target: `Concepts/${name}` })) } as WikiExamSyllabus['topics'][number]],
  }
}

const SYLLABI = [
  syllabus('MAS-I', ['Bayes Theorem', 'Poisson Process']),
  syllabus('P-1', ['Bayes Theorem']),
  syllabus('5', ['Accident Year', 'Poisson Process']),
  syllabus('DISC-DA', ['Data Governance']),
]

describe('conceptExams', () => {
  it('lists the exams a concept is on, earliest on the ladder first', () => {
    expect(conceptExams(SYLLABI, 'Bayes Theorem')).toEqual(['P', 'MAS-I'])
    expect(conceptExams(SYLLABI, 'Poisson Process')).toEqual(['MAS-I', 'CAS-5'])
  })

  it('reads a vault link and ignores case', () => {
    expect(conceptExams(SYLLABI, 'Concepts/Bayes+Theorem')).toEqual(['P', 'MAS-I'])
    expect(conceptExams(SYLLABI, 'accident year')).toEqual(['CAS-5'])
  })

  it('leaves out requirements with no accent', () => {
    expect(conceptExams(SYLLABI, 'Data Governance')).toEqual([])
  })
})

describe('conceptAccentExam', () => {
  it('takes the context exam when the concept is on it', () => {
    expect(conceptAccentExam(SYLLABI, 'Bayes Theorem', 'MAS-I')).toBe('MAS-I')
  })

  it('falls back to the earliest exam when the context is ambiguous or elsewhere', () => {
    expect(conceptAccentExam(SYLLABI, 'Bayes Theorem')).toBe('P')
    expect(conceptAccentExam(SYLLABI, 'Bayes Theorem', 'CAS-5')).toBe('P')
  })

  it('is undefined for a concept on no exam', () => {
    expect(conceptAccentExam(SYLLABI, 'Nothing Here')).toBeUndefined()
  })
})
