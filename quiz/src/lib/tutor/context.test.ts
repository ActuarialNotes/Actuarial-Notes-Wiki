import { describe, expect, it } from 'vitest'
import { examHistory, hostsConceptPopup, isQuietSurface, studyGuideHref, tutorPlace } from './context'
import type { TutorItem } from './items'

const screen = { popupConcept: null, quizInProgress: false, pdfOpen: false }

describe('where the candidate is', () => {
  it('reads the route', () => {
    expect(tutorPlace({ ...screen, pathname: '/wiki/concept/Cape+Cod+Method' })).toEqual({ surface: 'concept', concept: 'Cape Cod Method', examPage: null })
    expect(tutorPlace({ ...screen, pathname: '/wiki/exam/Exam+5+(CAS)' })).toEqual({ surface: 'exam', concept: null, examPage: 'Exam 5 (CAS)' })
    expect(tutorPlace({ ...screen, pathname: '/dashboard' }).surface).toBe('dashboard')
    expect(tutorPlace({ ...screen, pathname: '/review' }).surface).toBe('review')
    expect(tutorPlace({ ...screen, pathname: '/wiki/resources' }).surface).toBe('wiki')
    expect(tutorPlace({ ...screen, pathname: '/store' }).surface).toBe('other')
  })

  it('takes the concept popup over the page under it', () => {
    expect(tutorPlace({ ...screen, pathname: '/wiki/exam/Exam+5+(CAS)', popupConcept: 'Tail Factor' }))
      .toEqual({ surface: 'concept', concept: 'Tail Factor', examPage: 'Exam 5 (CAS)' })
  })

  it('is quiet in a quiz under way, a battle, or the PDF reader', () => {
    const quiz = tutorPlace({ ...screen, pathname: '/quiz', quizInProgress: true })
    expect(quiz.surface).toBe('quiz')
    expect(isQuietSurface(quiz, screen)).toBe(true)
    expect(isQuietSurface(tutorPlace({ ...screen, pathname: '/battle' }), screen)).toBe(true)
    expect(isQuietSurface(tutorPlace({ ...screen, pathname: '/dashboard' }), { pdfOpen: true })).toBe(true)
    expect(tutorPlace({ ...screen, pathname: '/quiz' }).surface).toBe('other')
  })
})

function item(id: string, sitting: string | null, points: number): TutorItem {
  return {
    id, questionId: id.split('#')[0], partLabel: 'a', exam: 'Exam 5', topic: 't', preamble: '', prompt: '', kind: 'calculation',
    concepts: ['X'], questionConcepts: ['X'], points, minutes: 4, difficulty: 'medium', sitting, answerKey: '', sampleAnswer: '',
    examinerReport: '', options: [],
  }
}

describe('how often the examiners asked', () => {
  it('counts papers, parts and points, from dated questions only', () => {
    const concept = [item('a#a', 'Fall 2019', 1.5), item('a#b', 'Fall 2019', 0.5), item('b#a', 'Spring 2016', 1), item('own', null, 2)]
    const all = [...concept, item('c#a', 'Fall 2013', 1)]
    expect(examHistory(concept, all)).toEqual({ papers: 2, totalPapers: 3, parts: 3, points: 3, latest: 'Fall 2019' })
  })
})

describe('sending a candidate to read', () => {
  it('opens in place where the page hosts the concept popup, else in the study guide', () => {
    expect(hostsConceptPopup('/dashboard')).toBe(true)
    expect(hostsConceptPopup('/wiki/exam/Exam+5+(CAS)')).toBe(true)
    expect(hostsConceptPopup('/store')).toBe(false)
    expect(studyGuideHref('Exam 5 (CAS)', 'Cape Cod Method')).toBe('/wiki/exam/Exam+5+(CAS)?concept=Cape%20Cod%20Method')
  })
})
