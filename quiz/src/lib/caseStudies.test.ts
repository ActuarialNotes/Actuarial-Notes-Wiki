import { describe, it, expect } from 'vitest'
import { parseCaseStudy, parseAllCaseStudies } from './caseStudies'

const VALID = `---
id: "masii-2019s-systolic"
exam: "Exam MAS-II"
title: "Systolic Blood Pressure Case Study"
year: 2019
session: Spring
source: "CAS Exam MAS-II, Spring 2019 — supplemental material"
---

Some prose.

\`\`\`
## Linear mixed-effects model fit by REML
\`\`\`
`

describe('parseCaseStudy', () => {
  it('reads the frontmatter and keeps the body as markdown', () => {
    const study = parseCaseStudy(VALID)
    expect(study).not.toBeNull()
    expect(study!.id).toBe('masii-2019s-systolic')
    expect(study!.exam).toBe('Exam MAS-II')
    expect(study!.title).toBe('Systolic Blood Pressure Case Study')
    expect(study!.year).toBe(2019)
    expect(study!.session).toBe('Spring')
    expect(study!.source).toContain('Spring 2019')
    // The body is handed to the markdown renderer untouched, fences and all.
    expect(study!.body).toContain('Some prose.')
    expect(study!.body).toContain('Linear mixed-effects model fit by REML')
  })

  it('leaves optional fields undefined when absent', () => {
    const study = parseCaseStudy(`---
id: "x"
exam: "Exam MAS-II"
title: "T"
---
Body.`)
    expect(study!.year).toBeUndefined()
    expect(study!.session).toBeUndefined()
    expect(study!.source).toBeUndefined()
  })

  // One malformed file must not take the viewer down with it, so every failure
  // mode returns null rather than throwing.
  it.each([
    ['no frontmatter at all', 'Just a body.'],
    ['missing id', '---\nexam: "E"\ntitle: "T"\n---\nBody.'],
    ['missing exam', '---\nid: "x"\ntitle: "T"\n---\nBody.'],
    ['missing title', '---\nid: "x"\nexam: "E"\n---\nBody.'],
    ['empty body', '---\nid: "x"\nexam: "E"\ntitle: "T"\n---\n\n   \n'],
  ])('returns null for %s', (_label, raw) => {
    expect(parseCaseStudy(raw)).toBeNull()
  })
})

describe('parseAllCaseStudies', () => {
  it('keys studies by id and drops malformed files', () => {
    const map = parseAllCaseStudies([VALID, 'garbage', '---\nid: "b"\nexam: "E"\ntitle: "B"\n---\nBody.'])
    expect(Object.keys(map).sort()).toEqual(['b', 'masii-2019s-systolic'])
  })

  it('lets a later file win a duplicate id', () => {
    const first = '---\nid: "dup"\nexam: "E"\ntitle: "First"\n---\nBody.'
    const second = '---\nid: "dup"\nexam: "E"\ntitle: "Second"\n---\nBody.'
    expect(parseAllCaseStudies([first, second]).dup.title).toBe('Second')
  })
})
