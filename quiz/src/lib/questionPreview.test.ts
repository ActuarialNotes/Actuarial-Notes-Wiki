import { describe, it, expect } from 'vitest'
import { questionPreview, stemPreview, stemSnippet, STEM_PREVIEW_CHARS } from './questionPreview'

describe('stemPreview', () => {
  it('returns a short stem whole', () => {
    expect(stemPreview('What is the mean of a fair die roll?'))
      .toBe('What is the mean of a fair die roll?')
  })

  it('joins the stem\'s paragraphs into one line', () => {
    const stem = [
      'An insurer is changing its exposure base from payroll to hours worked.',
      '',
      'Evaluate the merits of this change.',
    ].join('\n')
    expect(stemPreview(stem)).toBe(
      'An insurer is changing its exposure base from payroll to hours worked. Evaluate the merits of this change.',
    )
  })

  it('keeps the given figures, as bullets', () => {
    const stem = [
      'Given the following information:',
      '',
      '- All policies have six-month terms.',
      '- Selected severity trend = +5%.',
    ].join('\n')
    expect(stemPreview(stem)).toBe(
      'Given the following information: • All policies have six-month terms. • Selected severity trend = +5%.',
    )
  })

  it('drops tables and images but keeps their captions, marking the gap', () => {
    const stem = [
      'Given the following information:',
      '',
      '**Cumulative Paid Loss and ALAE (\\$000s):**',
      '',
      '| Accident Year | 12 Months | 24 Months |',
      '|---|---|---|',
      '| 2009 | \\$6,000 | \\$17,200 |',
      '',
      '![Development triangle](Media/triangle.svg)',
    ].join('\n')
    expect(stemPreview(stem)).toBe(
      'Given the following information: Cumulative Paid Loss and ALAE (\\$000s): …',
    )
  })

  it('drops fenced blocks', () => {
    const stem = ['Consider this snippet:', '```', 'x <- rnorm(10)', '```'].join('\n')
    expect(stemPreview(stem)).toBe('Consider this snippet: …')
  })

  it('strips emphasis markers so the preview reads as prose', () => {
    expect(stemPreview('Evaluate **three different criteria** of a good base.'))
      .toBe('Evaluate three different criteria of a good base.')
  })

  it('leaves math and escaped currency as authored', () => {
    expect(stemPreview('Let $X$ be a loss with mean \\$400.'))
      .toBe('Let $X$ be a loss with mean \\$400.')
  })

  it('cuts long prose at a word boundary', () => {
    const stem = `${'word '.repeat(200)}end`
    const preview = stemPreview(stem)
    expect(preview.length).toBeLessThanOrEqual(STEM_PREVIEW_CHARS + 1)
    expect(preview.endsWith('…')).toBe(true)
    expect(preview).not.toContain('wor…')
  })

  it('honours a caller-supplied length', () => {
    expect(stemPreview('one two three four five six seven', 12)).toBe('one two…')
  })

  it('handles an empty stem', () => {
    expect(stemPreview('')).toBe('')
  })
})

describe('stemSnippet', () => {
  const stem = `Opening sentence about ratemaking. ${'filler words here. '.repeat(30)}The needle is buried deep in the stem.`

  it('is the plain preview with no query', () => {
    expect(stemSnippet(stem, '')).toBe(stemPreview(stem))
  })

  it('is the plain preview when the match is already visible', () => {
    expect(stemSnippet(stem, 'ratemaking')).toBe(stemPreview(stem))
  })

  it('windows onto a match that falls past the preview', () => {
    const snippet = stemSnippet(stem, 'needle')
    expect(snippet.startsWith('…')).toBe(true)
    expect(snippet).toContain('needle')
  })

  it('falls back to the preview when the match is in dropped data', () => {
    const withTable = [
      'Given the following information:',
      '',
      `${'filler words here. '.repeat(30)}`,
      '',
      '| Accident Year | Paid Loss |',
      '|---|---|',
      '| 2009 | 6000 |',
    ].join('\n')
    expect(stemSnippet(withTable, '6000')).toBe(stemPreview(withTable))
  })

  it('matches case-insensitively', () => {
    expect(stemSnippet(stem, 'NEEDLE')).toContain('needle')
  })
})

describe('questionPreview', () => {
  it('previews the stem when there is one', () => {
    expect(questionPreview({ stem: 'An insurer changes its exposure base.' }))
      .toBe('An insurer changes its exposure base.')
  })

  it('falls back to the first part of a question with no shared preamble', () => {
    expect(questionPreview({
      stem: '',
      parts: [
        { label: 'a', stem: 'Briefly describe one advantage of calendar year data.' },
        { label: 'b', stem: 'Justify an appropriate aggregation approach.' },
      ],
    })).toBe('a) Briefly describe one advantage of calendar year data.')
  })

  it('skips a part that is itself only data', () => {
    expect(questionPreview({
      stem: '',
      parts: [
        { label: 'a', stem: '| Year | Loss |\n|---|---|\n| 2019 | 100 |' },
        { label: 'b', stem: 'Calculate the indicated rate change.' },
      ],
    })).toBe('b) Calculate the indicated rate change.')
  })

  it('has nothing to show for a question with neither', () => {
    expect(questionPreview({ stem: '', parts: [] })).toBe('')
  })
})
