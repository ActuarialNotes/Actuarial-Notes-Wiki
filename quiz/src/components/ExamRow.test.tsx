import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { ExamRow, ExamRowMeta } from './ExamRow'

function row(props: Partial<Parameters<typeof ExamRow>[0]> = {}) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <ExamRow examKey="MAS-I" title="Exam MAS-I" topic="Modern Actuarial Statistics I" status="beta" {...props} />
    </MemoryRouter>,
  )
}

describe('ExamRow', () => {
  it('tags the material by its status, and a finished exam not at all', () => {
    expect(row({ status: 'beta' })).toContain('Beta')
    expect(row({ status: 'development' })).toContain('In Development')
    const ready = row({ examKey: 'P', title: 'Exam P-1', status: 'ready' })
    expect(ready).not.toContain('Beta')
    expect(ready).not.toContain('In Development')
  })

  it('is a link when given a route and a button otherwise', () => {
    expect(row({ to: '/wiki/exam/x' })).toMatch(/^<a [^>]*href="\/wiki\/exam\/x"/)
    expect(row({ onClick: () => {} })).toMatch(/^<button type="button"/)
  })

  it("washes in the exam's accent, and neutrally for a requirement with none", () => {
    expect(row()).toContain('--exam-accent-soft')
    expect(row({ examKey: 'DISC-DA', title: 'DISC DA', status: 'development' })).not.toContain('--exam-accent')
  })
})

describe('ExamRowMeta', () => {
  const meta = (items: Parameters<typeof ExamRowMeta>[0]['items']) =>
    renderToStaticMarkup(<ExamRowMeta items={items} />)

  it('puts one dot between facts and skips the ones that are not known', () => {
    const html = meta(['707 questions', null, false, '', 'In progress'])
    expect(html).toContain('707 questions')
    expect(html).toContain('In progress')
    expect(html.match(/·/g)).toHaveLength(1)
  })

  it('renders nothing when there is nothing to say', () => {
    expect(meta([null, false])).toBe('')
  })
})
