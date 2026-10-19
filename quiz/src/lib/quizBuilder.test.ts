import { describe, expect, it } from 'vitest'
import { getExamPdfLink, getExamSolutionsPdfLink, getSittingPdfLink } from '@/data/examPdfLinks'
import type { ConceptMasteryRecord } from './mastery'
import type { Question } from './parser'
import {
  QUIZ_EXAMS,
  QUIZ_TRACK_GROUPS,
  activeQuizExamValues,
  builderPool,
  conceptLevels,
  conceptsFilter,
  conceptsFromStored,
  drawSignature,
  formatTargetDate,
  groupConceptsBySyllabus,
  isExamList,
  newQuestionCount,
  orderConceptsBySyllabus,
  papersFilter,
  questionsOnConcepts,
  quizExamFor,
  quizLaunchUrl,
  quizQuestionCount,
  quizQuestionCounts,
  quizSearchFilter,
  quizTrackGroups,
  quizWikiExamId,
  savedConceptsKey,
  selectGroup,
  shelfPdfLinks,
  todayConceptChips,
  todaysPlanSelection,
  toggleConcept,
  type LaunchSettings,
} from './quizBuilder'
import type { StudyPlan } from './studyPlan'
import type { WikiExamSyllabus } from './wikiParser'

function q(partial: Partial<Question> & { id: string }): Question {
  return {
    exam: 'Exam 5',
    topic: 'Ratemaking',
    learning_objective: '',
    difficulty: 'medium',
    type: 'multiple-choice',
    wiki_link: [],
    answer: 'A',
    explanation: '',
    points: 1,
    stem: '',
    options: [],
    ...partial,
  }
}

function plan(partial: Partial<StudyPlan>): StudyPlan {
  return { status: 'on_track', todaysConcepts: [], reviewConcepts: [], ...partial } as StudyPlan
}

const SYLLABUS: WikiExamSyllabus = {
  examId: '5-1',
  examLabel: 'Exam 5',
  examTopic: 'Exam 5',
  resources: [],
  topics: [
    {
      name: 'A. Ratemaking',
      weight: '40-50%',
      concepts: [
        { name: 'Trend', target: 'Concepts/Loss+Trend' },
        { name: 'Pure Premium', target: 'Concepts/Pure Premium' },
      ],
    },
    {
      name: 'B. Reserving',
      weight: '50-60%',
      concepts: [{ name: 'Chain Ladder', target: 'Concepts/Chain Ladder' }],
    },
  ],
}

