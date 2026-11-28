import { describe, expect, it } from 'vitest'
import {
  ALL_TAB_PREVIEW,
  PRACTICE_DEFAULT,
  PRACTICE_LIMIT,
  attemptDot,
  drawIds,
  pickedIds,
  practiceCount,
  conceptPlaceLine,
  focusFirst,
  matchQuestions,
  practiceIds,
  previewOf,
  questionMetaLine,
  resourceMetaLine,
  runSearch,
  searchParamsFromState,
  searchStateFromParams,
  tabCounts,
  type SearchFocus,
} from './oneSearch'
import type { Question } from './parser'
import { emptyFacets, toggleFacet } from './questionFilters'
import type { WikiIndexItem } from './wikiIndex'
import type { WikiExamSyllabus } from './wikiParser'

function question(over: Partial<Question> & { id: string }): Question {
  return {
    exam: 'Exam P',
    topic: 'Probability',
    learning_objective: '',
    difficulty: 'medium',
    type: 'multiple-choice',
    wiki_link: [],
    answer: 'A',
    stem: '',
    options: [],
    explanation: '',
    ...over,
  } as unknown as Question
}

function syllabus(examId: string, examLabel: string, topics: Record<string, string[]>): WikiExamSyllabus {
  return {
    examId,
    examLabel,
    examTopic: examLabel,
    resources: [],
    topics: Object.entries(topics).map(([name, concepts]) => ({
      name,
      concepts: concepts.map(c => ({ name: c, target: `Concepts/${c}` })),
    })),
  } as unknown as WikiExamSyllabus
}

const concept = (name: string): WikiIndexItem => ({ category: 'concept', name, path: `Concepts/${name}.md` })
const book = (name: string, over: Partial<WikiIndexItem> = {}): WikiIndexItem => ({
  category: 'document', name, path: `Resources/Books/${name}.md`, ...over,
})

const SYLLABI = [
  syllabus('P-1', 'Exam P', { 'Univariate Random Variables': ['Poisson Distribution'] }),
  syllabus('MAS-I', 'Exam MAS-I', { 'Stochastic Processes': ['Poisson Process', 'Compound Poisson Process'] }),
]
const INDEX: WikiIndexItem[] = [
  concept('Compound Poisson Process'),
  concept('Poisson Process'),
  concept('Poisson Distribution'),
  concept('Bayes Theorem'),
  { category: 'exam', name: 'Exam Poisson (SOA)', path: 'Exam Poisson (SOA).md' },
  book('Introduction to Probability Models', { author: 'Ross', year: 2019, exams: ['Exam MAS-I'] }),
  book('A First Course in Probability', { author: 'Ross', year: 2019, exams: ['Exam P-1'] }),
]
const QUESTIONS = [
  question({ id: 'masi-1', exam: 'Exam MAS-I', stem: 'Claims arrive as a Poisson process.', wiki_link: ['Concepts/Poisson+Process'], difficulty: 'hard' }),
  question({ id: 'p-1', stem: 'Errors follow a Poisson distribution.', wiki_link: ['Concepts/Poisson+Distribution'] }),
  question({ id: 'p-2', stem: 'Counts have mean 2.', wiki_link: ['Concepts/Poisson+Distribution'], difficulty: 'easy' }),
  question({ id: 'p-3', stem: 'A fair die is rolled.', wiki_link: ['Concepts/Bayes+Theorem'] }),
]
const FOCUS: SearchFocus = { examId: 'P-1', bank: 'Exam P', resourceLabel: 'Exam P-1' }

