import { describe, it, expect } from 'vitest'
import { splitSampleAnswers, ungradedWrittenParts, writtenParts } from './writtenAnswer'
import { parseQuestion } from './parser'

describe('splitSampleAnswers', () => {
  it('leaves a single sample whole', () => {
    const text = 'Sample responses include any of the following:\n\n- Increases competition\n- Increases innovation'
    expect(splitSampleAnswers(text)).toEqual({ intro: null, samples: [text] })
  })

  it('is empty for no text', () => {
    expect(splitSampleAnswers('  \n')).toEqual({ intro: null, samples: [] })
  })

  // cas6c-2014s-q10: two full answers, "Alternatively:" between them.
  it('splits on a bare "Alternatively:" line', () => {
    const text = [
      '**Advantages**', '', '- Increases competition', '',
      'Alternatively:', '',
      '**Advantages**', '', '- More competition resulting in more availability',
    ].join('\n')
    expect(splitSampleAnswers(text)).toEqual({
      intro: null,
      samples: [
        '**Advantages**\n\n- Increases competition',
        '**Advantages**\n\n- More competition resulting in more availability',
      ],
    })
  })

  it('splits on "Or:" and the other spellings of "Alternatively:"', () => {
    for (const sep of ['Or:', 'OR:', '**Or:**', '**Alternatively:**', '**Alternatively**:', 'Alternatively']) {
      expect(splitSampleAnswers(`First answer.\n\n${sep}\n\nSecond answer.`).samples)
        .toEqual(['First answer.', 'Second answer.'])
    }
  })

  // cas6c-2014f-q10: "or" between two ways of making one point, under one
  // heading of five — splitting there would leave fragments, not answers.
  it('does not split on a bare "or"', () => {
    const text = [
      '**Filling an unmet need**', '', 'Unavailability.', '', 'or', '', 'Subsidy.', '',
      '**Convenience**', '', 'One market.',
    ].join('\n')
    expect(splitSampleAnswers(text).samples).toEqual([text])
    expect(splitSampleAnswers('One.\n\nOR\n\nTwo.').samples).toEqual(['One.\n\nOR\n\nTwo.'])
  })

  // cas6c-2016f-q22: a second way to work ratio i, inside ratio i's section.
  it('does not split on an alternative inside one section of the answer', () => {
    const text = [
      '**i. Return on Equity**', '', 'ROE = 8.8%', '',
      'Alternatively, on average equity:', '', 'ROE = 9.1%', '',
      '**ii. Return on Revenue**', '', 'ROR = 5.1%',
    ].join('\n')
    expect(splitSampleAnswers(text).samples).toEqual([text])
  })

  it('still splits two sectioned answers that share their sections', () => {
    const text = '**Advantages**\n\n- A\n\n**Disadvantages**\n\n- B\n\nAlternatively:\n\n**Advantages:**\n\n- C'
    expect(splitSampleAnswers(text).samples).toEqual([
      '**Advantages**\n\n- A\n\n**Disadvantages**\n\n- B',
      '**Advantages:**\n\n- C',
    ])
  })

  // cas6c-2013f-q18: "Or, assuming the primary insurer is the buyer …:".
  it('keeps a lead-in like "Or, assuming …:" at the top of the sample it starts', () => {
    expect(splitSampleAnswers('- One\n\nAlternatively, with phasing:\n\n- Two\n\nor, year by year:\n\n| t |\n|---|').samples)
      .toEqual(['- One', 'With phasing:\n\n- Two', 'Year by year:\n\n| t |\n|---|'])
  })

  // cas8-2013-q1, cas6c-2016s-q5, cas5-2015f-q18: in a written part, every
  // line that opens with "Alternatively" starts another answer.
  it('keeps what follows "Alternatively" on its line as the start of the next sample', () => {
    expect(splitSampleAnswers('For.\n\nAlternatively, **against the surcharge:**\n\n- No').samples)
      .toEqual(['For.', '**Against the surcharge:**\n\n- No'])
    expect(splitSampleAnswers('Full.\n\nAlternatively (the report\'s near-full answer):\n\nNear.').samples)
      .toEqual(['Full.', '(The report\'s near-full answer):\n\nNear.'])
    expect(splitSampleAnswers('Drop AY 2012.\n\nAlternatively, a candidate could average all three.').samples)
      .toEqual(['Drop AY 2012.', 'A candidate could average all three.'])
  })

  it('does not split on "or, …" that runs on into the working', () => {
    const text = 'RAROC = 32.75%\n\nor, equivalently,\n\n$$x = 1$$'
    expect(splitSampleAnswers(text).samples).toEqual([text])
  })

  it('follows a display a lead-in opens', () => {
    expect(splitSampleAnswers('One.\n\nAlternatively: $$\nx\nOr:\n$$').samples)
      .toEqual(['One.', '$$\nx\nOr:\n$$'])
  })

  it('starts the next sample at an inline "Alternatively: …", capitalised', () => {
    expect(splitSampleAnswers('A debit mod is bad.\n\nAlternatively: a debit mod doesn\'t mean the risk is bad.'))
      .toEqual({ intro: null, samples: ['A debit mod is bad.', 'A debit mod doesn\'t mean the risk is bad.'] })
  })

  // cas9-2015-q6 part b: three samples, each under its own heading.
  it('splits on numbered sample headings and drops the headings', () => {
    const text = [
      'Sample Answer #1', '', '- Regret avoidance', '',
      'Sample Answer #2', '', '- Forecast error', '',
      'Sample Answer 3', '', '- Affect',
    ].join('\n')
    expect(splitSampleAnswers(text)).toEqual({
      intro: null,
      samples: ['- Regret avoidance', '- Forecast error', '- Affect'],
    })
  })

  it('keeps the text above the first numbered heading as a lead-in', () => {
    const text = 'Any two of:\n\n**Sample 1:**\n\nOne.\n\n**Sample 2:**\n\nTwo.'
    expect(splitSampleAnswers(text)).toEqual({ intro: 'Any two of:', samples: ['One.', 'Two.'] })
  })

  it('never splits inside a display or a code block', () => {
    const math = 'Working:\n\n$$\nx = 1\nor\nx = 2\n$$\n\nDone.'
    expect(splitSampleAnswers(math).samples).toEqual([math])
    const code = '```\nor\n```'
    expect(splitSampleAnswers(code).samples).toEqual([code])
  })

  it('drops an empty sample a stray separator would leave', () => {
    expect(splitSampleAnswers('Alternatively:\n\nOnly one.').samples).toEqual(['Alternatively:\n\nOnly one.'])
    expect(splitSampleAnswers('One.\n\nAlternatively:\n\nTwo.\n\nAlternatively:').samples).toEqual(['One.', 'Two.'])
  })
})