describe('the exams', () => {
  it('lists each bank once, under tracks the list has a heading for', () => {
    const values = QUIZ_EXAMS.map(e => e.value)
    expect(new Set(values).size).toBe(values.length)
    const headings = new Set(QUIZ_TRACK_GROUPS.map(g => g.key))
    for (const exam of QUIZ_EXAMS) {
      expect(exam.tracks.length).toBeGreaterThan(0)
      for (const track of exam.tracks) expect(headings.has(track)).toBe(true)
    }
  })

  it("groups one body's exams under its tracks, dropping a track with none", () => {
    const soa = quizTrackGroups('SOA')
    expect(soa.map(g => g.key)).toEqual(['ASA'])
    expect(soa[0].exams.map(e => e.value)).toEqual(['Probability', 'Financial Mathematics', 'Exam FAM', 'Exam SRM', 'Exam ALTAM', 'Exam ASTAM'])
    const cas = quizTrackGroups('CAS')
    expect(cas.map(g => g.key)).toEqual(['ACAS', 'FCAS'])
    expect(cas[0].exams.map(e => e.value)).toContain('Probability')
    expect(cas[1].exams.map(e => e.value)).toEqual(['Exam 7', 'Exam 8', 'Exam 9'])
  })

  it('finds an exam by its bank label', () => {
    expect(quizExamFor('Probability')?.label).toBe('Exam P-1')
    expect(quizExamFor('Exam 6U')).toBeUndefined()
    expect(quizExamFor('')).toBeUndefined()
  })

  it("names the study guide of an exam sat in variants, and only that", () => {
    expect(quizWikiExamId(quizExamFor('Exam 6C')!)).toBe('6c-1')
    expect(quizWikiExamId(quizExamFor('Exam 5')!)).toBeUndefined()
  })

  it('reads the exams being studied, on the variant picked', () => {
    const progress = { P: 'in_progress', 'CAS-5': 'passed', 'CAS-6': 'in_progress' }
    expect(activeQuizExamValues(progress, {})).toEqual(['Probability', 'Exam 6C'])
    expect(activeQuizExamValues(progress, { 'CAS-6': 'CA' })).toEqual(['Probability', 'Exam 6C'])
    // The U.S. variant is being studied, which this bank isn't.
    expect(activeQuizExamValues(progress, { 'CAS-6': 'US' })).toEqual(['Probability'])
  })

  it('counts each bank', () => {
    const questions = [q({ id: 'a' }), q({ id: 'b' }), q({ id: 'c', exam: 'Probability' })]
    const counts = quizQuestionCounts(questions)
    expect(counts['Exam 5']).toBe(2)
    expect(counts['Probability']).toBe(1)
    expect(counts['Exam 9']).toBe(0)
  })

  it('dates an exam row by month and year', () => {
    expect(formatTargetDate('2026-09-15T12:00:00')).toBe('Sep 26')
  })

  it("knows the exam list's address", () => {
    expect(isExamList('/')).toBe(true)
    expect(isExamList('/?autostart=1')).toBe(true)
    expect(isExamList('/?topic=Exam%205')).toBe(false)
    expect(isExamList('/?topic=Exam%205#x')).toBe(false)
    expect(isExamList('/quiz')).toBe(false)
  })
})

