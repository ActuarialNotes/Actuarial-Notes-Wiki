import { describe, it, expect } from 'vitest'
import {
  parseVerification,
  parseVerificationLog,
  openFindings,
  openCriticalFindings,
  factCheckBadge,
  findingOutcome,
  formatCheckedDate,
  summarizeEvidence,
  summarizeLog,
  summarizeSource,
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

describe('factCheckBadge', () => {
  it('shows a green badge with the check date', () => {
    const badge = factCheckBadge(parseVerification(VERIFIED))
    expect(badge.tone).toBe('green')
    expect(badge.label).toBe('Fact checked · 12 Aug 2026')
    expect(badge.detail).toContain('2 sources')
  })

  it('is grey and non-committal for an unverified page', () => {
    const badge = factCheckBadge(parseVerification(UNVERIFIED_PAGE))
    expect(badge.tone).toBe('grey')
    expect(badge.label).toBe('Not fact checked')
    expect(badge.short).toBe('Unchecked')
  })

  it('is grey rather than green when there is no block', () => {
    expect(factCheckBadge(null).tone).toBe('grey')
  })

  it('flags a verified page that still carries an open finding', () => {
    const v = parseVerification(VERIFIED)!
    const badge = factCheckBadge({ ...v, openFindings: 1 })
    expect(badge.tone).toBe('amber')
    expect(badge.detail).toContain('1 open finding')
  })

  it('asks for a re-check once the page has changed underneath the pass', () => {
    const v = parseVerification(VERIFIED)!
    const badge = factCheckBadge({ ...v, status: 'stale', confidence: null })
    expect(badge.tone).toBe('amber')
    expect(badge.label).toBe('Re-check needed')
  })

  it('is red and explicit when sources disagree', () => {
    const v = parseVerification(VERIFIED)!
    const badge = factCheckBadge({ ...v, status: 'disputed', confidence: null })
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

describe('summarizeSource', () => {
  it('keeps the name, lifts out the pages and drops the hash and version', () => {
    const raw =
      'Werner, G. & Modlin, C., Basic Ratemaking, 5th ed., May 2016 (CAS) — ' +
      'https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf ' +
      `(sha256 ${'6'.repeat(64)}, 423 pp.): printed Table of Contents PDF pp.8-12`
    expect(summarizeSource(raw)).toEqual({
      label: 'Werner, G. & Modlin, C., Basic Ratemaking, 5th ed., May 2016 (CAS)',
      url: 'https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf',
      locator: 'printed Table of Contents PDF pp.8-12',
    })
  })

  it('cuts at the chapter when the locator runs on after a comma', () => {
    const raw =
      'Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), ' +
      'Ch. 1 overview (PDF pp.2,4) and Ch. 8 pp.142-148 (PDF pp.154-160), ' +
      `sha256:${'6'.repeat(64)} — ` +
      'https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf'
    expect(summarizeSource(raw)).toEqual({
      label: 'Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016)',
      url: 'https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf',
      locator: 'Ch. 1 overview (PDF pp.2,4) and Ch. 8 pp.142-148 (PDF pp.154-160)',
    })
  })

  it('keeps a comma that belongs to the name — the title runs past it', () => {
    const raw =
      'ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007), ' +
      `sections 2.1, 3.3(a), 4.1 and 4.2(b), standard pp.2, 4, 9-10, sha256:${'b'.repeat(64)}`
    expect(summarizeSource(raw)).toEqual({
      label: 'ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007)',
      url: null,
      locator: 'sections 2.1, 3.3(a), 4.1 and 4.2(b), standard pp.2, 4, 9-10',
    })
  })

  it('reads a locator the hash was sitting in front of', () => {
    const raw =
      'CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking ' +
      `(adopted May 1988), sha256:${'f'.repeat(64)} — p.3, Principle 3`
    expect(summarizeSource(raw)).toEqual({
      label: 'CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988)',
      url: null,
      locator: 'p.3, Principle 3',
    })
  })

  it('keeps a citation with no locator whole', () => {
    expect(summarizeSource('CAS Statement of Principles (1988)'))
      .toEqual({ label: 'CAS Statement of Principles (1988)', url: null, locator: null })
  })

  it('cuts a no-URL citation at the dash, and at a chapter without one', () => {
    expect(summarizeSource('CAS Exam 5 Fall 2019, Q17 — official solution PDF, p.4'))
      .toEqual({ label: 'CAS Exam 5 Fall 2019, Q17', url: null, locator: 'official solution PDF, p.4' })
    expect(summarizeSource('Werner & Modlin, Basic Ratemaking 5th ed., ch. 8 p.142'))
      .toEqual({ label: 'Werner & Modlin, Basic Ratemaking 5th ed.', url: null, locator: 'ch. 8 p.142' })
  })

  it('cuts at the URL when the citation has no dash', () => {
    expect(summarizeSource('ASOP No. 13, https://www.actuarialstandardsboard.org/asop13.pdf'))
      .toEqual({
        label: 'ASOP No. 13',
        url: 'https://www.actuarialstandardsboard.org/asop13.pdf',
        locator: null,
      })
  })

  it('falls back to the URL rather than rendering an empty row', () => {
    expect(summarizeSource('https://www.soa.org/p-sample.pdf'))
      .toEqual({
        label: 'https://www.soa.org/p-sample.pdf',
        url: 'https://www.soa.org/p-sample.pdf',
        locator: null,
      })
  })
})

describe('summarizeLog', () => {
  it('splits the log into what is open, what was fixed, and what people said', () => {
    const comment = `
## [C-001] Reader report
- entry_type: comment
- author: human:anon
- date: 2026-08-21
- note: The exhibit looks off.
`
    const summary = summarizeLog(parseVerificationLog(LOG + RESOLUTION + comment))
    expect(summary.open.map((g) => g.entry.id)).toEqual(['F-002'])
    expect(summary.resolved.map((g) => g.entry.id)).toEqual(['F-001'])
    expect(summary.notes.map((g) => g.entry.id)).toEqual(['C-001'])
  })

  it('folds a resolution into the finding it closes instead of listing it twice', () => {
    const summary = summarizeLog(parseVerificationLog(LOG + RESOLUTION))
    expect(summary.resolved).toHaveLength(1)
    expect(summary.resolved[0].closedBy?.id).toBe('F-001/R')
    expect(summary.resolved[0].closedBy?.fields.find((f) => f.key === 'note')?.value)
      .toContain('commit 8ac31f2')
  })

  it('puts the worst open finding first', () => {
    const summary = summarizeLog(parseVerificationLog(LOG))
    // F-002 (minor) is appended after F-001 (critical) in the log; severity wins.
    expect(summary.open.map((g) => g.entry.severity)).toEqual(['critical', 'minor'])
  })

  it('reads `applied`, which is independent of whether the finding is closed', () => {
    const log = parseVerificationLog(LOG.replace('- applied: false', '- applied: true'))
    const summary = summarizeLog(log)
    // Still open — a correction landing does not sign the finding off — but the
    // panel can now say the page in front of the reader has already been fixed.
    expect(summary.open.map((g) => g.entry.id)).toContain('F-001')
    expect(summary.open.find((g) => g.entry.id === 'F-001')!.entry.applied).toBe(true)
    expect(summary.open.find((g) => g.entry.id === 'F-002')!.entry.applied).toBe(false)
  })
})

describe('summarizeEvidence', () => {
  it('takes the hash and URL out of a citation in the middle of the evidence', () => {
    // Verbatim from `.verify/Exam P-1 (SOA).md` F-002: the citation runs into
    // the substance with the fingerprint and the link between them.
    const raw = 'SOA Probability Exam syllabus, November 2026 (7 pp.), REFERENCES pp.5-7, '
      + 'sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, '
      + 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf. '
      + 'p.5 lists Wackerly 7th ed.: Chapter 1; Chapter 2 (exclude 2.12). No Chapter 8.'
    const { text, links } = summarizeEvidence(raw)
    expect(text).toBe('SOA Probability Exam syllabus, November 2026 (7 pp.), REFERENCES pp.5-7. '
      + 'p.5 lists Wackerly 7th ed.: Chapter 1; Chapter 2 (exclude 2.12). No Chapter 8.')
    expect(links).toEqual([
      'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf',
    ])
  })

  it('keeps what a bracket names when only its hash goes', () => {
    const { text } = summarizeEvidence(
      'SOA study note P-21-05 (Risk and Insurance, sha256:1cb44e7f...) has no discussion of it.')
    expect(text).toBe('SOA study note P-21-05 (Risk and Insurance) has no discussion of it.')
  })

  it('drops a bracket the cut leaves empty, and a trailing dash', () => {
    const { text, links } = summarizeEvidence(
      'NIST DLMF §4.6 eq. 4.6.1 (https://dlmf.nist.gov/4.6) states the series. '
      + 'Werner Ch. 6 p.98, sha256:' + 'ab'.repeat(32) + ' — https://www.casact.org/werner.pdf')
    expect(text).toBe('NIST DLMF §4.6 eq. 4.6.1 states the series. Werner Ch. 6 p.98')
    expect(links).toEqual(['https://dlmf.nist.gov/4.6', 'https://www.casact.org/werner.pdf'])
  })

  it('returns evidence with neither exactly as written', () => {
    // The tidying is a repair of what the cut left, never an edit of the
    // finding: a leading minus, a spaced colon and a stray comma all survive.
    const raw = '-0.020 is pre-tax , and the ratio is 3 : 1.'
    expect(summarizeEvidence(raw)).toEqual({ text: raw, links: [] })
  })
})

describe('findingOutcome', () => {
  const group = (raw: string, id: string) => {
    const summary = summarizeLog(parseVerificationLog(raw))
    return [...summary.open, ...summary.resolved].find((g) => g.entry.id === id)!
  }

  it('says a closed finding was fixed, when, and what the resolution said', () => {
    expect(findingOutcome(group(LOG + RESOLUTION, 'F-001'))).toEqual({
      kind: 'fixed',
      date: '2026-08-20',
      note: 'Confirmed against the PDF, fixed in commit 8ac31f2.',
    })
  })

  it('falls back to the proposal for a finding closed without a word', () => {
    const silent = RESOLUTION.replace(/- note: .*\n/, '')
    expect(findingOutcome(group(LOG + silent, 'F-001'))).toMatchObject({
      kind: 'fixed',
      note: 'Change earned premium to 3,850,000.',
    })
  })

  it('never passes a set-aside finding off as done the way it proposed', () => {
    const wontfix = RESOLUTION.replace('status: resolved', 'status: wontfix').replace(/- note: .*\n/, '')
    expect(findingOutcome(group(LOG + wontfix, 'F-001'))).toEqual({ kind: 'wontfix', date: '2026-08-20', note: '' })
  })

  it('separates a correction already on the page from one only suggested', () => {
    expect(findingOutcome(group(LOG, 'F-001'))).toEqual({
      kind: 'proposed',
      note: 'Change earned premium to 3,850,000.',
    })
    const applied = LOG.replace('- applied: false', '- applied: true')
    expect(findingOutcome(group(applied, 'F-001'))?.kind).toBe('applied')
    // Nothing proposed and nothing done: there is no outcome line to draw.
    expect(findingOutcome(group(LOG, 'F-002'))).toBeNull()
  })

  it('has nothing to say about an entry that is not a finding', () => {
    const comment = '\n## [C-001] Reader report\n- entry_type: comment\n- date: 2026-08-21\n- note: Looks off.\n'
    const note = summarizeLog(parseVerificationLog(LOG + comment)).notes[0]
    expect(findingOutcome(note)).toBeNull()
  })
})
