import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion, type Question } from './parser'
import {
  conceptExaminerNotes,
  conceptPaperSeries,
  paperExam,
  seriesShare,
  seriesSpan,
} from './conceptPapers'
import { questionConcepts } from './tutor/items'

function q(over: Partial<Question>): Question {
  return {
    id: 'x-1',
    exam: 'Exam 5',
    topic: 'T',
    learning_objective: 'L',
    difficulty: 'medium',
    type: 'free-entry',
    wiki_link: ['Concepts/Loss+Ratio'],
    answer: '',
    explanation: '',
    points: 1,
    stem: 'Calculate the loss ratio.',
    options: [],
    ...over,
  }
}

describe('conceptPaperSeries', () => {
  const bank = [
    q({ id: 'cas5-2018s-q3', year: 2018, session: 'Spring', points: 2 }),
    q({ id: 'cas5-2018s-q1', year: 2018, session: 'Spring', points: 1.5 }),
    q({ id: 'cas5-2018f-q2', year: 2018, session: 'Fall', wiki_link: ['Concepts/Trend'] }),
    q({ id: 'cas5-2019s-q7', year: 2019, session: 'Spring', points: 3 }),
    q({ id: 'cas5-2019f-q9', year: 2019, session: 'Fall', off_syllabus: true }),
    q({ id: 'e5-an-001' }),
  ]

  it('counts the papers a concept is on among the papers the bank holds', () => {
    const [series, ...rest] = conceptPaperSeries(bank, 'Loss Ratio')
    expect(rest).toEqual([])
    expect(series.exam).toBe('Exam 5')
    expect(series.papers.map(p => p.sitting)).toEqual(['Spring 2018', 'Fall 2018', 'Spring 2019', 'Fall 2019'])
    expect(series.on).toBe(2)
    expect(series.questions).toBe(3)
    expect(series.last).toBe('Spring 2019')
    expect(seriesShare(series)).toBe('2 of 4')
    expect(seriesSpan(series)).toBe('2018 to 2019')
  })

  it('lists a paper\'s questions in paper order and takes the median points', () => {
    const [series] = conceptPaperSeries(bank, 'loss ratio')
    expect(series.papers[0].questionIds).toEqual(['cas5-2018s-q1', 'cas5-2018s-q3'])
    expect(series.typicalPoints).toBe(2)
  })

  it('leaves an off-syllabus question out of the count but keeps its paper', () => {
    const [series] = conceptPaperSeries(bank, 'Loss Ratio')
    expect(series.papers[3]).toEqual({ sitting: 'Fall 2019', year: 2019, questionIds: [] })
  })

  it('says nothing of points on a paper of single marks', () => {
    const mc = [q({ id: 'm-1', year: 2018, session: 'Fall' }), q({ id: 'm-2', year: 2019, session: 'Fall' })]
    expect(conceptPaperSeries(mc, 'Loss Ratio')[0].typicalPoints).toBeNull()
  })

  it('has nothing for a concept on no paper', () => {
    expect(conceptPaperSeries(bank, 'Credibility')).toEqual([])
    expect(conceptPaperSeries([q({ id: 'e5-an-001' })], 'Loss Ratio')).toEqual([])
  })

  it('counts a moved question on the paper it was sat on', () => {
    const moved = [
      q({ id: 'cas7-2015-q4', exam: 'Exam 9', originally_exam: 'Exam 7', year: 2015, session: 'Spring' }),
      q({ id: 'cas7-2016-q1', exam: 'Exam 7', year: 2016, session: 'Spring', wiki_link: ['Concepts/Trend'] }),
      q({ id: 'cas9-2016-q1', exam: 'Exam 9', year: 2016, session: 'Spring', wiki_link: ['Concepts/Trend'] }),
    ]
    const series = conceptPaperSeries(moved, 'Loss Ratio')
    expect(series.map(s => s.exam)).toEqual(['Exam 7'])
    expect(seriesShare(series[0])).toBe('1 of 2')
  })
})

