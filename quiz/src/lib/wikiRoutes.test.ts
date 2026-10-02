import { describe, it, expect } from 'vitest'
import { examDisplayName, studyGuidesSection, RESOURCES_ROUTE } from './wikiRoutes'

describe('examDisplayName', () => {
  it('drops the examining-body suffix', () => {
    expect(examDisplayName('Exam P-1 (SOA)')).toBe('Exam P-1')
    expect(examDisplayName('Exam FM-2 (SOA)')).toBe('Exam FM-2')
    expect(examDisplayName('Exam MAS-I (CAS)')).toBe('Exam MAS-I')
    expect(examDisplayName('Exam 5 (CAS)')).toBe('Exam 5')
  })

  it('drops a .md extension too', () => {
    expect(examDisplayName('Exam MAS-II (CAS).md')).toBe('Exam MAS-II')
  })

  // The exam pages' own `# ` headings go through this too, and they aren't all
  // spelled like the file name — "MAS-I (CAS)" carried no "Exam " prefix.
  it('drops the suffix off a heading that omits the Exam prefix', () => {
    expect(examDisplayName('MAS-I (CAS)')).toBe('MAS-I')
    expect(examDisplayName('P-1 (SOA)')).toBe('P-1')
  })

  it('leaves a name without the suffix alone', () => {
    expect(examDisplayName('Exam 5')).toBe('Exam 5')
    expect(examDisplayName('Exam GI 101')).toBe('Exam GI 101')
  })

  it('keeps parenthetical text that is not an examining body', () => {
    expect(examDisplayName('Exam PA (Predictive Analytics)')).toBe('Exam PA (Predictive Analytics)')
  })
})

describe('studyGuidesSection', () => {
  it('puts the exam ladder and the pages read from it under Exams', () => {
    expect(studyGuidesSection('/wiki')).toBe('exams')
    expect(studyGuidesSection('/wiki/')).toBe('exams')
    expect(studyGuidesSection('/wiki/exam/Exam+P-1+(SOA)')).toBe('exams')
    expect(studyGuidesSection('/wiki/concept/Expected+Value')).toBe('exams')
  })

  it('puts the shelf and a resource page under Resources', () => {
    expect(studyGuidesSection(RESOURCES_ROUTE)).toBe('resources')
    expect(studyGuidesSection('/wiki/resources/')).toBe('resources')
    expect(studyGuidesSection('/wiki/resource/Basic+Ratemaking+(Werner+-+2016)')).toBe('resources')
  })

  it('is null outside the tab', () => {
    expect(studyGuidesSection('/')).toBeNull()
    expect(studyGuidesSection('/wikipedia')).toBeNull()
    expect(studyGuidesSection('/project')).toBeNull()
  })
})
