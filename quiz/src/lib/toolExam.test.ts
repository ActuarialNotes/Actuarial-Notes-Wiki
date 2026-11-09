import { describe, expect, it } from 'vitest'
import examPages from 'virtual:exam-pages'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from './wikiParser'
import { earliestExam, examForConcepts, examForResource } from './toolExam'
import { TOOLS, toolById } from './tools'

const syllabi: WikiExamSyllabus[] = Object.entries(examPages as Record<string, string>).flatMap(([name, md]) => {
  const meta = parseExamMetadata(md)
  return meta ? [parseExamSyllabus(md, meta.examId, meta.examLabel, meta.examTopic, name.replace(/\.md$/, ''))] : []
})

describe('earliestExam', () => {
  it('is the lowest rung, read off the hues', () => {
    expect(earliestExam(['CAS-7', 'CAS-5', 'MAS-I'])).toBe('MAS-I')
    expect(earliestExam(['VEE-AF', 'CAS-9'])).toBe('CAS-9')
    expect(earliestExam(['VEE-AF'])).toBeNull()
  })
})

describe('the vault', () => {
  it('gives every template tool an exam', () => {
    for (const t of TOOLS) expect(examForConcepts(t.method.concepts, syllabi), t.id).not.toBeNull()
  })
  it('puts Bond Price on FM and Limited Expected Value on MAS-I', () => {
    expect(examForConcepts(toolById('finance.bond_price')!.method.concepts, syllabi)).toBe('FM')
    expect(examForConcepts(toolById('distributions.limited_expected_value')!.method.concepts, syllabi)).toBe('MAS-I')
  })
  it('gives the OSFI MCT set Exam 6\'s colour and a figure on no syllabus none', () => {
    expect(examForResource('OSFI MCT', syllabi)).toBe('CAS-6')
    expect(examForResource('[[OSFI MCT]]', syllabi)).toBe('CAS-6')
    expect(examForResource('AIRB Annual Review Report (2026)', syllabi)).toBeNull()
  })
})
