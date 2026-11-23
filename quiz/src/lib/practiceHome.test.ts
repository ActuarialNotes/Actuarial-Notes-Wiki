import { describe, expect, it } from 'vitest'
import {
  foldPapers, papersCountDetail, practiceExamDetail, practiceTopic, rowDuration, settingPills,
  toggleTopic, toggleTopicConcept, topicQuestionCounts, topicTick,
} from './practiceHome'
import type { PastExamRow } from './pastExams'

const offered = (l: string) => l === 'Exam P' || l === 'Exam 5'

describe('practiceTopic', () => {
  const base = { urlTopic: '', showList: false, focus: '', remembered: '', offered }
  it('follows the address first', () => {
    expect(practiceTopic({ ...base, urlTopic: 'Exam 7', focus: 'Exam P' })).toBe('Exam 7')
    expect(practiceTopic({ ...base, showList: true, focus: 'Exam P' })).toBe('')
  })
  it('opens on the exam in focus, then the one last practised, then the list', () => {
    expect(practiceTopic({ ...base, focus: 'Exam P', remembered: 'Exam 5' })).toBe('Exam P')
    expect(practiceTopic({ ...base, focus: 'Exam PCPA', remembered: 'Exam 5' })).toBe('Exam 5')
    expect(practiceTopic({ ...base, remembered: 'Exam X' })).toBe('')
  })
})

describe('settingPills', () => {
  it('says each setting’s current value', () => {
    const pills = settingPills({
      topics: { labels: ['All topics'], more: 0 }, levels: ['easy', 'medium', 'hard'], timed: false, revealDuring: true,
    })
    expect(pills.map(p => p.value)).toEqual(['All topics', 'All levels', 'Untimed', 'As you go'])
    expect(pills.map(p => p.section)).toEqual(['topics', 'difficulty', 'sitting', 'sitting'])
  })
  it('counts topics past one, and names the levels and the off states', () => {
    const pills = settingPills({
      topics: { labels: ['A', 'B', 'C'], more: 2 }, levels: ['easy', 'hard'], timed: true, revealDuring: false,
    })
    expect(pills.map(p => p.value)).toEqual(['5 topics', 'Easy + Hard', 'Timed', 'At the end'])
    expect(settingPills({ topics: { labels: ['Bayes Theorem'], more: 0 }, levels: [], timed: false, revealDuring: true })[0].value)
      .toBe('Bayes Theorem')
  })
})

describe('row facts', () => {
  it('prints a duration and the practice exam’s size', () => {
    expect(rowDuration(3 * 3600)).toBe('3 h')
    expect(rowDuration(45 * 60)).toBe('45 min')
    expect(rowDuration(75 * 60)).toBe('1 h 15 min')
    expect(practiceExamDetail(30, 3 * 3600)).toBe('30 questions · 3 h')
    expect(practiceExamDetail(1, null)).toBe('1 question')
  })
})

const groups = [
  { name: 'One', subtopics: ['A', 'B'] },
  { name: 'Two', subtopics: ['B', 'C'] },
  { name: 'Three', subtopics: ['D'] },
]

describe('topics', () => {
  it('counts a question once in every topic its concepts sit under', () => {
    const pool = [
      { wiki_link: ['Concepts/A', 'Concepts/B'] },
      { wiki_link: ['Concepts/C'] },
      { wiki_link: ['Concepts/Z'] },
      { wiki_link: null },
    ]
    const counts = topicQuestionCounts(groups, pool)
    expect([counts.get('One'), counts.get('Two'), counts.get('Three')]).toEqual([1, 2, 0])
  })
  it('reads every topic as ticked while nothing is picked', () => {
    expect(topicTick(['A', 'B'], [])).toBe('all')
    expect(topicTick(['A', 'B'], ['A'])).toBe('some')
    expect(topicTick(['A', 'B'], ['D'])).toBe('none')
    expect(topicTick(['A', 'B'], ['A', 'B'])).toBe('all')
  })
  it('unticks one topic out of everything, keeping a shared concept', () => {
    expect(toggleTopic(groups, [], 'Three')).toEqual(['A', 'B', 'C'])
    expect(toggleTopic(groups, [], 'One')).toEqual(['B', 'C', 'D'])
  })
  it('ticks a topic back in, and stores everything as nothing picked', () => {
    expect(toggleTopic(groups, ['A', 'B', 'C'], 'Three')).toEqual([])
    expect(toggleTopic(groups, ['D'], 'One')).toEqual(['A', 'B', 'D'])
    expect(toggleTopic(groups, ['D'], 'Nope')).toEqual(['D'])
  })
})

describe('toggleTopicConcept', () => {
  it('takes one concept out of everything, and puts it back as nothing picked', () => {
    expect(toggleTopicConcept(groups, [], 'B')).toEqual(['A', 'C', 'D'])
    expect(toggleTopicConcept(groups, ['A', 'C', 'D'], 'B')).toEqual([])
    expect(toggleTopicConcept(groups, ['A'], 'D')).toEqual(['A', 'D'])
    expect(toggleTopicConcept(groups, ['A'], 'A')).toEqual([])
  })
})

const row = (year: number, session: 'Spring' | 'Fall', available = true): PastExamRow => ({
  key: `${year}|${session}`, year, session, label: `${session} ${year}`, bankCount: available ? 20 : 0, available,
})

describe('foldPapers', () => {
  const rows: PastExamRow[] = []
  for (let y = 2019; y >= 2011; y--) { rows.push(row(y, 'Fall'), row(y, 'Spring')) }
  it('lists the newest eight and folds the rest under their years', () => {
    const fold = foldPapers(rows)
    expect(fold.recent.map(r => r.label)).toEqual([
      'Fall 2019', 'Spring 2019', 'Fall 2018', 'Spring 2018', 'Fall 2017', 'Spring 2017', 'Fall 2016', 'Spring 2016',
    ])
    expect(fold.older).toHaveLength(10)
    expect(fold.olderLabel).toBe('2011 to 2015')
  })
  it('never splits a year, and leaves a short shelf whole', () => {
    const odd = rows.slice(1)
    expect(foldPapers(odd).recent).toHaveLength(9)
    expect(foldPapers(rows.slice(0, 10)).older).toHaveLength(0)
    expect(foldPapers(rows.slice(0, 7)).older).toHaveLength(0)
  })
  it('counts the papers added, or all of them when none is', () => {
    expect(papersCountDetail([row(2019, 'Fall'), row(2019, 'Spring', false)])).toBe('1 paper')
    expect(papersCountDetail([row(2019, 'Fall', false), row(2019, 'Spring', false)])).toBe('2 papers')
  })
})
