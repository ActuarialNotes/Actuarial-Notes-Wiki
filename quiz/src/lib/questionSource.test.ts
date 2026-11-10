import { describe, it, expect } from 'vitest'
import { examDisplayName, formatAllowance, questionFigures, questionSource, questionTitle } from './questionSource'
import { UNVERIFIED } from './verification'
import type { Question } from './parser'

function q(partial: Partial<Question>): Question {
  return {
    id: partial.id ?? 'q-1',
    exam: partial.exam ?? 'Exam 5',
    topic: partial.topic ?? 'Ratemaking',
    difficulty: partial.difficulty ?? 'medium',
    type: partial.type ?? 'multiple-choice',
    year: partial.year,
    session: partial.session,
    originally_exam: partial.originally_exam,
    verification: partial.verification,
  } as Question
}

function withLog(log: string): Question['verification'] {
  return { ...UNVERIFIED, log }
}

describe('examDisplayName', () => {
  it('turns the bank\'s subject lines into the paper\'s name', () => {
    expect(examDisplayName('Probability')).toBe('Exam P')
    expect(examDisplayName('Financial Mathematics')).toBe('Exam FM')
  })

  it('leaves a label that is already an exam name alone', () => {
    expect(examDisplayName('Exam 5')).toBe('Exam 5')
    expect(examDisplayName('Exam MAS-I')).toBe('Exam MAS-I')
    expect(examDisplayName('Something Else')).toBe('Something Else')
  })
})

describe('questionSource', () => {
  it('names the sitting a dated question was sat on', () => {
    const source = questionSource(q({ exam: 'Exam 5', year: 2013, session: 'Fall' }))
    expect(source.sitting).toBe('Fall 2013')
    expect(source.label).toBe('Exam 5 · Fall 2013')
    expect(source.detail).toBe('Sat on the Exam 5 paper in Fall 2013.')
    expect(source.origin).toBe('CAS Exam 5 paper, Fall 2013')
    expect(source.movedTo).toBeNull()
  })

  it('says so, rather than inventing a paper, when the file names no sitting', () => {
    const source = questionSource(q({ exam: 'Probability' }))
    expect(source.sitting).toBeNull()
    expect(source.label).toBe('Exam P')
    expect(source.detail).toBe('From the SOA’s sample questions for Exam P. It isn’t from a past paper.')
    expect(source.origin).toBe('SOA sample questions for Exam P')
    expect(source.document).toBeNull()
  })

  it('names the vault as the source of its own questions', () => {
    const source = questionSource(q({ id: 'p-an-010', exam: 'Probability' }))
    expect(source.origin).toBe('Written for Actuarial Notes')
  })

  it('credits the paper to the exam it was actually sat on', () => {
    // A MAS-I Spring 2018 question the CAS later moved to MAS-II: the sitting
    // belongs to MAS-I's paper, six months before MAS-II was first sat.
    const source = questionSource(q({
      exam: 'Exam MAS-II', originally_exam: 'Exam MAS-I', year: 2018, session: 'Spring',
    }))
    expect(source.exam).toBe('Exam MAS-I')
    expect(source.label).toBe('Exam MAS-I · Spring 2018')
    expect(source.movedTo).toBe('Exam MAS-II')
    expect(source.detail).toContain('now on the Exam MAS-II syllabus')
  })

  it('recovers the vault file from the verification log path', () => {
    const source = questionSource(q({
      verification: withLog('.verify/questions/exam-5/cas5-2013f-001.md'),
    }))
    expect(source.path).toBe('questions/exam-5/cas5-2013f-001.md')
    expect(source.fileName).toBe('cas5-2013f-001.md')
  })

  it('has no file when the block carries no log path', () => {
    const source = questionSource(q({}))
    expect(source.path).toBeNull()
    expect(source.fileName).toBeNull()
  })

  it('offers the published paper for a sitting the link table holds', () => {
    const source = questionSource(q({ exam: 'Exam 5', year: 2013, session: 'Fall' }))
    expect(source.document?.label).toBe("Examiner's Report")
    expect(source.document?.url).toMatch(/^https:\/\/www\.casact\.org\//)
  })

  it('finds that paper through an abbreviated session too', () => {
    const spelled = questionSource(q({ exam: 'Exam 5', year: 2013, session: 'Spring' }))
    const abbreviated = questionSource(q({ exam: 'Exam 5', year: 2013, session: 'Sp' }))
    expect(abbreviated.document).toEqual(spelled.document)
    expect(abbreviated.sitting).toBe('Spring 2013')
  })

  it('offers no paper for a sitting the table has not located', () => {
    expect(questionSource(q({ exam: 'Exam 5', year: 1998, session: 'Fall' })).document).toBeNull()
  })
})

describe('questionTitle', () => {
  it('numbers a past-paper question by its place on the paper', () => {
    expect(questionTitle({ id: 'altam-2024f-q3', year: 2024 })).toBe('Question 3')
    expect(questionTitle({ id: 'cas5-2013f-012', year: 2013 })).toBe('Question 12')
  })

  it('numbers a publisher\'s sample as a sample', () => {
    expect(questionTitle({ id: 'p-004', year: undefined })).toBe('Sample question 4')
  })

  it('gives the vault\'s own questions no number', () => {
    expect(questionTitle({ id: 'masi-an-001', year: undefined })).toBe('Practice question')
  })
})

describe('questionFigures', () => {
  const figure = (question: Question, key: string) =>
    questionFigures(question).find(f => f.key === key)

  it('reads a point-paced paper\'s question: its points, the paper\'s, and its time', () => {
    const question = { ...q({ exam: 'Exam ALTAM', year: 2024, type: 'multi-part' }), points: 10 } as Question
    expect(questionFigures(question).map(f => f.key)).toEqual(['points', 'paper', 'time', 'format'])
    expect(figure(question, 'paper')).toMatchObject({ value: '60', label: 'points on the paper' })
    expect(figure(question, 'time')).toMatchObject({ value: '30 min' })
    expect(figure(question, 'time')?.label).toBeUndefined()
    expect(figure(question, 'format')).toMatchObject({ value: 'Written', label: 'answer' })
  })

  it('shows no paper total for an undated question, and no time without points on a point-paced exam', () => {
    const question = { ...q({ exam: 'Exam ALTAM' }), points: 0 } as Question
    expect(questionFigures(question).map(f => f.key)).toEqual(['format'])
  })

  it('gives a question-paced exam\'s question the time per question', () => {
    const question = { ...q({ exam: 'Financial Mathematics' }), points: 0 } as Question
    expect(figure(question, 'time')).toMatchObject({ value: '5 min' })
    expect(figure(question, 'paper')).toBeUndefined()
  })

  it('shows nothing it would have to invent for an exam with no pace', () => {
    const question = { ...q({ exam: 'Something Else', year: 2020 }), points: 2 } as Question
    expect(questionFigures(question).map(f => f.key)).toEqual(['points', 'format'])
  })
})

describe('formatAllowance', () => {
  it('says whole minutes as minutes and anything else as the clock', () => {
    expect(formatAllowance(1800)).toBe('30 min')
    expect(formatAllowance(262)).toBe('4:22')
  })
})
