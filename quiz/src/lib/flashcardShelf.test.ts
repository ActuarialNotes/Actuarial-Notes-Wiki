import { describe, it, expect } from 'vitest'
import { completedTodayConcepts, flashcardShelfExams } from './flashcardShelf'
import type { DailyLevelUp } from './dailyProgressStore'
import type { WikiExamSyllabus } from './wikiParser'

function syllabus(examId: string, examLabel: string): WikiExamSyllabus {
  return { examId, examLabel, examTopic: examLabel, resources: [], topics: [] }
}

// Bundle order is file order — alphabetical, not the ladder.
const SYLLABI = [
  syllabus('5', 'Exam 5'),
  syllabus('6C', 'Exam 6C'),
  syllabus('6U', 'Exam 6U'),
  syllabus('7', 'Exam 7'),
  syllabus('FM-2', 'Exam FM'),
  syllabus('MAS-I', 'Exam MAS-I'),
  syllabus('MAS-II', 'Exam MAS-II'),
  syllabus('P-1', 'Exam P'),
]

const ids = (s: WikiExamSyllabus[]) => s.map(x => x.examId)

describe('flashcardShelfExams', () => {
  it('offers every studiable exam, up the ladder, with nothing in progress', () => {
    expect(ids(flashcardShelfExams(SYLLABI, {}, {}))).toEqual(['P-1', 'FM-2', 'MAS-I', 'MAS-II', '5'])
  })

  it('leaves exams still in development off the shelf, whatever their status', () => {
    const out = flashcardShelfExams(SYLLABI, { 'CAS-7': 'in_progress', 'CAS-6': 'in_progress' }, {})
    expect(ids(out)).not.toContain('7')
    expect(ids(out)).not.toContain('6C')
  })

  it('leads with the exams being studied, and puts passed exams last', () => {
    const out = flashcardShelfExams(SYLLABI, { 'MAS-I': 'in_progress', P: 'completed' }, {})
    expect(ids(out)).toEqual(['MAS-I', 'FM-2', 'MAS-II', '5', 'P-1'])
  })

  it('keeps the ladder order among several exams in progress', () => {
    const out = flashcardShelfExams(SYLLABI, { 'CAS-5': 'in_progress', FM: 'in_progress' }, {})
    expect(ids(out).slice(0, 2)).toEqual(['FM-2', '5'])
  })
})

describe('completedTodayConcepts', () => {
  const levelUp = (conceptSlug: string, at: string, to: DailyLevelUp['to'] = 'level1'): DailyLevelUp =>
    ({ conceptSlug, from: 'new', to, at })
  const CONCEPTS = ['Probability', 'Bayes Theorem', 'Conditional Probability', 'Variance']

  it('lists the syllabus concepts levelled up today, most recent first', () => {
    const out = completedTodayConcepts(
      [
        levelUp('Bayes Theorem', '2026-09-27T09:00:00.000Z'),
        levelUp('Variance', '2026-09-27T14:30:00.000Z'),
        levelUp('Probability', '2026-09-27T11:15:00.000Z'),
      ],
      CONCEPTS,
    )
    expect(out).toEqual(['Variance', 'Probability', 'Bayes Theorem'])
  })

  it('lists a concept that levelled up twice today once, at its latest', () => {
    const out = completedTodayConcepts(
      [
        levelUp('Variance', '2026-09-27T09:00:00.000Z', 'level1'),
        levelUp('Probability', '2026-09-27T10:00:00.000Z'),
        levelUp('Variance', '2026-09-27T12:00:00.000Z', 'level2'),
      ],
      CONCEPTS,
    )
    expect(out).toEqual(['Variance', 'Probability'])
  })

  it("spells each concept the syllabus's way, whatever case the level-up carries", () => {
    const out = completedTodayConcepts([levelUp('bayes theorem', '2026-09-27T09:00:00.000Z')], CONCEPTS)
    expect(out).toEqual(['Bayes Theorem'])
  })

  it("leaves off concepts this exam's syllabus doesn't list", () => {
    const out = completedTodayConcepts(
      [
        levelUp('Present Value', '2026-09-27T09:00:00.000Z'),
        levelUp('Variance', '2026-09-27T08:00:00.000Z'),
      ],
      CONCEPTS,
    )
    expect(out).toEqual(['Variance'])
  })

  it('is empty with nothing completed today', () => {
    expect(completedTodayConcepts([], CONCEPTS)).toEqual([])
  })
})