describe('conceptExaminerNotes', () => {
  const multi = q({
    id: 'cas5-2019s-q7',
    type: 'multi-part',
    year: 2019,
    session: 'Spring',
    wiki_link: ['Concepts/Loss+Ratio', 'Concepts/Trend'],
    stem: 'Given the following.',
    parts: [
      {
        label: 'a', points: 1, stem: 'Calculate the loss ratio.', type: 'free-entry', options: [], answer: '',
        explanation: 'The loss ratio is 60%.',
        examiner_report: 'Most candidates did well. A common error was dividing by written premium.',
      },
      {
        label: 'b', points: 1, stem: 'Select a trend.', type: 'free-entry', options: [], answer: '',
        explanation: 'A trend of 3%.',
        examiner_report: 'Many candidates failed to justify the selection.',
      },
    ],
  })

  it('keeps the lost-credit sentences of the parts about the concept, word for word', () => {
    expect(conceptExaminerNotes([multi], 'Loss Ratio')).toEqual([{
      questionId: 'cas5-2019s-q7',
      part: 'a',
      exam: 'Exam 5',
      sitting: 'Spring 2019',
      year: 2019,
      passages: ['A common error was dividing by written premium.'],
    }])
    expect(conceptExaminerNotes([multi], 'Trend').map(n => n.part)).toEqual(['b'])
  })

  it('puts the newest paper first and skips a report with nothing lost', () => {
    const older = q({ id: 'cas5-2014f-q2', year: 2014, session: 'Fall', examiner_report: 'Candidates struggled here.' })
    const clean = q({ id: 'cas5-2016f-q2', year: 2016, session: 'Fall', examiner_report: 'Candidates did well.' })
    expect(conceptExaminerNotes([older, clean, multi], 'Loss Ratio').map(n => n.questionId))
      .toEqual(['cas5-2019s-q7', 'cas5-2014f-q2'])
  })
})

// The real bank: every figure the card prints is the bank's own.
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
function loadBank(dir: string): Question[] {
  const folder = path.join(REPO, 'questions', dir)
  return readdirSync(folder)
    .filter(f => f.endsWith('.md'))
    .map(f => parseQuestion(readFileSync(path.join(folder, f), 'utf-8')))
    .filter((x): x is Question => x !== null)
}

describe('over the vault', () => {
  const bank = [...loadBank('exam-5'), ...loadBank('exam-7'), ...loadBank('exam-9')]
  const concepts = [...new Set(bank.flatMap(questionConcepts))]

  it('holds every series to the bank', () => {
    let seen = 0
    for (const concept of concepts) {
      for (const series of conceptPaperSeries(bank, concept)) {
        seen++
        expect(series.on).toBeGreaterThan(0)
        expect(series.on).toBeLessThanOrEqual(series.papers.length)
        expect(series.papers.filter(p => p.questionIds.length > 0).length).toBe(series.on)
        const ids = series.papers.flatMap(p => p.questionIds)
        expect(ids.length).toBe(series.questions)
        for (const id of ids) {
          const question = bank.find(x => x.id === id)!
          expect(paperExam(question)).toBe(series.exam)
          expect(question.off_syllabus).toBeFalsy()
        }
      }
    }
    expect(seen).toBeGreaterThan(100)
  })

  it('finds Exam 5\'s papers and a concept on most of them', () => {
    const [series] = conceptPaperSeries(bank, 'Loss Ratio Method')
    expect(series.exam).toBe('Exam 5')
    expect(series.papers.length).toBeGreaterThanOrEqual(10)
  })

  it('quotes the reports and nothing else', () => {
    let notes = 0
    for (const concept of concepts.slice(0, 80)) {
      for (const note of conceptExaminerNotes(bank, concept)) {
        notes++
        const question = bank.find(x => x.id === note.questionId)!
        const report = [question.examiner_report, ...(question.parts ?? []).map(p => p.examiner_report)]
          .filter(Boolean).join('\n').replace(/\s+/g, ' ')
        for (const passage of note.passages) {
          for (const line of passage.split('\n')) expect(report).toContain(line.replace(/\s+/g, ' ').trim())
        }
      }
    }
    expect(notes).toBeGreaterThan(50)
  })
})
