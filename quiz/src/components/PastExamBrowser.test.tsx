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

  it('puts the papers on the selected row, not above the shelf', () => {
    const html = renderShelf({
      rows: [
        { key: '2019-spring', year: 2019, session: 'Spring', label: 'Spring 2019', available: true, bankCount: 18 },
        { key: '2018-spring', year: 2018, session: 'Spring', label: 'Spring 2018', available: true, bankCount: 19 },
      ] as Parameters<typeof PastExamBrowser>[0]['rows'],
      selected: { year: 2018, session: 'Spring' },
      reportLink: { url: 'https://www.casact.org/x.pdf', label: "Examiner's Report" },
    })
    const report = html.indexOf('casact.org/x.pdf')
    expect(report).toBeGreaterThan(html.indexOf('Spring 2018'))
    expect(report).toBeGreaterThan(html.indexOf('Spring 2019'))
    // Beside the radio, never inside it — a link can't live in a button.
    expect(html.slice(html.indexOf('Spring 2018'), report)).toContain('</button>')
  })
})