describe('runSearch', () => {
  const results = runSearch({ query: 'poisson', index: INDEX, questions: QUESTIONS, syllabi: SYLLABI, focus: FOCUS })

  it('finds concepts by name, the exam in focus first, and never an exam page', () => {
    expect(results.concepts.map(c => c.item.name)).toEqual([
      'Poisson Distribution', 'Poisson Process', 'Compound Poisson Process',
    ])
  })

  it('says where a concept sits and labels one from another exam', () => {
    expect(conceptPlaceLine(results.concepts[0]!)).toBe('Exam P · Univariate Random Variables')
    expect(results.concepts[0]!.otherExam).toBeNull()
    expect(results.concepts[1]!.otherExam).toBe('Exam MAS-I')
  })

  it('finds resources by title or author, the exam in focus first', () => {
    const ross = runSearch({ query: 'ross', index: INDEX, questions: [], syllabi: SYLLABI, focus: FOCUS })
    expect(ross.resources.map(r => r.item.name)).toEqual([
      'A First Course in Probability', 'Introduction to Probability Models',
    ])
    expect(resourceMetaLine(ross.resources[0]!)).toBe('Ross · 2019')
    expect(resourceMetaLine(ross.resources[1]!)).toBe('Ross · 2019 · Exam MAS-I')
  })

  it('finds questions by stem, then by the concept they are tagged with, the exam in focus first', () => {
    expect(results.questions.map(r => r.question.id)).toEqual(['p-1', 'p-2', 'masi-1'])
    expect(questionMetaLine(results.questions[0]!)).toBe('Poisson Distribution · Medium')
    expect(questionMetaLine(results.questions[2]!)).toBe('Poisson Process · Hard · Exam MAS-I')
  })

  it('finds an exam\'s study guide by the exam\'s name, apart from the concepts', () => {
    expect(results.exams.map(e => e.item.name)).toEqual(['Exam Poisson (SOA)'])
  })

  it('counts each tab, All being the three and the study guides', () => {
    expect(tabCounts(results)).toEqual({ all: 7, concepts: 3, resources: 0, questions: 3 })
  })

  it('takes the questions already matched, and narrows those', () => {
    const matched = [QUESTIONS[3]!]
    const given = runSearch({ query: 'poisson', index: [], questions: QUESTIONS, syllabi: [], focus: null, matched })
    expect(given.questions.map(r => r.question.id)).toEqual(['p-3'])
  })

  it('finds a concept a typing slip away when nothing matches as typed', () => {
    const slip = runSearch({ query: 'poison', index: INDEX, questions: QUESTIONS, syllabi: SYLLABI, focus: null })
    expect(slip.concepts.map(c => c.item.name).sort()).toEqual([
      'Compound Poisson Process', 'Poisson Distribution', 'Poisson Process',
    ])
    expect(slip.questions.map(r => r.question.id)).toEqual(['masi-1', 'p-1', 'p-2'])
  })

  it('keeps the match order and labels nothing when no exam is in focus', () => {
    const open = runSearch({ query: 'poisson', index: INDEX, questions: QUESTIONS, syllabi: SYLLABI, focus: null })
    expect(open.concepts.map(c => c.item.name)).toEqual([
      'Poisson Distribution', 'Poisson Process', 'Compound Poisson Process',
    ])
    expect(open.questions.map(r => r.question.id)).toEqual(['masi-1', 'p-1', 'p-2'])
    expect(open.questions.every(r => r.otherExam === null)).toBe(true)
  })

  it('narrows the questions alone by the filters', () => {
    const facets = toggleFacet(emptyFacets(), 'exam', 'Exam MAS-I')
    const narrowed = runSearch({ query: 'poisson', index: INDEX, questions: QUESTIONS, syllabi: SYLLABI, focus: FOCUS, facets })
    expect(narrowed.questions.map(r => r.question.id)).toEqual(['masi-1'])
    expect(narrowed.concepts).toHaveLength(3)
  })

  it('finds every question and nothing else for an empty query', () => {
    const all = runSearch({ query: ' ', index: INDEX, questions: QUESTIONS, syllabi: SYLLABI, focus: FOCUS })
    expect(all.concepts).toEqual([])
    expect(all.resources).toEqual([])
    expect(all.questions.map(r => r.question.id)).toEqual(['p-1', 'p-2', 'p-3', 'masi-1'])
  })
})

