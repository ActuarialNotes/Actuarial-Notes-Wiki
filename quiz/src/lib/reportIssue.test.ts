import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  REPORT_CATEGORIES,
  REPORT_STEPS,
  canContinue,
  isQuestionPath,
  reportCategoriesFor,
  reportCategory,
  reportCreditName,
  type ReportDraft,
} from './reportIssue'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const values = (options: { value: string }[]) => options.map((o) => o.value)

describe('report categories', () => {
  it('are unique, with something else last', () => {
    const all = values([...REPORT_CATEGORIES])
    expect(new Set(all).size).toBe(all.length)
    expect(all.at(-1)).toBe('other')
  })

  it('offer a question what only a question can have', () => {
    const offered = values(reportCategoriesFor('questions/exam-5/cas5-2013f-009.md'))
    expect(offered).toContain('wrong answer')
    expect(offered).toContain('solution error')
    expect(offered).toContain('mistranscribed')
    expect(offered).not.toContain('incorrect')
    expect(offered).not.toContain('missing')
  })

  it("don't offer a concept page a wrong answer it doesn't have", () => {
    const offered = values(reportCategoriesFor('Concepts/Bayes Theorem.md'))
    expect(offered).not.toContain('wrong answer')
    expect(offered).not.toContain('solution error')
    expect(offered).toContain('incorrect')
    expect(offered).toContain('missing')
  })

  it('offer every page the shared ones, ending in something else', () => {
    for (const p of ['questions/exam-p/q.md', 'Concepts/X.md', 'Resources/Books/Y.md', 'Exam P-1 (SOA).md']) {
      const offered = values(reportCategoriesFor(p))
      for (const shared of ['typo', 'unclear', 'display', 'broken link', 'outdated']) {
        expect(offered).toContain(shared)
      }
      expect(offered.at(-1)).toBe('other')
    }
  })

  it('tell a question path from a page path', () => {
    expect(isQuestionPath('questions/exam-fm/a.md')).toBe(true)
    expect(isQuestionPath('./questions/exam-fm/a.md')).toBe(true)
    expect(isQuestionPath('Concepts/questions about x.md')).toBe(false)
  })

  it('look up by value', () => {
    expect(reportCategory('typo')?.label).toBe('Typo')
    expect(reportCategory(null)).toBeUndefined()
  })

  // The values are stored in `content_reports.severity`, whose CHECK
  // constraint rejects anything it doesn't list — a category the database
  // hasn't been told about is a report that fails to send.
  it('are all allowed by the newest content_reports severity constraint', () => {
    const dir = path.join(REPO, 'supabase/migrations')
    const constraint = readdirSync(dir)
      .filter((f) => f.endsWith('.sql'))
      .sort()
      .map((f) => readFileSync(path.join(dir, f), 'utf-8'))
      .map((sql) => sql.match(/CONSTRAINT content_reports_severity CHECK \(([\s\S]*?)\)\s*\)/))
      .filter((m): m is RegExpMatchArray => m !== null)
      .at(-1)
    expect(constraint).toBeDefined()
    const allowed = [...constraint![1].matchAll(/'([^']+)'/g)].map((m) => m[1])
    for (const value of values([...REPORT_CATEGORIES])) expect(allowed).toContain(value)
  })

  // …and `scripts/sync_reports.py` writes a triage hint for each into the log.
  it('each have a triage hint in sync_reports.py', () => {
    const script = readFileSync(path.join(REPO, 'scripts/sync_reports.py'), 'utf-8')
    const block = script.match(/SEVERITY_HINT = \{([\s\S]*?)\n\}/)
    expect(block).not.toBeNull()
    const hinted = [...block![1].matchAll(/^\s*"([^"]+)":/gm)].map((m) => m[1])
    for (const value of values([...REPORT_CATEGORIES])) expect(hinted).toContain(value)
  })
})

describe('reportCreditName', () => {
  it('prefers the display name set in Settings', () => {
    expect(reportCreditName({ display_name: ' Jordan ', full_name: 'Jordan Thiessen' })).toBe('Jordan')
  })

  it("falls back to the sign-in provider's name", () => {
    expect(reportCreditName({ full_name: 'Jordan Thiessen' })).toBe('Jordan Thiessen')
    expect(reportCreditName({ display_name: '   ', full_name: 'Jordan Thiessen' })).toBe('Jordan Thiessen')
  })

  it('never falls back to anything from the email', () => {
    expect(reportCreditName({ email: 'reader@example.com' })).toBeNull()
    expect(reportCreditName(undefined)).toBeNull()
    expect(reportCreditName({ display_name: 42 })).toBeNull()
  })

  it('fits the column', () => {
    expect(reportCreditName({ display_name: 'x'.repeat(200) })).toHaveLength(60)
  })
})

describe('canContinue', () => {
  const empty: ReportDraft = { category: null, body: '', anonymous: true, consent: false }

  it('runs the three pages in order', () => {
    expect(REPORT_STEPS).toEqual(['category', 'details', 'send'])
  })

  it('needs a category to leave the first page', () => {
    expect(canContinue('category', empty)).toBe(false)
    expect(canContinue('category', { ...empty, category: 'typo' })).toBe(true)
  })

  it('needs words, not whitespace, to leave the second', () => {
    expect(canContinue('details', { ...empty, category: 'typo', body: '  \n ' })).toBe(false)
    expect(canContinue('details', { ...empty, category: 'typo', body: 'teh' })).toBe(true)
  })

  it('never sends without consent', () => {
    const ready: ReportDraft = { category: 'typo', body: 'teh', anonymous: true, consent: false }
    expect(canContinue('send', ready)).toBe(false)
    expect(canContinue('send', { ...ready, consent: true })).toBe(true)
  })

  it('never sends a report with a hole in it, whatever the consent', () => {
    expect(canContinue('send', { ...empty, consent: true })).toBe(false)
    expect(canContinue('send', { ...empty, body: 'teh', consent: true })).toBe(false)
  })
})
