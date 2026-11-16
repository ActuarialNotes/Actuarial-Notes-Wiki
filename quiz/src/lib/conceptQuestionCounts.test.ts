import { describe, it, expect } from 'vitest'
import { filterQuestions, type Question } from './parser'
import { countQuestionsByConcept, questionCeiling, questionCountFor } from './conceptQuestionCounts'

function q(id: string, links: string[], extra: Partial<Question> = {}): Question {
  return {
    id, exam: 'Exam P', topic: 't', learning_objective: 'o', difficulty: 'easy', type: 'multiple-choice',
    wiki_link: links, answer: 'A', points: 1, stem: '', options: [], explanation: '',
    ...extra,
  } as unknown as Question
}

describe('questions by concept', () => {
  const bank = [
    q('a', ['Concepts/Bayes+Theorem', 'Concepts/Conditional+Probability']),
    q('b', ['Concepts/Bayes+Theorem.md']),
    q('c', ['Concepts/Bayes+Theorem', 'Concepts/Bayes+Theorem']),
    q('d', ['Concepts/Bayes+Theorem'], { off_syllabus: true }),
    q('e', ['Concepts/Bayes+Theorem'], { exam: 'Exam MAS-I' }),
  ]
  const counts = countQuestionsByConcept(bank)

  it('counts a question once per concept, under the concept’s name', () => {
    expect(questionCountFor(counts.all, 'Bayes Theorem')).toBe(4)
    expect(questionCountFor(counts.all, ' conditional probability ')).toBe(1)
    expect(questionCountFor(counts.all, 'Variance')).toBe(0)
  })

  it('keeps each exam’s bank apart', () => {
    expect(questionCountFor(counts.byExam['Exam P'], 'Bayes Theorem')).toBe(3)
    expect(questionCountFor(counts.byExam['Exam MAS-I'], 'Bayes Theorem')).toBe(1)
    expect(questionCeiling(counts, 'Exam P', ['Bayes Theorem', 'Conditional Probability'])).toBe(4)
    expect(questionCeiling(counts, 'Exam FM', ['Bayes Theorem'])).toBe(0)
  })

  it('is the number a quiz on the concept can draw', () => {
    for (const name of Object.keys(counts.all)) {
      expect(counts.all[name], name).toBe(filterQuestions(bank, { concept: name }).length)
    }
    for (const [exam, byConcept] of Object.entries(counts.byExam)) {
      for (const name of Object.keys(byConcept)) {
        expect(byConcept[name], `${exam}: ${name}`).toBe(filterQuestions(bank, { exam, concept: name }).length)
      }
    }
  })
})
