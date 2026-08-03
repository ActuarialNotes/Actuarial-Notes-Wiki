import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { QuestionAttemptBadge } from './QuestionAttemptBadge'
import type { AttemptCounts } from '@/lib/questionAttempts'

function render(summary: AttemptCounts | undefined, showNew = true): string {
  return renderToStaticMarkup(<QuestionAttemptBadge summary={summary} showNew={showNew} />)
}

describe('QuestionAttemptBadge', () => {
  it('marks an untouched question as not attempted', () => {
    expect(render(undefined)).toContain('Not attempted')
  })

  it('says nothing when attempt history is unknown (signed out)', () => {
    expect(render(undefined, false)).toBe('')
  })

  it('shows both the successful and unsuccessful counts for a mixed history', () => {
    const html = render({ attempt_count: 5, correct_count: 2 })
    expect(html).toContain('>2<')
    expect(html).toContain('>3<')
    expect(html).toContain('Attempted 5 times — 2 correct, 3 incorrect')
  })

  it('shows the correct count alone when every attempt succeeded', () => {
    const html = render({ attempt_count: 3, correct_count: 3 })
    expect(html).toContain('Attempted 3 times — all correct')
    expect(html).toContain('text-green-700')
  })

  it('shows the failure count alone when no attempt succeeded', () => {
    const html = render({ attempt_count: 2, correct_count: 0 })
    expect(html).toContain('Attempted 2 times — never correct')
    expect(html).toContain('text-red-700')
  })
})
