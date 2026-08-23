import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { PastExamBrowser } from './PastExamBrowser'
import { getExamPdfLink, getExamSolutionsPdfLink } from '@/data/examPdfLinks'

// The shelf for an exam with no dated papers — Exam P and FM draw on the SOA's
// rolling sample set, so the only rows are "Mix" and the only papers are the
// exam-level ones.
function renderShelf(props: Partial<Parameters<typeof PastExamBrowser>[0]> = {}): string {
  return renderToStaticMarkup(
    <PastExamBrowser
      rows={[]}
      selected={null}
      onSelect={() => {}}
      mixCount={30}
      examLabel="Exam P"
      {...props}
    />,
  )
}

describe('PastExamBrowser document buttons', () => {
  it('offers the questions paper and its solutions as separate buttons', () => {
    // The two halves of the SOA sample set: a candidate who has just sat the
    // mix wants the solutions, and it is a different download.
    const html = renderShelf({
      reportLink: getExamPdfLink('Probability'),
      solutionsLink: getExamSolutionsPdfLink('Probability'),
    })
    expect(html).toContain('Sample Questions')
    expect(html).toContain('Sample Solutions')
    expect(html).toContain('edu-exam-p-sample-quest.pdf')
    expect(html).toContain('edu-exam-p-sample-sol.pdf')
  })

  it('shows one button for a sitting whose report carries its own answers', () => {
    // A CAS examiner's report is the paper *and* the sample answers, so there
    // is no second document to offer — and no empty second button.
    const html = renderShelf({
      reportLink: { url: 'https://www.casact.org/x.pdf', label: "Examiner's Report" },
    })
    expect(html).toContain("Examiner&#x27;s Report")
    expect(html).not.toContain('Sample Solutions')
  })

  it('shows no document row at all when the exam has no published papers', () => {
    expect(renderShelf()).not.toContain('PDF')
  })
})
