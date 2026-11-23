import { describe, expect, it } from 'vitest'
import {
  answerCounts,
  countsLabel,
  finalSegments,
  partGradesOf,
  progressLabel,
  segmentGap,
  segmentGroups,
  sessionSegments,
} from './sessionProgress'
import { mc, written } from './sessionFixtures.testutil'

const qs = [mc('q1'), mc('q2'), mc('q3'), mc('q4')]
const pick = (chosen: string) => ({ chosen })

describe('sessionSegments, answers shown as the quiz goes', () => {
  it('colours each answered question and marks the one on screen', () => {
    const segs = sessionSegments({
      questions: qs,
      responses: { q1: pick('A'), q2: pick('B') },
      currentIndex: 2,
      revealed: true,
    })
    expect(segs).toEqual([
      { state: 'correct', current: false },
      { state: 'incorrect', current: false },
      { state: 'pending', current: true },
      { state: 'pending', current: false },
    ])
  })

  it('keeps the colour on the question on screen once it is answered', () => {
    const segs = sessionSegments({ questions: qs, responses: { q1: pick('B') }, currentIndex: 0, revealed: true })
    expect(segs[0]).toEqual({ state: 'incorrect', current: true })
  })

  it('reads a question passed with no answer as unanswered, and one not reached as pending', () => {
    const segs = sessionSegments({ questions: qs, responses: { q3: pick('A') }, currentIndex: 1, revealed: true })
    expect(segs.map(s => s.state)).toEqual(['unanswered', 'pending', 'correct', 'pending'])
    // Back on the first question: the one on screen is never "unanswered".
    const back = sessionSegments({ questions: qs, responses: { q3: pick('A') }, currentIndex: 0, revealed: true })
    expect(back.map(s => s.state)).toEqual(['pending', 'unanswered', 'correct', 'pending'])
  })

  it('holds a written part at "answered" until it is graded, then takes the grade', () => {
    const w = written('w1')
    const base = { questions: [w], responses: { w1: pick('{"a":"x"}') }, currentIndex: 0, revealed: true }
    expect(sessionSegments(base)[0].state).toBe('answered')
    expect(sessionSegments({ ...base, manualGrades: { w1__a: 'partial' } })[0].state).toBe('partial')
    expect(sessionSegments({ ...base, manualGrades: { w1__a: 'correct' } })[0].state).toBe('correct')
    expect(sessionSegments({ ...base, manualGrades: { w1__a: 'incorrect' } })[0].state).toBe('incorrect')
  })
})

describe('sessionSegments, answers held to the end', () => {
  it('never shows a verdict', () => {
    const segs = sessionSegments({
      questions: qs,
      responses: { q1: pick('A'), q2: pick('B'), q4: pick('B') },
      currentIndex: 3,
      revealed: false,
    })
    expect(segs.map(s => s.state)).toEqual(['answered', 'answered', 'unanswered', 'answered'])
    expect(segs.some(s => s.state === 'correct' || s.state === 'incorrect' || s.state === 'partial')).toBe(false)
    expect(segs[3].current).toBe(true)
  })
})

describe('finalSegments and counts', () => {
  it('gives every question its final colour', () => {
    const states = finalSegments(
      [...qs, written('w1')],
      { q1: pick('A'), q2: pick('B'), w1: pick('{"a":"x"}') },
      { w1__a: 'partial' },
    )
    expect(states).toEqual(['correct', 'incorrect', 'unanswered', 'unanswered', 'partial'])
    const counts = answerCounts(states)
    expect(counts).toEqual({ correct: 1, incorrect: 1, partial: 1, unanswered: 2 })
    expect(countsLabel(counts)).toBe('1 correct, 1 incorrect, 1 partial, 2 unanswered')
  })
})

describe('segmentGroups', () => {
  it('is one run for a quiz with no steps', () => {
    expect(segmentGroups(4, null)).toEqual([{ step: null, start: 0, length: 4 }])
    expect(segmentGroups(0, null)).toEqual([])
  })

  it('cuts at each change of step', () => {
    expect(segmentGroups(5, ['fix', 'fix', 'learn', 'review', 'review'])).toEqual([
      { step: 'fix', start: 0, length: 2 },
      { step: 'learn', start: 2, length: 1 },
      { step: 'review', start: 3, length: 2 },
    ])
  })

  it('ignores steps that do not line up with the questions', () => {
    expect(segmentGroups(3, ['fix'])).toEqual([{ step: null, start: 0, length: 3 }])
  })
})

describe('words and spacing', () => {
  it('names the question, and its place in the step inside a session', () => {
    expect(progressLabel(1, 9)).toBe('Question 2 of 9')
    expect(progressLabel(1, 5, ['fix', 'fix', 'fix', 'learn', 'review'])).toBe('Question 2 of 5. Fix mistakes: 2 of 3')
    expect(progressLabel(4, 5, ['fix', 'fix', 'fix', 'learn', 'review'])).toBe('Question 5 of 5. Review: 1 of 1')
  })

  it('narrows the gap on a long paper', () => {
    expect(segmentGap(9)).toBe(3)
    expect(segmentGap(45)).toBe(2)
    expect(segmentGap(120)).toBe(1)
  })

  it('reads part grades out of the store keys', () => {
    expect(partGradesOf('w1', { w1__a: 'correct', w10__a: 'partial', w1: 'incorrect' })).toEqual({ a: 'correct' })
  })
})