describe('matchQuestions', () => {
  it('finds a question by its id', () => {
    expect(matchQuestions(QUESTIONS, 'p-3').map(q => q.id)).toEqual(['p-3'])
  })

  it('puts the questions about the concept ahead of those that only mention it', () => {
    const bank = [
      question({ id: 'a', stem: 'Reserves use a Poisson assumption in passing.', wiki_link: ['Concepts/Chain+Ladder'] }),
      question({ id: 'b', stem: 'Counts have mean 2.', wiki_link: ['Concepts/Poisson+Distribution'] }),
      question({ id: 'c', stem: 'Claims are Poisson.', wiki_link: ['Concepts/Poisson+Distribution'] }),
    ]
    expect(matchQuestions(bank, 'poisson').map(q => q.id)).toEqual(['c', 'b', 'a'])
  })

  it('finds words that are apart in the stem, and ignores punctuation the reader added', () => {
    const bank = [
      question({ id: 'a', stem: 'Estimate the Bühlmann credibility factor.', wiki_link: [] }),
      question({ id: 'b', stem: "Use Bayes' theorem.", wiki_link: ['Concepts/Bayes+Theorem'] }),
      question({ id: 'c', stem: 'Apply the chain ladder method.', wiki_link: [] }),
    ]
    expect(matchQuestions(bank, 'credibility buhlmann').map(q => q.id)).toEqual(['a'])
    expect(matchQuestions(bank, "bayes' theorem").map(q => q.id)).toEqual(['b'])
    expect(matchQuestions(bank, 'chain-ladder').map(q => q.id)).toEqual(['c'])
  })

  it('finds a question by its id alone, not every question with the id\'s pieces', () => {
    const bank = [
      question({ id: 'p-004', stem: 'A fair die.', wiki_link: [] }),
      question({ id: 'p-104', stem: 'Let p be 004 of something.', wiki_link: [] }),
    ]
    expect(matchQuestions(bank, 'p-004').map(q => q.id)).toEqual(['p-004'])
  })

  it('reads a one-letter word as a whole word', () => {
    const bank = [
      question({ id: 'a', stem: 'The exam covers probability.', wiki_link: [] }),
      question({ id: 'b', stem: 'Exam P is the first.', wiki_link: [] }),
    ]
    expect(matchQuestions(bank, 'p exam').map(q => q.id)).toEqual(['b'])
  })

  it('adds the questions on a concept a slip away after any that hold the word as typed', () => {
    const bank = [
      question({ id: 'a', stem: 'Counts have mean 2.', wiki_link: ['Concepts/Poisson+Distribution'] }),
      question({ id: 'b', stem: 'A poison is ingested.', wiki_link: ['Concepts/Mortality'] }),
    ]
    expect(matchQuestions(bank, 'poison').map(q => q.id)).toEqual(['b', 'a'])
  })

  it('reads the parts of a question whose stem is empty', () => {
    const bank = [question({ id: 'a', stem: '', parts: [{ label: 'a', stem: 'Describe adverse selection.' }] as never })]
    expect(matchQuestions(bank, 'adverse selection').map(q => q.id)).toEqual(['a'])
  })
})

