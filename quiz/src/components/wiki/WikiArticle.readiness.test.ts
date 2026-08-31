import { describe, it, expect } from 'vitest'
import { READINESS_MARKER, hasExamGuidesMarker, markReadinessCard } from './WikiArticle'

// The readiness card rides in the orientation row, beside the guide card, when
// the exam page carries the `exam-guides` div. Exams without one get a marker
// inserted directly under the "Learning Objectives" heading instead.

describe('hasExamGuidesMarker', () => {
  it('detects the orientation-row div', () => {
    expect(hasExamGuidesMarker('Intro.\n\n<div class="exam-guides"></div>\n\n## Learning Objectives')).toBe(true)
  })

  it('is false for an exam page without one', () => {
    expect(hasExamGuidesMarker('## Learning Objectives\n> [!example]- A {10%}')).toBe(false)
  })

  it('ignores other layout divs', () => {
    expect(hasExamGuidesMarker('<div class="exam-nav" data-current="P-1|Probability"></div>')).toBe(false)
  })
})

describe('markReadinessCard', () => {
  it('inserts the marker directly under the learning-objectives heading', () => {
    const md = [
      '# Exam P-1',
      '',
      '## Prerequisite knowledge',
      'Calculus.',
      '',
      '## Learning Objectives',
      '> [!example]- General Probability {23-30%}',
      '> 1. Define [[Bayes Theorem]].',
      '',
      '## Source Material',
      '> [!answer]- Source Material',
    ].join('\n')
    const lines = markReadinessCard(md).split('\n')
    const at = lines.findIndex(l => l.trim() === READINESS_MARKER)
    expect(at).toBeGreaterThan(lines.indexOf('## Learning Objectives'))
    expect(at).toBeLessThan(lines.indexOf('> [!example]- General Probability {23-30%}'))
  })

  it('leaves the objectives themselves intact', () => {
    const md = ['## Learning Objectives', '> [!example]- A {10%}', '> 1. Do the thing.'].join('\n')
    const out = markReadinessCard(md)
    expect(out).toContain('> [!example]- A {10%}\n> 1. Do the thing.')
  })

  it('falls back to the end of the page when there are no learning objectives', () => {
    const out = markReadinessCard('# Exam X\n\nComing soon.')
    expect(out.trim().endsWith(READINESS_MARKER)).toBe(true)
  })

  it('adds the marker exactly once', () => {
    const md = '## Learning Objectives\nOne\n\n## Source Material\nTwo'
    const out = markReadinessCard(md)
    expect(out.split(READINESS_MARKER).length - 1).toBe(1)
  })
})