describe('the draw', () => {
  it('sizes a quiz by the count picked and a practice exam by the paper', () => {
    const base = { sitting: null, poolCount: 50, practiceExamCount: 25, count: 10 }
    expect(quizQuestionCount({ ...base, mode: 'quiz', source: 'custom' })).toBe(10)
    expect(quizQuestionCount({ ...base, mode: 'quiz', source: 'custom', poolCount: 4 })).toBe(4)
    expect(quizQuestionCount({ ...base, mode: 'mock-exam', source: 'custom' })).toBe(25)
    expect(quizQuestionCount({ ...base, mode: 'mock-exam', source: 'custom', poolCount: 12 })).toBe(12)
    // A sitting is sat whole.
    expect(quizQuestionCount({ ...base, mode: 'mock-exam', source: 'papers', sitting: { year: 2019 } })).toBe(50)
    expect(quizQuestionCount({ ...base, mode: 'mock-exam', source: 'papers' })).toBe(25)
  })

  it('counts what the reader has never attempted', () => {
    const pool = [q({ id: 'a' }), q({ id: 'b' }), q({ id: 'c' })]
    expect(newQuestionCount(pool, new Set(['b']))).toBe(2)
    expect(newQuestionCount(pool, new Map())).toBe(3)
  })

  it('filters on the paper or on the concepts', () => {
    expect(papersFilter('Exam 5', null)).toEqual({ exam: 'Exam 5' })
    expect(papersFilter('Exam 5', { year: 2019, session: 'Fall' })).toEqual({ exam: 'Exam 5', year: 2019, session: 'Fall' })
    expect(conceptsFilter('Exam 5', [])).toEqual({ exam: 'Exam 5' })
    expect(conceptsFilter('Exam 5', ['Trend'])).toEqual({ exam: 'Exam 5', concepts: ['Trend'] })
  })

  const bank = [
    q({ id: 'a', year: 2019, session: 'Fall', wiki_link: ['Concepts/Loss+Trend'] }),
    q({ id: 'b', year: 2018, session: 'Spring', wiki_link: ['Concepts/Chain+Ladder'] }),
    q({ id: 'c', exam: 'Probability', wiki_link: ['Concepts/Loss+Trend'] }),
  ]
  const config = {
    questions: bank, topic: 'Exam 5', source: 'custom' as const, sitting: null,
    concept: '', concepts: [] as string[], todaysPlanPool: null,
  }

  it('pools what the source covers', () => {
    expect(builderPool(config).map(x => x.id)).toEqual(['a', 'b'])
    expect(builderPool({ ...config, concepts: ['Chain Ladder'] }).map(x => x.id)).toEqual(['b'])
    expect(builderPool({ ...config, source: 'papers', sitting: { year: 2018, session: 'Spring' } }).map(x => x.id)).toEqual(['b'])
    // A single concept reaches past the exam.
    expect(builderPool({ ...config, concept: 'Loss Trend' }).map(x => x.id)).toEqual(['a', 'c'])
    expect(builderPool({ ...config, todaysPlanPool: [bank[1]] }).map(x => x.id)).toEqual(['b'])
    expect(builderPool({ ...config, topic: '' })).toEqual([])
  })

  it('the past papers keep their own pool whatever else is picked', () => {
    expect(builderPool({ ...config, source: 'papers', concept: 'Loss Trend', todaysPlanPool: [] }).map(x => x.id)).toEqual(['a', 'b'])
  })

  it('signs a draw with everything it depends on, the concepts in any order', () => {
    const input = {
      mode: 'quiz' as const, source: 'custom' as const, topic: 'Exam 5', concept: '',
      conceptMode: 'custom' as const, count: 3, sitting: null, concepts: ['B', 'A'], levelsParam: null,
    }
    expect(drawSignature(input)).toBe('quiz§custom§Exam 5§§custom§3§§A,B§')
    expect(drawSignature({ ...input, concepts: ['A', 'B'] })).toBe(drawSignature(input))
    expect(drawSignature({ ...input, sitting: { year: 2019 } })).toContain('2019|')
    expect(drawSignature({ ...input, levelsParam: 'easy' })).not.toBe(drawSignature(input))
  })

  it('opens the search on the pool the builder shows', () => {
    const base = { topic: 'Exam 5', source: 'custom' as const, sitting: null, concept: '', concepts: ['Trend'], todaysPlan: null }
    expect(quizSearchFilter(base)).toEqual({ exam: 'Exam 5', concepts: ['Trend'] })
    expect(quizSearchFilter({ ...base, concept: 'Trend' })).toEqual({ concept: 'Trend' })
    expect(quizSearchFilter({ ...base, topic: '' })).toEqual({})
    expect(quizSearchFilter({ ...base, source: 'papers', sitting: { year: 2019, session: 'Fall' } }))
      .toEqual({ exam: 'Exam 5', year: 2019, session: 'Fall' })
    expect(quizSearchFilter({ ...base, source: 'today', todaysPlan: plan({ todaysConcepts: ['Chain Ladder'] }) }))
      .toEqual({ exam: 'Exam 5', concepts: ['Chain Ladder'] })
    expect(quizSearchFilter({ ...base, source: 'today', todaysPlan: plan({ status: 'review_mode', reviewConcepts: [] }) }))
      .toEqual({ exam: 'Exam 5' })
  })

  it("names the past-paper shelf's documents", () => {
    expect(shelfPdfLinks('Exam 5', { year: 2019, session: 'Fall' }, 9))
      .toEqual({ reportLink: getSittingPdfLink('Exam 5', 2019, 'Fall'), solutionsLink: null })
    expect(shelfPdfLinks('Exam 5', null, 9)).toEqual({ reportLink: null, solutionsLink: null })
    // No dated papers: the exam's sample set, in two halves.
    const sample = shelfPdfLinks('Probability', null, 0)
    expect(sample.reportLink).toEqual(getExamPdfLink('Probability'))
    expect(sample.solutionsLink).toEqual(getExamSolutionsPdfLink('Probability'))
    expect(sample.reportLink).not.toBeNull()
  })
})

