import { describe, it, expect } from 'vitest'
import {
  parseVerification,
  parseVerificationLog,
  openFindings,
  openCriticalFindings,
  verificationBadge,
  formatCheckedDate,
  verificationLogPath,
  contentPathFromVerification,
} from './verification'

const VERIFIED = `---
id: "cas5-2019f-q17"
answer: "B"
verification:
  status: verified
  confidence: high
  last_checked: 2026-08-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:${'9'.repeat(64)}
  sources:
    - "CAS Exam 5 Fall 2019, Q17 — official solution PDF, p.4"
    - "Werner & Modlin, Basic Ratemaking 5th ed., ch. 8 p.142"
  open_findings: 0
  log: .verify/questions/exam-5/q-2019-fall-17.md
---

Earned premium is 3,850,000.
`

const UNVERIFIED_PAGE = `---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:${'a'.repeat(64)}
  sources: []
  open_findings: 0
  log: .verify/Concepts/Convexity.md
---

**Convexity** measures curvature.
`

const LOG = `---
target: questions/exam-5/q-2019-fall-17.md
created: 2026-08-19
---

## [F-001] Stem value contradicts official PDF
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-08-19T14:02Z/a3f9
- date: 2026-08-19
- severity: critical
- status: open
- locus: stem, line 12
- claim: Stem gives earned premium of 4,200,000.
- evidence: CAS Exam 5 Fall 2019 Q17 official PDF p.4 states 4,200,000 for *written*
  premium and 3,850,000 for earned. Recomputing the LR with 3,850,000 reproduces the
  stated answer of 0.62.
- proposed_action: Change earned premium to 3,850,000.
- applied: false

## [F-002] Distractor D duplicates B
- entry_type: finding
- author: agent:validate-v1
- date: 2026-08-19
- severity: minor
- status: open
`

const RESOLUTION = `
## [F-001/R] Correction applied
- entry_type: resolution
- author: human:jordan
- date: 2026-08-20
- resolves: F-001
- status: resolved
- note: Confirmed against the PDF, fixed in commit 8ac31f2.
`

describe('parseVerification', () => {
  it('reads a verified block, dates and all', () => {
    const v = parseVerification(VERIFIED)!
    expect(v.status).toBe('verified')
    expect(v.confidence).toBe('high')
    // js-yaml parses an unquoted date into a Date; it has to come back as ISO.
    expect(v.lastChecked).toBe('2026-08-12')
    expect(v.lastCheckedBy).toBe('agent:validate-v1')
    expect(v.sources).toHaveLength(2)
    expect(v.sources[0]).toContain('official solution PDF')
    expect(v.openFindings).toBe(0)
    expect(v.log).toBe('.verify/questions/exam-5/q-2019-fall-17.md')
  })

  it('reads an unverified block with null everywhere', () => {
    const v = parseVerification(UNVERIFIED_PAGE)!
    expect(v.status).toBe('unverified')
    expect(v.confidence).toBeNull()
    expect(v.lastChecked).toBeNull()
    expect(v.sources).toEqual([])
  })

  it('returns null for a page with no block at all', () => {
    expect(parseVerification('Just prose, no frontmatter.\n')).toBeNull()
    expect(parseVerification('---\nid: "x"\n---\n\nbody\n')).toBeNull()
  })

  it('degrades an unknown status to unverified rather than throwing', () => {
    const v = parseVerification(VERIFIED.replace('status: verified', 'status: probably-fine'))!
    expect(v.status).toBe('unverified')
  })
})

describe('verificationBadge', () => {
  it('shows a green badge with the check date', () => {
    const badge = verificationBadge(parseVerification(VERIFIED))
    expect(badge.tone).toBe('green')
    expect(badge.label).toBe('Verified · 12 Aug 2026')
    expect(badge.detail).toContain('2 sources')
  })

  it('is grey and non-committal for an unverified page', () => {
    const badge = verificationBadge(parseVerification(UNVERIFIED_PAGE))
    expect(badge.tone).toBe('grey')
    expect(badge.label).toBe('Unverified')
  })

  it('is grey rather than green when there is no block', () => {
    expect(verificationBadge(null).tone).toBe('grey')
  })

  it('flags a verified page that still carries an open finding', () => {
    const v = parseVerification(VERIFIED)!
    const badge = verificationBadge({ ...v, openFindings: 1 })
    expect(badge.tone).toBe('amber')
    expect(badge.detail).toContain('1 open finding')
  })

  it('asks for a re-check once the page has changed underneath the pass', () => {
    const v = parseVerification(VERIFIED)!
    const badge = verificationBadge({ ...v, status: 'stale', confidence: null })
    expect(badge.tone).toBe('amber')
    expect(badge.label).toBe('Re-check needed')
  })

  it('is red and explicit when sources disagree', () => {
    const v = parseVerification(VERIFIED)!
    const badge = verificationBadge({ ...v, status: 'disputed', confidence: null })
    expect(badge.tone).toBe('red')
    expect(badge.label).toBe('Disputed')
  })
})

