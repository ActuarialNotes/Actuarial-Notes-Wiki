import { describe, expect, it } from 'vitest'
import { conceptNotes, isLossSentence, lossPassages } from './examinerNotes'
import type { TutorItem } from './items'

describe('a sentence about lost credit', () => {
  it('is one that says how candidates lost it', () => {
    expect(isLossSentence('A common mistake was using written premium.')).toBe(true)
    expect(isLossSentence('Candidates struggled with the large loss factor.')).toBe(true)
    expect(isLossSentence('Many candidates did not adjust for the rate change.')).toBe(true)
    expect(isLossSentence('Some candidates failed to identify the correct premium base.')).toBe(true)
    expect(isLossSentence('Common errors: arguing against the proposal.')).toBe(true)
  })

  it('is not one about what earned credit, or how candidates did well', () => {
    expect(isLossSentence('Common acceptable answers included using limited-loss trend factors.')).toBe(false)
    expect(isLossSentence('Most candidates performed well on this part.')).toBe(false)
    expect(isLossSentence('Candidates received credit whether they treated the factors as cumulative or incremental.')).toBe(false)
  })
})

describe('the passages of a report', () => {
  it('are its lost-credit sentences, verbatim and in order', () => {
    const report = 'Candidates most often determined the trend period. Candidates struggled with the large loss factor — many did not calculate it correctly. An example was not subtracting excess losses.'
    expect(lossPassages(report)).toEqual([
      'Candidates struggled with the large loss factor — many did not calculate it correctly.',
    ])
  })

  it('keep a lead-in with its bullets whole', () => {
    const report = 'Common mistakes:\n- Using the wrong triangle\n- Applying factors to paid losses\n\nOtherwise well done.'
    expect(lossPassages(report)).toEqual(['Common mistakes:\n- Using the wrong triangle\n- Applying factors to paid losses'])
  })

  it('find the bullets after a blank line too', () => {
    const report = 'The most common errors were:\n\n- Interpolating at age 12\n- Ignoring the disposal rate'
    expect(lossPassages(report)).toEqual(['The most common errors were:\n- Interpolating at age 12\n- Ignoring the disposal rate'])
  })

  it('don’t split a sentence on a number', () => {
    const report = 'A common error was capping at $1.5 million rather than 25%. Otherwise fine.'
    expect(lossPassages(report)).toEqual(['A common error was capping at $1.5 million rather than 25%.'])
  })
})

function item(id: string, sitting: string | null, report: string): TutorItem {
  return {
    id, questionId: id.split('#')[0], partLabel: 'a', exam: 'Exam 5', topic: 't', preamble: '', prompt: '',
    kind: 'explanation', concepts: ['X'], questionConcepts: ['X'], points: 1, minutes: 4, difficulty: 'medium',
    sitting, answerKey: '', sampleAnswer: '', examinerReport: report, options: [],
  }
}

describe('a concept’s notes', () => {
  it('come newest sitting first, at most two from one item', () => {
    const notes = conceptNotes([
      item('old#a', 'Fall 2013', 'A common mistake was A.'),
      item('new#a', 'Fall 2019', 'A common mistake was B. A common error was C. Candidates struggled with D.'),
    ])
    expect(notes.map(n => n.text)).toEqual([
      'A common mistake was B.',
      'A common error was C.',
      'A common mistake was A.',
    ])
    expect(notes[0].sitting).toBe('Fall 2019')
  })
})