describe('the syllabus', () => {
  it('orders concepts by objective, then by name; unknown ones last', () => {
    expect(orderConceptsBySyllabus(['Zeta', 'Chain Ladder', 'Pure Premium', 'Loss Trend'], SYLLABUS))
      .toEqual(['Loss Trend', 'Pure Premium', 'Chain Ladder', 'Zeta'])
    expect(orderConceptsBySyllabus(['b', 'a'], null)).toEqual(['b', 'a'])
  })

  it('groups concepts under their objectives, the rest under Other', () => {
    const groups = groupConceptsBySyllabus(['Loss Trend', 'Pure Premium', 'Chain Ladder', 'Zeta'], SYLLABUS)
    expect(groups).toEqual([
      { name: 'A. Ratemaking', weight: '40-50%', subtopics: ['Loss Trend', 'Pure Premium'] },
      { name: 'B. Reserving', weight: '50-60%', subtopics: ['Chain Ladder'] },
      { name: 'Other', weight: undefined, subtopics: ['Zeta'] },
    ])
    expect(groupConceptsBySyllabus(['a'], null)).toEqual([{ name: 'All Concepts', weight: undefined, subtopics: ['a'] }])
  })

  it('drops an objective with no concepts', () => {
    expect(groupConceptsBySyllabus(['Chain Ladder'], SYLLABUS).map(g => g.name)).toEqual(['B. Reserving'])
  })

  it("reads each concept's mastery on the exam, new where there is none", () => {
    const now = new Date('2026-10-17T12:00:00Z')
    const record = (exam_id: string, concept_slug: string): ConceptMasteryRecord => ({
      user_id: 'u', exam_id, concept_slug, state: 'level1', correct_count: 1, incorrect_streak: 0,
      hard_correct_count: 0, last_correct_at: '2026-10-16T12:00:00Z', last_attempted_at: '2026-10-16T12:00:00Z',
    })
    const levels = conceptLevels('CAS-5', [record('CAS-5', 'chain ladder'), record('P', 'trend')], ['Chain Ladder', 'Trend'], now)
    expect([...levels]).toEqual([['Chain Ladder', 'level1'], ['Trend', 'new']])
    expect(conceptLevels(null, [record('CAS-5', 'chain ladder')], ['Chain Ladder'], now).size).toBe(0)
  })
})

describe("today's plan", () => {
  it("marks today's concepts, and nothing when none are new today", () => {
    expect(todayConceptChips(plan({ todaysConcepts: ['Chain Ladder'] }))).toEqual(new Set(['chain ladder']))
    expect(todayConceptChips(plan({ status: 'review_mode', todaysConcepts: ['X'], reviewConcepts: ['Trend'] })))
      .toEqual(new Set(['trend']))
    expect(todayConceptChips(plan({ status: 'review_mode', todaysConcepts: [], reviewConcepts: ['Trend'] }))).toEqual(new Set())
    expect(todayConceptChips(null)).toEqual(new Set())
  })

  const bank = [
    q({ id: 'a', wiki_link: ['Concepts/Loss+Trend.md'], difficulty: 'easy' }),
    q({ id: 'b', wiki_link: ['Concepts/Chain+Ladder'], difficulty: 'hard' }),
    q({ id: 'c', exam: 'Probability', wiki_link: ['Concepts/Chain+Ladder'] }),
  ]

  it("finds an exam's questions on any of the concepts", () => {
    expect(questionsOnConcepts(bank, 'Exam 5', ['loss trend', 'Chain Ladder']).map(x => x.id)).toEqual(['a', 'b'])
    expect(questionsOnConcepts(bank, 'Exam 5', ['Chain Ladder'], x => x.difficulty === 'easy')).toEqual([])
  })

  it('draws on what is left to do, or the whole plan once it is done', () => {
    const p = plan({ todaysConcepts: ['Loss Trend', 'Chain Ladder'] })
    const left = todaysPlanSelection(p, 'Exam 5', bank, new Set(['loss trend']))
    expect(left?.concepts).toEqual(['Chain Ladder'])
    expect(left?.todayQs.map(x => x.id)).toEqual(['b'])
    const done = todaysPlanSelection(p, 'Exam 5', bank, new Set(['loss trend', 'chain ladder']))
    expect(done?.concepts).toEqual(['Loss Trend', 'Chain Ladder'])
    expect(todaysPlanSelection(p, 'Exam 5', bank, new Set(), x => x.difficulty === 'medium')).toBeNull()
    expect(todaysPlanSelection(null, 'Exam 5', bank, new Set())).toBeNull()
    expect(todaysPlanSelection(p, '', bank, new Set())).toBeNull()
  })
})

