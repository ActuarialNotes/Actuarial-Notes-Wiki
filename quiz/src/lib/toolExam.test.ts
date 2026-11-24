import { describe, expect, it } from 'vitest'
import examPages from 'virtual:exam-pages'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from './wikiParser'
import { earliestExam, examForConcepts, examForResource, toolConcept, toolsForExam } from './toolExam'
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

describe('the tools an exam covers', () => {
  const exam = (id: string) => syllabi.find(s => s.examId === id)!
  const names = (id: string) => toolsForExam(TOOLS, exam(id)).map(t => t.name)

  it('counts a tool for every exam that teaches it, not only the earliest', () => {
    expect(names('5')).toContain('Chain Ladder')
    expect(names('FAM')).toContain('Chain Ladder')
    expect(names('FM-2')).toContain('Bond Price')
    expect(names('FM-2')).not.toContain('Chain Ladder')
  })
  it('gives an exam whose syllabus names no tool concept none', () => {
    expect(names('9')).toEqual([])
    expect(names('PCPA')).toEqual([])
  })
  it('keeps the order the tools were given in', () => {
    const five = toolsForExam(TOOLS, exam('5'))
    expect(five.map(t => TOOLS.indexOf(t))).toEqual([...five.map(t => TOOLS.indexOf(t))].sort((a, b) => a - b))
  })
  it('tells Exam 6\'s papers apart', () => {
    expect(names('6C')).toContain('MCT Ratio')
    expect(names('6U')).not.toContain('MCT Ratio')
  })
})

describe('a tool\'s concept', () => {
  it('is the first page its method names, and every tool has one with a page', () => {
    expect(toolConcept(toolById('ratemaking.loss_ratio_method')!)).toBe('Loss Ratio Method')
    for (const t of TOOLS) expect(toolConcept(t), t.id).toBeTruthy()
    expect(toolConcept({ method: { concepts: [] } })).toBeNull()
  })
})
