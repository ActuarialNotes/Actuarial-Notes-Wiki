import { describe, it, expect } from 'vitest'
import { pendingAnswerFor, tagPendingAnswer } from './pendingAnswer'

const q1 = { id: 'exam-5-2018-q3' }
const q2 = { id: 'exam-5-2018-q4' }

describe('pendingAnswerFor', () => {
  it('reads back the answer typed for this question', () => {
    expect(pendingAnswerFor(tagPendingAnswer(q1, '{"a":"Test"}'), q1)).toBe('{"a":"Test"}')
  })

  it('does not carry the previous question\'s entry into the next one', () => {
    expect(pendingAnswerFor(tagPendingAnswer(q1, '{"a":"Test"}'), q2)).toBeNull()
  })

  it('is null when nothing is pending', () => {
    expect(pendingAnswerFor(null, q1)).toBeNull()
  })

  it('is null while no question is showing', () => {
    expect(pendingAnswerFor(tagPendingAnswer(q1, 'x'), undefined)).toBeNull()
  })

  it('keeps an empty entry distinct from no entry', () => {
    expect(pendingAnswerFor(tagPendingAnswer(q1, ''), q1)).toBe('')
  })
})

describe('tagPendingAnswer', () => {
  it('clears on a null value', () => {
    expect(tagPendingAnswer(q1, null)).toBeNull()
  })

  it('clears when no question is showing', () => {
    expect(tagPendingAnswer(undefined, 'x')).toBeNull()
  })
})
