import { describe, it, expect } from 'vitest'
import { parseQuestion, isAnswerCorrect, normalizeAnswerText } from './parser'

// ── normalizeAnswerText ───────────────────────────────────────────────────────

describe('normalizeAnswerText', () => {
  it('strips whitespace', () => {
    expect(normalizeAnswerText('  3.67  ')).toBe('3.67')
  })

  it('treats numeric strings as equal regardless of trailing zeros', () => {
    expect(normalizeAnswerText('3.670')).toBe(normalizeAnswerText('3.67'))
    expect(normalizeAnswerText('4.50')).toBe(normalizeAnswerText('4.5'))
  })

  it('lowercases non-numeric strings', () => {
    expect(normalizeAnswerText('Yes')).toBe('yes')
  })
})

// ── multiple-choice (backward compat) ────────────────────────────────────────

const MC_RAW = `---
id: "test-mc-1"
exam: "Probability"
topic: "Discrete Univariate Distributions"
learning_objective: "Univariate Random Variables"
difficulty: medium
type: multiple-choice
wiki_link: Concepts/Discrete+Univariate+Distributions
answer: "B"
points: 1
---

What is 1 + 1?

- A) 1
- B) 2
- C) 3
- D) 4

## Explanation
Basic arithmetic.

## Examiner Report
A common mistake was choosing A.
`

describe('parseQuestion — multiple-choice', () => {
  const q = parseQuestion(MC_RAW)!

  it('parses successfully', () => expect(q).not.toBeNull())
  it('type is multiple-choice', () => expect(q.type).toBe('multiple-choice'))
  it('answer is B', () => expect(q.answer).toBe('B'))
  it('has 4 options', () => expect(q.options).toHaveLength(4))
  it('parses examiner_report', () => expect(q.examiner_report).toContain('common mistake'))
  it('isAnswerCorrect correct answer', () => expect(isAnswerCorrect(q, 'B')).toBe(true))
  it('isAnswerCorrect wrong answer', () => expect(isAnswerCorrect(q, 'A')).toBe(false))
})

// ── free-entry ────────────────────────────────────────────────────────────────

const FREE_ENTRY_RAW = `---
id: "test-fe-1"
exam: "Probability"
topic: "Written and Earned Exposures"
learning_objective: "Ratemaking"
difficulty: easy
type: free-entry
answer: "4.5"
points: 0.25
wiki_link: Concepts/Written+Exposures
---

Calculate the calendar year 2018 written exposures.

## Explanation
All policies are 6-month policies. $0.5 \\times (2+3+1+2+1) = 4.5$

## Examiner Report
A common mistake was forgetting to multiply by 0.5.
`

describe('parseQuestion — free-entry', () => {
  const q = parseQuestion(FREE_ENTRY_RAW)!

  it('parses successfully', () => expect(q).not.toBeNull())
  it('type is free-entry', () => expect(q.type).toBe('free-entry'))
  it('answer is 4.5', () => expect(q.answer).toBe('4.5'))
  it('options is empty', () => expect(q.options).toHaveLength(0))
  it('parts is undefined', () => expect(q.parts).toBeUndefined())
  it('parses explanation', () => expect(q.explanation).toContain('6-month'))
  it('parses examiner_report', () => expect(q.examiner_report).toContain('multiply by 0.5'))

  it('isAnswerCorrect exact match', () => expect(isAnswerCorrect(q, '4.5')).toBe(true))
  it('isAnswerCorrect trailing zero', () => expect(isAnswerCorrect(q, '4.50')).toBe(true))
  it('isAnswerCorrect wrong value', () => expect(isAnswerCorrect(q, '3.67')).toBe(false))
  it('isAnswerCorrect with extra whitespace', () => expect(isAnswerCorrect(q, '  4.5  ')).toBe(true))
})

// ── multi-part ────────────────────────────────────────────────────────────────

const MULTI_PART_RAW = `---
id: "test-mp-1"
exam: "Probability"
topic: "Written and Earned Exposures"
learning_objective: "Ratemaking"
difficulty: medium
type: multi-part
points: 0.75
wiki_link: Concepts/Written+Exposures
---

Given the following data, all policies are 6-month policies.

## Part a (0.25 points)

Calculate the written exposures.

### Answer
4.5

### Explanation
$0.5 \\times 9 = 4.5$

### Examiner Report
A common mistake was forgetting to multiply by 0.5.

## Part b (0.5 points)

Calculate the earned exposures.

### Answer
3.67

### Explanation
Sum of fractional earned portions.

### Examiner Report
Forgetting to account for the 6-month term.
`

describe('parseQuestion — multi-part', () => {
  const q = parseQuestion(MULTI_PART_RAW)!

  it('parses successfully', () => expect(q).not.toBeNull())
  it('type is multi-part', () => expect(q.type).toBe('multi-part'))
  it('answer is empty string', () => expect(q.answer).toBe(''))
  it('options is empty', () => expect(q.options).toHaveLength(0))
  it('has 2 parts', () => expect(q.parts).toHaveLength(2))
  it('stem is the preamble', () => expect(q.stem).toContain('6-month policies'))

  it('part a has correct label and points', () => {
    expect(q.parts![0].label).toBe('a')
    expect(q.parts![0].points).toBe(0.25)
  })
  it('part a answer', () => expect(q.parts![0].answer).toBe('4.5'))
  it('part a type is free-entry', () => expect(q.parts![0].type).toBe('free-entry'))
  it('part a explanation', () => expect(q.parts![0].explanation).toContain('4.5'))
  it('part a examiner_report', () => expect(q.parts![0].examiner_report).toContain('multiply by 0.5'))

  it('part b has correct label and points', () => {
    expect(q.parts![1].label).toBe('b')
    expect(q.parts![1].points).toBe(0.5)
  })
  it('part b answer', () => expect(q.parts![1].answer).toBe('3.67'))

  it('isAnswerCorrect all correct', () => {
    const chosen = JSON.stringify({ a: '4.5', b: '3.67' })
    expect(isAnswerCorrect(q, chosen)).toBe(true)
  })

  it('isAnswerCorrect with normalized numbers', () => {
    const chosen = JSON.stringify({ a: '4.50', b: '3.670' })
    expect(isAnswerCorrect(q, chosen)).toBe(true)
  })

  it('isAnswerCorrect one part wrong', () => {
    const chosen = JSON.stringify({ a: '4.5', b: '99' })
    expect(isAnswerCorrect(q, chosen)).toBe(false)
  })

  it('isAnswerCorrect invalid JSON', () => {
    expect(isAnswerCorrect(q, 'not-json')).toBe(false)
  })
})