describe('formatCheckedDate', () => {
  it('formats an ISO date without drifting a day across timezones', () => {
    expect(formatCheckedDate('2026-08-12')).toBe('12 Aug 2026')
    expect(formatCheckedDate('2026-01-01')).toBe('1 Jan 2026')
  })

  it('returns null for junk', () => {
    expect(formatCheckedDate(null)).toBeNull()
    expect(formatCheckedDate('last tuesday')).toBeNull()
  })
})

describe('parseVerificationLog', () => {
  it('parses entries, fields and wrapped prose', () => {
    const log = parseVerificationLog(LOG)
    expect(log.target).toBe('questions/exam-5/q-2019-fall-17.md')
    expect(log.entries).toHaveLength(2)

    const first = log.entries[0]
    expect(first.id).toBe('F-001')
    expect(first.title).toBe('Stem value contradicts official PDF')
    expect(first.entryType).toBe('finding')
    expect(first.severity).toBe('critical')
    expect(first.status).toBe('open')
    const evidence = first.fields.find((f) => f.key === 'evidence')!.value
    expect(evidence).toContain('3,850,000 for earned')
    expect(evidence).toContain('reproduces the stated answer of 0.62')
  })

  it('counts open findings, and stops counting once one is resolved', () => {
    expect(openFindings(parseVerificationLog(LOG))).toHaveLength(2)
    expect(openCriticalFindings(parseVerificationLog(LOG))).toHaveLength(1)

    const closed = parseVerificationLog(LOG + RESOLUTION)
    expect(openFindings(closed).map((e) => e.id)).toEqual(['F-002'])
    expect(openCriticalFindings(closed)).toHaveLength(0)
  })

  it('keeps a hand-written human comment verbatim', () => {
    const handWritten = `
## [C-001] The 2019 paper reuses this exhibit
- entry_type: comment
- author: human:jordan
- date: 2026-08-21
- note: Q14 on the same paper reuses this exhibit — if the premium is wrong
  here it is wrong there too.
`
    const log = parseVerificationLog(LOG + handWritten)
    const comment = log.entries.find((e) => e.id === 'C-001')!
    expect(comment.entryType).toBe('comment')
    expect(comment.author).toBe('human:jordan')
    expect(comment.fields.find((f) => f.key === 'note')!.value)
      .toBe('Q14 on the same paper reuses this exhibit — if the premium is wrong here it is wrong there too.')
  })

  it('survives a log with no entries yet', () => {
    const log = parseVerificationLog('---\ntarget: Concepts/Convexity.md\ncreated: 2026-08-19\n---\n')
    expect(log.entries).toEqual([])
    expect(openFindings(log)).toEqual([])
  })
})

describe('contentPathFromVerification', () => {
  it('recovers the vault path a question was parsed from', () => {
    // Questions reach the app as raw markdown with no filename attached, and
    // `id` does not map to the filename — the block's `log:` is the only
    // carrier of the path.
    const v = parseVerification(VERIFIED)!
    expect(contentPathFromVerification(v)).toBe('questions/exam-5/q-2019-fall-17.md')
  })

  it('round-trips with verificationLogPath', () => {
    const path = 'Concepts/Loss Development Factor.md'
    const v = { ...parseVerification(UNVERIFIED_PAGE)!, log: verificationLogPath(path) }
    expect(contentPathFromVerification(v)).toBe(path)
  })

  it('returns null rather than a bogus path when there is no block', () => {
    expect(contentPathFromVerification(null)).toBeNull()
    expect(contentPathFromVerification({ ...parseVerification(VERIFIED)!, log: '' })).toBeNull()
    expect(contentPathFromVerification({ ...parseVerification(VERIFIED)!, log: 'questions/x.md' }))
      .toBeNull()
  })
})

describe('verificationLogPath', () => {
  it('mirrors the vault path under .verify/', () => {
    expect(verificationLogPath('questions/exam-5/q-2019-fall-17.md'))
      .toBe('.verify/questions/exam-5/q-2019-fall-17.md')
    expect(verificationLogPath('Concepts/Loss Development Factor.md'))
      .toBe('.verify/Concepts/Loss Development Factor.md')
  })
})
