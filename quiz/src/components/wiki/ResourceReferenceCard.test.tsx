import { describe, it, expect, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ResourceReferenceCard } from './ResourceReferenceCard'
import { extractSyllabusAssignments, parseResourceMeta, resourceFacts } from '@/lib/resourceMeta'
import { parseVerification } from '@/lib/verification'

vi.mock('@/lib/supabase', () => ({ supabase: {} }))

const ROSS = `---
Title: "A First Course in Probability"
Authors: "Sheldon Ross"
Publisher: "Pearson"
Year: "2019"
Edition: "10th"
Type: "Textbook"
ISBN: "978-0-13-475311-9"
---
![[A First Course in Probability (Ross - 2019) - Cover.jpg]]

An elementary introduction to the theory of probability.

> [!info] On the syllabus
> - [[Exam P-1 (SOA)|Exam P]] — a suggested text (the syllabus requires none); Chapters 1, 2 and 3.

## 1 Combinatorial Analysis
- 1.1 Introduction
`

const ASOP = `---
Title: "ASOP No. 43"
Author: Actuarial Standards Board
Year: "2007"
Publisher: Actuarial Standards Board
Type: Actuarial Standard of Practice
Code: ASOP No. 43
Available from: "[actuarialstandardsboard.org](https://www.actuarialstandardsboard.org/x.pdf)"
---
The standard governing unpaid claims.
`

function render(raw: string, name: string): string {
  return renderToStaticMarkup(
    <ResourceReferenceCard
      meta={parseResourceMeta(raw)}
      assignments={extractSyllabusAssignments(raw).assignments}
      verification={null}
      contentPath={`Resources/Books/${name}.md`}
      contentName={name}
      onOpen={() => {}}
    />,
  )
}

describe('resourceFacts', () => {
  it('lists the facts in citation order, the edition with its year', () => {
    expect(resourceFacts(parseResourceMeta(ROSS))).toEqual([
      { label: 'Edition', value: '10th, 2019' },
      { label: 'Publisher', value: 'Pearson' },
      { label: 'ISBN', value: '978-0-13-475311-9' },
    ])
  })

  it('names a standard’s body once and keeps its code', () => {
    expect(resourceFacts(parseResourceMeta(ASOP))).toEqual([
      { label: 'Year', value: '2007' },
      { label: 'Code', value: 'ASOP No. 43' },
    ])
  })

  it('does not print a year twice when the edition already carries it', () => {
    expect(resourceFacts({ edition: '2016 revision', year: '2016' })).toEqual([{ label: 'Edition', value: '2016 revision' }])
  })
})

describe('ResourceReferenceCard', () => {
  it('leads with the document’s own title, not the file name', () => {
    const html = render(ROSS, 'A First Course in Probability (Ross - 2019)')
    expect(html).toContain('A First Course in Probability</h2>')
    expect(html).not.toContain('(Ross - 2019)</h2>')
    expect(html).toContain('Sheldon Ross')
    expect(html).toContain('Textbook')
  })

  it('lists the facts as rows and each exam on the syllabus', () => {
    const html = render(ROSS, 'A First Course in Probability (Ross - 2019)')
    expect(html).toContain('10th, 2019')
    expect(html).toContain('978-0-13-475311-9')
    expect(html).toContain('Exam P')
    // The pills are gone: no "10th ed." chip.
    expect(html).not.toContain('10th ed.')
  })

  it('puts the way to get the document first: a PDF is read, a book has a menu', () => {
    expect(render(ASOP, 'ASOP No. 43')).toContain('Read PDF')
    expect(render(ROSS, 'Ross')).toContain('Get a copy')
  })

  // The date would wrap the pill under "Get a copy" on a phone; it stays in the
  // tooltip and the panel instead.
  it('leaves the date off the Fact Check pill, keeping it in the tooltip', () => {
    const checked = ROSS.replace('ISBN: "978-0-13-475311-9"\n', `ISBN: "978-0-13-475311-9"
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:00
  sources:
    - "Ross, front matter — https://example.org/ross.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Ross.md
`)
    const html = renderToStaticMarkup(
      <ResourceReferenceCard
        meta={parseResourceMeta(checked)}
        assignments={[]}
        verification={parseVerification(checked)}
        contentPath="Resources/Books/Ross.md"
        contentName="Ross"
        onOpen={() => {}}
      />,
    )
    expect(html).toContain('>Fact checked</span>')
    expect(html).not.toContain('>Fact checked · 9 Oct 2026<')
    expect(html).toContain('title="Fact checked · 9 Oct 2026.')
  })
})