describe('focusFirst', () => {
  it('is a stable partition', () => {
    expect(focusFirst([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual([2, 4, 1, 3, 5])
  })
})

describe('previewOf', () => {
  it('shows the first few and counts the rest', () => {
    expect(previewOf([1, 2, 3, 4, 5], ALL_TAB_PREVIEW.concepts)).toEqual({ shown: [1, 2, 3], more: 2 })
    expect(previewOf([1], ALL_TAB_PREVIEW.questions)).toEqual({ shown: [1], more: 0 })
  })
})

describe('attemptDot', () => {
  it('reads the tally', () => {
    expect(attemptDot(undefined)).toBe('untried')
    expect(attemptDot({ attempt_count: 2, correct_count: 2 })).toBe('correct')
    expect(attemptDot({ attempt_count: 2, correct_count: 0 })).toBe('incorrect')
    expect(attemptDot({ attempt_count: 2, correct_count: 1 })).toBe('partial')
  })
  it('goes by the latest attempt where the order is known', () => {
    expect(attemptDot({ attempt_count: 2, correct_count: 1, last_correct: true })).toBe('correct')
    expect(attemptDot({ attempt_count: 3, correct_count: 2, last_correct: false })).toBe('incorrect')
  })
})

describe('practiceIds', () => {
  it('takes the results in order, up to the limit', () => {
    const many = Array.from({ length: PRACTICE_LIMIT + 5 }, (_, i) => ({ question: question({ id: `q-${i}` }), otherExam: null }))
    const ids = practiceIds(many)
    expect(ids).toHaveLength(PRACTICE_LIMIT)
    expect(ids[0]).toBe('q-0')
  })
})

describe('practiceCount', () => {
  it('starts at the default, or all of a smaller pool', () => {
    expect(practiceCount(null, 152)).toBe(PRACTICE_DEFAULT)
    expect(practiceCount(null, 2)).toBe(2)
    expect(practiceCount(null, 0)).toBe(0)
  })
  it("holds the reader's choice between 1 and what was found, never past the limit", () => {
    expect(practiceCount(25, 30)).toBe(25)
    expect(practiceCount(25, 12)).toBe(12)
    expect(practiceCount(0, 12)).toBe(1)
    expect(practiceCount(500, 500)).toBe(PRACTICE_LIMIT)
  })
})

describe('drawIds', () => {
  const results = Array.from({ length: 20 }, (_, i) => ({ question: question({ id: `q-${i}` }), otherExam: null }))
  it('draws so many of the results, none twice', () => {
    const ids = drawIds(results, 7)
    expect(ids).toHaveLength(7)
    expect(new Set(ids).size).toBe(7)
    for (const id of ids) expect(id).toMatch(/^q-\d+$/)
  })
  it('draws at random', () => {
    // Each pick swaps the last place left into the draw.
    expect(drawIds(results, 3, () => 0.999)).toEqual(['q-19', 'q-0', 'q-1'])
    expect(drawIds(results, 3, () => 0)).toEqual(['q-0', 'q-1', 'q-2'])
  })
  it('takes no more than there are', () => {
    expect(drawIds(results.slice(0, 2), 10)).toHaveLength(2)
  })
})

describe('pickedIds', () => {
  it('keeps the ticked questions still among the results, in their order', () => {
    const results = ['a', 'b', 'c'].map(id => ({ question: question({ id }), otherExam: null }))
    expect(pickedIds(results, new Set(['c', 'a', 'gone']))).toEqual(['a', 'c'])
  })
})

describe('the address', () => {
  it('round-trips the query, the tab and the filters', () => {
    let facets = toggleFacet(emptyFacets(), 'exam', 'Exam P')
    facets = toggleFacet(facets, 'exam', 'Exam FM')
    facets = toggleFacet(facets, 'difficulty', 'hard')
    const params = searchParamsFromState({ query: 'poisson', tab: 'questions', facets })
    expect(params.toString()).toBe('q=poisson&tab=questions&difficulty=hard&exam=Exam+FM&exam=Exam+P')
    const back = searchStateFromParams(params)
    expect(back.query).toBe('poisson')
    expect(back.tab).toBe('questions')
    expect([...back.facets.exam].sort()).toEqual(['Exam FM', 'Exam P'])
    expect([...back.facets.difficulty]).toEqual(['hard'])
  })

  it('writes nothing for the default state', () => {
    expect(searchParamsFromState({ query: '', tab: 'all', facets: emptyFacets() }).toString()).toBe('')
  })

  it("still lands the old page's links", () => {
    const concepts = searchStateFromParams(new URLSearchParams('type=concepts&q=bayes'))
    expect(concepts.tab).toBe('concepts')
    expect(concepts.facets.type.size).toBe(0)
    const one = searchStateFromParams(new URLSearchParams('concept=Bayes+Theorem'))
    expect(one.tab).toBe('questions')
    expect([...one.facets.concept]).toEqual(['Bayes Theorem'])
  })

  it('keeps a question type as a filter', () => {
    const state = searchStateFromParams(new URLSearchParams('type=multiple-choice'))
    expect(state.tab).toBe('all')
    expect([...state.facets.type]).toEqual(['multiple-choice'])
  })
})
