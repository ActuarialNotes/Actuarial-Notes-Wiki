import { describe, it, expect } from 'vitest'
import { filterQuestions, parseQuestion, type Question } from './parser'
import { hasCriticalFinding, verificationBadge, parseVerification } from './verification'

/**
 * The quiz-side consequence of the validation record: a question the record says
 * is critically wrong must not reach a student by any route, unless a reviewer
 * has explicitly asked to see flagged questions.
 */

function question(id: string, block: string): Question {
  const raw = `---
id: "${id}"
exam: "Exam 5"
topic: "Ratemaking"
learning_objective: "Ratemaking"
difficulty: medium
type: multiple-choice
answer: "B"
${block}---

Earned premium is 3,850,000. What is the loss ratio?

- A) 0.568
- B) 0.62

## Explanation
3,850,000 gives 0.62.
`
  const parsed = parseQuestion(raw)
  if (!parsed) throw new Error(`fixture ${id} failed to parse`)
  return parsed
}

const CLEAN = `verification:
  status: verified
  confidence: high
  last_checked: 2026-08-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:${'9'.repeat(64)}
  sources:
    - "CAS Exam 5 Fall 2019, Q17 — official solution PDF"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-5/clean.md
`

const FLAGGED = `verification:
  status: unverified
  confidence: null
  last_checked: 2026-08-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:${'a'.repeat(64)}
  sources: []
  open_findings: 2
  open_critical: 1
  log: .verify/questions/exam-5/flagged.md
`

const DISPUTED = `verification:
  status: disputed
  confidence: null
  last_checked: 2026-08-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:${'b'.repeat(64)}
  sources:
    - "CAS official PDF"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-5/disputed.md
`

const NITS_ONLY = `verification:
  status: verified
  confidence: medium
  last_checked: 2026-08-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:${'c'.repeat(64)}
  sources:
    - "CAS official PDF"
  open_findings: 3
  open_critical: 0
  log: .verify/questions/exam-5/nits.md
`

const NO_BLOCK = ''

describe('hasCriticalFinding', () => {
  it('is true for an open critical finding', () => {
    expect(hasCriticalFinding(parseVerification(`---\n${FLAGGED}---\n`))).toBe(true)
  })

  it('is true for a disputed page even with no critical finding counted', () => {
    // `disputed` means sources conflict *or* a critical finding is unresolved;
    // either way the page is not fit to be quizzed on.
    expect(hasCriticalFinding(parseVerification(`---\n${DISPUTED}---\n`))).toBe(true)
  })

  it('is false for minor findings', () => {
    expect(hasCriticalFinding(parseVerification(`---\n${NITS_ONLY}---\n`))).toBe(false)
  })

  it('is false for a clean page and for no record at all', () => {
    expect(hasCriticalFinding(parseVerification(`---\n${CLEAN}---\n`))).toBe(false)
    expect(hasCriticalFinding(null)).toBe(false)
  })
})

describe('filterQuestions and critical findings', () => {
  const questions = [
    question('clean', CLEAN),
    question('flagged', FLAGGED),
    question('disputed', DISPUTED),
    question('nits', NITS_ONLY),
    question('unrecorded', NO_BLOCK),
  ]

  it('excludes critically-flagged questions by default', () => {
    const ids = filterQuestions(questions, { exam: 'Exam 5' }).map((q) => q.id)
    expect(ids).toEqual(['clean', 'nits', 'unrecorded'])
  })

  it('keeps questions whose only findings are minor', () => {
    expect(filterQuestions(questions, {}).map((q) => q.id)).toContain('nits')
  })

  it('does not punish a question that has never been reviewed', () => {
    // Unverified is the honest default across most of the vault; excluding it
    // would empty the bank.
    expect(filterQuestions(questions, {}).map((q) => q.id)).toContain('unrecorded')
  })

  it('includes them when a reviewer asks for them', () => {
    const ids = filterQuestions(questions, { includeFlagged: true }).map((q) => q.id)
    expect(ids).toEqual(['clean', 'flagged', 'disputed', 'nits', 'unrecorded'])
  })

  it('excludes them even from a direct id lookup', () => {
    // The `ids` filter short-circuits every other rule; the exclusion has to
    // sit in front of it or a saved mistake-review link would serve a question
    // the record says is wrong.
    expect(filterQuestions(questions, { ids: ['flagged'] })).toEqual([])
    expect(filterQuestions(questions, { ids: ['flagged'], includeFlagged: true }))
      .toHaveLength(1)
  })
})

describe('verificationBadge with a critical finding', () => {
  it('says so in red, outranking every other state', () => {
    const badge = verificationBadge(parseVerification(`---\n${FLAGGED}---\n`))
    expect(badge.tone).toBe('red')
    expect(badge.label).toBe('Known issue')
    expect(badge.detail).toContain('1 unresolved critical finding')
  })

  it('leaves a minor-findings page amber rather than red', () => {
    const badge = verificationBadge(parseVerification(`---\n${NITS_ONLY}---\n`))
    expect(badge.tone).toBe('amber')
    expect(badge.detail).toContain('3 open findings')
  })
})
