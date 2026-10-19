import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { isAnswerCorrect, parseQuestion, type Question } from './parser'
import { initialOrder, matchingLayout, moveItem, orderingLayout, orderingLetters, questionLayout } from './questionLayout'

const OPTIONS = `- A) QQ plot of residuals
- B) Added variable plot
- C) Marginal model plot
- D) Box plot of the response`

const MATCHING = `---
id: "t-1"
exam: "Exam MAS-I"
topic: "QQ Plot"
difficulty: medium
type: multi-part
points: 2
---

Match each finding to the plot that would reveal it.

## Part a (1 point)
The residuals have a heavy right tail.

${OPTIONS}

### Answer
A

### Explanation
Tail.

## Part b (1 point)
A new predictor would explain what the model leaves.

${OPTIONS}

### Answer
B

### Explanation
Added variable.
`

const ORDERING = `---
id: "t-2"
exam: "Exam MAS-I"
topic: "Kolmogorov-Smirnov Test"
difficulty: medium
type: free-entry
answer: "CADB"
points: 1
---

Put the steps of the test in order.

- (A) Evaluate the hypothesized CDF at each data point
- (B) Compare the statistic with the critical value
- (C) Sort the sample and form the empirical CDF
- (D) Take the largest absolute gap

Enter the letters with no spaces, e.g. ABCD.

## Explanation
Sort, evaluate, gap, compare.
`

function parse(raw: string): Question {
  const q = parseQuestion(raw)
  if (!q) throw new Error('fixture did not parse')
  return q
}

describe('matchingLayout', () => {
  it('reads a multi-part question whose parts share one option list as matching', () => {
    const layout = matchingLayout(parse(MATCHING))
    expect(layout?.options.map(o => o.key)).toEqual(['A', 'B', 'C', 'D'])
    expect(layout?.items.map(p => p.answer)).toEqual(['A', 'B'])
  })

  it('is not matching when the option lists differ', () => {
    const raw = MATCHING.replace('- D) Box plot of the response\n\n### Answer\nB', '- D) Something else\n\n### Answer\nB')
    expect(matchingLayout(parse(raw))).toBeNull()
  })

  it('is not matching with a written or free-entry part', () => {
    const raw = MATCHING.replace(/## Part b[\s\S]*$/, '## Part b (1 point)\nCalculate it.\n\n### Answer\n12\n')
    expect(matchingLayout(parse(raw))).toBeNull()
  })

  it('is not matching for a single part', () => {
    const raw = MATCHING.replace(/## Part b[\s\S]*$/, '')
    expect(matchingLayout(parse(raw))).toBeNull()
  })
})

describe('orderingLayout', () => {
  it('splits the stem around the item list', () => {
    const layout = orderingLayout(parse(ORDERING))
    expect(layout?.lead).toBe('Put the steps of the test in order.')
    expect(layout?.items.map(i => i.key)).toEqual(['A', 'B', 'C', 'D'])
    expect(layout?.items[2].text).toBe('Sort the sample and form the empirical CDF')
    expect(layout?.tail).toBe('Enter the letters with no spaces, e.g. ABCD.')
  })

  it('is not ordering when the key is not every item once', () => {
    expect(orderingLayout(parse(ORDERING.replace('answer: "CADB"', 'answer: "C"')))).toBeNull()
    expect(orderingLayout(parse(ORDERING.replace('answer: "CADB"', 'answer: "CADA"')))).toBeNull()
  })

  it('is not ordering with fewer than three items', () => {
    const raw = ORDERING
      .replace(/- \(C\).*\n/, '')
      .replace(/- \(D\).*\n/, '')
      .replace('answer: "CADB"', 'answer: "BA"')
    expect(orderingLayout(parse(raw))).toBeNull()
  })

  it('leaves a short answer with no list alone', () => {
    const raw = ORDERING.replace(/- \(.*\n/g, '').replace('answer: "CADB"', 'answer: "12"')
    expect(questionLayout(parse(raw))).toBeNull()
  })

  it('grades the arranged letters the way a typed answer is graded', () => {
    const q = parse(ORDERING)
    expect(isAnswerCorrect(q, 'CADB')).toBe(true)
    expect(isAnswerCorrect(q, 'CABD')).toBe(false)
  })
})

describe('ordering helpers', () => {
  const layout = orderingLayout(parse(ORDERING))!

  it('reads letters loosely', () => {
    expect(orderingLetters('c, a d-b')).toEqual(['C', 'A', 'D', 'B'])
  })

  it('starts from the reader’s arrangement, else the listed order', () => {
    expect(initialOrder(layout, 'DCBA')).toEqual(['D', 'C', 'B', 'A'])
    expect(initialOrder(layout, null)).toEqual(['A', 'B', 'C', 'D'])
    expect(initialOrder(layout, 'AB')).toEqual(['A', 'B', 'C', 'D'])
  })

  it('moves one item and keeps the rest in order', () => {
    expect(moveItem(['A', 'B', 'C', 'D'], 2, 0)).toEqual(['C', 'A', 'B', 'D'])
    expect(moveItem(['A', 'B', 'C', 'D'], 0, 3)).toEqual(['B', 'C', 'D', 'A'])
    expect(moveItem(['A', 'B', 'C'], 0, 5)).toEqual(['A', 'B', 'C'])
  })
})

// The bank is the fixture: every question the vault wrote as an ordering or a
// matching question (the question-writer templates) gets its own control.
describe('the vault’s own questions', () => {
  const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
  const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions')
  const own: { file: string; raw: string; q: Question }[] = []
  for (const dir of readdirSync(QUESTIONS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(path.join(QUESTIONS_DIR, dir.name))) {
      if (!file.endsWith('.md') || !file.includes('-an-')) continue
      const raw = readFileSync(path.join(QUESTIONS_DIR, dir.name, file), 'utf-8')
      const q = parseQuestion(raw)
      if (q) own.push({ file: `${dir.name}/${file}`, raw, q })
    }
  }

  it('draws every written ordering question as a list to arrange', () => {
    const lists = own.filter(({ q, raw }) => q.type === 'free-entry' && /^- \([A-F]\)/m.test(raw))
    expect(lists.length).toBeGreaterThan(0)
    expect(lists.filter(({ q }) => orderingLayout(q) === null).map(o => o.file)).toEqual([])
  })

  it('has matching questions to draw', () => {
    expect(own.filter(({ q }) => matchingLayout(q) !== null).length).toBeGreaterThan(0)
  })
})