describe('launching', () => {
  const settings: LaunchSettings = { mode: 'quiz', reveal: 'during', links: '1', timed: false }

  it("writes each launch's address in the order it always has", () => {
    expect(quizLaunchUrl({ kind: 'plan', count: 4 }, settings))
      .toBe('/quiz?selection=stored&mode=quiz&reveal=during&count=4&from=home&links=1')
    expect(quizLaunchUrl({ kind: 'draw', count: 4 }, { ...settings, timed: true }))
      .toBe('/quiz?selection=stored&mode=quiz&count=4&reveal=during&from=home&links=1&timed=1')
    expect(quizLaunchUrl({ kind: 'concept', concept: 'Loss Trend', levels: 'easy', count: 2 }, { ...settings, timed: true }))
      .toBe('/quiz?concept=Loss+Trend&mode=quiz&reveal=during&from=home&links=1&levels=easy&timed=1&count=2')
    expect(quizLaunchUrl({ kind: 'concept', concept: 'Trend', levels: null }, settings))
      .toBe('/quiz?concept=Trend&mode=quiz&reveal=during&from=home&links=1')
  })

  it('launches an exam on its paper or its concepts, with the count last', () => {
    const exam = { mode: 'mock-exam' as const, reveal: 'end' as const, links: '0' as const, timed: true }
    expect(quizLaunchUrl({ kind: 'exam', exam: 'Exam 5', sitting: { year: 2019, session: 'Fall' }, levels: null, count: 25 }, exam))
      .toBe('/quiz?exam=Exam+5&mode=mock-exam&reveal=end&links=0&timed=1&year=2019&session=Fall&count=25')
    expect(quizLaunchUrl({ kind: 'exam', exam: 'Exam 5', sitting: null, levels: null, count: 25 }, exam))
      .toBe('/quiz?exam=Exam+5&mode=mock-exam&reveal=end&links=0&timed=1&count=25')
    expect(quizLaunchUrl({ kind: 'exam', exam: 'Exam 5', concepts: ['A', 'B'], levels: 'easy,hard', count: 5 }, settings))
      .toBe('/quiz?exam=Exam+5&mode=quiz&reveal=during&links=1&concepts=A%2CB&levels=easy%2Chard&count=5')
    expect(quizLaunchUrl({ kind: 'exam', exam: 'Exam 5', concepts: [], levels: null, count: 5 }, settings))
      .toBe('/quiz?exam=Exam+5&mode=quiz&reveal=during&links=1&count=5')
  })
})

describe('picking concepts', () => {
  it('ticks and unticks one', () => {
    expect(toggleConcept(['a'], 'b')).toEqual(['a', 'b'])
    expect(toggleConcept(['a', 'b'], 'a')).toEqual(['b'])
  })

  it('ticks or unticks a whole objective', () => {
    expect(selectGroup(['x', 'a'], ['a', 'b'], true)).toEqual(['x', 'a', 'b'])
    expect(selectGroup(['x', 'a', 'b'], ['a', 'b'], false)).toEqual(['x'])
  })

  it('reads a stored pick, or none', () => {
    expect(savedConceptsKey('Exam 5')).toBe('actuarial_quiz_concepts_v1_Exam 5')
    expect(conceptsFromStored('["a","b"]')).toEqual(['a', 'b'])
    expect(conceptsFromStored('{"a":1}')).toEqual([])
    expect(conceptsFromStored('not json')).toEqual([])
    expect(conceptsFromStored(null)).toEqual([])
  })
})
