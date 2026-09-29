import { describe, it, expect, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

// The panel's Report button reaches Supabase through the report modal.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import { EntryDetail } from './FactCheckPanel'
import { FactCheckSection } from './FactCheckSection'
import { parseVerificationLog, summarizeLog } from '@/lib/verification'

// The Wackerly finding from `.verify/Exam P-1 (SOA).md`, trimmed, and the
// resolution that closed it.
const LOG = `---
target: Exam P-1 (SOA).md
created: 2026-09-27
---

## [F-002] Wackerly reading line adds Chapter 8
- entry_type: finding
- author: agent:validate-v1
- date: 2026-09-27
- severity: major
- status: open
- locus: Source Material, Wackerly reading line
- claim: Chapters 1-8, Excluding 2.12
- evidence: SOA Probability Exam syllabus, November 2026, REFERENCES pp.5-7, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf. p.5 lists Wackerly 7th ed.: Chapter 1; Chapter 2 (exclude 2.12). No Chapter 8.
- proposed_action: Transcribe the syllabus chapter list verbatim.
- applied: true
- fingerprint: 7adb67a6289f

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Reading line replaced with the November 2026 syllabus chapter list.
`

function render(raw: string) {
  const summary = summarizeLog(parseVerificationLog(raw))
  const group = [...summary.open, ...summary.resolved, ...summary.notes][0]
  return renderToStaticMarkup(<EntryDetail group={group} />)
}

describe('EntryDetail', () => {
  it('draws a finding as a diff — what the page said, then what the source says', () => {
    const html = render(LOG)
    const said = html.indexOf('Page said')
    const says = html.indexOf('Source says')
    expect(said).toBeGreaterThan(-1)
    expect(says).toBeGreaterThan(said)
    expect(html).toContain('Chapters 1-8, Excluding 2.12')
    expect(html).toContain('p.5 lists Wackerly 7th ed.')
  })

  it('keeps the auditor’s paperwork off the screen', () => {
    const html = render(LOG)
    expect(html).not.toMatch(/sha256/i)
    expect(html).not.toContain('7adb67a6289f')
    expect(html).not.toContain('Wackerly reading line</')
    // The URL comes back as a way to go and read the source, named by its publisher.
    expect(html).toContain('>soa.org<')
  })

  it('says what was done about it, and when, under the diff', () => {
    const html = render(LOG)
    expect(html).toContain('Fixed')
    expect(html).toContain('28 Sep 2026')
    expect(html).toContain('Reading line replaced with the November 2026 syllabus chapter list.')
    expect(html.indexOf('Reading line replaced')).toBeGreaterThan(html.indexOf('Source says'))
    // The proposal it replaced is not repeated beside it.
    expect(html).not.toContain('Transcribe the syllabus chapter list verbatim.')
  })

  it('tells a correction already on the page from one only suggested', () => {
    const open = LOG.slice(0, LOG.indexOf('## [F-002/R]'))
    expect(render(open)).toContain('Corrected on the page')
    expect(render(open)).toContain('not yet signed off')
    const suggested = render(open.replace('- applied: true', '- applied: false'))
    expect(suggested).toContain('Suggested fix')
    expect(suggested).toContain('Transcribe the syllabus chapter list verbatim.')
  })

  it('shows a note on its own when there is nothing to diff', () => {
    const comment = `---\ntarget: x.md\n---\n\n## [C-001] Reader report\n- entry_type: comment\n- author: human:anon\n- date: 2026-08-21\n- note: The exhibit looks off.\n`
    const html = render(comment)
    expect(html).toContain('The exhibit looks off.')
    expect(html).not.toContain('Page said')
    expect(html).toContain('21 Aug 2026 · anon')
  })
})

describe('FactCheckSection', () => {
  it('names what it holds and how many, and folds unless told otherwise', () => {
    const folded = renderToStaticMarkup(
      <FactCheckSection title="Fixed" count={11} tone="green" icon={null}>
        <p>row</p>
      </FactCheckSection>,
    )
    expect(folded).toContain('Fixed')
    expect(folded).toContain('>11<')
    expect(folded).toContain('aria-expanded="false"')
    expect(folded).not.toContain('<p>row</p>')

    const open = renderToStaticMarkup(
      <FactCheckSection title="Open" count={2} detail="1 major · 1 minor" tone="amber" icon={null} defaultOpen>
        <p>row</p>
      </FactCheckSection>,
    )
    expect(open).toContain('aria-expanded="true"')
    expect(open).toContain('1 major · 1 minor')
    expect(open).toContain('<p>row</p>')
  })
})
