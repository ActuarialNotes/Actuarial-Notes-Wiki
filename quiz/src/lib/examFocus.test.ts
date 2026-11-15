import { describe, it, expect } from 'vitest'
import examPages from 'virtual:exam-pages'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from './wikiParser'
import {
  focusExams, focusedPath, guidePath, quizPath, resolveFocus, resourcesPath,
  studiedExams, switcherBody, switcherGroups,
} from './examFocus'
import { QUIZ_EXAMS } from './quizBuilder'

const syllabi = Object.entries(examPages).flatMap(([name, md]): WikiExamSyllabus[] => {
  const meta = parseExamMetadata(md)
  return meta ? [parseExamSyllabus(md, meta.examId, meta.examLabel, meta.examTopic, name.replace(/\.md$/i, ''))] : []
})
const exams = focusExams(syllabi)
const by = (file: string) => exams.find(e => e.file === file)!

describe('the exam in focus', () => {
  it('knows every exam page, in ladder order', () => {
    expect(exams.length).toBe(syllabi.length)
    const names = exams.map(e => e.file)
    expect(names.indexOf('Exam P-1 (SOA)')).toBeLessThan(names.indexOf('Exam 5 (CAS)'))
    expect(names.indexOf('Exam 5 (CAS)')).toBeLessThan(names.indexOf('Exam 9 (CAS)'))
  })

  it('derives an exam’s other names from its page', () => {
    expect(by('Exam 5 (CAS)')).toMatchObject({ progressKey: 'CAS-5', pageId: '5', name: 'Exam 5', bank: 'Exam 5', readingsLabel: 'Exam 5', bodies: ['CAS'] })
    expect(by('Exam P-1 (SOA)')).toMatchObject({ progressKey: 'P', bank: 'Probability', readingsLabel: 'Exam P-1' })
    expect(by('Exam P-1 (SOA)').bodies.sort()).toEqual(['CAS', 'SOA'])
    expect(by('Exam 6C (CAS)')).toMatchObject({ progressKey: 'CAS-6', pageId: '6C', bank: 'Exam 6C', status: 'beta' })
    expect(by('Exam 6U (CAS)')).toMatchObject({ progressKey: 'CAS-6', bank: undefined, status: 'development' })
  })

  it('gives every exam the quiz builder offers a builder to open', () => {
    const banks = new Set(exams.map(e => e.bank))
    for (const q of QUIZ_EXAMS) expect(banks.has(q.value), q.value).toBe(true)
  })

  it('is the stored exam, else the first one being studied, else none', () => {
    const studied = studiedExams(exams, { 'CAS-5': 'in_progress', P: 'completed', 'CAS-6': 'in_progress' }, { 'CAS-6': null })
    expect(studied.map(e => e.file)).toContain('Exam 5 (CAS)')
    expect(studied.map(e => e.file)).not.toContain('Exam P-1 (SOA)')
    expect(resolveFocus('Exam 7 (CAS)', exams, studied)?.file).toBe('Exam 7 (CAS)')
    expect(resolveFocus(null, exams, studied)?.file).toBe(studied[0]!.file)
    expect(resolveFocus('Exam Gone (CAS)', exams, studied)?.file).toBe(studied[0]!.file)
    expect(resolveFocus(null, exams, [])).toBeNull()
  })

  it('lists the reader’s exams, then the body’s other ready and beta exams', () => {
    const studied = [by('Exam 5 (CAS)')]
    const groups = switcherGroups(exams, studied, by('Exam 5 (CAS)'), 'CAS')
    expect(groups.yours.map(e => e.file)).toEqual(['Exam 5 (CAS)'])
    expect(groups.others.every(e => e.status !== 'development' && e.bodies.includes('CAS'))).toBe(true)
    expect(groups.others.map(e => e.file)).toContain('Exam P-1 (SOA)')
    expect(groups.others.map(e => e.file)).not.toContain('Exam 5 (CAS)')
    expect(groups.others.map(e => e.file)).not.toContain('Exam 6U (CAS)')
    // With no body named, both ladders' ready and beta exams.
    const all = switcherGroups(exams, [], null, null).others.map(e => e.file)
    expect(all).toEqual(expect.arrayContaining(['Exam FAM (SOA)', 'Exam 7 (CAS)']))
    expect(all).not.toContain('Exam 6U (CAS)')
    // A focus the reader isn't studying leads their list.
    expect(switcherGroups(exams, studied, by('Exam 6U (CAS)'), 'CAS').yours.map(e => e.file)).toEqual(['Exam 6U (CAS)', 'Exam 5 (CAS)'])
  })

  it('lists the focus’s own ladder when the picked body doesn’t hold it', () => {
    expect(switcherBody(by('Exam 5 (CAS)'), 'SOA')).toBe('CAS')
    expect(switcherBody(by('Exam P-1 (SOA)'), 'CAS')).toBe('CAS')
    expect(switcherBody(null, 'SOA')).toBe('SOA')
  })

  it('opens each tab on the exam', () => {
    const five = by('Exam 5 (CAS)')
    expect(quizPath(five)).toBe('/?topic=Exam+5'.replace('+', '%20'))
    expect(quizPath(by('Exam 6U (CAS)'))).toBe('/')
    expect(quizPath(null)).toBe('/')
    expect(guidePath(five)).toBe('/wiki/exam/Exam+5+(CAS)')
    expect(guidePath(null)).toBe('/wiki')
    expect(resourcesPath(by('Exam P-1 (SOA)'))).toBe('/wiki/resources?exam=Exam%20P-1')
  })

  it('moves the page the reader is on to the new exam, and leaves the rest alone', () => {
    const five = by('Exam 5 (CAS)')
    expect(focusedPath('/', '?topic=Probability', five)).toBe(quizPath(five))
    expect(focusedPath('/wiki/exam/Exam+P-1+(SOA)', '', five)).toBe(guidePath(five))
    expect(focusedPath('/wiki', '', five)).toBe(guidePath(five))
    expect(focusedPath('/wiki/resources', '?exam=Exam+P-1&year=2019', five)).toBe(resourcesPath(five))
    expect(focusedPath('/store', '?exam=P', five)).toBe('/store')
    expect(focusedPath('/store', '', five)).toBeNull()
    expect(focusedPath('/dashboard', '', five)).toBeNull()
    expect(focusedPath('/tools/chain-ladder', '', five)).toBeNull()
    expect(focusedPath('/wiki/concept/Bayes+Theorem', '', five)).toBeNull()
  })
})
