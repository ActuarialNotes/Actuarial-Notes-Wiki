import type { Part, Question } from './parser'

/** A multiple-choice question for the session tests; answer A unless overridden. */
export function mc(id: string, over: Partial<Question> = {}): Question {
  return {
    id,
    exam: 'Exam P',
    topic: 'Probability',
    learning_objective: 'General Probability',
    difficulty: 'medium',
    type: 'multiple-choice',
    wiki_link: ['Concepts/Bayes+Theorem'],
    answer: 'A',
    explanation: 'Because.',
    points: 1,
    stem: 'A stem. Calculate the probability of the event described.',
    options: [{ key: 'A', text: '0.1' }, { key: 'B', text: '0.2' }],
    ...over,
  }
}

/** A written question: one essay part worth a point. */
export function written(id: string, parts: Partial<Part>[] = [{}]): Question {
  return mc(id, {
    type: 'multi-part',
    answer: '',
    explanation: '',
    options: [],
    parts: parts.map((p, i) => ({
      label: 'abcde'[i],
      points: 1,
      stem: 'Describe two reasons.',
      type: 'free-entry' as const,
      options: [],
      answer: '',
      explanation: 'A sample answer.',
      ...p,
    })),
  })
}
