import { describe, it, expect } from 'vitest'
import { KEYSTONE_MARKER, markKeystoneStrip } from './WikiArticle'

// The keystone strip is placed by inserting a marker into the exam markdown,
// since the vault pages carry no `<div>` for it. It belongs at the *end* of the
// learning objectives — after the syllabus, before whatever follows it.

describe('markKeystoneStrip', () => {
  it('inserts the marker after the learning objectives, before the next section', () => {
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
    const lines = markKeystoneStrip(md).split('\n')
    const at = lines.findIndex(l => l.trim() === KEYSTONE_MARKER)
    expect(at).toBeGreaterThan(lines.indexOf('> 1. Define [[Bayes Theorem]].'))
    expect(at).toBeLessThan(lines.indexOf('## Source Material'))
  })

  it('appends the marker when the objectives are the last section', () => {
    const md = ['# Exam 6U', '', '## Learning Objectives', '> [!example]- A {10%}'].join('\n')
    const out = markKeystoneStrip(md)
    expect(out.trim().endsWith(KEYSTONE_MARKER)).toBe(true)
  })

  it('falls back to the end of the page when there are no learning objectives', () => {
    const out = markKeystoneStrip('# Exam X\n\nComing soon.')
    expect(out.trim().endsWith(KEYSTONE_MARKER)).toBe(true)
  })

  it('adds the marker exactly once', () => {
    const md = '## Learning Objectives\nOne\n\n## Source Material\nTwo'
    const out = markKeystoneStrip(md)
    expect(out.split(KEYSTONE_MARKER).length - 1).toBe(1)
  })
})
