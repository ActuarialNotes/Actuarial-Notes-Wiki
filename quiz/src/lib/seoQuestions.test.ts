import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseAllQuestions, parseQuestion, type Question } from './parser'
import { hasCriticalFinding } from './verification'
import { DESCRIPTION_MAX } from './seo'
import {
  buildQuestionSeoPages,
  hasQuestionPage,
  questionConcepts,
  questionExamName,
  questionMarkdown,
  questionName,
  questionNeighbours,
  questionNumber,
  questionRoute,
  questionRuns,
} from './seoQuestions'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

function bank(): Question[] {
  const dir = path.join(REPO_ROOT, 'questions')
  const raw: string[] = []
  for (const exam of readdirSync(dir)) {
    for (const file of readdirSync(path.join(dir, exam))) {
      if (file.endsWith('.md')) raw.push(readFileSync(path.join(dir, exam, file), 'utf-8'))
    }
  }
  return parseAllQuestions(raw)
}

function question(fields: Partial<Question>): Question {
  return {
    id: 'p-004', exam: 'Probability', topic: 'General Probability', learning_objective: '',
    difficulty: 'medium', type: 'multiple-choice', wiki_link: ['Concepts/Bayes+Theorem'],
    answer: 'C', explanation: 'SECRET EXPLANATION', points: 1, stem: 'A die is rolled.',
    options: [{ key: 'A', text: '1/6' }, { key: 'B', text: '1/3' }, { key: 'C', text: '1/2' }],
    ...fields,
  }
}

describe('question pages', () => {
  it('names a question the way a candidate searches for it', () => {
    expect(questionName(question({}))).toBe('SOA Exam P Sample Question 4')
    expect(questionName(question({ id: 'cas5-2013f-004', exam: 'Exam 5', year: 2013, session: 'Fall' })))
      .toBe('CAS Exam 5 Fall 2013, Question 4')
    // Sat on Exam 7's paper, now in Exam 9's bank: named by the paper it was sat on.
    expect(questionName(question({ id: 'cas7-2012-q13', exam: 'Exam 9', originally_exam: 'Exam 7', year: 2012 })))
      .toBe('CAS Exam 7 2012, Question 13')
    expect(questionName(question({ id: 'masi-an-012', exam: 'Exam MAS-I' }))).toBe('Exam MAS-I Practice Question 12')
    expect(questionNumber('faml-3-12')).toBe('3.12')
    expect(questionExamName('Financial Mathematics')).toBe('Exam FM')
  })

  it('shows the question and never its answer', () => {
    const md = questionMarkdown(question({}))
    expect(md).toContain('A die is rolled.')
    expect(md).toContain('**C)** 1/2')
    expect(md).toContain('/quiz?ids=p-004')
    expect(md).toContain('[[Bayes Theorem]]')
    expect(md).not.toContain('SECRET')
  })

  it('links each question to the ones either side of it on its paper, in paper order', () => {
    const paper = ['cas5-2013f-010', 'cas5-2013f-002', 'cas5-2013f-001'].map(id => question({ id, exam: 'Exam 5', year: 2013, session: 'Fall' }))
    const runs = questionRuns([...paper, question({ id: 'cas5-2014s-001', exam: 'Exam 5', year: 2014, session: 'Spring' })])
    const { previous, next } = questionNeighbours(runs, paper[1]!)
    expect(previous?.id).toBe('cas5-2013f-001')
    expect(next?.id).toBe('cas5-2013f-010')
    expect(questionNeighbours(runs, paper[2]!).previous).toBeUndefined()
  })

  it('gives every question in the bank a page with a unique title, a clean description and no answer', () => {
    const questions = bank()
    const pages = buildQuestionSeoPages(questions, () => undefined)
    expect(pages.length).toBeGreaterThan(3000)
    const titles = new Set<string>()
    const paths = new Set<string>()
    for (const { question: q, page } of pages) {
      expect(titles.has(page.title), page.title).toBe(false)
      titles.add(page.title)
      paths.add(page.path)
      expect(page.description.length, q.id).toBeGreaterThan(20)
      expect(page.description.length, q.id).toBeLessThanOrEqual(DESCRIPTION_MAX)
      expect(page.description, q.id).not.toMatch(/\$\$|\$[a-zA-Z\\{]|\\[a-zA-Z]|\*\*|\[\[/)
      expect(page.path).toBe(questionRoute(q.id))
      // The page is the question, not its solution.
      const md = questionMarkdown(q)
      for (const solution of [q.explanation, q.examiner_report, ...(q.parts ?? []).flatMap(p => [p.explanation, p.examiner_report])]) {
        const text = solution?.trim()
        if (text && text.length > 40) expect(md.includes(text), q.id).toBe(false)
      }
    }
    expect(paths.size).toBe(pages.length)
    // Withheld questions have no page, as they have no quiz.
    for (const q of questions.filter(q => hasCriticalFinding(q.verification))) expect(hasQuestionPage(q)).toBe(false)
  })

  it('reads a wiki_link entry back into its concept name', () => {
    const q = parseQuestion('---\nid: x-1\nexam: Probability\ntopic: T\ndifficulty: easy\ntype: multiple-choice\nanswer: A\nwiki_link: ["Concepts/Bayes+Theorem", "Concepts/Bayes+Theorem"]\n---\nStem\n\n- A) one\n\n## Explanation\nx\n')
    expect(q && questionConcepts(q)).toEqual(['Bayes Theorem'])
  })
})
