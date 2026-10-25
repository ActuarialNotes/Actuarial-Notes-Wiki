import { describe, it, expect } from 'vitest'
import type { Question } from './parser'
import type { WikiExamSyllabus } from './wikiParser'
import { apportion, drawPracticeExam, practiceExamBlueprint, sectionOf } from './practiceExam'
import { practiceExamQuestions } from './pastExams'

function q(id: string, over: Partial<Question> = {}): Question {
  return {
    id, exam: 'Exam X', topic: 't', learning_objective: '', difficulty: 'medium', type: 'multiple-choice',
    wiki_link: [], answer: 'A', explanation: '', points: 1, stem: '', options: [], ...over,
  }
}

const SYLLABUS: WikiExamSyllabus = {
  examId: 'X', examLabel: 'Exam X', examTopic: 'Exam X', resources: [],
  topics: [
    { name: 'A. Probability', weight: '20–30%', concepts: [{ name: 'Bayes Theorem', target: 'Concepts/Bayes Theorem' }] },
    { name: 'B. Statistics', weight: '20–30%', concepts: [] },
    { name: 'C. Linear Models', weight: '45–55%', concepts: [] },
  ],
}

describe('practiceExamBlueprint', () => {
  it('is the paper: DISC RM is 75 multiple-choice questions', () => {
    expect(practiceExamBlueprint('Exam DISC-RM')).toEqual({
      exam: 'Exam DISC-RM', questions: 75, points: null, unprintedPoints: 1, types: ['multiple-choice'],
    })
  })

  it('takes a per-question paper’s length from its pace, so timer and paper agree', () => {
    expect(practiceExamQuestions('Probability')).toBe(30)
    expect(practiceExamQuestions('Exam MAS-I')).toBe(45)
    expect(practiceExamQuestions('Exam MAS-II')).toBe(45)
  })

  it('draws a written paper to its points, in every format', () => {
    expect(practiceExamBlueprint('Exam 5')).toMatchObject({
      questions: 25, points: 55, types: ['multi-part', 'multiple-choice', 'free-entry'],
    })
    expect(practiceExamBlueprint('Exam ASTAM')).toMatchObject({ points: 60, unprintedPoints: 10 })
  })

  it('admits a MAS paper’s fill-in-the-blank but not a multi-step written question', () => {
    expect(practiceExamBlueprint('Exam MAS-I').types).toEqual(['multiple-choice', 'free-entry'])
  })
})

describe('sectionOf', () => {
  it('places a question by its learning objective, letter or not', () => {
    expect(sectionOf(q('a', { learning_objective: 'Linear Models' }), SYLLABUS)).toBe(2)
    expect(sectionOf(q('a', { learning_objective: 'B. Statistics' }), SYLLABUS)).toBe(1)
  })

  it('falls back on its concepts, then on nothing', () => {
    expect(sectionOf(q('a', { wiki_link: ['Concepts/Bayes+Theorem'] }), SYLLABUS)).toBe(0)
    expect(sectionOf(q('a', { wiki_link: ['Concepts/Elsewhere'] }), SYLLABUS)).toBe(-1)
  })
})

describe('apportion', () => {
  it('shares by weight, largest remainder', () => {
    expect(apportion(45, [25, 25, 50], [99, 99, 99])).toEqual([11, 11, 23])
    expect(apportion(75, [1, 1, 1], [99, 99, 99])).toEqual([25, 25, 25])
  })

  it('hands a capped share’s shortfall to the others', () => {
    expect(apportion(10, [1, 1], [2, 99])).toEqual([2, 8])
    expect(apportion(10, [1, 1], [2, 3])).toEqual([2, 3])
  })

  it('gives nothing to a zero weight or cap', () => {
    expect(apportion(4, [0, 1, 1], [9, 0, 9])).toEqual([0, 0, 4])
  })
})

describe('drawPracticeExam', () => {
  const pool = [
    ...Array.from({ length: 40 }, (_, i) => q(`a${i}`, { learning_objective: 'Probability' })),
    ...Array.from({ length: 40 }, (_, i) => q(`b${i}`, { learning_objective: 'Statistics' })),
    ...Array.from({ length: 40 }, (_, i) => q(`c${i}`, { learning_objective: 'Linear Models' })),
  ]
  const blueprint = { exam: 'Exam X', questions: 40, points: null, unprintedPoints: 1, types: null }

  it('weighs the sections, not the bank', () => {
    const draw = drawPracticeExam(pool, blueprint, SYLLABUS)
    const by = (p: string) => draw.filter(x => x.id.startsWith(p)).length
    expect([by('a'), by('b'), by('c')]).toEqual([10, 10, 20])
  })

  it('keeps out what the paper doesn’t set', () => {
    const mixed = [...pool, q('w', { type: 'multi-part', learning_objective: 'Statistics' })]
    const draw = drawPracticeExam(mixed, { ...blueprint, questions: 200, types: ['multiple-choice'] }, SYLLABUS)
    expect(draw.map(x => x.id)).not.toContain('w')
    expect(draw).toHaveLength(120)
  })

  it('fills from unplaced questions only what the sections can’t', () => {
    const small = [...pool.slice(0, 2), q('x1'), q('x2'), q('x3')]
    const draw = drawPracticeExam(small, { ...blueprint, questions: 4 }, SYLLABUS)
    expect(draw.filter(x => x.id.startsWith('a'))).toHaveLength(2)
    expect(draw).toHaveLength(4)
  })

  it('draws a written paper to its point total', () => {
    const written = Array.from({ length: 60 }, (_, i) =>
      q(`w${i}`, { type: 'multi-part', points: 1 + (i % 4), learning_objective: ['Probability', 'Statistics', 'Linear Models'][i % 3] }))
    for (let seed = 1; seed <= 20; seed++) {
      let s = seed
      const random = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
      const draw = drawPracticeExam(written, { ...blueprint, points: 55 }, SYLLABUS, random)
      const pts = draw.reduce((n, x) => n + x.points, 0)
      // Within one question's worth: each section stops at the question that
      // brings it nearest its share.
      expect(Math.abs(pts - 55)).toBeLessThanOrEqual(4)
    }
  })

  it('counts a question with no printed points as the paper’s average question', () => {
    // ASTAM's sample set prints no points (filed `points: 0`): each counts as
    // 60 / 6 = 10, so a 60-point rehearsal of them is six questions, not sixty.
    const samples = Array.from({ length: 20 }, (_, i) =>
      q(`s${i}`, { type: 'multi-part', points: 0, learning_objective: 'Statistics' }))
    const draw = drawPracticeExam(samples, { ...blueprint, points: 60, unprintedPoints: 10 }, null)
    expect(draw).toHaveLength(6)
  })

  it('is a uniform draw of the paper’s formats with no syllabus', () => {
    expect(drawPracticeExam(pool, { ...blueprint, questions: 7 }, null)).toHaveLength(7)
  })

  it('carries every format the paper sets that the pool holds', () => {
    const written = Array.from({ length: 60 }, (_, i) =>
      q(`w${i}`, { type: 'multi-part', points: 2, learning_objective: 'Statistics' }))
    const mixed = [...written, q('mc', { points: 2, learning_objective: 'Statistics' })]
    const types = ['multi-part', 'multiple-choice', 'free-entry'] as const
    for (let seed = 0; seed < 10; seed++) {
      const draw = drawPracticeExam(mixed, { ...blueprint, points: 20, types }, SYLLABUS)
      expect(draw.map(x => x.id)).toContain('mc')
      expect(draw.reduce((n, x) => n + x.points, 0)).toBe(20)
    }
  })
})