const MULTI_PART = `---
id: "cas5-test-q1"
exam: "Exam 5"
topic: "Ratemaking"
learning_objective: "Ratemaking"
difficulty: medium
type: multi-part
wiki_link: []
points: 2
---

Preamble.

## Part a (1 point)

Compute the rate.

### Answer
100

### Explanation
Worked.

## Part b (0.5 points)

Explain why.

### Explanation
Because.

## Part c (0.5 points)

Describe one more.

### Explanation
Another.
`

describe('written parts', () => {
  const q = parseQuestion(MULTI_PART)!

  it('are the parts with no answer key', () => {
    expect(writtenParts(q).map(p => p.label)).toEqual(['b', 'c'])
  })

  it('are ungraded until a grade is given', () => {
    expect(ungradedWrittenParts(q, {}).map(p => p.label)).toEqual(['b', 'c'])
    expect(ungradedWrittenParts(q, { b: 'partial' }).map(p => p.label)).toEqual(['c'])
    expect(ungradedWrittenParts(q, { b: 'correct', c: 'incorrect' })).toEqual([])
  })

  it('ignore a grade given to a part with an answer key', () => {
    expect(ungradedWrittenParts(q, { a: 'correct' }).map(p => p.label)).toEqual(['b', 'c'])
  })

  it('do not exist outside a multi-part question', () => {
    expect(writtenParts({ ...q, type: 'free-entry' })).toEqual([])
  })
})
